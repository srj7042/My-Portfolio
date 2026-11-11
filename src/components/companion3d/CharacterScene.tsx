import React, { useState, Suspense, useCallback, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { CharacterController } from './CharacterController';
import { ScrollCharacterController } from './ScrollCharacterController';
import { CharacterDialogue } from '../companion/CharacterDialogue';
import { CharacterParticles, Particle } from '../companion/CharacterParticles';
import { AnimationState } from './types';
import { Sparkles, EyeOff, MessageCircle } from 'lucide-react';

export const CharacterScene: React.FC = () => {
  const [animState, setAnimState] = useState<AnimationState>('idle');
  const [dialogue, setDialogue] = useState<{ message: string; emoji: string }>({
    message: "Hi! Welcome to Suraj Jaiswal's portfolio! 👋",
    emoji: '✨',
  });
  const [dialogueVisible, setDialogueVisible] = useState<boolean>(true);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [hasReducedMotion, setHasReducedMotion] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dialogueTimerRef = useRef<NodeJS.Timeout | null>(null);
  const particleIdRef = useRef<number>(0);

  // Check reduced motion
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setHasReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setHasReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  // Handle section dialogue updates from ScrollTrigger
  const handleSectionDialogue = useCallback(
    (newDialogue: { message: string; emoji: string }) => {
      setDialogue(newDialogue);
      setDialogueVisible(true);
      if (dialogueTimerRef.current) clearTimeout(dialogueTimerRef.current);
      dialogueTimerRef.current = setTimeout(() => {
        setDialogueVisible(false);
      }, 6000);
    },
    []
  );

  // Handle reaction trigger
  const handleReact = useCallback(
    (state: AnimationState) => {
      setAnimState(state);

      if ((state === 'celebrate' || state === 'click_reaction') && !hasReducedMotion) {
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

        setParticles(newParticles);
        setTimeout(() => setParticles([]), 1200);

        setDialogue({
          message: "You clicked me! Let's build something awesome! ✨",
          emoji: '💖',
        });
        setDialogueVisible(true);

        if (dialogueTimerRef.current) clearTimeout(dialogueTimerRef.current);
        dialogueTimerRef.current = setTimeout(() => {
          setDialogueVisible(false);
        }, 5500);
      }
    },
    []
  );

  return (
    <>
      {/* Minimized Docked Widget */}
      {isMinimized && (
        <aside
          aria-label="3D companion toggle"
          className="fixed bottom-4 right-4 z-40 transition-all duration-300"
        >
          <button
            onClick={() => {
              setIsMinimized(false);
              setDialogueVisible(true);
            }}
            className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/95 dark:bg-[#18181b]/95 backdrop-blur-md border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 shadow-xl hover:shadow-emerald-500/25 hover:scale-105 active:scale-95 transition-all text-xs font-semibold"
            title="Wake up 3D Character Companion"
          >
            <span className="w-5 h-5 rounded-full overflow-hidden bg-emerald-500/10 flex items-center justify-center shrink-0">
              <img
                src={`${import.meta.env.BASE_URL.replace(/\/$/, '')}/assets/character.webp`}
                alt="3D Companion"
                className="w-full h-full object-cover"
              />
            </span>
            <span>Wake 3D Companion</span>
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-emerald-500" />
          </button>
        </aside>
      )}

      {/* Main 3D Floating Companion Stage */}
      {!isMinimized && (
        <aside
          ref={containerRef}
          aria-label="3D Interactive Anime Character Companion"
          className="fixed bottom-4 sm:bottom-8 right-2 sm:right-6 md:right-8 z-30 pointer-events-none select-none w-48 sm:w-56 h-72 sm:h-80 flex flex-col items-center justify-end"
        >
          {/* ScrollTrigger Synchronization Controller */}
          <ScrollCharacterController
            onStateChange={setAnimState}
            onSectionDialogue={handleSectionDialogue}
          />

          {/* Contextual Speech Bubble */}
          <CharacterDialogue
            message={dialogue.message}
            emoji={dialogue.emoji}
            visible={dialogueVisible}
            onClose={() => setDialogueVisible(false)}
            position="left"
          />

          {/* Particle Burst Overlay */}
          <CharacterParticles particles={particles} />

          {/* Three.js WebGL Canvas Stage */}
          <div className="w-full h-full pointer-events-auto cursor-pointer relative">
            <Canvas
              camera={{ position: [0, 0, 3.8], fov: 42 }}
              gl={{
                alpha: true,
                antialias: true,
                powerPreference: 'high-performance',
              }}
              dpr={[1, 2]}
              className="w-full h-full"
            >
              {/* Studio Lighting Setup */}
              <ambientLight intensity={0.85} color="#ffffff" />
              <directionalLight
                position={[3, 5, 4]}
                intensity={1.4}
                color="#ffffff"
                castShadow
              />
              {/* Anime Emerald Rim Light */}
              <directionalLight
                position={[-3, 4, -3]}
                intensity={1.2}
                color="#10b981"
              />
              {/* Soft Fill Light */}
              <pointLight position={[0, -1, 2]} intensity={0.5} color="#e0e7ff" />

              <Suspense fallback={null}>
                <CharacterController
                  externalState={animState}
                  onReact={handleReact}
                  isFlipped={isFlipped}
                />
              </Suspense>
            </Canvas>
          </div>

          {/* Quick Companion Controls Bar */}
          <div className="mt-1 flex items-center gap-1.5 opacity-65 hover:opacity-100 transition-opacity pointer-events-auto">
            {/* Toggle Dialogue */}
            <button
              onClick={() => setDialogueVisible((prev) => !prev)}
              className="p-1 rounded-full bg-white/85 dark:bg-[#18181b]/85 border border-[#e4e4e7] dark:border-[#27272a] text-[#52525b] dark:text-[#a1a1aa] hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500/40 shadow-xs transition-colors"
              title={dialogueVisible ? 'Hide message' : 'Show message'}
              aria-label="Toggle message"
            >
              <MessageCircle className="w-3 h-3" />
            </button>

            {/* Turn Character */}
            <button
              onClick={() => setIsFlipped((prev) => !prev)}
              className="p-1 rounded-full bg-white/85 dark:bg-[#18181b]/85 border border-[#e4e4e7] dark:border-[#27272a] text-[#52525b] dark:text-[#a1a1aa] hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500/40 shadow-xs transition-colors"
              title="Turn 3D character"
              aria-label="Turn 3D character"
            >
              <span className="text-[10px] leading-none font-bold">⇄</span>
            </button>

            {/* Minimize */}
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1 rounded-full bg-white/85 dark:bg-[#18181b]/85 border border-[#e4e4e7] dark:border-[#27272a] text-[#52525b] dark:text-[#a1a1aa] hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500/40 shadow-xs transition-colors"
              title="Minimize 3D companion"
              aria-label="Minimize 3D companion"
            >
              <EyeOff className="w-3 h-3" />
            </button>
          </div>
        </aside>
      )}
    </>
  );
};
