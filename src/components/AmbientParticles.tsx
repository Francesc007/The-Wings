import { useMemo } from 'react'
import type { CSSProperties } from 'react'

type Particle = {
  id: number
  left: number
  delay: number
  duration: number
  lineW: number
  lineH: number
  drift: number
  palette: 0 | 1 | 2
  sway: number
  swayPeriod: number
  twist: number
  /** Silueta irregular tipo astilla / braza (no círculo) */
  clipPath: string
}

const FIRE_GRADIENT = [
  'bg-gradient-to-t from-[#7f0a0a] via-[#ea580c] to-[#fde68a]',
  'bg-gradient-to-t from-[#991b1b] via-[#f97316] to-[#fef08a]',
  'bg-gradient-to-t from-[#b91c1c] via-[#fb923c] to-[#fff7ed]',
] as const

const FIRE_SHADOW = [
  'shadow-[0_0_5px_rgba(251,146,60,0.75),0_0_12px_rgba(234,88,12,0.4)]',
  'shadow-[0_0_6px_rgba(253,186,116,0.7),0_0_14px_rgba(249,115,22,0.35)]',
  'shadow-[0_0_4px_rgba(254,243,199,0.65),0_0_10px_rgba(251,146,60,0.35)]',
] as const

/** Formas angulares / alargadas; evita elipses perfectas */
const EMBER_SHAPES = [
  'polygon(42% 0%, 58% 0%, 100% 72%, 78% 100%, 22% 100%, 0% 68%)',
  'polygon(35% 4%, 90% 0%, 100% 55%, 65% 100%, 0% 85%, 8% 35%)',
  'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 42%)',
  'polygon(28% 0%, 100% 22%, 88% 100%, 0% 78%, 12% 40%)',
  'polygon(55% 0%, 100% 45%, 45% 100%, 0% 55%, 20% 18%)',
] as const

function makeParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    const t = i * 9973
    const r1 = ((t * 17) % 1000) / 1000
    const r2 = ((t * 31) % 1000) / 1000
    const r3 = ((t * 47) % 1000) / 1000
    const r4 = ((t * 61) % 1000) / 1000
    const r5 = ((t * 73) % 1000) / 1000
    const r6 = ((t * 89) % 1000) / 1000
    const duration = 12 + r3 * 18
    const lineW = 2 + r4 * 5.5
    /** Alto máximo 15 px */
    const lineH = 4 + r6 * 8.5
    return {
      id: i,
      left: r1 * 100,
      delay: r2 * 11,
      duration,
      lineW,
      lineH,
      drift: (r2 - 0.5) * 80,
      palette: (i % 3) as 0 | 1 | 2,
      sway: 10 + r4 * 20,
      swayPeriod: duration * (0.28 + r5 * 0.22),
      twist: 8 + r1 * 14,
      clipPath: EMBER_SHAPES[i % EMBER_SHAPES.length],
    }
  })
}

type Props = {
  embedded?: boolean
}

export function AmbientParticles({ embedded = false }: Props) {
  const count = embedded ? 22 : 36
  const particles = useMemo(() => makeParticles(count), [count])

  const wrapClass = embedded
    ? 'absolute inset-0 z-[2] overflow-hidden pointer-events-none ambient-particles-layer'
    : 'fixed inset-0 z-[18] overflow-hidden pointer-events-none ambient-particles-layer'

  return (
    <div className={wrapClass} aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute will-change-transform"
          style={
            {
              left: `${p.left}%`,
              bottom: '-14px',
              width: p.lineW,
              height: p.lineH,
              animation: `ember-rise ${p.duration}s linear ${p.delay}s infinite`,
              '--ember-drift': `${p.drift}px`,
            } as CSSProperties
          }
        >
          <span
            className={`block h-full w-full will-change-transform opacity-90 ${FIRE_GRADIENT[p.palette]} ${FIRE_SHADOW[p.palette]}`}
            style={
              {
                clipPath: p.clipPath,
                filter: 'blur(0.3px)',
                animation: `ember-wind ${p.swayPeriod}s linear ${p.delay}s infinite`,
                '--sway': `${p.sway}px`,
                '--ember-twist': `${p.twist}deg`,
              } as CSSProperties
            }
          />
        </span>
      ))}
    </div>
  )
}
