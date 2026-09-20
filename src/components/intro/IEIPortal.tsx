'use client';

import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import styles from './IEIPortal.module.css';

interface IEIPortalProps {
  progress: MotionValue<number>;
  reducedMotion?: boolean;
  children: React.ReactNode;
}

export const IEIPortal: React.FC<IEIPortalProps> = ({
  progress,
  reducedMotion = false,
  children,
}) => {
  // STAGE 09 & 10 & 14 & 15 — Monolith I E I Opacity:
  // 0.60 -> 0.64: Fades in and solidifies
  // 0.64 -> 0.70: HERO HOLD (100% opaque, static composition)
  // 0.70 -> 0.88: Camera approaches; monolith remains fully visible
  // 0.88 -> 0.92: Monolith begins transparency as homepage reveals behind it
  // 0.92 -> 0.96: Monolith becomes significantly transparent
  // 0.96 -> 0.99: Monolith completely disappears
  const monolithOpacity = useTransform(
    progress,
    [0.60, 0.64, 0.88, 0.92, 0.95, 0.98, 1.00],
    [0, 1, 1, 0.70, 0.25, 0.05, 0]
  );

  // STAGE 10 & 11 & 12 — Camera Physics (Scale, TranslateZ, Perspective, Parallax)
  // 0.64 -> 0.70: STATIC HERO HOLD — scale remains 1.0, camera does NOT approach
  // 0.70 -> 0.98: Progressive exponential scale simulating physical flight into 'E'
  const cameraScale = useTransform(
    progress,
    [0.60, 0.70, 0.78, 0.86, 0.92, 0.98, 1.00],
    [1, 1, 2.2, 6.5, 16.0, reducedMotion ? 1.05 : 32.0, reducedMotion ? 1.05 : 36.0]
  );

  const cameraZ = useTransform(
    progress,
    [0.60, 0.70, 0.80, 0.90, 0.98],
    [0, 0, reducedMotion ? 0 : 300, reducedMotion ? 0 : 850, reducedMotion ? 0 : 1600]
  );

  const perspectiveValue = useTransform(
    progress,
    [0.70, 0.88, 0.98],
    ['1200px', '750px', '450px']
  );

  // Lateral shift targeting the aperture of letter 'E'
  const cameraX = useTransform(
    progress,
    [0.70, 0.88, 0.98],
    ['0%', '0%', reducedMotion ? '0%' : '1%']
  );
  const cameraY = useTransform(
    progress,
    [0.70, 0.88, 0.98],
    ['0%', '-3%', reducedMotion ? '0%' : '-6%']
  );

  // Left 'I' and Right 'I' separate outward as camera pushes into central 'E'
  const leftShift = useTransform(
    progress,
    [0.72, 0.86, 0.96],
    ['0px', reducedMotion ? '0px' : '-80px', reducedMotion ? '0px' : '-220px']
  );
  const rightShift = useTransform(
    progress,
    [0.72, 0.86, 0.96],
    ['0px', reducedMotion ? '0px' : '80px', reducedMotion ? '0px' : '220px']
  );

  // STAGE 13, 14, 16 — Background Homepage Reveal
  // Exists behind and inside the letter before pass-through!
  // 0.86: begins appearing behind IEI
  // 0.90: clearly visible through transparent letters
  // 0.94: strongly visible as monolith fades
  // 0.98 -> 1.00: 100% full takeover
  const homepageOpacity = useTransform(
    progress,
    [0.86, 0.90, 0.94, 0.98, 1.00],
    [0, 0.30, 0.75, 0.98, 1.00]
  );

  const homepageScale = useTransform(
    progress,
    [0.86, 0.94, 1.00],
    [reducedMotion ? 1 : 0.95, reducedMotion ? 1 : 0.985, 1.0]
  );

  // Portal atmospheric light glow
  const glowOpacity = useTransform(
    progress,
    [0.72, 0.84, 0.92, 0.97],
    [0, 0.70, 0.50, 0]
  );
  const glowScale = useTransform(
    progress,
    [0.72, 0.88, 0.98],
    [0.7, 2.0, 3.8]
  );

  return (
    <motion.div
      className={styles.portalContainer}
      style={{
        perspective: perspectiveValue,
      }}
    >
      {/* BACKGROUND HOMEPAGE LAYER — Exists inside/behind the 3D portal */}
      <motion.div
        className={styles.homepagePortalLayer}
        style={{
          opacity: homepageOpacity,
          scale: homepageScale,
          pointerEvents: useTransform(progress, (p) => (p >= 0.98 ? 'auto' : 'none')),
        }}
      >
        {children}
      </motion.div>

      {/* PORTAL DEPTH APERTURE GLOW */}
      <motion.div
        className={styles.portalGlow}
        style={{
          opacity: glowOpacity,
          scale: glowScale,
        }}
        aria-hidden="true"
      />

      {/* FOREGROUND 3D I E I TYPOGRAPHIC MONOLITH & CAMERA RIG */}
      <motion.div
        className={styles.cameraStage}
        style={{
          x: cameraX,
          y: cameraY,
          z: cameraZ,
          scale: cameraScale,
          opacity: monolithOpacity,
        }}
        aria-hidden="true"
      >
        <div className={styles.monolithGroup}>
          {/* LETTER 1: 'I' (Left Pillar) */}
          <motion.div
            className={styles.letter3D}
            style={{ x: leftShift }}
          >
            <span className={styles.extrusionFront}>I</span>
            <span className={`${styles.extrusionLayer} ${styles.ext1}`}>I</span>
            <span className={`${styles.extrusionLayer} ${styles.ext2}`}>I</span>
            <span className={`${styles.extrusionLayer} ${styles.ext3}`}>I</span>
            <span className={`${styles.extrusionLayer} ${styles.ext4}`}>I</span>
          </motion.div>

          {/* LETTER 2: 'E' (Central Portal Gateway) */}
          <div className={`${styles.letter3D} ${styles.letterEWrapper}`}>
            <span className={styles.extrusionFront}>E</span>
            <span className={`${styles.extrusionLayer} ${styles.ext1}`}>E</span>
            <span className={`${styles.extrusionLayer} ${styles.ext2}`}>E</span>
            <span className={`${styles.extrusionLayer} ${styles.ext3}`}>E</span>
            <span className={`${styles.extrusionLayer} ${styles.ext4}`}>E</span>
          </div>

          {/* LETTER 3: 'I' (Right Pillar) */}
          <motion.div
            className={styles.letter3D}
            style={{ x: rightShift }}
          >
            <span className={styles.extrusionFront}>I</span>
            <span className={`${styles.extrusionLayer} ${styles.ext1}`}>I</span>
            <span className={`${styles.extrusionLayer} ${styles.ext2}`}>I</span>
            <span className={`${styles.extrusionLayer} ${styles.ext3}`}>I</span>
            <span className={`${styles.extrusionLayer} ${styles.ext4}`}>I</span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
