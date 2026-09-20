import React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader/PageHeader';
import { Section } from '@/components/layout/Section/Section';
import { GalleryArchive } from '@/components/gallery/GalleryArchive';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Chapter Photographic Archive & Media Documentation',
  description:
    'Visual documentation of collegiate workshops, industry symposiums, and collaborative chapter activities at IEI SIES GST.',
  path: '/gallery',
});

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        number="05 / 07"
        eyebrow="VISUAL DOCUMENTATION • PHOTOGRAPHIC ARCHIVE"
        title="Chapter Photographic Archive"
        description="Preserving collegiate engineering milestones, laboratory sessions, technical symposia, and council ceremonies across departmental academic cycles."
        badge="MEDIA ARCHIVE"
        breadcrumbs={[{ label: 'Gallery' }]}
      />

      <Section id="gallery-archive" padding="lg">
        <GalleryArchive />
      </Section>
    </>
  );
}
