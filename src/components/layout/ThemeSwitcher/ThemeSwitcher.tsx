'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/theme/ThemeContext';
import styles from './ThemeSwitcher.module.css';

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={styles.switcherContainer}
      role="group"
      aria-label="Visual identity theme toggle"
    >
      <button
        type="button"
        onClick={() => setTheme('default')}
        className={`${styles.switchBtn} ${theme === 'default' ? styles.active : ''}`}
        aria-pressed={theme === 'default'}
      >
        {theme === 'default' && (
          <motion.span
            layoutId="themeSwitcherIndicator"
            className={styles.activePill}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
          />
        )}
        <span className={styles.btnLabel}>DEFAULT</span>
      </button>

      <button
        type="button"
        onClick={() => setTheme('alternative')}
        className={`${styles.switchBtn} ${theme === 'alternative' ? styles.active : ''}`}
        aria-pressed={theme === 'alternative'}
      >
        {theme === 'alternative' && (
          <motion.span
            layoutId="themeSwitcherIndicator"
            className={styles.activePill}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
          />
        )}
        <span className={styles.btnLabel}>SIGNATURE</span>
      </button>
    </div>
  );
};
