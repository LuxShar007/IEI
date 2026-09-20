'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { useSmoothScroll } from '@/components/layout/SmoothScrollProvider';
import styles from './PageTransition.module.css';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const { lenis } = useSmoothScroll();

  // Scroll reset to top cleanly on route change
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, lenis]);

  return (
    <>
      {/* Route load flash bar for instant feedback */}
      <motion.div
        key={`indicator-${pathname}`}
        className={styles.routeIndicator}
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: [1, 1, 0] }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.div
        key={pathname}
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.28,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={styles.pageTransitionWrapper}
      >
        {children}
      </motion.div>
    </>
  );
};
