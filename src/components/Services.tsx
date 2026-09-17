import { Reveal } from "./Reveal";

const items = [
  {
    title: "Renders interiores",
    text: "Atmósferas cálidas y realistas que muestran cómo se vive cada ambiente.",
  },
  {
    title: "Renders exteriores",
    text: "Fachadas y entornos con estudio de luz natural en distintos momentos del día.",
  },
  {
    title: "Imágenes fotorrealistas",
    text: "Calidad fotográfica: materiales, texturas y detalles fieles al proyecto.",
  },
  {
    title: "Recorridos virtuales",
    text: "Navegación inmersiva por el proyecto para experimentarlo antes de construir.",
  },
  {
    title: "Presentaciones de proyecto",
    text: "Material visual listo para clientes, ventas en pozo o concursos.",
  },
  {
    title: "Vistas aéreas y de implantación",
    text: "Comprensión del proyecto en su contexto urbano o natural.",
  },
];

export function Services() {
  return (
    <section id="servicios" className="bg-sand py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="mb-4 text-[11px] uppercase tracking-widest-xl text-sage-deep">
              Servicios
            </p>
            <h2 className="font-display text-4xl font-light leading-[1.05] text-ink sm:text-5xl">
              Un vocabulario
              <br />
              visual completo.
            </h2>
            <p className="mt-7 max-w-xs text-[15px] leading-relaxed text-stone">
              Representamos proyectos con un alto nivel de realismo antes de su
              construcción —para comunicar ideas, decidir con claridad y
              presentar cada trabajo con altura.
            </p>
          </Reveal>

          <dl className="border-b border-line lg:col-span-8">
            {items.map((s, i) => (
              <Reveal
                as="div"
                key={s.title}
                delay={i * 60}
                className="grid grid-cols-1 gap-2 border-t border-line py-7 sm:grid-cols-[1fr_1.35fr] sm:items-baseline sm:gap-10"
              >
                <dt className="flex items-baseline gap-3 font-display text-2xl text-ink">
                  <span className="text-stone/70">—</span>
                  {s.title}
                </dt>
                <dd className="text-sm leading-relaxed text-stone">{s.text}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
