import React from 'react';
import { experienceList } from '../data/portfolio';
import { Briefcase, CheckCircle } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-16 md:py-24 border-t border-[#e4e4e7]/60 dark:border-[#27272a]/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#18181b] dark:text-[#f4f4f5]">
              Experience &amp; Contributions
            </h2>
            <p className="text-xs font-mono text-[#71717a] dark:text-[#a1a1aa] mt-0.5">
              Verified software development &amp; AI system engineering work
            </p>
          </div>
        </div>

        {/* Experience Cards */}
        <div className="space-y-6">
          {experienceList.map((exp, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-[#141417] border border-[#e4e4e7] dark:border-[#27272a] shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-[#18181b] dark:text-[#f4f4f5]">
                    {exp.role}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    {exp.organization}
                  </p>
                </div>
                <span className="inline-block px-2.5 py-1 rounded bg-[#faf8f5] dark:bg-[#1c1c21] border border-[#e4e4e7] dark:border-[#27272a] font-mono text-xs text-[#52525b] dark:text-[#a1a1aa] self-start sm:self-auto">
                  {exp.period}
                </span>
              </div>

              <ul className="space-y-2.5">
                {exp.contributions.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#52525b] dark:text-[#a1a1aa] leading-relaxed">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
