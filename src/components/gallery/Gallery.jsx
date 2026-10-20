import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Expand } from 'lucide-react'
import { gallery } from '../../data/content'
import { SplitLines } from '../animation/SplitLines'
import { Reveal } from '../animation/Reveal'
import { MaskImage } from '../animation/MaskImage'
import { Lightbox } from './Lightbox'
import { cn } from '../../lib/motion'

// Bento layout on large screens; each entry is [column span, aspect ratio].
const layout = [
  ['lg:col-span-7', 'aspect-[4/3] lg:aspect-auto lg:h-[520px]'],
  ['lg:col-span-5', 'aspect-[4/3] lg:aspect-auto lg:h-[520px]'],
  ['lg:col-span-4', 'aspect-[4/3] lg:aspect-auto lg:h-[380px]'],
  ['lg:col-span-4', 'aspect-[4/3] lg:aspect-auto lg:h-[380px]'],
  ['lg:col-span-4', 'aspect-[4/3] lg:aspect-auto lg:h-[380px]'],
  ['lg:col-span-12', 'aspect-[4/3] sm:aspect-[21/9] lg:aspect-auto lg:h-[460px]'],
]

export function Gallery() {
  const [open, setOpen] = useState(null)
  const illustrative = gallery.some((g) => g.illustrative)

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="bg-paper py-24 sm:py-32">
      <div className="container-x">
        <div className="mb-12 grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <Reveal>
              <p className="eyebrow mb-5 text-forest">Finished spaces</p>
            </Reveal>
            <SplitLines
              lines={['The feeling of', <em className="text-forest">walking back in.</em>]}
              className="display text-[clamp(2rem,3.6vw,3.5rem)] text-ink"
            />
            <h2 id="gallery-title" className="sr-only">
              Gallery of finished spaces
            </h2>
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-md leading-relaxed text-stone lg:justify-self-end">
              The calm of a room where every surface has been looked after. Tap any photo to view it full screen.
              {illustrative && <span className="mt-3 block text-xs text-stone/70">Photography shown for illustration.</span>}
            </p>
          </Reveal>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:gap-4">
          {gallery.map((item, i) => {
            const [span, aspect] = layout[i % layout.length]
            return (
              <li key={item.image.src} className={cn(span, i === gallery.length - 1 && 'sm:col-span-2')}>
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  className="group relative block w-full overflow-hidden rounded-[24px] text-left"
                  aria-label={`View ${item.title} full screen`}
                >
                  <MaskImage
                    image={item.image}
                    from={i % 2 ? 'left' : 'up'}
                    delay={(i % 3) * 0.08}
                    parallax={0.06}
                    className={aspect}
                    imgClassName="transition-transform duration-[1200ms] ease-[var(--ease-expo)] group-hover:scale-105"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-ivory sm:p-6">
                    <span>
                      <span className="mb-2 inline-block rounded-full bg-lime px-2.5 py-1 text-[11px] font-bold text-ink">
                        {item.tag}
                      </span>
                      <span className="block font-display text-3xl leading-none">{item.title}</span>
                    </span>
                    <span className="grid size-11 shrink-0 translate-y-3 place-items-center rounded-full bg-ivory text-ink opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                      <Expand className="size-4" aria-hidden />
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <AnimatePresence>
        {open !== null && <Lightbox items={gallery} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  )
}
