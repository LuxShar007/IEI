import React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader/PageHeader';
import { Section } from '@/components/layout/Section/Section';
import { VerificationLookup } from '@/components/verification/VerificationLookup';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Member Verification Portal',
  description: 'Authenticate official IEI SIES GST student chapter credentials, committee appointment badges, and certificates.',
  path: '/verify',
});

export default function VerifyPortalPage() {
  return (
    <>
      <PageHeader
        eyebrow="OFFICIAL REGISTRY"
        title="Member Credential Verification"
        description="Public authentication registry for official credentials and committee appointments issued by IEI SIES GST."
        badge="INSTITUTIONAL REGISTRY"
        badgeVariant="verified"
        breadcrumbs={[{ label: 'Verify' }]}
      />

      <Section id="lookup-portal" padding="lg" hasGridBackground>
        <VerificationLookup />
      </Section>
    </>
  );
}
