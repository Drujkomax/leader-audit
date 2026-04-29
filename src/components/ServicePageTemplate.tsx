import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Phone, Shield, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingContact from "@/components/FloatingContact";
import LeadFormSection from "@/components/sections/LeadFormSection";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/language-context";
import { servicesContent } from "@/data/services-content";

type ServicePageTemplateProps = {
  slug: keyof (typeof servicesContent)["ru"];
};

const SITE_URL = "https://leaderaudit.uz";

const ServicePageTemplate = ({ slug }: ServicePageTemplateProps) => {
  const { language } = useLanguage();
  const content = servicesContent[language][slug];

  const langPrefix = language === "ru" ? "" : `/${language}`;
  const canonical = `${SITE_URL}${langPrefix}/services/${slug}`;

  // FAQPage Schema for this specific service
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: content.title,
    serviceType: content.schemaServiceType,
    provider: {
      "@id": "https://leaderaudit.uz/#organization",
    },
    areaServed: {
      "@type": "Country",
      name: "Uzbekistan",
    },
    description: content.metaDescription,
    url: canonical,
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: language === "ru" ? "Главная" : language === "uz" ? "Bosh sahifa" : "Home",
        item: `${SITE_URL}${langPrefix}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: language === "ru" ? "Услуги" : language === "uz" ? "Xizmatlar" : "Services",
        item: `${SITE_URL}${langPrefix}/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: content.title,
        item: canonical,
      },
    ],
  };

  return (
    <>
      <SEO
        title={content.metaTitle}
        description={content.metaDescription}
        keywords={content.keywords}
        canonical={canonical}
        type="service"
        schemaJsonLd={[serviceSchema, faqSchema, breadcrumbSchema]}
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero */}
          <section className="bg-primary-dark pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24">
            <div className="container-wide">
              <nav aria-label="Breadcrumb" className="mb-6 text-sm text-primary-foreground/60">
                <ol className="flex flex-wrap items-center gap-2">
                  <li>
                    <Link to={`${langPrefix}/`} className="hover:text-primary-foreground transition-colors">
                      {language === "ru" ? "Главная" : language === "uz" ? "Bosh sahifa" : "Home"}
                    </Link>
                  </li>
                  <li className="text-primary-foreground/40">/</li>
                  <li className="text-primary-foreground">{content.title}</li>
                </ol>
              </nav>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 sm:mb-6"
              >
                {content.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-base sm:text-lg md:text-xl text-primary-foreground/80 max-w-3xl"
              >
                {content.heroSubtitle}
              </motion.p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#lead-form"
                  className="btn-cta px-6 py-3 rounded-lg font-semibold text-cta-foreground inline-flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  {content.ctaButton}
                </a>
              </div>
            </div>
          </section>

          {/* Intro */}
          <section className="py-12 sm:py-16 md:py-20">
            <div className="container-wide max-w-4xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6">
                {content.introHeading}
              </h2>
              <div className="prose prose-lg max-w-none">
                {content.introParagraphs.map((paragraph, idx) => (
                  <p key={idx} className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </section>

          {/* Who needs */}
          <section className="py-12 sm:py-16 md:py-20 bg-secondary/30">
            <div className="container-wide max-w-5xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8 sm:mb-10">
                {content.whoNeedsHeading}
              </h2>
              <ul className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {content.whoNeedsItems.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-start gap-3 bg-card border border-border rounded-xl p-4"
                  >
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm sm:text-base">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </section>

          {/* Benefits */}
          <section className="py-12 sm:py-16 md:py-20">
            <div className="container-wide">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8 sm:mb-10 text-center">
                {content.benefitsHeading}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {content.benefits.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-card border border-border rounded-xl p-5 sm:p-6 hover:shadow-lg transition-all"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Process */}
          <section className="py-12 sm:py-16 md:py-20 bg-secondary/30">
            <div className="container-wide max-w-4xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8 sm:mb-12 text-center">
                {content.processHeading}
              </h2>
              <ol className="space-y-4 sm:space-y-6">
                {content.process.map((step) => (
                  <motion.li
                    key={step.step}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex gap-4 sm:gap-6 bg-card border border-border rounded-xl p-5 sm:p-6"
                  >
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{step.description}</p>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
          </section>

          {/* Why us */}
          <section className="py-12 sm:py-16 md:py-20">
            <div className="container-wide max-w-5xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8 sm:mb-10 text-center">
                {content.whyUsHeading}
              </h2>
              <ul className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {content.whyUsItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Pricing */}
          <section className="py-12 sm:py-16 md:py-20 bg-secondary/30">
            <div className="container-wide max-w-3xl text-center">
              <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6">
                {content.pricingHeading}
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">{content.pricingNote}</p>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-12 sm:py-16 md:py-20">
            <div className="container-wide max-w-4xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8 sm:mb-12 text-center">
                {content.faqHeading}
              </h2>
              <div className="space-y-4">
                {content.faqs.map((faq, idx) => (
                  <details
                    key={idx}
                    className="group bg-card border border-border rounded-xl overflow-hidden"
                    open={idx === 0}
                  >
                    <summary className="flex items-center justify-between p-5 sm:p-6 cursor-pointer hover:bg-muted/30 transition-colors list-none">
                      <h3 className="text-base sm:text-lg font-semibold text-foreground pr-4">{faq.question}</h3>
                      <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0 group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section id="lead-form" className="py-12 sm:py-16 md:py-20 bg-primary-dark">
            <div className="container-wide max-w-3xl text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                {content.ctaTitle}
              </h2>
              <p className="text-primary-foreground/80 text-base sm:text-lg mb-8">{content.ctaDescription}</p>
              <a
                href="#contact"
                className="btn-cta px-8 py-4 rounded-lg font-semibold text-cta-foreground inline-flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                {content.ctaButton}
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

export default ServicePageTemplate;
