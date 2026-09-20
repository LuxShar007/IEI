import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getEventBySlug, getAllEvents } from '@/data/events';
import { PageHeader } from '@/components/layout/PageHeader/PageHeader';
import { Section } from '@/components/layout/Section/Section';
import { Card } from '@/components/ui/Card/Card';
import { Badge } from '@/components/ui/Badge/Badge';
import { Button } from '@/components/ui/Button/Button';
import { constructMetadata } from '@/lib/seo/metadata';
import { formatDate } from '@/lib/utils/format';
import { Calendar, MapPin, Clock, ArrowLeft, CheckCircle } from 'lucide-react';
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
    title: event.title,
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
    <>
      <PageHeader
        eyebrow={`CATEGORY: ${event.category.toUpperCase()}`}
        title={event.title}
        description={event.tagline}
        badge={event.status.toUpperCase()}
        badgeVariant={event.status === 'upcoming' ? 'accent' : 'default'}
        breadcrumbs={[
          { label: 'Events', href: '/events' },
          { label: event.title },
        ]}
        actions={
          <Button href="/events" variant="outline" size="sm" leftIcon={<ArrowLeft size={14} />}>
            Back to Directory
          </Button>
        }
      />

      <Section id="event-details" padding="lg" hasGridBackground>
        <div className={styles.layoutGrid}>
          {/* MAIN CONTENT */}
          <div className={styles.mainColumn}>
            <Card variant="default" hasCornerAccents className={styles.contentCard}>
              <h2 className={styles.sectionHeading}>Program Overview</h2>
              <p className={styles.descriptionText}>{event.description}</p>

              {event.agenda && event.agenda.length > 0 && (
                <div className={styles.agendaSection}>
                  <h3 className={styles.subHeading}>Program Schedule</h3>
                  <div className={styles.timeline}>
                    {event.agenda.map((item, idx) => (
                      <div key={idx} className={styles.timelineItem}>
                        <div className={styles.timelineTime}>
                          <Clock size={12} />
                          <span>{item.time}</span>
                        </div>
                        <div className={styles.timelineContent}>
                          <div className={styles.timelineTitle}>{item.title}</div>
                          {item.description && (
                            <div className={styles.timelineDesc}>{item.description}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* SIDEBAR */}
          <div className={styles.sidebarColumn}>
            <Card variant="elevated" hasCornerAccents className={styles.sideCard}>
              <span className="overline">EVENT REGISTRATION</span>
              <div className={styles.metaList}>
                <div className={styles.metaRow}>
                  <Calendar className={styles.metaIcon} />
                  <div>
                    <span className={styles.metaLabel}>DATE & TIME</span>
                    <span className={styles.metaVal}>{formatDate(event.startDate)}</span>
                  </div>
                </div>

                <div className={styles.metaRow}>
                  <MapPin className={styles.metaIcon} />
                  <div>
                    <span className={styles.metaLabel}>VENUE</span>
                    <span className={styles.metaVal}>{event.venue}</span>
                  </div>
                </div>
              </div>

              <div className={styles.registrationAction}>
                <Button variant="primary" size="md" fullWidth disabled={!event.registrationOpen}>
                  {event.registrationOpen ? 'Register for Event' : 'Registration Closed'}
                </Button>
              </div>

              <div className={styles.tagsContainer}>
                <span className={styles.tagsLabel}>TAGS:</span>
                <div className={styles.tagChips}>
                  {event.tags.map((tag) => (
                    <Badge key={tag} variant="outline" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
