'use client';

import React, { useState } from 'react';
import type { ChapterSessionId } from '@/data/sessions';
import { TeamHero } from '@/components/team/TeamHero/TeamHero';
import { TeamInteractive } from '@/components/team/TeamInteractive/TeamInteractive';
import { FacultyLeadership } from '@/components/team/FacultyLeadership/FacultyLeadership';
import { CoreCouncilSection } from '@/components/team/CoreCouncilSection/CoreCouncilSection';
import { DomainTeamSection } from '@/components/team/DomainTeamSection/DomainTeamSection';
import { PortraitContactSheet } from '@/components/team/PortraitContactSheet/PortraitContactSheet';
import { DirectoryFallback } from '@/components/team/DirectoryFallback/DirectoryFallback';

export const TeamPageContent: React.FC = () => {
  const [activeSession, setActiveSession] = useState<ChapterSessionId>('2024-2025');

  return (
    <main id="team-flagship-experience">
      {/* SECTION 01 — THE PEOPLE & SESSION ARCHIVE */}
      <TeamHero
        activeSession={activeSession}
        onSessionChange={setActiveSession}
      />

      {/* SECTION 02 — INTERACTIVE GROUP PORTRAIT & MASKING */}
      <TeamInteractive />

      {/* SECTION 03 — FACULTY LEADERSHIP */}
      <FacultyLeadership />

      {/* SECTION 04 — CORE COUNCIL */}
      <CoreCouncilSection />

      {/* SECTION 05 — DOMAIN UNIVERSE & HIERARCHY */}
      <DomainTeamSection />

      {/* SECTION 06 — COMPLETE TEAM CONTACT SHEET */}
      <PortraitContactSheet sessionId={activeSession} />

      {/* VERIFICATION SEARCH DIRECTORY */}
      <div style={{ maxWidth: 'var(--container-2xl)', margin: '0 auto', padding: '0 clamp(var(--space-4), 4vw, var(--space-12))' }}>
        <DirectoryFallback />
      </div>
    </main>
  );
};
