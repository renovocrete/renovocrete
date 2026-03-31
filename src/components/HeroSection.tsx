import { motion } from "framer-motion";
import { ArrowRight, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-epoxy-floor.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Luxury metallic epoxy floor coating" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/20" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary-light/30 bg-primary-light/10 px-4 py-1.5 mb-6"
          >
            <Star className="w-4 h-4 text-primary-light" />
            <span className="text-sm font-medium text-primary-light">Premium Epoxy & Resin Coatings</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-800 leading-[1.1] tracking-tight text-primary-foreground mb-6"
          >
            Transform Any Surface Into a{" "}
            <span className="text-primary-light">Work of Art</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-primary-foreground/80 mb-8 max-w-xl leading-relaxed"
          >
            Specializing in decorative epoxy resin coatings for floors, countertops, tables and more.
            Durable, seamless and stunning finishes for residential, commercial & industrial projects.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button asChild size="lg" className="bg-gradient-brand text-lg px-8 py-6 hover:opacity-90 transition-opacity shadow-lg shadow-primary/25">
              <a href="#contact">
                Get Your Free Estimate
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <a href="#gallery">View Our Work</a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center gap-6 mt-10 pt-8 border-t border-primary-foreground/20"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary-light" />
              <span className="text-sm text-primary-foreground/70">Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-primary-light" />
              <span className="text-sm text-primary-foreground/70">5-Star Rated</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary-light" />
              <span className="text-sm text-primary-foreground/70">Warranty Included</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
