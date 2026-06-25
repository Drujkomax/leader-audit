// Generates public/sitemap.xml from the shared route table (single source of truth).
// Every <url> declares the full ru/uz/en/x-default alternate set (incl. self-reference),
// blog posts use their real modifiedDate as <lastmod>, static pages use the build date.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadContent } from "./seo-data.mjs";
import { buildRoutes, canonicalOf, alternatesOf, SITE_URL } from "./seo-shared.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.resolve(__dirname, "../public/sitemap.xml");

const BUILD_DATE = new Date().toISOString().slice(0, 10);

const META = {
  home: { changefreq: "weekly", priority: "1.0" },
  service: { changefreq: "monthly", priority: "0.9" },
  cases: { changefreq: "monthly", priority: "0.8" },
  blog: { changefreq: "weekly", priority: "0.8" },
  blogpost: { changefreq: "monthly", priority: "0.7" },
  about: { changefreq: "monthly", priority: "0.6" },
  contact: { changefreq: "yearly", priority: "0.5" },
};

const content = await loadContent();
const routes = buildRoutes(content).filter((r) => !r.noindex);

const urlBlock = (route) => {
  const loc = canonicalOf(route);
  const alts = alternatesOf(route);
  const lastmod = route.type === "blogpost" ? route.modifiedDate : BUILD_DATE;
  const m = META[route.type] || { changefreq: "monthly", priority: "0.5" };
  const links = [
    `    <xhtml:link rel="alternate" hreflang="ru" href="${alts.ru}" />`,
    `    <xhtml:link rel="alternate" hreflang="uz" href="${alts.uz}" />`,
    `    <xhtml:link rel="alternate" hreflang="en" href="${alts.en}" />`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${alts.ru}" />`,
  ].join("\n");
  return [
    "  <url>",
    `    <loc>${loc}</loc>`,
    links,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${m.changefreq}</changefreq>`,
    `    <priority>${m.priority}</priority>`,
    "  </url>",
  ].join("\n");
};

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  routes.map(urlBlock).join("\n"),
  "</urlset>",
  "",
].join("\n");

fs.writeFileSync(outPath, xml, "utf-8");
console.log(`[sitemap] Wrote ${routes.length} URLs to public/sitemap.xml (lastmod base ${BUILD_DATE})`);
