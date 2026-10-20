import { Link } from 'react-router-dom'
import { cn } from '../../lib/motion'

const variants = {
  color: '/brand/logo-color.png', // ink + forest, for light backgrounds
  dark: '/brand/logo-dark-bg.png', // ivory + lime, for dark backgrounds
  white: '/brand/logo-white.png', // single-colour ivory
}

export function Logo({ variant = 'color', className, linked = true, onClick }) {
  const img = (
    <img
      src={variants[variant]}
      alt="Algorique Cleaners"
      width="1200"
      height="263"
      className={cn('w-auto max-w-none select-none', className)}
      draggable="false"
    />
  )
  if (!linked) return img
  return (
    <Link to="/" onClick={onClick} className="inline-flex shrink-0" aria-label="Algorique Cleaners, home">
      {img}
    </Link>
  )
}
