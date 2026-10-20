import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { MaskImage } from '../animation/MaskImage'
import { Reveal, RevealGroup, RevealItem } from '../animation/Reveal'
import { images } from '../../data/images'

const statement =
  'We clean homes and workplaces the way we would want our own looked after: carefully, consistently, and to a standard you can check.'

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return (
    <motion.span style={{ opacity }} className="inline-block pr-[0.25em]">
      {children}
    </motion.span>
  )
}

// The manifesto lights up word by word as it scrolls through the viewport.
function ScrollStatement() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = statement.split(' ')

  return (
    <p ref={ref} className="display max-w-[22ch] text-[clamp(1.6rem,3.3vw,3.1rem)] text-ink">
      {reduce
        ? statement
        : words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {w}
            </Word>
          ))}
    </p>
  )
}

function RotatingBadge() {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className="grid size-32 place-items-center rounded-full bg-lime text-ink sm:size-36"
      animate={reduce ? {} : { rotate: 360 }}
      transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      aria-hidden
    >
      <svg viewBox="0 0 100 100" className="size-full">
        <defs>
          <path id="badge-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
        </defs>
        <text className="fill-current text-[9.6px] font-bold tracking-[0.2em] uppercase">
          <textPath href="#badge-circle">Algorique · Careful cleaning · Algorique ·</textPath>
        </text>
        <image href="/brand/mark-forest.png" x="33" y="33" width="34" height="34" />
      </svg>
    </motion.div>
  )
}

const principles = [
  ['Written checklists', 'Room-by-room, agreed with you, followed every visit.'],
  ['Care for your surfaces', 'The right method for stone, timber, glass and fabric.'],
  ['Clear communication', 'Easy to reach by phone, email or WhatsApp.'],
]

export function About({ showLink = false }) {
  return (
    <section id="about" className="relative bg-paper py-24 sm:py-32 lg:py-40">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow mb-8 text-forest">About Algorique</p>
        </Reveal>
        <ScrollStatement />

        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          <MaskImage
            image={images.tablePolish}
            className="aspect-[4/5] rounded-[28px] lg:col-span-5"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />

          <div className="flex flex-col justify-between gap-10 lg:col-span-4 lg:pt-24">
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-stone">
                Algorique Cleaners looks after homes, rentals and workplaces. From a weekly tidy to a full move-out reset, the
                standard comes from a written checklist, the right products for each surface, and people who take pride in a
                finish you notice the moment you walk in.
              </p>
            </Reveal>
            <RevealGroup as="ul" className="divide-y divide-ink/10 border-y border-ink/10">
              {principles.map(([title, body], i) => (
                <RevealItem as="li" key={title} className="flex gap-5 py-5">
                  <span className="pt-1 text-xs font-bold text-forest">0{i + 1}</span>
                  <div>
                    <h3 className="font-bold text-ink">{title}</h3>
                    <p className="mt-1 text-sm text-stone">{body}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
            {showLink && (
              <Reveal>
                <Link to="/about" className="btn btn-ink group">
                  More about us
                  <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" aria-hidden />
                </Link>
              </Reveal>
            )}
          </div>

          <div className="relative lg:col-span-3 lg:pt-56">
            <MaskImage
              image={images.amberBottles}
              from="left"
              delay={0.15}
              className="aspect-[3/4] rounded-[28px]"
              sizes="(min-width: 1024px) 25vw, 100vw"
            />
            <div className="absolute -top-14 right-4 lg:top-24 lg:-left-14">
              <RotatingBadge />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
