import { motion } from 'framer-motion'
import { EASE, viewport, directions } from '../../lib/motion'

// Fades content in from a direction with a soft blur as it enters the viewport.
export function Reveal({ children, direction = 'up', delay = 0, duration = 1.1, className, as = 'div', once = true }) {
  const Tag = motion[as]
  const offset = directions[direction] ?? directions.up
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, filter: 'blur(6px)', ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
      viewport={{ ...viewport, once }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Tag>
  )
}

// Staggers its <RevealItem> children.
export function RevealGroup({ children, className, stagger = 0.12, delay = 0, as = 'div' }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </Tag>
  )
}

export function RevealItem({ children, className, direction = 'up', as = 'div', style }) {
  const Tag = motion[as]
  const offset = directions[direction] ?? directions.up
  return (
    <Tag
      className={className}
      style={style}
      variants={{
        hidden: { opacity: 0, filter: 'blur(6px)', ...offset },
        show: { opacity: 1, x: 0, y: 0, filter: 'blur(0px)', transition: { duration: 1, ease: EASE } },
      }}
    >
      {children}
    </Tag>
  )
}
