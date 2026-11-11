import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { AnimationState } from './types';

interface CharacterModelProps {
  state: AnimationState;
  lookTarget: { x: number; y: number };
  onClick?: (hotspot: 'head' | 'body' | 'hand') => void;
  isFlipped?: boolean;
}

/**
 * CharacterModel renders the character in 3D WebGL space.
 * 
 * ARCHITECTURE FOR 3D GLB ASSETS:
 * When a rigged .glb model with embedded skeleton and animation clips is placed
 * at `/assets/character.glb`, this component can load it directly via:
 * ```tsx
 * const { scene, animations } = useGLTF('/assets/character.glb');
 * const { actions } = useAnimations(animations, group);
 * ```
 * 
 * FALLBACK ORTHOGRAPHIC 3D RIG:
 * When front and back orthographic renders are provided, this renders a two-sided
 * 3D character mesh in Three.js with front & back textures, physical depth,
 * dynamic lighting response, and procedural 3D skeletal transforms.
 */
export const CharacterModel: React.FC<CharacterModelProps> = ({
  state,
  lookTarget,
  onClick,
  isFlipped = false,
}) => {
  const rootGroupRef = useRef<THREE.Group>(null);
  const headGroupRef = useRef<THREE.Group>(null);
  const armGroupRef = useRef<THREE.Group>(null);
  const shadowMeshRef = useRef<THREE.Mesh>(null);

  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
  const frontTextureUrl = `${basePath}/assets/character.webp`;
  const backTextureUrl = `${basePath}/assets/character-back.webp`;

  // Load front and back textures with Three.js texture loader
  const [frontTexture, backTexture] = useLoader(THREE.TextureLoader, [
    frontTextureUrl,
    backTextureUrl,
  ]);

  useMemo(() => {
    frontTexture.colorSpace = THREE.SRGBColorSpace;
    frontTexture.generateMipmaps = true;
    frontTexture.minFilter = THREE.LinearMipmapLinearFilter;

    backTexture.colorSpace = THREE.SRGBColorSpace;
    backTexture.generateMipmaps = true;
    backTexture.minFilter = THREE.LinearMipmapLinearFilter;
  }, [frontTexture, backTexture]);

  // Front material
  const frontMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: frontTexture,
        transparent: true,
        alphaTest: 0.05,
        roughness: 0.45,
        metalness: 0.1,
        side: THREE.FrontSide,
      }),
    [frontTexture]
  );

  // Back material (mirrored horizontally so back hair/dress aligns with front silhouette)
  const backMaterial = useMemo(() => {
    const cloned = backTexture.clone();
    cloned.wrapS = THREE.RepeatWrapping;
    cloned.repeat.x = -1; // Flip texture coordinate for accurate rear alignment
    return new THREE.MeshStandardMaterial({
      map: cloned,
      transparent: true,
      alphaTest: 0.05,
      roughness: 0.45,
      metalness: 0.1,
      side: THREE.FrontSide,
    });
  }, [backTexture]);

  // Procedural 3D Frame Loop
  useFrame((stateContext, delta) => {
    const time = stateContext.clock.getElapsedTime();
    if (!rootGroupRef.current) return;

    // 1. Natural idle breathing & gentle vertical floating
    const idleBob = Math.sin(time * 2.2) * 0.05;
    const idleSway = Math.sin(time * 1.5) * 0.02;

    // 2. Head look-at cursor interpolation
    if (headGroupRef.current) {
      const targetLookY = lookTarget.x * 0.28;
      const targetLookX = -lookTarget.y * 0.2;
      headGroupRef.current.rotation.y = THREE.MathUtils.damp(
        headGroupRef.current.rotation.y,
        targetLookY,
        5,
        delta
      );
      headGroupRef.current.rotation.x = THREE.MathUtils.damp(
        headGroupRef.current.rotation.x,
        targetLookX,
        5,
        delta
      );
    }

    // 3. Animation State Responses
    let targetY = idleBob;
    let targetRotZ = idleSway;
    let targetScale = 1;

    switch (state) {
      case 'walk':
        targetY = Math.abs(Math.sin(time * 8)) * 0.12 - 0.02;
        targetRotZ = Math.sin(time * 8) * 0.08;
        break;

      case 'wave':
      case 'greeting':
        targetRotZ = Math.sin(time * 6) * 0.06;
        if (armGroupRef.current) {
          armGroupRef.current.rotation.z = Math.sin(time * 9) * 0.25 + 0.3;
        }
        break;

      case 'point':
        targetRotZ = -0.12;
        if (armGroupRef.current) {
          armGroupRef.current.rotation.z = 0.45;
        }
        break;

      case 'think':
        targetRotZ = 0.08;
        if (headGroupRef.current) {
          headGroupRef.current.rotation.z = 0.12;
        }
        break;

      case 'celebrate':
      case 'click_reaction':
        targetY = Math.abs(Math.sin(time * 12)) * 0.28;
        targetScale = 1.1 + Math.sin(time * 12) * 0.06;
        targetRotZ = Math.sin(time * 10) * 0.15;
        break;

      default:
        // idle
        if (armGroupRef.current) {
          armGroupRef.current.rotation.z = THREE.MathUtils.damp(
            armGroupRef.current.rotation.z,
            0,
            6,
            delta
          );
        }
        break;
    }

    // Interpolate root position and scale
    rootGroupRef.current.position.y = THREE.MathUtils.damp(
      rootGroupRef.current.position.y,
      targetY,
      8,
      delta
    );
    rootGroupRef.current.rotation.z = THREE.MathUtils.damp(
      rootGroupRef.current.rotation.z,
      targetRotZ,
      7,
      delta
    );
    rootGroupRef.current.scale.setScalar(
      THREE.MathUtils.damp(rootGroupRef.current.scale.x, targetScale, 8, delta)
    );

    // Dynamic ground shadow expansion
    if (shadowMeshRef.current) {
      const shadowScale = THREE.MathUtils.lerp(1, 0.7, Math.max(0, targetY * 3));
      shadowMeshRef.current.scale.set(shadowScale, shadowScale, shadowScale);
      (shadowMeshRef.current.material as THREE.MeshBasicMaterial).opacity =
        THREE.MathUtils.lerp(0.35, 0.15, Math.max(0, targetY * 3));
    }
  });

  const characterAspect = 310 / 531;
  const meshHeight = 2.4;
  const meshWidth = meshHeight * characterAspect;

  return (
    <group
      ref={rootGroupRef}
      rotation-y={isFlipped ? Math.PI : 0}
      position={[0, 0, 0]}
    >
      {/* Head Node for cursor look tracking */}
      <group ref={headGroupRef} position={[0, 0.4, 0]}>
        {/* Invisible hotspot for head click */}
        <mesh
          position={[0, 0.35, 0.05]}
          visible={false}
          onClick={(e) => {
            e.stopPropagation();
            onClick?.('head');
          }}
        >
          <sphereGeometry args={[0.45, 8, 8]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      </group>

      {/* Arm Node for gesture animations */}
      <group ref={armGroupRef} position={[0.4, 0.1, 0.02]}>
        {/* Invisible hotspot for hand click */}
        <mesh
          position={[0.1, -0.2, 0.05]}
          visible={false}
          onClick={(e) => {
            e.stopPropagation();
            onClick?.('hand');
          }}
        >
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      </group>

      {/* 3D Two-Sided Character Mesh (Front & Back orthographic alignment) */}
      <group position={[0, 0, 0]}>
        {/* Front Plane */}
        <mesh
          position={[0, 0, 0.005]}
          material={frontMaterial}
          castShadow
          onClick={(e) => {
            e.stopPropagation();
            onClick?.('body');
          }}
        >
          <planeGeometry args={[meshWidth, meshHeight, 16, 16]} />
        </mesh>

        {/* Back Plane (Facing backward Z < 0) */}
        <mesh
          position={[0, 0, -0.005]}
          rotation-y={Math.PI}
          material={backMaterial}
          castShadow
        >
          <planeGeometry args={[meshWidth, meshHeight, 16, 16]} />
        </mesh>
      </group>

      {/* Floating Ground Shadow */}
      <mesh
        ref={shadowMeshRef}
        position={[0, -meshHeight / 2 - 0.08, 0]}
        rotation-x={-Math.PI / 2}
      >
        <planeGeometry args={[0.85, 0.45]} />
        <meshBasicMaterial
          color="#064e3b"
          transparent
          opacity={0.3}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};
