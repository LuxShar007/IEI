import React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader/PageHeader';
import { Section } from '@/components/layout/Section/Section';
import { Card } from '@/components/ui/Card/Card';
import { Badge } from '@/components/ui/Badge/Badge';
import { Button } from '@/components/ui/Button/Button';
import { constructMetadata } from '@/lib/seo/metadata';
import { placeholderEvents } from '@/data/events';
import { formatDate } from '@/lib/utils/format';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import styles from './events.module.css';

export const metadata: Metadata = constructMetadata({
  title: 'Technical Events & Symposiums',
  description: 'Schedule of technical workshops, guest lectures, hackathons, and engineering competitions at IEI SIES GST.',
  path: '/events',
});

export default function EventsPage() {
  return (
    <>
      <PageHeader
        eyebrow="PROGRAM DIRECTORY"
        title="Technical Events & Workshops"
        description="Upcoming and archived technical competitions, hands-on masterclasses, and engineering keynotes."
        badge="EVENT CALENDAR"
        breadcrumbs={[{ label: 'Events' }]}
      />

      <Section
        id="events-list"
        eyebrow="SCHEDULE"
        title="Active & Upcoming Programs"
        padding="lg"
        hasGridBackground
      >
        <div className={styles.eventsGrid}>
          {placeholderEvents.map((event) => (
            <Card key={event.id} variant="default" hasCornerAccents isHoverable className={styles.card}>
              <div className={styles.cardInner}>
                <div className={styles.metaRow}>
                  <Badge variant={event.category === 'flagship' ? 'accent' : 'default'} size="sm">
                    {event.category.toUpperCase()}
                  </Badge>
                  <span className={styles.dateText}>
                    <Calendar size={13} />
                    {formatDate(event.startDate)}
                  </span>
                </div>

                <h3 className={styles.eventTitle}>{event.title}</h3>
                <p className={styles.eventTagline}>{event.tagline}</p>

                <div className={styles.venueRow}>
                  <MapPin size={13} />
                  <span>{event.venue}</span>
                </div>

                <div className={styles.cardFooter}>
                  <Button href={`/events/${event.slug}`} variant="outline" size="sm" fullWidth rightIcon={<ArrowRight size={14} />}>
                    View Program & Register
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
