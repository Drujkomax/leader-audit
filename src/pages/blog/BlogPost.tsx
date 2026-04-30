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

const SITE_URL = "https://leaderaudit.uz";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const langPrefix = language === "ru" ? "" : `/${language}`;

  if (!slug || !blogPosts[language][slug]) {
    return <Navigate to={`${langPrefix}/blog`} replace />;
  }

  const post = blogPosts[language][slug];
  const canonical = `${SITE_URL}${langPrefix}/blog/${slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    image: `${SITE_URL}/leader-audit-logo.png`,
    datePublished: post.publishedDate,
    dateModified: post.modifiedDate,
    author: { "@id": "https://leaderaudit.uz/#organization" },
    publisher: { "@id": "https://leaderaudit.uz/#organization" },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
    inLanguage: language === "ru" ? "ru-RU" : language === "uz" ? "uz-UZ" : "en-US",
    keywords: post.keywords,
    articleSection: post.category,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}${langPrefix}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}${langPrefix}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: canonical },
    ],
  };

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
        schemaJsonLd={[articleSchema, breadcrumbSchema]}
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
