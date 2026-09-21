'use client';

import React from 'react';
import Link from 'next/link';
import { placeholderEvents } from '@/data/events';
import { Button } from '@/components/ui/Button/Button';
import { Calendar, MapPin, Award, ArrowRight, ArrowUpRight, Trophy, ShieldCheck } from 'lucide-react';
import styles from './FlagshipEventsAndAwards.module.css';

interface ChapterAward {
  id: string;
  year: string;
  title: string;
  issuer: string;
  description: string;
}

const CHAPTER_AWARDS: ChapterAward[] = [
  {
    id: 'award-01',
    year: '2024',
    title: 'Exemplary Collegiate Student Chapter Charter',
    issuer: 'The Institution of Engineers (India) — Maharashtra State Centre',
    description: 'Recognized for distinguished performance in organizing structured engineering symposia, research papers, and technical workshop tracks.',
  },
  {
    id: 'award-02',
    year: '2023–2024',
    title: 'Best Technical Department Branch Performance',
    issuer: 'Department of Electronics & Computer Science, SIES GST',
    description: 'Awarded for collaborative student development, high symposium engagement, and inter-collegiate technical participation.',
  },
  {
    id: 'award-03',
    year: '2023',
    title: 'National Student Chapter Excellence Citation',
    issuer: 'IEI India Headquarters Directorate',
    description: 'Honored for adherence to professional engineering governance, student council mentorship, and technical innovation challenges.',
  },
];

export const FlagshipEventsAndAwards: React.FC = () => {
  const flagshipEvents = placeholderEvents.slice(0, 3);

  return (
    <section className={styles.sectionWrap} id="events" aria-label="Flagship Events and Chapter Accolades">
      <div className={styles.container}>
        {/* SECTION HEADER */}
        <div className={styles.header}>
          <div className={styles.headerMeta}>
            <span className={styles.sectionBadge}>02 • PROGRAM TRACKS & CITATIONS</span>
            <span className={styles.headerDivider}>/</span>
            <span className={styles.headerDept}>TECHNICAL SYMPOSIA & HONORS</span>
          </div>

          <div className={styles.headerMain}>
            <h2 className={styles.heading}>Events & Accolades</h2>
            <Button href="/events" variant="outline" size="sm" rightIcon={<ArrowRight size={14} />}>
              View All Events
            </Button>
          </div>
        </div>

        {/* EVENTS GRID (MIRRORING IEEE FLAGSHIP CARDS) */}
        <div className={styles.eventsBlock}>
          <div className={styles.blockTitleRow}>
            <h3 className={styles.subHeading}>Flagship Chapter Initiatives</h3>
            <span className={styles.subHint}>*Click to explore agenda, speaker line-ups & venues</span>
          </div>

          <div className={styles.eventsGrid}>
            {flagshipEvents.map((evt) => (
              <article key={evt.id} className={styles.eventCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.categoryBadge}>{evt.category.toUpperCase()}</span>
                  <div className={styles.venuePill}>
                    <MapPin size={12} />
                    <span>SIES GST</span>
                  </div>
                </div>

                <h4 className={styles.eventTitle}>{evt.title.replace(' [Placeholder]', '')}</h4>
                <p className={styles.eventTagline}>{evt.tagline}</p>
                <p className={styles.eventDesc}>{evt.description}</p>

                <div className={styles.cardFooter}>
                  <Link href={`/events/${evt.slug}`} className={styles.knowMoreLink}>
                    <span>KNOW MORE</span>
                    <ArrowUpRight size={14} className={styles.arrowIcon} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* AWARDS & RECOGNITIONS BLOCK (MIRRORING IEEE AWARDS LIST) */}
        <div className={styles.awardsBlock}>
          <div className={styles.blockTitleRow}>
            <div className={styles.awardHeadingWrap}>
              <Trophy size={18} className={styles.trophyIcon} />
              <h3 className={styles.subHeading}>Institutional Recognitions & Honors</h3>
            </div>
            <span className={styles.subHint}>Official Chapter Accreditations</span>
          </div>

          <div className={styles.awardsList}>
            {CHAPTER_AWARDS.map((award) => (
              <div key={award.id} className={styles.awardCard}>
                <div className={styles.awardYearBadge}>{award.year}</div>
                <div className={styles.awardContent}>
                  <h4 className={styles.awardTitle}>{award.title}</h4>
                  <div className={styles.awardIssuer}>{award.issuer}</div>
                  <p className={styles.awardDesc}>{award.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
