import type { VintageGroup } from "./wines";

export interface VintageEntry {
  year: number;
  title: string;
  text: string;
}

// Chroniques de millésime fondées sur les conditions climatiques réelles du
// vignoble auxerrois (Chablis, Saint-Bris, Irancy) et sur les
// caractéristiques propres à chaque climat / lieu-dit : exposition plein sud
// des Malantes, sol argilo-calcaire abrité de Mazelots, coteau le plus
// ensoleillé de Palotte face à la vallée de l'Yonne, terroir de Montpierreux,
// etc. Événements réels traversés par tout le vignoble : sécheresse et
// vendange précoce de 2020, gel historique du 5 avril 2021, sécheresse de
// 2022, abondance de 2023, gel et mildiou de 2024, canicules suivies de
// pluies diluviennes début septembre 2025.
export const VINTAGES: Record<VintageGroup, VintageEntry[]> = {
  "petit-chablis": [
    {
      year: 2025,
      title: "Canicules puis déluge de fin d'été",
      text: "Printemps précoce de deux semaines, deux vagues de canicule en juin puis fin août ont stressé ces parcelles ouvertes, avant des pluies orageuses spectaculaires début septembre. Vendanges resserrées juste avant la pluie pour préserver la tension de ce vin de soif.",
    },
    {
      year: 2024,
      title: "Une récolte rare, sauvée par la sélection",
      text: "Sur ces plateaux ouverts, parmi les plus exposés du vignoble, le gel du 18 au 23 avril puis la grêle de début mai ont frappé fort. La pluie quasi doublée tout l'été a entretenu une pression de mildiou constante. Pertes considérables, mais un tri sévère a permis de sauver un vin frais et pur.",
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
      text: "Douze mois glissants parmi les plus chauds jamais mesurés à Chablis. La sécheresse a resserré les grains sur ces plateaux dès le cœur de l'été, pour une vendange parmi les plus précoces jamais enregistrées, dès le 22 août. Raisin sain, donnant un vin équilibré malgré la chaleur.",
    },
  ],

  chablis: [
    {
      year: 2025,
      title: "Canicules puis déluge de fin d'été",
      text: "Un printemps précoce de deux semaines, deux canicules en juin puis fin août, puis 120 à 130 mm de pluie en 36 heures début septembre : Chablis a été l'appellation la plus touchée par la pourriture cette année-là. Rendements supérieurs à 2024 mais sous la moyenne, pour un vin concentré par la chaleur et sauvé par un tri rigoureux avant le gros de la pluie.",
    },
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

  "chablis-vv": [
    {
      year: 2025,
      title: "Canicules puis déluge de fin d'été",
      text: "Les vieilles vignes ont mieux résisté aux deux canicules de juin et fin août grâce à leurs racines profondes, avant que les pluies diluviennes de début septembre n'imposent un tri serré. Une cuvée dense malgré le millésime compliqué.",
    },
    {
      year: 2024,
      title: "Une récolte rare, sauvée par la sélection",
      text: "Comme sur l'ensemble du climat, gel et grêle ont réduit la récolte, mais la profondeur des vieilles vignes a permis de limiter le stress hydrique et de conserver une matière plus ample que sur de jeunes plants.",
    },
    {
      year: 2023,
      title: "Un millésime solaire et généreux",
      text: "Année généreuse partout, mais sur ces vieilles vignes, la maturité s'est révélée plus lente et plus régulière, donnant un vin mûr sans jamais perdre sa colonne vertébrale acide.",
    },
    {
      year: 2022,
      title: "Tension et concentration sous le soleil",
      text: "La sécheresse a moins marqué ces vignes aux racines profondes que sur de jeunes plants : un 2022 dense et persistant, sans dureté.",
    },
    {
      year: 2021,
      title: "Le gel historique du 5 avril",
      text: "Le gel du 5 avril a touché ces vieilles vignes comme le reste du vignoble, mais leur réserve naturelle a permis de limiter la chute de rendement par rapport aux jeunes parcelles voisines.",
    },
    {
      year: 2020,
      title: "L'année la plus chaude jamais enregistrée",
      text: "La sécheresse a été mieux supportée par ces vieilles vignes aux racines profondes, qui ont continué à alimenter les grappes quand les jeunes plants souffraient déjà.",
    },
  ],

  "chablis-vv-malantes": [
    {
      year: 2025,
      title: "Plein sud sous la canicule",
      text: "Plein sud, exposées au soleil toute la journée, les vignes des Malantes — parmi les plus vieilles du domaine, plantées en 1976 — ont accusé les deux vagues de chaleur de plein fouet. Maturité phénolique très avancée avant les pluies de septembre, pour un vin solaire et concentré.",
    },
    {
      year: 2024,
      title: "Une récolte rare, sauvée par l'exposition",
      text: "Même sur ce coteau plein sud, le gel et la grêle ont laissé peu de raisin. Mais l'exposition des Malantes a permis une maturité plus complète que sur les autres climats du village, pour un vin étonnamment équilibré.",
    },
    {
      year: 2023,
      title: "Un millésime solaire et généreux",
      text: "L'exposition plein sud des Malantes a amplifié la générosité du millésime : une cuvée mûre, presque solaire, portée par les plus vieilles vignes du domaine.",
    },
    {
      year: 2022,
      title: "Tension et concentration sous le soleil",
      text: "Sur ce coteau qui reçoit le soleil toute la journée, la sécheresse de 2022 a poussé la maturité au maximum : un vin riche, ample, à la limite de l'exubérance pour un Chablis.",
    },
    {
      year: 2021,
      title: "Le gel historique du 5 avril",
      text: "Même un coteau plein sud comme celui des Malantes n'a pas échappé au gel du 5 avril. Le peu de raisin récolté, sur des vignes plantées en 1976, a donné une matière dense malgré la fraîcheur du millésime.",
    },
    {
      year: 2020,
      title: "L'année la plus chaude jamais enregistrée",
      text: "Plein sud et exposées toute la journée, les vignes des Malantes ont souffert de la sécheresse plus que d'autres climats plus frais. Une cuvée puissante et mûre, signature de ce coteau chaud.",
    },
  ],

  "chablis-1er-montmains": [
    {
      year: 2025,
      title: "Canicules puis déluge de fin d'été",
      text: "Sur le terroir caillouteux des Butteaux à Montmains, les canicules de juin et fin août ont resserré les baies avant les pluies de début septembre. Un Montmains ciselé mais plus charnu qu'à l'habitude.",
    },
    {
      year: 2024,
      title: "Une récolte rare, sauvée par le drainage",
      text: "Le mildiou et la grêle ont aussi frappé Montmains, mais le sol caillouteux des Butteaux draine bien l'excès d'eau : une petite récolte, mais un vin qui garde la précision habituelle du climat.",
    },
    {
      year: 2023,
      title: "Un millésime solaire et généreux",
      text: "Sur ces sols caillouteux, la générosité de 2023 a donné un Montmains ample dès sa jeunesse, sans perdre le profil ciselé propre aux Butteaux.",
    },
    {
      year: 2022,
      title: "Tension minérale sous le soleil",
      text: "La sécheresse a accentué le caractère minéral des Butteaux : un Montmains tendu, presque austère dans sa jeunesse, qui s'ouvrira avec le temps.",
    },
    {
      year: 2021,
      title: "Le gel historique du 5 avril",
      text: "Le gel a réduit les volumes sur Montmains comme partout, mais le sol caillouteux des Butteaux a permis de préserver une matière dense malgré la fraîcheur du millésime.",
    },
    {
      year: 2020,
      title: "L'année la plus chaude jamais enregistrée",
      text: "La sécheresse de 2020 a été bien gérée par les sols caillouteux de Montmains, drainants par nature : un vin ample malgré le manque d'eau, fidèle à la puissance habituelle du climat.",
    },
  ],

  "chablis-1er-cote-jouan": [
    {
      year: 2025,
      title: "Canicules puis déluge de fin d'été",
      text: "Climat plus discret, Côte de Jouan a aussi subi les canicules et les pluies de septembre, mais sa finesse naturelle s'est traduite par un vin tout en longueur plutôt qu'en puissance, fidèle à son style.",
    },
    {
      year: 2024,
      title: "Une récolte rare, mais fidèle au style",
      text: "Petite récolte comme partout, mais la discrétion de ce climat se prête bien aux années compliquées : un vin fin, sur la longueur plutôt que sur la matière.",
    },
    {
      year: 2023,
      title: "Un peu plus de chair, sans perdre la finesse",
      text: "La générosité de 2023 a donné un peu plus de chair que d'habitude à ce climat habituellement discret, sans jamais sacrifier sa finesse caractéristique.",
    },
    {
      year: 2022,
      title: "Silex et noisette concentrés",
      text: "La sécheresse a concentré les arômes de silex et de noisette propres à ce climat, pour un vin fin mais plus présent que d'ordinaire.",
    },
    {
      year: 2021,
      title: "Le gel historique du 5 avril",
      text: "Le gel a réduit la récolte sur ce petit climat comme sur les autres. Le peu de Côte de Jouan vendangé garde toute la finesse et la longueur habituelles, sur une matière plus légère.",
    },
    {
      year: 2020,
      title: "L'année la plus chaude jamais enregistrée",
      text: "Discret et raffiné, ce climat a transformé la sécheresse de 2020 en un supplément de maturité, sans perdre sa subtilité aromatique habituelle.",
    },
  ],

  "chablis-grand-cru": [
    {
      year: 2025,
      title: "Même un Grand Cru sous le déluge",
      text: "Même un Grand Cru comme Valmur n'a pas échappé aux pluies diluviennes de début septembre, mais le tri sévère et la profondeur du terroir kimméridgien ont permis de sauver un vin dense et puissant, qui demandera comme toujours de la patience.",
    },
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
      year: 2025,
      title: "Canicules puis déluge de fin d'été",
      text: "Le Sauvignon, sensible à l'humidité, a souffert des pluies de début septembre après deux canicules qui avaient déjà concentré les baies. Un Saint-Bris 2025 plus rare, mais d'une intensité aromatique remarquable sur les raisins sauvés.",
    },
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

  "irancy-village": [
    {
      year: 2025,
      title: "Canicules puis déluge de fin d'été",
      text: "L'assemblage qui fait l'Irancy village a permis de lisser les excès de ce millésime contrasté : chaleur concentrante en été, pluies diluantes en septembre. Un vin équilibré, fidèle au style classique de l'appellation.",
    },
    {
      year: 2024,
      title: "Entre canicules et orages, une récolte précieuse",
      text: "Hiver doux, gel de printemps sur la floraison, été alternant canicules et orages violents. Volumes modestes, mais l'assemblage pinot noir et césar a permis de conserver l'équilibre habituel de la cuvée village.",
    },
    {
      year: 2023,
      title: "Un grand millésime pour Irancy",
      text: "Conditions climatiques quasi idéales pour la maturation : un grand millésime pour l'Irancy village, avec des rendements en hausse sans perte de qualité, sur un fruit éclatant.",
    },
    {
      year: 2022,
      title: "Gel printanier puis sécheresse, sauvés par les pluies d'août",
      text: "Gel d'avril puis sécheresse estivale, sauvées par les pluies de mi-août : un Irancy village concentré, aux tannins mûrs, sur un millésime jugé parmi les plus réussis de la décennie.",
    },
    {
      year: 2021,
      title: "Le gel historique du 5 avril",
      text: "Le gel du 5 avril a frappé toute la commune, réduisant la récolte de moitié à deux tiers. L'assemblage village, même rare cette année-là, garde un style frais et digeste.",
    },
    {
      year: 2020,
      title: "Sécheresse et récolte précoce",
      text: "La sécheresse a réduit les rendements de pinot noir jusqu'à 40 % selon les parcelles, mais sans pression sanitaire : un Irancy village mûr et sain, vendangé tôt.",
    },
  ],

  "irancy-cesar": [
    {
      year: 2025,
      title: "Un cépage tardif exposé au déluge",
      text: "Cépage tardif, le César a été particulièrement exposé aux pluies de début septembre après deux canicules déjà éprouvantes. Une cuvée rare cette année, mais à l'intensité aromatique et épicée préservée sur les raisins sauvés.",
    },
    {
      year: 2024,
      title: "Un cépage sensible aux aléas de fin de saison",
      text: "Cépage rare et tardif, le César est l'un des plus sensibles aux aléas climatiques de fin de saison, et 2024 n'a pas fait exception : petite récolte, mais un fruit confit préservé sur les grappes triées.",
    },
    {
      year: 2023,
      title: "Une maturité enfin complète",
      text: "La maturation idéale de 2023 a profité au César, cépage tardif habituellement à la peine pour mûrir complètement : une cuvée riche, épicée, l'une des plus réussies de la décennie.",
    },
    {
      year: 2022,
      title: "Concentration naturelle sous la sécheresse",
      text: "La sécheresse a accentué la concentration déjà naturelle du César, cépage à peau épaisse : un vin onctueux, presque confit, typique des années chaudes.",
    },
    {
      year: 2021,
      title: "Le gel historique du 5 avril",
      text: "Cépage tardif, le César a particulièrement souffert du gel d'avril puis de l'été frais et humide qui a suivi : une récolte minuscule, pour un vin plus vif et moins épicé qu'à l'accoutumée.",
    },
    {
      year: 2020,
      title: "Une maturité en avance sur son calendrier habituel",
      text: "La sécheresse a avancé la maturité de ce cépage habituellement tardif, donnant un César mûr et concentré, sans attendre la fin de saison comme les autres années.",
    },
  ],

  "irancy-mazelots": [
    {
      year: 2025,
      title: "Abrité des vents, exposé à la canicule",
      text: "Sur ce climat abrité des vents du nord, à mi-coteau, les deux canicules ont mûri le raisin en profondeur avant que les pluies de septembre ne viennent compliquer la fin de cycle. Tannins soyeux malgré tout, fidèles à la patte de Mazelots.",
    },
    {
      year: 2024,
      title: "Un sol argilo-calcaire mieux abrité",
      text: "Le sol argilo-calcaire de Mazelots, abrité des vents dominants, a un peu mieux résisté au mildiou que les parcelles plus exposées du village. Petite récolte, mais des tannins fins, comme à l'habitude sur ce climat.",
    },
    {
      year: 2023,
      title: "Un grand millésime à mi-coteau",
      text: "À mi-coteau, exposé sud-sud-ouest, Mazelots a profité pleinement de la générosité de 2023 : un vin aux tannins soyeux, déjà très harmonieux.",
    },
    {
      year: 2022,
      title: "Un sous-sol argileux qui retient l'eau",
      text: "Le sol argileux en sous-sol de Mazelots a mieux retenu l'eau pendant la sécheresse qu'ailleurs sur la commune, limitant le stress hydrique malgré une année chaude.",
    },
    {
      year: 2021,
      title: "Le gel historique du 5 avril",
      text: "Abrité des vents du nord, Mazelots a tout de même subi le gel du 5 avril comme l'ensemble de la commune. La petite récolte garde la finesse tannique habituelle du climat, sur une matière plus légère.",
    },
    {
      year: 2020,
      title: "Un sol qui limite le stress hydrique",
      text: "Le sol argilo-calcaire de Mazelots, qui retient mieux l'eau que les sols les plus caillouteux, a permis de limiter le stress hydrique de la sécheresse de 2020.",
    },
  ],

  "irancy-palotte": [
    {
      year: 2025,
      title: "Le coteau le plus ensoleillé sous la canicule",
      text: "Plein sud, face à la vallée de l'Yonne, Palotte a pleinement profité des deux canicules avant les pluies de septembre. Un vin aussi structuré et tannique qu'à l'accoutumée, peut-être l'un des plus réussis du millésime sur la commune.",
    },
    {
      year: 2024,
      title: "Une exposition qui a sauvé la structure",
      text: "Même le climat le plus réputé de la commune n'a pas échappé au gel et à la grêle de 2024. Petite récolte, mais l'exposition plein sud de Palotte a permis de préserver une structure tannique fidèle à sa réputation.",
    },
    {
      year: 2023,
      title: "Un grand millésime sur le coteau le plus prestigieux",
      text: "Climat le plus ensoleillé de la commune, Palotte a amplifié la générosité de 2023 : un vin ample et structuré, parmi les plus prestigieux de l'appellation cette année-là.",
    },
    {
      year: 2022,
      title: "Concentration maximale sous la sécheresse",
      text: "Plein sud et particulièrement exposé, Palotte a concentré le raisin sous la sécheresse de 2022 : un vin puissant, tannique, à la structure ferme caractéristique du climat.",
    },
    {
      year: 2021,
      title: "Le gel historique du 5 avril",
      text: "Le climat le plus réputé de la commune n'a pas non plus échappé au gel du 5 avril. La petite récolte garde la structure tannique propre à Palotte, sur une matière plus svelte que d'habitude.",
    },
    {
      year: 2020,
      title: "Le versant le plus ensoleillé face à la vallée",
      text: "Plein sud, sur le versant le plus ensoleillé de la commune face à la vallée, Palotte a accusé la sécheresse de 2020 par une maturité phénolique très avancée, pour un vin dense et tannique.",
    },
  ],

  "montpierreux-blanc": [
    {
      year: 2025,
      title: "Canicules puis déluge de fin d'été",
      text: "Sur le terroir de Montpierreux, les deux canicules de l'été ont concentré le Chardonnay avant les pluies de début septembre. Une cuvée mûre, sur les fleurs blanches et le fruit confit, vendangée juste avant le gros de la pluie.",
    },
    {
      year: 2024,
      title: "Une récolte rare, sauvée par la sélection",
      text: "Le terroir de Montpierreux a aussi subi la pression de mildiou qui a marqué toute la Bourgogne du nord en 2024. Petite récolte, mais l'équilibre floral et minéral habituel de la cuvée a été préservé sur les raisins sains.",
    },
    {
      year: 2023,
      title: "Un millésime solaire et généreux",
      text: "La générosité de 2023 a donné, sur le terroir de Montpierreux, un Chardonnay déjà ouvert, sur les fleurs blanches et une rondeur inhabituelle pour cette cuvée.",
    },
    {
      year: 2022,
      title: "Tension et concentration sous le soleil",
      text: "La sécheresse a concentré le Chardonnay de Montpierreux, donnant une cuvée plus structurée et toastée que les années plus fraîches.",
    },
    {
      year: 2021,
      title: "Le gel historique du 5 avril",
      text: "Le gel d'avril a réduit les volumes sur le terroir de Montpierreux comme ailleurs en Bourgogne. Le peu de Chardonnay vendangé garde une fraîcheur florale typique des années froides.",
    },
    {
      year: 2020,
      title: "Sécheresse et récolte précoce",
      text: "Sur le terroir de Montpierreux, la sécheresse de 2020 a donné un Chardonnay mûr et rond, vendangé tôt pour préserver l'équilibre floral propre à cette cuvée.",
    },
  ],

  "montpierreux-rouge": [
    {
      year: 2025,
      title: "Canicules puis déluge de fin d'été",
      text: "Sur ce même terroir de Montpierreux planté en pinot noir, les canicules de l'été ont mûri les baies en profondeur avant les pluies de septembre. Une cuvée veloutée, fidèle à la structure constante de cet assemblage de plusieurs parcelles.",
    },
    {
      year: 2024,
      title: "Entre canicules et orages, une récolte précieuse",
      text: "Le terroir de Montpierreux a aussi été touché par le gel et les orages de 2024. Petite récolte, mais l'assemblage de plusieurs parcelles a permis de conserver la structure veloutée habituelle de cette réserve.",
    },
    {
      year: 2023,
      title: "Un millésime généreux et harmonieux",
      text: "Sur le terroir de Montpierreux, la générosité de 2023 a donné un pinot noir charnu et déjà harmonieux, dans la continuité du style de cette réserve.",
    },
    {
      year: 2022,
      title: "Tension et concentration sous le soleil",
      text: "La sécheresse a concentré le pinot noir de Montpierreux, pour une réserve plus structurée et tannique que les années plus fraîches.",
    },
    {
      year: 2021,
      title: "Le gel historique du 5 avril",
      text: "Le gel d'avril a réduit les volumes de pinot noir sur le terroir de Montpierreux comme dans toute la Bourgogne. La réserve 2021, plus rare, garde un style frais et digeste.",
    },
    {
      year: 2020,
      title: "Sécheresse et récolte précoce",
      text: "Sur le terroir de Montpierreux, la sécheresse de 2020 a donné un pinot noir mûr et fruité, sans dureté malgré la chaleur de l'année.",
    },
  ],

  "bourgogne-rouge": [
    {
      year: 2025,
      title: "Canicules puis déluge de fin d'été",
      text: "Les Brûlis, pensé pour être bu jeune et fruité, a profité de la concentration apportée par les deux canicules de l'été, avant les pluies de septembre qui ont un peu dilué la fin de cycle. Un vin gourmand, sur le fruit, comme toujours.",
    },
    {
      year: 2024,
      title: "Entre canicules et orages, une récolte précieuse",
      text: "Comme sur l'ensemble de la commune, les volumes sont restés modestes en 2024, mais Les Brûlis garde son profil gourmand et fruité sur les raisins sauvés du tri.",
    },
    {
      year: 2023,
      title: "Un grand millésime, gourmand et éclatant",
      text: "Conditions quasi idéales pour la maturation du pinot noir : Les Brûlis 2023 est particulièrement gourmand, sur un fruit rouge éclatant.",
    },
    {
      year: 2022,
      title: "Sécheresse marquée, sauvée par les pluies d'août",
      text: "Sécheresse marquée tout l'été, avec des pluies salvatrices à la mi-août : Les Brûlis 2022 garde malgré tout sa gourmandise fruitée, avec un supplément de concentration.",
    },
    {
      year: 2021,
      title: "Le gel historique du 5 avril",
      text: "Le gel d'avril a réduit les volumes de pinot noir destinés à Les Brûlis. La cuvée 2021, plus rare, garde un style frais et léger, fidèle à l'esprit de ce vin de soif.",
    },
    {
      year: 2020,
      title: "Sécheresse et récolte précoce",
      text: "La sécheresse a réduit les rendements, mais Les Brûlis 2020 reste un vin mûr et fruité, sans dureté, vendangé tôt.",
    },
  ],

  "renouel-blanc": [
    {
      year: 2025,
      title: "Un îlot de blanc sous la canicule",
      text: "Sur ce minuscule îlot de chardonnay au cœur d'une commune presque exclusivement rouge, les deux canicules de l'été ont concentré le raisin avant les pluies de début septembre. Un Renouel tendu, vendangé juste à temps.",
    },
    {
      year: 2024,
      title: "Une récolte rare sur une parcelle déjà rare",
      text: "Le gel et la grêle ont aussi touché ce minuscule îlot de blanc, réduisant encore une récolte déjà confidentielle. Le peu de Renouel produit garde la minéralité kimméridgienne propre au climat.",
    },
    {
      year: 2023,
      title: "Un millésime solaire et généreux",
      text: "La générosité de 2023 a profité à cette parcelle d'exception : un Renouel mûr et rond, sans jamais perdre la tension propre aux marnes kimméridgiennes d'Irancy.",
    },
    {
      year: 2022,
      title: "Tension et concentration sous le soleil",
      text: "La sécheresse a concentré le chardonnay sur ce terroir rare, donnant un Renouel plus solaire que d'habitude, tout en gardant sa minéralité caractéristique.",
    },
    {
      year: 2021,
      title: "Le gel historique du 5 avril",
      text: "Le gel du 5 avril a touché cette commune presque exclusivement rouge comme le reste de la Bourgogne. Sur ce minuscule îlot de blanc, la récolte a été particulièrement réduite, mais d'une grande pureté minérale.",
    },
    {
      year: 2020,
      title: "L'année la plus chaude jamais enregistrée",
      text: "Sur ce terroir d'exception, la sécheresse de 2020 a donné un Renouel mûr et rond, vendangé tôt pour préserver l'équilibre propre à cette parcelle rare de chardonnay en pays de pinot noir.",
    },
  ],

  cremant: [
    {
      year: 2025,
      title: "Vendangé avant le déluge",
      text: "Vendangé avant les pluies diluviennes de début septembre, le Crémant a échappé au pire de l'épisode qui a marqué la fin du millésime à Chablis. Une base mousseuse fraîche, préservée par une récolte précoce.",
    },
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
      year: 2025,
      title: "Vendangé avant le déluge",
      text: "Vinifié en saignée sur des raisins vendangés avant les pluies de septembre, le Rosé 2025 a échappé à la dilution de fin de cycle. Une cuvée fraîche et fruitée, à l'abri des excès du millésime.",
    },
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
