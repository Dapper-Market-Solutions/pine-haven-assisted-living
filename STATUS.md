# Pine Haven Assisted Living — STATUS

**Last updated:** 2026-06-01

Marketing site for Pine Haven Assisted Living (Hemlock, MI). Rebuilt from the legacy WordPress
site (pinehavenassistedliving.com) to the DMS site-standard. Vite + React + Tailwind (shadcn/ui),
SSG via `vite-react-ssg`, deployed to Vercel.

## Current state
- **Built and verified locally.** `npm run build` prerenders 14 static pages; all routes return 200;
  mobile (375px) verified clean, no overflow.
- Not yet pushed to GitHub or deployed to Vercel (pending owner sign-off + address confirmation).
- Old WordPress site is still live and should NOT be deleted until the new site is verified live on
  the real domain.

## ⚠️ Open items before launch
1. ~~Confirm street address~~ — **DONE 2026-06-01: confirmed 515 Brennan Rd, Hemlock, MI 48626.**
2. **Verify the geo coordinates** in `index.html` / `site.js` (approximate Hemlock lat/lng right now).
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
