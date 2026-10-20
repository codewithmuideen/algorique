// Shared by the browser and the serverless functions, so it imports nothing.
export function formatDate(iso, locale = 'en-GB') {
  if (!iso) return ''
  const d = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })
}
