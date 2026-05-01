import { motion } from "framer-motion";
import { ClipboardCheck, Calculator, Users, FileText, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

const ServicesSection = () => {
  const { t } = useLanguage();

  const icons = [ClipboardCheck, FileText, Calculator, Users, ClipboardCheck, FileText];
  
  const services = t.services.cards.map((card, index) => ({
    icon: icons[index % icons.length],
    title: card.title,
    description: card.description,
    features: card.features,
  }));

  return (
    <section id="services" className="py-12 sm:py-16 md:py-24 lg:py-32 bg-background">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <span className="text-primary font-semibold uppercase tracking-wider text-xs sm:text-sm">
            {t.services.badge}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 sm:mt-3 mb-3 sm:mb-4">
            {t.services.title}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            {t.services.description}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group card-gradient border border-border rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-primary/10 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <service.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                </div>
                
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-1.5 sm:space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2.5 text-sm sm:text-base text-foreground/80"
                    >
                      <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a 
                  href="#contact" 
                  className="inline-flex items-center gap-1.5 sm:gap-2 text-primary font-semibold text-sm sm:text-base hover:gap-2 sm:hover:gap-3 transition-all mt-2"
                >
                  {t.services.learnMore}
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
