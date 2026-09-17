import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} · Visualización Arquitectónica 3D`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "visualización arquitectónica",
    "renders 3D",
    "render arquitectónico",
    "recorridos virtuales",
    "arquitectura",
    "renders fotorrealistas",
  ],
  openGraph: {
    type: "website",
    locale: "es_AR",
    title: `${siteConfig.name} · Visualización Arquitectónica 3D`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/proyectos/arenas-verdes-ii/01.jpg",
        width: 1920,
        height: 1080,
        alt: "Arenas Verdes II — fachada al atardecer",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        {children}
      </body>
    </html>
  );
}
