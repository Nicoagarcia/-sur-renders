"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ProjectImage } from "@/lib/projects";

const MIN = 1;
const MAX = 4;

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

/**
 * Visor a pantalla completa para "ingresar" a un render: zoom con la rueda,
 * doble clic o pellizco, arrastre para recorrer la imagen y flechas para
 * pasar a la siguiente.
 */
export function ImageViewer({
  images,
  title,
  index,
  onIndex,
  onClose,
}: {
  images: ProjectImage[];
  title: string;
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  // Punteros activos (mouse o dedos) para arrastre y pellizco.
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ dist: number; scale: number } | null>(null);

  const img = images[index];
  const count = images.length;

  const reset = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  const go = (step: number) => {
    reset();
    onIndex((index + step + count) % count);
  };

  /** Limita el desplazamiento para que la imagen no se salga del visor. */
  const bound = (x: number, y: number, s: number) => {
    const el = stage.current;
    if (!el || s <= 1) return { x: 0, y: 0 };
    const mx = (el.clientWidth * (s - 1)) / 2;
    const my = (el.clientHeight * (s - 1)) / 2;
    return { x: clamp(x, -mx, mx), y: clamp(y, -my, my) };
  };

  const zoomTo = (next: number) => {
    const s = clamp(next, MIN, MAX);
    setScale(s);
    setOffset((o) => bound((o.x * s) / scale, (o.y * s) / scale, s));
  };

  useEffect(() => {
    // En captura sobre window: corre antes que el Escape del modal y lo frena,
    // así Escape cierra solo el visor.
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "+" || e.key === "=") zoomTo(scale + 0.5);
      else if (e.key === "-") zoomTo(scale - 0.5);
      else return;
      e.stopPropagation();
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  });

  useEffect(() => {
    // La rueda necesita un listener no pasivo para poder cancelar el scroll.
    const el = stage.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoomTo(scale * (e.deltaY < 0 ? 1.15 : 1 / 1.15));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  });

  const onPointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinch.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), scale };
    }
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const prev = pointers.current.get(e.pointerId);
    if (!prev) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2 && pinch.current) {
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      zoomTo((pinch.current.scale * dist) / pinch.current.dist);
      return;
    }
    if (scale > 1) {
      setOffset((o) =>
        bound(o.x + e.clientX - prev.x, o.y + e.clientY - prev.y, scale),
      );
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
    if (pointers.current.size === 0) setDragging(false);
  };

  const control =
    "flex h-11 w-11 items-center justify-center rounded-full border border-paper/30 text-paper transition-colors hover:bg-paper/15 disabled:opacity-30";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — ${img.alt}`}
      // Vive dentro del modal: que los clics no lleguen a su fondo (que cierra).
      onClick={(e) => e.stopPropagation()}
      className="fixed inset-0 z-[70] flex flex-col bg-ink/95 backdrop-blur-sm"
    >
      {/* Barra superior */}
      <div className="flex items-center justify-between gap-4 px-5 py-4 text-paper sm:px-8">
        <p className="min-w-0 truncate text-sm">
          <span className="font-display text-lg">{title}</span>
          <span className="text-paper/60"> · {img.alt}</span>
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={() => zoomTo(scale - 0.5)}
            disabled={scale <= MIN}
            aria-label="Alejar"
            className={control}
          >
            −
          </button>
          <span className="w-12 text-center text-xs tabular-nums text-paper/70">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => zoomTo(scale + 0.5)}
            disabled={scale >= MAX}
            aria-label="Acercar"
            className={control}
          >
            +
          </button>
          <button
            onClick={onClose}
            aria-label="Salir de la foto"
            className={`${control} ml-2`}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Imagen */}
      <div
        ref={stage}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDoubleClick={() => (scale > 1 ? reset() : zoomTo(2.5))}
        className={`relative flex-1 touch-none select-none overflow-hidden ${
          scale > 1
            ? dragging
              ? "cursor-grabbing"
              : "cursor-grab"
            : "cursor-zoom-in"
        }`}
      >
        <div
          className={`absolute inset-0 ${
            dragging ? "" : "transition-transform duration-300 ease-[var(--ease-soft)]"
          }`}
          style={{
            transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})`,
          }}
        >
          <Image
            key={img.src}
            src={img.src}
            alt={`${title} — ${img.alt}`}
            fill
            sizes="100vw"
            quality={90}
            draggable={false}
            className="object-contain"
          />
        </div>
      </div>

      {/* Navegación */}
      <div className="flex items-center justify-between gap-4 px-5 py-4 text-paper sm:px-8">
        <button
          onClick={() => go(-1)}
          disabled={count < 2}
          aria-label="Foto anterior"
          className={control}
        >
          ←
        </button>
        <p className="text-center text-[11px] uppercase tracking-widest text-paper/50">
          <span className="hidden sm:inline">
            Rueda o doble clic para hacer zoom · arrastrá para recorrer ·{" "}
          </span>
          {index + 1} / {count}
        </p>
        <button
          onClick={() => go(1)}
          disabled={count < 2}
          aria-label="Foto siguiente"
          className={control}
        >
          →
        </button>
      </div>
    </div>
  );
}
