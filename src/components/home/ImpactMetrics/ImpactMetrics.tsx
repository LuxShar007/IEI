'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Container } from '@/components/layout/Container/Container';
import styles from './ImpactMetrics.module.css';

const METRICS = [
  {
    value: '1,200+',
    label: 'Student Engineering Hours',
    description: 'Practical lab prototyping, competitive hackathons, and symposium tracks.',
  },
  {
    value: '45+',
    label: 'Technical Workshops',
    description: 'Hands-on embedded systems, IoT, AI/ML, and robotics training sessions.',
  },
  {
    value: '100%',
    label: 'Verifiable Credentials',
    description: 'Member credentials accessible via digital QR badge endpoints.',
  },
  {
    value: '6+',
    label: 'Engineering Branches',
    description: 'Uniting students across computing and hardware streams.',
  },
];

export const ImpactMetrics: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section ref={ref} id="impact" className={styles.metricsSection}>
      <Container size="2xl">
        <div className={styles.topRule} />
        <div className={styles.header}>
          <div className={styles.sectionNumber}>03</div>
          <div className={styles.headerContent}>
            <span className="section-tag">Chapter Scale</span>
            <h2 className={styles.title}>By the numbers</h2>
          </div>
        </div>

        <div className={styles.metricsGrid}>
          {METRICS.map((metric, idx) => (
            <motion.div
              key={idx}
              className={styles.metricItem}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.metricValue}>{metric.value}</div>
              <div className={styles.metricLabel}>{metric.label}</div>
              <p className={styles.metricDesc}>{metric.description}</p>
            </motion.div>
          ))}
        </div>
        <div className={styles.bottomRule} />
      </Container>
    </section>
  );
};
