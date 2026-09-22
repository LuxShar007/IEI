'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { EMBLEM_DATA } from '@/components/intro/emblemData';
import styles from './StartupOverlay.module.css';

const SESSION_KEY = 'ieiStartupShown';
const ANIMATION_DURATION_MS = 2850; // Total duration: 2.3s sequence + 0.5s handoff dissolve

export const StartupOverlay: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if force replay query parameter is present (e.g. for testing)
    const isReplay =
      typeof window !== 'undefined' &&
      window.location.search.includes('replay=1');

    // 1. If previously shown in this browser session and not forcing replay, skip immediately
    try {
      if (!isReplay && sessionStorage.getItem(SESSION_KEY) === 'true') {
        document.documentElement.setAttribute('data-startup', 'done');
        setIsVisible(false);
        return;
      }
    } catch {
      // Storage restricted
    }

    // 2. Mark as shown for the rest of this session
    try {
      sessionStorage.setItem(SESSION_KEY, 'true');
    } catch {
      // Storage restricted
    }

    // 3. Respect accessibility: prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      const reducedTimer = setTimeout(() => {
        document.documentElement.setAttribute('data-startup', 'done');
        setIsVisible(false);
      }, 400);
      return () => clearTimeout(reducedTimer);
    }

    // 4. Standard 2.8s institutional sequence completion
    const completionTimer = setTimeout(() => {
      document.documentElement.setAttribute('data-startup', 'done');
      setIsVisible(false);
    }, ANIMATION_DURATION_MS);

    return () => {
      clearTimeout(completionTimer);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={styles.overlay}
      role="status"
      aria-label="IEI SIES GST Institutional Loading Screen"
      aria-live="polite"
    >
      <div className={styles.content}>
        {/* ====================================================================
            3D EMBLEM SCENE (Extruded Layer Stacking & Micro Camera Tilt)
            ==================================================================== */}
        <div className={styles.scene3D} aria-hidden="true">
          {/* Ambient Contact Depth Shadow */}
          <div className={styles.ambientShadow} />

          {/* Depth Layer 3 (Rear Extrusion: Z = -15px) */}
          <div className={`${styles.emblemLayer} ${styles.depthLayer3}`}>
            <svg viewBox="0 0 316 316" className={styles.emblemSvg} fill="currentColor">
              {Object.entries(EMBLEM_DATA).map(([group, paths]) => (
                <g key={`d3-${group}`}>
                  {paths.map((p, i) => (
                    <path key={`d3-${group}-${i}`} d={p.d} transform={p.transform} />
                  ))}
                </g>
              ))}
            </svg>
          </div>

          {/* Depth Layer 2 (Mid Extrusion: Z = -10px) */}
          <div className={`${styles.emblemLayer} ${styles.depthLayer2}`}>
            <svg viewBox="0 0 316 316" className={styles.emblemSvg} fill="currentColor">
              {Object.entries(EMBLEM_DATA).map(([group, paths]) => (
                <g key={`d2-${group}`}>
                  {paths.map((p, i) => (
                    <path key={`d2-${group}-${i}`} d={p.d} transform={p.transform} />
                  ))}
                </g>
              ))}
            </svg>
          </div>

          {/* Depth Layer 1 (Near Extrusion: Z = -5px) */}
          <div className={`${styles.emblemLayer} ${styles.depthLayer1}`}>
            <svg viewBox="0 0 316 316" className={styles.emblemSvg} fill="currentColor">
              {Object.entries(EMBLEM_DATA).map(([group, paths]) => (
                <g key={`d1-${group}`}>
                  {paths.map((p, i) => (
                    <path key={`d1-${group}-${i}`} d={p.d} transform={p.transform} />
                  ))}
                </g>
              ))}
            </svg>
          </div>

          {/* Front Primary Emblem (Datum Z = 0) */}
          <div className={`${styles.emblemLayer} ${styles.frontLayer}`}>
            <Image
              src="/assets/iei-logo.svg"
              alt="The Institution of Engineers (India) Emblem"
              width={130}
              height={130}
              priority
              className={styles.emblemSvg}
            />
          </div>
        </div>

        {/* ====================================================================
            INSTITUTIONAL TYPOGRAPHY (Locked Helvetica Scale)
            ==================================================================== */}
        <div className={styles.textGroup}>
          <h1 className={styles.title}>IEI SIES GST</h1>
          <p className={styles.subtitle}>STUDENT CHAPTER</p>
        </div>
      </div>
    </div>
  );
};
