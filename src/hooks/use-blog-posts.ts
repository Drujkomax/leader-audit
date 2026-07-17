import { useQuery } from "@tanstack/react-query";
import { blogPosts, type BlogPost } from "@/data/blog-posts";
import type { Language } from "@/contexts/language-context";

const API_URL: string = import.meta.env.VITE_API_URL || "http://localhost:8787";

// Published posts from the CMS backend, merged over the statically baked set.
// If the API is unreachable the site behaves exactly as before.
export function useBlogPosts(language: Language): {
  posts: Record<string, BlogPost>;
  isLoading: boolean;
} {
  const { data, isLoading } = useQuery({
    queryKey: ["public-posts"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/public/posts`);
      if (!res.ok) throw new Error("api unavailable");
      return res.json() as Promise<Record<Language, Record<string, BlogPost>>>;
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  return {
    posts: { ...blogPosts[language], ...(data?.[language] ?? {}) },
    isLoading,
  };
}
