import Image from "next/image";
import { navLinks, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink py-14 text-paper/70">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <Image
              src="/logo/logo-claro.png"
              alt={siteConfig.name}
              width={244}
              height={216}
              className="mb-4 h-12 w-auto"
            />
            <p className="font-display text-3xl text-paper">{siteConfig.name}</p>
            <p className="mt-2 max-w-xs text-sm text-paper/60">
              {siteConfig.tagline}. {siteConfig.description}
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-paper/70 transition-colors hover:text-paper"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-paper/15 pt-6 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos
            reservados.
          </p>
          <div className="flex flex-wrap gap-6">
            <a
              href={siteConfig.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-paper"
            >
              Instagram
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="transition-colors hover:text-paper"
            >
              {siteConfig.contact.email}
            </a>
          </div>
        </div>
        {/* Crédito del sitio: chico y discreto */}
        <p className="mt-6 text-[10px] tracking-wide text-paper/30">
          Sitio por{" "}
          {siteConfig.credits.url ? (
            <a
              href={siteConfig.credits.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-paper/60"
            >
              {siteConfig.credits.name}
            </a>
          ) : (
            siteConfig.credits.name
          )}
        </p>
      </div>
    </footer>
  );
}
