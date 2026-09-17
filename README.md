# Kechu — Visualización Arquitectónica 3D

Sitio web portfolio para un estudio de visualización arquitectónica 3D.
Construido con **Next.js 16 (App Router)**, **React 19**, **TypeScript** y **Tailwind CSS v4**.

Estética minimalista y cálida: tonos crema/beige, verdes desaturados (sage) y
tipografía serif elegante (Cormorant Garamond) + sans (Inter). Pensado para
transmitir profesionalismo, elegancia y exclusividad, con prioridad absoluta al
contenido visual.

## Cómo correrlo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm start        # servir el build
```

## Estructura

```
src/
  app/
    layout.tsx        # fuentes, metadata/SEO
    page.tsx          # arma todas las secciones
    globals.css       # design tokens (paleta, tipografía, animaciones)
  components/
    Header.tsx        # nav sticky (transparente sobre el hero, sólido al scrollear) + menú mobile
    Hero.tsx          # render destacado + presentación + CTAs
    About.tsx         # "El estudio": historia, filosofía, métricas
    Portfolio.tsx     # grilla + filtro por categoría
    ProjectModal.tsx  # galería del proyecto + recorrido virtual
    Services.tsx      # Visualización Arquitectónica 3D
    Contact.tsx       # formulario + redes + WhatsApp
    Footer.tsx
    WhatsAppButton.tsx# botón flotante
    RenderFrame.tsx   # imagen de render (real o placeholder elegante)
    Reveal.tsx        # animación de aparición al scrollear
  lib/
    site.ts           # ⚙️ datos del estudio (nombre, contacto, redes)
    projects.ts       # ⚙️ los proyectos del portfolio y sus galerías
```

## Qué editar

Todo el contenido configurable está centralizado:

### 1. Datos del estudio y contacto — `src/lib/site.ts`
- `name`, `tagline`, `description`
- `contact.whatsapp` → número en formato internacional **sin signos** (ej: `5492920487784`)
- `contact.whatsappLabel`, `contact.instagram` / `instagramUrl`
- `url` → dominio definitivo (para SEO / Open Graph)

El estudio no usa email, por eso el sitio solo ofrece WhatsApp e Instagram.

### 2. Proyectos del portfolio — `src/lib/projects.ts`
Categorías: Viviendas, Edificios, Interiores y reformas. De cada proyecto:
nombre, tipología (`kind`), ubicación y año (opcionales), arquitecto/a autor/a
con su Instagram, descripción, galería y opcionalmente `cover` (índice de la
imagen de portada).

### 3. Renders — `public/proyectos/<slug>/`
Cada proyecto tiene sus imágenes numeradas `01.jpg`, `02.jpg`, … (1920 px de
ancho, JPG calidad ~82). Para agregar uno:

1. Creá la carpeta con los renders numerados.
2. Sumá la entrada en `projects` usando el helper `gallery(slug, [alts])`;
   una leyenda por imagen, y `{ alt, square: true }` si el render es 1:1.

Los destacados de la sección Portfolio se eligen en `featuredSlugs`
(`src/components/Portfolio.tsx`). El render del hero y el de "El estudio" se
definen directamente en `Hero.tsx` y `About.tsx`.

### 4. Logo e íconos
`public/logo/logo-claro.png` (sobre fondos oscuros) y `logo-oscuro.png` (sobre
fondos claros). El favicon se genera desde `src/app/icon.png` y
`src/app/apple-icon.png`.

## Formulario de contacto

Por ahora el formulario **arma un mensaje y abre WhatsApp** prellenado (funciona
sin backend). Si más adelante se quiere recibir los mensajes por email, se puede
conectar a un servicio como Formspree, Resend o una Server Action; el punto de
cambio es el `onSubmit` de `src/components/Contact.tsx`.

## Deploy

Optimizado para **Vercel**:

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # producción
```
