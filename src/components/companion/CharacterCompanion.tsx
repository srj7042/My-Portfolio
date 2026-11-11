import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import gsap from 'gsap';
import { CharacterImageRenderer } from './CharacterImageRenderer';
import { CharacterDialogue } from './CharacterDialogue';
import { CharacterParticles, Particle } from './CharacterParticles';
import { CompanionState, SectionId } from './types';
import { Sparkles, EyeOff, MessageCircle } from 'lucide-react';

const SECTION_DIALOGUES: Record<SectionId, { message: string; emoji: string }> = {
  home: {
    message: "Hi there! I'm Suraj's AI companion. Glad you stopped by! ✨",
    emoji: '👋',
  },
  about: {
    message: "Suraj specializes in Applied AI, Computer Vision & Backends! 🧠",
    emoji: '💡',
  },
  skills: {
    message: "Full-stack tools, PyTorch, YOLOv8, FastAPI, and scalable APIs! ⚡",
    emoji: '🛠️',
  },
  projects: {
    message: "Swipe or scroll sideways to rotate the 3D project cylinder! 🚀",
    emoji: '🌟',
  },
  experience: {
    message: "Check out Suraj's engineering internships and contributions! 💼",
    emoji: '📈',
  },
  education: {
    message: "Strong foundation in CS & specialization in AI systems! 🎓",
    emoji: '📚',
  },
  github: {
    message: "Peek at Suraj's open-source repositories and GitHub stats! 💻",
    emoji: '🐙',
  },
  contact: {
    message: "Let's build something great! Send Suraj a message anytime! 📬",
    emoji: '💌',
  },
};

const RANDOM_CLICK_QUOTES = [
  { message: "You clicked me! Let's build something awesome! ✨", emoji: '💖' },
  { message: "Fun fact: Suraj trains neural nets and crafts sleek UI! 🤖", emoji: '✨' },
  { message: "Need a high-performance backend? You're in the right place! ⚡", emoji: '🔥' },
  { message: "Enjoying the 3D project carousel? Try spinning it! 🎡", emoji: '🌟' },
  { message: "Keep scrolling to explore more of Suraj's work! 🚀", emoji: '💫' },
  { message: "Always ready to collaborate on innovative software! 🤝", emoji: '🎉' },
];

export const CharacterCompanion: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const bobbingTweenRef = useRef<gsap.core.Tween | null>(null);

  const [companionState, setCompanionState] = useState<CompanionState>('idle');
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [currentDialogue, setCurrentDialogue] = useState<{ message: string; emoji: string }>({
    message: SECTION_DIALOGUES.home.message,
    emoji: SECTION_DIALOGUES.home.emoji,
  });
  const [dialogueVisible, setDialogueVisible] = useState<boolean>(true);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isExcited, setIsExcited] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [hasReducedMotion, setHasReducedMotion] = useState<boolean>(false);

  const lastScrollYRef = useRef<number>(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dialogueTimerRef = useRef<NodeJS.Timeout | null>(null);
  const particleIdRef = useRef<number>(0);

  // Check user preference for reduced motion
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setHasReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setHasReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  // Idle floating bobbing animation using GSAP
  useEffect(() => {
    if (hasReducedMotion || isMinimized || !characterRef.current) return;

    // Smooth sinusoidal floating physics
    bobbingTweenRef.current = gsap.to(characterRef.current, {
      y: -14,
      rotation: 1.5,
      duration: 2.2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    return () => {
      bobbingTweenRef.current?.kill();
    };
  }, [hasReducedMotion, isMinimized]);

  // Mouse move parallax: tilts character subtly towards user's cursor
  useEffect(() => {
    if (hasReducedMotion || isMinimized) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!characterRef.current) return;
      const rect = characterRef.current.getBoundingClientRect();
      const charCenterX = rect.left + rect.width / 2;
      const charCenterY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - charCenterX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - charCenterY) / (window.innerHeight / 2);

      // Clamp tilt to subtle, natural angles (max ~7 degrees)
      const targetTiltY = Math.max(-8, Math.min(8, deltaX * 8));
      const targetTiltX = Math.max(-6, Math.min(6, -deltaY * 6));

      setTilt({ x: targetTiltX, y: targetTiltY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [hasReducedMotion, isMinimized]);

  // Section observer & scroll tracking
  useEffect(() => {
    const sectionIds: SectionId[] = [
      'home',
      'about',
      'skills',
      'projects',
      'experience',
      'education',
      'github',
      'contact',
    ];

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = currentScrollY - lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      // Scroll progress percentage (0 to 1)
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? currentScrollY / docHeight : 0;

      // Smooth vertical tracking along screen edge
      if (containerRef.current && !hasReducedMotion && !isMinimized) {
        // Vertical translation range: moves between top and bottom bounds
        const targetY = scrollProgress * 140 - 70; // moves subtly in [-70px, 70px]
        const tiltAngle = Math.max(-6, Math.min(6, scrollDiff * 0.15));

        gsap.to(containerRef.current, {
          y: targetY,
          rotation: tiltAngle,
          duration: 0.5,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }

      // Detect walking/movement state
      if (Math.abs(scrollDiff) > 2) {
        setCompanionState('walking');
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          setCompanionState('idle');
          if (containerRef.current && !hasReducedMotion) {
            gsap.to(containerRef.current, {
              rotation: 0,
              duration: 0.6,
              ease: 'elastic.out(1, 0.4)',
            });
          }
        }, 180);
      }

      // Detect current visible section
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            if (activeSection !== id) {
              setActiveSection(id);
              const data = SECTION_DIALOGUES[id];
              if (data) {
                setCurrentDialogue(data);
                setDialogueVisible(true);
                // Auto hide dialogue after 6 seconds
                if (dialogueTimerRef.current) clearTimeout(dialogueTimerRef.current);
                dialogueTimerRef.current = setTimeout(() => {
                  setDialogueVisible(false);
                }, 6000);
              }
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (dialogueTimerRef.current) clearTimeout(dialogueTimerRef.current);
    };
  }, [activeSection, hasReducedMotion, isMinimized]);

  // Listen to navigation clicks to animate companion traveling towards the destination
  useEffect(() => {
    const handleNavClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href || href === '#') return;

      // Excited escort hop & flip
      triggerEscortAnimation();
    };

    document.addEventListener('click', handleNavClick);
    return () => document.removeEventListener('click', handleNavClick);
  }, []);

  // Travel / Escort animation when moving between sections
  const triggerEscortAnimation = useCallback(() => {
    if (!characterRef.current || hasReducedMotion) return;

    setIsExcited(true);
    setCompanionState('excited');

    const tl = gsap.timeline({
      onComplete: () => {
        setIsExcited(false);
        setCompanionState('idle');
      },
    });

    tl.to(characterRef.current, {
      y: -30,
      scale: 1.15,
      rotation: -10,
      duration: 0.35,
      ease: 'back.out(2)',
    })
      .to(characterRef.current, {
        rotation: 10,
        duration: 0.25,
        ease: 'power1.inOut',
      })
      .to(characterRef.current, {
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 0.4,
        ease: 'elastic.out(1.2, 0.5)',
      });
  }, [hasReducedMotion]);

  // Click reaction on character: joyful bounce, particles & speech bubble
  const handleCharacterClick = useCallback(() => {
    if (isMinimized) {
      setIsMinimized(false);
      return;
    }

    setIsExcited(true);
    setCompanionState('excited');

    // Spawn particle burst
    const newParticles: Particle[] = [];
    const emojis = ['✨', '💚', '⭐', '💫', '💖'];
    const colors = ['#10b981', '#34d399', '#6ee7b7', '#f59e0b', '#ec4899'];

    for (let i = 0; i < 7; i++) {
      particleIdRef.current += 1;
      const angle = (i / 7) * Math.PI * 2;
      const distance = 40 + Math.random() * 30;
      newParticles.push({
        id: particleIdRef.current,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance - 20,
        icon: emojis[i % emojis.length],
        size: 14 + Math.floor(Math.random() * 10),
        color: colors[i % colors.length],
      });
    }

    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles([]);
    }, 1200);

    // Pick a random exciting quote
    const randomQuote =
      RANDOM_CLICK_QUOTES[
        Math.floor(Math.random() * RANDOM_CLICK_QUOTES.length)
      ];
    setCurrentDialogue(randomQuote);
    setDialogueVisible(true);

    if (dialogueTimerRef.current) clearTimeout(dialogueTimerRef.current);
    dialogueTimerRef.current = setTimeout(() => {
      setDialogueVisible(false);
    }, 5500);

    // GSAP Excited Bounce Animation
    if (characterRef.current && !hasReducedMotion) {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsExcited(false);
          setCompanionState('idle');
        },
      });

      tl.to(characterRef.current, {
        y: -36,
        scaleX: 1.18,
        scaleY: 1.18,
        rotation: -12,
        duration: 0.28,
        ease: 'back.out(2.5)',
      })
        .to(characterRef.current, {
          rotation: 12,
          duration: 0.22,
          ease: 'power1.inOut',
        })
        .to(characterRef.current, {
          y: 0,
          scaleX: 1,
          scaleY: 1,
          rotation: 0,
          duration: 0.45,
          ease: 'elastic.out(1.1, 0.4)',
        });
    } else {
      setTimeout(() => {
        setIsExcited(false);
        setCompanionState('idle');
      }, 700);
    }
  }, [hasReducedMotion, isMinimized]);

  // Initial greeting speech bubble timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setDialogueVisible(true);
    }, 1200);

    dialogueTimerRef.current = setTimeout(() => {
      setDialogueVisible(false);
    }, 7000);

    return () => {
      clearTimeout(timer);
      if (dialogueTimerRef.current) clearTimeout(dialogueTimerRef.current);
    };
  }, []);

  return (
    <>
      {/* Minimized Docked Widget (When user clicks hide / sleep) */}
      {isMinimized && (
        <aside
          aria-label="Portfolio companion toggle"
          className="fixed bottom-4 right-4 z-40 transition-all duration-300"
        >
          <button
            onClick={() => {
              setIsMinimized(false);
              setDialogueVisible(true);
            }}
            className="group flex items-center gap-2 px-3 py-2 rounded-full bg-white/90 dark:bg-[#18181b]/90 backdrop-blur-md border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 shadow-lg hover:shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all text-xs font-semibold"
            title="Wake up AI Companion"
          >
            <span className="w-5 h-5 rounded-full overflow-hidden bg-emerald-500/10 flex items-center justify-center shrink-0">
              <img
                src={`${import.meta.env.BASE_URL.replace(/\/$/, '')}/assets/character.webp`}
                alt="AI Companion"
                className="w-full h-full object-cover"
              />
            </span>
            <span>Wake Companion</span>
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-emerald-500" />
          </button>
        </aside>
      )}

      {/* Main Floating Companion Container */}
      {!isMinimized && (
        <aside
          ref={containerRef}
          aria-label="Floating AI companion"
          className="fixed bottom-6 sm:bottom-10 right-3 sm:right-6 md:right-8 lg:right-10 z-30 pointer-events-none select-none transition-opacity duration-300"
          style={{
            willChange: 'transform',
          }}
        >
          <div className="relative flex flex-col items-center">
            {/* Contextual Speech Bubble */}
            <CharacterDialogue
              message={currentDialogue.message}
              emoji={currentDialogue.emoji}
              visible={dialogueVisible}
              onClose={() => setDialogueVisible(false)}
              position="left"
            />

            {/* Particle Burst Overlay */}
            <CharacterParticles particles={particles} />

            {/* Interactive Character Body */}
            <div
              ref={characterRef}
              onClick={handleCharacterClick}
              role="button"
              tabIndex={0}
              aria-label="Interactive anime character companion. Click for a reaction!"
              className="pointer-events-auto cursor-pointer relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-3xl"
              title="Click me for a reaction!"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCharacterClick();
                }
              }}
            >
              <CharacterImageRenderer
                state={companionState}
                isFlipped={isFlipped}
                tiltX={tilt.x}
                tiltY={tilt.y}
                isExcited={isExcited}
              />

              {/* Click Me Hover Pill */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white font-mono text-[9px] font-bold shadow-sm whitespace-nowrap tracking-wider flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>Click Me!</span>
                </span>
              </div>
            </div>

            {/* Controls Bar (Minimize / Speech bubble trigger) */}
            <div className="mt-2.5 flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity pointer-events-auto">
              {/* Dialogue Toggle Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDialogueVisible((prev) => !prev);
                }}
                className="p-1 rounded-full bg-white/80 dark:bg-[#18181b]/80 border border-[#e4e4e7] dark:border-[#27272a] text-[#52525b] dark:text-[#a1a1aa] hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500/40 shadow-xs transition-colors"
                title={dialogueVisible ? 'Hide message' : 'Show message'}
                aria-label="Toggle companion message"
              >
                <MessageCircle className="w-3 h-3" />
              </button>

              {/* Flip Direction Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped((prev) => !prev);
                }}
                className="p-1 rounded-full bg-white/80 dark:bg-[#18181b]/80 border border-[#e4e4e7] dark:border-[#27272a] text-[#52525b] dark:text-[#a1a1aa] hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500/40 shadow-xs transition-colors"
                title="Turn character"
                aria-label="Turn character"
              >
                <span className="text-[10px] leading-none font-bold">⇄</span>
              </button>

              {/* Sleep / Minimize Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMinimized(true);
                }}
                className="p-1 rounded-full bg-white/80 dark:bg-[#18181b]/80 border border-[#e4e4e7] dark:border-[#27272a] text-[#52525b] dark:text-[#a1a1aa] hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500/40 shadow-xs transition-colors"
                title="Minimize companion"
                aria-label="Minimize companion"
              >
                <EyeOff className="w-3 h-3" />
              </button>
            </div>
          </div>
        </aside>
      )}
    </>
  );
};
