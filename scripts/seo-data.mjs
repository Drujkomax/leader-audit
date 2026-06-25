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

export async function loadContent() {
  const [services, blog, cases] = await Promise.all([
    loadModule("services-content.ts"),
    loadModule("blog-posts.ts"),
    loadModule("cases-content.ts"),
  ]);
  return {
    servicesContent: services.servicesContent,
    blogPosts: blog.blogPosts,
    casesContent: cases.casesContent,
  };
}
