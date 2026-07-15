// ECS resale catalog — SOURCE: CRM_-_PRIX_FOURNISSEURS_VBA_GOOD.xlsx feuille "CATALOGUE" colonne "Plafond bon prix EUR/USD"
// Ne PAS afficher au client les colonnes prix fournisseur / coût.

export type EcsCategory =
  | "Resinous Products"
  | "Cementitious Products"
  | "Pigment/Colorant/Stain Products"
  | "Single Component Sealer Products"
  | "Supplemental Products";

export interface EcsProduct {
  id: string;
  label: string;
  product: string;
  packaging: string;
  category: EcsCategory;
  /** Prix de vente définitif EUR (Plafond bon prix EUR) */
  priceEUR: number;
  priceUSD: number;
  /** null si prix indisponible — commande bloquée */
  hasPrice: boolean;
}

// Backward-compat aliases (ancien code)
export type { EcsProduct as LegacyEcsProduct };

export const ECS_PRODUCTS: EcsProduct[] = [
  {
    "id": "ECS-SXM-001",
    "label": "E100-PT1™-SHD: Kits — 3 Gal",
    "product": "E100-PT1™-SHD: Kits",
    "packaging": "3 Gal",
    "category": "Resinous Products",
    "priceEUR": 205.26,
    "priceUSD": 234.0,
    "hasPrice": true,
    "resaleEUR": 205.26,
    "resaleUSD": 234.0
  },
  {
    "id": "ECS-SXM-002",
    "label": "E100-PT1™-SHD: Kits — 48 ea x 3 Gal Kits",
    "product": "E100-PT1™-SHD: Kits",
    "packaging": "48 ea x 3 Gal Kits",
    "category": "Resinous Products",
    "priceEUR": 9263.16,
    "priceUSD": 10560.0,
    "hasPrice": true,
    "resaleEUR": 9263.16,
    "resaleUSD": 10560.0
  },
  {
    "id": "ECS-SXM-003",
    "label": "E100-PT1™-SHD: Kits — 15 Gal",
    "product": "E100-PT1™-SHD: Kits",
    "packaging": "15 Gal",
    "category": "Resinous Products",
    "priceEUR": 857.89,
    "priceUSD": 978.0,
    "hasPrice": true,
    "resaleEUR": 857.89,
    "resaleUSD": 978.0
  },
  {
    "id": "ECS-SXM-004",
    "label": "E100-PT1™-SHD: Kits — 12 ea x 15 Gal",
    "product": "E100-PT1™-SHD: Kits",
    "packaging": "12 ea x 15 Gal",
    "category": "Resinous Products",
    "priceEUR": 9663.16,
    "priceUSD": 11016.0,
    "hasPrice": true,
    "resaleEUR": 9663.16,
    "resaleUSD": 11016.0
  },
  {
    "id": "ECS-SXM-005",
    "label": "E100-PT1™-SHD: Kits — 156 Gal",
    "product": "E100-PT1™-SHD: Kits",
    "packaging": "156 Gal",
    "category": "Resinous Products",
    "priceEUR": 7682.46,
    "priceUSD": 8758.0,
    "hasPrice": true,
    "resaleEUR": 7682.46,
    "resaleUSD": 8758.0
  },
  {
    "id": "ECS-SXM-020",
    "label": "E1E100-VR1™: Kits — 3 Gal",
    "product": "E1E100-VR1™: Kits",
    "packaging": "3 Gal",
    "category": "Resinous Products",
    "priceEUR": 294.74,
    "priceUSD": 336.0,
    "hasPrice": true,
    "resaleEUR": 294.74,
    "resaleUSD": 336.0
  },
  {
    "id": "ECS-SXM-021",
    "label": "E1E100-VR1™: Kits — 15 Gal",
    "product": "E1E100-VR1™: Kits",
    "packaging": "15 Gal",
    "category": "Resinous Products",
    "priceEUR": 1363.16,
    "priceUSD": 1554.0,
    "hasPrice": true,
    "resaleEUR": 1363.16,
    "resaleUSD": 1554.0
  },
  {
    "id": "ECS-SXM-022",
    "label": "E1E100-VR1™: Kits — 12 ea. x 15 Gal",
    "product": "E1E100-VR1™: Kits",
    "packaging": "12 ea. x 15 Gal",
    "category": "Resinous Products",
    "priceEUR": 15726.32,
    "priceUSD": 17928.0,
    "hasPrice": true,
    "resaleEUR": 15726.32,
    "resaleUSD": 17928.0
  },
  {
    "id": "ECS-SXM-023",
    "label": "E1E100-VR1™: Kits — 156 Gal",
    "product": "E1E100-VR1™: Kits",
    "packaging": "156 Gal",
    "category": "Resinous Products",
    "priceEUR": 12803.51,
    "priceUSD": 14596.0,
    "hasPrice": true,
    "resaleEUR": 12803.51,
    "resaleUSD": 14596.0
  },
  {
    "id": "ECS-SXM-006",
    "label": "E100-PT1™-UBC: Kits — 3 Gal",
    "product": "E100-PT1™-UBC: Kits",
    "packaging": "3 Gal",
    "category": "Resinous Products",
    "priceEUR": 145.61,
    "priceUSD": 166.0,
    "hasPrice": true,
    "resaleEUR": 145.61,
    "resaleUSD": 166.0
  },
  {
    "id": "ECS-SXM-007",
    "label": "E100-PT1™-UBC: Kits — 15 Gal",
    "product": "E100-PT1™-UBC: Kits",
    "packaging": "15 Gal",
    "category": "Resinous Products",
    "priceEUR": 678.95,
    "priceUSD": 774.0,
    "hasPrice": true,
    "resaleEUR": 678.95,
    "resaleUSD": 774.0
  },
  {
    "id": "ECS-SXM-008",
    "label": "E100-PT1™-UBC: Kits — 12 ea. x 15 Gal",
    "product": "E100-PT1™-UBC: Kits",
    "packaging": "12 ea. x 15 Gal",
    "category": "Resinous Products",
    "priceEUR": 7642.11,
    "priceUSD": 8712.0,
    "hasPrice": true,
    "resaleEUR": 7642.11,
    "resaleUSD": 8712.0
  },
  {
    "id": "ECS-SXM-009",
    "label": "E100-PT1™-UBC: Kits — 156 Gal",
    "product": "E100-PT1™-UBC: Kits",
    "packaging": "156 Gal",
    "category": "Resinous Products",
    "priceEUR": 6166.67,
    "priceUSD": 7030.0,
    "hasPrice": true,
    "resaleEUR": 6166.67,
    "resaleUSD": 7030.0
  },
  {
    "id": "ECS-SXM-024",
    "label": "E100-PT3™: Kits — 3 Gal",
    "product": "E100-PT3™: Kits",
    "packaging": "3 Gal",
    "category": "Resinous Products",
    "priceEUR": 296.49,
    "priceUSD": 338.0,
    "hasPrice": true,
    "resaleEUR": 296.49,
    "resaleUSD": 338.0
  },
  {
    "id": "ECS-SXM-025",
    "label": "E100-PT3™: Kits — 15 Gal",
    "product": "E100-PT3™: Kits",
    "packaging": "15 Gal",
    "category": "Resinous Products",
    "priceEUR": 1424.56,
    "priceUSD": 1624.0,
    "hasPrice": true,
    "resaleEUR": 1424.56,
    "resaleUSD": 1624.0
  },
  {
    "id": "ECS-SXM-026",
    "label": "E100-PT3™: Kits — 12 ea. x 15 Gal",
    "product": "E100-PT3™: Kits",
    "packaging": "12 ea. x 15 Gal",
    "category": "Resinous Products",
    "priceEUR": 1375.44,
    "priceUSD": 1568.0,
    "hasPrice": true,
    "resaleEUR": 1375.44,
    "resaleUSD": 1568.0
  },
  {
    "id": "ECS-SXM-027",
    "label": "E100-PT4™-SHD: Kits — 3 Gal",
    "product": "E100-PT4™-SHD: Kits",
    "packaging": "3 Gal",
    "category": "Resinous Products",
    "priceEUR": 238.6,
    "priceUSD": 272.0,
    "hasPrice": true,
    "resaleEUR": 238.6,
    "resaleUSD": 272.0
  },
  {
    "id": "ECS-SXM-028",
    "label": "E100-PT4™-SHD: Kits — 15 Gal",
    "product": "E100-PT4™-SHD: Kits",
    "packaging": "15 Gal",
    "category": "Resinous Products",
    "priceEUR": 1161.4,
    "priceUSD": 1324.0,
    "hasPrice": true,
    "resaleEUR": 1161.4,
    "resaleUSD": 1324.0
  },
  {
    "id": "ECS-SXM-029",
    "label": "E100-PT4™-SHD: Kits — 12 ea. x 15 Gal",
    "product": "E100-PT4™-SHD: Kits",
    "packaging": "12 ea. x 15 Gal",
    "category": "Resinous Products",
    "priceEUR": 13515.79,
    "priceUSD": 15408.0,
    "hasPrice": true,
    "resaleEUR": 13515.79,
    "resaleUSD": 15408.0
  },
  {
    "id": "ECS-SXM-030",
    "label": "E100-PT4™-SHD: Kits — 156 Gal",
    "product": "E100-PT4™-SHD: Kits",
    "packaging": "156 Gal",
    "category": "Resinous Products",
    "priceEUR": 10875.44,
    "priceUSD": 12398.0,
    "hasPrice": true,
    "resaleEUR": 10875.44,
    "resaleUSD": 12398.0
  },
  {
    "id": "ECS-SXM-039",
    "label": "E100-VB5™: Kits — 2 Gal",
    "product": "E100-VB5™: Kits",
    "packaging": "2 Gal",
    "category": "Resinous Products",
    "priceEUR": 177.19,
    "priceUSD": 202.0,
    "hasPrice": true,
    "resaleEUR": 177.19,
    "resaleUSD": 202.0
  },
  {
    "id": "ECS-SXM-040",
    "label": "E100-VB5™: Kits — 10 Gal",
    "product": "E100-VB5™: Kits",
    "packaging": "10 Gal",
    "category": "Resinous Products",
    "priceEUR": 828.07,
    "priceUSD": 944.0,
    "hasPrice": true,
    "resaleEUR": 828.07,
    "resaleUSD": 944.0
  },
  {
    "id": "ECS-SXM-041",
    "label": "E100-VB5™: Kits — 18 ea. x 10 Gal",
    "product": "E100-VB5™: Kits",
    "packaging": "18 ea. x 10 Gal",
    "category": "Resinous Products",
    "priceEUR": 14242.11,
    "priceUSD": 16236.0,
    "hasPrice": true,
    "resaleEUR": 14242.11,
    "resaleUSD": 16236.0
  },
  {
    "id": "ECS-SXM-042",
    "label": "E100-VB5™: Kits — 104 Gal",
    "product": "E100-VB5™: Kits",
    "packaging": "104 Gal",
    "category": "Resinous Products",
    "priceEUR": 7628.07,
    "priceUSD": 8696.0,
    "hasPrice": true,
    "resaleEUR": 7628.07,
    "resaleUSD": 8696.0
  },
  {
    "id": "ECS-SXM-073",
    "label": "AUS-V™: Kits — 1.5 Gal",
    "product": "AUS-V™: Kits",
    "packaging": "1.5 Gal",
    "category": "Resinous Products",
    "priceEUR": 222.81,
    "priceUSD": 254.0,
    "hasPrice": true,
    "resaleEUR": 222.81,
    "resaleUSD": 254.0
  },
  {
    "id": "ECS-SXM-074",
    "label": "AUS-V™: Kits — 3 Gal",
    "product": "AUS-V™: Kits",
    "packaging": "3 Gal",
    "category": "Resinous Products",
    "priceEUR": 426.32,
    "priceUSD": 486.0,
    "hasPrice": true,
    "resaleEUR": 426.32,
    "resaleUSD": 486.0
  },
  {
    "id": "ECS-SXM-075",
    "label": "AUS-V™: Kits — 15 Gal",
    "product": "AUS-V™: Kits",
    "packaging": "15 Gal",
    "category": "Resinous Products",
    "priceEUR": 2033.33,
    "priceUSD": 2318.0,
    "hasPrice": true,
    "resaleEUR": 2033.33,
    "resaleUSD": 2318.0
  },
  {
    "id": "ECS-SXM-076",
    "label": "AUS-V™: Kits — 12 ea. x 15 Gal",
    "product": "AUS-V™: Kits",
    "packaging": "12 ea. x 15 Gal",
    "category": "Resinous Products",
    "priceEUR": 23431.58,
    "priceUSD": 26712.0,
    "hasPrice": true,
    "resaleEUR": 23431.58,
    "resaleUSD": 26712.0
  },
  {
    "id": "ECS-SXM-080",
    "label": "SPARTIC-ALL™-MXP: Kits — 3 Gal",
    "product": "SPARTIC-ALL™-MXP: Kits",
    "packaging": "3 Gal",
    "category": "Resinous Products",
    "priceEUR": 305.26,
    "priceUSD": 348.0,
    "hasPrice": true,
    "resaleEUR": 305.26,
    "resaleUSD": 348.0
  },
  {
    "id": "ECS-SXM-081",
    "label": "SPARTIC-ALL™-MXP: Kits — 15 Gal",
    "product": "SPARTIC-ALL™-MXP: Kits",
    "packaging": "15 Gal",
    "category": "Resinous Products",
    "priceEUR": 1477.19,
    "priceUSD": 1684.0,
    "hasPrice": true,
    "resaleEUR": 1477.19,
    "resaleUSD": 1684.0
  },
  {
    "id": "ECS-SXM-082",
    "label": "SPARTIC-ALL™-MXP: Kits — 12 ea. x 15 Gal",
    "product": "SPARTIC-ALL™-MXP: Kits",
    "packaging": "12 ea. x 15 Gal",
    "category": "Resinous Products",
    "priceEUR": 17242.11,
    "priceUSD": 19656.0,
    "hasPrice": true,
    "resaleEUR": 17242.11,
    "resaleUSD": 19656.0
  },
  {
    "id": "ECS-SXM-103",
    "label": "THIN-FINISH™ Pre-Mixed Overlay — 55 lb. Bag",
    "product": "THIN-FINISH™ Pre-Mixed Overlay",
    "packaging": "55 lb. Bag",
    "category": "Cementitious Products",
    "priceEUR": 66.67,
    "priceUSD": 76.0,
    "hasPrice": true,
    "resaleEUR": 66.67,
    "resaleUSD": 76.0
  },
  {
    "id": "ECS-SXM-104",
    "label": "THIN-FINISH™ Pre-Mixed Overlay — 56 Bag/Plt.",
    "product": "THIN-FINISH™ Pre-Mixed Overlay",
    "packaging": "56 Bag/Plt.",
    "category": "Cementitious Products",
    "priceEUR": 3438.6,
    "priceUSD": 3920.0,
    "hasPrice": true,
    "resaleEUR": 3438.6,
    "resaleUSD": 3920.0
  },
  {
    "id": "ECS-SXM-105",
    "label": "THIN-FINISH™ Pre-Mixed Overlay — 14 Pallets",
    "product": "THIN-FINISH™ Pre-Mixed Overlay",
    "packaging": "14 Pallets",
    "category": "Cementitious Products",
    "priceEUR": 46764.91,
    "priceUSD": 53312.0,
    "hasPrice": true,
    "resaleEUR": 46764.91,
    "resaleUSD": 53312.0
  },
  {
    "id": "ECS-SXM-106",
    "label": "TEXTURE-PAVE™ Pre-Mixed Overlay — 55 lb. Bag",
    "product": "TEXTURE-PAVE™ Pre-Mixed Overlay",
    "packaging": "55 lb. Bag",
    "category": "Cementitious Products",
    "priceEUR": 50.88,
    "priceUSD": 58.0,
    "hasPrice": true,
    "resaleEUR": 50.88,
    "resaleUSD": 58.0
  },
  {
    "id": "ECS-SXM-107",
    "label": "TEXTURE-PAVE™ Pre-Mixed Overlay — 56 Bag/Plt.",
    "product": "TEXTURE-PAVE™ Pre-Mixed Overlay",
    "packaging": "56 Bag/Plt.",
    "category": "Cementitious Products",
    "priceEUR": 2554.39,
    "priceUSD": 2912.0,
    "hasPrice": true,
    "resaleEUR": 2554.39,
    "resaleUSD": 2912.0
  },
  {
    "id": "ECS-SXM-108",
    "label": "TEXTURE-PAVE™ Pre-Mixed Overlay — 14 Pallets",
    "product": "TEXTURE-PAVE™ Pre-Mixed Overlay",
    "packaging": "14 Pallets",
    "category": "Cementitious Products",
    "priceEUR": 33010.53,
    "priceUSD": 37632.0,
    "hasPrice": true,
    "resaleEUR": 33010.53,
    "resaleUSD": 37632.0
  },
  {
    "id": "ECS-SXM-109",
    "label": "MICRO-FINISH™ Pre-Mixed Overlay — 30 lb. Bag",
    "product": "MICRO-FINISH™ Pre-Mixed Overlay",
    "packaging": "30 lb. Bag",
    "category": "Cementitious Products",
    "priceEUR": 52.63,
    "priceUSD": 60.0,
    "hasPrice": true,
    "resaleEUR": 52.63,
    "resaleUSD": 60.0
  },
  {
    "id": "ECS-SXM-110",
    "label": "MICRO-FINISH™ Pre-Mixed Overlay — 56 Bag/Plt.",
    "product": "MICRO-FINISH™ Pre-Mixed Overlay",
    "packaging": "56 Bag/Plt.",
    "category": "Cementitious Products",
    "priceEUR": 2750.88,
    "priceUSD": 3136.0,
    "hasPrice": true,
    "resaleEUR": 2750.88,
    "resaleUSD": 3136.0
  },
  {
    "id": "ECS-SXM-111",
    "label": "MICRO-FINISH™ Pre-Mixed Overlay — 14 Pallets",
    "product": "MICRO-FINISH™ Pre-Mixed Overlay",
    "packaging": "14 Pallets",
    "category": "Cementitious Products",
    "priceEUR": 37136.84,
    "priceUSD": 42336.0,
    "hasPrice": true,
    "resaleEUR": 37136.84,
    "resaleUSD": 42336.0
  },
  {
    "id": "ECS-SXM-112",
    "label": "BACE-LINE™ 6.3M — 50 lb. Bag",
    "product": "BACE-LINE™ 6.3M",
    "packaging": "50 lb. Bag",
    "category": "Cementitious Products",
    "priceEUR": 82.46,
    "priceUSD": 94.0,
    "hasPrice": true,
    "resaleEUR": 82.46,
    "resaleUSD": 94.0
  },
  {
    "id": "ECS-SXM-113",
    "label": "BACE-LINE™ 6.3M — 56 Bag/Plt.",
    "product": "BACE-LINE™ 6.3M",
    "packaging": "56 Bag/Plt.",
    "category": "Cementitious Products",
    "priceEUR": 4519.3,
    "priceUSD": 5152.0,
    "hasPrice": true,
    "resaleEUR": 4519.3,
    "resaleUSD": 5152.0
  },
  {
    "id": "ECS-SXM-117",
    "label": "JFS-450H™ Joint Filler – “Gray” — 305 ML Tube",
    "product": "JFS-450H™ Joint Filler – “Gray”",
    "packaging": "305 ML Tube",
    "category": "Supplemental Products",
    "priceEUR": 10.53,
    "priceUSD": 12.0,
    "hasPrice": true,
    "resaleEUR": 10.53,
    "resaleUSD": 12.0
  },
  {
    "id": "ECS-SXM-118",
    "label": "JFS-450H™ Joint Filler – “Gray” — 24 ea. Case",
    "product": "JFS-450H™ Joint Filler – “Gray”",
    "packaging": "24 ea. Case",
    "category": "Supplemental Products",
    "priceEUR": 231.58,
    "priceUSD": 264.0,
    "hasPrice": true,
    "resaleEUR": 231.58,
    "resaleUSD": 264.0
  },
  {
    "id": "ECS-SXM-122",
    "label": "REFLECTOR™ Enhancer Powder — 32 oz. Jar",
    "product": "REFLECTOR™ Enhancer Powder",
    "packaging": "32 oz. Jar",
    "category": "Pigment/Colorant/Stain Products",
    "priceEUR": 73.68,
    "priceUSD": 84.0,
    "hasPrice": true,
    "resaleEUR": 73.68,
    "resaleUSD": 84.0
  },
  {
    "id": "ECS-SXM-123",
    "label": "REFLECTOR™ Enhancer Powder — 2 oz. Jar",
    "product": "REFLECTOR™ Enhancer Powder",
    "packaging": "2 oz. Jar",
    "category": "Pigment/Colorant/Stain Products",
    "priceEUR": 10.53,
    "priceUSD": 12.0,
    "hasPrice": true,
    "resaleEUR": 10.53,
    "resaleUSD": 12.0
  },
  {
    "id": "ECS-SXM-124",
    "label": "REFLECTOR™ Enhancer Powder — Sample Kit",
    "product": "REFLECTOR™ Enhancer Powder",
    "packaging": "Sample Kit",
    "category": "Pigment/Colorant/Stain Products",
    "priceEUR": 192.98,
    "priceUSD": 220.0,
    "hasPrice": true,
    "resaleEUR": 192.98,
    "resaleUSD": 220.0
  },
  {
    "id": "ECS-SXM-132",
    "label": "ULTRA-STONE™ Antiquing Stain — 1 Gal",
    "product": "ULTRA-STONE™ Antiquing Stain",
    "packaging": "1 Gal",
    "category": "Pigment/Colorant/Stain Products",
    "priceEUR": 59.65,
    "priceUSD": 68.0,
    "hasPrice": true,
    "resaleEUR": 59.65,
    "resaleUSD": 68.0
  },
  {
    "id": "ECS-SXM-133",
    "label": "ULTRA-STONE™ Antiquing Stain — 5 Gal",
    "product": "ULTRA-STONE™ Antiquing Stain",
    "packaging": "5 Gal",
    "category": "Pigment/Colorant/Stain Products",
    "priceEUR": 268.42,
    "priceUSD": 306.0,
    "hasPrice": true,
    "resaleEUR": 268.42,
    "resaleUSD": 306.0
  },
  {
    "id": "ECS-SXM-134",
    "label": "ULTRA-STONE™ Antiquing Stain — 36 ea. x 5 Gal",
    "product": "ULTRA-STONE™ Antiquing Stain",
    "packaging": "36 ea. x 5 Gal",
    "category": "Pigment/Colorant/Stain Products",
    "priceEUR": 9347.37,
    "priceUSD": 10656.0,
    "hasPrice": true,
    "resaleEUR": 9347.37,
    "resaleUSD": 10656.0
  },
  {
    "id": "ECS-SXM-149",
    "label": "CSS EMULSION™ Clear Concentrated Sealer — 1 Gal",
    "product": "CSS EMULSION™ Clear Concentrated Sealer",
    "packaging": "1 Gal",
    "category": "Single Component Sealer Products",
    "priceEUR": 68.42,
    "priceUSD": 78.0,
    "hasPrice": true,
    "resaleEUR": 68.42,
    "resaleUSD": 78.0
  },
  {
    "id": "ECS-SXM-150",
    "label": "CSS EMULSION™ Clear Concentrated Sealer — 5 Gal",
    "product": "CSS EMULSION™ Clear Concentrated Sealer",
    "packaging": "5 Gal",
    "category": "Single Component Sealer Products",
    "priceEUR": 331.58,
    "priceUSD": 378.0,
    "hasPrice": true,
    "resaleEUR": 331.58,
    "resaleUSD": 378.0
  },
  {
    "id": "ECS-SXM-151",
    "label": "CSS EMULSION™ Clear Concentrated Sealer — 36 ea. x 5 Gal",
    "product": "CSS EMULSION™ Clear Concentrated Sealer",
    "packaging": "36 ea. x 5 Gal",
    "category": "Single Component Sealer Products",
    "priceEUR": 11621.05,
    "priceUSD": 13248.0,
    "hasPrice": true,
    "resaleEUR": 11621.05,
    "resaleUSD": 13248.0
  },
  {
    "id": "ECS-SXM-152",
    "label": "CSS EMULSION™ Clear Concentrated Sealer — 55 Gal",
    "product": "CSS EMULSION™ Clear Concentrated Sealer",
    "packaging": "55 Gal",
    "category": "Single Component Sealer Products",
    "priceEUR": 3468.42,
    "priceUSD": 3954.0,
    "hasPrice": true,
    "resaleEUR": 3468.42,
    "resaleUSD": 3954.0
  },
  {
    "id": "ECS-SXM-175",
    "label": "MERCAP-445™ Crack Repair — 900 ML DC",
    "product": "MERCAP-445™ Crack Repair",
    "packaging": "900 ML DC",
    "category": "Supplemental Products",
    "priceEUR": 64.91,
    "priceUSD": 74.0,
    "hasPrice": true,
    "resaleEUR": 64.91,
    "resaleUSD": 74.0
  },
  {
    "id": "ECS-SXM-176",
    "label": "MERCAP-445™ Crack Repair — 1.5 Gal Kit",
    "product": "MERCAP-445™ Crack Repair",
    "packaging": "1.5 Gal Kit",
    "category": "Supplemental Products",
    "priceEUR": 201.75,
    "priceUSD": 230.0,
    "hasPrice": true,
    "resaleEUR": 201.75,
    "resaleUSD": 230.0
  },
  {
    "id": "ECS-SXM-194",
    "label": "Silica Quartz [Rounded 40 sieve] — 80 Lb. Bag",
    "product": "Silica Quartz [Rounded 40 sieve]",
    "packaging": "80 Lb. Bag",
    "category": "Supplemental Products",
    "priceEUR": 29.82,
    "priceUSD": 34.0,
    "hasPrice": true,
    "resaleEUR": 29.82,
    "resaleUSD": 34.0
  },
  {
    "id": "ECS-SXM-195",
    "label": "Silica Quartz [Semi Trowel Grade 50 sieve] — 80 Lb. Bag",
    "product": "Silica Quartz [Semi Trowel Grade 50 sieve]",
    "packaging": "80 Lb. Bag",
    "category": "Supplemental Products",
    "priceEUR": 29.82,
    "priceUSD": 34.0,
    "hasPrice": true,
    "resaleEUR": 29.82,
    "resaleUSD": 34.0
  },
  {
    "id": "ECS-SXM-196",
    "label": "Silica Flour — 50 Lb. Bag",
    "product": "Silica Flour",
    "packaging": "50 Lb. Bag",
    "category": "Supplemental Products",
    "priceEUR": 33.33,
    "priceUSD": 38.0,
    "hasPrice": true,
    "resaleEUR": 33.33,
    "resaleUSD": 38.0
  },
  {
    "id": "ECS-SXM-204",
    "label": "5 Gallon - Elite Crete Systems “Mixing Pail” with semi-accurate measurements",
    "product": "5 Gallon - Elite Crete Systems “Mixing Pail” with semi-accurate measurements",
    "packaging": "—",
    "category": "Supplemental Products",
    "priceEUR": 9.44,
    "priceUSD": 10.76,
    "hasPrice": true,
    "resaleEUR": 9.44,
    "resaleUSD": 10.76
  },
  {
    "id": "ECS-SXM-205",
    "label": "6 Gallon - Elite Crete Systems “Mixing Pail” with semi-accurate measurements",
    "product": "6 Gallon - Elite Crete Systems “Mixing Pail” with semi-accurate measurements",
    "packaging": "—",
    "category": "Supplemental Products",
    "priceEUR": 9.44,
    "priceUSD": 10.76,
    "hasPrice": true,
    "resaleEUR": 9.44,
    "resaleUSD": 10.76
  },
  {
    "id": "ECS-SXM-206",
    "label": "5 Quart - Elite Crete Systems “Mixing Pail”",
    "product": "5 Quart - Elite Crete Systems “Mixing Pail”",
    "packaging": "—",
    "category": "Supplemental Products",
    "priceEUR": 3.3,
    "priceUSD": 3.76,
    "hasPrice": true,
    "resaleEUR": 3.3,
    "resaleUSD": 3.76
  },
  {
    "id": "ECS-SXM-207",
    "label": "Full Case of 5 Quart = 50 per",
    "product": "Full Case of 5 Quart = 50 per",
    "packaging": "—",
    "category": "Supplemental Products",
    "priceEUR": 157.89,
    "priceUSD": 180.0,
    "hasPrice": true,
    "resaleEUR": 157.89,
    "resaleUSD": 180.0
  },
  {
    "id": "ECS-SXM-208",
    "label": "2.5 Quart - Elite Crete Systems “Mixing Container”",
    "product": "2.5 Quart - Elite Crete Systems “Mixing Container”",
    "packaging": "—",
    "category": "Supplemental Products",
    "priceEUR": 1.7,
    "priceUSD": 1.94,
    "hasPrice": true,
    "resaleEUR": 1.7,
    "resaleUSD": 1.94
  },
  {
    "id": "ECS-SXM-209",
    "label": "Full Case of 2.5 Quart = 50 per",
    "product": "Full Case of 2.5 Quart = 50 per",
    "packaging": "—",
    "category": "Supplemental Products",
    "priceEUR": 80.7,
    "priceUSD": 92.0,
    "hasPrice": true,
    "resaleEUR": 80.7,
    "resaleUSD": 92.0
  }
];

export const findProduct = (id: string) => ECS_PRODUCTS.find(p => p.id === id);
export const findByFamily = (family: string) => ECS_PRODUCTS.filter(p => p.product === family);