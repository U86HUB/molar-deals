
import { Navbar } from "@/components/layout/Navbar";
import { AuthModal } from "@/components/auth/AuthModal";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";
import { useIndexPage } from "@/hooks/useIndexPage";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustedBySection } from "@/components/home/TrustedBySection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { PricingSection } from "@/components/home/PricingSection";
import { CtaSection } from "@/components/home/CtaSection";
import { FooterSection } from "@/components/home/FooterSection";

const Index = () => {
  const {
    showAuthModal,
    setShowAuthModal,
    showOnboarding,
    setShowOnboarding,
    isAuthenticated,
    handleAuthSuccess,
    handleOnboardingComplete,
  } = useIndexPage();

  return (
    <div className="min-h-screen bg-background">
      <Navbar onOpenAuth={() => setShowAuthModal(true)} />
      
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
      
      <OnboardingWizard 
        isOpen={showOnboarding}
        onComplete={handleOnboardingComplete}
        onClose={() => setShowOnboarding(false)}
      />
      
      {/* Main Sections */}
      <HeroSection 
        isAuthenticated={isAuthenticated}
        onOpenAuth={() => setShowAuthModal(true)} 
      />
      <TrustedBySection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection onOpenAuth={() => setShowAuthModal(true)} />
      <CtaSection onOpenAuth={() => setShowAuthModal(true)} />
      <FooterSection />
    </div>
  );
};

export default Index;
