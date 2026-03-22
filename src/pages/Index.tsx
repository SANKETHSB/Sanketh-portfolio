import Navigation from '@/components/Navigation';
import HeroContent from '@/components/HeroContent';
import ProjectsSection from '@/components/ProjectsSection';
import StatsCounter from '@/components/StatsCounter';
import TechStackSection from '@/components/TechStackSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden">
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-screen">
        <HeroContent />
      </section>

      <ProjectsSection />
      <StatsCounter />
      <TechStackSection />
      <AboutSection />
      <ContactSection />
    </div>
  );
};

export default Index;
