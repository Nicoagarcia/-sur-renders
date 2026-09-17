"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { navLinks, siteConfig } from "@/lib/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "border-b border-line bg-cream/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a
          href="#inicio"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          {/* Logo: versión clara sobre el hero, oscura al scrollear */}
          <span className="relative block h-8 w-9">
            <Image
              src="/logo/logo-claro.png"
              alt=""
              fill
              sizes="36px"
              className={`object-contain transition-opacity duration-500 ${
                scrolled || open ? "opacity-0" : "opacity-100"
              }`}
            />
            <Image
              src="/logo/logo-oscuro.png"
              alt=""
              fill
              sizes="36px"
              className={`object-contain transition-opacity duration-500 ${
                scrolled || open ? "opacity-100" : "opacity-0"
              }`}
            />
          </span>
          <span
            className={`font-display text-2xl leading-none tracking-wide transition-colors duration-500 ${
              scrolled || open ? "text-ink" : "text-paper"
            }`}
          >
            {siteConfig.name}
          </span>
        </a>

        {/* Desktop */}
        <ul className="hidden items-center gap-9 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`group relative text-sm tracking-wide transition-colors duration-300 ${
                  scrolled
                    ? "text-stone hover:text-ink"
                    : "text-paper/85 hover:text-paper"
                }`}
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-sage-deep transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span
            className={`h-px w-6 transition-all duration-300 ${
              scrolled || open ? "bg-ink" : "bg-paper"
            } ${
              open ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 transition-all duration-300 ${
              scrolled || open ? "bg-ink" : "bg-paper"
            } ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-px w-6 transition-all duration-300 ${
              scrolled || open ? "bg-ink" : "bg-paper"
            } ${
              open ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden bg-cream/95 backdrop-blur-md transition-[max-height] duration-500 md:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-6 pb-6 pt-2">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-line py-3 text-base text-ink/90"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
