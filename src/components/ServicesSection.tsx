import { motion } from "framer-motion";
import { Home, Building2, Factory, TreePine } from "lucide-react";
import countertopImg from "@/assets/epoxy-countertop.jpg";
import industrialImg from "@/assets/epoxy-industrial.jpg";
import outdoorImg from "@/assets/epoxy-outdoor.jpg";
import tableImg from "@/assets/epoxy-table.jpg";

const services = [
  {
    icon: Home,
    title: "Residential",
    description: "Garage floors, basements, kitchens, living spaces — beautiful epoxy finishes that elevate your home.",
    image: countertopImg,
  },
  {
    icon: Building2,
    title: "Commercial",
    description: "Showrooms, restaurants, retail spaces — durable, eye-catching surfaces that impress clients.",
    image: tableImg,
  },
  {
    icon: Factory,
    title: "Industrial",
    description: "Warehouses, workshops, factories — chemical-resistant, heavy-duty coatings built to last.",
    image: industrialImg,
  },
  {
    icon: TreePine,
    title: "Outdoor",
    description: "Patios, pool decks, driveways — weather-resistant coatings for long-lasting curb appeal.",
    image: outdoorImg,
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">What We Do</span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-700 mt-3 tracking-tight">
            Surfaces That <span className="text-gradient-brand">Perform & Impress</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            From residential garages to industrial facilities, we deliver premium epoxy and resin coatings tailored to every environment.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-xl overflow-hidden bg-background shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  width={800}
                  height={600}
                />
              </div>
              <div className="p-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-brand text-primary-foreground mb-4">
                  <service.icon className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-xl font-700 mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
