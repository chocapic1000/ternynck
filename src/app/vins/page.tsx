"use client";

import { useState } from "react";
import Image from "next/image";
import { imgPath } from "@/lib/imgPath";
import { wines, type Wine } from "@/data/wines";
import FadeOnScroll from "@/components/FadeOnScroll";
import VinsGridCard from "@/components/VinsGridCard";
import WineVintages from "@/components/WineVintages";

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

type View = "diaporama" | "grille";

export default function VinsPage() {
  const [view, setView] = useState<View>("diaporama");
  const [selectedWine, setSelectedWine] = useState<Wine | null>(null);
  let backdropIndex = 0;

  return (
    <div className="min-h-screen bg-ink">
      {/* Sélecteur de vue */}
      <div className="fixed top-24 right-6 md:right-10 z-30 flex items-center gap-1 bg-ink/70 backdrop-blur-sm border border-cream/15 rounded-full p-1">
        <button
          onClick={() => setView("diaporama")}
          aria-label="Vue diaporama"
          title="Vue diaporama"
          className={`p-2 rounded-full transition-colors ${
            view === "diaporama" ? "bg-amber text-ink" : "text-cream/50 hover:text-cream"
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="3" width="14" height="10" rx="1" stroke="currentColor" strokeWidth="1.3" />
            <path d="M6.5 5.5L10.5 8L6.5 10.5V5.5Z" fill="currentColor" />
          </svg>
        </button>
        <button
          onClick={() => setView("grille")}
          aria-label="Vue grille"
          title="Vue grille"
          className={`p-2 rounded-full transition-colors ${
            view === "grille" ? "bg-amber text-ink" : "text-cream/50 hover:text-cream"
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="1" width="4.3" height="4.3" stroke="currentColor" strokeWidth="1.3" />
            <rect x="5.85" y="1" width="4.3" height="4.3" stroke="currentColor" strokeWidth="1.3" />
            <rect x="10.7" y="1" width="4.3" height="4.3" stroke="currentColor" strokeWidth="1.3" />
            <rect x="1" y="5.85" width="4.3" height="4.3" stroke="currentColor" strokeWidth="1.3" />
            <rect x="5.85" y="5.85" width="4.3" height="4.3" stroke="currentColor" strokeWidth="1.3" />
            <rect x="10.7" y="5.85" width="4.3" height="4.3" stroke="currentColor" strokeWidth="1.3" />
            <rect x="1" y="10.7" width="4.3" height="4.3" stroke="currentColor" strokeWidth="1.3" />
            <rect x="5.85" y="10.7" width="4.3" height="4.3" stroke="currentColor" strokeWidth="1.3" />
            <rect x="10.7" y="10.7" width="4.3" height="4.3" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </button>
      </div>

      {view === "grille" ? (
        <div className="pt-40 pb-24 px-8 md:px-16">
          {DOMAINES.map((domaine) => {
            const domaineWines = wines.filter((w) => w.labels[0] === domaine.label);
            return (
              <div key={domaine.label} className="mb-20 max-w-6xl mx-auto">
                <p className="label-caps text-amber mb-3">{domaine.subtitle}</p>
                <h2
                  className="text-cream text-3xl md:text-4xl font-normal mb-10"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                >
                  {domaine.name}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-14">
                  {domaineWines.map((wine) => (
                    <VinsGridCard key={wine.id} wine={wine} onSelect={setSelectedWine} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        DOMAINES.map((domaine) => {
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
                            <WineVintages wine={wine} dark />
                          </div>
                        </div>
                      </section>
                    </FadeOnScroll>
                  );
                })
              )}
            </div>
          );
        })
      )}

      {/* Affichage détaillé d'une bouteille (vue grille) */}
      {selectedWine && (
        <div
          className="fixed inset-0 z-50 bg-ink/90 flex items-center justify-center px-6 py-10 overflow-y-auto"
          onClick={() => setSelectedWine(null)}
        >
          <button
            onClick={() => setSelectedWine(null)}
            aria-label="Fermer"
            className="absolute top-6 right-6 md:top-10 md:right-10 text-cream/50 hover:text-amber transition-colors text-3xl"
          >
            ×
          </button>

          <div
            className="relative grid md:grid-cols-2 items-center gap-10 max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[60vh] md:h-[80vh] flex items-center justify-center">
              {selectedWine.photo ? (
                <Image
                  src={imgPath(selectedWine.photo)}
                  alt={selectedWine.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="w-4 h-44 bg-cream/10 rounded-t-sm" />
              )}
            </div>

            <div>
              <h3
                className="text-3xl md:text-5xl text-cream font-normal mb-6 leading-tight"
                style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
              >
                {selectedWine.name}
              </h3>
              {selectedWine.description && (
                <p className="text-cream/55 leading-loose max-w-md" style={{ fontFamily: "var(--font-body)", fontSize: "15px" }}>
                  {selectedWine.description}
                </p>
              )}
              {!selectedWine.inStock && (
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
              <WineVintages wine={selectedWine} dark />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
