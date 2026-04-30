// Elite Crete Systems color catalog — extracted from official ECS color charts
// Source: elitecrete.com PDFs (Hermetic Flake, Quartz, Reflector Enhancer, Chem-Stone, Urethane Cement, Portion Control, Resinous Industrial)

import flakeDove from "@/assets/colors/flake/dove.jpg";
import flakeLatte from "@/assets/colors/flake/latte.jpg";
import flakeSandstone from "@/assets/colors/flake/sandstone.jpg";
import flakeDesert from "@/assets/colors/flake/desert-stone.jpg";
import flakeSahara from "@/assets/colors/flake/sahara.jpg";
import flakeDriftwood from "@/assets/colors/flake/driftwood.jpg";
import flakeSedona from "@/assets/colors/flake/sedona.jpg";
import flakeHazyBlue from "@/assets/colors/flake/hazy-blue.jpg";
import flakePebble from "@/assets/colors/flake/pebble.jpg";
import flakeCalico from "@/assets/colors/flake/calico.jpg";
import flakeTwilight from "@/assets/colors/flake/twilight.jpg";
import flakeAbyss from "@/assets/colors/flake/abyss.jpg";

import quartzFossil from "@/assets/colors/quartz/fossil.jpg";
import quartzGranite from "@/assets/colors/quartz/granite.jpg";
import quartzTopaz from "@/assets/colors/quartz/topaz.jpg";
import quartzSapphire from "@/assets/colors/quartz/sapphire.jpg";
import quartzPewter from "@/assets/colors/quartz/pewter.jpg";
import quartzLimestone from "@/assets/colors/quartz/limestone.jpg";
import quartzGarnet from "@/assets/colors/quartz/garnet.jpg";
import quartzSunset from "@/assets/colors/quartz/sunset.jpg";
import quartzBeach from "@/assets/colors/quartz/beach.jpg";
import quartzCaribbean from "@/assets/colors/quartz/caribbean.jpg";

import reflBrass from "@/assets/colors/reflector/brass.jpg";
import reflCoffee from "@/assets/colors/reflector/coffee.jpg";
import reflCairo from "@/assets/colors/reflector/cairo.jpg";
import reflGrape from "@/assets/colors/reflector/concord-grape.jpg";
import reflGreenApple from "@/assets/colors/reflector/green-apple.jpg";
import reflGunmetal from "@/assets/colors/reflector/gunmetal.jpg";
import reflRialto from "@/assets/colors/reflector/rialto.jpg";
import reflRusset from "@/assets/colors/reflector/russet.jpg";
import reflSherbet from "@/assets/colors/reflector/sherbet.jpg";
import reflSkyBlue from "@/assets/colors/reflector/sky-blue.jpg";
import reflCopper from "@/assets/colors/reflector/copper.jpg";
import reflDarkGreen from "@/assets/colors/reflector/dark-green.jpg";
import reflLilac from "@/assets/colors/reflector/lilac.jpg";
import reflOrangeGold from "@/assets/colors/reflector/orange-gold.jpg";
import reflCharcoal from "@/assets/colors/reflector/charcoal.jpg";
import reflTitanium from "@/assets/colors/reflector/titanium.jpg";

import csTan from "@/assets/colors/chemstone/antique-tan.jpg";
import csBrown from "@/assets/colors/chemstone/antique-brown.jpg";
import csRed from "@/assets/colors/chemstone/antique-red.jpg";
import csBlack from "@/assets/colors/chemstone/antique-black.jpg";
import csGreen from "@/assets/colors/chemstone/antique-green.jpg";
import csBlue from "@/assets/colors/chemstone/antique-blue.jpg";
import csGold from "@/assets/colors/chemstone/antique-gold.jpg";
import csUmber from "@/assets/colors/chemstone/antique-umber.jpg";

import resLightGray from "@/assets/colors/resinous/light-gray.jpg";
import resMediumGray from "@/assets/colors/resinous/medium-gray.jpg";
import resDarkGray from "@/assets/colors/resinous/dark-gray.jpg";
import resBlack from "@/assets/colors/resinous/black.jpg";
import resWhite from "@/assets/colors/resinous/white.jpg";
import resTan from "@/assets/colors/resinous/tan.jpg";
import resRed from "@/assets/colors/resinous/red.jpg";
import resCountryBlue from "@/assets/colors/resinous/country-blue.jpg";
import resForest from "@/assets/colors/resinous/forest-green.jpg";
import resBrown from "@/assets/colors/resinous/brown.jpg";
import resNevada from "@/assets/colors/resinous/nevada-clay.jpg";
import resYellow from "@/assets/colors/resinous/safety-yellow.jpg";
import resBurnt from "@/assets/colors/resinous/burnt-orange.jpg";
import resArmy from "@/assets/colors/resinous/army-green.jpg";

export type ProductLine =
  | "reflector"
  | "flake"
  | "quartz"
  | "urethane"
  | "chemstone"
  | "portion"
  | "resinous";

export interface ColorSwatch {
  id: string;
  name: string;
  code?: string;
  image: string;
  hint?: string; // dominant hint for AI prompt
}

export interface ProductCatalog {
  id: ProductLine;
  name: string;
  tagline: { fr: string; en: string };
  description: { fr: string; en: string };
  pdf: string; // public path
  colors: ColorSwatch[];
}

export const CATALOGS: ProductCatalog[] = [
  {
    id: "reflector",
    name: "Reflector™ Enhancer",
    tagline: { fr: "Sol métallique haut de gamme, fluide et autolissant", en: "Metallic, self-leveling premium floor" },
    description: {
      fr: "Système haut de gamme à effet métallique unique. Idéal pour showrooms, restaurants, hôtels et lofts résidentiels.",
      en: "High-end metallic effect system. Ideal for showrooms, restaurants, hotels and residential lofts.",
    },
    pdf: "/catalogs/reflector-enhancer-color-chart.pdf",
    colors: [
      { id: "brass", name: "Brass", image: reflBrass, hint: "warm metallic brass gold" },
      { id: "coffee", name: "Coffee", image: reflCoffee, hint: "deep coffee brown metallic" },
      { id: "cairo", name: "Cairo", image: reflCairo, hint: "warm sand metallic" },
      { id: "concord-grape", name: "Concord Grape", image: reflGrape, hint: "deep purple metallic" },
      { id: "green-apple", name: "Green Apple", image: reflGreenApple, hint: "vibrant green metallic" },
      { id: "gunmetal", name: "Gunmetal", image: reflGunmetal, hint: "dark grey metallic" },
      { id: "rialto", name: "Rialto", image: reflRialto, hint: "blue grey metallic" },
      { id: "russet", name: "Russet", image: reflRusset, hint: "russet red brown metallic" },
      { id: "sherbet", name: "Sherbet", image: reflSherbet, hint: "soft pink metallic" },
      { id: "sky-blue", name: "Sky Blue", image: reflSkyBlue, hint: "light sky blue metallic" },
      { id: "copper", name: "Copper", image: reflCopper, hint: "copper orange metallic" },
      { id: "dark-green", name: "Dark Green", image: reflDarkGreen, hint: "dark forest green metallic" },
      { id: "lilac", name: "Lilac", image: reflLilac, hint: "soft lilac purple metallic" },
      { id: "orange-gold", name: "Orange Gold", image: reflOrangeGold, hint: "orange gold metallic" },
      { id: "charcoal", name: "Charcoal", image: reflCharcoal, hint: "charcoal black metallic" },
      { id: "titanium", name: "Titanium", image: reflTitanium, hint: "silver titanium metallic" },
    ],
  },
  {
    id: "flake",
    name: "Hermetic™ Flake",
    tagline: { fr: "Sol à flocons décoratifs, antidérapant", en: "Decorative flake floor, slip resistant" },
    description: {
      fr: "Sol résineux décoratif à flocons multicolores. Durable, hygiénique, antidérapant. Garages, cuisines pro, salles de sport, espaces commerciaux.",
      en: "Multi-color decorative flake resin floor. Durable, hygienic, slip-resistant.",
    },
    pdf: "/catalogs/hermetic-flake-color-chart.pdf",
    colors: [
      { id: "dove", name: "Dove", code: "EEO-131", image: flakeDove, hint: "light grey speckled flake" },
      { id: "latte", name: "Latte", code: "EEA-044", image: flakeLatte, hint: "warm beige flake" },
      { id: "sandstone", name: "Sandstone", code: "EEN-127", image: flakeSandstone, hint: "sandstone tan flake" },
      { id: "desert-stone", name: "Desert Stone", code: "EEE-446", image: flakeDesert, hint: "desert beige flake" },
      { id: "sahara", name: "Sahara", code: "EAA-211", image: flakeSahara, hint: "sahara warm flake" },
      { id: "driftwood", name: "Driftwood", code: "EDR-216", image: flakeDriftwood, hint: "driftwood brown flake" },
      { id: "sedona", name: "Sedona", code: "EAE-076", image: flakeSedona, hint: "sedona red orange flake" },
      { id: "hazy-blue", name: "Hazy Blue", code: "EUA-335", image: flakeHazyBlue, hint: "soft blue flake" },
      { id: "pebble", name: "Pebble", code: "ELE-234", image: flakePebble, hint: "pebble grey flake" },
      { id: "calico", name: "Calico", code: "EOA-339", image: flakeCalico, hint: "multi color calico flake" },
      { id: "twilight", name: "Twilight", code: "EHI-291", image: flakeTwilight, hint: "twilight blue grey flake" },
      { id: "abyss", name: "Abyss", code: "ESA-155", image: flakeAbyss, hint: "deep dark navy flake" },
    ],
  },
  {
    id: "quartz",
    name: "Hermetic™ Quartz",
    tagline: { fr: "Sol quartz double broadcast, ultra durable", en: "Double broadcast quartz floor" },
    description: {
      fr: "Système haute épaisseur à agrégats de quartz coloré. Cuisines commerciales, vestiaires, zones humides.",
      en: "High build double-broadcast colored quartz aggregate floor. Commercial kitchens, locker rooms, wet areas.",
    },
    pdf: "/catalogs/hermetic-quartz-color-chart.pdf",
    colors: [
      { id: "fossil", name: "Fossil", code: "ELO-656", image: quartzFossil, hint: "fossil grey quartz" },
      { id: "granite", name: "Granite", code: "EER-674", image: quartzGranite, hint: "granite grey quartz" },
      { id: "topaz", name: "Topaz", code: "EZO-702", image: quartzTopaz, hint: "topaz blue quartz" },
      { id: "sapphire", name: "Sapphire", code: "EEP-762", image: quartzSapphire, hint: "sapphire blue quartz" },
      { id: "pewter", name: "Pewter", code: "ERE-781", image: quartzPewter, hint: "pewter grey quartz" },
      { id: "limestone", name: "Limestone", code: "EEM-833", image: quartzLimestone, hint: "limestone tan quartz" },
      { id: "garnet", name: "Garnet", code: "ETA-899", image: quartzGarnet, hint: "garnet red quartz" },
      { id: "sunset", name: "Sunset", code: "ETU-913", image: quartzSunset, hint: "sunset orange quartz" },
      { id: "beach", name: "Beach", code: "EHE-941", image: quartzBeach, hint: "beach beige quartz" },
      { id: "caribbean", name: "Caribbean", code: "ENA-978", image: quartzCaribbean, hint: "caribbean warm quartz" },
    ],
  },
  {
    id: "chemstone",
    name: "Chem-Stone™ Reactive Stain",
    tagline: { fr: "Teinture réactive métallique sur béton", en: "Reactive metallic stain on concrete" },
    description: {
      fr: "Teinte translucide unique par réaction acide sur béton. Effet pierre vieillie, marbre, ardoise — ne s'écaille pas.",
      en: "Unique translucent acid-reactive stain on cementitious surfaces. Aged stone, marble, slate effect.",
    },
    pdf: "/catalogs/ColorChart-chem_stone_chart.pdf",
    colors: [
      { id: "antique-tan", name: "Antique Tan", image: csTan, hint: "antique tan acid stained concrete" },
      { id: "antique-brown", name: "Antique Brown", image: csBrown, hint: "antique brown acid stained concrete" },
      { id: "antique-red", name: "Antique Red", image: csRed, hint: "antique red acid stained concrete" },
      { id: "antique-black", name: "Antique Black", image: csBlack, hint: "antique black acid stained concrete" },
      { id: "antique-green", name: "Antique Green", image: csGreen, hint: "antique green acid stained concrete" },
      { id: "antique-blue", name: "Antique Blue", image: csBlue, hint: "antique blue acid stained concrete" },
      { id: "antique-gold", name: "Antique Gold", image: csGold, hint: "antique gold acid stained concrete" },
      { id: "antique-umber", name: "Antique Umber", image: csUmber, hint: "antique umber acid stained concrete" },
    ],
  },
  {
    id: "urethane",
    name: "Hermetic™ Urethane Cement",
    tagline: { fr: "Ciment uréthane industriel haute résistance", en: "Industrial high-resistance urethane cement" },
    description: {
      fr: "Sol ciment uréthane pour zones agroalimentaires, chocs thermiques, milieux extrêmes.",
      en: "Urethane cement floor for food processing, thermal shock and extreme environments.",
    },
    pdf: "/catalogs/hermetic-urethane-cement-color-chart.pdf",
    colors: [
      { id: "u-light-gray", name: "Light Gray", image: resLightGray, hint: "light grey urethane cement" },
      { id: "u-medium-gray", name: "Medium Gray", image: resMediumGray, hint: "medium grey urethane cement" },
      { id: "u-dark-gray", name: "Dark Gray", image: resDarkGray, hint: "dark grey urethane cement" },
      { id: "u-white", name: "White", image: resWhite, hint: "white urethane cement" },
      { id: "u-black", name: "Black", image: resBlack, hint: "black urethane cement" },
      { id: "u-tan", name: "Tan", image: resTan, hint: "tan urethane cement" },
      { id: "u-red", name: "Red", image: resRed, hint: "red urethane cement" },
      { id: "u-yellow", name: "Safety Yellow", image: resYellow, hint: "safety yellow urethane cement" },
    ],
  },
  {
    id: "resinous",
    name: "Resinous Industrial Coatings",
    tagline: { fr: "Revêtement résineux industriel uni", en: "Solid color industrial resinous coating" },
    description: {
      fr: "Couleurs unies pour entrepôts, garages, ateliers, zones de production.",
      en: "Solid color industrial resin coating for warehouses, garages, workshops, production areas.",
    },
    pdf: "/catalogs/resinous-industrial-coatings-color-chart.pdf",
    colors: [
      { id: "r-light-gray", name: "Light Gray", image: resLightGray, hint: "solid light grey industrial floor" },
      { id: "r-medium-gray", name: "Medium Gray", image: resMediumGray, hint: "solid medium grey industrial floor" },
      { id: "r-dark-gray", name: "Dark Gray", image: resDarkGray, hint: "solid dark grey industrial floor" },
      { id: "r-black", name: "Black", image: resBlack, hint: "solid black industrial floor" },
      { id: "r-white", name: "White", image: resWhite, hint: "solid white industrial floor" },
      { id: "r-tan", name: "Tan", image: resTan, hint: "solid tan industrial floor" },
      { id: "r-red", name: "Red", image: resRed, hint: "solid red industrial floor" },
      { id: "r-country-blue", name: "Country Blue", image: resCountryBlue, hint: "solid country blue industrial floor" },
      { id: "r-forest-green", name: "Forest Green", image: resForest, hint: "solid forest green industrial floor" },
      { id: "r-brown", name: "Brown", image: resBrown, hint: "solid brown industrial floor" },
      { id: "r-nevada-clay", name: "Nevada Clay", image: resNevada, hint: "solid nevada clay industrial floor" },
      { id: "r-safety-yellow", name: "Safety Yellow", image: resYellow, hint: "solid safety yellow industrial floor" },
      { id: "r-burnt-orange", name: "Burnt Orange", image: resBurnt, hint: "solid burnt orange industrial floor" },
      { id: "r-army-green", name: "Army Green", image: resArmy, hint: "solid army green industrial floor" },
    ],
  },
];

export const getCatalog = (id: ProductLine) => CATALOGS.find((c) => c.id === id);
export const getColor = (productId: ProductLine, colorId: string) =>
  getCatalog(productId)?.colors.find((c) => c.id === colorId);

// Coverage formulas (gallons per m²) per ECS product line.
// Sources: ECS technical data sheets; values are practical jobsite averages used by certified installers.
// Result is total mixed gallons (A+B). A:B ratio gives split per component.
export interface ProductFormula {
  id: ProductLine;
  // m² per mixed gallon at recommended thickness
  coverageSqmPerGallon: number;
  // A:B mix ratio by volume
  ratio: { a: number; b: number };
  notes: { fr: string; en: string };
}

export const FORMULAS: Record<ProductLine, ProductFormula> = {
  reflector: { id: "reflector", coverageSqmPerGallon: 9.3, ratio: { a: 2, b: 1 }, notes: { fr: "Self-leveling à ~1.5 mm. 1 gal couvre ~9 m².", en: "Self-leveling at ~1.5 mm. 1 gal covers ~9 m²." } },
  flake: { id: "flake", coverageSqmPerGallon: 18.6, ratio: { a: 2, b: 1 }, notes: { fr: "Couche de base + topcoat. Prévoir flocons (0.25 lb/m²).", en: "Base coat + topcoat. Plan flake (0.25 lb/m²)." } },
  quartz: { id: "quartz", coverageSqmPerGallon: 11.1, ratio: { a: 2, b: 1 }, notes: { fr: "Double broadcast. Prévoir quartz coloré (8 kg/m²).", en: "Double broadcast. Plan colored quartz (8 kg/m²)." } },
  urethane: { id: "urethane", coverageSqmPerGallon: 4.6, ratio: { a: 1, b: 1 }, notes: { fr: "Application 4-6 mm. Inclut partie poudre.", en: "4-6 mm application. Includes powder part." } },
  chemstone: { id: "chemstone", coverageSqmPerGallon: 27.9, ratio: { a: 1, b: 0 }, notes: { fr: "Teinture liquide, 1 composant. Application en 2 passes.", en: "Liquid stain, 1-part. Apply in 2 coats." } },
  portion: { id: "portion", coverageSqmPerGallon: 18.6, ratio: { a: 1, b: 0 }, notes: { fr: "Colorant à incorporer dans base époxy ou mortier.", en: "Colorant to add into epoxy base or mortar." } },
  resinous: { id: "resinous", coverageSqmPerGallon: 14.0, ratio: { a: 2, b: 1 }, notes: { fr: "2 couches recommandées. Primaire requis.", en: "2 coats recommended. Primer required." } },
};

export interface CalcResult {
  totalGallons: number;
  partA: number;
  partB: number;
  notes: { fr: string; en: string };
}

export function calculateResin(productId: ProductLine, surfaceSqm: number, coats = 1): CalcResult {
  const f = FORMULAS[productId];
  const total = (surfaceSqm / f.coverageSqmPerGallon) * coats;
  const ratioSum = f.ratio.a + f.ratio.b;
  const partA = (total * f.ratio.a) / ratioSum;
  const partB = ratioSum > f.ratio.a ? (total * f.ratio.b) / ratioSum : 0;
  // round up to nearest 0.25 gal
  const ceilQ = (n: number) => Math.ceil(n * 4) / 4;
  return {
    totalGallons: ceilQ(total),
    partA: ceilQ(partA),
    partB: ceilQ(partB),
    notes: f.notes,
  };
}
