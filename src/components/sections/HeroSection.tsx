import { motion } from "framer-motion";
import { Shield, ChevronDown, CheckCircle } from "lucide-react";
import shieldImage from "@/assets/shield.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-hero-pattern flex items-center overflow-hidden">
      {/* Geometric decorations - hidden on mobile */}
      <div className="hidden sm:block absolute top-20 left-10 w-20 md:w-32 h-20 md:h-32 bg-primary-foreground/5 geo-diamond animate-float" />
      <div className="hidden sm:block absolute bottom-40 right-20 w-16 md:w-24 h-16 md:h-24 bg-cta/10 geo-triangle animate-float" style={{ animationDelay: "2s" }} />
      <div className="hidden md:block absolute top-1/3 right-10 w-16 h-16 bg-primary-foreground/10 rounded-full animate-pulse-slow" />
      
      <div className="container-wide relative z-10 py-24 sm:py-28 md:py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-primary-foreground text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6"
            >
              <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cta" />
              <span className="text-xs sm:text-sm font-medium">Лицензия Министерства финансов РУз</span>
            </motion.div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 sm:mb-6">
              Leader Audit: Ваша финансовая безопасность
              <span className="block text-primary-foreground/80 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mt-2 sm:mt-3 font-semibold">
                в эпоху тотального налогового контроля
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-primary-foreground/80 mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
              Профессиональный аудит по международным стандартам. 
              Находим скрытые риски там, где их не видит ваш главбух.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10 justify-center lg:justify-start">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-cta px-5 sm:px-6 lg:px-8 py-3 sm:py-3.5 lg:py-4 rounded-lg text-sm sm:text-base lg:text-lg font-semibold text-cta-foreground text-center"
              >
                Получить экспресс-анализ рисков
              </motion.a>
              <motion.a
                href="#services"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 sm:px-6 lg:px-8 py-3 sm:py-3.5 lg:py-4 rounded-lg text-sm sm:text-base lg:text-lg font-semibold border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-colors text-center"
              >
                Наши услуги
              </motion.a>
            </div>

            <div className="flex flex-wrap gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm text-primary-foreground/70 justify-center lg:justify-start">
              {[
                "Стандарты МСА",
                "Материальная ответственность",
                "100% конфиденциальность"
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-center gap-1.5 sm:gap-2"
                >
                  <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cta flex-shrink-0" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Shield Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary-foreground/10 rounded-full blur-3xl scale-75" />
              <img 
                src={shieldImage} 
                alt="Leader Audit Shield" 
                className="relative w-64 xl:w-80 2xl:w-96 h-auto animate-float drop-shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - hidden on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="hidden sm:block absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-primary-foreground/60"
        >
          <span className="text-xs mb-2">Узнать больше</span>
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
