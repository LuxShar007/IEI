'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useTransform, useReducedMotion } from 'framer-motion';
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

  // MotionValue driven by native window scroll — 100% unblocked mouse wheel
  const scrollYProgress = useMotionValue(0);

  const [currentProgress, setCurrentProgress] = useState(0);
  const [currentScene, setCurrentScene] = useState('00 INITIAL IDENTITY');
  const [isQAMode, setIsQAMode] = useState(false);
  const isDev = process.env.NODE_ENV === 'development';

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

    // Exact 18-stage scene detection (00 through 17)
    if (progress < 0.03) setCurrentScene('00 INITIAL IDENTITY');
    else if (progress < 0.16) setCurrentScene('01 LINE CONSTRUCTION');
    else if (progress < 0.23) setCurrentScene('02 FULL 2D EMBLEM');
    else if (progress < 0.31) setCurrentScene('03 LAYER STACKING');
    else if (progress < 0.38) setCurrentScene('04 3D IEI EMBLEM');
    else if (progress < 0.44) setCurrentScene('05 IEI IDENTITY HOLD');
    else if (progress < 0.50) setCurrentScene('06 THE INSTITUTION');
    else if (progress < 0.53) setCurrentScene('07 ENGINEERS');
    else if (progress < 0.55) setCurrentScene('08 INDIA');
    else if (progress < 0.64) setCurrentScene('09 I / E / I FORMATION');
    else if (progress < 0.70) setCurrentScene('10 GIANT I / E / I HOLD');
    else if (progress < 0.80) setCurrentScene('11 CAMERA APPROACH');
    else if (progress < 0.88) setCurrentScene('12 PORTAL SPACE');
    else if (progress < 0.92) setCurrentScene('13 HOMEPAGE VISIBLE THROUGH IEI');
    else if (progress < 0.96) setCurrentScene('14 IEI TRANSPARENCY');
    else if (progress < 0.98) setCurrentScene('15 IEI DISAPPEARS');
    else if (progress < 1.00) setCurrentScene('16 HOMEPAGE FULL TAKEOVER');
    else setCurrentScene('17 INTRO RELEASE');
  }, [scrollYProgress, setIntroProgress]);

  useEffect(() => {
    handleScroll(); // Set initial state immediately

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // Derived opacity values for UI chrome
  const skipBtnOpacity = useTransform(scrollYProgress, [0, 0.05, 0.78, 0.88], [0, 1, 1, 0]);
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.02, 0.12, 0.18], [0, 1, 1, 0]);

  const isPinActive = currentProgress < 0.99;
  const homepageStatus =
    currentProgress < 0.88 ? 'HIDDEN' : currentProgress < 0.98 ? 'BACKDROP' : 'RELEASED';
  const headerState =
    currentProgress < 0.88 ? 'HIDDEN' : currentProgress < 0.98 ? 'ENTERING' : 'NORMAL';

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
            <div className={styles.debugHeader}>INTRO DIAGNOSTICS</div>
            <div className={styles.debugRow}>
              <span className={styles.debugLabel}>scroll:</span>
              <span style={{ color: '#00FF88' }}>ENABLED (window)</span>
            </div>
            <div className={styles.debugRow}>
              <span className={styles.debugLabel}>lenis:</span>
              <span>ACTIVE</span>
            </div>
            <div className={styles.debugRow}>
              <span className={styles.debugLabel}>progress:</span>
              <span>{currentProgress.toFixed(2)}</span>
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
              <span>{homepageStatus}</span>
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
