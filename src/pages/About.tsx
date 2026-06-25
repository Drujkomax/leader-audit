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
      title: "О компании Leader Audit — аудитор с 2013 года",
      description: "ООО «LEADER AUDIT» — лицензированный аудитор в Ташкенте. 13 лет, 220+ проверок, сертификаты CAP, CIPA, DipIFR. Лицензия Минфина РУз.",
      keywords: "о компании Leader Audit, аудиторская компания Ташкент, лицензированный аудитор, CAP CIPA DipIFR, страхование ответственности",
    },
    uz: {
      title: "Leader Audit haqida — 2013 yildan auditor",
      description: "«LEADER AUDIT» — Toshkentdagi litsenziyalangan auditor. 13 yil, 220+ tekshiruv, CAP, CIPA, DipIFR sertifikatlari. Moliya vazirligi litsenziyasi.",
      keywords: "Leader Audit haqida, Toshkent auditorlik kompaniyasi, litsenziyalangan auditor",
    },
    en: {
      title: "About Leader Audit — auditor since 2013",
      description: "Leader Audit LLC is a licensed auditor in Tashkent. 13 years, 220+ engagements, CAP, CIPA, DipIFR certifications, Ministry of Finance license.",
      keywords: "about Leader Audit, Tashkent audit firm, licensed auditor, CAP CIPA DipIFR",
    },
  } as const;

  const langPrefix = language === "ru" ? "" : `/${language}`;
  const canonical = `https://leaderaudit.uz${langPrefix}/about`;
  const meta = seo[language];

  // JSON-LD (AboutPage + Breadcrumb) is emitted by the static prerender as one @graph.

  const heroCopy = {
    ru: { title: "О компании Leader Audit", subtitle: "Лицензированный аудитор Узбекистана с 2013 года" },
    uz: { title: "Leader Audit kompaniyasi haqida", subtitle: "2013 yildan beri litsenziyalangan O'zbekiston auditori" },
    en: { title: "About Leader Audit", subtitle: "Licensed auditor of Uzbekistan since 2013" },
  } as const;
  const hero = heroCopy[language];

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
          <section className="bg-primary-dark pt-28 pb-16 sm:pt-32 sm:pb-20">
            <div className="container-wide max-w-5xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-4">{hero.title}</h1>
              <p className="text-primary-foreground/80 text-lg">{hero.subtitle}</p>
            </div>
          </section>
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
