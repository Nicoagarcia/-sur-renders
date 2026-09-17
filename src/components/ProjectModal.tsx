"use client";

import { useEffect } from "react";
import {
  categoryLabel,
  imageCount,
  projectMeta,
  type Project,
} from "@/lib/projects";
import { RenderFrame } from "./RenderFrame";
import { siteConfig, whatsappLink } from "@/lib/site";

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  const count = imageCount(project);
  const meta = projectMeta(project);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-ink/70 px-0 py-0 backdrop-blur-sm sm:px-6 sm:py-10"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-cream sm:rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line bg-cream/95 px-6 py-5 backdrop-blur-md lg:px-10">
          <div>
            <p className="text-[10px] uppercase tracking-widest-xl text-sage-deep">
              {categoryLabel(project)}
            </p>
            <h3 className="mt-1 font-display text-3xl leading-none text-ink">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-stone">
              {project.kind}
              {meta && <> · {meta}</>}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-sand"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-7 lg:px-10 lg:py-9">
          <div className="grid gap-8 lg:grid-cols-12">
            <p className="max-w-2xl text-[15px] leading-relaxed text-stone lg:col-span-8">
              {project.description}
            </p>
            {/* Créditos */}
            <dl className="grid grid-cols-2 gap-4 text-sm lg:col-span-4 lg:grid-cols-1">
              <div>
                <dt className="text-[10px] uppercase tracking-widest-xl text-sage-deep">
                  Proyecto
                </dt>
                <dd className="mt-1 text-ink">{project.architect}</dd>
                {project.architectInstagram && (
                  <dd>
                    <a
                      href={`https://instagram.com/${project.architectInstagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-stone underline-offset-4 transition-colors hover:text-ink hover:underline"
                    >
                      @{project.architectInstagram}
                    </a>
                  </dd>
                )}
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-widest-xl text-sage-deep">
                  Visualización 3D
                </dt>
                <dd className="mt-1 text-ink">{siteConfig.name}</dd>
              </div>
            </dl>
          </div>

          {/* Galería */}
          <p className="mb-3 mt-8 text-[11px] uppercase tracking-widest-xl text-sage-deep">
            Galería · {count} {count === 1 ? "imagen" : "imágenes"}
          </p>
          <div className="gallery-scroll grid grid-cols-1 items-start gap-4 sm:grid-cols-2">
            {project.images.map((img, i) => {
              // La primera imagen abre la galería a todo el ancho; el resto va
              // en dos columnas. Los renders cuadrados conservan su formato.
              const wide = i === 0 && !img.square;
              return (
                <figure
                  key={img.src}
                  className={wide ? "sm:col-span-2" : undefined}
                >
                  <RenderFrame
                    src={img.src}
                    alt={`${project.title} — ${img.alt}`}
                    sizes={
                      wide
                        ? "(max-width: 1024px) 100vw, 1024px"
                        : "(max-width: 640px) 100vw, 512px"
                    }
                    quality={85}
                    className={`w-full ${img.square ? "aspect-square" : "aspect-video"}`}
                  />
                  <figcaption className="mt-2 flex items-baseline justify-between text-xs text-stone">
                    <span>{img.alt}</span>
                    <span className="text-[10px]">
                      {i + 1} / {count}
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-line pt-8">
            <p className="text-sm text-stone">
              ¿Te interesa un proyecto similar?
            </p>
            <a
              href={whatsappLink(
                `Hola ${siteConfig.name}, me interesa un proyecto similar a "${project.title}".`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-sage-deep px-6 py-3 text-sm text-paper transition-colors hover:bg-sage"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
