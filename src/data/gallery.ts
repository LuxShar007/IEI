/**
 * STRUCTURED PLACEHOLDER DATA ONLY
 * DO NOT use as final real-world gallery items.
 * Real photographic media assets will be populated when provided.
 */

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  date: string;
  aspect?: 'landscape' | 'portrait' | 'square';
}

export const placeholderMedia: GalleryItem[] = [
  { id: '1', title: 'Technical Workshop Session [Placeholder]', category: 'Workshops', date: '2024', aspect: 'landscape' },
  { id: '2', title: 'Annual Symposium Keynote [Placeholder]', category: 'Symposium', date: '2024', aspect: 'landscape' },
  { id: '3', title: 'Hardware Hackathon Prototyping [Placeholder]', category: 'Competition', date: '2024', aspect: 'portrait' },
  { id: '4', title: 'Chapter Council Induction Ceremony [Placeholder]', category: 'Ceremony', date: '2024', aspect: 'landscape' },
  { id: '5', title: 'Industrial Visit & Lab Tour [Placeholder]', category: 'Field Visit', date: '2024', aspect: 'square' },
  { id: '6', title: 'Code & Embedded Systems Sprint [Placeholder]', category: 'Workshop', date: '2024', aspect: 'landscape' },
];
