"use client";

import { useState } from "react";
import Image from "next/image";
import { imgPath } from "@/lib/imgPath";

const VISIT_TYPES = ["Dégustation"];

const CRENEAUX = [
  "9h00", "10h00", "11h00", "14h00", "15h00", "16h00",
];

const INFOS = [
  {
    label: "Adresse",
    value: "3 Grande Rue de Chablis\n89800 Préhy, France",
  },
  {
    label: "Horaires",
    value: "Lundi – Vendredi\n9h – 17h",
  },
  {
    label: "Téléphone",
    value: "03 86 41 42 70",
  },
  {
    label: "Email",
    value: "ternynck@hotmail.com",
  },
];

type FormState = {
  nom: string;
  email: string;
  telephone: string;
  personnes: string;
  date: string;
  heure: string;
  type: string;
  message: string;
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    nom: "",
    email: "",
    telephone: "",
    personnes: "2",
    date: "",
    heure: "",
    type: VISIT_TYPES[0],
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  function validate() {
    const e: Record<string, string> = {};
    if (!form.nom.trim()) e.nom = "Nom requis";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Email invalide";
    if (!form.telephone.trim()) e.telephone = "Téléphone requis";
    if (!form.date) e.date = "Date requise";
    if (!form.heure) e.heure = "Créneau requis";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/MON_ID_FORMSPREE", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  function field(id: keyof FormState, label: string, required = true) {
    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={id}
          className="text-[11px] tracking-widest uppercase text-ink/60"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {label}{required && <span className="text-amber ml-1">*</span>}
        </label>
        <input
          id={id}
          name={id}
          value={form[id]}
          onChange={(ev) => setForm({ ...form, [id]: ev.target.value })}
          className={`bg-transparent border-b py-3 text-ink text-[15px] outline-none transition-colors focus:border-amber placeholder:text-ink/20 ${
            errors[id] ? "border-red-400" : "border-stone/60"
          }`}
          style={{ fontFamily: "var(--font-body)" }}
        />
        {errors[id] && (
          <p className="text-red-400 text-[11px]" style={{ fontFamily: "var(--font-body)" }}>
            {errors[id]}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* ── En-tête avec photo de fond ── */}
      <div className="relative h-72 md:h-[420px] overflow-hidden">
        <Image
          src={imgPath("/photos/histoire-irancy.jpg")}
          alt="Vignes Domaine Ternynck"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-ink/55" />
        <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-12 pb-12">
          <p className="label-caps text-cream/50 mb-3">— Nous visiter</p>
          <h1
            className="text-cream text-4xl md:text-6xl font-normal leading-tight"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            Découvrez nos vins.
          </h1>
          <p className="text-cream/60 mt-4 max-w-xl leading-loose text-lg" style={{ fontFamily: "var(--font-body)" }}>
            Nous vous accueillons sur rendez-vous du lundi au vendredi,
            et le week-end sur rendez-vous.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-0">
        {/* ── SECTION 1 : Infos pratiques + carte ── */}
        <div className="px-8 md:px-12 py-16 border-r border-dust">
          <h2
            className="text-ink text-2xl font-normal mb-10"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            Informations pratiques
          </h2>

          <div className="space-y-7 mb-12">
            {INFOS.map((info) => (
              <div key={info.label} className="flex gap-6">
                <p
                  className="text-[10px] tracking-widest uppercase text-amber w-24 flex-shrink-0 pt-0.5"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {info.label}
                </p>
                <p
                  className="text-ink text-[15px] leading-relaxed whitespace-pre-line"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {info.value}
                </p>
              </div>
            ))}
          </div>

          {/* Carte Google Maps */}
          <div className="relative w-full mb-10 overflow-hidden" style={{ aspectRatio: "4/3" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2647.5!2d3.7283!3d47.7783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47ee9c8d6f3b5c4f%3A0x0!2s3%20Grande%20Rue%20de%20Chablis%2C%2089800%20Pr%C3%A9hy%2C%20France!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
              width="100%"
              height="100%"
              style={{ border: 0, position: "absolute", inset: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Carte Domaine Ternynck"
            />
          </div>

          {/* Accès */}
          <div className="bg-dust px-6 py-5 space-y-3">
            <p className="label-caps text-amber mb-3">Accès & stationnement</p>
            <p className="text-ink/60 leading-relaxed text-[14px]" style={{ fontFamily: "var(--font-body)" }}>
              <span className="text-ink/80">En voiture</span> — Depuis Chablis, prendre la D91
              en direction de Préhy. Le domaine se trouve sur la Grande Rue,
              panneau Famille Ternynck sur la droite.
            </p>
            <p className="text-ink/60 leading-relaxed text-[14px]" style={{ fontFamily: "var(--font-body)" }}>
              <span className="text-ink/80">Stationnement</span> — Parking gratuit devant
              le domaine, places disponibles sur la rue.
            </p>
          </div>
        </div>

        {/* ── SECTION 2 : Formulaire de réservation ── */}
        <div className="px-8 md:px-12 py-16">
          <h2
            className="text-ink text-2xl font-normal mb-10"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            Réserver une dégustation
          </h2>

          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-20 text-center gap-6">
              <div className="w-14 h-14 rounded-full bg-sage/20 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7A8C72" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p
                className="text-ink text-xl font-normal"
                style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
              >
                Demande envoyée
              </p>
              <p className="text-stone max-w-xs leading-loose text-[15px]" style={{ fontFamily: "var(--font-body)" }}>
                Votre demande a bien été envoyée, nous vous répondrons rapidement.
              </p>
              <button
                onClick={() => {
                  setStatus("idle");
                  setForm({ nom: "", email: "", telephone: "", personnes: "2", date: "", heure: "", type: VISIT_TYPES[0], message: "" });
                }}
                className="label-caps text-amber border-b border-amber pb-0.5 hover:opacity-70 transition-opacity"
              >
                Nouvelle demande →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-7" noValidate>
              {field("nom", "Nom complet")}
              {field("email", "Email")}
              {field("telephone", "Téléphone")}

              {/* Nombre de personnes */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="personnes"
                  className="text-[11px] tracking-widest uppercase text-ink/60"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Nombre de personnes
                </label>
                <select
                  id="personnes"
                  name="personnes"
                  value={form.personnes}
                  onChange={(e) => setForm({ ...form, personnes: e.target.value })}
                  className="bg-transparent border-b border-stone/60 py-3 text-ink text-[15px] outline-none focus:border-amber appearance-none cursor-pointer"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {["1", "2", "3", "4", "5", "6", "7", "8+"].map((n) => (
                    <option key={n} value={n}>{n} {n === "1" ? "personne" : "personnes"}</option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="date"
                  className="text-[11px] tracking-widest uppercase text-ink/60"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Date souhaitée<span className="text-amber ml-1">*</span>
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={form.date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className={`bg-transparent border-b py-3 text-ink text-[15px] outline-none focus:border-amber ${
                    errors.date ? "border-red-400" : "border-stone/60"
                  }`}
                  style={{ fontFamily: "var(--font-body)" }}
                />
                {errors.date && (
                  <p className="text-red-400 text-[11px]" style={{ fontFamily: "var(--font-body)" }}>
                    {errors.date}
                  </p>
                )}
              </div>

              {/* Créneau horaire */}
              <div className="flex flex-col gap-3">
                <label
                  className="text-[11px] tracking-widest uppercase text-ink/60"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Créneau souhaité<span className="text-amber ml-1">*</span>
                  <span className="text-stone/40 ml-2 normal-case tracking-normal text-[10px]">durée 1h</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {CRENEAUX.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setForm({ ...form, heure: c })}
                      className={`py-2.5 text-[13px] border transition-colors ${
                        form.heure === c
                          ? "border-amber bg-amber text-cream"
                          : "border-stone/40 text-ink/60 hover:border-ink hover:text-ink"
                      }`}
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                {errors.heure && (
                  <p className="text-red-400 text-[11px]" style={{ fontFamily: "var(--font-body)" }}>
                    {errors.heure}
                  </p>
                )}
              </div>

              {/* Type de dégustation */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="type"
                  className="text-[11px] tracking-widest uppercase text-ink/60"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Type de dégustation
                </label>
                <select
                  id="type"
                  name="type"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="bg-transparent border-b border-stone/60 py-3 text-ink text-[15px] outline-none focus:border-amber appearance-none cursor-pointer"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {VISIT_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="message"
                  className="text-[11px] tracking-widest uppercase text-ink/60"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Message / demande spéciale
                  <span className="text-stone/50 ml-2 normal-case tracking-normal text-[10px]">optionnel</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="bg-transparent border-b border-stone/60 py-3 text-ink text-[15px] outline-none focus:border-amber resize-none placeholder:text-ink/20"
                  style={{ fontFamily: "var(--font-body)" }}
                  placeholder="Allergies, préférences, questions particulières…"
                />
              </div>

              {status === "error" && (
                <p className="text-red-400 text-[14px]" style={{ fontFamily: "var(--font-body)" }}>
                  Une erreur est survenue. Veuillez réessayer ou nous écrire à ternynck@hotmail.com.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-ink text-cream label-caps py-4 hover:bg-amber transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {status === "sending" ? "Envoi en cours…" : "Envoyer la demande →"}
              </button>

              <p className="text-stone/60 text-center text-[13px]" style={{ fontFamily: "var(--font-body)" }}>
                Champs marqués <span className="text-amber">*</span> obligatoires
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
