import { Navigation } from "@/components/layout";
import { HeroSection, VenturesSection, ExperienceTimeline, BlogSection, ContactSection } from "@/components/sections";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <VenturesSection />
        <ExperienceTimeline />
        <BlogSection />
        <ContactSection />
      </main>
    </div>
  );
}
