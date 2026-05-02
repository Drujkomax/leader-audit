import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/language-context";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();
  const { t, language } = useLanguage();

  useEffect(() => {
    console.error(t.notFound.log, location.pathname);
  }, [location.pathname, t.notFound.log]);

  const langPrefix = language === "ru" ? "" : `/${language}`;

  return (
    <>
      <SEO
        title={`404: ${t.notFound.title} | Leader Audit`}
        description={t.notFound.title}
        canonical={`https://leaderaudit.uz${langPrefix}/404`}
        noindex={true}
      />
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">{t.notFound.title}</p>
          <a href="/" className="text-primary underline hover:text-primary/90">
            {t.notFound.back}
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
