import { motion } from "framer-motion";
import { ClipboardCheck, Search, Calculator, Users, ArrowRight } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: ClipboardCheck,
      title: "Обязательный аудит",
      description: "Подтверждение прозрачности для ГНК и банков. Полное соответствие требованиям законодательства.",
      features: ["Аудиторское заключение", "Отчёт для банков", "Соответствие ГНК"],
    },
    {
      icon: Search,
      title: "Инициативный аудит",
      description: "Проверка «для себя» перед продажей или расширением. Выявление скрытых рисков до их реализации.",
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
      description: "Мы берём диалог с инспекторами на себя. Защита интересов компании при любых проверках.",
      features: ["Представительство", "Защита интересов", "Экспертная поддержка"],
    },
  ];

  return (
    <section id="services" className="section-padding bg-background">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold uppercase tracking-wider text-sm">
            Решения для бизнеса
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            Продуктовая матрица
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Комплексные решения для защиты вашего бизнеса от финансовых рисков
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group card-gradient border border-border rounded-2xl p-6 lg:p-8 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {service.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <a 
                    href="#contact" 
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                  >
                    Подробнее
                    <ArrowRight className="w-4 h-4" />
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
