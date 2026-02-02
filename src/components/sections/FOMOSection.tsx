import { motion } from "framer-motion";
import { AlertTriangle, TrendingDown, Ban, DollarSign, Clock } from "lucide-react";

const FOMOSection = () => {
  const problems = [
    {
      icon: TrendingDown,
      title: "Налоговый разрыв",
      description: "90% проверок заканчиваются доначислениями из-за ошибок прошлых периодов.",
      stat: "90%",
    },
    {
      icon: Ban,
      title: "Заморозка счетов",
      description: "Неверная трактовка новых законов может остановить ваш бизнес за 1 день.",
      stat: "1 день",
    },
    {
      icon: DollarSign,
      title: "Скрытые убытки",
      description: "Неоптимальная налоговая нагрузка съедает бюджет на развитие.",
      stat: "до 30%",
    },
  ];

  return (
    <section className="section-padding bg-primary-dark relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
          }}
        />
      </div>

      <div className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-cta/20 px-4 py-2 rounded-full mb-6">
            <AlertTriangle className="w-5 h-5 text-cta" />
            <span className="text-cta font-semibold">Внимание: критические риски</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            О чём вам не скажет бухгалтерия?
          </h2>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
            Большинство финансовых рисков невидимы, пока не станет слишком поздно.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group relative bg-primary/50 backdrop-blur-sm border border-primary-foreground/10 rounded-xl p-6 lg:p-8 hover:bg-primary/70 transition-all duration-300"
            >
              <div className="absolute top-4 right-4">
                <span className="text-4xl lg:text-5xl font-bold text-cta/30 group-hover:text-cta/50 transition-colors">
                  {problem.stat}
                </span>
              </div>
              
              <div className="w-14 h-14 bg-cta/20 rounded-xl flex items-center justify-center mb-5">
                <problem.icon className="w-7 h-7 text-cta" />
              </div>
              
              <h3 className="text-xl font-bold text-primary-foreground mb-3">
                {problem.title}
              </h3>
              
              <p className="text-primary-foreground/70 leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 bg-cta/10 border border-cta/30 rounded-full px-6 py-3">
            <Clock className="w-5 h-5 text-cta animate-pulse" />
            <span className="text-primary-foreground font-medium">
              Пока вы читаете этот текст, риски вашего бизнеса могут расти
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FOMOSection;
