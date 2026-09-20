'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
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

  // Scroll tracking across the finite pinned track
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end start'],
  });

  // Master smooth physical spring for cinematic camera physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
    restDelta: 0.001,
  });

  const [currentProgress, setCurrentProgress] = useState(0);
  const [currentScene, setCurrentScene] = useState('LINE DRAW');
  const [isQAMode, setIsQAMode] = useState(false);
  const isDev = process.env.NODE_ENV === 'development';

  // Report master progress to IntroContext and update debug telemetry
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (val) => {
      setCurrentProgress(val);
      setIntroProgress(val);
      if (val < 0.22) setCurrentScene('LINE DRAW');
      else if (val < 0.32) setCurrentScene('2D EMBLEM');
      else if (val < 0.52) setCurrentScene('3D STACK');
      else if (val < 0.70) setCurrentScene('TYPOGRAPHY');
      else if (val < 0.95) setCurrentScene('PORTAL ENTRY');
      else setCurrentScene('HOMEPAGE');
    });
    return () => unsubscribe();
  }, [smoothProgress, setIntroProgress]);

  // Skip Intro button fades out cleanly as portal opens (0.80 -> 0.90)
  const skipBtnOpacity = useTransform(
    smoothProgress,
    [0, 0.05, 0.78, 0.88],
    [0, 1, 1, 0]
  );

  const scrollCueOpacity = useTransform(
    smoothProgress,
    [0, 0.02, 0.12, 0.18],
    [0, 1, 1, 0]
  );

  return (
    <section
      ref={trackRef}
      className={styles.introTrack}
      aria-label="IEI SIES GST — Cinematic Identity Intro"
    >
      <div className={styles.stickyStage}>
        {/* Ambient Environmental Tone */}
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
            STAGE 01 & 02: Programmatic Vector Line Construction & Official 2D Emblem
            ==================================================================== */}
        <IEIConstruction
          progress={smoothProgress}
          reducedMotion={Boolean(shouldReduceMotion)}
          isQAMode={isQAMode}
        />

        {/* ====================================================================
            STAGE 03, 04, 05: True 3D Vector Layer Stacking & Physical Convergence
            ==================================================================== */}
        <IEI3DStack
          progress={smoothProgress}
          reducedMotion={Boolean(shouldReduceMotion)}
        />

        {/* ====================================================================
            STAGE 06 & 07: Live Helvetica Institutional Name & Word Decomposition
            ==================================================================== */}
        <IdentityTypography
          progress={smoothProgress}
          reducedMotion={Boolean(shouldReduceMotion)}
        />

        {/* ====================================================================
            STAGE 08 - 14: 3D I E I Typographic Portal & Camera Pass-Through
            (Wraps the Homepage Environment inside the letter portal!)
            ==================================================================== */}
        <IEIPortal
          progress={smoothProgress}
          reducedMotion={Boolean(shouldReduceMotion)}
        >
          {children}
        </IEIPortal>

        {/* ====================================================================
            DEVELOPMENT-ONLY DEBUG HUD (Not shown in production)
            ==================================================================== */}
        {isDev && (
          <div className={styles.debugOverlay} aria-label="Development Debug Overlay">
            <div className={styles.debugRow}>
              <span className={styles.debugLabel}>INTRO PROGRESS:</span>
              <span>{currentProgress.toFixed(3)}</span>
            </div>
            <div className={styles.debugRow}>
              <span className={styles.debugLabel}>PIN STATE:</span>
              <span>{currentProgress < 0.98 ? 'ACTIVE' : 'RELEASED'}</span>
            </div>
            <div className={styles.debugRow}>
              <span className={styles.debugLabel}>CURRENT SCENE:</span>
              <span>{currentScene}</span>
            </div>
            <div className={styles.debugRow}>
              <span className={styles.debugLabel}>HEADER STATE:</span>
              <span>{currentProgress >= 0.88 ? 'REVEALED' : 'HIDDEN'}</span>
            </div>
            <div className={styles.debugRow}>
              <span className={styles.debugLabel}>HOMEPAGE REVEAL:</span>
              <span>
                {currentProgress < 0.64
                  ? '0.00'
                  : Math.min(1, (currentProgress - 0.64) / 0.32).toFixed(2)}
              </span>
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
