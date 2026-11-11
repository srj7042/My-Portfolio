import React from 'react';
import { CharacterRendererProps } from './types';

/**
 * CharacterImageRenderer renders the user's original 3D CGI-rendered anime character.
 * 
 * ARCHITECTURE NOTE FOR FUTURE 3D GLB/GLTF INTEGRATION:
 * When a rigged 3D model is ready, replace this component (or add a switch) with:
 * `<Canvas><Model url="/assets/character.glb" animation={state} ... /></Canvas>`.
 * The parent controller already manages state, orientation, and scroll coordinates.
 */
export const CharacterImageRenderer: React.FC<CharacterRendererProps> = ({
  state,
  isFlipped,
  tiltX,
  tiltY,
  isExcited,
  className = '',
}) => {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
  const webpSrc = `${basePath}/assets/character.webp`;
  const pngSrc = `${basePath}/assets/character.png`;

  return (
    <div
      data-companion-state={state}
      className={`relative select-none flex flex-col items-center justify-center ${className}`}
      style={{
        perspective: '700px',
      }}
    >
      {/* Dynamic 2.5D Transformed Character Wrapper */}
      <div
        className="relative transition-transform duration-150 ease-out will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          transform: `
            rotateX(${tiltX}deg)
            rotateY(${tiltY + (isFlipped ? 180 : 0)}deg)
            ${isExcited ? 'scale(1.08)' : 'scale(1)'}
          `,
        }}
      >
        {/* Soft Ambient Character Glow */}
        <div className="absolute inset-0 -m-2 rounded-full bg-emerald-500/10 dark:bg-emerald-400/15 blur-xl pointer-events-none -z-10" />

        {/* Character Image (WebP with PNG fallback) */}
        <picture>
          <source srcSet={webpSrc} type="image/webp" />
          <img
            src={pngSrc}
            alt="Suraj Jaiswal's 3D Anime AI Companion"
            width={160}
            height={274}
            className="w-28 sm:w-36 md:w-40 h-auto object-contain pointer-events-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.22)] dark:drop-shadow-[0_10px_25px_rgba(16,185,129,0.25)] transition-all duration-300"
            draggable={false}
          />
        </picture>
      </div>

      {/* Floating Ground Shadow (expands and contracts with floating height) */}
      <div
        className="mt-1 h-2 rounded-full bg-black/15 dark:bg-emerald-500/15 blur-[3px] transition-all duration-300 pointer-events-none"
        style={{
          width: isExcited ? '38px' : '48px',
          opacity: isExcited ? 0.35 : 0.6,
          transform: `scaleX(${isExcited ? 0.8 : 1})`,
        }}
      />
    </div>
  );
};
