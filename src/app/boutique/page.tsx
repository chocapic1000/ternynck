import Image from "next/image";
import WineCard from "@/components/WineCard";
import { wines } from "@/data/wines";
import type { Label } from "@/data/wines";
import Link from "next/link";

const DOMAINES: { label: Label; name: string; subtitle: string; photo: string }[] = [
  {
    label: "mauperthuis",
    name: "Domaine de Mauperthuis",
    subtitle: "Irancy · Saint-Bris · Bourgogne",
    photo: "/photos/domaine-mauperthuis.jpg",
  },
  {
    label: "marronniers",
    name: "Domaine des Marronniers",
    subtitle: "Chablis · Crémant · Bourgogne",
    photo: "/photos/domaine-marronniers.jpg",
  },
];

export default function BoutiquePage({
  searchParams,
}: {
  searchParams: { label?: string };
}) {
  const { label } = searchParams;

  return (
    <div className="min-h-screen bg-cream">
      {/* ── Bannière hero ── */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <Image
          src="/photos/vendanges.jpg"
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
            Livraison incluse · commande directe au domaine
          </p>
        </div>
      </div>

      {/* ── Sections par domaine ── */}
      <div className="pb-24">
        {DOMAINES.filter((d) => !label || d.label === label).map((domaine, idx) => {
          const domaineWines = wines.filter((w) => w.labels[0] === domaine.label);

          return (
            <section key={domaine.label}>
              {/* En-tête du domaine avec photo en fond */}
              <div className="relative h-48 md:h-60 overflow-hidden">
                <Image
                  src={domaine.photo}
                  alt={domaine.name}
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-ink/55" />
                <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12">
                  <p className="label-caps text-cream/50 mb-2">{domaine.subtitle}</p>
                  <h2
                    className="text-3xl md:text-4xl text-cream font-normal"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                  >
                    {domaine.name}
                  </h2>
                  <p className="label-caps text-cream/50 mt-3">
                    {domaineWines.filter((w) => w.inStock).length} références disponibles
                  </p>
                </div>
              </div>

              {/* Grille de vins */}
              <div className="px-8 md:px-12 py-12">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
                  {domaineWines.map((wine) => (
                    <WineCard key={wine.id} wine={wine} />
                  ))}
                </div>
              </div>

              {/* Séparateur photo entre les deux domaines */}
              {idx === 0 && !label && (
                <div className="relative h-40 md:h-56 overflow-hidden">
                  <Image
                    src="/photos/philosophie.jpg"
                    alt=""
                    fill
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-ink/40" />
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* Lien retour si filtré par label */}
      {label && (
        <div className="px-8 md:px-12 pb-16">
          <Link
            href="/boutique"
            className="inline-flex items-center gap-2 label-caps text-stone hover:text-ink transition-colors"
          >
            ← Tous les vins
          </Link>
        </div>
      )}
    </div>
  );
}
