'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { InstitutionInfoGrid } from '../InstitutionInfoGrid';
import styles from './AboutComposition.module.css';

const EASE = [0.16, 1, 0.3, 1] as const;

const makeFadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: EASE },
  },
});

export const AboutComposition: React.FC = () => {
  return (
    <section className={styles.section} id="about" aria-label="About IEI SIES GST">
      <div className={styles.inner}>
        {/* TOP ROW — editorial asymmetric layout */}
        <div className={styles.topRow}>
          {/* LEFT: Section index */}
          <motion.div
            className={styles.leftCol}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            variants={makeFadeUp(0)}
          >
            <div className={styles.sectionIndex}>02</div>
            <div className={styles.sectionLabel}>
              <span className="text-overline">The Chapter</span>
            </div>
          </motion.div>

          {/* CENTER: Large statement */}
          <motion.div
            className={styles.centerCol}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            variants={makeFadeUp(0.1)}
          >
            <p className={styles.statement}>
              We build engineers,<br />
              not just graduates.
            </p>
          </motion.div>

          {/* RIGHT: Explanation */}
          <motion.div
            className={styles.rightCol}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            variants={makeFadeUp(0.2)}
          >
            <p className={styles.explanation}>
              IEI SIES GST is the official student chapter of the Institution of Engineers (India) 
              at SIES Graduate School of Technology. It exists to bridge the gap between academic 
              engineering education and the real demands of technical practice.
            </p>
            <p className={styles.explanation}>
              Through structured programs, mentored projects, technical competitions, and industry 
              interaction, the chapter gives students something the curriculum alone cannot — 
              the experience of actually doing the work.
            </p>
          </motion.div>
        </div>

        {/* BOTTOM: Shared Institutional Information Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-5%' }}
          variants={makeFadeUp(0.3)}
        >
          <InstitutionInfoGrid />
        </motion.div>
      </div>
    </section>
  );
};
