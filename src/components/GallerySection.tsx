import { motion } from "framer-motion";
import heroImg from "@/assets/hero-epoxy-floor.jpg";
import countertopImg from "@/assets/epoxy-countertop.jpg";
import industrialImg from "@/assets/epoxy-industrial.jpg";
import outdoorImg from "@/assets/epoxy-outdoor.jpg";
import tableImg from "@/assets/epoxy-table.jpg";

const images = [
  { src: heroImg, alt: "Metallic epoxy floor in luxury living room", label: "Residential Floor" },
  { src: countertopImg, alt: "Ocean blue epoxy countertop", label: "Countertop" },
  { src: tableImg, alt: "Epoxy river table", label: "River Table" },
  { src: industrialImg, alt: "Industrial epoxy warehouse floor", label: "Industrial" },
  { src: outdoorImg, alt: "Outdoor patio epoxy coating", label: "Outdoor" },
];

const GallerySection = () => {
  return (
    <section id="gallery" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">Our Work</span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-700 mt-3 tracking-tight">
            Recent <span className="text-gradient-brand">Projects</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <motion.div
              key={img.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`group relative rounded-xl overflow-hidden ${i === 0 ? "col-span-2 row-span-2" : ""}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover aspect-square group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                width={800}
                height={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-primary-foreground font-heading font-600 text-lg">{img.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
