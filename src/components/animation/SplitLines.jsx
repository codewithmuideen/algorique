import { motion } from 'framer-motion'
import { EASE, viewport } from '../../lib/motion'

// Reveals a heading line by line: each line rises out of an overflow mask.
// `lines` is an array of strings or nodes. `trigger="mount"` animates
// immediately (hero); the default waits until the heading is in view.
export function SplitLines({
  lines,
  as = 'h2',
  className,
  lineClassName = '',
  delay = 0,
  stagger = 0.09,
  duration = 1.1,
  trigger = 'view',
}) {
  const Tag = motion[as]
  const animateProps =
    trigger === 'mount' ? { initial: 'hidden', animate: 'show' } : { initial: 'hidden', whileInView: 'show', viewport }

  return (
    <Tag
      className={className}
      {...animateProps}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {lines.map((line, i) => (
        <span key={i} className={`block overflow-hidden pb-[0.08em] -mb-[0.08em] ${lineClassName}`}>
          <motion.span
            className="block will-change-transform"
            variants={{
              hidden: { y: '108%', rotate: 2 },
              show: { y: '0%', rotate: 0, transition: { duration, ease: EASE } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
