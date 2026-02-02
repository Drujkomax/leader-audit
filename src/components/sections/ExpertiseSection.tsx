import { motion } from "framer-motion";
import { Award, Scale, Lock, Briefcase, CheckCircle2 } from "lucide-react";

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
    { value: "15+", label: "Лет на рынке" },
    { value: "500+", label: "Успешных проектов" },
    { value: "100%", label: "Клиентов довольны" },
    { value: "0", label: "Претензий ГНК" },
  ];

  return (
    <section id="about" className="section-padding bg-secondary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-semibold uppercase tracking-wider text-sm">
              Почему мы
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-6">
              Экспертность и надёжность
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Мы — не просто бухгалтеры. Мы — щит между вашим капиталом и внешними угрозами. 
              Каждый проект подкреплён международной экспертизой и полной ответственностью.
            </p>

            <div className="space-y-4">
              {facts.map((fact, index) => (
                <motion.div
                  key={fact.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 bg-card p-4 rounded-xl shadow-sm"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <fact.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{fact.title}</h3>
                    <p className="text-muted-foreground text-sm">{fact.description}</p>
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
            <div className="bg-primary rounded-2xl p-8 lg:p-10">
              <h3 className="text-2xl font-bold text-primary-foreground mb-8 text-center">
                Leader Audit в цифрах
              </h3>
              
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="text-center p-4 bg-primary-foreground/10 rounded-xl"
                  >
                    <div className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-2">
                      {stat.value}
                    </div>
                    <div className="text-primary-foreground/80 text-sm font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-primary-foreground/20">
                <div className="flex items-center justify-center gap-2 text-primary-foreground">
                  <CheckCircle2 className="w-5 h-5 text-cta" />
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
