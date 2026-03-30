import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { CONFIG } from '../config'

interface ReservationModalProps {
  isOpen: boolean
  onClose: () => void
}

/** Ranuras de 30 min desde inicio hasta fin (inclusive). Vie/Sáb incluyen 00:00. */
function horasParaFecha(fecha: Date): string[] {
  const d = fecha.getDay()
  const esVieSab = d === 5 || d === 6
  const slots: string[] = []
  for (let h = 13; h <= 23; h++) {
    slots.push(`${h.toString().padStart(2, '0')}:00`)
    if (h < 23) slots.push(`${h.toString().padStart(2, '0')}:30`)
  }
  if (esVieSab) slots.push('00:00')
  return slots
}

function getNextDays(count: number) {
  const days: Date[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  for (let i = 0; i < count; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    days.push(d)
  }
  return days
}

function formatDate(d: Date) {
  return d.toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric', month: 'short' })
}

export function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const [fecha, setFecha] = useState<Date | null>(null)
  const [hora, setHora] = useState('')
  const [personas, setPersonas] = useState('2')

  const dias = useMemo(() => getNextDays(21), [])
  const horasDisponibles = useMemo(() => (fecha ? horasParaFecha(fecha) : []), [fecha])

  const handleConfirmar = () => {
    if (!fecha || !hora) return
    const day = fecha.getDate().toString().padStart(2, '0')
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0')
    const year = fecha.getFullYear()
    const fechaStr = `${day}/${month}/${year}`
    const mensaje = encodeURIComponent(
      `Hola ${CONFIG.brandName}, solicito reserva para el ${fechaStr} a las ${hora} h, ${personas} personas.`
    )
    window.open(`https://api.whatsapp.com/send?phone=${CONFIG.whatsappNumber}&text=${mensaje}`, '_blank')
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-[60] backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[61] w-full max-w-md max-h-[90vh] overflow-y-auto bg-gradient-to-b from-[#1a0808] to-[#0a0505] rounded-2xl border-2 border-[#d4a017]/50 shadow-2xl p-6 mx-4"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-heading text-2xl uppercase text-[#f5c542] tracking-wide">
                Reservar mesa
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Cerrar"
              >
                <X size={24} className="text-white/60" aria-hidden />
              </button>
            </div>

            <p className="text-white/55 text-sm mb-6">
              Horario de operación: {CONFIG.horarios.compacto}
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/50 mb-2 uppercase tracking-wide">
                  Fecha
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto pr-1">
                  {dias.map((d) => (
                    <button
                      type="button"
                      key={d.toISOString()}
                      onClick={() => {
                        setFecha(d)
                        setHora('')
                      }}
                      className={`py-2 px-3 rounded-xl text-sm font-semibold transition-all ${
                        fecha?.toDateString() === d.toDateString()
                          ? 'bg-gradient-to-r from-[#d4a017] to-[#b8860b] text-[#1a0505]'
                          : 'bg-[#2a1515] text-white/85 hover:bg-[#3a2020]'
                      }`}
                    >
                      {formatDate(d)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/50 mb-2 uppercase tracking-wide">
                  Hora
                </label>
                <div className="grid grid-cols-4 gap-2 max-h-36 overflow-y-auto">
                  {horasDisponibles.map((h) => (
                    <button
                      type="button"
                      key={h}
                      onClick={() => setHora(h)}
                      className={`py-2 rounded-xl text-sm font-semibold transition-all ${
                        hora === h
                          ? 'bg-[#8b0000] text-white border border-[#d4a017]/40'
                          : 'bg-[#2a1515] text-white/85 hover:bg-[#3a2020]'
                      }`}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="reserva-personas"
                  className="block text-sm font-medium text-white/50 mb-2 uppercase tracking-wide"
                >
                  Personas
                </label>
                <select
                  id="reserva-personas"
                  value={personas}
                  onChange={(e) => setPersonas(e.target.value)}
                  className="w-full py-3 px-4 bg-[#2a1515] border border-[#d4a017]/25 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#d4a017]/50"
                  aria-label="Número de personas"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'persona' : 'personas'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-xl border border-white/20 text-white/70 hover:bg-white/5 transition-colors font-semibold"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmar}
                disabled={!fecha || !hora}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#d4a017] to-[#b8860b] text-[#1a0505] font-heading uppercase tracking-wide disabled:opacity-45 disabled:cursor-not-allowed transition-all"
              >
                Ir a WhatsApp
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
