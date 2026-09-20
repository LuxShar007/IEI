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
  // STAGE 09 -> 16: Monolith I E I Opacity & Spatial Transparency Curve:
  // 0.60 -> 0.64: Fades in (0 -> 1)
  // 0.64 -> 0.80: HERO HOLD + APPROACH (fully opaque: 1)
  // 0.80 -> 0.86: Begins becoming transparent as camera approaches (1.0 -> 0.75)
  // 0.86 -> 0.91: Translucent — homepage clearly visible through letters (0.75 -> 0.38)
  // 0.91 -> 0.95: Significantly transparent (0.38 -> 0.12)
  // 0.95 -> 0.98: Faint silhouette edge (0.12 -> 0.02)
  // 0.98 -> 1.00: Completely gone (0.02 -> 0)
  const monolithOpacity = useTransform(
    progress,
    [0.60, 0.64, 0.80, 0.86, 0.91, 0.95, 0.98, 1.00],
    [0, 1, 1, 0.75, 0.38, 0.12, 0.02, 0]
  );

  // STAGE 10 -> 16: Camera Physics (Scale, TranslateZ, Perspective, Parallax)
  // 0.64 -> 0.70: STATIC HERO HOLD — scale remains 1.0, camera does NOT approach
  // 0.70 -> 0.80: Camera approach begins (1.0 -> 2.2)
  // 0.80 -> 0.84: Approach dominance (2.2 -> 5.2)
  // 0.84 -> 0.88: Targeting aperture of central 'E' (5.2 -> 11.0)
  // 0.88 -> 0.93: Pushing into portal gateway (11.0 -> 22.0)
  // 0.93 -> 0.98: Approaching aperture threshold (22.0 -> 36.0)
  // 0.98 -> 1.00: Passing through portal (36.0 -> 42.0)
  const cameraScale = useTransform(
    progress,
    [0.60, 0.70, 0.80, 0.84, 0.88, 0.93, 0.98, 1.00],
    [1, 1, 2.2, 5.2, 11.0, 22.0, reducedMotion ? 1.05 : 36.0, reducedMotion ? 1.05 : 42.0]
  );

  const cameraZ = useTransform(
    progress,
    [0.60, 0.70, 0.80, 0.88, 0.94, 0.98, 1.00],
    [0, 0, reducedMotion ? 0 : 250, reducedMotion ? 0 : 700, reducedMotion ? 0 : 1250, reducedMotion ? 0 : 1600, reducedMotion ? 0 : 1800]
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
    [0.72, 0.84, 0.92, 0.98],
    ['0px', reducedMotion ? '0px' : '-40px', reducedMotion ? '0px' : '-140px', reducedMotion ? '0px' : '-280px']
  );
  const rightShift = useTransform(
    progress,
    [0.72, 0.84, 0.92, 0.98],
    ['0px', reducedMotion ? '0px' : '40px', reducedMotion ? '0px' : '140px', reducedMotion ? '0px' : '280px']
  );

  // STAGE 13 -> 16: Background Homepage Reveal
  // Exists behind and inside the letters — visible through as IEI becomes transparent.
  // 0.00 -> 0.78: visually suppressed (0)
  // 0.78 -> 0.84: subtle glow beginning to show through approaching IEI (0 -> 0.15)
  // 0.84 -> 0.90: clearly visible through semi-transparent IEI (0.15 -> 0.55)
  // 0.90 -> 0.95: dominant (0.55 -> 0.88)
  // 0.95 -> 0.99: almost fully dominant (0.88 -> 0.98)
  // 0.99 -> 1.00: 100% full takeover (0.98 -> 1.00)
  const homepageOpacity = useTransform(
    progress,
    [0.78, 0.84, 0.90, 0.95, 0.99, 1.00],
    [0, 0.15, 0.55, 0.88, 0.98, 1.00]
  );

  // Portal atmospheric light glow
  const glowOpacity = useTransform(
    progress,
    [0.74, 0.86, 0.93, 0.98],
    [0, 0.65, 0.45, 0]
  );
  const glowScale = useTransform(
    progress,
    [0.74, 0.86, 0.93, 0.98],
    [0.7, 1.8, 3.2, 4.2]
  );

  return (
    <motion.div
      className={styles.portalContainer}
      style={{
        perspective: perspectiveValue,
      }}
    >
      {/* BACKGROUND HOMEPAGE LAYER — Exists inside/behind the 3D portal
          Visually completely stable: no vertical movement, no scaling */}
      <motion.div
        className={styles.homepagePortalLayer}
        style={{
          opacity: homepageOpacity,
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
