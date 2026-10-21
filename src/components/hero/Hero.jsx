import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Phone, ShieldCheck, ScanLine, Home, Building2, DoorOpen, KeyRound } from 'lucide-react'
import { images } from '../../data/images'
import { services } from '../../data/content'
import { site } from '../../data/site'
import { hasWhatsapp } from '../../lib/whatsapp'
import { WhatsAppQr } from '../forms/WhatsAppQr'
import { EASE, cn } from '../../lib/motion'

const line = {
  hidden: { y: '110%' },
  show: (i) => ({ y: '0%', transition: { duration: 1.2, ease: EASE, delay: 0.55 + i * 0.12 } }),
}

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 24, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 1, ease: EASE, delay },
})

// The four headline services shown under the hero, as on the flyer.
const strip = [
  { id: 'residential', icon: Home, title: 'Domestic cleaning', sub: 'Regular and deep cleaning' },
  { id: 'commercial', icon: Building2, title: 'Commercial cleaning', sub: 'Offices, shops and workspaces' },
  { id: 'tenancy', icon: DoorOpen, title: 'End-of-tenancy cleaning', sub: 'Move in, move out, landlord ready' },
  { id: 'airbnb', icon: KeyRound, title: 'Airbnb & short-stay', sub: 'Fast turnaround, reliable service' },
].filter((s) => services.some((x) => x.id === s.id))

export function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])

  return (
    <section ref={ref} id="top" aria-labelledby="hero-title" className="bg-paper p-2 sm:p-3">
      <motion.div
        className="on-dark relative isolate flex min-h-[760px] overflow-hidden rounded-[26px] bg-ink text-white lg:h-[calc(100svh-1.5rem)] lg:max-h-[960px] lg:min-h-[720px] lg:rounded-[36px]"
        initial={{ clipPath: 'inset(5% 5% 5% 5% round 48px)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0% round 0px)' }}
        transition={{ duration: 1.4, ease: EASE }}
      >
        {/* Photograph: top band on mobile, right side on desktop */}
        <motion.div
          className="absolute inset-x-0 top-0 -z-20 h-[44svh] lg:inset-y-0 lg:right-0 lg:left-auto lg:h-full lg:w-[70%]"
          style={{ y: photoY }}
        >
          <motion.img
            src={images.heroRoom.src}
            srcSet={images.heroRoom.srcSet}
            sizes="(min-width: 1024px) 70vw, 100vw"
            alt={images.heroRoom.alt}
            width={images.heroRoom.width}
            height={images.heroRoom.height}
            fetchpriority="high"
            className="h-full w-full object-cover object-[62%_60%]"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.2, ease: EASE }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/25 via-transparent to-transparent lg:from-white/10" aria-hidden />
        </motion.div>

        {/* Navy wave: from the left on desktop, from below on mobile */}
        <svg
          className="absolute inset-y-0 left-0 -z-10 hidden h-full w-[60%] lg:block"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d="M0 0H760C650 190 900 340 760 540C640 710 820 860 690 1000H0Z" fill="var(--color-forest)" />
          <path d="M0 0H700C590 190 840 340 700 540C580 710 760 860 630 1000H0Z" fill="var(--color-ink)" />
          <motion.path
            d="M760 0C650 190 900 340 760 540C640 710 820 860 690 1000"
            fill="none"
            stroke="var(--color-lime)"
            strokeWidth="5"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, ease: EASE, delay: 0.5 }}
          />
        </svg>
        <svg
          className="absolute inset-x-0 top-[37svh] bottom-0 -z-10 w-full lg:hidden"
          viewBox="0 0 400 600"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d="M0 20C120 -5 260 45 400 10V600H0Z" fill="var(--color-forest)" />
          <path d="M0 35C120 10 260 60 400 25V600H0Z" fill="var(--color-ink)" />
          <motion.path
            d="M0 20C120 -5 260 45 400 10"
            fill="none"
            stroke="var(--color-lime)"
            strokeWidth="4"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: EASE, delay: 0.5 }}
          />
        </svg>

        <motion.div
          className="container-x relative flex w-full flex-col justify-start pt-[46svh] pb-36 sm:pb-40 lg:justify-center lg:pt-28 lg:pb-32"
          style={{ y: copyY }}
        >
          <div className="max-w-xl lg:max-w-[46%] xl:max-w-[40rem]">
            <motion.p
              {...fadeUp(0.4)}
              className="inline-flex max-w-full items-center gap-2.5 rounded-full bg-white/[0.07] px-3.5 py-1.5 text-[12px] font-semibold whitespace-nowrap text-white/90 ring-1 ring-white/12 backdrop-blur-sm sm:gap-3 sm:px-4 sm:text-[13px]"
            >
              {site.audiences.map((a, i) => (
                <span key={a} className="flex items-center gap-2.5 sm:gap-3">
                  {i > 0 && <span className="size-1 rounded-full bg-lime" aria-hidden />}
                  {a}
                </span>
              ))}
            </motion.p>

            <h1 id="hero-title" className="mt-5 text-[clamp(2.4rem,4.6vw,4.9rem)] leading-[1.06] font-extrabold tracking-[-0.03em]">
              <span className="block overflow-hidden pb-[0.06em]">
                <motion.span className="block" custom={0} variants={line} initial="hidden" animate="show">
                  A cleaner space.
                </motion.span>
              </span>
              {/* Extra room around the second line so the drawn circle is not clipped */}
              <span className="-mx-[0.35em] -my-[0.22em] block overflow-hidden px-[0.35em] py-[0.22em]">
                <motion.span className="block whitespace-nowrap" custom={1} variants={line} initial="hidden" animate="show">
                  A{' '}
                  <span className="relative ml-[0.14em] inline-block">
                    brighter you.
                    <svg
                      className="pointer-events-none absolute -top-[0.16em] -left-[0.22em] h-[calc(100%+0.3em)] w-[calc(100%+0.44em)] overflow-visible"
                      viewBox="0 0 400 120"
                      preserveAspectRatio="none"
                      aria-hidden
                    >
                      <motion.path
                        d="M118 18C190 4 318 6 374 34C404 50 400 82 364 98C300 120 150 120 74 108C22 100 4 80 12 58C22 30 80 16 150 12"
                        fill="none"
                        stroke="var(--color-lime)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ pathLength: { duration: 1.2, ease: EASE, delay: 1.4 }, opacity: { duration: 0.2, delay: 1.4 } }}
                      />
                    </svg>
                  </span>
                </motion.span>
              </span>
            </h1>

            <motion.p
              {...fadeUp(1.0)}
              className="mt-6 flex items-center gap-x-3 text-[14px] font-semibold whitespace-nowrap sm:gap-x-4 sm:text-lg"
            >
              {site.values.map((v) => (
                <span key={v} className="flex items-center gap-1.5 sm:gap-2">
                  <span className="size-1.5 rounded-full bg-lime sm:size-2" aria-hidden />
                  {v}
                </span>
              ))}
            </motion.p>
            <motion.p {...fadeUp(1.1)} className="mt-3 max-w-md text-[15px] leading-relaxed text-white/75 sm:text-base">
              {site.trust} for homes, businesses and property managers across London and surrounding areas.
            </motion.p>

            <motion.div {...fadeUp(1.2)} className="mt-8 flex gap-2 sm:gap-3">
              <Link to="/book" className="btn btn-lime group min-h-11 gap-1.5 px-4 text-[13px] sm:min-h-13 sm:gap-2 sm:px-7 sm:text-sm">
                Get a free quote
                <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:rotate-45 sm:size-4" aria-hidden />
              </Link>
              <a href={site.phoneHref} className="btn btn-ghost-light min-h-11 gap-1.5 px-4 text-[13px] sm:min-h-13 sm:gap-2 sm:px-6 sm:text-sm">
                <Phone className="size-3.5 sm:size-4" aria-hidden /> {site.phone}
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating cards over the photograph (desktop) */}
        <motion.div
          className="absolute top-32 right-8 hidden items-center gap-3 rounded-2xl bg-white/90 p-3 pr-5 text-ink shadow-[0_20px_50px_-20px_rgba(11,31,68,0.5)] backdrop-blur-md lg:flex xl:right-12"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 1.3 }}
        >
          <span className="grid size-11 place-items-center rounded-xl bg-forest text-white">
            <ShieldCheck className="size-5" aria-hidden />
          </span>
          <span className="text-[13px] leading-tight font-semibold">
            {site.trust}
            <span className="mt-0.5 block font-medium text-stone">Vetted, trained and professional team</span>
          </span>
        </motion.div>

        {hasWhatsapp && (
          <motion.div
            className="absolute right-8 bottom-32 hidden items-center gap-4 rounded-[22px] bg-white p-3 pr-5 text-ink shadow-[0_24px_60px_-24px_rgba(11,31,68,0.6)] lg:flex xl:right-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 1.45 }}
          >
            <WhatsAppQr className="size-24" />
            <span className="max-w-[9rem] text-[13px] leading-snug">
              <span className="flex items-center gap-1.5 font-semibold">
                <ScanLine className="size-4 text-forest" aria-hidden /> Scan to chat
              </span>
              <span className="mt-1 block text-stone">Open a WhatsApp chat with us in seconds.</span>
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* Service strip overlapping the bottom of the hero */}
      <div className="container-x relative z-10 -mt-24 sm:-mt-28">
        <motion.ul
          className="grid grid-cols-2 gap-2 rounded-[24px] bg-white p-2 shadow-[0_30px_70px_-30px_rgba(11,31,68,0.45)] sm:gap-3 sm:p-3 lg:grid-cols-4 lg:rounded-[28px]"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 1.2 } } }}
        >
          {strip.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.li
                key={s.id}
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } } }}
              >
                <Link
                  to={`/services#${s.id}`}
                  className="group flex h-full flex-col items-center gap-3 rounded-[18px] p-4 text-center transition-colors duration-300 hover:bg-mist sm:flex-row sm:items-center sm:text-left lg:p-5"
                >
                  <span
                    className={cn(
                      'grid size-12 shrink-0 place-items-center rounded-full text-white ring-4 transition-transform duration-500 group-hover:-translate-y-1 sm:size-14',
                      i % 2 ? 'bg-lime-2 ring-lime/20' : 'bg-forest ring-forest/15',
                    )}
                  >
                    <Icon className="size-6" strokeWidth={1.8} aria-hidden />
                  </span>
                  <span>
                    <span className="block text-[14px] leading-tight font-semibold text-ink sm:text-[15px]">{s.title}</span>
                    <span className="mt-1 block text-[12px] leading-snug text-stone sm:text-[13px]">{s.sub}</span>
                  </span>
                </Link>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}
