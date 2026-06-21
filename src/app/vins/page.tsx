import Image from "next/image";
import Link from "next/link";
import { imgPath } from "@/lib/imgPath";
import { wines } from "@/data/wines";
import WineCard from "@/components/WineCard";

const DOMAINES = [
  {
    label: "mauperthuis" as const,
    name: "Domaine de Mauperthuis",
    subtitle: "Irancy · Saint-Bris · Bourgogne",
    photo: "/photos/domaine-mauperthuis.jpg",
    description: "Rouges d'Irancy, blancs de Saint-Bris et collection amphore. Le cœur historique du domaine familial.",
  },
  {
    label: "marronniers" as const,
    name: "Domaine des Marronniers",
    subtitle: "Chablis · Crémant · Bourgogne",
    photo: "/photos/domaine-marronniers.jpg",
    description: "Du Petit Chablis au Grand Cru Valmur, en passant par les Premiers Crus et le Crémant de Bourgogne.",
  },
];

export default function VinsPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* ── Hero ── */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src={imgPath("/photos/vendanges.jpg")}
          alt="Vendanges Ternynck"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-ink/55" />
        <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-12 pb-12">
          <p className="label-caps text-cream/50 mb-3">— Les vins</p>
          <h1
            className="text-cream text-4xl md:text-6xl font-normal leading-tight"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            Notre catalogue
          </h1>
        </div>
      </div>

      {/* ── Domaines ── */}
      {DOMAINES.map((domaine) => {
        const domaineWines = wines.filter((w) => w.labels[0] === domaine.label);
        const blancs = domaineWines.filter((w) => w.color === "blanc" && w.category === "standard");
        const rouges = domaineWines.filter((w) => w.color === "rouge" && w.category === "standard");
        const bulles = domaineWines.filter((w) => w.color === "bulle" || w.color === "rose");
        const amphores = domaineWines.filter((w) => w.category === "amphore");

        const groups = [
          { label: "Blancs", wines: blancs },
          { label: "Rouges", wines: rouges },
          { label: "Crémant & Rosé", wines: bulles },
          { label: "Collection Amphore", wines: amphores },
        ].filter((g) => g.wines.length > 0);

        return (
          <section key={domaine.label} className="border-b border-dust last:border-0">
            {/* En-tête domaine */}
            <div className="grid md:grid-cols-2 min-h-[280px]">
              <div className="relative overflow-hidden min-h-[200px]">
                <Image
                  src={imgPath(domaine.photo)}
                  alt={domaine.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-ink/40" />
              </div>
              <div className="px-10 md:px-16 py-14 flex flex-col justify-center bg-ink">
                <p className="label-caps text-amber mb-3">{domaine.subtitle}</p>
                <h2
                  className="text-cream text-3xl md:text-4xl font-normal mb-4 leading-tight"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                >
                  {domaine.name}
                </h2>
                <p className="text-cream/50 leading-loose mb-6" style={{ fontFamily: "var(--font-body)", fontSize: "14px" }}>
                  {domaine.description}
                </p>
                <Link
                  href={`/boutique?label=${domaine.label}`}
                  className="inline-flex items-center gap-3 label-caps text-amber border-b border-amber pb-0.5 w-fit hover:opacity-70 transition-opacity"
                >
                  Commander →
                </Link>
              </div>
            </div>

            {/* Grilles de vins par famille */}
            <div className="px-8 md:px-16 py-14 bg-cream">
              {groups.map((group) => (
                <div key={group.label} className="mb-14 last:mb-0">
                  <p className="label-caps text-amber mb-6">{group.label}</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
                    {group.wines.map((wine) => (
                      <WineCard key={wine.id} wine={wine} showPrice={false} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
