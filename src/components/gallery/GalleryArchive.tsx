'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  placeholderMedia,
  galleryCategories,
  type GalleryItem,
  type GalleryCategory,
} from '@/data/gallery';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/Button/Button';
import styles from './GalleryArchive.module.css';

export const GalleryArchive: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('ALL');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filteredItems = placeholderMedia.filter((item) => {
    if (activeCategory === 'ALL') return true;
    return item.category.toUpperCase() === activeCategory;
  });

  const openLightbox = (item: GalleryItem) => {
    setActiveItem(item);
  };

  const closeLightbox = useCallback(() => {
    setActiveItem(null);
  }, []);

  const navigateLightbox = useCallback(
    (direction: 'next' | 'prev') => {
      if (!activeItem) return;
      const currentIndex = filteredItems.findIndex((it) => it.id === activeItem.id);
      if (currentIndex === -1) return;

      if (direction === 'next') {
        const nextIndex = (currentIndex + 1) % filteredItems.length;
        setActiveItem(filteredItems[nextIndex]);
      } else {
        const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
        setActiveItem(filteredItems[prevIndex]);
      }
    },
    [activeItem, filteredItems]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeItem) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigateLightbox('next');
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItem, closeLightbox, navigateLightbox]);

  const touchStartXRef = React.useRef<number | null>(null);
  const touchStartYRef = React.useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;

    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        navigateLightbox('next');
      } else {
        navigateLightbox('prev');
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  return (
    <div className={styles.archiveContainer}>
      {/* FILTER CONTROLS */}
      <div className={styles.filterStrip}>
        <span className={styles.filterLabel}>ARCHIVE TAXONOMY:</span>
        <div className={styles.filterButtons} role="tablist">
          {galleryCategories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <Button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat)}
                variant={isActive ? 'primary' : 'outline'}
                size="sm"
              >
                {cat}
              </Button>
            );
          })}
        </div>
      </div>

      {/* EDITORIAL GALLERY LAYOUT */}
      <div className={styles.galleryLayout}>
        {filteredItems.map((item, index) => {
          const isFeatured = index === 0;
          return (
            <article
              key={item.id}
              className={`${styles.galleryItem} ${isFeatured ? styles.featuredItem : ''} ${
                item.aspect === 'portrait' ? styles.portraitItem : ''
              }`}
              onClick={() => openLightbox(item)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openLightbox(item);
                }
              }}
            >
              {/* IMAGE FRAME / PLACEHOLDER */}
              <div className={styles.mediaFrame}>
                <div className={styles.placeholderBackdrop}>
                  <Camera size={32} className={styles.cameraIcon} />
                  <span className={styles.archivalWatermark}>
                    ARCHIVE RECORD • {item.id.toUpperCase()}
                  </span>
                </div>
                <div className={styles.hoverOverlay}>
                  <span className={styles.expandHint}>
                    <Maximize2 size={16} /> VIEW ARCHIVE
                  </span>
                </div>
              </div>

              {/* EDITORIAL CAPTION */}
              <div className={styles.captionBlock}>
                <div className={styles.captionMeta}>
                  <span className={styles.captionIndex}>
                    {String(index + 1).padStart(2, '0')} / {item.category.toUpperCase()}
                  </span>
                  <span className={styles.captionDate}>{item.date}</span>
                </div>
                <h3 className={styles.captionTitle}>{item.title}</h3>
                <p className={styles.captionLocation}>{item.location}</p>
              </div>
            </article>
          );
        })}
      </div>

      {/* FULLSCREEN EDITORIAL LIGHTBOX */}
      {activeItem && (
        <div
          className={styles.lightboxModal}
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            {/* TOP BAR */}
            <div className={styles.lightboxBar}>
              <div className={styles.lightboxMetadata}>
                <span className={styles.lightboxId}>
                  IEI ARCHIVE • {activeItem.id.toUpperCase()}
                </span>
                <span className={styles.lightboxCategory}>
                  {activeItem.category} • {activeItem.date}
                </span>
              </div>
              <button
                className={styles.closeBtn}
                onClick={closeLightbox}
                aria-label="Close Lightbox"
              >
                <X size={20} />
              </button>
            </div>

            {/* MAIN IMAGE VIEW */}
            <div className={styles.lightboxVisual}>
              <div className={styles.lightboxPlaceholder}>
                <Camera size={56} className={styles.modalCameraIcon} />
                <div className={styles.modalTitleText}>{activeItem.title}</div>
                <div className={styles.modalSubText}>
                  Swipe horizontally or use arrow buttons to navigate archive.
                </div>
              </div>

              {/* NAV CONTROLS */}
              <button
                className={`${styles.navBtn} ${styles.prevBtn}`}
                onClick={() => navigateLightbox('prev')}
                aria-label="Previous archival photo"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className={`${styles.navBtn} ${styles.nextBtn}`}
                onClick={() => navigateLightbox('next')}
                aria-label="Next archival photo"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* LIGHTBOX FOOTER */}
            <div className={styles.lightboxFooter}>
              <div className={styles.footerDetails}>
                <h2 className={styles.footerTitle}>{activeItem.title}</h2>
                <span className={styles.footerLocation}>{activeItem.location}</span>
              </div>

              {/* ONE-HANDED THUMB CONTROLS FOR MOBILE */}
              <div className={styles.mobileThumbNav}>
                <button
                  className={styles.thumbBtn}
                  onClick={() => navigateLightbox('prev')}
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className={styles.lightboxCounter}>
                  {String(
                    filteredItems.findIndex((it) => it.id === activeItem.id) + 1
                  ).padStart(2, '0')}{' '}
                  /{' '}
                  {String(filteredItems.length).padStart(2, '0')}
                </span>
                <button
                  className={styles.thumbBtn}
                  onClick={() => navigateLightbox('next')}
                  aria-label="Next photo"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
