import type { VintageGroup } from "./wines";

export interface VintageEntry {
  year: number;
  title: string;
  text: string;
}

// Chroniques de millésime fondées sur les conditions climatiques réelles du
// vignoble auxerrois (Chablis, Saint-Bris, Irancy) et de la Bourgogne plus
// largement : sécheresse et récolte précoce de 2020, gel historique du
// 5 avril 2021, sécheresse de 2022, abondance de 2023, gel et mildiou de
// 2024. Chaque appellation réagit différemment à ces mêmes événements selon
// son exposition, son sol et son cépage.
export const VINTAGES: Record<VintageGroup, VintageEntry[]> = {
  "petit-chablis": [
    {
      year: 2024,
      title: "Une récolte rare, sauvée par la sélection",
      text: "Sur ces plateaux ouverts, parmi les plus exposés du vignoble, le gel du 18 au 23 avril puis la grêle de début mai ont frappé fort. La pluie quasi doublée tout l'été a entretenu une pression de mildiou constante. Pertes considérables, mais un tri sévère a permis de sauver un vin frais et pur sur les rares grappes saines.",
    },
    {
      year: 2023,
      title: "Un millésime solaire et généreux",
      text: "Débourrement tardif début avril, floraison rapide et homogène : le Petit Chablis a échappé au gel et profité d'un été chaud et bien arrosé. Récolte généreuse, fruit déjà mûr et ouvert dès la mise en bouteille.",
    },
    {
      year: 2022,
      title: "Tension et concentration sous le soleil",
      text: "La sécheresse a resserré les baies plus vite que sur les autres climats, sur ces sols plus superficiels. Volumes corrects malgré tout, pour un vin tendu, nerveux, taillé pour la soif.",
    },
    {
      year: 2021,
      title: "Le gel historique du 5 avril",
      text: "Dix nuits de gel consécutives début avril, certaines à -8 °C, ont détruit la majorité du bourgeonnement sur ces parcelles parmi les plus exposées du vignoble. L'été frais et humide qui a suivi a limité davantage les volumes. Le peu de Petit Chablis vendangé, à partir du 20 septembre, affiche une acidité vibrante et une vraie pureté minérale.",
    },
    {
      year: 2020,
      title: "L'année la plus chaude jamais enregistrée",
      text: "Douze mois glissants parmi les plus chauds jamais mesurés à Chablis. La sécheresse a resserré les grains sur ces plateaux dès le cœur de l'été, pour une vendange parmi les plus précoces jamais enregistrées, dès le 22 août. Raisin sain, sans aucune pression sanitaire, donnant un vin équilibré malgré la chaleur.",
    },
  ],
  chablis: [
    {
      year: 2024,
      title: "Une récolte rare, sauvée par la sélection",
      text: "Gel du 18 au 23 avril, grêle dès le 1er mai puis épisodes répétés jusqu'à fin juillet, pluviométrie quasiment doublée par rapport à la normale. La pression de mildiou a été constante, imposant un tri sévère à la vigne comme au chai. Les volumes ont chuté de 60 à 90 % chez de nombreux producteurs, mais les raisins sauvés affichent une fraîcheur et une pureté de fruit remarquables.",
    },
    {
      year: 2023,
      title: "Un millésime solaire et généreux",
      text: "L'hiver doux et sec a retardé le débourrement jusqu'au début avril, permettant d'échapper aux gelées de printemps. La floraison rapide et homogène a promis une récolte généreuse, confirmée par un été chaud arrosé aux moments clés. Des vins mûrs, gourmands et déjà très accessibles dans leur jeunesse.",
    },
    {
      year: 2022,
      title: "Tension et concentration sous le soleil",
      text: "Une année particulièrement sèche, avec très peu de jus dans les baies : les raisins, petits et concentrés, ont donné des volumes corrects malgré la sécheresse estivale. Les vins issus de 2022 se distinguent par leur tension minérale et leur matière concentrée.",
    },
    {
      year: 2021,
      title: "Le gel historique du 5 avril",
      text: "Dix nuits de gel consécutives début avril, certaines à -8 °C, ont détruit en moyenne 80 % de la récolte de Chablis, certaines parcelles à 100 %. L'été frais et pluvieux a ajouté oïdium et mildiou. Vendanges tardives, à partir du 20 septembre, pour un vin rare, à l'acidité vibrante et à la forte typicité de terroir.",
    },
    {
      year: 2020,
      title: "L'année la plus chaude jamais enregistrée",
      text: "Douze mois glissants parmi les plus chauds jamais mesurés à Chablis. La sécheresse a réduit les volumes de 20 à 30 %, mais sans aucune pression sanitaire : une récolte saine, vendangée dès le 22 août, donnant un vin classique et équilibré, autour de 12,5° naturels.",
    },
  ],
  "chablis-1er-cru": [
    {
      year: 2024,
      title: "Une récolte rare, sauvée par la sélection",
      text: "Mildiou et grêle ont aussi frappé les Premiers Crus, mais l'exposition de ces coteaux a permis, après un tri sévère, de sauver une matière étonnamment dense pour une si petite récolte.",
    },
    {
      year: 2023,
      title: "Un millésime solaire et généreux",
      text: "Récolte généreuse et mûre comme partout dans le vignoble cette année-là, avec sur ces climats un supplément de profondeur et de tenue en bouche, porté par l'exposition des coteaux.",
    },
    {
      year: 2022,
      title: "Tension et concentration sous le soleil",
      text: "La sécheresse a concentré le raisin sur ces sols caillouteux peu profonds, donnant des vins puissants et denses malgré une année compliquée pour les volumes.",
    },
    {
      year: 2021,
      title: "Le gel historique du 5 avril",
      text: "Le gel du 5 avril a aussi touché les Premiers Crus, mais leur situation en coteau a limité un peu les dégâts par rapport aux parcelles de fond de vallée. Petits volumes, mais une matière plus dense, portée par une acidité de grande fraîcheur.",
    },
    {
      year: 2020,
      title: "L'année la plus chaude jamais enregistrée",
      text: "Sur ces coteaux mieux exposés, la sécheresse a aussi resserré les baies, mais l'altitude et l'exposition ont mieux protégé la vigne de l'excès de chaleur. Un vin ample malgré le millésime sec, vendangé fin août.",
    },
  ],
  "chablis-grand-cru": [
    {
      year: 2024,
      title: "Une récolte historiquement petite",
      text: "Récolte historiquement petite sur l'ensemble du climat, mais sur ce terroir d'exception, le tri sévère a permis de conserver l'essentiel : un Grand Cru rare et concentré, qui demandera de la patience.",
    },
    {
      year: 2023,
      title: "Un millésime solaire et généreux",
      text: "Année généreuse et mûre qui a permis au Grand Cru d'exprimer toute son ampleur, sans jamais perdre la tension propre à son terroir kimméridgien.",
    },
    {
      year: 2022,
      title: "Tension et concentration sous le soleil",
      text: "La sécheresse a concentré le Chardonnay sur ce terroir d'exception, donnant un vin dense et solaire, déjà très expressif malgré l'année compliquée.",
    },
    {
      year: 2021,
      title: "Le gel historique du 5 avril",
      text: "Même les Grands Crus n'ont pas échappé au gel du 5 avril, mais leur terroir d'exception a permis de tirer le meilleur d'une récolte minuscule : un vin rare, tendu, d'une grande pureté.",
    },
    {
      year: 2020,
      title: "L'année la plus chaude jamais enregistrée",
      text: "Le Grand Cru a parfaitement digéré la sécheresse de 2020 : la profondeur du sol kimméridgien a amorti le stress hydrique, donnant un vin déjà très complet, promis à une belle garde.",
    },
  ],
  "saint-bris": [
    {
      year: 2024,
      title: "Une récolte rare, sauvée par la sélection",
      text: "Le mildiou a particulièrement pesé sur le Sauvignon, sensible à l'humidité. Petite récolte, mais une fraîcheur et une netteté aromatique préservées sur les raisins sains.",
    },
    {
      year: 2023,
      title: "Un millésime solaire et généreux",
      text: "Récolte généreuse et mûre : le Saint-Bris 2023 s'ouvre déjà sur des arômes exubérants de fruits de la passion, avec une rondeur inhabituelle pour ce cépage vif.",
    },
    {
      year: 2022,
      title: "Tension et concentration sous le soleil",
      text: "La sécheresse a concentré les arômes de buis et d'agrumes typiques du Sauvignon, pour un Saint-Bris intense et désaltérant malgré tout.",
    },
    {
      year: 2021,
      title: "Le gel historique du 5 avril",
      text: "Le gel du 5 avril a aussi touché ces parcelles, réduisant fortement les volumes. Le peu de Sauvignon récolté affiche une tension et une netteté aromatique remarquables, typiques des années fraîches.",
    },
    {
      year: 2020,
      title: "L'année la plus chaude jamais enregistrée",
      text: "La sécheresse de 2020 a accentué le caractère aromatique du Sauvignon, donnant un Saint-Bris exubérant, sur les fruits exotiques, avec une fraîcheur préservée malgré la chaleur.",
    },
  ],
  irancy: [
    {
      year: 2024,
      title: "Entre canicules et orages, une récolte précieuse",
      text: "Après un hiver doux, le gel de printemps a entamé la floraison, puis l'été a alterné vagues de chaleur intense et orages violents. Les volumes sont restés modestes, mais les parcelles épargnées ont produit des pinots noirs et césars à la matière concentrée et au fruit très pur.",
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
    {
      year: 2021,
      title: "Le gel historique du 5 avril",
      text: "Sur les parcelles basses d'Irancy, où le froid s'accumule la nuit, le gel du 5 avril a frappé durement. Sur l'ensemble de la Bourgogne, les pertes de pinot noir ont atteint la moitié à deux tiers de la récolte. Le peu de raisin vendangé donne un vin plus frais et plus léger, dans un style classique et digeste.",
    },
    {
      year: 2020,
      title: "Sécheresse et récolte précoce",
      text: "La sécheresse a réduit les rendements de pinot noir jusqu'à 40 % selon les parcelles, mais sans pression sanitaire : un Irancy mûr, sain, vendangé tôt, dans un style charnu et équilibré.",
    },
  ],
  "bourgogne-blanc": [
    {
      year: 2024,
      title: "Une récolte rare, sauvée par la sélection",
      text: "La pression de mildiou a touché toutes les parcelles de Chardonnay du secteur. Petite récolte, mais un tri sévère a permis de préserver l'équilibre habituel de cette cuvée.",
    },
    {
      year: 2023,
      title: "Un millésime solaire et généreux",
      text: "Récolte généreuse et mûre, qui a permis de reconstituer les stocks après deux années compliquées : un blanc rond, déjà ouvert et gourmand.",
    },
    {
      year: 2022,
      title: "Tension et concentration sous le soleil",
      text: "La sécheresse a concentré le Chardonnay sur l'ensemble des parcelles, pour un Bourgogne blanc mûr et structuré, aux notes toastées plus marquées que d'habitude.",
    },
    {
      year: 2021,
      title: "Le gel historique du 5 avril",
      text: "Le gel et la pluie ont réduit les volumes sur l'ensemble des parcelles de Chardonnay, mais l'assemblage de plusieurs terroirs a permis de préserver un profil frais et équilibré malgré la rareté du millésime.",
    },
    {
      year: 2020,
      title: "Sécheresse et récolte précoce",
      text: "Les assemblages de plusieurs parcelles ont permis de lisser l'impact de la sécheresse : un Bourgogne blanc mûr, rond, sans excès, vendangé tôt.",
    },
  ],
  "bourgogne-rouge": [
    {
      year: 2024,
      title: "Entre canicules et orages, une récolte précieuse",
      text: "Entre canicules et orages violents, les volumes sont restés modestes sur l'ensemble des parcelles de pinot noir, mais celles qui ont été épargnées ont donné un fruit concentré et pur.",
    },
    {
      year: 2023,
      title: "Un grand millésime",
      text: "Conditions climatiques quasi idéales pour la maturation du pinot noir : un Bourgogne rouge 2023 d'une grande finesse, déjà très harmonieux.",
    },
    {
      year: 2022,
      title: "Sécheresse marquée, sauvée par les pluies d'août",
      text: "Sécheresse marquée tout l'été, avec des pluies salvatrices à la mi-août : un pinot noir concentré, aux tannins mûrs, sur un millésime jugé parmi les plus réussis de la décennie.",
    },
    {
      year: 2021,
      title: "Le gel historique du 5 avril",
      text: "Sur l'ensemble de la Bourgogne, le gel d'avril puis les maladies ont fait perdre la moitié à deux tiers de la récolte de pinot noir. Le peu de raisin vendangé donne un vin plus frais et plus léger, dans un style classique et digeste.",
    },
    {
      year: 2020,
      title: "Sécheresse et récolte précoce",
      text: "La sécheresse a réduit les rendements de pinot noir jusqu'à 40 %, mais le raisin est resté parfaitement sain. Un Bourgogne rouge mûr et fruité, sans dureté, malgré la chaleur de l'année.",
    },
  ],
  cremant: [
    {
      year: 2024,
      title: "Vendangé tôt, à l'abri du pire",
      text: "Récoltées parmi les premières, avant les pluies les plus intenses de fin d'été, les raisins du Crémant ont été relativement préservées de la pression de mildiou qui a marqué le reste du millésime.",
    },
    {
      year: 2023,
      title: "Une base mousseuse généreuse",
      text: "La floraison précoce et homogène de 2023 a donné des raisins sains en bonne quantité, vendangés avec une maturité optimale pour la prise de mousse, sur un fruit déjà ouvert.",
    },
    {
      year: 2022,
      title: "Fraîcheur préservée malgré la sécheresse",
      text: "Vendangées tôt pour préserver l'acidité nécessaire à l'effervescence, les raisins de la cuvée 2022 ont échappé au gros de la sécheresse estivale, pour une bulle fine et saline.",
    },
    {
      year: 2021,
      title: "Une cuvée rare, née du gel historique",
      text: "Même récolté tôt, le Crémant n'a pas échappé à l'ampleur du gel du 5 avril, qui a réduit les volumes sur tout le vignoble. La cuvée 2021 est rare, mais d'une fraîcheur et d'une finesse de bulle remarquables.",
    },
    {
      year: 2020,
      title: "Vendangé tôt, à l'abri de la sécheresse",
      text: "Vendangé tôt pour préserver l'acidité, le Crémant a échappé à l'essentiel de la sécheresse de fin d'été. Une base mousseuse fraîche malgré une année par ailleurs très chaude.",
    },
  ],
  rose: [
    {
      year: 2024,
      title: "Sauvé par une vendange précoce",
      text: "Vinifié en saignée dès les premiers jours de récolte, le Rosé 2024 a pu être mis de côté avant les pires épisodes de grêle et de pluie de fin de saison.",
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
    {
      year: 2021,
      title: "Une cuvée rare, née du gel historique",
      text: "Le gel du 5 avril a aussi réduit la récolte de pinot noir destinée au Rosé. La cuvée 2021, rare, se distingue par sa fraîcheur saline et sa robe très pâle, typique des années froides.",
    },
    {
      year: 2020,
      title: "Maturité solaire et fraîcheur préservée",
      text: "Vinifié en saignée sur des raisins gorgés de soleil, le Rosé 2020 affiche une maturité aromatique inhabituelle, sur la fraise confite, tout en gardant la fraîcheur nécessaire.",
    },
  ],
};
