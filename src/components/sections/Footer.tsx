import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Instagram, Send } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark border-t border-primary-foreground/10">
      <div className="container-wide py-12 lg:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo & About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <img src={logo} alt="Leader Audit" className="h-12 w-auto mb-4" />
            <p className="text-primary-foreground/70 max-w-md mb-6">
              Leader Audit — лицензированная аудиторская компания. Мы защищаем ваш 
              бизнес от финансовых рисков и обеспечиваем полное соответствие 
              требованиям законодательства.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center text-primary-foreground hover:bg-cta hover:text-cta-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center text-primary-foreground hover:bg-cta hover:text-cta-foreground transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-5 h-5" />
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
            <h4 className="text-primary-foreground font-semibold mb-4">Контакты</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="tel:+998901234567" 
                  className="flex items-start gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>+998 90 123 45 67</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@leaderaudit.uz" 
                  className="flex items-start gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>info@leaderaudit.uz</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-primary-foreground/70">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
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
            <h4 className="text-primary-foreground font-semibold mb-4">Услуги</h4>
            <ul className="space-y-2">
              {[
                "Обязательный аудит",
                "Инициативный аудит",
                "Налоговый консалтинг",
                "Сопровождение проверок",
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-primary-foreground/50 text-sm">
            <p>© {currentYear} Leader Audit. Все права защищены.</p>
            <p>Лицензия на осуществление аудиторской деятельности выдана Министерством финансов Республики Узбекистан</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
