export interface Activity {
  id: string;
  slug: string;
  title: string;
  domain: string;
  description: string;
  outcomes: string[];
  cadence: string; // e.g. "Weekly", "Monthly", "Annual"
  activeProjectsCount?: number;
  tags: string[];
}
