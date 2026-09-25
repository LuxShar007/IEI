'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { chapterSessions, type ChapterSessionId } from '@/data/sessions';
import styles from './TeamHero.module.css';

interface TeamHeroProps {
  activeSession: ChapterSessionId;
  onSessionChange: (session: ChapterSessionId) => void;
}

export const TeamHero: React.FC<TeamHeroProps> = ({
  activeSession,
  onSessionChange,
}) => {
  return (
    <section className={styles.heroSection} aria-label="The People of IEI SIES GST">
      <div className={styles.container}>
        {/* TOP INSTITUTIONAL METADATA BAR */}
        <motion.div
          className={styles.metadataBar}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.metaLeft}>
            <span className={styles.metaCode}>IEI SIES GST</span>
            <span className={styles.metaDivider}>/</span>
            <span className={styles.metaDepartment}>ECS STUDENT CHAPTER</span>
          </div>

          {/* SUBTLE EDITORIAL SESSION TOGGLE */}
          <div className={styles.sessionToggleWrap} role="radiogroup" aria-label="Chapter Session Roster">
            {chapterSessions.map((session) => {
              const isActive = activeSession === session.id;
              return (
                <button
                  key={session.id}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  className={`${styles.sessionBtn} ${isActive ? styles.sessionBtnActive : ''}`}
                  onClick={() => onSessionChange(session.id)}
                >
                  <span className={styles.sessionStatusDot} aria-hidden="true" />
                  <span className={styles.sessionLabel}>
                    {session.isCurrent ? 'CURRENT SESSION' : 'ARCHIVE'}
                  </span>
                  <span className={styles.sessionYear}>[{session.id}]</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* HERO EDITORIAL TITLE WITH VAST NEGATIVE SPACE */}
        <div className={styles.titleWrapper}>
          <motion.h1
            className={styles.headline}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.headlineLine}>THE PEOPLE</span>
            <span className={styles.headlineSub}>BEHIND IEI SIES GST</span>
          </motion.h1>

          <motion.p
            className={styles.leadCopy}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            The engineering minds, student leadership council, and specialized domain wings driving academic innovation, technical research, and institutional excellence within the Department of Electronics and Computer Science.
          </motion.p>
        </div>

        {/* BOTTOM ENGINEERING TRACE CUE */}
        <motion.div
          className={styles.engineeringTrace}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.traceLine} />
          <span className={styles.traceTag}>SYSTEM 01 • ORGANIZATIONAL ROSTER</span>
          <div className={styles.traceLine} />
        </motion.div>
      </div>
    </section>
  );
};
