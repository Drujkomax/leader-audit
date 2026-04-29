import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { LanguageProvider } from "@/contexts/language-context";
import ObligatoryAudit from "./pages/services/ObligatoryAudit";
import InitiativeAudit from "./pages/services/InitiativeAudit";
import TaxConsulting from "./pages/services/TaxConsulting";
import VATRefund from "./pages/services/VATRefund";
import Accounting from "./pages/services/Accounting";
import About from "./pages/About";
import Contact from "./pages/Contact";
import BlogIndex from "./pages/blog/BlogIndex";
import BlogPost from "./pages/blog/BlogPost";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />

              {/* Services */}
              <Route path="/services/obligatory-audit" element={<ObligatoryAudit />} />
              <Route path="/services/initiative-audit" element={<InitiativeAudit />} />
              <Route path="/services/tax-consulting" element={<TaxConsulting />} />
              <Route path="/services/vat-refund" element={<VATRefund />} />
              <Route path="/services/accounting" element={<Accounting />} />

              {/* About / Contact */}
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

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
              <Route path="/en/blog" element={<BlogIndex />} />
              <Route path="/en/blog/:slug" element={<BlogPost />} />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
