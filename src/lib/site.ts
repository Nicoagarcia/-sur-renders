/**
 * Configuración central del sitio.
 * Editá estos valores cuando tengas los datos definitivos del estudio.
 */
export const siteConfig = {
  name: "Sur Renders",
  /** Año en que el estudio empezó a trabajar. */
  since: 2020,
  tagline: "Visualización Arquitectónica 3D",
  url: "https://sur-renders.vercel.app",
  description:
    "Estudio de visualización arquitectónica 3D en Viedma, Río Negro. Renders fotorrealistas, recorridos virtuales y presentación profesional de proyectos antes de construir.",

  // Contacto
  contact: {
    // Número en formato internacional sin signos, para el link de WhatsApp.
    whatsapp: "5492920487784",
    whatsappLabel: "+54 9 2920 48-7784",
    email: "jesuspachecovasquez@gmail.com",
    instagram: "sur_renders",
    instagramUrl: "https://www.instagram.com/sur_renders",
  },
  /** Crédito discreto al pie: quién hizo el sitio. */
  credits: { name: "Vesur", url: "" },
} as const;

/** Años de trayectoria, calculados desde `since` (mínimo 1). */
export const yearsActive = Math.max(
  1,
  new Date().getFullYear() - siteConfig.since,
);

export const whatsappLink = (message?: string) => {
  const base = `https://wa.me/${siteConfig.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

export const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#estudio", label: "Estudio" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#contacto", label: "Contacto" },
] as const;
