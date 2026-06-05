# Extension Super Admin RENOVO CRETE

Énorme périmètre — découpé en 6 modules livrables en étapes successives. Architecture évolutive, RLS stricte, aucune fuite vers les espaces publics ou partenaires.

## 1. Modèle de données (migration unique)

```text
admin_permissions          (clé/valeur libre par user_id, JSONB → permissions personnalisées par architecte/constructeur)
account_status             (table de statut : user_id, status enum 'active|disabled|suspended|pending', reason, updated_by, updated_at)
admin_impersonation_log    (audit "Connexion en tant que" : admin_id, target_user_id, started_at, ended_at, reason)
conversations              (id, created_by, subject, last_message_at)
conversation_participants  (conversation_id, user_id, role 'admin|member', last_read_at)
messages                   (conversation_id, sender_id, body, attachments JSONB, created_at)
message_attachments        (storage paths privés)
chatbot_conversations      (session_id anon ou user_id, started_at)
chatbot_messages           (conv_id, role 'user|assistant', content, created_at)
chatbot_knowledge          (doc_id, title, content, tags) — base documentaire évolutive
```

RLS :
- Toutes les tables admin_* / impersonation : `has_role(auth.uid(), 'admin')` only
- `account_status` : admin écrit, user lit son propre statut
- `admin_permissions` : admin CRUD, user lit ses propres droits
- `conversations` / `messages` : participant lit/écrit ses messages, admin a accès total via `has_role`
- `chatbot_*` : insert public (anon ok), select limité au session_id propriétaire + admin global

Storage : bucket privé `message-attachments` (policies par participant).

## 2. Logique de statut de compte

- Helper SQL `public.is_account_active(uid)` SECURITY DEFINER
- Toutes les RLS sensibles (`partner_projects`, `contractor_profiles`, etc.) : ajouter `AND public.is_account_active(auth.uid())`
- `ProtectedRoute` côté client : affiche un écran "Compte suspendu" si statut ≠ active
- "Supprimer" = soft-delete (status='deleted') + révocation rôles ; suppression dure via edge function admin uniquement

## 3. Espace Super Admin (routes `/admin/*`)

Nouveau layout `AdminLayout` (sidebar dédiée, séparée de PartnerLayout/MainLayout) protégée par `requireAdmin`.

```text
/admin                       → redirige vers /admin/dashboard
/admin/dashboard             → tableau de bord global (KPIs + activité récente)
/admin/sous-traitants        → liste + recherche + filtres
/admin/sous-traitants/:id    → fiche détail (infos, photos, vidéos, projets, actions statut, bouton "Connexion en tant que")
/admin/partenaires           → liste architectes + constructeurs
/admin/partenaires/:id       → fiche + onglet "Permissions" (toggles dynamiques) + projets + clients + stats
/admin/messagerie            → centre messagerie global (toutes conversations)
/admin/messagerie/:id        → fil de discussion
/admin/chatbot               → gestion base documentaire chatbot + historique conversations
/admin/parametres            → préférences globales
```

### Dashboard global
- KPIs : clients, sous-traitants, architectes, constructeurs, projets actifs, RDV, événements, revenus (somme `partner_projects.budget`)
- Camemberts/barres recharts : répartition rôles, statuts comptes, évolution mensuelle
- Liste activité récente (10 derniers événements via `partner_activity_log` + nouveaux comptes)

### Fonction "Connexion en tant que"
- Edge function `admin-impersonate` (admin-only) → génère un magic-link signé court-terme via service_role + log dans `admin_impersonation_log`
- Bandeau persistant rouge "Mode impersonation — utilisateur X" avec bouton "Quitter"
- Sessionstorage `impersonation_active=true` + retour automatique sur le compte admin

### Permissions avancées
- UI : liste de toggles + champs libres (JSONB key/value)
- Catalogue de droits prédéfinis : `extra_tab`, `premium_features`, `advanced_tools`, `private_docs`, `private_events`, `custom_*`
- Hook `usePermissions()` côté partenaire : lit `admin_permissions` et affiche/cache les UI conditionnelles
- Évolutif : ajouter une clé suffit, aucune migration

## 4. Centre de communication (messagerie interne)

- Page `/admin/messagerie` (admin) + onglet `Messages` dans chaque profil (`/partenaire/messages`, dashboard sous-traitant)
- Realtime via `supabase.channel('messages')` sur INSERT
- Pièces jointes : upload bucket `message-attachments`, URLs signées
- Composants : `ConversationList`, `MessageThread`, `MessageComposer`
- Notifications : badge non-lus (count via `last_read_at` < `messages.created_at`)

## 5. Chatbot IA public

- Composant flottant `<ChatbotWidget />` monté dans `MainLayout` uniquement (jamais dans `PartnerLayout` / `AdminLayout`)
- Bouton flottant premium (bas droite par défaut), draggable (Pointer events + persist position en localStorage), réductible/fermable
- Edge function `chatbot-reply` :
  - Reçoit `session_id` + `message`
  - Charge le contexte (services, événements, FAQs) depuis `chatbot_knowledge`
  - Appelle Lovable AI Gateway (`google/gemini-3-flash-preview` par défaut, streaming SSE)
  - Architecture pluggable : `provider: 'lovable' | 'openai' | 'anthropic' | 'gemini'` (clés futures via secrets)
- Persistance conversation pour suivi admin
- Actions intégrées : liens vers `/devis`, `/contact`, `/galerie`, `/types-de-projets`

## 6. Refonte « Qui sommes-nous »

- Supprimer entièrement la section "Notre équipe" + grille `teamMembers`
- Supprimer les noms cités (Jean-Paul, Jean-Jude Paul, Guy-Paul, Jonathan Fort, Olsen Nelson) du codebase (`src/data/mock.ts`)
- Nouvelle section institutionnelle "Notre réseau d'experts" avec texte fourni
- Remplacer la grille de portraits par grille de réalisations (photos chantiers/matériaux/showroom déjà dans `/galerie`)
- Aucune photo de personne

## Livraison en étapes (dans ce loop)

**Étape 1** — Migration DB (statuts comptes, permissions, conversations, chatbot, RLS, GRANTs, bucket)
**Étape 2** — Edge functions (`admin-impersonate`, `chatbot-reply`, `admin-delete-user`)
**Étape 3** — `AdminLayout` + routes `/admin/*` (dashboard, sous-traitants liste+détail, partenaires liste+détail+permissions)
**Étape 4** — Centre messagerie (admin + partenaire) avec realtime
**Étape 5** — Widget chatbot public flottant + intégration `MainLayout`
**Étape 6** — Refonte `QuiSommesNous.tsx` + nettoyage `mock.ts`

## Sécurité

- Toutes les actions admin journalisées (`admin_impersonation_log`, `partner_activity_log`)
- Impersonation : token court-terme, audit obligatoire, bandeau visible
- Soft-delete par défaut ; suppression dure derrière edge function avec confirmation double
- Chatbot : rate-limit côté edge function (10 req/min/session)
- Aucune donnée admin/partenaire dans les vues `*_public`
- RGPD : log de toute modification de compte par admin

## Design

- AdminLayout : sidebar sombre premium (anthracite + accents bleus logo), distincte de PartnerLayout (plus claire)
- Bandeau impersonation : rouge vif, sticky, non-fermable sans action
- Chatbot widget : carte flottante blanche, ombre douce, icône Outfit minimaliste
- Aucun dégradé violet, aucun look SaaS générique

## Notes techniques

- Réutilise `recharts`, `framer-motion`, `lucide-react` déjà installés
- Realtime activé sur `messages` (`ALTER PUBLICATION supabase_realtime ADD TABLE`)
- Chatbot stream SSE conforme au pattern Lovable AI
- Pas de modification des tables existantes (contractor_profiles / partner_*) — uniquement ajouts
