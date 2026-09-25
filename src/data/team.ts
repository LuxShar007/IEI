import type { FacultyLeader, DomainDefinition, CoreCouncilPlaceholder, DomainId } from '@/lib/types/team';
import { placeholderMembers } from './members';

/**
 * ============================================================================
 * 01 — FACULTY LEADERSHIP
 * Supplied official faculty advisors for IEI SIES GST.
 * Do not fabricate additional faculty.
 * ============================================================================
 */
export const facultyLeaders: FacultyLeader[] = [
  {
    id: 'fac-01',
    name: 'Dr. Shubhangi Kharache',
    role: 'HOD',
    designation: 'Head of Department',
    department: 'Electronics & Computer Science Engineering',
    bio: 'Providing institutional vision and academic direction for the IEI SIES GST Student Chapter, guiding curriculum integration and professional research standards.',
    email: 'hod.ecs@siesgst.ac.in',
  },
  {
    id: 'fac-02',
    name: 'Prof. Jasmin Hirani',
    role: 'Student Branch Coordinator',
    designation: 'Faculty Advisor & Chapter Coordinator',
    department: 'Electronics & Computer Science Engineering',
    bio: 'Overseeing chapter operations, student leadership coordination, and official IEI council liaison to foster engineering innovation and collaborative student development.',
    email: 'jasmin.hirani@siesgst.ac.in',
  },
];

/**
 * ============================================================================
 * 02 — CORE COUNCIL (CENTRAL LEADERSHIP)
 * Separate from Domain Teams. Structure prepared for official appointment data.
 * ============================================================================
 */
export const coreCouncilInfo: CoreCouncilPlaceholder = {
  status: 'pending_induction',
  message: 'Chapter Core Council Induction in Progress',
  note: 'Official student executive appointments for the upcoming session are being ratified by the Faculty Advisory Board. Verified digital credentials will be issued upon induction.',
};

/**
 * ============================================================================
 * 03 — DOMAIN TEAMS
 * 7 Official Domains with Volunteer Role Responsibilities:
 * 1. Technical
 * 2. Industry Outreach & Admin
 * 3. Publicity
 * 4. Creative
 * 5. Design
 * 6. Media
 * 7. Editorial
 *
 * Hierarchy supported per domain: Mentor, Head, Coordinator, Volunteer.
 * ============================================================================
 */
export const domainDefinitions: DomainDefinition[] = [
  {
    id: 'technical',
    name: 'Technical',
    shortCode: 'TECH',
    description:
      'Planning and executing technical events, workshops, competitions, project-based activities, technical content and technical initiatives.',
    responsibilities: [
      'Hands-on technical workshops & hardware-software sprints',
      'Annual technical symposium and hackathon challenges',
      'Curated project tracks & engineering lab mentorship',
      'Technical curriculum & domain-specific study groups',
    ],
    members: {
      mentors: [],
      heads: [placeholderMembers.find((m) => m.memberId === 'IEI-GST-2025-042') || placeholderMembers[0]],
      coordinators: [],
      volunteers: [],
    },
    nodeCoords: { x: 50, y: 14 },
  },
  {
    id: 'industry_outreach_admin',
    name: 'Industry Outreach & Admin',
    shortCode: 'OUTREACH',
    description:
      'Industry and professional connections, organizations, institutions, partnerships, guest sessions, outreach, PR and administrative operations.',
    responsibilities: [
      'Corporate partnerships and industry technical seminars',
      'Professional networking & institutional MOUs',
      'Chapter logistics and administrative documentation',
      'Inter-collegiate outreach & guest speaker coordination',
    ],
    members: {
      mentors: [],
      heads: [placeholderMembers.find((m) => m.memberId === 'IEI-GST-2025-002') || placeholderMembers[0]],
      coordinators: [],
      volunteers: [],
    },
    nodeCoords: { x: 18, y: 84 },
  },
  {
    id: 'publicity',
    name: 'Publicity',
    shortCode: 'PUB',
    description:
      'Event and initiative promotion, announcements, campaigns and outreach.',
    responsibilities: [
      'Campus-wide campaign rollout for technical symposia',
      'Digital announcements, promotional scheduling & engagement',
      'Class-to-class engagement and student chapter awareness',
      'Collaborative outreach with sister collegiate bodies',
    ],
    members: {
      mentors: [],
      heads: [placeholderMembers.find((m) => m.memberId === 'IEI-GST-2025-010') || placeholderMembers[0]],
      coordinators: [],
      volunteers: [],
    },
    nodeCoords: { x: 82, y: 64 },
  },
  {
    id: 'creative',
    name: 'Creative',
    shortCode: 'CRTV',
    description:
      'Creative ideas, event/campaign concepts, brainstorming and physical artistic requirements.',
    responsibilities: [
      'Thematic concept development for flagship chapter events',
      'Physical stage designs, installations & interactive exhibits',
      'Engaging technical storytelling concepts & campaign motifs',
      'Creative problem-solving for symposium audience engagement',
    ],
    members: {
      mentors: [],
      heads: [placeholderMembers.find((m) => m.memberId === 'IEI-GST-2025-015') || placeholderMembers[0]],
      coordinators: [],
      volunteers: [],
    },
    nodeCoords: { x: 26, y: 60 },
  },
  {
    id: 'design',
    name: 'Design',
    shortCode: 'DSGN',
    description:
      'Posters, flyers, banners, certificates, presentations and social graphics, while maintaining branding consistency.',
    responsibilities: [
      'Official IEI institutional branding & visual identity guidelines',
      'Digital flyers, brochures, presentation decks & certificate design',
      'Print collateral, banners and symposium credential cards',
      'Consistent design system execution across all media assets',
    ],
    members: {
      mentors: [],
      heads: [placeholderMembers.find((m) => m.memberId === 'IEI-GST-2025-021') || placeholderMembers[0]],
      coordinators: [],
      volunteers: [],
    },
    nodeCoords: { x: 78, y: 34 },
  },
  {
    id: 'media',
    name: 'Media',
    shortCode: 'MED',
    description:
      'Photography, videography, social media updates, content scheduling and digital presence.',
    responsibilities: [
      'High-resolution photography for all chapter proceedings',
      'Cinematic event recaps, teaser reels & video documentation',
      'Social media channel operations & scheduled releases',
      'Media archives, photo gallery curation & press packages',
    ],
    members: {
      mentors: [],
      heads: [placeholderMembers.find((m) => m.memberId === 'IEI-GST-2025-028') || placeholderMembers[0]],
      coordinators: [],
      volunteers: [],
    },
    nodeCoords: { x: 22, y: 34 },
  },
  {
    id: 'editorial',
    name: 'Editorial',
    shortCode: 'EDIT',
    description:
      'Event reports, minutes, articles, captions and official communications.',
    responsibilities: [
      'Comprehensive event documentation and post-symposium reports',
      'Formal institutional correspondence and chapter minutes',
      'Technical articles, newsletters & engineering whitepapers',
      'Copywriting for official digital announcements and releases',
    ],
    members: {
      mentors: [],
      heads: [placeholderMembers.find((m) => m.memberId === 'IEI-GST-2025-003') || placeholderMembers[0]],
      coordinators: [],
      volunteers: [],
    },
    nodeCoords: { x: 50, y: 84 },
  },
];

export function getFacultyLeaders(): FacultyLeader[] {
  return facultyLeaders;
}

export function getAllDomains(): DomainDefinition[] {
  return domainDefinitions;
}

export function getDomainById(id: DomainId): DomainDefinition | undefined {
  return domainDefinitions.find((d) => d.id === id);
}

export function getMembersForSession(sessionId: string) {
  return placeholderMembers.filter((m) => m.session === sessionId || (!m.session && sessionId === '2024-2025'));
}
