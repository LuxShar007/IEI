'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';
import { ArrowRight, Camera } from 'lucide-react';
import styles from './ChapterArchivePreview.module.css';

export const ChapterArchivePreview: React.FC = () => {
  return (
    <section className={styles.section} id="archive-gallery" aria-label="Chapter Photographic Archive">
      <div className={styles.inner}>
        {/* HEADER */}
        <div className={styles.header}>
          <div className={styles.sectionMeta}>
            <span className={styles.sectionIndex}>08</span>
            <span className={styles.sectionLabel}>Visual Documentation</span>
          </div>
          <div className={styles.headerSplit}>
            <h2 className={styles.sectionTitle}>Chapter Archive</h2>
            <Button
              href="/gallery"
              variant="outline"
              size="sm"
              rightIcon={<ArrowRight size={14} />}
            >
              Enter Photographic Archive
            </Button>
          </div>
        </div>

        {/* ASYMMETRICAL EDITORIAL PHOTOGRAPHIC GRID (VARIED RATIOS) */}
        <div className={styles.galleryGrid}>
          {/* FEATURE 01: LARGE HERO COMPOSITION (16:9) */}
          <div className={`${styles.photoFrame} ${styles.frameHero}`}>
            <div className={styles.placeholderVisual}>
              <Camera size={32} className={styles.cameraIcon} />
              <span className={styles.codeText}>IEI·DOC·01 · ANNUAL SYMPOSIUM PLENARY</span>
            </div>
            <div className={styles.captionOverlay}>
              <span className={styles.captionTag}>Symposium & Keynote</span>
              <h3 className={styles.captionTitle}>Annual Technical Conclave · SIES GST Auditorium</h3>
            </div>
          </div>

          {/* PHOTO 02: PORTRAIT ASPECT RATIO (4:5) */}
          <div className={`${styles.photoFrame} ${styles.framePortrait}`}>
            <div className={styles.placeholderVisual}>
              <Camera size={24} className={styles.cameraIcon} />
              <span className={styles.codeText}>IEI·DOC·02 · HARDWARE LAB</span>
            </div>
            <div className={styles.captionOverlay}>
              <span className={styles.captionTag}>Hands-on Lab</span>
              <h3 className={styles.captionTitle}>Microcontroller Firmware Testbench</h3>
            </div>
          </div>

          {/* PHOTO 03: SQUARE RATIO (1:1) */}
          <div className={`${styles.photoFrame} ${styles.frameSquare}`}>
            <div className={styles.placeholderVisual}>
              <Camera size={24} className={styles.cameraIcon} />
              <span className={styles.codeText}>IEI·DOC·03 · HACKATHON JURY</span>
            </div>
            <div className={styles.captionOverlay}>
              <span className={styles.captionTag}>Collegiate Evaluation</span>
              <h3 className={styles.captionTitle}>Technical Project Peer Review</h3>
            </div>
          </div>

          {/* PHOTO 04: WIDE LANDSCAPE (21:9) */}
          <div className={`${styles.photoFrame} ${styles.frameWide}`}>
            <div className={styles.placeholderVisual}>
              <Camera size={24} className={styles.cameraIcon} />
              <span className={styles.codeText}>IEI·DOC·04 · INDUSTRIAL EXCURSION</span>
            </div>
            <div className={styles.captionOverlay}>
              <span className={styles.captionTag}>Industry Outreach</span>
              <h3 className={styles.captionTitle}>Departmental Technical Delegation to Tech Facility</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
