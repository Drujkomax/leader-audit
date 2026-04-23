import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 group"
          aria-label={t.scrollTop.ariaLabel}
        >
          {/* Glow ring */}
          <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping-slow" />
          <span className="absolute inset-[-4px] rounded-full bg-gradient-to-r from-primary via-primary-light to-primary opacity-50 blur-md animate-glow" />
          
          {/* Button */}
          <span className="relative w-11 h-11 sm:w-12 sm:h-12 bg-primary hover:bg-primary-light rounded-full shadow-lg flex items-center justify-center text-primary-foreground transition-all duration-300 group-hover:scale-110">
            <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-y-0.5" />
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
