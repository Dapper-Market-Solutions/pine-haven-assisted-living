// Pine Haven Assisted Living — contact form handler.
//
// On submit:
//   1. Ops notification email to the Pine Haven inbox (Resend)
//   2. Customer acknowledgement email (Resend)
//
// Both run in parallel via Promise.allSettled. The lead is accepted (200/207)
// as long as the ops email lands; the acknowledgement is best-effort.
//
// Env vars:
//   RESEND_API_KEY   (required)
//   EMAIL_FROM       (optional — defaults to noreply@mail.dapperms.com until the
//                     Pine Haven domain is verified in Resend)
//   OPS_TEAM_EMAIL   (optional — defaults to pinehavenassistedliving@gmail.com;
//                     comma-separated for multiple recipients)
//   LEAD_CC          (optional — comma-separated CC list on the ops notification,
//                     e.g. deepak@dapperms.com for oversight)

import { applyCors, sendEmail, leadEmailHtml, acknowledgementEmailHtml } from './_lib/notify.js'

const DEFAULT_OPS = 'pinehavenassistedliving@gmail.com'

export default async function handler(req, res) {
  applyCors(res)
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const {
    name = '',
    email = '',
    phone = '',
    care_interest = '',
    message = '',
    pageUrl = '',
    referrer = '',
  } = req.body || {}

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' })
  }

  const opsTo = (process.env.OPS_TEAM_EMAIL || DEFAULT_OPS).split(',').map((s) => s.trim())
  const opsCc = (process.env.LEAD_CC || '').split(',').map((s) => s.trim()).filter(Boolean)
  const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/Detroit' })

  const opsHtml = leadEmailHtml({
    name, email, phone,
    careInterest: care_interest,
    message, pageUrl, referrer, timestamp,
  })
  const ackHtml = acknowledgementEmailHtml({ name })

  const [opsResult, ackResult] = await Promise.allSettled([
    sendEmail({
      to: opsTo,
      cc: opsCc,
      subject: `New inquiry — ${name}${care_interest ? ` (${care_interest})` : ''}`,
      html: opsHtml,
      replyTo: email,
    }),
    sendEmail({
      to: email,
      subject: 'We received your message — Pine Haven Assisted Living',
      html: ackHtml,
    }),
  ])

  const errors = []
  if (opsResult.status === 'rejected') errors.push({ step: 'opsEmail', message: opsResult.reason?.message })
  if (ackResult.status === 'rejected') errors.push({ step: 'ackEmail', message: ackResult.reason?.message })

  // Ops email is the must-have. If it failed, the lead effectively didn't land.
  if (opsResult.status === 'rejected') {
    return res.status(502).json({ ok: false, errors })
  }

  return res.status(errors.length ? 207 : 200).json({ ok: true, errors })
}
