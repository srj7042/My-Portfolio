import React, { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimationState, SectionName } from './types';

gsap.registerPlugin(ScrollTrigger);

interface ScrollCharacterControllerProps {
  onStateChange: (state: AnimationState) => void;
  onSectionDialogue: (dialogue: { message: string; emoji: string }) => void;
}

const SECTION_BEHAVIORS: Record<
  SectionName,
  { state: AnimationState; message: string; emoji: string }
> = {
  hero: {
    state: 'greeting',
    message: "Hi! Welcome to Suraj Jaiswal's portfolio! 👋",
    emoji: '✨',
  },
  about: {
    state: 'smile',
    message: "Suraj specializes in Applied AI, Computer Vision & Backends! 💡",
    emoji: '🧠',
  },
  skills: {
    state: 'point',
    message: "Here's the technical stack: PyTorch, FastAPI, React, SQL & more! ⚡",
    emoji: '🎯',
  },
  projects: {
    state: 'think',
    message: "Check out the 3D rotating cylinder project carousel! 🎡",
    emoji: '🚀',
  },
  experience: {
    state: 'smile',
    message: "Real-world engineering contributions and achievements! 💼",
    emoji: '📈',
  },
  education: {
    state: 'think',
    message: "Theoretical foundation & computer science specialization! 🎓",
    emoji: '📚',
  },
  github: {
    state: 'smile',
    message: "Take a look at Suraj's open-source GitHub repositories! 💻",
    emoji: '🐙',
  },
  contact: {
    state: 'wave',
    message: "Let's build something useful! Send an email or connect! 📬",
    emoji: '💌',
  },
};

export const ScrollCharacterController: React.FC<ScrollCharacterControllerProps> = ({
  onStateChange,
  onSectionDialogue,
}) => {
  const lastScrollYRef = useRef<number>(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const activeSectionRef = useRef<SectionName>('hero');

  const triggerSection = useCallback(
    (section: SectionName) => {
      activeSectionRef.current = section;
      const behavior = SECTION_BEHAVIORS[section];
      if (behavior) {
        onStateChange(behavior.state);
        onSectionDialogue({
          message: behavior.message,
          emoji: behavior.emoji,
        });
      }
    },
    [onSectionDialogue, onStateChange]
  );

  useEffect(() => {
    // Entrance animation on load
    const introTimer = setTimeout(() => {
      triggerSection('hero');
    }, 800);

    // Setup ScrollTriggers for each section
    const sections: SectionName[] = [
      'hero',
      'about',
      'skills',
      'projects',
      'experience',
      'education',
      'github',
      'contact',
    ];

    const triggers: ScrollTrigger[] = [];

    sections.forEach((sec) => {
      // Find element by id (or '#home' for hero)
      const elementId = sec === 'hero' ? 'home' : sec;
      const el = document.getElementById(elementId);
      if (!el) return;

      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 60%',
        end: 'bottom 60%',
        onEnter: () => triggerSection(sec),
        onEnterBack: () => triggerSection(sec),
      });

      triggers.push(st);
    });

    // Scroll velocity tracking for 'walk' state
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = Math.abs(currentScrollY - lastScrollYRef.current);
      lastScrollYRef.current = currentScrollY;

      if (diff > 4) {
        onStateChange('walk');
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          onStateChange('idle');
        }, 220);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(introTimer);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      triggers.forEach((st) => st.kill());
    };
  }, [triggerSection, onStateChange]);

  return null;
};
