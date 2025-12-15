import BentoSection from "./components/landing/BentoSection";
import CTASection from "./components/landing/CTASection";
import FeaturesSection from "./components/landing/FeaturesSection";
import Footer from "./components/landing/Footer";
import HeroSection from "./components/landing/Herosection";
import StatsSection from "./components/landing/StatsSection";

const page = () => {
  return (
    <>
    <HeroSection />
    <main className="min-h-screen w-4xl mx-auto">
      <BentoSection />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
      <Footer />
    </main>
    </>
  );
};

export default page;
