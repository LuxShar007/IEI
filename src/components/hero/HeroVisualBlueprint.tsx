'use client';

import React from 'react';
import { motion, type MotionValue, useTransform, useReducedMotion } from 'framer-motion';
import styles from './HeroVisualBlueprint.module.css';

interface HeroVisualBlueprintProps {
  progress?: MotionValue<number>;
}

export const HeroVisualBlueprint: React.FC<HeroVisualBlueprintProps> = ({ progress }) => {
  const shouldReduce = useReducedMotion();

  // Progression mapping (0 -> 1)
  // Stage 1: Blueprint (0 - 0.35)
  // Stage 2: Structure (0.25 - 0.65)
  // Stage 3: Form (0.55 - 0.85)
  // Stage 4: Reality (0.75 - 1.0)
  const defaultProgress = { get: () => 0 } as unknown as MotionValue<number>;
  const activeProgress = progress || defaultProgress;

  const blueprintOpacity = useTransform(activeProgress, [0, 0.3, 0.45], [1, 0.85, 0.1]);
  const structureOpacity = useTransform(activeProgress, [0.2, 0.45, 0.7], [0, 1, 0.2]);
  const formOpacity = useTransform(activeProgress, [0.45, 0.7, 0.9], [0, 1, 0.4]);
  const realityOpacity = useTransform(activeProgress, [0.7, 0.9, 1], [0, 0.8, 1]);

  const scale = useTransform(activeProgress, [0, 1], [1.02, shouldReduce ? 1.02 : 0.97]);
  const rotateX = useTransform(activeProgress, [0, 1], [0, shouldReduce ? 0 : 4]);

  return (
    <div className={styles.wrapper} aria-label="Engineering Evolution: Blueprint to Reality">
      <motion.div
        className={styles.perspectiveContainer}
        style={{ scale: shouldReduce ? 1 : scale, rotateX: shouldReduce ? 0 : rotateX }}
      >
        <svg
          viewBox="0 0 540 540"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.svgCanvas}
        >
          <defs>
            {/* Blueprint Grid Pattern */}
            <pattern id="blueprintGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.12" />
            </pattern>

            <linearGradient id="blueprintGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.85" />
              <stop offset="100%" stopColor="var(--accent-bright)" stopOpacity="0.4" />
            </linearGradient>

            <linearGradient id="realitySurface" x1="20%" y1="10%" x2="90%" y2="90%">
              <stop offset="0%" stopColor="var(--fg-primary)" stopOpacity="0.16" />
              <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.22" />
              <stop offset="100%" stopColor="var(--fg-primary)" stopOpacity="0.04" />
            </linearGradient>

            <linearGradient id="signalFacet" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--signal)" stopOpacity="0.75" />
              <stop offset="100%" stopColor="var(--signal)" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          {/* BACKGROUND TECHNICAL DRAFTING GRID */}
          <rect width="100%" height="100%" fill="url(#blueprintGrid)" className={styles.gridOverlay} />

          {/* STAGE 1 — BLUEPRINT: Schematic Technical Lines & Crosshairs */}
          <motion.g style={{ opacity: shouldReduce ? 1 : blueprintOpacity }} className={styles.blueprintLayer}>
            {/* Coordinate Axis & Crosshairs */}
            <line x1="40" y1="270" x2="500" y2="270" stroke="var(--border-strong)" strokeDasharray="3 4" strokeWidth="1" />
            <line x1="270" y1="40" x2="270" y2="500" stroke="var(--border-strong)" strokeDasharray="3 4" strokeWidth="1" />

            <circle cx="270" cy="270" r="180" stroke="var(--accent)" strokeWidth="1" strokeDasharray="4 6" strokeOpacity="0.4" />
            <circle cx="270" cy="270" r="110" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.5" />
            <circle cx="270" cy="270" r="40" stroke="var(--accent)" strokeWidth="1.2" />

            {/* Technical Dimension Marks */}
            <path d="M 90 90 L 110 90 M 90 90 L 90 110" stroke="var(--accent)" strokeWidth="1.5" />
            <path d="M 450 90 L 430 90 M 450 90 L 450 110" stroke="var(--accent)" strokeWidth="1.5" />
            <path d="M 90 450 L 110 450 M 90 450 L 90 430" stroke="var(--accent)" strokeWidth="1.5" />
            <path d="M 450 450 L 430 450 M 450 450 L 450 430" stroke="var(--accent)" strokeWidth="1.5" />

            {/* Blueprint Annotations */}
            <text x="50" y="80" fill="var(--fg-muted)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.1em">
              IEI.SYS / ARCH-01 · SCHEMATIC
            </text>
            <text x="360" y="475" fill="var(--accent)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.1em">
              TOLERANCE ±0.002mm
            </text>
          </motion.g>

          {/* STAGE 2 — STRUCTURE: Isometric 3D Wireframe Assembly */}
          <motion.g style={{ opacity: shouldReduce ? 0.7 : structureOpacity }} className={styles.structureLayer}>
            {/* Isometric Primary Cube / Prism Wireframe */}
            {/* Top Plane */}
            <polygon points="270,120 380,180 270,240 160,180" stroke="var(--accent)" strokeWidth="1.5" fill="none" />
            {/* Left Plane */}
            <polygon points="160,180 270,240 270,370 160,310" stroke="var(--accent)" strokeWidth="1.5" fill="none" />
            {/* Right Plane */}
            <polygon points="270,240 380,180 380,310 270,370" stroke="var(--accent)" strokeWidth="1.5" fill="none" />

            {/* Inner Structural Ribs */}
            <line x1="270" y1="180" x2="270" y2="310" stroke="var(--border-strong)" strokeDasharray="2 3" strokeWidth="1" />
            <line x1="215" y1="210" x2="325" y2="275" stroke="var(--border-strong)" strokeDasharray="2 3" strokeWidth="1" />
            <line x1="325" y1="210" x2="215" y2="275" stroke="var(--border-strong)" strokeDasharray="2 3" strokeWidth="1" />

            {/* Intersecting Torus Nodes */}
            <circle cx="270" cy="120" r="4" fill="var(--accent)" />
            <circle cx="380" cy="180" r="4" fill="var(--accent)" />
            <circle cx="160" cy="180" r="4" fill="var(--accent)" />
            <circle cx="270" cy="240" r="5" fill="var(--signal)" />
            <circle cx="270" cy="370" r="4" fill="var(--accent)" />
            <circle cx="160" cy="310" r="4" fill="var(--accent)" />
            <circle cx="380" cy="310" r="4" fill="var(--accent)" />
          </motion.g>

          {/* STAGE 3 — FORM: Volumetric Dimensional Surfaces */}
          <motion.g style={{ opacity: shouldReduce ? 0.8 : formOpacity }} className={styles.formLayer}>
            {/* Shaded Facets */}
            <polygon points="270,120 380,180 270,240 160,180" fill="url(#realitySurface)" stroke="var(--accent)" strokeWidth="1.2" />
            <polygon points="160,180 270,240 270,370 160,310" fill="var(--fg-primary)" fillOpacity="0.05" stroke="var(--accent-dim)" strokeWidth="1.2" />
            <polygon points="270,240 380,180 380,310 270,370" fill="var(--fg-primary)" fillOpacity="0.09" stroke="var(--accent-dim)" strokeWidth="1.2" />

            {/* Accent Signal Inset */}
            <polygon points="270,210 325,240 270,270 215,240" fill="url(#signalFacet)" stroke="var(--signal)" strokeWidth="1.2" />
          </motion.g>

          {/* STAGE 4 — REALITY: Precision Engineering Realization */}
          <motion.g style={{ opacity: shouldReduce ? 1 : realityOpacity }} className={styles.realityLayer}>
            {/* High Definition Outer Core */}
            <polygon points="270,105 400,175 270,245 140,175" fill="var(--surface-card)" stroke="var(--fg-primary)" strokeWidth="2" />
            <polygon points="140,175 270,245 270,390 140,320" fill="var(--surface-elevated)" stroke="var(--fg-primary)" strokeWidth="2" />
            <polygon points="270,245 400,175 400,320 270,390" fill="var(--surface-base)" stroke="var(--fg-primary)" strokeWidth="2" />

            {/* Core Circuit Center Node */}
            <circle cx="270" cy="245" r="8" fill="var(--signal)" />
            <circle cx="270" cy="245" r="14" stroke="var(--signal)" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Engineering Detail Highlights */}
            <path d="M 210 140 L 330 210" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
            <path d="M 270 270 L 270 360" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
            <path d="M 330 280 L 370 260" stroke="var(--signal)" strokeWidth="1.5" strokeLinecap="round" />
          </motion.g>
        </svg>

        {/* METAPHOR PROGRESS LABEL */}
        <div className={styles.stageTracker}>
          <div className={styles.stageItem}>
            <span className={styles.stageDot} />
            <span className={styles.stageName}>BLUEPRINT</span>
          </div>
          <span className={styles.stageArrow}>→</span>
          <div className={styles.stageItem}>
            <span className={styles.stageName}>STRUCTURE</span>
          </div>
          <span className={styles.stageArrow}>→</span>
          <div className={styles.stageItem}>
            <span className={styles.stageName}>FORM</span>
          </div>
          <span className={styles.stageArrow}>→</span>
          <div className={styles.stageItem}>
            <span className={styles.stageName}>REALITY</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
