import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { process } from '../../data/content'
import { SplitLines } from '../animation/SplitLines'
import { Reveal, RevealGroup, RevealItem } from '../animation/Reveal'

function StepDot({ progress, at, n }) {
  const fill = useTransform(progress, [at - 0.05, at], ['var(--color-ink-3)', 'var(--color-lime)'])
  const color = useTransform(progress, [at - 0.05, at], ['var(--color-ivory)', 'var(--color-ink)'])
  return (
    <motion.span
      style={{ backgroundColor: fill, color }}
      className="relative z-10 grid size-14 place-items-center rounded-full font-display text-2xl ring-8 ring-ink"
    >
      {n}
    </motion.span>
  )
}

export function Process() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.6'] })

  return (
    <section id="process" aria-labelledby="process-title" className="on-dark relative overflow-hidden bg-ink py-24 text-ivory sm:py-32">
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden />
      <div className="container-x relative">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <Reveal>
              <p className="eyebrow mb-5 text-lime">How it works</p>
            </Reveal>
            <SplitLines
              lines={['From request', <>to <em className="text-lime">spotless</em>,</>, 'in four steps.']}
              className="display text-[clamp(2rem,3.6vw,3.5rem)]"
            />
            <h2 id="process-title" className="sr-only">
              How booking works
            </h2>
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-md leading-relaxed text-ivory/70 lg:justify-self-end">
              Booking online sends us a request. Nothing is fixed until we have checked availability and confirmed the details
              with you personally.
            </p>
          </Reveal>
        </div>

        <div ref={ref} className="relative mt-16 lg:mt-24">
          {/* Connecting line that draws as you scroll */}
          <div className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-px bg-ivory/15 lg:block" aria-hidden>
            <motion.div className="h-full origin-left bg-lime" style={{ scaleX: scrollYProgress }} />
          </div>
          <div className="absolute top-0 bottom-0 left-7 w-px bg-ivory/15 lg:hidden" aria-hidden>
            <motion.div className="h-full w-full origin-top bg-lime" style={{ scaleY: scrollYProgress }} />
          </div>

          <RevealGroup as="ol" className="grid gap-12 lg:grid-cols-4 lg:gap-8">
            {process.map((step, i) => (
              <RevealItem as="li" key={step.title} className="flex gap-6 lg:flex-col lg:items-center lg:text-center">
                <StepDot progress={scrollYProgress} at={(i + 0.5) / process.length} n={i + 1} />
                <div className="pt-2 lg:pt-4">
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 max-w-[30ch] text-[15px] leading-relaxed text-ivory/65 lg:mx-auto">{step.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  )
}
