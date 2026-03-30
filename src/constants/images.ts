import {
  fileVariantsPublic,
  fileVariantsSlug,
  REMOTE_BONELESS_ALT_1,
  REMOTE_BONELESS_ALT_2,
  REMOTE_BONELESS_PLACEHOLDER,
  REMOTE_WINGS_PLACEHOLDER,
  REMOTE_WINGS_PLACEHOLDER_2,
} from '../utils/publicImage'

/** Respaldo hero — ixlib ayuda a evitar bloqueos de hotlink */
const HERO_REMOTE =
  'https://images.unsplash.com/photo-1527477396000-e27137b194c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'

const BEER_REMOTE =
  'https://images.unsplash.com/photo-1535958637004-021e94a7007e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'

/** Variantes típicas de nombres de archivo para boneless en /public/ */
const bonelessLocals = (base: 'diabla' | 'bbq' | 'buffalo') => {
  const cap = base === 'bbq' ? 'BBQ' : base === 'buffalo' ? 'Buffalo' : 'Diabla'
  return [
    ...fileVariantsPublic(`Boneless ${cap}`),
    ...fileVariantsPublic(`Boneless ${cap.toLowerCase()}`),
    ...fileVariantsSlug(`boneless-${base}`),
    ...fileVariantsSlug(`boneless_${base}`),
    ...fileVariantsSlug(`Boneless${cap}`),
  ]
}

/**
 * Listas ordenadas: primero variantes en /public/ (.jpg, .png, .webp…),
 * luego URLs remotas de respaldo.
 */
export const IMG = {
  hero: [
    ...fileVariantsPublic('Hero'),
    ...fileVariantsPublic('hero'),
    HERO_REMOTE,
    REMOTE_WINGS_PLACEHOLDER,
    REMOTE_WINGS_PLACEHOLDER_2,
  ],

  alitasBbq: [
    ...fileVariantsPublic('Alitas bbq'),
    ...fileVariantsPublic('Alitas BBQ'),
    REMOTE_WINGS_PLACEHOLDER,
  ],

  alitasBufalo: [
    ...fileVariantsPublic('Alitas bufalo'),
    ...fileVariantsPublic('Alitas buffalo'),
    ...fileVariantsPublic('Alitas Buffalo'),
    REMOTE_WINGS_PLACEHOLDER,
  ],

  alitasLemon: [
    ...fileVariantsPublic('Alitas lemon'),
    ...fileVariantsPublic('Alitas Lemon'),
    REMOTE_WINGS_PLACEHOLDER,
  ],

  bonelessDiabla: [
    ...fileVariantsPublic('boneles diabla'),
    ...fileVariantsPublic('boneless diabla'),
    REMOTE_BONELESS_PLACEHOLDER,
    REMOTE_BONELESS_ALT_1,
    REMOTE_WINGS_PLACEHOLDER,
    REMOTE_WINGS_PLACEHOLDER_2,
    REMOTE_BONELESS_ALT_2,
  ],

  bonelessBbq: [
    ...fileVariantsPublic('boneles bbq'),
    ...fileVariantsPublic('boneless bbq'),
    REMOTE_BONELESS_PLACEHOLDER,
    REMOTE_BONELESS_ALT_1,
    REMOTE_WINGS_PLACEHOLDER,
    REMOTE_WINGS_PLACEHOLDER_2,
    REMOTE_BONELESS_ALT_2,
  ],

  bonelessBuffalo: [
    ...bonelessLocals('buffalo'),
    REMOTE_BONELESS_PLACEHOLDER,
    REMOTE_BONELESS_ALT_1,
    REMOTE_WINGS_PLACEHOLDER,
    REMOTE_WINGS_PLACEHOLDER_2,
    REMOTE_BONELESS_ALT_2,
  ],

  /** Combo tarro + alitas — imagen: `alitas-cerveza.jpg` en /public/ */
  tarroAlitas: [
    ...fileVariantsSlug('alitas-cerveza'),
    ...fileVariantsPublic('alitas-cerveza'),
    BEER_REMOTE,
  ],
} as const
