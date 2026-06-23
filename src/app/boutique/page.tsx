"use client";

import { useState } from "react";
import Image from "next/image";
import { imgPath } from "@/lib/imgPath";
import WineCard from "@/components/WineCard";
import { wines } from "@/data/wines";

type FilterId = "tous" | "mauperthuis" | "marronniers" | "lebon" | "blanc" | "rouge" | "bulle";

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "tous", label: "Tous" },
  { id: "mauperthuis", label: "Mauperthuis" },
  { id: "marronniers", label: "Marronniers" },
  { id: "lebon", label: "Louis Lebon" },
  { id: "blanc", label: "Blancs" },
  { id: "rouge", label: "Rouges" },
  { id: "bulle", label: "Crémant & Rosé" },
];

function matchesFilter(wine: (typeof wines)[number], filter: FilterId) {
  if (filter === "tous") return true;
  if (filter === "mauperthuis" || filter === "marronniers" || filter === "lebon") {
    return wine.labels[0] === filter;
  }
  if (filter === "bulle") return wine.color === "bulle" || wine.color === "rose";
  return wine.color === filter;
}

export default function BoutiquePage() {
  const [filter, setFilter] = useState<FilterId>("tous");
  const filteredWines = wines.filter((w) => matchesFilter(w, filter));

  return (
    <div className="min-h-screen bg-cream">
      {/* ── Bannière hero ── */}
      <div className="relative h-72 md:h-80 overflow-hidden">
        <Image
          src={imgPath("/photos/vendanges.jpg")}
          alt="Vendanges"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-ink/50" />
        <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-12 pb-12">
          <p className="label-caps text-cream/50 mb-3">— La boutique</p>
          <h1
            className="text-4xl md:text-6xl text-cream font-normal leading-tight"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            Nos vins
          </h1>
          <p className="body-sm text-cream/60 mt-3">
            Livraison incluse, commande directe au domaine
          </p>
        </div>
      </div>

      {/* ── Filtres ── */}
      <div className="px-8 md:px-12 py-6 border-b border-dust flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`label-caps px-4 py-2 rounded-full border transition-colors ${
              filter === f.id
                ? "bg-ink text-cream border-ink"
                : "border-stone text-ink hover:border-ink"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* ── Grille unique ── */}
      <div className="px-8 md:px-12 py-12">
        <p className="label-caps text-stone mb-6">
          {filteredWines.length} référence{filteredWines.length > 1 ? "s" : ""}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
          {filteredWines.map((wine) => (
            <WineCard key={wine.id} wine={wine} showDomainBadge />
          ))}
        </div>
      </div>
    </div>
  );
}
