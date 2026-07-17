import type { BlogPost } from "@/data/blog-posts";

type Block = BlogPost["content"][number];

// Serializes structured content blocks to an editable markdown-like text and back.
// Supported: "## " h2, "### " h3, "- " ul, "1. " ol, "> " quote, plain paragraphs.

export function blocksToText(blocks: Block[]): string {
  return blocks
    .map((b) => {
      switch (b.type) {
        case "h2":
          return `## ${b.text ?? ""}`;
        case "h3":
          return `### ${b.text ?? ""}`;
        case "quote":
          return `> ${b.text ?? ""}`;
        case "ul":
          return (b.items ?? []).map((i) => `- ${i}`).join("\n");
        case "ol":
          return (b.items ?? []).map((i, idx) => `${idx + 1}. ${i}`).join("\n");
        default:
          return b.text ?? "";
      }
    })
    .join("\n\n");
}

export function textToBlocks(text: string): Block[] {
  const blocks: Block[] = [];
  // Split on blank lines; consecutive list lines stay in one chunk.
  const chunks = text.replace(/\r\n/g, "\n").split(/\n\s*\n/);
  for (const raw of chunks) {
    const chunk = raw.trim();
    if (!chunk) continue;
    const lines = chunk.split("\n").map((l) => l.trim()).filter(Boolean);

    if (lines.every((l) => /^- /.test(l))) {
      blocks.push({ type: "ul", items: lines.map((l) => l.replace(/^- /, "")) });
    } else if (lines.every((l) => /^\d+[.)] /.test(l))) {
      blocks.push({ type: "ol", items: lines.map((l) => l.replace(/^\d+[.)] /, "")) });
    } else if (/^### /.test(chunk)) {
      blocks.push({ type: "h3", text: chunk.replace(/^### /, "") });
    } else if (/^## /.test(chunk)) {
      blocks.push({ type: "h2", text: chunk.replace(/^## /, "") });
    } else if (/^> /.test(chunk)) {
      blocks.push({ type: "quote", text: chunk.replace(/^> /, "") });
    } else {
      blocks.push({ type: "p", text: lines.join(" ") });
    }
  }
  return blocks;
}
