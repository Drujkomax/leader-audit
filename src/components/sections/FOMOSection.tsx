import { motion, useInView } from "framer-motion";
import { AlertTriangle, TrendingDown, Ban, DollarSign, Clock } from "lucide-react";
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

const AnimatedStat = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useCountUp(value, 2000, isInView);

  return (
    <span ref={ref} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-cta group-hover:text-red-500 transition-colors">
      {count}{suffix}
    </span>
  );
};

const FOMOSection = () => {
  const problems = [
    {
      icon: TrendingDown,
      title: "Налоговый разрыв",
      description: "90% проверок заканчиваются доначислениями из-за ошибок прошлых периодов.",
      statValue: 90,
      statSuffix: "%",
    },
    {
      icon: Ban,
      title: "Заморозка счетов",
      description: "Неверная трактовка новых законов может остановить ваш бизнес за 1 день.",
      statValue: 1,
      statSuffix: " день",
    },
    {
      icon: DollarSign,
      title: "Скрытые убытки",
      description: "Неоптимальная налоговая нагрузка съедает бюджет на развитие.",
      statValue: 30,
      statSuffix: "%",
      statPrefix: "до ",
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-primary-dark relative overflow-hidden">
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
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-cta/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6">
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-cta" />
            <span className="text-cta font-semibold text-xs sm:text-sm">Внимание: критические риски</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-3 sm:mb-4">
            О чём вам не скажет бухгалтерия?
          </h2>
          <p className="text-primary-foreground/70 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            Большинство финансовых рисков невидимы, пока не станет слишком поздно.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group relative bg-primary/50 backdrop-blur-sm border border-primary-foreground/10 rounded-xl p-4 sm:p-5 md:p-6 lg:p-8 hover:bg-primary/70 transition-all duration-300"
            >
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                {'statPrefix' in problem && (
                  <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-cta group-hover:text-red-500 transition-colors">
                    {problem.statPrefix}
                  </span>
                )}
                <AnimatedStat value={problem.statValue} suffix={problem.statSuffix} />
              </div>
              
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-cta/20 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 md:mb-5">
                <problem.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-cta" />
              </div>
              
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-primary-foreground mb-2 sm:mb-3 pr-16 sm:pr-20">
                {problem.title}
              </h3>
              
              <p className="text-primary-foreground/70 text-sm sm:text-base leading-relaxed">
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
          className="text-center px-4"
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-cta/10 border border-cta/30 rounded-full px-4 sm:px-6 py-2.5 sm:py-3">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-cta animate-pulse flex-shrink-0" />
            <span className="text-primary-foreground font-medium text-xs sm:text-sm md:text-base">
              Пока вы читаете этот текст, риски вашего бизнеса могут расти
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FOMOSection;
