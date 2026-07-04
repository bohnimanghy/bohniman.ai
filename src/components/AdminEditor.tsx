"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { publishPost, logoutAction, type PublishState } from "@/app/admin/actions";
import { slugify } from "@/lib/slug";

const initial: PublishState = { ok: false };

const inputClass =
  "w-full rounded-[10px] border border-line bg-white px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-[#A6A399] focus:border-accent";
const labelClass =
  "mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-mono";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-[10px] bg-ink px-6 py-[14px] text-[15px] font-medium text-canvas transition-colors hover:bg-[#2A2D34] disabled:opacity-60"
    >
      {pending ? "Publishing…" : "Publish post"}
      <span className="font-mono">&rarr;</span>
    </button>
  );
}

export function AdminEditor({ today }: { today: string }) {
  const [state, action] = useActionState(publishPost, initial);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);

  const effectiveSlug = slug || slugify(title);

  return (
    <div className="mx-auto max-w-[820px] px-6 py-16 md:px-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <div className="mb-2 font-mono text-[12px] uppercase tracking-[0.18em] text-accent">
            Admin · New post
          </div>
          <h1 className="m-0 font-display text-[32px] font-bold tracking-[-0.01em] text-ink">
            Write a blog post
          </h1>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="rounded-[9px] border border-line px-4 py-2 text-[13px] font-medium text-muted transition-colors hover:text-ink"
          >
            Sign out
          </button>
        </form>
      </div>

      {state.ok ? (
        <div className="rounded-2xl border border-line bg-canvas-soft p-8">
          <div className="mb-3 font-mono text-[12px] uppercase tracking-[0.16em] text-accent">
            Published
          </div>
          <h3 className="m-0 mb-3 font-display text-[24px] font-bold tracking-[-0.01em] text-ink">
            Committed to the repo.
          </h3>
          <p className="m-0 mb-4 text-[16px] leading-[1.6] text-muted">
            Your post <code className="font-mono">{state.slug}.mdx</code> was
            committed. The site will rebuild and go live in ~40 seconds.
          </p>
          {state.commitUrl && (
            <a
              href={state.commitUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[15px] font-medium"
              style={{ color: "color-mix(in oklab,var(--accent),black 18%)" }}
            >
              View commit <span className="font-mono">&rarr;</span>
            </a>
          )}
          <div className="mt-6">
            <a
              href="/admin"
              className="inline-flex items-center gap-2 rounded-[10px] bg-ink px-5 py-3 text-[14px] font-medium text-canvas hover:bg-[#2A2D34]"
            >
              Write another
            </a>
          </div>
        </div>
      ) : (
        <form action={action} className="grid gap-6">
          {state.error && (
            <div className="rounded-[10px] border border-[#E7C4B6] bg-[#FBEEE8] px-4 py-3 text-[14px] text-[#8A3A1E]">
              {state.error}
            </div>
          )}

          <div>
            <label htmlFor="title" className={labelClass}>
              Title
            </label>
            <input
              id="title"
              name="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
              placeholder="Why we build AI on 26 years of proof"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="slug" className={labelClass}>
                Slug
              </label>
              <input
                id="slug"
                name="slug"
                value={slugTouched ? slug : effectiveSlug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setSlug(slugify(e.target.value));
                }}
                className={`${inputClass} font-mono`}
                placeholder="why-we-build-ai"
              />
            </div>
            <div>
              <label htmlFor="date" className={labelClass}>
                Date
              </label>
              <input
                id="date"
                name="date"
                type="date"
                required
                defaultValue={today}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="author" className={labelClass}>
                Author
              </label>
              <input
                id="author"
                name="author"
                required
                defaultValue="Bohniman Systems"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="tags" className={labelClass}>
                Tags <span className="normal-case text-[#B9B6AC]">(comma-separated)</span>
              </label>
              <input id="tags" name="tags" className={inputClass} placeholder="engineering, ai" />
            </div>
          </div>

          <div>
            <label htmlFor="excerpt" className={labelClass}>
              Excerpt
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              required
              rows={2}
              className={`${inputClass} resize-y`}
              placeholder="One or two sentences shown on the blog list."
            />
          </div>

          <div>
            <label htmlFor="cover" className={labelClass}>
              Cover image <span className="normal-case text-[#B9B6AC]">(optional)</span>
            </label>
            <input id="cover" name="cover" type="file" accept="image/*" className="text-[14px] text-muted" />
          </div>

          <div>
            <label htmlFor="images" className={labelClass}>
              In-post images <span className="normal-case text-[#B9B6AC]">(optional, multiple)</span>
            </label>
            <input id="images" name="images" type="file" accept="image/*" multiple className="text-[14px] text-muted" />
            <p className="mt-2 text-[13px] leading-[1.5] text-mono">
              Reference them in the body as{" "}
              <code className="font-mono text-ink">
                ![alt](/blog/{effectiveSlug || "your-slug"}/filename.jpg)
              </code>
            </p>
          </div>

          <div>
            <label htmlFor="body" className={labelClass}>
              Body <span className="normal-case text-[#B9B6AC]">(Markdown / MDX)</span>
            </label>
            <textarea
              id="body"
              name="body"
              required
              rows={18}
              className={`${inputClass} resize-y font-mono text-[14px] leading-[1.6]`}
              placeholder={"## Heading\n\nWrite your post in Markdown.\n\n- Point one\n- Point two\n\n> A pull quote."}
            />
          </div>

          <div>
            <Submit />
          </div>
        </form>
      )}
    </div>
  );
}
