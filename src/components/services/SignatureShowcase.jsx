import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { signature, services } from '../../data/content'
import { SplitLines } from '../animation/SplitLines'
import { Reveal } from '../animation/Reveal'
import { CarouselButton } from './ServicesScroller'
import { useBooking } from '../booking/BookingContext'
import { EASE, cn } from '../../lib/motion'

const wipe = {
  enter: (dir) => ({ clipPath: dir > 0 ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)', zIndex: 2 }),
  center: { clipPath: 'inset(0% 0% 0% 0%)', zIndex: 2, transition: { duration: 1.2, ease: EASE } },
  exit: (dir) => ({ x: dir > 0 ? '-12%' : '12%', zIndex: 1, transition: { duration: 1.2, ease: EASE } }),
}

export function SignatureShowcase() {
  const [[active, dir], setState] = useState([0, 1])
  const tabRefs = useRef([])
  const { openBooking } = useBooking()
  const item = signature[active]
  const service = services.find((s) => s.id === item.serviceId)

  const go = (next, direction) => {
    const n = (next + signature.length) % signature.length
    if (n === active) return
    setState([n, direction ?? (n > active ? 1 : -1)])
  }

  const onTabKey = (e, i) => {
    let next = null
    if (e.key === 'ArrowRight') next = (i + 1) % signature.length
    if (e.key === 'ArrowLeft') next = (i - 1 + signature.length) % signature.length
    if (next === null) return
    e.preventDefault()
    go(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <section aria-labelledby="signature-title" className="relative overflow-hidden bg-mist py-24 sm:py-32">
      <div className="container-x">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:mb-16 lg:flex-row lg:items-end">
          <div>
            <Reveal>
              <p className="eyebrow mb-5 text-forest">Signature services</p>
            </Reveal>
            <SplitLines
              lines={['The cleans that', <em className="text-forest">make the difference.</em>]}
              className="display text-[clamp(2rem,3.6vw,3.5rem)] text-ink"
            />
            <h2 id="signature-title" className="sr-only">
              Signature services
            </h2>
          </div>

          <div role="tablist" aria-label="Signature services" className="flex flex-wrap gap-2">
            {signature.map((s, i) => {
              const svc = services.find((x) => x.id === s.serviceId)
              const selected = i === active
              return (
                <button
                  key={s.serviceId}
                  ref={(el) => (tabRefs.current[i] = el)}
                  role="tab"
                  id={`sig-tab-${i}`}
                  aria-selected={selected}
                  aria-controls="sig-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => go(i)}
                  onKeyDown={(e) => onTabKey(e, i)}
                  className={cn(
                    'relative rounded-full px-5 py-3 text-sm font-semibold transition-colors duration-300',
                    selected ? 'text-ivory' : 'text-ink hover:bg-ink/5',
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="sig-tab"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={{ type: 'spring', stiffness: 360, damping: 34 }}
                    />
                  )}
                  <span className="relative">{svc.title.replace(' cleaning', '').replace(' & commercial', '')}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Image stage */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-ink sm:aspect-[16/11] lg:col-span-7 lg:aspect-auto lg:h-[min(78vh,760px)]">
            <AnimatePresence initial={false} custom={dir}>
              <motion.div
                key={active}
                custom={dir}
                variants={wipe}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <motion.img
                  src={item.image.src}
                  alt={item.image.alt}
                  width={item.image.width}
                  height={item.image.height}
                  loading="lazy"
                  className="h-full w-full object-cover"
                  initial={{ scale: 1.25 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.6, ease: EASE }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" aria-hidden />
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`detail-${active}`}
                className="absolute bottom-5 left-5 z-10 hidden w-44 overflow-hidden rounded-[20px] border-4 border-mist sm:block lg:w-56"
                initial={{ opacity: 0, y: 40, rotate: -4 }}
                animate={{ opacity: 1, y: 0, rotate: -2, transition: { duration: 1, delay: 0.45, ease: EASE } }}
                exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
              >
                <img src={item.detail.src} alt={item.detail.alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
              </motion.div>
            </AnimatePresence>

            <div className="absolute right-6 bottom-4 z-10 font-display text-[clamp(3rem,6vw,5.5rem)] leading-none text-ivory" aria-hidden>
              0{active + 1}
            </div>
          </div>

          {/* Copy */}
          <div
            id="sig-panel"
            role="tabpanel"
            aria-labelledby={`sig-tab-${active}`}
            className="flex flex-col justify-between lg:col-span-5"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                exit={{ opacity: 0, y: -20, filter: 'blur(6px)', transition: { duration: 0.35 } }}
              >
                <motion.p
                  className="eyebrow mb-6 text-forest"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: EASE }}
                >
                  {item.kicker} · {service.title}
                </motion.p>
                <SplitLines
                  as="h3"
                  trigger="mount"
                  lines={item.title}
                  className="display text-[clamp(1.9rem,3vw,2.9rem)] text-ink"
                  stagger={0.08}
                />
                <motion.p
                  className="mt-6 max-w-md leading-relaxed text-stone"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
                >
                  {item.body}
                </motion.p>
                <motion.ul
                  className="mt-8 space-y-3"
                  initial="hidden"
                  animate="show"
                  variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.35 } } }}
                >
                  {item.points.map((p) => (
                    <motion.li
                      key={p}
                      className="flex items-start gap-3 text-[15px] text-ink"
                      variants={{
                        hidden: { opacity: 0, x: 24 },
                        show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
                      }}
                    >
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-lime">
                        <Check className="size-3 text-ink" strokeWidth={3} aria-hidden />
                      </span>
                      {p}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex items-center justify-between gap-4 border-t border-ink/10 pt-6">
              <button type="button" onClick={() => openBooking(item.serviceId)} className="btn btn-ink group">
                Request this service
                <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" aria-hidden />
              </button>
              <div className="flex gap-2">
                <CarouselButton light label="Previous signature service" onClick={() => go(active - 1, -1)}>
                  <ArrowLeft className="size-5" aria-hidden />
                </CarouselButton>
                <CarouselButton light label="Next signature service" onClick={() => go(active + 1, 1)}>
                  <ArrowRight className="size-5" aria-hidden />
                </CarouselButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
