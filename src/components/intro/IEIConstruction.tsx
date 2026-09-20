'use client';

import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { IEIEmblemVector } from './IEIEmblemVector';
import styles from './IEIConstruction.module.css';

interface IEIConstructionProps {
  progress: MotionValue<number>;
  reducedMotion?: boolean;
  isQAMode?: boolean;
}

export const IEIConstruction: React.FC<IEIConstructionProps> = ({
  progress,
  reducedMotion = false,
  isQAMode = false,
}) => {
  // STAGE 01 & 02: 0.00 -> 0.30
  // Vector line drawing: 0.00 -> 0.16
  // Full 2D vector lock: 0.16 -> 0.23
  // Fade out as 3D stack takes over: 0.23 -> 0.30
  const stageOpacity = useTransform(
    progress,
    [0, 0.02, 0.23, 0.30],
    [0.1, 1, 1, 0]
  );

  const emblemScale = useTransform(
    progress,
    [0, 0.10, 0.23],
    [reducedMotion ? 1 : 0.95, 1, 1]
  );

  // Concentric engineering drafting guide rings (subtle drafting lines that disappear)
  const draftingOpacity = useTransform(
    progress,
    [0, 0.02, 0.16, 0.22],
    [0, 0.35, 0.35, 0]
  );

  return (
    <motion.div
      className={styles.constructionWrap}
      style={{
        opacity: stageOpacity,
        scale: emblemScale,
      }}
      aria-hidden="true"
    >
      {/* Subtle drafting guide concentric rings strictly matching emblem radii */}
      <motion.svg
        className={styles.draftingRings}
        viewBox="0 0 316 316"
        style={{ opacity: draftingOpacity }}
      >
        <circle cx="158" cy="158" r="157" stroke="var(--accent)" strokeWidth="0.5" strokeDasharray="4 4" fill="none" />
        <circle cx="158" cy="158" r="150" stroke="var(--accent)" strokeWidth="0.5" strokeDasharray="2 4" fill="none" />
        <circle cx="158" cy="158" r="107" stroke="var(--accent)" strokeWidth="0.5" strokeDasharray="4 4" fill="none" />
      </motion.svg>

      {/* Programmatic Vector Emblem (Progressive SVG Path Construction) */}
      <IEIEmblemVector
        progress={progress}
        reducedMotion={reducedMotion}
        isQAMode={isQAMode}
      />
    </motion.div>
  );
};
