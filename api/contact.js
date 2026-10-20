import { contactSchema } from '../src/lib/schemas.js'
import { getConfig, parseBody, zodErrors, renderEmail, sendEmail, timestamp, guard } from './_lib/email.js'

export default async function handler(req, res) {
  if (!guard(req, res)) return

  const body = parseBody(req)
  if (!body) return res.status(400).json({ error: 'The request could not be read.' })
  if (body.website) return res.status(200).json({ ok: true })

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return res.status(422).json({ error: 'Some details need checking. Please review the form.', fields: zodErrors(parsed.error) })
  }

  const config = getConfig()
  if (config.missing.length) {
    console.error(`[contact] Email is not configured. Missing: ${config.missing.join(', ')}`)
    return res.status(503).json({
      error: 'Our contact form is temporarily unavailable. Please contact us by phone, email or WhatsApp.',
    })
  }

  const d = parsed.data
  const { html, text } = renderEmail({
    heading: 'New Website Enquiry',
    intro: `${d.name} sent a message through the contact form.`,
    sections: [
      {
        title: 'From',
        items: [
          ['Name', d.name],
          ['Email', d.email],
          ['Phone', d.phone || 'Not provided'],
        ],
      },
      {
        title: 'Enquiry',
        items: [
          ['Subject', d.subject],
          ['Message', d.message],
        ],
      },
    ],
    submittedAt: timestamp(),
    siteUrl: config.PUBLIC_SITE_URL,
  })

  try {
    await sendEmail(config, { subject: `Website enquiry: ${d.subject} from ${d.name}`, html, text, replyTo: d.email })
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[contact] Send failed:', err)
    return res.status(502).json({ error: 'We could not send your message just now. Please try again in a moment.' })
  }
}
