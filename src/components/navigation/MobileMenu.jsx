import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { X, ArrowUpRight } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'
import { Logo } from '../layout/Logo'
import { nav, site } from '../../data/site'
import { whatsappUrl } from '../../lib/whatsapp'
import { EASE } from '../../lib/motion'
import { useLockBody } from '../../hooks'

export function MobileMenu({ onClose }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  useLockBody(true)

  useEffect(() => {
    const opener = document.activeElement
    closeRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        const focusables = panelRef.current.querySelectorAll('a, button')
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      opener?.focus?.()
    }
  }, [onClose])

  return (
    <motion.div
      id="mobile-menu"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="on-dark fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ink text-ivory lg:hidden"
      initial={{ clipPath: 'inset(0% 0% 0% 100%)' }}
      animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      exit={{ clipPath: 'inset(0% 0% 0% 100%)' }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <div className="container-x flex h-[76px] shrink-0 items-center justify-between pt-3">
        <Logo variant="dark" className="h-7" onClick={onClose} />
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="grid size-12 place-items-center rounded-full bg-ivory/10"
          aria-label="Close menu"
        >
          <X className="size-5" aria-hidden />
        </button>
      </div>

      <nav aria-label="Mobile" className="container-x mt-8 flex-1">
        <motion.ul
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } } }}
        >
          {nav.map((item, i) => (
            <li key={item.to} className="overflow-hidden border-b border-ivory/10">
              <motion.div
                variants={{ hidden: { y: '100%' }, show: { y: 0, transition: { duration: 0.9, ease: EASE } } }}
              >
                <Link
                  to={item.to}
                  onClick={onClose}
                  className="group flex items-baseline justify-between py-4 text-[1.9rem] leading-none font-medium tracking-tight"
                >
                  <span>{item.label}</span>
                  <span className="font-sans text-xs text-ivory/40">0{i + 1}</span>
                </Link>
              </motion.div>
            </li>
          ))}
        </motion.ul>
      </nav>

      <motion.div
        className="container-x grid gap-3 pt-10 pb-[max(2rem,env(safe-area-inset-bottom))]"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
      >
        <Link to="/book" onClick={onClose} className="btn btn-lime w-full">
          Book a Cleaning <ArrowUpRight className="size-4" aria-hidden />
        </Link>
        <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light w-full">
          <FaWhatsapp className="size-5" aria-hidden /> Chat on WhatsApp
        </a>
        <p className="pt-3 text-center text-xs text-ivory/50">{site.hours}</p>
      </motion.div>
    </motion.div>
  )
}
