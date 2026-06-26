import Image from "next/image";
import Link from "next/link";
import { imgPath } from "@/lib/imgPath";

const domaines = [
  {
    id: "mauperthuis",
    name: "Domaine de Mauperthuis",
    region: "Chablis · Irancy · Saint-Bris",
    description:
      "Le domaine fondateur. Laurent y a planté ses premières vignes en 1993 sur des sols calcaires du Jurassique, en pente douce face au sud. Aujourd'hui le cœur rouge de la famille — Irancy, César, Palotte — y prend toute son expression.",
    photo: "/photos/domaine-mauperthuis.jpg",
    accent: "bg-[#3A4A2A]",
  },
  {
    id: "marronniers",
    name: "Domaine des Marronniers",
    region: "Chablis · Bourgogne",
    description:
      "Acquis en 2013, le Domaine des Marronniers apporte à la famille ses bâtiments, son matériel et surtout ses blancs : Petit Chablis, Chablis, Vieilles Vignes, Premiers Crus et le grand Valmur en Grand Cru.",
    photo: "/photos/domaine-marronniers.jpg",
    accent: "bg-[#4A3A2A]",
  },
  {
    id: "fontaine-goby",
    name: "Domaine Fontaine-Goby",
    region: "Préhy · Chablisien",
    description:
      "Évolution naturelle du Domaine des Marronniers, le Domaine Fontaine-Goby tire son nom de la fontaine qui alimentait jadis le lavoir du hameau de Civry-sur-Serin, à Préhy. La vigne y est conduite en agroforesterie, entre haies et arbres fruitiers, avec des animaux pour entretenir les sols — une viticulture vivante, certifiée biologique et biodynamique Demeter depuis 2022. C'est ici que la famille vinifie ses cuvées en amphore, où le grès laisse le fruit s'exprimer sans le marquer de bois.",
    photo: "/photos/domaine-fontaine-goby.jpg",
    accent: "bg-[#2A3640]",
  },
];

export default function DomainesPage() {
  return (
    <div className="pt-24">
      {/* Header */}
      <div className="px-8 md:px-12 py-16">
        <p className="label-caps text-amber mb-5">— Les domaines</p>
        <h1
          className="text-ink text-5xl md:text-6xl font-normal leading-tight max-w-2xl"
          style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
        >
          Trois domaines,
          <br />
          la même philosophie.
        </h1>
        <p className="text-stone mt-6 max-w-xl leading-loose text-lg" style={{ fontFamily: "var(--font-body)" }}>
          Chablis · Irancy · Bourgogne
        </p>
      </div>

      {/* Domaines — alternance image / texte */}
      <div className="divide-y divide-dust">
        {domaines.map((d, i) => (
          <div
            key={d.id}
            className={`grid md:grid-cols-2 min-h-[480px] ${
              i % 2 === 1 ? "md:[direction:rtl]" : ""
            }`}
          >
            {/* Image */}
            <div
              className={`relative min-h-[300px] overflow-hidden ${d.accent} ${
                i % 2 === 1 ? "md:[direction:ltr]" : ""
              }`}
            >
              <Image
                src={imgPath(d.photo)}
                alt={d.name}
                fill
                className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Texte */}
            <div
              className={`px-10 md:px-16 py-14 flex flex-col justify-center bg-cream ${
                i % 2 === 1 ? "md:[direction:ltr]" : ""
              }`}
            >
              <p className="label-caps text-amber mb-4">{d.region}</p>
              <h2
                className="text-ink text-3xl md:text-4xl font-normal mb-6 leading-tight"
                style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
              >
                {d.name}
              </h2>
              <p className="body-sm text-ink/60 leading-loose mb-8">
                {d.description}
              </p>
              <Link
                href={`/vins?domaine=${d.id}`}
                className="inline-flex items-center gap-3 label-caps text-amber link-ink pb-2 w-fit"
              >
                Voir les vins →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Section Louis-Bénigne — photo pleine largeur avec texte superposé */}
      <div className="relative min-h-[480px] flex items-center overflow-hidden">
        <Image
          src={imgPath("/photos/histoire-lb.jpg")}
          alt="Louis-Bénigne Ternynck"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-transparent" />
        <div className="relative z-10 px-8 md:px-16 py-20 max-w-2xl">
          <p className="label-caps text-amber mb-6">— La nouvelle génération</p>
          <h2
            className="text-cream text-3xl md:text-5xl font-normal mb-6 leading-tight"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            Louis-Bénigne Ternynck,
            <br />
            Irancy · depuis 2025
          </h2>
          <p className="text-cream/70 leading-loose" style={{ fontFamily: "var(--font-body)", fontSize: "16px" }}>
            Fils aîné de Laurent et Marie-Noëlle, Louis-Bénigne a repris en 2025
            dix hectares à Irancy — Irancy Village, Aligoté, Crémant. Son domaine
            est déjà en conversion biodynamique. Une nouvelle page s'écrit,
            dans le même esprit.
          </p>
        </div>
      </div>
    </div>
  );
}
