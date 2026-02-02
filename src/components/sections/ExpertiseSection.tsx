import { motion, useInView } from "framer-motion";
import { Award, Scale, Lock, Briefcase, CheckCircle2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";

// Counter animation hook
const useCountUp = (end: number, duration: number = 2000, startCounting: boolean = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;
    
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, startCounting]);

  return count;
};

const AnimatedNumber = ({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useCountUp(value, 2000, isInView);

  return (
    <div ref={ref} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-1 sm:mb-2">
      {prefix}{count}{suffix}
    </div>
  );
};

const ExpertiseSection = () => {
  const facts = [
    {
      icon: Award,
      title: "Международные стандарты",
      description: "Работа по стандартам МСА (Международные стандарты аудита)",
    },
    {
      icon: Scale,
      title: "Материальная ответственность",
      description: "Полная материальная ответственность за качество заключения",
    },
    {
      icon: Lock,
      title: "Конфиденциальность",
      description: "Строжайшая политика конфиденциальности на всех этапах",
    },
    {
      icon: Briefcase,
      title: "Сложные ниши",
      description: "Опыт в Medical, IT, Manufacturing и других отраслях",
    },
  ];

  const stats = [
    { value: 15, suffix: "+", label: "Лет на рынке" },
    { value: 500, suffix: "+", label: "Успешных проектов" },
    { value: 100, suffix: "%", label: "Клиентов довольны" },
    { value: 0, suffix: "", label: "Претензий ГНК" },
  ];

  return (
    <section id="about" className="py-12 sm:py-16 md:py-24 lg:py-32 bg-secondary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <span className="text-primary font-semibold uppercase tracking-wider text-xs sm:text-sm">
              Почему мы
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 sm:mt-3 mb-4 sm:mb-6">
              Экспертность и надёжность
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
              Профессиональная защита вашего капитала от внешних угроз. 
              Каждый проект подкреплён международной экспертизой и полной материальной ответственностью.
            </p>

            <div className="space-y-3 sm:space-y-4">
              {facts.map((fact, index) => (
                <motion.div
                  key={fact.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 sm:gap-4 bg-card p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-sm text-left"
                >
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <fact.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground text-sm sm:text-base mb-0.5 sm:mb-1">{fact.title}</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm">{fact.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-primary rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 lg:p-10">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary-foreground mb-5 sm:mb-6 md:mb-8 text-center">
                Leader Audit в цифрах
              </h3>
              
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="text-center p-3 sm:p-4 bg-primary-foreground/10 rounded-lg sm:rounded-xl"
                  >
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                    <div className="text-primary-foreground/80 text-xs sm:text-sm font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-5 sm:mt-6 md:mt-8 pt-4 sm:pt-5 md:pt-6 border-t border-primary-foreground/20">
                <div className="flex items-center justify-center gap-2 text-primary-foreground text-xs sm:text-sm md:text-base">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-cta flex-shrink-0" />
                  <span className="font-medium">Лицензированная аудиторская компания</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
