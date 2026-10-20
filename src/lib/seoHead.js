// Builds the <head> tags for a route. Shared by the browser (Seo.jsx) and the
// build step that writes one static HTML file per route (vite.config.js).
import { site } from '../data/site.js'
import { absolute, jsonLd } from '../data/seo.js'

const esc = (v) => String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export function headData(route, base) {
  const url = absolute(base, route.path === '/404' ? '/' : route.path)
  const image = absolute(base, route.image || '/og-image.jpg')
  return {
    title: route.title,
    canonical: route.noindex ? null : url,
    meta: [
      ['name', 'description', route.description],
      ['name', 'robots', route.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'],
      ['property', 'og:type', 'website'],
      ['property', 'og:site_name', site.name],
      ['property', 'og:locale', 'en_GB'],
      ['property', 'og:title', route.title],
      ['property', 'og:description', route.description],
      ['property', 'og:url', url],
      ['property', 'og:image', image],
      ['property', 'og:image:alt', `${site.name}: ${route.heading}`],
      ['name', 'twitter:card', 'summary_large_image'],
      ['name', 'twitter:title', route.title],
      ['name', 'twitter:description', route.description],
      ['name', 'twitter:image', image],
    ],
    jsonLd: jsonLd(route, base),
  }
}

export function headHtml(route, base) {
  const d = headData(route, base)
  return [
    `<title>${esc(d.title)}</title>`,
    ...d.meta.map(([attr, key, content]) => `<meta ${attr}="${key}" content="${esc(content)}" data-seo />`),
    d.canonical ? `<link rel="canonical" href="${esc(d.canonical)}" data-seo />` : '',
    `<script type="application/ld+json" id="ld-json">${JSON.stringify(d.jsonLd).replace(/</g, '\\u003c')}</script>`,
  ]
    .filter(Boolean)
    .join('\n    ')
}
