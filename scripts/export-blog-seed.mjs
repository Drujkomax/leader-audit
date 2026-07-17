// Exports the static blog posts into server/seed/blog-posts.json — the snapshot
// the CMS backend seeds its database from on first start.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadContent } from "./seo-data.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(__dirname, "../server/seed/blog-posts.json");

const { blogPosts } = await loadContent();
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(blogPosts, null, 1));
console.log(
  `Wrote ${out}:`,
  Object.entries(blogPosts).map(([l, p]) => `${l}=${Object.keys(p).length}`).join(", ")
);
