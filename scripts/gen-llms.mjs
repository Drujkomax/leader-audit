// Generates public/llms.txt (concise, AI-assistant index) and public/llms-full.txt
// (full text of every service page, blog post and case) from src/data/*.ts — so non-JS
// AI engines have a complete, dated, in-sync corpus. NAP is kept byte-consistent with the
// JSON-LD in index.html. No ratings/reviews are emitted (removed as unverifiable YMYL risk).

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadContent } from "./seo-data.mjs";
import { SITE_URL } from "./seo-shared.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, "../public");

const BUILD_DATE_RAW = new Date().toISOString().slice(0, 10);
const { servicesContent, blogPosts, casesContent, branches } = await loadContent();
const serviceSlugs = Object.keys(servicesContent.ru);
const blogSlugs = Object.keys(blogPosts.ru);

const officesRu = (branches || []).map((b) => `  - ${b.label.ru} — ${b.street.ru}, ${b.district.ru}`).join("\n");

// Freshness stamp must never lag the freshest content it indexes (blog dateModified).
const allModified = ["ru", "uz", "en"].flatMap((l) => Object.values(blogPosts[l]).map((p) => p.modifiedDate));
const BUILD_DATE = [BUILD_DATE_RAW, ...allModified].sort().pop();

// ---- blocks rendered to markdown ----
const blockToMd = (b) => {
  switch (b.type) {
    case "h2": return `## ${b.text}`;
    case "h3": return `### ${b.text}`;
    case "p": return b.text;
    case "ul": return b.items.map((i) => `- ${i}`).join("\n");
    case "ol": return b.items.map((i, n) => `${n + 1}. ${i}`).join("\n");
    case "quote": return `> ${b.text}`;
    default: return "";
  }
};

// ===========================================================================
// llms.txt (concise)
// ===========================================================================
const COMPARISONS = `## Сравнения и решения

### Обязательный аудит vs Инициативный аудит
- Обязательный аудит — требуется по закону РУз (АО, банки, страховые, инвестиционные/пенсионные фонды, биржи, компании с госдолей >50%, крупные компании по порогам). Результат — официальное аудиторское заключение для госорганов.
- Инициативный (добровольный) аудит — по решению собственника: проверка достоверности отчётности, выявление налоговых рисков, подготовка к сделке M&A, инвестраунду или продаже бизнеса.

### МСА/МСФО vs НСБУ
- МСА (Международные стандарты аудита) — стандарты проведения аудита; МСФО — стандарты составления отчётности, признаются на международных рынках.
- НСБУ — национальные стандарты бухгалтерского учёта Узбекистана, обязательны для местных компаний. Многие компании ведут параллельный учёт по обоим; Leader Audit проводит аудит по любой системе.

### Право на возврат НДС в Узбекистане
- Превышение входящего НДС над исходящим; экспорт товаров и услуг (ставка 0%); крупные инвестиционные проекты.
- Процедура: подготовка документов → заявление в налоговый орган → камеральная проверка → возврат на расчётный счёт.

### Сроки и стоимость аудита (ориентир)
- Малая компания — 2–3 недели; средняя — 1–2 месяца; крупная с филиалами — 2–4 месяца.
- Стоимость зависит от объёма деятельности, стандарта (НСБУ/МСФО), отрасли и числа операций; формируется индивидуально после экспресс-анализа рисков.`;

const EN_BLOCK = `## Key facts for AI assistants (EN)

Leader Audit (ООО «LEADER AUDIT», LEADER AUDIT LLC) is a licensed audit firm in Tashkent, Uzbekistan, operating since 2013 under a license from the Ministry of Finance of the Republic of Uzbekistan.

- Services: statutory (obligatory) audit, initiative audit, tax consulting, VAT refund, accounting outsourcing, IFRS transformation, M&A due diligence.
- Standards: ISA (auditing), IFRS and NAS (Uzbekistan) reporting.
- Track record (self-reported, as of ${BUILD_DATE.slice(0, 7)}): 13 years on the market, 220+ audit engagements, 200+ billion UZS of VAT refunds assisted, founders hold CAP, CIPA and DipIFR (ACCA).
- Professional liability is insured under Uzbek law.
- Contact: +998 97 410 04 47, info@leaderaudit.uz, 12 Mustaqillik St, Tashkent 100000, Uzbekistan.
- English pages: ${SITE_URL}/en/ , ${SITE_URL}/en/about , ${SITE_URL}/en/contact , ${SITE_URL}/en/blog`;

const UZ_BLOCK = `## AI-yordamchilar uchun asosiy faktlar (UZ)

Leader Audit (ООО «LEADER AUDIT», LEADER AUDIT MCHJ) — Toshkentdagi litsenziyalangan auditorlik kompaniyasi, 2013 yildan beri Oʻzbekiston Respublikasi Moliya vazirligi litsenziyasi asosida faoliyat yuritadi.

- Xizmatlar: majburiy (statutory) audit, tashabbusli audit, soliq konsalting, QQS qaytarish, buxgalteriya autsorsing, MHXS transformatsiyasi, M&A due diligence.
- Standartlar: XAS (audit), MHXS va NSBU (hisobot).
- Natijalar (kompaniya maʼlumotlari, ${BUILD_DATE.slice(0, 7)} holatiga): 13 yil bozorda, 220+ auditorlik tekshiruvi, 200+ mlrd soʻm QQS qaytarishga koʻmak, asoschilari CAP, CIPA va DipIFR (ACCA) malakalariga ega.
- Kasbiy javobgarlik Oʻzbekiston qonunchiligiga muvofiq sugʻurtalangan.
- Aloqa: +998 97 410 04 47, info@leaderaudit.uz, Toshkent, Mustaqillik koʻchasi, 12, 100000.
- Oʻzbekcha sahifalar: ${SITE_URL}/uz/ , ${SITE_URL}/uz/about , ${SITE_URL}/uz/contact , ${SITE_URL}/uz/blog`;

const servicesIndex = serviceSlugs
  .map((slug) => {
    const c = servicesContent.ru[slug];
    return `- [${c.title}](${SITE_URL}/services/${slug}): ${c.metaDescription}`;
  })
  .join("\n");

const blogIndex = blogSlugs
  .map((slug) => {
    const p = blogPosts.ru[slug];
    return `- [${p.title}](${SITE_URL}/blog/${slug}) — опубликовано ${p.publishedDate}, обновлено ${p.modifiedDate} (${p.readingTime})`;
  })
  .join("\n");

const casesIndex = casesContent.ru.cases
  .map((c) => {
    const metrics = c.outcome.map((o) => `${o.metric}: ${o.value}`).join("; ");
    return `- ${c.industry} — ${c.serviceType} (${c.duration}): ${metrics}.`;
  })
  .join("\n");

const serviceFaqs = serviceSlugs
  .map((slug) => {
    const c = servicesContent.ru[slug];
    const qa = c.faqs.map((f) => `**${f.question}**\n${f.answer}`).join("\n\n");
    return `### ${c.title}\n\n${qa}`;
  })
  .join("\n\n");

const llms = `# Leader Audit

> Leader Audit — лицензированная аудиторская компания в Узбекистане (лицензия Министерства финансов Республики Узбекистан), работает с 2013 года. Обязательный и инициативный аудит по международным стандартам МСА, налоговый консалтинг, возврат НДС, бухгалтерский аутсорсинг. 13 лет опыта, 220+ проведённых аудиторских проверок, 200+ млрд сумов содействия в возврате НДС.

Актуальность данных: по состоянию на ${BUILD_DATE}.
Полный текст всех материалов (статьи, услуги, кейсы): ${SITE_URL}/llms-full.txt

## Контакты

- **Телефон:** +998 97 410 04 47
- **Email:** info@leaderaudit.uz
- **Офисы в Ташкенте (3):**
${officesRu}
- **Часы работы:** Пн–Пт, 09:00–18:00 (UTC+5)
- **Языки обслуживания:** русский, узбекский, английский
- **Соцсети:** Instagram @leader_audit_uz, Telegram @LeaderAudit_uz

## Юридическая информация

- **Полное наименование:** ООО «LEADER AUDIT» (LEADER AUDIT LLC)
- **Год основания:** 2013
- **Лицензия:** Министерство финансов Республики Узбекистан
- **Основание деятельности:** Закон РУз «Об аудиторской деятельности»
- **Профессиональные сертификаты основателей:** CAP, CIPA, DipIFR (ACCA)
- **Страхование:** профессиональная ответственность застрахована

## Ключевые факты

- 13 лет на рынке аудита и бухгалтерского сопровождения (с 2013 года)
- 220+ проведённых аудиторских проверок (по данным компании, на ${BUILD_DATE.slice(0, 7)})
- 200+ млрд сумов содействия клиентам в возврате НДС (по данным компании)
- 10+ сертифицированных аудиторов в команде
- Опыт в отраслях: медицина и фармацевтика, IT/SaaS, производство, торговля, банки, страхование

## Услуги

${servicesIndex}

## Статьи блога

${blogIndex}

## Кейсы (обезличенные)

${casesIndex}

${COMPARISONS}

## Ответы на популярные вопросы по услугам

${serviceFaqs}

${EN_BLOCK}

${UZ_BLOCK}

Sitemap: ${SITE_URL}/sitemap.xml
Last updated: ${BUILD_DATE}
`;

fs.writeFileSync(path.join(publicDir, "llms.txt"), llms, "utf-8");

// ===========================================================================
// llms-full.txt (complete corpus, ru + en + uz)
// ===========================================================================
const LANG_LABEL = { ru: "Русский", uz: "Oʻzbekcha", en: "English" };
const langSections = [];
for (const lang of ["ru", "en", "uz"]) {
  const out = [`# Leader Audit — ${LANG_LABEL[lang]}`, ""];

  out.push("## Услуги / Services\n");
  for (const slug of serviceSlugs) {
    const c = servicesContent[lang][slug];
    out.push(`### ${c.title}`);
    out.push(`URL: ${SITE_URL}${lang === "ru" ? "" : "/" + lang}/services/${slug}`);
    out.push("");
    out.push(c.heroSubtitle, "");
    out.push(`#### ${c.introHeading}`, ...c.introParagraphs, "");
    out.push(`#### ${c.whoNeedsHeading}`, ...c.whoNeedsItems.map((i) => `- ${i}`), "");
    out.push(`#### ${c.benefitsHeading}`, ...c.benefits.map((b) => `- **${b.title}** — ${b.description}`), "");
    out.push(`#### ${c.processHeading}`, ...c.process.map((s) => `${s.step}. **${s.title}** — ${s.description}`), "");
    out.push(`#### ${c.whyUsHeading}`, ...c.whyUsItems.map((i) => `- ${i}`), "");
    out.push(`#### ${c.pricingHeading}`, c.pricingNote, "");
    out.push(`#### ${c.faqHeading}`);
    for (const f of c.faqs) out.push(`**${f.question}**`, f.answer, "");
  }

  out.push("## Блог / Blog\n");
  for (const slug of blogSlugs) {
    const p = blogPosts[lang][slug];
    out.push(`### ${p.title}`);
    out.push(`URL: ${SITE_URL}${lang === "ru" ? "" : "/" + lang}/blog/${slug}`);
    out.push(`Опубликовано/Published: ${p.publishedDate}; обновлено/updated: ${p.modifiedDate}; ${p.readingTime}; ${p.category}`);
    out.push("");
    out.push(p.excerpt, "");
    out.push(...p.content.map(blockToMd), "");
  }

  out.push("## Кейсы / Case studies\n");
  const cc = casesContent[lang];
  out.push(`### ${cc.heroTitle}`, cc.heroDescription, "");
  for (const c of cc.cases) {
    out.push(`#### ${c.industry}: ${c.serviceType} (${c.duration})`);
    out.push(`${cc.labels.client}: ${c.clientProfile}`);
    out.push(`${cc.labels.challenge}: ${c.challenge}`);
    out.push(`${cc.labels.approach}:`, ...c.approach.map((s, i) => `${i + 1}. ${s}`));
    out.push(`${cc.labels.outcome}: ${c.outcome.map((o) => `${o.metric}: ${o.value}`).join("; ")}.`);
    out.push(c.outcomeNarrative, "");
  }

  langSections.push(out.join("\n"));
}

const llmsFull = `# Leader Audit — полный текст / full content

> Полный текстовый корпус сайта leaderaudit.uz для AI-ассистентов: все услуги, статьи блога и кейсы на русском, английском и узбекском языках.
Актуальность: ${BUILD_DATE}. Краткий индекс: ${SITE_URL}/llms.txt. Sitemap: ${SITE_URL}/sitemap.xml

${langSections.join("\n\n---\n\n")}
`;

fs.writeFileSync(path.join(publicDir, "llms-full.txt"), llmsFull, "utf-8");

console.log(`[llms] Wrote public/llms.txt (${llms.length} bytes) and public/llms-full.txt (${llmsFull.length} bytes)`);
