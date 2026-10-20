import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Search, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { site } from '../../data/site'
import { SplitLines } from '../animation/SplitLines'
import { Reveal, RevealGroup, RevealItem } from '../animation/Reveal'
import { EASE } from '../../lib/motion'

const normalise = (v) => v.toUpperCase().replace(/[^A-Z0-9]/g, '')
// 'DA1 2AB' or 'DA12AB' gives 'DA1'; a district on its own is used as-is.
const outwardCode = (q) => (q.length >= 5 && /[0-9][A-Z]{2}$/.test(q) ? q.slice(0, -3) : q)
// 'SE' matches any SE district (SE1, SE28...); 'DA1' only matches DA1.
const covers = (code, prefix) => (/^[A-Z]+$/.test(prefix) ? new RegExp('^' + prefix + '[0-9]').test(code) : code === prefix)

export function Areas() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState(null)
  const hasPrefixes = site.areas.some((a) => a.prefixes.length)

  const check = (e) => {
    e.preventDefault()
    const q = normalise(query)
    if (!q) return
    const code = outwardCode(q)
    const match = site.areas.find((a) => a.prefixes.some((p) => covers(code, normalise(p))))
    setResult(match ? { ok: true, area: match.name } : { ok: false })
  }

  return (
    <section id="areas" aria-labelledby="areas-title" className="relative overflow-hidden bg-paper py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow mb-5 text-forest">Areas we cover</p>
          </Reveal>
          <SplitLines
            lines={['Local teams,', <em className="text-forest">close to home.</em>]}
            className="display text-[clamp(2rem,3.6vw,3.5rem)] text-ink"
          />
          <h2 id="areas-title" className="sr-only">
            Areas we cover
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md leading-relaxed text-stone">
              We currently clean homes and workplaces across the areas listed here. Not on the list? Ask us anyway, as we may
              still be able to help.
            </p>
          </Reveal>

          {hasPrefixes && (
            <Reveal delay={0.25}>
              <form onSubmit={check} className="mt-8 max-w-md" role="search" aria-label="Check your postcode">
                <label htmlFor="postcode-check" className="field-label">
                  Check your postcode
                </label>
                <div className="flex gap-2">
                  <input
                    id="postcode-check"
                    className="field-input"
                    placeholder="Start of your postcode"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value)
                      setResult(null)
                    }}
                    autoComplete="postal-code"
                  />
                  <button type="submit" className="btn btn-ink shrink-0 px-5" aria-label="Check postcode">
                    <Search className="size-4" aria-hidden />
                  </button>
                </div>
                <div aria-live="polite" className="min-h-14">
                  <AnimatePresence mode="wait">
                    {result && (
                      <motion.p
                        key={String(result.ok)}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } }}
                        exit={{ opacity: 0 }}
                        className="mt-3 text-sm font-semibold text-ink"
                      >
                        {result.ok ? (
                          <>Good news, that looks like part of {result.area}.</>
                        ) : (
                          <>
                            That postcode is outside our usual areas, but we may still be able to help.{' '}
                            <a className="text-forest underline underline-offset-4" href={site.phoneHref}>
                              Call {site.phone}
                            </a>{' '}
                            or{' '}
                            <Link className="text-forest underline underline-offset-4" to="/contact">
                              send us a message
                            </Link>
                            .
                          </>
                        )}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </Reveal>
          )}
        </div>

        <RevealGroup as="ul" className="flex flex-wrap content-start gap-3 lg:col-span-6 lg:col-start-7 lg:pt-10" stagger={0.06}>
          {site.areas.map((a) => (
            <RevealItem
              as="li"
              key={a.name}
              className="flex items-center gap-2.5 rounded-full border border-ink/15 bg-white px-5 py-3.5 text-[15px] font-semibold text-ink transition-colors duration-300 hover:border-forest hover:bg-forest hover:text-ivory"
            >
              <MapPin className="size-4 text-forest" aria-hidden />
              {a.name}
            </RevealItem>
          ))}
          <RevealItem as="li">
            <Link
              to="/contact"
              className="flex items-center gap-2.5 rounded-full bg-lime px-5 py-3.5 text-[15px] font-bold text-ink transition-colors hover:bg-ink hover:text-lime"
            >
              <MessageCircle className="size-4" aria-hidden /> Not listed? Ask us
            </Link>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  )
}
