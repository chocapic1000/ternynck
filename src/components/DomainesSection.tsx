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
      className="group relative h-full w-[78vw] md:w-[60vw] lg:w-[44vw] flex-shrink-0 overflow-hidden"
    >
      <Image
        src={imgPath(d.photo)}
        alt={d.name}
        fill
        className="object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700 ease-out"
        sizes="60vw"
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
  const [maxTranslate, setMaxTranslate] = useState(0);
  const [translate, setTranslate] = useState(0);

  // Mesure la largeur totale du bandeau pour connaître la distance de panoramique.
  useEffect(() => {
    function measure() {
      const row = rowRef.current;
      if (!row) return;
      setMaxTranslate(Math.max(0, row.scrollWidth - window.innerWidth));
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
      {/* ── Desktop : panoramique horizontal épinglé au scroll ── */}
      <div
        ref={wrapperRef}
        className="relative hidden md:block"
        style={{ height: `calc(100vh + ${maxTranslate}px)` }}
      >
        <section className="sticky top-0 h-screen overflow-hidden bg-ink">
          <div
            ref={rowRef}
            className="flex h-full"
            style={{ transform: `translateX(-${translate}px)` }}
          >
            {domaines.map((d) => (
              <DomainePanel key={d.id} d={d} />
            ))}
          </div>
        </section>
      </div>

      {/* ── Mobile : défilement horizontal natif ── */}
      <section className="md:hidden bg-ink py-10">
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
