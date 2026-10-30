import { Reveal } from "./Reveal";

// En el orden que pidió el estudio.
const items = [
  {
    title: "Proyectos de Arquitectura",
    text: "Diseño integral de viviendas, edificios y espacios, desde la idea hasta el proyecto ejecutivo.",
  },
  {
    title: "Dirección de obra",
    text: "Seguimiento técnico en obra para que lo construido respete lo proyectado.",
  },
  {
    title: "Documentación Técnica",
    text: "Planos, detalles y legajos completos para presentar, cotizar y construir.",
  },
  {
    title: "Reformas y Ampliaciones",
    text: "Intervenciones sobre espacios existentes para adaptarlos a nuevas necesidades.",
  },
  {
    title: "Relevamientos",
    text: "Medición y registro de inmuebles existentes como base para cualquier proyecto o trámite.",
  },
  {
    title: "Gestorías Administrativas",
    text: "Trámites municipales y de colegio profesional: permisos, aprobaciones y finales de obra.",
  },
  {
    title: "Visualización 3D",
    text: "Modelado tridimensional para comprender y decidir el proyecto antes de construirlo.",
  },
  {
    title: "Renders Interiores y Exteriores",
    text: "Imágenes fotorrealistas con estudio de luz, materiales y atmósfera de cada espacio.",
  },
  {
    title: "Recorridos Virtuales",
    text: "Navegación inmersiva por el proyecto para experimentarlo antes de la obra.",
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
              Del proyecto
              <br />
              a la imagen.
            </h2>
            <p className="mt-7 max-w-xs text-[15px] leading-relaxed text-stone">
              Acompañamos cada proyecto de punta a punta —diseño,
              documentación, trámites y obra— y lo representamos con un alto
              nivel de realismo antes de construirlo.
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
