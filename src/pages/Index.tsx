import Navigation from '@/components/Navigation';
import HeroContent from '@/components/HeroContent';
import ProjectsSection from '@/components/ProjectsSection';
import StatsCounter from '@/components/StatsCounter';
import TechStackSection from '@/components/TechStackSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import ScrollProgress from '@/components/ScrollProgress';
import CinematicSection from '@/components/CinematicSection';
import SectionDivider from '@/components/SectionDivider';

const Index = () => {
  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden">
      <ScrollProgress />
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-screen">
        <HeroContent />
      </section>

      <SectionDivider />

      <CinematicSection parallaxStrength={60} scaleRange={[0.9, 1]} rotateRange={[2, 0]}>
        <ProjectsSection />
      </CinematicSection>

      <SectionDivider />

      <CinematicSection parallaxStrength={40} scaleRange={[0.95, 1]} rotateRange={[1, 0]}>
        <StatsCounter />
      </CinematicSection>

      <SectionDivider />

      <CinematicSection parallaxStrength={50} scaleRange={[0.93, 1]} rotateRange={[1.5, 0]}>
        <TechStackSection />
      </CinematicSection>

      <SectionDivider />

      <CinematicSection parallaxStrength={30} scaleRange={[0.96, 1]} rotateRange={[1, 0]}>
        <AboutSection />
      </CinematicSection>

      <SectionDivider />

      <CinematicSection parallaxStrength={20} scaleRange={[0.98, 1]} rotateRange={[0.5, 0]}>
        <ContactSection />
      </CinematicSection>
    </div>
  );
};

export default Index;
