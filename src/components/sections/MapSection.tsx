import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

const MapSection = () => {
  const address = "Узбекистан, г. Ташкент, ул. Мустакиллик, 12";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const yandexMapsUrl = `https://yandex.uz/maps/?text=${encodeURIComponent(address)}`;
  
  // Координаты для ул. Мустакиллик, Ташкент (примерные)
  const embedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.5!2d69.279737!3d41.311151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE4JzQwLjEiTiA2OcKwMTYnNDcuMSJF!5e0!3m2!1sru!2s!4v1700000000000!5m2!1sru!2s";

  return (
    <section id="location" className="bg-muted py-12 sm:py-16 lg:py-20">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-cta/10 text-cta rounded-full text-xs sm:text-sm font-medium mb-4">
            Наш офис
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Где нас <span className="text-cta">найти</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            Приглашаем вас посетить наш офис для личной консультации
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Contact Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1 bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm"
          >
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-6">
              Контактная информация
            </h3>
            
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-cta/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-cta" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm sm:text-base">Адрес</p>
                  <p className="text-muted-foreground text-sm">
                    г. Ташкент, ул. Мустакиллик, 12
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-cta/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-cta" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm sm:text-base">Телефон</p>
                  <a 
                    href="tel:+998901234567" 
                    className="text-muted-foreground text-sm hover:text-cta transition-colors"
                  >
                    +998 90 123 45 67
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-cta/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-cta" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm sm:text-base">Email</p>
                  <a 
                    href="mailto:info@leaderaudit.uz" 
                    className="text-muted-foreground text-sm hover:text-cta transition-colors"
                  >
                    info@leaderaudit.uz
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-cta/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-cta" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm sm:text-base">Режим работы</p>
                  <p className="text-muted-foreground text-sm">
                    Пн–Пт: 09:00 – 18:00
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Сб–Вс: Выходной
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border space-y-3">
              <Button 
                asChild
                className="w-full bg-cta hover:bg-cta-hover text-cta-foreground"
              >
                <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                  <Navigation className="w-4 h-4 mr-2" />
                  Открыть в Google Maps
                </a>
              </Button>
              <Button 
                asChild
                variant="outline"
                className="w-full"
              >
                <a href={yandexMapsUrl} target="_blank" rel="noopener noreferrer">
                  <Navigation className="w-4 h-4 mr-2" />
                  Открыть в Яндекс Картах
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-card border border-border rounded-2xl overflow-hidden shadow-sm h-[300px] sm:h-[400px] lg:h-auto lg:min-h-[450px]"
          >
            <iframe
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "100%" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Leader Audit офис на карте"
              className="w-full h-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
