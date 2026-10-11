import React from 'react';
import { personalInfo } from '../data/portfolio';
import { Mail, Github, Linkedin, MessageSquare } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-16 md:py-24 border-t border-[#e4e4e7]/60 dark:border-[#27272a]/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Section Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-4">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#18181b] dark:text-[#f4f4f5]">
          Let's Build Something Useful.
        </h2>

        {/* Supporting Text */}
        <p className="mt-3 text-base text-[#52525b] dark:text-[#a1a1aa] max-w-2xl mx-auto leading-relaxed">
          I'm interested in backend engineering, applied AI/ML, computer vision, and software engineering opportunities.
        </p>

        {/* Contact Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          
          {/* Email Button */}
          {personalInfo.social.email && (
            <a
              href={`mailto:${personalInfo.social.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 dark:bg-emerald-500 text-white font-semibold text-sm hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors shadow-md active:scale-95"
            >
              <Mail className="w-4 h-4" />
              <span>Send Email</span>
            </a>
          )}

          {/* GitHub Button */}
          {personalInfo.social.github && (
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white dark:bg-[#1c1c21] border border-[#e4e4e7] dark:border-[#27272a] text-[#18181b] dark:text-[#f4f4f5] font-semibold text-sm hover:bg-[#f4f4f5] dark:hover:bg-[#27272a] transition-colors shadow-sm"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          )}

          {/* LinkedIn Button */}
          {personalInfo.social.linkedin && (
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white dark:bg-[#1c1c21] border border-[#e4e4e7] dark:border-[#27272a] text-[#18181b] dark:text-[#f4f4f5] font-semibold text-sm hover:bg-[#f4f4f5] dark:hover:bg-[#27272a] transition-colors shadow-sm"
            >
              <Linkedin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>LinkedIn</span>
            </a>
          )}

        </div>

      </div>
    </section>
  );
};
