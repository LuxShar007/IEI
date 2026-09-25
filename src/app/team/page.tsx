import React from 'react';
import type { Metadata } from 'next';
import { TeamPageContent } from '@/components/team/TeamPageContent/TeamPageContent';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'The People — Executive Committee & Chapter Roster',
  description:
    'Flagship interactive leadership portrait, official faculty advisory board, apex core council, and 7 specialized engineering domain wings of the IEI SIES GST Student Chapter (ECS).',
  path: '/team',
});

export default function TeamPage() {
  return <TeamPageContent />;
}
