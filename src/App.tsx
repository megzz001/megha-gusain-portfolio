import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import SkillsDashboard from './components/SkillsDashboard';
import ProjectsGallery from './components/ProjectsGallery';
import ExperienceTimeline from './components/ExperienceTimeline';
import ContactForm from './components/ContactForm';
import ResumeTwinChat from './components/ResumeTwinChat';
import Loader from './components/effects/Loader';
import Starfield from './components/effects/Starfield';
import CustomCursor from './components/effects/CustomCursor';
import SkillsMarquee from './components/effects/SkillsMarquee';
import { ME_INFO } from './data';
import { Terminal, Shield, Cpu, ExternalLink } from 'lucide-react';

const resumePdfUrl = new URL('../assets/MeghaTechnical2.pdf', import.meta.url).href;

export default function App() {
  const [loading, setLoading] = useState(true);

  // The site commits to a single futuristic dark theme
  useEffect(() => {
    window.document.documentElement.classList.add('dark');
  }, []);

  // Download the uploaded resume PDF
  const handlePrintResume = () => {
    const link = document.createElement('a');
    link.href = resumePdfUrl;
    link.download = 'MeghaTechnical2.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper to trigger open of the chatbot widget
  const triggerAiChat = () => {
    const chatButton = document.querySelector('#ai-chat-twin button');
    if (chatButton) {
      (chatButton as HTMLButtonElement).click();
    }
  };

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}

      <div
        className={`min-h-screen dark bg-brand-bg-dark text-neutral-100 grid-bg-dark transition-opacity duration-700 ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <Starfield />
        <CustomCursor />

        {/* 1. Screen Elements (Hidden on print) */}
        <div className="print:hidden relative">

          {/* Navigation Bar */}
          <Navbar onPrintResume={handlePrintResume} />

          {/* Hero Section */}
          <Hero onChatClick={triggerAiChat} />

          {/* Skills Marquee */}
          <SkillsMarquee />

          {/* Main Content Area */}
          <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* About Me Section */}
            <AboutMe />

            {/* Technical Skills Section */}
            <SkillsDashboard />

            {/* Projects Gallery Section */}
            <ProjectsGallery />

            {/* Educational Timeline Section */}
            <ExperienceTimeline />

            {/* Interactive Contact Form Section */}
            <ContactForm />
          </main>

          {/* Dynamic Footer Section */}
          <footer className="border-t border-neutral-200 dark:border-brand-border-dark py-12 px-4 sm:px-6 lg:px-8 text-center text-neutral-500 dark:text-neutral-500 bg-white/40 dark:bg-brand-bg-dark/40 backdrop-blur-sm relative z-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2 font-display font-bold text-sm text-neutral-800 dark:text-neutral-300">
                <Terminal className="h-4 w-4 text-brand-accent" />
                <span>megha.gusain &middot; CSE Portfolio</span>
              </div>

              <p className="text-xs font-mono">
                Designed with precision &middot; Built using React, Express &amp; Gemini API &middot; 2026
              </p>

              <div className="flex gap-4 text-xs font-mono">
                <a
                  href={ME_INFO.github}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="hover:text-brand-accent transition-colors flex items-center gap-1"
                >
                  <span>GitHub</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
                <a
                  href={ME_INFO.linkedin}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="hover:text-brand-accent transition-colors flex items-center gap-1"
                >
                  <span>LinkedIn</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </footer>

          {/* Interactive Floating AI Chat Twin Widget */}
          <ResumeTwinChat />
        </div>
      </div>
    </>
  );
}
