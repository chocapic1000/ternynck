export type Label = "mauperthuis" | "marronniers";
export type Color = "blanc" | "rouge" | "bulle" | "rose";
export type Category = "standard" | "amphore";

export interface Wine {
  id: string;
  name: string;
  appellation: string;
  color: Color;
  category: Category;
  labels: Label[];
  price: number;
  inStock: boolean;
  cru?: string; // "grand cru" | "1er cru" | "village"
  description?: string;
  photo?: string;
}

export const wines: Wine[] = [
  // ─── CRÉMANT · MARRONNIERS (en tête) ─────────────────────────────────────────
  {
    id: "cremant",
    name: "Crémant de Bourgogne",
    appellation: "Crémant de Bourgogne AOC",
    color: "bulle",
    category: "standard",
    labels: ["marronniers"],
    price: 15,
    inStock: true,
    description: "Belle robe dorée, cordons fins de bulles. Arômes de fleurs blanches (aubépines), de pralin et de brioche. Bouche fraîche, saline et minérale, finale sapide et rafraîchissante. Brut Nature, sans dosage. Apéritifs et fruits de mer. Servir à 8 °C.",
    photo: "https://images.squarespace-cdn.com/content/v1/5e89a0e7cbe1c339cd01fd20/1601621184500-5VD5N0P96JDOIH646AFM/Cremant.jpeg",
  },

  // ─── BLANCS · MARRONNIERS (+ Mauperthuis pour PC et Chablis base) ───────────
  {
    id: "petit-chablis",
    name: "Le Petit Chablis",
    appellation: "Petit Chablis AOC",
    color: "blanc",
    category: "standard",
    labels: ["marronniers", "mauperthuis"],
    price: 16,
    inStock: true,
    description: "Belle robe or pâle aux reflets verts. Nez puissant, iodé et frais, floral et minéral — amandes fraîches, noisettes, agrumes, fleurs blanches. Bouche équilibrée, attaque charnue, finale nerveuse et acidulée. Accords : fruits de mer, poissons, viandes blanches. Garde 2–4 ans.",
    photo: "https://images.squarespace-cdn.com/content/v1/5e89a0e7cbe1c339cd01fd20/1601545825856-HF77NWN0N67LDH9T5JX5/Petit+Chablis.jpg",
  },
  {
    id: "chablis",
    name: "Le Chablis",
    appellation: "Chablis AOC",
    color: "blanc",
    category: "standard",
    labels: ["marronniers", "mauperthuis"],
    price: 18,
    inStock: true,
    description: "Belle robe or pâle aux reflets verts. Nez puissant, iodé et frais, floral et minéral — amandes fraîches, noisettes, agrumes, fleurs blanches. Bouche équilibrée, attaque charnue, finale nerveuse et acidulée.",
    photo: "https://images.squarespace-cdn.com/content/v1/5e89a0e7cbe1c339cd01fd20/1601621244324-2QWA2LV75CGSD4NYJ8V3/Chablis+marronniers.jpeg",
  },
  {
    id: "chablis-vv",
    name: "Chablis Vieilles Vignes",
    appellation: "Chablis AOC",
    color: "blanc",
    category: "standard",
    labels: ["marronniers"],
    price: 20,
    inStock: true,
    cru: "village",
    description: "Belle couleur dorée aux pâles reflets verts. Notes minérales, de mirabelle et de coquilles d'huîtres concassées. Vanille et citron vert à l'aération. Bouche structurée, saline, fraîche, finale persistante. Fruits de mer, charcuteries fines. Garde 10 ans.",
    photo: "https://images.squarespace-cdn.com/content/v1/5e89a0e7cbe1c339cd01fd20/1601546116215-OJFGN779U6LIV9D998H2/Chablis+Vieilles+Vignes.jpg",
  },
  {
    id: "chablis-vv-malantes",
    name: "Chablis Vieilles Vignes les Malantes",
    appellation: "Chablis AOC",
    color: "blanc",
    category: "standard",
    labels: ["marronniers"],
    price: 20,
    inStock: true,
    cru: "village",
    description: "Belle couleur dorée aux pâles reflets verts. Minéralité, mirabelle et coquilles d'huîtres concassées. Vanille et agrumes verts à l'aération. Bouche structurée, salinité marquée, texture soyeuse et fraîcheur. Fruits de mer, charcuteries, apéritif. Développera sa complexité durant les dix prochaines années.",
    photo: "https://images.squarespace-cdn.com/content/v1/5e89a0e7cbe1c339cd01fd20/1601620826182-XY6W8UMHZFN60K40U4NJ/vieille+vigne+les+malantes.jpeg",
  },
  {
    id: "chablis-1er-montmains",
    name: "Chablis 1er Cru Montmains",
    appellation: "Chablis 1er Cru AOC",
    color: "blanc",
    category: "standard",
    labels: ["marronniers"],
    price: 26,
    inStock: true,
    cru: "1er cru",
    description: "Jolie robe or, délicat, fin et minéral. Ample et souple, arômes minéraux très marqués par le terroir caillouteux des Butteaux. Vin ciselé, puissant et raffiné, milieu de bouche élargi. Huîtres chaudes, Saint-Jacques poêlées, ris de veau, viandes blanches, poissons en sauce. Garde 8–10 ans.",
    photo: "https://images.squarespace-cdn.com/content/v1/5e89a0e7cbe1c339cd01fd20/1601555442915-YGXO3PI7C2Q5RB56472O/Chablis+1er+Cru+Montmains.jpeg",
  },
  {
    id: "chablis-1er-cote-jouan",
    name: "Chablis 1er Cru Côte de Jouan",
    appellation: "Chablis 1er Cru AOC",
    color: "blanc",
    category: "standard",
    labels: ["marronniers"],
    price: 26,
    inStock: false,
    cru: "1er cru",
    description: "Robe or clair d'une belle intensité. Nez frais, fin et subtil dominé par des arômes de silex, de sureau et de noisettes. Bouche ronde et équilibrée, fruitée, finale sur la mandarine et le caramel. Discret et raffiné, privilégiant la finesse et la longueur. Ris de veau, viandes blanches, poissons. Garde 8–10 ans.",
    photo: "https://images.squarespace-cdn.com/content/v1/5e89a0e7cbe1c339cd01fd20/1601620883045-LLL3U6FXTDX7JZBDL4ZQ/C%C3%B4te+de+jouan.jpg",
  },
  {
    id: "chablis-grand-cru-valmur",
    name: "Chablis Grand Cru Valmur",
    appellation: "Chablis Grand Cru AOC",
    color: "blanc",
    category: "standard",
    labels: ["marronniers"],
    price: 62,
    inStock: true,
    cru: "grand cru",
    description: "Robe or, Grand Cru Valmur qui convaincra par sa puissance et sa complexité. Arômes de poires, de mirabelle et de toffee extrêmement puissants. Avec l'âge, le terroir kimméridgien révèle des notes minérales de pierres mouillées et des arômes tropicaux. Huîtres chaudes, Saint-Jacques, ris de veau, poissons en sauce. Garde 10 ans.",
    photo: "https://images.squarespace-cdn.com/content/v1/5e89a0e7cbe1c339cd01fd20/1601556452950-N0N8GMME0Q7WE2BAZEFU/Chablis+Grand+Cru+Valmur.jpeg",
  },

  // ─── ROSÉ · MAUPERTHUIS (en tête) ────────────────────────────────────────────
  {
    id: "rose",
    name: "Rosé",
    appellation: "Bourgogne AOC",
    color: "rose",
    category: "standard",
    labels: ["mauperthuis"],
    price: 15,
    description: "Pinot noir vinifié en saignée. Robe rose pâle aux reflets saumonés, nez délicat de fraise et de groseille. Bouche fraîche et gourmande, finale vive. Apéritif, cuisine d'été, salades de fruits rouges. Servir à 8–10 °C.",
    inStock: true,
    photo: "https://images.squarespace-cdn.com/content/v1/5e89a0e7cbe1c339cd01fd20/1685521864102-FU1O9MTW1KVTJIOK0FMT/ros%C3%A9.JPG",
  },

  // ─── BLANCS · MAUPERTHUIS UNIQUEMENT ────────────────────────────────────────
  {
    id: "saint-bris",
    name: "Le Saint-Bris",
    appellation: "Saint-Bris AOC",
    color: "blanc",
    category: "standard",
    labels: ["mauperthuis"],
    price: 14,
    inStock: true,
    description: "Seule appellation de Bourgogne à base de Sauvignon. Robe pâle aux reflets verts, nez expressif et aromatique — buis, agrumes, fruits de la passion. Bouche vive et désaltérante, belle fraîcheur en finale. Apéritif, fruits de mer, chèvre frais. Servir à 10–12 °C. Garde 2–3 ans.",
    photo: "https://images.squarespace-cdn.com/content/v1/5e89a0e7cbe1c339cd01fd20/1602146451749-72BFIQ8UAIHN7T8WUBJ8/Saint+Bris.jpg",
  },
  {
    id: "truffieres",
    name: "Les Truffières",
    appellation: "Bourgogne AOC",
    color: "blanc",
    category: "standard",
    labels: ["mauperthuis"],
    price: 14,
    inStock: true,
    description: "L'âme du terroir. Arômes de fleurs blanches (aubépine) et minéralité. Bouche fraîche et fleurie dévoilant sa complexité. Accompagne poissons, fromages de chèvre et desserts. Garde 3–5 ans.",
    photo: "https://images.squarespace-cdn.com/content/v1/5e89a0e7cbe1c339cd01fd20/1601545603824-74APDM5NVMCWJD00E5VB/Les+Truffieres.jpg",
  },
  {
    id: "grande-reserve-chardonnay",
    name: "Grande Réserve Chardonnay",
    appellation: "Bourgogne AOC",
    color: "blanc",
    category: "standard",
    labels: ["mauperthuis"],
    price: 19,
    inStock: false,
    description: "Robe jaune d'une belle brillance. Bouquet complexe et raffiné : fruits secs, pêche, cacahuètes et épices. Bouche structurée et ample, notes fruitées rehaussées de minéralité, subtils arômes toastés et caramel. Viandes blanches en sauce, poissons, Saint-Jacques. Garde 5–10 ans.",
  },

  // ─── ROUGES · MAUPERTHUIS ────────────────────────────────────────────────────
  {
    id: "les-brulis",
    name: "Les Brûlis",
    appellation: "Bourgogne AOC",
    color: "rouge",
    category: "standard",
    labels: ["mauperthuis"],
    price: 15,
    inStock: true,
    description: "Pinot noir fruité à la robe pourpre. Corbeille de petits fruits rouges et noirs — fraise, cerise, cassis, myrtille. Tannins souples, bouche fraîche et sapide. Apéritifs, charcuteries, grillades. Servir légèrement frais à 14 °C. Garde 2–3 ans.",
    photo: "https://images.squarespace-cdn.com/content/v1/5e89a0e7cbe1c339cd01fd20/1601546063596-PF69U88KMR29D0NSP68Q/Les+Brulis.jpg",
  },
  {
    id: "grande-reserve-pinot-noir",
    name: "Grande Réserve Pinot Noir",
    appellation: "Bourgogne AOC",
    color: "rouge",
    category: "standard",
    labels: ["mauperthuis"],
    price: 18,
    inStock: true,
    description: "Robe pourpre soutenue aux reflets grenats. Bouquet très fruité : cassis, cerise, griottine, mûre. Tannins fondus, structure ferme et veloutée. Pâtés en croûte, volailles, bœuf braisé, fromages affinés. Servir à 15 °C. Garde 5–10 ans.",
    photo: "https://images.squarespace-cdn.com/content/v1/5e89a0e7cbe1c339cd01fd20/1601545705075-X2TOF7RP6MZB52VQBB31/GRR.jpg",
  },
  {
    id: "renouel",
    name: "Renouel",
    appellation: "Bourgogne AOC",
    color: "rouge",
    category: "standard",
    labels: ["mauperthuis"],
    price: 24,
    inStock: true,
    description: "Pinot noir issu d'une parcelle de vieilles vignes. Robe rubis profonde, nez de fruits noirs mûrs et de sous-bois. Bouche ample, tannins enrobés, belle persistance aromatique. Viandes rouges, volailles en sauce, fromages affinés. Servir à 15–16 °C. Garde 5–8 ans.",
    photo: "https://images.squarespace-cdn.com/content/v1/5e89a0e7cbe1c339cd01fd20/1601559257712-ADGAIC9O93TWEX3RDLUA/Renouel.jpg",
  },
  {
    id: "irancy",
    name: "Irancy",
    appellation: "Irancy AOC",
    color: "rouge",
    category: "standard",
    labels: ["mauperthuis"],
    price: 20,
    inStock: true,
    cru: "village",
    description: "Pinot noir et César à la robe pourpre, vieillis en fûts de chêne. Bouquet très fruité, ferme et velouté. Arômes de cassis, cerise griotte et mûre. Tannins intégrés, texture soyeuse, fraîcheur naturelle. Côtes de bœuf grillées, charcuteries, Camembert, Chaource, Cantal. Garde 10 ans.",
    photo: "https://images.squarespace-cdn.com/content/v1/5e89a0e7cbe1c339cd01fd20/1601545895565-3BYG7ORJMHIY98KWRCRE/irancy.jpg",
  },
  {
    id: "cesar",
    name: "César",
    appellation: "Irancy AOC",
    color: "rouge",
    category: "standard",
    labels: ["mauperthuis"],
    price: 21,
    inStock: false,
    cru: "village",
    description: "Robe grenat très colorée aux reflets violacés. Nez dominé par le fruit et les épices. Bouche onctueuse et fondue, fruits confits avec une pointe d'acidité. Structure solide. Bœuf bourguignon, canard aux pruneaux, gigot d'agneau de 7 h. Garde 10 ans.",
    photo: "https://images.squarespace-cdn.com/content/v1/5e89a0e7cbe1c339cd01fd20/1601552534443-P0VF5W93XFZ3M36B07SG/Cesar+.jpeg",
  },
  {
    id: "mazelots",
    name: "Les Mazelots",
    appellation: "Irancy AOC",
    color: "rouge",
    category: "standard",
    labels: ["mauperthuis"],
    price: 24,
    inStock: true,
    cru: "village",
    description: "Robe pourpre intense aux reflets rubis. Puissants arômes de cerise, de violettes et de clous de girofle. Tannins soyeux et structurés, grande finesse et potentiel de garde exceptionnel. Viandes rouges saignantes, gibier. Servir à 16–18 °C. Garde 5–10 ans.",
    photo: "https://images.squarespace-cdn.com/content/v1/5e89a0e7cbe1c339cd01fd20/1601545940763-O9NMF07360K6KUBTO4X7/les+mazelot.jpg",
  },
  {
    id: "palotte",
    name: "Irancy Palotte",
    appellation: "Irancy AOC",
    color: "rouge",
    category: "standard",
    labels: ["mauperthuis"],
    price: 29,
    inStock: true,
    cru: "village",
    description: "Robe pourpre bien soutenue tirant légèrement sur le grenat. Bouquet très fruité : cassis, cerise griotte, mûre. Tannins légers et fins, structure ferme et veloutée. Côtes de bœuf grillées, volailles en cocotte. Élevage 18 mois en fûts, non filtré, non collé. Servir à 15 °C. Garde 15 ans.",
    photo: "https://images.squarespace-cdn.com/content/v1/5e89a0e7cbe1c339cd01fd20/1601559353141-594DL7WWU5SR2KW5UBTQ/palotte.jpg",
  },

  // ─── COLLECTION AMPHORE · MAUPERTHUIS ───────────────────────────────────────
  {
    id: "amphore-saint-bris",
    name: "Amphore · Saint-Bris",
    appellation: "Saint-Bris AOC",
    color: "blanc",
    category: "amphore",
    labels: ["mauperthuis"],
    price: 20,
    inStock: true,
    description: "Robe dorée aux reflets orangés. Notes de mandarines, zeste d'orange, réglisse, safran, muguet et rose. Bouche ample, finale sèche avec une légère structure tannique. Sauvignon Blanc vinifié en amphore de terre cuite. Viandes blanches, poissons, fromages de chèvre. Servir à 14 °C. Garde 8–10 ans.",
    photo: "https://images.squarespace-cdn.com/content/v1/5e89a0e7cbe1c339cd01fd20/1601559308705-79QW8GUS3VMJVMBR7MRX/Amphore+Saint+Bris.jpg",
  },
  {
    id: "amphore-chablis",
    name: "Amphore · Chablis",
    appellation: "Chablis AOC",
    color: "blanc",
    category: "amphore",
    labels: ["mauperthuis"],
    price: 20,
    inStock: true,
    description: "Robe dorée aux reflets rosés. Notes d'abricot, de mangue confite, arômes iodés et poivrés, rose et acacia. Chardonnay vinifié en amphore de terre cuite toscane, 12 mois en macération sur peaux, sans soufre. Entrée en bouche ronde, saveurs d'orange, légère structure tannique. Blanquette de veau, pot-au-feu. Garde 8–10 ans.",
    photo: "https://images.squarespace-cdn.com/content/v1/5e89a0e7cbe1c339cd01fd20/1601559093118-6XBIL0BOSXPIZIXHQ9CJ/Amphote+Chablis.jpg",
  },
  {
    id: "amphore-cesar",
    name: "Amphore · César",
    appellation: "Irancy AOC",
    color: "rouge",
    category: "amphore",
    labels: ["mauperthuis"],
    price: 20,
    inStock: true,
    description: "Robe rouge foncé aux reflets violets. Notes de cerises et de prunes, touches épicées de réglisse et de cacao, arômes subtils de violette. César vinifié en amphore de terre cuite toscane, 12 mois sans sulfites ajoutés, 6 mois en vieux fûts. Non filtré, non collé. Viandes rouges en sauce poivrée ou épicée. Servir à 14 °C. Garde 8–10 ans.",
    photo: "https://images.squarespace-cdn.com/content/v1/5e89a0e7cbe1c339cd01fd20/1601559153265-1ZD9XR00CRCOYY90WZP7/Ampore+Cesar.jpg",
  },
  {
    id: "amphore-pinot-noir",
    name: "Amphore · Pinot Noir",
    appellation: "Bourgogne AOC",
    color: "rouge",
    category: "amphore",
    labels: ["mauperthuis"],
    price: 20,
    inStock: true,
    description: "Robe rouge sombre aux reflets violacés. Notes de groseilles, zeste d'orange, poivre, cacao, rose et aubépine. Saveurs mêlant poivre et fruits rouges. Ample, finale légère, tannins subtils. Viandes rouges et fromages. Servir à 14 °C. Garde 8–10 ans.",
    photo: "https://images.squarespace-cdn.com/content/v1/5e89a0e7cbe1c339cd01fd20/1601559201540-TBO0VXF2QG9HI7SCOG8T/Amphore+PN.jpg",
  },
];

export const getWinesByColor = (color: Color) =>
  wines.filter((w) => w.color === color && w.category === "standard");

export const getAmphores = () =>
  wines.filter((w) => w.category === "amphore");

export const getWineBySlug = (slug: string) =>
  wines.find((w) => w.id === slug);

export const featuredWines = [
  "chablis-grand-cru-valmur",
  "palotte",
  "chablis-1er-montmains",
  "cesar",
  "amphore-chablis",
  "mazelots",
].map((id) => wines.find((w) => w.id === id)!).filter(Boolean);
