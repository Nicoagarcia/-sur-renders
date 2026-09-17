/**
 * Portfolio — proyectos reales del estudio.
 *
 * Los renders viven en /public/proyectos/<slug>/01.jpg, 02.jpg, ...
 * La primera imagen de cada proyecto (o la indicada en `cover`) se usa como
 * portada en tarjetas, miniaturas y el preview flotante.
 *
 * Para agregar un proyecto: crear la carpeta con los renders numerados y
 * sumar una entrada a `projects`.
 */

export type Category = "viviendas" | "edificios" | "interiores";

export type ProjectImage = {
  src: string;
  /** Qué muestra la imagen (fachada, estar, cocina...). */
  alt: string;
  /** Render en formato cuadrado (1:1) en vez de 16:9. */
  square?: boolean;
};

export type Project = {
  slug: string;
  title: string;
  category: Category;
  /** Tipología: vivienda unifamiliar, edificio, etc. */
  kind: string;
  location?: string;
  year?: string;
  /** Autor/a del proyecto arquitectónico. */
  architect: string;
  /** Usuario de Instagram del estudio autor (sin @). */
  architectInstagram?: string;
  description: string;
  images: ProjectImage[];
  /** Índice de la imagen de portada (por defecto la primera). */
  cover?: number;
};

export const categories: {
  id: Category;
  label: string;
  blurb: string;
}[] = [
  {
    id: "viviendas",
    label: "Viviendas",
    blurb: "Casas unifamiliares representadas con realismo fotográfico.",
  },
  {
    id: "edificios",
    label: "Edificios",
    blurb: "Obra nueva en altura y conjuntos multifamiliares.",
  },
  {
    id: "interiores",
    label: "Interiores y reformas",
    blurb: "Espacios interiores reinterpretados antes de intervenir.",
  },
];

/** Genera las rutas /proyectos/<slug>/01.jpg ... con sus descripciones. */
const gallery = (
  slug: string,
  alts: (string | { alt: string; square: true })[],
): ProjectImage[] =>
  alts.map((a, i) => ({
    src: `/proyectos/${slug}/${String(i + 1).padStart(2, "0")}.jpg`,
    ...(typeof a === "string" ? { alt: a } : a),
  }));

export const projects: Project[] = [
  // — Viviendas —
  {
    slug: "casa-villalonga",
    title: "Casa Villalonga",
    category: "viviendas",
    kind: "Diseño de fachadas · Vivienda unifamiliar",
    location: "Villalonga, Buenos Aires",
    year: "2025",
    architect: "Arq. Jesús Pacheco Vásquez",
    description:
      "Diseño de fachadas para una vivienda unifamiliar de dos plantas. La serie recorre frente, contrafachada y quincho en dos momentos: la luz plena del día y la escena nocturna con la iluminación artificial encendida.",
    images: gallery("casa-villalonga", [
      "Fachada de día",
      "Contrafachada de día",
      "Quincho de día",
      "Fachada de noche",
      "Contrafachada de noche",
      "Quincho de noche",
    ]),
    cover: 3,
  },
  {
    slug: "casa-patagones",
    title: "Casa Patagones",
    category: "viviendas",
    kind: "Vivienda unifamiliar",
    location: "Carmen de Patagones, Buenos Aires",
    architect: "Arq. Lorena Beliu · Arq. Olivia Gavilán",
    description:
      "Vivienda de una planta con volúmenes blancos, portón de listones negros y patio con pileta. Exteriores de acceso y patio, quincho integrado a la cocina, hall con jardín interior y cocina con isla.",
    images: gallery("casa-patagones", [
      "Fachada de acceso",
      "Patio de acceso",
      "Patio con pileta",
      "Quincho",
      "Hall de acceso",
      "Cocina",
    ]),
    cover: 2,
  },
  {
    slug: "casa-grillo",
    title: "Casa Grillo",
    category: "viviendas",
    kind: "Vivienda unifamiliar",
    location: "Viedma, Río Negro",
    architect: "Arq. María Elena Brusa",
    architectInstagram: "mariebrusa.arq",
    description:
      "Vivienda de una planta con cubierta plana, galería y pileta sobre un terreno de pastizal. Dos vistas exteriores y una secuencia de interiores: estar, comedor y cocina en blanco y madera clara.",
    images: gallery("casa-grillo", [
      "Fachada con galería y pileta",
      "Fachada de acceso",
      "Estar",
      "Estar comedor",
      "Comedor y cocina",
      "Cocina",
    ]),
  },
  {
    slug: "casa-kevin",
    title: "Casa Kevin",
    category: "viviendas",
    kind: "Vivienda unifamiliar en chacra",
    location: "Viedma, Río Negro",
    architect: "Arq. María Elena Brusa",
    architectInstagram: "mariebrusa.arq",
    description:
      "Casa de chacra de volúmenes grises con cochera semicubierta y galería al contrafrente. Fachada, contrafrente y los ambientes sociales: comedor con carpintería de hierro y cocina con isla.",
    images: gallery("casa-kevin", [
      "Fachada",
      "Contrafrente",
      "Comedor estar",
      "Cocina",
    ]),
  },
  {
    slug: "minka-playa",
    title: "Minka Playa",
    category: "viviendas",
    kind: "Modelo de vivienda Sur/Atlántica Medium",
    architect: "Arq. Lorena Beliu · Arq. Olivia Gavilán",
    description:
      "Modelo de vivienda modular implantado sobre los médanos frente al mar. Envolvente de chapa oscura, gran ventanal hacia el horizonte e interiores cálidos en madera.",
    images: gallery("minka-playa", [
      "Exterior sobre los médanos",
      "Exterior, vista lateral",
      "Estar con vista al mar",
      "Estar comedor y cocina",
    ]),
    cover: 1,
  },
  {
    slug: "arenas-verdes",
    title: "Arenas Verdes",
    category: "viviendas",
    kind: "Vivienda unifamiliar · Interiores",
    location: "Arenas Verdes, Buenos Aires",
    architect: "Arq. Carolina Rodríguez Robles",
    architectInstagram: "mudar.minicasas",
    description:
      "Interiores de una vivienda unifamiliar en la costa bonaerense. Estar, comedor, cocina y dormitorio resueltos en madera clara, blanco y acentos de azul, con luz natural abundante.",
    images: gallery("arenas-verdes", [
      "Estar comedor",
      "Estar",
      "Cocina comedor",
      "Estar comedor, segunda vista",
      "Comedor con hogar",
      { alt: "Dormitorio", square: true },
    ]),
  },
  {
    slug: "arenas-verdes-ii",
    title: "Arenas Verdes II",
    category: "viviendas",
    kind: "Vivienda unifamiliar",
    location: "Arenas Verdes, Buenos Aires",
    architect: "Arq. Carolina Rodríguez Robles",
    architectInstagram: "mudar.minicasas",
    description:
      "Segunda vivienda para el mismo estudio en Arenas Verdes: una casa de chapa oscura sobre terreno arenoso, vista al atardecer desde tres ángulos. Interiores de cocina, estar y dormitorio.",
    images: gallery("arenas-verdes-ii", [
      "Fachada al atardecer",
      "Fachada, segunda vista",
      "Fachada, tercera vista",
      "Cocina",
      "Estar",
      "Dormitorio",
    ]),
  },
  {
    slug: "casa-condor-82",
    title: "Casa Cóndor 82",
    category: "viviendas",
    kind: "Vivienda unifamiliar",
    location: "Viedma, Río Negro",
    architect: "Estudio L+RR",
    architectInstagram: "luduenarodriguezrobles",
    description:
      "Vivienda de una planta con volúmenes blancos y pileta, vista al anochecer desde el lateral. Dos interiores: cocina comedor y estar abierto al jardín.",
    images: gallery("casa-condor-82", [
      "Fachada lateral al anochecer",
      "Cocina comedor",
      "Estar",
    ]),
  },

  // — Edificios —
  {
    slug: "edificio-rio-centro",
    title: "Edificio Río Centro",
    category: "edificios",
    kind: "Edificio residencial",
    location: "Viedma, Río Negro",
    architect: "Estudio L+RR",
    architectInstagram: "luduenarodriguezrobles",
    description:
      "Edificio residencial en esquina con fachada de ladrillo visto y balcones. Vistas frontal y de ambos laterales, más una serie de interiores de las unidades.",
    images: gallery("edificio-rio-centro", [
      "Fachada",
      "Fachada lateral derecha",
      "Fachada lateral izquierda",
      "Interior de unidad",
      "Interior de unidad, estar comedor",
      "Interior de unidad, comedor",
      "Interior de unidad, estar",
    ]),
  },
  {
    slug: "edificio-guimar",
    title: "Edificio Guimar",
    category: "edificios",
    kind: "Edificio residencial con local comercial",
    location: "Tandil, Buenos Aires",
    architect: "Arq. Magdalena Villalba Ulberich",
    architectInstagram: "arq.villalbaulberich.m",
    description:
      "Edificio con local comercial en planta baja y departamentos en altura. Fachada con postigos de madera, interior del local y dos vistas de la unidad tipo.",
    images: gallery("edificio-guimar", [
      "Fachada",
      "Local comercial",
      "Departamento tipo, estar",
      "Departamento tipo, cocina comedor",
    ]),
  },
  {
    slug: "ak-40-anelo",
    title: "A.K 40",
    category: "edificios",
    kind: "Vivienda multifamiliar",
    location: "Añelo, Neuquén",
    architect: "Arq. Pedro Montes de Oca",
    architectInstagram: "arq.montes_de_oca",
    description:
      "Conjunto de viviendas multifamiliares con cocheras y acceso común. Fachada frontal, pasaje de ingreso al complejo, segunda fachada y el interior de una unidad.",
    images: gallery("ak-40-anelo", [
      "Fachada frontal",
      "Ingreso al complejo",
      "Segunda fachada",
      "Interior de unidad",
    ]),
  },

  // — Interiores y reformas —
  {
    slug: "remodelacion-cocina-comedor",
    title: "Cocina Comedor",
    category: "interiores",
    kind: "Remodelación",
    architect: "Arq. Lorena Beliu",
    description:
      "Remodelación de una cocina comedor integrada. Frente de muebles en madera clara, laterales de heladera y lavarropas resueltos en el mismo lenguaje, y el comedor como remate del espacio.",
    images: gallery("remodelacion-cocina-comedor", [
      { alt: "Frente de cocina", square: true },
      "Lateral con heladera",
      "Lateral con lavarropas",
      { alt: "Comedor", square: true },
    ]),
  },
];

export const imageCount = (p: Project) => p.images.length;

export const coverOf = (p: Project) => p.images[p.cover ?? 0];

export const categoryLabel = (p: Project) =>
  categories.find((c) => c.id === p.category)!.label;

/** Autor de los proyectos propios del estudio (no cuenta como cliente). */
const ownArchitect = "Arq. Jesús Pacheco Vásquez";

/** Arquitectos/estudios externos distintos con los que se trabajó. */
export const studioCount = new Set(
  projects
    .flatMap((p) => p.architect.split(" · "))
    .filter((a) => a !== ownArchitect),
).size;

/** Localidades distintas con ubicación conocida. */
export const locationCount = new Set(
  projects.flatMap((p) => (p.location ? [p.location] : [])),
).size;

/** Provincias distintas (la parte final de la ubicación). */
export const provinceCount = new Set(
  projects.flatMap((p) =>
    p.location ? [p.location.split(",").pop()!.trim()] : [],
  ),
).size;

/** "Ubicación · Año", omitiendo lo que no se conoce. */
export const projectMeta = (p: Project) =>
  [p.location, p.year].filter(Boolean).join(" · ");
