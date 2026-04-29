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

const Index = () => {
  const { language } = useLanguage();

  const seo = {
    ru: {
      title: "Leader Audit — Аудиторская компания в Узбекистане | Аудит, налоговый консалтинг, возврат НДС в Ташкенте",
      description: "Лицензированная аудиторская компания в Ташкенте. Обязательный и инициативный аудит по МСА и НСБУ, налоговый консалтинг, возврат НДС, бухгалтерский аутсорсинг. 13 лет опыта, 220+ проверок. Лицензия Минфина РУз.",
      keywords: "аудит Ташкент, аудиторская компания Узбекистан, обязательный аудит, инициативный аудит, налоговый консалтинг, возврат НДС, МСА, МСФО, НСБУ, бухгалтерский аутсорсинг",
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
