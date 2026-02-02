import Header from "@/components/sections/Header";
import HeroSection from "@/components/sections/HeroSection";
import TrustBar from "@/components/sections/TrustBar";
import FOMOSection from "@/components/sections/FOMOSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ExpertiseSection from "@/components/sections/ExpertiseSection";
import LeadFormSection from "@/components/sections/LeadFormSection";
import Footer from "@/components/sections/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <TrustBar />
        <FOMOSection />
        <ServicesSection />
        <ExpertiseSection />
        <LeadFormSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
