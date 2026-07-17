// Loads the trilingual content from src/data/*.ts into plain Node build scripts.
// The data files only carry `import type` statements (erased by esbuild), so each
// can be transpiled in isolation and imported as an ESM data: URL — keeping a single
// source of truth for prerender, sitemap and llms.txt generation.

import esbuild from "esbuild";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, "../src/data");

async function loadModule(file) {
  const result = await esbuild.build({
    entryPoints: [path.join(dataDir, file)],
    bundle: false,
    write: false,
    format: "esm",
    platform: "node",
    target: "es2020",
    logLevel: "silent",
  });
  const code = result.outputFiles[0].text;
  const url = "data:text/javascript;base64," + Buffer.from(code, "utf-8").toString("base64");
  return import(url);
}

// When CONTENT_API_URL is set (CI build), published CMS posts overlay the static
// snapshot so sitemap/llms.txt/prerender pick up articles created in the admin.
// Any failure falls back to the baked-in data — the build never breaks on it.
async function loadCmsPosts() {
  const api = process.env.CONTENT_API_URL;
  if (!api) return null;
  try {
    const res = await fetch(`${api.replace(/\/$/, "")}/api/public/posts`, {
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e) {
    console.warn(`CONTENT_API_URL unreachable (${e.message}) — using static blog data`);
    return null;
  }
}

export async function loadContent() {
  const [services, blog, cases, branchesMod, cmsPosts] = await Promise.all([
    loadModule("services-content.ts"),
    loadModule("blog-posts.ts"),
    loadModule("cases-content.ts"),
    loadModule("branches.ts"),
    loadCmsPosts(),
  ]);
  const blogPosts = { ...blog.blogPosts };
  if (cmsPosts) {
    for (const lang of Object.keys(blogPosts)) {
      blogPosts[lang] = { ...blogPosts[lang], ...(cmsPosts[lang] || {}) };
    }
  }
  return {
    servicesContent: services.servicesContent,
    blogPosts,
    casesContent: cases.casesContent,
    branches: branchesMod.branches,
  };
}
