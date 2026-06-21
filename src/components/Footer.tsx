import Link from "next/link";

const domaines = [
  { name: "Mauperthuis", href: "/boutique?label=mauperthuis" },
  { name: "Marronniers", href: "/boutique?label=marronniers" },
];

const explorer = [
  { name: "Vins blancs", href: "/boutique?couleur=blanc" },
  { name: "Vins rouges", href: "/boutique?couleur=rouge" },
  { name: "Crémant & Rosé", href: "/boutique?couleur=bulle" },
  { name: "Collection Amphore", href: "/boutique?categorie=amphore" },
];

export default function Footer() {
  return (
    <>
    <div className="bg-dust h-5" />
    <footer className="bg-ink pt-16 pb-10 px-8 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand */}
        <div>
          <p className="font-serif text-cream text-xl mb-4">
            Famille Ternynck
          </p>
          <p className="body-sm text-cream/40 leading-loose">
            Vignerons indépendants depuis 1993.
            <br />
            Biologiques, Biodynamiques.
            <br />
            Chablis, Irancy, Bourgogne.
          </p>
        </div>

        {/* Domaines */}
        <div>
          <p className="label-caps text-amber mb-5">Les Domaines</p>
          <ul className="space-y-3">
            {domaines.map((d) => (
              <li key={d.href}>
                <Link
                  href={d.href}
                  className="body-sm text-cream/50 hover:text-cream transition-colors"
                >
                  {d.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Explorer */}
        <div>
          <p className="label-caps text-amber mb-5">Explorer</p>
          <ul className="space-y-3">
            {explorer.map((e) => (
              <li key={e.href}>
                <Link
                  href={e.href}
                  className="body-sm text-cream/50 hover:text-cream transition-colors"
                >
                  {e.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="label-caps text-amber mb-5">Contact</p>
          <ul className="space-y-3">
            <li>
              <Link
                href="/contact"
                className="body-sm text-cream/50 hover:text-cream transition-colors"
              >
                Nous visiter
              </Link>
            </li>
            <li>
              <a
                href="mailto:ternynck@hotmail.com"
                className="body-sm text-cream/50 hover:text-cream transition-colors"
              >
                ternynck@hotmail.com
              </a>
            </li>
            <li className="body-sm text-cream/30">Lundi au Vendredi, 9h à 17h</li>
            <li className="body-sm text-cream/30 leading-relaxed">
              3 Grande Rue de Chablis<br />
              89800 Préhy, France
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row justify-between gap-4">
        <p className="label-caps text-cream/25">
          © 2025 Famille Ternynck, Tous droits réservés
        </p>
        <p className="label-caps text-cream/25">
          Livraison incluse, Paiement sécurisé
        </p>
      </div>
    </footer>
    </>
  );
}
