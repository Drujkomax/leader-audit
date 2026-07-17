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
import json
import os
import sqlite3
import sys
import time
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


def load_last_id() -> int:
    try:
        with open(STATE_PATH, encoding="utf-8") as f:
            return int(json.load(f)["last_id"])
    except (OSError, ValueError, KeyError):
        return -1  # -1 = первый запуск, старые заявки не рассылаем


def save_last_id(last_id: int) -> None:
    with open(STATE_PATH, "w", encoding="utf-8") as f:
        json.dump({"last_id": last_id}, f)


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
    lines.append(f"🕒 {lead['created_at']} (UTC)")
    return "\n".join(lines)


def send_message(text: str) -> None:
    data = urllib.parse.urlencode({"chat_id": CHAT_ID, "text": text}).encode()
    req = urllib.request.Request(f"{API_BASE}/bot{TOKEN}/sendMessage", data=data)
    with urllib.request.urlopen(req, timeout=15) as resp:
        body = json.loads(resp.read().decode())
        if not body.get("ok"):
            raise RuntimeError(f"Telegram API error: {body}")


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
        send_message(format_lead(lead))
        last_id = lead["id"]
        save_last_id(last_id)
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
