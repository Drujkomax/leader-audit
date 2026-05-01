import Header from "@/components/sections/Header";
import HeroSection from "@/components/sections/HeroSection";
import TrustBar from "@/components/sections/TrustBar";
import FOMOSection from "@/components/sections/FOMOSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import ExpertiseSection from "@/components/sections/ExpertiseSection";
import LeadFormSection from "@/components/sections/LeadFormSection";
import FAQSection from "@/components/sections/FAQSection";
import Footer from "@/components/sections/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingContact from "@/components/FloatingContact";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/language-context";
import { Link } from "react-router-dom";

const Index = () => {
  const { language } = useLanguage();

  const seo = {
    ru: {
      title: "Аудиторские услуги в Ташкенте — Leader Audit | Узбекистан",
      description: "Профессиональный аудит, бухгалтерский учёт и налоговый консалтинг в Узбекистане. Лицензия Минфина РУз. Бесплатная консультация — оставьте заявку.",
      keywords: "обязательный аудит, инициативный аудит, налоговый консалтинг, возврат НДС, бухгалтерский аутсорсинг, аудиторская компания в узбекистане, бухгалтерские услуги в ташкенте, бухгалтерские услуги и аудит в ташкенте, бизнес аудит в ташкенте, налоговое сопровождение, налоговый аудит в узбекистане",
    },
    uz: {
      title: "Leader Audit — Toshkentdagi auditorlik kompaniyasi | Audit, soliq konsalting, QQS qaytarish",
      description: "Toshkentdagi litsenziyalangan auditorlik kompaniyasi. Majburiy va tashabbuskor audit XAS va MHXS bo'yicha, soliq konsalting, QQS qaytarish, buxgalteriya autsorsing. 13 yil tajriba, 220+ tekshiruv.",
      keywords: "audit Toshkent, auditorlik kompaniyasi O'zbekiston, majburiy audit, soliq konsalting, QQS qaytarish, XAS, XHXS, MHXS",
    },
    en: {
      title: "Leader Audit — Audit & Tax Consulting Firm in Uzbekistan | Tashkent",
      description: "Licensed audit firm in Tashkent, Uzbekistan. Statutory & initiative audits under ISA and NAS, tax consulting, VAT refund, accounting outsourcing. 13 years experience, 220+ engagements. Licensed by the Ministry of Finance of Uzbekistan.",
      keywords: "audit Tashkent, audit firm Uzbekistan, statutory audit, tax consulting Uzbekistan, VAT refund, ISA, IFRS, NAS, accounting outsourcing",
    },
  } as const;

  const canonical = language === "ru" ? "https://leaderaudit.uz/" : `https://leaderaudit.uz/${language}/`;
  const meta = seo[language];
  const langPrefix = language === "ru" ? "" : `/${language}`;

  return (
    <>
      <SEO
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        canonical={canonical}
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <TrustBar />
          <FOMOSection />
          <ServicesSection />
          {language === "ru" && (
            <section className="py-10 sm:py-14 bg-secondary/20">
              <div className="container-wide max-w-5xl">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                  Бухгалтерские услуги и аудит в Ташкенте для бизнеса
                </h2>
                <p className="text-muted-foreground mb-6">
                  Предоставляем полный комплекс услуг для компаний в Узбекистане: обязательный аудит, инициативный аудит, налоговый консалтинг, налоговое сопровождение, возврат НДС и бухгалтерский аутсорсинг.
                </p>
                <ul className="grid sm:grid-cols-2 gap-3 text-foreground">
                  <li><Link className="hover:text-primary transition-colors" to={`${langPrefix}/services/obligatory-audit`}>Обязательный аудит</Link></li>
                  <li><Link className="hover:text-primary transition-colors" to={`${langPrefix}/services/initiative-audit`}>Инициативный аудит</Link></li>
                  <li><Link className="hover:text-primary transition-colors" to={`${langPrefix}/services/tax-consulting`}>Налоговый консалтинг и налоговое сопровождение</Link></li>
                  <li><Link className="hover:text-primary transition-colors" to={`${langPrefix}/services/vat-refund`}>Возврат НДС</Link></li>
                  <li><Link className="hover:text-primary transition-colors" to={`${langPrefix}/services/accounting`}>Бухгалтерский аутсорсинг</Link></li>
                  <li><span>Бизнес аудит в Ташкенте и по Узбекистану</span></li>
                </ul>
              </div>
            </section>
          )}
          <AboutSection />
          <ExpertiseSection />
          <FAQSection />
          <LeadFormSection />
        </main>
        <Footer />
        <ScrollToTop />
        <FloatingContact />
      </div>
    </>
  );
};

export default Index;
