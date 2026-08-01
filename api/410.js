// HTTP 410 Gone handler. Wired up in vercel.json via rewrites from retired
// URLs (old CMS paths, doorway pages) so Google deindexes them fast — cleaner
// than a 404, and honest when there's no equivalent page to 301 to.

export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Cache-Control', 'public, max-age=86400')
  res.status(410).send(`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, nofollow" />
<title>Page removed</title>
<style>
  body { font-family: system-ui, sans-serif; max-width: 600px; margin: 80px auto; padding: 0 20px; color: #0f172a; }
  h1 { font-size: 28px; margin: 0 0 12px; }
  p { font-size: 16px; line-height: 1.6; color: #475569; }
  a { color: #0f172a; font-weight: 600; }
</style>
</head>
<body>
  <h1>This page has been removed.</h1>
  <p>The page you're looking for is no longer available. <a href="/">Go to the homepage</a> to find what you need.</p>
</body>
</html>`)
}
