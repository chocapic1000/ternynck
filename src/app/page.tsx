import Image from "next/image";
import { imgPath } from "@/lib/imgPath";
import Link from "next/link";
import WineCard from "@/components/WineCard";
import DomainesSection from "@/components/DomainesSection";
import HeroContent from "@/components/HeroContent";
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
      <HeroContent />

      {/* ── SÉPARATEUR ──────────────────────────────────────────────────────── */}
      <div className="bg-dust h-5" />

      {/* ── DOMAINES ────────────────────────────────────────────────────────── */}
      <DomainesSection />

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
            className="label-caps text-amber link-ink pb-2 hidden md:block"
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
            className="label-caps text-amber link-ink pb-2"
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
