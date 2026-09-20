'use client';

import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import styles from './HeroVisual.module.css';

/* Abstract engineering structural composition — circuit topology / architectural grid */
const pathVariant: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.4, delay: i * 0.12 + 0.4, ease: 'easeOut' as const },
      opacity: { duration: 0.3, delay: i * 0.12 + 0.4 },
    },
  }),
};

const dotVariant: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, delay: i * 0.08 + 0.8, ease: [0.175, 0.885, 0.32, 1.1] },
  }),
};

const rectVariant: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.15 + 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
};

export const HeroVisual: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={styles.visual} aria-hidden="true">
      <motion.svg
        className={styles.svg}
        viewBox="0 0 520 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={shouldReduceMotion ? 'visible' : 'hidden'}
        animate="visible"
      >
        {/* ─── STRUCTURAL GRID LINES ─────────────────────────────────── */}
        {/* Horizontal structural lines */}
        {[100, 200, 320, 420].map((y, i) => (
          <motion.line
            key={`h-${y}`}
            custom={i}
            variants={pathVariant}
            x1="60" y1={y} x2="460" y2={y}
            stroke="rgba(240,237,232,0.06)"
            strokeWidth="1"
          />
        ))}
        {/* Vertical structural lines */}
        {[100, 200, 320, 420].map((x, i) => (
          <motion.line
            key={`v-${x}`}
            custom={i + 4}
            variants={pathVariant}
            x1={x} y1="60" x2={x} y2="460"
            stroke="rgba(240,237,232,0.06)"
            strokeWidth="1"
          />
        ))}

        {/* ─── MAIN STRUCTURAL FRAME ──────────────────────────────────── */}
        <motion.rect
          custom={0}
          variants={rectVariant}
          x="100" y="100" width="320" height="320"
          stroke="rgba(240,237,232,0.09)"
          strokeWidth="1"
        />

        {/* ─── INNER PRECISION FRAME ──────────────────────────────────── */}
        <motion.rect
          custom={1}
          variants={rectVariant}
          x="160" y="160" width="200" height="200"
          stroke="rgba(200,169,110,0.18)"
          strokeWidth="1"
          strokeDasharray="4 8"
        />

        {/* ─── CIRCUIT TOPOLOGY PATHS ─────────────────────────────────── */}
        {/* Main horizontal trace */}
        <motion.path
          custom={1}
          variants={pathVariant}
          d="M 60 260 L 160 260 L 160 200 L 260 200"
          stroke="rgba(240,237,232,0.18)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Branch trace up */}
        <motion.path
          custom={2}
          variants={pathVariant}
          d="M 260 200 L 260 140 L 360 140 L 420 140"
          stroke="rgba(240,237,232,0.12)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Branch trace down */}
        <motion.path
          custom={3}
          variants={pathVariant}
          d="M 260 200 L 320 200 L 320 260 L 460 260"
          stroke="rgba(240,237,232,0.12)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Vertical main trace */}
        <motion.path
          custom={4}
          variants={pathVariant}
          d="M 260 260 L 260 380 L 200 380 L 200 460"
          stroke="rgba(240,237,232,0.10)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Diagonal crosslink */}
        <motion.path
          custom={5}
          variants={pathVariant}
          d="M 200 200 L 180 200 L 180 140 L 100 140"
          stroke="rgba(200,169,110,0.25)"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* ─── AMBER ACCENT PATHS ─────────────────────────────────────── */}
        <motion.path
          custom={6}
          variants={pathVariant}
          d="M 260 260 L 320 260 L 320 320 L 260 320 L 260 260"
          stroke="rgba(200,169,110,0.35)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Accent extension */}
        <motion.path
          custom={7}
          variants={pathVariant}
          d="M 320 320 L 380 320 L 380 380"
          stroke="rgba(200,169,110,0.20)"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* ─── JUNCTION NODES ─────────────────────────────────────────── */}
        {/* Main nodes — white */}
        {[
          { cx: 260, cy: 200, r: 3.5, fill: 'rgba(240,237,232,0.9)' },
          { cx: 260, cy: 260, r: 4.5, fill: 'rgba(240,237,232,0.95)' },
          { cx: 320, cy: 260, r: 2.5, fill: 'rgba(240,237,232,0.7)' },
          { cx: 200, cy: 200, r: 2.5, fill: 'rgba(240,237,232,0.6)' },
          { cx: 160, cy: 260, r: 2,   fill: 'rgba(240,237,232,0.5)' },
          { cx: 260, cy: 380, r: 2,   fill: 'rgba(240,237,232,0.4)' },
          { cx: 320, cy: 200, r: 2,   fill: 'rgba(240,237,232,0.4)' },
          { cx: 360, cy: 140, r: 2,   fill: 'rgba(240,237,232,0.35)' },
          { cx: 180, cy: 140, r: 2,   fill: 'rgba(240,237,232,0.3)' },
        ].map((node, i) => (
          <motion.circle
            key={`node-w-${i}`}
            custom={i}
            variants={dotVariant}
            cx={node.cx} cy={node.cy} r={node.r}
            fill={node.fill}
          />
        ))}

        {/* Amber accent nodes */}
        {[
          { cx: 320, cy: 320, r: 4,   fill: 'rgba(200,169,110,0.95)' },
          { cx: 260, cy: 320, r: 3,   fill: 'rgba(200,169,110,0.7)' },
          { cx: 380, cy: 380, r: 3,   fill: 'rgba(200,169,110,0.5)' },
        ].map((node, i) => (
          <motion.circle
            key={`node-a-${i}`}
            custom={i + 9}
            variants={dotVariant}
            cx={node.cx} cy={node.cy} r={node.r}
            fill={node.fill}
          />
        ))}

        {/* ─── CORNER BRACKET ACCENTS ─────────────────────────────────── */}
        {/* Top-left bracket */}
        <motion.path
          custom={8}
          variants={pathVariant}
          d="M 100 120 L 100 100 L 120 100"
          stroke="rgba(200,169,110,0.4)"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
        {/* Bottom-right bracket */}
        <motion.path
          custom={9}
          variants={pathVariant}
          d="M 400 420 L 420 420 L 420 400"
          stroke="rgba(200,169,110,0.4)"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
        {/* Top-right bracket */}
        <motion.path
          custom={10}
          variants={pathVariant}
          d="M 400 100 L 420 100 L 420 120"
          stroke="rgba(240,237,232,0.15)"
          strokeWidth="1"
          strokeLinecap="square"
        />
        {/* Bottom-left bracket */}
        <motion.path
          custom={11}
          variants={pathVariant}
          d="M 120 420 L 100 420 L 100 400"
          stroke="rgba(240,237,232,0.15)"
          strokeWidth="1"
          strokeLinecap="square"
        />

        {/* ─── CENTER CROSSHAIR ───────────────────────────────────────── */}
        <motion.path
          custom={12}
          variants={pathVariant}
          d="M 250 260 L 270 260"
          stroke="rgba(200,169,110,0.6)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <motion.path
          custom={13}
          variants={pathVariant}
          d="M 260 250 L 260 270"
          stroke="rgba(200,169,110,0.6)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* ─── OUTER RANGE CIRCLE ─────────────────────────────────────── */}
        <motion.circle
          custom={14}
          variants={pathVariant as never}
          cx="260" cy="260" r="180"
          stroke="rgba(240,237,232,0.03)"
          strokeWidth="1"
        />
      </motion.svg>

      {/* SUBTLE AMBIENT GLOW — amber, barely visible */}
      <div className={styles.ambientGlow} aria-hidden="true" />
    </div>
  );
};
