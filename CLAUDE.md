# Pine Haven Assisted Living Home — Agent Brief

**Live client site.** Present tense: how this repo *is*. History and open items live in
`STATUS.md` — read that first.

- **Domain:** [pinehavenassistedliving.com](https://pinehavenassistedliving.com) · Hemlock, MI
  (Saginaw County).
- **Repo:** `Dapper-Market-Solutions/pine-haven-assisted-living` (SSH). Push to `main` → Vercel.
- **Stack:** React 18 + Vite 7 + Tailwind 3 + **`vite-react-ssg`** + `react-helmet-async`.
- **Shape:** 15 pages in `src/pages/*Page.jsx` (13 site pages + `BlogIndexPage` + `BlogPostPage`), 12 components,
  `src/lib/{site,schema,analytics,utils}.js`.
- **SEO:** `<MetaTags>` (the DMS standard). Don't introduce a `useSEO` hook.

## What this site does and doesn't have

- **Services:** Assisted Living, Memory Care, Respite Care — plus an `AreaPage` for local
  service-area coverage and a Gallery.
- **Blog is live** at `/blog` and `/blog/:slug`, and the Weekly Blog Writer is **on** (2 posts
  a month, drafts go to review — `blog_auto_publish` is off until the voice is proven on this
  site). Posts are JSON files in `src/content/posts/`, picked up by a **glob** loader
  (`index.js`) — drop a file in, it gets a route and appears on the index. There is
  deliberately **no `posts-index.json` manifest**: that hand-maintained pattern on two other
  DMS sites is why posts exist there with no route. `/blog/:slug` has `getStaticPaths`, so
  every post prerenders. The writer emits classless HTML, styled by `.post-content` in
  `src/index.css`. It reads `featuredImage` (with `image` as a fallback).
- **GEO / AI-answer tracking is ON**; the SEO analyst runs on the 1st and 15th.

## Brand

There is **no `brand.config.js`** here — the palette is **HSL CSS variables** in `src/index.css`,
consumed by `tailwind.config.js` as `hsl(var(--primary))`. That is the shadcn-style pattern rather
than §10's single-knob `brand.config.js`, so **searching for `#` finds nothing**.

| Var | HSL | Roughly |
|---|---|---|
| `--primary` | `152 30% 33%` | forest green |
| `--secondary` | `158 32% 19%` | deep green |
| `--accent` | `28 78% 50%` | warm amber |
| `--background` | `40 33% 98%` | warm off-white |
| `--foreground` | `156 24% 14%` | near-black green |

**Edit the CSS vars, never the Tailwind config** — the config only points at them.

## Traps specific to this repo

1. **YMYL / elder care.** Copy about care levels, staffing and safety carries real weight for
   families making a hard decision. Don't add claims the client hasn't made, and don't invent
   numbers — no bed counts, staff ratios or pricing that aren't already sourced.
2. **Anti-spam is wired on the forms** (honeypot + time-trap + Turnstile). Any new form must
   keep it; removing it invites junk into the client's inbox.
3. **`public/sitemap.xml` is GENERATED** by `scripts/build-sitemap.js` on `prebuild` — do not
   hand-edit it, the next build wins. It parses the `path:` keys out of `App.jsx`'s exported
   `routes` array (it can't `import` it — that file is JSX), so **adding a route to App.jsx is
   all you do**; blog posts in `src/content/posts/` are picked up automatically. `lastmod` is
   preserved per-URL rather than restamped, because Vercel builds from a shallow clone and
   restamping tells crawlers the whole site changed. If you restructure the route array, check
   this parse — it hard-fails under 10 URLs rather than shipping a truncated sitemap.
4. **Dead URLs beacon to the DMS 404 loop** (`NotFound` posts to `/api/ingest-404`). Keep that
   wiring when touching the 404 page — it's how broken inbound links get found.

## Standing rules

- `git fetch && git pull --ff-only` before editing — Site Hygiene commits here automatically.
- Update `STATUS.md` (append dated) and this file (edit in place) at the end of any session
  with durable changes.
- Site-standard changes belong in `dms-website-template`, not here.
