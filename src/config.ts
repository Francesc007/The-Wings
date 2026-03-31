/** Configuración The Wings Tepeji — demo preventa franquicia */
const viteBase = import.meta.env.BASE_URL

export const CONFIG = {
  brandName: 'The Wings Tepeji',
  whatsappNumber: '527731928283',
  whatsappDisplay: '773 192 8283',
  /** Texto prellenado al abrir WhatsApp (botón flotante / barra móvil) */
  whatsappDefaultMessage: 'Hola The Wings, me gustaría hacer una consulta, por favor!',
  /** Coloca `menu.pdf` en la carpeta `public/` del proyecto (misma raíz que el sitio) */
  menuPdfPath: viteBase.endsWith('/') ? `${viteBase}menu.pdf` : `${viteBase}/menu.pdf`,
  googleMapsUrl:
    'https://www.google.com/maps/place/The+Wings+Tepeji/@19.906148,-99.3404752,21z/data=!4m6!3m5!1s0x85d22f002a92af5d:0x8d672a10292d18c8!8m2!3d19.9061727!4d-99.3405486!16s%2Fg%2F11vysp4621?entry=ttu',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61553274571933',
  instagramUrl: 'https://www.instagram.com/thewings.tepeji/',
  /** Brasas animadas (Hero, menú, operaciones). false = desactivar */
  ambientEmbers: true,
  /** Horarios oficiales */
  horarios: {
    linea1: 'Dom — Jue: 13:00 — 23:00 h',
    linea2: 'Vie — Sáb: 13:00 — 00:00 h',
    /** Texto compacto para footers */
    compacto: 'Dom–Jue 13:00–23:00 h | Vie–Sáb 13:00–00:00 h',
  },
}
