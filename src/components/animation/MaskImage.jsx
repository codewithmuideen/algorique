import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { EASE, viewport, cn } from '../../lib/motion'

const masks = {
  up: 'inset(100% 0% 0% 0%)',
  down: 'inset(0% 0% 100% 0%)',
  left: 'inset(0% 0% 0% 100%)',
  right: 'inset(0% 100% 0% 0%)',
}

// A photograph revealed through an animated clip-path mask, settling from a
// slight zoom, with optional scroll parallax inside its frame.
export function MaskImage({
  image,
  className,
  imgClassName,
  from = 'up',
  delay = 0,
  parallax = 0.08,
  priority = false,
  sizes = '100vw',
  children,
}) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`${-parallax * 100}%`, `${parallax * 100}%`])
  const usesParallax = parallax > 0 && !reduce

  return (
    <motion.div
      ref={ref}
      className={cn('relative overflow-hidden', className)}
      initial={{ clipPath: masks[from] }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={viewport}
      transition={{ duration: 1.3, delay, ease: EASE }}
    >
      <motion.div
        className="absolute inset-x-0"
        style={{
          top: usesParallax ? `${-parallax * 100}%` : 0,
          bottom: usesParallax ? `${-parallax * 100}%` : 0,
          y: usesParallax ? y : 0,
        }}
      >
        <motion.img
          src={image.src}
          srcSet={image.srcSet}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className={cn('h-full w-full object-cover', imgClassName)}
          initial={{ scale: 1.22 }}
          whileInView={{ scale: 1 }}
          viewport={viewport}
          transition={{ duration: 1.8, delay, ease: EASE }}
        />
      </motion.div>
      {children}
    </motion.div>
  )
}
