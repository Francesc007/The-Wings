import { useEffect, useState } from 'react'

type Props = {
  sources: readonly string[]
  alt: string
  className?: string
  /** Si todas las URLs fallan */
  emptyClassName?: string
  loading?: 'eager' | 'lazy'
  fetchPriority?: 'high' | 'low' | 'auto'
}

/**
 * Prueba `sources` en orden; con `onError` pasa a la siguiente.
 * Útil para /public/ con distintas extensiones y fallbacks remotos.
 */
export function ImageWithFallback({
  sources,
  alt,
  className = '',
  emptyClassName,
  loading = 'lazy',
  fetchPriority,
}: Props) {
  const [idx, setIdx] = useState(0)

  const sourcesKey = sources.join('|')

  useEffect(() => {
    setIdx(0)
  }, [sourcesKey])

  if (idx >= sources.length) {
    return (
      <div
        className={emptyClassName ?? `${className} bg-gradient-to-br from-[#861a1e] to-[#3e0e14]`}
        aria-hidden
      />
    )
  }

  const src = sources[idx]

  return (
    <img
      key={src}
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      referrerPolicy="no-referrer"
      onError={() => setIdx((i) => i + 1)}
    />
  )
}
