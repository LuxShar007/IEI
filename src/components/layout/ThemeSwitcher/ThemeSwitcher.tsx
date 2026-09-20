'use client';

import React from 'react';
import { useTheme } from '@/lib/theme/ThemeContext';
import styles from './ThemeSwitcher.module.css';

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={styles.themeSwitch}
      role="group"
      aria-label="Visual identity theme toggle"
    >
      <button
        type="button"
        onClick={() => setTheme('default')}
        className={`${styles.switchOption} ${theme === 'default' ? styles.active : ''}`}
        aria-pressed={theme === 'default'}
      >
        <span className={styles.optionLabel}>DEFAULT</span>
      </button>

      <span className={styles.divider} aria-hidden="true">/</span>

      <button
        type="button"
        onClick={() => setTheme('alternative')}
        className={`${styles.switchOption} ${theme === 'alternative' ? styles.active : ''}`}
        aria-pressed={theme === 'alternative'}
      >
        <span className={styles.optionLabel}>SIGNATURE</span>
      </button>
    </div>
  );
};
