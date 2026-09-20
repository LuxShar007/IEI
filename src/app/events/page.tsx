'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';
import { PageHeader } from '@/components/layout/PageHeader/PageHeader';
import { placeholderEvents } from '@/data/events';
import { formatDate } from '@/lib/utils/format';
import { ArrowRight, Calendar, MapPin, Tag } from 'lucide-react';
import styles from './events.module.css';

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Programs' },
    { id: 'flagship', label: 'Flagship' },
    { id: 'technical', label: 'Workshops & Labs' },
    { id: 'competition', label: 'Competitions' },
    { id: 'lecture', label: 'Guest Lectures' },
  ];

  const filteredEvents =
    selectedCategory === 'all'
      ? placeholderEvents
      : placeholderEvents.filter((e) => e.category.toLowerCase() === selectedCategory);

  const featuredEvent = placeholderEvents.find((e) => e.isFeatured) || placeholderEvents[0];
  const archiveList = filteredEvents;

  return (
    <main className={styles.page}>
      {/* EDITORIAL HEADER */}
      <PageHeader
        sectionNumber="04 / 07"
        eyebrow="Chronological Archive"
        title="Events & Symposia"
        description="Official schedule of technical competitions, hands-on masterclasses, and collegiate engineering colloquiums hosted by IEI SIES GST."
        breadcrumbs={[{ label: 'Events' }]}
        metadataItems={[
          { label: 'Academic Term', value: '2024–2025' },
          { label: 'Venue', value: 'SIES GST Navi Mumbai' },
          { label: 'Department', value: 'ECS Engineering' },
        ]}
      />

      <div className={styles.inner}>
        {/* FEATURED EVENT SPOTLIGHT */}
        {featuredEvent && (
          <section className={styles.featuredSection} aria-label="Featured Event">
            <div className={styles.featuredTagRow}>
              <span className={styles.featuredLabel}>FEATURED FLAGSHIP</span>
              <span className={styles.categoryBadge}>{featuredEvent.category}</span>
            </div>

            <div className={styles.featuredGrid}>
              <div className={styles.featuredCoverFrame} aria-hidden="true">
                <div className={styles.blueprintGrid} />
                <div className={styles.coverCode}>IEI·FLAGSHIP·{featuredEvent.id}</div>
              </div>

              <div className={styles.featuredDetails}>
                <div className={styles.metaRow}>
                  <span className={styles.dateMeta}>
                    <Calendar size={14} />
                    {formatDate(featuredEvent.startDate)}
                  </span>
                  <span className={styles.venueMeta}>
                    <MapPin size={14} />
                    {featuredEvent.venue}
                  </span>
                </div>

                <h2 className={styles.featuredTitle}>{featuredEvent.title}</h2>
                <p className={styles.featuredTagline}>{featuredEvent.tagline}</p>
                <p className={styles.featuredSummary}>{featuredEvent.description}</p>

                <div className={styles.actionRow}>
                  <Button
                    href={`/events/${featuredEvent.slug}`}
                    variant="primary"
                    size="md"
                    rightIcon={<ArrowRight size={15} />}
                  >
                    Access Event Dossier & Schedule
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CATEGORY FILTER BAR */}
        <div className={styles.filterBar} role="tablist" aria-label="Filter events by category">
          <span className={styles.filterTitle}>Category:</span>
          <div className={styles.filterList}>
            {categories.map((cat) => {
              const isActive = cat.id === selectedCategory;
              return (
                <Button
                  key={cat.id}
                  variant={isActive ? 'primary' : 'outline'}
                  size="sm"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* NUMBERED HISTORICAL ARCHIVE LIST */}
        <section className={styles.archiveSection} aria-label="Events Archive List">
          <div className={styles.archiveList} role="list">
            {archiveList.map((event, idx) => {
              const numStr = String(idx + 1).padStart(2, '0');
              return (
                <article key={event.id} className={styles.archiveRow} role="listitem">
                  <span className={styles.rowNum}>{numStr}</span>

                  <div className={styles.rowMain}>
                    <div className={styles.rowHeader}>
                      <span className={styles.rowCategory}>{event.category}</span>
                      <span className={styles.rowDate}>{formatDate(event.startDate)}</span>
                      <span className={styles.rowVenue}>{event.venue}</span>
                    </div>

                    <h3 className={styles.rowTitle}>
                      <Link href={`/events/${event.slug}`} className={styles.rowTitleLink}>
                        {event.title}
                      </Link>
                    </h3>

                    <p className={styles.rowTagline}>{event.tagline}</p>
                  </div>

                  <div className={styles.rowAction}>
                    <Button
                      href={`/events/${event.slug}`}
                      variant="outline"
                      size="sm"
                      rightIcon={<ArrowRight size={14} />}
                      aria-label={`View dossier: ${event.title}`}
                    >
                      View Dossier
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
