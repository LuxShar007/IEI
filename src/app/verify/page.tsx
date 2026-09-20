import React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader/PageHeader';
import { Section } from '@/components/layout/Section/Section';
import { VerificationLookup } from '@/components/verification/VerificationLookup';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Member Credential Verification Registry',
  description:
    'Public institutional registry for authenticating official IEI SIES GST student chapter credentials, leadership appointments, and digital badges.',
  path: '/verify',
});

export default function VerifyPortalPage() {
  return (
    <>
      <PageHeader
        number="VERIFY"
        eyebrow="OFFICIAL REGISTRY • DIGITAL CREDENTIAL PROTOCOL"
        title="Member Credential Verification"
        description="Public authentication registry for validating official collegiate badges, executive appointments, and domain credentials issued by IEI SIES GST."
        badge="SECURE REGISTRY"
        badgeVariant="verified"
        breadcrumbs={[{ label: 'Verify' }]}
      />

      <Section id="lookup-portal" padding="lg">
        <VerificationLookup />
      </Section>
    </>
  );
}
