"use client";

import { useState } from "react";
import { siteConfig, whatsappLink } from "@/lib/site";
import { Reveal } from "./Reveal";

export function Contact() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    tipo: "Render arquitectónico",
    mensaje: "",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hola ${siteConfig.name}, soy ${form.nombre}.
Tipo de proyecto: ${form.tipo}.
${form.mensaje}
${form.email ? `\nMi email: ${form.email}` : ""}`;
    window.open(whatsappLink(text), "_blank", "noopener");
  };

  // La sección tiene fondo sage-deep: los campos van en tonos claros.
  const field =
    "w-full border-b border-paper/30 bg-transparent py-3 text-paper placeholder:text-paper/60 focus:border-paper focus:outline-none transition-colors";

  return (
    <section id="contacto" className="bg-sage-deep py-24 text-paper lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:gap-24 lg:px-10">
        <Reveal>
          <p className="mb-4 text-[11px] uppercase tracking-widest-xl text-paper/60">
            Contacto
          </p>
          <h2 className="font-display text-4xl font-light leading-tight sm:text-5xl">
            Contemos tu próximo
            <br />
            proyecto.
          </h2>
          <p className="mt-7 max-w-md text-[15px] leading-relaxed text-paper/75">
            Escribinos por el canal que prefieras y coordinamos una primera
            conversación. Respondemos a la brevedad.
          </p>

          <div className="mt-10 space-y-4">
            <a
              href={whatsappLink(`Hola ${siteConfig.name}, quiero hacer una consulta.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 border-b border-paper/20 pb-4"
            >
              <span className="text-xs uppercase tracking-widest text-paper/50">
                WhatsApp
              </span>
              <span className="ml-auto text-paper/90 transition-colors group-hover:text-paper">
                {siteConfig.contact.whatsappLabel}
              </span>
            </a>
            <a
              href={siteConfig.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 border-b border-paper/20 pb-4"
            >
              <span className="text-xs uppercase tracking-widest text-paper/50">
                Instagram
              </span>
              <span className="ml-auto text-paper/90 transition-colors group-hover:text-paper">
                @{siteConfig.contact.instagram}
              </span>
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="group flex items-center gap-4 border-b border-paper/20 pb-4"
            >
              <span className="text-xs uppercase tracking-widest text-paper/50">
                Email
              </span>
              <span className="ml-auto break-all text-right text-paper/90 transition-colors group-hover:text-paper">
                {siteConfig.contact.email}
              </span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <form onSubmit={onSubmit} className="space-y-7">
            <input
              required
              placeholder="Nombre"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              className={field}
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={field}
            />
            <select
              value={form.tipo}
              onChange={(e) => setForm({ ...form, tipo: e.target.value })}
              className={`${field} appearance-none`}
            >
              {[
                "Render arquitectónico",
                "Reforma",
                "Recorrido virtual",
                "Proyecto completo",
                "Otro",
              ].map((o) => (
                <option key={o} className="bg-sage-deep text-paper">
                  {o}
                </option>
              ))}
            </select>
            <textarea
              required
              rows={4}
              placeholder="Contanos sobre tu proyecto"
              value={form.mensaje}
              onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
              className={`${field} resize-none`}
            />
            <button
              type="submit"
              className="group inline-flex items-center gap-3 bg-paper px-8 py-3.5 text-sm tracking-wide text-ink transition-colors duration-300 hover:bg-sage hover:text-paper"
            >
              Enviar consulta
            </button>
            <p className="text-xs text-paper/50">
              Al enviar se abrirá WhatsApp con tu mensaje listo para enviar.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
