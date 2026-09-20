'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, useTransform, useReducedMotion } from 'framer-motion';
import { chapterJourneyStages, type JourneyStage } from '@/data/chapterJourney';
import { useSmoothScroll } from '@/components/layout/SmoothScrollProvider';
import { StageNavigation } from './StageNavigation';
import { StageVisual } from './StageVisual';
import styles from './ChapterJourney.module.css';

export const ChapterJourney: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const { lenis } = useSmoothScroll();

  // SINGLE MASTER PROGRESS (0..1) driving the entire sequence
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Discrete stage index update — only updates state when crossing integer stage boundary
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const clamped = Math.max(0, Math.min(1, latest));
    const stage = Math.min(
      Math.floor(clamped * chapterJourneyStages.length),
      chapterJourneyStages.length - 1
    );
    setActiveStageIndex((prev) => (prev !== stage ? stage : prev));
  });

  // Accessible click-to-stage smooth scroll handler
  const handleSelectStage = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
    const targetProgress = (index + 0.5) / chapterJourneyStages.length;
    const targetScrollY = containerTop + targetProgress * totalScrollable;

    setActiveStageIndex(index);

    if (lenis) {
      lenis.scrollTo(targetScrollY, { duration: 0.9 });
    } else {
      window.scrollTo({
        top: targetScrollY,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      ref={containerRef}
      id="chapter-journey"
      className={styles.journeyContainer}
      aria-label="Chapter Journey: From Learning to Contribution"
    >
      {/* ─── PINNED VIEWPORT (Maintains stability during 600vh scroll) ─────── */}
      <div className={styles.stickyViewport}>
        {/* Engineering Background Coordinate Grid */}
        <div className={styles.backgroundGrid} aria-hidden="true" />

        {/* ─── TOP BAR: EDITORIAL HEADER ───────────────────────────────────── */}
        <header className={styles.topBar}>
          <div className={styles.headerGroup}>
            <span className={styles.sectionTag}>THE CHAPTER JOURNEY</span>
            <h2 className={styles.sectionTitle}>From Learning to Contribution.</h2>
            <span className={styles.sectionSubtitle}>Institutional Progression & Engineering Lifecycle</span>
          </div>

          <div className={styles.telemetryBadge} aria-hidden="true">
            <span className={styles.telemetryIndicator} />
            <span>STAGE {activeStageIndex + 1} OF {chapterJourneyStages.length}</span>
          </div>
        </header>

        {/* ─── HORIZONTAL STAGE NAVIGATION TRACK ───────────────────────────── */}
        <StageNavigation
          stages={chapterJourneyStages}
          activeStageIndex={activeStageIndex}
          progress={scrollYProgress}
          onSelectStage={handleSelectStage}
        />

        {/* ─── PRESENTATION BODY: EDITORIAL SPLIT (Text & Visual) ──────────── */}
        <div className={styles.presentationBody}>
          {/* Left Column: Synchronized Stage Storytelling & Metadata */}
          <div className={styles.textStoryCol}>
            <div className={styles.textStageContainer}>
              {chapterJourneyStages.map((stage, idx) => (
                <StageTextPanel
                  key={stage.id}
                  stage={stage}
                  index={idx}
                  total={chapterJourneyStages.length}
                  progress={scrollYProgress}
                  reducedMotion={Boolean(prefersReducedMotion)}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Prominent Engineering Visual Composition */}
          <div className={styles.visualCol}>
            <StageVisual
              stages={chapterJourneyStages}
              progress={scrollYProgress}
              reducedMotion={Boolean(prefersReducedMotion)}
            />
          </div>
        </div>

        {/* ─── BOTTOM BAR: SCROLL CUE & ACTIVE COUNTER ─────────────────────── */}
        <footer className={styles.bottomStatus} aria-hidden="true">
          <div className={styles.scrollHint}>
            <span className={styles.scrollPipAnimation} />
            <span>CONTINUOUS DOCUMENT SCROLL TO ADVANCE JOURNEY</span>
          </div>
          <div className={styles.stageCounter}>
            {chapterJourneyStages[activeStageIndex].number} // {chapterJourneyStages[activeStageIndex].title}
          </div>
        </footer>
      </div>
    </section>
  );
};

/* ─── SYNCHRONIZED STAGE TEXT COMPONENT ──────────────────────────────────── */
interface StageTextPanelProps {
  stage: JourneyStage;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  reducedMotion: boolean;
}

const StageTextPanel: React.FC<StageTextPanelProps> = ({
  stage,
  index,
  total,
  progress,
  reducedMotion,
}) => {
  const segment = 1 / total;
  const start = index * segment;
  const end = (index + 1) * segment;
  const halfTrans = 0.018;

  let opacityInput: number[];
  let opacityOutput: number[];
  let yInput: number[];
  let yOutput: number[];

  if (index === 0) {
    opacityInput = [0, end - halfTrans, end + halfTrans, 1];
    opacityOutput = [1, 1, 0, 0];
    yInput = [0, end - halfTrans, end + halfTrans, 1];
    yOutput = reducedMotion ? [0, 0, 0, 0] : [0, 0, -12, -12];
  } else if (index === total - 1) {
    opacityInput = [0, start - halfTrans, start + halfTrans, 1];
    opacityOutput = [0, 0, 1, 1];
    yInput = [0, start - halfTrans, start + halfTrans, 1];
    yOutput = reducedMotion ? [0, 0, 0, 0] : [12, 12, 0, 0];
  } else {
    opacityInput = [
      0,
      start - halfTrans,
      start + halfTrans,
      end - halfTrans,
      end + halfTrans,
      1,
    ];
    opacityOutput = [0, 0, 1, 1, 0, 0];
    yInput = [
      0,
      start - halfTrans,
      start + halfTrans,
      end - halfTrans,
      end + halfTrans,
      1,
    ];
    yOutput = reducedMotion
      ? [0, 0, 0, 0, 0, 0]
      : [12, 12, 0, 0, -12, -12];
  }

  const opacity = useTransform(progress, opacityInput, opacityOutput, { clamp: true });

  // Subtle vertical float on enter / exit
  const y = useTransform(progress, yInput, yOutput, { clamp: true });

  return (
    <motion.article
      id={`stage-panel-${stage.id}`}
      role="tabpanel"
      aria-labelledby={`stage-tab-${stage.id}`}
      className={styles.stageTextLayer}
      style={{
        opacity,
        y,
        pointerEvents: opacity ? 'auto' : 'none',
      }}
    >
      {/* Eyebrow Milestone Tracker */}
      <span className={styles.stageEyebrow}>{stage.eyebrow}</span>

      {/* Number & Headline Row */}
      <div className={styles.stageHeadlineRow}>
        <span className={styles.stageGiantNum}>{stage.number}</span>
        <h3 className={styles.stageMainTitle}>{stage.title}</h3>
      </div>

      {/* Subtitle */}
      <div className={styles.stageSubtitle}>{stage.subtitle}</div>

      {/* Narrative Paragraph */}
      <p className={styles.stageDescription}>{stage.description}</p>

      {/* Technical Tags in Liquid Glass Style */}
      <div className={styles.tagsRow} aria-label="Key Technical Tools & Concepts">
        {stage.technicalTags.map((tag) => (
          <span key={tag} className={styles.techTag}>
            {tag}
          </span>
        ))}
      </div>

      {/* Structured Institutional Metadata Grid */}
      <div className={styles.stageMetadataList}>
        {stage.metadata.map((meta, i) => (
          <div key={i} className={styles.metaItem}>
            <span className={styles.metaLabel}>{meta.label}</span>
            <span className={styles.metaValue}>{meta.value}</span>
          </div>
        ))}
      </div>
    </motion.article>
  );
};
