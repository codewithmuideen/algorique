import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X } from 'lucide-react'
import { categories, readConsent, saveConsent, onConsentOpen } from '../../lib/consent'
import { useLockBody } from '../../hooks'
import { EASE, cn } from '../../lib/motion'

export function CookieConsent() {
  const [banner, setBanner] = useState(false)
  const [modal, setModal] = useState(false)
  const [choices, setChoices] = useState({ analytics: false, marketing: false })

  useEffect(() => {
    let timer
    if (!readConsent()) timer = setTimeout(() => setBanner(true), 1200)
    const off = onConsentOpen(() => openModal())
    return () => {
      clearTimeout(timer)
      off()
    }
  }, [])

  const openModal = () => {
    const current = readConsent()
    setChoices({ analytics: !!current?.analytics, marketing: !!current?.marketing })
    setModal(true)
  }

  const decide = (value) => {
    saveConsent(value)
    setBanner(false)
    setModal(false)
  }

  return (
    <>
      <AnimatePresence>
        {banner && !modal && (
          <motion.section
            role="region"
            aria-label="Cookie consent"
            className="fixed inset-x-3 bottom-3 z-[55] sm:bottom-6 lg:inset-x-auto lg:left-1/2 lg:w-[66vw] lg:max-w-[1100px] lg:min-w-[820px] lg:-translate-x-1/2"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } }}
            exit={{ opacity: 0, y: 40, transition: { duration: 0.35 } }}
          >
            <div className="flex flex-col gap-5 rounded-[24px] border border-ink/10 bg-white p-5 shadow-[0_30px_80px_-24px_rgba(11,31,68,0.5)] sm:p-6 lg:flex-row lg:items-center lg:gap-8 lg:p-7">
              <div className="flex gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-lime">
                  <Cookie className="size-6 text-ink" aria-hidden />
                </span>
                <div>
                  <h2 className="text-lg font-semibold text-ink">We value your privacy</h2>
                  <p className="mt-1 text-sm leading-relaxed text-stone">
                    We use a strictly necessary cookie to remember your choice. With your permission we may also use analytics and
                    marketing cookies to improve the site. Read our{' '}
                    <Link to="/cookies" className="font-semibold text-forest underline underline-offset-4">
                      cookie policy
                    </Link>
                    .
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2 sm:flex-nowrap">
                <button type="button" onClick={openModal} className="btn btn-ghost-dark min-h-11 flex-1 px-5 sm:flex-none">
                  Customise
                </button>
                <button
                  type="button"
                  onClick={() => decide({ analytics: false, marketing: false })}
                  className="btn btn-ghost-dark min-h-11 flex-1 px-5 sm:flex-none"
                >
                  Reject all
                </button>
                <button
                  type="button"
                  onClick={() => decide({ analytics: true, marketing: true })}
                  className="btn btn-ink min-h-11 w-full px-6 sm:w-auto"
                >
                  Accept all
                </button>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {modal && (
          <PreferencesModal
            choices={choices}
            setChoices={setChoices}
            onClose={() => {
              setModal(false)
              if (!readConsent()) setBanner(true)
            }}
            onSave={() => decide(choices)}
            onAcceptAll={() => decide({ analytics: true, marketing: true })}
            onRejectAll={() => decide({ analytics: false, marketing: false })}
          />
        )}
      </AnimatePresence>
    </>
  )
}

function PreferencesModal({ choices, setChoices, onClose, onSave, onAcceptAll, onRejectAll }) {
  const dialogRef = useRef(null)
  useLockBody(true)

  useEffect(() => {
    const opener = document.activeElement
    dialogRef.current?.querySelector('button')?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        const f = dialogRef.current.querySelectorAll('button, a, input:not([disabled])')
        if (e.shiftKey && document.activeElement === f[0]) {
          e.preventDefault()
          f[f.length - 1].focus()
        } else if (!e.shiftKey && document.activeElement === f[f.length - 1]) {
          e.preventDefault()
          f[0].focus()
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
      className="fixed inset-0 z-[75] flex items-end justify-center p-3 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      <button type="button" aria-label="Close cookie preferences" tabIndex={-1} onClick={onClose} className="absolute inset-0 bg-ink/60 backdrop-blur-sm" />
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-modal-title"
        className="relative flex max-h-[calc(100svh-1.5rem)] w-full max-w-[680px] flex-col overflow-hidden rounded-[28px] bg-white shadow-2xl"
        initial={{ y: 40, scale: 0.97 }}
        animate={{ y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } }}
        exit={{ y: 30, opacity: 0, transition: { duration: 0.25 } }}
      >
        <div className="flex items-start justify-between gap-4 border-b border-ink/10 p-6 sm:p-8">
          <div className="flex gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-lime">
              <Cookie className="size-6 text-ink" aria-hidden />
            </span>
            <div>
              <h2 id="cookie-modal-title" className="text-xl font-semibold text-ink sm:text-2xl">
                Cookie preferences
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-stone">
                Choose which cookies you allow. You can change this at any time from the footer.
              </p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="grid size-10 shrink-0 place-items-center rounded-full hover:bg-mist" aria-label="Close">
            <X className="size-5" aria-hidden />
          </button>
        </div>

        <ul className="flex-1 space-y-3 overflow-y-auto p-6 sm:p-8">
          {categories.map((c) => {
            const on = c.locked ? true : choices[c.id]
            return (
              <li key={c.id} className="rounded-2xl border border-ink/10 bg-paper p-5">
                <label className={cn('flex items-start justify-between gap-6', !c.locked && 'cursor-pointer')}>
                  <span>
                    <span className="flex items-center gap-2 font-semibold text-ink">
                      {c.label}
                      {c.locked && <span className="rounded-full bg-mist px-2 py-0.5 text-[11px] font-semibold text-forest">Always on</span>}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-stone">{c.description}</span>
                  </span>
                  <span className="relative mt-1 shrink-0">
                    <input
                      type="checkbox"
                      role="switch"
                      className="peer sr-only"
                      checked={on}
                      disabled={c.locked}
                      aria-checked={on}
                      onChange={(e) => setChoices((s) => ({ ...s, [c.id]: e.target.checked }))}
                    />
                    <span className="block h-7 w-12 rounded-full bg-ink/15 transition-colors duration-300 peer-checked:bg-forest peer-disabled:opacity-60 peer-focus-visible:ring-4 peer-focus-visible:ring-forest/30" />
                    <span className="absolute top-1 left-1 size-5 rounded-full bg-white shadow transition-transform duration-300 peer-checked:translate-x-5" />
                  </span>
                </label>
              </li>
            )
          })}
        </ul>

        <div className="grid gap-2 border-t border-ink/10 p-6 sm:grid-cols-3 sm:p-8">
          <button type="button" onClick={onRejectAll} className="btn btn-ghost-dark">
            Reject all
          </button>
          <button type="button" onClick={onSave} className="btn btn-lime">
            Save my choices
          </button>
          <button type="button" onClick={onAcceptAll} className="btn btn-ink">
            Accept all
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
