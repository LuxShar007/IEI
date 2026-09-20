'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { useSmoothScroll } from '@/components/layout/SmoothScrollProvider';

interface IntroContextValue {
  isIntroActive: boolean;
  isIntroComplete: boolean;
  introProgress: number;
  setIntroProgress: (progress: number) => void;
  skipIntro: () => void;
}

const IntroContext = createContext<IntroContextValue>({
  isIntroActive: false,
  isIntroComplete: true,
  introProgress: 1,
  setIntroProgress: () => {},
  skipIntro: () => {},
});

export const useIntro = () => useContext(IntroContext);

export const IntroProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const { lenis } = useSmoothScroll();
  const isHome = pathname === '/';

  const [isIntroActive, setIsIntroActive] = useState(isHome);
  const [isIntroComplete, setIsIntroComplete] = useState(!isHome);
  const [introProgress, setIntroProgressState] = useState(isHome ? 0 : 1);

  // Reset when navigating away or back to home
  useEffect(() => {
    if (!isHome) {
      setIsIntroActive(false);
      setIsIntroComplete(true);
      setIntroProgressState(1);
    } else {
      // Check current scroll position
      if (typeof window !== 'undefined' && window.scrollY > 100) {
        // If user navigated or refreshed mid-page, intro might be completed
        const introThreshold = window.innerHeight * 3.5;
        if (window.scrollY >= introThreshold) {
          setIsIntroActive(false);
          setIsIntroComplete(true);
          setIntroProgressState(1);
        } else {
          setIsIntroActive(true);
          setIsIntroComplete(false);
        }
      } else {
        setIsIntroActive(true);
        setIsIntroComplete(false);
        setIntroProgressState(0);
      }
    }
  }, [isHome]);

  const setIntroProgress = useCallback((progress: number) => {
    setIntroProgressState(progress);
    const complete = progress >= 0.92;
    setIsIntroComplete(complete);
    setIsIntroActive(progress < 0.99);
  }, []);

  const skipIntro = useCallback(() => {
    if (typeof window !== 'undefined') {
      const targetScroll = window.innerHeight * 4.0;
      if (lenis) {
        lenis.scrollTo(targetScroll, { duration: 1.2 });
      } else {
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
      setIsIntroComplete(true);
      setIsIntroActive(false);
      setIntroProgressState(1);
    }
  }, [lenis]);

  return (
    <IntroContext.Provider
      value={{
        isIntroActive,
        isIntroComplete,
        introProgress,
        setIntroProgress,
        skipIntro,
      }}
    >
      {children}
    </IntroContext.Provider>
  );
};
