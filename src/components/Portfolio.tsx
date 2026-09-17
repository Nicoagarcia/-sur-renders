"use client";

import { useState } from "react";
import {
  categoryLabel,
  coverOf,
  imageCount,
  projectMeta,
  projects,
  type Project,
} from "@/lib/projects";
import { RenderFrame } from "./RenderFrame";
import { ProjectModal } from "./ProjectModal";
import { Reveal } from "./Reveal";

// Dos proyectos que abren la sección como portada — una escena nocturna y una
// diurna — en disposición asimétrica.
const featuredSlugs = ["casa-villalonga", "casa-patagones"];
const featured = featuredSlugs
  .map((s) => projects.find((p) => p.slug === s))
  .filter(Boolean) as Project[];

export function Portfolio() {
  const [active, setActive] = useState<Project | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const current = hover !== null ? projects[hover] : null;

  return (
    <section id="portfolio" className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Encabezado */}
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-widest-xl text-sage-deep">
              Portfolio
            </p>
            <h2 className="font-display text-4xl font-light leading-[1.05] text-ink sm:text-5xl">
              Cada render, una obra
              <br />
              antes de la obra.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-stone md:text-right">
            {projects.length} proyectos seleccionados entre viviendas,
            edificios e interiores, junto a estudios de arquitectura de todo el
            país.
          </p>
        </Reveal>

        {/* Destacados — asimétricos */}
        <div className="mt-16 grid gap-8 lg:grid-cols-12 lg:gap-10">
          {featured.map((p, i) => {
            const cover = coverOf(p);
            return (
              <Reveal
                key={p.slug}
                delay={i * 120}
                className={i === 0 ? "lg:col-span-7" : "lg:col-span-5 lg:mt-20"}
              >
                <button
                  onClick={() => setActive(p)}
                  className="group flex w-full flex-col text-left"
                >
                  <div className="relative w-full overflow-hidden">
                    <RenderFrame
                      src={cover.src}
                      alt={`${p.title} — ${cover.alt}`}
                      sizes={
                        i === 0
                          ? "(max-width: 1024px) 100vw, 60vw"
                          : "(max-width: 1024px) 100vw, 42vw"
                      }
                      quality={85}
                      className={`w-full transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-[1.03] ${
                        i === 0 ? "aspect-[16/11]" : "aspect-[4/5]"
                      }`}
                    />
                    <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/15" />
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-2xl text-ink sm:text-3xl">
                      {p.title}
                    </h3>
                    <span className="shrink-0 text-xs text-stone">
                      {projectMeta(p)}
                    </span>
                  </div>
                  <span className="mt-2 inline-block border-b border-transparent pb-0.5 text-xs uppercase tracking-widest text-sage-deep transition-colors duration-300 group-hover:border-sage-deep">
                    Ver galería
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>

        {/* Índice completo — preview flotante que sigue al cursor */}
        <div className="mt-24">
          <Reveal>
            <p className="mb-2 text-[11px] uppercase tracking-widest-xl text-sage-deep">
              Índice completo
            </p>
          </Reveal>
          <ol
            onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}
            onMouseLeave={() => setHover(null)}
            className="border-b border-line"
          >
            {projects.map((p, i) => (
              <li key={p.slug}>
                <button
                  onMouseEnter={() => setHover(i)}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(null)}
                  onClick={() => setActive(p)}
                  className="group flex w-full items-center gap-4 border-t border-line py-5 text-left transition-colors duration-300 hover:bg-sand/50 sm:gap-6 sm:py-6"
                >
                  <span className="hidden w-9 shrink-0 font-display text-lg text-sage-deep/60 lg:block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {/* Miniatura — sustituye al preview flotante en mobile/tablet */}
                  <span className="block aspect-square w-14 shrink-0 overflow-hidden lg:hidden">
                    <RenderFrame
                      src={coverOf(p).src}
                      alt=""
                      sizes="56px"
                      className="h-full w-full"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-display text-xl text-ink transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl">
                      {p.title}
                    </span>
                    <span className="mt-0.5 block truncate text-xs uppercase tracking-wide text-stone">
                      {p.kind}
                    </span>
                  </span>
                  <span className="hidden shrink-0 text-sm text-stone md:block">
                    {p.location ?? categoryLabel(p)}
                  </span>
                  {p.year && (
                    <span className="hidden shrink-0 text-xs text-stone sm:block">
                      {p.year}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Preview flotante (solo desktop con puntero) */}
      <div
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-40 hidden w-64 lg:block ${
          current ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
        style={{
          transform: `translate3d(${pos.x + 28}px, ${pos.y - 150}px, 0)`,
        }}
      >
        {current && (
          <figure className="overflow-hidden bg-paper shadow-2xl shadow-ink/20">
            <RenderFrame
              key={current.slug}
              src={coverOf(current).src}
              alt=""
              sizes="256px"
              className="aspect-[4/3] w-full"
            />
            <figcaption className="flex items-baseline justify-between gap-3 px-4 py-3">
              <span className="font-display text-base text-ink">
                {current.title}
              </span>
              <span className="text-[10px] text-stone">
                {imageCount(current)} img
              </span>
            </figcaption>
          </figure>
        )}
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
