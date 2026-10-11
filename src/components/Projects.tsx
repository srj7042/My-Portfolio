import React, { useState } from 'react';
import { projects } from '../data/portfolio';
import { Project } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';
import { FolderGit2, Github, ExternalLink, Star, Eye } from 'lucide-react';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['All', 'AI / Computer Vision', 'Backend Engineering', 'Full-Stack Web', 'Automation & Tools'];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-16 md:py-24 border-t border-[#e4e4e7]/60 dark:border-[#27272a]/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <FolderGit2 className="w-5 h-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#18181b] dark:text-[#f4f4f5]">
                Featured Projects
              </h2>
            </div>
            <p className="text-xs font-mono text-[#71717a] dark:text-[#a1a1aa]">
              Practical software applications built with computer vision, backend REST APIs, and full-stack web technologies
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#f4f4f5] dark:bg-[#141417] border border-[#e4e4e7] dark:border-[#27272a]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 dark:bg-emerald-500 text-white shadow-sm font-semibold'
                    : 'text-[#52525b] dark:text-[#a1a1aa] hover:text-[#18181b] dark:hover:text-[#f4f4f5]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Layout */}
        <div className="space-y-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`p-6 sm:p-8 rounded-2xl transition-all duration-200 border ${
                project.isFlagship
                  ? 'bg-gradient-to-br from-white via-white to-emerald-50/30 dark:from-[#141417] dark:via-[#141417] dark:to-emerald-950/20 border-emerald-500/40 dark:border-emerald-500/40 shadow-md ring-1 ring-emerald-500/20'
                  : 'bg-white dark:bg-[#141417] border-[#e4e4e7] dark:border-[#27272a] shadow-sm hover:border-emerald-500/30'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                
                {/* Main Content */}
                <div className="space-y-3 max-w-3xl">
                  
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    {project.isFlagship && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                        <Star className="w-3 h-3 fill-current" />
                        Flagship Project
                      </span>
                    )}
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-semibold">
                      {project.category}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#18181b] dark:text-[#f4f4f5] tracking-tight flex items-center gap-2">
                      <span>{project.title}</span>
                    </h3>
                    <p className="text-xs font-semibold text-[#52525b] dark:text-[#a1a1aa] mt-0.5">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#3f3f46] dark:text-[#d4d4d8] leading-relaxed">
                    {project.shortDescription}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md bg-[#faf8f5] dark:bg-[#1c1c21] border border-[#e4e4e7] dark:border-[#27272a] text-xs font-mono text-[#52525b] dark:text-[#a1a1aa]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Actions Column */}
                <div className="flex flex-row md:flex-col items-center md:items-end gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#e4e4e7] dark:border-[#27272a]">
                  
                  {/* View Details Modal Button */}
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-semibold text-xs hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white transition-all shadow-xs"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Details</span>
                  </button>

                  {/* GitHub Repo Link */}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#faf8f5] dark:bg-[#1c1c21] border border-[#e4e4e7] dark:border-[#27272a] text-[#18181b] dark:text-[#f4f4f5] font-medium text-xs hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View Code</span>
                  </a>

                  {/* Live Demo Link if available */}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium text-xs hover:bg-emerald-700 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Demo</span>
                    </a>
                  )}

                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Modal Window */}
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />

      </div>
    </section>
  );
};
