import { motion } from "framer-motion";
import { Shield, FileCheck, Receipt, Building2 } from "lucide-react";

const AboutSection = () => {
  const stats = [
    { value: "13", label: "года в сфере аудита и бухгалтерского сопровождения" },
    { value: "220", label: "проведенных аудиторских проверок" },
    { value: "10", label: "высококвалифицированных сертифицированных аудиторов с огромным стажем" },
    { value: "200+", label: "Млрд сумов содействие в возврате НДС" },
  ];

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

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-14"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-xl sm:rounded-2xl p-5 sm:p-6"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Company Info - two columns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-14"
        >
          <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 space-y-5">
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              <strong className="text-foreground">АО ООО «LEADER AUDIT» —</strong> надежный партнер в области
              аудита и консалтинга, созданный на основании Закона Республики Узбекистан «Об аудиторской деятельности»
              № 3РУ-677 от 25 февраля 2021 года. Компания зарегистрирована в Министерстве юстиции Республики
              Узбекистан 2 июля 2012 года (регистрационный номер №398).
            </p>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              <strong className="text-foreground">Мы несем полную ответственность за качество</strong> предоставляемых
              услуг, что подтверждается страхованием профессиональной ответственности в страховой компании
              ООО «APEX INSURANCE».
            </p>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              <strong className="text-foreground">Основатели нашей компании —</strong> это опытные аудиторы
              с международными и национальными сертификатами и дипломами, включая CAP, CIPA, DipIFR (Diploma
              in International Financial Reporting) и сертификаты аудитора, выданные Министерством финансов
              Республики Узбекистан.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 space-y-5">
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Наша команда обладает многолетним опытом работы с финансово-хозяйственной деятельностью компаний
              различных отраслей и форм собственности.
            </p>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              — Партнерская сеть компании включает ведущих разработчиков программного обеспечения. Совместно с ними
              мы внедряем передовые решения в области управления предприятиями, мотивации персонала и оптимизации
              бизнес-процессов.
            </p>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              <strong className="text-foreground">Основное направление нашей деятельности –</strong> налоговый
              аудит правильности исчисления и уплаты налогов и обязательных платежей, налоговая экспертиза, оптимизация
              налогообложения, постановка и восстановление, помощь составления финансовой отчётности, консалтинговые
              услуги по бухгалтерскому учёту, менеджменту и другим вопросам финансово-хозяйственной деятельности.
            </p>
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
