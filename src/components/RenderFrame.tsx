import Image from "next/image";

/**
 * Marco de render. Con una ruta real (`src`) muestra la imagen optimizada por
 * next/image; sin `src`, dibuja un placeholder en la paleta del estudio
 * (útil mientras un proyecto todavía no tiene renders cargados).
 */

const PALETTES = [
  ["#cdd1c0", "#7c8568"],
  ["#e2dccd", "#9aa085"],
  ["#c7c5b4", "#646d52"],
  ["#dcd6c6", "#878f72"],
  ["#d2cdbb", "#717a5d"],
  ["#e0d9c8", "#8b9479"],
];

export function RenderFrame({
  seed = 0,
  label,
  src,
  alt,
  preload,
  quality,
  className = "",
  sizes,
}: {
  seed?: number;
  label?: string;
  src?: string;
  alt: string;
  /** Precarga la imagen (solo para la que está above-the-fold). */
  preload?: boolean;
  quality?: number;
  className?: string;
  sizes?: string;
}) {
  // Si el caller ya define el posicionamiento (absolute/fixed), no imponemos
  // `relative` para no generar un conflicto de `position`.
  const positioned = /(^|\s)(absolute|fixed)(\s|$)/.test(className);
  const pos = positioned ? "" : "relative";

  if (src) {
    return (
      <div className={`${pos} overflow-hidden bg-sand ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? "100vw"}
          preload={preload}
          quality={quality}
          className="object-cover"
        />
      </div>
    );
  }

  const [from, to] = PALETTES[seed % PALETTES.length];
  const angle = 115 + (seed % 5) * 12;

  return (
    <div
      className={`${pos} overflow-hidden ${className}`}
      style={{ background: `linear-gradient(${angle}deg, ${from}, ${to})` }}
      aria-label={alt}
      role="img"
    >
      {/* Líneas arquitectónicas sutiles */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.18] mix-blend-overlay"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <g stroke="#ffffff" strokeWidth="0.6" fill="none">
          <line x1="0" y1="210" x2="400" y2="150" />
          <line x1="60" y1="300" x2="230" y2="60" />
          <line x1="230" y1="60" x2="400" y2="120" />
          <line x1="230" y1="60" x2="230" y2="300" />
          <line x1="120" y1="300" x2="120" y2="135" />
          <line x1="320" y1="300" x2="320" y2="120" />
        </g>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display text-paper/70 text-[11px] tracking-widest-xl uppercase">
          {label ?? "Render"}
        </span>
      </div>
    </div>
  );
}
