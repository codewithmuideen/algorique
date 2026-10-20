import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowLeft, ArrowRight, MoveHorizontal } from 'lucide-react'
import { useLockBody } from '../../hooks'
import { EASE } from '../../lib/motion'

const slide = {
  enter: (dir) => ({ x: dir > 0 ? '18%' : '-18%', opacity: 0, scale: 0.96 }),
  center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.8, ease: EASE } },
  exit: (dir) => ({ x: dir > 0 ? '-18%' : '18%', opacity: 0, transition: { duration: 0.5, ease: EASE } }),
}

// Accessible full-screen viewer: arrow keys, Escape, swipe, focus trap.
export function Lightbox({ items, index, onIndex, onClose }) {
  const [dir, setDir] = useState(1)
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const item = items[index]
  useLockBody(true)

  const go = (d) => {
    setDir(d)
    onIndex((index + d + items.length) % items.length)
  }

  useEffect(() => {
    const opener = document.activeElement
    closeRef.current?.focus()
    return () => opener?.focus?.()
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'Tab') {
        const f = dialogRef.current.querySelectorAll('button, [tabindex="0"]')
        if (e.shiftKey && document.activeElement === f[0]) {
          e.preventDefault()
          f[f.length - 1].focus()
        } else if (!e.shiftKey && document.activeElement === f[f.length - 1]) {
          e.preventDefault()
          f[0].focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  })

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title}, image ${index + 1} of ${items.length}`}
      className="on-dark fixed inset-0 z-[70] flex flex-col bg-ink/95 text-ivory backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.35 } }}
    >
      <div className="container-x flex h-20 shrink-0 items-center justify-between">
        <p className="text-sm font-semibold tabular-nums">
          {String(index + 1).padStart(2, '0')} <span className="text-ivory/40">/ {String(items.length).padStart(2, '0')}</span>
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="grid size-12 place-items-center rounded-full bg-ivory/10 transition hover:bg-lime hover:text-ink"
          aria-label="Close viewer"
        >
          <X className="size-5" aria-hidden />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-4 sm:px-20">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={index}
            custom={dir}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            drag={item.before ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80 || info.velocity.x < -500) go(1)
              else if (info.offset.x > 80 || info.velocity.x > 500) go(-1)
            }}
            className="flex max-h-full w-full max-w-6xl cursor-grab items-center justify-center active:cursor-grabbing"
          >
            {item.before ? (
              <CompareSlider before={item.before} after={item.image} />
            ) : (
              <img
                src={item.image.src}
                alt={item.image.alt}
                draggable="false"
                className="max-h-[calc(100svh-12rem)] w-auto max-w-full rounded-[20px] object-contain select-none"
              />
            )}
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={() => go(-1)}
          className="absolute left-4 hidden size-12 place-items-center rounded-full bg-ivory/10 transition hover:bg-lime hover:text-ink sm:grid"
          aria-label="Previous image"
        >
          <ArrowLeft className="size-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="absolute right-4 hidden size-12 place-items-center rounded-full bg-ivory/10 transition hover:bg-lime hover:text-ink sm:grid"
          aria-label="Next image"
        >
          <ArrowRight className="size-5" aria-hidden />
        </button>
      </div>

      <div className="container-x flex shrink-0 items-center justify-between gap-4 py-6">
        <div>
          <p className="font-display text-3xl leading-none">{item.title}</p>
          <p className="mt-1 text-sm text-ivory/60">{item.tag}</p>
        </div>
        <div className="flex gap-2 sm:hidden">
          <button type="button" onClick={() => go(-1)} className="grid size-12 place-items-center rounded-full bg-ivory/10" aria-label="Previous image">
            <ArrowLeft className="size-5" aria-hidden />
          </button>
          <button type="button" onClick={() => go(1)} className="grid size-12 place-items-center rounded-full bg-ivory/10" aria-label="Next image">
            <ArrowRight className="size-5" aria-hidden />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// Before/after comparison, used when a gallery item has a `before` image.
function CompareSlider({ before, after }) {
  const [pos, setPos] = useState(50)
  const ref = useRef(null)

  const fromPointer = (e) => {
    const r = ref.current.getBoundingClientRect()
    setPos(Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100)))
  }

  return (
    <div
      ref={ref}
      className="relative aspect-[4/3] w-full max-w-5xl touch-none overflow-hidden rounded-[20px] select-none"
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId)
        fromPointer(e)
      }}
      onPointerMove={(e) => e.buttons === 1 && fromPointer(e)}
    >
      <img src={after.src} alt={`After: ${after.alt}`} className="absolute inset-0 h-full w-full object-cover" draggable="false" />
      <img
        src={before.src}
        alt={`Before: ${before.alt}`}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        draggable="false"
      />
      <span className="absolute top-4 left-4 rounded-full bg-ink/70 px-3 py-1 text-xs font-bold">Before</span>
      <span className="absolute top-4 right-4 rounded-full bg-lime px-3 py-1 text-xs font-bold text-ink">After</span>
      <div className="absolute inset-y-0 w-0.5 bg-ivory" style={{ left: `${pos}%` }}>
        <span
          role="slider"
          tabIndex={0}
          aria-label="Before and after comparison"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 5))
            if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 5))
            e.stopPropagation()
          }}
          className="absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ivory text-ink shadow-lg"
        >
          <MoveHorizontal className="size-5" aria-hidden />
        </span>
      </div>
    </div>
  )
}
