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
  const [isIntroActive, setIsIntroActive] = useState(false);
  const [isIntroComplete, setIsIntroComplete] = useState(true);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [introProgress, setIntroProgressState] = useState(1);

  const setIntroProgress = useCallback((progress: number) => {
    setIntroProgressState(progress);
  }, []);

  const skipIntro = useCallback(() => {
    setIsIntroComplete(true);
    setIsIntroActive(false);
    setIsNavbarVisible(true);
    setIntroProgressState(1);
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
