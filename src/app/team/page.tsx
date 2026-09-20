import React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader/PageHeader';
import { Section } from '@/components/layout/Section/Section';
import { FacultyLeadership } from '@/components/team/FacultyLeadership/FacultyLeadership';
import { CoreCouncilSection } from '@/components/team/CoreCouncilSection/CoreCouncilSection';
import { DomainTeamSection } from '@/components/team/DomainTeamSection/DomainTeamSection';
import { TeamInteractive } from '@/components/team/TeamInteractive/TeamInteractive';
import { DirectoryFallback } from '@/components/team/DirectoryFallback/DirectoryFallback';
import { Button } from '@/components/ui/Button/Button';
import { constructMetadata } from '@/lib/seo/metadata';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Executive Committee & Chapter Leadership',
  description: 'Official leadership structure, faculty advisors, core council, and domain wings of the IEI SIES GST Student Chapter.',
  path: '/team',
});

export default function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="ORGANIZATIONAL ARCHITECTURE"
        title="Executive Leadership & Chapter Structure"
        description="Official institutional hierarchy of the IEI SIES GST Student Chapter: Faculty Leadership, Core Council, and 7 Specialized Domain Wings."
        badge="INSTITUTIONAL ROSTER"
        breadcrumbs={[{ label: 'Team' }]}
        actions={
          <Button href="/verify" variant="outline" size="sm" leftIcon={<ShieldCheck size={14} />}>
            Verify Credentials
          </Button>
        }
      />

      <Section id="team-content" padding="lg">
        {/* LEVEL 1: FACULTY LEADERSHIP */}
        <FacultyLeadership />

        {/* LEVEL 2: CORE COUNCIL */}
        <CoreCouncilSection />

        {/* LEVEL 3: DOMAIN TEAMS & RESPONSIBILITIES */}
        <DomainTeamSection />

        {/* SIGNATURE INTERACTIVE EXPERIENCE: GROUP PHOTOGRAPH SPOTLIGHT */}
        <TeamInteractive />

        {/* LEVEL 4: MEMBER DIRECTORY & VERIFICATION */}
        <DirectoryFallback />
      </Section>
    </>
  );
}
