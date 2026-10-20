// One motion language for the whole site: a long expo-out settle.
export const EASE = [0.16, 1, 0.3, 1]
export const EASE_IN_OUT = [0.65, 0, 0.35, 1]

export const viewport = { once: true, margin: '0px 0px -12% 0px' }

export const directions = {
  up: { y: 56 },
  down: { y: -56 },
  left: { x: -120 },
  right: { x: 120 },
  none: {},
}

export const cn = (...classes) => classes.filter(Boolean).join(' ')
