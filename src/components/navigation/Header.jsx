import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { Logo } from '../layout/Logo'
import { MobileMenu } from './MobileMenu'
import { nav } from '../../data/site'
import { services } from '../../data/content'
import { EASE, cn } from '../../lib/motion'

function ServicesDropdown({ item, active }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onClick = (e) => !ref.current?.contains(e.target) && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onClick)
    }
  }, [open])

  return (
    <li ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <div className="flex items-center">
        <NavLink to={item.to} className={linkClass}>
          {item.label}
        </NavLink>
        <button
          type="button"
          aria-label="Show services"
          aria-expanded={open}
          aria-controls="services-menu"
          onClick={() => setOpen((o) => !o)}
          className="-ml-2 grid size-7 place-items-center rounded-full text-ink/70 hover:text-ink"
        >
          <ChevronDown className={cn('size-3.5 transition-transform duration-300', open && 'rotate-180')} aria-hidden />
        </button>
      </div>
      {active && <Underline />}
      <AnimatePresence>
        {open && (
          <motion.div
            id="services-menu"
            className="absolute top-full left-1/2 w-[560px] -translate-x-1/2 pt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } }}
            exit={{ opacity: 0, y: 6, transition: { duration: 0.2 } }}
          >
            <div className="grid grid-cols-2 gap-1 rounded-3xl border border-ink/10 bg-white p-3 shadow-[0_24px_60px_-20px_rgba(14,42,38,0.35)]">
              {services.map((s) => (
                <Link
                  key={s.id}
                  to={`/services#${s.id}`}
                  className="group flex items-center gap-3 rounded-2xl p-2.5 transition-colors hover:bg-mist"
                >
                  <img src={s.image.src} alt="" loading="lazy" className="size-12 shrink-0 rounded-xl object-cover" />
                  <span>
                    <span className="block text-[13px] leading-tight font-semibold text-ink">{s.title}</span>
                    <span className="mt-0.5 block text-[11px] text-stone">{s.short}</span>
                  </span>
                </Link>
              ))}
              <Link
                to="/services"
                className="col-span-2 mt-1 flex items-center justify-between rounded-2xl bg-ink px-4 py-3 text-[13px] font-semibold text-ivory hover:bg-forest"
              >
                View all services <ArrowUpRight className="size-4" aria-hidden />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

const linkClass = 'relative block px-3.5 py-2 text-[12px] font-semibold tracking-[0.08em] text-ink uppercase transition-colors hover:text-forest'

function Underline() {
  return (
    <motion.span
      layoutId="nav-underline"
      className="absolute right-3.5 -bottom-0.5 left-3.5 h-[2px] rounded-full bg-ink"
      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
    />
  )
}

export function Header() {
  const { pathname } = useLocation()
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 30)
    if (y > 500 && y > prev + 4 && !menuOpen) setHidden(true)
    else if (y < prev - 4 || y < 500) setHidden(false)
  })

  const isActive = (to) => (to === '/' ? pathname === '/' : pathname.startsWith(to))

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -120 : 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE, delay: hidden ? 0 : 0.1 }}
      >
        <div className="container-x pt-4 lg:pt-6">
          <div
            className={cn(
              'flex h-16 items-center justify-between gap-4 rounded-2xl bg-white/95 pr-2 pl-4 backdrop-blur-xl transition-shadow duration-500 sm:pl-5 lg:h-[76px] lg:rounded-[20px] lg:pr-3 lg:pl-7',
              scrolled ? 'shadow-[0_14px_40px_-16px_rgba(14,42,38,0.35)]' : 'shadow-[0_6px_24px_-12px_rgba(14,42,38,0.2)]',
            )}
          >
            <Logo variant="color" className="h-8 sm:h-9 lg:h-11" />

            <nav aria-label="Main" className="hidden lg:block">
              <ul className="flex items-center gap-1 xl:gap-3">
                {nav.map((item) =>
                  item.dropdown ? (
                    <ServicesDropdown key={item.to} item={item} active={isActive(item.to)} />
                  ) : (
                    <li key={item.to} className="relative">
                      <NavLink to={item.to} end={item.to === '/'} className={linkClass}>
                        {item.label}
                      </NavLink>
                      {isActive(item.to) && <Underline />}
                    </li>
                  ),
                )}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <Link
                to="/book"
                className="btn btn-ink group hidden min-h-12 px-6 text-[12px] tracking-[0.08em] uppercase sm:inline-flex"
              >
                Book a cleaning
                <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" aria-hidden />
              </Link>
              <button
                type="button"
                className="grid size-12 place-items-center rounded-xl bg-ink text-ivory lg:hidden"
                aria-label="Open menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                onClick={() => setMenuOpen(true)}
              >
                <span className="flex w-5 flex-col gap-[5px]" aria-hidden>
                  <span className="h-[2px] w-full rounded bg-current" />
                  <span className="h-[2px] w-3/5 rounded bg-current" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>{menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}</AnimatePresence>
    </>
  )
}
