import Image from "next/image";
import { imgPath } from "@/lib/imgPath";
import { wines, type Wine } from "@/data/wines";
import FadeOnScroll from "@/components/FadeOnScroll";

const DOMAINES = [
  {
    label: "mauperthuis" as const,
    name: "Domaine de Mauperthuis",
    subtitle: "Irancy · Saint-Bris · Bourgogne",
    photo: "/photos/domaine-mauperthuis.jpg",
  },
  {
    label: "marronniers" as const,
    name: "Domaine des Marronniers",
    subtitle: "Chablis · Crémant · Bourgogne",
    photo: "/photos/domaine-marronniers.jpg",
  },
];

// Pool de photos de vignes/domaine tournant à chaque vin pour éviter de répéter
// toujours la même image de fond. Inclut les photos jamais encore utilisées sur
// le site (fontaine-goby, gabrielle).
const BACKDROP_POOL = [
  "/photos/vendanges.jpg",
  "/photos/domaine-fontaine-goby.jpg",
  "/photos/histoire-irancy.jpg",
  "/photos/domaine-gabrielle.jpg",
  "/photos/histoire-1993.jpg",
  "/photos/philosophie.jpg",
  "/photos/histoire-marronniers.jpg",
  "/photos/domaine-mauperthuis.jpg",
  "/photos/histoire-vitiforesterie.jpg",
  "/photos/domaine-marronniers.jpg",
  "/photos/histoire-bio.jpg",
  "/photos/histoire-lb.jpg",
];

function stripAOC(appellation: string) {
  return appellation.replace(/\s*AOC\s*/g, "").trim();
}

function excerpt(text: string | undefined, max = 220) {
  if (!text) return "";
  if (text.length <= max) return text;
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
  let backdropIndex = 0;

  return (
    <div className="min-h-screen bg-ink">
      {DOMAINES.map((domaine) => {
        const domaineWines = wines.filter((w) => w.labels[0] === domaine.label);
        const groups = groupByAppellation(domaineWines);

        return (
          <div key={domaine.label}>
            {/* ── Intro domaine, plein écran ── */}
            <section className="relative h-screen overflow-hidden flex items-center">
              <Image
                src={imgPath(domaine.photo)}
                alt={domaine.name}
                fill
                className="object-cover opacity-30"
                priority
              />
              <div className="absolute inset-0 bg-ink/60" />
              <div className="relative z-10 px-10 md:px-20 max-w-3xl">
                <p className="label-caps text-amber mb-5">{domaine.subtitle}</p>
                <h1
                  className="text-cream text-5xl md:text-7xl font-normal leading-tight"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                >
                  {domaine.name}
                </h1>
              </div>
            </section>

            {/* ── Un vin par écran ── */}
            {groups.map((group) =>
              group.wines.map((wine) => {
                const backdrop = BACKDROP_POOL[backdropIndex % BACKDROP_POOL.length];
                backdropIndex++;

                return (
                  <FadeOnScroll key={wine.id}>
                    <section className="relative h-screen overflow-hidden flex items-center">
                      <Image
                        src={imgPath(backdrop)}
                        alt=""
                        fill
                        className="object-cover opacity-30"
                        aria-hidden
                      />
                      <div className="absolute inset-0 bg-ink/60" />

                      <div className="relative z-10 grid md:grid-cols-2 items-center gap-10 px-10 md:px-20 max-w-6xl mx-auto w-full">
                        {/* Bouteille */}
                        <div className="relative h-[55vh] flex items-center justify-center order-2 md:order-1">
                          {wine.photo ? (
                            <Image
                              src={imgPath(wine.photo)}
                              alt={wine.name}
                              fill
                              className="object-contain p-10"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          ) : (
                            <div className="w-4 h-44 bg-cream/10 rounded-t-sm" />
                          )}
                        </div>

                        {/* Texte */}
                        <div className="order-1 md:order-2">
                          <p className="label-caps text-amber mb-4">
                            {group.appellation}
                            {wine.cru && <span className="capitalize"> — {wine.cru}</span>}
                          </p>
                          <h3
                            className="text-4xl md:text-6xl text-cream font-normal mb-6 leading-tight"
                            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                          >
                            {wine.name}
                          </h3>
                          {wine.description && (
                            <p className="text-cream/55 leading-loose max-w-md" style={{ fontFamily: "var(--font-body)", fontSize: "15px" }}>
                              {excerpt(wine.description)}
                            </p>
                          )}
                          {!wine.inStock && (
                            <span className="label-caps text-cream/30 mt-6 inline-block">Épuisé</span>
                          )}
                        </div>
                      </div>
                    </section>
                  </FadeOnScroll>
                );
              })
            )}
          </div>
        );
      })}
    </div>
  );
}
