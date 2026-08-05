# Pine Haven Assisted Living — STATUS

**Last updated:** 2026-06-01

Marketing site for Pine Haven Assisted Living (Hemlock, MI). Rebuilt from the legacy WordPress
site (pinehavenassistedliving.com) to the DMS site-standard. Vite + React + Tailwind (shadcn/ui),
SSG via `vite-react-ssg`, deployed to Vercel.

## Current state
- **🚀 LAUNCHED on the real domain:** https://pinehavenassistedliving.com (2026-06-02). Apex serves the
  new site, zero WordPress markers, AI crawlers + Googlebot all return 200, canonical → apex.
- 301 redirects added for old WP slugs (/pinehaven-services→/services, /pinehaven-photos→/gallery,
  /home-3→/, /privacy-policy→/privacy, /blog/*→/).
- Vercel project: https://pine-haven-assisted-living.vercel.app (team dapper-market-solutions-projects,
  auto-deploys from `main` of `Dapper-Market-Solutions/pine-haven-assisted-living`).
- All 14 routes return 200; unknown paths 404; desktop + mobile QA pass done.
- **Real brand logo** (pine arch + alpaca + wordmark) pulled from the old WP site, in header/footer;
  favicon + OG card regenerated from it (`scripts/generate-assets.py` now reuses logo.png artwork).
- **GTM-K58BLPDF** wired (consent-gated). **AudienceLab WVID pixel** `6a1e56af...` added outside the
  consent gate, with a matching Privacy Policy disclosure.
- **Facebook** (`facebook.com/PineHavenSeniorAssistedLivingLLC`) + **Instagram** (`@pinehavenafc`)
  in footer + `sameAs`.
- Old WordPress site is still live and should NOT be deleted until the new site is verified live on
  the real domain.

## Pending from owner / launch
- ~~Google Business Profile~~ — **DONE: wired GBP Knowledge Panel (kgmid /g/1tks6ycc) into footer +
  `sameAs`.** Contact form email delivery verified working (Resend, Production env).
- ~~Confirm phone~~ — **UPDATED 2026-06-02: phone changed to (989) 642-5761** (replaced the earlier
  (989) 295-6632 across schema, site.js, notify.js, index.html). Keep this number.
- **RESEND_API_KEY** must be set in the Vercel project for the contact form to send.
- ~~**LEAD_CC**~~ — **DONE 2026-06-02: `LEAD_CC=deepak@dapperms.com` set (Production) + redeployed
  (commit 4719fc0). Verified — ops notification now CCs deepak@dapperms.com (test returned `{ok:true}`).**
  `api/lead.js` reads `LEAD_CC` (comma-separated) and CCs it on the ops email.
- **Domain cutover** — point pinehavenassistedliving.com at this Vercel project once verified, THEN
  delete the old WordPress site (which also kills its injected SEO-spam).

## Content (client feedback 2026-06-02)
- Rent: **semi-private $3,500/mo, private $3,900/mo** (`NAP.priceFrom`=$3,500 = semi-private; added
  `priceSemiPrivate`/`pricePrivate`). Replaced old "$3,300" everywhere + enriched cost FAQs.
- Staff: now **"registered nurse and LPNs on staff"** across pages (was RN-only).
- Insurance: long-term care insurance **+ Medicaid waiver** (added waiver everywhere LTC was mentioned).
- Companion animals: **alpacas, a llama, sheep, goats, and chickens** (dropped "cats" per client's list —
  re-add if they actually have cats).
- Capacity: **state-licensed for 18 residents** (`NAP.licensedFor`=18); surfaced on Home + highlights + llms.txt.
- Also fixed: llms.txt still had the OLD phone (989) 295-6632 → now (989) 642-5761.

## ⚠️ Open items before launch
1. ~~Confirm street address~~ — **CORRECTED 2026-06-02 (client): 515 N Brennan Rd, Hemlock, MI 48626**
   (added the "N"; supersedes the 2026-06-01 "515 Brennan Rd"). Updated in site.js, index.html schema,
   llms.txt, notify.js. ⚠️ Re-check NAP consistency on GBP/Google Maps + USPS so they match the "N".
2. ~~Verify the geo coordinates~~ — **DONE 2026-06-02: geocoded 515 N Brennan Rd to
   43.41709, -84.24956 (Census + OSM agree to ~4 decimals); updated site.js + index.html JSON-LD.
   Old 43.4119/-84.2289 was ~1.3 km off.**
3. **RESEND_API_KEY** must be set in Vercel for the contact form to send. Optionally set
   `OPS_TEAM_EMAIL` (defaults to pinehavenassistedliving@gmail.com) and `EMAIL_FROM` once a Pine Haven
   sending domain is verified in Resend (falls back to mail.dapperms.com).
4. **GTM_ID** is blank in `index.html` — set it when/if a GTM container is provisioned (analytics/ads
   are toggled in the GTM UI off the dataLayer `generate_lead` event; no code change needed).
5. **Google Business Profile + Wikidata** — claim/complete GBP, then wire GBP + Wikidata Q-ID into the
   empty `sameAs: []` array in `index.html` (highest-leverage local entity signal).
6. **WAF audit on launch** — confirm Cloudflare/Vercel bot protection isn't blocking the allow-listed
   AI crawlers in `robots.txt`.

## Architecture
- `src/lib/site.js` — single source of truth: NAP, nav, gallery, testimonials, service areas.
- `src/lib/schema.js` — JSON-LD builders (Service, FAQPage, BreadcrumbList).
- `src/components/ServiceDetail.jsx` — data-driven layout for the 3 deep service pages.
- `src/pages/AreaPage.jsx` — data-driven city landing pages (Saginaw/Midland/Bay City), wired in `App.jsx`.
- `api/lead.js` → `api/_lib/notify.js` — contact form → ops email + customer acknowledgement (Resend).
- Site-wide AssistedLivingFacility/LocalBusiness JSON-LD is baked into `index.html`.

## Routes (14)
`/` · `/services` · `/assisted-living` · `/memory-care` · `/respite-care` ·
`/assisted-living-saginaw` · `/assisted-living-midland` · `/assisted-living-bay-city` ·
`/gallery` · `/contact` · `/thank-you` · `/privacy` · `/cookies` · `/terms` · `*` (404)

## Content notes
- 12 real facility photos pulled from the old WP media library (2020–2021) live in `public/images/`.
- The old WP site had been SEO-spammed (a "retail sign printing" blog post + AI-stock images);
  none of that was carried over.
- Brand assets (logo.svg, favicon, OG card) are custom Pine Haven marks; regenerate the favicon/OG
  set with `python3 scripts/generate-assets.py`.

## Deploy
- Target: new Vercel project + GitHub repo under `Dapper-Market-Solutions`, then point
  `pinehavenassistedliving.com` at it once verified. `vercel.json` already has the SPA rewrite,
  cleanUrls, and security headers.

## 2026-08-05 — Blog wired, Writer enabled

The site had no blog at all — no loader, no routes, no post page, no body styles. Turning the
Writer on in that state would have committed approved JSON into a directory nothing reads, so
the scaffold went in first.

`/blog` and `/blog/:slug` now exist, with `getStaticPaths` so every post prerenders to static
HTML. The loader is a **glob**, chosen against the `posts-index.json` manifest pattern used by
`get-well-chiro` and `nxt-level-carts` — on both of those, posts exist that were never added to
the manifest, so they have no route and appear nowhere. A glob cannot drift.

Verified end to end with a throwaway post: it prerendered with its body copy plus BlogPosting
and BreadcrumbList baked into the HTML, appeared on the index, and the nav link rendered. Test
post removed; the empty state renders again.

Portal: `blog_enabled = true`, 2 posts/month, notify `Deepak@dapperms.com`.
`blog_auto_publish` is deliberately **off** — unlike Get Well, Memory Lane and Boca EV, this
site has no published posts to judge the writer's voice against, and senior care is a subject
where a wrong claim costs more than a slow one. Turn it on once a few drafts read right.
