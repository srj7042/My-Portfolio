import React from 'react';
import { personalInfo } from '../data/portfolio';
import { Github, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-[#e4e4e7] dark:border-[#27272a] bg-[#faf8f5] dark:bg-[#09090b] transition-colors duration-200 text-xs text-[#71717a] dark:text-[#a1a1aa]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left Side Branding & Year */}
        <div className="flex items-center gap-2 font-mono">
          <span className="font-bold text-[#18181b] dark:text-[#f4f4f5]">{personalInfo.name}</span>
          <span>&bull;</span>
          <span>&copy; {currentYear}</span>
        </div>

        {/* Right Side Social Links */}
        <div className="flex items-center gap-4">
          <a
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-500 transition-colors"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          {personalInfo.social.linkedin && (
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-500 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
        </div>

      </div>
    </footer>
  );
};
