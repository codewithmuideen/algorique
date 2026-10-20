import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { routeFor } from '../../data/seo'
import { site } from '../../data/site'
import { headData } from '../../lib/seoHead'

const base = (import.meta.env.VITE_SITE_URL || site.url).replace(/\/+$/, '')

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

// Keeps <head> in step with client-side navigation. The first page load
// already has the right tags from the per-route HTML written at build time.
export function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const d = headData(routeFor(pathname), base)
    document.title = d.title
    d.meta.forEach(([attr, key, content]) => upsertMeta(attr, key, content))

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (d.canonical) {
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.rel = 'canonical'
        document.head.appendChild(canonical)
      }
      canonical.href = d.canonical
    } else canonical?.remove()

    let ld = document.getElementById('ld-json')
    if (!ld) {
      ld = document.createElement('script')
      ld.type = 'application/ld+json'
      ld.id = 'ld-json'
      document.head.appendChild(ld)
    }
    ld.textContent = JSON.stringify(d.jsonLd)
  }, [pathname])

  return null
}
