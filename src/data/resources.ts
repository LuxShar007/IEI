export interface ResourceItem {
  id: string;
  title: string;
  category: 'guidelines' | 'templates' | 'curriculum' | 'reports' | 'archives';
  description: string;
  format: 'PDF' | 'DOCX' | 'ZIP' | 'CODE';
  fileSize: string;
  date: string;
  url: string;
}

export const resourceCategories = [
  'ALL',
  'GUIDELINES',
  'TEMPLATES',
  'CURRICULUM',
  'REPORTS',
  'ARCHIVES',
] as const;

export type ResourceCategory = (typeof resourceCategories)[number];

export const placeholderResources: ResourceItem[] = [
  {
    id: 'res-01',
    title: 'Student Membership Guide & Chapter Bylaws [Placeholder]',
    category: 'guidelines',
    description:
      'Official institutional regulations, operational code of conduct, and collegiate rights within IEI SIES GST.',
    format: 'PDF',
    fileSize: '1.2 MB',
    date: 'Academic Year 2024–25',
    url: '#',
  },
  {
    id: 'res-02',
    title: 'Technical Project Proposal Template [Placeholder]',
    category: 'templates',
    description:
      'Standardized institutional technical project specification and hardware proposal documentation framework.',
    format: 'DOCX',
    fileSize: '340 KB',
    date: 'Updated Aug 2024',
    url: '#',
  },
  {
    id: 'res-03',
    title: 'Workshop Schematic Diagrams & Laboratory Notes [Placeholder]',
    category: 'curriculum',
    description:
      'Curated instructional circuit diagrams, PCB layout schematics, and embedded firmware reference code.',
    format: 'PDF',
    fileSize: '4.8 MB',
    date: 'Oct 2024',
    url: '#',
  },
  {
    id: 'res-04',
    title: 'Chapter Annual Performance & Activities Report [Placeholder]',
    category: 'reports',
    date: 'Session 2023–24',
    description:
      'Official chapter operational summary compiled for faculty oversight and national headquarters submission.',
    format: 'PDF',
    fileSize: '2.6 MB',
    url: '#',
  },
  {
    id: 'res-05',
    title: 'Hardware & Code Sprint Source Repository Archive [Placeholder]',
    category: 'archives',
    date: 'Nov 2024',
    description:
      'Archived software repositories, firmware binaries, and testing datasets from chapter hackathons.',
    format: 'ZIP',
    fileSize: '24.1 MB',
    url: '#',
  },
  {
    id: 'res-06',
    title: 'Technical Paper Formatting Guidelines [Placeholder]',
    category: 'templates',
    date: 'Sep 2024',
    description:
      'Publishing and presentation typography standards for student papers submitted to national engineering symposia.',
    format: 'DOCX',
    fileSize: '480 KB',
    url: '#',
  },
];

export function getAllResources(): ResourceItem[] {
  return placeholderResources;
}
