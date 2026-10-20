import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import { reviews } from '../../data/content'
import { images } from '../../data/images'
import { MaskImage } from '../animation/MaskImage'
import { Reveal } from '../animation/Reveal'
import { CarouselButton } from '../services/ServicesScroller'
import { EASE, cn } from '../../lib/motion'

const variants = {
  enter: (dir) => ({ opacity: 0, x: dir * 60, filter: 'blur(8px)' }),
  center: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: EASE } },
  exit: (dir) => ({ opacity: 0, x: dir * -60, filter: 'blur(8px)', transition: { duration: 0.45, ease: EASE } }),
}

export function Reviews() {
  const [[index, dir], setState] = useState([0, 1])
  const review = reviews[index]
  const go = (d) => setState([(index + d + reviews.length) % reviews.length, d])

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="bg-mist py-24 sm:py-32">
      <div className="container-x">
        <div className="grid items-stretch gap-4 overflow-hidden rounded-[32px] bg-paper p-3 lg:grid-cols-12">
          <MaskImage
            image={images.livingTeamGreen}
            className="aspect-[4/3] rounded-[24px] sm:aspect-[16/10] lg:col-span-5 lg:aspect-auto lg:min-h-[560px]"
            imgClassName="object-[50%_30%]"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />

          <div className="flex flex-col justify-between gap-10 p-5 sm:p-8 lg:col-span-7 lg:p-14">
            <div className="flex items-center justify-between gap-4">
              <Reveal>
                <h2 id="reviews-title" className="eyebrow text-forest">
                  Client reviews
                </h2>
              </Reveal>
              <Quote className="size-10 text-lime" fill="currentColor" aria-hidden />
            </div>

            <div className="relative min-h-[16rem] sm:min-h-[14rem]" aria-live="polite">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.figure key={index} custom={dir} variants={variants} initial="enter" animate="center" exit="exit">
                  {review.placeholder && (
                    <span className="mb-5 inline-block rounded-full border border-dashed border-forest/60 px-3 py-1 text-[11px] font-bold tracking-wider text-forest uppercase">
                      Placeholder, replace before launch
                    </span>
                  )}
                  <blockquote className="display text-[clamp(1.35rem,2.2vw,2rem)] leading-[1.08] text-ink">
                    “{review.quote}”
                  </blockquote>
                  <figcaption className="mt-8">
                    <span className="block font-bold text-ink">{review.name}</span>
                    <span className="mt-1 block text-sm text-stone">{review.role}</span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-ink/10 pt-6">
              <div className="flex gap-2" role="tablist" aria-label="Choose a review">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Review ${i + 1}`}
                    onClick={() => setState([i, i > index ? 1 : -1])}
                    className="grid h-11 place-items-center"
                  >
                    <span
                      className={cn(
                        'block h-1.5 rounded-full transition-all duration-500',
                        i === index ? 'w-10 bg-forest' : 'w-4 bg-ink/20',
                      )}
                    />
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <CarouselButton light label="Previous review" onClick={() => go(-1)}>
                  <ArrowLeft className="size-5" aria-hidden />
                </CarouselButton>
                <CarouselButton light label="Next review" onClick={() => go(1)}>
                  <ArrowRight className="size-5" aria-hidden />
                </CarouselButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
