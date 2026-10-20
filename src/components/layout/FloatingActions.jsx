import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useSpring } from 'framer-motion'
import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { EASE } from '../../lib/motion'

const scrollTop = () => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
}

// True while any form section is on screen.
function useFormsVisible(pathname) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    setVisible(false)
    const seen = new Set()
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)))
      setVisible(seen.size > 0)
    })
    const t = setTimeout(() => document.querySelectorAll('#book, #contact').forEach((el) => io.observe(el)), 300)
    return () => {
      clearTimeout(t)
      io.disconnect()
    }
  }, [pathname])
  return visible
}

export function FloatingActions() {
  const { pathname } = useLocation()
  const { scrollY, scrollYProgress } = useScroll()
  const ring = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })
  const [past, setPast] = useState(false)
  const formsVisible = useFormsVisible(pathname)
  const onFormPage = pathname === '/book' || pathname === '/contact'

  useMotionValueEvent(scrollY, 'change', (y) => setPast(y > window.innerHeight * 0.6))

  return (
    <>
      {/* Desktop: scroll to top with reading progress */}
      <AnimatePresence>
        {past && (
          <motion.button
            type="button"
            onClick={scrollTop}
            aria-label="Back to top"
            className="group fixed right-6 bottom-6 z-40 hidden size-14 place-items-center rounded-full bg-white text-ink shadow-[0_10px_30px_-10px_rgba(14,42,38,0.45)] lg:grid"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
          >
            <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 56 56" aria-hidden>
              <circle cx="28" cy="28" r="26" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="2" />
              <motion.circle cx="28" cy="28" r="26" fill="none" stroke="var(--color-forest)" strokeWidth="2.5" style={{ pathLength: ring }} />
            </svg>
            <ArrowUp className="size-5 transition-transform duration-500 group-hover:-translate-y-0.5" aria-hidden />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile and tablet: bottom action bar */}
      <AnimatePresence>
        {past && !formsVisible && !onFormPage && (
          <motion.div
            className="fixed inset-x-3 bottom-3 z-40 flex items-center gap-2 rounded-full bg-ink p-1.5 shadow-2xl lg:hidden"
            style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.6, ease: EASE } }}
            exit={{ y: 100, opacity: 0, transition: { duration: 0.35 } }}
          >
            <Link to="/book" className="btn btn-lime min-h-12 flex-1">
              Book a Cleaning <ArrowUpRight className="size-4" aria-hidden />
            </Link>
            <button
              type="button"
              onClick={scrollTop}
              aria-label="Back to top"
              className="grid size-12 shrink-0 place-items-center rounded-full bg-ivory/10 text-ivory"
            >
              <ArrowUp className="size-5" aria-hidden />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
