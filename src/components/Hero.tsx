import { RenderFrame } from "./RenderFrame";
import { siteConfig, yearsActive } from "@/lib/site";
import { projects, studioCount } from "@/lib/projects";

const meta = [
  { label: "Base", value: "Viedma, Río Negro" },
  { label: "Trayectoria", value: `Desde ${siteConfig.since}` },
  { label: "Proyectos", value: `${projects.length} publicados` },
  { label: "Trabajamos con", value: `${studioCount} estudios` },
];

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative h-screen min-h-[680px] w-full overflow-hidden"
    >
      {/* Render destacado de fondo, con zoom lento de entrada */}
      <div className="hero-zoom absolute inset-0">
        <RenderFrame
          src="/proyectos/arenas-verdes-ii/01.jpg"
          alt="Arenas Verdes II — fachada al atardecer"
          preload
          quality={85}
          sizes="100vw"
          className="absolute inset-0 h-full w-full"
        />
      </div>
      {/* Veladura cálida para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/45 via-ink/15 to-ink/70" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-12 lg:px-10 lg:pb-16">
        <div className="max-w-4xl">
          <p
            className="anim-rise mb-6 flex items-center gap-3 text-[11px] uppercase tracking-widest-xl text-paper/80"
            style={{ animationDelay: "0.05s" }}
          >
            <span className="h-px w-8 bg-paper/50" />
            {siteConfig.tagline}
          </p>
          <h1
            className="anim-rise font-display text-5xl font-light leading-[0.98] text-paper sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.18s" }}
          >
            Vemos el proyecto
            <br />
            <span className="text-paper/70">—</span>{" "}
            <span className="italic">antes de construirlo.</span>
          </h1>
          <p
            className="anim-rise mt-7 max-w-xl text-base leading-relaxed text-paper/85"
            style={{ animationDelay: "0.36s" }}
          >
            Renders fotorrealistas y recorridos virtuales que comunican cada
            espacio con precisión, calidez y un nivel de detalle excepcional.
          </p>
          <div
            className="anim-rise mt-9 flex flex-wrap items-center gap-x-9 gap-y-4"
            style={{ animationDelay: "0.52s" }}
          >
            <a
              href="#portfolio"
              className="group inline-flex items-center gap-3 text-sm tracking-wide text-paper"
            >
              <span className="border-b border-paper/40 pb-1 transition-colors duration-300 group-hover:border-paper">
                Ver el índice de proyectos
              </span>
            </a>
            <a
              href="#contacto"
              className="text-sm tracking-wide text-paper/70 transition-colors duration-300 hover:text-paper"
            >
              Solicitar presupuesto
            </a>
          </div>
        </div>

        {/* Ficha del estudio */}
        <dl
          className="anim-rise mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-paper/20 pt-7 sm:grid-cols-4"
          style={{ animationDelay: "0.68s" }}
        >
          {meta.map((m) => (
            <div key={m.label}>
              <dt className="text-[10px] uppercase tracking-widest-xl text-paper/55">
                {m.label}
              </dt>
              <dd className="mt-1.5 font-display text-lg text-paper">
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 lg:block">
        <span className="block h-12 w-px animate-pulse bg-paper/50" />
      </div>
    </section>
  );
}
