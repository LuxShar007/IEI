'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';

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
      if (typeof window !== 'undefined' && window.scrollY > 100) {
        const introThreshold = window.innerHeight * 7.2;
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
    const complete = progress >= 0.98;
    setIsIntroComplete(complete);
    setIsIntroActive(progress < 0.99);
  }, []);

  const skipIntro = useCallback(() => {
    if (typeof window !== 'undefined') {
      // Smoothly scroll to the release position of the intro track (7.5 × innerHeight)
      const targetScroll = window.innerHeight * 7.5;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      setIsIntroComplete(true);
      setIsIntroActive(false);
      setIntroProgressState(1);
    }
  }, []);

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
