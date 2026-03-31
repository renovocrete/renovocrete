import { motion } from "framer-motion";
import { ShieldCheck, Clock, Palette, Award, Sparkles, Wrench } from "lucide-react";

const features = [
  { icon: ShieldCheck, title: "10+ Year Durability", desc: "Industrial-grade formulas that resist chemicals, abrasion and heavy traffic." },
  { icon: Palette, title: "Unlimited Designs", desc: "Metallic, flake, marble, solid — custom colors and patterns to match any vision." },
  { icon: Clock, title: "Fast Turnaround", desc: "Most projects completed in 2–5 days with minimal disruption to your space." },
  { icon: Award, title: "Certified Experts", desc: "Factory-trained installers with years of hands-on experience." },
  { icon: Sparkles, title: "Seamless Finish", desc: "No joints, no grout — a smooth, hygienic surface that's easy to maintain." },
  { icon: Wrench, title: "Full Warranty", desc: "Every project backed by our comprehensive workmanship warranty." },
];

const WhyUsSection = () => {
  return (
    <section id="why-us" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">Why Renovo Crete</span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-700 mt-3 tracking-tight">
            Built to <span className="text-gradient-brand">Last & Impress</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex gap-4 p-6 rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-600 mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
