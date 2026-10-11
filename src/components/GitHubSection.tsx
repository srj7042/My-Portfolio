import React, { useEffect, useState } from 'react';
import { personalInfo } from '../data/portfolio';
import { Github, ExternalLink } from 'lucide-react';

interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  avatarUrl: string;
  bio: string;
}

export const GitHubSection: React.FC = () => {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        const response = await fetch('https://api.github.com/users/srj7042');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setStats({
          publicRepos: data.public_repos || 0,
          followers: data.followers || 0,
          following: data.following || 0,
          avatarUrl: data.avatar_url || '',
          bio: data.bio || ''
        });
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchGitHubData();
  }, []);

  return (
    <section id="github" className="py-16 md:py-24 border-t border-[#e4e4e7]/60 dark:border-[#27272a]/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Card Container */}
        <div className="p-8 rounded-2xl bg-white dark:bg-[#141417] border border-[#e4e4e7] dark:border-[#27272a] shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left Column - Avatar & Info */}
          <div className="flex items-center gap-5 w-full md:w-auto">
            {stats?.avatarUrl ? (
              <img
                src={stats.avatarUrl}
                alt="Suraj Jaiswal GitHub Avatar"
                className="w-16 h-16 rounded-full border-2 border-emerald-500/30 object-cover shrink-0"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center shrink-0">
                <Github className="w-8 h-8 text-emerald-500" />
              </div>
            )}

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-[#18181b] dark:text-[#f4f4f5]">
                  Suraj Jaiswal on GitHub
                </h3>
                <span className="font-mono text-xs text-[#71717a] dark:text-[#a1a1aa]">
                  @srj7042
                </span>
              </div>
              <p className="text-xs text-[#52525b] dark:text-[#a1a1aa] mt-1 max-w-md">
                Active repository contributions across computer vision, Python REST APIs, and full-stack web projects.
              </p>
            </div>
          </div>

          {/* Dynamic Metrics Badge if loaded successfully */}
          {!error && !loading && stats && (
            <div className="flex items-center gap-6 px-4 py-2.5 rounded-xl bg-[#faf8f5] dark:bg-[#1c1c21] border border-[#e4e4e7] dark:border-[#27272a] font-mono text-xs text-[#3f3f46] dark:text-[#d4d4d8]">
              <div className="text-center">
                <div className="font-bold text-base text-emerald-600 dark:text-emerald-400">{stats.publicRepos}</div>
                <div className="text-[10px] text-[#71717a] uppercase tracking-wider">Public Repos</div>
              </div>
              <div className="w-[1px] h-8 bg-[#e4e4e7] dark:bg-[#27272a]" />
              <div className="text-center">
                <div className="font-bold text-base text-emerald-600 dark:text-emerald-400">{stats.followers}</div>
                <div className="text-[10px] text-[#71717a] uppercase tracking-wider">Followers</div>
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="shrink-0 w-full md:w-auto">
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 dark:bg-emerald-500 text-white font-semibold text-sm hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors shadow-sm"
            >
              <Github className="w-4 h-4" />
              <span>View GitHub Profile</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
