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
    name: "Marc Beaumont",
    role: "Propriétaire résidentiel",
    roleEn: "Homeowner",
    text: "Notre terrasse de piscine est méconnaissable. Le revêtement antidérapant est magnifique et résistant — sécurité et esthétique au rendez-vous. Service impeccable.",
    textEn: "Our pool deck is unrecognizable. The non-slip coating is beautiful and resilient — safety and aesthetics delivered. Impeccable service.",
    rating: 5,
    location: "Saint-Martin",
  },
  {
    name: "Sophie Laurent",
    role: "Directrice de restaurant",
    roleEn: "Restaurant Manager",
    text: "Le sol de notre restaurant résiste à tout : trafic intense, éclaboussures, nettoyages quotidiens. Nos clients le remarquent immédiatement. Un investissement rentable.",
    textEn: "Our restaurant floor withstands everything: heavy traffic, splashes, daily cleaning. Customers notice immediately. A worthwhile investment.",
    rating: 5,
    location: "Marigot",
  },
  {
    name: "Thomas Richardson",
    role: "Gérant d'hôtel",
    roleEn: "Hotel Manager",
    text: "RENOVO CRETE a transformé le hall et les abords de piscine de notre hôtel. Le rendu est luxueux et le revêtement résiste parfaitement au climat tropical.",
    textEn: "RENOVO CRETE transformed our hotel lobby and pool surroundings. The finish is luxurious and perfectly withstands the tropical climate.",
    rating: 5,
    location: "Simpson Bay",
  },
  {
    name: "Isabelle Morel",
    role: "Architecte d'intérieur",
    roleEn: "Interior Designer",
    text: "Je recommande RENOVO CRETE à tous mes clients. Leurs comptoirs en résine sont spectaculaires — chaque pièce est unique et le rendu dépasse toujours nos attentes.",
    textEn: "I recommend RENOVO CRETE to all my clients. Their resin countertops are spectacular — each piece is unique and results always exceed expectations.",
    rating: 5,
    location: "Saint-Barth",
  },
];

export const galleryProjects = [
  { src: heroImg, alt: "Sol métallique salon", label: "Sol métallique premium", labelEn: "Premium metallic floor", category: "Sols", desc: "Finition métallique argent et bleu dans un salon contemporain", descEn: "Silver and blue metallic finish in a contemporary living room" },
  { src: countertopImg, alt: "Comptoir époxy cuisine", label: "Comptoir océan bleu", labelEn: "Blue ocean countertop", category: "Comptoirs", desc: "Comptoir marbré bleu océan et blanc — cuisine résidentielle", descEn: "Blue ocean and white marbled countertop — residential kitchen" },
  { src: tableImg, alt: "Table rivière en noyer", label: "Table rivière noyer", labelEn: "Walnut river table", category: "Tables", desc: "Table en noyer massif avec rivière de résine bleue translucide", descEn: "Solid walnut table with translucent blue resin river" },
  { src: industrialImg, alt: "Sol industriel entrepôt", label: "Sol entrepôt logistique", labelEn: "Warehouse floor", category: "Industriel", desc: "Revêtement haute résistance avec marquage de sécurité", descEn: "High-resistance coating with safety markings" },
  { src: outdoorImg, alt: "Terrasse époxy", label: "Terrasse piscine", labelEn: "Pool deck", category: "Extérieur", desc: "Revêtement antidérapant résistant aux UV — abords de piscine", descEn: "UV-resistant non-slip coating — pool surroundings" },
  { src: commercialImg, alt: "Sol showroom commercial", label: "Showroom mode", labelEn: "Fashion showroom", category: "Sols", desc: "Sol métallique haut de gamme pour showroom commercial", descEn: "High-end metallic floor for commercial showroom" },
  { src: garageImg, alt: "Garage résidentiel époxy", label: "Garage résidentiel", labelEn: "Residential garage", category: "Sols", desc: "Sol époxy bleu haute résistance — garage 2 places", descEn: "High-resistance blue epoxy floor — 2-car garage" },
  { src: countertopImg, alt: "Comptoir salle de bain", label: "Comptoir salle de bain", labelEn: "Bathroom countertop", category: "Comptoirs", desc: "Comptoir en résine pour vanité de salle de bain", descEn: "Resin countertop for bathroom vanity" },
  { src: tableImg, alt: "Table basse artistique", label: "Table basse design", labelEn: "Design coffee table", category: "Tables", desc: "Table basse en érable avec inclusion de résine turquoise", descEn: "Maple coffee table with turquoise resin inclusion" },
  { src: outdoorImg, alt: "Allée extérieure", label: "Allée résidentielle", labelEn: "Residential walkway", category: "Extérieur", desc: "Allée piétonne en granulat-résine pour entrée résidentielle", descEn: "Resin-aggregate walkway for residential entrance" },
  { src: industrialImg, alt: "Atelier mécanique", label: "Atelier mécanique", labelEn: "Mechanic workshop", category: "Industriel", desc: "Sol chimio-résistant pour atelier mécanique automobile", descEn: "Chemical-resistant floor for automotive workshop" },
  { src: commercialImg, alt: "Boutique premium", label: "Boutique haut de gamme", labelEn: "Premium boutique", category: "Sols", desc: "Sol métallique effet miroir pour boutique de luxe", descEn: "Mirror-effect metallic floor for luxury boutique" },
];

export const projectTypes = [
  {
    category: "Résidentiel",
    categoryEn: "Residential",
    items: [
      { title: "Garage", titleEn: "Garage Floors", desc: "Sol époxy décoratif résistant aux taches d'huile, aux produits chimiques et à l'abrasion. Finitions flocons, métallique ou solide.", descEn: "Decorative epoxy floor resistant to oil stains, chemicals and abrasion. Flake, metallic or solid finishes.", image: garageImg },
      { title: "Intérieurs résidentiels", titleEn: "Residential Interiors", desc: "Transformez vos espaces de vie avec un revêtement sans joints, hygiénique et résistant à l'humidité. Salon, cuisine, chambre.", descEn: "Transform your living spaces with a seamless, hygienic, moisture-resistant coating. Living room, kitchen, bedroom.", image: heroImg },
      { title: "Comptoir de cuisine", titleEn: "Kitchen Countertops", desc: "Comptoirs personnalisés en résine époxy — finitions marbrées, métalliques ou artistiques uniques.", descEn: "Custom epoxy resin countertops — marbled, metallic or unique artistic finishes.", image: countertopImg },
      { title: "Table sur mesure", titleEn: "Custom Tables", desc: "Tables rivière en bois massif et résine époxy — pièces uniques et personnalisées.", descEn: "River tables in solid wood and epoxy resin — unique, custom pieces.", image: tableImg },
      { title: "Allées & entrées", titleEn: "Driveways & Entrances", desc: "Revêtements décoratifs pour allées piétonnes et entrées résidentielles, résistants aux UV.", descEn: "Decorative coatings for walkways and residential entrances, UV-resistant.", image: outdoorImg },
      { title: "Terrasses & patios", titleEn: "Patios & Sidewalks", desc: "Revêtements antidérapants résistants aux UV, au gel et aux intempéries pour terrasses résidentielles.", descEn: "Non-slip coatings resistant to UV, frost and weather for residential terraces.", image: outdoorImg },
      { title: "Plages de piscine", titleEn: "Pool Decks", desc: "Finitions texturées antidérapantes, résistantes au chlore et aux variations de température.", descEn: "Textured non-slip finishes, resistant to chlorine and temperature changes.", image: outdoorImg },
    ],
  },
  {
    category: "Commercial",
    categoryEn: "Commercial",
    items: [
      { title: "Showroom & boutique", titleEn: "Retail & Showrooms", desc: "Sols métalliques effet miroir qui impressionnent vos clients dès l'entrée.", descEn: "Mirror-effect metallic floors that impress customers from the entrance.", image: commercialImg },
      { title: "Restaurant & bar", titleEn: "Restaurants & Bars", desc: "Revêtements antidérapants et hygiéniques conçus pour le trafic intense et le nettoyage quotidien.", descEn: "Non-slip, hygienic coatings designed for heavy traffic and daily cleaning.", image: commercialImg },
      { title: "Hôtels & hospitality", titleEn: "Hotels & Hospitality", desc: "Sols élégants et durables pour halls, lobbys, spas et espaces communs hôteliers.", descEn: "Elegant, durable floors for lobbies, spas and hotel common areas.", image: heroImg },
      { title: "Cuisines commerciales", titleEn: "Commercial Kitchens", desc: "Revêtements conformes aux normes sanitaires, antidérapants et faciles à nettoyer.", descEn: "Coatings meeting health standards, non-slip and easy to clean.", image: commercialImg },
      { title: "Salons & instituts", titleEn: "Salons & Parlors", desc: "Sols esthétiques et résistants aux produits chimiques pour salons de beauté et spas.", descEn: "Aesthetic, chemical-resistant floors for beauty salons and spas.", image: commercialImg },
      { title: "Commerces de détail", titleEn: "Grocery & Convenience Stores", desc: "Surfaces durables et faciles d'entretien pour commerces à fort trafic.", descEn: "Durable, easy-maintenance surfaces for high-traffic stores.", image: commercialImg },
    ],
  },
  {
    category: "Industriel",
    categoryEn: "Industrial",
    items: [
      { title: "Entrepôts & logistique", titleEn: "Warehouses & Logistics", desc: "Revêtements ultra-résistants aux charges lourdes, chariots élévateurs et trafic intensif.", descEn: "Ultra-resistant coatings for heavy loads, forklifts and intensive traffic.", image: industrialImg },
      { title: "Ateliers & usines", titleEn: "Manufacturing Plants", desc: "Sols chimio-résistants aux huiles, solvants et produits agressifs, avec marquage de sécurité.", descEn: "Chemical-resistant floors for oils, solvents and aggressive products, with safety markings.", image: industrialImg },
      { title: "Automobile & garages", titleEn: "Automotive Service Areas", desc: "Sols résistants aux huiles, graisses et produits chimiques automobiles.", descEn: "Floors resistant to automotive oils, greases and chemicals.", image: industrialImg },
      { title: "Agroalimentaire", titleEn: "Food & Beverage", desc: "Surfaces conformes HACCP, résistantes aux acides, à la chaleur et aux cycles de nettoyage.", descEn: "HACCP-compliant surfaces, resistant to acids, heat and cleaning cycles.", image: industrialImg },
      { title: "Électronique", titleEn: "Electronics Manufacturing", desc: "Revêtements ESD antistatiques pour zones de production électronique sensible.", descEn: "ESD anti-static coatings for sensitive electronics production areas.", image: industrialImg },
    ],
  },
  {
    category: "Secteurs spécialisés",
    categoryEn: "Specialized Sectors",
    items: [
      { title: "Santé & laboratoires", titleEn: "Healthcare & Laboratories", desc: "Surfaces sans joints, faciles à décontaminer et conformes aux normes sanitaires strictes.", descEn: "Seamless surfaces, easy to decontaminate, compliant with strict sanitary standards.", image: industrialImg },
      { title: "Éducation", titleEn: "Education", desc: "Sols résistants pour classes, cafétérias, couloirs et gymnases.", descEn: "Resistant floors for classrooms, cafeterias, hallways and gyms.", image: commercialImg },
      { title: "Gymnases & fitness", titleEn: "Gymnasiums & Fitness Centers", desc: "Revêtements amortissants, antidérapants et résistants aux charges dynamiques.", descEn: "Shock-absorbing, non-slip coatings resistant to dynamic loads.", image: commercialImg },
      { title: "Casernes & services d'urgence", titleEn: "Fire, Rescue & EMS", desc: "Sols résistants aux produits chimiques et aux charges lourdes des véhicules d'urgence.", descEn: "Floors resistant to chemicals and heavy emergency vehicle loads.", image: industrialImg },
      { title: "Aviation & hangars", titleEn: "Aircraft Hangars & Aerospace", desc: "Revêtements résistants aux carburants, fluides hydrauliques et charges roulantes.", descEn: "Coatings resistant to fuels, hydraulic fluids and rolling loads.", image: industrialImg },
      { title: "Brasseries & distilleries", titleEn: "Breweries, Wineries & Distilleries", desc: "Sols résistants aux acides, à la chaleur et aux nettoyages intensifs.", descEn: "Floors resistant to acids, heat and intensive cleaning.", image: industrialImg },
      { title: "Cannabis", titleEn: "Cannabis Facilities", desc: "Revêtements conformes aux normes de culture, résistants à l'humidité et aux agents de nettoyage.", descEn: "Coatings compliant with growing standards, resistant to moisture and cleaning agents.", image: industrialImg },
      { title: "Collectivités & gouvernement", titleEn: "Municipal & Government", desc: "Sols durables et économiques pour bâtiments publics et infrastructures municipales.", descEn: "Durable, cost-effective floors for public buildings and municipal infrastructure.", image: commercialImg },
      { title: "Divertissement & parcs", titleEn: "Theme Parks & Entertainment", desc: "Revêtements décoratifs et résistants pour espaces de divertissement et attractions.", descEn: "Decorative, resistant coatings for entertainment spaces and attractions.", image: commercialImg },
      { title: "Bien-être animal", titleEn: "Animal Wellness", desc: "Surfaces hygiéniques, antidérapantes et faciles à nettoyer pour cliniques et chenils.", descEn: "Hygienic, non-slip, easy-to-clean surfaces for clinics and kennels.", image: industrialImg },
      { title: "Stades & espaces sportifs", titleEn: "Stadiums & Concourses", desc: "Revêtements haute performance pour concours, vestiaires et espaces sportifs.", descEn: "High-performance coatings for concourses, locker rooms and sports facilities.", image: commercialImg },
      { title: "Parkings commerciaux", titleEn: "Commercial Parking Garages", desc: "Revêtements résistants au trafic automobile, aux sels et aux huiles.", descEn: "Coatings resistant to vehicle traffic, salts and oils.", image: industrialImg },
      { title: "Concessionnaires", titleEn: "Dealership Showrooms", desc: "Sols brillants et résistants pour showrooms automobiles et espaces de vente.", descEn: "Bright, resistant floors for automotive showrooms and sales areas.", image: commercialImg },
    ],
  },
  {
    category: "Extérieurs",
    categoryEn: "Exterior Surfaces",
    items: [
      { title: "Terrasses & piscines commerciales", titleEn: "Commercial Pool Decks & Waterparks", desc: "Revêtements antidérapants et résistants au chlore pour piscines commerciales et parcs aquatiques.", descEn: "Non-slip, chlorine-resistant coatings for commercial pools and waterparks.", image: outdoorImg },
      { title: "Surfaces extérieures commerciales", titleEn: "Exterior Commercial Surfaces", desc: "Revêtements résistants aux UV et intempéries pour espaces commerciaux extérieurs.", descEn: "UV and weather-resistant coatings for outdoor commercial spaces.", image: outdoorImg },
      { title: "Restauration du béton", titleEn: "Concrete Surface Restoration", desc: "Réparation et restauration de surfaces en béton dégradé avec revêtement protecteur.", descEn: "Repair and restoration of degraded concrete surfaces with protective coating.", image: outdoorImg },
    ],
  },
];

export const faqItems = [
  { q: "Combien de temps dure un revêtement époxy ?", qEn: "How long does an epoxy coating last?", a: "Nos revêtements époxy durent en moyenne 10 à 20 ans selon l'utilisation et l'entretien. Les formules industrielles peuvent dépasser 25 ans de durée de vie.", aEn: "Our epoxy coatings last an average of 10 to 20 years depending on use and maintenance. Industrial formulas can exceed 25 years of lifespan." },
  { q: "Est-ce que l'époxy résiste aux produits chimiques ?", qEn: "Is epoxy resistant to chemicals?", a: "Oui. Nos formules résistent aux huiles, graisses, solvants et produits ménagers. Pour les environnements industriels, nous utilisons des systèmes chimio-résistants spécialisés.", aEn: "Yes. Our formulas resist oils, greases, solvents and household products. For industrial environments, we use specialized chemical-resistant systems." },
  { q: "Quel est le délai de réalisation typique ?", qEn: "What is the typical completion time?", a: "La plupart des projets résidentiels sont complétés en 2 à 5 jours. Les projets commerciaux et industriels varient selon la superficie, mais nous optimisons toujours les délais.", aEn: "Most residential projects are completed in 2 to 5 days. Commercial and industrial projects vary by area, but we always optimize timelines." },
  { q: "Peut-on appliquer de l'époxy sur un sol existant ?", qEn: "Can epoxy be applied over an existing floor?", a: "Dans la majorité des cas, oui. Nous préparons la surface existante (meulage, nettoyage, réparation des fissures) pour assurer une adhérence optimale.", aEn: "In most cases, yes. We prepare the existing surface (grinding, cleaning, crack repair) to ensure optimal adhesion." },
  { q: "Les sols époxy sont-ils glissants ?", qEn: "Are epoxy floors slippery?", a: "Non. Nous ajoutons des additifs antidérapants à nos finitions, particulièrement pour les zones humides, les cuisines commerciales et les abords de piscine.", aEn: "No. We add non-slip additives to our finishes, particularly for wet areas, commercial kitchens and pool surroundings." },
  { q: "Offrez-vous une garantie ?", qEn: "Do you offer a warranty?", a: "Oui, chaque projet est couvert par notre garantie de satisfaction. La durée varie selon le type de revêtement et l'application.", aEn: "Yes, every project is covered by our satisfaction guarantee. Duration varies by coating type and application." },
];

export const processSteps = [
  { step: "01", title: "Consultation", titleEn: "Consultation", desc: "Évaluation gratuite de votre projet, prise de mesures et recommandations personnalisées.", descEn: "Free project evaluation, measurements and personalized recommendations." },
  { step: "02", title: "Proposition", titleEn: "Proposal", desc: "Devis détaillé avec choix de finitions, couleurs et planification des travaux.", descEn: "Detailed quote with finish, color choices and work planning." },
  { step: "03", title: "Préparation", titleEn: "Preparation", desc: "Meulage au diamant, réparation des imperfections et apprêt de la surface.", descEn: "Diamond grinding, imperfection repair and surface priming." },
  { step: "04", title: "Application", titleEn: "Application", desc: "Application professionnelle du revêtement avec finition de votre choix.", descEn: "Professional coating application with your chosen finish." },
  { step: "05", title: "Livraison", titleEn: "Delivery", desc: "Inspection finale, recommandations d'entretien et remise des lieux impeccables.", descEn: "Final inspection, maintenance recommendations and impeccable handover." },
];

export const teamMembers = [
  { name: "Jean Jude PAUL", role: "Directeur", roleEn: "Director", desc: "Maître d'œuvre applicateur certifié & Responsable Formation", descEn: "Certified applicator & Training Manager" },
  { name: "Guy PAUL", role: "Comptabilité & IT", roleEn: "Accounting & IT", desc: "Responsable comptabilité & Co-responsable Système opération / IT", descEn: "Accounting Manager & Co-Head of Operations / IT" },
  { name: "Yonathan FAURE", role: "Commercial", roleEn: "Commercial", desc: "Responsable Commercial et Responsable gestion de Projets", descEn: "Commercial Manager & Project Management Lead" },
  { name: "Olsen NELSON", role: "Marketing & Communication", roleEn: "Marketing & Communications", desc: "Responsable Marketing & Communication ; Responsable Formation et Responsable système d'exploitation / IT", descEn: "Marketing & Communications Manager; Training Manager & IT Operations Lead" },
];

export const servedZones = {
  principal: {
    title: "Zone principale",
    titleEn: "Primary Zone",
    zones: ["Saint-Martin", "Sint Maarten", "Saint-Barth"],
  },
  antilles: {
    title: "Antilles françaises",
    titleEn: "French Antilles",
    zones: ["Guadeloupe", "Martinique"],
  },
  caribbean: {
    title: "Caraïbe anglophone",
    titleEn: "English-speaking Caribbean",
    zones: [
      "Anguilla", "Saint Kitts & Nevis", "Antigua & Barbuda", "Dominica",
      "Saint Lucia", "Barbados", "Saint Vincent & The Grenadines", "Grenada",
      "Trinidad & Tobago", "Jamaica", "Bahamas", "Cayman Islands",
      "British Virgin Islands", "U.S. Virgin Islands", "Montserrat", "Turks & Caicos",
    ],
  },
};
