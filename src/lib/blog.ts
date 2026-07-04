import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  excerpt: string;
  author: string;
  cover?: string;
  tags?: string[];
  readingTime: string;
};

export type Post = PostMeta & { content: string };

function ensureDir() {
  if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true });
}

function readingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
}

export function getAllSlugs(): string[] {
  ensureDir();
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

export function getPost(slug: string): Post | null {
  ensureDir();
  const mdx = path.join(BLOG_DIR, `${slug}.mdx`);
  const md = path.join(BLOG_DIR, `${slug}.md`);
  const file = fs.existsSync(mdx) ? mdx : fs.existsSync(md) ? md : null;
  if (!file) return null;

  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    excerpt: data.excerpt ?? "",
    author: data.author ?? "Bohniman Systems",
    cover: data.cover ?? undefined,
    tags: data.tags ?? [],
    readingTime: readingTime(content),
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  return getAllSlugs()
    .map((slug) => getPost(slug))
    .filter((p): p is Post => Boolean(p))
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(({ content: _content, ...meta }) => meta);
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
