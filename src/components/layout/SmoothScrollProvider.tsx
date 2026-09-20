'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';

interface SmoothScrollContextType {
  lenis: Lenis | null;
  pauseLenis: () => void;
  resumeLenis: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  pauseLenis: () => {},
  resumeLenis: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const rafHandleRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    function raf(time: number) {
      lenis.raf(time);
      rafHandleRef.current = requestAnimationFrame(raf);
    }

    rafHandleRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafHandleRef.current) cancelAnimationFrame(rafHandleRef.current);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, []);

  // Never stop Lenis as that cancels wheel input via preventDefault() and locks document overflow
  const pauseLenis = () => {};
  const resumeLenis = () => {};

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisInstance, pauseLenis, resumeLenis }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};
