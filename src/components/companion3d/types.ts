export type AnimationState =
  | 'idle'
  | 'wave'
  | 'smile'
  | 'blink'
  | 'look'
  | 'walk'
  | 'point'
  | 'think'
  | 'celebrate'
  | 'greeting'
  | 'click_reaction';

export type SectionName =
  | 'hero'
  | 'about'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'education'
  | 'github'
  | 'contact';

export interface StateConfig {
  name: AnimationState;
  priority: number; // Higher priority interrupts lower
  loop: boolean;
  defaultDuration: number; // ms before returning to idle if not looping
}

export interface CharacterTransform {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}

export interface SectionPoseConfig {
  section: SectionName;
  state: AnimationState;
  position: [number, number, number];
  rotation: [number, number, number];
  dialogue: {
    message: string;
    emoji: string;
  };
}
