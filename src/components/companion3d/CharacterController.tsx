import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimationStateMachine } from './CharacterAnimator';
import { CharacterModel } from './CharacterModel';
import { AnimationState } from './types';

interface CharacterControllerProps {
  externalState?: AnimationState;
  onReact?: (state: AnimationState) => void;
  isFlipped?: boolean;
}

export const CharacterController: React.FC<CharacterControllerProps> = ({
  externalState,
  onReact,
  isFlipped = false,
}) => {
  const [currentState, setCurrentState] = useState<AnimationState>('idle');
  const [lookTarget, setLookTarget] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const stateMachineRef = useRef<AnimationStateMachine | null>(null);

  useEffect(() => {
    stateMachineRef.current = new AnimationStateMachine((newState) => {
      setCurrentState(newState);
      onReact?.(newState);
    });

    return () => {
      stateMachineRef.current?.dispose();
    };
  }, [onReact]);

  // Synchronize with external state triggers (e.g. from ScrollTrigger)
  useEffect(() => {
    if (externalState && stateMachineRef.current) {
      stateMachineRef.current.transitionTo(externalState);
    }
  }, [externalState]);

  // Autonomous natural blinking & micro-expressions
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (stateMachineRef.current?.getCurrentState() === 'idle') {
        stateMachineRef.current.transitionTo('blink');
      }
    }, 4500 + Math.random() * 2000);

    const smileInterval = setInterval(() => {
      if (stateMachineRef.current?.getCurrentState() === 'idle') {
        stateMachineRef.current.transitionTo('smile');
      }
    }, 11000 + Math.random() * 5000);

    return () => {
      clearInterval(blinkInterval);
      clearInterval(smileInterval);
    };
  }, []);

  // Global cursor movement tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
      const normalizedY = -(e.clientY / window.innerHeight) * 2 + 1;
      setLookTarget({ x: normalizedX, y: normalizedY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle Hotspot Clicks
  const handleHotspotClick = useCallback(
    (hotspot: 'head' | 'body' | 'hand') => {
      if (!stateMachineRef.current) return;

      switch (hotspot) {
        case 'head':
          stateMachineRef.current.transitionTo('think', true);
          break;
        case 'hand':
          stateMachineRef.current.transitionTo('wave', true);
          break;
        case 'body':
        default: {
          const reactions: AnimationState[] = ['celebrate', 'surprised', 'smile'];
          const chosen = reactions[Math.floor(Math.random() * reactions.length)];
          stateMachineRef.current.transitionTo(chosen, true);
          break;
        }
      }
    },
    []
  );

  return (
    <CharacterModel
      state={currentState}
      lookTarget={lookTarget}
      onClick={handleHotspotClick}
      isFlipped={isFlipped}
    />
  );
};

