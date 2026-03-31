import { motion } from "framer-motion";

interface PageHeaderProps {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;
}

const PageHeader = ({ badge, title, highlight, description }: PageHeaderProps) => {
  return (
    <section className="pt-28 pb-16 bg-secondary">
      <div className="container mx-auto px-4 text-center">
        {badge && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-sm font-semibold uppercase tracking-widest text-primary mb-3"
          >
            {badge}
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-heading text-3xl sm:text-4xl lg:text-5xl font-800 tracking-tight"
        >
          {title}{" "}
          {highlight && <span className="text-gradient-brand">{highlight}</span>}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default PageHeader;
