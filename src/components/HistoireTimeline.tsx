"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { imgPath } from "@/lib/imgPath";

const timeline = [
  {
    year: "1993",
    title: "Les premières vignes",
    text: "Laurent plante ses 35 premiers ares sur les terres de François Choné. Deux ans plus tard, en 1995, sort le premier millésime : 500 bouteilles.",
    photo: "/photos/histoire-1993.jpg",
  },
  {
    year: "2009",
    title: "Irancy — Veaupessiot, Mazelot, Palotte",
    text: "Reprise de vignes en Irancy sur des terroirs d'exception.",
    photo: "/photos/histoire-irancy.jpg",
  },
  {
    year: "2013",
    title: "Domaine des Marronniers",
    text: "Reprise du Domaine des Marronniers. Accès au Chablisien.",
    photo: "/photos/histoire-marronniers.jpg",
  },
  {
    year: "2018",
    title: "Conversion biologique & biodynamique",
    text: "Décision de convertir l'ensemble des domaines. Certification officielle demandée en 2019 pour Fontaine-Goby et Mauperthuis, en 2020 pour Marronniers.",
    photo: "/photos/histoire-bio.jpg",
  },
  {
    year: "2022",
    title: "Certifications & vitiforesterie",
    text: "Fontaine-Goby et Mauperthuis certifiés bio. Des arbres sont plantés entre les rangs de vignes pour recréer un équilibre biologique vivant.",
    photo: "/photos/histoire-vitiforesterie.jpg",
  },
  {
    year: "2025",
    title: "La nouvelle génération",
    text: "Louis-Bénigne, fils de Laurent et Marie-Noëlle, crée son propre domaine en Irancy. En conversion biodynamique.",
    photo: "/photos/histoire-lb.jpg",
  },
];

export default function HistoireTimeline() {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const goTo = (i: number) => setActive(Math.max(0, Math.min(timeline.length - 1, i)));

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      goTo(active + (delta < 0 ? 1 : -1));
    }
    touchStartX.current = null;
  }

  return (
    <div className="relative h-screen overflow-hidden bg-ink">
      {/* Frise de progression */}
      <div className="absolute top-28 left-0 right-0 z-20 px-10 md:px-20">
        <div className="relative h-px bg-cream/20 max-w-4xl mx-auto">
          {timeline.map((item, i) => (
            <button
              key={item.year}
              onClick={() => goTo(i)}
              className="absolute -top-2 flex flex-col items-center -translate-x-1/2"
              style={{ left: `${(i / (timeline.length - 1)) * 100}%` }}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i === active ? "bg-amber" : "bg-cream/30 hover:bg-cream/50"
                }`}
              />
              <span
                className={`label-caps mt-2 transition-colors ${
                  i === active ? "text-amber" : "text-cream/30"
                }`}
              >
                {item.year}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${active * 100}%)` }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {timeline.map((item) => (
          <div key={item.year} className="relative w-full h-full flex-shrink-0 flex items-center">
            <Image
              src={imgPath(item.photo)}
              alt=""
              fill
              className="object-cover opacity-30"
              aria-hidden
            />
            <div className="absolute inset-0 bg-ink/60" />

            <div className="relative z-10 px-10 md:px-20 max-w-4xl mx-auto w-full">
              <p className="font-sans font-bold text-[100px] md:text-[160px] text-cream/10 leading-none mb-4 select-none">
                {item.year}
              </p>
              <p className="label-caps text-amber mb-4">{item.year}</p>
              <h2
                className="text-4xl md:text-6xl text-cream font-normal mb-6 leading-tight"
                style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
              >
                {item.title}
              </h2>
              <p className="text-cream/55 leading-loose max-w-xl" style={{ fontFamily: "var(--font-body)", fontSize: "15px" }}>
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Flèches navigation */}
      {active > 0 && (
        <button
          onClick={() => goTo(active - 1)}
          aria-label="Étape précédente"
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 text-cream/40 hover:text-amber transition-colors text-3xl"
        >
          ←
        </button>
      )}
      {active < timeline.length - 1 && (
        <button
          onClick={() => goTo(active + 1)}
          aria-label="Étape suivante"
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 text-cream/40 hover:text-amber transition-colors text-3xl"
        >
          →
        </button>
      )}
    </div>
  );
}
