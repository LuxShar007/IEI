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

  // Scroll tracking across the pinned track
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end start'],
  });

  // Heavy, physical spring damping for smooth cinematic camera physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
    restDelta: 0.001,
  });

  const [stageText, setStageText] = useState('STAGE 01 // EMBLEM GEOMETRY');

  // Report progress to IntroContext and update stage label
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (val) => {
      setIntroProgress(val);
      if (val < 0.22) setStageText('STAGE 01 // EMBLEM GEOMETRY');
      else if (val < 0.44) setStageText('STAGE 02 // 3D LAYER STACK');
      else if (val < 0.60) setStageText('STAGE 03 // INSTITUTIONAL DECOMPOSITION');
      else if (val < 0.90) setStageText('STAGE 04 // 3D PORTAL ENTRY');
      else setStageText('STAGE 05 // HOMEPAGE PASS-THROUGH');
    });
    return () => unsubscribe();
  }, [smoothProgress, setIntroProgress]);

  // HUD & UI Opacity: fades out cleanly as portal opens (0.80 -> 0.90)
  const hudOpacity = useTransform(
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
        {/* Subtle Vignette & Environmental Tone */}
        <div className={styles.ambientVignette} />

        {/* ACCESSIBILITY: Skip Button for Fast Navigation */}
        <motion.button
          className={styles.skipIntroBtn}
          style={{ opacity: hudOpacity }}
          onClick={skipIntro}
          aria-label="Skip cinematic introduction and proceed to homepage content"
        >
          Skip Intro [↓]
        </motion.button>

        {/* HUD TOP-LEFT: Technical Chapter Coordinates */}
        <motion.div
          className={styles.hudTopLeft}
          style={{ opacity: hudOpacity }}
          aria-hidden="true"
        >
          <span className={styles.hudMonoText}>
            IEI SIES GST <span className={styles.hudAccentText}>ECS DEPT</span>
          </span>
          <span className={styles.hudMonoText}>
            MH-04 // NAVI MUMBAI // EST. 1920
          </span>
        </motion.div>

        {/* HUD BOTTOM-RIGHT: Dynamic Stage Tracker */}
        <motion.div
          className={styles.hudBottomRight}
          style={{ opacity: hudOpacity }}
          aria-hidden="true"
        >
          <span className={`${styles.hudMonoText} ${styles.hudAccentText}`}>
            {stageText}
          </span>
        </motion.div>

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
            STAGE 01 & 02: Blueprint Engineering Linework & Official 2D Emblem
            ==================================================================== */}
        <IEIConstruction
          progress={smoothProgress}
          reducedMotion={Boolean(shouldReduceMotion)}
        />

        {/* ====================================================================
            STAGE 03, 04, 05: 3D Precision Layer Stacking & Physical Convergence
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
            (Wraps the Homepage Hero Environment inside the letter portal!)
            ==================================================================== */}
        <IEIPortal
          progress={smoothProgress}
          reducedMotion={Boolean(shouldReduceMotion)}
        >
          {children}
        </IEIPortal>
      </div>
    </section>
  );
};
