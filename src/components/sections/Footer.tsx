import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Instagram, Send } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { useLanguage } from "@/contexts/language-context";

const Footer = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();
  const langPrefix = language === "ru" ? "" : `/${language}`;

  const serviceLinks = [
    { slug: "obligatory-audit", label: language === "ru" ? "Обязательный аудит" : language === "uz" ? "Majburiy audit" : "Statutory Audit" },
    { slug: "initiative-audit", label: language === "ru" ? "Инициативный аудит" : language === "uz" ? "Tashabbuskor audit" : "Initiative Audit" },
    { slug: "tax-consulting", label: language === "ru" ? "Налоговый консалтинг" : language === "uz" ? "Soliq konsalting" : "Tax Consulting" },
    { slug: "vat-refund", label: language === "ru" ? "Возврат НДС" : language === "uz" ? "QQS qaytarish" : "VAT Refund" },
    { slug: "accounting", label: language === "ru" ? "Бухгалтерский аутсорсинг" : language === "uz" ? "Buxgalteriya autsorsing" : "Accounting" },
  ];

  const companyLinks = [
    { href: `${langPrefix}/about`, label: language === "ru" ? "О компании" : language === "uz" ? "Kompaniya haqida" : "About" },
    { href: `${langPrefix}/cases`, label: language === "ru" ? "Кейсы" : language === "uz" ? "Keyslar" : "Cases" },
    { href: `${langPrefix}/blog`, label: language === "ru" ? "Блог" : language === "uz" ? "Blog" : "Blog" },
    { href: `${langPrefix}/contact`, label: language === "ru" ? "Контакты" : language === "uz" ? "Kontaktlar" : "Contact" },
  ];

  return (
    <footer className="bg-primary-dark border-t border-primary-foreground/10">
      <div className="container-wide py-10 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Logo & About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="sm:col-span-2 lg:col-span-4"
          >
            <img
              src={logo}
              alt="Leader Audit"
              width="180"
              height="48"
              loading="lazy"
              decoding="async"
              className="h-10 sm:h-12 w-auto mb-3 sm:mb-4"
            />
            <p className="text-primary-foreground/70 text-sm sm:text-base max-w-md mb-4 sm:mb-6">
              {t.footer.description}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/leader_audit_uz/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center text-primary-foreground hover:bg-cta hover:text-cta-foreground transition-colors"
                aria-label={t.footer.instagram}
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://t.me/LeaderAudit_uz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center text-primary-foreground hover:bg-cta hover:text-cta-foreground transition-colors"
                aria-label={t.footer.telegram}
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </motion.div>

          {/* Services Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            <h4 className="text-primary-foreground font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{t.footer.services}</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {serviceLinks.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`${langPrefix}/services/${s.slug}`}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm sm:text-base"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-2"
          >
            <h4 className="text-primary-foreground font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
              {language === "ru" ? "Компания" : language === "uz" ? "Kompaniya" : "Company"}
            </h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm sm:text-base"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <h4 className="text-primary-foreground font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{t.footer.contacts}</h4>
            <ul className="space-y-2.5 sm:space-y-3">
              <li>
                <a
                  href="tel:+998974100447"
                  className="flex items-start gap-2.5 sm:gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm sm:text-base"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" />
                  <span>+998 97 410 04 47</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@leaderaudit.uz"
                  className="flex items-start gap-2.5 sm:gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm sm:text-base"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" />
                  <span>info@leaderaudit.uz</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 sm:gap-3 text-primary-foreground/70 text-sm sm:text-base">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" />
                <span>{t.footer.address}</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:justify-between md:items-center text-primary-foreground/50 text-xs sm:text-sm text-center md:text-left">
            <p>© {currentYear} Leader Audit. {t.footer.rights}</p>
            <p className="max-w-md">{t.footer.license}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
