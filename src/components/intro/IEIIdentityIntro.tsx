'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useIntro } from '@/lib/intro/IntroContext';
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

  // Master scroll tracking across the finite pinned track
  // Evaluated directly without spring lag so fast/slow scrolls maintain 1:1 physical continuity!
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end start'],
  });

  const [currentProgress, setCurrentProgress] = useState(0);
  const [currentScene, setCurrentScene] = useState('LINE DRAW');
  const [isQAMode, setIsQAMode] = useState(false);
  const isDev = process.env.NODE_ENV === 'development';

  // Report master progress to IntroContext and update debug state
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (val) => {
      setCurrentProgress(val);
      setIntroProgress(val);
      if (val < 0.22) setCurrentScene('LINE DRAW');
      else if (val < 0.35) setCurrentScene('2D EMBLEM');
      else if (val < 0.52) setCurrentScene('3D STACK');
      else if (val < 0.70) setCurrentScene('TYPOGRAPHY');
      else if (val < 0.96) setCurrentScene('PORTAL');
      else setCurrentScene('HOMEPAGE');
    });
    return () => unsubscribe();
  }, [scrollYProgress, setIntroProgress]);

  // Skip Intro button fades out cleanly as portal opens (0.80 -> 0.90)
  const skipBtnOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.78, 0.88],
    [0, 1, 1, 0]
  );

  const scrollCueOpacity = useTransform(
    scrollYProgress,
    [0, 0.02, 0.12, 0.18],
    [0, 1, 1, 0]
  );

  const isPinActive = currentProgress < 0.99;
  const isReleased = currentProgress >= 0.99;
  const headerState =
    currentProgress < 0.80
      ? 'HIDDEN'
      : currentProgress < 0.96
      ? 'ENTERING'
      : 'REVEALED';

  return (
    <section
      ref={trackRef}
      className={styles.introTrack}
      aria-label="IEI SIES GST — Cinematic Identity Intro"
    >
      {/* Visual Debug Markers in Development */}
      {isDev && (
        <>
          <div className={styles.debugMarkerStart} />
          <div className={styles.debugMarkerEnd} />
        </>
      )}

      <div className={styles.stickyStage}>
        {/* Ambient Environmental Atmosphere */}
        <div className={styles.ambientVignette} />

        {/* ACCESSIBILITY: Skip Intro Button */}
        <motion.button
          className={styles.skipIntroBtn}
          style={{ opacity: skipBtnOpacity }}
          onClick={skipIntro}
          aria-label="Skip cinematic introduction and proceed to homepage content"
        >
          Skip Intro [↓]
        </motion.button>

        {/* INITIAL SCROLL CUE */}
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

        {/* ====================================================================
            STAGE 01 & 02: Programmatic Vector Line Construction & 2D Emblem Lock
            ==================================================================== */}
        <IEIConstruction
          progress={scrollYProgress}
          reducedMotion={Boolean(shouldReduceMotion)}
          isQAMode={isQAMode}
        />

        {/* ====================================================================
            STAGE 03, 04, 05: True 3D Vector Layer Stacking & Physical Convergence
            ==================================================================== */}
        <IEI3DStack
          progress={scrollYProgress}
          reducedMotion={Boolean(shouldReduceMotion)}
        />

        {/* ====================================================================
            STAGE 06 & 07: Live Helvetica Institutional Name & Word Decomposition
            ==================================================================== */}
        <IdentityTypography
          progress={scrollYProgress}
          reducedMotion={Boolean(shouldReduceMotion)}
        />

        {/* ====================================================================
            STAGE 08 - 14: 3D I E I Typographic Portal & Camera Pass-Through
            (Renders the stable Homepage Hero Backdrop inside the letter portal!)
            ==================================================================== */}
        <IEIPortal
          progress={scrollYProgress}
          reducedMotion={Boolean(shouldReduceMotion)}
        >
          {children}
        </IEIPortal>

        {/* ====================================================================
            DEVELOPMENT-ONLY DEBUG HUD (Omitted in production)
            ==================================================================== */}
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
              <span>{currentProgress < 0.72 ? 'HIDDEN' : currentProgress < 0.98 ? 'BACKDROP' : 'RELEASED'}</span>
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
