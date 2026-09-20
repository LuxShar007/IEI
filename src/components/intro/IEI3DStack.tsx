'use client';

import React from 'react';
import Image from 'next/image';
import { motion, MotionValue, useTransform } from 'framer-motion';
import styles from './IEI3DStack.module.css';

interface IEI3DStackProps {
  progress: MotionValue<number>;
  reducedMotion?: boolean;
}

export const IEI3DStack: React.FC<IEI3DStackProps> = ({
  progress,
  reducedMotion = false,
}) => {
  // Overall visibility of this stage: 0.20 -> 0.58
  const stackOpacity = useTransform(
    progress,
    [0.20, 0.24, 0.50, 0.58],
    [0, 1, 1, 0]
  );

  // Subtle 3D perspective tilts: tilts to showcase depth (0.24-0.34), then squares up (0.34-0.42)
  const rotateX = useTransform(
    progress,
    [0.20, 0.28, 0.38, 0.44],
    [0, reducedMotion ? 0 : 12, 0, 0]
  );
  const rotateY = useTransform(
    progress,
    [0.20, 0.28, 0.38, 0.44],
    [0, reducedMotion ? 0 : -8, 0, 0]
  );

  // Z-Axis Layer Separation & Convergence (Stage 03 -> Stage 04)
  // At 0.28, peak separation; by 0.38, fully converged into a unified 3D object
  const zL1 = useTransform(progress, [0.22, 0.29, 0.38], [0, reducedMotion ? 0 : -55, 0]);
  const zL2 = useTransform(progress, [0.22, 0.29, 0.38], [0, reducedMotion ? 0 : -25, 0]);
  const zL4 = useTransform(progress, [0.22, 0.29, 0.38], [0, reducedMotion ? 0 : 28, 0]);
  const zL5 = useTransform(progress, [0.22, 0.29, 0.38], [0, reducedMotion ? 0 : 56, 0]);
  const zL6 = useTransform(progress, [0.22, 0.29, 0.38], [0, reducedMotion ? 0 : 85, 0]);

  // Layer opacity during expansion
  const secondaryLayerOpacity = useTransform(
    progress,
    [0.22, 0.26, 0.36, 0.42],
    [0, 1, 1, 0]
  );

  // Converged 3D emblem shadow appearance
  const shadowOpacity = useTransform(
    progress,
    [0.34, 0.40, 0.50, 0.58],
    [0, 1, 1, 0]
  );

  // Y-shift as text arrives beneath it: moves gently upward to frame the composition
  const stackY = useTransform(
    progress,
    [0.42, 0.50, 0.58],
    [0, -50, -80]
  );

  const stackScale = useTransform(
    progress,
    [0.20, 0.28, 0.44, 0.54],
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
        {/* Converged ambient shadow */}
        <motion.div
          className={styles.convergedShadow}
          style={{ opacity: shadowOpacity }}
        />

        {/* LAYER 01 — Base Datum Plane (Z = -55px) */}
        <motion.div
          className={`${styles.layer} ${styles.layer1}`}
          style={{
            z: zL1,
            opacity: secondaryLayerOpacity,
          }}
        >
          <span className={styles.layerBadge}>Z-BASE // 01</span>
        </motion.div>

        {/* LAYER 02 — Outer Cogwheel Mechanism Ring (Z = -25px) */}
        <motion.div
          className={`${styles.layer} ${styles.layer2}`}
          style={{
            z: zL2,
            opacity: secondaryLayerOpacity,
          }}
        >
          <span className={styles.layerBadge}>GEAR // 02</span>
        </motion.div>

        {/* LAYER 03 — Official Emblem Foundation (Central Primary: Z = 0px) */}
        <div className={`${styles.layer} ${styles.layer3}`}>
          <Image
            src="/assets/brand/iei-emblem.png"
            alt="Official IEI Emblem 3D"
            width={316}
            height={316}
            className={styles.officialEmblemImg}
          />
        </div>

        {/* LAYER 04 — Internal Engineering Instruments Elevation (Z = +28px) */}
        <motion.div
          className={`${styles.layer} ${styles.layer4}`}
          style={{
            z: zL4,
            opacity: secondaryLayerOpacity,
          }}
        >
          <span className={styles.layerBadge}>CREST // 04</span>
        </motion.div>

        {/* LAYER 05 — Precision Specular Highlight Rim (Z = +56px) */}
        <motion.div
          className={`${styles.layer} ${styles.layer5}`}
          style={{
            z: zL5,
            opacity: secondaryLayerOpacity,
          }}
        >
          <span className={styles.layerBadge}>BEVEL // 05</span>
        </motion.div>

        {/* LAYER 06 — Floating Datum Callouts & Ring (Z = +85px) */}
        <motion.div
          className={`${styles.layer} ${styles.layer6}`}
          style={{
            z: zL6,
            opacity: secondaryLayerOpacity,
          }}
        >
          <span className={styles.layerBadge}>DATUM // 06</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
