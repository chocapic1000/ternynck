"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getWineBySlug, type Label } from "@/data/wines";
import { useCart } from "@/context/CartContext";
import { imgPath } from "@/lib/imgPath";

const COLOR_LABEL: Record<string, string> = {
  blanc: "Vin Blanc",
  rouge: "Vin Rouge",
  bulle: "Crémant",
  rose: "Rosé",
};

const DOMAIN_LABEL: Record<Label, string> = {
  mauperthuis: "Mauperthuis",
  marronniers: "Marronniers",
  "fontaine-goby": "Fontaine-Goby",
};

const BIODYNAMIC_DOMAINS: Label[] = ["mauperthuis", "marronniers", "fontaine-goby"];

export default function WineClient({ slug }: { slug: string }) {
  const wine = getWineBySlug(slug);
  if (!wine) notFound();

  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({ id: wine.id, name: wine.name, price: wine.price, label: wine.labels[0] }, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="pt-24 min-h-screen">
      <div className="px-8 md:px-12 py-6">
        <nav className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-stone" style={{ fontFamily: "var(--font-body)" }}>
          <Link href="/boutique" className="hover:text-ink transition-colors">Boutique</Link>
          <span>/</span>
          <span className="text-ink">{wine.name}</span>
        </nav>
      </div>

      <div className="grid md:grid-cols-2 gap-0 min-h-[70vh]">
        <div className="relative bg-dust flex items-center justify-center min-h-[420px] py-10">
          {wine.photo ? (
            <Image src={imgPath(wine.photo!)} alt={wine.name} fill className="object-contain" sizes="(max-width: 768px) 100vw, 50vw" />
          ) : (
            <div className="flex items-center justify-center h-full opacity-20 py-20">
              <div className="flex flex-col items-center">
                <div className={`w-4 h-14 rounded-t-sm ${wine.color === "rouge" ? "bg-red-900" : "bg-sage"}`} />
                <div className={`w-10 h-[200px] ${wine.color === "rouge" ? "bg-red-900" : "bg-sage"}`} />
              </div>
            </div>
          )}
        </div>

        <div className="px-10 md:px-16 py-16 flex flex-col justify-center">
          {wine.category === "amphore" && (
            <span className="label-caps bg-amber text-cream px-3 py-1 w-fit mb-6">Collection Amphore</span>
          )}
          <p className="label-caps text-amber mb-3">
            {COLOR_LABEL[wine.color]}, {wine.appellation.replace(/\s*AOC\s*/g, "").trim()}
          </p>
          <h1 className="text-4xl md:text-5xl text-ink font-normal mb-6 leading-tight" style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}>
            {wine.name}
          </h1>
          <dl className="grid grid-cols-2 gap-4 mb-8 py-6 border-y border-dust">
            <div>
              <dt className="label-caps text-stone mb-1">Domaine</dt>
              <dd className="body-sm text-ink">{wine.labels.map((l) => DOMAIN_LABEL[l]).join(", ")}</dd>
            </div>
            <div>
              <dt className="label-caps text-stone mb-1">Appellation</dt>
              <dd className="body-sm text-ink">{wine.appellation.replace(/\s*AOC\s*/g, "").trim()}</dd>
            </div>
            {wine.cru && (
              <div>
                <dt className="label-caps text-stone mb-1">Classement</dt>
                <dd className="body-sm text-ink capitalize">{wine.cru}</dd>
              </div>
            )}
            {wine.labels.some((l) => BIODYNAMIC_DOMAINS.includes(l)) && (
              <div>
                <dt className="label-caps text-stone mb-1">Agriculture</dt>
                <dd className="body-sm text-ink">Biodynamique</dd>
              </div>
            )}
          </dl>

          {wine.description && (
            <p className="text-ink/70 leading-loose mb-8 text-[14px]" style={{ fontFamily: "var(--font-body)" }}>
              {wine.description}
            </p>
          )}

          <p className="font-serif text-3xl text-ink mb-6" style={{ fontFamily: "var(--font-display)" }}>
            {wine.price} € <span className="text-stone text-base" style={{ fontFamily: "var(--font-body)" }}>/ bouteille</span>
          </p>

          {wine.inStock ? (
            <>
              <div className="flex items-center gap-4 mb-4">
                <span className="label-caps text-stone">Quantité</span>
                <div className="flex items-center border border-stone">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center text-xl text-ink hover:bg-dust transition-colors">−</button>
                  <span className="w-10 h-10 flex items-center justify-center body-sm text-ink border-x border-stone">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center text-xl text-ink hover:bg-dust transition-colors">+</button>
                </div>
                <span className="body-sm text-stone">= {(wine.price * qty).toFixed(0)} €</span>
              </div>
              <button
                onClick={handleAdd}
                className={`w-full label-caps py-4 px-6 transition-all duration-300 ${added ? "bg-sage text-cream" : "bg-ink text-cream hover:bg-amber"}`}
              >
                {added ? "✓ Ajouté au panier" : "Ajouter au panier"}
              </button>
            </>
          ) : (
            <span className="text-center label-caps text-stone border border-stone py-4 px-6">Épuisé</span>
          )}
          <p className="body-sm text-stone mt-4">Livraison offerte, prix par bouteille</p>
        </div>
      </div>
    </div>
  );
}
