import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import LanguageDropdown from "@/components/language/LanguageDropdown";
import { useLanguage } from "@/contexts/language-context";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, language } = useLanguage();
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "/uz" || location.pathname === "/en" ||
    location.pathname === "/uz/" || location.pathname === "/en/";
  const langPrefix = language === "ru" ? "" : `/${language}`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: isHome ? "#services" : `${langPrefix}/#services`, label: t.header.services },
    { href: `${langPrefix}/cases`, label: language === "ru" ? "Кейсы" : language === "uz" ? "Keyslar" : "Cases" },
    { href: `${langPrefix}/about`, label: t.header.about },
    { href: `${langPrefix}/blog`, label: language === "ru" ? "Блог" : language === "uz" ? "Blog" : "Blog" },
    { href: `${langPrefix}/contact`, label: t.header.contact },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHome
          ? "bg-card py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container-wide flex items-center justify-between">
        <a href={`${langPrefix}/`} className="flex items-center gap-2" aria-label="Leader Audit — главная">
          <img
            src={logo}
            alt="Leader Audit — лицензированная аудиторская компания в Узбекистане"
            width="180"
            height="48"
            fetchPriority="high"
            decoding="async"
            className="h-8 sm:h-10 md:h-12 w-auto"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-medium text-sm xl:text-base transition-colors duration-200 hover:text-cta ${
                isScrolled || !isHome ? "text-foreground" : "text-primary-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
          <LanguageDropdown isScrolled={isScrolled || !isHome} />
          <a
            href="#contact"
            className="btn-cta px-4 xl:px-6 py-2 xl:py-2.5 rounded-lg text-cta-foreground flex items-center gap-2 text-sm xl:text-base transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            <Phone className="w-4 h-4" />
            <span>{t.header.consultation}</span>
          </a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <LanguageDropdown isScrolled={isScrolled || !isHome} />
          <a
            href="#contact"
            className="btn-cta px-3 sm:px-4 py-2 rounded-lg text-cta-foreground flex items-center gap-1.5 text-xs sm:text-sm font-semibold transition-transform duration-200 active:scale-95"
          >
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{t.header.consultation}</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
              isScrolled || !isHome ? "text-foreground" : "text-primary-foreground"
            }`}
            aria-label={t.header.toggleMenu}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-t border-border"
          >
            <nav className="container-wide py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-medium text-foreground py-2.5 px-3 hover:bg-muted rounded-lg transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
