import { motion } from 'framer-motion'
import { CONFIG } from '../config'
import { IMG } from '../constants/images'
import { ImageWithFallback } from './ImageWithFallback'
import { AmbientParticles } from './AmbientParticles'

export function Hero({ onReservarClick }: { onReservarClick: () => void }) {
  return (
    <section
      id="inicio"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
    >
      <ImageWithFallback
        sources={[...IMG.hero]}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
        emptyClassName="absolute inset-0 bg-gradient-to-b from-[#991b1b] via-[#7f1518] to-[#2e080c]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-[#b91c1c]/10 to-[#991b1b]/40" />
      <div className="absolute inset-0 wings-fire-texture opacity-60 animate-ember pointer-events-none" />

      {CONFIG.ambientEmbers && <AmbientParticles embedded />}

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-28 pb-16 md:pb-24">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-heading text-[#f5c542] text-sm sm:text-base uppercase tracking-[0.35em] mb-4"
        >
          The Wings · Tepeji
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase leading-[1.05] mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
        >
          Las mejores alitas de Tepeji
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl text-white/90 font-semibold uppercase tracking-wide mb-10 max-w-2xl mx-auto"
        >
          Sabor real, ambiente de escuadrón.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center"
        >
          <a
            href="#menu"
            className="font-heading inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-[#d4a017] to-[#f5c542] text-[#1a0505] text-lg uppercase tracking-wide shadow-[0_12px_40px_rgba(212,160,23,0.45)] hover:scale-[1.02] transition-transform border-2 border-[#f5c542]/80"
          >
            Ver menú / Ordenar ahora
          </a>
          <button
            type="button"
            onClick={onReservarClick}
            className="font-heading inline-flex items-center justify-center px-8 py-4 rounded-xl bg-black/50 hover:bg-black/70 text-white text-lg uppercase tracking-wide border-2 border-white/25 shadow-xl transition-colors"
          >
            Reservar mesa
          </button>
        </motion.div>
      </div>
    </section>
  )
}
