import { Link } from 'react-router-dom'
import { ArrowUpRight, Check } from 'lucide-react'
import { services } from '../../data/content'
import { SplitLines } from '../animation/SplitLines'
import { Reveal } from '../animation/Reveal'
import { MaskImage } from '../animation/MaskImage'
import { cn } from '../../lib/motion'

// Full service catalogue for the Services page. Each card is a deep-link
// target (/services#deep etc.) used by the header dropdown.
export function ServiceList() {
  return (
    <section aria-labelledby="service-list-title" className="bg-paper py-24 sm:py-32">
      <div className="container-x">
        <div className="mb-14 grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <Reveal>
              <p className="eyebrow mb-5 text-forest">Services tailored to every space</p>
            </Reveal>
            <SplitLines
              as="h2"
              lines={['Thorough cleaning with', <em className="text-forest">one clear checklist.</em>]}
              className="display text-[clamp(2rem,3.6vw,3.5rem)] text-ink"
            />
            <span id="service-list-title" className="sr-only">
              All cleaning services
            </span>
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-md leading-relaxed text-stone lg:justify-self-end">
              Every service can be booked as a one-off or on a schedule. Choose one below, or tell us what you need and we will
              recommend the right clean.
            </p>
          </Reveal>
        </div>

        <div className="space-y-6">
          {services.map((s, i) => (
            <Reveal key={s.id}>
              <article
                id={s.id}
                className="scroll-mt-28 grid items-center gap-8 overflow-hidden rounded-[32px] bg-mist p-5 sm:p-8 lg:grid-cols-12 lg:gap-10 lg:p-12"
              >
                <div className={cn('lg:col-span-6', i % 2 && 'lg:order-2')}>
                  <p className="text-[12px] font-semibold tracking-[0.12em] text-forest uppercase">{s.short}</p>
                  <h3 className="mt-3 text-[clamp(1.7rem,2.6vw,2.4rem)] leading-tight font-semibold tracking-tight text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-lg leading-relaxed text-stone">{s.description}</p>
                  <p className="mt-7 text-sm font-semibold text-ink">What is included</p>
                  <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                    {s.includes.map((inc) => (
                      <li key={inc} className="flex items-start gap-2.5 text-[15px] text-ink">
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-lime">
                          <Check className="size-3 text-ink" strokeWidth={3} aria-hidden />
                        </span>
                        {inc}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link to={`/book?service=${s.id}`} className="btn btn-ink group">
                      Request this service
                      <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" aria-hidden />
                    </Link>
                    <Link to="/contact" className="btn btn-ghost-dark">
                      Ask a question
                    </Link>
                  </div>
                </div>

                <div className={cn('relative lg:col-span-6', i % 2 && 'lg:order-1')}>
                  <MaskImage
                    image={s.image}
                    from={i % 2 ? 'right' : 'left'}
                    className="aspect-[4/3] rounded-[24px] lg:aspect-[5/4]"
                    sizes="(min-width: 1024px) 45vw, 100vw"
                  />
                  <span
                    className="pointer-events-none absolute -top-3 right-4 bg-gradient-to-b from-white to-white/0 bg-clip-text text-[clamp(5rem,9vw,8.5rem)] leading-none font-semibold tracking-tighter text-transparent drop-shadow-[0_4px_18px_rgba(11,31,68,0.25)] sm:-top-6"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
