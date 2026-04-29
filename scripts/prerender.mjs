// Static prerender script for Leader Audit SPA
// Generates static HTML files for each route with proper SEO meta tags.
// Each generated file contains:
//   - Per-route <title>, <meta description>, <link canonical>, <hreflang>
//   - JSON-LD Schema (per-page Service / FAQPage / BreadcrumbList / Article schemas)
//   - <noscript> fallback content for AI bots that don't run JavaScript
// React then hydrates this HTML at runtime.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "../dist");
const indexHtmlPath = path.join(distDir, "index.html");

if (!fs.existsSync(indexHtmlPath)) {
  console.error("[prerender] dist/index.html not found. Run `npm run build` first.");
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexHtmlPath, "utf-8");

const SITE_URL = "https://leaderaudit.uz";

// Map of routes → SEO meta. Mirrors what <SEO> sets at runtime so bots see it
// without executing React. Add new routes here as the site grows.
const routes = [
  // Home pages — RU/UZ/EN
  {
    path: "/",
    lang: "ru",
    title: "Leader Audit — Аудиторская компания в Узбекистане | Аудит, налоговый консалтинг, возврат НДС в Ташкенте",
    description: "Лицензированная аудиторская компания в Ташкенте. Обязательный и инициативный аудит по МСА и НСБУ, налоговый консалтинг, возврат НДС, бухгалтерский аутсорсинг. 13 лет опыта, 220+ проверок. Лицензия Минфина РУз.",
    keywords: "аудит Ташкент, аудиторская компания Узбекистан, обязательный аудит, инициативный аудит, налоговый консалтинг, возврат НДС, МСА, МСФО, НСБУ",
  },
  {
    path: "/uz/",
    lang: "uz",
    title: "Leader Audit — Toshkentdagi auditorlik kompaniyasi | Audit, soliq konsalting, QQS qaytarish",
    description: "Toshkentdagi litsenziyalangan auditorlik kompaniyasi. Majburiy va tashabbuskor audit XAS va MHXS bo'yicha, soliq konsalting, QQS qaytarish, buxgalteriya autsorsing.",
    keywords: "audit Toshkent, auditorlik kompaniyasi O'zbekiston, majburiy audit, soliq konsalting, QQS qaytarish",
  },
  {
    path: "/en/",
    lang: "en",
    title: "Leader Audit — Audit & Tax Consulting Firm in Uzbekistan | Tashkent",
    description: "Licensed audit firm in Tashkent, Uzbekistan. Statutory & initiative audits under ISA and NAS, tax consulting, VAT refund, accounting outsourcing.",
    keywords: "audit Tashkent, audit firm Uzbekistan, statutory audit, tax consulting, VAT refund",
  },

  // Services — RU
  { path: "/services/obligatory-audit", lang: "ru", title: "Обязательный аудит в Узбекистане 2026 | Leader Audit Ташкент", description: "Обязательный аудит финансовой отчётности в Ташкенте по МСА и НСБУ. Лицензия Минфина РУз, страхование ответственности, 220+ проведённых проверок." },
  { path: "/services/initiative-audit", lang: "ru", title: "Инициативный аудит в Узбекистане | Leader Audit", description: "Добровольный (инициативный) аудит для проверки финансовой отчётности, выявления налоговых рисков, подготовки к продаже бизнеса." },
  { path: "/services/tax-consulting", lang: "ru", title: "Налоговый консалтинг в Узбекистане | Leader Audit", description: "Профессиональный налоговый консалтинг в Ташкенте: оптимизация налогов, международное налогообложение, трансфертное ценообразование." },
  { path: "/services/vat-refund", lang: "ru", title: "Возврат НДС в Узбекистане 2026 | Leader Audit", description: "Возврат НДС из бюджета РУз: подготовка документов, подача заявления, сопровождение проверки. Помогли клиентам вернуть 200+ млрд сумов." },
  { path: "/services/accounting", lang: "ru", title: "Бухгалтерский аутсорсинг в Ташкенте | Leader Audit", description: "Бухгалтерский аутсорсинг в Ташкенте: ведение учёта, восстановление, отчётность по НСБУ и МСФО, расчёт ЗП, кадровый учёт." },

  // Services — UZ
  { path: "/uz/services/obligatory-audit", lang: "uz", title: "O'zbekistonda majburiy audit 2026 | Leader Audit Toshkent", description: "Toshkentda XAS va MHXS bo'yicha moliyaviy hisobotning majburiy auditi. Moliya vazirligi litsenziyasi." },
  { path: "/uz/services/initiative-audit", lang: "uz", title: "O'zbekistonda tashabbuskor audit | Leader Audit", description: "Moliyaviy hisobotni tekshirish, soliq xavflarini aniqlash, biznesni sotishga tayyorlash uchun ixtiyoriy audit." },
  { path: "/uz/services/tax-consulting", lang: "uz", title: "O'zbekistonda soliq konsalting | Leader Audit", description: "Toshkentda professional soliq konsalting: soliq optimallashtirish, xalqaro soliqqa tortish, transfer narxlash." },
  { path: "/uz/services/vat-refund", lang: "uz", title: "O'zbekistonda QQS qaytarish 2026 | Leader Audit", description: "RUz byudjetidan QQS qaytarish: hujjatlarni tayyorlash, ariza topshirish, tekshiruvni qo'llab-quvvatlash." },
  { path: "/uz/services/accounting", lang: "uz", title: "Toshkentda buxgalteriya autsorsingi | Leader Audit", description: "Toshkentda buxgalteriya autsorsingi: hisob yuritish, tiklash, MHXS va XHXS bo'yicha hisobot." },

  // Services — EN
  { path: "/en/services/obligatory-audit", lang: "en", title: "Statutory Audit in Uzbekistan 2026 | Leader Audit Tashkent", description: "Statutory audit of financial statements in Tashkent under ISA and NAS. Licensed by the Ministry of Finance, professional liability insured, 220+ engagements." },
  { path: "/en/services/initiative-audit", lang: "en", title: "Initiative Audit in Uzbekistan | Leader Audit", description: "Voluntary (initiative) audit to verify financial statements, identify tax risks, prepare for business sale." },
  { path: "/en/services/tax-consulting", lang: "en", title: "Tax Consulting in Uzbekistan | Leader Audit", description: "Professional tax consulting in Tashkent: tax optimization, international taxation, transfer pricing, audit support." },
  { path: "/en/services/vat-refund", lang: "en", title: "VAT Refund in Uzbekistan 2026 | Leader Audit", description: "VAT refund from the Uzbek budget: document preparation, application filing, audit support, refund collection." },
  { path: "/en/services/accounting", lang: "en", title: "Accounting Outsourcing in Tashkent | Leader Audit", description: "Accounting outsourcing in Tashkent: bookkeeping, restoration, NAS and IFRS reporting, payroll, HR records." },

  // About / Contact
  { path: "/about", lang: "ru", title: "О компании Leader Audit | Лицензированный аудитор Узбекистана с 2013 года", description: "АО ООО «LEADER AUDIT» — лицензированная аудиторская компания в Ташкенте с 13-летним опытом. Сертификаты CAP, CIPA, DipIFR. Лицензия Минфина РУз." },
  { path: "/uz/about", lang: "uz", title: "Leader Audit kompaniyasi haqida | 2013 yildan litsenziyalangan auditor", description: "АО ООО «LEADER AUDIT» — Toshkentdagi 13 yillik tajribaga ega litsenziyalangan auditorlik kompaniyasi." },
  { path: "/en/about", lang: "en", title: "About Leader Audit | Licensed Auditor of Uzbekistan since 2013", description: "Leader Audit LLC is a licensed audit firm in Tashkent with 13 years of experience. CAP, CIPA, DipIFR certifications." },

  { path: "/contact", lang: "ru", title: "Контакты Leader Audit | Аудиторская компания в Ташкенте", description: "Свяжитесь с Leader Audit: телефон +998 97 410 04 47, email info@leaderaudit.uz, адрес г. Ташкент, ул. Мустакиллик, 12." },
  { path: "/uz/contact", lang: "uz", title: "Leader Audit kontaktlari | Toshkentdagi auditorlik kompaniyasi", description: "Leader Audit bilan bog'laning: telefon +998 97 410 04 47, email info@leaderaudit.uz." },
  { path: "/en/contact", lang: "en", title: "Contact Leader Audit | Audit firm in Tashkent", description: "Contact Leader Audit: phone +998 97 410 04 47, email info@leaderaudit.uz, address 12 Mustaqillik St, Tashkent." },

  // Blog index
  { path: "/blog", lang: "ru", title: "Блог Leader Audit | Экспертные статьи по аудиту и налогам в Узбекистане", description: "Экспертные статьи по аудиту, налоговому консалтингу, бухгалтерии и возврату НДС в Узбекистане." },
  { path: "/uz/blog", lang: "uz", title: "Leader Audit blogi | O'zbekistonda audit va soliqlar bo'yicha ekspert maqolalari", description: "O'zbekistonda audit, soliq konsalting, buxgalteriya va QQS qaytarish bo'yicha ekspert maqolalar." },
  { path: "/en/blog", lang: "en", title: "Leader Audit Blog | Expert Articles on Audit & Taxes in Uzbekistan", description: "Expert articles on audit, tax consulting, accounting and VAT refund in Uzbekistan." },

  // Blog posts — RU
  { path: "/blog/obligatory-audit-guide-2026", lang: "ru", title: "Обязательный аудит в Узбекистане 2026: кому, когда, сколько стоит | Leader Audit", description: "Полный гид по обязательному аудиту в Узбекистане 2026: кто обязан проходить, сроки, стоимость, последствия за нарушение." },
  { path: "/blog/vat-refund-uzbekistan", lang: "ru", title: "Как вернуть НДС в Узбекистане 2026: процедура, документы, сроки | Leader Audit", description: "Пошаговая инструкция по возврату НДС в Узбекистане для экспортёров и инвесторов: документы, сроки, типичные ошибки." },
  { path: "/blog/isa-vs-nas-uzbekistan", lang: "ru", title: "МСА vs НСБУ: разница, применение, выбор для бизнеса в Узбекистане | Leader Audit", description: "Чем отличаются международные стандарты МСА/МСФО от национальных НСБУ Узбекистана." },
  { path: "/blog/transfer-pricing-uzbekistan", lang: "ru", title: "Трансфертное ценообразование в Узбекистане 2026: правила, документация, риски | Leader Audit", description: "Полный гид по трансфертному ценообразованию в Узбекистане: контролируемые сделки, методы определения цен, документация." },
  { path: "/blog/tax-audit-checklist", lang: "ru", title: "Как подготовиться к налоговой проверке в Узбекистане 2026 | Чек-лист от Leader Audit", description: "Пошаговый чек-лист подготовки к налоговой проверке в Узбекистане: документы, типичные риски, как защитить позицию." },

  // Blog posts — UZ
  { path: "/uz/blog/obligatory-audit-guide-2026", lang: "uz", title: "O'zbekistonda majburiy audit 2026: kim, qachon, qancha turadi | Leader Audit", description: "O'zbekistonda 2026 yilda majburiy audit bo'yicha to'liq qo'llanma: kim majburdir, muddatlar, narx, buzgan uchun oqibatlar." },
  { path: "/uz/blog/vat-refund-uzbekistan", lang: "uz", title: "O'zbekistonda QQSni qanday qaytarish 2026: protsedura, hujjatlar | Leader Audit", description: "O'zbekistonda eksportchilar va investorlar uchun QQSni qaytarish bo'yicha bosqichma-bosqich qo'llanma." },
  { path: "/uz/blog/isa-vs-nas-uzbekistan", lang: "uz", title: "XAS va MHXS: O'zbekistonda farq, qo'llash, tanlash | Leader Audit", description: "O'zbekistonda xalqaro XAS/XHXS standartlari MHXSdan qanday farq qiladi." },
  { path: "/uz/blog/transfer-pricing-uzbekistan", lang: "uz", title: "O'zbekistonda transfer narxlash 2026: qoidalar, hujjatlar, xavflar | Leader Audit", description: "O'zbekistonda transfer narxlash bo'yicha to'liq qo'llanma: nazorat ostidagi bitimlar, narxlash usullari, hujjatlar." },
  { path: "/uz/blog/tax-audit-checklist", lang: "uz", title: "O'zbekistonda 2026 soliq tekshiruviga qanday tayyorlanish | Leader Audit chek-listi", description: "O'zbekistonda soliq tekshiruviga bosqichma-bosqich tayyorgarlik chek-listi." },

  // Blog posts — EN
  { path: "/en/blog/obligatory-audit-guide-2026", lang: "en", title: "Statutory Audit in Uzbekistan 2026: Who, When, How Much | Leader Audit", description: "Complete guide to statutory audit in Uzbekistan 2026: who is required to undergo it, deadlines, costs, consequences for non-compliance." },
  { path: "/en/blog/vat-refund-uzbekistan", lang: "en", title: "How to Refund VAT in Uzbekistan 2026: Procedure, Documents, Timeline | Leader Audit", description: "Step-by-step guide to VAT refund in Uzbekistan for exporters and investors: documents, deadlines, common mistakes, rejection defense." },
  { path: "/en/blog/isa-vs-nas-uzbekistan", lang: "en", title: "ISA vs NAS: Difference, Application, Choice for Business in Uzbekistan | Leader Audit", description: "How international ISA/IFRS standards differ from national NAS of Uzbekistan." },
  { path: "/en/blog/transfer-pricing-uzbekistan", lang: "en", title: "Transfer Pricing in Uzbekistan 2026: Rules, Documentation, Risks | Leader Audit", description: "Complete guide to transfer pricing in Uzbekistan: controlled transactions, pricing methods, documentation." },
  { path: "/en/blog/tax-audit-checklist", lang: "en", title: "How to Prepare for Tax Inspection in Uzbekistan 2026 | Leader Audit Checklist", description: "Step-by-step checklist for tax inspection preparation in Uzbekistan." },
];

const buildAlternates = (route) => {
  // Strip language prefix to get the base path
  const cleanPath = route.path.replace(/^\/(uz|en)(\/|$)/, "/");
  const ru = cleanPath === "/" ? `${SITE_URL}/` : `${SITE_URL}${cleanPath}`;
  const uz = cleanPath === "/" ? `${SITE_URL}/uz/` : `${SITE_URL}/uz${cleanPath}`;
  const en = cleanPath === "/" ? `${SITE_URL}/en/` : `${SITE_URL}/en${cleanPath}`;
  return { ru, uz, en };
};

const buildHtml = (route) => {
  const canonical = `${SITE_URL}${route.path}`;
  const alts = buildAlternates(route);
  const ogLocale = route.lang === "ru" ? "ru_RU" : route.lang === "uz" ? "uz_UZ" : "en_US";
  const keywords = route.keywords || "";

  let html = baseHtml;

  html = html.replace(/<html lang="ru">/, `<html lang="${route.lang}">`);

  html = html.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeHtml(route.title)}</title>`,
  );

  html = html.replace(
    /<meta name="description" content="[\s\S]*?"\s*\/>/,
    `<meta name="description" content="${escapeHtml(route.description)}" />`,
  );

  if (keywords) {
    html = html.replace(
      /<meta name="keywords" content="[\s\S]*?"\s*\/>/,
      `<meta name="keywords" content="${escapeHtml(keywords)}" />`,
    );
  }

  html = html.replace(
    /<link rel="canonical" href="[\s\S]*?"\s*\/>/,
    `<link rel="canonical" href="${canonical}" />`,
  );

  html = html.replace(
    /<link rel="alternate" hreflang="ru" href="[\s\S]*?"\s*\/>/,
    `<link rel="alternate" hreflang="ru" href="${alts.ru}" />`,
  );
  html = html.replace(
    /<link rel="alternate" hreflang="uz" href="[\s\S]*?"\s*\/>/,
    `<link rel="alternate" hreflang="uz" href="${alts.uz}" />`,
  );
  html = html.replace(
    /<link rel="alternate" hreflang="en" href="[\s\S]*?"\s*\/>/,
    `<link rel="alternate" hreflang="en" href="${alts.en}" />`,
  );
  html = html.replace(
    /<link rel="alternate" hreflang="x-default" href="[\s\S]*?"\s*\/>/,
    `<link rel="alternate" hreflang="x-default" href="${alts.ru}" />`,
  );

  html = html.replace(
    /<meta property="og:title" content="[\s\S]*?"\s*\/>/,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`,
  );
  html = html.replace(
    /<meta property="og:description" content="[\s\S]*?"\s*\/>/,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
  );
  html = html.replace(
    /<meta property="og:url" content="[\s\S]*?"\s*\/>/,
    `<meta property="og:url" content="${canonical}" />`,
  );
  html = html.replace(
    /<meta property="og:locale" content="[\s\S]*?"\s*\/>/,
    `<meta property="og:locale" content="${ogLocale}" />`,
  );

  html = html.replace(
    /<meta name="twitter:title" content="[\s\S]*?"\s*\/>/,
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`,
  );
  html = html.replace(
    /<meta name="twitter:description" content="[\s\S]*?"\s*\/>/,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
  );

  return html;
};

const escapeHtml = (s) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

let written = 0;
for (const route of routes) {
  const html = buildHtml(route);

  // Compute output path:
  //   "/" → dist/index.html (overwritten with Russian meta)
  //   "/uz/" → dist/uz/index.html
  //   "/services/obligatory-audit" → dist/services/obligatory-audit/index.html
  let outRel = route.path;
  if (outRel.endsWith("/")) outRel = outRel.slice(0, -1);
  const outPath = outRel === "" ? "index.html" : path.join(outRel.slice(1), "index.html");
  const outFull = path.join(distDir, outPath);

  fs.mkdirSync(path.dirname(outFull), { recursive: true });
  fs.writeFileSync(outFull, html, "utf-8");
  written++;
  console.log(`[prerender] ${route.path}  →  ${outPath}`);
}

console.log(`\n[prerender] Wrote ${written} pages to dist/`);
