import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { services } from '../../data/content'
import { useMediaQuery } from '../../hooks'
import { SplitLines } from '../animation/SplitLines'
import { Reveal } from '../animation/Reveal'
import { useBooking } from '../booking/BookingContext'
import { cn } from '../../lib/motion'

const pad = (n) => String(n).padStart(2, '0')

export function ServicesScroller() {
  const wide = useMediaQuery('(min-width: 1024px)')
  const reduce = useReducedMotion()
  return (
    <section id="services" aria-labelledby="services-title" className="on-dark relative bg-ink text-ivory">
      {wide && !reduce ? <HorizontalStory /> : <SwipeCarousel />}
    </section>
  )
}

function Heading({ className }) {
  return (
    <div className={className}>
      <Reveal>
        <p className="eyebrow mb-6 text-lime">Services</p>
      </Reveal>
      <SplitLines
        lines={['Six ways', <>we look after</>, <em className="text-lime">your space.</em>]}
        className="display text-[clamp(2.2rem,3.8vw,3.8rem)]"
        lineClassName=""
      />
      <span id="services-title" className="sr-only">
        Our cleaning services
      </span>
    </div>
  )
}

/* ---------- Desktop: vertical scroll drives a horizontal track ---------- */

function HorizontalStory() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [distance, setDistance] = useState(0)
  const [index, setIndex] = useState(0)

  useLayoutEffect(() => {
    const measure = () => {
      if (trackRef.current) setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(trackRef.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useSpring(useTransform(scrollYProgress, [0, 1], [0, -distance]), {
    stiffness: 160,
    damping: 32,
    mass: 0.35,
  })
  const imageShift = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setIndex(Math.min(services.length - 1, Math.max(0, Math.round(v * (services.length - 1)))))
  })

  return (
    <div ref={sectionRef} style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex w-max items-center gap-6 pr-[8vw] pl-10 xl:pl-[max(2.5rem,calc((100vw-1440px)/2+2.5rem))]">
          <div className="flex w-[34vw] max-w-[520px] shrink-0 flex-col justify-between self-stretch py-[12vh] pr-10">
            <Heading />
            <Reveal delay={0.2}>
              <p className="max-w-sm text-ivory/70">
                Keep scrolling to move through each service. Every one can be booked as a one-off or on a schedule.
              </p>
              <Link to="/services" className="btn btn-lime group mt-6">
                View all services
                <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" aria-hidden />
              </Link>
            </Reveal>
          </div>

          {services.map((s, i) => (
            <ServicePanel key={s.id} service={s} i={i} shift={imageShift} />
          ))}
        </motion.div>

        {/* Progress */}
        <div className="pointer-events-none absolute inset-x-0 bottom-8">
          <div className="container-x flex items-center gap-6">
            <span className="w-14 font-display text-2xl tabular-nums" aria-hidden>
              {pad(index + 1)}
            </span>
            <div className="relative h-px flex-1 bg-ivory/15">
              <motion.div className="absolute inset-0 origin-left bg-lime" style={{ scaleX: scrollYProgress }} />
            </div>
            <span className="w-14 text-right font-display text-2xl text-ivory/40" aria-hidden>
              {pad(services.length)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function ServicePanel({ service, i, shift }) {
  const { openBooking } = useBooking()
  const tall = i % 2 === 0
  return (
    <article
      className={cn(
        'group relative w-[min(44vw,620px)] shrink-0 overflow-hidden rounded-[32px] bg-ink-2',
        tall ? 'h-[72vh]' : 'h-[60vh] self-end mb-[8vh]',
      )}
      tabIndex={-1}
    >
      <motion.img
        src={service.image.src}
        srcSet={service.image.srcSet}
        sizes="44vw"
        alt={service.image.alt}
        width={service.image.width}
        height={service.image.height}
        loading="lazy"
        decoding="async"
        style={{ x: shift, scale: 1.18 }}
        className="absolute inset-0 h-full w-full object-cover transition-[filter] duration-700 group-hover:brightness-75"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" aria-hidden />

      <span className="text-outline absolute top-6 right-8 font-display text-[5rem] leading-none text-ivory/70" aria-hidden>
        {pad(i + 1)}
      </span>

      <div className="absolute inset-x-0 bottom-0 p-8">
        <p className="mb-3 text-xs font-bold tracking-[0.2em] text-lime uppercase">{service.short}</p>
        <h3 className="display text-[clamp(1.6rem,2.2vw,2.3rem)]">{service.title}</h3>

        {/* Sliding information panel, revealed on hover or keyboard focus */}
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-700 ease-[var(--ease-expo)] group-focus-within:grid-rows-[1fr] group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <p className="mt-4 max-w-md translate-y-6 text-sm leading-relaxed text-ivory/80 opacity-0 transition duration-700 ease-[var(--ease-expo)] group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100">
              {service.description}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => openBooking(service.id)}
          className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-ivory"
        >
          <span className="grid size-10 place-items-center rounded-full bg-lime text-ink transition-transform duration-500 group-hover:rotate-45">
            <ArrowUpRight className="size-4" aria-hidden />
          </span>
          Request this service
        </button>
      </div>
    </article>
  )
}

/* ---------- Mobile / reduced motion: native swipe carousel ---------- */

function SwipeCarousel() {
  const listRef = useRef(null)
  const [index, setIndex] = useState(0)
  const { openBooking } = useBooking()

  const step = (dir) => {
    const list = listRef.current
    const card = list?.querySelector('li')
    if (!card) return
    list.scrollBy({ left: dir * (card.offsetWidth + 16), behavior: 'smooth' })
  }

  const onScroll = () => {
    const list = listRef.current
    const card = list?.querySelector('li')
    if (!card) return
    setIndex(Math.round(list.scrollLeft / (card.offsetWidth + 16)))
  }

  return (
    <div className="py-20 sm:py-28">
      <div className="container-x flex items-end justify-between gap-6">
        <Heading />
        <div className="hidden gap-2 sm:flex">
          <CarouselButton label="Previous service" onClick={() => step(-1)} disabled={index === 0}>
            <ArrowLeft className="size-5" aria-hidden />
          </CarouselButton>
          <CarouselButton label="Next service" onClick={() => step(1)} disabled={index >= services.length - 1}>
            <ArrowRight className="size-5" aria-hidden />
          </CarouselButton>
        </div>
      </div>

      <ul
        ref={listRef}
        onScroll={onScroll}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-2 sm:px-6"
        aria-label="Services"
      >
        {services.map((s, i) => (
          <li key={s.id} className="w-[84vw] max-w-[440px] shrink-0 snap-start sm:w-[58vw]">
            <article className="overflow-hidden rounded-[28px] bg-ink-2">
              <div className="relative aspect-[4/3]">
                <img
                  src={s.image.src}
                  srcSet={s.image.srcSet}
                  sizes="(min-width: 640px) 58vw, 84vw"
                  alt={s.image.alt}
                  width={s.image.width}
                  height={s.image.height}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <span className="text-outline absolute top-4 right-5 font-display text-6xl text-ivory/80" aria-hidden>
                  {pad(i + 1)}
                </span>
              </div>
              <div className="p-6">
                <p className="text-[11px] font-bold tracking-[0.2em] text-lime uppercase">{s.short}</p>
                <h3 className="display mt-2 text-[1.6rem]">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ivory/75">{s.description}</p>
                <ul className="mt-4 space-y-1.5">
                  {s.includes.slice(0, 3).map((inc) => (
                    <li key={inc} className="flex items-center gap-2 text-sm text-ivory/80">
                      <Check className="size-4 text-lime" aria-hidden /> {inc}
                    </li>
                  ))}
                </ul>
                <button type="button" onClick={() => openBooking(s.id)} className="btn btn-lime mt-6 w-full">
                  Request this service
                </button>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <div className="container-x mt-6 flex items-center gap-4" aria-hidden>
        <span className="font-display text-xl">{pad(index + 1)}</span>
        <div className="relative h-px flex-1 bg-ivory/15">
          <motion.div
            className="absolute inset-y-0 left-0 bg-lime"
            animate={{ width: `${((index + 1) / services.length) * 100}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
        <span className="font-display text-xl text-ivory/40">{pad(services.length)}</span>
      </div>
      <div className="container-x mt-8">
        <Link to="/services" className="btn btn-ghost-light w-full sm:w-auto">
          View all services
        </Link>
      </div>
    </div>
  )
}

export function CarouselButton({ label, onClick, disabled, children, light = false }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'grid size-12 place-items-center rounded-full border transition-colors duration-300 disabled:opacity-30',
        light
          ? 'border-ink/20 text-ink hover:bg-ink hover:text-ivory disabled:hover:bg-transparent disabled:hover:text-ink'
          : 'border-ivory/25 text-ivory hover:bg-lime hover:text-ink disabled:hover:bg-transparent disabled:hover:text-ivory',
      )}
    >
      {children}
    </button>
  )
}
