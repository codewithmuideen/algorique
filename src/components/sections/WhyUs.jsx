import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CalendarCheck, ClipboardCheck, ShieldCheck, Sparkles, Leaf, PoundSterling, Building2, Check, ArrowUpRight } from 'lucide-react'
import { reasons } from '../../data/content'
import { images } from '../../data/images'
import { SplitLines } from '../animation/SplitLines'
import { Reveal, RevealGroup, RevealItem } from '../animation/Reveal'
import { MaskImage } from '../animation/MaskImage'

const icons = { shield: ShieldCheck, sparkles: Sparkles, leaf: Leaf, calendar: CalendarCheck, pound: PoundSterling, building: Building2 }

export function WhyUs({ showLink = true }) {
  return (
    <section id="why-us" aria-labelledby="why-title" className="bg-paper py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow mb-5 text-forest">Why choose us</p>
          </Reveal>
          <SplitLines
            as="h2"
            lines={['Building the most', 'dependable cleaning', <em className="text-forest">team you know.</em>]}
            className="display text-[clamp(2rem,3.4vw,3.2rem)] text-ink"
          />
          <span id="why-title" className="sr-only">
            Why choose Algorique Cleaners
          </span>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md leading-relaxed text-stone">
              What you can expect from every booking, whether it is a one-off deep clean or a weekly visit to your home or office.
            </p>
            {showLink && (
              <Link to="/about" className="btn btn-ink group mt-8">
                More about us
                <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" aria-hidden />
              </Link>
            )}
          </Reveal>

          <div className="relative mt-10">
            <MaskImage image={images.teamLivingRoom} className="aspect-[4/3] rounded-[28px]" sizes="(min-width: 1024px) 40vw, 100vw" />
            <motion.div
              className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-[0_18px_40px_-18px_rgba(11,31,68,0.45)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.5 }}
            >
              <span className="grid size-11 place-items-center rounded-xl bg-lime">
                <ClipboardCheck className="size-5 text-ink" aria-hidden />
              </span>
              <span className="text-[13px] leading-tight font-semibold text-ink">
                Every visit,
                <br />
                <span className="text-stone">the same checklist</span>
              </span>
            </motion.div>
          </div>
        </div>

        <RevealGroup className="grid content-center gap-4 sm:grid-cols-2 lg:col-span-7 lg:gap-5" stagger={0.1}>
          {reasons.map((r, i) => {
            const Icon = icons[r.icon] ?? Check
            return (
              <RevealItem
                key={r.title}
                className="group relative flex flex-col overflow-hidden rounded-[24px] border border-ink/10 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-forest/40 hover:shadow-[0_24px_50px_-28px_rgba(11,31,68,0.45)] sm:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-14 place-items-center rounded-2xl bg-lime transition-transform duration-500 group-hover:rotate-[-6deg]">
                    <Icon className="size-6 text-ink" strokeWidth={1.8} aria-hidden />
                  </span>
                  <span className="text-sm font-semibold text-ink/25">0{i + 1}</span>
                </div>
                <h3 className="mt-5 text-lg leading-snug font-semibold tracking-tight text-ink">{r.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-stone">{r.body}</p>
                <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-lime transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-x-100" aria-hidden />
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}
