/** Extensiones a probar (orden: las más habituales primero) */
const EXTENSIONS = ['.jpg', '.png', '.webp', '.jpeg'] as const

function getPublicRoot(): string {
  const base = import.meta.env.BASE_URL
  return base.endsWith('/') ? base : `${base}/`
}

/**
 * Rutas a archivos en `public/` respetando `base` de Vite (subcarpetas en deploy).
 * Ej.: "Boneless Diabla" → `{base}Boneless%20Diabla.jpg`
 */
export function fileVariantsPublic(displayName: string): string[] {
  const file = encodeURIComponent(displayName.trim())
  const root = getPublicRoot()
  return EXTENSIONS.map((ext) => `${root}${file}${ext}`)
}

/**
 * Nombre de archivo sin espacios: `boneless-diabla`, `BonelessDiabla`, `boneless_bbq`
 */
export function fileVariantsSlug(slug: string): string[] {
  const root = getPublicRoot()
  const s = slug.trim()
  return EXTENSIONS.map((ext) => `${root}${s}${ext}`)
}

/**
 * Archivo en `public/` sin encodeURIComponent (p. ej. `tarro+alitas.jpg` — el `+` no pasa a %2B).
 * Úsalo si `fileVariantsPublic` no resuelve el asset con caracteres especiales.
 */
export function fileVariantsLiteral(name: string): string[] {
  const root = getPublicRoot()
  const n = name.trim()
  return EXTENSIONS.map((ext) => `${root}${n}${ext}`)
}

/** Alitas genéricas (remoto) si ningún archivo local carga */
export const REMOTE_WINGS_PLACEHOLDER =
  'https://images.unsplash.com/photo-1527477396000-e27137b194c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'

export const REMOTE_WINGS_PLACEHOLDER_2 =
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'

export const REMOTE_BONELESS_PLACEHOLDER =
  'https://images.unsplash.com/photo-1626082920889-51cd249ad8e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'

/** Respaldos extra (boneless / tiras) por si el primero falla en red */
export const REMOTE_BONELESS_ALT_1 =
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'

export const REMOTE_BONELESS_ALT_2 =
  'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
