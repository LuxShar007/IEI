'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import styles from './RadialCarousel.module.css';

export interface GalleryItem {
  id: string | number;
  url: string;
  title?: string;
}

export type RadialCarouselItem = GalleryItem;

export interface RadialCarouselProps {
  items: GalleryItem[];
  radius?: number;
  thumbnailSize?: number;
  centerSize?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
}

export const RadialCarousel: React.FC<RadialCarouselProps> = ({
  items,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);
  const [mounted, setMounted] = useState(false);

  // Touch / pointer tracking for swipe gestures on carousel
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);
  const hasDragged = useRef<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const total = items.length;

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Card click: if clicking active card, open lightbox. If clicking side card, rotate to it.
  const handleCardClick = (index: number) => {
    if (hasDragged.current) return;
    if (index === activeIndex) {
      setIsLightboxOpen(true);
    } else {
      setActiveIndex(index);
    }
  };

  // Keyboard navigation when carousel container has focus
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isLightboxOpen) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    }
  };

  // Carousel pointer/touch gestures
  const onPointerDown = (e: React.PointerEvent) => {
    touchStartX.current = e.clientX;
    touchDeltaX.current = 0;
    isDragging.current = true;
    hasDragged.current = false;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || touchStartX.current === null) return;
    const delta = e.clientX - touchStartX.current;
    touchDeltaX.current = delta;
    if (Math.abs(delta) > 10) {
      hasDragged.current = true;
    }
  };

  const onPointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const threshold = 40;
    if (touchDeltaX.current < -threshold) {
      handleNext();
    } else if (touchDeltaX.current > threshold) {
      handlePrev();
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
    setTimeout(() => {
      hasDragged.current = false;
    }, 60);
  };

  // =========================================================================
  // LIGHTBOX LOGIC & ACCESSIBILITY
  // =========================================================================
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleLightboxKeys = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleLightboxKeys);

    return () => {
      window.removeEventListener('keydown', handleLightboxKeys);
    };
  }, [isLightboxOpen, handleNext, handlePrev]);

  // Lightbox touch swipe tracking
  const lightboxTouchStartX = useRef<number | null>(null);

  const onLightboxTouchStart = (e: React.TouchEvent) => {
    lightboxTouchStartX.current = e.touches[0].clientX;
  };

  const onLightboxTouchEnd = (e: React.TouchEvent) => {
    if (lightboxTouchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - lightboxTouchStartX.current;
    if (delta < -50) {
      handleNext();
    } else if (delta > 50) {
      handlePrev();
    }
    lightboxTouchStartX.current = null;
  };

  if (!items || items.length === 0) return null;

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  // Card dimensions (must match CSS .cylinderCard sizes)
  const cardW = isMobile ? 310 : isTablet ? 340 : 380;
  const cardH = isMobile ? 420 : isTablet ? 460 : 510;

  // Responsive cylinder geometry
  const cylinderRadius = isMobile ? 360 : isTablet ? 450 : 540;
  const angleStep = isMobile ? 32 : isTablet ? 29 : 27; // degrees per card position
  const visibleCardRange = isMobile ? 1 : 2; // Mobile shows 3 cards total, Desktop shows 5

  const activeItem = items[activeIndex];

  return (
    <div
      className={styles.cylinderContainer}
      tabIndex={0}
      role="region"
      aria-label="Cylindrical Gallery Carousel. Use arrow keys to navigate or click center card for fullscreen."
      onKeyDown={handleKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* 3D CYLINDRICAL STAGE */}
      <div className={styles.cylinderStage}>
        {items.map((item, index) => {
          // Wrapped offset relative to active card: [-total/2, total/2]
          let offset = index - activeIndex;
          while (offset > total / 2) offset -= total;
          while (offset < -total / 2) offset += total;

          const isVisible = Math.abs(offset) <= visibleCardRange;
          const isCenter = offset === 0;

          // Cylindrical coordinates
          const angleDeg = offset * angleStep;
          const angleRad = (angleDeg * Math.PI) / 180;

          // Horizontal displacement across cylinder circumference
          const translateX = Math.sin(angleRad) * cylinderRadius;

          // Depth displacement with generous clearance ensuring clean amphitheater stacking
          let translateZ = 0;
          let scale = 1.0;
          let opacity = 1.0;
          let zIndex = 10;

          if (isCenter) {
            translateZ = 80;
            scale = 1.0;
            opacity = 1.0;
            zIndex = 30;
          } else if (Math.abs(offset) === 1) {
            translateZ = (Math.cos(angleRad) - 1) * cylinderRadius - 60;
            scale = isMobile ? 0.82 : 0.86;
            opacity = isMobile ? 0.65 : 0.82;
            zIndex = 20;
          } else if (Math.abs(offset) === 2) {
            translateZ = (Math.cos(angleRad) - 1) * cylinderRadius - 120;
            scale = 0.72;
            opacity = 0.42;
            zIndex = 10;
          } else {
            translateZ = (Math.cos(angleRad) - 1) * cylinderRadius - 180;
            scale = 0.55;
            opacity = 0.0;
            zIndex = 1;
          }

          // Card rotation tangent to cylinder arc (facing towards center/viewer)
          const rotateY = angleDeg * 0.82;

          // Absolute-pixel centering: encode half-card offset directly in translate3d
          // so the card's geometric center sits exactly at the stage's center point.
          // CSS transform order: outermost = 3D arc position, then rotateY, then scale.
          // Cards are positioned at left:0; top:0 (removed from CSS), so we shift by half dims.
          const cx = translateX - cardW / 2;
          const cy = -cardH / 2;
          const cardTransform = `translate3d(${cx}px, ${cy}px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;

          return (
            <div
              key={item.id}
              className={`${styles.cylinderCard} ${isCenter ? styles.centerCardActive : ''}`}
              style={{
                transform: cardTransform,
                opacity,
                zIndex,
                visibility: isVisible ? 'visible' : 'hidden',
                pointerEvents: isVisible ? 'auto' : 'none',
              }}
              onClick={() => handleCardClick(index)}
              role="button"
              tabIndex={isCenter ? 0 : -1}
              aria-label={`${item.title || `Gallery item ${index + 1}`}${isCenter ? '. Click to open full-viewport lightbox.' : '. Click to rotate to center.'}`}
            >
              <div className={styles.cardInner}>
                <Image
                  src={item.url}
                  alt={item.title || 'Gallery image'}
                  fill
                  sizes="(max-width: 640px) 270px, (max-width: 1024px) 280px, 320px"
                  className={styles.cardImage}
                  draggable={false}
                  priority={isCenter}
                />

                {isCenter && (
                  <button
                    type="button"
                    className={styles.cardCenterCue}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsLightboxOpen(true);
                    }}
                    aria-label="Expand photograph to fullscreen"
                  >
                    <Maximize2 size={13} className={styles.cueIcon} />
                    <span>EXPAND</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* DISCRETE NAVIGATION CONTROLS */}
      <div className={styles.navigationRow}>
        <button
          type="button"
          className={styles.navButton}
          onClick={handlePrev}
          aria-label="Previous gallery image"
        >
          <ChevronLeft size={20} />
        </button>

        <div className={styles.indicatorTrack}>
          <span className={styles.counterText}>
            {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <span className={styles.titleText}>{activeItem?.title}</span>
        </div>

        <button
          type="button"
          className={styles.navButton}
          onClick={handleNext}
          aria-label="Next gallery image"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* =====================================================================
          FULL-VIEWPORT IMAGE LIGHTBOX (PORTAL TO DOCUMENT BODY)
          ===================================================================== */}
      {mounted && isLightboxOpen && createPortal(
        <div
          className={styles.lightboxOverlay}
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen Gallery Viewer"
          onTouchStart={onLightboxTouchStart}
          onTouchEnd={onLightboxTouchEnd}
          onClick={(e) => {
            // Close if clicking neutral background overlay
            if (e.target === e.currentTarget) setIsLightboxOpen(false);
          }}
        >
          {/* TOP CLOSE BUTTON */}
          <button
            type="button"
            className={styles.lightboxCloseBtn}
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close fullscreen gallery"
          >
            <X size={24} />
          </button>

          {/* PREVIOUS BUTTON */}
          <button
            type="button"
            className={`${styles.lightboxNavBtn} ${styles.lightboxPrev}`}
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous image"
          >
            <ChevronLeft size={32} />
          </button>

          {/* MAIN FULLSCREEN PHOTOGRAPH */}
          <div className={styles.lightboxImageContainer}>
            <Image
              src={activeItem.url}
              alt={activeItem.title || 'Fullscreen gallery photograph'}
              fill
              className={styles.lightboxImg}
              draggable={false}
              priority
              sizes="90vw"
            />
          </div>

          {/* NEXT BUTTON */}
          <button
            type="button"
            className={`${styles.lightboxNavBtn} ${styles.lightboxNext}`}
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next image"
          >
            <ChevronRight size={32} />
          </button>

          {/* BOTTOM METADATA BAR */}
          <div className={styles.lightboxCaptionBar}>
            <span className={styles.lightboxCounter}>
              {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <span className={styles.lightboxTitle}>{activeItem?.title}</span>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
