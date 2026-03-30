import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'

const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#menu', label: 'Menú' },
  { href: '#operaciones', label: 'Operaciones' },
  { href: '#ubicacion', label: 'Base' },
]

interface NavbarProps {
  onReservarClick: () => void
}

export function Navbar({ onReservarClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
        isScrolled
          ? 'bg-[#4a181c]/95 border-[#d4a017]/30 shadow-[0_8px_32px_rgba(185,28,28,0.45)]'
          : 'bg-gradient-to-b from-[#6b1f24]/75 to-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[88px] md:min-h-[100px] py-2 gap-3">
          <a href="#inicio" className="inline-flex shrink-0">
            <div className="w-[100px] h-[100px] md:w-[112px] md:h-[112px]">
              <img
                src="/Logo%20Wings.png"
                alt="The Wings Tepeji"
                className="w-full h-full object-contain p-1.5"
              />
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-heading text-white/90 hover:text-[#f5c542] transition-colors text-sm uppercase tracking-wider"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={onReservarClick}
            className="font-heading flex items-center gap-2 bg-gradient-to-r from-[#d4a017] to-[#c49a0f] hover:from-[#e8b01f] hover:to-[#d4a017] text-[#1a0505] px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm uppercase tracking-wide transition-all hover:scale-[1.02] shadow-[0_8px_24px_rgba(212,160,23,0.35)] shrink-0"
          >
            <Calendar size={18} className="hidden sm:block" />
            <span className="whitespace-nowrap">Reservar</span>
          </button>
        </div>

        <div className="md:hidden pb-3 flex flex-wrap gap-x-4 gap-y-2 justify-center border-t border-white/10 pt-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-heading text-[#f5c542]/90 hover:text-[#f5c542] transition-colors text-xs uppercase tracking-wider"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}
