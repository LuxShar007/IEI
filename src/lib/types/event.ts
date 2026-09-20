export type EventCategory = 
  | 'technical'
  | 'workshop'
  | 'flagship'
  | 'hackathon'
  | 'seminar'
  | 'industrial-visit';

export type EventStatus = 'upcoming' | 'ongoing' | 'concluded';

export interface EventSpeaker {
  name: string;
  role: string;
  organization: string;
  avatarUrl?: string;
}

export interface EventScheduleItem {
  time: string;
  title: string;
  description?: string;
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: EventCategory;
  status: EventStatus;
  startDate: string;
  endDate?: string;
  venue: string;
  coverImage?: string;
  description: string;
  agenda?: EventScheduleItem[];
  speakers?: EventSpeaker[];
  registrationUrl?: string;
  registrationOpen?: boolean;
  isFeatured?: boolean;
  tags: string[];
}
