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

// Autoplay interval in milliseconds
const AUTOPLAY_MS = 3500;

export const RadialCarousel: React.FC<RadialCarouselProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);
  const [mounted, setMounted] = useState(false);

  // Track whether user is hovering / dragging — pause autoplay during interaction
  const isUserInteracting = useRef(false);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  // =========================================================================
  // SMOOTH AUTOPLAY — setInterval advances one card every AUTOPLAY_MS.
  // Paused while lightbox is open or user is interacting (hover / drag).
  // =========================================================================
  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      if (!isUserInteracting.current && !isLightboxOpen) {
        setActiveIndex((prev) => (prev + 1) % total);
      }
    }, AUTOPLAY_MS);
  }, [total, isLightboxOpen]);

  useEffect(() => {
    startAutoplay();
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [startAutoplay]);

  // Pause when lightbox opens, resume when it closes
  useEffect(() => {
    if (isLightboxOpen) {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    } else {
      startAutoplay();
    }
  }, [isLightboxOpen, startAutoplay]);

  // Card click: if clicking active card, open lightbox; side card → rotate to it.
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
    if (e.key === 'ArrowRight') { e.preventDefault(); handleNext(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); handlePrev(); }
  };

  // Hover pause
  const onMouseEnter = () => { isUserInteracting.current = true; };
  const onMouseLeave = () => {
    isUserInteracting.current = false;
    // Reset the interval timer so next advance is a full AUTOPLAY_MS from now
    startAutoplay();
  };

  // Carousel pointer/touch gestures
  const onPointerDown = (e: React.PointerEvent) => {
    touchStartX.current = e.clientX;
    touchDeltaX.current = 0;
    isDragging.current = true;
    hasDragged.current = false;
    isUserInteracting.current = true;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || touchStartX.current === null) return;
    const delta = e.clientX - touchStartX.current;
    touchDeltaX.current = delta;
    if (Math.abs(delta) > 10) hasDragged.current = true;
  };

  const onPointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const threshold = 40;
    if (touchDeltaX.current < -threshold) handleNext();
    else if (touchDeltaX.current > threshold) handlePrev();
    touchStartX.current = null;
    touchDeltaX.current = 0;
    setTimeout(() => {
      hasDragged.current = false;
      isUserInteracting.current = false;
      startAutoplay();
    }, 60);
  };

  // =========================================================================
  // LIGHTBOX LOGIC & ACCESSIBILITY
  // =========================================================================
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleLightboxKeys = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
      else if (e.key === 'ArrowRight') { e.preventDefault(); handleNext(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); handlePrev(); }
    };
    window.addEventListener('keydown', handleLightboxKeys);
    return () => window.removeEventListener('keydown', handleLightboxKeys);
  }, [isLightboxOpen, handleNext, handlePrev]);

  // Lightbox touch swipe
  const lightboxTouchStartX = useRef<number | null>(null);
  const onLightboxTouchStart = (e: React.TouchEvent) => {
    lightboxTouchStartX.current = e.touches[0].clientX;
  };
  const onLightboxTouchEnd = (e: React.TouchEvent) => {
    if (lightboxTouchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - lightboxTouchStartX.current;
    if (delta < -50) handleNext();
    else if (delta > 50) handlePrev();
    lightboxTouchStartX.current = null;
  };

  if (!items || items.length === 0) return null;

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  // 16:9 landscape card dimensions (must match CSS .cylinderCard)
  const cardW = isMobile ? 320 : isTablet ? 440 : 560;
  const cardH = Math.round(cardW * (9 / 16)); // 180 / 247 / 315

  // Cylinder geometry — larger radius to give 16:9 cards room to breathe
  const cylinderRadius = isMobile ? 400 : isTablet ? 560 : 720;
  const angleStep = isMobile ? 34 : isTablet ? 30 : 27;
  const visibleCardRange = isMobile ? 1 : 2;

  const activeItem = items[activeIndex];

  return (
    <div
      className={styles.cylinderContainer}
      tabIndex={0}
      role="region"
      aria-label="Auto-rotating cylindrical gallery. Click centre card to expand fullscreen."
      onKeyDown={handleKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* 3D CYLINDRICAL STAGE */}
      <div className={styles.cylinderStage}>
        {items.map((item, index) => {
          let offset = index - activeIndex;
          while (offset > total / 2) offset -= total;
          while (offset < -total / 2) offset += total;

          const isVisible = Math.abs(offset) <= visibleCardRange;
          const isCenter = offset === 0;

          const angleDeg = offset * angleStep;
          const angleRad = (angleDeg * Math.PI) / 180;
          const translateX = Math.sin(angleRad) * cylinderRadius;

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
            translateZ = (Math.cos(angleRad) - 1) * cylinderRadius - 200;
            scale = 0.55;
            opacity = 0.0;
            zIndex = 1;
          }

          const rotateY = angleDeg * 0.82;

          // Absolute-pixel centering so card geometric center sits at stage center
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
                width: cardW,
                height: cardH,
              }}
              onClick={() => handleCardClick(index)}
              role="button"
              tabIndex={isCenter ? 0 : -1}
              aria-label={`${item.title || `Gallery item ${index + 1}`}${isCenter ? '. Click to open fullscreen.' : '. Click to bring to front.'}`}
            >
              <div className={styles.cardInner}>
                <Image
                  src={item.url}
                  alt={item.title || 'Gallery image'}
                  fill
                  sizes="(max-width: 640px) 320px, (max-width: 1024px) 440px, 560px"
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
            if (e.target === e.currentTarget) setIsLightboxOpen(false);
          }}
        >
          <button
            type="button"
            className={styles.lightboxCloseBtn}
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close fullscreen gallery"
          >
            <X size={24} />
          </button>

          <button
            type="button"
            className={`${styles.lightboxNavBtn} ${styles.lightboxPrev}`}
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            aria-label="Previous image"
          >
            <ChevronLeft size={32} />
          </button>

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

          <button
            type="button"
            className={`${styles.lightboxNavBtn} ${styles.lightboxNext}`}
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            aria-label="Next image"
          >
            <ChevronRight size={32} />
          </button>

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
