import { useRef } from 'react'
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
} from 'framer-motion'
import { images } from '../../data/images'

const wrap = (min, max, v) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

const words = ['Residential', 'End of tenancy', 'Commercial', 'Airbnb & short-let', 'Deep cleaning', 'After builders']
const thumbs = [images.lemonSpray, images.vacuumCarpet, images.gloveSpray]

// A band of services that drifts on its own and speeds up (or reverses)
// with the reader's scroll velocity.
export function Marquee({ speed = 2.2 }) {
  const reduce = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const factor = useTransform(velocity, [0, 1000], [0, 4], { clamp: false })
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)
  const dir = useRef(-1)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    const f = factor.get()
    if (f < 0) dir.current = 1
    else if (f > 0) dir.current = -1
    let move = dir.current * speed * (delta / 1000)
    move += dir.current * Math.abs(move * f)
    baseX.set(baseX.get() + move)
  })

  const row = (copy) => (
    <div className="flex shrink-0 items-center" aria-hidden={copy > 0 || undefined}>
      {words.map((w, i) => (
        <span key={`${copy}-${w}`} className="flex items-center">
          <span className="px-6 font-display text-[clamp(1.8rem,4vw,3.6rem)] whitespace-nowrap text-ink sm:px-10">
            {i % 2 ? <em className="text-forest">{w}</em> : w}
          </span>
          {i % 2 === 1 ? (
            <img
              src={thumbs[(i >> 1) % thumbs.length].thumb}
              alt=""
              loading="lazy"
              className="h-14 w-24 rounded-full object-cover sm:h-20 sm:w-36"
            />
          ) : (
            <span className="h-3 w-3 rounded-full bg-lime ring-4 ring-lime/30" />
          )}
        </span>
      ))}
    </div>
  )

  return (
    <section aria-label="Services at a glance" className="overflow-hidden border-y border-ink/10 bg-paper py-8 sm:py-10">
      <motion.div className="flex w-max" style={{ x }}>
        {row(0)}
        {row(1)}
      </motion.div>
    </section>
  )
}
