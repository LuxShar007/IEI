'use client';

import React from 'react';
import { Button } from '@/components/ui/Button/Button';
import { ArrowRight } from 'lucide-react';
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

          {/* INFORMATIONAL CTAs (NO JOIN BUTTONS, NO VERIFY BUTTONS) */}
          <div className={styles.actionGrid}>
            <Button href="/events" variant="primary" size="md" rightIcon={<ArrowRight size={15} />}>
              Explore Events
            </Button>

            <Button href="/team" variant="outline" size="md" rightIcon={<ArrowRight size={15} />}>
              Meet the Team
            </Button>

            <Button href="/contact" variant="outline" size="md" rightIcon={<ArrowRight size={15} />}>
              Contact Chapter
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
