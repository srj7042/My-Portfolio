import React from 'react';

export interface Particle {
  id: number;
  x: number;
  y: number;
  icon: string;
  size: number;
  color: string;
}

interface CharacterParticlesProps {
  particles: Particle[];
}

export const CharacterParticles: React.FC<CharacterParticlesProps> = ({ particles }) => {
  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute select-none animate-particle-float"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            fontSize: `${p.size}px`,
            color: p.color,
          }}
        >
          {p.icon}
        </span>
      ))}
    </div>
  );
};

