import heroImg from "@/assets/hero-epoxy-floor.jpg";
import countertopImg from "@/assets/epoxy-countertop.jpg";
import tableImg from "@/assets/epoxy-table.jpg";
import industrialImg from "@/assets/epoxy-industrial.jpg";
import outdoorImg from "@/assets/epoxy-outdoor.jpg";
import commercialImg from "@/assets/epoxy-commercial.jpg";
import garageImg from "@/assets/epoxy-garage.jpg";
import beforeAfterImg from "@/assets/before-after.jpg";

export { heroImg, countertopImg, tableImg, industrialImg, outdoorImg, commercialImg, garageImg, beforeAfterImg };

export const testimonials = [
  {
    name: "Martin Lavoie",
    role: "Propriétaire résidentiel",
    text: "Notre garage est méconnaissable. Le sol métallique est magnifique et résistant — aucune tache d'huile ne s'incruste. Service impeccable, délais respectés.",
    rating: 5,
    location: "Laval",
  },
  {
    name: "Sophie Tremblay",
    role: "Restauratrice",
    text: "Le sol de notre restaurant est non seulement superbe, mais il résiste à tout : trafic intense, éclaboussures, nettoyages quotidiens. Nos clients le remarquent immédiatement.",
    rating: 5,
    location: "Montréal",
  },
  {
    name: "Jean-Philippe Gagnon",
    role: "Directeur d'entrepôt",
    text: "Renovo Crete a transformé notre entrepôt de 15 000 pi² en un temps record. Le revêtement résiste aux chariots élévateurs et aux produits chimiques. Très satisfait.",
    rating: 5,
    location: "Longueuil",
  },
  {
    name: "Isabelle Roy",
    role: "Designer d'intérieur",
    text: "Je recommande Renovo Crete à tous mes clients. Leurs comptoirs en résine sont spectaculaires — chaque pièce est unique et le rendu dépasse toujours nos attentes.",
    rating: 5,
    location: "Brossard",
  },
];

export const galleryProjects = [
  { src: heroImg, alt: "Sol métallique salon", label: "Sol métallique premium", category: "Sols", desc: "Finition métallique argent et bleu dans un salon contemporain" },
  { src: countertopImg, alt: "Comptoir époxy cuisine", label: "Comptoir océan bleu", category: "Comptoirs", desc: "Comptoir marbré bleu océan et blanc — cuisine résidentielle" },
  { src: tableImg, alt: "Table rivière en noyer", label: "Table rivière noyer", category: "Tables", desc: "Table en noyer massif avec rivière de résine bleue translucide" },
  { src: industrialImg, alt: "Sol industriel entrepôt", label: "Sol entrepôt logistique", category: "Industriel", desc: "Revêtement haute résistance avec marquage de sécurité" },
  { src: outdoorImg, alt: "Terrasse époxy", label: "Terrasse piscine", category: "Extérieur", desc: "Revêtement antidérapant résistant aux UV — abords de piscine" },
  { src: commercialImg, alt: "Sol showroom commercial", label: "Showroom mode", category: "Sols", desc: "Sol métallique haut de gamme pour showroom commercial" },
  { src: garageImg, alt: "Garage résidentiel époxy", label: "Garage résidentiel", category: "Sols", desc: "Sol époxy bleu haute résistance — garage 2 places" },
  { src: countertopImg, alt: "Comptoir salle de bain", label: "Comptoir salle de bain", category: "Comptoirs", desc: "Comptoir en résine pour vanité de salle de bain" },
  { src: tableImg, alt: "Table basse artistique", label: "Table basse design", category: "Tables", desc: "Table basse en érable avec inclusion de résine turquoise" },
  { src: outdoorImg, alt: "Allée extérieure", label: "Allée résidentielle", category: "Extérieur", desc: "Allée piétonne en granulat-résine pour entrée résidentielle" },
  { src: industrialImg, alt: "Atelier mécanique", label: "Atelier mécanique", category: "Industriel", desc: "Sol chimio-résistant pour atelier mécanique automobile" },
  { src: commercialImg, alt: "Boutique premium", label: "Boutique haut de gamme", category: "Sols", desc: "Sol métallique effet miroir pour boutique de luxe" },
];

export const projectTypes = [
  {
    category: "Résidentiel",
    items: [
      { title: "Garage", desc: "Sol époxy décoratif résistant aux taches d'huile, aux produits chimiques et à l'abrasion. Finitions flocons, métallique ou solide.", image: garageImg },
      { title: "Sous-sol", desc: "Transformez votre sous-sol en espace de vie avec un revêtement sans joints, hygiénique et résistant à l'humidité.", image: heroImg },
      { title: "Cuisine & salon", desc: "Sols en résine décorative qui allient esthétique contemporaine et facilité d'entretien au quotidien.", image: heroImg },
      { title: "Comptoir de cuisine", desc: "Comptoirs personnalisés en résine époxy — finitions marbrées, métalliques ou artistiques uniques.", image: countertopImg },
      { title: "Table sur mesure", desc: "Tables rivière en bois massif et résine époxy — pièces uniques et personnalisées.", image: tableImg },
    ],
  },
  {
    category: "Commercial",
    items: [
      { title: "Showroom & boutique", desc: "Sols métalliques effet miroir qui impressionnent vos clients dès l'entrée.", image: commercialImg },
      { title: "Restaurant & café", desc: "Revêtements antidérapants et hygiéniques conçus pour le trafic intense et le nettoyage quotidien.", image: commercialImg },
      { title: "Bureau & hall", desc: "Sols élégants et durables pour espaces professionnels, halls d'entrée et aires de réception.", image: heroImg },
    ],
  },
  {
    category: "Industriel",
    items: [
      { title: "Entrepôt & logistique", desc: "Revêtements ultra-résistants aux charges lourdes, chariots élévateurs et trafic intensif.", image: industrialImg },
      { title: "Atelier & usine", desc: "Sols chimio-résistants aux huiles, solvants et produits agressifs, avec marquage de sécurité intégré.", image: industrialImg },
      { title: "Laboratoire & salle blanche", desc: "Surfaces sans joints, faciles à décontaminer et conformes aux normes sanitaires strictes.", image: industrialImg },
    ],
  },
  {
    category: "Extérieurs",
    items: [
      { title: "Terrasse & patio", desc: "Revêtements antidérapants résistants aux UV, au gel et aux intempéries pour terrasses résidentielles.", image: outdoorImg },
      { title: "Abords de piscine", desc: "Finitions texturées antidérapantes, résistantes au chlore et aux variations de température.", image: outdoorImg },
      { title: "Allée & entrée", desc: "Revêtements décoratifs pour allées piétonnes et entrées résidentielles ou commerciales.", image: outdoorImg },
    ],
  },
];

export const faqItems = [
  { q: "Combien de temps dure un revêtement époxy ?", a: "Nos revêtements époxy durent en moyenne 10 à 20 ans selon l'utilisation et l'entretien. Les formules industrielles peuvent dépasser 25 ans de durée de vie." },
  { q: "Est-ce que l'époxy résiste aux produits chimiques ?", a: "Oui. Nos formules résistent aux huiles, graisses, solvants et produits ménagers. Pour les environnements industriels, nous utilisons des systèmes chimio-résistants spécialisés." },
  { q: "Quel est le délai de réalisation typique ?", a: "La plupart des projets résidentiels sont complétés en 2 à 5 jours. Les projets commerciaux et industriels varient selon la superficie, mais nous optimisons toujours les délais." },
  { q: "Peut-on appliquer de l'époxy sur un sol existant ?", a: "Dans la majorité des cas, oui. Nous préparons la surface existante (meulage, nettoyage, réparation des fissures) pour assurer une adhérence optimale." },
  { q: "Les sols époxy sont-ils glissants ?", a: "Non. Nous ajoutons des additifs antidérapants à nos finitions, particulièrement pour les zones humides, les cuisines commerciales et les abords de piscine." },
  { q: "Offrez-vous une garantie ?", a: "Oui, chaque projet est couvert par notre garantie de satisfaction. La durée varie selon le type de revêtement et l'application." },
];

export const processSteps = [
  { step: "01", title: "Consultation", desc: "Évaluation gratuite de votre projet, prise de mesures et recommandations personnalisées." },
  { step: "02", title: "Proposition", desc: "Devis détaillé avec choix de finitions, couleurs et planification des travaux." },
  { step: "03", title: "Préparation", desc: "Meulage au diamant, réparation des imperfections et apprêt de la surface." },
  { step: "04", title: "Application", desc: "Application professionnelle du revêtement avec finition de votre choix." },
  { step: "05", title: "Livraison", desc: "Inspection finale, recommandations d'entretien et remise des lieux impeccables." },
];
