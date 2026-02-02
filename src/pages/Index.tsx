import Header from "@/components/sections/Header";
import HeroSection from "@/components/sections/HeroSection";
import TrustBar from "@/components/sections/TrustBar";
import FOMOSection from "@/components/sections/FOMOSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import ExpertiseSection from "@/components/sections/ExpertiseSection";
import LeadFormSection from "@/components/sections/LeadFormSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import MapSection from "@/components/sections/MapSection";
import Footer from "@/components/sections/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingContact from "@/components/FloatingContact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <TrustBar />
        <FOMOSection />
        <ServicesSection />
        <AboutSection />
        <ExpertiseSection />
        <LeadFormSection />
        <TestimonialsSection />
        <MapSection />
      </main>
      <Footer />
      <ScrollToTop />
      <FloatingContact />
    </div>
  );
};

export default Index;
