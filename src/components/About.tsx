import React from 'react';
import { personalInfo } from '../data/portfolio';
import { User, Cpu, Server, Layers } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 border-t border-[#e4e4e7]/60 dark:border-[#27272a]/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#18181b] dark:text-[#f4f4f5]">
              About Me
            </h2>
            <p className="text-xs font-mono text-[#71717a] dark:text-[#a1a1aa] mt-0.5">
              Engineering focus &amp; technical background
            </p>
          </div>
        </div>

        {/* Paragraph Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          {/* Main Bio Paragraphs */}
          <div className="md:col-span-2 space-y-4 text-base text-[#52525b] dark:text-[#a1a1aa] leading-relaxed">
            {personalInfo.aboutParagraphs.map((paragraph, index) => (
              <p key={index} className="bg-white dark:bg-[#141417] p-5 rounded-xl border border-[#e4e4e7] dark:border-[#27272a] shadow-sm">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Quick Technical Focus Cards */}
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-white dark:bg-[#141417] border border-[#e4e4e7] dark:border-[#27272a] shadow-sm">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-[#18181b] dark:text-[#f4f4f5] mb-1">
                <Cpu className="w-4 h-4 text-emerald-500" />
                <span>Applied Computer Vision</span>
              </div>
              <p className="text-xs text-[#71717a] dark:text-[#a1a1aa] leading-normal">
                Face detection &amp; recognition pipelines using YOLOv8, FaceNet, and OpenCV.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-[#141417] border border-[#e4e4e7] dark:border-[#27272a] shadow-sm">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-[#18181b] dark:text-[#f4f4f5] mb-1">
                <Server className="w-4 h-4 text-emerald-500" />
                <span>Backend Engineering</span>
              </div>
              <p className="text-xs text-[#71717a] dark:text-[#a1a1aa] leading-normal">
                RESTful APIs, SQL/NoSQL schemas, authentication, and backend server routing.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-[#141417] border border-[#e4e4e7] dark:border-[#27272a] shadow-sm">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-[#18181b] dark:text-[#f4f4f5] mb-1">
                <Layers className="w-4 h-4 text-emerald-500" />
                <span>End-to-End Systems</span>
              </div>
              <p className="text-xs text-[#71717a] dark:text-[#a1a1aa] leading-normal">
                Connecting deep learning models directly into production web applications.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
