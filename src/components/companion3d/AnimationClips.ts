import * as THREE from 'three';
import { AnimationState } from './types';

/**
 * Creates reusable Three.js AnimationClip objects with Disney/Pixar-inspired animation curves,
 * secondary motion, anticipation, and settle physics.
 */

// Helper to convert Euler degrees to Quaternion components
function eulerToQuat(xDeg: number, yDeg: number, zDeg: number): [number, number, number, number] {
  const e = new THREE.Euler(
    THREE.MathUtils.degToRad(xDeg),
    THREE.MathUtils.degToRad(yDeg),
    THREE.MathUtils.degToRad(zDeg),
    'XYZ'
  );
  const q = new THREE.Quaternion().setFromEuler(e);
  return [q.x, q.y, q.z, q.w];
}

/**
 * 1. IDLE CLIP: Gentle breathing, subtle body sway, relaxed hand float.
 */
export function createIdleClip(): THREE.AnimationClip {
  const times = [0, 1.5, 3.0];

  // Root vertical breathing bob
  const rootPos = new THREE.VectorKeyframeTrack(
    'Root.position',
    times,
    [0, 0, 0, 0, 0.045, 0, 0, 0, 0],
    THREE.InterpolateSmooth
  );

  // Subtle chest breathing scale
  const rootScale = new THREE.VectorKeyframeTrack(
    'Root.scale',
    times,
    [1, 1, 1, 1.02, 1.025, 1, 1, 1, 1],
    THREE.InterpolateSmooth
  );

  // Gentle head curiosity sway
  const headQ = new THREE.QuaternionKeyframeTrack(
    'Head.quaternion',
    times,
    [
      ...eulerToQuat(0, 0, -1.2),
      ...eulerToQuat(2, 3, 1.5),
      ...eulerToQuat(0, 0, -1.2),
    ],
    THREE.InterpolateSmooth
  );

  return new THREE.AnimationClip('Idle', 3.0, [rootPos, rootScale, headQ]);
}

/**
 * 2. GREETING CLIP: Turns to viewer, smiles warmly, raises hand, cute 3-wave cycle, head tilt.
 */
export function createGreetingClip(): THREE.AnimationClip {
  const times = [0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.2];

  const rootPos = new THREE.VectorKeyframeTrack(
    'Root.position',
    times,
    [0, 0, 0, 0, 0.06, 0, 0, 0.04, 0, 0, 0.05, 0, 0, 0.04, 0, 0, 0.03, 0, 0, 0, 0],
    THREE.InterpolateSmooth
  );

  const headQ = new THREE.QuaternionKeyframeTrack(
    'Head.quaternion',
    times,
    [
      ...eulerToQuat(0, 0, 0),
      ...eulerToQuat(4, -4, 4), // warm welcoming tilt
      ...eulerToQuat(2, 3, -3),
      ...eulerToQuat(4, -4, 4),
      ...eulerToQuat(2, 3, -3),
      ...eulerToQuat(3, 0, 2),
      ...eulerToQuat(0, 0, 0),
    ],
    THREE.InterpolateSmooth
  );

  const armQ = new THREE.QuaternionKeyframeTrack(
    'RightArm.quaternion',
    times,
    [
      ...eulerToQuat(0, 0, 0),
      ...eulerToQuat(0, 0, 35), // raise hand
      ...eulerToQuat(0, 0, 20), // wave left
      ...eulerToQuat(0, 0, 42), // wave right
      ...eulerToQuat(0, 0, 20), // wave left
      ...eulerToQuat(0, 0, 38), // wave right
      ...eulerToQuat(0, 0, 0), // return smoothly
    ],
    THREE.InterpolateSmooth
  );

  return new THREE.AnimationClip('Greeting', 3.2, [rootPos, headQ, armQ]);
}

/**
 * 3. WAVE CLIP: Fluid side-to-side waving gesture with natural wrist/arm overshoot.
 */
export function createWaveClip(): THREE.AnimationClip {
  const times = [0, 0.4, 0.8, 1.2, 1.6, 2.0, 2.4];

  const armQ = new THREE.QuaternionKeyframeTrack(
    'RightArm.quaternion',
    times,
    [
      ...eulerToQuat(0, 0, 0),
      ...eulerToQuat(0, 0, 45),
      ...eulerToQuat(0, 0, 22),
      ...eulerToQuat(0, 0, 45),
      ...eulerToQuat(0, 0, 22),
      ...eulerToQuat(0, 0, 42),
      ...eulerToQuat(0, 0, 0),
    ],
    THREE.InterpolateSmooth
  );

  const headQ = new THREE.QuaternionKeyframeTrack(
    'Head.quaternion',
    times,
    [
      ...eulerToQuat(0, 0, 0),
      ...eulerToQuat(3, 0, 4),
      ...eulerToQuat(2, 0, -3),
      ...eulerToQuat(3, 0, 4),
      ...eulerToQuat(2, 0, -3),
      ...eulerToQuat(2, 0, 2),
      ...eulerToQuat(0, 0, 0),
    ],
    THREE.InterpolateSmooth
  );

  return new THREE.AnimationClip('Wave', 2.4, [armQ, headQ]);
}

/**
 * 4. SMILE CLIP: Uplifting facial perk, head perk, affectionate eye curve.
 */
export function createSmileClip(): THREE.AnimationClip {
  const times = [0, 0.4, 1.6, 2.2];

  const rootPos = new THREE.VectorKeyframeTrack(
    'Root.position',
    times,
    [0, 0, 0, 0, 0.05, 0, 0, 0.04, 0, 0, 0, 0],
    THREE.InterpolateSmooth
  );

  const headQ = new THREE.QuaternionKeyframeTrack(
    'Head.quaternion',
    times,
    [
      ...eulerToQuat(0, 0, 0),
      ...eulerToQuat(-4, 0, 5), // cute perky head tilt
      ...eulerToQuat(-3, 0, 4),
      ...eulerToQuat(0, 0, 0),
    ],
    THREE.InterpolateSmooth
  );

  return new THREE.AnimationClip('Smile', 2.2, [rootPos, headQ]);
}

/**
 * 5. BLINK CLIP: Quick, natural eye closure and reopening (0.32s).
 */
export function createBlinkClip(): THREE.AnimationClip {
  const times = [0, 0.12, 0.22, 0.32];
  const blinkTrack = new THREE.NumberKeyframeTrack(
    'Face.morphTargetInfluences[blink]',
    times,
    [0, 1, 0.8, 0],
    THREE.InterpolateLinear
  );

  return new THREE.AnimationClip('Blink', 0.32, [blinkTrack]);
}

/**
 * 6. WALK CLIP: Coordinated stride cycle, body bounce, foot contact rhythm.
 */
export function createWalkClip(): THREE.AnimationClip {
  const times = [0, 0.3, 0.6, 0.9, 1.2];

  // Double-bounce per full walk cycle
  const rootPos = new THREE.VectorKeyframeTrack(
    'Root.position',
    times,
    [0, 0, 0, 0, 0.09, 0, 0, 0, 0, 0, 0.09, 0, 0, 0, 0],
    THREE.InterpolateSmooth
  );

  const rootRot = new THREE.QuaternionKeyframeTrack(
    'Root.quaternion',
    times,
    [
      ...eulerToQuat(3, 0, 3),
      ...eulerToQuat(2, 0, -2),
      ...eulerToQuat(3, 0, 3),
      ...eulerToQuat(2, 0, -2),
      ...eulerToQuat(3, 0, 3),
    ],
    THREE.InterpolateSmooth
  );

  // Arm swinging
  const rightArmQ = new THREE.QuaternionKeyframeTrack(
    'RightArm.quaternion',
    times,
    [
      ...eulerToQuat(-15, 0, 8),
      ...eulerToQuat(15, 0, 8),
      ...eulerToQuat(-15, 0, 8),
      ...eulerToQuat(15, 0, 8),
      ...eulerToQuat(-15, 0, 8),
    ],
    THREE.InterpolateSmooth
  );

  return new THREE.AnimationClip('Walk', 1.2, [rootPos, rootRot, rightArmQ]);
}

/**
 * 7. POINT CLIP: Arm reaches toward portfolio content, leaning body weight.
 */
export function createPointClip(): THREE.AnimationClip {
  const times = [0, 0.4, 1.8, 2.5];

  const headQ = new THREE.QuaternionKeyframeTrack(
    'Head.quaternion',
    times,
    [
      ...eulerToQuat(0, 0, 0),
      ...eulerToQuat(0, -12, -4), // look towards pointed area
      ...eulerToQuat(2, 6, 2), // look back at visitor
      ...eulerToQuat(0, 0, 0),
    ],
    THREE.InterpolateSmooth
  );

  const armQ = new THREE.QuaternionKeyframeTrack(
    'RightArm.quaternion',
    times,
    [
      ...eulerToQuat(0, 0, 0),
      ...eulerToQuat(0, -10, 48), // confident point
      ...eulerToQuat(0, -8, 45),
      ...eulerToQuat(0, 0, 0),
    ],
    THREE.InterpolateSmooth
  );

  return new THREE.AnimationClip('Point', 2.5, [headQ, armQ]);
}

/**
 * 8. THINK CLIP: Hand to chin, head tilted in contemplation, gentle thinking sway.
 */
export function createThinkClip(): THREE.AnimationClip {
  const times = [0, 0.5, 1.5, 2.4, 3.0];

  const headQ = new THREE.QuaternionKeyframeTrack(
    'Head.quaternion',
    times,
    [
      ...eulerToQuat(0, 0, 0),
      ...eulerToQuat(-6, 8, 9), // chin up, tilted head
      ...eulerToQuat(-4, 10, 11),
      ...eulerToQuat(-5, 6, 8),
      ...eulerToQuat(0, 0, 0),
    ],
    THREE.InterpolateSmooth
  );

  const armQ = new THREE.QuaternionKeyframeTrack(
    'RightArm.quaternion',
    times,
    [
      ...eulerToQuat(0, 0, 0),
      ...eulerToQuat(15, 0, 32), // hand brought near chin
      ...eulerToQuat(18, 0, 34),
      ...eulerToQuat(14, 0, 30),
      ...eulerToQuat(0, 0, 0),
    ],
    THREE.InterpolateSmooth
  );

  return new THREE.AnimationClip('Think', 3.0, [headQ, armQ]);
}

/**
 * 9. CELEBRATE CLIP: Excited hop, cheerful double arms, joyful wiggle.
 */
export function createCelebrateClip(): THREE.AnimationClip {
  const times = [0, 0.35, 0.7, 1.05, 1.4, 2.2];

  // Joyful double bounce
  const rootPos = new THREE.VectorKeyframeTrack(
    'Root.position',
    times,
    [0, 0, 0, 0, 0.28, 0, 0, 0.02, 0, 0, 0.24, 0, 0, 0, 0, 0, 0, 0],
    THREE.InterpolateSmooth
  );

  const rootScale = new THREE.VectorKeyframeTrack(
    'Root.scale',
    times,
    [1, 1, 1, 1.14, 1.14, 1, 1.02, 1.02, 1, 1.12, 1.12, 1, 1, 1, 1, 1, 1, 1],
    THREE.InterpolateSmooth
  );

  const headQ = new THREE.QuaternionKeyframeTrack(
    'Head.quaternion',
    times,
    [
      ...eulerToQuat(0, 0, 0),
      ...eulerToQuat(-6, 0, -8),
      ...eulerToQuat(2, 0, 6),
      ...eulerToQuat(-4, 0, -6),
      ...eulerToQuat(0, 0, 4),
      ...eulerToQuat(0, 0, 0),
    ],
    THREE.InterpolateSmooth
  );

  const armQ = new THREE.QuaternionKeyframeTrack(
    'RightArm.quaternion',
    times,
    [
      ...eulerToQuat(0, 0, 0),
      ...eulerToQuat(0, 0, 52), // raised in triumph
      ...eulerToQuat(0, 0, 38),
      ...eulerToQuat(0, 0, 52),
      ...eulerToQuat(0, 0, 30),
      ...eulerToQuat(0, 0, 0),
    ],
    THREE.InterpolateSmooth
  );

  return new THREE.AnimationClip('Celebrate', 2.2, [rootPos, rootScale, headQ, armQ]);
}

/**
 * 10. SURPRISED CLIP: Cute recoil, wide posture, startled hop.
 */
export function createSurprisedClip(): THREE.AnimationClip {
  const times = [0, 0.18, 0.6, 1.1, 1.6];

  const rootPos = new THREE.VectorKeyframeTrack(
    'Root.position',
    times,
    [0, 0, 0, 0, 0.16, -0.08, 0, 0.04, -0.02, 0, 0.01, 0, 0, 0, 0],
    THREE.InterpolateSmooth
  );

  const rootScale = new THREE.VectorKeyframeTrack(
    'Root.scale',
    times,
    [1, 1, 1, 1.12, 1.15, 1, 1.04, 1.04, 1, 1, 1, 1, 1, 1, 1],
    THREE.InterpolateSmooth
  );

  const headQ = new THREE.QuaternionKeyframeTrack(
    'Head.quaternion',
    times,
    [
      ...eulerToQuat(0, 0, 0),
      ...eulerToQuat(-10, 0, 0), // head pulled back in sudden surprise
      ...eulerToQuat(-5, 0, 3),
      ...eulerToQuat(-2, 0, 1),
      ...eulerToQuat(0, 0, 0),
    ],
    THREE.InterpolateSmooth
  );

  return new THREE.AnimationClip('Surprised', 1.6, [rootPos, rootScale, headQ]);
}

/**
 * Animation Clip Library Registry
 */
export const CHARACTER_ANIMATION_CLIPS: Record<AnimationState, () => THREE.AnimationClip> = {
  idle: createIdleClip,
  greeting: createGreetingClip,
  wave: createWaveClip,
  smile: createSmileClip,
  blink: createBlinkClip,
  walk: createWalkClip,
  point: createPointClip,
  think: createThinkClip,
  celebrate: createCelebrateClip,
  surprised: createSurprisedClip,
  look: createIdleClip,
  click_reaction: createCelebrateClip,
};
