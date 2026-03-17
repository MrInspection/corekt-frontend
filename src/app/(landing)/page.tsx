import { CallToActionSection } from "@/components/call-to-action-section";
import { FeaturesSection } from "@/components/features-section";
import { HeroSection } from "@/components/hero-section";
import { HowItWorksSection } from "@/components/how-it-works-section";

export default function HomePage() {
  return (
    <div className="bg-brand-25">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CallToActionSection />
    </div>
  );
}
