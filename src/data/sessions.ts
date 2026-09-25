export type ChapterSessionId = '2024-2025' | '2023-2024';

export interface SessionRecord {
  id: ChapterSessionId;
  label: string;
  academicYear: string;
  isCurrent: boolean;
  inductionDate: string;
  tenureStatus: 'active' | 'archived';
  description: string;
}

export const chapterSessions: SessionRecord[] = [
  {
    id: '2024-2025',
    label: 'Session 2024–2025',
    academicYear: 'AY 2024–25',
    isCurrent: true,
    inductionDate: 'August 2024',
    tenureStatus: 'active',
    description: 'Current collegiate student chapter executive council, faculty board, and domain wings.',
  },
  {
    id: '2023-2024',
    label: 'Session 2023–2024',
    academicYear: 'AY 2023–24',
    isCurrent: false,
    inductionDate: 'August 2023',
    tenureStatus: 'archived',
    description: 'Founding session of the Electronics and Computer Science Engineering Department chapter.',
  },
];

export function getCurrentSession(): SessionRecord {
  return chapterSessions.find((s) => s.isCurrent) || chapterSessions[0];
}

export function getAllSessions(): SessionRecord[] {
  return chapterSessions;
}
