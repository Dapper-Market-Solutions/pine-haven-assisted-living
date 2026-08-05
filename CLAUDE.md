# Pine Haven Assisted Living Home — Agent Brief

**Live client site.** Present tense: how this repo *is*. History and open items live in
`STATUS.md` — read that first.

- **Domain:** [pinehavenassistedliving.com](https://pinehavenassistedliving.com) · Hemlock, MI
  (Saginaw County).
- **Repo:** `Dapper-Market-Solutions/pine-haven-assisted-living` (SSH). Push to `main` → Vercel.
- **Stack:** React 18 + Vite 7 + Tailwind 3 + **`vite-react-ssg`** + `react-helmet-async`.
- **Shape:** 13 pages in `src/pages/*Page.jsx`, 12 components,
  `src/lib/{site,schema,analytics,utils}.js`.
- **SEO:** `<MetaTags>` (the DMS standard). Don't introduce a `useSEO` hook.

## What this site does and doesn't have

- **Services:** Assisted Living, Memory Care, Respite Care — plus an `AreaPage` for local
  service-area coverage and a Gallery.
- **No blog.** There is no `src/content/posts/` directory and the Blog Writer is off for this
  site. If it's ever turned on, the receiving scaffold has to be built first (loader, route,
  BlogPost page, `.post-content` CSS) or approvals commit JSON into a void.
- **GEO / AI-answer tracking is ON**; the SEO analyst runs on the 1st and 15th.

## Traps specific to this repo

1. **YMYL / elder care.** Copy about care levels, staffing and safety carries real weight for
   families making a hard decision. Don't add claims the client hasn't made, and don't invent
   numbers — no bed counts, staff ratios or pricing that aren't already sourced.
2. **Anti-spam is wired on the forms** (honeypot + time-trap + Turnstile). Any new form must
   keep it; removing it invites junk into the client's inbox.
3. **Dead URLs beacon to the DMS 404 loop** (`NotFound` posts to `/api/ingest-404`). Keep that
   wiring when touching the 404 page — it's how broken inbound links get found.

## Standing rules

- `git fetch && git pull --ff-only` before editing — Site Hygiene commits here automatically.
- Update `STATUS.md` (append dated) and this file (edit in place) at the end of any session
  with durable changes.
- Site-standard changes belong in `dms-website-template`, not here.
