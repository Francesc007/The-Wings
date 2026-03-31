import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Crosshair } from 'lucide-react'
import { IMG } from '../constants/images'
import { CONFIG } from '../config'
import { AmbientParticles } from './AmbientParticles'
import { ImageWithFallback } from './ImageWithFallback'

/** Hamburguesas: placeholders hasta que subas assets propios */
const IMG_BURGER = {
  burger:
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
  burger2:
    'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80',
}

const IMG_SNACK_EXTRA =
  'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80'

type Item = {
  nombre: string
  descripcion: string
  precio: string
  imagen: readonly string[]
  destacado?: boolean
}

type Categoria = {
  id: string
  titulo: string
  subtitulo: string
  items: Item[]
}

const categorias: Categoria[] = [
  {
    id: 'alitas',
    titulo: 'Escuadrón de alitas',
    subtitulo: 'BBQ, Buffalo y Lemon — misiones para todo el equipo.',
    items: [
      {
        nombre: 'Alitas BBQ',
        descripcion: 'Glaseado ahumado, sellado al horno. Orden de escuadrón.',
        precio: '$145',
        destacado: true,
        imagen: IMG.alitasBbq,
      },
      {
        nombre: 'Alitas Buffalo',
        descripcion: 'Mantequilla y picor real. Acompañadas de aderezo.',
        precio: '$145',
        imagen: IMG.alitasBufalo,
      },
      {
        nombre: 'Alitas Lemon',
        descripcion: 'Cítrico, pimienta y crocante.',
        precio: '$145',
        imagen: IMG.alitasLemon,
      },
    ],
  },
  {
    id: 'boneless',
    titulo: 'Boneless',
    subtitulo: 'Sin hueso, todo sabor — Diabla, BBQ y Buffalo.',
    items: [
      {
        nombre: 'Boneless Diabla',
        descripcion: 'Picor intenso y salsa de la casa.',
        precio: '$135',
        destacado: true,
        imagen: IMG.bonelessDiabla,
      },
      {
        nombre: 'Boneless BBQ',
        descripcion: 'Cobertura dulce-ahumada estilo barril.',
        precio: '$135',
        imagen: IMG.bonelessBbq,
      },
      {
        nombre: 'Boneless Buffalo',
        descripcion: 'Clásico mantequilla y vinagre.',
        precio: '$135',
        imagen: IMG.bonelessBuffalo,
      },
    ],
  },
  {
    id: 'hamburguesas',
    titulo: 'Hamburguesas de combate',
    subtitulo: 'Doble carne, queso fundido y pan brioche.',
    items: [
      {
        nombre: 'Burger clásica',
        descripcion: 'Carne smash, queso cheddar, pepinillos y salsa secreta.',
        precio: '$165',
        imagen: [IMG_BURGER.burger],
      },
      {
        nombre: 'Burger BBQ bacon',
        descripcion: 'Tocino crocante, aros de cebolla y BBQ.',
        precio: '$185',
        destacado: true,
        imagen: [IMG_BURGER.burger2],
      },
    ],
  },
  {
    id: 'snacks',
    titulo: 'Artillería pesada (snacks)',
    subtitulo: 'Para compartir en la mesa o en la barra.',
    items: [
      {
        nombre: 'Nachos supremos',
        descripcion: 'Queso, jalapeño, pico de gallo y crema.',
        precio: '$125',
        imagen: [IMG_SNACK_EXTRA],
      },
      {
        nombre: 'Tarro + alitas (combo)',
        descripcion: 'Selección de cerveza nacional + porción de alitas.',
        precio: '$195',
        destacado: true,
        imagen: IMG.tarroAlitas,
      },
    ],
  },
]

function MenuCard({ item, index }: { item: Item; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      whileHover={{
        scale: 1.02,
        y: -3,
        transition: { type: 'tween', duration: 0.05, ease: 'linear' },
      }}
      className="group bg-gradient-to-b from-[#3a1518] to-[#2a1010] rounded-2xl overflow-hidden border border-[#991b1b]/95 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.55)] transition-[border-color,box-shadow] duration-0 cursor-default hover:z-10 hover:border-[#f5c542]/70 hover:shadow-[0_0_28px_rgba(245,197,66,0.35),0_24px_48px_-8px_rgba(212,160,23,0.2)]"
    >
      <div className="relative h-56 sm:h-64 bg-[#5c1518] overflow-hidden">
        <ImageWithFallback
          sources={item.imagen}
          alt=""
          className="w-full h-full object-cover transition-transform duration-0 will-change-transform group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/35" />
        {item.destacado && (
          <span className="absolute top-3 right-3 flex items-center gap-1 bg-[#d4a017] text-[#1a0505] text-[10px] sm:text-xs font-black uppercase px-2.5 py-1 rounded-lg shadow-lg">
            <Crosshair size={12} strokeWidth={2.5} />
            Top
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading text-lg sm:text-xl uppercase text-white tracking-wide">
            {item.nombre}
          </h3>
        </div>
        <p className="text-white/65 mt-2 text-sm leading-relaxed">{item.descripcion}</p>
        <p className="font-heading text-[#f5c542] mt-4 text-lg uppercase">{item.precio}</p>
      </div>
    </motion.div>
  )
}

export function Menu() {
  return (
    <section
      id="menu"
      className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-[#3e0e14] via-[#861a1e] to-[#4e141a] wings-fire-texture"
    >
      {CONFIG.ambientEmbers && <AmbientParticles embedded />}
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 md:mb-20"
        >
          <p className="font-heading text-[#f5c542] uppercase tracking-[0.3em] text-sm mb-3">
            Menú táctico
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase">
            Arsenal de salsas
          </h2>
        </motion.div>

        <div className="space-y-20 md:space-y-28">
          {categorias.map((cat) => (
            <div key={cat.id} id={cat.id}>
              <div className="mb-8 md:mb-10 text-center md:text-left border-l-4 border-[#d4a017] pl-4 md:pl-6 py-1">
                <h3 className="font-heading text-2xl md:text-3xl uppercase text-white tracking-wide">
                  {cat.titulo}
                </h3>
                <p className="text-white/65 mt-2 text-sm md:text-base max-w-2xl mx-auto md:mx-0">
                  {cat.subtitulo}
                </p>
              </div>
              <div
                className={`grid gap-6 md:gap-8 ${
                  cat.items.length >= 3
                    ? 'sm:grid-cols-2 lg:grid-cols-3'
                    : 'sm:grid-cols-2 max-w-4xl mx-auto'
                }`}
              >
                {cat.items.map((item, i) => (
                  <MenuCard key={`${cat.id}-${item.nombre}`} item={item} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href={CONFIG.menuPdfPath}
            download
            className="font-heading inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-[#d4a017] to-[#b8860b] text-[#1a0505] uppercase tracking-wide shadow-[0_12px_40px_rgba(212,160,23,0.35)] hover:scale-[1.02] transition-transform"
          >
            Descargar menú
          </a>
        </motion.div>
      </div>
    </section>
  )
}
