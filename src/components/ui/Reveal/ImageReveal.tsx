'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import styles from './ImageReveal.module.css';

export interface ImageRevealProps {
  children: React.ReactNode;
  aspectRatio?: string;
  className?: string;
  delay?: number;
}

export const ImageReveal: React.FC<ImageRevealProps> = ({
  children,
  aspectRatio = '16 / 10',
  className,
  delay = 0,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={cn(styles.wrapper, className)} style={{ aspectRatio }}>
        {children}
      </div>
    );
  }

  return (
    <div className={cn(styles.wrapper, className)} style={{ aspectRatio }}>
      <motion.div
        className={styles.inner}
        initial={{ clipPath: 'inset(100% 0% 0% 0%)', scale: 1.05 }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{
          duration: 0.85,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
