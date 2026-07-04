# Bohniman AI — website

Marketing site + product pages + git-backed MDX blog for **Bohniman Systems**.

Built with **Next.js (App Router) · TypeScript · Tailwind v4**. The home page is
an exact port of the Claude design in [`design/`](design/).

## Stack

| Concern      | Choice                                                     |
| ------------ | ---------------------------------------------------------- |
| Framework    | Next.js 16 (App Router, RSC, Server Actions)               |
| Styling      | Tailwind v4 (CSS `@theme` tokens) + brand palette          |
| Fonts        | Schibsted Grotesk (display), IBM Plex Sans / Mono          |
| Blog         | MDX files in `content/blog/*.mdx` (`next-mdx-remote/rsc`)  |
| Contact form | Server action → [Resend](https://resend.com) email        |
| Admin        | `/admin` password gate → commits MDX + images via GitHub API |
| Deploy       | Vercel                                                     |

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the values you need
npm run dev                  # http://localhost:3000
```

Nothing is required for the site to render locally. Features degrade gracefully:

- **Contact form** works once `RESEND_API_KEY` is set (otherwise it shows an
  "email us directly" message and logs the submission to the server console).
- **/admin** needs `ADMIN_PASSWORD`; publishing needs the `GITHUB_*` vars.

## Routes

```
/                     Home (design port)
/products/[slug]      Samagam · Kathan AI · Curioversity · RasoiOS · Biocrat
/about
/contact              Enquiry form (Resend)
/blog                 Post list
/blog/[slug]          MDX post
/admin                Login → blog editor (git-backed publish)
```

## Writing blog posts

Two ways:

1. **Commit a file** — add `content/blog/<slug>.mdx` with frontmatter:

   ```mdx
   ---
   title: "Post title"
   date: "2026-07-04"
   excerpt: "Shown on the blog list."
   author: "Your name"
   cover: "/blog/<slug>/cover.jpg"   # optional
   tags: ["engineering"]
   ---

   Body in Markdown. Images: ![alt](/blog/<slug>/photo.jpg)
   ```

   Put images under `public/blog/<slug>/`. Commit → Vercel rebuilds → live.

2. **Use `/admin`** — sign in, fill the form, upload images, hit publish. The
   server commits the `.mdx` + images to the repo in a single commit (via the
   GitHub API). Vercel redeploys automatically (~40s to live).

## Environment variables

See [`.env.example`](.env.example). Summary:

| Var                    | Used by      | Notes                                          |
| ---------------------- | ------------ | ---------------------------------------------- |
| `RESEND_API_KEY`       | contact form | Resend API key                                 |
| `CONTACT_TO_EMAIL`     | contact form | Inbox for enquiries                            |
| `CONTACT_FROM_EMAIL`   | contact form | Verified sender                                |
| `ADMIN_PASSWORD`       | /admin       | Sign-in password                               |
| `ADMIN_SESSION_SECRET` | /admin       | Optional cookie-signing secret                 |
| `GITHUB_TOKEN`         | /admin       | Fine-grained PAT, **Contents: Read and write** |
| `GITHUB_REPO`          | /admin       | `owner/repo`                                    |
| `GITHUB_BRANCH`        | /admin       | Deploy branch (default `main`)                 |

## Deploy (Vercel)

1. Push this repo to GitHub.
2. Import it in Vercel.
3. Add the env vars above in **Project → Settings → Environment Variables**.
4. `GITHUB_REPO` must point at this same repo so `/admin` can commit to it.

## Notes

- The two hero/track-record animations are `<canvas>` client components
  (`NeuralCanvas`, `NetCanvas`) ported 1:1 from the design.
- The accent colour is a single CSS variable (`--accent`) read by both the CSS
  and the canvases — change it in `globals.css` to re-theme.
- The original design source is kept in `design/` for reference.
