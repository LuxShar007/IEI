'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { principles } from '@/data/principles';
import styles from './ChapterPhilosophy.module.css';

export const ChapterPhilosophy: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section ref={sectionRef} className={styles.section} id="philosophy" aria-label="Chapter Philosophy">
      <div className={styles.inner}>
        {/* SECTION LABEL */}
        <motion.div
          className={styles.sectionLabel}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-overline">Chapter Philosophy</span>
        </motion.div>

        {/* PRINCIPLES — stacked, oversized */}
        <div className={styles.principlesStack}>
          {principles.map((principle, i) => (
            <Principle key={principle.num} principle={principle} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface PrincipleProps {
  principle: { num: string; title: string; description: string };
  index: number;
}

const Principle: React.FC<PrincipleProps> = ({ principle, index }) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.3'],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.25, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [20, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className={styles.principle}
      aria-label={`Principle ${principle.num}: ${principle.title}`}
    >
      <div className={styles.principleLayout}>
        {/* NUMBER */}
        <div className={styles.num} aria-hidden="true">{principle.num}</div>

        {/* CONTENT */}
        <div className={styles.content}>
          <h2 className={styles.title}>{principle.title}</h2>
          <p className={styles.description}>{principle.description}</p>
        </div>

        {/* DIVIDER LINE */}
        <div className={styles.dividerLine} aria-hidden="true" />
      </div>
    </motion.div>
  );
};
