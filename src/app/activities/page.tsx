'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader/PageHeader';
import { ArrowRight, CheckCircle2, ChevronRight, Terminal, Cpu, Lightbulb, Building, Award, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './activities.module.css';

interface ActivityStage {
  id: string;
  num: string;
  stageCode: string;
  title: string;
  category: string;
  cadence: string;
  leadStatement: string;
  description: string;
  outcomes: string[];
  toolchain: string[];
  facultyOversight: string;
  icon: React.ElementType;
}

const STAGES: ActivityStage[] = [
  {
    id: 'stage-01',
    num: '01',
    stageCode: 'ACT·SYS·01',
    title: 'Embedded Toolchains & RTOS Kernel Labs',
    category: 'Hardware Systems Lab',
    cadence: 'Bi-Weekly Intensive',
    leadStatement: 'Direct bare-metal programming on 32-bit ARM architectures and deterministic RTOS scheduling.',
    description:
      'Student engineers transition from toy microcontrollers to industrial firmware development. The curriculum focuses on peripheral bus interfacing (SPI, I2C, UART), interrupt service routines, DMA memory controllers, and real-time task preemption under FreeRTOS.',
    outcomes: [
      'Bare-metal register configuration on ARM Cortex-M',
      'Task synchronization using semaphores, queues, and mutexes',
      'Logic analyzer signal debugging and bus protocol analysis',
    ],
    toolchain: ['STM32CubeIDE', 'FreeRTOS', 'Saleae Logic', 'ARM GCC'],
    facultyOversight: 'Department of Electronics & Computer Science Engineering',
    icon: Terminal,
  },
  {
    id: 'stage-02',
    num: '02',
    stageCode: 'ACT·SYS·02',
    title: 'Distributed Machine Learning & Edge Inference',
    category: 'Applied AI Track',
    cadence: 'Weekly Seminar & Code Lab',
    leadStatement: 'Algorithmic foundations, quantized neural networks, and on-device model deployment.',
    description:
      'Focusing on the practical engineering challenges of machine learning. Participants dissect research papers, optimize transformer topologies for tensor compilation, and deploy lightweight neural models directly onto resource-constrained embedded edge targets.',
    outcomes: [
      'Model quantization (INT8/FP16) and weight pruning',
      'Real-time computer vision pipelines via OpenVINO & TensorRT',
      'Benchmarking inference latency against thermal envelopes',
    ],
    toolchain: ['PyTorch', 'TensorRT', 'ONNX Runtime', 'Edge TPU'],
    facultyOversight: 'Department Research Advisory',
    icon: Cpu,
  },
  {
    id: 'stage-03',
    num: '03',
    stageCode: 'ACT·SYS·03',
    title: 'Mentored Engineering Project Incubator',
    category: 'Applied Innovation',
    cadence: 'Semester-Long Track',
    leadStatement: 'Multi-disciplinary student teams turning technical concepts into verifiable hardware-software prototypes.',
    description:
      'The incubator provides structured milestones, peer code review, departmental lab access, and technical component funding. Teams develop original engineering solutions addressing collegiate, civic, or industrial challenges under formal design reviews.',
    outcomes: [
      'Comprehensive schematic and two-layer PCB layout design',
      'Version-controlled Git workflows and CI test benches',
      'Formal technical documentation adhering to IEEE publication norms',
    ],
    toolchain: ['KiCad EDA', 'GitLab CI', 'LaTeX', 'Altium Viewer'],
    facultyOversight: 'Department Mentorship Committee',
    icon: Lightbulb,
  },
  {
    id: 'stage-04',
    num: '04',
    stageCode: 'ACT·SYS·04',
    title: 'Industrial Facilities & Enterprise Tech Summits',
    category: 'Professional Liaison',
    cadence: 'Quarterly Excursion',
    leadStatement: 'Connecting academic theory with high-scale enterprise engineering infrastructure.',
    description:
      'Coordinated technical delegations to semiconductor fabrication facilities, automotive telemetry centers, and hyperscale data centers. Students engage directly with lead principal architects to understand production-grade deployment realities.',
    outcomes: [
      'Direct exposure to production testbenches and cleanrooms',
      'Seminars with principal engineers and technical directors',
      'Direct pipeline for research apprenticeships and summer internships',
    ],
    toolchain: ['Site Conclaves', 'Technical Briefings', 'Architecture Reviews'],
    facultyOversight: 'Industry Outreach & Admin Wing',
    icon: Building,
  },
  {
    id: 'stage-05',
    num: '05',
    stageCode: 'ACT·SYS·05',
    title: 'National Collegiate Hackathons & Build-Offs',
    category: 'Competitive Engineering',
    cadence: 'Annual Flagship',
    leadStatement: 'Fielding vetted chapter delegations in national-level technical competitions.',
    description:
      'The chapter conducts rigorous internal sprints to select and prepare delegations for prestigious collegiate hackathons and robotics symposiums under the national IEI banner, maintaining a tradition of technical podium finishes.',
    outcomes: [
      'Rapid full-stack system architecture under 36-hour deadlines',
      'Hardware-in-the-loop stress testing and edge-case validation',
      'Jury presentations to venture engineers and technical fellows',
    ],
    toolchain: ['Rapid CAD', 'Docker', 'Embedded Linux', 'FastAPI'],
    facultyOversight: 'Technical & Creative Wings',
    icon: Award,
  },
  {
    id: 'stage-06',
    num: '06',
    stageCode: 'ACT·SYS·06',
    title: 'Applied Engineering Research & Paper Circles',
    category: 'Scholarly Publishing',
    cadence: 'Monthly Colloquium',
    leadStatement: 'Cultivating scholarly rigor, empirical validation, and technical publication in recognized journals.',
    description:
      'Dedicated to advancing original technical scholarship. Student authors work closely with faculty advisors to formulate test hypotheses, generate empirical data sets, and author manuscripts for national and international IEEE and IEI conferences.',
    outcomes: [
      'Hypothesis formulation and statistical rigor verification',
      'Peer review critique and manuscript refinement',
      'Oral presentation preparation for collegiate symposia',
    ],
    toolchain: ['IEEE Conference Format', 'Zotero', 'MATLAB', 'Overleaf'],
    facultyOversight: 'Faculty Leadership Board',
    icon: Users,
  },
];

export default function ActivitiesPage() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const activeStage = STAGES[activeStageIndex];
  const Icon = activeStage.icon;

  return (
    <main className={styles.page}>
      {/* EDITORIAL HEADER */}
      <PageHeader
        sectionNumber="03 / 07"
        eyebrow="Sequential Storytelling"
        title="Chapter Activities"
        description="A structured six-stage engineering continuum — from foundational microcontroller labs to peer-reviewed technical publications."
        breadcrumbs={[{ label: 'Activities' }]}
        metadataItems={[
          { label: 'Active Tracks', value: '06 Specialized Stages' },
          { label: 'Department', value: 'ECS Engineering' },
          { label: 'Oversight', value: 'SIES GST Chapter MH-04' },
        ]}
      />

      {/* LINUSBIO-INSPIRED STAGE-DRIVEN SYSTEM */}
      <section className={styles.stageSection} aria-label="Activities Stage System">
        <div className={styles.inner}>
          {/* STAGE INDEX RAIL (DESKTOP HORIZONTAL STAGE SELECTOR) */}
          <nav className={styles.stageRail} aria-label="Activity Stages Navigation">
            {STAGES.map((stage, i) => {
              const isActive = i === activeStageIndex;
              return (
                <button
                  key={stage.id}
                  type="button"
                  className={`${styles.railItem} ${isActive ? styles.railActive : ''}`}
                  onClick={() => setActiveStageIndex(i)}
                  aria-selected={isActive}
                  role="tab"
                >
                  <div className={styles.railTop}>
                    <span className={styles.railNum}>{stage.num}</span>
                    <span className={styles.railCategory}>{stage.category}</span>
                  </div>
                  <div className={styles.railTitle}>{stage.title}</div>
                  {isActive && <div className={styles.activeBar} aria-hidden="true" />}
                </button>
              );
            })}
          </nav>

          {/* ACTIVE STAGE IMMERSIVE COMPOSITION */}
          <div className={styles.activeStageWrapper} role="tabpanel">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={styles.stageGrid}
              >
                {/* LEFT: LARGE ARCHITECTURAL VISUAL FRAME */}
                <div className={styles.stageVisualFrame}>
                  <div className={styles.illustrationCanvas} aria-hidden="true">
                    <div className={styles.blueprintGrid} />
                    <div className={styles.visualSchematic}>
                      <Icon size={72} className={styles.schematicIcon} />
                      <div className={styles.concentricRing} />
                    </div>
                    <div className={styles.stageStamp}>
                      <span className={styles.stampCode}>{activeStage.stageCode}</span>
                      <span className={styles.stampDept}>SIES GST · ECS</span>
                    </div>
                  </div>

                  <div className={styles.cadencePill}>
                    <span className={styles.cadenceDot} />
                    <span>{activeStage.cadence}</span>
                  </div>
                </div>

                {/* RIGHT: RICH NARRATIVE CONTENT */}
                <div className={styles.stageContent}>
                  <div className={styles.contentHeader}>
                    <span className={styles.stageBadge}>{activeStage.category}</span>
                    <span className={styles.stageIndexLabel}>STAGE {activeStage.num} OF 06</span>
                  </div>

                  <h2 className={styles.stageTitle}>{activeStage.title}</h2>
                  <p className={styles.leadStatement}>{activeStage.leadStatement}</p>
                  <p className={styles.stageDescription}>{activeStage.description}</p>

                  {/* OUTCOMES & TECHNICAL SPECS */}
                  <div className={styles.specSection}>
                    <h3 className={styles.specHeader}>Target Engineering Outcomes</h3>
                    <ul className={styles.outcomesList}>
                      {activeStage.outcomes.map((item, idx) => (
                        <li key={idx} className={styles.outcomeItem}>
                          <CheckCircle2 size={15} className={styles.checkIcon} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* TOOLCHAIN STRIP */}
                  <div className={styles.toolchainStrip}>
                    <span className={styles.toolchainLabel}>Tooling & Platforms:</span>
                    <div className={styles.toolsRow}>
                      {activeStage.toolchain.map((tool) => (
                        <span key={tool} className={styles.toolBadge}>
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* STAGE CONTROLS */}
                  <div className={styles.stageNavControls}>
                    <button
                      type="button"
                      disabled={activeStageIndex === 0}
                      onClick={() => setActiveStageIndex((prev) => Math.max(0, prev - 1))}
                      className={styles.prevBtn}
                      aria-label="Previous Stage"
                    >
                      ← Previous Stage
                    </button>
                    <button
                      type="button"
                      disabled={activeStageIndex === STAGES.length - 1}
                      onClick={() => setActiveStageIndex((prev) => Math.min(STAGES.length - 1, prev + 1))}
                      className={styles.nextBtn}
                      aria-label="Next Stage"
                    >
                      <span>Next Stage ({STAGES[Math.min(STAGES.length - 1, activeStageIndex + 1)].num})</span>
                      <ChevronRight size={15} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
}
