import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getEventBySlug, getAllEvents } from '@/data/events';
import { PageHeader } from '@/components/layout/PageHeader/PageHeader';
import { Container } from '@/components/layout/Container/Container';
import { constructMetadata } from '@/lib/seo/metadata';
import { formatDate } from '@/lib/utils/format';
import { Calendar, MapPin, Clock, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import styles from './eventDetail.module.css';

interface EventPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const events = getAllEvents();
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return constructMetadata({ title: 'Event Not Found' });
  }

  return constructMetadata({
    title: `${event.title} — Technical Event Dossier`,
    description: event.description,
    path: `/events/${event.slug}`,
  });
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <PageHeader
        sectionNumber="EVENT DOSSIER"
        eyebrow={`CATEGORY: ${event.category.toUpperCase()}`}
        title={event.title}
        description={event.tagline}
        badge={event.status.toUpperCase()}
        breadcrumbs={[
          { label: 'Events', href: '/events' },
          { label: event.title },
        ]}
        metadataItems={[
          { label: 'Date', value: formatDate(event.startDate) },
          { label: 'Venue', value: event.venue },
          { label: 'Status', value: event.status.toUpperCase() },
        ]}
        actions={
          <Link href="/events" className={styles.backLink}>
            <ArrowLeft size={14} />
            <span>Return to Events Archive</span>
          </Link>
        }
      />

      <section className={styles.contentSection}>
        <Container size="2xl">
          <div className={styles.layoutGrid}>
            {/* MAIN COLUMN */}
            <div className={styles.mainCol}>
              {/* LARGE ARCHITECTURAL COVER FRAME */}
              <div className={styles.coverFrame} aria-hidden="true">
                <div className={styles.blueprintGrid} />
                <div className={styles.coverDetails}>
                  <span className={styles.coverCode}>IEI·DOSSIER·{event.id}</span>
                  <span className={styles.coverCategory}>{event.category}</span>
                </div>
              </div>

              {/* OVERVIEW */}
              <div className={styles.textBlock}>
                <h2 className={styles.sectionHeading}>Program Description</h2>
                <p className={styles.leadPara}>{event.description}</p>
              </div>

              {/* SCHEDULE / TIMELINE */}
              {event.agenda && event.agenda.length > 0 && (
                <div className={styles.timelineBlock}>
                  <h3 className={styles.timelineHeading}>Curriculum & Agenda</h3>
                  <div className={styles.timelineList}>
                    {event.agenda.map((item, idx) => (
                      <div key={idx} className={styles.timelineRow}>
                        <div className={styles.timeTag}>
                          <Clock size={13} className={styles.clockIcon} />
                          <span>{item.time}</span>
                        </div>
                        <div className={styles.timelineBody}>
                          <h4 className={styles.itemTitle}>{item.title}</h4>
                          {item.description && (
                            <p className={styles.itemDesc}>{item.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* SIDEBAR DOSSIER METADATA */}
            <aside className={styles.sidebarCol} aria-label="Event Metadata & Registration">
              <div className={styles.dossierCard}>
                <div className={styles.cardHeader}>Event Dossier</div>

                <div className={styles.metaEntries}>
                  <div className={styles.entry}>
                    <span className={styles.entryLabel}>Convening Date</span>
                    <span className={styles.entryVal}>{formatDate(event.startDate)}</span>
                  </div>

                  <div className={styles.entry}>
                    <span className={styles.entryLabel}>Campus Location</span>
                    <span className={styles.entryVal}>{event.venue}</span>
                  </div>

                  <div className={styles.entry}>
                    <span className={styles.entryLabel}>Academic Sponsor</span>
                    <span className={styles.entryVal}>SIES GST · Dept of ECS</span>
                  </div>

                  <div className={styles.entry}>
                    <span className={styles.entryLabel}>Status</span>
                    <span className={styles.entryVal}>{event.status.toUpperCase()}</span>
                  </div>
                </div>

                <div className={styles.regBlock}>
                  {event.registrationOpen ? (
                    <button type="button" className={styles.regBtn}>
                      <span>Registration Open</span>
                      <ArrowRight size={14} />
                    </button>
                  ) : (
                    <div className={styles.closedPill}>Registration Closed</div>
                  )}
                </div>

                {event.tags && event.tags.length > 0 && (
                  <div className={styles.tagsBlock}>
                    <span className={styles.tagsLabel}>Classification</span>
                    <div className={styles.tagChips}>
                      {event.tags.map((t) => (
                        <span key={t} className={styles.tagPill}>
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}
