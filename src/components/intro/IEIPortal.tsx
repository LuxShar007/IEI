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
  // STAGE 08 — Monolith I E I Opacity:
  // 0.60 -> 0.70: Solidifies and scales up
  // 0.86 -> 0.96: Opacity decreases progressively as camera enters
  // 0.98 -> 1.00: Completely disappears
  const monolithOpacity = useTransform(
    progress,
    [0.58, 0.65, 0.86, 0.96, 0.99],
    [0, 1, 1, 0.2, 0]
  );

  // STAGE 09 & 10 — Camera Physics (Scale, TranslateZ, Perspective, Parallax)
  // Progressive exponential-feeling scale to simulate physical camera flight into the letter
  const cameraScale = useTransform(
    progress,
    [0.64, 0.72, 0.80, 0.88, 0.94, 0.98],
    [1, 1.6, 3.8, 10.5, 24.0, reducedMotion ? 1.05 : 36.0]
  );

  const cameraZ = useTransform(
    progress,
    [0.64, 0.78, 0.90, 0.98],
    [0, reducedMotion ? 0 : 350, reducedMotion ? 0 : 900, reducedMotion ? 0 : 1600]
  );

  const perspectiveValue = useTransform(
    progress,
    [0.64, 0.85, 0.98],
    ['1200px', '700px', '400px']
  );

  // Lateral shift targeting the aperture of letter 'E'
  const cameraX = useTransform(
    progress,
    [0.72, 0.88, 0.98],
    ['0%', '0%', reducedMotion ? '0%' : '1%']
  );
  const cameraY = useTransform(
    progress,
    [0.72, 0.88, 0.98],
    ['0%', '-4%', reducedMotion ? '0%' : '-8%']
  );

  // Left 'I' and Right 'I' separate outward as camera pushes into central 'E'
  const leftShift = useTransform(
    progress,
    [0.68, 0.85, 0.95],
    ['0px', reducedMotion ? '0px' : '-80px', reducedMotion ? '0px' : '-220px']
  );
  const rightShift = useTransform(
    progress,
    [0.68, 0.85, 0.95],
    ['0px', reducedMotion ? '0px' : '80px', reducedMotion ? '0px' : '220px']
  );

  // STAGE 12 & 13 — Background Homepage Reveal
  // Exists behind/inside the letter before pass-through!
  // 0.75: begins appearing behind IEI
  // 0.88: strongly visible
  // 0.98 -> 1.00: 100% full takeover
  const homepageOpacity = useTransform(
    progress,
    [0.72, 0.82, 0.92, 0.98],
    [0, 0.3, 0.85, 1.0]
  );

  const homepageScale = useTransform(
    progress,
    [0.75, 0.92, 0.99],
    [reducedMotion ? 1 : 0.92, reducedMotion ? 1 : 0.98, 1.0]
  );

  // Portal atmospheric light glow
  const glowOpacity = useTransform(
    progress,
    [0.66, 0.80, 0.92, 0.98],
    [0, 0.65, 0.8, 0]
  );
  const glowScale = useTransform(
    progress,
    [0.66, 0.85, 0.98],
    [0.6, 1.8, 3.5]
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
          pointerEvents: useTransform(progress, (p) => (p >= 0.92 ? 'auto' : 'none')),
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
