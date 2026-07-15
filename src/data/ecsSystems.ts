// Définition des systèmes complets Elite Crete Systems.
// Rendements = valeurs pratiques (m² / gallon US ou m² / sac) — à valider par l'admin RENOVO CRETE.
// Chaque couche référence des SKU du fichier src/data/ecsProducts.ts (source : Excel Plafond bon prix EUR).

import { findProduct, ECS_PRODUCTS } from "./ecsProducts";

export interface EcsSystemLayer {
  key: string;
  name: string;
  function: string;
  /** Nombre de passes de cette couche */
  coats: number;
  /** m² couverts par 1 gallon US mélangé (résines) OU m² par sac (mortiers/overlays) */
  coveragePerUnit: number;
  /** "gallon" | "bag" | "kit" */
  unit: "gallon" | "bag" | "kit";
  /** SKUs autorisés pour cette couche (ordre = préférence) */
  allowedProductIds: string[];
  /** SKU par défaut (parmi allowedProductIds) */
  defaultProductId: string;
  /** Notes techniques affichées à l'utilisateur */
  notes?: string;
}

export interface EcsSystem {
  key: string;
  name: string;
  family: "Reflector" | "Hermetic Flake" | "Hermetic Quartz" | "Hermetic Neat" | "Hermetic Stout" | "Overlay" | "Urethane Cement";
  variant?: string;
  tagline: string;
  layers: EcsSystemLayer[];
  /** Marge de sécurité par défaut (0-30 %) */
  defaultLossPct: number;
}

// Helpers pour raccourcir la définition
const gal = (id: string) => id;

export const ECS_SYSTEMS: EcsSystem[] = [
  // ─── REFLECTOR ENHANCER ─────────────────────────────────────────────────
  {
    key: "reflector-enhancer",
    name: "REFLECTOR™ Enhancer",
    family: "Reflector",
    tagline: "Sol époxy métallique auto-lissant — effet marbré haute brillance",
    defaultLossPct: 10,
    layers: [
      {
        key: "vapor-barrier",
        name: "Vapor Barrier",
        function: "Barrière anti-humidité sur béton",
        coats: 1,
        coveragePerUnit: 27.9, // ~300 sqft/gal
        unit: "gallon",
        allowedProductIds: ["ECS-SXM-039", "ECS-SXM-040", "ECS-SXM-042"],
        defaultProductId: "ECS-SXM-040",
        notes: "Applicable sur béton fraîchement coulé (>7j) ou existant.",
      },
      {
        key: "base-coat",
        name: "Base Coat",
        function: "Couche de fond pigmentée / d'accrochage",
        coats: 1,
        coveragePerUnit: 18.6, // ~200 sqft/gal
        unit: "gallon",
        allowedProductIds: ["ECS-SXM-006", "ECS-SXM-007", "ECS-SXM-024", "ECS-SXM-025"],
        defaultProductId: "ECS-SXM-007",
      },
      {
        key: "reflector-coat",
        name: "REFLECTOR™ Enhancer Coat",
        function: "Résine époxy 100 % solides + pigments métalliques",
        coats: 1,
        coveragePerUnit: 9.3, // ~100 sqft/gal (auto-lissant)
        unit: "gallon",
        allowedProductIds: ["ECS-SXM-027", "ECS-SXM-028", "ECS-SXM-020", "ECS-SXM-021"],
        defaultProductId: "ECS-SXM-028",
        notes: "Incorporer REFLECTOR™ Enhancer Powder (32 oz couvre ~30 m²).",
      },
      {
        key: "reflector-powder",
        name: "REFLECTOR™ Enhancer Powder",
        function: "Pigment métallique à incorporer dans la Reflector Coat",
        coats: 1,
        coveragePerUnit: 30, // 32 oz jar
        unit: "kit",
        allowedProductIds: ["ECS-SXM-122", "ECS-SXM-123"],
        defaultProductId: "ECS-SXM-122",
      },
      {
        key: "top-coat",
        name: "Protective Top Coat",
        function: "Vernis polyaspartique haute résistance (2 passes)",
        coats: 2,
        coveragePerUnit: 37.2, // ~400 sqft/gal
        unit: "gallon",
        allowedProductIds: ["ECS-SXM-073", "ECS-SXM-074", "ECS-SXM-075", "ECS-SXM-080", "ECS-SXM-081"],
        defaultProductId: "ECS-SXM-074",
      },
    ],
  },

  // ─── HERMETIC FLAKE — SINGLE BROADCAST ──────────────────────────────────
  {
    key: "hermetic-flake-sb",
    name: "HERMETIC™ Flake — Single Broadcast",
    family: "Hermetic Flake",
    variant: "Single Broadcast",
    tagline: "Sol résineux à flocons — projection simple, finition vinyle",
    defaultLossPct: 10,
    layers: [
      { key: "vapor-barrier", name: "Vapor Barrier", function: "Barrière anti-humidité", coats: 1, coveragePerUnit: 27.9, unit: "gallon",
        allowedProductIds: ["ECS-SXM-039","ECS-SXM-040"], defaultProductId: "ECS-SXM-040" },
      { key: "base-coat", name: "Base Coat pigmenté", function: "Couche de fond colorée", coats: 1, coveragePerUnit: 18.6, unit: "gallon",
        allowedProductIds: ["ECS-SXM-006","ECS-SXM-007","ECS-SXM-024","ECS-SXM-025"], defaultProductId: "ECS-SXM-007",
        notes: "Projection de flocons à saturation sur la base fraîche." },
      { key: "top-coat", name: "Top Coat polyaspartique", function: "Vernis final scellant les flocons", coats: 1, coveragePerUnit: 18.6, unit: "gallon",
        allowedProductIds: ["ECS-SXM-073","ECS-SXM-074","ECS-SXM-080","ECS-SXM-081"], defaultProductId: "ECS-SXM-074" },
    ],
  },

  // ─── HERMETIC FLAKE — DOUBLE BROADCAST ──────────────────────────────────
  {
    key: "hermetic-flake-db",
    name: "HERMETIC™ Flake — Double Broadcast",
    family: "Hermetic Flake",
    variant: "Double Broadcast",
    tagline: "Sol résineux à flocons haute épaisseur — double projection",
    defaultLossPct: 12,
    layers: [
      { key: "vapor-barrier", name: "Vapor Barrier", function: "Barrière anti-humidité", coats: 1, coveragePerUnit: 27.9, unit: "gallon",
        allowedProductIds: ["ECS-SXM-039","ECS-SXM-040"], defaultProductId: "ECS-SXM-040" },
      { key: "base-coat", name: "Base Coat pigmenté", function: "Couche de fond colorée", coats: 1, coveragePerUnit: 18.6, unit: "gallon",
        allowedProductIds: ["ECS-SXM-006","ECS-SXM-007"], defaultProductId: "ECS-SXM-007" },
      { key: "grout-coat", name: "Grout Coat intermédiaire", function: "Encapsule la 1ʳᵉ projection et prépare la 2ᵉ", coats: 1, coveragePerUnit: 14, unit: "gallon",
        allowedProductIds: ["ECS-SXM-020","ECS-SXM-021"], defaultProductId: "ECS-SXM-021" },
      { key: "top-coat", name: "Top Coat polyaspartique", function: "Vernis final", coats: 2, coveragePerUnit: 27.9, unit: "gallon",
        allowedProductIds: ["ECS-SXM-073","ECS-SXM-074","ECS-SXM-080","ECS-SXM-081"], defaultProductId: "ECS-SXM-074" },
    ],
  },

  // ─── HERMETIC QUARTZ — SB ───────────────────────────────────────────────
  {
    key: "hermetic-quartz-sb",
    name: "HERMETIC™ Quartz — Single Broadcast",
    family: "Hermetic Quartz",
    variant: "Single Broadcast",
    tagline: "Sol quartz coloré — projection simple, antidérapant",
    defaultLossPct: 12,
    layers: [
      { key: "vapor-barrier", name: "Vapor Barrier", function: "Barrière anti-humidité", coats: 1, coveragePerUnit: 27.9, unit: "gallon",
        allowedProductIds: ["ECS-SXM-039","ECS-SXM-040"], defaultProductId: "ECS-SXM-040" },
      { key: "base-coat", name: "Base Coat", function: "Couche de fond", coats: 1, coveragePerUnit: 18.6, unit: "gallon",
        allowedProductIds: ["ECS-SXM-006","ECS-SXM-007"], defaultProductId: "ECS-SXM-007" },
      { key: "quartz", name: "Silice / Quartz projeté", function: "Projection à saturation (~8 kg/m²)", coats: 1, coveragePerUnit: 4.5, unit: "bag",
        allowedProductIds: ["ECS-SXM-194","ECS-SXM-195"], defaultProductId: "ECS-SXM-195" },
      { key: "top-coat", name: "Top Coat", function: "Vernis polyaspartique", coats: 2, coveragePerUnit: 22, unit: "gallon",
        allowedProductIds: ["ECS-SXM-073","ECS-SXM-074","ECS-SXM-080"], defaultProductId: "ECS-SXM-074" },
    ],
  },

  // ─── HERMETIC QUARTZ — DB ───────────────────────────────────────────────
  {
    key: "hermetic-quartz-db",
    name: "HERMETIC™ Quartz — Double Broadcast",
    family: "Hermetic Quartz",
    variant: "Double Broadcast",
    tagline: "Sol quartz haute épaisseur — double projection industrielle",
    defaultLossPct: 15,
    layers: [
      { key: "vapor-barrier", name: "Vapor Barrier", function: "Barrière anti-humidité", coats: 1, coveragePerUnit: 27.9, unit: "gallon",
        allowedProductIds: ["ECS-SXM-039","ECS-SXM-040"], defaultProductId: "ECS-SXM-040" },
      { key: "base-coat", name: "Base Coat", function: "Couche de fond", coats: 1, coveragePerUnit: 18.6, unit: "gallon",
        allowedProductIds: ["ECS-SXM-006","ECS-SXM-007"], defaultProductId: "ECS-SXM-007" },
      { key: "quartz-1", name: "1ʳᵉ projection quartz", function: "Projection à saturation", coats: 1, coveragePerUnit: 4.5, unit: "bag",
        allowedProductIds: ["ECS-SXM-194","ECS-SXM-195"], defaultProductId: "ECS-SXM-195" },
      { key: "grout-coat", name: "Grout Coat", function: "Encapsule la 1ʳᵉ projection", coats: 1, coveragePerUnit: 12, unit: "gallon",
        allowedProductIds: ["ECS-SXM-020","ECS-SXM-021"], defaultProductId: "ECS-SXM-021" },
      { key: "quartz-2", name: "2ᵉ projection quartz", function: "Renforcement + esthétique", coats: 1, coveragePerUnit: 6, unit: "bag",
        allowedProductIds: ["ECS-SXM-194","ECS-SXM-195"], defaultProductId: "ECS-SXM-195" },
      { key: "top-coat", name: "Top Coat", function: "Vernis final (2 passes)", coats: 2, coveragePerUnit: 22, unit: "gallon",
        allowedProductIds: ["ECS-SXM-073","ECS-SXM-074","ECS-SXM-080"], defaultProductId: "ECS-SXM-074" },
    ],
  },

  // ─── HERMETIC NEAT ──────────────────────────────────────────────────────
  {
    key: "hermetic-neat",
    name: "HERMETIC™ Neat",
    family: "Hermetic Neat",
    tagline: "Système résineux uni haute performance sans agrégats",
    defaultLossPct: 8,
    layers: [
      { key: "primer", name: "Primer", function: "Accrochage sur béton", coats: 1, coveragePerUnit: 18.6, unit: "gallon",
        allowedProductIds: ["ECS-SXM-006","ECS-SXM-007"], defaultProductId: "ECS-SXM-007" },
      { key: "body-coat", name: "Body Coat pigmenté", function: "Couche corps colorée", coats: 1, coveragePerUnit: 14, unit: "gallon",
        allowedProductIds: ["ECS-SXM-020","ECS-SXM-021","ECS-SXM-024","ECS-SXM-025"], defaultProductId: "ECS-SXM-021" },
      { key: "top-coat", name: "Top Coat", function: "Vernis polyaspartique (2 passes)", coats: 2, coveragePerUnit: 27.9, unit: "gallon",
        allowedProductIds: ["ECS-SXM-073","ECS-SXM-074","ECS-SXM-080","ECS-SXM-081"], defaultProductId: "ECS-SXM-074" },
    ],
  },

  // ─── HERMETIC STOUT ─────────────────────────────────────────────────────
  {
    key: "hermetic-stout",
    name: "HERMETIC™ Stout",
    family: "Hermetic Stout",
    tagline: "Système résineux haute épaisseur (industriel/agroalimentaire)",
    defaultLossPct: 10,
    layers: [
      { key: "primer", name: "Primer", function: "Accrochage renforcé", coats: 1, coveragePerUnit: 15, unit: "gallon",
        allowedProductIds: ["ECS-SXM-006","ECS-SXM-007"], defaultProductId: "ECS-SXM-007" },
      { key: "body-coat", name: "Body Coat épais", function: "Couche corps 100 % solides", coats: 1, coveragePerUnit: 8, unit: "gallon",
        allowedProductIds: ["ECS-SXM-001","ECS-SXM-003","ECS-SXM-020","ECS-SXM-021"], defaultProductId: "ECS-SXM-003" },
      { key: "top-coat", name: "Top Coat chimique", function: "Résistance chimique", coats: 2, coveragePerUnit: 22, unit: "gallon",
        allowedProductIds: ["ECS-SXM-024","ECS-SXM-025","ECS-SXM-073","ECS-SXM-074"], defaultProductId: "ECS-SXM-025" },
    ],
  },

  // ─── OVERLAY — THIN-FINISH ──────────────────────────────────────────────
  {
    key: "overlay-thin-finish",
    name: "Overlay — THIN-FINISH™",
    family: "Overlay",
    variant: "THIN-FINISH",
    tagline: "Micro-béton lisse fin (2-3 mm) sur béton existant",
    defaultLossPct: 10,
    layers: [
      { key: "primer-sealer", name: "Primer / Sealer", function: "Amélioration de l'accrochage", coats: 1, coveragePerUnit: 15, unit: "gallon",
        allowedProductIds: ["ECS-SXM-149","ECS-SXM-150"], defaultProductId: "ECS-SXM-150" },
      { key: "overlay-mix", name: "THIN-FINISH™ appliqué", function: "Sac 55 lb — ~12 m²/sac à 2 mm", coats: 1, coveragePerUnit: 12, unit: "bag",
        allowedProductIds: ["ECS-SXM-103","ECS-SXM-104"], defaultProductId: "ECS-SXM-103" },
      { key: "top-sealer", name: "Sealer final", function: "Scellement CSS Emulsion (2 passes)", coats: 2, coveragePerUnit: 22, unit: "gallon",
        allowedProductIds: ["ECS-SXM-149","ECS-SXM-150"], defaultProductId: "ECS-SXM-150" },
    ],
  },
  // ─── OVERLAY — TEXTURE-PAVE ─────────────────────────────────────────────
  {
    key: "overlay-texture-pave",
    name: "Overlay — TEXTURE-PAVE™",
    family: "Overlay",
    variant: "TEXTURE-PAVE",
    tagline: "Micro-béton texturé (spray, motifs, pierre)",
    defaultLossPct: 12,
    layers: [
      { key: "primer-sealer", name: "Primer", function: "Accrochage", coats: 1, coveragePerUnit: 15, unit: "gallon",
        allowedProductIds: ["ECS-SXM-149","ECS-SXM-150"], defaultProductId: "ECS-SXM-150" },
      { key: "overlay-mix", name: "TEXTURE-PAVE™ appliqué", function: "Sac 55 lb — ~9 m²/sac", coats: 1, coveragePerUnit: 9, unit: "bag",
        allowedProductIds: ["ECS-SXM-106","ECS-SXM-107"], defaultProductId: "ECS-SXM-106" },
      { key: "top-sealer", name: "Sealer final", function: "CSS Emulsion (2 passes)", coats: 2, coveragePerUnit: 22, unit: "gallon",
        allowedProductIds: ["ECS-SXM-149","ECS-SXM-150"], defaultProductId: "ECS-SXM-150" },
    ],
  },
  // ─── OVERLAY — MICRO-FINISH ─────────────────────────────────────────────
  {
    key: "overlay-micro-finish",
    name: "Overlay — MICRO-FINISH™",
    family: "Overlay",
    variant: "MICRO-FINISH",
    tagline: "Skim-coat ultra-fin (<1 mm) — préparation ou finition mate",
    defaultLossPct: 8,
    layers: [
      { key: "primer-sealer", name: "Primer", function: "Accrochage", coats: 1, coveragePerUnit: 18, unit: "gallon",
        allowedProductIds: ["ECS-SXM-149","ECS-SXM-150"], defaultProductId: "ECS-SXM-150" },
      { key: "overlay-mix", name: "MICRO-FINISH™ appliqué", function: "Sac 30 lb — ~28 m²/sac en skim", coats: 1, coveragePerUnit: 28, unit: "bag",
        allowedProductIds: ["ECS-SXM-109","ECS-SXM-110"], defaultProductId: "ECS-SXM-109" },
      { key: "top-sealer", name: "Sealer final", function: "CSS Emulsion", coats: 2, coveragePerUnit: 25, unit: "gallon",
        allowedProductIds: ["ECS-SXM-149","ECS-SXM-150"], defaultProductId: "ECS-SXM-150" },
    ],
  },
  // ─── OVERLAY — BACE-LINE ────────────────────────────────────────────────
  {
    key: "overlay-bace-line",
    name: "Overlay — BACE-LINE™",
    family: "Overlay",
    variant: "BACE-LINE",
    tagline: "Sous-couche épaisse (5-10 mm) pour rattrapage important",
    defaultLossPct: 15,
    layers: [
      { key: "primer-sealer", name: "Primer", function: "Accrochage", coats: 1, coveragePerUnit: 12, unit: "gallon",
        allowedProductIds: ["ECS-SXM-149","ECS-SXM-150"], defaultProductId: "ECS-SXM-150" },
      { key: "overlay-mix", name: "BACE-LINE™ appliqué", function: "Sac 50 lb — ~4 m²/sac à 6 mm", coats: 1, coveragePerUnit: 4, unit: "bag",
        allowedProductIds: ["ECS-SXM-112","ECS-SXM-113"], defaultProductId: "ECS-SXM-112" },
    ],
  },

  // ─── URETHANE CEMENT (temporairement indisponible dans le catalogue) ────
  {
    key: "urethane-cement",
    name: "Urethane Cement",
    family: "Urethane Cement",
    tagline: "Système polyuréthane-ciment — non disponible actuellement au catalogue",
    defaultLossPct: 10,
    layers: [
      { key: "note", name: "Système à activer", function: "Produits polyuréthane-ciment non listés dans le catalogue EUR courant. Contactez RENOVO CRETE.", coats: 1, coveragePerUnit: 1, unit: "kit",
        allowedProductIds: [], defaultProductId: "" },
    ],
  },
];

export const getSystem = (key: string) => ECS_SYSTEMS.find((s) => s.key === key);

/** Sélectionne le conditionnement optimal pour couvrir `neededQty` d'un produit. */
export function pickPackaging(productFamily: string, allowedIds: string[]): { pack?: ReturnType<typeof findProduct>; error?: string } {
  const candidates = allowedIds.map(findProduct).filter(Boolean) as NonNullable<ReturnType<typeof findProduct>>[];
  if (candidates.length === 0) return { error: "Aucun produit disponible pour cette couche." };
  return { pack: candidates[0] };
}

export function listPackagingsForFamily(family: string) {
  return ECS_PRODUCTS.filter((p) => p.product === family);
}
