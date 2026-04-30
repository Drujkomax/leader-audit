import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Target, Lightbulb, TrendingUp, Lock, Clock } from "lucide-react";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingContact from "@/components/FloatingContact";
import LeadFormSection from "@/components/sections/LeadFormSection";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/language-context";
import { casesContent } from "@/data/cases-content";

const SITE_URL = "https://leaderaudit.uz";

const Cases = () => {
  const { language } = useLanguage();
  const content = casesContent[language];
  const langPrefix = language === "ru" ? "" : `/${language}`;
  const canonical = `${SITE_URL}${langPrefix}/cases`;
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const tagsMap = new Map<string, string>();
  content.cases.forEach((c) => {
    if (!tagsMap.has(c.industryTag)) tagsMap.set(c.industryTag, c.industry);
  });
  const tags = Array.from(tagsMap.entries());
  const visibleCases =
    activeFilter === "all"
      ? content.cases
      : content.cases.filter((c) => c.industryTag === activeFilter);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: content.metaTitle,
      description: content.metaDescription,
      url: canonical,
      inLanguage: language === "ru" ? "ru-RU" : language === "uz" ? "uz-UZ" : "en-US",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      hasPart: content.cases.map((c) => ({
        "@type": "Article",
        headline: `${c.industry}: ${c.serviceType}`,
        about: c.industry,
        articleBody: `${c.challenge} ${c.outcomeNarrative}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}${langPrefix}/` },
        { "@type": "ListItem", position: 2, name: content.heroTitle, item: canonical },
      ],
    },
  ];

  return (
    <>
      <SEO
        title={content.metaTitle}
        description={content.metaDescription}
        keywords={content.keywords}
        canonical={canonical}
        schemaJsonLd={schema}
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero */}
          <section className="bg-primary-dark pt-28 pb-16 sm:pt-32 sm:pb-20">
            <div className="container-wide max-w-5xl">
              <span className="text-primary-foreground/70 font-semibold uppercase tracking-wider text-xs sm:text-sm">
                {content.heroBadge}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mt-3 mb-4">
                {content.heroTitle}
              </h1>
              <p className="text-primary-foreground/80 text-base sm:text-lg leading-relaxed max-w-3xl">
                {content.heroDescription}
              </p>
              <div className="mt-5 flex items-center gap-2 text-xs sm:text-sm text-primary-foreground/70">
                <Lock className="w-4 h-4" />
                <span>{content.labels.confidential}</span>
              </div>
            </div>
          </section>

          {/* Filter */}
          <section className="py-6 border-b border-border">
            <div className="container-wide">
              <div className="flex flex-wrap items-center gap-2 justify-center">
                <button
                  onClick={() => setActiveFilter("all")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === "all"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/70"
                  }`}
                >
                  {content.filterAll}
                </button>
                {tags.map(([tag, label]) => (
                  <button
                    key={tag}
                    onClick={() => setActiveFilter(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeFilter === tag
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/70"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Cases */}
          <section className="py-12 sm:py-16">
            <div className="container-wide max-w-5xl space-y-8 sm:space-y-12">
              {visibleCases.map((c, idx) => (
                <motion.article
                  key={c.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-card border border-border rounded-2xl p-6 sm:p-8 md:p-10"
                >
                  {/* Header */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                      {c.industry}
                    </span>
                    <span className="px-3 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full">
                      {c.serviceType}
                    </span>
                    <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" /> {c.duration}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {c.industry}: {c.serviceType}
                  </h2>

                  {/* Client profile */}
                  <div className="mb-5">
                    <div className="flex items-center gap-2 mb-1">
                      <Briefcase className="w-4 h-4 text-primary" />
                      <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                        {content.labels.client}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pl-6">
                      {c.clientProfile}
                    </p>
                  </div>

                  {/* Challenge */}
                  <div className="mb-5">
                    <div className="flex items-center gap-2 mb-1">
                      <Target className="w-4 h-4 text-primary" />
                      <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                        {content.labels.challenge}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pl-6">
                      {c.challenge}
                    </p>
                  </div>

                  {/* Approach */}
                  <div className="mb-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="w-4 h-4 text-primary" />
                      <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                        {content.labels.approach}
                      </span>
                    </div>
                    <ol className="list-decimal pl-12 space-y-1.5 text-sm sm:text-base text-muted-foreground">
                      {c.approach.map((step, i) => (
                        <li key={i} className="leading-relaxed">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Outcome */}
                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 mt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                        {content.labels.outcome}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4">
                      {c.outcome.map((o, i) => (
                        <div key={i} className="text-center">
                          <div className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
                            {o.value}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{o.metric}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                      {c.outcomeNarrative}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          {/* Trust */}
          <section className="py-12 sm:py-16 bg-muted/30">
            <div className="container-wide max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-6">
                {content.trustHeading}
              </h2>
              <div className="space-y-4">
                {content.trustParagraphs.map((p, i) => (
                  <p key={i} className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    {p}
                  </p>
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

export default Cases;
