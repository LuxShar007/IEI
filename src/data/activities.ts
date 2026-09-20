import type { Activity } from '@/lib/types/activity';

/**
 * STRUCTURED PLACEHOLDER DATA ONLY
 */
export const placeholderActivities: Activity[] = [
  {
    id: 'act-01',
    slug: 'technical-workshops',
    title: 'Hands-on Technical Workshops [Placeholder]',
    domain: 'Practical Skill Development',
    description: 'Structured workshops covering hardware prototyping, software design, embedded systems, and industrial tools.',
    cadence: 'Monthly',
    outcomes: ['Practical tool mastery', 'Project portfolio building', 'Peer collaboration'],
    tags: ['Hands-on', 'Technology', 'Skill Building'],
  },
  {
    id: 'act-02',
    slug: 'engineering-symposiums',
    title: 'Student Engineering Seminars [Placeholder]',
    domain: 'Academic & Industry Discourse',
    description: 'Technical seminars and research discussions featuring faculty advisors, alumni, and industry engineers.',
    cadence: 'Bi-monthly',
    outcomes: ['Industry awareness', 'Research exploration', 'Technical communication'],
    tags: ['Seminars', 'Research', 'Industry'],
  },
  {
    id: 'act-03',
    slug: 'project-mentorship',
    title: 'Interdisciplinary Project Mentorship [Placeholder]',
    domain: 'Innovation & Research',
    description: 'Guiding collegiate student engineers from idea ideation to working prototypes and conference presentations.',
    cadence: 'Ongoing',
    outcomes: ['Prototype delivery', 'Competition participation', 'Paper publication'],
    tags: ['Innovation', 'Mentorship', 'Prototypes'],
  },
];

export function getAllActivities(): Activity[] {
  return placeholderActivities;
}
