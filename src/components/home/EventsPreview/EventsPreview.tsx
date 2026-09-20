'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { placeholderEvents } from '@/data/events';
import styles from './EventsPreview.module.css';

export const EventsPreview: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const events = placeholderEvents.slice(0, 5);

  return (
    <section className={styles.section} id="events" aria-label="Events Preview">
      <div className={styles.inner}>
        {/* HEADER */}
        <div className={styles.header}>
          <motion.span
            className="text-overline"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Events
          </motion.span>
          <motion.h2
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            What's happening
          </motion.h2>
        </div>

        {/* EVENT LIST */}
        <ul className={styles.eventList} role="list">
          {events.map((event, i) => (
            <motion.li
              key={event.id}
              className={`${styles.eventItem} ${hoveredIndex !== null && hoveredIndex !== i ? styles.eventDim : ''}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link
                href={`/events/${event.slug}`}
                className={styles.eventLink}
                aria-label={`View event: ${event.title}`}
              >
                <div className={styles.eventInner}>
                  <span className={styles.eventNum} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className={styles.eventContent}>
                    <div className={styles.eventMeta}>
                      <span className={styles.eventCategory}>{event.category}</span>
                      <span className={styles.eventDate}>{new Date(event.startDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</span>
                    </div>
                    <h3 className={styles.eventTitle}>{event.title}</h3>
                  </div>

                  <span className={styles.eventArrow} aria-hidden="true">→</span>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* VIEW ALL */}
        <motion.div
          className={styles.viewAll}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="/events" className={styles.viewAllLink}>
            View all events
            <span className={styles.viewAllArrow} aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
