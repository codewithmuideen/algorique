import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { UserCheck, FlaskConical, ClipboardCheck, Sparkles, ArrowUpRight } from 'lucide-react'
import { formula } from '../../data/content'
import { site } from '../../data/site'
import { SplitLines } from '../animation/SplitLines'
import { Reveal } from '../animation/Reveal'
import { EASE, viewport } from '../../lib/motion'

const icons = { people: UserCheck, products: FlaskConical, process: ClipboardCheck }

const item = (i) => ({
  initial: { opacity: 0, y: 50, filter: 'blur(6px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport,
  transition: { duration: 1, ease: EASE, delay: i * 0.18 },
})

function Operator({ symbol, i }) {
  return (
    <motion.span
      className="grid size-12 shrink-0 place-items-center self-center rounded-full bg-lime text-2xl font-semibold text-ink lg:size-14"
      initial={{ scale: 0, rotate: -90 }}
      whileInView={{ scale: 1, rotate: 0 }}
      viewport={viewport}
      transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.25 + i * 0.18 }}
      aria-hidden
    >
      {symbol}
    </motion.span>
  )
}

// The Algorique formula: right people + right products + proven process.
export function Formula() {
  return (
    <section aria-labelledby="formula-title" className="on-dark relative overflow-hidden bg-ink py-24 text-ivory sm:py-32">
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden />
      <div className="pointer-events-none absolute -top-40 -right-40 size-[520px] rounded-full bg-forest/40 blur-3xl" aria-hidden />

      <div className="container-x relative">
        <div className="mb-14 grid gap-6 lg:mb-20 lg:grid-cols-2 lg:items-end">
          <div>
            <Reveal>
              <p className="eyebrow mb-5 text-lime">The Algorique formula</p>
            </Reveal>
            <SplitLines
              as="h2"
              lines={['The formula for a', <em className="text-lime">cleaner, brighter space.</em>]}
              className="display text-[clamp(2rem,3.6vw,3.5rem)]"
            />
            <span id="formula-title" className="sr-only">
              The Algorique formula
            </span>
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-md leading-relaxed text-ivory/70 lg:justify-self-end">
              Great results are not luck. Every clean we deliver combines the same three ingredients, every time.
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col items-stretch gap-4 lg:flex-row lg:gap-3">
          {formula.map((f, i) => {
            const Icon = icons[f.icon]
            return (
              <Fragment key={f.label}>
                <motion.div
                  {...item(i)}
                  className="group flex-1 rounded-[28px] border border-ivory/12 bg-ink-2 p-7 transition-colors duration-500 hover:border-lime/50 lg:p-8"
                >
                  <span className="grid size-14 place-items-center rounded-2xl bg-ivory/8 text-lime transition-colors duration-500 group-hover:bg-lime group-hover:text-ink">
                    <Icon className="size-6" strokeWidth={1.8} aria-hidden />
                  </span>
                  <h3 className="mt-8 text-2xl font-semibold tracking-tight">{f.label}</h3>
                  <p className="mt-3 leading-relaxed text-ivory/70">{f.body}</p>
                </motion.div>
                <Operator symbol={i < formula.length - 1 ? '+' : '='} i={i} />
              </Fragment>
            )
          })}

          <motion.div
            {...item(formula.length)}
            className="flex flex-1 flex-col justify-between rounded-[28px] bg-lime p-7 text-ink lg:p-8"
          >
            <span className="grid size-14 place-items-center rounded-2xl bg-ink text-lime">
              <Sparkles className="size-6" strokeWidth={1.8} aria-hidden />
            </span>
            <div>
              <h3 className="mt-8 text-2xl font-semibold tracking-tight">{site.motto}</h3>
              <p className="mt-3 leading-relaxed text-ink/75">{site.slogan}</p>
              <Link to="/book" className="btn btn-ink group mt-6">
                Book a cleaning
                <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" aria-hidden />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
