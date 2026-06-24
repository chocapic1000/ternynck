import type { Color } from "./wines";

export interface VintageEntry {
  year: number;
  title: string;
  text: string;
}

// Chroniques de millésime fondées sur les conditions climatiques réelles du
// vignoble auxerrois (Chablis, Irancy, Saint-Bris) : gel d'avril 2024, été
// 2024 contrasté, sécheresse 2022, abondance 2023, etc.
export const VINTAGES: Record<Color, VintageEntry[]> = {
  blanc: [
    {
      year: 2024,
      title: "Une récolte rare, sauvée par la sélection",
      text: "2024 restera comme l'un des millésimes les plus compliqués de la décennie à Chablis : gel du 18 au 23 avril, grêle dès le 1er mai puis épisodes répétés jusqu'à fin juillet, et une pluviométrie quasiment doublée par rapport à la normale. La pression de mildiou a été constante, imposant un tri sévère à la vigne comme au chai. Les volumes ont chuté de 60 à 90 % chez de nombreux producteurs, mais les raisins sauvés affichent une fraîcheur et une pureté de fruit remarquables, pour des vins à apprécier sur leur jeunesse.",
    },
    {
      year: 2023,
      title: "Un millésime solaire et généreux",
      text: "L'hiver doux et sec a retardé le débourrement jusqu'au début avril, permettant d'échapper aux gelées de printemps. La floraison rapide et homogène a promis une récolte généreuse, confirmée par un été chaud arrosé aux moments clés. Après les bons volumes de 2022, 2023 a permis de reconstituer les stocks avec des vins mûrs, gourmands et déjà très accessibles dans leur jeunesse.",
    },
    {
      year: 2022,
      title: "Tension et concentration sous le soleil",
      text: "Une année particulièrement sèche, avec très peu de jus dans les baies : les raisins, petits et concentrés, ont donné des volumes corrects malgré la sécheresse estivale. Les vins issus de 2022 se distinguent par leur tension minérale et leur matière concentrée, dans un style à la fois mûr et nerveux.",
    },
  ],
  rouge: [
    {
      year: 2024,
      title: "Entre canicules et orages, une récolte précieuse",
      text: "Après un hiver doux, le gel de printemps a entamé la floraison, puis l'été a alterné vagues de chaleur intense et orages violents. Les volumes sont restés modestes sur l'ensemble du secteur, mais les parcelles épargnées par le gel et la grêle ont produit des pinots noirs et césars à la matière concentrée et au fruit très pur.",
    },
    {
      year: 2023,
      title: "Un grand millésime pour Irancy",
      text: "Conditions climatiques quasi idéales pour la maturation : rendements en hausse, jusqu'à 54 hl/ha, sans perte de qualité. 2023 compte parmi les meilleurs millésimes récents pour les rouges d'Irancy, avec des vins d'une grande finesse et d'une belle complexité aromatique.",
    },
    {
      year: 2022,
      title: "Gel printanier puis sécheresse, sauvés par les pluies d'août",
      text: "Le gel du début avril a entamé 20 à 30 % de la récolte à venir, puis la sécheresse et un vent constant ont ralenti la maturation tout l'été. Les pluies de la mi-août sont arrivées à point nommé pour relancer le cycle. Rendements moyens autour de 47 hl/ha, pour un millésime considéré comme l'un des plus réussis de la décennie.",
    },
  ],
  bulle: [
    {
      year: 2024,
      title: "Vendangé tôt, à l'abri du pire",
      text: "Si l'essentiel de la Bourgogne du nord a souffert d'une pression de mildiou exceptionnelle, les raisins destinés au Crémant ont été récoltés parmi les premiers, avant les pluies les plus intenses de fin d'été. Résultat : une base mousseuse vive et acidulée, fidèle au style de la maison malgré une année difficile pour les vins tranquilles.",
    },
    {
      year: 2023,
      title: "Une base mousseuse généreuse",
      text: "La floraison précoce et homogène de 2023 a donné des raisins sains en bonne quantité, vendangés avec une maturité optimale pour la prise de mousse. Les bulles de ce millésime sont fines, sur un fruit déjà ouvert et une fraîcheur bien maîtrisée.",
    },
    {
      year: 2022,
      title: "Fraîcheur préservée malgré la sécheresse",
      text: "Vendangées tôt pour préserver l'acidité nécessaire à l'effervescence, les raisins de la cuvée 2022 ont échappé au gros de la sécheresse estivale. Résultat : une bulle fine et une fraîcheur saline, en contraste avec la maturité solaire du reste du millésime.",
    },
  ],
  rose: [
    {
      year: 2024,
      title: "Sauvé par une vendange précoce",
      text: "Vinifié en saignée dès les premiers jours de récolte, le Rosé 2024 a pu être mis de côté avant les pires épisodes de grêle et de pluie de fin de saison. Robe pâle, fruits rouges frais et une vivacité bienvenue dans un millésime par ailleurs très compliqué.",
    },
    {
      year: 2023,
      title: "Un rosé solaire et fruité",
      text: "Le bon ensoleillement et la maturité homogène de 2023 donnent un rosé particulièrement aromatique, sur la fraise et la groseille, avec une rondeur en bouche supérieure à la moyenne.",
    },
    {
      year: 2022,
      title: "Concentration et fraîcheur saline",
      text: "Issu de raisins concentrés par la sécheresse de l'été, le Rosé 2022 surprend par son intensité aromatique et sa fraîcheur saline en finale, malgré une année globalement chaude.",
    },
  ],
};
