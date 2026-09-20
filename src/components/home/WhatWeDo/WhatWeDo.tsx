'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, Terminal, Cpu, Lightbulb, Building, Award, Users } from 'lucide-react';
import { useShowcaseScroll } from '@/lib/scroll/useShowcaseScroll';
import styles from './WhatWeDo.module.css';

interface WorkTrack {
  num: string;
  id: string;
  title: string;
  category: string;
  description: string;
  deliverables: string[];
  icon: React.ElementType;
}

const TRACKS: WorkTrack[] = [
  {
    num: '01',
    id: 'technical',
    title: 'Technical Core',
    category: 'Engineering Development',
    description:
      'Rigorous exploration into embedded systems, algorithmic software architectures, computer vision, and VLSI circuit prototyping.',
    deliverables: ['Firmware Development', 'RTOS Kernels', 'Signal Processing'],
    icon: Terminal,
  },
  {
    num: '02',
    id: 'workshops',
    title: 'Workshops & Labs',
    category: 'Skill Transfer',
    description:
      'Intensive hands-on technical masterclasses led by senior engineers, alumni researchers, and industry specialists.',
    deliverables: ['Hands-on Toolchains', 'Hardware Testbenches', 'Code Labs'],
    icon: Cpu,
  },
  {
    num: '03',
    id: 'projects',
    title: 'Project Tracks',
    category: 'Applied Innovation',
    description:
      'Multi-month mentored student engineering projects tackling real collegiate challenges, technical patents, and research publications.',
    deliverables: ['Functional Prototypes', 'Design Documentation', 'Peer Review'],
    icon: Lightbulb,
  },
  {
    num: '04',
    id: 'industry',
    title: 'Industry Outreach',
    category: 'Professional Liaison',
    description:
      'Direct partnerships with engineering enterprises, tech facility tours, guest lecture series, and technical internship pathways.',
    deliverables: ['Industrial Seminars', 'Technical Site Visits', 'Alumni Mentorship'],
    icon: Building,
  },
  {
    num: '05',
    id: 'competitions',
    title: 'Competitions',
    category: 'Collegiate Hackathons',
    description:
      'Organizing and fielding chapter delegations for national hackathons, hardware build-offs, and collegiate engineering symposia.',
    deliverables: ['National Hackathons', 'Design Challenges', 'Collegiate Cups'],
    icon: Award,
  },
  {
    num: '06',
    id: 'community',
    title: 'Community & Ethics',
    category: 'Institutional Impact',
    description:
      'Fostering collegiate peer learning, open-source knowledge sharing, and societal engineering initiatives across campus.',
    deliverables: ['Open Technical Talks', 'Peer Mentoring Circles', 'Campus Outreach'],
    icon: Users,
  },
];

const STAGE_COUNT = 6;
// 1vh entry + 6 stages × 1vh each + 0.5vh hold = 7.5vh total, we use 7vh for tightness
const SCROLL_VH = 7;

export const WhatWeDo: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const { trackRef, sectionProgress, activeIndex, goToStage } = useShowcaseScroll({
    stageCount: STAGE_COUNT,
  });

  const activeTrack = TRACKS[activeIndex];
  const Icon = activeTrack.icon;

  const isDev = process.env.NODE_ENV === 'development';
  const [debugProgress, setDebugProgress] = useState(0);

  useEffect(() => {
    if (!isDev) return;
    return sectionProgress.on('change', (p) => setDebugProgress(p));
  }, [sectionProgress, isDev]);

  // Entry fade-in: 0 → 0.07
  const wrapperOpacity = useTransform(sectionProgress, [0, 0.07, 0.93, 1.0], [0, 1, 1, 0]);

  return (
    /* Outer: scroll budget container — height gives the scroll distance */
    <div
      ref={trackRef}
      className={styles.showcaseTrack}
      id="what-we-do"
      style={{ '--scroll-vh': `${SCROLL_VH * 100}vh` } as React.CSSProperties}
    >
      {/* Inner: viewport-locked sticky stage */}
      <div className={styles.stickyStage}>
        <motion.section
          className={styles.section}
          style={{ opacity: prefersReducedMotion ? 1 : wrapperOpacity }}
          aria-label="What We Do"
        >
          <div className={styles.inner}>
            {/* SECTION HEADER */}
            <div className={styles.header}>
              <div className={styles.sectionMeta}>
                <span className={styles.sectionIndex}>04</span>
                <span className={styles.sectionLabel}>Scope of Action</span>
              </div>
              <h2 className={styles.sectionTitle}>What We Do</h2>
              <p className={styles.sectionSubtitle}>
                A structured framework designed to cultivate technical depth, empirical discipline, and professional leadership.
              </p>
            </div>

            {/* INTERACTIVE EDITORIAL SPLIT */}
            <div className={styles.splitLayout}>
              {/* LEFT: LARGE EDITORIAL LIST — scroll drives active state */}
              <div className={styles.listColumn} role="list" aria-label="Action Tracks">
                {TRACKS.map((track, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <button
                      key={track.num}
                      type="button"
                      role="listitem"
                      aria-current={isActive ? 'true' : undefined}
                      className={`${styles.rowItem} ${isActive ? styles.rowActive : ''}`}
                      onClick={() => goToStage(i)}
                      aria-label={`Go to ${track.title}`}
                    >
                      <span className={styles.rowNum}>{track.num}</span>
                      <div className={styles.rowContent}>
                        <span className={styles.rowTitle}>{track.title}</span>
                        <span className={styles.rowCategory}>{track.category}</span>
                      </div>
                      <ArrowRight size={18} className={styles.rowArrow} aria-hidden="true" />
                    </button>
                  );
                })}
              </div>

              {/* RIGHT: DYNAMIC EDITORIAL DISPLAY PANEL */}
              <div className={styles.displayColumn} aria-live="polite">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTrack.id}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? {} : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className={styles.displayCard}
                  >
                    <div className={styles.cardTop}>
                      <div className={styles.iconBox}>
                        <Icon size={24} />
                      </div>
                      <div className={styles.cardCategory}>{activeTrack.category}</div>
                    </div>

                    <h3 className={styles.cardTitle}>{activeTrack.title}</h3>
                    <p className={styles.cardDesc}>{activeTrack.description}</p>

                    <div className={styles.deliverables}>
                      <div className={styles.deliverablesLabel}>Key Pillars</div>
                      <div className={styles.deliverablesList}>
                        {activeTrack.deliverables.map((item) => (
                          <span key={item} className={styles.pillItem}>
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* SCROLL PROGRESS INDICATOR */}
                <div className={styles.progressRail} aria-hidden="true">
                  {TRACKS.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`${styles.progressDot} ${i === activeIndex ? styles.progressDotActive : ''}`}
                      onClick={() => goToStage(i)}
                      aria-label={`Stage ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* SCROLL CUE — visible only at start */}
        <motion.div
          className={styles.scrollCue}
          style={{
            opacity: useTransform(sectionProgress, [0, 0.05, 0.15], [0, 1, 0]),
          }}
          aria-hidden="true"
        >
          <span className={styles.scrollCueText}>Scroll to explore</span>
          <div className={styles.scrollCueLine}><div className={styles.scrollCueFill} /></div>
        </motion.div>

        {/* SECTION RELEASE CUE — visible at end */}
        <motion.div
          className={styles.releaseCue}
          style={{
            opacity: useTransform(sectionProgress, [0.88, 0.96], [0, 1]),
          }}
          aria-hidden="true"
        >
          <span className={styles.releaseCueText}>Continue ↓</span>
        </motion.div>

        {/* DEV DEBUG OVERLAY */}
        {isDev && (
          <div className={styles.debugOverlay}>
            <div className={styles.debugRow}>
              <span className={styles.debugLabel}>SECTION</span>
              <span>WHAT WE DO</span>
            </div>
            <div className={styles.debugRow}>
              <span className={styles.debugLabel}>PROGRESS</span>
              <span>{debugProgress.toFixed(3)}</span>
            </div>
            <div className={styles.debugRow}>
              <span className={styles.debugLabel}>ACTIVE STAGE</span>
              <span>{String(activeIndex + 1).padStart(2, '0')}</span>
            </div>
            <div className={styles.debugRow}>
              <span className={styles.debugLabel}>PIN</span>
              <span>{debugProgress > 0 && debugProgress < 1 ? 'ACTIVE' : 'RELEASED'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
