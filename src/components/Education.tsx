import React from 'react';
import { educationList } from '../data/portfolio';
import { GraduationCap, BookOpen } from 'lucide-react';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-16 md:py-24 border-t border-[#e4e4e7]/60 dark:border-[#27272a]/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#18181b] dark:text-[#f4f4f5]">
              Education &amp; Specialization
            </h2>
            <p className="text-xs font-mono text-[#71717a] dark:text-[#a1a1aa] mt-0.5">
              Academic degree program &amp; theoretical foundation
            </p>
          </div>
        </div>

        {/* Education List */}
        <div className="space-y-6">
          {educationList.map((edu, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-[#141417] border border-[#e4e4e7] dark:border-[#27272a] shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                <div>
                  <h3 className="text-lg font-bold text-[#18181b] dark:text-[#f4f4f5]">
                    {edu.degree}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    {edu.field}
                  </p>
                </div>
                <span className="inline-block px-2.5 py-1 rounded bg-[#faf8f5] dark:bg-[#1c1c21] border border-[#e4e4e7] dark:border-[#27272a] font-mono text-xs text-[#52525b] dark:text-[#a1a1aa] self-start sm:self-auto">
                  {edu.expectedGraduation}
                </span>
              </div>

              {edu.highlights && (
                <div className="mt-4 pt-3 border-t border-[#e4e4e7]/60 dark:border-[#27272a]/60 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#52525b] dark:text-[#a1a1aa]">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Core Coursework &amp; Emphasis</span>
                  </div>
                  <ul className="space-y-1.5 pl-5 list-disc text-xs text-[#52525b] dark:text-[#a1a1aa] leading-relaxed">
                    {edu.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
