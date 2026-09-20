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

  // SINGLE SOURCE OF TRUTH: Normalized progress MotionValue (0 -> 1)
  // Driven directly by native scroll without React re-renders
  const scrollYProgress = useMotionValue(0);

  const [isQAMode, setIsQAMode] = useState(false);
  const isDev = process.env.NODE_ENV === 'development';

  // High-performance tracking refs (0 React re-renders during continuous scrolling)
  const lastScrollYRef = useRef(0);
  const rafCountRef = useRef(0);

  // Debug overlay direct DOM refs
  const debugProgressRef = useRef<HTMLSpanElement>(null);
  const debugDirRef = useRef<HTMLSpanElement>(null);
  const debugSceneRef = useRef<HTMLSpanElement>(null);
  const debugPinRef = useRef<HTMLSpanElement>(null);
  const debugIEIOpacityRef = useRef<HTMLSpanElement>(null);
  const debugHomepageRevealRef = useRef<HTMLSpanElement>(null);
  const debugCameraRef = useRef<HTMLSpanElement>(null);
  const debugRafRef = useRef<HTMLSpanElement>(null);

  // Core native scroll handler — 1:1 physical continuity, zero lag in both directions
  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const trackTop = track.offsetTop;
    const trackHeight = track.offsetHeight;
    const viewportH = window.innerHeight;
    const total = trackHeight - viewportH;

    const currentY = window.scrollY;
    const scrolled = currentY - trackTop;
    const progress = Math.max(0, Math.min(1, scrolled / total));

    // Direction tracking (instantaneous delta)
    let direction: 'DOWN' | 'UP' | 'IDLE' = 'IDLE';
    if (currentY > lastScrollYRef.current + 0.5) direction = 'DOWN';
    else if (currentY < lastScrollYRef.current - 0.5) direction = 'UP';
    lastScrollYRef.current = currentY;

    // Single source of truth update
    scrollYProgress.set(progress);
    setIntroProgress(progress);

    // Development overlay direct DOM updates (Zero React re-render overhead!)
    if (isDev) {
      rafCountRef.current += 1;

      // Exact 18-stage scene detection
      let sceneName = '00 INITIAL IDENTITY';
      if (progress < 0.03) sceneName = '00 INITIAL IDENTITY';
      else if (progress < 0.16) sceneName = '01 LINE CONSTRUCTION';
      else if (progress < 0.23) sceneName = '02 FULL 2D EMBLEM';
      else if (progress < 0.31) sceneName = '03 LAYER STACKING';
      else if (progress < 0.38) sceneName = '04 3D IEI EMBLEM';
      else if (progress < 0.44) sceneName = '05 IEI IDENTITY HOLD';
      else if (progress < 0.50) sceneName = '06 THE INSTITUTION';
      else if (progress < 0.53) sceneName = '07 ENGINEERS';
      else if (progress < 0.55) sceneName = '08 INDIA';
      else if (progress < 0.64) sceneName = '09 I / E / I FORMATION';
      else if (progress < 0.70) sceneName = '10 GIANT I / E / I HOLD';
      else if (progress < 0.80) sceneName = '11 CAMERA APPROACH';
      else if (progress < 0.88) sceneName = '12 PORTAL SPACE';
      else if (progress < 0.92) sceneName = '13 HOMEPAGE THROUGH IEI';
      else if (progress < 0.96) sceneName = '14 IEI TRANSPARENCY';
      else if (progress < 0.98) sceneName = '15 IEI DISAPPEARS';
      else if (progress < 1.00) sceneName = '16 HOMEPAGE FULL TAKEOVER';
      else sceneName = '17 INTRO RELEASE';

      // Computed spatial IEI opacity (matches IEIPortal.tsx monolithOpacity)
      let ieiOp = 0;
      if (progress >= 0.60 && progress < 0.64) ieiOp = (progress - 0.60) / 0.04;
      else if (progress >= 0.64 && progress <= 0.80) ieiOp = 1.0;
      else if (progress > 0.80 && progress <= 0.86) ieiOp = 1.0 - ((progress - 0.80) / 0.06) * 0.25;
      else if (progress > 0.86 && progress <= 0.91) ieiOp = 0.75 - ((progress - 0.86) / 0.05) * 0.37;
      else if (progress > 0.91 && progress <= 0.95) ieiOp = 0.38 - ((progress - 0.91) / 0.04) * 0.26;
      else if (progress > 0.95 && progress <= 0.98) ieiOp = 0.12 - ((progress - 0.95) / 0.03) * 0.10;
      else if (progress > 0.98 && progress <= 1.00) ieiOp = 0.02 - ((progress - 0.98) / 0.02) * 0.02;

      // Computed Homepage reveal opacity (matches IEIPortal.tsx homepageOpacity)
      let hpReveal = 0;
      if (progress >= 0.78 && progress <= 0.84) hpReveal = ((progress - 0.78) / 0.06) * 0.15;
      else if (progress > 0.84 && progress <= 0.90) hpReveal = 0.15 + ((progress - 0.84) / 0.06) * 0.40;
      else if (progress > 0.90 && progress <= 0.95) hpReveal = 0.55 + ((progress - 0.90) / 0.05) * 0.33;
      else if (progress > 0.95 && progress <= 0.99) hpReveal = 0.88 + ((progress - 0.95) / 0.04) * 0.10;
      else if (progress > 0.99) hpReveal = 1.0;

      // Camera progress (0.00 at 0.70 to 1.00 at 0.98)
      const camProg = Math.max(0, Math.min(1, (progress - 0.70) / 0.28));

      // Direct DOM writes
      if (debugProgressRef.current) debugProgressRef.current.textContent = progress.toFixed(3);
      if (debugDirRef.current) {
        debugDirRef.current.textContent = direction;
        debugDirRef.current.style.color = direction === 'UP' ? '#FFaa00' : '#00FF88';
      }
      if (debugSceneRef.current) debugSceneRef.current.textContent = sceneName;
      if (debugPinRef.current) {
        const pinText = progress < 0.99 ? 'ACTIVE' : 'RELEASED';
        debugPinRef.current.textContent = pinText;
        debugPinRef.current.style.color = progress < 0.99 ? '#00FF88' : '#FFaa00';
      }
      if (debugIEIOpacityRef.current) debugIEIOpacityRef.current.textContent = ieiOp.toFixed(2);
      if (debugHomepageRevealRef.current) debugHomepageRevealRef.current.textContent = hpReveal.toFixed(2);
      if (debugCameraRef.current) debugCameraRef.current.textContent = camProg.toFixed(2);
      if (debugRafRef.current) debugRafRef.current.textContent = String(rafCountRef.current);
    }
  }, [scrollYProgress, setIntroProgress, isDev]);

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
              <span className={styles.debugLabel}>progress:</span>
              <span ref={debugProgressRef} style={{ color: '#00FF88' }}>0.000</span>
            </div>
            <div className={styles.debugRow}>
              <span className={styles.debugLabel}>direction:</span>
              <span ref={debugDirRef} style={{ color: '#00FF88' }}>IDLE</span>
            </div>
            <div className={styles.debugRow}>
              <span className={styles.debugLabel}>scene:</span>
              <span ref={debugSceneRef}>00 INITIAL IDENTITY</span>
            </div>
            <div className={styles.debugRow}>
              <span className={styles.debugLabel}>pin:</span>
              <span ref={debugPinRef} style={{ color: '#00FF88' }}>ACTIVE</span>
            </div>
            <div className={styles.debugRow}>
              <span className={styles.debugLabel}>IEI opacity:</span>
              <span ref={debugIEIOpacityRef}>0.00</span>
            </div>
            <div className={styles.debugRow}>
              <span className={styles.debugLabel}>homepage reveal:</span>
              <span ref={debugHomepageRevealRef}>0.00</span>
            </div>
            <div className={styles.debugRow}>
              <span className={styles.debugLabel}>camera progress:</span>
              <span ref={debugCameraRef}>0.00</span>
            </div>
            <div className={styles.debugRow}>
              <span className={styles.debugLabel}>frames:</span>
              <span ref={debugRafRef}>0</span>
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
