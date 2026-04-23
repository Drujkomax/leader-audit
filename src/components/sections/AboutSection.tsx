import { motion, useInView } from "framer-motion";
import { Shield, FileCheck, Receipt, Building2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/contexts/language-context";

const useCountUp = (end: number, duration: number = 2000, startCounting: boolean = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, startCounting]);

  return count;
};

const AnimatedStat = ({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useCountUp(value, 2000, isInView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-card border border-border rounded-xl sm:rounded-2xl p-5 sm:p-6"
    >
      <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-2">
        {count}{suffix}
      </div>
      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
        {label}
      </p>
    </motion.div>
  );
};

const AboutSection = () => {
  const { t } = useLanguage();

  const stats = [
    { value: 13, suffix: "", label: t.about.stats[0] },
    { value: 220, suffix: "", label: t.about.stats[1] },
    { value: 10, suffix: "", label: t.about.stats[2] },
    { value: 200, suffix: "+", label: t.about.stats[3] },
  ];

  const documents = [
    {
      icon: Shield,
      title: t.about.documents[0].title,
      description: t.about.documents[0].description,
      details: t.about.documents[0].details,
    },
    {
      icon: FileCheck,
      title: t.about.documents[1].title,
      description: t.about.documents[1].description,
      details: t.about.documents[1].details,
    },
    {
      icon: Receipt,
      title: t.about.documents[2].title,
      description: t.about.documents[2].description,
      details: t.about.documents[2].details,
    },
  ];

  return (
    <section id="about" className="py-12 sm:py-16 md:py-24 lg:py-32 bg-background">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <span className="text-primary font-semibold uppercase tracking-wider text-xs sm:text-sm">
            {t.about.badge}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 sm:mt-3 mb-3 sm:mb-4">
            {t.about.title}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            {t.about.description}
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-14">
          {stats.map((stat, index) => (
            <AnimatedStat key={index} value={stat.value} suffix={stat.suffix} label={stat.label} />
          ))}
        </div>

        {/* Company Info - two columns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-14"
        >
          <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 space-y-5">
            {t.about.paragraphsLeft.map((paragraph) => (
              <p key={paragraph} className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 space-y-5">
            {t.about.paragraphsRight.map((paragraph) => (
              <p key={paragraph} className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Documents Section */}
        <div className="mb-6 sm:mb-8">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground text-center mb-6 sm:mb-8">
            {t.about.documentsTitle}
          </h3>
          
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            {documents.map((doc, index) => (
              <motion.div
                key={doc.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-card border border-border rounded-xl sm:rounded-2xl p-5 sm:p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <doc.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                
                <h4 className="text-base sm:text-lg font-bold text-foreground mb-2">
                  {doc.title}
                </h4>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                  {doc.description}
                </p>
                
                <p className="text-xs text-muted-foreground/80 italic">
                  {doc.details}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Legal Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs sm:text-sm text-muted-foreground bg-secondary/50 rounded-lg p-4"
        >
          {t.about.legalNote}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
