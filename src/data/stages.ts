/**
 * PLACEHOLDER DATA — Sequential Process Stages
 * Replace with official IEI SIES GST chapter journey content.
 * Visual variants: 'learn' | 'create' | 'experiment' | 'collaborate' | 'compete' | 'contribute'
 */
export interface Stage {
  num: string;
  title: string;
  description: string;
  visual: 'learn' | 'create' | 'experiment' | 'collaborate' | 'compete' | 'contribute';
}

export const stages: Stage[] = [
  {
    num: '01',
    title: 'Learn',
    visual: 'learn',
    description:
      'Members begin by building strong foundational knowledge through technical sessions, reading groups, and curated resource tracks. Learning is structured and deliberate.',
  },
  {
    num: '02',
    title: 'Create',
    visual: 'create',
    description:
      'Knowledge transforms into creation. Members develop projects, prototypes, and systems — individually and in teams — guided by mentors and their own curiosity.',
  },
  {
    num: '03',
    title: 'Experiment',
    visual: 'experiment',
    description:
      'The best ideas require testing. Members are encouraged to break assumptions, iterate rapidly, and pursue unconventional approaches within a supportive environment.',
  },
  {
    num: '04',
    title: 'Collaborate',
    visual: 'collaborate',
    description:
      'Engineering rarely happens alone. The chapter bridges disciplines, departments, and institutions — fostering collaboration that produces stronger outcomes for everyone involved.',
  },
  {
    num: '05',
    title: 'Compete',
    visual: 'compete',
    description:
      'Members represent the chapter at state and national-level technical competitions, hackathons, and symposia — developing competitive engineering judgment and professional presence.',
  },
  {
    num: '06',
    title: 'Contribute',
    visual: 'contribute',
    description:
      'Ultimately, the chapter produces engineers who give back — to the institution, the profession, and society. Contribution is the measure of what has been truly learned.',
  },
];
