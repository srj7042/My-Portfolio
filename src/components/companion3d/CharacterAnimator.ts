import { AnimationState, StateConfig } from './types';

export const STATE_CONFIGS: Record<AnimationState, StateConfig> = {
  idle: { name: 'idle', priority: 1, loop: true, defaultDuration: 0 },
  look: { name: 'look', priority: 2, loop: true, defaultDuration: 0 },
  walk: { name: 'walk', priority: 3, loop: true, defaultDuration: 0 },
  smile: { name: 'smile', priority: 4, loop: false, defaultDuration: 2500 },
  blink: { name: 'blink', priority: 4, loop: false, defaultDuration: 350 },
  think: { name: 'think', priority: 5, loop: false, defaultDuration: 3200 },
  point: { name: 'point', priority: 6, loop: false, defaultDuration: 2800 },
  wave: { name: 'wave', priority: 7, loop: false, defaultDuration: 2800 },
  greeting: { name: 'greeting', priority: 8, loop: false, defaultDuration: 3500 },
  surprised: { name: 'surprised', priority: 9, loop: false, defaultDuration: 1800 },
  celebrate: { name: 'celebrate', priority: 9, loop: false, defaultDuration: 2600 },
  click_reaction: { name: 'click_reaction', priority: 10, loop: false, defaultDuration: 1800 },
};

export class AnimationStateMachine {
  private currentState: AnimationState = 'idle';
  private stateTimer: NodeJS.Timeout | null = null;
  private onStateChangeCallback?: (newState: AnimationState, prevState: AnimationState) => void;

  constructor(onChange?: (newState: AnimationState, prevState: AnimationState) => void) {
    this.onStateChangeCallback = onChange;
  }

  public getCurrentState(): AnimationState {
    return this.currentState;
  }

  public transitionTo(targetState: AnimationState, force = false): boolean {
    if (this.currentState === targetState && !force) return false;

    const currentConfig = STATE_CONFIGS[this.currentState];
    const targetConfig = STATE_CONFIGS[targetState];

    // Priority check: only interrupt if target has >= priority or force is true
    if (!force && targetConfig.priority < currentConfig.priority) {
      return false;
    }

    const prevState = this.currentState;
    this.currentState = targetState;

    if (this.stateTimer) {
      clearTimeout(this.stateTimer);
      this.stateTimer = null;
    }

    // Auto-return to idle if the target state has a finite duration
    if (!targetConfig.loop && targetConfig.defaultDuration > 0) {
      this.stateTimer = setTimeout(() => {
        this.transitionTo('idle', true);
      }, targetConfig.defaultDuration);
    }

    this.onStateChangeCallback?.(this.currentState, prevState);
    return true;
  }

  public dispose() {
    if (this.stateTimer) {
      clearTimeout(this.stateTimer);
      this.stateTimer = null;
    }
  }
}

