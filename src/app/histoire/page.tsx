import Image from "next/image";
import { imgPath } from "@/lib/imgPath";

const timeline = [
  {
    year: "1993",
    title: "Les premières vignes",
    text: "Laurent plante ses 35 premiers ares sur les terres de François Choné. Deux ans plus tard, en 1995, sort le premier millésime : 500 bouteilles.",
    photo: "/photos/histoire-1993.jpg",
  },
  {
    year: "2009",
    title: "Irancy — Veaupessiot, Mazelot, Palotte",
    text: "Reprise de vignes en Irancy sur des terroirs d'exception.",
    photo: "/photos/histoire-irancy.jpg",
  },
  {
    year: "2013",
    title: "Domaine des Marronniers",
    text: "Reprise du Domaine des Marronniers. Accès au Chablisien.",
    photo: "/photos/histoire-marronniers.jpg",
  },
  {
    year: "2018",
    title: "Conversion biologique & biodynamique",
    text: "Décision de convertir l'ensemble des domaines. Certification officielle demandée en 2019 pour Fontaine-Goby et Mauperthuis, en 2020 pour Marronniers.",
    photo: "/photos/histoire-bio.jpg",
  },
  {
    year: "2022",
    title: "Certifications & vitiforesterie",
    text: "Fontaine-Goby et Mauperthuis certifiés bio. Des arbres sont plantés entre les rangs de vignes pour recréer un équilibre biologique vivant.",
    photo: "/photos/histoire-vitiforesterie.jpg",
  },
  {
    year: "2025",
    title: "La nouvelle génération",
    text: "Louis-Bénigne, fils de Laurent et Marie-Noëlle, crée son propre domaine en Irancy. En conversion biodynamique.",
    photo: "/photos/histoire-lb.jpg",
  },
];

export default function HistoirePage() {
  return (
    <div className="pt-32 pb-24">
      {/* Hero */}
      <div className="px-8 md:px-12 mb-20">
        <p className="label-caps text-amber mb-5">— L'histoire</p>
        <h1 className="font-serif text-5xl md:text-7xl text-ink font-normal leading-[1.05] max-w-3xl">
          Du vin comme on transmet
          <br />
          une langue maternelle.
        </h1>
        <p className="body-sm text-stone mt-6 max-w-xl leading-loose">
          Laurent Ternynck a grandi dans les caves de ses parents. Ce qui a
          commencé comme un jeu est devenu une vocation, puis une maison.
          Trente ans plus tard, deux domaines, une femme, trois enfants.
        </p>
      </div>

      {/* Portrait */}
      <div className="relative h-[60vh] md:h-[75vh] mb-24 overflow-hidden bg-[#2A3520]">
        <Image
          src={imgPath("/photos/portrait-famille.jpg")}
          alt="Laurent et Marie-Noëlle Ternynck dans leurs vignes"
          fill
          className="object-cover opacity-80"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
        <div className="absolute bottom-10 left-8 md:left-12">
          <p className="font-serif text-cream text-2xl italic">
            "La vigne comme passion, la famille comme racine."
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="px-8 md:px-12">
        <div className="max-w-4xl mx-auto space-y-0">
          {timeline.map((item, i) => (
            <div
              key={item.year}
              className={`grid md:grid-cols-2 gap-0 min-h-[380px] ${
                i % 2 === 0 ? "" : "md:[direction:rtl]"
              }`}
            >
              {/* Image */}
              <div
                className={`relative bg-dust overflow-hidden min-h-[260px] ${
                  i % 2 === 0 ? "" : "md:[direction:ltr]"
                }`}
              >
                <Image
                  src={imgPath(item.photo)}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-ink/10" />
              </div>

              {/* Text */}
              <div
                className={`flex flex-col justify-center px-10 py-14 ${
                  i % 2 === 0 ? "bg-cream" : "bg-dust md:[direction:ltr]"
                }`}
              >
                <p className="font-sans font-bold text-[64px] text-ink/10 leading-none mb-4 select-none">
                  {item.year}
                </p>
                <p className="label-caps text-amber mb-3">{item.year}</p>
                <h2 className="font-serif text-2xl text-ink font-normal mb-4">
                  {item.title}
                </h2>
                <p className="body-sm text-ink/60 leading-loose">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
