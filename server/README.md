# Leader Audit — CMS backend

Express + SQLite бэкенд для админки (/admin на сайте): статьи блога и заявки.

## Запуск локально

```bash
cd server
npm install
npm run dev        # http://localhost:8787
```

При первом старте создаётся `data/leader.db`, сидится пользователь-админ и
статьи из `seed/blog-posts.json`.

## Переменные окружения

| Переменная        | По умолчанию               | Назначение                                    |
| ----------------- | -------------------------- | --------------------------------------------- |
| `PORT`            | 8787                       | Порт HTTP                                     |
| `DATA_DIR`        | `server/data`              | Каталог с SQLite-базой                        |
| `JWT_SECRET`      | случайный (не для прод!)   | Секрет подписи JWT — обязателен на проде      |
| `ADMIN_EMAIL`     | director@leaderaudit.uz    | Email админа (сидится при первом старте)      |
| `ADMIN_PASSWORD`  | leader001uz                | Пароль админа (сидится при первом старте)     |
| `CORS_ORIGIN`     | * (любой)                  | Разрешённые Origin через запятую              |
| `DEPLOY_HOOK_URL` | —                          | Vercel Deploy Hook — дергается автоматически через ~3 мин после последнего изменения статей |

## Telegram-бот уведомлений о заявках (`telegram-bot/bot.py`)

Python 3 (только stdlib). Следит за таблицей `leads` и шлёт каждую новую заявку в группу.

```bash
cd server/telegram-bot
set -a; source .env; set +a   # TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID
python3 bot.py
```

Как получить `TELEGRAM_CHAT_ID`: добавить бота в группу, написать в ней любое
сообщение, затем `curl https://api.telegram.org/bot<TOKEN>/getUpdates` — ID чата
будет в `message.chat.id` (у групп он отрицательный). При первом запуске бот
запоминает текущий максимум заявок и рассылает только новые. На VPS запускать
вторым systemd-юнитом рядом с сервером.

## Деплой на VPS (Contabo) — план

1. Node 20+, `rsync` каталога `server/` на VPS, `npm ci --omit=dev`.
2. systemd-юнит с env-переменными (обязательно `JWT_SECRET`, `CORS_ORIGIN=https://leaderaudit.uz`).
3. Nginx/Caddy reverse-proxy c HTTPS на домен вида `api.leaderaudit.uz`.
4. В Vercel: env `VITE_API_URL=https://api.leaderaudit.uz`, `CONTENT_API_URL=https://api.leaderaudit.uz`.
5. В `vercel.json` добавить `https://api.leaderaudit.uz` в CSP `connect-src`.
6. Создать Deploy Hook в Vercel и прописать его в `DEPLOY_HOOK_URL` на VPS.
