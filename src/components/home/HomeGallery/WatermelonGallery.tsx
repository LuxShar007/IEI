'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreHorizontal, Copy, Check, ArrowRight, X } from 'lucide-react';
import styles from './WatermelonGallery.module.css';

export interface GalleryCarouselCard {
  id: string;
  category: string;
  title: string;
  value: string;
  colorClass: string;
  icon: React.ElementType;
  galleryUrl?: string;
}

interface WatermelonGalleryProps {
  cards: GalleryCarouselCard[];
}

export const WatermelonGallery: React.FC<WatermelonGalleryProps> = ({ cards }) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeCard = cards.find((c) => c.id === activeId);
  const secondaryCards = cards.filter((c) => c.id !== activeId);

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setActiveId(null);
    }
  };

  const handleCopy = (e: React.MouseEvent, card: GalleryCarouselCard) => {
    e.stopPropagation();
    const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/gallery#${card.id}` : '';
    if (navigator.clipboard && shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      setCopiedId(card.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className={styles.wrapper} onClick={handleBackgroundClick}>
      <div className={styles.carouselContainer}>
        <motion.div layout className={styles.cardsStack}>
          {/* ====================================================================
              EXPANDED ACTIVE CARD (WATERMELON UI/UX SIGNATURE EXPANSION)
              ==================================================================== */}
          <AnimatePresence mode="popLayout">
            {activeCard && (
              <motion.div
                key={activeCard.id}
                layoutId={activeCard.id}
                className={`${styles.expandedCard} ${activeCard.colorClass}`}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                role="region"
                aria-label={`Expanded view: ${activeCard.title}`}
              >
                {/* TOP HEADER */}
                <div className={styles.cardTopRow}>
                  <div className={styles.iconCircleExpanded}>
                    <activeCard.icon size={26} />
                  </div>

                  <div className={styles.actionBtnGroup}>
                    <button
                      type="button"
                      onClick={(e) => handleCopy(e, activeCard)}
                      className={styles.glassPillBtn}
                      aria-label="Copy direct archive link"
                    >
                      {copiedId === activeCard.id ? (
                        <>
                          <Check size={14} />
                          <span>Copied Link</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span>Share Record</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveId(null);
                      }}
                      className={styles.closeBtn}
                      aria-label="Collapse expanded card"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>

                {/* BOTTOM METADATA & EXPLORE ACTION */}
                <div className={styles.cardBottomRow}>
                  <div className={styles.expandedTextGroup}>
                    <div className={styles.expandedCategory}>{activeCard.category}</div>
                    <h3 className={styles.expandedTitle}>{activeCard.title}</h3>
                    <p className={styles.expandedValue}>{activeCard.value}</p>
                  </div>

                  <Link
                    href={activeCard.galleryUrl || '/gallery'}
                    className={styles.viewActionBtn}
                  >
                    <span>View Record</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ====================================================================
              GRID LAYOUT (2-COL DEFAULT -> 3-COL COMPACT WHEN ONE IS EXPANDED)
              ==================================================================== */}
          <motion.div
            layout
            className={`${styles.cardGrid} ${activeId ? styles.gridCompact : styles.gridInitial}`}
          >
            {(activeId ? secondaryCards : cards).map((card) => {
              const Icon = card.icon;

              return (
                <motion.div
                  key={card.id}
                  layoutId={card.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveId(card.id);
                  }}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  className={`${styles.compactCard} ${card.colorClass} ${
                    activeId ? styles.compactHeightActive : styles.compactHeightInitial
                  }`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveId(card.id);
                    }
                  }}
                  aria-label={`Expand ${card.title} archive card`}
                >
                  <div className={styles.compactTopRow}>
                    <Icon size={activeId ? 18 : 24} />
                    <div className={styles.compactMenuDot}>
                      <MoreHorizontal size={14} />
                    </div>
                  </div>

                  <div className={styles.compactTextGroup}>
                    <div className={styles.compactCategory}>{card.category}</div>
                    <h4 className={styles.compactTitle}>{card.title}</h4>
                    <p className={styles.compactValue}>{card.value}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
