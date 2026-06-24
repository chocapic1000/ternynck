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
    region: "Irancy , Saint-Bris , Bourgogne",
    photo: "/photos/domaine-mauperthuis.jpg",
    href: "/boutique?label=mauperthuis",
  },
  {
    id: "marronniers",
    name: "Domaine des\nMarronniers",
    region: "Chablis , Crémant , Bourgogne",
    photo: "/photos/domaine-marronniers.jpg",
    href: "/boutique?label=marronniers",
  },
  {
    id: "fontaine-goby",
    name: "Domaine\nFontaine-Goby",
    region: "Bourgogne , Bio depuis 2019",
    photo: "/photos/domaine-fontaine-goby.jpg",
    href: "/domaines",
  },
];

function DomainePanel({ d }: { d: (typeof domaines)[number] }) {
  return (
    <Link
      href={d.href}
      className="group relative h-full w-[78vw] md:w-[55vw] lg:w-[40vw] flex-shrink-0 overflow-hidden"
    >
      <Image
        src={imgPath(d.photo)}
        alt={d.name}
        fill
        className="object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700 ease-out"
        sizes="55vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
      <div className="absolute inset-0 bg-amber/0 group-hover:bg-amber/5 transition-colors duration-500" />

      <div className="absolute bottom-0 left-0 pl-10 pr-6 pb-14">
        <p className="label-caps text-amber mb-4" style={{ letterSpacing: "0.22em" }}>
          {d.region}
        </p>
        <p
          className="text-cream text-3xl md:text-[2.4rem] leading-tight whitespace-pre-line"
          style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
        >
          {d.name}
        </p>
        <p className="label-caps text-cream/30 mt-5 group-hover:text-amber transition-colors duration-300">
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
  const [translate, setTranslate] = useState(0);

  // Mesure la largeur disponible pour le bandeau (hors panneau de texte fixe)
  // afin de connaître la distance de panoramique nécessaire.
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
            <div
              ref={rowRef}
              className="flex h-full"
              style={{ transform: `translateX(-${translate}px)` }}
            >
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
