import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation.jsx';
import HeroSection from '../components/sections/HeroSection.jsx';
import ProjectsSection from '../components/sections/ProjectsSection.jsx';
import About from '../components/sections/About.jsx';
import HireMeSection from '../components/sections/HireMeSection.jsx';
import SkillsSection from '../components/sections/SkillsSection.jsx';
import ContactSection from '../components/sections/ContactSection.jsx';
import CertificatesSection from '../components/sections/CertificatesSection.jsx';
import ExperienceSection from '../components/sections/ExperienceSection.jsx';
import EducationSection from '../components/sections/EducationSection.jsx';
import ResearchSection from '../components/sections/ResearchSection.jsx';
import MediaSection from '../components/sections/MediaSection.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import SmoothScroll from '../components/ui/SmoothScroll.jsx';
import SectionWrapper from '../components/ui/SectionWrapper.jsx';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero','about','hire','projects','skills','experience','education','certificates','research','media','contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <div className="min-h-screen relative">
      <Navigation activeSection={activeSection} onSectionChange={scrollToSection} />

      <SmoothScroll>
        <SectionWrapper id="hero">
          <HeroSection />
        </SectionWrapper>

        <SectionWrapper id="about">
          <About />
        </SectionWrapper>

        <SectionWrapper id="hire">
          <HireMeSection />
        </SectionWrapper>

        <SectionWrapper id="projects">
          <ProjectsSection />
        </SectionWrapper>

        <SectionWrapper id="skills">
          <SkillsSection />
        </SectionWrapper>

        <SectionWrapper id="contact">
          <ContactSection />
        </SectionWrapper>

        <SectionWrapper id="experience">
          <ExperienceSection />
        </SectionWrapper>

        <SectionWrapper id="education">
          <EducationSection />
        </SectionWrapper>

        <SectionWrapper id="certificates">
          <CertificatesSection />
        </SectionWrapper>

        <SectionWrapper id="research">
          <ResearchSection />
        </SectionWrapper>


        <SectionWrapper id="media">
          <MediaSection />
        </SectionWrapper>
      </SmoothScroll>
    </div>
  );
};

export default Portfolio;
