"use server";

import { redirect } from "next/navigation";
import matter from "gray-matter";
import { z } from "zod";
import {
  verifyPassword,
  setSession,
  clearSession,
  isAuthed,
} from "@/lib/auth";
import { commitFiles, type CommitFile, githubConfig } from "@/lib/github";
import { slugify } from "@/lib/slug";

/* ---------------- auth ---------------- */

export type LoginState = { error?: string };

export async function loginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  if (!process.env.ADMIN_PASSWORD) {
    return { error: "ADMIN_PASSWORD is not set on the server." };
  }
  if (!verifyPassword(password)) {
    return { error: "Incorrect password." };
  }
  await setSession();
  redirect("/admin");
}

export async function logoutAction() {
  await clearSession();
  redirect("/admin");
}

/* ---------------- publish ---------------- */

export type PublishState = {
  ok: boolean;
  error?: string;
  commitUrl?: string;
  slug?: string;
};

const metaSchema = z.object({
  title: z.string().trim().min(3, "Title is required.").max(160),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase words separated by hyphens."),
  date: z.string().trim().min(4, "Date is required."),
  excerpt: z.string().trim().min(10, "Excerpt is required.").max(320),
  author: z.string().trim().min(2).max(120),
  tags: z.string().trim().optional().default(""),
  body: z.string().trim().min(20, "Post body is too short."),
});

function safeName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9.\-_]/g, "-").replace(/-+/g, "-");
}

async function fileToBase64(file: File): Promise<string> {
  const buf = Buffer.from(await file.arrayBuffer());
  return buf.toString("base64");
}

export async function publishPost(
  _prev: PublishState,
  formData: FormData
): Promise<PublishState> {
  if (!(await isAuthed())) {
    return { ok: false, error: "Not authenticated." };
  }

  if (!githubConfig()) {
    return {
      ok: false,
      error:
        "GitHub isn't configured. Set GITHUB_TOKEN and GITHUB_REPO (owner/repo) in the environment.",
    };
  }

  const rawSlug = String(formData.get("slug") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const parsed = metaSchema.safeParse({
    title,
    slug: rawSlug || slugify(title),
    date: formData.get("date"),
    excerpt: formData.get("excerpt"),
    author: formData.get("author"),
    tags: formData.get("tags"),
    body: formData.get("body"),
  });

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const { slug, date, excerpt, author, tags, body } = parsed.data;
  const files: CommitFile[] = [];

  // Images (namespaced under the post slug)
  const images = formData.getAll("images").filter((v): v is File => v instanceof File && v.size > 0);
  for (const img of images) {
    files.push({
      path: `public/blog/${slug}/${safeName(img.name)}`,
      base64: await fileToBase64(img),
    });
  }

  // Cover
  let coverPath: string | undefined;
  const cover = formData.get("cover");
  if (cover instanceof File && cover.size > 0) {
    const name = safeName(cover.name);
    coverPath = `/blog/${slug}/${name}`;
    files.push({
      path: `public/blog/${slug}/${name}`,
      base64: await fileToBase64(cover),
    });
  }

  const frontmatter: Record<string, unknown> = {
    title,
    date,
    excerpt,
    author,
    tags: tags
      ? tags.split(",").map((t) => t.trim()).filter(Boolean)
      : [],
  };
  if (coverPath) frontmatter.cover = coverPath;

  const mdx = matter.stringify(`\n${body}\n`, frontmatter);
  files.push({ path: `content/blog/${slug}.mdx`, text: mdx });

  try {
    const { commitUrl } = await commitFiles(files, `blog: publish "${title}"`);
    return { ok: true, commitUrl, slug };
  } catch (err) {
    console.error("[admin] publish failed:", err);
    const msg = err instanceof Error ? err.message : "Commit failed.";
    return { ok: false, error: msg };
  }
}
