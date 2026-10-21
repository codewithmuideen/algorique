import { Link } from 'react-router-dom'
import { BrandLockup } from './BrandMark'
import { cn } from '../../lib/motion'

// Vector logo. Size it with a font size (e.g. text-[20px]); the mark scales with it.
// variant "color" for light backgrounds, "light" for dark ones.
export function Logo({ variant = 'color', className, linked = true, onClick }) {
  const lockup = (
    <BrandLockup
      tone={variant === 'color' ? 'color' : 'light'}
      className={cn('text-[20px]', className)}
      markClassName="h-[2.3em] w-auto shrink-0"
    />
  )
  if (!linked) return lockup
  return (
    <Link to="/" onClick={onClick} className="inline-flex shrink-0" aria-label="Algorique Cleaners, home">
      {lockup}
    </Link>
  )
}
