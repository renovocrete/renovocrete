// ECS resale catalog for RENOVO CRETE — prix de revente uniquement (marge 45%).
// Base MD confidentielle : NE PAS afficher côté client.
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
  resaleEUR: number;
  resaleUSD: number;
}

export const ECS_PRODUCTS: EcsProduct[] = [
  {
    "id": "ECS-SXM-001",
    "label": "E100-PT1™-SHD: Kits — 3 Gal",
    "product": "E100-PT1™-SHD: Kits",
    "packaging": "3 Gal",
    "category": "Resinous Products",
    "resaleEUR": 186.6,
    "resaleUSD": 223.92
  },
  {
    "id": "ECS-SXM-002",
    "label": "E100-PT1™-SHD: Kits — 48 ea x 3 Gal Kits",
    "product": "E100-PT1™-SHD: Kits",
    "packaging": "48 ea x 3 Gal Kits",
    "category": "Resinous Products",
    "resaleEUR": 8421.05,
    "resaleUSD": 10105.26
  },
  {
    "id": "ECS-SXM-003",
    "label": "E100-PT1™-SHD: Kits — 15 Gal",
    "product": "E100-PT1™-SHD: Kits",
    "packaging": "15 Gal",
    "category": "Resinous Products",
    "resaleEUR": 779.9,
    "resaleUSD": 935.89
  },
  {
    "id": "ECS-SXM-004",
    "label": "E100-PT1™-SHD: Kits — 12 ea x 15 Gal",
    "product": "E100-PT1™-SHD: Kits",
    "packaging": "12 ea x 15 Gal",
    "category": "Resinous Products",
    "resaleEUR": 8784.69,
    "resaleUSD": 10541.63
  },
  {
    "id": "ECS-SXM-005",
    "label": "E100-PT1™-SHD: Kits — 156 Gal",
    "product": "E100-PT1™-SHD: Kits",
    "packaging": "156 Gal",
    "category": "Resinous Products",
    "resaleEUR": 6984.05,
    "resaleUSD": 8380.86
  },
  {
    "id": "ECS-SXM-020",
    "label": "E1E100-VR1™: Kits — 3 Gal",
    "product": "E1E100-VR1™: Kits",
    "packaging": "3 Gal",
    "category": "Resinous Products",
    "resaleEUR": 267.94,
    "resaleUSD": 321.53
  },
  {
    "id": "ECS-SXM-021",
    "label": "E1E100-VR1™: Kits — 15 Gal",
    "product": "E1E100-VR1™: Kits",
    "packaging": "15 Gal",
    "category": "Resinous Products",
    "resaleEUR": 1239.23,
    "resaleUSD": 1487.08
  },
  {
    "id": "ECS-SXM-022",
    "label": "E1E100-VR1™: Kits — 12 ea. x 15 Gal",
    "product": "E1E100-VR1™: Kits",
    "packaging": "12 ea. x 15 Gal",
    "category": "Resinous Products",
    "resaleEUR": 14296.65,
    "resaleUSD": 17155.98
  },
  {
    "id": "ECS-SXM-023",
    "label": "E1E100-VR1™: Kits — 156 Gal",
    "product": "E1E100-VR1™: Kits",
    "packaging": "156 Gal",
    "category": "Resinous Products",
    "resaleEUR": 11639.55,
    "resaleUSD": 13967.46
  },
  {
    "id": "ECS-SXM-006",
    "label": "E100-PT1™-UBC: Kits — 3 Gal",
    "product": "E100-PT1™-UBC: Kits",
    "packaging": "3 Gal",
    "category": "Resinous Products",
    "resaleEUR": 132.38,
    "resaleUSD": 158.85
  },
  {
    "id": "ECS-SXM-007",
    "label": "E100-PT1™-UBC: Kits — 15 Gal",
    "product": "E100-PT1™-UBC: Kits",
    "packaging": "15 Gal",
    "category": "Resinous Products",
    "resaleEUR": 617.22,
    "resaleUSD": 740.67
  },
  {
    "id": "ECS-SXM-008",
    "label": "E100-PT1™-UBC: Kits — 12 ea. x 15 Gal",
    "product": "E100-PT1™-UBC: Kits",
    "packaging": "12 ea. x 15 Gal",
    "category": "Resinous Products",
    "resaleEUR": 6947.37,
    "resaleUSD": 8336.84
  },
  {
    "id": "ECS-SXM-009",
    "label": "E100-PT1™-UBC: Kits — 156 Gal",
    "product": "E100-PT1™-UBC: Kits",
    "packaging": "156 Gal",
    "category": "Resinous Products",
    "resaleEUR": 5606.06,
    "resaleUSD": 6727.27
  },
  {
    "id": "ECS-SXM-024",
    "label": "E100-PT3™: Kits — 3 Gal",
    "product": "E100-PT3™: Kits",
    "packaging": "3 Gal",
    "category": "Resinous Products",
    "resaleEUR": 269.54,
    "resaleUSD": 323.44
  },
  {
    "id": "ECS-SXM-025",
    "label": "E100-PT3™: Kits — 15 Gal",
    "product": "E100-PT3™: Kits",
    "packaging": "15 Gal",
    "category": "Resinous Products",
    "resaleEUR": 1295.06,
    "resaleUSD": 1554.07
  },
  {
    "id": "ECS-SXM-026",
    "label": "E100-PT3™: Kits — 12 ea. x 15 Gal",
    "product": "E100-PT3™: Kits",
    "packaging": "12 ea. x 15 Gal",
    "category": "Resinous Products",
    "resaleEUR": 1250.4,
    "resaleUSD": 1500.48
  },
  {
    "id": "ECS-SXM-027",
    "label": "E100-PT4™-SHD: Kits — 3 Gal",
    "product": "E100-PT4™-SHD: Kits",
    "packaging": "3 Gal",
    "category": "Resinous Products",
    "resaleEUR": 216.91,
    "resaleUSD": 260.29
  },
  {
    "id": "ECS-SXM-028",
    "label": "E100-PT4™-SHD: Kits — 15 Gal",
    "product": "E100-PT4™-SHD: Kits",
    "packaging": "15 Gal",
    "category": "Resinous Products",
    "resaleEUR": 1055.82,
    "resaleUSD": 1266.99
  },
  {
    "id": "ECS-SXM-029",
    "label": "E100-PT4™-SHD: Kits — 12 ea. x 15 Gal",
    "product": "E100-PT4™-SHD: Kits",
    "packaging": "12 ea. x 15 Gal",
    "category": "Resinous Products",
    "resaleEUR": 12287.08,
    "resaleUSD": 14744.5
  },
  {
    "id": "ECS-SXM-030",
    "label": "E100-PT4™-SHD: Kits — 156 Gal",
    "product": "E100-PT4™-SHD: Kits",
    "packaging": "156 Gal",
    "category": "Resinous Products",
    "resaleEUR": 9886.76,
    "resaleUSD": 11864.11
  },
  {
    "id": "ECS-SXM-039",
    "label": "E100-VB5™: Kits — 2 Gal",
    "product": "E100-VB5™: Kits",
    "packaging": "2 Gal",
    "category": "Resinous Products",
    "resaleEUR": 161.08,
    "resaleUSD": 193.3
  },
  {
    "id": "ECS-SXM-040",
    "label": "E100-VB5™: Kits — 10 Gal",
    "product": "E100-VB5™: Kits",
    "packaging": "10 Gal",
    "category": "Resinous Products",
    "resaleEUR": 752.79,
    "resaleUSD": 903.35
  },
  {
    "id": "ECS-SXM-041",
    "label": "E100-VB5™: Kits — 18 ea. x 10 Gal",
    "product": "E100-VB5™: Kits",
    "packaging": "18 ea. x 10 Gal",
    "category": "Resinous Products",
    "resaleEUR": 12947.37,
    "resaleUSD": 15536.84
  },
  {
    "id": "ECS-SXM-042",
    "label": "E100-VB5™: Kits — 104 Gal",
    "product": "E100-VB5™: Kits",
    "packaging": "104 Gal",
    "category": "Resinous Products",
    "resaleEUR": 6934.61,
    "resaleUSD": 8321.53
  },
  {
    "id": "ECS-SXM-073",
    "label": "AUS-V™: Kits — 1.5 Gal",
    "product": "AUS-V™: Kits",
    "packaging": "1.5 Gal",
    "category": "Resinous Products",
    "resaleEUR": 202.55,
    "resaleUSD": 243.06
  },
  {
    "id": "ECS-SXM-074",
    "label": "AUS-V™: Kits — 3 Gal",
    "product": "AUS-V™: Kits",
    "packaging": "3 Gal",
    "category": "Resinous Products",
    "resaleEUR": 387.56,
    "resaleUSD": 465.07
  },
  {
    "id": "ECS-SXM-075",
    "label": "AUS-V™: Kits — 15 Gal",
    "product": "AUS-V™: Kits",
    "packaging": "15 Gal",
    "category": "Resinous Products",
    "resaleEUR": 1848.48,
    "resaleUSD": 2218.18
  },
  {
    "id": "ECS-SXM-076",
    "label": "AUS-V™: Kits — 12 ea. x 15 Gal",
    "product": "AUS-V™: Kits",
    "packaging": "12 ea. x 15 Gal",
    "category": "Resinous Products",
    "resaleEUR": 21301.44,
    "resaleUSD": 25561.72
  },
  {
    "id": "ECS-SXM-080",
    "label": "SPARTIC-ALL™-MXP: Kits — 3 Gal",
    "product": "SPARTIC-ALL™-MXP: Kits",
    "packaging": "3 Gal",
    "category": "Resinous Products",
    "resaleEUR": 277.51,
    "resaleUSD": 333.01
  },
  {
    "id": "ECS-SXM-081",
    "label": "SPARTIC-ALL™-MXP: Kits — 15 Gal",
    "product": "SPARTIC-ALL™-MXP: Kits",
    "packaging": "15 Gal",
    "category": "Resinous Products",
    "resaleEUR": 1342.9,
    "resaleUSD": 1611.48
  },
  {
    "id": "ECS-SXM-082",
    "label": "SPARTIC-ALL™-MXP: Kits — 12 ea. x 15 Gal",
    "product": "SPARTIC-ALL™-MXP: Kits",
    "packaging": "12 ea. x 15 Gal",
    "category": "Resinous Products",
    "resaleEUR": 15674.64,
    "resaleUSD": 18809.57
  },
  {
    "id": "ECS-SXM-103",
    "label": "THIN-FINISH™ Pre-Mixed Overlay — 55 lb. Bag",
    "product": "THIN-FINISH™ Pre-Mixed Overlay",
    "packaging": "55 lb. Bag",
    "category": "Cementitious Products",
    "resaleEUR": 60.61,
    "resaleUSD": 72.73
  },
  {
    "id": "ECS-SXM-104",
    "label": "THIN-FINISH™ Pre-Mixed Overlay — 56 Bag/Plt.",
    "product": "THIN-FINISH™ Pre-Mixed Overlay",
    "packaging": "56 Bag/Plt.",
    "category": "Cementitious Products",
    "resaleEUR": 3126.0,
    "resaleUSD": 3751.2
  },
  {
    "id": "ECS-SXM-105",
    "label": "THIN-FINISH™ Pre-Mixed Overlay — 14 Pallets",
    "product": "THIN-FINISH™ Pre-Mixed Overlay",
    "packaging": "14 Pallets",
    "category": "Cementitious Products",
    "resaleEUR": 42513.56,
    "resaleUSD": 51016.27
  },
  {
    "id": "ECS-SXM-106",
    "label": "TEXTURE-PAVE™ Pre-Mixed Overlay — 55 lb. Bag",
    "product": "TEXTURE-PAVE™ Pre-Mixed Overlay",
    "packaging": "55 lb. Bag",
    "category": "Cementitious Products",
    "resaleEUR": 46.25,
    "resaleUSD": 55.5
  },
  {
    "id": "ECS-SXM-107",
    "label": "TEXTURE-PAVE™ Pre-Mixed Overlay — 56 Bag/Plt.",
    "product": "TEXTURE-PAVE™ Pre-Mixed Overlay",
    "packaging": "56 Bag/Plt.",
    "category": "Cementitious Products",
    "resaleEUR": 2322.17,
    "resaleUSD": 2786.6
  },
  {
    "id": "ECS-SXM-108",
    "label": "TEXTURE-PAVE™ Pre-Mixed Overlay — 14 Pallets",
    "product": "TEXTURE-PAVE™ Pre-Mixed Overlay",
    "packaging": "14 Pallets",
    "category": "Cementitious Products",
    "resaleEUR": 30009.57,
    "resaleUSD": 36011.48
  },
  {
    "id": "ECS-SXM-109",
    "label": "MICRO-FINISH™ Pre-Mixed Overlay — 30 lb. Bag",
    "product": "MICRO-FINISH™ Pre-Mixed Overlay",
    "packaging": "30 lb. Bag",
    "category": "Cementitious Products",
    "resaleEUR": 47.85,
    "resaleUSD": 57.42
  },
  {
    "id": "ECS-SXM-110",
    "label": "MICRO-FINISH™ Pre-Mixed Overlay — 56 Bag/Plt.",
    "product": "MICRO-FINISH™ Pre-Mixed Overlay",
    "packaging": "56 Bag/Plt.",
    "category": "Cementitious Products",
    "resaleEUR": 2500.8,
    "resaleUSD": 3000.96
  },
  {
    "id": "ECS-SXM-111",
    "label": "MICRO-FINISH™ Pre-Mixed Overlay — 14 Pallets",
    "product": "MICRO-FINISH™ Pre-Mixed Overlay",
    "packaging": "14 Pallets",
    "category": "Cementitious Products",
    "resaleEUR": 33760.77,
    "resaleUSD": 40512.92
  },
  {
    "id": "ECS-SXM-112",
    "label": "BACE-LINE™ 6.3M — 50 lb. Bag",
    "product": "BACE-LINE™ 6.3M",
    "packaging": "50 lb. Bag",
    "category": "Cementitious Products",
    "resaleEUR": 74.96,
    "resaleUSD": 89.95
  },
  {
    "id": "ECS-SXM-113",
    "label": "BACE-LINE™ 6.3M — 56 Bag/Plt.",
    "product": "BACE-LINE™ 6.3M",
    "packaging": "56 Bag/Plt.",
    "category": "Cementitious Products",
    "resaleEUR": 4108.45,
    "resaleUSD": 4930.14
  },
  {
    "id": "ECS-SXM-117",
    "label": "JFS-450H™ Joint Filler – “Gray” — 305 ML Tube",
    "product": "JFS-450H™ Joint Filler – “Gray”",
    "packaging": "305 ML Tube",
    "category": "Cementitious Products",
    "resaleEUR": 9.57,
    "resaleUSD": 11.48
  },
  {
    "id": "ECS-SXM-118",
    "label": "JFS-450H™ Joint Filler – “Gray” — 24 ea. Case",
    "product": "JFS-450H™ Joint Filler – “Gray”",
    "packaging": "24 ea. Case",
    "category": "Cementitious Products",
    "resaleEUR": 210.53,
    "resaleUSD": 252.63
  },
  {
    "id": "ECS-SXM-122",
    "label": "REFLECTOR™ Enhancer Powder — 32 oz. Jar",
    "product": "REFLECTOR™ Enhancer Powder",
    "packaging": "32 oz. Jar",
    "category": "Pigment/Colorant/Stain Products",
    "resaleEUR": 66.99,
    "resaleUSD": 80.38
  },
  {
    "id": "ECS-SXM-123",
    "label": "REFLECTOR™ Enhancer Powder — 2 oz. Jar",
    "product": "REFLECTOR™ Enhancer Powder",
    "packaging": "2 oz. Jar",
    "category": "Pigment/Colorant/Stain Products",
    "resaleEUR": 9.57,
    "resaleUSD": 11.48
  },
  {
    "id": "ECS-SXM-124",
    "label": "REFLECTOR™ Enhancer Powder — Sample Kit",
    "product": "REFLECTOR™ Enhancer Powder",
    "packaging": "Sample Kit",
    "category": "Pigment/Colorant/Stain Products",
    "resaleEUR": 175.44,
    "resaleUSD": 210.53
  },
  {
    "id": "ECS-SXM-132",
    "label": "ULTRA-STONE™ Antiquing Stain — 1 Gal",
    "product": "ULTRA-STONE™ Antiquing Stain",
    "packaging": "1 Gal",
    "category": "Pigment/Colorant/Stain Products",
    "resaleEUR": 54.23,
    "resaleUSD": 65.07
  },
  {
    "id": "ECS-SXM-133",
    "label": "ULTRA-STONE™ Antiquing Stain — 5 Gal",
    "product": "ULTRA-STONE™ Antiquing Stain",
    "packaging": "5 Gal",
    "category": "Pigment/Colorant/Stain Products",
    "resaleEUR": 244.02,
    "resaleUSD": 292.82
  },
  {
    "id": "ECS-SXM-134",
    "label": "ULTRA-STONE™ Antiquing Stain — 36 ea. x 5 Gal",
    "product": "ULTRA-STONE™ Antiquing Stain",
    "packaging": "36 ea. x 5 Gal",
    "category": "Pigment/Colorant/Stain Products",
    "resaleEUR": 8497.61,
    "resaleUSD": 10197.13
  },
  {
    "id": "ECS-SXM-149",
    "label": "CSS EMULSION™ Clear Concentrated Sealer — 1 Gal",
    "product": "CSS EMULSION™ Clear Concentrated Sealer",
    "packaging": "1 Gal",
    "category": "Single Component Sealer Products",
    "resaleEUR": 62.2,
    "resaleUSD": 74.64
  },
  {
    "id": "ECS-SXM-150",
    "label": "CSS EMULSION™ Clear Concentrated Sealer — 5 Gal",
    "product": "CSS EMULSION™ Clear Concentrated Sealer",
    "packaging": "5 Gal",
    "category": "Single Component Sealer Products",
    "resaleEUR": 301.44,
    "resaleUSD": 361.72
  },
  {
    "id": "ECS-SXM-151",
    "label": "CSS EMULSION™ Clear Concentrated Sealer — 36 ea. x 5 Gal",
    "product": "CSS EMULSION™ Clear Concentrated Sealer",
    "packaging": "36 ea. x 5 Gal",
    "category": "Single Component Sealer Products",
    "resaleEUR": 10564.59,
    "resaleUSD": 12677.51
  },
  {
    "id": "ECS-SXM-152",
    "label": "CSS EMULSION™ Clear Concentrated Sealer — 55 Gal",
    "product": "CSS EMULSION™ Clear Concentrated Sealer",
    "packaging": "55 Gal",
    "category": "Single Component Sealer Products",
    "resaleEUR": 3153.11,
    "resaleUSD": 3783.73
  },
  {
    "id": "ECS-SXM-175",
    "label": "MERCAP-445™ Crack Repair — 900 ML DC",
    "product": "MERCAP-445™ Crack Repair",
    "packaging": "900 ML DC",
    "category": "Supplemental Products",
    "resaleEUR": 59.01,
    "resaleUSD": 70.81
  },
  {
    "id": "ECS-SXM-176",
    "label": "MERCAP-445™ Crack Repair — 1.5 Gal Kit",
    "product": "MERCAP-445™ Crack Repair",
    "packaging": "1.5 Gal Kit",
    "category": "Supplemental Products",
    "resaleEUR": 183.41,
    "resaleUSD": 220.1
  },
  {
    "id": "ECS-SXM-194",
    "label": "Silica Quartz [Rounded 40 sieve] — 80 Lb. Bag",
    "product": "Silica Quartz [Rounded 40 sieve]",
    "packaging": "80 Lb. Bag",
    "category": "Supplemental Products",
    "resaleEUR": 27.11,
    "resaleUSD": 32.54
  },
  {
    "id": "ECS-SXM-195",
    "label": "Silica Quartz [Semi Trowel Grade 50 sieve] — 80 Lb. Bag",
    "product": "Silica Quartz [Semi Trowel Grade 50 sieve]",
    "packaging": "80 Lb. Bag",
    "category": "Supplemental Products",
    "resaleEUR": 27.11,
    "resaleUSD": 32.54
  },
  {
    "id": "ECS-SXM-196",
    "label": "Silica Flour — 50 Lb. Bag",
    "product": "Silica Flour",
    "packaging": "50 Lb. Bag",
    "category": "Supplemental Products",
    "resaleEUR": 30.3,
    "resaleUSD": 36.36
  },
  {
    "id": "ECS-SXM-204",
    "label": "5 Gallon - Elite Crete Systems “Mixing Pail” with semi-accurate measurements",
    "product": "5 Gallon - Elite Crete Systems “Mixing Pail” with semi-accurate measurements",
    "packaging": "N/A",
    "category": "Supplemental Products",
    "resaleEUR": 8.58,
    "resaleUSD": 10.3
  },
  {
    "id": "ECS-SXM-205",
    "label": "6 Gallon - Elite Crete Systems “Mixing Pail” with semi-accurate measurements",
    "product": "6 Gallon - Elite Crete Systems “Mixing Pail” with semi-accurate measurements",
    "packaging": "N/A",
    "category": "Supplemental Products",
    "resaleEUR": 8.58,
    "resaleUSD": 10.3
  },
  {
    "id": "ECS-SXM-206",
    "label": "5 Quart - Elite Crete Systems “Mixing Pail”",
    "product": "5 Quart - Elite Crete Systems “Mixing Pail”",
    "packaging": "N/A",
    "category": "Supplemental Products",
    "resaleEUR": 3.0,
    "resaleUSD": 3.6
  },
  {
    "id": "ECS-SXM-207",
    "label": "Full Case of 5 Quart = 50 per",
    "product": "Full Case of 5 Quart = 50 per",
    "packaging": "N/A",
    "category": "Supplemental Products",
    "resaleEUR": 143.54,
    "resaleUSD": 172.25
  },
  {
    "id": "ECS-SXM-208",
    "label": "2.5 Quart - Elite Crete Systems “Mixing Container”",
    "product": "2.5 Quart - Elite Crete Systems “Mixing Container”",
    "packaging": "N/A",
    "category": "Supplemental Products",
    "resaleEUR": 1.55,
    "resaleUSD": 1.86
  },
  {
    "id": "ECS-SXM-209",
    "label": "Full Case of 2.5 Quart = 50 per",
    "product": "Full Case of 2.5 Quart = 50 per",
    "packaging": "N/A",
    "category": "Supplemental Products",
    "resaleEUR": 73.37,
    "resaleUSD": 88.04
  }
];
