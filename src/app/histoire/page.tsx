import Image from "next/image";
import { imgPath } from "@/lib/imgPath";
import HistoireTimeline from "@/components/HistoireTimeline";

export default function HistoirePage() {
  return (
    <div>
      {/* Hero — fond sombre pour enchaîner directement sur la photo */}
      <div className="bg-ink pt-28 px-8 md:px-12 pb-14">
        <p className="label-caps text-amber mb-5">— L'histoire</p>
        <h1 className="font-serif text-5xl md:text-7xl text-cream font-normal leading-[1.05] max-w-3xl">
          Du vin comme on transmet
          <br />
          une langue maternelle.
        </h1>
        <p className="body-sm text-cream/60 mt-6 max-w-xl leading-loose">
          Laurent Ternynck a grandi dans les caves de ses parents. Ce qui a
          commencé comme un jeu est devenu une vocation, puis une maison.
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

      {/* Frise chronologique balayable */}
      <HistoireTimeline />
    </div>
  );
}
