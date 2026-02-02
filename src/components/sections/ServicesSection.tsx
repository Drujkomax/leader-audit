import { motion } from "framer-motion";
import { ClipboardCheck, Search, Calculator, Users, ArrowRight } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: ClipboardCheck,
      title: "Обязательный аудит",
      description: "Подтверждение прозрачности для налоговых органов и банков. Полное соответствие требованиям законодательства.",
      features: ["Аудиторское заключение", "Отчёт для банков", "Соответствие требованиям"],
    },
    {
      icon: Search,
      title: "Инициативный аудит",
      description: "Профессиональная проверка перед продажей доли или бизнеса. Выявление скрытых рисков до их реализации.",
      features: ["Due Diligence", "Анализ рисков", "Рекомендации"],
    },
    {
      icon: Calculator,
      title: "Налоговый консалтинг",
      description: "Законные методы оптимизации и защиты активов. Снижение налоговой нагрузки в рамках закона.",
      features: ["Оптимизация", "Планирование", "Защита активов"],
    },
    {
      icon: Users,
      title: "Сопровождение проверок",
      description: "Отстаиваем и защищаем результаты нашей работы перед контролирующими органами.",
      features: ["Представительство", "Защита интересов", "Экспертная поддержка"],
    },
  ];

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
            Решения для бизнеса
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 sm:mt-3 mb-3 sm:mb-4">
            Продуктовая матрица
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            Комплексные решения для защиты вашего бизнеса от финансовых рисков
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
              <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 md:gap-5">
                <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-primary/10 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <service.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground mb-1.5 sm:mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                    {service.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-[10px] sm:text-xs font-medium bg-primary/10 text-primary px-2 sm:px-3 py-0.5 sm:py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <a 
                    href="#contact" 
                    className="inline-flex items-center gap-1.5 sm:gap-2 text-primary font-semibold text-sm sm:text-base hover:gap-2 sm:hover:gap-3 transition-all"
                  >
                    Подробнее
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
