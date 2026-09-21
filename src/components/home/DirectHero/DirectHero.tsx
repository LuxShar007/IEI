'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button/Button';
import { ArrowRight, ShieldCheck, Users, Calendar, ArrowDown } from 'lucide-react';
import styles from './DirectHero.module.css';

export const DirectHero: React.FC = () => {
  const scrollToContent = () => {
    const aboutEl = document.getElementById('about-us');
    if (aboutEl) {
      aboutEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.heroSection} aria-label="IEI SIES GST Chapter Introduction">
      {/* BACKGROUND ACCENT MESH */}
      <div className={styles.ambientMesh} aria-hidden="true" />

      <div className={styles.container}>
        {/* TOP STATUS BAR */}
        <motion.div
          className={styles.statusBar}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.statusPill}>
            <span className={styles.statusDot} />
            <span className={styles.statusText}>ACADEMIC SESSION 2024–2025</span>
          </div>

          <div className={styles.institutionTag}>
            <span>DEPARTMENT OF ELECTRONICS & COMPUTER SCIENCE</span>
          </div>
        </motion.div>

        {/* HERO BRAND DISPLAY */}
        <div className={styles.brandBlock}>
          <motion.div
            className={styles.spacedLetters}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span>I</span>
            <span>E</span>
            <span>I</span>
          </motion.div>

          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            IEI SIES GST
          </motion.h1>

          <motion.p
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            The official collegiate student chapter of The Institution of Engineers (India) at SIES Graduate School of Technology, Navi Mumbai.
          </motion.p>
        </div>

        {/* ACTION BUTTONS (LIQUID GLASS BUTTON SYSTEM) */}
        <motion.div
          className={styles.actionGroup}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Button href="/events" variant="primary" size="lg" rightIcon={<ArrowRight size={16} />}>
            Explore Events
          </Button>

          <Button href="/team" variant="secondary" size="lg" leftIcon={<Users size={16} />}>
            Meet The Team
          </Button>

          <Button href="/verify" variant="outline" size="lg" leftIcon={<ShieldCheck size={16} />}>
            Verify Credentials
          </Button>
        </motion.div>

        {/* SCROLL DOWN INDICATOR */}
        <motion.div
          className={styles.scrollIndicator}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <button
            type="button"
            className={styles.scrollBtn}
            onClick={scrollToContent}
            aria-label="Scroll down to About Us section"
          >
            <span className={styles.scrollLabel}>SCROLL DOWN</span>
            <ArrowDown size={14} className={styles.scrollArrow} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
