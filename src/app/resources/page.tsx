import React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader/PageHeader';
import { Section } from '@/components/layout/Section/Section';
import { Card } from '@/components/ui/Card/Card';
import { Badge } from '@/components/ui/Badge/Badge';
import { Button } from '@/components/ui/Button/Button';
import { constructMetadata } from '@/lib/seo/metadata';
import { placeholderResources } from '@/data/resources';
import { FileText, Download } from 'lucide-react';
import styles from './resources.module.css';

export const metadata: Metadata = constructMetadata({
  title: 'Student Resources & Documentation',
  description: 'Bylaws, templates, technical guidelines, and archived lecture notes for IEI members.',
  path: '/resources',
});

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="DOCUMENT REPOSITORY"
        title="Student Resources & Archives"
        description="Official templates, chapter guidelines, competition frameworks, and engineering lecture archives."
        badge="RESOURCE LIBRARY"
        breadcrumbs={[{ label: 'Resources' }]}
      />

      <Section id="resources-list" padding="lg" hasGridBackground>
        <div className={styles.resourceGrid}>
          {placeholderResources.map((res) => (
            <Card key={res.id} variant="default" hasCornerAccents isHoverable className={styles.resCard}>
              <div className={styles.resHeader}>
                <div className={styles.iconBox}>
                  <FileText size={20} />
                </div>
                <Badge variant="outline" size="sm">
                  {res.format}
                </Badge>
              </div>

              <h3 className={styles.resTitle}>{res.title}</h3>
              <p className={styles.resDesc}>{res.description}</p>

              <div className={styles.resFooter}>
                <span className={styles.sizeText}>{res.fileSize}</span>
                <Button variant="outline" size="sm" leftIcon={<Download size={13} />}>
                  Download Asset
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
