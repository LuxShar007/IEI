'use client';

import React from 'react';
import { motion, type MotionValue, useTransform } from 'framer-motion';
import { JourneyStage } from '@/data/chapterJourney';
import styles from './ChapterJourney.module.css';

interface StageNavigationProps {
  stages: JourneyStage[];
  activeStageIndex: number;
  progress: MotionValue<number>;
  onSelectStage: (index: number) => void;
}

export const StageNavigation: React.FC<StageNavigationProps> = ({
  stages,
  activeStageIndex,
  progress,
  onSelectStage,
}) => {
  const scaleX = useTransform(progress, [0, 1], [0, 1], { clamp: true });

  return (
    <nav
      className={styles.stageNav}
      aria-label="Chapter Journey Stages"
      role="tablist"
    >
      {/* Background connecting track line across all 6 stages */}
      <div className={styles.navTrackLine}>
        {/* Dynamic progress fill bar bound directly to master progress */}
        <motion.div
          className={styles.navProgressFill}
          style={{
            scaleX,
            transformOrigin: '0% 50%',
          }}
          aria-hidden="true"
        />
      </div>

      {/* 6 Stage Buttons along the horizontal line */}
      <div className={styles.navItemsRow}>
        {stages.map((stage, index) => {
          const isActive = index === activeStageIndex;
          const isPassed = index < activeStageIndex;

          return (
            <button
              key={stage.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`stage-panel-${stage.id}`}
              id={`stage-tab-${stage.id}`}
              tabIndex={0}
              className={`${styles.navItem} ${isActive ? styles.navItemActive : ''} ${isPassed ? styles.navItemPassed : ''}`}
              onClick={() => onSelectStage(index)}
            >
              {/* Vertical Tick Pip Indicator */}
              <div className={styles.navMarkerWrap} aria-hidden="true">
                <div className={styles.navPip} />
                {isActive && <div className={styles.activeMarkerPulse} />}
              </div>

              {/* Stage Number & Title */}
              <div className={styles.navTextWrap}>
                <span className={styles.navNum}>{stage.number}</span>
                <span className={styles.navTitle}>{stage.title}</span>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
