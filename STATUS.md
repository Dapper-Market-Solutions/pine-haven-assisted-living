# Pine Haven Assisted Living — STATUS

**Last updated:** 2026-09-21 (blog unblocked — the launch-day `/blog/*` redirect was 308ing every post and `/blog` itself to `/`; homepage H1 carries the target query; area Service schema per-city). Prior: 2026-09-17 — Memory Care removal, animal list, bedroom count, social CTA; raw `\u2014` escapes fixed on / and /services (DMS-T-0257), `check:escapes` fails the build on any recurrence; 2026-08-09 — first blog draft corrected (fabricated quote); auto-publish turned ON.

Marketing site for Pine Haven Assisted Living (Hemlock, MI). Rebuilt from the legacy WordPress
site (pinehavenassistedliving.com) to the DMS site-standard. Vite + React + Tailwind (shadcn/ui),
SSG via `vite-react-ssg`, deployed to Vercel.

## 2026-09-21 — Blog was unreachable for 3 weeks; H1 target query; per-city Service schema

Visibility Analyst findings 95b11f06 / 676af804 (high), fb4da8da, 2beaeeb0 (low). Commit `1a71a1c`.

- **`/blog/:slug*` → `/` redirect removed from `vercel.json`.** It was added at launch (2026-06-02)
  to catch old WordPress post URLs, before the blog existed. Vercel's `:slug*` also matches zero
  segments, so it 308'd **`/blog` itself** and every post to the homepage — the first auto-published
  post (`assisted-living-hemlock-michigan`, 2026-08-30) sat in the sitemap for three weeks with its
  prerendered HTML never reachable. Note that STATUS's own launch entry listed `/blog/*→/` as a
  feature; nobody re-checked it when the blog shipped 2026-08. Old WP post URLs now 404 and beacon
  to the DMS 404 loop, which is the intended path for dead inbound links.
- **Homepage H1** `Care that makes a difference in Hemlock, MI` → `A small assisted living home in
  Hemlock, Michigan` — the page's one target query, using only what the hero subtitle already said.
  The subtitle drops its now-duplicate "small … assisted living home"; no new claims.
- **Area pages' `Service` schema description** was one generic string for all three cities. It is
  now built from what each page renders (hero title, distance FAQ, hero `blurb` from `AREAS` in
  `App.jsx`), so it is city-specific and still matches visible copy.
- Verified live at 15:06 UTC, first poll after push: `/blog` and `/blog/assisted-living-hemlock-michigan`
  both 200 (were 308 → `/`), new H1 on `/`, per-city description on all three area pages.
  `npm run build` clean, 15 pages, `check:escapes` passes.

## 2026-09-17b — Memory Care removed site-wide; animal list, bedroom count, social CTA (DMS-T-0257)

The rest of Jennifer's bug report, held from the escapes fix below pending confirmation. Deepak
confirmed: remove Memory Care everywhere rather than reword it.

- Memory Care is gone as a named service (not accredited for it). Deleted
  `src/pages/MemoryCarePage.jsx` and its route; stripped it from header/footer nav, the
  homepage/services/area-page service lists, the contact-form care-interest dropdown, every
  related-services block, every meta description and JSON-LD Service/comment mention, `llms.txt`,
  `site.webmanifest`, and the OG social-share card (`og-preview.jpg` had "Memory Care" baked into
  the pixels via `generate-assets.py`'s TAGLINE constant; regenerated). `/memory-care` 301s to
  `/assisted-living` in `vercel.json` rather than 404ing, since real leads had been landing on it
  (inbound inquiries from Krisa Byrne and Grace Sch, Aug/Sept 2026, both "Interested In: Memory
  Care"). Left untouched: the blog post's FAQ on suitability for Alzheimer's/dementia residents
  within Assisted Living, since it never named "Memory Care" as a distinct service and doesn't
  carry the accreditation claim. One phrase in that post ("a large campus with a memory care
  unit") was reworded to drop the term.
- Companion animals: client's corrected list (alpacas, llamas, goats, sheep, chickens, turkeys,
  ducks, and guinea fowl) replacing the shorter list across every page, `site.js`, `llms.txt`,
  and the one published blog post.
- Facility size: "six-bedroom" changed to "13-bedroom" everywhere (16 occurrences across 9
  files) per the client's corrected wording. The state-licensed-for-18-residents claim was
  already correct and untouched.
- Social CTA: added a short "Follow us on Facebook and Instagram for updates and photos" line
  above the existing icon row in the footer (`src/components/Footer.jsx`) — the icons themselves
  already existed, they just had no invitation text next to them.
- Verified: full `npm run build` clean (14 pages, was 15 before the Memory Care page removal),
  `check:escapes` passes, `public/sitemap.xml` regenerated with `/memory-care` gone and nothing
  else changed, no "memory care" or "six-bedroom" string survives anywhere in `dist/`.

## 2026-09-17 — Raw `\uXXXX` escapes were live on / and /services (DMS-T-0257)

The client reported literal `\u2014` in body copy. Served HTML had 7 on the home page and 9 on
/services, including the /services `<title>` and meta description (browser tab + Google snippet).
**Nobody typed them.** Both batches came from the Visibility Analyst auto-apply commits `0308754`
(2026-08-15, +27) and `e4167ad` (2026-08-31, +33): the analyst rewrote correct literal characters as
`\u` escapes, e.g. `title="Our Services — …"` became `title="… \u2014 …"`. Escapes render fine inside
JS string literals and paint raw in JSX attributes/text, so most of the 84 looked fine.

Fix: every `\uXXXX` in `src/` replaced with the character itself (84 across 6 page files; source is
now escape-free). Guard: `scripts/check-escapes.mjs` runs on `prebuild` (source) and `postbuild`
(built HTML outside `<script>`) and fails the build, Vercel included — a failed deploy keeps the last
good build serving, which beats shipping escapes. Verified: the old source fails the check (84), the
fixed source passes, `dist/` has zero visible escapes. The analyst's writer in dms-portal
(`api/_lib/site-edit-apply.js` / `visibility-fixgen.js`) is the root cause and is not fixed here.

Still open from the same request: remove Memory Care (not accredited), expand the companion-animal
list, 18 residents / 13 rooms wording, and a social follow prompt — all client-visible content
decisions, held for Deepak.

## 2026-09-01 — 2 site changes (auto-applied by Visibility Analyst)

Written automatically by the DMS portal at 02:54 UTC (task `302fb56f-6648-4394-81a7-64995fc29086`). Shipped without human review — the portal classified these as low-risk. Every one is revertable from the linked task in the portal.

- **Update /contact meta description for CTR improvement** — `src/pages/ContactPage.jsx`
- **Add blog post URL for assisted-living-hemlock-michigan to sitemap** — `public/sitemap.xml`

## 2026-09-01 — 7 site changes (auto-applied by Visibility Analyst)

Written automatically by the DMS portal at 01:25 UTC (task `24622353-ccf0-495b-a1f7-a4ae6264d127`). Shipped without human review — the portal classified these as low-risk. Every one is revertable from the linked task in the portal.

- **SEO: replace MetaTags title prop with keyword-optimised brand title string** — `src/pages/HomePage.jsx`
- **SEO: update metaTitle and metaDescription for assisted-living geo+query match** — `src/pages/AssistedLivingPage.jsx`
- **SEO: add Saginaw County geo keywords to metaTitle, metaDescription, and lead paragraph** — `src/pages/MemoryCarePage.jsx`
- **SEO: update /respite-care metaTitle (60 chars) and metaDescription (159 chars) for CTR** — `src/pages/RespiteCarePage.jsx`
- **SEO: update /contact metaTitle and metaDescription for higher CTR** — `src/pages/ContactPage.jsx`
- **SEO: update AREAS midland blurb to name Midland in key positions** — `src/App.jsx`
- **Add pricing section + update metaTitle/metaDescription for assisted living cost SEO** — `src/pages/ServicesPage.jsx`

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

## 2026-08-06 — Docs corrected; brand and sitemap behaviour written down

`CLAUDE.md` said **13 pages**; there are **15**. My own drift — I added `BlogIndexPage` and
`BlogPostPage` the night before and did not update the line I had written a commit earlier. Now
reads 15 (13 site pages + the two blog pages). The 12-component count was correct.

Two things were true of this repo but written down nowhere:

- **There is no `brand.config.js`.** The palette is shadcn-style **HSL CSS vars** in
  `src/index.css` (`--primary: 152 30% 33%` forest green, `--secondary`, `--accent` amber),
  consumed by Tailwind as `hsl(var(--primary))`. That deviates from §10's single-knob
  `brand.config.js` — same shape as `injury-care-coordination`. Documented in a new **Brand**
  section, so nobody hunts for a config that was never here or greps for `#` and finds nothing.
- **`public/sitemap.xml` is committed, not generated.** No `prebuild`, no `build-sitemap`
  script. That inverts the fleet default: a hand edit *sticks* here, and nothing adds a new
  route for you. Recorded as a trap.

Blog wiring from the previous session verified end to end: glob loader, `getStaticPaths` on
`/blog/:slug`, `.post-content` styles present, and **no `posts-index.json`** — the
hand-maintained manifest that left a Get Well post live-but-empty for four days cannot happen
here. 0 posts so far, as expected. `/` and `/blog` both 200.

## 2026-08-06 — Template-standard audit: one real gap, and it was the dangerous one

Audited against the DMS site standard §1–§11. The repo came out **better than expected** — these
were already correct and needed no change: `robots.txt` (AI-crawler allow-list), `llms.txt`,
`site.webmanifest`, favicon PNGs + `og-preview.jpg`, security headers, Consent Mode v2 defaults +
consent-gated GTM, `analytics.js` with `trackLead`, LocalBusiness/AssistedLivingFacility JSON-LD
with a real `sameAs` (Facebook, Instagram, Google KG), a visible `FAQ` component **with** matching
FAQPage schema, FTC Do-Not-Call links in both the footer and Privacy, TCPA consent checkbox,
honeypot + time-trap antispam, and the `/api/lead` → Resend-required (502) + Slack-optional path.
The **`useRef` double-submit guard is present and correct**, including the reset in `finally`.

**The one gap: there was no sitemap generator.** `public/sitemap.xml` was hand-maintained. That
was fine while the route list was static — and it was in fact accurate, 14 URLs matching the
router exactly. But the Weekly Blog Writer is **on** for this site and publishes into
`src/content/posts/`. The first post would have gone live, correctly routed and linked from
`/blog`, and **never entered the sitemap** — invisible to search and AI crawlers, with nothing
failing or warning. A silent-loss failure of exactly the shape that has bitten this fleet before.

`scripts/build-sitemap.js` now runs on `prebuild`. It parses the `path:` keys out of `App.jsx`'s
exported `routes` array — it cannot `import` it, that file is JSX — and globs the posts dir, so
one source of truth stays the router. `lastmod` is **preserved per-URL, not restamped**: Vercel
builds from a shallow clone so git dates aren't reliable, and restamping claims the whole site
changed when it didn't. A post's own `modified` date wins over today's.

Verified three ways: identical 14-URL set to the hand file (order-only change), 13 of 14 lastmods
carried over, and a probe post surfaced at `/blog/probe-post` with `lastmod` `2026-08-04` from its
own `modified` field. Full build clean, 15 pages prerendered.

### Open: no `favicon.svg`

§4 asks for one and there is none — only the 16/32 PNGs and `apple-touch-icon`. Browsers are fully
covered by those, so this is a nice-to-have (scalable, dark-mode variants), not a defect.

Not fabricated on purpose: the brand mark is a **raster** logo (the alpaca in `public/logo.png`),
and the PNGs are generated from it. An SVG would be either a crude auto-trace or a different mark
than the PNGs — inconsistency for a checklist tick. Needs a real vector logo from the client.
Note that `scripts/generate-assets.py` claims it is "keeping the existing one" — **there is no
existing one**; that comment is wrong and predates this audit.


## 2026-08-09 — The first post arrived, and it had an invented quote in it

The Weekly Blog Writer filed its first Pine Haven draft (08:35 EDT, task `40feda17`): *"Assisted
Living in Hemlock, MI: What Makes Pine Haven Different From a Nursing Home"*, two proposals (post
JSON + hero image). Nothing failed — **it looked like it hadn't run because nothing says so**.
`blog-propose` only emails on the auto-publish path; a manual-review site's only signal is the
portal task queue, so a draft can sit there unannounced.

Reviewing it found the defect the fleet had just been bitten by on ICC. The post attributed this
to Dr. Bill Thomas, unlinked:

> "The antidote to loneliness is not a roommate, it is genuine human connection and a life that
> continues to feel like your own."

Bill Thomas, the Eden Alternative, and the three plagues (loneliness, helplessness, boredom) are
all real. **That sentence is not** — it appears in no source. This is the failure mode worth
naming: every other defect the writer produces is visible to the client, and a fabricated quote
reads as the most credible line in the piece.

Three more, found by pulling on the same thread:

- **"Approximately 818,800 residents… according to the National Institute on Aging."** Not NIA's
  figure (CDC's NPALS is nearer 918,700 for 2018, and current sources say over a million), and the
  NIA URL it linked could not be verified. **Cut rather than swapped** — replacing one number I
  can't verify with another I can't verify is not a fix.
- **"The same NIA data notes residents typically cite 'maintaining independence'…"** — not on the
  cited page. Cut.
- **"Residents have their own private accommodations"** — Pine Haven sells **semi-private $3,500**
  and **private $3,900**. Now reads "private or semi-private".

The 53M caregiving stat was real but unlinked; it now points at the NAC/AARP *Caregiving in the
U.S. 2020* report. The Alzheimer's Association 6.9M figure and link were correct and untouched.
Corrections were applied to the pending proposal directly — `/api/blog-redraft` needs a browser
session (`verifyTeamMember`), and regenerating the whole post would have put the other 90%, which
was good, back at risk.

### `blog_auto_publish` is now ON (Deepak, 2026-08-09)

This reverses the 2026-08-05 decision above, deliberately and with the reason changed. That entry
held it off because the voice was unproven; the voice reads right, and the specific hazard that
made senior care feel too risky to automate — a confident invented claim — now has an enforcement
layer rather than a prompt asking nicely. `uncitedQuotes` shipped in dms-portal (471e608, live in
production) **after** this draft was generated, which is exactly why this one got through: it
blocks auto-publish and holds the draft for a human when a quotation sits near an attribution verb
with no link in the same paragraph.

**What that means for this repo now:** a drafted post commits to `main` and deploys with nobody
approving it. The guard covers fabricated *quotes*. It does **not** cover a fabricated *statistic*,
a dead source link, or a claim that contradicts the client's own pricing — all three of which were
in this very draft. Spot-check the live post; do not assume review happened.

**Still open:** the redraft path (`redraftBlog` in dms-portal `api/_lib/blog-agent.js`) does not run
`uncitedQuotes` — only `blog-propose` does. Redrafts always file as `needs_review` so a human sees
them, which is why this is a gap and not a hole, but it should get the same check.

This draft was filed under the old setting, so **it still needs a manual Approve** — auto-publish is
decided when the post is proposed, not when it is approved. Everything after it ships on its own.
