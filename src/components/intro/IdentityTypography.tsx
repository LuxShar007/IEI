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
  // Stage 06 Full Title appearance (0.44 -> 0.49)
  const fullTitleOpacity = useTransform(
    progress,
    [0.44, 0.46, 0.48, 0.50],
    [0, 1, 1, 0]
  );
  const fullTitleY = useTransform(
    progress,
    [0.44, 0.47, 0.50],
    [reducedMotion ? 0 : 25, 0, reducedMotion ? 0 : -20]
  );

  // Sequential Entry: IEI Emblem -> Institution -> Engineers -> India -> I / E / I
  // Word 1: INSTITUTION arrives at 0.48 -> 0.50
  const word1Opacity = useTransform(
    progress,
    [0.48, 0.50, 0.64, 0.67],
    [0, 1, 1, 0]
  );
  const word1Y = useTransform(
    progress,
    [0.48, 0.50],
    [reducedMotion ? 0 : 18, 0]
  );

  // Word 2: ENGINEERS arrives at 0.50 -> 0.52
  const word2Opacity = useTransform(
    progress,
    [0.50, 0.52, 0.64, 0.67],
    [0, 1, 1, 0]
  );
  const word2Y = useTransform(
    progress,
    [0.50, 0.52],
    [reducedMotion ? 0 : 18, 0]
  );

  // Word 3: INDIA arrives at 0.52 -> 0.54
  const word3Opacity = useTransform(
    progress,
    [0.52, 0.54, 0.64, 0.67],
    [0, 1, 1, 0]
  );
  const word3Y = useTransform(
    progress,
    [0.52, 0.54],
    [reducedMotion ? 0 : 18, 0]
  );

  // Trailing letters: INSTITUTION -> I, ENGINEERS -> E, INDIA -> I
  // Hold full words readable (0.54 -> 0.585) so all 11 letters of INSTITUTION are held stable
  // Progressive contraction and fade out: 0.585 -> 0.63
  // 500px maxWidth ensures NSTITUTION is never clipped at any desktop resolution
  const trailingOpacity = useTransform(
    progress,
    [0.585, 0.63],
    [1, 0]
  );
  const trailingMaxWidth = useTransform(
    progress,
    [0.585, 0.63],
    ['500px', '0px']
  );

  // Triad letters drift scale and centering into I E I formation
  const triadScale = useTransform(
    progress,
    [0.585, 0.64, 0.67],
    [0.95, 1.05, reducedMotion ? 1.05 : 1.15]
  );
  const triadGap = useTransform(
    progress,
    [0.585, 0.64],
    ['clamp(0.75rem, 3.2vw, 3.5rem)', 'clamp(2rem, 6vw, 6rem)']
  );

  return (
    <div className={styles.typographyWrap} aria-hidden="true">
      {/* STAGE 06 — Full Institutional Name Header */}
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

      {/* STAGE 07 & 08 — Sequential Typographic Composition & Decomposition:
          INSTITUTION ENGINEERS INDIA -> I E I */}
      <motion.div
        className={styles.decompositionContainer}
        style={{
          scale: triadScale,
          gap: triadGap,
        }}
      >
        {/* WORD 1: INSTITUTION -> I
            Layer 1: Large cinematic initial 'I'
            Layer 2: Live text 'NSTITUTION' (all remaining 10 letters)
            Total composition reads: I   NSTITUTION (11 letters) */}
        <motion.div
          className={styles.wordBlock}
          style={{ opacity: word1Opacity, y: word1Y }}
          aria-label="INSTITUTION"
        >
          <span
            className={styles.initialLetter}
            data-layer="cinematic-initial"
            aria-hidden="true"
          >
            I
          </span>
          <motion.span
            className={styles.trailingLetters}
            data-layer="live-text"
            aria-hidden="true"
            style={{
              opacity: trailingOpacity,
              maxWidth: trailingMaxWidth,
              overflow: 'hidden',
              display: 'inline-block',
            }}
          >
            NSTITUTION
          </motion.span>
        </motion.div>

        {/* WORD 2: ENGINEERS -> E
            Layer 1: Large cinematic initial 'E'
            Layer 2: Live text 'NGINEERS' (all remaining 8 letters)
            Total composition reads: E   NGINEERS (9 letters) */}
        <motion.div
          className={styles.wordBlock}
          style={{ opacity: word2Opacity, y: word2Y }}
          aria-label="ENGINEERS"
        >
          <span
            className={styles.initialLetter}
            data-layer="cinematic-initial"
            aria-hidden="true"
          >
            E
          </span>
          <motion.span
            className={styles.trailingLetters}
            data-layer="live-text"
            aria-hidden="true"
            style={{
              opacity: trailingOpacity,
              maxWidth: trailingMaxWidth,
              overflow: 'hidden',
              display: 'inline-block',
            }}
          >
            NGINEERS
          </motion.span>
        </motion.div>

        {/* WORD 3: INDIA -> I
            Layer 1: Large cinematic initial 'I'
            Layer 2: Live text 'NDIA' (all remaining 4 letters)
            Total composition reads: I   NDIA (5 letters) */}
        <motion.div
          className={styles.wordBlock}
          style={{ opacity: word3Opacity, y: word3Y }}
          aria-label="INDIA"
        >
          <span
            className={styles.initialLetter}
            data-layer="cinematic-initial"
            aria-hidden="true"
          >
            I
          </span>
          <motion.span
            className={styles.trailingLetters}
            data-layer="live-text"
            aria-hidden="true"
            style={{
              opacity: trailingOpacity,
              maxWidth: trailingMaxWidth,
              overflow: 'hidden',
              display: 'inline-block',
            }}
          >
            NDIA
          </motion.span>
        </motion.div>
      </motion.div>
    </div>
  );
};

