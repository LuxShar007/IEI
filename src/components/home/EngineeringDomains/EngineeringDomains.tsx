'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/layout/Container/Container';
import { Cpu } from 'lucide-react';
import styles from './EngineeringDomains.module.css';

interface DomainItem {
  id: string;
  num: string;
  title: string;
  tagline: string;
  description: string;
  focusAreas: string[];
}

const DOMAINS: DomainItem[] = [
  {
    id: 'ai-ml',
    num: '01',
    title: 'AI & Machine Learning',
    tagline: 'Neural graph architectures and tensor inference',
    description:
      'Algorithmic foundations, deep model architectures, computer vision, and real-time distributed model inference.',
    focusAreas: ['Neural Networks', 'Predictive Modeling', 'Edge Inference'],
  },
  {
    id: 'embedded',
    num: '02',
    title: 'Embedded Systems & IoT',
    tagline: 'Microcontroller telemetry and real-time signals',
    description:
      'Firmware development, sensor bus interfacing (I2C/SPI), RTOS concurrency, and low-power telemetry nodes.',
    focusAreas: ['Firmware Development', 'RTOS Scheduling', 'Sensor Telemetry'],
  },
  {
    id: 'vlsi',
    num: '03',
    title: 'VLSI & Microelectronics',
    tagline: 'Silicon architectures and logic synthesis',
    description:
      'Digital ASIC design, FPGA prototyping, CMOS cell layout, and hardware description synthesis in Verilog/VHDL.',
    focusAreas: ['FPGA Design', 'Digital Synthesis', 'ASIC Layout'],
  },
  {
    id: 'robotics',
    num: '04',
    title: 'Robotics & Automation',
    tagline: 'Kinematics and servo feedback systems',
    description:
      'Kinematic coordinate algorithms, motor servo control, closed-loop telemetry, and autonomous collegiate rover development.',
    focusAreas: ['Servo Control', 'Kinematic Modeling', 'Autonomous Navigation'],
  },
  {
    id: 'software',
    num: '05',
    title: 'Software Systems',
    tagline: 'Distributed architecture and protocols',
    description:
      'High-reliability software architecture, networking protocols, concurrent pipelines, and robust full-stack engineering.',
    focusAreas: ['Systems Architecture', 'Distributed State', 'API Pipelines'],
  },
  {
    id: 'research',
    num: '06',
    title: 'Applied Research',
    tagline: 'Empirical scholarship and technical papers',
    description:
      'Technical manuscript writing, collegiate symposium presentations, empirical verification, and patent methodologies.',
    focusAreas: ['Paper Publication', 'Empirical Validation', 'Conference Track'],
  },
];

/* DOMAIN SVG SCHEMATIC - clean engineering illustrations */
const DomainVisualizer: React.FC<{ domain: DomainItem }> = ({ domain }) => {
  return (
    <div className={styles.visualizerFrame} aria-hidden="true">
      <svg className={styles.schematicSvg} viewBox="0 0 500 500" fill="none">
        {domain.id === 'ai-ml' && (
          <g>
            <circle cx="250" cy="250" r="160" stroke="rgba(59, 130, 246, 0.1)" strokeDasharray="3 3" />
            <circle cx="250" cy="250" r="90" stroke="rgba(59, 130, 246, 0.18)" />
            <circle cx="150" cy="180" r="8" fill="#38bdf8" fillOpacity="0.8" />
            <circle cx="150" cy="250" r="8" fill="#38bdf8" fillOpacity="0.8" />
            <circle cx="150" cy="320" r="8" fill="#38bdf8" fillOpacity="0.8" />
            <circle cx="250" cy="150" r="10" fill="#2563eb" fillOpacity="0.8" />
            <circle cx="250" cy="250" r="14" fill="#3b82f6" />
            <circle cx="250" cy="350" r="10" fill="#2563eb" fillOpacity="0.8" />
            <circle cx="350" cy="210" r="8" fill="#10b981" fillOpacity="0.8" />
            <circle cx="350" cy="290" r="8" fill="#10b981" fillOpacity="0.8" />
            <line x1="150" y1="180" x2="250" y2="150" stroke="rgba(59, 130, 246, 0.25)" strokeWidth="1.5" />
            <line x1="150" y1="180" x2="250" y2="250" stroke="rgba(59, 130, 246, 0.25)" strokeWidth="1.5" />
            <line x1="150" y1="250" x2="250" y2="250" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" />
            <line x1="150" y1="320" x2="250" y2="250" stroke="rgba(59, 130, 246, 0.25)" strokeWidth="1.5" />
            <line x1="150" y1="320" x2="250" y2="350" stroke="rgba(59, 130, 246, 0.25)" strokeWidth="1.5" />
            <line x1="250" y1="150" x2="350" y2="210" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1.5" />
            <line x1="250" y1="250" x2="350" y2="210" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1.5" />
            <line x1="250" y1="250" x2="350" y2="290" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1.5" />
            <line x1="250" y1="350" x2="350" y2="290" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1.5" />
          </g>
        )}
        {domain.id === 'embedded' && (
          <g>
            <rect x="170" y="170" width="160" height="160" rx="8" fill="#131722" stroke="#3b82f6" strokeWidth="2" />
            <text x="250" y="252" textAnchor="middle" fill="#38bdf8" fontFamily="monospace" fontSize="13" fontWeight="500">MCU 32-BIT</text>
            {[-40, -20, 0, 20, 40].map((offset) => (
              <React.Fragment key={offset}>
                <line x1={250 + offset} y1="140" x2={250 + offset} y2="170" stroke="#38bdf8" strokeWidth="2" strokeOpacity="0.7" />
                <line x1={250 + offset} y1="330" x2={250 + offset} y2="360" stroke="#38bdf8" strokeWidth="2" strokeOpacity="0.7" />
                <line x1="140" y1={250 + offset} x2="170" y2={250 + offset} stroke="#38bdf8" strokeWidth="2" strokeOpacity="0.7" />
                <line x1="330" y1={250 + offset} x2="360" y2={250 + offset} stroke="#38bdf8" strokeWidth="2" strokeOpacity="0.7" />
              </React.Fragment>
            ))}
            <circle cx="250" cy="250" r="210" stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="4 8" />
          </g>
        )}
        {domain.id === 'vlsi' && (
          <g>
            <circle cx="250" cy="250" r="180" stroke="rgba(59, 130, 246, 0.15)" />
            {[-80, -40, 0, 40, 80].map((coord) => (
              <React.Fragment key={coord}>
                <line x1="120" y1={250 + coord} x2="380" y2={250 + coord} stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1.5" />
                <line x1={250 + coord} y1="120" x2={250 + coord} y2="380" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1.5" />
              </React.Fragment>
            ))}
            <rect x="210" y="210" width="80" height="80" fill="none" stroke="#f59e0b" strokeWidth="2" />
            <circle cx="250" cy="250" r="25" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" />
          </g>
        )}
        {domain.id === 'robotics' && (
          <g>
            <circle cx="250" cy="250" r="170" stroke="rgba(255, 255, 255, 0.06)" strokeDasharray="6 6" />
            <circle cx="250" cy="250" r="120" stroke="#38bdf8" strokeWidth="2" strokeOpacity="0.5" />
            <circle cx="250" cy="250" r="60" stroke="#2563eb" strokeWidth="2" strokeDasharray="15 30" />
            <line x1="250" y1="80" x2="250" y2="420" stroke="rgba(255, 255, 255, 0.07)" />
            <line x1="80" y1="250" x2="420" y2="250" stroke="rgba(255, 255, 255, 0.07)" />
            <circle cx="370" cy="250" r="10" fill="#10b981" />
            <line x1="250" y1="250" x2="370" y2="250" stroke="#10b981" strokeWidth="3" />
          </g>
        )}
        {domain.id === 'software' && (
          <g>
            <rect x="130" y="140" width="240" height="40" rx="4" fill="#181f2c" stroke="#38bdf8" strokeWidth="1.5" />
            <rect x="130" y="210" width="240" height="40" rx="4" fill="#181f2c" stroke="#2563eb" strokeWidth="1.5" />
            <rect x="130" y="280" width="240" height="40" rx="4" fill="#181f2c" stroke="#06b6d4" strokeWidth="1.5" />
            <rect x="130" y="350" width="240" height="40" rx="4" fill="#181f2c" stroke="#10b981" strokeWidth="1.5" />
            <circle cx="250" cy="195" r="3" fill="#38bdf8" />
            <circle cx="250" cy="265" r="3" fill="#2563eb" />
            <circle cx="250" cy="335" r="3" fill="#06b6d4" />
          </g>
        )}
        {domain.id === 'research' && (
          <g>
            <line x1="100" y1="380" x2="400" y2="380" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.5" />
            <line x1="100" y1="120" x2="100" y2="380" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.5" />
            <path d="M 100 360 Q 200 340, 260 240 T 400 140" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
            <circle cx="260" cy="240" r="6" fill="#f59e0b" />
            <circle cx="400" cy="140" r="6" fill="#10b981" />
            <line x1="260" y1="120" x2="260" y2="380" stroke="rgba(245, 158, 11, 0.2)" strokeDasharray="3 3" />
          </g>
        )}
      </svg>
    </div>
  );
};

export const EngineeringDomains: React.FC = () => {
  const [activeDomainIndex, setActiveDomainIndex] = useState(0);
  const activeDomain = DOMAINS[activeDomainIndex];

  return (
    <section id="domains" className={styles.domainsSection}>
      <Container size="2xl">
        {/* SECTION HEADER */}
        <div className={styles.header}>
          <div className={styles.sectionTag}>
            <span className={styles.tagNum}>03</span>
            <div className={styles.tagLine} />
            <span className="section-tag">Technical Focus</span>
          </div>
          <h2 className={styles.sectionTitle}>Engineering Domains</h2>
          <p className={styles.sectionSubtitle}>
            The chapter spans six core engineering disciplines — each with dedicated workshops, reading groups, and project tracks.
          </p>
        </div>

        <div className={styles.domainsGrid}>
          {/* LEFT: DOMAIN SELECTOR LIST */}
          <div className={styles.domainsList}>
            {DOMAINS.map((domain, idx) => {
              const isActive = idx === activeDomainIndex;
              return (
                <button
                  key={domain.id}
                  onClick={() => setActiveDomainIndex(idx)}
                  className={`${styles.domainTab} ${isActive ? styles.activeTab : ''}`}
                >
                  <span className={styles.tabNum}>{domain.num}</span>
                  <span className={styles.tabTitle}>{domain.title}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className={styles.activeBar}
                      transition={{ type: 'spring', damping: 24, stiffness: 300 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* RIGHT: DOMAIN DETAIL PANEL */}
          <div className={styles.visualizerColumn}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDomain.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={styles.displayPanel}
              >
                <DomainVisualizer domain={activeDomain} />

                <div className={styles.detailsContent}>
                  <div className={styles.taglineText}>{activeDomain.tagline}</div>
                  <h3 className={styles.detailsTitle}>{activeDomain.title}</h3>
                  <p className={styles.detailsDesc}>{activeDomain.description}</p>

                  <div className={styles.focusPills}>
                    {activeDomain.focusAreas.map((area) => (
                      <span key={area} className={styles.focusPill}>
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
};
