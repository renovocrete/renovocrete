## Objectif

Étendre l'app RENOVO CRETE avec un espace sous-traitants public + interne, séparation stricte client/admin, calculateur enrichi, historique local et PDF doubles.

## Architecture des accès

```text
PUBLIC (clients)         INTERNE (auth requise)
─────────────────        ─────────────────────────
/sous-traitants          /dashboard            (admin OU contractor)
/sous-traitants/:slug    /dashboard/contractors (admin only)
                         /dashboard/projects
                         /dashboard/calculator
                         /dashboard/media
                         /auth (login)
```

- Rôles existants: `admin`, `contractor`, `user` → on les utilise tels quels
- `<ProtectedRoute>` vérifie session + rôle via `has_role`
- Le Dashboard n'apparaît dans la navbar publique que si l'utilisateur est connecté ET (admin OU contractor)
- Aucun lien public vers `/auth` ou `/dashboard` pour les clients non connectés (lien discret en footer "Espace pro")

## Côté public

**`/sous-traitants`** (déjà existe, on le reconstruit proprement)
- Liste des `contractor_profiles` où `is_published = true`
- Cartes: avatar, nom, tagline, ville, spécialités, badge "featured"
- Filtres simples: spécialité, ville

**`/sous-traitants/:slug`** (déjà existe partiellement)
- Header: cover_url, avatar, nom, tagline
- Bio, spécialités, zone d'intervention (city/country)
- Galerie images + vidéos depuis `contractor_media`
- Réalisations: projets de ce contractor où `status='completed'` ET marqués publics
- Coordonnées (téléphone, email, site, social) UNIQUEMENT si flags activés en interne
- Bouton "Demander un devis" → préremplit `/devis` avec `contractor_id`

**Aucune fuite**: pas d'affichage de revenue, costs, margin, prix internes.

## Côté interne (Dashboard)

Layout `/dashboard` avec sidebar:
- **Vue d'ensemble**: KPIs (nombre chantiers, CA, marge, chantiers en cours), graphique mensuel
- **Mon entreprise / Profil**: édition `contractor_profiles` + toggles visibilité (show_phone, show_email, show_address)
- **Médias**: upload images/vidéos vers bucket `contractor-media`, réordonner, légender
- **Chantiers**: CRUD `projects` (titre, client, adresse, surface, produit, statut, priorité, revenue, coûts, dates, photos avant/après, public oui/non)
- **Calculateur**: nouvelle version enrichie (voir plus bas)
- **Sous-traitants** (admin only): liste tous, créer/éditer/désactiver n'importe quel profil, forcer `is_published`, `is_featured`

## Schéma DB — ajouts

Migration nécessaire:
- `contractor_profiles`: `show_phone bool default false`, `show_email bool default false`, `show_address bool default false`, `show_social bool default true`, `service_areas text[] default '{}'`
- `projects`: `is_public bool default false`, `cost_material numeric default 0`, `cost_labor numeric default 0`, `margin numeric generated always as (revenue - cost_material - cost_labor) stored`
- `quote_requests`: `contractor_id` déjà présent → s'assurer que le devis public peut cibler un sous-traitant

RLS:
- Public peut voir `projects` SEULEMENT si `is_public = true` ET le contractor lié est publié → policy `SELECT` ajoutée
- Owner / admin garde l'accès complet existant

## Calculateur chantier (refonte)

Produits supportés (étend l'existant):
- Epoxy resin, Flakes, Quartz, Overlay, Rubber stone (roberstone), Custom

Champs:
- Surface m², nombre de couches, ratio A:B, rendement gallon/m², prix/gallon (matière)
- Taux main-d'œuvre €/m² OU €/h × heures
- Calcul: `gallons = surface * coats / yield`, arrondi 0.25 sup; `cost_material = gallons * price`; `cost_labor` selon mode; `total_cost`; `sale_price` (entrée OU markup %); `margin = sale - total_cost`; `total_devis`
- Validation Zod stricte (m² > 0, couches 1-10, etc.) — déjà en place, on étend

Persistance prix/gallon: déjà en localStorage, on garde.

## Historique local (IndexedDB via `idb-keyval`)

Store `renovo-quotes-history`:
- id, date, clientName, productKey, surface, totalCost, salePrice, margin, status (`draft`/`sent`/`accepted`/`refused`), payloadComplet
- UI dans le tab Calculateur: dernières 20 entrées
- Actions: recharger (réhydrate le formulaire), exporter à nouveau (PDF), supprimer
- Bouton "Effacer tout"

## PDFs (jspdf + autotable)

Deux fonctions:
- `exportClientPDF()`: en-tête RENOVO CRETE, infos client, ligne produit/surface/couches/prix unitaire/total, CGV courtes, signature
- `exportInternalPDF()`: tableau détaillé prix/gallon, ratio A:B, rendement, gallons calculés, coûts matière/main-d'œuvre, marge, % marge, notes chantier
- Watermark "INTERNE — NE PAS DIFFUSER" sur le PDF interne

## Bouton "Copier récapitulatif"

`navigator.clipboard.writeText(...)` avec format texte structuré (produit, surface, couches, ratio, prix, total, coût, marge, date). Toast de confirmation.

## Données test (seed)

Si la table `contractor_profiles` est vide pour l'utilisateur courant côté admin, bouton "Charger données démo" qui insère 3 profils + médias + projets fictifs (uniquement déclenché manuellement, jamais auto).

## Fichiers à créer / modifier

**Nouveaux**
- `src/components/ProtectedRoute.tsx`
- `src/layouts/DashboardLayout.tsx` (sidebar + outlet)
- `src/pages/dashboard/Overview.tsx`
- `src/pages/dashboard/MyProfile.tsx`
- `src/pages/dashboard/Media.tsx`
- `src/pages/dashboard/Projects.tsx`
- `src/pages/dashboard/Calculator.tsx` (refonte de l'actuel)
- `src/pages/dashboard/Contractors.tsx` (admin)
- `src/lib/calculator.ts` (formules + types)
- `src/lib/quoteHistory.ts` (idb)
- `src/lib/pdf/clientQuote.ts`
- `src/lib/pdf/internalQuote.ts`
- `src/hooks/useAuth.ts`, `src/hooks/useRole.ts`

**Modifiés**
- `src/App.tsx` — routes dashboard imbriquées + ProtectedRoute
- `src/pages/SousTraitants.tsx`, `src/pages/SousTraitantProfile.tsx` — affichage public propre, respect des flags visibilité
- `src/pages/Dashboard.tsx` — devient redirect vers `/dashboard/overview` ou supprimé au profit du nouveau layout
- `src/components/Navbar.tsx` — affichage conditionnel "Dashboard" si rôle ok
- `src/components/Footer.tsx` — lien discret "Espace pro"
- `src/pages/Devis.tsx` — accepter `?contractor=slug`

**Dépendances ajoutées**: `idb-keyval`, `jspdf-autotable`

## Points à tester (livrés en fin)

1. Client non-connecté: `/sous-traitants`, détail, devis OK; `/dashboard` redirige vers `/auth`
2. Sous-traitant connecté: voit son dashboard, pas la section "Sous-traitants" admin
3. Admin: voit tout, peut créer/éditer n'importe quel profil
4. Toggles visibilité: téléphone caché côté public si désactivé
5. Calculateur: tous produits, validation, mode devis, marge correcte
6. Historique: ajout/recharge/suppression persistent après reload
7. PDF client: aucun coût/marge visible. PDF interne: marge présente
8. Copier: presse-papier contient le récap
9. RLS: un client ne peut pas SELECT un projet `is_public=false` via API
