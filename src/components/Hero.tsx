import React from 'react';
import { personalInfo } from '../data/portfolio';
import { ArrowDown, Github, FileText, Terminal, Code2 } from 'lucide-react';
import { RippleButton } from '@/registry/magicui/ripple-button';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  return (
    <section id="home" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      
      {/* Background Accent Mesh (Subtle, non-distracting) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-emerald-500/5 dark:bg-emerald-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>{personalInfo.availability}</span>
        </div>

        {/* Primary Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#18181b] dark:text-[#f4f4f5] leading-[1.15]">
          Hi, I'm <span className="text-emerald-600 dark:text-emerald-400">Suraj Jaiswal</span>.
        </h1>

        {/* Secondary Heading / Position */}
        <h2 className="mt-3 text-xl sm:text-2xl md:text-3xl font-semibold text-[#52525b] dark:text-[#a1a1aa] tracking-tight">
          {personalInfo.role}
        </h2>

        {/* Subtitle Badge Row */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-mono text-[#71717a] dark:text-[#a1a1aa]">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#f4f4f5] dark:bg-[#18181b] border border-[#e4e4e7] dark:border-[#27272a]">
            <Terminal className="w-3.5 h-3.5 text-emerald-500" />
            Computer Vision (YOLOv8 + FaceNet)
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#f4f4f5] dark:bg-[#18181b] border border-[#e4e4e7] dark:border-[#27272a]">
            <Code2 className="w-3.5 h-3.5 text-emerald-500" />
            Backend REST Architecture
          </span>
        </div>

        {/* Description */}
        <p className="mt-6 text-base sm:text-lg text-[#52525b] dark:text-[#a1a1aa] leading-relaxed max-w-2xl">
          {personalInfo.heroBio}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          
          {/* View Projects CTA */}
          <RippleButton
            href="#projects"
            rippleColor="rgba(255, 255, 255, 0.45)"
            className="group px-6 py-3 rounded-lg bg-emerald-600 dark:bg-emerald-500 text-white font-semibold text-sm hover:bg-emerald-700 dark:hover:bg-emerald-600 shadow-md hover:shadow-xl hover:shadow-emerald-500/25 hover:-translate-y-1 active:scale-95 transition-all duration-300"
          >
            <span>View Projects</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
          </RippleButton>

          {/* GitHub CTA */}
          <RippleButton
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            rippleColor="#ADD8E6"
            className="group px-5 py-3 rounded-lg bg-white dark:bg-[#1c1c21] border border-[#e4e4e7] dark:border-[#27272a] text-[#18181b] dark:text-[#f4f4f5] font-semibold text-sm hover:border-emerald-500/60 dark:hover:border-emerald-400/60 hover:bg-[#faf8f5] dark:hover:bg-[#27272a] hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-1 active:scale-95 transition-all duration-300 shadow-sm"
          >
            <Github className="w-4 h-4 group-hover:scale-110 group-hover:text-emerald-500 transition-all duration-300" />
            <span className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">GitHub Profile</span>
          </RippleButton>

          {/* Download / View Resume CTA */}
          <RippleButton
            onClick={onOpenResume}
            rippleColor="#10b981"
            className="group px-5 py-3 rounded-lg bg-white dark:bg-[#1c1c21] border border-[#e4e4e7] dark:border-[#27272a] text-[#18181b] dark:text-[#f4f4f5] font-semibold text-sm hover:border-emerald-500/60 dark:hover:border-emerald-400/60 hover:bg-[#faf8f5] dark:hover:bg-[#27272a] hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-1 active:scale-95 transition-all duration-300 shadow-sm"
          >
            <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
            <span className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">Resume</span>
          </RippleButton>
        </div>

      </div>
    </section>
  );
};
