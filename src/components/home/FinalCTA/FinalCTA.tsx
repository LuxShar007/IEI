'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './FinalCTA.module.css';

export const FinalCTA: React.FC = () => {
  return (
    <section className={styles.section} id="connect" aria-label="Connect with IEI SIES GST">
      <div className={styles.inner}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className={styles.content}
        >
          {/* LARGE EDITORIAL STATEMENT */}
          <h2 className={styles.statement}>
            Driven by<br />engineering.
          </h2>

          <div className={styles.bodyGroup}>
            <p className={styles.body}>
              IEI SIES GST is the official student chapter of the Institution of Engineers (India)
              at SIES Graduate School of Technology — dedicated to advancing technical excellence,
              multidisciplinary collaboration, and professional leadership.
            </p>

            {/* ACTIONS */}
            <div className={styles.actions}>
              <Link href="/about" className={styles.primaryBtn}>
                Explore Chapter
              </Link>
              <Link href="/contact" className={styles.secondaryLink}>
                Connect with us
                <span aria-hidden="true"> →</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* DECORATIVE DIVIDER LINE */}
        <div className={styles.rule} aria-hidden="true" />
      </div>
    </section>
  );
};
