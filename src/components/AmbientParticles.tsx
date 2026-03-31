import { useMemo } from 'react'
import type { CSSProperties } from 'react'

type Particle = {
  id: number
  left: number
  delay: number
  duration: number
  size: number
  drift: number
  palette: 0 | 1 | 2
  /** Amplitud del vaivén horizontal (viento) */
  sway: number
  /** Segundos por ciclo de onda (distinto por partícula) */
  swayPeriod: number
  /** Grados de rotación máxima en la onda */
  twist: number
}

const FIRE_GRADIENT = [
  'bg-gradient-to-t from-[#7f0a0a] via-[#ea580c] to-[#fde68a]',
  'bg-gradient-to-t from-[#991b1b] via-[#f97316] to-[#fef08a]',
  'bg-gradient-to-t from-[#b91c1c] via-[#fb923c] to-[#fff7ed]',
] as const

const FIRE_SHADOW = [
  'shadow-[0_0_10px_rgba(251,146,60,0.95),0_0_22px_rgba(234,88,12,0.65),0_0_36px_rgba(185,28,28,0.35)]',
  'shadow-[0_0_12px_rgba(253,186,116,0.9),0_0_24px_rgba(249,115,22,0.55),0_0_40px_rgba(220,38,38,0.3)]',
  'shadow-[0_0_8px_rgba(254,243,199,0.85),0_0_20px_rgba(251,146,60,0.6),0_0_32px_rgba(234,88,12,0.4)]',
] as const

function makeParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    const t = i * 9973
    const r1 = ((t * 17) % 1000) / 1000
    const r2 = ((t * 31) % 1000) / 1000
    const r3 = ((t * 47) % 1000) / 1000
    const r4 = ((t * 61) % 1000) / 1000
    const r5 = ((t * 73) % 1000) / 1000
    /** Subida más lenta (≈12–30 s por ciclo) */
    const duration = 12 + r3 * 18
    return {
      id: i,
      left: r1 * 100,
      delay: r2 * 11,
      duration,
      size: 4 + r4 * 6.5,
      drift: (r2 - 0.5) * 80,
      palette: (i % 3) as 0 | 1 | 2,
      sway: 10 + r4 * 20,
      /** Ondas de viento más lentas que el ascenso */
      swayPeriod: duration * (0.28 + r5 * 0.22),
      twist: 8 + r1 * 14,
    }
  })
}

type Props = {
  /** Dentro de una sección con position relative + overflow-hidden */
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
              bottom: '-10px',
              width: p.size,
              height: p.size,
              animation: `ember-rise ${p.duration}s linear ${p.delay}s infinite`,
              '--ember-drift': `${p.drift}px`,
            } as CSSProperties
          }
        >
          <span
            className={`block h-full w-full rounded-full will-change-transform opacity-90 ${FIRE_GRADIENT[p.palette]} ${FIRE_SHADOW[p.palette]}`}
            style={
              {
                filter: 'blur(0.35px)',
                animation: `ember-wind ${p.swayPeriod}s ease-in-out ${p.delay}s infinite`,
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
