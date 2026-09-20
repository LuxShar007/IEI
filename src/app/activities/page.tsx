import React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader/PageHeader';
import { Section } from '@/components/layout/Section/Section';
import { Card } from '@/components/ui/Card/Card';
import { Badge } from '@/components/ui/Badge/Badge';
import { constructMetadata } from '@/lib/seo/metadata';
import { placeholderActivities } from '@/data/activities';
import { CheckCircle2, Terminal } from 'lucide-react';
import styles from './activities.module.css';

export const metadata: Metadata = constructMetadata({
  title: 'Activities & Domains',
  description: 'Explore technical workshops, student mentorship, and symposium activities conducted by IEI SIES GST.',
  path: '/activities',
});

export default function ActivitiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="TECHNICAL INITIATIVES"
        title="Chapter Activities & Domains"
        description="Structured engineering programs, hands-on masterclasses, and collaborative student project mentorship."
        badge="PROGRAM ROSTER"
        breadcrumbs={[{ label: 'Activities' }]}
      />

      <Section
        id="activity-list"
        eyebrow="DOMAINS"
        title="Active Program Tracks"
        description="Regular initiatives driven by the chapter for student engineer skill enhancement."
        padding="lg"
        hasGridBackground
      >
        <div className={styles.activityGrid}>
          {placeholderActivities.map((act) => (
            <Card key={act.id} variant="default" hasCornerAccents className={styles.activityCard}>
              <div className={styles.activityHeader}>
                <div className={styles.iconBox}>
                  <Terminal size={20} />
                </div>
                <Badge variant="accent" size="sm">
                  {act.cadence}
                </Badge>
              </div>

              <div className={styles.domainTag}>{act.domain}</div>
              <h3 className={styles.activityTitle}>{act.title}</h3>
              <p className={styles.activityDesc}>{act.description}</p>

              <div className={styles.outcomesBox}>
                <span className={styles.outcomesLabel}>KEY OUTCOMES:</span>
                <ul className={styles.outcomesList}>
                  {act.outcomes.map((item, idx) => (
                    <li key={idx} className={styles.outcomeItem}>
                      <CheckCircle2 size={14} className={styles.checkIcon} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.tagsRow}>
                {act.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    #{tag}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
