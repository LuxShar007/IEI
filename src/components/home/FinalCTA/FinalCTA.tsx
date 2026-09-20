'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import styles from './FinalCTA.module.css';

export const FinalCTA: React.FC = () => {
  return (
    <section className={styles.section} id="connect" aria-label="Institutional Engagement & Contact">
      <div className={styles.inner}>
        <div className={styles.content}>
          <div className={styles.sectionMeta}>
            <span className={styles.sectionIndex}>10</span>
            <span className={styles.sectionLabel}>Institutional Engagement</span>
          </div>

          {/* LARGE HELVETICA STATEMENT */}
          <h2 className={styles.statement}>
            Driven by engineering.<br />
            Defined by integrity.
          </h2>

          <p className={styles.supporting}>
            The official student chapter of the Institution of Engineers (India) at SIES Graduate
            School of Technology — cultivating technical competence, rigorous research, and collegiate collaboration.
          </p>

          {/* INFORMATIONAL CTAs (NO JOIN BUTTONS) */}
          <div className={styles.actionGrid}>
            <Link href="/events" className={styles.ctaButton}>
              <span>Explore Events</span>
              <ArrowRight size={15} />
            </Link>

            <Link href="/team" className={styles.ctaButton}>
              <span>Meet the Team</span>
              <ArrowRight size={15} />
            </Link>

            <Link href="/verify" className={styles.ctaButton}>
              <ShieldCheck size={15} className={styles.verifyIcon} />
              <span>Verify Member</span>
            </Link>

            <Link href="/contact" className={styles.ctaButtonSecondary}>
              <span>Contact the Chapter</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
