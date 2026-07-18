#!/usr/bin/env python3
"""Telegram-бот уведомлений о заявках Leader Audit.

Следит за базой CRM (SQLite сервера админки) и отправляет каждую новую
заявку сообщением в Telegram-группу. Только стандартная библиотека —
никаких зависимостей ставить не нужно.

Переменные окружения:
  TELEGRAM_BOT_TOKEN  токен бота из @BotFather (обязательно)
  TELEGRAM_CHAT_ID    ID группы/чата, например -1001234567890 (обязательно)
  DB_PATH             путь к leader.db (по умолчанию ../data/leader.db)
  POLL_SECONDS        период опроса базы, сек (по умолчанию 10)
  TELEGRAM_API_BASE   переопределение API (для тестов)
"""
import datetime
import json
import os
import sqlite3
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.environ.get("DB_PATH", os.path.join(BASE_DIR, "..", "data", "leader.db"))
STATE_PATH = os.environ.get("STATE_PATH", os.path.join(BASE_DIR, "state.json"))
POLL_SECONDS = int(os.environ.get("POLL_SECONDS", "10"))
TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN")
CHAT_ID = os.environ.get("TELEGRAM_CHAT_ID")
API_BASE = os.environ.get("TELEGRAM_API_BASE", "https://api.telegram.org")

LANG_LABEL = {"ru": "Русский", "uz": "O'zbek", "en": "English"}

# В базе created_at пишется как datetime('now'), то есть UTC. Узбекистан —
# фиксированный UTC+5 без перехода на летнее время, поэтому хватает сдвига.
TASHKENT_OFFSET = datetime.timedelta(hours=5)

# Сколько раз пробуем одну заявку, прежде чем проверить канал «канарейкой».
MAX_ATTEMPTS = int(os.environ.get("MAX_ATTEMPTS", "5"))
FAILURES = {}  # id заявки → сколько раз подряд её не удалось отправить


def format_created_at(raw: str) -> str:
    """«2026-07-18 08:14:03» (UTC) → «18.07.2026, 13:14» по Ташкенту."""
    try:
        utc = datetime.datetime.strptime(str(raw), "%Y-%m-%d %H:%M:%S")
    except (TypeError, ValueError):
        return str(raw)  # неожиданный формат — лучше сырое значение, чем падение
    return (utc + TASHKENT_OFFSET).strftime("%d.%m.%Y, %H:%M")


def load_last_id() -> int:
    """Читает указатель. -1 = чистый старт (старое не рассылаем), 0 = слать всё.

    Важно различать «файла нет» и «файл битый». Нет файла — это первый запуск,
    накопленного нет по определению, перескочить на максимум безопасно. Битый
    файл означает, что указатель потерян, а заявки в базе есть: тут лучше
    отправить дубли, чем молча похоронить очередь.
    """
    if not os.path.exists(STATE_PATH):
        return -1
    try:
        with open(STATE_PATH, encoding="utf-8") as f:
            return int(json.load(f)["last_id"])
    except (OSError, ValueError, KeyError) as e:
        print(
            f"WARNING: состояние {STATE_PATH} повреждено ({e}). "
            "Рассылаю все заявки заново — возможны дубли, но ни одна не потеряется.",
            file=sys.stderr,
            flush=True,
        )
        return 0


def save_last_id(last_id: int) -> None:
    """Атомарная запись: пишем во временный файл и подменяем одним rename.

    Прямая запись в целевой файл сначала обнуляет его, и если контейнер убьют
    в этот момент, останется пустой JSON — то есть потерянный указатель.
    """
    tmp = f"{STATE_PATH}.tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump({"last_id": last_id}, f)
        f.flush()
        os.fsync(f.fileno())
    os.replace(tmp, STATE_PATH)


def format_lead(lead: sqlite3.Row) -> str:
    lines = [
        "🔔 Новая заявка с сайта leaderaudit.uz",
        "",
        f"👤 Имя: {lead['name']}",
        f"📞 Телефон: {lead['phone']}",
    ]
    if lead["company"]:
        lines.append(f"🏢 Компания: {lead['company']}")
    if lead["lang"]:
        lines.append(f"🌐 Язык: {LANG_LABEL.get(lead['lang'], lead['lang'])}")
    if lead["page"]:
        lines.append(f"📄 Страница: {lead['page']}")
    lines.append(f"🕒 {format_created_at(lead['created_at'])}")
    return "\n".join(lines)


class TelegramError(RuntimeError):
    """Ошибка от Telegram с сохранённым описанием и параметрами."""

    def __init__(self, description, code=0, parameters=None):
        super().__init__(f"Telegram {code}: {description}" if code else description)
        self.description = description
        self.code = code
        self.parameters = parameters or {}


def api_call(method: str, payload: dict) -> dict:
    """Вызов Telegram API с человекочитаемой ошибкой.

    urlopen кидает HTTPError раньше, чем мы дочитаем тело, поэтому на 4xx
    описание причины терялось и в логах оставалось голое «HTTP Error 400».
    """
    data = urllib.parse.urlencode(payload).encode()
    req = urllib.request.Request(f"{API_BASE}/bot{TOKEN}/{method}", data=data)
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            body = json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        try:
            body = json.loads(e.read().decode())
        except Exception:  # noqa: BLE001 — тело нечитаемо, отдаём хотя бы код
            raise TelegramError(f"HTTP {e.code} {e.reason}", e.code) from None
    if not body.get("ok"):
        raise TelegramError(
            body.get("description", "unknown error"),
            body.get("error_code", 0),
            body.get("parameters"),
        )
    return body.get("result", {})


def send_message(text: str) -> None:
    """Отправляет сообщение, переживая переезд группы и флуд-лимит."""
    global CHAT_ID
    for _ in range(3):
        try:
            api_call("sendMessage", {"chat_id": CHAT_ID, "text": text})
            return
        except TelegramError as e:
            # Группу превратили в супергруппу — у неё новый id, идём за ним.
            migrated = e.parameters.get("migrate_to_chat_id")
            if migrated:
                print(
                    f"чат переехал: {CHAT_ID} → {migrated}. Обновите TELEGRAM_CHAT_ID в .env",
                    file=sys.stderr,
                    flush=True,
                )
                CHAT_ID = str(migrated)
                continue
            # Флуд-лимит: Telegram сам говорит, сколько подождать.
            retry_after = e.parameters.get("retry_after")
            if retry_after:
                print(f"флуд-лимит, жду {retry_after}с", file=sys.stderr, flush=True)
                time.sleep(int(retry_after) + 1)
                continue
            raise
    raise TelegramError("не удалось отправить за 3 попытки")


def poll_once(last_id: int) -> int:
    con = sqlite3.connect(DB_PATH)
    con.row_factory = sqlite3.Row
    try:
        if last_id < 0:
            # Первый запуск: запоминаем текущий максимум, ничего не шлём.
            row = con.execute("SELECT COALESCE(MAX(id), 0) AS m FROM leads").fetchone()
            return row["m"]
        rows = con.execute(
            "SELECT * FROM leads WHERE id > ? ORDER BY id", (last_id,)
        ).fetchall()
    finally:
        con.close()

    for lead in rows:
        delivered = True
        try:
            send_message(format_lead(lead))
        except Exception as e:  # noqa: BLE001
            delivered = False
            attempts = FAILURES.get(lead["id"], 0) + 1
            FAILURES[lead["id"]] = attempts
            print(
                f"error: заявка #{lead['id']}, попытка {attempts}/{MAX_ATTEMPTS}: {e}",
                file=sys.stderr,
                flush=True,
            )
            if attempts < MAX_ATTEMPTS:
                return last_id  # ждём: скорее всего временный сбой канала

            # Исчерпали попытки. Проверяем канал минимальным сообщением: если
            # оно проходит, виновата сама заявка, и очередь можно двигать
            # дальше. Если не проходит — лежит канал, и пропускать нельзя,
            # иначе при часовом сбое мы потеряем всё, что накопилось.
            try:
                send_message(f"⚠️ Заявка #{lead['id']} не отправилась — смотрите админку")
            except Exception:  # noqa: BLE001
                print("канал недоступен, очередь ждёт", file=sys.stderr, flush=True)
                return last_id
            print(
                f"ПРОПУЩЕНА заявка #{lead['id']}: канал жив, проблема в самой заявке",
                file=sys.stderr,
                flush=True,
            )
        FAILURES.pop(lead["id"], None)
        last_id = lead["id"]
        save_last_id(last_id)
        if delivered:
            print(f"sent lead #{lead['id']} ({lead['name']})", flush=True)
    return last_id


def main() -> None:
    if not TOKEN or not CHAT_ID:
        sys.exit("Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID environment variables")
    print(f"leads bot: watching {os.path.abspath(DB_PATH)} every {POLL_SECONDS}s", flush=True)
    last_id = load_last_id()
    while True:
        try:
            new_last = poll_once(last_id)
            if new_last != last_id:
                last_id = new_last
                save_last_id(last_id)
        except Exception as e:  # noqa: BLE001 — бот не должен умирать от разовых сбоев
            print(f"error: {e}", file=sys.stderr, flush=True)
        time.sleep(POLL_SECONDS)


if __name__ == "__main__":
    main()
