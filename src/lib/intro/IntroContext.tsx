'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';

interface IntroContextValue {
  isIntroActive: boolean;
  isIntroComplete: boolean;
  isNavbarVisible: boolean;
  introProgress: number;
  setIntroProgress: (progress: number) => void;
  skipIntro: () => void;
}

const IntroContext = createContext<IntroContextValue>({
  isIntroActive: false,
  isIntroComplete: true,
  isNavbarVisible: true,
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
  const [isNavbarVisible, setIsNavbarVisible] = useState(!isHome);
  const [introProgress, setIntroProgressState] = useState(isHome ? 0 : 1);

  // Store continuous progress in ref for instant non-render access
  const progressRef = React.useRef(isHome ? 0 : 1);
  const activeRef = React.useRef(isHome);
  const completeRef = React.useRef(!isHome);
  const navbarRef = React.useRef(!isHome);

  // Reset when navigating away or back to home
  useEffect(() => {
    if (!isHome) {
      activeRef.current = false;
      completeRef.current = true;
      navbarRef.current = true;
      progressRef.current = 1;
      setIsIntroActive(false);
      setIsIntroComplete(true);
      setIsNavbarVisible(true);
      setIntroProgressState(1);
    } else {
      if (typeof window !== 'undefined' && window.scrollY > 100) {
        const introThreshold = window.innerHeight * 7.2;
        const pastIntro = window.scrollY >= introThreshold;
        activeRef.current = !pastIntro;
        completeRef.current = pastIntro;
        navbarRef.current = pastIntro;
        progressRef.current = pastIntro ? 1 : 0;
        setIsIntroActive(!pastIntro);
        setIsIntroComplete(pastIntro);
        setIsNavbarVisible(pastIntro);
        setIntroProgressState(pastIntro ? 1 : 0);
      } else {
        activeRef.current = true;
        completeRef.current = false;
        navbarRef.current = false;
        progressRef.current = 0;
        setIsIntroActive(true);
        setIsIntroComplete(false);
        setIsNavbarVisible(false);
        setIntroProgressState(0);
      }
    }
  }, [isHome]);

  // High-performance threshold-only state updater:
  // ZERO re-renders during continuous scrolling. Only updates React state when
  // crossing key discrete thresholds (0.94 for navbar, 0.98 for completion, 0.99 for release).
  const setIntroProgress = useCallback((progress: number) => {
    progressRef.current = progress;

    const newActive = progress < 0.99;
    const newComplete = progress >= 0.98;
    const newNavbar = progress >= 0.94;

    if (newActive !== activeRef.current) {
      activeRef.current = newActive;
      setIsIntroActive(newActive);
    }
    if (newComplete !== completeRef.current) {
      completeRef.current = newComplete;
      setIsIntroComplete(newComplete);
      setIntroProgressState(newComplete ? 1 : 0);
    }
    if (newNavbar !== navbarRef.current) {
      navbarRef.current = newNavbar;
      setIsNavbarVisible(newNavbar);
    }
  }, []);

  const skipIntro = useCallback(() => {
    if (typeof window !== 'undefined') {
      const targetScroll = window.innerHeight * 7.5;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      activeRef.current = false;
      completeRef.current = true;
      navbarRef.current = true;
      progressRef.current = 1;
      setIsIntroComplete(true);
      setIsIntroActive(false);
      setIsNavbarVisible(true);
      setIntroProgressState(1);
    }
  }, []);

  return (
    <IntroContext.Provider
      value={{
        isIntroActive,
        isIntroComplete,
        isNavbarVisible,
        introProgress,
        setIntroProgress,
        skipIntro,
      }}
    >
      {children}
    </IntroContext.Provider>
  );
};
