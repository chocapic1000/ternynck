import Image from "next/image";
import { imgPath } from "@/lib/imgPath";
import Link from "next/link";
import WineCard from "@/components/WineCard";
import DomainesSection from "@/components/DomainesSection";
import Bottle3D from "@/components/Bottle3D";
import { featuredWines } from "@/data/wines";

const domaines = [
  {
    id: "mauperthuis",
    name: "Domaine de Mauperthuis",
    region: "Chablis · Irancy · Saint-Bris",
    accent: "bg-[#3A4A2A]",
    photo: "/photos/domaine-mauperthuis.jpg",
  },
  {
    id: "marronniers",
    name: "Domaine des Marronniers",
    region: "Chablis · Bourgogne",
    accent: "bg-[#4A3A2A]",
    photo: "/photos/domaine-marronniers.jpg",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative h-screen overflow-hidden">
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

        {/* Content positionné à la jonction vigne/bois (~50% du haut) */}
        <div
          className="absolute z-10 px-8 md:px-12 max-w-2xl"
          style={{ top: "44%" }}
        >
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

      </section>

      {/* ── SÉPARATEUR ──────────────────────────────────────────────────────── */}
      <div className="bg-dust h-5" />

      {/* ── DOMAINES ────────────────────────────────────────────────────────── */}
      <DomainesSection />

      {/* ── SÉPARATEUR ──────────────────────────────────────────────────────── */}
      <div className="bg-dust h-5" />

      {/* ── VITRINE 3D ───────────────────────────────────────────────────────── */}
      <section className="bg-ink py-20 px-8 md:px-12 text-center">
        <p className="label-caps text-amber mb-4">Notre savoir-faire</p>
        <h2
          className="text-cream text-3xl md:text-4xl font-normal mb-3"
          style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
        >
          La bouteille en 3D
        </h2>
        <p className="text-cream/40 text-[13px] mb-10" style={{ fontFamily: "var(--font-body)" }}>
          Glissez pour la faire tourner
        </p>
        <div className="flex justify-center">
          <Bottle3D className="relative w-72 h-[420px] md:h-[520px]" />
        </div>
      </section>

      {/* ── SÉPARATEUR ──────────────────────────────────────────────────────── */}
      <div className="bg-dust h-5" />

      {/* ── PHILOSOPHIE ─────────────────────────────────────────────────────── */}
      <section className="grid md:grid-cols-2 min-h-[560px]">
        <div className="relative min-h-[340px] md:min-h-0 bg-[#2A3520] order-2 md:order-1">
          <Image
            src={imgPath("/photos/philosophie.jpg")}
            alt="Laurent Ternynck dans ses vignes à l'aube"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="bg-ink px-10 md:px-16 py-16 md:py-20 flex flex-col justify-center order-1 md:order-2">
          <p className="label-caps text-amber mb-10">Notre philosophie</p>
          <blockquote
            className="text-cream text-2xl md:text-3xl leading-relaxed italic mb-8"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            La vigne ne se commande pas.
            <br />
            Elle s'écoute.
          </blockquote>
          <p className="body-sm text-cream/50 leading-loose mb-8">
            Depuis 2018, l'ensemble de nos domaines est en conversion biologique
            et biodynamique. Nous plantons des arbres entre les rangs de vignes,
            la vitiforesterie, pour recréer un équilibre vivant et affiner
            naturellement la maturité des raisins.
          </p>
          <div className="flex items-center gap-5 flex-wrap">
            <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/logos/bio.png`} alt="Agriculture Biologique" className="h-16 w-auto flex-shrink-0" />
            <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/logos/demeter2.png`} alt="Demeter Bio-Dynamic" className="h-16 w-auto flex-shrink-0" />
            <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/logos/demeter.png`} alt="Demeter Biodynamie" className="h-16 w-auto flex-shrink-0" />
            <p className="label-caps text-sage">Biologique, Biodynamique, Vitiforesterie</p>
          </div>
        </div>
      </section>

      {/* ── VINS SÉLECTION ──────────────────────────────────────────────────── */}
      <section className="py-20 px-8 md:px-12 bg-dust">
        <div className="flex justify-between items-end mb-12">
          <h2
            className="text-ink text-3xl md:text-4xl font-normal"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            Les vins du moment
          </h2>
          <Link
            href="/boutique"
            className="label-caps text-amber border-b border-amber pb-0.5 hidden md:block hover:opacity-70 transition-opacity"
          >
            Voir toute la boutique →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 items-start">
          {featuredWines.map((wine) => (
            <WineCard key={wine.id} wine={wine} />
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link
            href="/boutique"
            className="label-caps text-amber border-b border-amber pb-0.5"
          >
            Voir toute la boutique →
          </Link>
        </div>
      </section>

      {/* ── HISTOIRE TEASER ─────────────────────────────────────────────────── */}
      <section className="relative py-28 px-8 md:px-12 bg-ink overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src={imgPath("/photos/vendanges.jpg")}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            aria-hidden
          />
        </div>
        <div className="relative z-10 max-w-xl">
          <p className="label-caps text-amber mb-6">1993, 2025</p>
          <h2
            className="text-cream text-4xl md:text-5xl leading-tight font-normal mb-6"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            Trente ans de vignes,
            <br />
            une famille entière.
          </h2>
          <p className="body-sm text-cream/50 leading-loose mb-10">
            Laurent a planté ses premières vignes en 1993. Marie-Noëlle l'a rejoint,
            puis leurs enfants ont grandi entre les trailles et la cuverie. Aujourd'hui
            la famille cultive deux domaines en Bourgogne, et Louis-Bénigne vient
            d'écrire son premier chapitre à Irancy.
          </p>
          <Link
            href="/histoire"
            className="inline-flex items-center gap-3 label-caps text-cream border-b border-cream/30 pb-1 hover:border-amber hover:text-amber transition-colors"
          >
            Lire l'histoire <span>→</span>
          </Link>
        </div>

        <p
          className="absolute right-8 md:right-12 bottom-10 font-bold text-[120px] md:text-[180px] text-cream/5 leading-none select-none"
          style={{ fontFamily: "var(--font-body)" }}
          aria-hidden
        >
          1993
        </p>
      </section>
    </>
  );
}
