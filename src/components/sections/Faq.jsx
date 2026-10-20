import { useId, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { faqs } from '../../data/content'
import { images } from '../../data/images'
import { SplitLines } from '../animation/SplitLines'
import { Reveal, RevealGroup, RevealItem } from '../animation/Reveal'
import { MaskImage } from '../animation/MaskImage'
import { EASE, cn } from '../../lib/motion'

function Item({ q, a, open, onToggle }) {
  const id = useId()
  return (
    <RevealItem as="li" className="border-b border-ink/10">
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left"
        >
          <span className={cn('text-lg font-semibold transition-colors duration-300 sm:text-xl', open ? 'text-forest' : 'text-ink')}>
            {q}
          </span>
          <span
            className={cn(
              'grid size-10 shrink-0 place-items-center rounded-full border transition-all duration-500',
              open ? 'rotate-45 border-forest bg-forest text-ivory' : 'border-ink/15 text-ink group-hover:border-ink',
            )}
          >
            <Plus className="size-4" aria-hidden />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-a`}
            role="region"
            aria-labelledby={`${id}-q`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1, transition: { duration: 0.6, ease: EASE } }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.4, ease: EASE } }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-7 leading-relaxed text-stone">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </RevealItem>
  )
}

export function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-paper py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="eyebrow mb-5 text-forest">Questions</p>
            </Reveal>
            <SplitLines
              lines={['Everything to know', <em className="text-forest">before booking.</em>]}
              className="display text-[clamp(2rem,3.4vw,3.2rem)] text-ink"
            />
            <h2 id="faq-title" className="sr-only">
              Frequently asked questions
            </h2>
            <MaskImage
              image={images.teamChecklist}
              className="mt-10 hidden aspect-[4/3] rounded-[28px] lg:block"
              sizes="40vw"
            />
          </div>
        </div>
        <RevealGroup as="ul" className="border-t border-ink/10 lg:col-span-7" stagger={0.06}>
          {faqs.map((f, i) => (
            <Item key={f.q} {...f} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
