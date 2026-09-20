import React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader/PageHeader';
import { Section } from '@/components/layout/Section/Section';
import { Card } from '@/components/ui/Card/Card';
import { Badge } from '@/components/ui/Badge/Badge';
import { Button } from '@/components/ui/Button/Button';
import { constructMetadata } from '@/lib/seo/metadata';
import { Lock, Database, Users, Calendar, Image, FileText, CheckCircle2 } from 'lucide-react';
import styles from './admin.module.css';

export const metadata: Metadata = constructMetadata({
  title: 'Admin Control Architecture',
  description: 'Future administrative and content management foundation for IEI SIES GST.',
  path: '/admin',
  noIndex: true,
});

const managedEntities = [
  {
    title: 'Member & Credential Registry',
    icon: Users,
    route: '/m/[memberId]',
    schema: 'MemberSchema',
    status: 'Ready for DB Binding',
  },
  {
    title: 'Events & Workshop Roster',
    icon: Calendar,
    route: '/events/[slug]',
    schema: 'EventSchema',
    status: 'Ready for DB Binding',
  },
  {
    title: 'Media & Photo Gallery',
    icon: Image,
    route: '/gallery',
    schema: 'GallerySchema',
    status: 'Ready for S3 / Storage',
  },
  {
    title: 'Resource Library & Archives',
    icon: FileText,
    route: '/resources',
    schema: 'ResourceSchema',
    status: 'Ready for Storage Binding',
  },
];

export default function AdminFoundationPage() {
  return (
    <>
      <PageHeader
        eyebrow="FUTURE MANAGEMENT FOUNDATION"
        title="Chapter Administration Control Architecture"
        description="Structured CMS and identity administration foundation prepared for future database and authentication integration."
        badge="ARCHITECTURE SHELL"
        breadcrumbs={[{ label: 'Admin' }]}
      />

      <Section id="admin-overview" padding="lg" hasGridBackground>
        <div className={styles.container}>
          {/* NOTICE CARD */}
          <Card variant="elevated" hasCornerAccents className={styles.noticeCard}>
            <div className={styles.noticeHeader}>
              <div className={styles.lockIcon}>
                <Lock size={22} />
              </div>
              <div>
                <h2 className={styles.noticeTitle}>Admin System Architecture (Phase 1)</h2>
                <p className={styles.noticeDesc}>
                  In Phase 1, data structures and routing contracts are strictly typed and centralized in <code>src/data/</code> and <code>src/lib/types/</code>. When authentication and database layers are connected in subsequent phases, these schemas plug directly into this administration layer.
                </p>
              </div>
            </div>
          </Card>

          {/* MANAGED ENTITIES GRID */}
          <div className={styles.entityGrid}>
            {managedEntities.map((entity) => {
              const Icon = entity.icon;
              return (
                <Card key={entity.title} variant="default" hasCornerAccents className={styles.entityCard}>
                  <div className={styles.entityHeader}>
                    <div className={styles.iconBox}>
                      <Icon size={20} />
                    </div>
                    <Badge variant="outline" size="sm">
                      {entity.schema}
                    </Badge>
                  </div>

                  <h3 className={styles.entityTitle}>{entity.title}</h3>

                  <div className={styles.entityMeta}>
                    <span className={styles.metaLabel}>PUBLIC RESOLUTION ROUTE:</span>
                    <code>{entity.route}</code>
                  </div>

                  <div className={styles.entityFooter}>
                    <CheckCircle2 size={13} className={styles.checkIcon} />
                    <span className={styles.statusText}>{entity.status}</span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </Section>
    </>
  );
}
