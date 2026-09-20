'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useTransform, useReducedMotion } from 'framer-motion';
import { useIntro } from '@/lib/intro/IntroContext';
import { useSmoothScroll } from '@/components/layout/SmoothScrollProvider';
import { IEIConstruction } from './IEIConstruction';
import { IEI3DStack } from './IEI3DStack';
import { IdentityTypography } from './IdentityTypography';
import { IEIPortal } from './IEIPortal';
import styles from './IEIIdentityIntro.module.css';

interface IEIIdentityIntroProps {
  children: React.ReactNode;
}

export const IEIIdentityIntro: React.FC<IEIIdentityIntroProps> = ({ children }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { setIntroProgress, skipIntro } = useIntro();
  const { pauseLenis, resumeLenis } = useSmoothScroll();

  // MotionValue driven by native scroll — no Lenis interference
  const scrollYProgress = useMotionValue(0);

  const [currentProgress, setCurrentProgress] = useState(0);
  const [currentScene, setCurrentScene] = useState('LINE DRAW');
  const [isQAMode, setIsQAMode] = useState(false);
  const isDev = process.env.NODE_ENV === 'development';

  // Pause Lenis on mount. The scroll listener will re-enable it once intro is done.
  useEffect(() => {
    pauseLenis();
  }, [pauseLenis]);

  // Core native scroll handler — 1:1 physical continuity, zero lag
  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const trackTop = track.offsetTop;
    const trackHeight = track.offsetHeight;
    const viewportH = window.innerHeight;
    const total = trackHeight - viewportH;

    const scrolled = window.scrollY - trackTop;
    const progress = Math.max(0, Math.min(1, scrolled / total));

    scrollYProgress.set(progress);
    setCurrentProgress(progress);
    setIntroProgress(progress);

    // Scene labels for debug
    if (progress < 0.22) setCurrentScene('LINE DRAW');
    else if (progress < 0.35) setCurrentScene('2D EMBLEM');
    else if (progress < 0.52) setCurrentScene('3D STACK');
    else if (progress < 0.70) setCurrentScene('TYPOGRAPHY');
    else if (progress < 0.96) setCurrentScene('PORTAL');
    else setCurrentScene('HOMEPAGE');

    // Handoff: re-enable Lenis when scroll exits the intro track
    if (progress >= 0.99) {
      resumeLenis();
    } else {
      // If scrolling back into intro zone, pause Lenis again
      pauseLenis();
    }
  }, [scrollYProgress, setIntroProgress, pauseLenis, resumeLenis]);

  useEffect(() => {
    handleScroll(); // Set initial state immediately

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      resumeLenis(); // Always restore Lenis on unmount
    };
  }, [handleScroll, resumeLenis]);

  // Derived opacity values for UI chrome
  const skipBtnOpacity = useTransform(scrollYProgress, [0, 0.05, 0.78, 0.88], [0, 1, 1, 0]);
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.02, 0.12, 0.18], [0, 1, 1, 0]);

  const isPinActive = currentProgress < 0.99;
  const isReleased = currentProgress >= 0.99;
  const headerState =
    currentProgress < 0.80 ? 'HIDDEN' : currentProgress < 0.96 ? 'ENTERING' : 'REVEALED';

  return (
    <section
      ref={trackRef}
      className={styles.introTrack}
      aria-label="IEI SIES GST — Cinematic Identity Intro"
    >
      {isDev && (
        <>
          <div className={styles.debugMarkerStart} />
          <div className={styles.debugMarkerEnd} />
        </>
      )}

      <div className={styles.stickyStage}>
        <div className={styles.ambientVignette} />

        <motion.button
          className={styles.skipIntroBtn}
          style={{ opacity: skipBtnOpacity }}
          onClick={skipIntro}
          aria-label="Skip cinematic introduction and proceed to homepage content"
        >
          Skip Intro [↓]
        </motion.button>

        <motion.div
          className={styles.scrollPrompt}
          style={{ opacity: scrollCueOpacity }}
          aria-hidden="true"
        >
          <span className={styles.scrollPromptText}>Scroll to Enter</span>
          <div className={styles.scrollLineTrack}>
            <div className={styles.scrollLineActive} />
          </div>
        </motion.div>

        <IEIConstruction
          progress={scrollYProgress}
          reducedMotion={Boolean(shouldReduceMotion)}
          isQAMode={isQAMode}
        />

        <IEI3DStack
          progress={scrollYProgress}
          reducedMotion={Boolean(shouldReduceMotion)}
        />

        <IdentityTypography
          progress={scrollYProgress}
          reducedMotion={Boolean(shouldReduceMotion)}
        />

        <IEIPortal
          progress={scrollYProgress}
          reducedMotion={Boolean(shouldReduceMotion)}
        >
          {children}
        </IEIPortal>

        {isDev && (
          <div className={styles.debugOverlay} aria-label="Development Debug Overlay">
            <div className={styles.debugRow}>
              <span className={styles.debugLabel}>introProgress:</span>
              <span>{currentProgress.toFixed(3)}</span>
            </div>
            <div className={styles.debugRow}>
              <span className={styles.debugLabel}>scene:</span>
              <span>{currentScene}</span>
            </div>
            <div className={styles.debugRow}>
              <span className={styles.debugLabel}>pin:</span>
              <span>{isPinActive ? 'ACTIVE' : 'RELEASED'}</span>
            </div>
            <div className={styles.debugRow}>
              <span className={styles.debugLabel}>homepage:</span>
              <span>
                {currentProgress < 0.72
                  ? 'HIDDEN'
                  : currentProgress < 0.98
                  ? 'BACKDROP'
                  : 'RELEASED'}
              </span>
            </div>
            <div className={styles.debugRow}>
              <span className={styles.debugLabel}>release:</span>
              <span>{isReleased ? 'TRUE' : 'FALSE'}</span>
            </div>
            <div className={styles.debugRow}>
              <span className={styles.debugLabel}>header:</span>
              <span>{headerState}</span>
            </div>
            <button
              className={styles.qaToggleBtn}
              onClick={() => setIsQAMode((prev) => !prev)}
            >
              {isQAMode ? 'DISABLE VECTOR QA' : 'ENABLE VECTOR QA [50%]'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
