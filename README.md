# Pine Haven Assisted Living — Website

Marketing site for [Pine Haven Assisted Living](https://pinehavenassistedliving.com) in Hemlock, MI —
assisted living, memory care, and respite care. Rebuilt from the legacy WordPress site to the DMS
site-standard.

## Stack
- React 18 + Vite + Tailwind (shadcn/ui)
- Static site generation via `vite-react-ssg` (every route prerenders to real HTML with baked-in
  meta + JSON-LD)
- Serverless contact form (`api/lead.js`) → Resend email
- Deployed on Vercel

## Develop
```bash
npm install
npm run dev      # local dev server
npm run build    # SSG build → dist/
npm run preview  # serve the built dist/
```

## Where things live
- `src/lib/site.js` — single source of truth (NAP, nav, gallery, testimonials, service areas)
- `src/lib/schema.js` — JSON-LD builders
- `src/pages/` — one file per route; `App.jsx` defines the route table
- `src/components/ServiceDetail.jsx` — layout powering the 3 deep service pages
- `api/lead.js` + `api/_lib/notify.js` — contact form handler (Resend)
- `public/` — robots.txt, sitemap.xml, llms.txt, brand assets, facility photos
- `scripts/generate-assets.py` — regenerate favicon set + OG card

See `STATUS.md` for current state and the pre-launch checklist (including the unconfirmed street address).

## Env vars (set in Vercel)
- `RESEND_API_KEY` (required for the contact form)
- `OPS_TEAM_EMAIL` (optional; defaults to pinehavenassistedliving@gmail.com)
- `EMAIL_FROM` (optional; defaults to noreply@mail.dapperms.com until a Pine Haven domain is verified)
