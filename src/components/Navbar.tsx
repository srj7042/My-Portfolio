import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { personalInfo } from '../data/portfolio';
import { Sun, Moon, Github, Linkedin, Menu, X, FileText } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#education' },
  { name: 'GitHub', href: '#github' },
  { name: 'Contact', href: '#contact' },
];

interface NavbarProps {
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#faf8f5]/80 dark:bg-[#09090b]/80 border-b border-[#e4e4e7]/60 dark:border-[#27272a]/60 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a 
          href="#home" 
          className="group flex items-center gap-2 font-bold text-lg text-[#18181b] dark:text-[#f4f4f5] hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          aria-label="Suraj Jaiswal Home"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-mono text-sm font-semibold group-hover:bg-emerald-500 group-hover:text-white transition-all">
            SJ
          </span>
          <span className="hidden sm:inline-block font-mono tracking-tight text-sm font-semibold">
            Suraj Jaiswal
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-[#52525b] dark:text-[#a1a1aa] hover:text-[#18181b] dark:hover:text-[#f4f4f5] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-emerald-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Right Side Tools & CTAs */}
        <div className="flex items-center gap-3">
          
          {/* GitHub Icon */}
          <a
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-[#52525b] dark:text-[#a1a1aa] hover:text-[#18181b] dark:hover:text-[#f4f4f5] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* LinkedIn Icon */}
          {personalInfo.social.linkedin && (
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-[#52525b] dark:text-[#a1a1aa] hover:text-[#18181b] dark:hover:text-[#f4f4f5] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-[#52525b] dark:text-[#a1a1aa] hover:text-[#18181b] dark:hover:text-[#f4f4f5] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-emerald-600" />
            )}
          </button>

          {/* Resume Button */}
          <button
            onClick={onOpenResume}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors shadow-sm"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#52525b] dark:text-[#a1a1aa] hover:text-[#18181b] dark:hover:text-[#f4f4f5] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#e4e4e7] dark:border-[#27272a] bg-[#faf8f5] dark:bg-[#09090b] px-4 pt-2 pb-4 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-[#52525b] dark:text-[#a1a1aa] hover:text-[#18181b] dark:hover:text-[#f4f4f5] hover:bg-emerald-500/10 transition-colors"
            >
              {item.name}
            </a>
          ))}
          <div className="pt-2 border-t border-[#e4e4e7] dark:border-[#27272a] flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="flex items-center gap-2 px-4 py-2 w-full text-center justify-center text-xs font-semibold rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>View Resume Summary</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
