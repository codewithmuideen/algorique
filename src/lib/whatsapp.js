import { site } from '../data/site'
import { formatDate as formatDateIn } from './format'

export const DEFAULT_WHATSAPP_MESSAGE = 'Hello, I would like to enquire about your cleaning services.'

export const hasWhatsapp = Boolean(String(site.whatsappNumber || '').replace(/\D/g, ''))

// Official click-to-chat format. Opening the link only drafts the message;
// the customer reviews it and decides whether to send.
export function whatsappUrl(message = DEFAULT_WHATSAPP_MESSAGE) {
  const number = String(site.whatsappNumber || '').replace(/\D/g, '')
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

// The quickest way to talk to the business: WhatsApp when a number is set,
// otherwise a phone call.
export function chatAction(message) {
  return hasWhatsapp
    ? { href: whatsappUrl(message), label: 'WhatsApp us', external: true, kind: 'whatsapp' }
    : { href: site.phoneHref, label: `Call ${site.phone}`, external: false, kind: 'phone' }
}

export function bookingWhatsappMessage({ serviceName, date, time }) {
  const parts = ['Hello, I would like to request a cleaning.']
  if (serviceName) parts.push(`Service: ${serviceName}`)
  if (date) parts.push(`Preferred date: ${formatDate(date)}`)
  if (time) parts.push(`Preferred time: ${time}`)
  return parts.join('\n')
}

export const formatDate = (iso) => formatDateIn(iso, site.locale)
