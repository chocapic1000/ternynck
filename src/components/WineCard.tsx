import Link from "next/link";
import Image from "next/image";
import type { Wine, Label } from "@/data/wines";
import { imgPath } from "@/lib/imgPath";

const BOTTLE_COLOR: Record<Wine["color"], string> = {
  blanc: "bg-sage/50",
  rouge: "bg-ink",
  bulle: "bg-sage/40",
  rose: "bg-rose-300/60",
};

const DOMAIN_LABEL: Record<Label, string> = {
  mauperthuis: "Mauperthuis",
  marronniers: "Marronniers",
};

const DOMAIN_BADGE: Record<Label, string> = {
  mauperthuis: "bg-amber text-cream",
  marronniers: "bg-sage text-cream",
};

export default function WineCard({
  wine,
  showDomainBadge = false,
}: {
  wine: Wine;
  showDomainBadge?: boolean;
}) {
  return (
    <Link
      href={`/vins/${wine.id}`}
      className="group flex flex-col bg-cream hover:-translate-y-1 transition-transform duration-300"
    >
      {/* Image bouteille — fond clair, object-contain pour montrer la bouteille entière */}
      <div
        className="relative w-full bg-[#EDE8E2] overflow-hidden"
        style={{ aspectRatio: "3/4" }}
      >
        {wine.photo ? (
          <Image
            src={imgPath(wine.photo)}
            alt={wine.name}
            fill
            className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-end justify-center pb-6">
            <div className="flex flex-col items-center opacity-25">
              <div className={`w-[10px] h-[30px] rounded-t-sm ${BOTTLE_COLOR[wine.color]}`} />
              <div className={`w-[22px] h-[90px] ${BOTTLE_COLOR[wine.color]}`} />
            </div>
          </div>
        )}

        {!wine.inStock && (
          <div className="absolute inset-0 bg-cream/60 flex items-center justify-center">
            <span
              className="text-ink/50 text-[10px] tracking-widest uppercase"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Épuisé
            </span>
          </div>
        )}

        {wine.category === "amphore" && (
          <span
            className="absolute top-3 left-3 bg-amber text-cream text-[9px] tracking-widest uppercase px-2 py-1"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Amphore
          </span>
        )}

        {showDomainBadge && (
          <span
            className={`absolute top-3 right-3 text-[9px] tracking-widest uppercase px-2 py-1 ${DOMAIN_BADGE[wine.labels[0]]}`}
            style={{ fontFamily: "var(--font-body)" }}
          >
            {DOMAIN_LABEL[wine.labels[0]]}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <p
          className="text-[15px] text-ink leading-snug flex-1"
          style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
        >
          {wine.name}
        </p>
        <p
          className="text-stone text-[13px] mt-3"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {wine.price} €
        </p>
      </div>
    </Link>
  );
}
