import { useParams, Link, Navigate } from "react-router-dom";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingContact from "@/components/FloatingContact";
import LeadFormSection from "@/components/sections/LeadFormSection";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/language-context";
import { blogPosts } from "@/data/blog-posts";
import { servicesContent } from "@/data/services-content";

const SITE_URL = "https://leaderaudit.uz";

// Each guide links to its most relevant service pages (contextual internal linking).
const RELATED_SERVICES: Record<string, string[]> = {
  "obligatory-audit-guide-2026": ["obligatory-audit", "initiative-audit"],
  "vat-refund-uzbekistan": ["vat-refund", "tax-consulting"],
  "isa-vs-nas-uzbekistan": ["obligatory-audit", "accounting"],
  "transfer-pricing-uzbekistan": ["tax-consulting", "obligatory-audit"],
  "tax-audit-checklist": ["tax-consulting", "accounting"],
  "tax-code-2026-changes": ["tax-consulting", "accounting"],
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const langPrefix = language === "ru" ? "" : `/${language}`;

  if (!slug || !blogPosts[language][slug]) {
    return <Navigate to={`${langPrefix}/blog`} replace />;
  }

  const post = blogPosts[language][slug];
  const canonical = `${SITE_URL}${langPrefix}/blog/${slug}`;

  // JSON-LD (BlogPosting + Breadcrumb) is emitted by the static prerender as one @graph,
  // so it is intentionally not duplicated at runtime.

  const renderContent = () => {
    return post.content.map((block, idx) => {
      switch (block.type) {
        case "h2":
          return (
            <h2 key={idx} className="text-2xl sm:text-3xl font-bold text-foreground mt-8 mb-4">
              {block.text}
            </h2>
          );
        case "h3":
          return (
            <h3 key={idx} className="text-xl sm:text-2xl font-bold text-foreground mt-6 mb-3">
              {block.text}
            </h3>
          );
        case "p":
          return (
            <p key={idx} className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4">
              {block.text}
            </p>
          );
        case "ul":
          return (
            <ul key={idx} className="list-disc pl-6 space-y-2 mb-4 text-base sm:text-lg text-muted-foreground">
              {block.items?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          );
        case "ol":
          return (
            <ol key={idx} className="list-decimal pl-6 space-y-2 mb-4 text-base sm:text-lg text-muted-foreground">
              {block.items?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
          );
        case "quote":
          return (
            <blockquote key={idx} className="border-l-4 border-primary pl-4 italic text-foreground/80 my-6">
              {block.text}
            </blockquote>
          );
        default:
          return null;
      }
    });
  };

  return (
    <>
      <SEO
        title={post.metaTitle}
        description={post.metaDescription}
        keywords={post.keywords}
        canonical={canonical}
        type="article"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <section className="bg-primary-dark pt-28 pb-12 sm:pt-32 sm:pb-16">
            <div className="container-wide max-w-3xl">
              <Link
                to={`${langPrefix}/blog`}
                className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground mb-6 text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                {language === "ru" ? "Все статьи" : language === "uz" ? "Barcha maqolalar" : "All articles"}
              </Link>

              <div className="flex items-center gap-3 text-xs text-primary-foreground/70 mb-4 flex-wrap">
                <span className="px-2 py-1 bg-primary-foreground/10 text-primary-foreground rounded-md font-medium">
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.publishedDate}
                </span>
                {post.modifiedDate && post.modifiedDate !== post.publishedDate && (
                  <span className="flex items-center gap-1">
                    {language === "ru" ? "Обновлено" : language === "uz" ? "Yangilangan" : "Updated"}: {post.modifiedDate}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readingTime}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-4 leading-tight">
                {post.title}
              </h1>
              <p className="text-base sm:text-lg text-primary-foreground/80 leading-relaxed">{post.excerpt}</p>
            </div>
          </section>

          <article className="py-10 sm:py-14">
            <div className="container-wide max-w-3xl">
              <div className="prose prose-lg max-w-none">{renderContent()}</div>

              {(RELATED_SERVICES[slug] ?? []).length > 0 && (
                <aside className="mt-12 border-t border-border pt-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
                    {language === "ru" ? "Связанные услуги" : language === "uz" ? "Bog'liq xizmatlar" : "Related services"}
                  </h2>
                  <ul className="flex flex-wrap gap-3">
                    {(RELATED_SERVICES[slug] ?? []).map((s) => (
                      <li key={s}>
                        <Link
                          to={`${langPrefix}/services/${s}`}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/5 border border-primary/20 text-primary font-semibold text-sm hover:bg-primary/10 transition-colors"
                        >
                          {servicesContent[language][s as keyof (typeof servicesContent)["ru"]].title}
                          <ArrowLeft className="w-4 h-4 rotate-180" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </aside>
              )}
            </div>
          </article>

          <LeadFormSection />
        </main>
        <Footer />
        <ScrollToTop />
        <FloatingContact />
      </div>
    </>
  );
};

export default BlogPost;
