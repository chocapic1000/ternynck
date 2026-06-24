"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { imgPath } from "@/lib/imgPath";

export default function HeroContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const height = sectionRef.current?.offsetHeight || window.innerHeight;
        const p = Math.min(1, Math.max(0, window.scrollY / (height * 0.7)));
        setProgress(p);
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-dvh overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 bg-[#2A3520]">
        <Image
          src={imgPath("/photos/hero.jpg")}
          alt="Vignes au coucher du soleil, Domaine Ternynck"
          fill
          className="object-cover opacity-80"
          priority
          sizes="100vw"
        />
      </div>

      {/* Gradient léger uniquement en bas pour lisibilité du texte */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/50" />

      {/* Contenu centré, qui s'efface vers le haut au défilement */}
      <div
        className="absolute inset-0 z-10 flex items-center justify-center px-8 md:px-12 text-center"
        style={{
          transform: `translateY(${-progress * 100}vh)`,
          opacity: 1 - progress,
        }}
      >
        <div className="max-w-2xl flex flex-col items-center">
          <p
            className="mb-4 text-[11px] tracking-[0.28em] uppercase text-white"
            style={{ fontFamily: "var(--font-body)", textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}
          >
            Chablis, Irancy, Bourgogne, depuis 1993
          </p>
          <h1
            className="text-cream text-5xl md:text-7xl leading-[1.06] font-normal mb-6"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500, textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}
          >
            Famille Ternynck
          </h1>
          <p
            className="text-cream/70 max-w-md mb-8 leading-loose text-[13px]"
            style={{ fontFamily: "var(--font-body)", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
          >
            Vins biologiques et biodynamiques du nord de la Bourgogne.
            Viticulture vivante, terroirs d'exception, domaine familial.
          </p>
          <Link
            href="/domaines"
            className="inline-flex items-center gap-3 text-cream border-b border-cream/40 pb-1 hover:border-amber hover:text-amber transition-colors text-[10px] tracking-[0.22em] uppercase"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Découvrir le domaine <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
