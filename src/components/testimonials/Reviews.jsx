import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Quote, Star, Check, Mail } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'
import { reviews } from '../../data/content'
import { images } from '../../data/images'
import { site } from '../../data/site'
import { hasWhatsapp, whatsappUrl } from '../../lib/whatsapp'
import { MaskImage } from '../animation/MaskImage'
import { Reveal } from '../animation/Reveal'
import { SplitLines } from '../animation/SplitLines'
import { CarouselButton } from '../services/ServicesScroller'
import { EASE, cn } from '../../lib/motion'

const variants = {
  enter: (dir) => ({ opacity: 0, x: dir * 60, filter: 'blur(8px)' }),
  center: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: EASE } },
  exit: (dir) => ({ opacity: 0, x: dir * -60, filter: 'blur(8px)', transition: { duration: 0.45, ease: EASE } }),
}

// Only genuine reviews (from real clients, used with permission) are shown.
const published = reviews.filter((r) => r.quote && !r.placeholder)

export function Reviews() {
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
            {published.length ? <ReviewCarousel /> : <ReviewInvite />}
          </div>
        </div>
      </div>
    </section>
  )
}

function ReviewCarousel() {
  const [[index, dir], setState] = useState([0, 1])
  const review = published[index]
  const go = (d) => setState([(index + d + published.length) % published.length, d])

  return (
    <>
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
            {review.rating && (
              <div className="mb-5 flex gap-1" aria-label={`${review.rating} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className={cn('size-5', i < review.rating ? 'fill-lime text-lime' : 'text-ink/20')} aria-hidden />
                ))}
              </div>
            )}
            <blockquote className="display text-[clamp(1.35rem,2.2vw,2rem)] leading-[1.15] text-ink">“{review.quote}”</blockquote>
            <figcaption className="mt-8">
              <span className="block font-bold text-ink">{review.name}</span>
              <span className="mt-1 block text-sm text-stone">
                {review.role}
                {review.source && ` · ${review.source}`}
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      {published.length > 1 && (
        <div className="flex items-center justify-between gap-4 border-t border-ink/10 pt-6">
          <div className="flex gap-2" role="tablist" aria-label="Choose a review">
            {published.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Review ${i + 1}`}
                onClick={() => setState([i, i > index ? 1 : -1])}
                className="grid h-11 place-items-center"
              >
                <span className={cn('block h-1.5 rounded-full transition-all duration-500', i === index ? 'w-10 bg-forest' : 'w-4 bg-ink/20')} />
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
      )}
    </>
  )
}

// Shown until real reviews are added: an honest invitation, never invented quotes.
function ReviewInvite() {
  const promises = ['Every review comes from a real client', 'Published in your own words, with your permission', 'Your feedback shapes every future visit']
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <Reveal>
          <p className="eyebrow text-forest">Client reviews</p>
        </Reveal>
        <Quote className="size-10 text-lime" fill="currentColor" aria-hidden />
      </div>

      <div>
        <SplitLines
          as="h2"
          lines={['Your review could be', <em className="text-forest">one of our first.</em>]}
          className="display text-[clamp(1.9rem,3.2vw,3rem)] text-ink"
        />
        <span id="reviews-title" className="sr-only">
          Client reviews
        </span>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-lg leading-relaxed text-stone">
            We are a growing local team, collecting honest feedback from our clients across London and the surrounding areas.
            Had a clean with us? Tell us how it went and we will share it here.
          </p>
          <ul className="mt-6 space-y-2.5">
            {promises.map((p) => (
              <li key={p} className="flex items-center gap-3 text-[15px] font-medium text-ink">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-lime">
                  <Check className="size-3.5 text-ink" strokeWidth={3} aria-hidden />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <Reveal delay={0.2} className="flex gap-2 border-t border-ink/10 pt-6 sm:gap-3">
        {hasWhatsapp && (
          <a
            href={whatsappUrl('Hello Algorique Cleaners, I would like to leave a review: ')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ink min-h-11 gap-1.5 px-4 text-[13px] sm:min-h-12 sm:gap-2 sm:px-6 sm:text-sm"
          >
            <FaWhatsapp className="size-4 text-lime sm:size-5" aria-hidden /> Leave a review
          </a>
        )}
        <a
          href={`mailto:${site.email}?subject=${encodeURIComponent('My review of Algorique Cleaners')}`}
          className="btn btn-ghost-dark min-h-11 gap-1.5 px-4 text-[13px] sm:min-h-12 sm:gap-2 sm:px-6 sm:text-sm"
        >
          <Mail className="size-4" aria-hidden /> Email us
        </a>
      </Reveal>
    </>
  )
}
