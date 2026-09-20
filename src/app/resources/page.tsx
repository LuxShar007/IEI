import React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader/PageHeader';
import { Section } from '@/components/layout/Section/Section';
import { ResourceDirectory } from '@/components/resources/ResourceDirectory';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Official Chapter Documentation, Bylaws & Resources',
  description:
    'Institutional documents, technical templates, lecture materials, and reports for IEI SIES GST students and faculty.',
  path: '/resources',
});

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        number="06 / 07"
        eyebrow="DOCUMENTATION REPOSITORY • TECHNICAL ARCHIVES"
        title="Chapter Resources & Documentation"
        description="Standardized technical specifications, institutional guidelines, project templates, and instructional archives maintained by the student chapter."
        badge="RESOURCE LIBRARY"
        breadcrumbs={[{ label: 'Resources' }]}
      />

      <Section id="resources-directory" padding="lg">
        <ResourceDirectory />
      </Section>
    </>
  );
}
