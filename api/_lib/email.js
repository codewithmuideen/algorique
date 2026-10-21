// Shared helpers for the email endpoints. Files in /api/_lib are not exposed
// as routes by Vercel. Secrets are read from server environment variables only.
import { Resend } from 'resend'

export const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const oneLine = (value) => String(value ?? '').replace(/[\r\n]+/g, ' ').trim()

export function getConfig() {
  const { RESEND_API_KEY, BUSINESS_EMAIL, VERIFIED_FROM_EMAIL, PUBLIC_SITE_URL } = process.env
  const missing = ['RESEND_API_KEY', 'BUSINESS_EMAIL', 'VERIFIED_FROM_EMAIL'].filter((k) => !process.env[k])
  return { RESEND_API_KEY, BUSINESS_EMAIL, VERIFIED_FROM_EMAIL, PUBLIC_SITE_URL, missing }
}

export function parseBody(req) {
  if (req.body && typeof req.body === 'object') return req.body
  try {
    return JSON.parse(req.body || '{}')
  } catch {
    return null
  }
}

export function zodErrors(error) {
  const out = {}
  for (const issue of error.issues) {
    const key = issue.path.join('.') || 'form'
    if (!out[key]) out[key] = issue.message
  }
  return out
}

// Builds a clean, table-based HTML email (renders well in Gmail and Outlook)
// and a plain-text fallback from the same sections.
export function renderEmail({ heading, intro, sections, submittedAt, siteUrl }) {
  const rows = (items) =>
    items
      .map(
        ([label, value]) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #e4ecf7;width:38%;vertical-align:top;color:#586379;font-size:14px;">${escapeHtml(label)}</td>
          <td style="padding:10px 0;border-bottom:1px solid #e4ecf7;vertical-align:top;color:#0b1f44;font-size:14px;font-weight:600;white-space:pre-wrap;">${escapeHtml(value || 'Not provided')}</td>
        </tr>`,
      )
      .join('')

  const html = `<!doctype html>
<html><body style="margin:0;background:#f4f7fc;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fc;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;">
        <tr><td style="background:#0b1f44;padding:28px 32px;">
          <p style="margin:0;color:#6cc24a;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:bold;">Algorique Cleaners</p>
          <h1 style="margin:8px 0 0;color:#f4f7fc;font-size:24px;font-weight:normal;">${escapeHtml(heading)}</h1>
        </td></tr>
        <tr><td style="padding:24px 32px 8px;color:#172036;font-size:15px;line-height:1.5;">${escapeHtml(intro)}</td></tr>
        ${sections
          .map(
            (s) => `
        <tr><td style="padding:16px 32px 0;">
          <h2 style="margin:0 0 4px;color:#0b4fb3;font-size:13px;letter-spacing:1.5px;text-transform:uppercase;">${escapeHtml(s.title)}</h2>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows(s.items)}</table>
        </td></tr>`,
          )
          .join('')}
        <tr><td style="padding:24px 32px 28px;color:#586379;font-size:12px;line-height:1.5;">
          Submitted ${escapeHtml(submittedAt)}${siteUrl ? ` via ${escapeHtml(siteUrl)}` : ''}.<br/>
          Reply to this email to respond to the customer directly.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`

  const text = [
    heading,
    '',
    intro,
    ...sections.flatMap((s) => ['', s.title.toUpperCase(), ...s.items.map(([l, v]) => `${l}: ${v || 'Not provided'}`)]),
    '',
    `Submitted ${submittedAt}${siteUrl ? ` via ${siteUrl}` : ''}.`,
    'Reply to this email to respond to the customer directly.',
  ].join('\n')

  return { html, text }
}

export async function sendEmail(config, { subject, html, text, replyTo }) {
  const resend = new Resend(config.RESEND_API_KEY)
  const { data, error } = await resend.emails.send({
    from: `Algorique Cleaners Website <${config.VERIFIED_FROM_EMAIL}>`,
    to: config.BUSINESS_EMAIL.split(',').map((e) => e.trim()).filter(Boolean),
    subject: oneLine(subject).slice(0, 180),
    html,
    text,
    replyTo,
  })
  if (error) throw new Error(error.message || 'Resend rejected the email.')
  return data
}

export const timestamp = () =>
  new Date().toLocaleString('en-GB', { timeZone: 'Europe/London', dateStyle: 'full', timeStyle: 'short' }) + ' (UK time)'

export function guard(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).json({ error: 'Method not allowed.' })
    return false
  }
  const length = Number(req.headers['content-length'] || 0)
  if (length > 20000) {
    res.status(413).json({ error: 'That submission is too large.' })
    return false
  }
  return true
}
