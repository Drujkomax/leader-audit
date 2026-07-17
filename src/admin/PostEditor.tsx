import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import type { BlogPost } from "@/data/blog-posts";
import type { Language } from "@/contexts/language-context";
import { api } from "./api";
import { blocksToText, textToBlocks } from "./content-serializer";

const LANGS: Language[] = ["ru", "uz", "en"];
const LANG_LABEL: Record<Language, string> = { ru: "Русский", uz: "O'zbekcha", en: "English" };

type Draft = {
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  excerpt: string;
  publishedDate: string;
  modifiedDate: string;
  readingTime: string;
  category: string;
  contentText: string;
  faqs: { question: string; answer: string }[];
  status: "draft" | "published";
};

const emptyDraft = (): Draft => ({
  title: "",
  metaTitle: "",
  metaDescription: "",
  keywords: "",
  excerpt: "",
  publishedDate: new Date().toISOString().slice(0, 10),
  modifiedDate: new Date().toISOString().slice(0, 10),
  readingTime: "5 мин",
  category: "",
  contentText: "",
  faqs: [],
  status: "draft",
});

const toDraft = (post: BlogPost, status: "draft" | "published"): Draft => ({
  title: post.title,
  metaTitle: post.metaTitle,
  metaDescription: post.metaDescription,
  keywords: post.keywords,
  excerpt: post.excerpt,
  publishedDate: post.publishedDate,
  modifiedDate: post.modifiedDate,
  readingTime: post.readingTime,
  category: post.category,
  contentText: blocksToText(post.content),
  faqs: post.faqs ?? [],
  status,
});

const fromDraft = (slug: string, d: Draft): BlogPost => ({
  slug,
  title: d.title,
  metaTitle: d.metaTitle,
  metaDescription: d.metaDescription,
  keywords: d.keywords,
  excerpt: d.excerpt,
  publishedDate: d.publishedDate,
  modifiedDate: d.modifiedDate,
  readingTime: d.readingTime,
  category: d.category,
  content: textToBlocks(d.contentText),
  ...(d.faqs.length ? { faqs: d.faqs.filter((f) => f.question && f.answer) } : {}),
});

const field =
  "w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary";

const PostEditor = () => {
  const { slug: routeSlug } = useParams<{ slug: string }>();
  const isNew = !routeSlug;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [slug, setSlug] = useState(routeSlug ?? "");
  const [lang, setLang] = useState<Language>("ru");
  const [drafts, setDrafts] = useState<Record<Language, Draft | null>>({ ru: null, uz: null, en: null });
  const [saving, setSaving] = useState(false);

  const { data: posts } = useQuery({ queryKey: ["admin-posts"], queryFn: api.posts, retry: false, enabled: !isNew });

  useEffect(() => {
    // A draft stashed before a forced re-login wins over anything else.
    const stashKey = `la_draft_${routeSlug || "new"}`;
    const stashed = localStorage.getItem(stashKey);
    if (stashed) {
      try {
        const { slug: stashedSlug, drafts: stashedDrafts } = JSON.parse(stashed);
        if (stashedSlug) setSlug(stashedSlug);
        setDrafts(stashedDrafts);
        localStorage.removeItem(stashKey);
        toast.info("Восстановлен несохранённый текст");
        return;
      } catch {
        localStorage.removeItem(stashKey);
      }
    }
    if (isNew) {
      setDrafts({ ru: emptyDraft(), uz: null, en: null });
      return;
    }
    if (!posts) return;
    const next: Record<Language, Draft | null> = { ru: null, uz: null, en: null };
    for (const p of posts.filter((p) => p.slug === routeSlug)) {
      next[p.lang] = toDraft(p.data, p.status);
    }
    setDrafts(next);
  }, [posts, routeSlug, isNew]);

  const draft = drafts[lang];

  const update = (patch: Partial<Draft>) =>
    setDrafts((prev) => ({ ...prev, [lang]: { ...(prev[lang] as Draft), ...patch } }));

  const slugValid = useMemo(() => /^[a-z0-9-]+$/.test(slug), [slug]);

  // Saves EVERY language that has content, not just the open tab — a regular
  // user expects one Save button to persist the whole article.
  const handleSave = async (status: "draft" | "published") => {
    if (!slugValid) return toast.error("Укажите корректный slug (латиница, цифры, дефисы)");
    const filled = LANGS.filter((l) => drafts[l] && (drafts[l] as Draft).title.trim());
    if (filled.length === 0) return toast.error("Укажите заголовок хотя бы на одном языке");
    setSaving(true);
    try {
      for (const l of filled) {
        const d = drafts[l] as Draft;
        await api.savePost(l, slug, fromDraft(slug, { ...d, status }), status);
      }
      setDrafts((prev) => {
        const next = { ...prev };
        for (const l of filled) next[l] = { ...(next[l] as Draft), status };
        return next;
      });
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
      const langNote = filled.map((l) => l.toUpperCase()).join(", ");
      toast.success(
        status === "published"
          ? `Сохранено и опубликовано (${langNote})`
          : `Черновик сохранён (${langNote})`
      );
      if (isNew) navigate(`/posts/${slug}`, { replace: true });
    } catch (e) {
      if ((e as Error).message === "unauthorized") {
        // Keep the unsaved work: stash it (keyed by ROUTE, matching restore), restore after re-login.
        localStorage.setItem(`la_draft_${routeSlug || "new"}`, JSON.stringify({ slug, drafts }));
        toast.error("Сессия истекла — войдите заново, текст статьи сохранён локально");
        return navigate("/");
      }
      toast.error("Ошибка сохранения");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Удалить версию «${LANG_LABEL[lang]}» статьи ${slug}?`)) return;
    try {
      await api.deletePost(lang, slug);
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
      setDrafts((prev) => ({ ...prev, [lang]: null }));
      toast.success("Удалено");
    } catch {
      toast.error("Ошибка удаления");
    }
  };

  return (
    <div className="max-w-4xl">
      <button
        onClick={() => navigate("/posts")}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> К списку статей
      </button>

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-foreground">{isNew ? "Новая статья" : slug}</h1>
      </div>

      {isNew && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-foreground mb-1">Slug (URL статьи)</label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value.trim().toLowerCase())}
            placeholder="naprimer-nalogovyy-audit-2026"
            className={field}
          />
          {slug && !slugValid && (
            <p className="text-destructive text-xs mt-1">Только латиница, цифры и дефисы</p>
          )}
        </div>
      )}

      <div className="flex gap-1 mb-4 border-b border-border">
        {LANGS.map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
            }`}
          >
            {LANG_LABEL[l]}
            {drafts[l] ? "" : " (нет)"}
          </button>
        ))}
      </div>

      {!draft ? (
        <div className="bg-card border border-border rounded-xl p-8 text-center">
          <p className="text-muted-foreground mb-4">Версии на этом языке ещё нет.</p>
          <button
            onClick={() => {
              const source = drafts.ru ?? drafts.uz ?? drafts.en;
              setDrafts((prev) => ({
                ...prev,
                [lang]: source ? { ...source, status: "draft" } : emptyDraft(),
              }));
            }}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium"
          >
            Создать {source_label(drafts)}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">Заголовок</label>
              <input value={draft.title} onChange={(e) => update({ title: e.target.value })} className={field} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Категория</label>
              <input value={draft.category} onChange={(e) => update({ category: e.target.value })} className={field} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Время чтения</label>
              <input value={draft.readingTime} onChange={(e) => update({ readingTime: e.target.value })} className={field} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Дата публикации</label>
              <input type="date" value={draft.publishedDate} onChange={(e) => update({ publishedDate: e.target.value })} className={field} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Дата обновления</label>
              <input type="date" value={draft.modifiedDate} onChange={(e) => update({ modifiedDate: e.target.value })} className={field} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">Meta title (SEO)</label>
              <input value={draft.metaTitle} onChange={(e) => update({ metaTitle: e.target.value })} className={field} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">Meta description (SEO)</label>
              <textarea value={draft.metaDescription} onChange={(e) => update({ metaDescription: e.target.value })} rows={2} className={field} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">Ключевые слова (через запятую)</label>
              <textarea value={draft.keywords} onChange={(e) => update({ keywords: e.target.value })} rows={2} className={field} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">Анонс (excerpt)</label>
              <textarea value={draft.excerpt} onChange={(e) => update({ excerpt: e.target.value })} rows={3} className={field} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Текст статьи
              <span className="text-muted-foreground font-normal ml-2 text-xs">
                ## подзаголовок · ### мелкий подзаголовок · - список · 1. нумерованный · &gt; цитата · пустая строка между абзацами
              </span>
            </label>
            <textarea
              value={draft.contentText}
              onChange={(e) => update({ contentText: e.target.value })}
              rows={24}
              className={`${field} font-mono text-xs leading-relaxed`}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-foreground">FAQ</label>
              <button
                onClick={() => update({ faqs: [...draft.faqs, { question: "", answer: "" }] })}
                className="text-sm text-primary font-medium"
              >
                + Добавить вопрос
              </button>
            </div>
            <div className="space-y-3">
              {draft.faqs.map((f, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-4 space-y-2">
                  <div className="flex gap-2">
                    <input
                      value={f.question}
                      onChange={(e) =>
                        update({ faqs: draft.faqs.map((x, j) => (j === i ? { ...x, question: e.target.value } : x)) })
                      }
                      placeholder="Вопрос"
                      className={field}
                    />
                    <button
                      onClick={() => update({ faqs: draft.faqs.filter((_, j) => j !== i) })}
                      className="text-destructive px-2"
                      title="Удалить"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea
                    value={f.answer}
                    onChange={(e) =>
                      update({ faqs: draft.faqs.map((x, j) => (j === i ? { ...x, answer: e.target.value } : x)) })
                    }
                    placeholder="Ответ"
                    rows={3}
                    className={field}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2 pb-10">
            <button
              onClick={() => handleSave("published")}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium disabled:opacity-60"
            >
              <Save className="w-4 h-4" /> Сохранить и опубликовать
            </button>
            <button
              onClick={() => handleSave("draft")}
              disabled={saving}
              className="px-5 py-2.5 rounded-lg border border-border text-foreground font-medium disabled:opacity-60"
            >
              Сохранить как черновик
            </button>
            <span className="text-xs text-muted-foreground">
              {draft.status === "published" ? "Статус: опубликовано" : "Статус: черновик"}
            </span>
            {!isNew && (
              <button onClick={handleDelete} className="ml-auto flex items-center gap-1 text-destructive text-sm">
                <Trash2 className="w-4 h-4" /> Удалить эту версию
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

function source_label(drafts: Record<Language, Draft | null>) {
  return drafts.ru || drafts.uz || drafts.en ? "(скопировать из другого языка)" : "";
}

export default PostEditor;
