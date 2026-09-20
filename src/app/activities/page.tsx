'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useTransform, useReducedMotion } from 'framer-motion';
import { PageHeader } from '@/components/layout/PageHeader/PageHeader';
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Terminal,
  Cpu,
  Lightbulb,
  Building,
  Award,
  Users,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/Button/Button';
import { useShowcaseScroll } from '@/lib/scroll/useShowcaseScroll';
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
    leadStatement:
      'Direct bare-metal programming on 32-bit ARM architectures and deterministic RTOS scheduling.',
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
    leadStatement:
      'Algorithmic foundations, quantized neural networks, and on-device model deployment.',
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
    leadStatement:
      'Multi-disciplinary student teams turning technical concepts into verifiable hardware-software prototypes.',
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
    leadStatement:
      'Connecting academic theory with high-scale enterprise engineering infrastructure.',
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
    leadStatement:
      'Fielding vetted chapter delegations in national-level technical competitions.',
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
    leadStatement:
      'Cultivating scholarly rigor, empirical validation, and technical publication in recognized journals.',
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

const STAGE_COUNT = 6;
const SCROLL_VH = 8; // 8 viewports — slightly more generous for the richer Activities layout

export default function ActivitiesPage() {
  const prefersReducedMotion = useReducedMotion();
  const { trackRef, sectionProgress, activeIndex, goToStage } = useShowcaseScroll({
    stageCount: STAGE_COUNT,
  });

  const activeStage = STAGES[activeIndex];
  const Icon = activeStage.icon;

  const isDev = process.env.NODE_ENV === 'development';
  const [debugProgress, setDebugProgress] = useState(0);

  useEffect(() => {
    if (!isDev) return;
    return sectionProgress.on('change', (p) => setDebugProgress(p));
  }, [sectionProgress, isDev]);

  // Entry / exit opacity for the full pinned stage
  const stageOpacity = useTransform(sectionProgress, [0, 0.07, 0.93, 1.0], [0, 1, 1, 0]);

  return (
    <main className={styles.page}>
      {/* EDITORIAL HEADER — sits above the pinned scroll region */}
      <PageHeader
        sectionNumber="03 / 07"
        eyebrow="Sequential Storytelling"
        title="Chapter Activities"
        description="A structured six-stage engineering continuum — from foundational microcontroller labs to peer-reviewed technical publications."
        breadcrumbs={[{ label: 'Activities' }]}
        metadataItems={[
          { label: 'Active Tracks', value: '06 Specialized Stages' },
          { label: 'Department', value: 'ECS Engineering' },
          { label: 'Oversight', value: 'SIES GST Chapter' },
        ]}
        actions={
          <Button href="/events" variant="outline" size="sm" rightIcon={<ArrowRight size={14} />}>
            View Event Calendar
          </Button>
        }
      />

      {/* =================================================================
          TYPE B SEQUENTIAL SHOWCASE
          Outer: scroll budget track (8 × 100vh)
          Inner: sticky 100vh stage, driven by sectionProgress
          ================================================================= */}
      <div
        ref={trackRef}
        className={styles.showcaseTrack}
        id="activities-showcase"
        style={{ '--scroll-vh': `${SCROLL_VH * 100}vh` } as React.CSSProperties}
      >
        <div className={styles.stickyStage}>
          <motion.div
            className={styles.stageSection}
            style={{ opacity: prefersReducedMotion ? 1 : stageOpacity }}
          >
            <div className={styles.inner}>
              {/* STAGE INDEX RAIL — progress indicators (scroll drives active) */}
              <nav
                className={styles.stageRail}
                aria-label="Activity Stages"
                role="tablist"
              >
                {STAGES.map((stage, i) => {
                  const isActive = i === activeIndex;
                  const isPast = i < activeIndex;
                  return (
                    <button
                      key={stage.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`${styles.railItem} ${isActive ? styles.railActive : ''} ${isPast ? styles.railPast : ''}`}
                      onClick={() => goToStage(i)}
                      aria-label={`Go to Stage ${stage.num}: ${stage.title}`}
                    >
                      <div className={styles.railTop}>
                        <span className={styles.railNum}>{stage.num}</span>
                        <span className={styles.railCategory}>{stage.category}</span>
                      </div>
                      <div className={styles.railTitle}>{stage.title}</div>
                      {isActive && (
                        <div className={styles.activeBar} aria-hidden="true" />
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* ACTIVE STAGE IMMERSIVE COMPOSITION */}
              <div className={styles.activeStageWrapper} role="tabpanel">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStage.id}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
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
                        <span className={styles.stageIndexLabel}>
                          STAGE {activeStage.num} OF 06
                        </span>
                      </div>

                      <h2 className={styles.stageTitle}>{activeStage.title}</h2>
                      <p className={styles.leadStatement}>{activeStage.leadStatement}</p>
                      <p className={styles.stageDescription}>{activeStage.description}</p>

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

                      {/* ACCESSIBILITY NAVIGATION — keyboard / mobile */}
                      <div className={styles.stageNavControls}>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={activeIndex === 0}
                          onClick={() => goToStage(Math.max(0, activeIndex - 1))}
                          leftIcon={<ChevronLeft size={15} />}
                          aria-label="Previous Stage"
                        >
                          Previous
                        </Button>

                        {/* MINI PROGRESS RAIL */}
                        <div className={styles.miniRail} aria-hidden="true">
                          {STAGES.map((_, i) => (
                            <div
                              key={i}
                              className={`${styles.miniDot} ${i === activeIndex ? styles.miniDotActive : ''} ${i < activeIndex ? styles.miniDotPast : ''}`}
                            />
                          ))}
                        </div>

                        <Button
                          variant="primary"
                          size="sm"
                          disabled={activeIndex === STAGE_COUNT - 1}
                          onClick={() => goToStage(Math.min(STAGE_COUNT - 1, activeIndex + 1))}
                          rightIcon={<ChevronRight size={15} />}
                          aria-label="Next Stage"
                        >
                          {activeIndex < STAGE_COUNT - 1
                            ? `Next — ${STAGES[activeIndex + 1].num}`
                            : 'Final Stage'}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* SCROLL CUE — visible at section entry */}
          <motion.div
            className={styles.scrollCue}
            style={{ opacity: useTransform(sectionProgress, [0, 0.05, 0.14], [0, 1, 0]) }}
            aria-hidden="true"
          >
            <span className={styles.scrollCueText}>Scroll through stages</span>
            <div className={styles.scrollCueLine}><div className={styles.scrollCueFill} /></div>
          </motion.div>

          {/* RELEASE CUE */}
          <motion.div
            className={styles.releaseCue}
            style={{ opacity: useTransform(sectionProgress, [0.88, 0.96], [0, 1]) }}
            aria-hidden="true"
          >
            <span className={styles.releaseCueText}>↓ Continue</span>
          </motion.div>

          {/* DEV DEBUG OVERLAY */}
          {isDev && (
            <div className={styles.debugOverlay}>
              <div className={styles.debugRow}>
                <span className={styles.debugLabel}>SECTION</span>
                <span>ACTIVITIES</span>
              </div>
              <div className={styles.debugRow}>
                <span className={styles.debugLabel}>PROGRESS</span>
                <span>{debugProgress.toFixed(3)}</span>
              </div>
              <div className={styles.debugRow}>
                <span className={styles.debugLabel}>ACTIVE STAGE</span>
                <span>{String(activeIndex + 1).padStart(2, '0')}</span>
              </div>
              <div className={styles.debugRow}>
                <span className={styles.debugLabel}>PIN</span>
                <span>{debugProgress > 0 && debugProgress < 1 ? 'ACTIVE' : 'RELEASED'}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
