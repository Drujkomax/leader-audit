import type { BlogPost } from "@/data/blog-posts";
import type { Language } from "@/contexts/language-context";

export const API_URL: string =
  import.meta.env.VITE_API_URL || "http://localhost:8787";

const TOKEN_KEY = "la_admin_token";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t: string) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
      ...init.headers,
    },
  });
  if (res.status === 401) {
    clearToken();
    throw new Error("unauthorized");
  }
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

export type AdminPost = {
  slug: string;
  lang: Language;
  data: BlogPost;
  status: "draft" | "published";
  updated_at: string;
};

export type Lead = {
  id: number;
  name: string;
  phone: string;
  company: string;
  lang: string;
  page: string;
  status: "new" | "processed";
  created_at: string;
};

export const api = {
  login: (email: string, password: string) =>
    request<{ token: string; email: string }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  posts: () => request<AdminPost[]>("/api/posts"),
  savePost: (lang: Language, slug: string, data: BlogPost, status: "draft" | "published") =>
    request<{ ok: boolean }>(`/api/posts/${lang}/${slug}`, {
      method: "PUT",
      body: JSON.stringify({ data, status }),
    }),
  deletePost: (lang: Language, slug: string) =>
    request<{ ok: boolean }>(`/api/posts/${lang}/${slug}`, { method: "DELETE" }),
  leads: () => request<Lead[]>("/api/leads"),
  setLeadStatus: (id: number, status: "new" | "processed") =>
    request<{ ok: boolean }>(`/api/leads/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
};
