import React from 'react';
import type { Metadata } from 'next';
import { getMemberById, getAllMembers } from '@/data/members';
import { PageHeader } from '@/components/layout/PageHeader/PageHeader';
import { Section } from '@/components/layout/Section/Section';
import { MemberProfile } from '@/components/members/MemberProfile';
import { Card } from '@/components/ui/Card/Card';
import { Button } from '@/components/ui/Button/Button';
import { constructMetadata } from '@/lib/seo/metadata';
import { ShieldAlert, Search, ShieldCheck } from 'lucide-react';
import styles from './memberQr.module.css';

interface MemberQrPageProps {
  params: Promise<{
    memberId: string;
  }>;
}

export async function generateStaticParams() {
  const members = getAllMembers();
  return members.map((member) => ({
    memberId: member.memberId,
  }));
}

export async function generateMetadata({ params }: MemberQrPageProps): Promise<Metadata> {
  const { memberId } = await params;
  const member = getMemberById(memberId);

  if (!member) {
    return constructMetadata({
      title: `Unverified Credential — ${memberId}`,
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `Verified Member: ${member.name} (${member.memberId})`,
    description: `Official IEI SIES GST digital identity credential for ${member.name}, ${member.designation}.`,
    path: `/m/${member.memberId}`,
  });
}

export default async function MemberQrDestinationPage({ params }: MemberQrPageProps) {
  const { memberId } = await params;
  const member = getMemberById(memberId);

  if (!member) {
    return (
      <>
        <PageHeader
          eyebrow="DIGITAL CREDENTIAL RESOLUTION"
          title="Unverified Credential ID"
          description="The requested identifier could not be authenticated against the current IEI SIES GST chapter roster."
          badge="AUTHENTICATION FAILED"
          badgeVariant="warning"
          breadcrumbs={[
            { label: 'Verification', href: '/verify' },
            { label: memberId },
          ]}
        />

        <Section id="unverified-state" padding="lg" hasGridBackground>
          <div className={styles.errorContainer}>
            <Card variant="elevated" hasCornerAccents className={styles.errorCard}>
              <div className={styles.errorIcon}>
                <ShieldAlert size={36} />
              </div>

              <div className={styles.errorBadgeId}>
                <span>RECORD QUERY:</span>
                <code>{memberId}</code>
              </div>

              <h2 className={styles.errorHeading}>No Authenticated Record Found</h2>
              <p className={styles.errorText}>
                The physical badge QR payload or URL requested does not correlate with an active collegiate member credential. This may indicate an inactive term, a newly printed badge pending database registration, or an invalid ID format.
              </p>

              <div className={styles.errorActions}>
                <Button href="/verify" variant="primary" size="md" leftIcon={<Search size={16} />}>
                  Search Verification Registry
                </Button>
                <Button href="/contact" variant="outline" size="md">
                  Contact Chapter Office
                </Button>
              </div>
            </Card>
          </div>
        </Section>
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="QR CREDENTIAL ENDPOINT • STABLE DIGITAL IDENTITY"
        title={member.name}
        description={`Verified digital identity card for ${member.designation} (${member.department}). Physical badge scanned successfully.`}
        badge="AUTHENTICATED"
        badgeVariant="verified"
        breadcrumbs={[
          { label: 'Verification', href: '/verify' },
          { label: member.memberId },
        ]}
        actions={
          <Button href="/verify" variant="outline" size="sm" leftIcon={<ShieldCheck size={14} />}>
            Verification Portal
          </Button>
        }
      />

      <Section id="verified-member-card" padding="lg" hasGridBackground>
        <MemberProfile member={member} />
      </Section>
    </>
  );
}
