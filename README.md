# The Wings Tepeji — Landing

Landing page para **The Wings Tepeji**, sports bar y alitas en Tepeji del Río, Hidalgo.

Repositorio: [github.com/Francesc007/The-Wings](https://github.com/Francesc007/The-Wings)

## Inicio rápido

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## Configuración

Edita `src/config.ts` para personalizar:

- **whatsappNumber**: número de WhatsApp con código de país (ej: `527711234567`)
- **googleMapsUrl**: enlace a Google Maps
- **horarios**: horarios de atención

## Logo

Coloca el logo en `public/` (por ejemplo `Logo Wings.png`) y referencia la ruta en los componentes que lo usen.

## Build para producción

```bash
npm run build
```

Salida en la carpeta `dist/` (compatible con Vercel u otro hosting estático).

## Tecnologías

- React + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React (iconos)
