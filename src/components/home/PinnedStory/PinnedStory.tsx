'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Container } from '@/components/layout/Container/Container';
import { Shield, Building, Award, Users } from 'lucide-react';
import styles from './PinnedStory.module.css';

const STORY_BEATS = [
  {
    num: '01',
    title: 'The Institution of Engineers (India)',
    subtitle: 'Parent Institution',
    icon: Shield,
    lead: 'The largest multi-disciplinary professional body of chartered engineers across India.',
    description:
      'Incorporated to advance engineering science, professional standards, and international accreditation. The IEI network encompasses over a million engineers, fostering institutional excellence and collegiate development across technical universities.',
    badge: 'Est. 1920',
  },
  {
    num: '02',
    title: 'SIES Graduate School of Technology',
    subtitle: 'Campus Headquarters',
    icon: Building,
    lead: 'A premier collegiate institute fostering technological rigor and engineering leadership.',
    description:
      'Situated in Nerul, Navi Mumbai, SIES GST provides modern engineering infrastructure across computer, IT, electronics, mechanics, AI, and emerging technologies, fostering research and collegiate innovation.',
    badge: 'Navi Mumbai',
  },
  {
    num: '03',
    title: 'The Student Chapter MH-04',
    subtitle: 'Chapter Governance',
    icon: Award,
    lead: 'Student-led chapter council operating under national accreditation and verified credentials.',
    description:
      'The student chapter bridges collegiate curricula with real-world engineering through domain workshops, industry panels, and verified digital member credentials linked to physical card badges.',
    badge: 'Active Chapter',
  },
  {
    num: '04',
    title: 'The Engineering Community',
    subtitle: 'Collaborative Innovation',
    icon: Users,
    lead: 'An interdisciplinary ecosystem of passionate student engineers and technical builders.',
    description:
      'From hardware prototyping and embedded systems hackathons to peer research publications, the community thrives on hands-on creation, technical symposiums, and engineering excellence.',
    badge: 'Student Community',
  },
];

export const PinnedStory: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((el, index) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveStep(index);
            }
          });
        },
        {
          rootMargin: '-35% 0px -35% 0px',
          threshold: 0.2,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <section id="the-chapter" className={styles.storySection}>
      <Container size="2xl">
        <div className={styles.storyLayout}>
          {/* LEFT: PINNED STICKY COLUMN */}
          <div className={styles.pinnedColumn}>
            <div className={styles.pinnedInner}>
              {/* SECTION TAG */}
              <div className={styles.sectionTag}>
                <span className={styles.tagNum}>02</span>
                <div className={styles.tagLine} />
                <span className="section-tag">Chapter</span>
              </div>

              <div className={styles.headingGroup}>
                <h2 className={styles.sectionTitle}>The Chapter</h2>
                <p className={styles.sectionSubtitle}>
                  Institutional lineage, collegiate campus, student leadership, and professional community.
                </p>
              </div>

              {/* PROGRESS TRACKER */}
              <div className={styles.progressContainer}>
                <div className={styles.counterRow}>
                  <span className={styles.activeCounter}>
                    {STORY_BEATS[activeStep].num}
                  </span>
                  <span className={styles.counterSlash}>/</span>
                  <span className={styles.totalCounter}>04</span>
                </div>

                <div className={styles.stepTrack}>
                  <div className={styles.stepLine} />
                  {STORY_BEATS.map((beat, idx) => (
                    <div
                      key={beat.num}
                      className={`${styles.stepDot} ${idx === activeStep ? styles.activeDot : idx < activeStep ? styles.passedDot : ''}`}
                      style={{ top: `${(idx / 3) * 100}%` }}
                    />
                  ))}
                </div>

                <ul className={styles.stepLabels}>
                  {STORY_BEATS.map((beat, idx) => (
                    <li
                      key={beat.num}
                      className={`${styles.stepLabelItem} ${idx === activeStep ? styles.activeStepItem : ''}`}
                    >
                      <span className={styles.stepNum}>{beat.num}</span>
                      <span className={styles.stepTitle}>{beat.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT: SCROLLABLE STORY CARDS */}
          <div className={styles.cardsColumn}>
            {STORY_BEATS.map((beat, idx) => {
              const Icon = beat.icon;
              return (
                <div
                  key={beat.num}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  className={`${styles.cardWrapper} ${idx === activeStep ? styles.cardActive : ''}`}
                >
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <div className={styles.cardIconBox}>
                        <Icon size={20} />
                      </div>
                      <div className={styles.cardMeta}>
                        <span className={styles.cardSubtitle}>{beat.subtitle}</span>
                        <span className={styles.cardBadge}>{beat.badge}</span>
                      </div>
                    </div>
                    <div className={styles.cardNum}>{beat.num}</div>
                    <h3 className={styles.cardTitle}>{beat.title}</h3>
                    <p className={styles.cardLead}>{beat.lead}</p>
                    <p className={styles.cardDesc}>{beat.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};
