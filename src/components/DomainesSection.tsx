"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const domaines = [
  {
    id: "mauperthuis",
    name: "Domaine de\nMauperthuis",
    region: "Irancy , Saint-Bris , Bourgogne",
    photo: "/photos/domaine-mauperthuis.jpg",
  },
  {
    id: "marronniers",
    name: "Domaine des\nMarronniers",
    region: "Chablis , Crémant , Bourgogne",
    photo: "/photos/domaine-marronniers.jpg",
  },
];

export default function DomainesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("domaines-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="domaines-section relative h-screen bg-ink overflow-hidden"
    >
      {/* Panels */}
      <div className="absolute inset-0 flex">
        {domaines.map((d, i) => (
          <Link
            key={d.id}
            href={`/boutique?label=${d.id}`}
            className={`domaines-panel group relative flex-1 overflow-hidden ${
              i === 0 ? "domaines-panel-left" : "domaines-panel-right"
            }`}
          >
            <Image
              src={d.photo}
              alt={d.name}
              fill
              className="object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700 ease-out"
              sizes="50vw"
              priority
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
            {/* Hover tint */}
            <div className="absolute inset-0 bg-amber/0 group-hover:bg-amber/5 transition-colors duration-500" />

            {/* Text */}
            <div
              className={`domaines-text absolute bottom-0 ${
                i === 0 ? "left-0 pl-12 pr-6" : "right-0 pr-12 pl-6 text-right"
              } pb-14`}
            >
              <p
                className="label-caps text-amber mb-4"
                style={{ letterSpacing: "0.22em" }}
              >
                {d.region}
              </p>
              <p
                className="text-cream text-3xl md:text-[2.6rem] leading-tight whitespace-pre-line"
                style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
              >
                {d.name}
              </p>
              <p className="label-caps text-cream/30 mt-5 group-hover:text-amber transition-colors duration-300">
                Découvrir →
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Vertical divider */}
      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-cream/10 z-10 pointer-events-none" />
    </section>
  );
}
