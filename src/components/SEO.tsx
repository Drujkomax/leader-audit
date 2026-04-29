import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/language-context";

type SEOProps = {
  title: string;
  description: string;
  canonical: string;
  keywords?: string;
  image?: string;
  type?: "website" | "article" | "service";
  schemaJsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
};

const SITE_URL = "https://leaderaudit.uz";

const buildAlternates = (canonical: string) => {
  const path = canonical.replace(SITE_URL, "");
  const cleanPath = path.replace(/^\/(uz|en)\//, "/").replace(/^\/(uz|en)$/, "/");
  return {
    ru: `${SITE_URL}${cleanPath}`,
    uz: cleanPath === "/" ? `${SITE_URL}/uz/` : `${SITE_URL}/uz${cleanPath}`,
    en: cleanPath === "/" ? `${SITE_URL}/en/` : `${SITE_URL}/en${cleanPath}`,
  };
};

export const SEO = ({
  title,
  description,
  canonical,
  keywords,
  image = `${SITE_URL}/leader-audit-logo.png?v=20260427`,
  type = "website",
  schemaJsonLd,
  noindex = false,
}: SEOProps) => {
  const { language } = useLanguage();
  const alternates = buildAlternates(canonical);
  const ogLocale = language === "ru" ? "ru_RU" : language === "uz" ? "uz_UZ" : "en_US";

  return (
    <Helmet>
      <html lang={language} />
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta
        name="robots"
        content={noindex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"}
      />
      <link rel="canonical" href={canonical} />

      {/* Hreflang */}
      <link rel="alternate" hrefLang="ru" href={alternates.ru} />
      <link rel="alternate" hrefLang="uz" href={alternates.uz} />
      <link rel="alternate" hrefLang="en" href={alternates.en} />
      <link rel="alternate" hrefLang="x-default" href={alternates.ru} />

      {/* Open Graph */}
      <meta property="og:type" content={type === "service" ? "website" : type} />
      <meta property="og:site_name" content="Leader Audit" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={ogLocale} />
      {language !== "ru" && <meta property="og:locale:alternate" content="ru_RU" />}
      {language !== "uz" && <meta property="og:locale:alternate" content="uz_UZ" />}
      {language !== "en" && <meta property="og:locale:alternate" content="en_US" />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@LeaderAudit" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Per-page JSON-LD */}
      {schemaJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(schemaJsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
