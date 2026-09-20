import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getMemberById, getAllMembers } from '@/data/members';
import { PageHeader } from '@/components/layout/PageHeader/PageHeader';
import { Section } from '@/components/layout/Section/Section';
import { MemberProfile } from '@/components/members/MemberProfile';
import { Button } from '@/components/ui/Button/Button';
import { constructMetadata } from '@/lib/seo/metadata';
import { ArrowLeft } from 'lucide-react';

interface MemberPageProps {
  params: Promise<{
    member: string;
  }>;
}

export async function generateStaticParams() {
  const members = getAllMembers();
  return members.map((member) => ({
    member: member.memberId,
  }));
}

export async function generateMetadata({ params }: MemberPageProps): Promise<Metadata> {
  const { member: memberId } = await params;
  const member = getMemberById(memberId);

  if (!member) {
    return constructMetadata({ title: 'Member Not Found' });
  }

  return constructMetadata({
    title: `${member.name} — ${member.designation}`,
    description: member.bio,
    path: `/team/${member.memberId}`,
  });
}

export default async function TeamMemberPage({ params }: MemberPageProps) {
  const { member: memberId } = await params;
  const member = getMemberById(memberId);

  if (!member) {
    notFound();
  }

  return (
    <>
      <PageHeader
        eyebrow={`MEMBER PROFILE • ${member.memberId}`}
        title={member.name}
        description={`${member.designation} — ${member.department}`}
        badge={member.verification.badgeType}
        badgeVariant="verified"
        breadcrumbs={[
          { label: 'Team', href: '/team' },
          { label: member.name },
        ]}
        actions={
          <Button href="/team" variant="outline" size="sm" leftIcon={<ArrowLeft size={14} />}>
            Back to Team
          </Button>
        }
      />

      <Section id="member-profile-view" padding="lg" hasGridBackground>
        <MemberProfile member={member} />
      </Section>
    </>
  );
}
