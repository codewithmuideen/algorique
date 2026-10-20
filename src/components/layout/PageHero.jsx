import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { SplitLines } from '../animation/SplitLines'
import { EASE } from '../../lib/motion'

// Framed hero used at the top of every inner page.
export function PageHero({ eyebrow, title, intro, image, imagePosition = '50% 50%', children }) {
  return (
    <section aria-labelledby="page-title" className="bg-paper p-2 sm:p-3">
      <motion.div
        className="on-dark relative isolate flex min-h-[520px] items-end overflow-hidden rounded-[26px] bg-ink text-ivory sm:min-h-[580px] lg:h-[74svh] lg:max-h-[760px] lg:rounded-[36px]"
        initial={{ clipPath: 'inset(5% 5% 5% 5% round 40px)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0% round 0px)' }}
        transition={{ duration: 1.4, ease: EASE }}
      >
        <motion.img
          src={image.src}
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          style={{ objectPosition: imagePosition }}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: EASE }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/45 to-ink/25" aria-hidden />
        <svg className="absolute -top-10 -right-20 -z-10 w-[70%] max-w-[900px] opacity-90" viewBox="0 0 600 400" fill="none" aria-hidden>
          <motion.path
            d="M40 -10C90 120 200 190 330 170C470 150 520 260 620 330"
            stroke="var(--color-lime)"
            strokeWidth="9"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: EASE, delay: 0.6 }}
          />
        </svg>

        <div className="container-x pt-32 pb-10 sm:pb-14 lg:pb-16">
          <motion.nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-[12px] font-semibold tracking-[0.1em] text-ivory/75 uppercase"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
          >
            <Link to="/" className="hover:text-lime">
              Home
            </Link>
            <ChevronRight className="size-3.5" aria-hidden />
            <span aria-current="page" className="text-lime">
              {eyebrow}
            </span>
          </motion.nav>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SplitLines
              as="h1"
              trigger="mount"
              delay={0.5}
              lines={title}
              className="display max-w-4xl text-[clamp(2.6rem,6.4vw,6rem)] leading-[1] font-semibold tracking-[-0.045em]"
            />
            <motion.div
              className="max-w-md"
              initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.9 }}
            >
              <p className="text-base leading-relaxed text-ivory/85 sm:text-lg">{intro}</p>
              {children}
            </motion.div>
          </div>
        </div>
        <span id="page-title" className="sr-only">
          {eyebrow}
        </span>
      </motion.div>
    </section>
  )
}
