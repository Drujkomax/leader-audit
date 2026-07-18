import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const dataDir = process.env.DATA_DIR || path.resolve(__dirname, "../data");
fs.mkdirSync(dataDir, { recursive: true });

export const db = new Database(path.join(dataDir, "leader.db"));
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL,
    lang TEXT NOT NULL CHECK (lang IN ('ru','uz','en')),
    data TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft','published')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE (slug, lang)
  );
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    company TEXT,
    lang TEXT,
    page TEXT,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','processed')),
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

// Миграции для баз, созданных до появления колонки. ALTER TABLE нельзя
// выполнить дважды, поэтому сверяемся с фактическими колонками таблицы.
const leadColumns = db.prepare("PRAGMA table_info(leads)").all().map((c) => c.name);
if (!leadColumns.includes("deleted_at")) {
  // NULL = заявка активна, дата = когда её убрали в архив.
  db.exec("ALTER TABLE leads ADD COLUMN deleted_at TEXT");
  console.log("Migration: leads.deleted_at added");
}

export function seed() {
  const email = process.env.ADMIN_EMAIL || "director@leaderaudit.uz";
  const password = process.env.ADMIN_PASSWORD || "leader001uz";
  const user = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
  if (!user) {
    db.prepare("INSERT INTO users (email, password_hash) VALUES (?, ?)").run(
      email,
      bcrypt.hashSync(password, 10)
    );
    console.log(`Seeded admin user ${email}`);
  }

  const count = db.prepare("SELECT COUNT(*) AS n FROM posts").get().n;
  if (count === 0) {
    const seedFile = path.resolve(__dirname, "../seed/blog-posts.json");
    if (fs.existsSync(seedFile)) {
      const blogPosts = JSON.parse(fs.readFileSync(seedFile, "utf-8"));
      const insert = db.prepare(
        "INSERT OR IGNORE INTO posts (slug, lang, data, status) VALUES (?, ?, ?, 'published')"
      );
      const tx = db.transaction(() => {
        for (const [lang, posts] of Object.entries(blogPosts)) {
          for (const [slug, post] of Object.entries(posts)) {
            insert.run(slug, lang, JSON.stringify(post));
          }
        }
      });
      tx();
      console.log("Seeded blog posts from snapshot");
    }
  }
}
