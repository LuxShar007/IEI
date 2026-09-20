'use client';

import React from 'react';
import Image from 'next/image';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { EMBLEM_DATA } from './emblemData';
import styles from './IEIEmblemVector.module.css';

interface IEIEmblemVectorProps {
  progress: MotionValue<number>;
  reducedMotion?: boolean;
  isQAMode?: boolean;
  forceSolid?: boolean;
  customColor?: string;
}

export const IEIEmblemVector: React.FC<IEIEmblemVectorProps> = ({
  progress,
  reducedMotion = false,
  isQAMode = false,
  forceSolid = false,
  customColor,
}) => {
  // Order of technical vector path reveal:
  // 1. outer circle: 0.00 -> 0.06
  // 2. inner circle: 0.05 -> 0.10
  // 3. rope border: 0.08 -> 0.14
  // 4. circular text: 0.12 -> 0.18
  // 5. central structural artwork: 0.16 -> 0.22
  // 6. fine details: 0.20 -> 0.25

  const drawOuter = useTransform(progress, [0.00, 0.06], [reducedMotion || forceSolid ? 1 : 0, 1]);
  const drawInner = useTransform(progress, [0.04, 0.09], [reducedMotion || forceSolid ? 1 : 0, 1]);
  const drawRope = useTransform(progress, [0.07, 0.13], [reducedMotion || forceSolid ? 1 : 0, 1]);
  const drawText = useTransform(progress, [0.11, 0.17], [reducedMotion || forceSolid ? 1 : 0, 1]);
  const drawCentral = useTransform(progress, [0.15, 0.21], [reducedMotion || forceSolid ? 1 : 0, 1]);
  const drawFine = useTransform(progress, [0.19, 0.25], [reducedMotion || forceSolid ? 1 : 0, 1]);

  // Fill opacity: transparent linework during drafting, locks into solid official seal at completion (0.20 -> 0.25)
  const fillOpacity = useTransform(
    progress,
    [0.18, 0.24],
    [forceSolid ? 1 : 0, 1]
  );

  // Stroke width: fine precision blueprint stroke during drawing, eases out as fill locks in
  const strokeWidth = useTransform(
    progress,
    [0.00, 0.20, 0.26],
    [forceSolid ? 0 : 1.25, forceSolid ? 0 : 1.0, 0]
  );

  return (
    <div className={styles.vectorWrapper} aria-label="Programmatic Vector IEI Emblem">
      <svg
        className={styles.svgRoot}
        viewBox="0 0 316 316"
        xmlns="http://www.w3.org/2000/svg"
        style={{ color: customColor || undefined }}
      >
        {/* 01 — OUTER CIRCULAR BORDER */}
        <g id="outer-border" className="emblem-group">
          {EMBLEM_DATA['outer-border']?.map((p, i) => (
            <motion.path
              key={`outer-${i}`}
              d={p.d}
              transform={p.transform}
              fill="currentColor"
              fillOpacity={fillOpacity}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              style={{ pathLength: drawOuter }}
              className={styles.pathDrawing}
            />
          ))}
        </g>

        {/* 02 — INNER CIRCULAR RING */}
        <g id="inner-ring" className="emblem-group">
          {EMBLEM_DATA['inner-ring']?.map((p, i) => (
            <motion.path
              key={`inner-${i}`}
              d={p.d}
              transform={p.transform}
              fill="currentColor"
              fillOpacity={fillOpacity}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              style={{ pathLength: drawInner }}
              className={styles.pathDrawing}
            />
          ))}
        </g>

        {/* 03 — ROPE / BRAIDED BORDER */}
        <g id="rope-border" className="emblem-group">
          {EMBLEM_DATA['rope-border']?.map((p, i) => (
            <motion.path
              key={`rope-${i}`}
              d={p.d}
              transform={p.transform}
              fill="currentColor"
              fillOpacity={fillOpacity}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              style={{ pathLength: drawRope }}
              className={styles.pathDrawing}
            />
          ))}
        </g>

        {/* 04 — CIRCULAR TEXT GLYPHS */}
        <g id="circular-text" className="emblem-group">
          {EMBLEM_DATA['circular-text']?.map((p, i) => (
            <motion.path
              key={`text-${i}`}
              d={p.d}
              transform={p.transform}
              fill="currentColor"
              fillOpacity={fillOpacity}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              style={{ pathLength: drawText }}
              className={styles.pathDrawing}
            />
          ))}
        </g>

        {/* 05 — CENTRAL FIGURE & ENGINEERING OBJECTS */}
        <g id="central-artwork" className="emblem-group">
          {EMBLEM_DATA['central-artwork']?.map((p, i) => (
            <motion.path
              key={`central-${i}`}
              d={p.d}
              transform={p.transform}
              fill="currentColor"
              fillOpacity={fillOpacity}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              style={{ pathLength: drawCentral }}
              className={styles.pathDrawing}
            />
          ))}
        </g>

        {/* 06 — FINE DETAILS & ACCENTS */}
        <g id="fine-details" className="emblem-group">
          {EMBLEM_DATA['fine-details']?.map((p, i) => (
            <motion.path
              key={`fine-${i}`}
              d={p.d}
              transform={p.transform}
              fill="currentColor"
              fillOpacity={fillOpacity}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              style={{ pathLength: drawFine }}
              className={styles.pathDrawing}
            />
          ))}
        </g>
      </svg>

      {/* DEVELOPMENT QA — 50% Opacity Overlay against Original Source */}
      {isQAMode && (
        <>
          <div className={styles.qaRasterOverlay}>
            <Image
              src="/assets/brand/iei-emblem.png"
              alt="Original Raster IEI Emblem QA Comparison"
              width={316}
              height={316}
              priority
            />
          </div>
          <div className={styles.qaBadge}>VECTOR QA // 50% OVERLAY</div>
        </>
      )}
    </div>
  );
};
