// Vite plugin: per-route SEO for a single-page app.
// Dev: injects the right tags for whichever route is requested.
// Build: writes dist/<route>.html for every route (head tags plus readable
// fallback content for crawlers that do not run JavaScript), dist/404.html,
// dist/sitemap.xml and dist/robots.txt.
import fs from 'node:fs'
import path from 'node:path'
import { routes, notFound, routeFor } from './src/data/seo.js'
import { headHtml } from './src/lib/seoHead.js'
import { site } from './src/data/site.js'
import { services, faqs } from './src/data/content.js'

const esc = (v) => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const isPlaceholder = (v) => !v || /^\[.*\]$/.test(String(v).trim())
const siteBase = () => (process.env.SITE_URL || site.url).replace(/\/+$/, '')

const navLinks = routes.filter((r) => ['/', '/services', '/about', '/process', '/reviews', '/contact', '/book', '/faq'].includes(r.path))

// Plain, readable content. React replaces it as soon as the app starts.
function bodyHtml(route) {
  const extra = []
  if (route.path === '/' || route.path === '/services') {
    extra.push(
      '<h2>Our cleaning services</h2><ul>' +
        services
          .map((s) => `<li><a href="/services#${s.id}"><strong>${esc(s.title)}</strong></a>: ${esc(s.description)}</li>`)
          .join('') +
        '</ul>',
    )
  }
  if (route.path === '/faq') {
    extra.push('<h2>Frequently asked questions</h2>' + faqs.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join(''))
  }
  if (route.path === '/contact') {
    const lines = []
    if (!isPlaceholder(site.email)) lines.push(`Email: <a href="mailto:${esc(site.email)}">${esc(site.email)}</a>`)
    if (site.phoneHref) lines.push(`Phone: <a href="${esc(site.phoneHref)}">${esc(site.phone)}</a>`)
    const areas = site.areas.map((a) => a.name).filter((n) => !isPlaceholder(n))
    if (areas.length) lines.push(`Areas we cover: ${areas.map(esc).join(', ')}`)
    if (lines.length) extra.push(`<p>${lines.join('<br />')}</p>`)
  }
  return `
      <div style="max-width:1100px;margin:0 auto;padding:120px 24px 80px;font-family:Poppins,system-ui,sans-serif;color:#0b1f44;line-height:1.6">
        <nav aria-label="Main"><a href="/" style="font-weight:700;color:#0b1f44">${esc(site.name)}</a> ${navLinks
          .map((r) => `<a href="${r.path}" style="margin-left:16px;color:#0b4fb3">${esc(r.name || 'Home')}</a>`)
          .join('')}</nav>
        <main>
          <h1 style="font-size:40px;line-height:1.1;margin:48px 0 16px">${esc(route.heading)}</h1>
          <p style="max-width:640px;color:#586379">${esc(route.description)}</p>
          ${extra.join('\n          ')}
          <p><a href="/book" style="color:#0b4fb3;font-weight:600">Book a cleaning</a></p>
        </main>
      </div>`
}

function render(template, route, base) {
  let head = headHtml(route, base)
  if (route.path === '/') head += '\n    <link rel="preload" as="image" href="/images/living-white-sofa.jpg" fetchpriority="high" />'
  return template.replace(/<!-- seo:head[^>]*-->/, head).replace('<!-- seo:body -->', bodyHtml(route))
}

export function seoPlugin() {
  let template = null
  let outDir = 'dist'
  return {
    name: 'algorique-seo',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir)
    },
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        template = html
        const url = ctx.originalUrl || '/'
        const pathname = new URL(url, 'http://localhost').pathname
        return render(html, ctx.server ? routeFor(pathname) : routes[0], siteBase())
      },
    },
    writeBundle() {
      if (!template) return
      const base = siteBase()
      for (const route of routes) {
        if (route.path === '/') continue
        fs.writeFileSync(path.join(outDir, `${route.path.slice(1)}.html`), render(template, route, base))
      }
      fs.writeFileSync(path.join(outDir, '404.html'), render(template, notFound, base))

      const today = new Date().toISOString().slice(0, 10)
      const urls = routes
        .map((r) => `  <url><loc>${base}${r.path === '/' ? '/' : r.path}</loc><lastmod>${today}</lastmod><priority>${r.priority}</priority></url>`)
        .join('\n')
      fs.writeFileSync(
        path.join(outDir, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      )
      fs.writeFileSync(path.join(outDir, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${base}/sitemap.xml\n`)
    },
  }
}
