'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { placeholderEvents } from '@/data/events';
import { formatDate } from '@/lib/utils/format';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button/Button';
import styles from './EventsPreview.module.css';

export const EventsPreview: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const events = placeholderEvents.slice(0, 4);

  return (
    <section className={styles.section} id="events-archive" aria-label="Chapter Events Archive">
      <div className={styles.inner}>
        {/* HEADER */}
        <div className={styles.header}>
          <div className={styles.sectionMeta}>
            <span className={styles.sectionIndex}>06</span>
            <span className={styles.sectionLabel}>Chronological Archive</span>
          </div>
          <div className={styles.headerSplit}>
            <h2 className={styles.sectionTitle}>Featured Events</h2>
            <Button href="/events" variant="outline" size="sm" rightIcon={<ArrowRight size={14} />}>
              View Complete Archive
            </Button>
          </div>
        </div>

        {/* NUMBERED ARCHIVE PRESENTATION (HORIZONTAL DESKTOP / VERTICAL MOBILE) */}
        <div className={styles.archiveTrack} role="list">
          {events.map((event, i) => {
            const numStr = String(i + 1).padStart(2, '0');
            const isHovered = hoveredIdx === i;

            return (
              <article
                key={event.id}
                className={`${styles.eventItem} ${isHovered ? styles.itemActive : ''}`}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <Link
                  href={`/events/${event.slug}`}
                  className={styles.itemLink}
                  aria-label={`View event details: ${event.title}`}
                >
                  <div className={styles.itemTop}>
                    <span className={styles.itemNum}>{numStr}</span>
                    <span className={styles.itemCategory}>{event.category}</span>
                  </div>

                  {/* VISUAL FRAME PLACEHOLDER */}
                  <div className={styles.imageFrame} aria-hidden="true">
                    <div className={styles.framePattern} />
                    <div className={styles.frameCode}>IEI·EVT·{numStr}</div>
                  </div>

                  <div className={styles.itemBody}>
                    <div className={styles.metaLine}>
                      <span className={styles.dateText}>
                        <Calendar size={12} />
                        {formatDate(event.startDate)}
                      </span>
                      <span className={styles.venueText}>
                        <MapPin size={12} />
                        {event.venue}
                      </span>
                    </div>

                    <h3 className={styles.itemTitle}>{event.title}</h3>
                    <p className={styles.itemTagline}>{event.tagline}</p>
                  </div>

                  <div className={styles.itemFooter}>
                    <span className={styles.inspectText}>Access Event Detail</span>
                    <ArrowRight size={14} className={styles.itemArrow} />
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
