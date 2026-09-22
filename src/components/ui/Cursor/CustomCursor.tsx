'use client';

import React from 'react';

export type CursorState = 'default' | 'hover' | 'link' | 'button' | 'view' | 'open' | 'profile';

/**
 * CustomCursor — Deactivated during design freeze to eliminate continuous
 * requestAnimationFrame physics loop and maintain accessible native cursor behavior.
 */
export const CustomCursor: React.FC = () => {
  return null;
};

