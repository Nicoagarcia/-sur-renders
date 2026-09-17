import { RenderFrame } from "./RenderFrame";
import { Reveal } from "./Reveal";
import { projects, studioCount, locationCount } from "@/lib/projects";
import { yearsActive } from "@/lib/site";

const stats = [
  { value: `+${yearsActive}`, label: "Años de trayectoria" },
  { value: String(projects.length), label: "Proyectos publicados" },
  { value: String(studioCount), label: "Arquitectos y estudios" },
  { value: String(locationCount), label: "Localidades" },
];

export function About() {
  return (
    <section id="estudio" className="bg-sand py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <Reveal className="order-2 lg:order-1">
          <p className="mb-4 text-[11px] uppercase tracking-widest-xl text-sage-deep">
            El estudio
          </p>
          <h2 className="font-display text-4xl font-light leading-tight text-ink sm:text-5xl">
            Traducimos ideas en
            <br />
            imágenes que convencen.
          </h2>
          <div className="mt-7 space-y-5 text-[15px] leading-relaxed text-stone">
            <p>
              Somos un estudio dedicado exclusivamente a la visualización
              arquitectónica 3D. Acompañamos a arquitectos, desarrolladores y
              constructoras a comunicar sus proyectos con claridad mucho antes
              de la obra.
            </p>
            <p>
              Trabajamos cada render como una fotografía: estudiamos la luz, los
              materiales y la atmósfera de cada espacio para lograr resultados
              realistas, elegantes y fieles a la intención del diseño.
            </p>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-3xl text-ink sm:text-4xl">
                  {s.value}
                </dt>
                <dd className="mt-1 text-xs leading-snug text-stone">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={120} className="order-1 lg:order-2">
          <div className="relative">
            <RenderFrame
              src="/proyectos/casa-kevin/03.jpg"
              alt="Casa Kevin — comedor estar visualizado en 3D"
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={85}
              className="aspect-[4/5] w-full"
            />
            <div className="absolute -bottom-5 -left-5 hidden border border-line bg-paper px-6 py-4 lg:block">
              <p className="font-display text-lg text-ink">Luz · Materia · Detalle</p>
              <p className="text-xs text-stone">Nuestra filosofía de trabajo</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
