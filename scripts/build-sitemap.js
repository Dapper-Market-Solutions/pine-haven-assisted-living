// Regenerates public/sitemap.xml from the routes the app actually declares
// plus every committed blog post. Wired as `prebuild`, so it runs on every
// build (local and Vercel) and the sitemap cannot drift from the site.
//
// WHY THIS EXISTS. Until 2026-08-06 the sitemap here was hand-maintained with
// no generator at all. That was survivable while the route list was static,
// but the Weekly Blog Writer publishes to src/content/posts/ — and nothing
// would have added those URLs. Posts would have gone live, correctly routed
// and linked from /blog, and stayed invisible to search and AI crawlers.
//
// ROUTES ARE PARSED, NOT IMPORTED. src/App.jsx exports `routes`, but it is
// JSX, so a plain node script cannot import it. Parsing the `path:` keys off
// the same array the router uses keeps one source of truth: add a route to
// App.jsx and it lands here automatically. If App.jsx's route array is ever
// restructured, this parse is the thing to re-check — it fails loudly (see
// the sanity floor at the bottom) rather than silently emitting a short file.
//
// LASTMOD IS PRESERVED, NOT RESTAMPED. Vercel builds from a shallow clone, so
// git dates are not reliably available; and restamping every URL on every
// build tells crawlers the whole site changed when it did not. Existing
// values carry over; only genuinely new URLs get today's date.

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const today = new Date().toISOString().slice(0, 10)

const DOMAIN = (
  readFileSync(join(root, 'src', 'lib', 'site.js'), 'utf8')
    .match(/SITE_URL\s*=\s*['"]([^'"]+)['"]/)?.[1] || 'https://pinehavenassistedliving.com'
).replace(/\/$/, '')

// Routes that exist but must never be indexed.
const EXCLUDE = new Set(['thank-you'])

// Deliberate, not derived — priorities encode what we want crawled first.
const PRIORITY = [
  [/^\/$/, '1.0'],
  [/^\/(services|assisted-living|memory-care|respite-care)$/, '0.9'],
  [/^\/(contact|assisted-living-)/, '0.8'],
  [/^\/(gallery|blog)$/, '0.7'],
  [/^\/blog\//, '0.6'],
  [/^\/(privacy|terms|cookies)$/, '0.3'],
]
const priorityFor = (p) => PRIORITY.find(([re]) => re.test(p))?.[1] || '0.5'

// Carry forward the lastmod already published for each URL.
function previousLastmods(file) {
  if (!existsSync(file)) return {}
  const xml = readFileSync(file, 'utf8')
  const out = {}
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)) {
    out[m[1]] = m[2]
  }
  return out
}
const PREV = previousLastmods(join(root, 'public', 'sitemap.xml'))

// --- static routes, straight off the router's own array --------------------
const app = readFileSync(join(root, 'src', 'App.jsx'), 'utf8')
const routesBlock = app.slice(app.indexOf('export const routes'))

const staticPaths = ['/']
for (const m of routesBlock.matchAll(/path:\s*'([^']+)'/g)) {
  const p = m[1]
  if (p === '*' || p.includes(':') || EXCLUDE.has(p)) continue
  staticPaths.push(p.startsWith('/') ? p : `/${p}`)
}

// --- blog posts ------------------------------------------------------------
const postsDir = join(root, 'src', 'content', 'posts')
const posts = existsSync(postsDir)
  ? readdirSync(postsDir)
      .filter((f) => f.endsWith('.json'))
      .map((f) => JSON.parse(readFileSync(join(postsDir, f), 'utf8')))
      .filter((p) => p && p.slug)
  : []

const urls = [
  ...[...new Set(staticPaths)].map((p) => ({
    loc: `${DOMAIN}${p === '/' ? '/' : p}`,
    priority: priorityFor(p),
  })),
  ...posts.map((p) => ({
    loc: `${DOMAIN}/blog/${p.slug}`,
    priority: '0.6',
    // A post's own modified/date beats today — it says when the post changed.
    lastmod: (p.modified || p.date || '').slice(0, 10) || undefined,
  })),
].map((u) => ({ ...u, lastmod: u.lastmod || PREV[u.loc] || today }))

// Sanity floor: if the App.jsx parse ever breaks, fail the build rather than
// quietly shipping a sitemap with two URLs in it.
if (urls.length < 10) {
  console.error(
    `build-sitemap: only ${urls.length} URLs — the App.jsx route parse probably broke. ` +
      `Not overwriting public/sitemap.xml.`
  )
  process.exit(1)
}

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map(
      (u) =>
        `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod>` +
        `<priority>${u.priority}</priority></url>`
    )
    .join('\n') +
  `\n</urlset>\n`

writeFileSync(join(root, 'public', 'sitemap.xml'), xml)
console.log(
  `sitemap.xml: ${urls.length} URLs (${urls.length - posts.length} static + ${posts.length} posts)`
)
