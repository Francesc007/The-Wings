import { motion } from 'framer-motion'
import { MapPin, Clock, Facebook, Instagram } from 'lucide-react'
import { CONFIG } from '../config'

export function Footer() {
  return (
    <footer
      id="ubicacion"
      className="bg-gradient-to-b from-[#3a1216] to-[#2a0c10] border-t border-[#b91c1c]/40 pt-10 pb-24 md:pb-16"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 md:gap-10 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <a href="#inicio" className="inline-flex flex-col items-center gap-3">
              <div className="w-24 h-24 md:w-28 md:h-28">
                <img
                  src="/Logo%20Wings.png"
                  alt="The Wings Tepeji"
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <p className="font-heading text-center leading-snug max-w-[18rem] space-y-1">
                <span className="block text-white/85 text-xs sm:text-sm uppercase tracking-[0.18em]">
                  Alitas de escuadrón
                </span>
                <span className="block text-[#f5c542] text-sm md:text-base tracking-wide">
                  Tepeji del Río
                </span>
              </p>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-center"
          >
            <h4 className="font-heading text-lg uppercase text-[#f5c542] mb-3 tracking-wide">
              Base & horarios
            </h4>
            <a
              href={CONFIG.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-semibold text-sm text-white hover:text-[#f5c542] transition-colors mb-3"
            >
              <MapPin size={18} className="shrink-0 text-[#d4a017]" />
              <span className="underline underline-offset-4">The Wings Tepeji en Google Maps</span>
            </a>
            <div className="flex flex-col items-center gap-2 text-white/75 text-sm">
              <div className="flex items-start gap-2 text-left max-w-xs">
                <Clock size={18} className="text-[#d4a017] shrink-0 mt-0.5" />
                <span>
                  {CONFIG.horarios.linea1}
                  <br />
                  {CONFIG.horarios.linea2}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="text-center"
          >
            <h4 className="font-heading text-lg uppercase text-[#f5c542] mb-3 tracking-wide">
              Redes oficiales
            </h4>
            <div className="flex justify-center gap-4 md:gap-5">
              <a
                href={CONFIG.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-[#2a1010] to-[#1a0808] border border-[#d4a017]/40 flex items-center justify-center text-[#d4a017] hover:bg-[#d4a017]/15 hover:scale-105 transition-transform duration-0 shadow-[0_8px_20px_rgba(0,0,0,0.4)]"
                aria-label="Facebook The Wings Tepeji"
              >
                <Facebook className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />
              </a>
              <a
                href={CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-[#2a1010] to-[#1a0808] border border-[#d4a017]/40 flex items-center justify-center text-[#f5c542] hover:bg-[#d4a017]/15 hover:scale-105 transition-transform duration-0 shadow-[0_8px_20px_rgba(0,0,0,0.4)]"
                aria-label="Instagram The Wings Tepeji"
              >
                <Instagram className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />
              </a>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-[#5c0a0a]/40 pt-5 text-center text-white/45 text-xs sm:text-sm space-y-1">
          <p>
            © {new Date().getFullYear()} {CONFIG.brandName}. Tepeji del Río, Hidalgo.
          </p>
          <p className="text-xs">
            Powered by{' '}
            <a
              href="https://sigmaaiagency.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#d4a017]/90 hover:text-[#f5c542] transition-colors"
            >
              Sigma AI Agency
            </a>
            {' '}
            | Automatización inteligente
          </p>
        </div>
      </div>
    </footer>
  )
}
