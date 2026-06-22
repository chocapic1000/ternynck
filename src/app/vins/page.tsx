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

// Pool de photos de vignes/vendanges tournant à chaque vin, pour éviter de
// répéter toujours la même image de fond. Uniquement des photos jamais
// utilisées ailleurs sur le site.
const BACKDROP_POOL = [
  "/photos/domaine-fontaine-goby.jpg",
  "/photos/vignoble-gel-aube.jpg",
  "/photos/domaine-gabrielle.jpg",
  "/photos/cuverie-vendanges.jpg",
  "/photos/vendanges-mauperthuis-seau.jpg",
  "/photos/vendanges-coucher-soleil.jpg",
];

function stripAOC(appellation: string) {
  return appellation.replace(/\s*AOC\s*/g, "").trim();
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

// Les amphores forment toujours leur propre groupe, affiché en dernier,
// pour ne jamais se mélanger avec un vin standard de la même appellation.
function buildGroups(domaineWines: Wine[]) {
  const standard = domaineWines.filter((w) => w.category !== "amphore");
  const amphores = domaineWines.filter((w) => w.category === "amphore");
  const groups = groupByAppellation(standard);
  if (amphores.length > 0) {
    groups.push({ appellation: "Collection Amphore", wines: amphores });
  }
  return groups;
}

export default function VinsPage() {
  let backdropIndex = 0;

  return (
    <div className="min-h-screen bg-ink">
      {DOMAINES.map((domaine) => {
        const domaineWines = wines.filter((w) => w.labels[0] === domaine.label);
        const groups = buildGroups(domaineWines);

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
              <div className="relative z-10 px-10 md:px-20 max-w-5xl">
                <p className="label-caps text-amber mb-5">{domaine.subtitle}</p>
                <h1
                  className="text-cream text-3xl md:text-6xl font-normal leading-tight whitespace-nowrap"
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
                    <section className="relative min-h-screen overflow-hidden flex items-center py-20">
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
                        <div className="relative h-[92vh] flex items-center justify-center order-2 md:order-1">
                          {wine.photo ? (
                            <Image
                              src={imgPath(wine.photo)}
                              alt={wine.name}
                              fill
                              className="object-contain"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          ) : (
                            <div className="w-4 h-44 bg-cream/10 rounded-t-sm" />
                          )}
                        </div>

                        {/* Texte */}
                        <div className="order-1 md:order-2">
                          <h3
                            className="text-4xl md:text-6xl text-cream font-normal mb-6 leading-tight"
                            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                          >
                            {wine.name}
                          </h3>
                          {wine.description && (
                            <p className="text-cream/55 leading-loose max-w-md" style={{ fontFamily: "var(--font-body)", fontSize: "15px" }}>
                              {wine.description}
                            </p>
                          )}
                          {!wine.inStock && (
                            <span className="label-caps text-cream/30 mt-6 inline-block">Épuisé</span>
                          )}
                          <div className="flex flex-wrap gap-6 mt-8">
                            <a
                              href="#"
                              className="label-caps text-amber border-b border-amber/40 pb-0.5 hover:opacity-70 transition-opacity"
                            >
                              Fiche technique
                            </a>
                            <a
                              href="#"
                              className="label-caps text-amber border-b border-amber/40 pb-0.5 hover:opacity-70 transition-opacity"
                            >
                              Technical sheet
                            </a>
                          </div>
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
