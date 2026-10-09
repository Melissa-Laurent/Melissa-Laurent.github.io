# Melissa-Laurent.github.io

Portfolio de **Mélissa Laurent**, étudiante en architecture d'intérieur à Ynov Campus Val d'Europe.

🔗 **https://melissa-laurent.github.io**

Site statique (HTML / CSS / JavaScript, sans framework ni build), bilingue **français / anglais**, avec mode sombre.
Il reprend la structure du portfolio de [@RaphPicard](https://github.com/RaphPicard/RaphPicard.github.io) et l'identité visuelle de mon portfolio.

---

## Ce qu'il y a sur le site

| Section | Contenu |
|---|---|
| **Hero** | Nom, formation, recherche de stage BIM (juin 2027), carte profil, téléchargement du CV |
| **01 · À propos** | Présentation, portrait, points forts, localisation et disponibilité |
| **02 · Compétences** | Logiciels (AutoCAD, InDesign, Photoshop, Archicad, Revit), représentation, maquettes, qualités |
| **03 · Projets** | 5 projets avec filtres + page dédiée `html/projects.html` (10 projets) |
| **04 · Parcours** | Stage recherché, Ynov, SPIE Batignolles, animation, licence génie urbain, bac |
| **05 · Contact** | Email, ville, LinkedIn, Instagram, GitHub |

Fonctionnalités : bascule FR/EN mémorisée, mode clair/sombre sans flash, texte animé (typewriter), filtres de projets avec compteurs, **visionneuse des planches** (clic sur une image → toutes les planches du projet, flèches, swipe, Échap), apparition au scroll, barre de progression, bouton « J'aime ».

---

## Mise en ligne sur GitHub Pages

Le site est en ligne sur https://melissa-laurent.github.io.

---

## Tester en local

Le header et le footer sont chargés avec `fetch()` (`js/includes.js`) : il faut un **serveur local**, l'ouverture directe de `index.html` depuis le Finder (`file://`) n'affiche pas la navigation.

- **VS Code** : extension *Live Server* → clic droit sur `index.html` → *Open with Live Server*.
- **Terminal** : `python3 -m http.server 8000` puis ouvrir http://localhost:8000.

---

## Structure

```
├── index.html              Page principale (hero, à propos, compétences, projets, parcours, contact)
├── html/
│   ├── projects.html       Page « tous les projets »
│   ├── header.html         Navbar (injectée par js/includes.js)
│   └── footer.html         Footer (injecté par js/includes.js)
├── css/
│   ├── style.css           Point d'entrée : importe tous les autres fichiers
│   ├── variables.css       🎨 Couleurs, polices, ombres, rayons (charte de Mélissa)
│   ├── base.css            Reset, grain papier, halo de la souris, barre de progression
│   ├── layout.css          Conteneur, titres de section (grands numéros 01–05), formes décoratives
│   ├── navbar.css · hero.css · about.css · skills.css · projects.css
│   ├── project-filter.css · experience.css · contact.css
│   ├── lightbox.css        Visionneuse des planches
│   ├── responsive.css      Tablette et mobile
│   └── dark-mode.css       Version sombre (redéfinit les variables)
├── js/
│   ├── theme-init.js       Applique le thème avant l'affichage (anti-flash)
│   ├── includes.js         Charge header/footer, lien actif au scroll
│   ├── lang.js             Bascule FR/EN (attributs data-fr / data-en)
│   ├── typewriter.js       Textes animés (mots dans WORDS)
│   ├── lightbox.js         Visionneuse des planches
│   ├── project-filter.js   Filtres de projets
│   ├── project-img-fit.js  Adapte la hauteur des images de projets
│   ├── scroll-reveal.js · cursor-spotlight.js · nav.js · theme.js · likes.js
│   └── script.js           Note historique (contenu éclaté dans les fichiers ci-dessus)
└── assets/
    ├── PDP.jpg · Melissa.jpg            Photos
    ├── CV_Melissa_Laurent.pdf           CV (version web)
    ├── Portfolio_Melissa_Laurent.pdf    Portfolio complet (version web)
    ├── favicon.svg
    └── projets/                         Toutes les planches des projets
```

---

## Modifier le contenu

**Textes** : chaque texte traduit porte deux attributs, `data-fr="…"` et `data-en="…"`. Modifier les deux, ainsi que le texte entre les balises (version affichée sans JavaScript, en français).

**Ajouter un projet** :
1. Mettre les images dans `assets/projets/` (JPEG, 1600 px de large maximum suffit).
2. Copier une carte `<div class="project-card …">` existante dans `html/projects.html` (et dans `index.html` si elle doit apparaître sur l'accueil).
3. Adapter l'image de couverture, le titre, la description, les tags, et `data-tech="…"` (catégories des filtres : `habitat`, `erp`, `maquette`, `dessin`, `autocad`, `ateliers`).
4. Lister toutes les planches dans `<ul class="project-gallery" hidden>` : une ligne `<li><a href="…" data-fr="Légende" data-en="Caption">Légende</a></li>` par image.
5. Pour nommer la ou le binôme, ajouter `<span>Prénom</span>` (ou un lien `<a>`) dans `<div class="project-coworkers">` : « avec … » s'affiche automatiquement.

**Couleurs et polices** : tout est dans `css/variables.css` (et `css/dark-mode.css` pour le thème sombre).

| Couleur | Code | Usage |
|---|---|---|
| Crème | `#FEEBD6` | Fond |
| Bleu ciel | `#A6E2F9` | Blocs décoratifs, bouton CV |
| Pêche | `#F9B06B` | Cercles, badges, accents |
| Bleu marine | `#2A3E92` | Grands numéros, liens, bouton principal |
| Encre | `#231F20` | Texte, traits fins |

Les polices de mon PDF (Sakire, Nexa, SFT Schrifted Round) ne sont pas disponibles gratuitement en ligne : le site utilise des équivalents Google Fonts proches, **Bodoni Moda** (titres), **Figtree** (texte) et **Outfit** (labels).

---

## Confidentialité

- Le site n'affiche que l'**email** et la **ville**.
- Les PDF téléchargeables (`assets/CV_Melissa_Laurent.pdf` et `assets/Portfolio_Melissa_Laurent.pdf`) sont des **versions web** : le numéro de téléphone a été retiré et l'adresse postale remplacée par la ville (suppression réelle du texte, pas un simple cache).
