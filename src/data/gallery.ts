/**
 * CHAPTER GALLERY & PHOTOGRAPHIC ARCHIVE DATA
 * Structured placeholders until photographic media assets are officially ingested.
 */

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Events' | 'Workshops' | 'Team' | 'Projects' | 'Industry' | 'Ceremonies';
  date: string;
  aspect: 'landscape' | 'portrait' | 'square';
  location: string;
}

export const galleryCategories = [
  'ALL',
  'EVENTS',
  'WORKSHOPS',
  'TEAM',
  'PROJECTS',
  'INDUSTRY',
  'CEREMONIES',
] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

export const placeholderMedia: GalleryItem[] = [
  {
    id: 'gal-01',
    title: 'Technical Workshop Session [Archival Record]',
    category: 'Workshops',
    date: '2024–2025',
    aspect: 'landscape',
    location: 'Lab 402, SIES GST',
  },
  {
    id: 'gal-02',
    title: 'Annual Department Symposium Keynote [Archival Record]',
    category: 'Events',
    date: '2024',
    aspect: 'landscape',
    location: 'Auditorium, SIES GST',
  },
  {
    id: 'gal-03',
    title: 'Hardware Embedded Systems Sprint [Archival Record]',
    category: 'Projects',
    date: '2024',
    aspect: 'portrait',
    location: 'IoT Research Facility',
  },
  {
    id: 'gal-04',
    title: 'Chapter Council Induction & Formal Assembly [Archival Record]',
    category: 'Ceremonies',
    date: '2024',
    aspect: 'landscape',
    location: 'Seminar Hall',
  },
  {
    id: 'gal-05',
    title: 'Industrial Technical Visit & Manufacturing Tour [Archival Record]',
    category: 'Industry',
    date: '2024',
    aspect: 'square',
    location: 'Navi Mumbai Industrial Corridor',
  },
  {
    id: 'gal-06',
    title: 'Collegiate Student Chapter Working Group [Archival Record]',
    category: 'Team',
    date: '2024–2025',
    aspect: 'landscape',
    location: 'ECS Department Annex',
  },
  {
    id: 'gal-07',
    title: 'Microcontroller Circuit Assembly Laboratory [Archival Record]',
    category: 'Workshops',
    date: '2024',
    aspect: 'portrait',
    location: 'Hardware Engineering Lab',
  },
  {
    id: 'gal-08',
    title: 'State Technical Paper Presentation [Archival Record]',
    category: 'Events',
    date: '2023',
    aspect: 'landscape',
    location: 'SIES GST Campus',
  },
];
