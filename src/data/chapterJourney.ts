/**
 * IEI SIES GST — CHAPTER JOURNEY DATA MODEL
 * Sequential storytelling stages for the LinusBio-inspired platform showcase.
 * All data is typed, modular, and easily replaceable with official department content.
 */

export interface JourneyStage {
  id: string;
  number: string;
  title: string;
  eyebrow: string;
  subtitle: string;
  description: string;
  category: string;
  metadata: {
    label: string;
    value: string;
  }[];
  technicalTags: string[];
  visualTheme: 'blueprint' | 'embedded' | 'prototyping' | 'network' | 'arena' | 'contribution';
  accentColor?: string;
}

export const chapterJourneyStages: JourneyStage[] = [
  {
    id: 'learn',
    number: '01',
    title: 'LEARN',
    eyebrow: 'PHASE 01 — ACADEMIC FOUNDATIONS',
    subtitle: 'Rigorous Technical Grounding in Circuits & Logic',
    description:
      'Members commence their journey by establishing core engineering fluency. Curated syllabus enhancements, departmental reading groups, and structured technical seminars bridge theoretical textbooks with practical intuition.',
    category: 'Foundational Knowledge Acquisition',
    metadata: [
      { label: 'DOMAIN', value: 'Circuit Theory & Computation' },
      { label: 'FORMAT', value: 'Technical Seminars & Study Circles' },
      { label: 'OUTPUT', value: 'Core Engineering Literacy' },
    ],
    technicalTags: ['SPICE Modeling', 'Signals & Systems', 'Digital Logic', 'C/C++ Fundamentals'],
    visualTheme: 'blueprint',
  },
  {
    id: 'explore',
    number: '02',
    title: 'EXPLORE',
    eyebrow: 'PHASE 02 — LABORATORY EXPLORATION',
    subtitle: 'Cross-Disciplinary Inquiry & Architecture Study',
    description:
      'Moving into departmental laboratories, student engineers experiment with silicon architectures, RTOS kernels, sensor telemetry, and modern communications protocols — exploring engineering vectors beyond standard coursework.',
    category: 'Specialized Domain Research',
    metadata: [
      { label: 'DOMAIN', value: 'Embedded Systems & AIoT' },
      { label: 'FORMAT', value: 'Hands-on Hardware Labs' },
      { label: 'OUTPUT', value: 'Architectural Intuition' },
    ],
    technicalTags: ['RISC-V Microcontrollers', 'FreeRTOS', 'Telemetry Traces', 'RF & Antennae'],
    visualTheme: 'embedded',
  },
  {
    id: 'build',
    number: '03',
    title: 'BUILD',
    eyebrow: 'PHASE 03 — SYSTEM FABRICATION',
    subtitle: 'From Silicon Schematics to Tangible Prototypes',
    description:
      'Theoretical knowledge crystallizes into physical hardware and production software. Students design multi-layer PCBs, assemble surface-mount components, author deterministic firmware, and build web platforms for chapter infrastructure.',
    category: 'Engineering Implementation',
    metadata: [
      { label: 'DOMAIN', value: 'Design & Rapid Prototyping' },
      { label: 'FORMAT', value: 'Quarterly Chapter Hackathons' },
      { label: 'OUTPUT', value: 'Functional Hardware Prototypes' },
    ],
    technicalTags: ['Multi-Layer KiCad', 'STM32 / ESP32', 'Firmware Stack', 'Next.js Platforms'],
    visualTheme: 'prototyping',
  },
  {
    id: 'connect',
    number: '04',
    title: 'CONNECT',
    eyebrow: 'PHASE 04 — PROFESSIONAL NETWORK',
    subtitle: 'Interdisciplinary Synergy & Industry Mentorship',
    description:
      'Engineering thrives on collective discourse. The chapter orchestrates collaborative sessions between junior members, council mentors, alumni researchers in global institutions, and practicing industry technocrats.',
    category: 'Institutional Collaboration',
    metadata: [
      { label: 'DOMAIN', value: 'Industry Outreach & Relations' },
      { label: 'FORMAT', value: 'Executive Guest Keynotes & Visits' },
      { label: 'OUTPUT', value: 'Professional Career Pathways' },
    ],
    technicalTags: ['Alumni Mesh', 'Corporate Liaison', 'Peer Code Reviews', 'Technical Mentoring'],
    visualTheme: 'network',
  },
  {
    id: 'compete',
    number: '05',
    title: 'COMPETE',
    eyebrow: 'PHASE 05 — COMPETITIVE BENCHMARK',
    subtitle: 'Testing Prowess in High-Stakes National Arenas',
    description:
      'Chapter teams represent SIES GST at state and national competitions — robotics tournaments, hackathons, and research symposiums. Developing rapid algorithmic judgment, team resilience, and professional presentation caliber.',
    category: 'Competitive Engineering',
    metadata: [
      { label: 'DOMAIN', value: 'Hackathons & Robotics Arenas' },
      { label: 'FORMAT', value: 'Inter-Collegiate Competitions' },
      { label: 'OUTPUT', value: 'Institutional Accolades' },
    ],
    technicalTags: ['Smart India Hackathon', 'RoboCon League', 'Cybersecurity CTFs', 'Technical Papers'],
    visualTheme: 'arena',
  },
  {
    id: 'contribute',
    number: '06',
    title: 'CONTRIBUTE',
    eyebrow: 'PHASE 06 — LEGACY & GIVING BACK',
    subtitle: 'Open Source Knowledge & Junior Stewardship',
    description:
      'The journey culminates in generational stewardship. Senior engineers open-source their research tooling, author comprehensive archival guides, and mentor the incoming first-year cohort to sustain the chapter’s institutional legacy.',
    category: 'Community Leadership',
    metadata: [
      { label: 'DOMAIN', value: 'Archival & Open Source' },
      { label: 'FORMAT', value: 'Annual Chapter Publications' },
      { label: 'OUTPUT', value: 'Sustained Institutional Heritage' },
    ],
    technicalTags: ['Open Hardware', 'IEI Student Journal', 'Cohort Mentorship', 'Department Archives'],
    visualTheme: 'contribution',
  },
];
