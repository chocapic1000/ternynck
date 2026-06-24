import Image from "next/image";
import type { Wine, Label } from "@/data/wines";
import { imgPath } from "@/lib/imgPath";

const DOMAIN_LABEL: Record<Label, string> = {
  mauperthuis: "Mauperthuis",
  marronniers: "Marronniers",
  "fontaine-goby": "Fontaine-Goby",
};

export default function VinsGridCard({
  wine,
  showDomainBadge = false,
  onSelect,
}: {
  wine: Wine;
  showDomainBadge?: boolean;
  onSelect: (wine: Wine) => void;
}) {
  return (
    <button
      onClick={() => onSelect(wine)}
      className="group flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300 w-full"
    >
      <div className="relative w-full h-64 sm:h-80 md:h-96">
        {wine.photo ? (
          <Image
            src={imgPath(wine.photo)}
            alt={wine.name}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 33vw, 20vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-end justify-center pb-6">
            <div className="w-[22px] h-[110px] bg-cream/10 rounded-t-sm" />
          </div>
        )}

        {wine.category === "amphore" && (
          <span
            className="absolute top-2 left-1/2 -translate-x-1/2 bg-amber text-cream text-[9px] tracking-widest uppercase px-2 py-1"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Amphore
          </span>
        )}

        {showDomainBadge && (
          <span
            className="absolute top-2 right-2 text-cream/50 label-caps text-[9px]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {DOMAIN_LABEL[wine.labels[0]]}
          </span>
        )}

        {!wine.inStock && (
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 label-caps text-cream/30 text-[9px]">
            Épuisé
          </span>
        )}
      </div>

      <h3
        className="text-cream text-base mt-5 leading-snug"
        style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
      >
        {wine.name}
      </h3>
    </button>
  );
}
