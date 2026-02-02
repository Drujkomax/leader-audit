import { motion } from "framer-motion";
import { Shield, FileCheck, Receipt, Building2 } from "lucide-react";

const AboutSection = () => {
  const documents = [
    {
      icon: Shield,
      title: "Страховой полис",
      description: "Профессиональная ответственность аудитора застрахована в соответствии с требованиями Закона Республики Узбекистан «Об аудиторской деятельности»",
      details: "Полис гарантирует возмещение убытков в случае профессиональной ошибки",
    },
    {
      icon: FileCheck,
      title: "Гувохнома (Лицензия)",
      description: "Лицензия на осуществление аудиторской деятельности, выданная Министерством финансов Республики Узбекистан",
      details: "Подтверждает право на проведение обязательного и инициативного аудита",
    },
    {
      icon: Receipt,
      title: "Регистрационный код НДС",
      description: "Компания зарегистрирована как плательщик налога на добавленную стоимость в Государственном налоговом комитете",
      details: "Все услуги предоставляются с выставлением счёт-фактуры",
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
            О компании
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 sm:mt-3 mb-3 sm:mb-4">
            О нас
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            Лицензированная аудиторская организация, осуществляющая деятельность 
            в соответствии с законодательством Республики Узбекистан
          </p>
        </motion.div>

        {/* Company Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 mb-8 sm:mb-12"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                Leader Audit
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Аудиторская организация с многолетним опытом работы на рынке Узбекистана. 
                Мы оказываем полный спектр аудиторских и консультационных услуг для предприятий 
                всех форм собственности в соответствии с Международными стандартами аудита (МСА) 
                и национальным законодательством.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Documents Section */}
        <div className="mb-6 sm:mb-8">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground text-center mb-6 sm:mb-8">
            Документы, подтверждающие деятельность
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
          Деятельность осуществляется на основании Закона Республики Узбекистан 
          «Об аудиторской деятельности» от 26 мая 2000 года № 78-II
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
