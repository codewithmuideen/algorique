import { useId } from 'react'

// Four-point sparkle with gently concave sides.
const sparkle = (cx, cy, r) => {
  const k = r * 0.16
  return `M${cx} ${cy - r}Q${cx + k} ${cy - k} ${cx + r} ${cy}Q${cx + k} ${cy + k} ${cx} ${cy + r}Q${cx - k} ${cy + k} ${cx - r} ${cy}Q${cx - k} ${cy - k} ${cx} ${cy - r}Z`
}

// Vector redraw of the Algorique house-and-leaf mark: crisp at any size.
// tone="color" for light backgrounds, tone="light" for dark ones.
export function BrandMark({ tone = 'color', className, title }) {
  const id = useId().replace(/:/g, '')
  const blue = tone === 'light' ? '#ffffff' : `url(#${id}b)`
  const green = `url(#${id}g)`
  const vein = tone === 'light' ? 'var(--color-ink)' : '#ffffff'

  return (
    <svg viewBox="0 0 920 800" className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      <defs>
        <linearGradient id={`${id}b`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1559C9" />
          <stop offset="1" stopColor="#0A3A91" />
        </linearGradient>
        <linearGradient id={`${id}g`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#3F9B22" />
          <stop offset="1" stopColor="#74C043" />
        </linearGradient>
      </defs>

      {/* Roof, left wall and floor line */}
      <path
        d="M22 455L428 48L742 362M92 425V735Q92 768 125 768H262"
        fill="none"
        stroke={blue}
        strokeWidth="66"
        strokeLinejoin="round"
        strokeLinecap="butt"
      />
      {/* Chimney with a brush flare */}
      <path d="M770 230H836Q852 230 852 246V455L906 540Q918 562 900 580Q884 592 868 578L852 562V708Q852 724 836 724H770Q754 724 754 708V246Q754 230 770 230Z" fill={blue} />

      {/* Sparkles */}
      <path d={sparkle(190, 125, 66)} fill={blue} />
      <path d={sparkle(693, 106, 40)} fill={blue} />
      <path d={sparkle(428, 300, 46)} fill={blue} />
      <path d={sparkle(333, 372, 68)} fill={blue} />

      {/* Leaf with its vein */}
      <path d="M262 722C285 540 455 412 692 404C724 590 628 770 410 792C350 798 300 778 262 722Z" fill={green} />
      <path d="M328 778L602 548" stroke={vein} strokeWidth="20" strokeLinecap="round" />
    </svg>
  )
}

// Full lockup: mark + two-line wordmark set in Nunito Black.
export function BrandLockup({ tone = 'color', className = '', markClassName = 'h-full w-auto' }) {
  const light = tone === 'light'
  return (
    <span className={`inline-flex items-center gap-[0.32em] leading-none select-none ${className}`}>
      <BrandMark tone={tone} className={markClassName} />
      <span className="flex flex-col font-black tracking-[-0.015em]">
        <span className={light ? 'text-white' : 'text-[#0B3D9C]'}>Algorique</span>
        <span className={light ? 'text-[#7ACB4C]' : 'text-[#3E9B22]'}>Cleaners</span>
      </span>
    </span>
  )
}
