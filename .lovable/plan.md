# Espace privé Architectes & Constructeurs

Nouvel espace strictement privé pour les partenaires Architectes/Constructeurs de RENOVO CRETE. Aucune exposition publique, aucun croisement avec les espaces existants (clients, sous-traitants, admin).

## 1. Modèle de données (migration Supabase)

Nouveau type de rôle et tables dédiées, isolées des tables `contractor_profiles` / `projects` existantes pour garantir la séparation et éviter toute fuite via les vues publiques `*_public`.

```text
app_role enum  → ajouter 'architect', 'builder'

partner_profiles            (1-1 user)        # profil privé
partner_clients             (n par partner)   # fiches clients
partner_projects            (n par partner)   # projets avec tous les champs
partner_project_clients     (n-n)             # association projet↔clients
partner_project_documents   (fichiers)
partner_project_media       (photos/vidéos/3D/avant-après)
partner_media_library       (médiathèque RENOVO, admin-only en écriture)
partner_ai_simulations      (visualiseur IA + fiche technique JSON)
partner_appointments        (RDV)
partner_events              (admin-only écriture)
partner_event_registrations (inscriptions)
partner_activity_log        (journal connexions/actions)
```

RLS stricte : `user_id = auth.uid()` pour toutes les tables partner_* (sauf `partner_media_library` et `partner_events` = lecture pour partenaires connectés, écriture admin uniquement). Aucune policy `anon`. Aucune vue `*_public`. GRANT uniquement à `authenticated` et `service_role`.

Storage : nouveau bucket privé `partner-media` (non public), policies basées sur `auth.uid()` en préfixe de chemin.

## 2. Authentification & rôles

- `useAuth` étendu : `isArchitect`, `isBuilder`, `isPartner = isArchitect || isBuilder`.
- `ProtectedRoute` : nouvelle prop `requirePartner`.
- Inscription partenaire séparée : page `/partenaire/inscription` (demande validée par admin → admin assigne le rôle via Cloud). Pas d'auto-attribution.
- Trigger DB : à l'attribution du rôle architect/builder, créer automatiquement `partner_profiles`.

## 3. Routes & navigation

```text
/partenaire                 → redirige vers /partenaire/dashboard
/partenaire/dashboard       → vue d'ensemble + onglets
/partenaire/projets         → liste + CRUD
/partenaire/projets/:id     → détail projet (docs, médias, clients)
/partenaire/mediatheque
/partenaire/visualiseur
/partenaire/profil
/partenaire/rendez-vous
/partenaire/evenements
/partenaire/analyses
/partenaire/inscription     (public, formulaire de demande)
```

- Navbar publique : aucun lien vers /partenaire (entrée discrète depuis /auth uniquement).
- `robots.txt` : `Disallow: /partenaire/`.
- `sitemap.xml` : exclure toutes les routes /partenaire.
- Aucune mention dans `/sous-traitants`, `/galerie`, ni aucune vue publique.

## 4. Dashboard partenaire (7 onglets)

Layout dédié `PartnerLayout` (sidebar premium, séparé de MainLayout) :

1. **Projets** — table + formulaire complet (titre, description, statut, type de bien, classification, surfaces, étages, intérieur/extérieur, budgets, notes, documents, galerie, clients associés)
2. **Médiathèque RENOVO** — grille avec recherche/filtres/catégories, téléchargement
3. **Visualiseur IA** — upload, génération via edge function `partner-visualize` (réutilise gateway Lovable AI), comparaison avant/après, sélection matériaux/couleurs/finitions, génération fiche technique + export PDF
4. **Profil** — formulaire privé complet + galerie privée + documents admin
5. **Rendez-vous** — calendrier interactif (création RDV avec type), confirmation/email
6. **Événements** — lecture seule + inscription/désinscription
7. **Analyses** — recharts : nb projets, valeur totale, budget moyen, répartitions, évolution mensuelle, min/moy/max prix

## 5. Edge functions

- `partner-visualize` — appel Lovable AI Gateway (Gemini image) pour rendu
- `partner-tech-sheet` — génération fiche technique structurée
- `partner-appointment-notify` — email de confirmation/rappel (si infra email dispo, sinon log)
- `request-partner-access` — soumission demande inscription (insert en table `partner_access_requests`, notifie admin)

## 6. Sécurité & RGPD

- Toutes les tables partner_* : RLS owner-only + admin, `service_role` pour edge functions
- `partner_activity_log` rempli côté serveur (trigger sur login via edge function ou côté client à chaque action sensible)
- Aucune donnée partenaire dans les vues `*_public`
- Bucket storage privé (URLs signées)

## 7. Design

- Palette existante respectée (blancs dominants, bleus logo, anthracite)
- Sidebar premium type "architecte" : typographie Outfit, espacement généreux, accents subtils
- Pas de SaaS générique, pas de dégradés violets
- Responsive desktop/tablette/mobile

## 8. Livraison par étapes (dans ce loop)

Étape 1 — Migration DB complète (tables, RLS, GRANTs, trigger, bucket)
Étape 2 — Auth/rôles + ProtectedRoute + useAuth étendu
Étape 3 — Layout partenaire + routes + 7 pages (squelette fonctionnel pour tous, profondeur complète sur Projets/Profil/Analyses/Événements)
Étape 4 — Edge functions visualiseur IA + fiche technique PDF
Étape 5 — robots.txt + exclusions SEO + page inscription

## Notes techniques

- Réutilise `recharts`, `framer-motion`, shadcn déjà installés
- PDF fiche technique via `jsPDF` (déjà utilisé dans `src/lib/pdf/`)
- Pas de modification des tables existantes `contractor_profiles` / `projects` — l'espace sous-traitants reste indépendant
- Visualiseur IA : utilise `google/gemini-2.5-flash-image` via `LOVABLE_API_KEY` (déjà configuré)
