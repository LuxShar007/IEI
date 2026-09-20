'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './BlueprintOverlay.module.css';

export interface BlueprintOverlayProps {
  coordTag?: string;
  gridSize?: number;
  label?: string;
  className?: string;
  showTicks?: boolean;
}

export const BlueprintOverlay: React.FC<BlueprintOverlayProps> = ({
  coordTag = 'COORD: 19.0330° N, 73.0297° E',
  label = 'SYS.SCHEMATIC // VER.01',
  className,
  showTicks = true,
}) => {
  return (
    <div className={cn(styles.overlayWrapper, className)} aria-hidden="true">
      {/* CORNER MARKS */}
      <div className={cn(styles.bracket, styles.tl)} />
      <div className={cn(styles.bracket, styles.tr)} />
      <div className={cn(styles.bracket, styles.bl)} />
      <div className={cn(styles.bracket, styles.br)} />

      {/* CROSSHAIR GUIDES */}
      <div className={styles.centerCross} />

      {/* MEASUREMENT TICKS */}
      {showTicks && (
        <div className={styles.rulerTicks}>
          <span className={styles.tick}>00</span>
          <span className={styles.tick}>25</span>
          <span className={styles.tick}>50</span>
          <span className={styles.tick}>75</span>
          <span className={styles.tick}>100</span>
        </div>
      )}

      {/* TECHNICAL LABELS */}
      <div className={styles.labelBar}>
        <span className={styles.schemaLabel}>{label}</span>
        <span className={styles.coordLabel}>{coordTag}</span>
      </div>
    </div>
  );
};
