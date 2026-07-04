import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getPost, formatDate } from "@/lib/blog";

export const dynamicParams = true;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: post.cover ? [post.cover] : undefined,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article>
      <div className="mx-auto max-w-[760px] px-6 py-16 md:px-10 md:py-20">
        <Link
          href="/blog"
          className="mb-10 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em] text-mono transition-colors hover:text-accent"
        >
          <span className="font-mono">&larr;</span> Blog
        </Link>

        <div className="mb-5 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-mono">
          <span>{formatDate(post.date)}</span>
          <span className="text-[#C9C6BC]">/</span>
          <span>{post.readingTime}</span>
          <span className="text-[#C9C6BC]">/</span>
          <span>{post.author}</span>
        </div>

        <h1 className="m-0 mb-8 font-display text-[clamp(32px,4.2vw,50px)] font-bold leading-[1.08] tracking-[-0.015em] text-ink text-balance">
          {post.title}
        </h1>

        {post.cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.cover}
            alt={post.title}
            className="mb-10 w-full rounded-xl border border-line"
          />
        )}

        <div className="prose">
          <MDXRemote source={post.content} />
        </div>

        <div className="mt-16 border-t border-line pt-8">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-[10px] bg-ink px-6 py-[14px] text-[15px] font-medium text-canvas transition-colors hover:bg-[#2A2D34]"
          >
            Work with us <span className="font-mono">&rarr;</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
