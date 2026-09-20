import type { Member } from './member';

export type HierarchyLevel =
  | 'faculty'
  | 'core_council'
  | 'mentor'
  | 'head'
  | 'coordinator'
  | 'volunteer';

export type DomainId =
  | 'technical'
  | 'industry_outreach_admin'
  | 'publicity'
  | 'creative'
  | 'design'
  | 'media'
  | 'editorial';

export interface FacultyLeader {
  id: string;
  name: string;
  role: 'HOD' | 'Student Branch Coordinator';
  designation: string;
  department: string;
  bio: string;
  photo?: string;
  email?: string;
}

export interface DomainDefinition {
  id: DomainId;
  name: string;
  shortCode: string;
  description: string;
  responsibilities: string[];
  members: {
    mentors: Member[];
    heads: Member[];
    coordinators: Member[];
    volunteers: Member[];
  };
}

export interface CoreCouncilPlaceholder {
  status: 'pending_induction' | 'announced';
  message: string;
  note: string;
}
