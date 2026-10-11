import React from 'react';
import { skillCategories } from '../data/portfolio';
import { Code, Brain, Server, Layout, Database, Cloud, Wrench, Sparkles } from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  "Programming Languages": <Code className="w-4 h-4 text-emerald-500" />,
  "AI & Machine Learning": <Brain className="w-4 h-4 text-emerald-500" />,
  "Backend Engineering": <Server className="w-4 h-4 text-emerald-500" />,
  "Frontend & Visualization": <Layout className="w-4 h-4 text-emerald-500" />,
  "Databases & Storage": <Database className="w-4 h-4 text-emerald-500" />,
  "Cloud & DevOps": <Cloud className="w-4 h-4 text-emerald-500" />,
  "Engineering Tools": <Wrench className="w-4 h-4 text-emerald-500" />,
  "AI Development Tools": <Sparkles className="w-4 h-4 text-emerald-500" />,
};

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-16 md:py-24 border-t border-[#e4e4e7]/60 dark:border-[#27272a]/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Code className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#18181b] dark:text-[#f4f4f5]">
              Technical Skills
            </h2>
            <p className="text-xs font-mono text-[#71717a] dark:text-[#a1a1aa] mt-0.5">
              Categorized stack derived from core projects &amp; engineering experience
            </p>
          </div>
        </div>

        {/* Skills Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillCategories.map((cat) => (
            <div
              key={cat.title}
              className="p-5 rounded-xl bg-white dark:bg-[#141417] border border-[#e4e4e7] dark:border-[#27272a] shadow-sm hover:border-emerald-500/40 dark:hover:border-emerald-500/40 transition-all duration-200 group"
            >
              <div className="flex items-center gap-2 mb-2">
                {categoryIcons[cat.title] || <Code className="w-4 h-4 text-emerald-500" />}
                <h3 className="font-semibold text-sm text-[#18181b] dark:text-[#f4f4f5] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {cat.title}
                </h3>
              </div>

              <p className="text-xs text-[#71717a] dark:text-[#a1a1aa] mb-4 line-clamp-2">
                {cat.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 rounded-md bg-[#faf8f5] dark:bg-[#1c1c21] border border-[#e4e4e7] dark:border-[#27272a] text-xs font-mono text-[#3f3f46] dark:text-[#d4d4d8] hover:border-emerald-500/30 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
