import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VRMLoaderPlugin, VRM } from '@pixiv/three-vrm';
import { createVRMWaveClip } from './mixamoVRMRig';
import { Sparkles, RefreshCw, Hand, Info } from 'lucide-react';

interface VRMHeroCharacterProps {
  modelUrl?: string;
  className?: string;
}

export const VRMHeroCharacter: React.FC<VRMHeroCharacterProps> = ({
  modelUrl = '/models/character.vrm',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Loading & Error States
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isWaving, setIsWaving] = useState<boolean>(false);
  const [smileScore, setSmileScore] = useState<number>(0.2);

  // References to keep throughout render loop
  const vrmRef = useRef<VRM | null>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const waveActionRef = useRef<THREE.AnimationAction | null>(null);
  const mouseRef = useRef<{ x: number; y: number; distance: number }>({
    x: 0,
    y: 0,
    distance: 1,
  });
  const blinkStateRef = useRef<{ isBlinking: boolean; nextBlinkTime: number; blinkProgress: number }>({
    isBlinking: false,
    nextBlinkTime: 3.5,
    blinkProgress: 0,
  });
  const lookTargetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 1.25, 2));

  // Trigger Wave Animation
  const triggerWave = useCallback(() => {
    if (waveActionRef.current) {
      setIsWaving(true);
      waveActionRef.current.reset();
      waveActionRef.current.setLoop(THREE.LoopOnce, 1);
      waveActionRef.current.clampWhenFinished = true;
      waveActionRef.current.fadeIn(0.2).play();

      setTimeout(() => {
        setIsWaving(false);
      }, 2600);
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let animationFrameId: number;
    let isTabVisible = true;
    let clock = new THREE.Clock();

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup (framed for upper-body & full chibi proportions)
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      20
    );
    camera.position.set(0, 0.70, 2.15);
    camera.lookAt(0, 0.65, 0);

    // 3. WebGL Renderer with Transparent Canvas
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    // 4. Soft Studio Lighting
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    // Key light with soft shadow
    const keyLight = new THREE.DirectionalLight(0xfff5ea, 1.3);
    keyLight.position.set(2.5, 4.0, 3.0);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    // Anime Signature Emerald Rim Light (Back-Top)
    const rimLight = new THREE.DirectionalLight(0x10b981, 1.25);
    rimLight.position.set(-2.5, 3.5, -2.5);
    scene.add(rimLight);

    // Soft Fill Point Light
    const fillLight = new THREE.PointLight(0xdbeafe, 0.45, 10);
    fillLight.position.set(0, 0.8, 1.5);
    scene.add(fillLight);

    // 5. LookAt Target Anchor
    const lookAtAnchor = new THREE.Object3D();
    lookAtAnchor.position.set(0, 1.25, 2.0);
    scene.add(lookAtAnchor);

    // 6. Base URL Path Resolution for GitHub Pages & Dev
    const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
    const resolvedUrl = modelUrl.startsWith('http')
      ? modelUrl
      : `${basePath}${modelUrl.startsWith('/') ? '' : '/'}${modelUrl}`;

    // 7. VRM Loader
    const loader = new GLTFLoader();
    loader.register((parser) => new VRMLoaderPlugin(parser));

    loader.load(
      resolvedUrl,
      (gltf) => {
        const vrm = gltf.userData.vrm as VRM;
        if (!vrm) {
          setLoadError('Model loaded is not a valid VRM instance.');
          setIsLoading(false);
          return;
        }

        vrmRef.current = vrm;

        // Front-facing orientation
        vrm.scene.rotation.y = 0;

        // Enable shadows and proper rendering on all meshes
        vrm.scene.traverse((obj) => {
          if ((obj as THREE.Mesh).isMesh) {
            obj.castShadow = true;
            obj.receiveShadow = true;
          }
        });

        // Center model comfortably in viewport
        vrm.scene.position.set(0, 0, 0);
        scene.add(vrm.scene);

        // Bind VRM LookAt to anchor
        if (vrm.lookAt) {
          vrm.lookAt.target = lookAtAnchor;
        }

        // Initialize Animation Mixer & Retargeted Wave Clip
        const mixer = new THREE.AnimationMixer(vrm.scene);
        mixerRef.current = mixer;

        const waveClip = createVRMWaveClip(vrm);
        const waveAction = mixer.clipAction(waveClip);
        waveActionRef.current = waveAction;

        setIsLoading(false);
        setLoadError(null);
      },
      (progress) => {
        if (progress.total > 0) {
          const percent = Math.round((progress.loaded / progress.total) * 100);
          setLoadingProgress(percent);
        } else {
          setLoadingProgress((prev) => Math.min(prev + 10, 90));
        }
      },
      (err: unknown) => {
        const errorMsg = err instanceof Error ? err.message : String(err);
        console.warn('VRM load notice:', errorMsg);
        setLoadError(
          'Model file `/models/character.vrm` not found on server yet. Fallback 3D view active.'
        );
        setIsLoading(false);
      }
    );

    // 8. Mouse & Proximity Tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const canvasCenterX = rect.left + rect.width / 2;
      const canvasCenterY = rect.top + rect.height / 2;

      // Distance from mouse to center of canvas (0 when hovering over, up to 1+)
      const dx = (e.clientX - canvasCenterX) / (window.innerWidth / 2);
      const dy = (e.clientY - canvasCenterY) / (window.innerHeight / 2);
      const dist = Math.min(1, Math.sqrt(dx * dx + dy * dy));

      mouseRef.current = {
        x: (e.clientX - canvasCenterX) / (rect.width / 2),
        y: -(e.clientY - canvasCenterY) / (rect.height / 2),
        distance: dist,
      };

      // Subtle smile increases as cursor approaches character
      const computedSmile = THREE.MathUtils.lerp(0.9, 0.15, dist);
      setSmileScore(computedSmile);

      // Update 3D look-at target vector
      lookTargetRef.current.set(
        mouseRef.current.x * 0.8,
        1.25 + mouseRef.current.y * 0.5,
        1.8
      );
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 9. Tab Visibility Pause (GPU & battery saving)
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        clock = new THREE.Clock(); // Reset clock delta to avoid sudden frame leaps
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 10. Responsive Canvas Resizer
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;

      camera.aspect = width / height;
      // Adjust camera distance for mobile framing
      if (window.innerWidth < 640) {
        camera.position.z = 2.6;
        camera.position.y = 0.65;
      } else {
        camera.position.z = 2.15;
        camera.position.y = 0.70;
      }
      camera.lookAt(0, 0.65, 0);
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // 11. Render Animation Loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isTabVisible) return;

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Update Mixamo / VRM Animation Mixer
      if (mixerRef.current) {
        mixerRef.current.update(delta);
      }

      const vrm = vrmRef.current;
      if (vrm) {
        // A. Idle Breathing Animation (gentle spine & chest expansion)
        const spineNode = vrm.humanoid?.getNormalizedBoneNode('spine' as any);
        const chestNode = vrm.humanoid?.getNormalizedBoneNode('chest' as any);

        const breath = Math.sin(time * 2.4) * 0.02;
        if (spineNode) spineNode.rotation.x = breath;
        if (chestNode) chestNode.rotation.x = breath * 0.8;

        // B. Head & Eye Tracking (damped towards look target)
        lookAtAnchor.position.lerp(lookTargetRef.current, delta * 5);
        if (vrm.lookAt) {
          vrm.lookAt.update(delta);
        }

        // C. Automatic Random Blinking (every 3 to 6 seconds)
        const blink = blinkStateRef.current;
        if (!blink.isBlinking) {
          blink.nextBlinkTime -= delta;
          if (blink.nextBlinkTime <= 0) {
            blink.isBlinking = true;
            blink.blinkProgress = 0;
            // Next blink in 3.0 to 6.0 seconds
            blink.nextBlinkTime = 3.0 + Math.random() * 3.0;
          }
        } else {
          // 200ms blink down and up cycle
          blink.blinkProgress += delta * 6;
          const blinkValue = Math.sin(Math.min(Math.PI, blink.blinkProgress));

          if (vrm.expressionManager) {
            vrm.expressionManager.setValue('blink', blinkValue);
          }

          if (blink.blinkProgress >= Math.PI) {
            blink.isBlinking = false;
            if (vrm.expressionManager) {
              vrm.expressionManager.setValue('blink', 0);
            }
          }
        }

        // D. Subtle Smile Expression based on Cursor Proximity
        if (vrm.expressionManager) {
          const currentHappy = vrm.expressionManager.getValue('happy') || 0;
          const targetHappy = THREE.MathUtils.lerp(0.85, 0.15, mouseRef.current.distance);
          vrm.expressionManager.setValue(
            'happy',
            THREE.MathUtils.damp(currentHappy, targetHappy, 4, delta)
          );
          vrm.expressionManager.update();
        }

        // E. Spring Bone Simulation (hair and clothing secondary sway physics)
        if (vrm.springBoneManager) {
          vrm.springBoneManager.update(delta);
        }

        // VRM Global Update
        vrm.update(delta);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      scene.clear();
    };
  }, [modelUrl]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[380px] sm:h-[450px] lg:h-[540px] flex items-center justify-center select-none ${className}`}
    >
      {/* Three.js Transparent Canvas */}
      <canvas
        ref={canvasRef}
        onClick={triggerWave}
        className="w-full h-full cursor-pointer relative z-10 block"
        title="Click to trigger wave animation!"
      />

      {/* Loading State Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 dark:bg-black/40 backdrop-blur-xs rounded-3xl z-20 transition-opacity">
          <div className="relative flex items-center justify-center">
            <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin" />
            <Sparkles className="w-4 h-4 text-emerald-400 absolute" />
          </div>
          <p className="mt-3 text-xs font-mono font-medium text-[#18181b] dark:text-[#f4f4f5]">
            Loading 3D VRM Model... {loadingProgress}%
          </p>
          <div className="w-36 h-1 bg-[#e4e4e7] dark:bg-[#27272a] rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-200"
              style={{ width: `${Math.max(8, loadingProgress)}%` }}
            />
          </div>
        </div>
      )}

      {/* Notice / Fallback Card if VRM file is not yet placed in /public/models */}
      {loadError && (
        <div className="absolute bottom-4 left-4 right-4 z-20 p-3 rounded-xl bg-white/95 dark:bg-[#18181b]/95 border border-emerald-500/30 shadow-lg backdrop-blur-md text-xs text-[#52525b] dark:text-[#a1a1aa] flex items-start gap-2.5">
          <Info className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-[#18181b] dark:text-[#f4f4f5]">
              VRM Model Slot Ready
            </p>
            <p className="text-[11px] mt-0.5">
              Place your exported <strong>character.vrm</strong> into{' '}
              <code className="text-emerald-600 dark:text-emerald-400">public/models/character.vrm</code>.
              Interactive Three.js lighting, eye-tracking, and blinking are live!
            </p>
          </div>
        </div>
      )}

      {/* Interactive Controls & Wave Badge */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <button
          onClick={triggerWave}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md border text-xs font-semibold shadow-xs transition-all ${
            isWaving
              ? 'bg-emerald-600 text-white border-emerald-500 scale-105'
              : 'bg-white/80 dark:bg-[#18181b]/80 border-[#e4e4e7] dark:border-[#27272a] text-[#18181b] dark:text-[#f4f4f5] hover:border-emerald-500/50'
          }`}
          title="Click to trigger wave gesture"
        >
          <Hand className="w-3.5 h-3.5 text-emerald-500" />
          <span>{isWaving ? 'Waving... 👋' : 'Wave'}</span>
        </button>

        {/* Dynamic Smile Indicator */}
        <div className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/80 dark:bg-[#18181b]/80 border border-[#e4e4e7] dark:border-[#27272a] text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
          <span>Smile:</span>
          <span className="font-bold">{Math.round(smileScore * 100)}%</span>
        </div>
      </div>
    </div>
  );
};
