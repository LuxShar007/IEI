'use client';

import React from 'react';
import Image from 'next/image';
import { motion, MotionValue, useTransform } from 'framer-motion';
import styles from './IEIConstruction.module.css';

interface IEIConstructionProps {
  progress: MotionValue<number>;
  reducedMotion?: boolean;
}

export const IEIConstruction: React.FC<IEIConstructionProps> = ({
  progress,
  reducedMotion = false,
}) => {
  // Path draw progress for linework: 0.00 -> 0.12
  const pathDraw = useTransform(progress, [0, 0.12], [reducedMotion ? 1 : 0, 1]);

  // Overall linework opacity: visible from start, dims slightly once emblem locks in
  const lineworkOpacity = useTransform(
    progress,
    [0, 0.02, 0.15, 0.24, 0.35],
    [0.2, 1, 1, 0.35, 0]
  );

  // Linework rotation for subtle drafting dynamic: 0 -> 25 deg
  const lineworkRotate = useTransform(
    progress,
    [0, 0.22],
    [0, reducedMotion ? 0 : 25]
  );

  // 2D Official Emblem appearance: 0.10 -> 0.20
  const emblemOpacity = useTransform(
    progress,
    [0.08, 0.14, 0.22, 0.28],
    [0, 1, 1, 0]
  );
  const emblemScale = useTransform(
    progress,
    [0.08, 0.16, 0.24],
    [reducedMotion ? 1 : 0.94, 1, 1]
  );

  // Technical coordinate crosshair pulse
  const crosshairScale = useTransform(progress, [0, 0.14], [0.8, 1]);

  // Generate 24 radial gear lines around center (280, 280)
  const radialLines = Array.from({ length: 24 }, (_, i) => {
    const angle = (i * 360) / 24;
    const rad = (angle * Math.PI) / 180;
    const x1 = 280 + 130 * Math.cos(rad);
    const y1 = 280 + 130 * Math.sin(rad);
    const x2 = 280 + 155 * Math.cos(rad);
    const y2 = 280 + 155 * Math.sin(rad);
    return { x1, y1, x2, y2, angle, id: i };
  });

  return (
    <div className={styles.constructionWrap} aria-hidden="true">
      {/* Background Coordinate Grid */}
      <motion.div
        className={styles.blueprintGrid}
        style={{ opacity: lineworkOpacity }}
      />

      {/* Engineering Vector Linework Canvas */}
      <motion.svg
        className={styles.svgCanvas}
        viewBox="0 0 560 560"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          opacity: lineworkOpacity,
          scale: crosshairScale,
          rotate: lineworkRotate,
        }}
      >
        {/* Center Origin Mark */}
        <circle cx="280" cy="280" r="3" fill="var(--accent)" />
        <circle cx="280" cy="280" r="12" stroke="var(--accent)" strokeWidth="0.75" />

        {/* Quadrant Construction Axes */}
        <line x1="40" y1="280" x2="520" y2="280" className={styles.axisLine} />
        <line x1="280" y1="40" x2="280" y2="520" className={styles.axisLine} />

        {/* Diagonal 45-degree Guide Lines */}
        <line x1="110" y1="110" x2="450" y2="450" className={styles.axisLine} opacity="0.25" />
        <line x1="110" y1="450" x2="450" y2="110" className={styles.axisLine} opacity="0.25" />

        {/* Concentric Engineering Construction Circles */}
        <motion.circle
          cx="280"
          cy="280"
          r="48"
          className={styles.circleSecondary}
          style={{ pathLength: pathDraw }}
        />
        <motion.circle
          cx="280"
          cy="280"
          r="92"
          className={styles.circlePrimary}
          style={{ pathLength: pathDraw }}
        />
        <motion.circle
          cx="280"
          cy="280"
          r="128"
          className={styles.circleSecondary}
          style={{ pathLength: pathDraw }}
        />
        <motion.circle
          cx="280"
          cy="280"
          r="156"
          className={styles.circlePrimary}
          style={{ pathLength: pathDraw }}
        />
        <motion.circle
          cx="280"
          cy="280"
          r="185"
          className={styles.circleOuterTicks}
          style={{ pathLength: pathDraw }}
        />
        <motion.circle
          cx="280"
          cy="280"
          r="220"
          className={styles.circleSecondary}
          opacity="0.3"
          style={{ pathLength: pathDraw }}
        />

        {/* 24 Radial Cogwheel Gear Linework */}
        {radialLines.map((line) => (
          <line
            key={line.id}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            className={styles.gearTooth}
          />
        ))}

        {/* 4 Cardinal Angle Calipers */}
        <line x1="280" y1="50" x2="280" y2="62" className={styles.specTick} />
        <line x1="280" y1="498" x2="280" y2="510" className={styles.specTick} />
        <line x1="50" y1="280" x2="62" y2="280" className={styles.specTick} />
        <line x1="498" y1="280" x2="510" y2="280" className={styles.specTick} />

        {/* Technical Callout Annotations */}
        <text x="290" y="65" className={styles.technicalText}>000° // NOR-AXIS</text>
        <text x="490" y="275" className={styles.technicalText} textAnchor="end">090° // EST</text>
        <text x="290" y="515" className={styles.technicalText}>180° // SOU</text>
        <text x="70" y="275" className={styles.technicalText}>270° // WST</text>

        <text x="70" y="80" className={styles.datumCallout}>SPEC: IEI-1920-IND</text>
        <text x="70" y="94" className={styles.datumCallout}>RADIAL R: 156.00MM</text>
        <text x="70" y="108" className={styles.datumCallout}>TOL: ±0.005 PRECISION</text>
        <text x="490" y="470" className={styles.datumCallout} textAnchor="end">GEAR: 24-TEETH COG</text>
        <text x="490" y="484" className={styles.datumCallout} textAnchor="end">COORDINATE: Z0.00</text>
      </motion.svg>

      {/* Stage 02 — Complete 2D Emblem Recognition Lock */}
      <motion.div
        className={styles.emblemContainer}
        style={{
          opacity: emblemOpacity,
          scale: emblemScale,
        }}
      >
        <Image
          src="/assets/brand/iei-emblem.png"
          alt="Official Institution of Engineers (India) Emblem"
          width={316}
          height={316}
          priority
          className={styles.officialEmblem}
        />
      </motion.div>
    </div>
  );
};
