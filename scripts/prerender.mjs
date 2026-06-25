// Static prerender for the Leader Audit SPA — CONTENT-AWARE.
// For every route it injects, into the built dist/index.html shell:
//   - per-route <title>, <meta description/keywords/robots>, canonical + hreflang
//   - per-route Open Graph / Twitter values
//   - per-route JSON-LD @graph (Organization + WebSite reused from index.html, plus
//     page-specific WebPage/BreadcrumbList/Service/FAQPage/BlogPosting/CollectionPage)
//   - per-route <noscript> body with the page's REAL content (so non-JS AI crawlers
//     read page-specific text + schema instead of homepage boilerplate).
// React then hydrates this HTML at runtime. Home routes keep the curated index.html graph.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadContent } from "./seo-data.mjs";
import {
  SITE_URL,
  buildRoutes,
  canonicalOf,
  alternatesOf,
  buildGraph,
  buildNoscriptInner,
  escapeHtml,
} from "./seo-shared.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "../dist");
const indexHtmlPath = path.join(distDir, "index.html");

if (!fs.existsSync(indexHtmlPath)) {
  console.error("[prerender] dist/index.html not found. Run `vite build` first.");
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexHtmlPath, "utf-8");

// Extract the homepage JSON-LD so non-home pages can reuse the SAME Organization +
// WebSite nodes (single source of truth, no drift).
const ldMatch = baseHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (!ldMatch) {
  console.error("[prerender] JSON-LD block not found in index.html");
  process.exit(1);
}
const homeGraph = JSON.parse(ldMatch[1]);
const orgNode = homeGraph["@graph"].find((n) =>
  Array.isArray(n["@type"]) ? n["@type"].includes("Organization") : n["@type"] === "Organization",
);
const websiteNode = homeGraph["@graph"].find((n) => n["@type"] === "WebSite");
if (!orgNode || !websiteNode) {
  console.error("[prerender] Organization/WebSite node missing in index.html graph");
  process.exit(1);
}

// Russian homepage FAQ (the EN/UZ translations live in scripts/home-faq.mjs).
const faqNode = homeGraph["@graph"].find((n) => n["@type"] === "FAQPage");
const homeFaqRu = (faqNode?.mainEntity || []).map((q) => ({ q: q.name, a: q.acceptedAnswer.text }));

const OG_LOCALES = { ru: "ru_RU", uz: "uz_UZ", en: "en_US" };
const ogLocale = (lang) => OG_LOCALES[lang];

const content = await loadContent();
const routes = buildRoutes(content);

// Hashed hero webp → a document-level preload on home so the LCP image fetches in
// parallel with the JS (the SPA injects the <picture> only after the bundle parses).
let heroWebp = null;
try {
  const f = fs.readdirSync(path.join(distDir, "assets")).find((n) => /^shield-.*\.webp$/.test(n));
  if (f) heroWebp = `/assets/${f}`;
} catch {
  /* assets dir missing — skip preload */
}

const replaceTag = (html, regex, replacement) => {
  if (!regex.test(html)) {
    console.warn(`[prerender]   ⚠ pattern not matched: ${regex}`);
    return html;
  }
  return html.replace(regex, () => replacement);
};

const buildHtml = (route) => {
  const canonical = canonicalOf(route);
  const alts = alternatesOf(route);
  let html = baseHtml;

  html = html.replace(/<html lang="[^"]*">/, `<html lang="${route.lang}">`);
  html = replaceTag(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(route.title)}</title>`);
  html = replaceTag(html, /<meta name="description"[^>]*>/, `<meta name="description" content="${escapeHtml(route.description)}" data-rh="true" />`);

  if (route.keywords)
    html = replaceTag(html, /<meta name="keywords"[^>]*>/, `<meta name="keywords" content="${escapeHtml(route.keywords)}" data-rh="true" />`);

  const robots = route.noindex
    ? "noindex, nofollow"
    : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";
  html = replaceTag(html, /<meta name="robots"[^>]*>/, `<meta name="robots" content="${robots}" data-rh="true" />`);

  if (route.noindex) {
    // noindex pages (404) carry no canonical/hreflang
    html = html.replace(/\s*<link rel="canonical"[^>]*>/, "");
    html = html.replace(/\s*<link rel="alternate" hreflang="[^"]*"[^>]*>/g, "");
  } else {
    html = replaceTag(html, /<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonical}" data-rh="true" />`);
    html = replaceTag(html, /<link rel="alternate" hreflang="ru"[^>]*>/, `<link rel="alternate" hreflang="ru" href="${alts.ru}" data-rh="true" />`);
    html = replaceTag(html, /<link rel="alternate" hreflang="uz"[^>]*>/, `<link rel="alternate" hreflang="uz" href="${alts.uz}" data-rh="true" />`);
    html = replaceTag(html, /<link rel="alternate" hreflang="en"[^>]*>/, `<link rel="alternate" hreflang="en" href="${alts.en}" data-rh="true" />`);
    html = replaceTag(html, /<link rel="alternate" hreflang="x-default"[^>]*>/, `<link rel="alternate" hreflang="x-default" href="${alts.ru}" data-rh="true" />`);
  }

  const ogType = route.type === "blogpost" ? "article" : "website";
  html = replaceTag(html, /<meta property="og:type"[^>]*>/, `<meta property="og:type" content="${ogType}" data-rh="true" />`);
  html = replaceTag(html, /<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${escapeHtml(route.title)}" data-rh="true" />`);
  html = replaceTag(html, /<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${escapeHtml(route.description)}" data-rh="true" />`);
  html = replaceTag(html, /<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${canonical}" data-rh="true" />`);
  html = replaceTag(html, /<meta property="og:locale"[^>]*>/, `<meta property="og:locale" content="${ogLocale(route.lang)}" data-rh="true" />`);

  // og:locale:alternate — the two locales other than the current one
  const altLocales = ["ru", "uz", "en"].filter((l) => l !== route.lang).map((l) => OG_LOCALES[l]);
  html = html.replace(
    /<meta property="og:locale:alternate"[^>]*>\s*<meta property="og:locale:alternate"[^>]*>/,
    () =>
      `<meta property="og:locale:alternate" content="${altLocales[0]}" data-rh="true" />\n    <meta property="og:locale:alternate" content="${altLocales[1]}" data-rh="true" />`,
  );

  html = replaceTag(html, /<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${escapeHtml(route.title)}" data-rh="true" />`);
  html = replaceTag(html, /<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${escapeHtml(route.description)}" data-rh="true" />`);

  // Per-route JSON-LD @graph — regenerated for EVERY route (incl. localized home).
  const graph = buildGraph(route, content, orgNode, websiteNode, homeFaqRu);
  const ld = { "@context": "https://schema.org", "@graph": graph };
  html = html.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    () => `<script type="application/ld+json">\n${JSON.stringify(ld, null, 2)}\n</script>`,
  );

  // Home LCP: preload the hero webp (desktop only — it is hidden below lg).
  if (route.type === "home" && heroWebp) {
    html = html.replace(
      "</head>",
      `  <link rel="preload" as="image" type="image/webp" href="${heroWebp}" media="(min-width: 1024px)" />\n  </head>`,
    );
  }

  // Per-route no-JS body — regenerated for EVERY route (incl. localized home).
  const inner = buildNoscriptInner(route, content, homeFaqRu);
  if (inner) {
    html = html.replace(
      /<div class="seo-fallback">[\s\S]*?<\/div>\s*<\/noscript>/,
      () => `<div class="seo-fallback">\n${inner}\n</div>\n      </noscript>`,
    );
  }

  return html;
};

let written = 0;
for (const route of routes) {
  const html = buildHtml(route);

  let outRel = route.path;
  if (outRel.endsWith("/")) outRel = outRel.slice(0, -1);
  const outPath =
    outRel === "" ? "index.html" : outRel === "/404" ? "404.html" : path.join(outRel.slice(1), "index.html");
  const outFull = path.join(distDir, outPath);

  fs.mkdirSync(path.dirname(outFull), { recursive: true });
  fs.writeFileSync(outFull, html, "utf-8");
  written++;
  console.log(`[prerender] ${route.path}  →  ${outPath}`);
}

console.log(`\n[prerender] Wrote ${written} pages to dist/`);
