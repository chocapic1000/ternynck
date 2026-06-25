"use client";

import { useEffect, useRef, useState } from "react";
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

function Slide({ item }: { item: (typeof timeline)[number] }) {
  return (
    <div className="relative w-full h-full flex-shrink-0 flex items-center">
      <Image src={imgPath(item.photo)} alt="" fill className="object-cover opacity-30" aria-hidden />
      <div className="absolute inset-0 bg-ink/60" />

      <div className="relative z-10 px-10 md:px-20 max-w-4xl mx-auto w-full">
        <p className="font-sans font-bold text-[100px] md:text-[160px] text-cream/10 leading-none mb-4 select-none">
          {item.year}
        </p>
        <p className="label-caps text-cream/40 mb-4">{item.year}</p>
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
  );
}

export default function HistoireTimeline() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [maxTranslate, setMaxTranslate] = useState(0);
  const [translate, setTranslate] = useState(0);

  // Mesure la largeur totale du bandeau de slides pour connaître la distance
  // de panoramique nécessaire (même logique que DomainesSection).
  useEffect(() => {
    function measure() {
      const row = rowRef.current;
      const track = trackRef.current;
      if (!row || !track) return;
      setMaxTranslate(Math.max(0, row.scrollWidth - track.clientWidth));
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Convertit le défilement vertical dans la zone "épinglée" en translation horizontale.
  useEffect(() => {
    let frame = 0;
    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper || maxTranslate <= 0) return;
        const scrollableDistance = wrapper.offsetHeight - window.innerHeight;
        if (scrollableDistance <= 0) return;
        const top = wrapper.getBoundingClientRect().top;
        const progress = Math.min(1, Math.max(0, -top / scrollableDistance));
        setTranslate(progress * maxTranslate);
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [maxTranslate]);

  const progress = maxTranslate > 0 ? translate / maxTranslate : 0;
  const active = Math.round(progress * (timeline.length - 1));

  function goTo(i: number) {
    const wrapper = wrapperRef.current;
    if (!wrapper || maxTranslate <= 0) return;
    const clamped = Math.max(0, Math.min(timeline.length - 1, i));
    const scrollableDistance = wrapper.offsetHeight - window.innerHeight;
    const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
    const target = wrapperTop + (clamped / (timeline.length - 1)) * scrollableDistance;
    window.scrollTo({ top: target, behavior: "smooth" });
  }

  return (
    <>
      {/* ── Desktop : panoramique horizontal épinglé au scroll ── */}
      <div
        ref={wrapperRef}
        className="relative hidden md:block"
        style={{ height: `calc(100vh + ${maxTranslate}px)` }}
      >
        <section className="sticky top-0 h-screen overflow-hidden bg-ink">
          {/* Frise de progression : pas de couleur, seulement taille / poids / soulignement */}
          <div className="absolute top-28 left-0 right-0 z-20 px-10 md:px-20">
            <div className="flex justify-between items-baseline max-w-4xl mx-auto">
              {timeline.map((item, i) => (
                <button key={item.year} onClick={() => goTo(i)} className="group cursor-pointer">
                  <span
                    className={`inline-block transition-all duration-300 ${
                      i === active
                        ? "text-cream text-sm font-semibold border-b border-cream pb-1.5"
                        : "text-cream/30 text-[11px] group-hover:text-cream/50"
                    }`}
                    style={{ fontFamily: "var(--font-body)", letterSpacing: "0.14em" }}
                  >
                    {item.year}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Bandeau panoramique */}
          <div ref={trackRef} className="relative h-full overflow-hidden">
            <div ref={rowRef} className="flex h-full" style={{ transform: `translateX(-${translate}px)` }}>
              {timeline.map((item) => (
                <div key={item.year} className="w-screen h-full flex-shrink-0">
                  <Slide item={item} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ── Mobile : défilement horizontal natif ── */}
      <section className="md:hidden bg-ink">
        <div className="flex overflow-x-auto snap-x snap-mandatory">
          {timeline.map((item) => (
            <div key={item.year} className="snap-center w-screen h-[640px] flex-shrink-0">
              <Slide item={item} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
