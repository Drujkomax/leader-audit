import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import { LanguageProvider } from "@/contexts/language-context";

// Home stays eager (it is the LCP route); every other page is code-split.
const NotFound = lazy(() => import("./pages/NotFound"));
const ObligatoryAudit = lazy(() => import("./pages/services/ObligatoryAudit"));
const InitiativeAudit = lazy(() => import("./pages/services/InitiativeAudit"));
const TaxConsulting = lazy(() => import("./pages/services/TaxConsulting"));
const VATRefund = lazy(() => import("./pages/services/VATRefund"));
const Accounting = lazy(() => import("./pages/services/Accounting"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Cases = lazy(() => import("./pages/Cases"));
const BlogIndex = lazy(() => import("./pages/blog/BlogIndex"));
const BlogPost = lazy(() => import("./pages/blog/BlogPost"));

// Admin (not linked from the public site, noindex)
const AdminLogin = lazy(() => import("./admin/AdminLogin"));
const AdminLayout = lazy(() => import("./admin/AdminLayout"));
const PostsList = lazy(() => import("./admin/PostsList"));
const PostEditor = lazy(() => import("./admin/PostEditor"));
const LeadsList = lazy(() => import("./admin/LeadsList"));

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <Routes>
              <Route path="/" element={<Index />} />

              {/* Services */}
              <Route path="/services/obligatory-audit" element={<ObligatoryAudit />} />
              <Route path="/services/initiative-audit" element={<InitiativeAudit />} />
              <Route path="/services/tax-consulting" element={<TaxConsulting />} />
              <Route path="/services/vat-refund" element={<VATRefund />} />
              <Route path="/services/accounting" element={<Accounting />} />

              {/* About / Contact / Cases */}
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cases" element={<Cases />} />

              {/* Blog */}
              <Route path="/blog" element={<BlogIndex />} />
              <Route path="/blog/:slug" element={<BlogPost />} />

              {/* Localized routes (UZ) */}
              <Route path="/uz" element={<Index />} />
              <Route path="/uz/services/obligatory-audit" element={<ObligatoryAudit />} />
              <Route path="/uz/services/initiative-audit" element={<InitiativeAudit />} />
              <Route path="/uz/services/tax-consulting" element={<TaxConsulting />} />
              <Route path="/uz/services/vat-refund" element={<VATRefund />} />
              <Route path="/uz/services/accounting" element={<Accounting />} />
              <Route path="/uz/about" element={<About />} />
              <Route path="/uz/contact" element={<Contact />} />
              <Route path="/uz/cases" element={<Cases />} />
              <Route path="/uz/blog" element={<BlogIndex />} />
              <Route path="/uz/blog/:slug" element={<BlogPost />} />

              {/* Localized routes (EN) */}
              <Route path="/en" element={<Index />} />
              <Route path="/en/services/obligatory-audit" element={<ObligatoryAudit />} />
              <Route path="/en/services/initiative-audit" element={<InitiativeAudit />} />
              <Route path="/en/services/tax-consulting" element={<TaxConsulting />} />
              <Route path="/en/services/vat-refund" element={<VATRefund />} />
              <Route path="/en/services/accounting" element={<Accounting />} />
              <Route path="/en/about" element={<About />} />
              <Route path="/en/contact" element={<Contact />} />
              <Route path="/en/cases" element={<Cases />} />
              <Route path="/en/blog" element={<BlogIndex />} />
              <Route path="/en/blog/:slug" element={<BlogPost />} />

              {/* Admin */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route element={<AdminLayout />}>
                <Route path="/admin/posts" element={<PostsList />} />
                <Route path="/admin/posts/new" element={<PostEditor />} />
                <Route path="/admin/posts/:slug" element={<PostEditor />} />
                <Route path="/admin/leads" element={<LeadsList />} />
              </Route>

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
