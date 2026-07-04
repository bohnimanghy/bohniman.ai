import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on engineering, AI and building products that last — from the Bohniman Systems team.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <section>
      <div className="mx-auto max-w-[1240px] px-6 py-20 md:px-10">
        <div className="mb-[22px] font-mono text-[12px] uppercase tracking-[0.18em] text-accent">
          Blog
        </div>
        <h1 className="m-0 mb-4 font-display text-[clamp(34px,4.4vw,54px)] font-bold leading-[1.05] tracking-[-0.015em] text-ink">
          Notes from the team.
        </h1>
        <p className="m-0 mb-14 max-w-[52ch] text-[18px] leading-[1.6] text-muted">
          Engineering, AI and the craft of building products that last.
        </p>

        {posts.length === 0 ? (
          <div className="rounded-2xl border border-line bg-canvas-soft p-12 text-center">
            <p className="m-0 text-[17px] text-muted">
              No posts yet — check back soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 border-t border-line sm:grid-cols-2 sm:border-l">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col border-b border-line p-9 transition-colors hover:bg-[#FBFAF6] sm:border-r"
              >
                <div className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-mono">
                  <span>{formatDate(post.date)}</span>
                  <span className="text-[#C9C6BC]">/</span>
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="m-0 mb-3 font-display text-[26px] font-semibold leading-[1.15] tracking-[-0.01em] text-ink">
                  {post.title}
                </h2>
                <p className="m-0 mb-6 text-[16px] leading-[1.6] text-muted">
                  {post.excerpt}
                </p>
                <span
                  className="mt-auto inline-flex items-center gap-2 text-[14px] font-medium"
                  style={{ color: "color-mix(in oklab,var(--accent),black 18%)" }}
                >
                  Read post{" "}
                  <span className="font-mono transition-all group-hover:translate-x-[4px]">
                    &rarr;
                  </span>
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
