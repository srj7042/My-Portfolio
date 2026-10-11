import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { GitHubSection } from './components/GitHubSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';

export const AppContent: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-[#09090b] text-[#18181b] dark:text-[#f4f4f5] font-sans transition-colors duration-300">
      
      {/* Sticky Responsive Navbar */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Container */}
      <main className="relative">
        <Hero onOpenResume={() => setIsResumeOpen(true)} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <GitHubSection />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Resume Viewer Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
