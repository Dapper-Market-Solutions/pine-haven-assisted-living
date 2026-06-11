// Layered, dependency-free anti-spam for the lead endpoint (DMS site standard).
// Every layer degrades gracefully: an unconfigured layer is SKIPPED, so the
// honeypot, time-trap and content checks always run even without keys set.
//
// screenLead() returns one of:
//   { ok: true }                               → proceed normally
//   { ok: false, silent: true,  status: 200 }  → pretend success, send NO email
//        (honeypot / time-trap / content) — never tip off the bot so it retries
//   { ok: false, silent: false, status }       → hard reject (origin 403,
//        Turnstile 403, rate-limit 429)
//
// Turnstile setup (no DNS needed): dash.cloudflare.com → Turnstile → add a
// widget with your hostname(s) → set TURNSTILE_SECRET_KEY here (server) and
// VITE_TURNSTILE_SITE_KEY in the frontend env.

const TURNSTILE_VERIFY = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

export function clientIp(req) {
  return (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress || ''
}

function allowedOrigins() {
  const raw = process.env.ALLOWED_ORIGINS || process.env.SITE_ORIGIN || ''
  return raw.split(',').map((s) => s.trim().replace(/\/$/, '')).filter(Boolean)
}
function originAllowed(req) {
  const allow = allowedOrigins()
  if (allow.length === 0) return true // not configured → skip
  const origin = (req.headers.origin || '').replace(/\/$/, '')
  if (origin) return allow.includes(origin)
  try {
    return allow.includes(new URL(req.headers.referer || '').origin.replace(/\/$/, ''))
  } catch {
    return false
  }
}

function honeypotTripped(body) {
  return Boolean(String(body.website || '').trim() || String(body.fax || '').trim())
}

function timeTrapPassed(body) {
  const t = Number(body.renderedAt)
  if (!t) return true
  const elapsed = Date.now() - t
  return elapsed >= 2500 && elapsed <= 1000 * 60 * 60 * 12
}

function contentPassed(body) {
  const links = (String(body.message || '').match(/https?:\/\/|www\./gi) || []).length
  return links < 3
}

// Best-effort, in-memory per-IP rate limit — warm-instance only. For robust/
// global limiting add Vercel KV or Upstash Redis and swap this out.
const HITS = new Map()
const RL_WINDOW = 1000 * 60 * 60 // 1 hour
const RL_MAX = 8
function rateOk(ip) {
  if (!ip) return true
  const now = Date.now()
  const arr = (HITS.get(ip) || []).filter((t) => now - t < RL_WINDOW)
  arr.push(now)
  HITS.set(ip, arr)
  if (HITS.size > 5000) {
    for (const [k, v] of HITS) if (!v.some((t) => now - t < RL_WINDOW)) HITS.delete(k)
  }
  return arr.length <= RL_MAX
}

async function turnstileOk(token, ip) {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true // not configured → skip
  if (!token) return false
  try {
    const form = new URLSearchParams({ secret, response: token })
    if (ip) form.set('remoteip', ip)
    const resp = await fetch(TURNSTILE_VERIFY, { method: 'POST', body: form })
    const data = await resp.json()
    return data.success === true
  } catch {
    return true // CF unreachable → fail OPEN (don't block real leads on an outage)
  }
}

export async function screenLead(req, body = {}, ip = '') {
  if (!originAllowed(req)) return { ok: false, silent: false, status: 403, reason: 'origin' }
  if (!rateOk(ip)) return { ok: false, silent: false, status: 429, reason: 'rate' }
  if (honeypotTripped(body)) return { ok: false, silent: true, status: 200, reason: 'honeypot' }
  if (!timeTrapPassed(body)) return { ok: false, silent: true, status: 200, reason: 'timetrap' }
  if (!contentPassed(body)) return { ok: false, silent: true, status: 200, reason: 'content' }
  if (!(await turnstileOk(body.turnstileToken, ip))) return { ok: false, silent: false, status: 403, reason: 'turnstile' }
  return { ok: true }
}
