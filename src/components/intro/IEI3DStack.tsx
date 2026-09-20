'use client';

import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { EMBLEM_DATA } from './emblemData';
import styles from './IEI3DStack.module.css';

interface IEI3DStackProps {
  progress: MotionValue<number>;
  reducedMotion?: boolean;
}

export const IEI3DStack: React.FC<IEI3DStackProps> = ({
  progress,
  reducedMotion = false,
}) => {
  // STAGE 03 & 04 & 05: 0.23 -> 0.52
  // 0.23 -> 0.27: Fade in from 2D vector
  // 0.24 -> 0.31: Layer separation along Z-axis & subtle perspective tilt
  // 0.31 -> 0.38: Convergence into unified 3D emblem with edge highlight & depth
  // 0.38 -> 0.44: Emblem hold
  // 0.44 -> 0.52: Shift upward gently as Live Helvetica text arrives below, then fade out
  const stackOpacity = useTransform(
    progress,
    [0.23, 0.27, 0.46, 0.52],
    [0, 1, 1, 0]
  );

  // Restrained physical rotation showcasing dimensional depth
  const rotateX = useTransform(
    progress,
    [0.23, 0.30, 0.38, 0.44],
    [0, reducedMotion ? 0 : 10, 0, 0]
  );
  const rotateY = useTransform(
    progress,
    [0.23, 0.30, 0.38, 0.44],
    [0, reducedMotion ? 0 : -6, 0, 0]
  );

  // True Z-axis physical layer separation & convergence
  // Peak separation at 0.30, smoothly converging into unified 3D object by 0.38
  const zL1 = useTransform(progress, [0.24, 0.30, 0.38], [0, reducedMotion ? 0 : -45, 0]);
  const zL2 = useTransform(progress, [0.24, 0.30, 0.38], [0, reducedMotion ? 0 : -20, 0]);
  const zL4 = useTransform(progress, [0.24, 0.30, 0.38], [0, reducedMotion ? 0 : 25, 0]);
  const zL5 = useTransform(progress, [0.24, 0.30, 0.38], [0, reducedMotion ? 0 : 48, 0]);
  const zL6 = useTransform(progress, [0.24, 0.30, 0.38], [0, reducedMotion ? 0 : 70, 0]);

  const layerSeparationAlpha = useTransform(
    progress,
    [0.24, 0.28, 0.36, 0.40],
    [0, 0.85, 0.85, 0]
  );

  // Soft ambient depth shadow
  const shadowOpacity = useTransform(
    progress,
    [0.30, 0.38, 0.46, 0.52],
    [0, 0.6, 0.6, 0]
  );

  // Upward elevation as Stage 06 Live Typography enters below
  const stackY = useTransform(
    progress,
    [0.38, 0.45, 0.52],
    [0, -45, -75]
  );

  const stackScale = useTransform(
    progress,
    [0.23, 0.30, 0.38, 0.48],
    [0.96, 1, 1, 0.88]
  );

  return (
    <motion.div
      className={styles.stackWrapper}
      style={{
        opacity: stackOpacity,
        scale: stackScale,
        y: stackY,
      }}
      aria-hidden="true"
    >
      <motion.div
        className={styles.scene3D}
        style={{
          rotateX,
          rotateY,
        }}
      >
        {/* Converged ambient depth shadow */}
        <motion.div
          className={styles.convergedShadow}
          style={{ opacity: shadowOpacity }}
        />

        {/* ====================================================================
            LAYER 01 — Base Datum Plane (Z = -45px to 0)
            ==================================================================== */}
        <motion.div
          className={`${styles.layer} ${styles.layer1}`}
          style={{
            z: zL1,
            opacity: layerSeparationAlpha,
          }}
        >
          <svg viewBox="0 0 316 316" className={styles.layerSvg}>
            {EMBLEM_DATA['outer-border']?.map((p, i) => (
              <path key={`l1-${i}`} d={p.d} transform={p.transform} fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
            ))}
          </svg>
        </motion.div>

        {/* ====================================================================
            LAYER 02 — Outer Rope Border Ring (Z = -20px to 0)
            ==================================================================== */}
        <motion.div
          className={`${styles.layer} ${styles.layer2}`}
          style={{
            z: zL2,
            opacity: layerSeparationAlpha,
          }}
        >
          <svg viewBox="0 0 316 316" className={styles.layerSvg}>
            {EMBLEM_DATA['rope-border']?.map((p, i) => (
              <path key={`l2-${i}`} d={p.d} transform={p.transform} fill="currentColor" opacity="0.4" />
            ))}
          </svg>
        </motion.div>

        {/* ====================================================================
            LAYER 03 — Core Vector Foundation (Datum Baseline Z = 0)
            ==================================================================== */}
        <div className={`${styles.layer} ${styles.layer3}`}>
          <svg viewBox="0 0 316 316" className={styles.layerSvg} fill="currentColor">
            {Object.entries(EMBLEM_DATA).map(([group, paths]) => (
              <g key={`l3-${group}`}>
                {paths.map((p, i) => (
                  <path key={`l3-${group}-${i}`} d={p.d} transform={p.transform} />
                ))}
              </g>
            ))}
          </svg>
        </div>

        {/* ====================================================================
            LAYER 04 — Circular Typography Elevation (Z = +25px to 0)
            ==================================================================== */}
        <motion.div
          className={`${styles.layer} ${styles.layer4}`}
          style={{
            z: zL4,
            opacity: layerSeparationAlpha,
          }}
        >
          <svg viewBox="0 0 316 316" className={styles.layerSvg} fill="currentColor">
            {EMBLEM_DATA['circular-text']?.map((p, i) => (
              <path key={`l4-${i}`} d={p.d} transform={p.transform} />
            ))}
          </svg>
        </motion.div>

        {/* ====================================================================
            LAYER 05 — Central Figure & Engineering Objects (Z = +48px to 0)
            ==================================================================== */}
        <motion.div
          className={`${styles.layer} ${styles.layer5}`}
          style={{
            z: zL5,
            opacity: layerSeparationAlpha,
          }}
        >
          <svg viewBox="0 0 316 316" className={styles.layerSvg} fill="currentColor">
            {EMBLEM_DATA['central-artwork']?.map((p, i) => (
              <path key={`l5-${i}`} d={p.d} transform={p.transform} />
            ))}
          </svg>
        </motion.div>

        {/* ====================================================================
            LAYER 06 — Specular Bevel & Precision Rim Highlight (Z = +70px to 0)
            ==================================================================== */}
        <motion.div
          className={`${styles.layer} ${styles.layer6}`}
          style={{
            z: zL6,
            opacity: layerSeparationAlpha,
          }}
        >
          <svg viewBox="0 0 316 316" className={styles.layerSvg}>
            {EMBLEM_DATA['inner-ring']?.map((p, i) => (
              <path key={`l6-${i}`} d={p.d} transform={p.transform} fill="none" stroke="var(--accent)" strokeWidth="1.5" />
            ))}
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
