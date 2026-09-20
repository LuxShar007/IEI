import type { Event } from '@/lib/types/event';

/**
 * STRUCTURED PLACEHOLDER DATA ONLY
 * Real event announcements will be populated via the event roster in Phase 2.
 */
export const placeholderEvents: Event[] = [
  {
    id: 'evt-01',
    slug: 'annual-technical-symposium',
    title: 'Annual Technical Symposium [Placeholder]',
    tagline: 'Collegiate engineering competition & keynote track',
    category: 'flagship',
    status: 'upcoming',
    startDate: '2025-10-15T09:00:00Z',
    endDate: '2025-10-16T18:00:00Z',
    venue: 'Auditorium, SIES Graduate School of Technology',
    description: 
      'Flagship annual technical symposium bringing together interdisciplinary engineering students for innovation challenges, technical paper presentations, and industry keynote sessions.',
    tags: ['Engineering', 'Keynotes', 'Competition'],
    isFeatured: true,
    registrationOpen: true,
    agenda: [
      { time: '09:00 AM', title: 'Inaugural Ceremony & Chapter Welcome' },
      { time: '10:30 AM', title: 'Keynote Address on Future Engineering' },
      { time: '02:00 PM', title: 'Project Exhibition & Evaluation' },
    ],
  },
  {
    id: 'evt-02',
    slug: 'applied-robotics-workshop',
    title: 'Applied Robotics & Microcontrollers Workshop [Placeholder]',
    tagline: 'Hands-on embedded systems and sensor interfacing',
    category: 'workshop',
    status: 'upcoming',
    startDate: '2025-11-05T10:00:00Z',
    venue: 'Hardware Lab 3, SIES GST',
    description:
      'Practical workshop focused on sensor interfacing, microcontroller programming, and real-time robotics fundamentals led by senior student engineers.',
    tags: ['Robotics', 'Embedded Systems', 'IoT'],
    isFeatured: false,
    registrationOpen: true,
  },
  {
    id: 'evt-03',
    slug: 'industry-expert-lecture-series',
    title: 'Industry Expert Lecture Series [Placeholder]',
    tagline: 'Leading professionals share real-world engineering insight',
    category: 'seminar',
    status: 'upcoming',
    startDate: '2025-12-10T14:00:00Z',
    venue: 'Seminar Hall, SIES GST',
    description:
      'A series of lectures by industry practitioners covering career development, engineering trends, and practical experiences from leading technology organizations.',
    tags: ['Industry', 'Career', 'Seminar'],
    isFeatured: false,
    registrationOpen: true,
  },
  {
    id: 'evt-04',
    slug: 'national-hackathon-participation',
    title: 'National Hackathon Participation [Placeholder]',
    tagline: '24-hour engineering challenge',
    category: 'hackathon',
    status: 'upcoming',
    startDate: '2026-01-18T08:00:00Z',
    venue: 'TBD',
    description:
      'Chapter members compete at a national-level hackathon — a 24-hour challenge to design and prototype solutions to real-world engineering problems.',
    tags: ['Hackathon', 'Competition', 'National'],
    isFeatured: false,
    registrationOpen: false,
  },
  {
    id: 'evt-05',
    slug: 'paper-presentation-competition',
    title: 'Technical Paper Presentation [Placeholder]',
    tagline: 'Student research and innovation showcase',
    category: 'technical',
    status: 'upcoming',
    startDate: '2026-02-20T09:00:00Z',
    venue: 'Conference Room, SIES GST',
    description:
      'Students present original research papers and innovative technical concepts to a panel of faculty evaluators and industry judges.',
    tags: ['Research', 'Presentation', 'Technical'],
    isFeatured: false,
    registrationOpen: false,
  },
];

export function getEventBySlug(slug: string): Event | undefined {
  return placeholderEvents.find((e) => e.slug === slug);
}

export function getAllEvents(): Event[] {
  return placeholderEvents;
}
