# Админка leaderaudit.uz — дизайн

Дата: 2026-07-17. Утверждено пользователем в чате.

## Цель

Директор (director@leaderaudit.uz) управляет статьями блога и просматривает заявки с формы сайта. Сайт остаётся статическим (Vite + prerender на Vercel), бэкенд — отдельный Node-сервис, деплой на Contabo VPS (в конце, отдельным шагом).

## Компоненты

### 1. Бэкенд — `server/`

Node.js + Express + SQLite (better-sqlite3), без ORM. Порт 8787 (env `PORT`).

- **Auth**: `POST /api/auth/login` → JWT (24 ч). Пользователь сидится из env
  `ADMIN_EMAIL` / `ADMIN_PASSWORD` (по умолчанию director@leaderaudit.uz / leader001uz),
  в базе хранится bcrypt-хеш.
- **Статьи**: таблица `posts(slug, lang, data JSON, status, updated_at)`, уникальность (slug, lang).
  - `GET /api/posts` (auth) — все статьи для админки
  - `PUT /api/posts/:lang/:slug` (auth) — создать/обновить
  - `DELETE /api/posts/:lang/:slug` (auth)
  - `GET /api/public/posts?lang=` — только published, публичный (для сайта и билд-скриптов)
  - При первом старте база сидится снапшотом текущих статей (`server/seed/blog-posts.json`,
    генерируется из `src/data/blog-posts.ts`).
- **Заявки**: таблица `leads(name, phone, company, lang, page, created_at, status)`.
  - `POST /api/leads` — публичный, с формы сайта
  - `GET /api/leads`, `PATCH /api/leads/:id` (auth) — просмотр/смена статуса (new/processed)
- **Публикация**: `POST /api/publish` (auth) — дергает Vercel Deploy Hook (env `DEPLOY_HOOK_URL`),
  чтобы пересобрать статический сайт с новыми статьями.

### 2. Админка — `/admin` в React-приложении

Lazy-маршруты: `/admin` (логин), `/admin/posts`, `/admin/posts/new`, `/admin/posts/:slug`,
`/admin/leads`. JWT в localStorage, guard-обёртка. Helmet noindex; в sitemap/prerender не входит.
Редактор статьи: три языковые вкладки (ru/uz/en), мета-поля + контент в упрощённом
markdown-синтаксисе (`##`, `###`, `-`, `1.`, `>`), конвертируемом в структуру блоков BlogPost;
FAQ — повторяемые пары вопрос/ответ. Кнопка «Опубликовать сайт» → `/api/publish`.

### 3. Интеграция с сайтом (SEO не ломаем)

- **Форма заявки** (`LeadFormSection`): дополнительно шлёт лид в `POST /api/leads`
  (fire-and-forget; Formspree остаётся как сейчас).
- **Блог на сайте**: хук `useBlogPosts(lang)` — react-query тянет published-статьи из API и
  накладывает поверх статического `blogPosts`; при недоступном API работает как раньше.
  Новые статьи видны сразу, без пересборки.
- **Билд-скрипты** (`scripts/seo-shared.mjs`): если задан env `CONTENT_API_URL`, статьи для
  sitemap/llms.txt/prerender берутся из API поверх TS-файла; при ошибке — молча фолбэк на TS.
- API base на фронте: `VITE_API_URL` (dev-фолбэк `http://localhost:8787`).

## Не входит (деплой-этап, отдельно)

- systemd-юнит + nginx/Caddy на VPS, домен api.leaderaudit.uz, HTTPS
- Добавление API-домена в CSP `connect-src` в vercel.json
- Настройка `DEPLOY_HOOK_URL` и `CONTENT_API_URL`/`VITE_API_URL` в Vercel
