'use client';

import React, { useRef } from 'react';
import { motion, type MotionValue, useTransform, useReducedMotion } from 'framer-motion';
import styles from './HeroVisualGuardian.module.css';

interface HeroVisualGuardianProps {
  progress?: MotionValue<number>;
}

/**
 * HeroVisualGuardian — Alternative Signature Metaphor
 * DOTS → WIREFRAME → 3D STRUCTURE → MATERIAL → FINAL MASK
 *
 * Subject: Original panther-inspired engineered ceremonial guardian bust.
 * Framing: Frontal, centered, feline head, mask, ears, neck, shoulders, crossed forearms, hands.
 * Architecture: High-fidelity SVG/Canvas vector engine with integrated hooks
 * for modular Google Flow cinematic video clips (Clip A, Clip B, Clip C).
 */
export const HeroVisualGuardian: React.FC<HeroVisualGuardianProps> = ({ progress }) => {
  const shouldReduce = useReducedMotion();
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // Hook scroll progress (0 to 1)
  const defaultProgress = { get: () => 0 } as unknown as MotionValue<number>;
  const activeProgress = progress || defaultProgress;

  // Transformations across 5 stages:
  // 1. Dots: 0.0 -> 0.25
  // 2. Wireframe: 0.20 -> 0.50
  // 3. 3D Structure: 0.45 -> 0.75
  // 4. Materialization: 0.70 -> 0.90
  // 5. Final Mask: 0.85 -> 1.0
  const dotsOpacity = useTransform(activeProgress, [0, 0.25, 0.4], [1, 0.9, 0.1]);
  const wireframeOpacity = useTransform(activeProgress, [0.15, 0.35, 0.6], [0, 1, 0.2]);
  const structureOpacity = useTransform(activeProgress, [0.4, 0.6, 0.8], [0, 1, 0.3]);
  const maskOpacity = useTransform(activeProgress, [0.65, 0.88, 1], [0, 0.85, 1]);

  const guardianScale = useTransform(activeProgress, [0, 1], [1.02, shouldReduce ? 1.02 : 0.98]);
  const guardianY = useTransform(activeProgress, [0, 1], [0, shouldReduce ? 0 : 20]);

  // Generate deterministic point cloud for Stage 1 (panther geometry)
  const pointCloud = [
    // Ears
    { cx: 190, cy: 90 }, { cx: 210, cy: 120 }, { cx: 230, cy: 150 },
    { cx: 350, cy: 90 }, { cx: 330, cy: 120 }, { cx: 310, cy: 150 },
    // Forehead & Brow
    { cx: 250, cy: 150 }, { cx: 270, cy: 140 }, { cx: 290, cy: 150 },
    { cx: 240, cy: 180 }, { cx: 270, cy: 175 }, { cx: 300, cy: 180 },
    // Eyes & Temple
    { cx: 220, cy: 200 }, { cx: 250, cy: 210 }, { cx: 290, cy: 210 }, { cx: 320, cy: 200 },
    // Feline Snout & Whisker Plate
    { cx: 270, cy: 230 }, { cx: 255, cy: 250 }, { cx: 285, cy: 250 },
    { cx: 270, cy: 265 }, { cx: 245, cy: 280 }, { cx: 295, cy: 280 },
    // Jawline & Chin
    { cx: 230, cy: 300 }, { cx: 270, cy: 320 }, { cx: 310, cy: 300 },
    // Neck & Collar Plate
    { cx: 215, cy: 340 }, { cx: 270, cy: 350 }, { cx: 325, cy: 340 },
    // Shoulders
    { cx: 140, cy: 390 }, { cx: 175, cy: 370 }, { cx: 365, cy: 370 }, { cx: 400, cy: 390 },
    // Crossed Forearms & Gauntlets
    { cx: 190, cy: 420 }, { cx: 230, cy: 430 }, { cx: 270, cy: 420 }, { cx: 310, cy: 430 }, { cx: 350, cy: 420 },
    { cx: 220, cy: 460 }, { cx: 270, cy: 450 }, { cx: 320, cy: 460 },
    // Crossed Claws / Hands
    { cx: 245, cy: 400 }, { cx: 295, cy: 400 }, { cx: 270, cy: 405 },
  ];

  return (
    <div className={styles.guardianWrapper} aria-label="Signature Identity: Panther Engineering Bust">
      {/* FLOW VIDEO ARCHITECTURE CONTAINER (Pre-configured for modular clips) */}
      <div ref={videoContainerRef} className={styles.flowVideoContainer} aria-hidden="true">
        {/* Placeholder hook for future Google Flow modular video timeline */}
        <div className={styles.flowVideoPlaceholder} />
      </div>

      <motion.div
        className={styles.guardianComposition}
        style={{ scale: shouldReduce ? 1 : guardianScale, y: shouldReduce ? 0 : guardianY }}
      >
        <svg
          viewBox="0 0 540 540"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.guardianSvg}
        >
          <defs>
            {/* Vibranium Violet Radiance Gradients */}
            <radialGradient id="vibraniumCore" cx="50%" cy="45%" r="50%">
              <stop offset="0%" stopColor="#664EEA" stopOpacity="0.25" />
              <stop offset="60%" stopColor="#664EEA" stopOpacity="0.08" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="violetEdgeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8874fa" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#664EEA" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#8874fa" stopOpacity="0.8" />
            </linearGradient>

            <linearGradient id="matteArmor" x1="30%" y1="0%" x2="70%" y2="100%">
              <stop offset="0%" stopColor="#1a1a24" />
              <stop offset="50%" stopColor="#101017" />
              <stop offset="100%" stopColor="#08080c" />
            </linearGradient>

            <linearGradient id="armorHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2e2a4a" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0a0a0f" stopOpacity="0.9" />
            </linearGradient>

            <filter id="violetBloom" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* AMBIENT AURA */}
          <circle cx="270" cy="270" r="220" fill="url(#vibraniumCore)" />

          {/* =================================================================
              STAGE 1 — DOT MATRIX (POINT CLOUD SCULPTURE)
              ================================================================= */}
          <motion.g style={{ opacity: shouldReduce ? 1 : dotsOpacity }}>
            {pointCloud.map((pt, i) => (
              <circle
                key={`dot-${i}`}
                cx={pt.cx}
                cy={pt.cy}
                r={i % 3 === 0 ? 2.5 : 1.8}
                fill="#8874fa"
                opacity={0.85}
              />
            ))}
            {/* Secondary micro dots for structural density */}
            <circle cx="270" cy="190" r="1.5" fill="#664EEA" opacity="0.6" />
            <circle cx="260" cy="210" r="1.5" fill="#664EEA" opacity="0.6" />
            <circle cx="280" cy="210" r="1.5" fill="#664EEA" opacity="0.6" />
            <circle cx="205" cy="380" r="1.5" fill="#664EEA" opacity="0.6" />
            <circle cx="335" cy="380" r="1.5" fill="#664EEA" opacity="0.6" />
          </motion.g>

          {/* =================================================================
              STAGE 2 & 3 — WIREFRAME TOPOLOGY & 3D CONTOURS
              ================================================================= */}
          <motion.g style={{ opacity: shouldReduce ? 0.7 : wireframeOpacity }} stroke="#664EEA" strokeWidth="1.2">
            {/* Feline Ear Ridges */}
            <polyline points="230,150 190,90 210,120 250,150" fill="none" />
            <polyline points="310,150 350,90 330,120 290,150" fill="none" />

            {/* Brow & Forehead Crest */}
            <polyline points="250,150 270,140 290,150 270,175 250,150" fill="none" />
            <line x1="270" y1="140" x2="270" y2="175" />

            {/* Feline Eye Mask Facets */}
            <polygon points="220,200 250,180 250,210 230,215" fill="none" />
            <polygon points="320,200 290,180 290,210 310,215" fill="none" />

            {/* Feline Muzzle & Nose Bridge */}
            <polyline points="270,175 270,230 255,250 270,265 285,250 270,230" fill="none" />
            <line x1="250" y1="210" x2="255" y2="250" />
            <line x1="290" y1="210" x2="285" y2="250" />

            {/* Jaw & Chin Facets */}
            <polyline points="220,200 230,300 270,320 310,300 320,200" fill="none" />
            <line x1="270" y1="265" x2="270" y2="320" />
            <line x1="245" y1="280" x2="270" y2="320" />
            <line x1="295" y1="280" x2="270" y2="320" />

            {/* Neck & Shoulder Armor Outlines */}
            <polyline points="230,300 215,340 175,370 140,390" fill="none" />
            <polyline points="310,300 325,340 365,370 400,390" fill="none" />
            <line x1="270" y1="320" x2="270" y2="350" />

            {/* Crossed Forearms & Ceremonial Gauntlets */}
            <polygon points="175,370 245,400 270,420 220,460 160,430" fill="none" />
            <polygon points="365,370 295,400 270,420 320,460 380,430" fill="none" />
            <line x1="245" y1="400" x2="295" y2="400" strokeDasharray="3 3" />
          </motion.g>

          {/* =================================================================
              STAGE 4 — 3D STRUCTURE FACETS & VOLUME
              ================================================================= */}
          <motion.g style={{ opacity: shouldReduce ? 0.8 : structureOpacity }}>
            {/* Shaded Dimensional Facets */}
            <polygon points="250,150 270,140 290,150 270,175" fill="url(#armorHighlight)" stroke="#8874fa" strokeWidth="0.8" />
            <polygon points="220,200 250,180 250,210" fill="url(#matteArmor)" stroke="#664EEA" strokeWidth="0.8" />
            <polygon points="320,200 290,180 290,210" fill="url(#matteArmor)" stroke="#664EEA" strokeWidth="0.8" />
            <polygon points="270,175 255,250 270,265" fill="#151520" stroke="#8874fa" strokeWidth="0.8" />
            <polygon points="270,175 285,250 270,265" fill="#12121c" stroke="#8874fa" strokeWidth="0.8" />

            {/* Arm Gauntlet Facets */}
            <polygon points="175,370 245,400 270,420 220,460" fill="url(#matteArmor)" stroke="#664EEA" strokeWidth="1" />
            <polygon points="365,370 295,400 270,420 320,460" fill="url(#armorHighlight)" stroke="#664EEA" strokeWidth="1" />
          </motion.g>

          {/* =================================================================
              STAGE 5 & 6 — MATERIALIZATION & FINAL CEREMONIAL GUARDIAN MASK
              ================================================================= */}
          <motion.g style={{ opacity: shouldReduce ? 1 : maskOpacity }}>
            {/* Solid Armor Silhouette */}
            {/* Head & Mask Base */}
            <path
              d="M 270 135 L 295 148 L 335 115 L 315 155 L 325 195 L 310 295 L 270 325 L 230 295 L 215 195 L 225 155 L 205 115 L 245 148 Z"
              fill="url(#matteArmor)"
              stroke="url(#violetEdgeGlow)"
              strokeWidth="2"
            />

            {/* Glowing Feline Eye Slits */}
            <polygon points="232,204 250,198 252,206 235,210" fill="#f5f5f7" filter="url(#violetBloom)" />
            <polygon points="308,204 290,198 288,206 305,210" fill="#f5f5f7" filter="url(#violetBloom)" />
            <circle cx="242" cy="204" r="1.5" fill="#8874fa" />
            <circle cx="298" cy="204" r="1.5" fill="#8874fa" />

            {/* Architectural Snout & Whisker Lines */}
            <path d="M 270 230 L 255 250 L 270 268 L 285 250 Z" fill="#0c0c12" stroke="#8874fa" strokeWidth="1.2" />
            <line x1="240" y1="262" x2="220" y2="265" stroke="#664EEA" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="240" y1="272" x2="222" y2="278" stroke="#664EEA" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="300" y1="262" x2="320" y2="265" stroke="#664EEA" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="300" y1="272" x2="318" y2="278" stroke="#664EEA" strokeWidth="1.2" strokeLinecap="round" />

            {/* Ceremonial Neck & Shoulder Plates */}
            <path
              d="M 215 330 L 175 365 L 130 395 L 145 425 L 210 390 Z"
              fill="url(#matteArmor)"
              stroke="#664EEA"
              strokeWidth="1.5"
            />
            <path
              d="M 325 330 L 365 365 L 410 395 L 395 425 L 330 390 Z"
              fill="url(#matteArmor)"
              stroke="#664EEA"
              strokeWidth="1.5"
            />

            {/* Crossed Forearms Posture & Claws */}
            <path
              d="M 175 365 L 255 405 L 270 425 L 215 470 L 155 435 Z"
              fill="url(#armorHighlight)"
              stroke="url(#violetEdgeGlow)"
              strokeWidth="1.8"
            />
            <path
              d="M 365 365 L 285 405 L 270 425 L 325 470 L 385 435 Z"
              fill="url(#matteArmor)"
              stroke="url(#violetEdgeGlow)"
              strokeWidth="1.8"
            />

            {/* Claw Accents on Forearms */}
            <polygon points="248,396 256,402 248,406" fill="#8874fa" />
            <polygon points="292,396 284,402 292,406" fill="#8874fa" />
            <circle cx="270" cy="425" r="4" fill="#8874fa" filter="url(#violetBloom)" />
          </motion.g>
        </svg>

        {/* METAPHOR PROGRESSION BAR */}
        <div className={styles.stageIndicator}>
          <div className={styles.stageDotActive} />
          <span className={styles.stageText}>
            DOTS · WIREFRAME · 3D · MATERIAL · GUARDIAN
          </span>
        </div>
      </motion.div>
    </div>
  );
};
