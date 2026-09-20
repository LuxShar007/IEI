'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/layout/Container/Container';
import { Button } from '@/components/ui/Button/Button';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import styles from './HorizontalEvents.module.css';

const EVENT_ITEMS = [
  { id: 'evt-01', slug: 'annual-technical-symposium', title: 'Annual Technical Symposium', category: 'flagship' as const, date: 'October 2025', venue: 'Auditorium, SIES GST', summary: 'Collegiate innovation challenges, technical research presentations, and keynote addresses from industry leaders.' },
  { id: 'evt-02', slug: 'applied-robotics-workshop', title: 'Applied Robotics & Microcontrollers', category: 'workshop' as const, date: 'November 2025', venue: 'Hardware Lab 3, SIES GST', summary: 'Hands-on embedded systems programming, sensor buses, and motor telemetry prototyping.' },
  { id: 'evt-03', slug: 'collegiate-hackathon', title: 'Interdisciplinary Systems Hackathon', category: 'hackathon' as const, date: 'December 2025', venue: 'Central Computing Facility', summary: '36-hour sprint tackling real-world computational, automation, and engineering challenges.' },
  { id: 'evt-04', slug: 'industry-symposium', title: 'Chartered Engineers Seminar', category: 'symposium' as const, date: 'January 2026', venue: 'Seminar Hall 1', summary: 'Industry engineering leaders and faculty discussing professional ethics and modern engineering practice.' },
];

const CATEGORY_LABELS = { flagship: 'Flagship', workshop: 'Workshop', hackathon: 'Hackathon', symposium: 'Symposium' };

type Category = 'flagship' | 'workshop' | 'hackathon' | 'symposium';

const stripeClasses: Record<Category, string> = {
  flagship: 'stripeFlagship',
  workshop: 'stripeWorkshop',
  hackathon: 'stripeHackathon',
  symposium: 'stripeSymposium',
};

const pillClasses: Record<Category, string> = {
  flagship: 'pillFlagship',
  workshop: 'pillWorkshop',
  hackathon: 'pillHackathon',
  symposium: 'pillSymposium',
};

const SectionTagComponent: React.FC<{ className?: string }> = ({ className }) => (
  <div className={styles.sectionTag}>
    <span className={styles.tagNum}>04</span>
    <div className={styles.tagLine} />
    <span className="section-tag">Events</span>
  </div>
);

export const HorizontalEvents: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({ target: targetRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', isMobile || shouldReduceMotion ? '0%' : '-62%']);
  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  if (isMobile || shouldReduceMotion) {
    return (
      <section id="events" className={styles.mobileSection}>
        <Container size="2xl">
          <div className={styles.sectionHeader}>
            <SectionTagComponent />
            <h2 className={styles.sectionTitle}>Technical Programs</h2>
            <p className={styles.sectionSubtitle}>Workshops, symposiums, hackathons, and flagship events throughout the academic year.</p>
          </div>
          <div className={styles.mobileCardsGrid}>
            {EVENT_ITEMS.map((item) => (
              <div key={item.id} className={styles.mobileCard}>
                <div className={`${styles.categoryStripe} ${styles[stripeClasses[item.category] as keyof typeof styles]}`} />
                <div className={styles.mobileCardInner}>
                  <div className={styles.cardTop}>
                    <span className={`${styles.categoryPill} ${styles[pillClasses[item.category] as keyof typeof styles]}`}>{CATEGORY_LABELS[item.category]}</span>
                    <span className={styles.dateText}><Calendar size={12} />{item.date}</span>
                  </div>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardSummary}>{item.summary}</p>
                  <div className={styles.venueRow}><MapPin size={12} /><span>{item.venue}</span></div>
                  <Button href={`/events/${item.slug}`} variant="outline" size="sm" fullWidth rightIcon={<ArrowRight size={14} />}>Explore Program</Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section ref={targetRef} id="events" className={styles.desktopContainer}>
      <div className={styles.stickyTrack}>
        <Container size="2xl" className={styles.topBar}>
          <div className={styles.headerGroup}>
            <SectionTagComponent />
            <h2 className={styles.desktopTitle}>Technical Programs & Symposiums</h2>
          </div>
          <div className={styles.progressTrackWrapper}>
            <div className={styles.progressTrack}>
              <motion.div style={{ width: progressBarWidth }} className={styles.progressBar} />
            </div>
          </div>
        </Container>
        <motion.div style={{ x }} className={styles.cardsRow}>
          {EVENT_ITEMS.map((item) => (
            <div key={item.id} className={styles.cardSlide}>
              <div className={styles.eventCard}>
                <div className={`${styles.cardCategoryStripe} ${styles[stripeClasses[item.category] as keyof typeof styles]}`} />
                <div className={styles.cardBody}>
                  <div className={styles.badgeRow}>
                    <span className={`${styles.categoryPill} ${styles[pillClasses[item.category] as keyof typeof styles]}`}>{CATEGORY_LABELS[item.category]}</span>
                    <span className={styles.dateLabel}><Calendar size={12} />{item.date}</span>
                  </div>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardSummary}>{item.summary}</p>
                  <div className={styles.venueRow}><MapPin size={12} /><span>{item.venue}</span></div>
                  <div className={styles.cardFooter}>
                    <Button href={`/events/${item.slug}`} variant="outline" size="sm" fullWidth rightIcon={<ArrowRight size={14} />}>Explore Program</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
