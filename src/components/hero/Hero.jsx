import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { images } from '../../data/images'
import { site } from '../../data/site'
import { EASE } from '../../lib/motion'

const word = {
  hidden: { y: '110%' },
  show: (i) => ({ y: '0%', transition: { duration: 1.3, ease: EASE, delay: 0.7 + i * 0.12 } }),
}

function HeroCard({ to, label, tone, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      <Link
        to={to}
        className={`group flex size-32 flex-col justify-between rounded-[20px] p-4 shadow-[0_20px_40px_-20px_rgba(14,42,38,0.5)] transition-transform duration-500 hover:-translate-y-1 xl:size-36 ${
          tone === 'lime' ? 'bg-lime text-ink' : 'bg-white text-ink'
        }`}
      >
        <span className="text-[12px] leading-tight font-semibold tracking-[0.06em] uppercase">{label}</span>
        <ArrowRight className="size-5 self-end transition-transform duration-500 group-hover:translate-x-1" aria-hidden />
      </Link>
    </motion.div>
  )
}

export function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const personY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-35%'])

  // The cut-out drifts gently toward the cursor.
  const mx = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 50, damping: 18 })
  useEffect(() => {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return
    const onMove = (e) => mx.set((e.clientX / window.innerWidth - 0.5) * -24)
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduce, mx])

  return (
    <section ref={ref} id="top" aria-labelledby="hero-title" className="bg-paper p-2 sm:p-3">
      <motion.div
        className="on-dark relative isolate h-[calc(100svh-1rem)] min-h-[640px] overflow-hidden rounded-[26px] text-ivory sm:h-[calc(100svh-1.5rem)] lg:min-h-[720px] lg:rounded-[36px]"
        style={{ background: 'linear-gradient(180deg, #b9e2cf 0%, #7fc2a6 30%, #3f8f72 62%, #17503f 100%)' }}
        initial={{ clipPath: 'inset(6% 6% 6% 6% round 48px)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0% round 0px)' }}
        transition={{ duration: 1.5, ease: EASE }}
      >
        {/* Soft light from the top and fine grain */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_10%,rgba(255,255,255,0.55),transparent_70%)]" aria-hidden />
        <div className="grain absolute inset-0 -z-10 opacity-[0.07] mix-blend-overlay" aria-hidden />

        {/* Lime ribbon, drawn behind the cleaner */}
        <svg className="absolute inset-0 -z-10 h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden>
          <motion.path
            d="M180 -20C230 160 330 300 520 330C700 360 760 250 900 250C1060 250 1120 420 1200 520C1260 600 1300 640 1460 640"
            stroke="var(--color-lime)"
            strokeWidth="16"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.4, ease: EASE, delay: 0.6 }}
          />
        </svg>

        {/* The cleaner */}
        <motion.div className="absolute inset-x-0 bottom-0 -z-10 flex justify-center" style={{ y: personY, x: sx }}>
          <motion.img
            src={images.heroCutout.src}
            alt={images.heroCutout.alt}
            width={images.heroCutout.width}
            height={images.heroCutout.height}
            fetchpriority="high"
            className="h-[50svh] max-h-[760px] w-auto max-w-none translate-x-[6%] object-contain sm:h-[66svh] lg:h-[80svh]"
            initial={{ opacity: 0, y: 80, scale: 1.04 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.6, ease: EASE, delay: 0.35 }}
          />
        </motion.div>

        {/* Bottom shade so the headline always reads */}
        <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" aria-hidden />

        <motion.div className="container-x relative flex h-full flex-col pt-28 pb-6 sm:pt-32 lg:pb-8" style={{ y: textY }}>
          <div className="flex flex-1 flex-col justify-start gap-5 pt-2 sm:gap-8 lg:flex-row lg:items-center lg:justify-between lg:pt-0">
            <motion.div
              initial={{ opacity: 0, x: -30, filter: 'blur(6px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, ease: EASE, delay: 1.0 }}
            >
              <p className="mb-3 inline-flex rounded-full bg-ink px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.12em] text-lime uppercase">
                {site.slogan}
              </p>
              <p className="max-w-[19rem] text-[15px] leading-relaxed font-medium text-ink sm:max-w-xs sm:text-base lg:max-w-sm lg:text-white lg:drop-shadow-[0_1px_8px_rgba(14,42,38,0.35)]">
                The formula for a cleaner, brighter space. Professional cleaning for homes, properties and businesses across
                Dartford, Bexley and London.
              </p>
            </motion.div>

            <div className="hidden gap-3 lg:flex">
              <HeroCard to="/services" label="Our services" tone="white" delay={1.15} />
              <HeroCard to="/book" label="Book a cleaning" tone="lime" delay={1.25} />
            </div>

            <motion.div
              className="flex gap-2 lg:hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 1.1 }}
            >
              <Link to="/book" className="btn btn-lime min-h-11 px-5 text-[13px]">
                Book a cleaning
              </Link>
              <Link to="/services" className="btn min-h-11 bg-ink px-5 text-[13px] text-ivory">
                Our services
              </Link>
            </motion.div>
          </div>

          <h1 id="hero-title" className="relative text-white">
            <span className="sr-only">Algorique Cleaners: professional cleaning services in Dartford, Bexley and London</span>
            <span aria-hidden className="flex flex-col text-[clamp(4rem,19vw,7rem)] leading-[0.9] font-semibold tracking-[-0.055em] sm:flex-row sm:gap-[0.24em] sm:text-[clamp(4rem,11vw,12.5rem)]">
              {['Cleaner', 'Spaces.'].map((w, i) => (
                <span key={w} className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    className="block"
                    custom={i}
                    variants={word}
                    initial="hidden"
                    animate="show"
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>
        </motion.div>
      </motion.div>
    </section>
  )
}
