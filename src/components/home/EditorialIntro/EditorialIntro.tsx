'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from 'framer-motion';
import { Container } from '@/components/layout/Container/Container';
import styles from './EditorialIntro.module.css';

const MANIFESTO_WORDS = [
  'Engineering',
  'is',
  'more',
  'than',
  'a',
  'discipline.',
  'It',
  'is',
  'a',
  'way',
  'of',
  'thinking,',
  'building,',
  'and',
  'creating',
  'lasting',
  'impact.',
];

const WordSpan: React.FC<{
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  shouldReduceMotion: boolean | null;
}> = ({ word, index, total, progress, shouldReduceMotion }) => {
  const start = index / total;
  const end = Math.min(1, (index + 1.5) / total);

  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  const color = useTransform(
    progress,
    [start, end],
    ['rgba(140, 154, 176, 0.25)', 'rgba(242, 244, 248, 1)']
  );

  if (shouldReduceMotion) {
    return <span className={styles.word}>{word}&nbsp;</span>;
  }

  return (
    <motion.span style={{ opacity, color }} className={styles.word}>
      {word}&nbsp;
    </motion.span>
  );
};

export const EditorialIntro: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.35'],
  });

  return (
    <section ref={containerRef} className={styles.introSection}>
      <Container size="xl">
        <div className={styles.innerWrapper}>
          {/* SECTION LABEL */}
          <div className={styles.tagRow}>
            <span className={styles.sectionNum}>01</span>
            <div className={styles.tagRule} />
            <span className="section-tag">Editorial</span>
          </div>

          {/* PROGRESSIVE SCROLL-REVEAL MANIFESTO - DM Serif Display */}
          <p className={styles.manifestoParagraph}>
            {MANIFESTO_WORDS.map((word, idx) => (
              <WordSpan
                key={idx}
                word={word}
                index={idx}
                total={MANIFESTO_WORDS.length}
                progress={scrollYProgress}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </p>

          {/* HORIZONTAL RULE */}
          <div className={styles.midRule} />

          {/* SUPPORTING DISCOURSE GRID */}
          <div className={styles.discourseGrid}>
            <div className={styles.discourseCol}>
              <span className={styles.colNumber}>01</span>
              <h3 className={styles.colTitle}>Academic Precision</h3>
              <p className={styles.colText}>
                Fostering rigorous foundational mastery across electronics, computing, mechanics, and multidisciplinary engineering disciplines at SIES GST.
              </p>
            </div>

            <div className={styles.discourseCol}>
              <span className={styles.colNumber}>02</span>
              <h3 className={styles.colTitle}>Professional Affiliation</h3>
              <p className={styles.colText}>
                Connecting collegiate engineers directly to the national heritage and technical standing of The Institution of Engineers (India).
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
