const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <span className="font-heading text-2xl font-800 tracking-tight">
              <span className="text-primary-light">RENOVO</span> CRETE
            </span>
            <p className="text-primary-foreground/60 mt-4 text-sm leading-relaxed max-w-xs">
              Premium epoxy resin coatings and decorative surface solutions. Transforming floors, countertops, and surfaces since day one.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-600 mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li>Epoxy Floor Coatings</li>
              <li>Countertop Resurfacing</li>
              <li>Decorative Resin Tables</li>
              <li>Industrial Coatings</li>
              <li>Outdoor Surface Coatings</li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-600 mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li>(555) 123-4567</li>
              <li>info@renovocrete.com</li>
              <li>Mon–Fri: 8AM – 6PM</li>
              <li>Sat: 9AM – 2PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-sm text-primary-foreground/40">
          © {new Date().getFullYear()} Renovo Crete. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
