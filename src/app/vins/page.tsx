import Image from "next/image";
import Link from "next/link";
import { wines } from "@/data/wines";

const COLOR_LABEL: Record<string, string> = {
  blanc: "Blanc",
  rouge: "Rouge",
  bulle: "Crémant",
  rose: "Rosé",
};

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
          src="/photos/vendanges.jpg"
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
                  src={domaine.photo}
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

            {/* Listes de vins par famille */}
            <div className="px-8 md:px-16 py-14 bg-cream">
              {groups.map((group) => (
                <div key={group.label} className="mb-10 last:mb-0">
                  <p className="label-caps text-amber mb-5">{group.label}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y divide-dust md:divide-y-0">
                    {group.wines.map((wine) => (
                      <Link
                        key={wine.id}
                        href={`/vins/${wine.id}`}
                        className="group flex items-center gap-5 py-4 md:py-5 px-0 md:px-4 border-b border-dust hover:bg-dust/40 transition-colors -mx-0 md:-mx-4"
                      >
                        {/* Mini photo ou placeholder */}
                        <div className="w-10 h-14 relative flex-shrink-0 bg-[#EDE8E2] overflow-hidden">
                          {wine.photo ? (
                            <Image
                              src={wine.photo}
                              alt={wine.name}
                              fill
                              className="object-contain p-1"
                              sizes="40px"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center opacity-20">
                              <div className="w-1.5 h-8 bg-ink rounded-t-sm" />
                            </div>
                          )}
                        </div>

                        {/* Infos */}
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-ink text-[15px] leading-snug group-hover:text-amber transition-colors"
                            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                          >
                            {wine.name}
                          </p>
                          <p
                            className="text-stone text-[12px] mt-0.5"
                            style={{ fontFamily: "var(--font-body)" }}
                          >
                            {wine.appellation.replace(/\s*AOC\s*/g, "").trim()}
                            {wine.cru && <span className="ml-2 text-amber/70 capitalize">{wine.cru}</span>}
                          </p>
                        </div>

                        {/* Prix + stock */}
                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                          <p
                            className="text-ink text-[15px]"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {wine.price} €
                          </p>
                          {!wine.inStock && (
                            <span className="text-[10px] tracking-widest uppercase text-stone/50" style={{ fontFamily: "var(--font-body)" }}>
                              Épuisé
                            </span>
                          )}
                        </div>

                        <span className="text-stone/30 group-hover:text-amber transition-colors ml-1">→</span>
                      </Link>
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
