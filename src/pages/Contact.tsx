import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import LeadFormSection from "@/components/sections/LeadFormSection";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingContact from "@/components/FloatingContact";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/language-context";
import { Phone, Mail, MapPin, Clock, Instagram, Send, ArrowRight } from "lucide-react";
import { branches, PHONE } from "@/data/branches";

const Contact = () => {
  const { language } = useLanguage();

  const content = {
    ru: {
      title: "Контакты Leader Audit — Ташкент",
      description: "Свяжитесь с Leader Audit: +998 97 410 04 47, info@leaderaudit.uz, г. Ташкент, ул. Мустакиллик, 12. Часы работы: Пн–Пт 9:00–18:00.",
      keywords: "контакты Leader Audit, аудиторская организация Ташкент, консультации по аудиту организаций в Узбекистане, сроки проведения аудита, аналитика рисков, кадровый аудит, МСФО",
      pageTitle: "Контакты",
      pageSubtitle: "Свяжитесь с нами удобным для вас способом",
      hoursLabel: "Часы работы",
      hours: "Пн–Пт: 9:00–18:00",
      addressLabel: "Адрес офиса",
    },
    uz: {
      title: "Leader Audit kontaktlari — Toshkent",
      description: "Leader Audit bilan bog'laning: +998 97 410 04 47, info@leaderaudit.uz, Toshkent, Mustaqillik ko'chasi, 12. Ish vaqti: Du–Ju 9:00–18:00.",
      keywords: "Leader Audit kontaktlari, Toshkent auditorlik tashkiloti, audit konsultatsiyalari, xatarlar tahlili, kadrlar auditi, MHXS",
      pageTitle: "Kontaktlar",
      pageSubtitle: "Biz bilan o'zingiz uchun qulay tarzda bog'laning",
      hoursLabel: "Ish vaqti",
      hours: "Du–Ju: 9:00–18:00",
      addressLabel: "Ofis manzili",
    },
    en: {
      title: "Contact Leader Audit — Tashkent",
      description: "Contact Leader Audit: +998 97 410 04 47, info@leaderaudit.uz, 12 Mustaqillik St, Tashkent. Hours: Mon–Fri 9:00–18:00.",
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

  // JSON-LD (ContactPage + Breadcrumb) is emitted by the static prerender as one @graph.

  return (
    <>
      <SEO
        title={c.title}
        description={c.description}
        keywords={c.keywords}
        canonical={canonical}
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

          {/* Quick contacts */}
          <section className="py-10 sm:py-14">
            <div className="container-wide max-w-5xl grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <a href="tel:+998974100447" className="bg-card border border-border rounded-xl p-5 sm:p-6 hover:shadow-lg transition-all">
                <Phone className="w-8 h-8 text-primary mb-3" />
                <h2 className="font-bold text-foreground mb-1">{language === "ru" ? "Телефон" : language === "uz" ? "Telefon" : "Phone"}</h2>
                <p className="text-muted-foreground text-sm">{PHONE}</p>
              </a>
              <a href="mailto:info@leaderaudit.uz" className="bg-card border border-border rounded-xl p-5 sm:p-6 hover:shadow-lg transition-all">
                <Mail className="w-8 h-8 text-primary mb-3" />
                <h2 className="font-bold text-foreground mb-1">Email</h2>
                <p className="text-muted-foreground text-sm">info@leaderaudit.uz</p>
              </a>
              <a href="https://www.instagram.com/leader_audit_uz/" target="_blank" rel="noopener noreferrer" className="bg-card border border-border rounded-xl p-5 sm:p-6 hover:shadow-lg transition-all">
                <Instagram className="w-8 h-8 text-primary mb-3" />
                <h2 className="font-bold text-foreground mb-1">Instagram</h2>
                <p className="text-muted-foreground text-sm">@leader_audit_uz</p>
              </a>
              <a href="https://t.me/LeaderAudit_uz" target="_blank" rel="noopener noreferrer" className="bg-card border border-border rounded-xl p-5 sm:p-6 hover:shadow-lg transition-all">
                <Send className="w-8 h-8 text-primary mb-3" />
                <h2 className="font-bold text-foreground mb-1">Telegram</h2>
                <p className="text-muted-foreground text-sm">@LeaderAudit_uz</p>
              </a>
            </div>
          </section>

          {/* Offices — 3 branches */}
          <section className="py-10 sm:py-14 bg-secondary/30">
            <div className="container-wide max-w-5xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-8">
                {language === "ru" ? "Наши офисы в Ташкенте" : language === "uz" ? "Toshkentdagi ofislarimiz" : "Our offices in Tashkent"}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {branches.map((b) => (
                  <div key={b.id} className="bg-card border border-border rounded-xl p-5 sm:p-6 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-6 h-6 text-primary flex-shrink-0" />
                      <h3 className="font-bold text-foreground">{b.label[language]}</h3>
                    </div>
                    <p className="text-foreground text-sm font-medium">{b.street[language]}</p>
                    <p className="text-muted-foreground text-sm mb-3">{b.district[language]}</p>
                    <p className="text-muted-foreground text-sm flex items-center gap-2">
                      <Phone className="w-4 h-4 flex-shrink-0" /> {PHONE}
                    </p>
                    <p className="text-muted-foreground text-sm mb-4 flex items-center gap-2">
                      <Clock className="w-4 h-4 flex-shrink-0" /> {c.hours}
                    </p>
                    <a href={b.mapUrl} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all">
                      {language === "ru" ? "Показать на карте" : language === "uz" ? "Xaritada koʻrsatish" : "View on map"}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
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
