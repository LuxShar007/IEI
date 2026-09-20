'use client';

import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import styles from './IdentityTypography.module.css';

interface IdentityTypographyProps {
  progress: MotionValue<number>;
  reducedMotion?: boolean;
}

export const IdentityTypography: React.FC<IdentityTypographyProps> = ({
  progress,
  reducedMotion = false,
}) => {
  // Stage 06 Full Title appearance (0.43 -> 0.54)
  const fullTitleOpacity = useTransform(
    progress,
    [0.43, 0.47, 0.51, 0.55],
    [0, 1, 1, 0]
  );
  const fullTitleY = useTransform(
    progress,
    [0.43, 0.48, 0.55],
    [reducedMotion ? 0 : 25, 0, reducedMotion ? 0 : -20]
  );

  // Stage 07 Decomposition Appearance (0.52 -> 0.65)
  const decompOpacity = useTransform(
    progress,
    [0.51, 0.55, 0.64, 0.68],
    [0, 1, 1, 0]
  );

  // Trailing letters fade out: INSTITUTION -> I, ENGINEERS -> E, INDIA -> I
  const trailingOpacity = useTransform(
    progress,
    [0.53, 0.60],
    [1, 0]
  );
  const trailingMaxWidth = useTransform(
    progress,
    [0.54, 0.61],
    ['200px', '0px']
  );

  // Triad letters drift scale and centering
  const triadScale = useTransform(
    progress,
    [0.54, 0.62, 0.68],
    [0.9, 1.05, reducedMotion ? 1.05 : 1.35]
  );
  const triadGap = useTransform(
    progress,
    [0.54, 0.62],
    ['clamp(0.5rem, 2vw, 2rem)', 'clamp(2rem, 6vw, 6rem)']
  );

  return (
    <div className={styles.typographyWrap} aria-hidden="true">
      {/* STAGE 06 — Full Institutional Name */}
      <motion.div
        className={styles.fullTitleGroup}
        style={{
          opacity: fullTitleOpacity,
          y: fullTitleY,
        }}
      >
        <div className={styles.subHeader}>
          <span className={styles.subDot} />
          <span>SIES Graduate School of Technology</span>
          <span>·</span>
          <span>Student Chapter</span>
        </div>
        <h2 className={styles.mainTitle}>
          The Institution of Engineers (India)
        </h2>
      </motion.div>

      {/* STAGE 07 — Typographic Decomposition: INSTITUTION ENGINEERS INDIA -> I E I */}
      <motion.div
        className={styles.decompositionContainer}
        style={{
          opacity: decompOpacity,
          scale: triadScale,
          gap: triadGap,
        }}
      >
        {/* WORD 1: INSTITUTION -> I */}
        <div className={styles.wordBlock}>
          <span className={styles.initialLetter}>I</span>
          <motion.span
            className={styles.trailingLetters}
            style={{
              opacity: trailingOpacity,
              maxWidth: trailingMaxWidth,
              overflow: 'hidden',
              display: 'inline-block',
            }}
          >
            nstitution
          </motion.span>
        </div>

        {/* WORD 2: ENGINEERS -> E */}
        <div className={styles.wordBlock}>
          <span className={styles.initialLetter}>E</span>
          <motion.span
            className={styles.trailingLetters}
            style={{
              opacity: trailingOpacity,
              maxWidth: trailingMaxWidth,
              overflow: 'hidden',
              display: 'inline-block',
            }}
          >
            ngineers
          </motion.span>
        </div>

        {/* WORD 3: INDIA -> I */}
        <div className={styles.wordBlock}>
          <span className={styles.initialLetter}>I</span>
          <motion.span
            className={styles.trailingLetters}
            style={{
              opacity: trailingOpacity,
              maxWidth: trailingMaxWidth,
              overflow: 'hidden',
              display: 'inline-block',
            }}
          >
            ndia
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
};
