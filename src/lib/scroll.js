const HEADER_OFFSET = 88

const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Smoothly scrolls a section under the fixed header. Because the header,
// announcement bar and lazy images can shift the layout mid-scroll, it checks
// the landing position afterwards and corrects it if needed.
export function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return false
  const behavior = prefersReduced() ? 'instant' : 'smooth'
  const go = (b) => {
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
    window.scrollTo({ top: Math.max(0, top), behavior: b })
  }
  go(behavior)
  ;[900, 1600].forEach((ms) =>
    setTimeout(() => {
      if (Math.abs(el.getBoundingClientRect().top - HEADER_OFFSET) > 24) go(behavior)
    }, ms),
  )
  return true
}
