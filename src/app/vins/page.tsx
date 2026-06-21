import Image from "next/image";
import Link from "next/link";
import { imgPath } from "@/lib/imgPath";
import { wines, type Wine } from "@/data/wines";

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

function stripAOC(appellation: string) {
  return appellation.replace(/\s*AOC\s*/g, "").trim();
}

function excerpt(text: string | undefined, max = 130) {
  if (!text) return "";
  const firstSentence = text.split(/(?<=[.!?])\s/)[0];
  if (firstSentence.length <= max) return firstSentence;
  return text.slice(0, max).trim() + "…";
}

function groupByAppellation(domaineWines: Wine[]) {
  const order: string[] = [];
  const groups = new Map<string, Wine[]>();
  for (const wine of domaineWines) {
    const key = stripAOC(wine.appellation);
    if (!groups.has(key)) {
      groups.set(key, []);
      order.push(key);
    }
    groups.get(key)!.push(wine);
  }
  return order.map((key) => ({ appellation: key, wines: groups.get(key)! }));
}

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
            Nos terroirs
          </h1>
        </div>
      </div>

      {/* ── Domaines, par appellation / lieu ── */}
      {DOMAINES.map((domaine) => {
        const domaineWines = wines.filter((w) => w.labels[0] === domaine.label);
        const groups = groupByAppellation(domaineWines);

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
                  Voir en boutique →
                </Link>
              </div>
            </div>

            {/* Vins, regroupés par terroir / lieu-dit */}
            {groups.map((group) => (
              <div key={group.appellation}>
                <div className="px-8 md:px-12 pt-12 pb-2">
                  <p className="label-caps text-amber">{group.appellation}</p>
                </div>
                {group.wines.map((wine, i) => (
                  <Link
                    key={wine.id}
                    href={`/vins/${wine.id}`}
                    className={`grid md:grid-cols-2 gap-0 min-h-[300px] group ${
                      i % 2 === 0 ? "" : "md:[direction:rtl]"
                    }`}
                  >
                    {/* Image */}
                    <div
                      className={`relative bg-dust overflow-hidden min-h-[220px] ${
                        i % 2 === 0 ? "" : "md:[direction:ltr]"
                      }`}
                    >
                      {wine.photo ? (
                        <Image
                          src={imgPath(wine.photo)}
                          alt={wine.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-[#EDE8E2]">
                          <div className="w-3 h-20 bg-ink/15 rounded-t-sm" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-ink/10" />
                    </div>

                    {/* Texte */}
                    <div
                      className={`flex flex-col justify-center px-10 md:px-14 py-10 bg-cream ${
                        i % 2 === 0 ? "" : "md:[direction:ltr]"
                      }`}
                    >
                      {wine.cru && (
                        <p className="label-caps text-stone mb-2 capitalize">{wine.cru}</p>
                      )}
                      <h3
                        className="text-2xl md:text-3xl text-ink font-normal mb-3 leading-tight group-hover:text-amber transition-colors"
                        style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                      >
                        {wine.name}
                      </h3>
                      {wine.description && (
                        <p className="body-sm text-ink/60 leading-loose">
                          {excerpt(wine.description)}
                        </p>
                      )}
                      {!wine.inStock && (
                        <span className="label-caps text-stone/50 mt-4">Épuisé</span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </section>
        );
      })}
    </div>
  );
}
