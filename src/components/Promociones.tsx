import { motion } from 'framer-motion'
import { CONFIG } from '../config'
import { ImageWithFallback } from './ImageWithFallback'
import { AmbientParticles } from './AmbientParticles'
import { fileVariantsPublic, REMOTE_WINGS_PLACEHOLDER } from '../utils/publicImage'

const operaciones = [
  {
    titulo: 'Misión cumpleaños',
    descripcion: 'Postre de cortesía y shout-out en pantalla. Grupos 6+ — consulta condiciones en sucursal.',
    imagenes: [...fileVariantsPublic('cumple'), REMOTE_WINGS_PLACEHOLDER],
    posicionImagen: '',
  },
  {
    titulo: 'Happy hour',
    descripcion: '2x1 en bebidas seleccionadas y tarros destacados en horario promocional.',
    imagenes: [...fileVariantsPublic('2x1'), REMOTE_WINGS_PLACEHOLDER],
    /** Encuadre más abajo para que el motivo principal se vea mejor */
    posicionImagen: 'object-[center_75%] sm:object-[center_70%]',
  },
  {
    titulo: 'Fin de semana',
    descripcion: 'Combos alitas + bebida + snack. Viernes a domingo en ventana extendida.',
    imagenes: [
      ...fileVariantsPublic('buffet1'),
      ...fileVariantsPublic('beffet1'),
      ...fileVariantsPublic('buffet'),
      REMOTE_WINGS_PLACEHOLDER,
    ],
    posicionImagen: '',
  },
] as const

export function Promociones() {
  return (
    <section
      id="operaciones"
      className="relative py-20 md:py-28 bg-[#4e141a] overflow-hidden border-y border-[#b91c1c]/45"
    >
      <div className="absolute inset-0 opacity-[0.07] wings-fire-texture pointer-events-none" />

      {CONFIG.ambientEmbers && <AmbientParticles embedded />}

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 md:mb-16"
        >
          <p className="font-heading text-[#d4a017] uppercase tracking-[0.3em] text-sm mb-3">
            Campaña activa
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-white uppercase mb-4">
            Operaciones especiales
          </h2>
          <p className="text-white/85 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Aprovecha nuestras ofertas especiales y vive la experiencia{' '}
            <span className="font-heading text-4xl md:text-5xl font-black uppercase text-[#f5c542]">
              The&nbsp;Wings
            </span>
            .
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {operaciones.map((op, i) => (
            <motion.div
              key={op.titulo}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{
                scale: 1.02,
                y: -4,
                transition: { type: 'tween', duration: 0.05, ease: 'linear' },
              }}
              className="group bg-gradient-to-b from-[#2a1214] to-[#1a080a] rounded-2xl overflow-hidden border-2 border-[#991b1b]/95 shadow-[0_24px_48px_rgba(0,0,0,0.55)] transition-[border-color,box-shadow] duration-0 hover:z-10 hover:border-[#f5c542]/80 hover:shadow-[0_0_32px_rgba(245,197,66,0.55),0_0_48px_rgba(245,197,66,0.22),0_24px_48px_-8px_rgba(212,160,23,0.25)]"
            >
              <div className="relative h-60 sm:h-64 overflow-hidden">
                <ImageWithFallback
                  sources={op.imagenes}
                  alt=""
                  className={`w-full h-full object-cover transition-transform duration-0 will-change-transform group-hover:scale-110 ${op.posicionImagen}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/50" />
              </div>
              <div className="p-5 md:p-6">
                <h3 className="font-heading text-xl uppercase text-white tracking-wide mb-2">
                  {op.titulo}
                </h3>
                <p className="text-white/65 text-sm leading-relaxed">{op.descripcion}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
