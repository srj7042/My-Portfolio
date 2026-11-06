import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { projects } from '../data/portfolio';
import { Project } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';
import {
  FolderGit2,
  Github,
  ExternalLink,
  Star,
  Eye,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { RippleButton } from '@/registry/magicui/ripple-button';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  // Smooth rotation state
  const [currentRotation, setCurrentRotation] = useState<number>(0);
  const targetRotationRef = useRef<number>(0);
  const currentRotationRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // Drag / touch interaction state
  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragStartRotationRef = useRef<number>(0);

  const sectionRef = useRef<HTMLElement>(null);
  const carouselStageRef = useRef<HTMLDivElement>(null);
  const snapTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const categories = [
    'All',
    'AI / Computer Vision',
    'Backend Engineering',
    'Full-Stack Web',
    'Automation & Tools',
  ];

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return projects;
    return projects.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const totalCards = filteredProjects.length;
  const angleStep = totalCards > 0 ? 360 / totalCards : 0;

  // Window resize listener for responsive dimensions
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive card and cylinder dimensions (well-proportioned, comfortable size)
  const cardWidth = useMemo(() => {
    if (windowWidth < 640) return Math.min(290, windowWidth - 40);
    if (windowWidth < 1024) return 315;
    return 350;
  }, [windowWidth]);

  const cardHeight = useMemo(() => {
    if (windowWidth < 640) return 395;
    return 420;
  }, [windowWidth]);

  const radius = useMemo(() => {
    if (totalCards <= 1) return 0;
    // Calculate geometric cylinder radius based on chord width:
    // radius = (cardWidth + gap) / (2 * tan(PI / N))
    const gap = windowWidth < 640 ? 18 : 26;
    const computedRadius = Math.round(
      (cardWidth + gap) / (2 * Math.tan(Math.PI / Math.max(3, totalCards)))
    );

    // Apply clamp for aesthetically balanced perspective
    if (windowWidth < 640) {
      return Math.min(Math.max(computedRadius, 260), 340);
    }
    if (windowWidth < 1024) {
      return Math.min(Math.max(computedRadius, 340), 430);
    }
    return Math.min(Math.max(computedRadius, 400), 490);
  }, [cardWidth, totalCards, windowWidth]);

  const perspective = useMemo(() => {
    if (windowWidth < 640) return 900;
    if (windowWidth < 1024) return 1050;
    return 1200;
  }, [windowWidth]);

  // RequestAnimationFrame smooth interpolation loop
  useEffect(() => {
    const updateLoop = () => {
      const diff = targetRotationRef.current - currentRotationRef.current;
      if (Math.abs(diff) > 0.02) {
        currentRotationRef.current += diff * 0.12;
        setCurrentRotation(currentRotationRef.current);
      } else if (Math.abs(diff) > 0) {
        currentRotationRef.current = targetRotationRef.current;
        setCurrentRotation(targetRotationRef.current);
      }
      rafIdRef.current = requestAnimationFrame(updateLoop);
    };

    rafIdRef.current = requestAnimationFrame(updateLoop);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // Side-scroll listener: sideways/horizontal scroll (deltaX or Shift+wheel) rotates cylinder left/right.
  // Normal vertical scroll continues scrolling down the page!
  useEffect(() => {
    const el = carouselStageRef.current;
    if (!el || totalCards <= 1) return;

    const handleWheel = (e: WheelEvent) => {
      // Determine if the scroll gesture is predominantly horizontal (sideways) or Shift-key modified
      const isSideScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey;

      if (isSideScroll) {
        // Prevent browser back/forward history navigation on trackpad side swipe
        e.preventDefault();

        const delta = e.shiftKey && Math.abs(e.deltaX) === 0 ? e.deltaY : e.deltaX;
        targetRotationRef.current -= delta * 0.35;

        // Auto-snap to nearest card when side-scrolling gesture finishes
        if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
        snapTimeoutRef.current = setTimeout(() => {
          const nearestIndex = Math.round(-targetRotationRef.current / angleStep);
          targetRotationRef.current = -nearestIndex * angleStep;
        }, 160);
      }
      // If normal vertical scroll (|deltaY| >= |deltaX|), do nothing: allows natural page scroll!
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
      if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
    };
  }, [angleStep, totalCards]);

  // Reset rotation when category changes
  useEffect(() => {
    targetRotationRef.current = 0;
    currentRotationRef.current = 0;
    setCurrentRotation(0);
  }, [selectedCategory]);

  // Active index calculation based on current cylinder rotation
  const activeIndex = useMemo(() => {
    if (totalCards <= 1) return 0;
    let rawIndex = Math.round(-currentRotation / angleStep);
    let normalized = ((rawIndex % totalCards) + totalCards) % totalCards;
    return normalized;
  }, [angleStep, currentRotation, totalCards]);

  // Programmatic navigation to a specific card index (shortest angular path)
  const navigateToIndex = useCallback(
    (index: number) => {
      if (totalCards <= 1) return;
      const currentRaw = -targetRotationRef.current / angleStep;
      const currentNorm =
        ((Math.round(currentRaw) % totalCards) + totalCards) % totalCards;
      let diff = index - currentNorm;
      if (diff > totalCards / 2) diff -= totalCards;
      if (diff < -totalCards / 2) diff += totalCards;
      targetRotationRef.current -= diff * angleStep;
    },
    [angleStep, totalCards]
  );

  const handlePrev = () => {
    if (totalCards <= 1) return;
    targetRotationRef.current += angleStep;
  };

  const handleNext = () => {
    if (totalCards <= 1) return;
    targetRotationRef.current -= angleStep;
  };

  // Horizontal Pointer / Touch Drag support
  const handlePointerDown = (e: React.PointerEvent) => {
    if (totalCards <= 1) return;
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a')) return;

    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartRotationRef.current = targetRotationRef.current;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragStartXRef.current;
    // Rotate ~160 degrees over window width
    const degDelta = (deltaX / window.innerWidth) * 160;
    targetRotationRef.current = dragStartRotationRef.current + degDelta;
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (totalCards > 1) {
      const nearestIndex = Math.round(-targetRotationRef.current / angleStep);
      targetRotationRef.current = -nearestIndex * angleStep;
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-16 md:py-24 border-t border-[#e4e4e7]/60 dark:border-[#27272a]/60 bg-[#faf8f5] dark:bg-[#09090b] transition-colors duration-300 overflow-hidden"
    >
      {/* Section Header Container - Perfectly aligned with max-w-4xl of About, Experience, Education */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Section Header */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#18181b] dark:text-[#f4f4f5]">
                Featured Projects
              </h2>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-[#f4f4f5] dark:bg-[#141417] border border-[#e4e4e7] dark:border-[#27272a] w-fit">
            {categories.map((cat) => (
              <RippleButton
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                rippleColor={
                  selectedCategory === cat
                    ? 'rgba(255, 255, 255, 0.4)'
                    : '#10b981'
                }
                className={`px-2.5 py-1 rounded-lg text-xs font-medium border-0 shadow-none transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 dark:bg-emerald-500 text-white shadow-xs font-semibold'
                    : 'bg-transparent text-[#52525b] dark:text-[#a1a1aa] hover:text-[#18181b] dark:hover:text-[#f4f4f5]'
                }`}
              >
                {cat}
              </RippleButton>
            ))}
          </div>
        </div>
      </div>

      {/* Middle: 3D Cylindrical Stage (with generous vertical clearance) */}
      <div
        ref={carouselStageRef}
        className="relative w-full h-[450px] sm:h-[480px] my-4 sm:my-8 flex items-center justify-center select-none"
          style={{
            perspective: `${perspective}px`,
            perspectiveOrigin: '50% 50%', // Strictly eye-level front-facing view
            touchAction: 'pan-y', // Allows natural vertical page scrolling on touch, horizontal gestures captured by carousel
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {/* Central vertical axis cylinder container (anchored at -radius to keep front card at Z=0 without ballooning) */}
          <div
            className="relative preserve-3d"
            style={{
              width: `${cardWidth}px`,
              height: `${cardHeight}px`,
              transformStyle: 'preserve-3d',
              WebkitTransformStyle: 'preserve-3d',
              // Recede center by radius so front card stays at Z=0, side cards recede gracefully into negative Z
              transform: `translateZ(-${radius}px) rotateY(${currentRotation}deg)`,
              transition: isDraggingRef.current ? 'none' : 'transform 0.05s linear',
            }}
          >
            {filteredProjects.map((project, index) => {
              // Angle around the cylinder circumference
              const cardAngle = totalCards > 1 ? index * angleStep : 0;

              // Apparent angle relative to viewer line-of-sight (0 deg = facing viewer at front)
              const relativeAngle = cardAngle + currentRotation;
              const normalizedAngle =
                ((((relativeAngle % 360) + 540) % 360) - 180);
              const absAngle = Math.abs(normalizedAngle);

              // Front card is facing the viewer directly (|angle| < 22 deg)
              const isFront = absAngle < 22;

              // Rear cards rotate behind the cylinder and are hidden (|angle| > 82 deg)
              const isRear = totalCards > 2 && absAngle > 82;

              // Opacity and lighting gradient: front is 100%, sides recede softly, rear is 0
              const cardOpacity = isRear
                ? 0
                : Math.max(0.2, Math.cos((normalizedAngle * Math.PI) / 180));

              // Z-index: front card is always on top for clean clicking and no occlusion
              const cardZIndex = isRear
                ? 0
                : isFront
                ? 60
                : Math.round(50 - absAngle / 2);

              return (
                <div
                  key={project.id}
                  onClick={() => {
                    if (!isFront) {
                      navigateToIndex(index);
                    }
                  }}
                  className={`group absolute top-0 left-0 w-full h-full preserve-3d backface-hidden rounded-2xl transition-[opacity,box-shadow,border-color,transform] duration-300 ${
                    isFront
                      ? 'cursor-default ring-1 ring-emerald-500/30'
                      : 'cursor-pointer hover:border-emerald-500/60 hover:opacity-100 hover:scale-[1.02]'
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                    WebkitTransformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    // Rotate card around Y-axis at its angle, then push out radially by radius
                    transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                    opacity: cardOpacity,
                    visibility: isRear ? 'hidden' : 'visible',
                    zIndex: cardZIndex,
                    pointerEvents: isRear ? 'none' : 'auto',
                  }}
                >
                  {/* Card Content Container (Interactive hover lift & glow) */}
                  <div
                    className={`relative w-full h-full rounded-2xl flex flex-col justify-between p-5 border backdrop-blur-xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-500/20 hover:border-emerald-500/70 dark:hover:border-emerald-400/70 ${
                      project.isFlagship
                        ? 'bg-gradient-to-br from-white/95 via-white/95 to-emerald-50/40 dark:from-[#141417]/95 dark:via-[#141417]/95 dark:to-emerald-950/30 border-emerald-500/50 shadow-xl shadow-emerald-500/10 ring-1 ring-emerald-500/20'
                        : 'bg-white/95 dark:bg-[#141417]/95 border-[#e4e4e7] dark:border-[#27272a] shadow-lg'
                    }`}
                  >
                    {/* Ambient Card Header Glow (brightens on hover) */}
                    <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-emerald-500/10 group-hover:from-emerald-500/25 to-transparent pointer-events-none transition-all duration-300" />

                    {/* Top Metadata Row */}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {project.isFlagship && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-mono text-[9px] font-bold uppercase tracking-wider shadow-xs">
                              <Star className="w-2.5 h-2.5 fill-current" />
                              Flagship
                            </span>
                          )}
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-semibold">
                            {project.category}
                          </span>
                        </div>

                        <span className="font-mono text-[11px] font-bold text-[#71717a] dark:text-[#a1a1aa]">
                          {String(index + 1).padStart(2, '0')}&nbsp;/&nbsp;
                          {String(totalCards).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#18181b] dark:text-[#f4f4f5] leading-snug line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 mt-0.5 line-clamp-1">
                        {project.subtitle}
                      </p>

                      {/* Description */}
                      <p className="mt-2 text-xs text-[#3f3f46] dark:text-[#d4d4d8] leading-relaxed line-clamp-2 sm:line-clamp-3">
                        {project.shortDescription}
                      </p>

                      {/* Key Features Bullet Highlights */}
                      {project.features && project.features.length > 0 && (
                        <div className="mt-2.5 space-y-1 hidden sm:block">
                          {project.features.slice(0, 2).map((feat, fi) => (
                            <div
                              key={fi}
                              className="flex items-start gap-1.5 text-[11px] text-[#52525b] dark:text-[#a1a1aa]"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                              <span className="line-clamp-1">{feat}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom Section: Tech Stack & Actions */}
                    <div className="relative z-10 pt-3 border-t border-[#e4e4e7] dark:border-[#27272a] space-y-2">
                      {/* Tech Tags */}
                      <div className="flex flex-wrap items-center gap-1">
                        {project.tech.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-1.5 py-0.5 rounded bg-[#faf8f5] dark:bg-[#1c1c21] border border-[#e4e4e7] dark:border-[#27272a] text-[10px] font-mono text-[#52525b] dark:text-[#a1a1aa]"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 4 && (
                          <span className="text-[10px] font-mono text-[#71717a] dark:text-[#a1a1aa]">
                            +{project.tech.length - 4}
                          </span>
                        )}
                      </div>

                      {/* Action Buttons using RippleButton */}
                      <div className="flex items-center gap-1.5 pt-0.5">
                        {/* View Details Modal Button */}
                        <RippleButton
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveModalProject(project);
                          }}
                          rippleColor="#10b981"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 dark:bg-emerald-500 text-white font-semibold text-xs hover:bg-emerald-700 dark:hover:bg-emerald-600 shadow-xs border-0"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Details</span>
                        </RippleButton>

                        {/* View Code Link */}
                        <RippleButton
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          rippleColor="#ADD8E6"
                          className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#faf8f5] dark:bg-[#1c1c21] border border-[#e4e4e7] dark:border-[#27272a] text-[#18181b] dark:text-[#f4f4f5] font-medium text-xs hover:bg-black/5 dark:hover:bg-white/5"
                          title="View GitHub Repository"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span className="hidden xs:inline">Code</span>
                        </RippleButton>

                        {/* Live Demo Link */}
                        {project.liveUrl && (
                          <RippleButton
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            rippleColor="rgba(255, 255, 255, 0.45)"
                            className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-semibold text-xs hover:bg-emerald-500 hover:text-white"
                            title="Open Live Deployment"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span className="hidden xs:inline">Live</span>
                          </RippleButton>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar: Indicators & Navigation Controls */}
        <div className="w-full flex items-center justify-center pt-2">
          <div className="flex items-center gap-3">
            {/* Previous Arrow */}
            <RippleButton
              onClick={handlePrev}
              rippleColor="#10b981"
              className="p-2 rounded-lg bg-white dark:bg-[#141417] border border-[#e4e4e7] dark:border-[#27272a] text-[#18181b] dark:text-[#f4f4f5] hover:bg-black/5 dark:hover:bg-white/5 shadow-xs"
              aria-label="Previous Project"
            >
              <ChevronLeft className="w-4 h-4" />
            </RippleButton>

            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {filteredProjects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => navigateToIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === i
                      ? 'w-6 bg-emerald-500 shadow-xs'
                      : 'w-2 bg-[#d4d4d8] dark:bg-[#3f3f46] hover:bg-emerald-500/50'
                  }`}
                  aria-label={`Jump to project ${i + 1}`}
                />
              ))}
            </div>

            {/* Next Arrow */}
            <RippleButton
              onClick={handleNext}
              rippleColor="#10b981"
              className="p-2 rounded-lg bg-white dark:bg-[#141417] border border-[#e4e4e7] dark:border-[#27272a] text-[#18181b] dark:text-[#f4f4f5] hover:bg-black/5 dark:hover:bg-white/5 shadow-xs"
              aria-label="Next Project"
            >
              <ChevronRight className="w-4 h-4" />
            </RippleButton>
          </div>
        </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
