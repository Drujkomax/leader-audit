import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Instagram, Send } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark border-t border-primary-foreground/10">
      <div className="container-wide py-10 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo & About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="sm:col-span-2"
          >
            <img src={logo} alt="Leader Audit" className="h-10 sm:h-12 w-auto mb-3 sm:mb-4" />
            <p className="text-primary-foreground/70 text-sm sm:text-base max-w-md mb-4 sm:mb-6">
              Leader Audit — лицензированная аудиторская компания. Мы защищаем ваш 
              бизнес от финансовых рисков и обеспечиваем полное соответствие 
              требованиям законодательства.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/leader_audit_uz/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center text-primary-foreground hover:bg-cta hover:text-cta-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://t.me/LeaderAudit_uz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center text-primary-foreground hover:bg-cta hover:text-cta-foreground transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-primary-foreground font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Контакты</h4>
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
                <span>г. Ташкент, ул. Мустакиллик, 12</span>
              </li>
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-primary-foreground font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Услуги</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {[
                "Обязательный аудит",
                "Инициативный аудит",
                "Налоговый консалтинг",
                "Сопровождение проверок",
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm sm:text-base"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:justify-between md:items-center text-primary-foreground/50 text-xs sm:text-sm text-center md:text-left">
            <p>© {currentYear} Leader Audit. Все права защищены.</p>
            <p className="max-w-md">Лицензия на осуществление аудиторской деятельности выдана Министерством финансов Республики Узбекистан</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
