import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingContact from "@/components/FloatingContact";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/language-context";
import { blogPosts } from "@/data/blog-posts";

const BlogIndex = () => {
  const { language } = useLanguage();
  const langPrefix = language === "ru" ? "" : `/${language}`;
  const canonical = `https://leaderaudit.uz${langPrefix}/blog`;

  const labels = {
    ru: {
      title: "Блог Leader Audit | Экспертные статьи по аудиту и налогам в Узбекистане",
      description: "Экспертные статьи по аудиту, налоговому консалтингу, бухгалтерии и возврату НДС в Узбекистане. Практические советы от лицензированных аудиторов.",
      keywords: "блог аудит, статьи налоги Узбекистан, экспертные статьи аудит",
      h1: "Блог Leader Audit",
      subtitle: "Экспертные статьи по аудиту, налогам и бухгалтерии в Узбекистане",
      readMore: "Читать статью",
    },
    uz: {
      title: "Leader Audit blogi | O'zbekistonda audit va soliqlar bo'yicha ekspert maqolalari",
      description: "O'zbekistonda audit, soliq konsalting, buxgalteriya va QQS qaytarish bo'yicha ekspert maqolalar.",
      keywords: "audit blogi, O'zbekiston soliqlar maqolalar",
      h1: "Leader Audit blogi",
      subtitle: "O'zbekistonda audit, soliqlar va buxgalteriya bo'yicha ekspert maqolalar",
      readMore: "Maqolani o'qish",
    },
    en: {
      title: "Leader Audit Blog | Expert Articles on Audit & Taxes in Uzbekistan",
      description: "Expert articles on audit, tax consulting, accounting and VAT refund in Uzbekistan. Practical advice from licensed auditors.",
      keywords: "audit blog, tax articles Uzbekistan, expert audit articles",
      h1: "Leader Audit Blog",
      subtitle: "Expert articles on audit, taxes and accounting in Uzbekistan",
      readMore: "Read article",
    },
  } as const;

  const c = labels[language];
  const posts = Object.values(blogPosts[language]);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: c.h1,
    description: c.description,
    url: canonical,
    publisher: { "@id": "https://leaderaudit.uz/#organization" },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      datePublished: post.publishedDate,
      dateModified: post.modifiedDate,
      author: { "@id": "https://leaderaudit.uz/#organization" },
      url: `${canonical}/${post.slug}`,
    })),
  };

  return (
    <>
      <SEO
        title={c.title}
        description={c.description}
        keywords={c.keywords}
        canonical={canonical}
        schemaJsonLd={blogSchema}
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <section className="bg-primary-dark pt-28 pb-16 sm:pt-32 sm:pb-20">
            <div className="container-wide max-w-5xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-4">{c.h1}</h1>
              <p className="text-primary-foreground/80 text-lg">{c.subtitle}</p>
            </div>
          </section>

          <section className="py-12 sm:py-16">
            <div className="container-wide max-w-5xl">
              <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                {posts.map((post, idx) => (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-card border border-border rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-md font-medium">
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
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                      <Link
                        to={`${langPrefix}/blog/${post.slug}`}
                        className="hover:text-primary transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <Link
                      to={`${langPrefix}/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-primary font-semibold text-sm sm:text-base hover:gap-3 transition-all"
                    >
                      {c.readMore}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <ScrollToTop />
        <FloatingContact />
      </div>
    </>
  );
};

export default BlogIndex;
