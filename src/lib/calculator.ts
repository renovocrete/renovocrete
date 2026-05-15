import { calculateResin, FORMULAS, getCatalog, ProductLine } from "@/data/colors";

export interface CalcInput {
  product: ProductLine;
  surface: number;
  coats: number;
  pricePerGallon: number;
  laborMode: "per_m2" | "fixed";
  laborRate: number;       // €/m² OR fixed €
  margin: number;          // % markup applied on top of total cost
}

export interface CalcOutput {
  totalGallons: number;
  partA: number;
  partB: number;
  ratio: string;
  costMaterial: number;
  costLabor: number;
  totalCost: number;
  salePrice: number;
  marginAmount: number;
  marginPct: number;
  productName: string;
}

export function computeQuote(input: CalcInput): CalcOutput {
  const r = calculateResin(input.product, input.surface, input.coats);
  const cat = getCatalog(input.product)!;
  const f = FORMULAS[input.product];
  const costMaterial = +(r.totalGallons * input.pricePerGallon).toFixed(2);
  const costLabor = +(input.laborMode === "per_m2"
    ? input.surface * input.laborRate
    : input.laborRate).toFixed(2);
  const totalCost = +(costMaterial + costLabor).toFixed(2);
  const marginAmount = +(totalCost * (input.margin / 100)).toFixed(2);
  const salePrice = +(totalCost + marginAmount).toFixed(2);
  const marginPct = totalCost > 0 ? +((marginAmount / salePrice) * 100).toFixed(1) : 0;
  return {
    totalGallons: r.totalGallons,
    partA: r.partA,
    partB: r.partB,
    ratio: f.ratio.b > 0 ? `${f.ratio.a}:${f.ratio.b}` : "1 composant",
    costMaterial,
    costLabor,
    totalCost,
    salePrice,
    marginAmount,
    marginPct,
    productName: cat.name,
  };
}
