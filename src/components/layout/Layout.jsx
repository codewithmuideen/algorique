import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '../navigation/Header'
import { Footer } from '../footer/Footer'
import { FloatingActions } from './FloatingActions'
import { CookieConsent } from './CookieConsent'
import { scrollToSection } from '../../lib/scroll'
import { Seo } from './Seo'
import { QuoteBanner } from '../sections/QuoteBanner'

// New page: start at the top. Link to "/#section": scroll to that section,
// even if it is the same hash clicked twice.
function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  const lastPath = useRef(pathname)

  useEffect(() => {
    const samePage = lastPath.current === pathname
    lastPath.current = pathname
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    const id = decodeURIComponent(hash.slice(1))
    const timers = []
    const jump = (behavior) => document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' })

    if (samePage && document.getElementById(id)) {
      scrollToSection(id)
    } else {
      // Arriving from another page: the section moves while images and the
      // services track lay out, so jump, then re-align as things settle.
      let tries = 0
      const attempt = () => {
        if (document.getElementById(id)) {
          jump('instant')
          timers.push(setTimeout(() => jump('instant'), 400), setTimeout(() => jump('instant'), 1000))
        } else if (tries++ < 40) timers.push(setTimeout(attempt, 50))
      }
      attempt()
    }
    return () => timers.forEach(clearTimeout)
  }, [pathname, hash, key])
  return null
}

export function Layout() {
  return (
    <>
      <ScrollManager />
      <Seo />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80] focus:rounded-full focus:bg-lime focus:px-5 focus:py-3 focus:font-bold focus:text-ink"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <QuoteBanner />
      <Footer />
      <FloatingActions />
      <CookieConsent />
    </>
  )
}
