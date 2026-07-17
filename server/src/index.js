import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { db, seed, dataDir } from "./db.js";

const PORT = process.env.PORT || 8787;

// Without an explicit JWT_SECRET, generate one once and keep it next to the DB
// so admin sessions survive server restarts.
function loadSecret() {
  if (process.env.JWT_SECRET) return process.env.JWT_SECRET;
  const file = path.join(dataDir, "jwt-secret");
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, crypto.randomBytes(32).toString("hex"), { mode: 0o600 });
  }
  return fs.readFileSync(file, "utf-8").trim();
}
const JWT_SECRET = loadSecret();

seed();

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(",") || true }));
app.use(express.json({ limit: "2mb" }));

function auth(req, res, next) {
  const token = (req.headers.authorization || "").replace(/^Bearer /, "");
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "unauthorized" });
  }
}

// ---- auth ----
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body || {};
  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(String(email || "").trim().toLowerCase());
  if (!user || !bcrypt.compareSync(String(password || ""), user.password_hash)) {
    return res.status(401).json({ error: "invalid_credentials" });
  }
  const token = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: "24h" });
  res.json({ token, email: user.email });
});

// Auto-publish: after content changes, wait for the editing session to settle,
// then trigger one Vercel rebuild for the whole batch of edits.
const PUBLISH_DEBOUNCE_MS = Number(process.env.PUBLISH_DEBOUNCE_MS || 3 * 60 * 1000);
let publishTimer = null;
function schedulePublish() {
  const hook = process.env.DEPLOY_HOOK_URL;
  if (!hook) return;
  clearTimeout(publishTimer);
  publishTimer = setTimeout(async () => {
    try {
      const r = await fetch(hook, { method: "POST" });
      console.log(`Deploy hook triggered (${r.status})`);
    } catch (e) {
      console.error(`Deploy hook failed: ${e.message}`);
    }
  }, PUBLISH_DEBOUNCE_MS);
}

// ---- posts (admin) ----
app.get("/api/posts", auth, (_req, res) => {
  const rows = db.prepare("SELECT slug, lang, data, status, updated_at FROM posts ORDER BY slug, lang").all();
  res.json(rows.map((r) => ({ ...r, data: JSON.parse(r.data) })));
});

app.put("/api/posts/:lang/:slug", auth, (req, res) => {
  const { lang, slug } = req.params;
  if (!["ru", "uz", "en"].includes(lang)) return res.status(400).json({ error: "bad_lang" });
  if (!/^[a-z0-9-]+$/.test(slug)) return res.status(400).json({ error: "bad_slug" });
  const { data, status = "published" } = req.body || {};
  if (!data || typeof data !== "object" || !Array.isArray(data.content)) {
    return res.status(400).json({ error: "bad_data" });
  }
  data.slug = slug;
  db.prepare(
    `INSERT INTO posts (slug, lang, data, status, updated_at) VALUES (?, ?, ?, ?, datetime('now'))
     ON CONFLICT (slug, lang) DO UPDATE SET data = excluded.data, status = excluded.status, updated_at = datetime('now')`
  ).run(slug, lang, JSON.stringify(data), status === "draft" ? "draft" : "published");
  if (status !== "draft") schedulePublish();
  res.json({ ok: true });
});

app.delete("/api/posts/:lang/:slug", auth, (req, res) => {
  const { lang, slug } = req.params;
  db.prepare("DELETE FROM posts WHERE slug = ? AND lang = ?").run(slug, lang);
  schedulePublish();
  res.json({ ok: true });
});

// ---- posts (public, published only) ----
app.get("/api/public/posts", (req, res) => {
  const lang = req.query.lang;
  const rows = lang
    ? db.prepare("SELECT slug, lang, data FROM posts WHERE status = 'published' AND lang = ?").all(lang)
    : db.prepare("SELECT slug, lang, data FROM posts WHERE status = 'published'").all();
  const out = {};
  for (const r of rows) {
    (out[r.lang] ||= {})[r.slug] = JSON.parse(r.data);
  }
  res.json(out);
});

// ---- leads ----
const leadTimestamps = new Map(); // naive per-IP rate limit
app.post("/api/leads", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "?";
  const now = Date.now();
  const recent = (leadTimestamps.get(ip) || []).filter((t) => now - t < 60_000);
  if (recent.length >= 5) return res.status(429).json({ error: "too_many_requests" });
  leadTimestamps.set(ip, [...recent, now]);

  const { name, phone, company, lang, page } = req.body || {};
  if (!name || !phone || String(name).length > 200 || String(phone).length > 50) {
    return res.status(400).json({ error: "bad_lead" });
  }
  db.prepare("INSERT INTO leads (name, phone, company, lang, page) VALUES (?, ?, ?, ?, ?)").run(
    String(name).slice(0, 200),
    String(phone).slice(0, 50),
    String(company || "").slice(0, 300),
    String(lang || "").slice(0, 5),
    String(page || "").slice(0, 300)
  );
  res.json({ ok: true });
});

app.get("/api/leads", auth, (_req, res) => {
  res.json(db.prepare("SELECT * FROM leads ORDER BY id DESC").all());
});

app.patch("/api/leads/:id", auth, (req, res) => {
  const status = req.body?.status === "processed" ? "processed" : "new";
  db.prepare("UPDATE leads SET status = ? WHERE id = ?").run(status, req.params.id);
  res.json({ ok: true });
});

// ---- publish (trigger Vercel rebuild) ----
app.post("/api/publish", auth, async (_req, res) => {
  const hook = process.env.DEPLOY_HOOK_URL;
  if (!hook) return res.status(501).json({ error: "deploy_hook_not_configured" });
  try {
    const r = await fetch(hook, { method: "POST" });
    res.json({ ok: r.ok });
  } catch {
    res.status(502).json({ error: "deploy_hook_failed" });
  }
});

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`leader-audit server on :${PORT}`));
