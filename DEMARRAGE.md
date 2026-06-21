# Démarrage du projet

## 1. Installer Node.js

Télécharge et installe Node.js LTS depuis https://nodejs.org/

## 2. Installer les dépendances

```bash
cd ternynck
npm install
```

## 3. Lancer le serveur de développement

```bash
npm run dev
```

Le site sera visible sur http://localhost:3000

---

## Photos à placer dans `public/photos/`

| Fichier attendu | Photo recommandée |
|---|---|
| `hero.jpg` | `haut de saint bris soleil couchant MN regardant la vigne.jpg` |
| `philosophie.jpg` | `lesmarronniers_..._17.jpg` (homme à l'aube dans les vignes givrées) |
| `vendanges.jpg` | `Mauperthuis-vendanges-2023-03405.jpg` |
| `portrait-famille.jpg` | `MN L les 2 chien beau pere.jpg` |
| `domaine-mauperthuis.jpg` | `Mauperthuis-vendanges-2023-03563.jpg` |
| `domaine-marronniers.jpg` | `lesmarronniers_..._2.jpg` |
| `domaine-fontaine-goby.jpg` | `toute la pente de Montpierreux.jpg` |
| `domaine-gabrielle.jpg` | `Cesar mur de grappes et feuilles.jpg` |
| `histoire-1993.jpg` | `TAILLE FERVRIER 2010 003.jpg` |
| `histoire-irancy.jpg` | `Cesar une belle grappe.jpg` |
| `histoire-marronniers.jpg` | `lesmarronniers_..._50.jpg` |
| `histoire-bio.jpg` | `Montpierreux vigne taillee cailloux.jpg` |
| `histoire-vitiforesterie.jpg` | `pente de Montpierreux vue du bas et MN.jpg` |
| `histoire-lb.jpg` | `LB Vendange.JPG` ou `LB MN Opale.JPG` |

---

## Pages disponibles

- `/` — Homepage
- `/boutique` — Catalogue complet (filtre par couleur)
- `/boutique?couleur=blanc` — Blancs seulement
- `/boutique?couleur=rouge` — Rouges seulement
- `/boutique?categorie=amphore` — Collection Amphore
- `/vins/[id]` — Fiche produit (ex: `/vins/chablis-grand-cru-valmur`)
- `/histoire` — Chronologie de la famille

## Étape suivante : Stripe

Une fois le design validé, on intègre Stripe pour les paiements et on migre le contenu de mauperthuis.fr.
