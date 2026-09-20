'use client';

import React from 'react';
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import { pageEntranceVariants, sectionRevealVariants, childFadeUpVariants } from '@/lib/animations/variants';

export interface MotionWrapperProps extends HTMLMotionProps<'div'> {
  variant?: 'page' | 'section' | 'child' | 'none';
  children: React.ReactNode;
}

export const MotionWrapper: React.FC<MotionWrapperProps> = ({
  variant = 'page',
  children,
  className,
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion || variant === 'none') {
    return <div className={className}>{children}</div>;
  }

  let selectedVariants = pageEntranceVariants;
  if (variant === 'section') selectedVariants = sectionRevealVariants;
  if (variant === 'child') selectedVariants = childFadeUpVariants;

  return (
    <motion.div
      variants={selectedVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
