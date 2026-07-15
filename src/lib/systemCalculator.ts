// Moteur de calcul système : à partir d'un système + surface, calcule couche par couche
// la quantité théorique, le conditionnement retenu et la quantité arrondie à commander.

import { ECS_SYSTEMS, type EcsSystem, type EcsSystemLayer } from "@/data/ecsSystems";
import { ECS_PRODUCTS, findProduct } from "@/data/ecsProducts";

export interface LayerResult {
  layerKey: string;
  layerName: string;
  function: string;
  coats: number;
  productId: string;
  productLabel: string;
  productFamily: string;
  packaging: string;
  unit: "gallon" | "bag" | "kit";
  coveragePerUnit: number;
  /** m² à traiter (surface * coats * (1+loss)) */
  effectiveSurface: number;
  /** quantité théorique en unités (gal, sac ou kit) */
  theoreticalQty: number;
  /** nombre de conditionnements à commander (entier) */
  qtyToOrder: number;
  /** unités effectivement livrées (packSize * qtyToOrder) */
  deliveredUnits: number;
  /** reliquat estimé (deliveredUnits - theoreticalQty) */
  leftover: number;
  unitPriceEUR: number;
  unitPriceUSD: number;
  lineTotalEUR: number;
  hasPrice: boolean;
  error?: string;
}

export interface SystemCalcInput {
  systemKey: string;
  surface: number;
  lossPct: number; // 0-30
  /** overrides {layerKey: productId} pour changer le produit d'une couche */
  productOverrides?: Record<string, string>;
  projectName?: string;
  location?: string;
  comment?: string;
}

export interface SystemCalcResult {
  calcId: string;
  system: EcsSystem;
  input: SystemCalcInput;
  layers: LayerResult[];
  totalEUR: number;
  hasBlockingError: boolean;
  createdAt: string;
}

/** Extrait la taille d'un conditionnement (gal ou lb) — heuristique sur la chaîne "3 Gal", "15 Gal", "50 lb. Bag", etc. */
function parsePackSize(pkg: string, unit: "gallon" | "bag" | "kit"): number {
  if (unit === "bag" || unit === "kit") return 1; // 1 sac = 1 sac, 1 kit = 1 kit
  const m = pkg.match(/(\d+(?:\.\d+)?)\s*Gal/i);
  return m ? parseFloat(m[1]) : 1;
}

export function calculateSystem(input: SystemCalcInput): SystemCalcResult {
  const system = ECS_SYSTEMS.find((s) => s.key === input.systemKey);
  if (!system) throw new Error("Système inconnu : " + input.systemKey);

  const layers: LayerResult[] = system.layers.map((layer: EcsSystemLayer) => {
    const productId = input.productOverrides?.[layer.key] || layer.defaultProductId;
    const product = productId ? findProduct(productId) : undefined;

    if (!product || !productId) {
      return {
        layerKey: layer.key, layerName: layer.name, function: layer.function, coats: layer.coats,
        productId: productId || "", productLabel: "—", productFamily: "—",
        packaging: "—", unit: layer.unit, coveragePerUnit: layer.coveragePerUnit,
        effectiveSurface: 0, theoreticalQty: 0, qtyToOrder: 0, deliveredUnits: 0, leftover: 0,
        unitPriceEUR: 0, unitPriceUSD: 0, lineTotalEUR: 0, hasPrice: false,
        error: "Aucun produit disponible pour cette couche — contactez RENOVO CRETE.",
      };
    }
    const packSize = parsePackSize(product.packaging, layer.unit);
    const effectiveSurface = input.surface * layer.coats * (1 + input.lossPct / 100);
    const theoreticalQty = effectiveSurface / layer.coveragePerUnit; // en unités de base (gal, sac)
    const qtyToOrder = Math.max(1, Math.ceil(theoreticalQty / packSize));
    const deliveredUnits = qtyToOrder * packSize;
    const leftover = +(deliveredUnits - theoreticalQty).toFixed(2);
    const lineTotalEUR = +(qtyToOrder * product.priceEUR).toFixed(2);
    return {
      layerKey: layer.key, layerName: layer.name, function: layer.function, coats: layer.coats,
      productId: product.id, productLabel: product.label, productFamily: product.product,
      packaging: product.packaging, unit: layer.unit, coveragePerUnit: layer.coveragePerUnit,
      effectiveSurface: +effectiveSurface.toFixed(2),
      theoreticalQty: +theoreticalQty.toFixed(2),
      qtyToOrder, deliveredUnits: +deliveredUnits.toFixed(2), leftover,
      unitPriceEUR: product.priceEUR, unitPriceUSD: product.priceUSD,
      lineTotalEUR, hasPrice: product.priceEUR > 0,
    };
  });

  const totalEUR = +layers.reduce((s, l) => s + l.lineTotalEUR, 0).toFixed(2);
  const hasBlockingError = layers.some((l) => l.error || !l.hasPrice);

  return {
    calcId: crypto.randomUUID(),
    system, input, layers, totalEUR, hasBlockingError,
    createdAt: new Date().toISOString(),
  };
}
