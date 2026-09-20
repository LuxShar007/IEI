'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useReducedMotion } from 'framer-motion';
import { stages, type Stage } from '@/data/stages';
import styles from './SequentialProcess.module.css';

/* ─── ABSTRACT SVG VISUAL PER STAGE ──────────────────────────────────────── */
const StageVisual: React.FC<{ stage: Stage }> = ({ stage }) => {
  const key = stage.visual;

  const pathIn = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1, transition: { duration: 1.0, ease: 'easeOut' as const } },
  };

  const dotIn = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' as const } },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={key}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={styles.svgWrap}
        aria-hidden="true"
      >
        <svg viewBox="0 0 400 400" fill="none" className={styles.stageSvg}>
          {/* Background grid — always present */}
          {[100, 200, 300].map((v, i) => (
            <React.Fragment key={i}>
              <line x1={v} y1="50" x2={v} y2="350" stroke="var(--border-subtle)" strokeWidth="1" />
              <line x1="50" y1={v} x2="350" y2={v} stroke="var(--border-subtle)" strokeWidth="1" />
            </React.Fragment>
          ))}

          {key === 'learn' && (
            <g>
              {/* Single central node + expanding ring */}
              <motion.circle cx="200" cy="200" r="60" stroke="var(--accent)" strokeOpacity="0.25" strokeWidth="1" variants={pathIn as never} initial="hidden" animate="visible" />
              <motion.circle cx="200" cy="200" r="120" stroke="var(--accent)" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="6 10" variants={pathIn as never} initial="hidden" animate="visible" />
              <motion.circle cx="200" cy="200" r="8" fill="var(--accent)" variants={dotIn} initial="hidden" animate="visible" />
              {/* 3 input lines */}
              {[[-90, -60], [-90, 0], [-90, 60]].map(([dx, dy], i) => (
                <motion.line key={i} x1={200 + dx} y1={200 + dy} x2="200" y2="200"
                  stroke="var(--fg-secondary)" strokeWidth="1.5" strokeLinecap="round"
                  custom={i} variants={pathIn} initial="hidden" animate="visible"
                  transition={{ duration: 0.8, delay: i * 0.15 }}
                />
              ))}
              {[[-90, -60], [-90, 0], [-90, 60]].map(([dx, dy], i) => (
                <motion.circle key={`d-${i}`} cx={200 + dx} cy={200 + dy} r="4" fill="var(--fg-primary)"
                  variants={dotIn} initial="hidden" animate="visible"
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
                />
              ))}
            </g>
          )}

          {key === 'create' && (
            <g>
              {/* Modular grid forming */}
              {[[130, 130], [200, 130], [270, 130], [130, 200], [200, 200], [270, 200], [200, 270]].map(([x, y], i) => (
                <motion.rect key={i} x={x - 22} y={y - 22} width="44" height="44"
                  stroke={i < 4 ? "var(--border-strong)" : "var(--accent)"}
                  strokeWidth="1"
                  variants={pathIn as never} initial="hidden" animate="visible"
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                />
              ))}
              <motion.circle cx="200" cy="200" r="5" fill="var(--accent)"
                variants={dotIn} initial="hidden" animate="visible" transition={{ delay: 0.7 }}
              />
            </g>
          )}

          {key === 'experiment' && (
            <g>
              {/* Branching structure */}
              <motion.path d="M 200 350 L 200 250 L 130 180 L 80 130" stroke="var(--fg-secondary)" strokeWidth="1.5" strokeLinecap="round" variants={pathIn} initial="hidden" animate="visible" />
              <motion.path d="M 200 250 L 270 180 L 320 130" stroke="var(--fg-secondary)" strokeWidth="1.5" strokeLinecap="round" variants={pathIn} initial="hidden" animate="visible" />
              <motion.path d="M 130 180 L 90 200 L 60 180" stroke="var(--border-strong)" strokeWidth="1" strokeLinecap="round" variants={pathIn} initial="hidden" animate="visible" />
              <motion.path d="M 270 180 L 310 200 L 340 180" stroke="var(--accent)" strokeWidth="1" strokeLinecap="round" variants={pathIn} initial="hidden" animate="visible" />
              {[[80, 130], [320, 130], [130, 180], [270, 180], [200, 250]].map(([cx, cy], i) => (
                <motion.circle key={i} cx={cx} cy={cy} r={i === 4 ? 6 : 4}
                  fill={i === 4 ? "var(--accent)" : "var(--fg-primary)"}
                  variants={dotIn} initial="hidden" animate="visible"
                  transition={{ delay: 0.4 + i * 0.1 }}
                />
              ))}
            </g>
          )}

          {key === 'collaborate' && (
            <g>
              {/* 5 connected nodes — network */}
              {[
                [200, 150], [280, 210], [250, 310], [150, 310], [120, 210]
              ].map(([cx, cy], i) => (
                <motion.circle key={i} cx={cx} cy={cy} r={i === 0 ? 8 : 6}
                  fill={i === 0 ? "var(--accent)" : "var(--fg-secondary)"}
                  variants={dotIn} initial="hidden" animate="visible"
                  transition={{ delay: i * 0.12 }}
                />
              ))}
              {[
                [200,150,280,210],[280,210,250,310],[250,310,150,310],
                [150,310,120,210],[120,210,200,150],[200,150,250,310],[120,210,280,210]
              ].map(([x1,y1,x2,y2], i) => (
                <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={i > 4 ? "var(--accent)" : "var(--border-strong)"}
                  strokeWidth="1.5"
                  variants={pathIn} initial="hidden" animate="visible"
                  transition={{ duration: 0.8, delay: i * 0.08 }}
                />
              ))}
            </g>
          )}

          {key === 'compete' && (
            <g>
              {/* Ascending bars */}
              {[60, 90, 130, 180, 240].map((h, i) => (
                <motion.rect key={i} x={80 + i * 58} y={300 - h} width="40" height={h}
                  fill={i === 4 ? "var(--accent-subtle)" : "var(--surface-highlight)"}
                  stroke={i === 4 ? "var(--accent)" : "var(--border-strong)"}
                  strokeWidth="1"
                  initial={{ scaleY: 0, originY: 1 }}
                  animate={{ scaleY: 1 }}
                  style={{ transformOrigin: 'bottom' }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                />
              ))}
              <line x1="60" y1="300" x2="340" y2="300" stroke="var(--border-strong)" strokeWidth="1" />
            </g>
          )}

          {key === 'contribute' && (
            <g>
              {/* Complete system — all lines connected, center highlighted */}
              <motion.circle cx="200" cy="200" r="100" stroke="var(--accent)" strokeOpacity="0.25" strokeWidth="1" variants={pathIn as never} initial="hidden" animate="visible" />
              <motion.circle cx="200" cy="200" r="50" stroke="var(--accent)" strokeOpacity="0.5" strokeWidth="1.5" variants={pathIn as never} initial="hidden" animate="visible" />
              <motion.circle cx="200" cy="200" r="12" fill="var(--accent)" variants={dotIn} initial="hidden" animate="visible" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
                const rad = (deg * Math.PI) / 180;
                const x = 200 + Math.cos(rad) * 100;
                const y = 200 + Math.sin(rad) * 100;
                return (
                  <React.Fragment key={i}>
                    <motion.line x1="200" y1="200" x2={x} y2={y}
                      stroke="var(--border-strong)" strokeWidth="1"
                      variants={pathIn} initial="hidden" animate="visible"
                      transition={{ duration: 0.6, delay: i * 0.07 }}
                    />
                    <motion.circle cx={x} cy={y} r="4" fill="var(--fg-secondary)"
                      variants={dotIn} initial="hidden" animate="visible"
                      transition={{ delay: 0.5 + i * 0.07 }}
                    />
                  </React.Fragment>
                );
              })}
            </g>
          )}
        </svg>
      </motion.div>
    </AnimatePresence>
  );
};

/* ─── MAIN COMPONENT ──────────────────────────────────────────────────────── */
export const SequentialProcess: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll-driven stage progression (desktop pinned)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    if (shouldReduceMotion) return;

    const unsubscribe = scrollYProgress.on('change', (v) => {
      const idx = Math.min(
        stages.length - 1,
        Math.floor(v * stages.length)
      );
      setActiveIndex(idx);
    });

    return unsubscribe;
  }, [scrollYProgress, shouldReduceMotion]);

  const activeStage = stages[activeIndex];

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="chapter-journey"
      aria-label="Chapter Journey"
      style={{ '--stage-count': stages.length } as React.CSSProperties}
    >
      {/* SECTION LABEL — outside the sticky area */}
      <div className={styles.topLabel}>
        <span className="text-overline">Chapter Journey</span>
      </div>

      {/* STICKY VIEWPORT COMPOSITION */}
      <div className={styles.sticky}>
        <div className={styles.stageLayout}>
          {/* LEFT — large number + title */}
          <div className={styles.stageIdentity}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage.num}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={styles.identityInner}
              >
                <div className={styles.bigNum} aria-label={`Stage ${activeStage.num}`}>
                  {activeStage.num}
                </div>
                <h2 className={styles.stageTitle}>{activeStage.title}</h2>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CENTER — abstract visual */}
          <div className={styles.visualArea}>
            <StageVisual stage={activeStage} />
          </div>

          {/* RIGHT — description + stage nav */}
          <div className={styles.stageDetail}>
            <AnimatePresence mode="wait">
              <motion.p
                key={activeStage.num + '-desc'}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={styles.stageDesc}
              >
                {activeStage.description}
              </motion.p>
            </AnimatePresence>

            {/* STAGE NAV LIST */}
            <nav className={styles.stageNav} aria-label="Select stage">
              {stages.map((s, i) => (
                <button
                  key={s.num}
                  onClick={() => setActiveIndex(i)}
                  className={`${styles.stageNavItem} ${i === activeIndex ? styles.stageNavActive : ''}`}
                  aria-label={`Stage ${s.num}: ${s.title}`}
                  aria-current={i === activeIndex ? 'true' : undefined}
                >
                  <span className={styles.stageNavNum}>{s.num}</span>
                  <span className={styles.stageNavTitle}>{s.title}</span>
                  {i === activeIndex && (
                    <motion.div
                      layoutId="stageNavIndicator"
                      className={styles.stageNavBar}
                      transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* PROGRESS BAR */}
            <div className={styles.progressTrack} aria-hidden="true">
              <motion.div
                className={styles.progressFill}
                animate={{ width: `${((activeIndex + 1) / stages.length) * 100}%` }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
