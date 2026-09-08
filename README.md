# RENOVO CRETE

Site vitrine (React + Vite + Tailwind, généré avec Lovable) et **portail professionnel** RENOVO CRETE.

## Démarrer

```sh
bun install
bun run dev        # http://localhost:8080
bun run test       # tests unitaires (vitest)
bun run lint
bun run build
```

## Portail professionnel (`/espace-pro`)

Le portail (calculateur de systèmes, commandes, suivi, visualiseur, administration) est une application
statique autonome servie depuis `public/espace-pro/` et affichée en plein écran par les routes
`/espace-pro`, `/dashboard` et `/dashboard-preview` (cette dernière force l'affichage des comptes de démonstration).

### Mettre à jour le portail à partir d'un export HTML monofichier

Le portail est produit à partir d'un fichier HTML unique (`RENOVO_CRETE_Vxx.html`). Ne modifiez jamais
`public/espace-pro/index.html`, `portal.css`, `sw.js` ou `js/*` à la main : relancez l'importateur.

```sh
node scripts/import-portal.mjs chemin/vers/RENOVO_CRETE_V30.html
bun run test
```

L'importateur :

- sépare le monolithe en `index.html` (balisage seul), `portal.css`, un fichier par couche de script dans `js/`
  (ordre d'exécution conservé) et extrait les images base64 vers `assets/` ;
- expose automatiquement les fonctions qu'une couche ultérieure utilise mais que la couche d'origine
  gardait privée dans son IIFE (ces appels échouaient silencieusement) ;
- remplace le titre de développement, le manifeste `data:` et ajoute `noindex`, icônes et manifeste PWA ;
- génère `sw.js` (cache hors ligne, invalidé automatiquement à chaque import).

Si le serveur de développement Vite tourne pendant l'import, il recharge la page automatiquement.

### Fichiers maintenus à la main (jamais écrasés par l'importateur)

| Fichier | Rôle |
| --- | --- |
| `public/espace-pro/portal.config.js` | Configuration d'exécution : titre, visibilité des comptes de démonstration (`showDemoAccounts`), service worker, lien retour vers le site. |
| `public/espace-pro/portal.launch.js` | Couche de production chargée en dernier : titre stable, masquage des comptes démo, lien « retour au site », journal des erreurs (`sessionStorage`). |
| `public/espace-pro/manifest.webmanifest` | Manifeste PWA. |
| `public/espace-pro/assets/icon-*.png`, `apple-touch-icon.png` | Icônes PWA. |
| `public/espace-pro/assets/hermetic-*.png` | Schémas de coupe des systèmes référencés par la bibliothèque technique. |

### Comptes de démonstration

Par défaut (`showDemoAccounts: "auto"`), l'encart des comptes de démonstration n'apparaît que sur
`localhost`, les hôtes de prévisualisation (`*.lovable.app`, …) ou avec `?demo=1` dans l'URL.
Passez la valeur à `false` dans `portal.config.js` avant une mise en production destinée aux clients.

> Le portail fonctionne entièrement dans le navigateur (données dans le stockage local de l'appareil,
> authentification côté client). Il convient aux démonstrations et aux propositions commerciales ; une
> exploitation multi-utilisateurs réelle nécessite un backend (comptes, base de données, e-mails).
