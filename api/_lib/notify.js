// Shared serverless helpers for Pine Haven Assisted Living.
// Files in api/_lib/ are NOT exposed as routes by Vercel.
//
// Reuses the shared DMS Resend account via RESEND_API_KEY. Sends from the
// verified Pine Haven subdomain web.pinehavenassistedliving.com. Override with
// EMAIL_FROM in Vercel if the sending address ever changes.

export function applyCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

export async function sendEmail({ to, subject, html, replyTo, from, cc }) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY not set')
  const fromAddress = from || process.env.EMAIL_FROM || 'Pine Haven Assisted Living <noreply@web.pinehavenassistedliving.com>'
  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: fromAddress,
      to,
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
      ...(cc && cc.length ? { cc } : {}),
    }),
  })
  if (!resp.ok) throw new Error(`Resend ${resp.status}: ${await resp.text()}`)
  return resp.json()
}

const escapeHtml = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Ops notification — lands in the Pine Haven inbox when a contact form comes in.
export function leadEmailHtml({ name, email, phone, careInterest, message, pageUrl, referrer, timestamp }) {
  const row = (k, v) => v ? `<tr><td style="padding:6px 12px 6px 0;color:#5b6b62;width:150px;font-size:13px;vertical-align:top;">${escapeHtml(k)}</td><td style="padding:6px 0;font-size:14px;color:#1b2d24;">${v}</td></tr>` : ''
  return `<div style="font-family:'DM Sans',Inter,system-ui,sans-serif;max-width:640px;margin:0 auto;background:#f6f3ea;padding:24px 0;">
  <div style="background:#23493a;padding:20px 32px;border-radius:8px 8px 0 0;">
    <div style="color:#cdb892;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.18em;margin:0 0 4px;">Pine Haven Assisted Living — New Inquiry</div>
    <h1 style="color:#ffffff;margin:0;font-size:22px;font-weight:700;">${escapeHtml(name) || 'New contact'}</h1>
  </div>
  <div style="background:#ffffff;padding:32px;border:1px solid #e4ddcd;border-top:none;border-radius:0 0 8px 8px;">
    <table style="border-collapse:collapse;width:100%;">
      ${row('Name', name ? `<strong>${escapeHtml(name)}</strong>` : '')}
      ${row('Email', email ? `<a href="mailto:${escapeHtml(email)}" style="color:#2c5a45;">${escapeHtml(email)}</a>` : '')}
      ${row('Phone', phone ? `<a href="tel:${escapeHtml(phone)}" style="color:#2c5a45;">${escapeHtml(phone)}</a>` : '')}
      ${row('Interested In', escapeHtml(careInterest))}
      ${row('Submitted', escapeHtml(timestamp))}
    </table>
    ${message ? `
    <h3 style="margin:24px 0 6px;font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:#5b6b62;font-weight:700;">Message</h3>
    <div style="padding:14px 16px;background:#f6f3ea;border:1px solid #e4ddcd;border-radius:6px;font-size:14px;color:#1b2d24;line-height:1.55;white-space:pre-wrap;">${escapeHtml(message)}</div>
    ` : ''}
    <h3 style="margin:24px 0 6px;font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:#5b6b62;font-weight:700;">Source</h3>
    <table style="border-collapse:collapse;width:100%;font-size:13px;color:#5b6b62;">
      ${row('Page', escapeHtml(pageUrl))}
      ${row('Referrer', escapeHtml(referrer))}
    </table>
    <div style="margin-top:24px;padding-top:18px;border-top:1px solid #e4ddcd;font-size:13px;color:#5b6b62;">
      Reply directly to this email to respond — replies route to the sender.
    </div>
  </div>
</div>`
}

// Customer auto-responder — confirms receipt.
export function acknowledgementEmailHtml({ name }) {
  const greeting = name ? `Hi ${escapeHtml(name.split(' ')[0])},` : 'Hi,'
  return `<div style="font-family:'DM Sans',Inter,system-ui,sans-serif;max-width:580px;margin:0 auto;color:#1b2d24;">
  <div style="padding:28px 32px 20px;">
    <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:#2c5a45;margin-bottom:8px;">Pine Haven Assisted Living</div>
    <h1 style="margin:0 0 18px;font-size:24px;font-weight:700;line-height:1.2;color:#1b2d24;">Thank you for reaching out.</h1>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:#475c52;">${greeting}</p>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:#475c52;">We received your message, and one of our team members will get back to you <strong style="color:#1b2d24;">shortly</strong> to answer your questions or help you schedule a visit.</p>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:#475c52;">If you'd like to speak with us right away, we're here for you any time:</p>
    <table style="margin:0 0 24px;font-size:14px;color:#1b2d24;">
      <tr><td style="padding:4px 0;color:#5b6b62;width:80px;">Phone</td><td style="padding:4px 0;"><a href="tel:+19896425761" style="color:#2c5a45;font-weight:600;">(989) 642-5761</a></td></tr>
      <tr><td style="padding:4px 0;color:#5b6b62;">Visit</td><td style="padding:4px 0;">515 N Brennan Rd, Hemlock, MI 48626</td></tr>
    </table>
    <p style="margin:0;font-size:14px;color:#1b2d24;font-weight:600;">— The Pine Haven Family</p>
  </div>
  <div style="padding:18px 32px;background:#f6f3ea;border-top:1px solid #e4ddcd;font-size:12px;color:#5b6b62;line-height:1.55;">
    Pine Haven Assisted Living · 515 N Brennan Rd, Hemlock, MI 48626 · Open 24/7/365
  </div>
</div>`
}
