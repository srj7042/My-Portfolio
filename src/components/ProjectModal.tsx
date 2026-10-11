import React, { useEffect } from 'react';
import { Project } from '../types/portfolio';
import { X, Github, ExternalLink, Cpu, CheckCircle2, Layers, AlertCircle } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#faf8f5] dark:bg-[#141417] border border-[#e4e4e7] dark:border-[#27272a] rounded-2xl p-6 md:p-8 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-black/5 dark:bg-white/5 text-[#52525b] dark:text-[#a1a1aa] hover:text-[#18181b] dark:hover:text-[#f4f4f5] transition-colors"
          aria-label="Close Project Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <span className="inline-block px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-semibold mb-2">
            {project.category}
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#18181b] dark:text-[#f4f4f5]">
            {project.title}
          </h3>
          <p className="text-sm text-[#52525b] dark:text-[#a1a1aa] mt-1 font-medium">
            {project.subtitle}
          </p>
        </div>

        {/* Project Description */}
        <div className="space-y-5">
          <p className="text-sm text-[#3f3f46] dark:text-[#d4d4d8] leading-relaxed">
            {project.fullDescription}
          </p>

          {/* Problem Statement */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-1">
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Problem Addressed</span>
            </div>
            <p className="text-xs leading-relaxed">
              {project.problem}
            </p>
          </div>

          {/* Architecture Highlights if present */}
          {project.architecture && project.architecture.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#52525b] dark:text-[#a1a1aa] flex items-center gap-2 mb-2">
                <Layers className="w-4 h-4 text-emerald-500" />
                <span>Architecture Flow</span>
              </h4>
              <div className="space-y-1.5 font-mono text-xs">
                {project.architecture.map((arch, idx) => (
                  <div key={idx} className="p-2.5 rounded bg-white dark:bg-[#1c1c21] border border-[#e4e4e7] dark:border-[#27272a] text-[#3f3f46] dark:text-[#d4d4d8]">
                    {arch}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Features */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#52525b] dark:text-[#a1a1aa] flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Key Technical Features</span>
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-[#52525b] dark:text-[#a1a1aa]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology Tags */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#52525b] dark:text-[#a1a1aa] flex items-center gap-2 mb-2">
              <Cpu className="w-4 h-4 text-emerald-500" />
              <span>Technology Stack</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-md bg-[#f4f4f5] dark:bg-[#1c1c21] border border-[#e4e4e7] dark:border-[#27272a] text-xs font-mono text-[#18181b] dark:text-[#f4f4f5]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-8 pt-4 border-t border-[#e4e4e7] dark:border-[#27272a] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 dark:bg-emerald-500 text-white font-semibold text-xs hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors shadow-sm"
            >
              <Github className="w-4 h-4" />
              <span>View Code Repository</span>
            </a>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-[#1c1c21] border border-[#e4e4e7] dark:border-[#27272a] text-[#18181b] dark:text-[#f4f4f5] font-semibold text-xs hover:bg-[#f4f4f5] dark:hover:bg-[#27272a] transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-emerald-500" />
                <span>Live Deployment</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#71717a] dark:text-[#a1a1aa] hover:text-[#18181b] dark:hover:text-[#f4f4f5] transition-colors"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
};
