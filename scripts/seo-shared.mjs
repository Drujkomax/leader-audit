// Shared SEO helpers for the static build pipeline (prerender, sitemap, llms.txt).
// Builds the canonical route table, per-route JSON-LD @graph, and per-route no-JS
// <noscript> bodies from the trilingual content in src/data/*.ts. This is what makes
// non-JS AI crawlers (GPTBot, ClaudeBot, PerplexityBot, CCBot) see real, page-specific
// content + schema instead of the homepage boilerplate on every URL.

import { HOME_FAQ } from "./home-faq.mjs";

export const SITE_URL = "https://leaderaudit.uz";
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const LANGS = ["ru", "uz", "en"];

export const escapeHtml = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const locale = (lang) => (lang === "ru" ? "ru-RU" : lang === "uz" ? "uz-UZ" : "en-US");
const ogLocale = (lang) => (lang === "ru" ? "ru_RU" : lang === "uz" ? "uz_UZ" : "en_US");
const prefix = (lang) => (lang === "ru" ? "" : `/${lang}`);

// Localized UI labels for breadcrumbs / no-JS chrome
const L = {
  home: { ru: "Главная", uz: "Bosh sahifa", en: "Home" },
  services: { ru: "Услуги", uz: "Xizmatlar", en: "Services" },
  about: { ru: "О компании", uz: "Kompaniya haqida", en: "About" },
  contact: { ru: "Контакты", uz: "Kontaktlar", en: "Contact" },
  cases: { ru: "Кейсы", uz: "Keyslar", en: "Cases" },
  blog: { ru: "Блог", uz: "Blog", en: "Blog" },
  published: { ru: "Опубликовано", uz: "Chop etilgan", en: "Published" },
  updated: { ru: "Обновлено", uz: "Yangilangan", en: "Updated" },
  readingTime: { ru: "Время чтения", uz: "O'qish vaqti", en: "Reading time" },
  task: { ru: "Задача", uz: "Vazifa", en: "Challenge" },
  approach: { ru: "Решение", uz: "Yechim", en: "Approach" },
  result: { ru: "Результат", uz: "Natija", en: "Outcome" },
  client: { ru: "Клиент", uz: "Mijoz", en: "Client" },
  relatedServices: { ru: "Связанные услуги", uz: "Bog'liq xizmatlar", en: "Related services" },
  allServices: { ru: "Все услуги", uz: "Barcha xizmatlar", en: "All services" },
  contactCta: {
    ru: "Бесплатная консультация: +998 97 410 04 47 · info@leaderaudit.uz · г. Ташкент, ул. Мустакиллик, 12.",
    uz: "Bepul konsultatsiya: +998 97 410 04 47 · info@leaderaudit.uz · Toshkent, Mustaqillik ko'chasi, 12.",
    en: "Free consultation: +998 97 410 04 47 · info@leaderaudit.uz · 12 Mustaqillik St, Tashkent.",
  },
};
const t = (key, lang) => L[key][lang];

// Service slug → localized short name (for cross-links)
const SERVICE_NAMES = {
  "obligatory-audit": { ru: "Обязательный аудит", uz: "Majburiy audit", en: "Statutory audit" },
  "initiative-audit": { ru: "Инициативный аудит", uz: "Tashabbuskor audit", en: "Initiative audit" },
  "tax-consulting": { ru: "Налоговый консалтинг", uz: "Soliq konsalting", en: "Tax consulting" },
  "vat-refund": { ru: "Возврат НДС", uz: "QQS qaytarish", en: "VAT refund" },
  accounting: { ru: "Бухгалтерский аутсорсинг", uz: "Buxgalteriya autsorsing", en: "Accounting outsourcing" },
};

// Localized place names for Service.areaServed (matches the page language)
const AREA = {
  ru: ["Узбекистан", "Ташкент", "Самарканд", "Бухара"],
  uz: ["Oʻzbekiston", "Toshkent", "Samarqand", "Buxoro"],
  en: ["Uzbekistan", "Tashkent", "Samarkand", "Bukhara"],
};

// Localized Organization fields so EN/UZ pages carry English/Uzbek trust & E-E-A-T signals
// (the RU Organization node is read from index.html and cloned/overridden for uz/en).
const ORG_L10N = {
  en: {
    description: "A licensed audit firm in Uzbekistan specializing in statutory and initiative audits under the International Standards on Auditing (ISA), tax consulting, VAT refunds and accounting outsourcing. 13 years on the market, 220+ audit engagements, 200+ billion UZS of VAT refunds assisted.",
    slogan: "Your financial security in an era of total tax control",
    streetAddress: "Mustaqillik St., 12",
    addressLocality: "Tashkent",
    addressRegion: "Tashkent Region",
    country: "Uzbekistan",
    cities: ["Tashkent", "Samarkand", "Bukhara", "Andijan", "Namangan", "Fergana"],
    licenseName: "License to carry out audit activities",
    recognizedBy: "Ministry of Finance of the Republic of Uzbekistan",
    knowsAbout: ["Statutory audit", "Initiative audit", "Audit under ISA (International Standards on Auditing)", "IFRS audit", "NAS audit (Uzbekistan)", "Tax consulting", "VAT refund", "International taxation", "Transfer pricing", "Accounting outsourcing", "Accounting restoration", "Tax optimization", "Tax audit support", "Business setup in Uzbekistan", "Payroll", "HR outsourcing"],
    websiteDescription: "Official website of the audit firm Leader Audit",
    offerCatalogName: "Leader Audit services",
    offers: [
      { name: "Statutory audit", description: "Statutory audit of financial statements required by the legislation of the Republic of Uzbekistan and the International Standards on Auditing (ISA)" },
      { name: "Initiative audit", description: "Voluntary audit to assess a company's financial position and confirm its statements to investors" },
      { name: "Tax consulting", description: "Tax advisory, tax optimization, VAT refund and international taxation" },
      { name: "VAT refund", description: "Full support of the VAT refund procedure from the budget of the Republic of Uzbekistan" },
      { name: "Accounting outsourcing", description: "Full bookkeeping and tax accounting, accounting restoration and preparation of financial statements" },
    ],
  },
  uz: {
    description: "Oʻzbekistondagi litsenziyalangan auditorlik kompaniyasi: XAS xalqaro standartlari boʻyicha majburiy va tashabbusli audit, soliq konsalting, QQS qaytarish va buxgalteriya autsorsingiga ixtisoslashgan. 13 yil bozorda, 220+ auditorlik tekshiruvi, 200+ mlrd soʻm QQS qaytarishga koʻmak.",
    slogan: "Total soliq nazorati davrida moliyaviy xavfsizligingiz",
    streetAddress: "Mustaqillik koʻchasi, 12",
    addressLocality: "Toshkent",
    addressRegion: "Toshkent viloyati",
    country: "Oʻzbekiston",
    cities: ["Toshkent", "Samarqand", "Buxoro", "Andijon", "Namangan", "Fargʻona"],
    licenseName: "Auditorlik faoliyatini amalga oshirish litsenziyasi",
    recognizedBy: "Oʻzbekiston Respublikasi Moliya vazirligi",
    knowsAbout: ["Majburiy audit", "Tashabbusli audit", "XAS boʻyicha audit (Auditning xalqaro standartlari)", "MHXS boʻyicha audit", "NSBU boʻyicha audit (Oʻzbekiston)", "Soliq konsalting", "QQS qaytarish", "Xalqaro soliqqa tortish", "Transfert narxlash", "Buxgalteriya autsorsing", "Hisobni tiklash", "Soliq optimallashtirish", "Soliq tekshiruvlarini qoʻllab-quvvatlash", "Oʻzbekistonda biznes ochish", "Ish haqini hisoblash", "Kadrlar autsorsingi"],
    websiteDescription: "Leader Audit auditorlik kompaniyasining rasmiy sayti",
    offerCatalogName: "Leader Audit xizmatlari",
    offers: [
      { name: "Majburiy audit", description: "Oʻzbekiston Respublikasi qonunchiligi talabiga koʻra va XAS xalqaro standartlari boʻyicha moliyaviy hisobotning majburiy auditi" },
      { name: "Tashabbusli audit", description: "Kompaniyaning moliyaviy holatini baholash va investorlar oldida hisobotni tasdiqlash uchun ixtiyoriy audit" },
      { name: "Soliq konsalting", description: "Soliq boʻyicha maslahat, soliqni optimallashtirish, QQS qaytarish va xalqaro soliqqa tortish" },
      { name: "QQS qaytarish", description: "Oʻzbekiston Respublikasi byudjetidan QQS qaytarish jarayonini toʻliq qoʻllab-quvvatlash" },
      { name: "Buxgalteriya autsorsing", description: "Buxgalteriya va soliq hisobini toʻliq yuritish, hisobni tiklash va moliyaviy hisobotni tayyorlash" },
    ],
  },
};

function localizeOrg(org, lang) {
  const L = ORG_L10N[lang];
  if (!L) return org;
  const clone = JSON.parse(JSON.stringify(org));
  clone.description = L.description;
  clone.slogan = L.slogan;
  if (clone.address) {
    clone.address.streetAddress = L.streetAddress;
    clone.address.addressLocality = L.addressLocality;
    clone.address.addressRegion = L.addressRegion;
  }
  clone.areaServed = [
    { "@type": "Country", name: L.country },
    ...L.cities.map((c) => ({ "@type": "City", name: c })),
  ];
  if (Array.isArray(clone.hasCredential) && clone.hasCredential[0]) {
    clone.hasCredential[0].name = L.licenseName;
    if (clone.hasCredential[0].recognizedBy) clone.hasCredential[0].recognizedBy.name = L.recognizedBy;
  }
  clone.knowsAbout = L.knowsAbout;
  if (clone.hasOfferCatalog && Array.isArray(L.offers)) {
    clone.hasOfferCatalog.name = L.offerCatalogName;
    clone.hasOfferCatalog.itemListElement = L.offers.map((o) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: o.name, description: o.description },
    }));
  }
  return clone;
}

function localizeWebsite(site, lang) {
  const L = ORG_L10N[lang];
  if (!L) return site;
  const clone = JSON.parse(JSON.stringify(site));
  clone.description = L.websiteDescription;
  return clone;
}

// Localized homepage no-JS copy
const HOME = {
  ru: {
    h1: "Leader Audit — аудиторская компания в Ташкенте",
    intro: "Лицензированная аудиторская компания в Узбекистане. Обязательный и инициативный аудит по международным стандартам МСА и национальным НСБУ, налоговый консалтинг, возврат НДС и бухгалтерский аутсорсинг. 13 лет на рынке, 220+ проведённых проверок, лицензия Министерства финансов РУз.",
    servicesHeading: "Услуги",
    factsHeading: "Leader Audit в цифрах",
    facts: ["13 лет на рынке (с 2013 года)", "220+ проведённых аудиторских проверок", "200+ млрд сумов содействия в возврате НДС", "Сертификаты CAP, CIPA, DipIFR (ACCA)", "Профессиональная ответственность застрахована"],
    faqHeading: "Частые вопросы",
    more: "Блог · Кейсы · О компании · Контакты",
  },
  uz: {
    h1: "Leader Audit — Toshkentda auditorlik kompaniyasi",
    intro: "Oʻzbekistondagi litsenziyalangan auditorlik kompaniyasi. XAS xalqaro va NSBU milliy standartlari boʻyicha majburiy va tashabbusli audit, soliq konsalting, QQS qaytarish va buxgalteriya autsorsing. 13 yil tajriba, 220+ tekshiruv, Moliya vazirligi litsenziyasi.",
    servicesHeading: "Xizmatlar",
    factsHeading: "Leader Audit raqamlarda",
    facts: ["13 yil bozorda (2013 yildan)", "220+ oʻtkazilgan auditorlik tekshiruvi", "200+ mlrd soʻm QQS qaytarishga koʻmak", "CAP, CIPA, DipIFR (ACCA) sertifikatlari", "Kasbiy javobgarlik sugʻurtalangan"],
    faqHeading: "Tez-tez soʻraladigan savollar",
    more: "Blog · Keyslar · Kompaniya haqida · Kontaktlar",
  },
  en: {
    h1: "Leader Audit — Audit & Tax Firm in Tashkent",
    intro: "A licensed audit firm in Uzbekistan. Statutory and initiative audits under international ISA and national NAS standards, tax consulting, VAT refund and accounting outsourcing. 13 years on the market, 220+ engagements, licensed by the Ministry of Finance of Uzbekistan.",
    servicesHeading: "Services",
    factsHeading: "Leader Audit in numbers",
    facts: ["13 years on the market (since 2013)", "220+ audit engagements completed", "200+ billion UZS of VAT refunds assisted", "CAP, CIPA, DipIFR (ACCA) certifications", "Professional liability insured"],
    faqHeading: "Frequently asked questions",
    more: "Blog · Case studies · About · Contact",
  },
};

// Sideways article↔article and service↔article cluster links (mirror the React maps).
const BLOG_SIBLINGS = {
  "obligatory-audit-guide-2026": ["isa-vs-nas-uzbekistan", "tax-audit-checklist"],
  "isa-vs-nas-uzbekistan": ["obligatory-audit-guide-2026", "tax-code-2026-changes"],
  "vat-refund-uzbekistan": ["tax-code-2026-changes", "tax-audit-checklist"],
  "transfer-pricing-uzbekistan": ["tax-code-2026-changes", "tax-audit-checklist"],
  "tax-audit-checklist": ["tax-code-2026-changes", "transfer-pricing-uzbekistan"],
  "tax-code-2026-changes": ["tax-audit-checklist", "transfer-pricing-uzbekistan"],
};
const SERVICE_ARTICLES = {
  "obligatory-audit": ["obligatory-audit-guide-2026", "isa-vs-nas-uzbekistan"],
  "initiative-audit": ["obligatory-audit-guide-2026"],
  "tax-consulting": ["tax-code-2026-changes", "tax-audit-checklist", "transfer-pricing-uzbekistan"],
  "vat-refund": ["vat-refund-uzbekistan"],
  accounting: ["isa-vs-nas-uzbekistan"],
};

// Map a blog slug to the most relevant service slug (for contextual internal links)
const BLOG_TO_SERVICE = {
  "obligatory-audit-guide-2026": ["obligatory-audit", "initiative-audit"],
  "vat-refund-uzbekistan": ["vat-refund", "tax-consulting"],
  "isa-vs-nas-uzbekistan": ["obligatory-audit", "accounting"],
  "transfer-pricing-uzbekistan": ["tax-consulting", "obligatory-audit"],
  "tax-audit-checklist": ["tax-consulting", "accounting"],
  "tax-code-2026-changes": ["tax-consulting", "accounting"],
};

// ---------------------------------------------------------------------------
// Curated meta for pages whose copy is not in a single data file
// ---------------------------------------------------------------------------
const HOME_META = {
  ru: {
    title: "Leader Audit — аудиторская компания в Ташкенте",
    description: "Лицензированный аудит по МСА и НСБУ, налоговый консалтинг, возврат НДС и бухгалтерский аутсорсинг в Ташкенте. 13 лет, 220+ проверок. Лицензия Минфина РУз.",
    keywords: "аудит Ташкент, аудиторская компания Узбекистан, обязательный аудит, инициативный аудит, налоговый консалтинг, возврат НДС, МСА, МСФО, НСБУ",
  },
  uz: {
    title: "Leader Audit — Toshkentda auditorlik kompaniyasi",
    description: "Toshkentda XAS va MHXS bo'yicha litsenziyalangan audit, soliq konsalting, QQS qaytarish va buxgalteriya autsorsing. 13 yil, 220+ tekshiruv.",
    keywords: "audit Toshkent, auditorlik kompaniyasi O'zbekiston, majburiy audit, soliq konsalting, QQS qaytarish",
  },
  en: {
    title: "Leader Audit — Audit & Tax Firm in Tashkent",
    description: "Licensed audit (ISA & NAS), tax consulting, VAT refund and accounting outsourcing in Tashkent, Uzbekistan. 13 years, 220+ engagements.",
    keywords: "audit Tashkent, audit firm Uzbekistan, statutory audit, tax consulting, VAT refund",
  },
};
const ABOUT_META = {
  ru: { title: "О компании Leader Audit — аудитор с 2013 года", description: "ООО «LEADER AUDIT» — лицензированный аудитор в Ташкенте. 13 лет, 220+ проверок, сертификаты CAP, CIPA, DipIFR. Лицензия Минфина РУз.", keywords: "о компании Leader Audit, аудиторская компания Ташкент, лицензированный аудитор, CAP CIPA DipIFR, страхование ответственности" },
  uz: { title: "Leader Audit haqida — 2013 yildan auditor", description: "«LEADER AUDIT» — Toshkentdagi litsenziyalangan auditor. 13 yil, 220+ tekshiruv, CAP, CIPA, DipIFR sertifikatlari. Moliya vazirligi litsenziyasi.", keywords: "Leader Audit haqida, Toshkent auditorlik kompaniyasi, litsenziyalangan auditor" },
  en: { title: "About Leader Audit — auditor since 2013", description: "Leader Audit LLC is a licensed auditor in Tashkent. 13 years, 220+ engagements, CAP, CIPA, DipIFR certifications, Ministry of Finance license.", keywords: "about Leader Audit, Tashkent audit firm, licensed auditor, CAP CIPA DipIFR" },
};
const CONTACT_META = {
  ru: { title: "Контакты Leader Audit — Ташкент", description: "Свяжитесь с Leader Audit: +998 97 410 04 47, info@leaderaudit.uz, г. Ташкент, ул. Мустакиллик, 12. Часы работы: Пн–Пт 9:00–18:00.", keywords: "контакты Leader Audit, аудиторская организация Ташкент, телефон аудитора Узбекистан" },
  uz: { title: "Leader Audit kontaktlari — Toshkent", description: "Leader Audit bilan bog'laning: +998 97 410 04 47, info@leaderaudit.uz, Toshkent, Mustaqillik ko'chasi, 12. Ish vaqti: Du–Ju 9:00–18:00.", keywords: "Leader Audit kontaktlari, Toshkent auditorlik tashkiloti, audit telefoni" },
  en: { title: "Contact Leader Audit — Tashkent", description: "Contact Leader Audit: +998 97 410 04 47, info@leaderaudit.uz, 12 Mustaqillik St, Tashkent. Hours: Mon–Fri 9:00–18:00.", keywords: "Leader Audit contacts, Tashkent audit firm phone" },
};
const BLOGIDX_META = {
  ru: { title: "Блог Leader Audit — аудит и налоги", description: "Экспертные статьи по аудиту, налогам, МСФО и бухгалтерии в Узбекистане. Практические советы от лицензированных аудиторов Leader Audit.", keywords: "блог аудит, статьи налоги Узбекистан, консультации по аудиту организаций, МСФО, кадровый аудит, финансовый анализ", h1: "Блог Leader Audit", subtitle: "Консультации по аудиту, налогам и бухгалтерии в Узбекистане" },
  uz: { title: "Leader Audit blogi — audit va soliqlar", description: "O'zbekistonda audit, soliq konsalting, buxgalteriya va QQS qaytarish bo'yicha ekspert maqolalar. Litsenziyalangan auditorlardan amaliy maslahatlar.", keywords: "audit blogi, O'zbekiston soliqlar maqolalar", h1: "Leader Audit blogi", subtitle: "O'zbekistonda audit, soliqlar va buxgalteriya bo'yicha ekspert maqolalar" },
  en: { title: "Leader Audit Blog — Audit & Taxes", description: "Expert articles on audit, tax consulting, accounting and VAT refund in Uzbekistan. Practical advice from licensed auditors.", keywords: "audit blog, tax articles Uzbekistan, expert audit articles", h1: "Leader Audit Blog", subtitle: "Expert articles on audit, taxes and accounting in Uzbekistan" },
};
const ABOUT_BODY = {
  ru: [
    "ООО «LEADER AUDIT» — лицензированная аудиторская компания в Ташкенте, работающая с 2013 года на основании Закона Республики Узбекистан «Об аудиторской деятельности». Лицензия выдана Министерством финансов Республики Узбекистан, профессиональная ответственность застрахована.",
    "За 13 лет проведено более 220 аудиторских проверок; клиентам оказано содействие в возврате более 200 млрд сумов НДС. Основатели компании имеют международные квалификации CAP (Certified Accounting Practitioner), CIPA (Certified International Professional Accountant) и DipIFR (Diploma in International Financial Reporting, ACCA).",
    "Аудит проводится строго по Международным стандартам аудита (МСА): мы анализируем систему внутреннего контроля, тестируем существенные хозяйственные операции, проверяем правильность применения НСБУ и МСФО, оцениваем налоговые риски и формируем аудиторское заключение с развёрнутым отчётом о выявленных нарушениях и конкретными рекомендациями.",
    "Компания работает с резидентами IT-Парка и имеет глубокую отраслевую экспертизу: медицина и фармацевтика, IT и SaaS, производство, оптовая и розничная торговля, строительство, банковский, страховой и инвестиционный сектор, импорт-экспорт.",
    "Конфиденциальность гарантируется юридически: с каждым клиентом подписывается соглашение о неразглашении (NDA), доступ к документам ограничен проектной командой, обмен файлами идёт по защищённым каналам. Услуги: обязательный и инициативный аудит, налоговый консалтинг, возврат НДС, бухгалтерский аутсорсинг, трансформация отчётности по МСФО и due diligence для сделок M&A.",
  ],
  uz: [
    "«LEADER AUDIT» MCHJ — Toshkentdagi litsenziyalangan auditorlik kompaniyasi, 2013 yildan beri O'zbekiston Respublikasining «Auditorlik faoliyati to'g'risida»gi qonuni asosida faoliyat yuritadi. Litsenziya Moliya vazirligi tomonidan berilgan, kasbiy javobgarlik sug'urtalangan.",
    "13 yil davomida 220 dan ortiq auditorlik tekshiruvi o'tkazildi; mijozlarga 200 mlrd so'mdan ortiq QQS qaytarishda ko'mak berildi. Asoschilari CAP, CIPA va DipIFR (ACCA) xalqaro malakalariga ega.",
    "Audit XAS (Auditning xalqaro standartlari) bo'yicha o'tkaziladi: ichki nazorat tizimi tahlil qilinadi, muhim xo'jalik operatsiyalari tekshiriladi, NSBU va MHXS qo'llanilishi to'g'riligi nazorat qilinadi, soliq risklari baholanadi va auditorlik xulosasi tavsiyalar bilan taqdim etiladi.",
    "Kompaniya IT-Park rezidentlari bilan ishlaydi va chuqur tarmoq tajribasiga ega: tibbiyot va farmatsevtika, IT va SaaS, ishlab chiqarish, ulgurji va chakana savdo, qurilish, bank, sug'urta va investitsiya sektori, import-eksport.",
    "Maxfiylik yuridik jihatdan kafolatlanadi: har bir mijoz bilan NDA imzolanadi, hujjatlarga kirish loyiha jamoasi bilan cheklanadi. Xizmatlar: majburiy va tashabbusli audit, soliq konsalting, QQS qaytarish, buxgalteriya autsorsing, MHXS bo'yicha transformatsiya va M&A bitimlari uchun due diligence.",
  ],
  en: [
    "Leader Audit LLC is a licensed audit firm in Tashkent operating since 2013 under the Law of the Republic of Uzbekistan on Audit Activity. The license is issued by the Ministry of Finance, and professional liability is insured.",
    "Over 13 years we have completed more than 220 audit engagements and helped clients recover over 200 billion UZS in VAT. Our founders hold the international qualifications CAP (Certified Accounting Practitioner), CIPA (Certified International Professional Accountant) and DipIFR (Diploma in International Financial Reporting, ACCA).",
    "Audits follow the International Standards on Auditing (ISA): we analyse the internal control system, test material transactions, verify correct application of NAS and IFRS, assess tax risks, and issue an audit report with a detailed account of findings and concrete recommendations.",
    "We work with IT Park residents and have deep industry expertise: medical and pharma, IT and SaaS, manufacturing, wholesale and retail, construction, banking, insurance and investment, import-export.",
    "Confidentiality is guaranteed legally: an NDA is signed with every client, document access is limited to the project team, and files are exchanged over secure channels. Services: statutory and initiative audit, tax consulting, VAT refund, accounting outsourcing, IFRS transformation and M&A due diligence.",
  ],
};

// ---------------------------------------------------------------------------
// Route table — single source of truth for prerender, sitemap and llms.txt
// ---------------------------------------------------------------------------
export function buildRoutes(content) {
  const { servicesContent, blogPosts, casesContent } = content;
  const routes = [];
  const serviceSlugs = Object.keys(servicesContent.ru);

  for (const lang of LANGS) {
    const pfx = prefix(lang);

    routes.push({
      type: "home", lang, path: pfx === "" ? "/" : pfx,
      title: HOME_META[lang].title, description: HOME_META[lang].description, keywords: HOME_META[lang].keywords,
    });

    for (const slug of serviceSlugs) {
      const c = servicesContent[lang][slug];
      routes.push({
        type: "service", lang, slug, path: `${pfx}/services/${slug}`,
        title: c.metaTitle, description: c.metaDescription, keywords: c.keywords,
      });
    }

    routes.push({ type: "about", lang, path: `${pfx}/about`, title: ABOUT_META[lang].title, description: ABOUT_META[lang].description, keywords: ABOUT_META[lang].keywords });
    routes.push({ type: "contact", lang, path: `${pfx}/contact`, title: CONTACT_META[lang].title, description: CONTACT_META[lang].description, keywords: CONTACT_META[lang].keywords });

    const cc = casesContent[lang];
    routes.push({ type: "cases", lang, path: `${pfx}/cases`, title: cc.metaTitle, description: cc.metaDescription, keywords: cc.keywords });

    routes.push({ type: "blog", lang, path: `${pfx}/blog`, title: BLOGIDX_META[lang].title, description: BLOGIDX_META[lang].description, keywords: BLOGIDX_META[lang].keywords });

    // CMS posts may exist in fewer than 3 languages — iterate per-language keys.
    for (const slug of Object.keys(blogPosts[lang])) {
      const p = blogPosts[lang][slug];
      routes.push({
        type: "blogpost", lang, slug, path: `${pfx}/blog/${slug}`,
        title: p.metaTitle, description: p.metaDescription, keywords: p.keywords,
        publishedDate: p.publishedDate, modifiedDate: p.modifiedDate,
      });
    }
  }

  routes.push({ type: "notfound", lang: "ru", path: "/404", title: "404 — Страница не найдена | Leader Audit", description: "Запрашиваемая страница не найдена.", keywords: "", noindex: true });
  return routes;
}

// Canonical URL for a route (RU root keeps the trailing slash; everything else slash-less)
export function canonicalOf(route) {
  return route.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${route.path}`;
}

// Reciprocal hreflang alternates for a route
export function alternatesOf(route) {
  const clean = route.path.replace(/^\/(uz|en)(?=\/|$)/, "") || "/";
  return {
    ru: clean === "/" ? `${SITE_URL}/` : `${SITE_URL}${clean}`,
    uz: clean === "/" ? `${SITE_URL}/uz` : `${SITE_URL}/uz${clean}`,
    en: clean === "/" ? `${SITE_URL}/en` : `${SITE_URL}/en${clean}`,
  };
}

// ---------------------------------------------------------------------------
// JSON-LD @graph builders (non-home pages; home keeps its curated index.html graph)
// ---------------------------------------------------------------------------
function webPageNode(route, type = "WebPage") {
  const canonical = canonicalOf(route);
  const node = {
    "@type": type,
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: route.title,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    description: route.description,
    inLanguage: locale(route.lang),
    primaryImageOfPage: { "@type": "ImageObject", url: OG_IMAGE },
    breadcrumb: { "@id": `${canonical}#breadcrumb` },
  };
  if (route.type === "blogpost") {
    node.datePublished = route.publishedDate;
    node.dateModified = route.modifiedDate;
  }
  return node;
}

function breadcrumbNode(route, trail) {
  const canonical = canonicalOf(route);
  return {
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: trail.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.item,
    })),
  };
}

function trailFor(route, leafName) {
  const pfx = prefix(route.lang);
  const homeItem = `${SITE_URL}${pfx === "" ? "/" : pfx}`;
  const home = { name: t("home", route.lang), item: homeItem };
  const canonical = canonicalOf(route);
  const leaf = leafName || route.title;
  if (route.type === "service")
    return [home, { name: t("services", route.lang), item: `${homeItem}#services` }, { name: leaf, item: canonical }];
  if (route.type === "blogpost")
    return [home, { name: t("blog", route.lang), item: `${SITE_URL}${pfx}/blog` }, { name: leaf, item: canonical }];
  return [home, { name: leaf, item: canonical }];
}

function homeFaqFor(route, homeFaqRu) {
  const items = route.lang === "ru" ? homeFaqRu || [] : HOME_FAQ[route.lang] || [];
  return items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  }));
}

export function buildGraph(route, content, orgNode, websiteNode, homeFaqRu) {
  const canonical = canonicalOf(route);
  const { servicesContent, blogPosts, casesContent } = content;
  const base = [localizeOrg(orgNode, route.lang), localizeWebsite(websiteNode, route.lang)];

  if (route.type === "home") {
    // No breadcrumb on home (a single-item trail is a no-op); drop the dangling ref too.
    const webPage = webPageNode(route);
    delete webPage.breadcrumb;
    const faqPage = {
      "@type": "FAQPage",
      "@id": `${canonical}#faq`,
      inLanguage: locale(route.lang),
      mainEntity: homeFaqFor(route, homeFaqRu),
    };
    return [...base, webPage, faqPage];
  }

  if (route.type === "service") {
    const c = servicesContent[route.lang][route.slug];
    const area = AREA[route.lang];
    const service = {
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: c.title,
      serviceType: c.schemaServiceType,
      provider: { "@id": ORG_ID },
      areaServed: [
        { "@type": "Country", name: area[0] },
        { "@type": "City", name: area[1] },
        { "@type": "City", name: area[2] },
        { "@type": "City", name: area[3] },
      ],
      description: c.metaDescription,
      url: canonical,
      inLanguage: locale(route.lang),
    };
    const faq = {
      "@type": "FAQPage",
      "@id": `${canonical}#faq`,
      inLanguage: locale(route.lang),
      mainEntity: c.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    };
    return [...base, webPageNode(route), breadcrumbNode(route, trailFor(route, c.title)), service, faq];
  }

  if (route.type === "blogpost") {
    const p = blogPosts[route.lang][route.slug];
    const bodyText = p.content
      .map((b) => b.text || (b.items ? b.items.join(". ") : ""))
      .filter(Boolean)
      .join("\n\n");
    const article = {
      "@type": "BlogPosting",
      "@id": `${canonical}#article`,
      headline: p.title,
      description: p.metaDescription,
      image: OG_IMAGE,
      datePublished: p.publishedDate,
      dateModified: p.modifiedDate,
      author: { "@id": ORG_ID },
      publisher: { "@id": ORG_ID },
      mainEntityOfPage: { "@id": `${canonical}#webpage` },
      inLanguage: locale(route.lang),
      keywords: p.keywords,
      articleSection: p.category,
      wordCount: bodyText.split(/\s+/).filter(Boolean).length,
      articleBody: bodyText,
    };
    const nodes = [...base, webPageNode(route), breadcrumbNode(route, trailFor(route, p.title)), article];
    if (Array.isArray(p.faqs) && p.faqs.length) {
      nodes.push({
        "@type": "FAQPage",
        "@id": `${canonical}#faq`,
        inLanguage: locale(route.lang),
        mainEntity: p.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      });
    }
    return nodes;
  }

  if (route.type === "cases") {
    const cc = casesContent[route.lang];
    const collection = {
      ...webPageNode(route, "CollectionPage"),
      hasPart: cc.cases.map((c, i) => ({
        "@type": "Article",
        "@id": `${canonical}#case-${i + 1}`,
        headline: `${c.industry}: ${c.serviceType}`,
        about: c.industry,
        image: OG_IMAGE,
        author: { "@id": ORG_ID },
        publisher: { "@id": ORG_ID },
        inLanguage: locale(route.lang),
        articleBody: `${c.challenge} ${c.outcomeNarrative}`,
      })),
    };
    return [...base, collection, breadcrumbNode(route, trailFor(route, cc.heroTitle))];
  }

  if (route.type === "blog") {
    const posts = Object.values(blogPosts[route.lang]);
    const blog = {
      ...webPageNode(route, "CollectionPage"),
      mainEntity: {
        "@type": "Blog",
        name: BLOGIDX_META[route.lang].h1,
        description: route.description,
        publisher: { "@id": ORG_ID },
        blogPost: posts.map((post) => ({
          "@type": "BlogPosting",
          headline: post.title,
          datePublished: post.publishedDate,
          dateModified: post.modifiedDate,
          author: { "@id": ORG_ID },
          url: `${canonical}/${post.slug}`,
        })),
      },
    };
    return [...base, blog, breadcrumbNode(route, trailFor(route, BLOGIDX_META[route.lang].h1))];
  }

  if (route.type === "about")
    return [...base, webPageNode(route, "AboutPage"), breadcrumbNode(route, trailFor(route, t("about", route.lang)))];

  if (route.type === "contact") {
    const city = AREA[route.lang][1];
    // The head office (Mustaqillik) is already the Organization/LocalBusiness node; emit the
    // OTHER two offices as branch LocalBusiness so there are exactly 3 offices, no duplicate.
    const branchNodes = (content.branches || []).filter((b) => b.id !== "mustaqillik").map((b) => {
      const node = {
        "@type": ["LocalBusiness", "AccountingService"],
        "@id": `${SITE_URL}/#branch-${b.id}`,
        name: `Leader Audit — ${b.label[route.lang]}`,
        branchOf: { "@id": ORG_ID },
        parentOrganization: { "@id": ORG_ID },
        address: {
          "@type": "PostalAddress",
          streetAddress: b.street[route.lang],
          addressLocality: city,
          addressCountry: "UZ",
        },
        telephone: "+998974100447",
        email: "info@leaderaudit.uz",
        url: canonical,
        priceRange: "$$$",
        areaServed: { "@type": "City", name: city },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
        hasMap: b.mapUrl,
      };
      if (b.geo) node.geo = { "@type": "GeoCoordinates", latitude: b.geo.lat, longitude: b.geo.lng };
      return node;
    });
    return [...base, webPageNode(route, "ContactPage"), breadcrumbNode(route, trailFor(route, t("contact", route.lang))), ...branchNodes];
  }

  return [...base, webPageNode(route), breadcrumbNode(route, trailFor(route, route.title))];
}

// ---------------------------------------------------------------------------
// No-JS <noscript> body builders
// ---------------------------------------------------------------------------
const p = (s) => `<p>${escapeHtml(s)}</p>`;
const h = (n, s) => `<h${n}>${escapeHtml(s)}</h${n}>`;
const ul = (items) => `<ul>${items.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul>`;
const ol = (items) => `<ol>${items.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ol>`;

function serviceLinks(lang, exceptSlug) {
  const pfx = prefix(lang);
  const items = Object.keys(SERVICE_NAMES)
    .filter((s) => s !== exceptSlug)
    .map((s) => `<a href="${pfx}/services/${s}">${escapeHtml(SERVICE_NAMES[s][lang])}</a>`);
  return `<p>${t("relatedServices", lang)}: ${items.join(" · ")}</p>`;
}

function serviceLinksList(lang) {
  const pfx = prefix(lang);
  return `<ul>${Object.keys(SERVICE_NAMES)
    .map((s) => `<li><a href="${pfx}/services/${s}">${escapeHtml(SERVICE_NAMES[s][lang])}</a></li>`)
    .join("")}</ul>`;
}

function navLinks(lang) {
  const pfx = prefix(lang);
  const a = (path, label) => `<a href="${pfx}${path}">${escapeHtml(label)}</a>`;
  return `<p>${a("/blog", t("blog", lang))} · ${a("/cases", t("cases", lang))} · ${a("/about", t("about", lang))} · ${a("/contact", t("contact", lang))}</p>`;
}

function blogContentToHtml(blocks) {
  return blocks
    .map((b) => {
      switch (b.type) {
        case "h2": return h(2, b.text);
        case "h3": return h(3, b.text);
        case "p": return p(b.text);
        case "ul": return ul(b.items || []);
        case "ol": return ol(b.items || []);
        case "quote": return `<blockquote>${escapeHtml(b.text)}</blockquote>`;
        default: return "";
      }
    })
    .join("\n");
}

export function buildNoscriptInner(route, content, homeFaqRu) {
  const { servicesContent, blogPosts, casesContent } = content;
  const lang = route.lang;
  const pfx = prefix(lang);

  if (route.type === "home") {
    const H = HOME[lang];
    const parts = [];
    parts.push(h(1, H.h1));
    parts.push(p(H.intro));
    parts.push(h(2, H.servicesHeading));
    parts.push(serviceLinksList(lang));
    parts.push(navLinks(lang));
    parts.push(h(2, H.factsHeading), ul(H.facts));
    parts.push(p(t("contactCta", lang)));
    parts.push(h(2, H.faqHeading));
    const faqs = lang === "ru" ? homeFaqRu || [] : HOME_FAQ[lang] || [];
    faqs.forEach((f) => parts.push(h(3, f.q), p(f.a)));
    return parts.join("\n");
  }

  if (route.type === "service") {
    const c = servicesContent[lang][route.slug];
    const parts = [];
    parts.push(h(1, c.title));
    if (c.heroSubtitle) parts.push(p(c.heroSubtitle));
    parts.push(h(2, c.introHeading));
    c.introParagraphs.forEach((x) => parts.push(p(x)));
    parts.push(h(2, c.whoNeedsHeading), ul(c.whoNeedsItems));
    parts.push(h(2, c.benefitsHeading), ul(c.benefits.map((b) => `${b.title} — ${b.description}`)));
    parts.push(h(2, c.processHeading), ol(c.process.map((s) => `${s.title} — ${s.description}`)));
    parts.push(h(2, c.whyUsHeading), ul(c.whyUsItems));
    parts.push(h(2, c.pricingHeading), p(c.pricingNote));
    parts.push(h(2, c.faqHeading));
    c.faqs.forEach((f) => parts.push(h(3, f.question), p(f.answer)));
    parts.push(serviceLinks(lang, route.slug));
    const arts = (SERVICE_ARTICLES[route.slug] || []).filter((s) => blogPosts[lang][s]).map((s) => `<a href="${pfx}/blog/${s}">${escapeHtml(blogPosts[lang][s].title)}</a>`);
    if (arts.length) parts.push(`<p>${lang === "ru" ? "Полезные статьи" : lang === "uz" ? "Foydali maqolalar" : "Useful articles"}: ${arts.join(" · ")}</p>`);
    parts.push(navLinks(lang)); // links to blog, cases, about, contact (service→proof cross-silo)
    parts.push(p(t("contactCta", lang)));
    return parts.join("\n");
  }

  if (route.type === "blogpost") {
    const post = blogPosts[lang][route.slug];
    const parts = [];
    parts.push(`<nav>${escapeHtml(t("home", lang))} › ${escapeHtml(t("blog", lang))} › ${escapeHtml(post.title)}</nav>`);
    parts.push(h(1, post.title));
    parts.push(p(`${post.category} · ${t("published", lang)}: ${post.publishedDate} · ${t("updated", lang)}: ${post.modifiedDate} · ${t("readingTime", lang)}: ${post.readingTime}`));
    parts.push(p(post.excerpt));
    parts.push(p(lang === "ru"
      ? "Материал подготовлен аудиторами Leader Audit (CAP, CIPA, DipIFR). Источники: Налоговый кодекс РУз, Министерство финансов Республики Узбекистан."
      : lang === "uz"
      ? "Material Leader Audit auditorlari (CAP, CIPA, DipIFR) tomonidan tayyorlangan. Manbalar: OʻzR Soliq kodeksi, OʻzR Moliya vazirligi."
      : "Prepared by the auditors of Leader Audit (CAP, CIPA, DipIFR). Sources: Tax Code of Uzbekistan, Ministry of Finance of the Republic of Uzbekistan."));
    parts.push(blogContentToHtml(post.content));
    if (Array.isArray(post.faqs) && post.faqs.length) {
      parts.push(h(2, lang === "ru" ? "Частые вопросы" : lang === "uz" ? "Tez-tez soʻraladigan savollar" : "Frequently asked questions"));
      post.faqs.forEach((f) => parts.push(h(3, f.question), p(f.answer)));
    }
    const rel = (BLOG_TO_SERVICE[route.slug] || []).map((s) => `<a href="${pfx}/services/${s}">${escapeHtml(SERVICE_NAMES[s][lang])}</a>`);
    if (rel.length) parts.push(`<p>${t("relatedServices", lang)}: ${rel.join(" · ")}</p>`);
    const sib = (BLOG_SIBLINGS[route.slug] || []).filter((s) => blogPosts[lang][s]).map((s) => `<a href="${pfx}/blog/${s}">${escapeHtml(blogPosts[lang][s].title)}</a>`);
    if (sib.length) parts.push(`<p>${lang === "ru" ? "Читайте также" : lang === "uz" ? "Shuningdek oʻqing" : "Read also"}: ${sib.join(" · ")}</p>`);
    parts.push(p(t("contactCta", lang)));
    return parts.join("\n");
  }

  if (route.type === "cases") {
    const cc = casesContent[lang];
    const parts = [];
    parts.push(h(1, cc.heroTitle));
    parts.push(p(cc.heroDescription));
    cc.cases.forEach((c) => {
      parts.push(h(2, `${c.industry}: ${c.serviceType}`));
      parts.push(p(`${t("client", lang)}: ${c.clientProfile}`));
      parts.push(p(`${t("task", lang)}: ${c.challenge}`));
      parts.push(`<p><strong>${escapeHtml(t("approach", lang))}:</strong></p>`, ol(c.approach));
      parts.push(`<p><strong>${escapeHtml(t("result", lang))}:</strong> ${escapeHtml(c.outcomeNarrative)}</p>`);
      parts.push(ul(c.outcome.map((o) => `${o.metric}: ${o.value}`)));
    });
    if (cc.trustHeading) parts.push(h(2, cc.trustHeading));
    (cc.trustParagraphs || []).forEach((x) => parts.push(p(x)));
    parts.push(serviceLinks(lang, null));
    parts.push(p(t("contactCta", lang)));
    return parts.join("\n");
  }

  if (route.type === "blog") {
    const meta = BLOGIDX_META[lang];
    const posts = Object.values(blogPosts[lang]);
    const parts = [];
    parts.push(h(1, meta.h1), p(meta.subtitle));
    posts.forEach((post) => {
      parts.push(h(2, post.title));
      parts.push(p(`${post.category} · ${post.publishedDate} · ${post.readingTime}`));
      parts.push(p(post.excerpt));
      parts.push(`<p><a href="${pfx}/blog/${post.slug}">${escapeHtml(post.title)}</a></p>`);
    });
    parts.push(serviceLinks(lang, null));
    parts.push(navLinks(lang));
    return parts.join("\n");
  }

  if (route.type === "about") {
    const parts = [];
    parts.push(h(1, lang === "ru" ? "О компании Leader Audit" : lang === "uz" ? "Leader Audit kompaniyasi haqida" : "About Leader Audit"));
    ABOUT_BODY[lang].forEach((x) => parts.push(p(x)));
    parts.push(serviceLinks(lang, null));
    parts.push(p(t("contactCta", lang)));
    return parts.join("\n");
  }

  if (route.type === "contact") {
    const hours = lang === "ru" ? "Пн–Пт: 09:00–18:00 (UTC+5)" : lang === "uz" ? "Du–Ju: 09:00–18:00 (UTC+5)" : "Mon–Fri: 09:00–18:00 (UTC+5)";
    const lbl = { addr: { ru: "Адрес", uz: "Manzil", en: "Address" }, phone: { ru: "Телефон", uz: "Telefon", en: "Phone" }, map: { ru: "Показать на карте", uz: "Xaritada koʻrsatish", en: "View on map" }, offices: { ru: "Наши офисы в Ташкенте", uz: "Toshkentdagi ofislarimiz", en: "Our offices in Tashkent" } };
    const parts = [];
    parts.push(h(1, CONTACT_META[lang].title.split("|")[0].trim()));
    parts.push(p(CONTACT_META[lang].description));
    parts.push(h(2, lbl.offices[lang]));
    (content.branches || []).forEach((b) => {
      parts.push(h(3, `Leader Audit — ${b.label[lang]}`));
      parts.push(ul([
        `${lbl.addr[lang]}: ${b.street[lang]}, ${b.district[lang]}`,
        `${lbl.phone[lang]}: +998 97 410 04 47`,
        `Email: info@leaderaudit.uz`,
        hours,
      ]));
      parts.push(`<p><a href="${escapeHtml(b.mapUrl)}">${escapeHtml(lbl.map[lang])}</a></p>`);
    });
    parts.push(p("Instagram: @leader_audit_uz · Telegram: @LeaderAudit_uz"));
    parts.push(serviceLinks(lang, null));
    return parts.join("\n");
  }

  return "";
}
