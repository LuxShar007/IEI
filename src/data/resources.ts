export interface ResourceItem {
  id: string;
  title: string;
  category: 'guidelines' | 'templates' | 'curriculum' | 'archives';
  description: string;
  format: string; // e.g. "PDF", "ZIP", "Link"
  fileSize?: string;
  url?: string;
}

export const placeholderResources: ResourceItem[] = [
  {
    id: 'res-01',
    title: 'Student Membership Guide & Bylaws [Placeholder]',
    category: 'guidelines',
    description: 'Official chapter regulations, code of conduct, and student privileges within IEI SIES GST.',
    format: 'PDF',
    fileSize: '1.2 MB',
    url: '#',
  },
  {
    id: 'res-02',
    title: 'Technical Project Proposal Template [Placeholder]',
    category: 'templates',
    description: 'Standardized IEEE/IEI technical paper and hardware proposal template for collegiate projects.',
    format: 'DOCX',
    fileSize: '340 KB',
    url: '#',
  },
  {
    id: 'res-03',
    title: 'Past Workshop Materials & Source Code [Placeholder]',
    category: 'archives',
    description: 'Archived lecture slides, schematic diagrams, and source repositories from previous chapter workshops.',
    format: 'Archive',
    fileSize: '18 MB',
    url: '#',
  },
];

export function getAllResources(): ResourceItem[] {
  return placeholderResources;
}
