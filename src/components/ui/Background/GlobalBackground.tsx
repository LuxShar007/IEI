'use client';

import React from 'react';
import styles from './GlobalBackground.module.css';

/**
 * GlobalBackground — Subtle architectural texture, never distracts.
 * Near-invisible grain + soft ambient warmth at top.
 */
export const GlobalBackground: React.FC = () => {
  return (
    <div className={styles.background} aria-hidden="true">
      {/* Very subtle grain overlay */}
      <div className={styles.grain} />
      {/* Soft warm ambient at the very top */}
      <div className={styles.warmAmbient} />
    </div>
  );
};
