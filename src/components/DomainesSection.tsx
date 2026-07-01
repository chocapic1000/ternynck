"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { imgPath } from "@/lib/imgPath";
import RevealOnScroll from "@/components/RevealOnScroll";

const domaines = [
  {
    id: "mauperthuis",
    name: "Domaine de\nMauperthuis",
    photo: "/photos/domaine-mauperthuis.jpg",
    href: "/vins?domaine=mauperthuis",
  },
  {
    id: "marronniers",
    name: "Domaine des\nMarronniers",
    photo: "/photos/domaine-marronniers.jpg",
    href: "/vins?domaine=marronniers",
  },
  {
    id: "fontaine-goby",
    name: "Fontaine-Goby",
    photo: "/photos/domaine-fontaine-goby.jpg",
    href: "/domaines",
  },
];

function DomainePanel({ d }: { d: (typeof domaines)[number] }) {
  return (
    <Link
      href={d.href}
      className="group flex flex-col h-full w-[78vw] md:w-[55vw] lg:w-[40vw] flex-shrink-0 py-8 px-3 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber focus-visible:outline-offset-4 rounded-md"
    >
      <div className="relative flex-1 rounded-lg overflow-hidden">
        <Image
          src={imgPath(d.photo)}
          alt={d.name.replace("\n", " ")}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="55vw"
        />
      </div>

      <div className="pt-6 px-1">
        <p
          className="text-cream text-2xl md:text-3xl italic leading-tight"
          style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
        >
          {d.name.replace("\n", " ")}
        </p>
        <p className="label-caps text-amber mt-3 link-ink-group pb-1">
          Découvrir →
        </p>
      </div>
    </Link>
  );
}

export default function DomainesSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxTranslate, setMaxTranslate] = useState(0);

  // Mesure la largeur disponible pour le bandeau (hors panneau de texte fixe)
  // afin de connaître la distance de panoramique nécessaire. Un ResizeObserver
  // (plutôt qu'un simple listener "resize") recapture aussi les changements de
  // largeur dus au contenu (polices/images qui finissent de charger), qui
  // sinon laissaient parfois maxTranslate à une valeur obsolète et cassaient
  // l'animation de panoramique.
  useEffect(() => {
    function measure() {
      const row = rowRef.current;
      const track = trackRef.current;
      if (!row || !track) return;
      setMaxTranslate(Math.max(0, row.scrollWidth - track.clientWidth));
    }
    measure();
    const ro = new ResizeObserver(measure);
    if (rowRef.current) ro.observe(rowRef.current);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Convertit le défilement vertical dans la zone "épinglée" en translation horizontale.
  // Écrit directement le style sur le DOM (pas de setState par frame) pour éviter
  // de déclencher un re-render React à chaque scroll, source des lags.
  useEffect(() => {
    let frame = 0;
    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const wrapper = wrapperRef.current;
        const row = rowRef.current;
        if (!wrapper || !row || maxTranslate <= 0) return;
        const scrollableDistance = wrapper.offsetHeight - window.innerHeight;
        if (scrollableDistance <= 0) return;
        const top = wrapper.getBoundingClientRect().top;
        const progress = Math.min(1, Math.max(0, -top / scrollableDistance));
        row.style.transform = `translateX(-${progress * maxTranslate}px)`;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [maxTranslate]);

  return (
    <>
      {/* ── Desktop : texte fixe à gauche + panoramique horizontal épinglé ── */}
      <div
        ref={wrapperRef}
        className="relative hidden md:block"
        style={{ height: `calc(100vh + ${maxTranslate}px)` }}
      >
        <section className="sticky top-0 h-screen overflow-hidden bg-ink flex">
          {/* Texte fixe, ne défile pas avec les panneaux */}
          <div className="flex flex-col justify-center w-[26vw] min-w-[280px] px-10 lg:px-14 flex-shrink-0">
            <p className="label-caps text-amber mb-5">— Nos domaines</p>
            <h2
              className="text-cream text-3xl md:text-4xl leading-tight mb-5"
              style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
            >
              Trois domaines,
              <br />
              une même famille.
            </h2>
            <p className="text-cream/50 leading-loose text-[13px]" style={{ fontFamily: "var(--font-body)" }}>
              Faites défiler pour les découvrir.
            </p>
          </div>

          {/* Bandeau panoramique */}
          <div ref={trackRef} className="relative flex-1 h-full overflow-hidden">
            <div ref={rowRef} className="flex h-full">
              {domaines.map((d) => (
                <DomainePanel key={d.id} d={d} />
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ── Mobile : défilement horizontal natif ── */}
      <section className="md:hidden bg-ink py-10">
        <div className="px-6 mb-6">
          <p className="label-caps text-amber mb-3">— Nos domaines</p>
          <h2
            className="text-cream text-2xl leading-tight"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            Trois domaines, une même famille.
          </h2>
        </div>
        <RevealOnScroll>
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 pb-2 -mx-2">
            {domaines.map((d) => (
              <div key={d.id} className="snap-center h-[480px]">
                <DomainePanel d={d} />
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </section>
    </>
  );
}
