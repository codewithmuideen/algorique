// Cookie consent store. The choice is kept in a first-party cookie for six
// months. Optional scripts (analytics, marketing) must be loaded only through
// `onConsent`, so nothing optional runs before the visitor agrees.

export const CONSENT_COOKIE = 'algorique_consent'
export const CONSENT_VERSION = 1
const MAX_AGE = 60 * 60 * 24 * 182
const EVENT = 'algorique:consent'
const OPEN_EVENT = 'algorique:consent-open'

export const categories = [
  {
    id: 'necessary',
    label: 'Strictly necessary',
    description: 'Remembers your cookie choice. The site cannot work as intended without it, so it is always on.',
    locked: true,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    description: 'Helps us understand how visitors use the site so we can improve it. Off unless you switch it on.',
  },
  {
    id: 'marketing',
    label: 'Marketing',
    description: 'Used to measure advertising. Off unless you switch it on.',
  },
]

export function readConsent() {
  try {
    const raw = document.cookie
      .split('; ')
      .find((c) => c.startsWith(`${CONSENT_COOKIE}=`))
      ?.split('=')[1]
    if (!raw) return null
    const parsed = JSON.parse(decodeURIComponent(raw))
    return parsed.v === CONSENT_VERSION ? parsed : null
  } catch {
    return null
  }
}

export function saveConsent(choices) {
  const value = {
    v: CONSENT_VERSION,
    necessary: true,
    analytics: !!choices.analytics,
    marketing: !!choices.marketing,
    at: new Date().toISOString(),
  }
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(value))}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`
  window.dispatchEvent(new CustomEvent(EVENT, { detail: value }))
  return value
}

// Re-open the preferences panel, e.g. from the footer.
export const openConsentSettings = () => window.dispatchEvent(new Event(OPEN_EVENT))

export function onConsentOpen(handler) {
  window.addEventListener(OPEN_EVENT, handler)
  return () => window.removeEventListener(OPEN_EVENT, handler)
}

// Run `load` once the given category is allowed (now, or when the visitor agrees later).
export function onConsent(category, load) {
  let done = false
  const run = (state) => {
    if (!done && state?.[category]) {
      done = true
      load()
    }
  }
  run(readConsent())
  const handler = (e) => run(e.detail)
  window.addEventListener(EVENT, handler)
  return () => window.removeEventListener(EVENT, handler)
}
