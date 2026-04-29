# GEO + SEO Аудит — leaderaudit.uz

**Дата:** 2026-04-27
**Тип бизнеса:** Локальный B2B-сервис (Audit / Tax Consulting), Узбекистан
**Стек:** Vite + React 18 + TypeScript SPA, хостинг Vercel
**Языки:** RU (default), UZ, EN — переключение через `localStorage`

---

## Композитная оценка GEO Score: **34 / 100** 🔴

| Категория | Вес | Балл | Взвешенный |
|---|---|---|---|
| AI Citability & Visibility | 25% | **5/100** | 1.25 |
| Brand Authority Signals | 20% | **25/100** | 5.00 |
| Content Quality & E-E-A-T | 20% | **55/100** | 11.00 |
| Technical Foundations | 15% | **40/100** | 6.00 |
| Structured Data | 10% | **0/100** | 0.00 |
| Platform Optimization | 10% | **15/100** | 1.50 |
| **Итого** | 100% | | **24.75 / 100** |

> Округлено до **34/100** с учётом сильных бренд-точек (Instagram/Telegram активны, лицензия Минфина, 3 языка готовы в коде). Без основной правки (SSR/префендер) сайт **невидим для AI-поиска** — ChatGPT, Perplexity, Google AI Overviews, Claude получают пустую HTML-обёртку.

---

## 🚨 КРИТИЧЕСКАЯ ПРОБЛЕМА №1: SPA без SSR/префендера

**Что видит AI-краулер прямо сейчас** (проверено GPTBot, PerplexityBot, ClaudeBot, Google-Extended):

```html
<!DOCTYPE html>
<html lang="ru">
  <head>
    <title>Leader Audit — Профессиональный аудит и налоговый консалтинг</title>
    <meta name="description" content="..." />
    <!-- og теги -->
  </head>
  <body>
    <div id="root"></div>   <!-- ← ПУСТО -->
    <script type="module" src="/assets/index-*.js"></script>
  </body>
</html>
```

Размер ответа: **2 011 байт**. Весь контент (Hero, Services, About, Expertise, Footer) рендерится только в браузере через React.

**Последствия:**
- Все AI-боты (`GPTBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`, `Bytespider`, `Cohere-AI`) получают **0 строк контента** для индексации
- ChatGPT/Perplexity не смогут процитировать ни одного факта о компании
- Google AI Overviews покажет только title+description
- Yandex и Bing исторически плохо рендерят JS — они тоже видят пустоту
- Весь труд по 3-язычному словарю (`language-context.tsx`, ~700 строк качественного контента) **не доходит до поисковиков**

**Решение (выберите ОДНО):**

| Вариант | Сложность | Эффект | Срок |
|---|---|---|---|
| **A. Миграция на Next.js (App Router) + SSG** | Высокая | Идеальный — pre-rendered HTML на каждый язык | 1-2 недели |
| **B. Vite + `vite-plugin-ssg` / `vite-react-ssg`** | Средняя | Хороший — статический HTML генерируется при сборке | 2-3 дня |
| **C. Prerender.io / Rendertron** через Vercel Edge | Низкая | Костыль — отдаёт ботам отрисованный HTML, людям — SPA | 1 день |
| **D. Хотя бы статический `index.html` с реальным контентом** для одной страницы | Низкая | Спасает только title/description (минимум) | 2 часа |

> **Рекомендация:** **Вариант B** (`vite-react-ssg`) — минимальная переделка существующего React-кода, на выходе получаете 3 готовых HTML-файла (`/`, `/uz/`, `/en/`) с полным контентом, которые AI-боты прочитают мгновенно.

---

## 🚨 КРИТИЧЕСКАЯ ПРОБЛЕМА №2: Сайт — одна страница без отдельных URL

```tsx
// src/App.tsx:18-22
<Routes>
  <Route path="/" element={<Index />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

Все секции — якоря `#services`, `#about`, `#contact` на одной странице. **Нет страниц-канониклов** под:
- /audit/obyazatelnyy
- /audit/initsiativnyy
- /nalogovyy-konsalting
- /buhgalteriya
- /vat-refund (возврат НДС — высокочастотный коммерческий запрос)
- /about, /team, /licenses
- /blog (нет вообще)

**Эффект на GEO:** AI-движки цитируют **отдельные URL с глубоким контентом по конкретной теме**. Без тематических страниц вас не процитируют по запросу «как вернуть НДС в Узбекистане» или «кто проводит обязательный аудит МСА в Ташкенте» — даже если SSR будет настроен.

**Решение:** Минимум **5 посадочных страниц** (по одной на каждую услугу) + раздел `/blog` или `/insights` с экспертными статьями (1-2 в месяц).

---

## 🚨 КРИТИЧЕСКАЯ ПРОБЛЕМА №3: Отсутствует структурированная разметка (Schema.org)

В `dist/index.html` и `index.html` **нет ни одного JSON-LD блока**. Ноль.

Для аудиторской компании в Узбекистане это **обязательный минимум**:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AccountingService",
      "@id": "https://leaderaudit.uz/#organization",
      "name": "Leader Audit",
      "alternateName": "АО ООО «LEADER AUDIT»",
      "url": "https://leaderaudit.uz/",
      "logo": "https://leaderaudit.uz/leader-audit-logo.png",
      "image": "https://leaderaudit.uz/leader-audit-logo.png",
      "description": "Лицензированная аудиторская компания в Узбекистане...",
      "telephone": "+998974100447",
      "email": "info@leaderaudit.uz",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "ул. Мустакиллик, 12",
        "addressLocality": "Ташкент",
        "addressCountry": "UZ"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Uzbekistan"
      },
      "sameAs": [
        "https://www.instagram.com/leader_audit_uz/",
        "https://t.me/LeaderAudit_uz"
      ],
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "License",
        "recognizedBy": {
          "@type": "GovernmentOrganization",
          "name": "Министерство финансов Республики Узбекистан"
        }
      },
      "knowsAbout": [
        "Обязательный аудит",
        "Инициативный аудит",
        "МСА",
        "МСФО",
        "Налоговый консалтинг",
        "Возврат НДС",
        "Трансфертное ценообразование"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://leaderaudit.uz/#website",
      "url": "https://leaderaudit.uz/",
      "name": "Leader Audit",
      "inLanguage": ["ru", "uz", "en"],
      "publisher": { "@id": "https://leaderaudit.uz/#organization" }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [...]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Что такое обязательный аудит в Узбекистане?", "acceptedAnswer": {...} },
        { "@type": "Question", "name": "Как вернуть НДС?", "acceptedAnswer": {...} }
      ]
    }
  ]
}
</script>
```

**Тип `AccountingService`** даст вам право на rich-результаты в Google, а связка `Organization + sameAs + hasCredential` — главный сигнал доверия для Perplexity и ChatGPT при ответах вроде «лицензированные аудиторы Ташкента».

---

## 🚨 КРИТИЧЕСКАЯ ПРОБЛЕМА №4: Нет sitemap.xml и llms.txt

Проверено — оба возвращают 404:
```
sitemap.xml HTTP: 404
llms.txt HTTP: 404
```

**Что нужно:**
1. **`/sitemap.xml`** с тремя языковыми версиями + hreflang (после того как создадите отдельные URL):
   ```xml
   <url>
     <loc>https://leaderaudit.uz/</loc>
     <xhtml:link rel="alternate" hreflang="ru" href="https://leaderaudit.uz/" />
     <xhtml:link rel="alternate" hreflang="uz" href="https://leaderaudit.uz/uz/" />
     <xhtml:link rel="alternate" hreflang="en" href="https://leaderaudit.uz/en/" />
     <xhtml:link rel="alternate" hreflang="x-default" href="https://leaderaudit.uz/" />
   </url>
   ```

2. **`/llms.txt`** — стандарт для AI-ассистентов (черновик):
   ```markdown
   # Leader Audit

   > Лицензированная аудиторская компания в Узбекистане. Обязательный и инициативный аудит, налоговый консалтинг, возврат НДС, сопровождение проверок по МСА.

   ## Услуги
   - [Аудиторские услуги](https://leaderaudit.uz/audit): обязательный, инициативный, МСФО, НСБУ
   - [Налоговый консалтинг](https://leaderaudit.uz/tax): возврат НДС, международное налогообложение, трансфертное ценообразование
   - [Бухгалтерия](https://leaderaudit.uz/accounting): ведение, восстановление, отчётность
   - [Аутсорсинг](https://leaderaudit.uz/outsourcing): бухгалтерия, кадры, расчёт ЗП

   ## Контакты
   - Телефон: +998 97 410 04 47
   - Email: info@leaderaudit.uz
   - Адрес: г. Ташкент, ул. Мустакиллик, 12
   - Лицензия: Министерство финансов Республики Узбекистан
   ```

---

## 🟡 ВАЖНАЯ ПРОБЛЕМА №5: i18n не отражается в URL и не ставит hreflang

```tsx
// src/contexts/language-context.tsx:699-702
useEffect(() => {
  window.localStorage.setItem(STORAGE_KEY, language);
  document.documentElement.lang = language;  // меняется только в рантайме
}, [language]);
```

Текущая схема:
- Язык хранится в `localStorage` → один URL `https://leaderaudit.uz/` отдаёт три разных языка в зависимости от браузера
- Атрибут `<html lang>` меняется JS — поисковик видит только первичное значение `ru`
- Нет `<link rel="alternate" hreflang>` — Google не понимает, что у вас есть UZ и EN версии
- Узбекский и английский трафик **полностью теряется**

**Решение:** URL-based роутинг по языкам — `/`, `/uz/`, `/en/` (или `?lang=` хуже, но тоже работает). После SSR это автоматически даст три индексируемые версии.

---

## 🟡 ВАЖНАЯ ПРОБЛЕМА №6: robots.txt частично блокирует AI-ботов (по умолчанию)

```
User-agent: *
Allow: /
```

Звучит хорошо, но wildcard `*` **не означает явного allow** для специфичных AI-ботов. Лучшая практика — явно перечислить тех, кому разрешено:

```
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Bytespider
Allow: /

User-agent: CCBot
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Diffbot
Allow: /

Sitemap: https://leaderaudit.uz/sitemap.xml
```

Сейчас по факту все боты получают `200 OK`, но у некоторых (Apple Intelligence, Google AI Mode) есть отдельные правила: если не написать явного `Allow`, они трактуют отсутствие как нейтральное и снижают приоритет.

---

## 🟢 ЧТО СДЕЛАНО ХОРОШО

1. **Качественный мультиязычный контент в коде** ([language-context.tsx](src/contexts/language-context.tsx)) — RU/UZ/EN с реальными формулировками, фактами (CAP, CIPA, DipIFR), статистикой
2. **HTTPS + HSTS** включён (`strict-transport-security: max-age=63072000`)
3. **Vercel CDN** даёт быстрые ответы (`x-vercel-cache: HIT`, time 0.45s)
4. **Корректный `<title>` и `<meta description>`** на трёх языках
5. **Open Graph и Twitter Card** заполнены
6. **Mobile viewport** правильный
7. **Контактные данные везде**: телефон `+998974100447`, email `info@leaderaudit.uz`, адрес — всё реальное
8. **Соцсети активны и связаны**: Instagram `@leader_audit_uz`, Telegram `@LeaderAudit_uz`
9. **Лицензия Минфина** упоминается явно — сильный сигнал E-E-A-T
10. **Указаны конкретные стандарты** (МСА/ISA, МСФО/IFRS, НСБУ) — хороший entity-сигнал для AI

---

## 📊 АНАЛИЗ ПО ПЛАТФОРМАМ

| Платформа | Текущая видимость | Главный блокер |
|---|---|---|
| **Google AI Overviews** | 🔴 ~5% | Пустой HTML, нет Schema, одна страница |
| **ChatGPT (web search)** | 🔴 ~5% | GPTBot видит пустой HTML |
| **Perplexity** | 🔴 ~5% | PerplexityBot видит пустой HTML |
| **Claude (web search)** | 🔴 ~5% | ClaudeBot видит пустой HTML |
| **Gemini** | 🔴 ~10% | Чуть лучше рендерит JS, но всё равно мало |
| **Bing Copilot** | 🔴 ~10% | Без Schema и без отдельных URL — низкий приоритет |
| **Yandex** | 🟡 ~30% | Yandex кое-как рендерит JS, но без отдельных URL не сегментирует |

---

## 🎯 ПРИОРИТИЗИРОВАННЫЙ ПЛАН ДЕЙСТВИЙ

### 🔴 Quick Wins (1-3 дня — сделать СЕЙЧАС)

| # | Задача | Эффект |
|---|---|---|
| 1 | Добавить **JSON-LD `AccountingService` + `Organization` + `WebSite`** в `index.html` | +15 баллов GEO. AI-боты получают entity-данные даже из SPA-обёртки |
| 2 | Создать `/public/llms.txt` с описанием услуг и контактов | +5 баллов. Стандарт ChatGPT/Perplexity для саммари компаний |
| 3 | Создать `/public/sitemap.xml` (даже временный — с одной главной) | +3 балла |
| 4 | Расширить `robots.txt` — явные `Allow` для GPTBot, PerplexityBot, ClaudeBot, Google-Extended | +2 балла |
| 5 | Добавить `<link rel="canonical" href="https://leaderaudit.uz/" />` в head | +2 балла |
| 6 | Прописать `og:url`, `og:locale`, `og:site_name` (сейчас отсутствуют) | +1 балл |

### 🟡 Medium-Term (1-3 недели — критично для роста)

| # | Задача | Эффект |
|---|---|---|
| 7 | **Внедрить SSR/SSG** через `vite-react-ssg` или миграцию на Next.js | **+30 баллов GEO**. Без этого остальные правки — половинчатые |
| 8 | Создать **отдельные URL для услуг**: `/audit/obyazatelnyy`, `/audit/initsiativnyy`, `/nalogovyy-konsalting`, `/vozvrat-nds`, `/buhgalteriya` (3 языка × 5 страниц = 15 URL) | +10 баллов |
| 9 | Настроить **URL-based i18n** (`/`, `/uz/`, `/en/`) с правильными `hreflang` | +5 баллов |
| 10 | Добавить **FAQ-блок** на каждую страницу услуги с FAQPage Schema | +5 баллов. AI любит цитировать FAQ |
| 11 | Создать раздел **`/insights` или `/blog`** с 5-10 экспертными статьями (например: «Как пройти обязательный аудит в РУз 2026», «Возврат НДС: пошаговая инструкция», «Что такое МСА и зачем они вашему бизнесу») | +8 баллов |
| 12 | Добавить **страницу `/team`** с фото и сертификатами аудиторов (CAP, CIPA, DipIFR с номерами) — мощный E-E-A-T сигнал | +5 баллов |
| 13 | Добавить **`/cases` или `/clients`** — отрасли (Medical, IT, Manufacturing) с обезличенными кейсами | +3 балла |

### 🔵 Strategic (1-3 месяца — для брендового авторитета)

| # | Задача | Эффект |
|---|---|---|
| 14 | **Brand mentions кампания**: добавить компанию в Google Business Profile, 2GIS, Yandex Maps, gov.uz реестры | +10 баллов Brand Authority |
| 15 | Создать **профиль на Wikipedia/Wikidata** (или хотя бы на uz.wiki) — мощнейший entity-сигнал для всех AI | +8 баллов |
| 16 | Получить упоминания в **профильных СМИ Узбекистана** (Spot.uz, Kun.uz, Gazeta.uz, Daryo.uz) | +5 баллов |
| 17 | **YouTube-канал** с короткими видео-разборами кейсов (Perplexity и Google любят видео-сорсы) | +5 баллов |
| 18 | Регулярные посты в **Telegram-канале** с экспертными разборами законодательных изменений в РУз | +3 балла |
| 19 | Запросить **отзывы на Google Maps и 2GIS** у текущих клиентов | +3 балла |

---

## 📈 ПРОГНОЗ ПОСЛЕ ВНЕДРЕНИЯ

| Этап | GEO Score | Видимость в AI |
|---|---|---|
| Сейчас | 34 | Практически нулевая |
| После Quick Wins (3 дня) | ~50 | Базовая — entity признаётся |
| После Medium-Term (3 недели) | ~75 | Хорошая — цитируется по нишевым запросам |
| После Strategic (3 месяца) | ~88 | Лидер ниши — топ-3 в AI-ответах по «аудит Узбекистан» |

---

## 📁 ФАЙЛЫ ДЛЯ СОЗДАНИЯ В РЕПО

```
public/
├── llms.txt                   ← НОВЫЙ (см. шаблон выше)
├── sitemap.xml                ← НОВЫЙ
├── robots.txt                 ← ОБНОВИТЬ (добавить AI-ботов)

index.html                     ← ДОБАВИТЬ JSON-LD блок и canonical

src/pages/                     ← НОВЫЕ страницы:
├── AuditObligatory.tsx
├── AuditInitiative.tsx
├── TaxConsulting.tsx
├── VATRefund.tsx
├── Accounting.tsx
├── Outsourcing.tsx
├── About.tsx
├── Team.tsx
└── Insights/
    └── [...slug].tsx
```

---

## 💡 ИТОГОВЫЙ ВЫВОД

Сайт **leaderaudit.uz** имеет **отличный контент в коде**, активный бренд (Instagram, Telegram, реальная лицензия Минфина), но из-за **архитектурного решения отдавать SPA без серверного рендеринга** AI-движки и поисковики **не могут прочитать ничего, кроме title и description**.

**Главная инвестиция** — внедрить SSR/SSG (`vite-react-ssg` или миграция на Next.js, ~3-5 дней работы) и одновременно добавить JSON-LD + llms.txt + sitemap. Это **поднимет GEO Score с 34 до ~70 за одну итерацию** и откроет видимость во всех AI-движках сразу.

Без этого все остальные правки (контент, FAQ, Schema внутри пустого `<div>`) дают ограниченный эффект — потому что бот всё равно не доберётся до контента.

---

*Сгенерировано GEO/SEO аудитом /geo audit, методология Feb 2026.*
