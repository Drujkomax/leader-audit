import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import AboutSection from "@/components/sections/AboutSection";
import ExpertiseSection from "@/components/sections/ExpertiseSection";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingContact from "@/components/FloatingContact";
import LeadFormSection from "@/components/sections/LeadFormSection";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/language-context";

const About = () => {
  const { language } = useLanguage();

  const seo = {
    ru: {
      title: "О компании Leader Audit | Лицензированный аудитор Узбекистана с 2013 года",
      description: "АО ООО «LEADER AUDIT» — лицензированная аудиторская компания в Ташкенте с 13-летним опытом. Сертификаты CAP, CIPA, DipIFR. Лицензия Минфина РУз. 220+ проверок, 200+ млрд сумов возврата НДС.",
      keywords: "о компании Leader Audit, аудиторская компания Ташкент, лицензированный аудитор, CAP CIPA DipIFR, страхование ответственности",
    },
    uz: {
      title: "Leader Audit kompaniyasi haqida | 2013 yildan litsenziyalangan auditor",
      description: "АО ООО «LEADER AUDIT» — Toshkentdagi 13 yillik tajribaga ega litsenziyalangan auditorlik kompaniyasi. CAP, CIPA, DipIFR sertifikatlari. Moliya vazirligi litsenziyasi.",
      keywords: "Leader Audit haqida, Toshkent auditorlik kompaniyasi, litsenziyalangan auditor",
    },
    en: {
      title: "About Leader Audit | Licensed Auditor of Uzbekistan since 2013",
      description: "Leader Audit LLC is a licensed audit firm in Tashkent with 13 years of experience. CAP, CIPA, DipIFR certifications. Ministry of Finance license. 220+ engagements.",
      keywords: "about Leader Audit, Tashkent audit firm, licensed auditor, CAP CIPA DipIFR",
    },
  } as const;

  const langPrefix = language === "ru" ? "" : `/${language}`;
  const canonical = `https://leaderaudit.uz${langPrefix}/about`;
  const meta = seo[language];

  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: meta.title,
    description: meta.description,
    url: canonical,
    mainEntity: {
      "@id": "https://leaderaudit.uz/#organization",
    },
  };

  return (
    <>
      <SEO
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        canonical={canonical}
        schemaJsonLd={aboutPageSchema}
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <AboutSection />
          <ExpertiseSection />
          <LeadFormSection />
        </main>
        <Footer />
        <ScrollToTop />
        <FloatingContact />
      </div>
    </>
  );
};

export default About;
