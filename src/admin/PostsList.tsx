import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { api, type AdminPost } from "./api";

const LANG_LABEL: Record<string, string> = { ru: "RU", uz: "UZ", en: "EN" };

const PostsList = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({ queryKey: ["admin-posts"], queryFn: api.posts, retry: false });

  if (error && (error as Error).message === "unauthorized") {
    navigate("/admin");
    return null;
  }

  // Group rows by slug so one article (3 languages) is one line.
  const bySlug = new Map<string, AdminPost[]>();
  for (const p of data ?? []) {
    bySlug.set(p.slug, [...(bySlug.get(p.slug) ?? []), p]);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Статьи блога</h1>
        <Link
          to="/admin/posts/new"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"
        >
          <Plus className="w-4 h-4" /> Новая статья
        </Link>
      </div>

      {isLoading && <p className="text-muted-foreground">Загрузка…</p>}

      <div className="space-y-2">
        {[...bySlug.entries()].map(([slug, posts]) => {
          const main = posts.find((p) => p.lang === "ru") ?? posts[0];
          return (
            <Link
              key={slug}
              to={`/admin/posts/${slug}`}
              className="block bg-card border border-border rounded-xl px-5 py-4 hover:border-primary transition-colors"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="font-semibold text-foreground">{main.data.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    /{slug} · {main.data.publishedDate} · {main.data.category}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {posts.map((p) => (
                    <span
                      key={p.lang}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        p.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                      title={p.status === "published" ? "Опубликовано" : "Черновик"}
                    >
                      {LANG_LABEL[p.lang]}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PostsList;
