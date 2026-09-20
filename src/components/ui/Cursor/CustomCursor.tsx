'use client';

import React, { useEffect, useState, useRef } from 'react';
import styles from './CustomCursor.module.css';

export type CursorState = 'default' | 'hover' | 'link' | 'button' | 'view' | 'open' | 'profile';

export const CustomCursor: React.FC = () => {
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Disable on touch screens or if reduced motion is preferred
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouchDevice || prefersReducedMotion) {
      setIsTouch(true);
      return;
    }
    setIsTouch(false);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check element under cursor for data-cursor or tags
      const target = e.target as HTMLElement | null;
      if (!target) {
        setCursorState('default');
        return;
      }

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const type = cursorTarget.getAttribute('data-cursor') as CursorState;
        setCursorState(type || 'hover');
        return;
      }

      if (target.closest('button, [role="button"]')) {
        setCursorState('button');
        return;
      }

      if (target.closest('a')) {
        setCursorState('link');
        return;
      }

      setCursorState('default');
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    // Physics render loop for smooth spring follower lag
    const loop = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      const ease = 0.22;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isVisible]);

  if (isTouch) return null;

  return (
    <div
      className={`${styles.cursorContainer} ${isVisible ? styles.visible : ''} ${styles[cursorState]}`}
      aria-hidden="true"
    >
      <div ref={ringRef} className={styles.ring}>
        {cursorState === 'view' && <span className={styles.badgeLabel}>VIEW</span>}
        {cursorState === 'open' && <span className={styles.badgeLabel}>OPEN</span>}
        {cursorState === 'profile' && <span className={styles.badgeLabel}>PROFILE</span>}
      </div>
      <div ref={dotRef} className={styles.dot} />
    </div>
  );
};
