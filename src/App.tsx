import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Menu } from './components/Menu'
import { Promociones } from './components/Promociones'
import { Footer } from './components/Footer'
import { ReservationModal } from './components/ReservationModal'
import { WhatsAppButton } from './components/WhatsAppButton'
import { MobileActionBar } from './components/MobileActionBar'

function App() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Navbar onReservarClick={() => setModalOpen(true)} />
      <Hero onReservarClick={() => setModalOpen(true)} />
      <Menu />
      <Promociones />
      <Footer />
      <ReservationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <WhatsAppButton />
      <MobileActionBar />
    </>
  )
}

export default App
