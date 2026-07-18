"""Проверка отказоустойчивости бота на фейковом Telegram API."""
import http.server, json, os, sqlite3, sys, tempfile, threading, importlib

MODE = {"mode": "ok"}
SENT = []


class Handler(http.server.BaseHTTPRequestHandler):
    def log_message(self, *a):
        pass

    def do_POST(self):
        body = self.rfile.read(int(self.headers["Content-Length"])).decode()
        import urllib.parse as up
        text = up.unquote_plus(
            dict(p.split("=", 1) for p in body.split("&") if "=" in p).get("text", "")
        )
        m = MODE["mode"]
        if m == "ok":
            SENT.append(text)
            return self._json(200, {"ok": True, "result": {}})
        if m == "down":  # канал целиком лежит
            return self._json(400, {"ok": False, "error_code": 400,
                                    "description": "chat not found"})
        if m == "poison":  # ломается только длинное сообщение с заявкой
            if "не отправилась" in text:  # канарейка проходит
                SENT.append(text)
                return self._json(200, {"ok": True, "result": {}})
            return self._json(400, {"ok": False, "error_code": 400,
                                    "description": "message text is too long"})
        if m == "migrate":
            MODE["mode"] = "ok"
            return self._json(400, {"ok": False, "error_code": 400,
                                    "description": "group upgraded",
                                    "parameters": {"migrate_to_chat_id": -100999}})

    def _json(self, code, payload):
        raw = json.dumps(payload).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(raw)))
        self.end_headers()
        self.wfile.write(raw)


srv = http.server.HTTPServer(("127.0.0.1", 8099), Handler)
threading.Thread(target=srv.serve_forever, daemon=True).start()

tmp = tempfile.mkdtemp()
db_path = os.path.join(tmp, "leader.db")
con = sqlite3.connect(db_path)
con.execute("""CREATE TABLE leads (id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT, phone TEXT, company TEXT, lang TEXT, page TEXT,
    status TEXT DEFAULT 'new', created_at TEXT DEFAULT (datetime('now')))""")
for i in range(1, 4):
    con.execute("INSERT INTO leads (name, phone, created_at) VALUES (?,?,?)",
                (f"Лид{i}", f"+99890000000{i}", "2026-07-18 08:14:03"))
con.commit()
con.close()

state = os.path.join(tmp, "state.json")
os.environ.update(DB_PATH=db_path, STATE_PATH=state, TELEGRAM_BOT_TOKEN="X",
                  TELEGRAM_CHAT_ID="-1", TELEGRAM_API_BASE="http://127.0.0.1:8099",
                  MAX_ATTEMPTS="2")
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
bot = importlib.import_module("bot")

fails = []


def check(label, cond):
    print(("  OK  " if cond else "FAIL  ") + label)
    if not cond:
        fails.append(label)


# 1. Канал лежит: за много циклов НИ ОДНА заявка не должна быть пропущена.
MODE["mode"] = "down"
last = 0
for _ in range(10):
    last = bot.poll_once(last)
check("общий сбой канала: указатель не сдвинулся (лиды ждут)", last == 0)
check("общий сбой: ничего не отправлено", SENT == [])

# 2. Канал вернулся: всё накопленное уходит.
MODE["mode"] = "ok"
last = bot.poll_once(last)
check("после восстановления доставлены все 3 заявки", len(SENT) == 3 and last == 3)
check("время по Ташкенту, без подписи с городом",
      "🕒 18.07.2026, 13:14" in SENT[0] and "Ташкент" not in SENT[0])

# 3. «Ядовитая» заявка при живом канале: очередь не должна вставать.
con = sqlite3.connect(db_path)
con.execute("INSERT INTO leads (name, phone) VALUES ('Ядовитый','+998')")
con.execute("INSERT INTO leads (name, phone) VALUES ('Следующий','+998')")
con.commit()
con.close()
MODE["mode"] = "poison"
before = len(SENT)
for _ in range(6):
    last = bot.poll_once(last)
check("ядовитая заявка не заткнула очередь навсегда", last == 5)
check("о проблемной заявке пришло предупреждение",
      any("не отправилась" in s for s in SENT[before:]))

# 4. Битый файл состояния — заявки не должны исчезнуть.
with open(state, "w") as f:
    f.write("")  # имитируем обрыв записи
check("битое состояние → рассылаем заново, а не молча пропускаем",
      bot.load_last_id() == 0)
os.remove(state)
check("состояния нет (первый запуск) → перескакиваем на максимум",
      bot.load_last_id() == -1)

# 5. Атомарность записи.
bot.save_last_id(42)
check("состояние записано и читается", bot.load_last_id() == 42)
check("временный файл убран за собой", not os.path.exists(state + ".tmp"))

# 6. Переезд группы обрабатывается сам.
MODE["mode"] = "migrate"
bot.send_message("после переезда")
check("миграция чата: сообщение всё равно доставлено", SENT[-1] == "после переезда")

print("\n" + ("ВСЁ ПРОШЛО" if not fails else f"ПРОВАЛЕНО: {fails}"))
sys.exit(1 if fails else 0)
