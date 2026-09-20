'use client';

/**
 * useShowcaseScroll — Type B Sequential Showcase Scroll Hook
 *
 * Drives a pinned section's progress purely from native window.scrollY.
 * No Lenis management (Lenis easing on sticky sections is fine and desirable).
 * No React setState on every frame — only updates on actual stage transitions.
 *
 * Usage:
 *   const { trackRef, sectionProgress, activeIndex } = useShowcaseScroll({ stageCount: 6 });
 *   <div ref={trackRef} style={{ height: '700vh' }}>
 *     <div style={{ position: 'sticky', top: 0, height: '100vh' }}>
 *       ...visual content driven by sectionProgress...
 *     </div>
 *   </div>
 */

import { useRef, useEffect, useCallback, useState } from 'react';
import { useMotionValue, MotionValue } from 'framer-motion';

interface UseShowcaseScrollOptions {
  /** Number of discrete stages (e.g. 6 for WhatWeDo / Activities) */
  stageCount: number;
  /**
   * Fraction of [0,1] progress reserved for entry transition before stage 0 begins.
   * Default: 0.10 (10% of scroll budget = entry fade-in)
   */
  entryFraction?: number;
}

interface UseShowcaseScrollReturn {
  /** Attach to the outer scroll-budget container */
  trackRef: React.RefObject<HTMLDivElement | null>;
  /** MotionValue<number> in [0, 1] — use with useTransform for all visual state */
  sectionProgress: MotionValue<number>;
  /** Active stage index [0, stageCount-1] — React state, only updates on stage change */
  activeIndex: number;
  /** Navigate to a specific stage by scrolling to the correct position */
  goToStage: (index: number) => void;
}

export function useShowcaseScroll({
  stageCount,
  entryFraction = 0.10,
}: UseShowcaseScrollOptions): UseShowcaseScrollReturn {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionProgress = useMotionValue(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Keep last index in a ref to avoid setState on every frame
  const lastIndexRef = useRef(0);

  /** Deterministic active index from progress — pure function, no side effects */
  const computeActiveIndex = useCallback(
    (progress: number): number => {
      const active = (progress - entryFraction) / (1 - entryFraction);
      const raw = Math.floor(active * stageCount);
      return Math.min(stageCount - 1, Math.max(0, raw));
    },
    [stageCount, entryFraction]
  );

  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    const trackHeight = track.offsetHeight;
    const viewportH = window.innerHeight;
    const total = trackHeight - viewportH;
    if (total <= 0) return;

    const scrolled = window.scrollY - trackTop;
    const progress = Math.max(0, Math.min(1, scrolled / total));

    // MotionValue update — drives all useTransform subscribers (no React re-render)
    sectionProgress.set(progress);

    // React state update — only when stage actually changes (max 6 times per section)
    const newIndex = computeActiveIndex(progress);
    if (newIndex !== lastIndexRef.current) {
      lastIndexRef.current = newIndex;
      setActiveIndex(newIndex);
    }
  }, [sectionProgress, computeActiveIndex]);

  useEffect(() => {
    handleScroll(); // sync on mount
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Also sync on resize (track dimensions may change)
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  /** Programmatic navigation — smoothly scrolls to the midpoint of a stage */
  const goToStage = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;

      const trackTop = track.getBoundingClientRect().top + window.scrollY;
      const trackHeight = track.offsetHeight;
      const viewportH = window.innerHeight;
      const total = trackHeight - viewportH;

      // Mid-point of stage in progress space
      const stageWidth = (1 - entryFraction) / stageCount;
      const stageMid = entryFraction + stageWidth * index + stageWidth * 0.5;
      const targetScrollY = trackTop + stageMid * total;

      window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    },
    [stageCount, entryFraction]
  );

  return { trackRef, sectionProgress, activeIndex, goToStage };
}
