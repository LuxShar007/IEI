'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from '@/lib/theme/ThemeContext';
import { useIntro } from '@/lib/intro/IntroContext';
import { HeroVisualBlueprint } from './HeroVisualBlueprint';
import { HeroVisualGuardian } from './HeroVisualGuardian';
import styles from './Hero.module.css';

const STAGGER = 0.1;
const EASE = [0.16, 1, 0.3, 1] as const;

const lineVariant = {
  hidden: { y: '105%', opacity: 0 },
  visible: (i: number) => ({
    y: '0%',
    opacity: 1,
    transition: { duration: 0.9, delay: i * STAGGER + 0.1, ease: EASE },
  }),
};

const fadeVariant = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * STAGGER + 0.55, ease: EASE },
  }),
};

export const Hero: React.FC = () => {
  const { theme } = useTheme();
  const { isIntroActive } = useIntro();
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Decoupled: remain in pristine resting state during intro!
  const textY = useTransform(scrollYProgress, (p) => {
    if (isIntroActive || shouldReduceMotion) return 0;
    return p * 80;
  });
  const textOpacity = useTransform(scrollYProgress, (p) => {
    if (isIntroActive || shouldReduceMotion) return 1;
    return p >= 0.7 ? 0 : 1 - (p / 0.7);
  });
  const visualY = useTransform(scrollYProgress, (p) => {
    if (isIntroActive || shouldReduceMotion) return 0;
    return p * 120;
  });
  const visualOpacity = useTransform(scrollYProgress, (p) => {
    if (isIntroActive || shouldReduceMotion) return 1;
    return p >= 0.85 ? 0.1 : 1 - ((p / 0.85) * 0.9);
  });

  return (
    <section ref={sectionRef} className={styles.hero} aria-label="IEI SIES GST — Hero">
      <div className={styles.layout}>
        {/* LEFT — EDITORIAL TEXT */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className={styles.textColumn}
          initial="hidden"
          animate="visible"
        >
          {/* INSTITUTIONAL LABEL */}
          <motion.div
            custom={0}
            variants={fadeVariant}
            className={styles.label}
          >
            <span className={styles.labelDot} aria-hidden="true" />
            <span>Institution of Engineers (India)</span>
            <span className={styles.labelSep} aria-hidden="true">·</span>
            <span>Student Chapter</span>
          </motion.div>

          {/* MAIN HEADLINE — oversized Helvetica, left-aligned */}
          <h1 className={styles.headline} aria-label="Engineering. Community. Impact.">
            <div className={styles.lineMask}>
              <motion.span custom={0} variants={lineVariant} className={styles.lineWord}>
                Engineering.
              </motion.span>
            </div>
            <div className={styles.lineMask}>
              <motion.span custom={1} variants={lineVariant} className={styles.lineWord}>
                Community.
              </motion.span>
            </div>
            <div className={styles.lineMask}>
              <motion.span custom={2} variants={lineVariant} className={`${styles.lineWord} ${styles.lineWordAccent}`}>
                Impact.
              </motion.span>
            </div>
          </h1>

          {/* SUPPORTING TEXT */}
          <motion.p
            custom={3}
            variants={fadeVariant}
            className={styles.supporting}
          >
            The official student chapter of IEI at SIES Graduate School of Technology —
            cultivating the next generation of engineers through technical exploration,
            collaborative projects, and professional development.
          </motion.p>

          {/* CTA GROUP */}
          <motion.div
            custom={4}
            variants={fadeVariant}
            className={styles.ctaGroup}
          >
            <Link href="/about" className={styles.ctaPrimary}>
              Explore the Chapter
            </Link>
            <Link href="/team" className={styles.ctaSecondary}>
              Meet the Team
              <span className={styles.ctaArrow} aria-hidden="true">→</span>
            </Link>
          </motion.div>

          {/* METADATA STRIP */}
          <motion.div
            custom={5}
            variants={fadeVariant}
            className={styles.meta}
          >
            <span className={styles.metaItem}>Est. 1920</span>
            <span className={styles.metaSep} aria-hidden="true" />
            <span className={styles.metaItem}>Navi Mumbai</span>
            <span className={styles.metaSep} aria-hidden="true" />
            <span className={styles.metaItem}>MH-04</span>
          </motion.div>
        </motion.div>

        {/* RIGHT — ENGINEERING VISUAL (DUAL SIGNATURE METAPHOR) */}
        <motion.div
          style={{ y: visualY, opacity: visualOpacity }}
          className={styles.visualColumn}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
        >
          {theme === 'alternative' ? (
            <HeroVisualGuardian progress={scrollYProgress} />
          ) : (
            <HeroVisualBlueprint progress={scrollYProgress} />
          )}
        </motion.div>
      </div>

      {/* SCROLL CUE */}
      <motion.div
        className={styles.scrollCue}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <div className={styles.scrollLine} aria-hidden="true" />
        <span className={styles.scrollLabel}>Scroll</span>
      </motion.div>
    </section>
  );
};
