'use client';

import React from 'react';
import { motion, type MotionValue, useTransform } from 'framer-motion';
import { JourneyStage } from '@/data/chapterJourney';
import styles from './ChapterJourney.module.css';

interface StageVisualProps {
  stages: JourneyStage[];
  progress: MotionValue<number>;
  reducedMotion?: boolean;
}

export const StageVisual: React.FC<StageVisualProps> = ({ stages, progress, reducedMotion = false }) => {
  const stageCount = stages.length;

  return (
    <div className={styles.visualViewport} aria-hidden="true">
      {/* Background Engineering Coordinate Canvas */}
      <div className={styles.coordinateGrid}>
        <div className={styles.gridCrosshairs} />
        <div className={styles.gridTelemetry}>
          <span>REF: IEI-ECS-STG</span>
          <span>SCALE: 1:1.0</span>
          <span>STATUS: REALTIME</span>
        </div>
      </div>

      {/* Render each stage's visual layer with smooth opacity and scale transform */}
      {stages.map((stage, index) => {
        // Compute window of activity for stage [index]
        // 6 stages:
        // Stage 0: 0.00 to 0.166
        // Stage 1: 0.166 to 0.333
        // Stage 2: 0.333 to 0.500
        // Stage 3: 0.500 to 0.666
        // Stage 4: 0.666 to 0.833
        // Stage 5: 0.833 to 1.000
        const segment = 1 / stageCount;
        const start = index * segment;
        const end = (index + 1) * segment;
        const halfTrans = 0.018;

        let opacityInput: number[];
        let opacityOutput: number[];
        let scaleInput: number[];
        let scaleOutput: number[];

        if (index === 0) {
          opacityInput = [0, end - halfTrans, end + halfTrans, 1];
          opacityOutput = [1, 1, 0, 0];
          scaleInput = [0, end - halfTrans, end + halfTrans, 1];
          scaleOutput = reducedMotion ? [1, 1, 1, 1] : [1.0, 1.015, 1.02, 1.02];
        } else if (index === stageCount - 1) {
          opacityInput = [0, start - halfTrans, start + halfTrans, 1];
          opacityOutput = [0, 0, 1, 1];
          scaleInput = [0, start - halfTrans, start + halfTrans, 1];
          scaleOutput = reducedMotion ? [1, 1, 1, 1] : [0.98, 0.98, 1.0, 1.0];
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
          scaleInput = [
            0,
            start - halfTrans,
            start + halfTrans,
            end - halfTrans,
            end + halfTrans,
            1,
          ];
          scaleOutput = reducedMotion
            ? [1, 1, 1, 1, 1, 1]
            : [0.98, 0.98, 1.0, 1.0, 1.02, 1.02];
        }

        // Opacity MotionValue
        const opacity = useTransform(progress, opacityInput, opacityOutput, { clamp: true });

        // Subtle editorial zoom without aggressive scaling
        const scale = useTransform(progress, scaleInput, scaleOutput, { clamp: true });

        return (
          <motion.div
            key={stage.id}
            className={styles.stageLayer}
            style={{
              opacity,
              scale,
              pointerEvents: 'none',
            }}
          >
            {renderVisualGraphic(stage.visualTheme)}
          </motion.div>
        );
      })}
    </div>
  );
};

/* ─── GRAPHIC COMPOSITIONS FOR EACH STAGE ────────────────────────────────── */
function renderVisualGraphic(theme: JourneyStage['visualTheme']) {
  switch (theme) {
    case 'blueprint':
      return (
        <svg viewBox="0 0 600 450" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" className={styles.stageSvg} fill="none">
          {/* Outer Technical Frame */}
          <rect x="20" y="20" width="560" height="410" rx="8" stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="20" y1="60" x2="580" y2="60" stroke="var(--border-subtle)" strokeWidth="1" />
          <line x1="20" y1="390" x2="580" y2="390" stroke="var(--border-subtle)" strokeWidth="1" />

          {/* Technical Header Labels */}
          <text x="35" y="46" fill="var(--fg-muted)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="1">
            CIRCUIT ANALYSIS & FOUNDATION THEOREM // MODULE 01-A
          </text>
          <text x="450" y="46" fill="var(--accent-primary)" fontSize="10" fontFamily="var(--font-mono)" fontWeight="600">
            FREQ: 1.000 kHz
          </text>

          {/* Grid Intersections */}
          {[120, 220, 320, 420, 520].map((x) => (
            <line key={`x-${x}`} x1={x} y1="70" x2={x} y2="380" stroke="var(--border-subtle)" strokeWidth="0.75" strokeOpacity="0.6" />
          ))}
          {[120, 180, 240, 300, 360].map((y) => (
            <line key={`y-${y}`} x1="30" y1={y} x2="570" y2={y} stroke="var(--border-subtle)" strokeWidth="0.75" strokeOpacity="0.6" />
          ))}

          {/* Precision Sine Wave Vector */}
          <path
            d="M 50,240 C 90,130 130,130 170,240 C 210,350 250,350 290,240 C 330,130 370,130 410,240 C 450,350 490,350 530,240"
            stroke="var(--accent-primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Harmonic Wave Vector (Secondary Signal) */}
          <path
            d="M 50,240 C 75,180 100,180 125,240 C 150,300 175,300 200,240 C 225,180 250,180 275,240 C 300,300 325,300 350,240 C 375,180 400,180 425,240 C 450,300 475,300 500,240 C 525,180 540,180 550,240"
            stroke="var(--fg-secondary)"
            strokeWidth="1"
            strokeDasharray="2 2"
            opacity="0.6"
          />

          {/* Schematic Component Nodes */}
          <g transform="translate(170, 180)">
            <circle cx="0" cy="0" r="14" fill="var(--bg-primary)" stroke="var(--fg-primary)" strokeWidth="1.5" />
            <text x="0" y="4" textAnchor="middle" fill="var(--fg-primary)" fontSize="10" fontFamily="var(--font-mono)" fontWeight="bold">R1</text>
            <circle cx="0" cy="0" r="3" fill="var(--accent-primary)" />
          </g>

          <g transform="translate(410, 180)">
            <circle cx="0" cy="0" r="14" fill="var(--bg-primary)" stroke="var(--fg-primary)" strokeWidth="1.5" />
            <text x="0" y="4" textAnchor="middle" fill="var(--fg-primary)" fontSize="10" fontFamily="var(--font-mono)" fontWeight="bold">C1</text>
            <circle cx="0" cy="0" r="3" fill="var(--accent-primary)" />
          </g>

          {/* Ground & Calibration Marks */}
          <line x1="290" y1="240" x2="290" y2="340" stroke="var(--fg-secondary)" strokeWidth="1.5" />
          <line x1="275" y1="340" x2="305" y2="340" stroke="var(--fg-primary)" strokeWidth="2" />
          <line x1="280" y1="345" x2="300" y2="345" stroke="var(--fg-primary)" strokeWidth="1.5" />
          <line x1="285" y1="350" x2="295" y2="350" stroke="var(--fg-primary)" strokeWidth="1" />

          {/* Millimeter Dimensional Callouts */}
          <path d="M 40,360 L 540,360" stroke="var(--fg-muted)" strokeWidth="0.75" markerEnd="url(#arrow)" />
          <text x="290" y="375" textAnchor="middle" fill="var(--fg-muted)" fontSize="9" fontFamily="var(--font-mono)">
            λ = 240.0 mm // PHASE ANGLE Δθ = 0.00°
          </text>
        </svg>
      );

    case 'embedded':
      return (
        <svg viewBox="0 0 600 450" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" className={styles.stageSvg} fill="none">
          {/* Silicon Die Outline */}
          <rect x="40" y="30" width="520" height="390" rx="12" fill="var(--surface-base)" stroke="var(--border-strong)" strokeWidth="1.5" />

          {/* Header */}
          <text x="65" y="65" fill="var(--fg-muted)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="1">
            SILICON BUS ARCHITECTURE // RISC-V HARVARD TOPOLOGY
          </text>

          {/* Central CPU Core Block */}
          <rect x="220" y="140" width="160" height="150" rx="6" fill="var(--surface-elevated)" stroke="var(--accent-primary)" strokeWidth="2" />
          <text x="300" y="210" textAnchor="middle" fill="var(--fg-primary)" fontSize="14" fontFamily="var(--font-sans)" fontWeight="bold">
            CORE: RV32I
          </text>
          <text x="300" y="230" textAnchor="middle" fill="var(--accent-primary)" fontSize="10" fontFamily="var(--font-mono)">
            32-BIT PIPELINE
          </text>

          {/* Memory Controller Block */}
          <rect x="70" y="150" width="110" height="130" rx="4" fill="var(--surface-card)" stroke="var(--border-default)" strokeWidth="1" />
          <text x="125" y="210" textAnchor="middle" fill="var(--fg-primary)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="600">SRAM CACHE</text>
          <text x="125" y="228" textAnchor="middle" fill="var(--fg-muted)" fontSize="9" fontFamily="var(--font-mono)">512 KB DUAL-PORT</text>

          {/* Telemetry Peripheral Block */}
          <rect x="420" y="150" width="110" height="130" rx="4" fill="var(--surface-card)" stroke="var(--border-default)" strokeWidth="1" />
          <text x="475" y="210" textAnchor="middle" fill="var(--fg-primary)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="600">AIoT PHY</text>
          <text x="475" y="228" textAnchor="middle" fill="var(--fg-muted)" fontSize="9" fontFamily="var(--font-mono)">SPI / I2C / UART</text>

          {/* High-speed Bus Lines */}
          {[170, 185, 200, 215, 230, 245].map((y, i) => (
            <React.Fragment key={`bus-l-${i}`}>
              <line x1="180" y1={y} x2="220" y2={y} stroke={i % 2 === 0 ? 'var(--accent-primary)' : 'var(--fg-secondary)'} strokeWidth="1.5" />
              <circle cx="180" cy={y} r="2" fill="var(--accent-primary)" />
              <circle cx="220" cy={y} r="2" fill="var(--accent-primary)" />
            </React.Fragment>
          ))}

          {[170, 185, 200, 215, 230, 245].map((y, i) => (
            <React.Fragment key={`bus-r-${i}`}>
              <line x1="380" y1={y} x2="420" y2={y} stroke={i % 2 === 0 ? 'var(--accent-primary)' : 'var(--fg-secondary)'} strokeWidth="1.5" />
              <circle cx="380" cy={y} r="2" fill="var(--accent-primary)" />
              <circle cx="420" cy={y} r="2" fill="var(--accent-primary)" />
            </React.Fragment>
          ))}

          {/* Real-time Clock Pulse Waveform below */}
          <g transform="translate(70, 330)">
            <text x="0" y="15" fill="var(--fg-muted)" fontSize="9" fontFamily="var(--font-mono)">CLK_SYS:</text>
            <path
              d="M 60,10 L 80,10 L 80,-10 L 100,-10 L 100,10 L 120,10 L 120,-10 L 140,-10 L 140,10 L 160,10 L 160,-10 L 180,-10 L 180,10 L 200,10 L 200,-10 L 220,-10 L 220,10 L 240,10 L 240,-10 L 260,-10 L 260,10 L 280,10 L 280,-10 L 300,-10 L 300,10 L 320,10 L 320,-10 L 340,-10 L 340,10 L 360,10 L 360,-10 L 380,-10 L 380,10 L 400,10 L 400,-10 L 420,-10 L 420,10 L 440,10 L 440,-10 L 460,-10 L 460,10"
              stroke="var(--accent-primary)"
              strokeWidth="1.5"
              fill="none"
            />
          </g>
        </svg>
      );

    case 'prototyping':
      return (
        <svg viewBox="0 0 600 450" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" className={styles.stageSvg} fill="none">
          {/* PCB Surface Board */}
          <rect x="30" y="25" width="540" height="400" rx="10" fill="var(--surface-base)" stroke="var(--border-strong)" strokeWidth="1.5" />

          {/* Silkscreen Grid & Branding */}
          <text x="55" y="60" fill="var(--fg-muted)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="1">
            HARDWARE FABRICATION // MULTI-LAYER STACKUP L1-L4
          </text>
          <text x="440" y="60" fill="var(--fg-secondary)" fontSize="9" fontFamily="var(--font-mono)">
            IEI-GST REV 2.4
          </text>

          {/* Copper Polygon Routing Traces (Diagonal 45-degree angle paths) */}
          <path d="M 60,180 L 140,180 L 190,130 L 280,130 L 320,170 L 460,170 L 520,230" stroke="var(--accent-primary)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 60,210 L 150,210 L 200,160 L 270,160 L 310,200 L 440,200 L 490,250 L 530,250" stroke="var(--fg-primary)" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
          <path d="M 80,320 L 160,320 L 210,270 L 330,270 L 360,300 L 500,300" stroke="var(--signal-accent, #ff6b00)" strokeWidth="1.5" strokeLinecap="round" />

          {/* SMT Microcontroller Footprint (QFP-32 package) */}
          <g transform="translate(230, 160)">
            <rect x="0" y="0" width="100" height="100" rx="4" fill="var(--surface-elevated)" stroke="var(--fg-primary)" strokeWidth="2" />
            <circle cx="15" cy="15" r="4" fill="var(--accent-primary)" />
            <text x="50" y="55" textAnchor="middle" fill="var(--fg-primary)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="bold">STM32G4</text>
            <text x="50" y="70" textAnchor="middle" fill="var(--fg-muted)" fontSize="8" fontFamily="var(--font-mono)">170 MHz MCU</text>

            {/* Top/Bottom Pins */}
            {[15, 30, 45, 60, 75, 90].map((x) => (
              <React.Fragment key={`pin-t-${x}`}>
                <line x1={x} y1="0" x2={x} y2="-12" stroke="var(--border-strong)" strokeWidth="2" />
                <circle cx={x} cy="-14" r="2" fill="var(--accent-primary)" />
                <line x1={x} y1="100" x2={x} y2="112" stroke="var(--border-strong)" strokeWidth="2" />
                <circle cx={x} cy="114" r="2" fill="var(--accent-primary)" />
              </React.Fragment>
            ))}

            {/* Left/Right Pins */}
            {[15, 30, 45, 60, 75, 90].map((y) => (
              <React.Fragment key={`pin-l-${y}`}>
                <line x1="0" y1={y} x2="-12" y2={y} stroke="var(--border-strong)" strokeWidth="2" />
                <circle cx="-14" cy={y} r="2" fill="var(--accent-primary)" />
                <line x1="100" y1={y} x2="112" y2={y} stroke="var(--border-strong)" strokeWidth="2" />
                <circle cx="114" cy={y} r="2" fill="var(--accent-primary)" />
              </React.Fragment>
            ))}
          </g>

          {/* Gold plated test vias */}
          {[[120, 140], [180, 240], [420, 120], [480, 280], [380, 360], [140, 360]].map(([vx, vy], i) => (
            <g key={`via-${i}`} transform={`translate(${vx}, ${vy})`}>
              <circle cx="0" cy="0" r="7" fill="none" stroke="var(--border-strong)" strokeWidth="1" />
              <circle cx="0" cy="0" r="3" fill="var(--accent-primary)" />
              <text x="12" y="3" fill="var(--fg-muted)" fontSize="7" fontFamily="var(--font-mono)">TP{i + 1}</text>
            </g>
          ))}
        </svg>
      );

    case 'network':
      return (
        <svg viewBox="0 0 600 450" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" className={styles.stageSvg} fill="none">
          {/* Collaborative Network Canvas */}
          <rect x="30" y="25" width="540" height="400" rx="10" fill="var(--surface-base)" stroke="var(--border-strong)" strokeWidth="1.5" />

          {/* Header */}
          <text x="55" y="60" fill="var(--fg-muted)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="1">
            INTERDISCIPLINARY COLLABORATIVE TOPOLOGY // ECOSYSTEM MESH
          </text>

          {/* Central Chapter Core Hub */}
          <circle cx="300" cy="225" r="48" fill="var(--surface-elevated)" stroke="var(--accent-primary)" strokeWidth="2" />
          <circle cx="300" cy="225" r="62" fill="none" stroke="var(--accent-primary)" strokeWidth="1" strokeDasharray="3 4" opacity="0.6" />
          <text x="300" y="220" textAnchor="middle" fill="var(--fg-primary)" fontSize="12" fontFamily="var(--font-sans)" fontWeight="bold">IEI CHAPTER</text>
          <text x="300" y="236" textAnchor="middle" fill="var(--accent-primary)" fontSize="9" fontFamily="var(--font-mono)">COUNCIL CORE</text>

          {/* Outer Satellite Hubs */}
          {[
            { label: 'FACULTY', angle: -150, dist: 170, color: 'var(--fg-primary)' },
            { label: 'INDUSTRY', angle: -90, dist: 140, color: 'var(--accent-primary)' },
            { label: 'ALUMNI', angle: -30, dist: 170, color: 'var(--fg-primary)' },
            { label: 'RESEARCH', angle: 30, dist: 165, color: 'var(--accent-primary)' },
            { label: 'HACKATHONS', angle: 90, dist: 140, color: 'var(--signal-accent, #ff6b00)' },
            { label: 'MEMBERS', angle: 150, dist: 165, color: 'var(--fg-primary)' },
          ].map((node, i) => {
            const rad = (node.angle * Math.PI) / 180;
            const nx = 300 + Math.cos(rad) * node.dist;
            const ny = 225 + Math.sin(rad) * node.dist;

            return (
              <React.Fragment key={`net-${i}`}>
                {/* Connecting Bus Lines */}
                <line x1="300" y1="225" x2={nx} y2={ny} stroke="var(--border-strong)" strokeWidth="1.25" strokeDasharray="4 3" />

                {/* Satellite Node */}
                <circle cx={nx} cy={ny} r="26" fill="var(--surface-card)" stroke={node.color} strokeWidth="1.5" />
                <circle cx={nx} cy={ny} r="4" fill={node.color} />
                <text x={nx} y={ny + 38} textAnchor="middle" fill="var(--fg-primary)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="600">
                  {node.label}
                </text>
              </React.Fragment>
            );
          })}

          {/* Inter-satellite mesh cross-connections */}
          <path
            d="M 152,140 L 300,85 L 448,140 L 443,307 L 300,365 L 157,307 Z"
            fill="none"
            stroke="var(--border-subtle)"
            strokeWidth="0.75"
            strokeDasharray="2 3"
          />
        </svg>
      );

    case 'arena':
      return (
        <svg viewBox="0 0 600 450" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" className={styles.stageSvg} fill="none">
          {/* Competitive Radar Display */}
          <rect x="30" y="25" width="540" height="400" rx="10" fill="var(--surface-base)" stroke="var(--border-strong)" strokeWidth="1.5" />

          {/* Header */}
          <text x="55" y="60" fill="var(--fg-muted)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="1">
            COMPETITIVE BENCHMARKING // HIGH-STAKES NATIONAL ARENAS
          </text>
          <text x="440" y="60" fill="var(--signal-accent, #ff6b00)" fontSize="10" fontFamily="var(--font-mono)" fontWeight="bold">
            STATUS: ACTIVE ROUND
          </text>

          {/* Concentric Telemetry Radar Rings */}
          <circle cx="300" cy="235" r="140" stroke="var(--border-subtle)" strokeWidth="1" />
          <circle cx="300" cy="235" r="105" stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="2 3" />
          <circle cx="300" cy="235" r="70" stroke="var(--border-strong)" strokeWidth="1" />
          <circle cx="300" cy="235" r="35" stroke="var(--accent-primary)" strokeWidth="1.5" />
          <circle cx="300" cy="235" r="4" fill="var(--accent-primary)" />

          {/* Crosshairs */}
          <line x1="140" y1="235" x2="460" y2="235" stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="300" y1="75" x2="300" y2="395" stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="4 4" />

          {/* Radar Sweep Arc Vector */}
          <path
            d="M 300,235 L 420,130 A 140 140 0 0 0 300,95 Z"
            fill="var(--accent-primary)"
            fillOpacity="0.08"
          />
          <line x1="300" y1="235" x2="420" y2="130" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" />

          {/* Target Milestone Vectors */}
          {[
            { x: 345, y: 150, tag: 'SMART INDIA' },
            { x: 230, y: 180, tag: 'ROBOCON' },
            { x: 380, y: 280, tag: 'IEEE CTF' },
            { x: 220, y: 310, tag: 'HACK-AI' },
          ].map((target, i) => (
            <g key={`target-${i}`} transform={`translate(${target.x}, ${target.y})`}>
              <circle cx="0" cy="0" r="6" fill="none" stroke="var(--signal-accent, #ff6b00)" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="2" fill="var(--signal-accent, #ff6b00)" />
              <text x="10" y="3" fill="var(--fg-primary)" fontSize="8" fontFamily="var(--font-mono)" fontWeight="bold">
                {target.tag}
              </text>
            </g>
          ))}

          {/* Telemetry Spectrum Bars on Bottom */}
          <g transform="translate(60, 380)">
            <text x="0" y="-8" fill="var(--fg-muted)" fontSize="8" fontFamily="var(--font-mono)">SPECTRAL PERFORMANCE:</text>
            {[24, 45, 68, 52, 85, 96, 74, 62, 88, 55, 34, 78, 92, 60, 48].map((h, i) => (
              <rect
                key={`bar-${i}`}
                x={i * 32}
                y={-h * 0.3}
                width="16"
                height={h * 0.3}
                rx="2"
                fill={i === 5 ? 'var(--signal-accent, #ff6b00)' : 'var(--accent-primary)'}
                opacity="0.85"
              />
            ))}
          </g>
        </svg>
      );

    case 'contribution':
      return (
        <svg viewBox="0 0 600 450" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" className={styles.stageSvg} fill="none">
          {/* Institutional Archival Frame */}
          <rect x="30" y="25" width="540" height="400" rx="10" fill="var(--surface-base)" stroke="var(--border-strong)" strokeWidth="1.5" />

          {/* Header */}
          <text x="55" y="60" fill="var(--fg-muted)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="1">
            OPEN ECOSYSTEM DISSEMINATION // INSTITUTIONAL LEGACY
          </text>

          {/* Central Knowledge Core & Radiant Concentric Ripples */}
          <circle cx="300" cy="220" r="130" stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="300" cy="220" r="90" stroke="var(--accent-primary)" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
          <circle cx="300" cy="220" r="50" fill="var(--surface-elevated)" stroke="var(--fg-primary)" strokeWidth="2" />
          <text x="300" y="215" textAnchor="middle" fill="var(--fg-primary)" fontSize="13" fontFamily="var(--font-sans)" fontWeight="bold">
            KNOWLEDGE
          </text>
          <text x="300" y="232" textAnchor="middle" fill="var(--accent-primary)" fontSize="9" fontFamily="var(--font-mono)">
            OPEN ARCHIVE
          </text>

          {/* Published Repositories & Paper Nodes */}
          {[
            { x: 170, y: 130, title: 'ANNUAL JOURNAL', code: 'DOC-2025' },
            { x: 430, y: 130, title: 'OPEN HARDWARE', code: 'SCH-GIT' },
            { x: 150, y: 310, title: 'MENTOR GUIDES', code: 'PEDAGOGY' },
            { x: 450, y: 310, title: 'ALUMNI ARCHIVE', code: 'CHRONICLE' },
          ].map((item, i) => (
            <g key={`pub-${i}`} transform={`translate(${item.x}, ${item.y})`}>
              <line x1={300 - item.x} y1={220 - item.y} x2="0" y2="0" stroke="var(--accent-primary)" strokeWidth="1.25" />
              <rect x="-65" y="-22" width="130" height="44" rx="6" fill="var(--surface-card)" stroke="var(--border-strong)" strokeWidth="1.5" />
              <text x="0" y="-3" textAnchor="middle" fill="var(--fg-primary)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="bold">
                {item.title}
              </text>
              <text x="0" y="11" textAnchor="middle" fill="var(--accent-primary)" fontSize="8" fontFamily="var(--font-mono)">
                {item.code}
              </text>
            </g>
          ))}

          {/* Generational Stewardship Bottom Line */}
          <g transform="translate(60, 395)">
            <text x="0" y="0" fill="var(--fg-muted)" fontSize="9" fontFamily="var(--font-mono)">
              STEWARDSHIP CYCLE // TRANSMITTING EXPERTISE TO FIRST-YEAR COHORT
            </text>
          </g>
        </svg>
      );
  }
}
