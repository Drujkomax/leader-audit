import { describe, expect, it } from "vitest";
import { blocksToText, textToBlocks } from "./content-serializer";
import { blogPosts } from "@/data/blog-posts";

describe("content-serializer", () => {
  it("round-trips every existing blog post", () => {
    for (const lang of ["ru", "uz", "en"] as const) {
      for (const post of Object.values(blogPosts[lang])) {
        const text = blocksToText(post.content);
        expect(textToBlocks(text)).toEqual(post.content);
      }
    }
  });

  it("parses the supported markdown-like syntax", () => {
    const text = [
      "## Заголовок",
      "",
      "Абзац текста.",
      "",
      "- один",
      "- два",
      "",
      "1. первый",
      "2. второй",
      "",
      "> цитата",
    ].join("\n");
    expect(textToBlocks(text)).toEqual([
      { type: "h2", text: "Заголовок" },
      { type: "p", text: "Абзац текста." },
      { type: "ul", items: ["один", "два"] },
      { type: "ol", items: ["первый", "второй"] },
      { type: "quote", text: "цитата" },
    ]);
  });
});
