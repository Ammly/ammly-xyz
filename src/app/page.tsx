import { Navigation } from "@/components/layout";
import { HeroSection, VenturesSection, ExperienceTimeline, ContactSection } from "@/components/sections";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <VenturesSection />
        <ExperienceTimeline />
        <ContactSection />
      </main>
    </div>
  );
}
