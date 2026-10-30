"use client";

import { useEffect, useState } from "react";
import { RenderFrame } from "./RenderFrame";

/** Renders del carrusel de portada: /public/hero/01.jpg, 02.jpg, ... */
const slides = [
  "Fachada de vivienda con cochera",
  "Fachada con portón rojo",
  "Fachada de ladrillo visto",
  "Vista axonométrica de vivienda",
  "Estar comedor con cocina integrada",
  "Estar comedor con bóveda de ladrillo",
  "Cocina con isla",
  "Dormitorio",
].map((alt, i) => ({
  src: `/hero/${String(i + 1).padStart(2, "0")}.jpg`,
  alt,
}));

/** Cada cuánto pasa sola a la siguiente foto (ms). */
const INTERVAL = 5000;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = (step: number) =>
    setIndex((i) => (i + step + slides.length) % slides.length);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(
      () => setIndex((i) => (i + 1) % slides.length),
      INTERVAL,
    );
    return () => window.clearTimeout(id);
  }, [index, paused]);

  return (
    <section
      id="inicio"
      aria-roledescription="carrusel"
      aria-label="Renders destacados"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative h-screen min-h-[560px] w-full overflow-hidden bg-ink"
    >
      {slides.map((s, i) => (
        <div
          key={s.src}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-[var(--ease-soft)] ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <RenderFrame
            src={s.src}
            alt={s.alt}
            preload={i === 0}
            quality={85}
            sizes="100vw"
            className={`absolute inset-0 h-full w-full ${
              i === index ? "hero-zoom" : ""
            }`}
          />
        </div>
      ))}
      {/* Veladura arriba (header) y abajo (controles) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/45" />

      {/* Controles — por encima del botón flotante de WhatsApp hasta xl */}
      <div className="absolute inset-x-0 bottom-0 z-10 mx-auto flex max-w-7xl items-center gap-6 px-6 pb-24 lg:px-10 xl:pb-10">
        <span className="font-display text-lg tabular-nums text-paper">
          {String(index + 1).padStart(2, "0")}
          <span className="text-paper/50">
            {" / "}
            {String(slides.length).padStart(2, "0")}
          </span>
        </span>
        <div className="flex flex-1 gap-1.5">
          {slides.map((s, i) => (
            <button
              key={s.src}
              onClick={() => setIndex(i)}
              aria-label={`Ver render ${i + 1}`}
              aria-current={i === index}
              className="group h-6 flex-1 py-[11px]"
            >
              <span
                className={`block h-px w-full transition-colors duration-500 ${
                  i === index
                    ? "bg-paper"
                    : "bg-paper/30 group-hover:bg-paper/60"
                }`}
              />
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => go(-1)}
            aria-label="Render anterior"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/40 text-paper transition-colors hover:bg-paper/15"
          >
            ←
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Render siguiente"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/40 text-paper transition-colors hover:bg-paper/15"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
