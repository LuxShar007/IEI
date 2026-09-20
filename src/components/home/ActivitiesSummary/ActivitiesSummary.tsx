'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button/Button';
import styles from './ActivitiesSummary.module.css';

interface ActivityItem {
  id: string;
  num: string;
  title: string;
  category: string;
  description: string;
  cadence: string;
}

const ACTIVITIES: ActivityItem[] = [
  {
    id: 'embedded-symposium',
    num: '01',
    title: 'Advanced Microcontroller & RTOS Lab',
    category: 'Hands-on Workshop',
    description:
      'Rigorous hardware masterclasses where student engineers program real-time operating system kernels directly onto 32-bit ARM architectures.',
    cadence: 'Bi-Weekly Track',
  },
  {
    id: 'ai-paper-track',
    num: '02',
    title: 'Distributed Machine Learning Working Group',
    category: 'Research Circle',
    description:
      'Empirical analysis of state-of-the-art transformer papers and hands-on optimization for neural inference on edge devices.',
    cadence: 'Weekly Seminar',
  },
  {
    id: 'industry-conclave',
    num: '03',
    title: 'ECS Industrial Leadership Forum',
    category: 'Industry Outreach',
    description:
      'Direct dialogue between industry engineering heads and student researchers on microelectronics supply chains and cloud infrastructure.',
    cadence: 'Semester Symposium',
  },
  {
    id: 'hackathon-delegation',
    num: '04',
    title: 'Collegiate Systems Hackathon',
    category: 'Chapter Flagship',
    description:
      'A 36-hour rapid hardware-software prototyping sprint building verified engineering solutions for real civic and industrial challenges.',
    cadence: 'Annual Flagship',
  },
];

export const ActivitiesSummary: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(ACTIVITIES[0].id);
  const activeActivity = ACTIVITIES.find((a) => a.id === activeId) || ACTIVITIES[0];

  return (
    <section className={styles.section} id="featured-activities" aria-label="Featured Activities">
      <div className={styles.inner}>
        {/* HEADER */}
        <div className={styles.header}>
          <div className={styles.sectionMeta}>
            <span className={styles.sectionIndex}>05</span>
            <span className={styles.sectionLabel}>Program Roster</span>
          </div>
          <div className={styles.headerSplit}>
            <h2 className={styles.sectionTitle}>Featured Activities</h2>
            <Button href="/activities" variant="outline" size="sm" rightIcon={<ArrowRight size={14} />}>
              Explore All 6 Stages
            </Button>
          </div>
        </div>

        {/* ASYMMETRICAL EDITORIAL COMPOSITION */}
        <div className={styles.grid}>
          {/* FEATURED LARGE SHOWCASE */}
          <div className={styles.featuredColumn}>
            <div className={styles.visualFrame}>
              <div className={styles.architecturalIllustration} aria-hidden="true">
                <div className={styles.wireGrid} />
                <div className={styles.concentricRings} />
                <div className={styles.focusCrosshair} />
                <div className={styles.visualWatermark}>IEI·ACT·{activeActivity.num}</div>
              </div>
              <div className={styles.visualOverlay}>
                <span className={styles.cadenceBadge}>{activeActivity.cadence}</span>
                <span className={styles.categoryBadge}>{activeActivity.category}</span>
              </div>
            </div>

            <div className={styles.featuredContent}>
              <div className={styles.featuredNum}>{activeActivity.num}</div>
              <h3 className={styles.featuredTitle}>{activeActivity.title}</h3>
              <p className={styles.featuredDesc}>{activeActivity.description}</p>
              <div style={{ marginTop: 'var(--space-4)' }}>
                <Button href="/activities" variant="primary" size="md" rightIcon={<ArrowRight size={15} />}>
                  View Full Curriculum & Outcomes
                </Button>
              </div>
            </div>
          </div>

          {/* SECONDARY LIST */}
          <div className={styles.listColumn}>
            <div className={styles.listHeader}>Program Tracks</div>
            <div className={styles.itemsList}>
              {ACTIVITIES.map((act) => {
                const isSelected = act.id === activeId;
                return (
                  <button
                    key={act.id}
                    type="button"
                    className={`${styles.listItem} ${isSelected ? styles.itemSelected : ''}`}
                    onClick={() => setActiveId(act.id)}
                    onMouseEnter={() => setActiveId(act.id)}
                  >
                    <div className={styles.itemHeader}>
                      <span className={styles.itemNum}>{act.num}</span>
                      <span className={styles.itemCategory}>{act.category}</span>
                    </div>
                    <h4 className={styles.itemTitle}>{act.title}</h4>
                    <span className={styles.itemCadence}>{act.cadence}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
