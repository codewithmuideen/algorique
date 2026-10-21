import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { images } from '../../data/images'
import { SplitLines } from '../animation/SplitLines'
import { Reveal } from '../animation/Reveal'
import { ChatButton } from '../forms/ChatButton'
import { useBooking } from '../booking/BookingContext'

// The photograph's frame opens to full width as the section scrolls in.
export function FinalCta() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { openBooking } = useBooking()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] })
  const inset = useTransform(scrollYProgress, [0, 1], [8, 0])
  const radius = useTransform(scrollYProgress, [0, 1], [40, 0])
  const clipPath = useTransform([inset, radius], ([i, r]) => `inset(${i}% ${i}% 0% ${i}% round ${r}px)`)
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1])

  return (
    <section ref={ref} aria-labelledby="cta-title" className="on-dark relative bg-paper">
      <motion.div
        className="relative flex min-h-[90svh] items-end overflow-hidden bg-ink text-ivory"
        style={reduce ? undefined : { clipPath }}
      >
        <motion.img
          src={images.kitchenIsland.src}
          srcSet={images.kitchenIsland.srcSet}
          sizes="100vw"
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          style={reduce ? undefined : { scale }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/20" aria-hidden />

        <div className="container-x relative pt-40 pb-16 sm:pb-24">
          <Reveal>
            <p className="eyebrow mb-6 text-lime">Ready when you are</p>
          </Reveal>
          <SplitLines
            as="h2"
            lines={['Come home', <>to <em className="text-lime">spotless.</em></>]}
            className="display text-[clamp(2.6rem,7.5vw,7rem)]"
          />
          <span id="cta-title" className="sr-only">
            Request a cleaning
          </span>
          <Reveal delay={0.2} className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-lg text-ivory/80">
              Send a booking request in a couple of minutes. We will confirm the details with you personally.
            </p>
            <div className="flex gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => openBooking()}
                className="btn btn-lime group min-h-11 gap-1.5 px-4 text-[13px] sm:min-h-14 sm:gap-2 sm:px-8 sm:text-base"
              >
                Get a free quote
                <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:rotate-45 sm:size-5" aria-hidden />
              </button>
              <ChatButton
                className="btn btn-ghost-light min-h-11 gap-1.5 px-4 text-[13px] sm:min-h-14 sm:gap-2 sm:px-7 sm:text-base"
                iconClassName="size-4 sm:size-5"
              />
            </div>
          </Reveal>
        </div>
      </motion.div>
    </section>
  )
}
