'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  type Variants,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
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
  radius = 260,
  thumbnailSize = 110,
  centerSize = 400,
  autoRotate = false,
  autoRotateSpeed = 0.25,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPanning, setIsPanning] = useState(false);
  const [responsiveSizes, setResponsiveSizes] = useState({
    radius,
    thumbnailSize,
    centerSize,
  });

  useEffect(() => {
    const updateSizes = () => {
      const width = window.innerWidth;

      if (width < 400) {
        setResponsiveSizes({
          radius: Math.min(radius, 120),
          thumbnailSize: Math.min(thumbnailSize, 70),
          centerSize: Math.min(centerSize, 260),
        });
      } else if (width < 640) {
        setResponsiveSizes({
          radius: Math.min(radius, 150),
          thumbnailSize: Math.min(thumbnailSize, 80),
          centerSize: Math.min(centerSize, 300),
        });
      } else if (width < 1024) {
        setResponsiveSizes({
          radius: Math.min(radius, 200),
          thumbnailSize: Math.min(thumbnailSize, 95),
          centerSize: Math.min(centerSize, 340),
        });
      } else {
        setResponsiveSizes({ radius, thumbnailSize, centerSize });
      }
    };

    updateSizes();
    window.addEventListener('resize', updateSizes);
    return () => window.removeEventListener('resize', updateSizes);
  }, [radius, thumbnailSize, centerSize]);

  const rotation = useMotionValue(0);

  const smoothRotation = useSpring(rotation, {
    bounce: 0.15,
    duration: 0.1,
  });

  // Autonomous motion disabled during design freeze. Carousel rotates only on user touch/pan or item selection.
  useEffect(() => {
    if (!autoRotate) return;
  }, [autoRotate]);

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
    setIsExpanded(false);
  };

  const containerVariants: Variants = {
    collapsed: { transition: { staggerChildren: 0.01, staggerDirection: -1 } },
    expanded: { transition: { staggerChildren: 0.03, delayChildren: 0.1 } },
  };

  if (!items || items.length === 0) return null;

  const currentItem = items[activeIndex] || items[0];

  return (
    <div className={styles.carouselContainer}>
      <AnimatePresence mode="popLayout">
        {!isExpanded ? (
          <motion.div
            key="center-view"
            layout
            transition={{ type: 'spring', bounce: 0.15, duration: 0.15 }}
            className={styles.centerViewWrapper}
          >
            <motion.div
              layoutId={`card-${currentItem.id}`}
              style={{
                width: responsiveSizes.centerSize,
                height: responsiveSizes.centerSize,
              }}
              onClick={toggleExpand}
              className={styles.centerCard}
              role="button"
              tabIndex={0}
              aria-label={`Expanded card for ${currentItem.title || 'gallery item'}. Click to expand into orbit`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleExpand();
                }
              }}
            >
              <motion.img
                layoutId={`img-${currentItem.id}`}
                src={currentItem.url}
                alt={currentItem.title || 'Gallery image'}
                className={styles.centerCardImage}
                draggable={false}
              />

              <div className={styles.centerOverlayHint}>
                <span>Click to expand orbit</span>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="radial-view"
            variants={containerVariants}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            className={`${styles.radialViewWrapper} ${isPanning ? styles.touchNone : styles.touchPanY}`}
            onPanStart={() => setIsPanning(true)}
            onPanEnd={() => setIsPanning(false)}
            onPan={(_, info) => {
              rotation.set(rotation.get() + info.delta.x * 0.5);
            }}
            onClick={(e) => {
              // Clicking background collapses back to center view
              if (e.target === e.currentTarget) {
                setIsExpanded(false);
              }
            }}
          >
            {items.map((item, index) => {
              const baseAngle =
                (index / items.length) * (2 * Math.PI) - Math.PI / 2;
              return (
                <Item
                  key={item.id}
                  item={item}
                  baseAngle={baseAngle}
                  radius={responsiveSizes.radius}
                  thumbnailSize={responsiveSizes.thumbnailSize}
                  rotation={smoothRotation}
                  onClick={() => handleItemClick(index)}
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface ItemProps {
  item: GalleryItem;
  baseAngle: number;
  radius: number;
  thumbnailSize: number;
  rotation: MotionValue<number>;
  onClick: () => void;
}

const Item: React.FC<ItemProps> = ({
  item,
  baseAngle,
  radius,
  thumbnailSize,
  rotation,
  onClick,
}) => {
  const x = useTransform(rotation, (r: number) => {
    const currentAngle = baseAngle + (r * Math.PI) / 180;
    return Math.cos(currentAngle) * radius;
  });

  const y = useTransform(rotation, (r: number) => {
    const currentAngle = baseAngle + (r * Math.PI) / 180;
    return Math.sin(currentAngle) * radius;
  });

  const rotate = useTransform(rotation, (r: number) => {
    const currentAngle = baseAngle + (r * Math.PI) / 180;
    return (currentAngle * 180) / Math.PI + 90;
  });

  const itemVariants: Variants = {
    collapsed: {
      opacity: 0,
      scale: 0.8,
      transition: { type: 'spring', bounce: 0.4, duration: 0.5 },
    },
    expanded: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', bounce: 0.4, duration: 0.5 },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      style={{ x, y, rotate }}
      onClick={onClick}
      className={styles.itemWrapper}
    >
      <motion.div
        layoutId={`card-${item.id}`}
        style={{ width: thumbnailSize, height: thumbnailSize }}
        className={styles.itemCard}
      >
        <motion.img
          layoutId={`img-${item.id}`}
          src={item.url}
          alt={item.title || 'Orbit thumbnail'}
          className={styles.itemImage}
          draggable={false}
        />
      </motion.div>
    </motion.div>
  );
};
