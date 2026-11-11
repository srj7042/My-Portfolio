export type CompanionState =
  | 'idle'
  | 'floating'
  | 'walking'
  | 'excited'
  | 'speaking'
  | 'sleeping';

export type SectionId =
  | 'home'
  | 'about'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'education'
  | 'github'
  | 'contact';

/**
 * Interface contract for character visual renderer.
 * Designed to be modular: currently implemented with high-res 2.5D rendered WebP/PNG,
 * ready for drop-in replacement with a real-time Three.js / @react-three/fiber GLB/GLTF renderer.
 */
export interface CharacterRendererProps {
  state: CompanionState;
  isFlipped: boolean;
  tiltX: number;
  tiltY: number;
  isExcited: boolean;
  className?: string;
}

export interface DialogueMessage {
  text: string;
  emoji?: string;
}

