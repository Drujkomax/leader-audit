import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import LeadFormSection from "@/components/sections/LeadFormSection";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingContact from "@/components/FloatingContact";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/language-context";
import { Phone, Mail, MapPin, Clock, Instagram, Send } from "lucide-react";

const Contact = () => {
  const { language } = useLanguage();

  const content = {
    ru: {
      title: "Контакты Leader Audit | Аудиторская компания в Ташкенте",
      description: "Свяжитесь с Leader Audit: телефон +998 97 410 04 47, email info@leaderaudit.uz, адрес г. Ташкент, ул. Мустакиллик, 12. Часы работы: Пн-Пт 9:00-18:00.",
      keywords: "контакты Leader Audit, телефон аудиторская компания Ташкент, адрес Leader Audit",
      pageTitle: "Контакты",
      pageSubtitle: "Свяжитесь с нами удобным для вас способом",
      hoursLabel: "Часы работы",
      hours: "Пн–Пт: 9:00–18:00",
      addressLabel: "Адрес офиса",
    },
    uz: {
      title: "Leader Audit kontaktlari | Toshkentdagi auditorlik kompaniyasi",
      description: "Leader Audit bilan bog'laning: telefon +998 97 410 04 47, email info@leaderaudit.uz, manzil Toshkent shahri, Mustaqillik ko'chasi, 12. Ish vaqti: Du-Ju 9:00-18:00.",
      keywords: "Leader Audit kontaktlari, Toshkent auditorlik kompaniyasi telefon",
      pageTitle: "Kontaktlar",
      pageSubtitle: "Biz bilan o'zingiz uchun qulay tarzda bog'laning",
      hoursLabel: "Ish vaqti",
      hours: "Du–Ju: 9:00–18:00",
      addressLabel: "Ofis manzili",
    },
    en: {
      title: "Contact Leader Audit | Audit firm in Tashkent",
      description: "Contact Leader Audit: phone +998 97 410 04 47, email info@leaderaudit.uz, address 12 Mustaqillik St, Tashkent. Hours: Mon-Fri 9:00-18:00.",
      keywords: "Leader Audit contacts, Tashkent audit firm phone",
      pageTitle: "Contact us",
      pageSubtitle: "Reach out in the way that works for you",
      hoursLabel: "Working hours",
      hours: "Mon–Fri: 9:00–18:00",
      addressLabel: "Office address",
    },
  } as const;

  const c = content[language];
  const langPrefix = language === "ru" ? "" : `/${language}`;
  const canonical = `https://leaderaudit.uz${langPrefix}/contact`;

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: c.title,
    description: c.description,
    url: canonical,
    mainEntity: { "@id": "https://leaderaudit.uz/#organization" },
  };

  return (
    <>
      <SEO
        title={c.title}
        description={c.description}
        keywords={c.keywords}
        canonical={canonical}
        schemaJsonLd={contactSchema}
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <section className="bg-primary-dark pt-28 pb-16 sm:pt-32 sm:pb-20">
            <div className="container-wide max-w-5xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-4">{c.pageTitle}</h1>
              <p className="text-primary-foreground/80 text-lg">{c.pageSubtitle}</p>
            </div>
          </section>

          <section className="py-12 sm:py-16">
            <div className="container-wide max-w-5xl grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <a href="tel:+998974100447" className="bg-card border border-border rounded-xl p-5 sm:p-6 hover:shadow-lg transition-all">
                <Phone className="w-8 h-8 text-primary mb-3" />
                <h2 className="font-bold text-foreground mb-1">Telefon</h2>
                <p className="text-muted-foreground text-sm">+998 97 410 04 47</p>
              </a>
              <a href="mailto:info@leaderaudit.uz" className="bg-card border border-border rounded-xl p-5 sm:p-6 hover:shadow-lg transition-all">
                <Mail className="w-8 h-8 text-primary mb-3" />
                <h2 className="font-bold text-foreground mb-1">Email</h2>
                <p className="text-muted-foreground text-sm">info@leaderaudit.uz</p>
              </a>
              <div className="bg-card border border-border rounded-xl p-5 sm:p-6">
                <MapPin className="w-8 h-8 text-primary mb-3" />
                <h2 className="font-bold text-foreground mb-1">{c.addressLabel}</h2>
                <p className="text-muted-foreground text-sm">
                  {language === "ru"
                    ? "г. Ташкент, ул. Мустакиллик, 12"
                    : language === "uz"
                    ? "Toshkent shahri, Mustaqillik ko'chasi, 12"
                    : "12 Mustaqillik St, Tashkent, Uzbekistan"}
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-5 sm:p-6">
                <Clock className="w-8 h-8 text-primary mb-3" />
                <h2 className="font-bold text-foreground mb-1">{c.hoursLabel}</h2>
                <p className="text-muted-foreground text-sm">{c.hours}</p>
              </div>
              <a
                href="https://www.instagram.com/leader_audit_uz/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-card border border-border rounded-xl p-5 sm:p-6 hover:shadow-lg transition-all"
              >
                <Instagram className="w-8 h-8 text-primary mb-3" />
                <h2 className="font-bold text-foreground mb-1">Instagram</h2>
                <p className="text-muted-foreground text-sm">@leader_audit_uz</p>
              </a>
              <a
                href="https://t.me/LeaderAudit_uz"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-card border border-border rounded-xl p-5 sm:p-6 hover:shadow-lg transition-all"
              >
                <Send className="w-8 h-8 text-primary mb-3" />
                <h2 className="font-bold text-foreground mb-1">Telegram</h2>
                <p className="text-muted-foreground text-sm">@LeaderAudit_uz</p>
              </a>
            </div>
          </section>

          <LeadFormSection />
        </main>
        <Footer />
        <ScrollToTop />
        <FloatingContact />
      </div>
    </>
  );
};

export default Contact;
