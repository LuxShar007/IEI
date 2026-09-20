import React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader/PageHeader';
import { Section } from '@/components/layout/Section/Section';
import { Card } from '@/components/ui/Card/Card';
import { Badge } from '@/components/ui/Badge/Badge';
import { constructMetadata } from '@/lib/seo/metadata';
import { Camera } from 'lucide-react';
import styles from './gallery.module.css';

export const metadata: Metadata = constructMetadata({
  title: 'Chapter Gallery & Media Archive',
  description: 'Photographic archives and media documentation from technical workshops and symposiums.',
  path: '/gallery',
});

import { placeholderMedia } from '@/data/gallery';

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="MEDIA ARCHIVE"
        title="Chapter Gallery & Documentation"
        description="Visual documentation of collegiate workshops, industry symposiums, and collaborative chapter activities."
        badge="MEDIA ARCHIVE"
        breadcrumbs={[{ label: 'Gallery' }]}
      />

      <Section id="gallery-grid" padding="lg" hasGridBackground>
        <div className={styles.galleryGrid}>
          {placeholderMedia.map((item) => (
            <Card key={item.id} variant="default" hasCornerAccents isHoverable className={styles.mediaCard}>
              <div className={styles.mediaPlaceholder}>
                <Camera size={28} className={styles.mediaIcon} />
                <span className={styles.placeholderLabel}>MEDIA ASSET PLACEHOLDER</span>
              </div>
              <div className={styles.mediaDetails}>
                <div className={styles.metaRow}>
                  <Badge variant="outline" size="sm">
                    {item.category}
                  </Badge>
                  <span className={styles.dateTag}>{item.date}</span>
                </div>
                <h3 className={styles.mediaTitle}>{item.title}</h3>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
