'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Terminal, Cpu, Lightbulb, Building, Award, Users } from 'lucide-react';
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

export const WhatWeDo: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeTrack = TRACKS[activeIndex];
  const Icon = activeTrack.icon;

  return (
    <section className={styles.section} id="what-we-do" aria-label="What We Do">
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
          {/* LEFT: LARGE INTERACTIVE EDITORIAL LIST */}
          <div className={styles.listColumn} role="tablist" aria-label="Select Action Track">
            {TRACKS.map((track, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={track.num}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.rowItem} ${isActive ? styles.rowActive : ''}`}
                  onMouseEnter={() => setActiveIndex(i)}
                  onFocus={() => setActiveIndex(i)}
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
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
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
          </div>
        </div>
      </div>
    </section>
  );
};
