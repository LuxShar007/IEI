'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { navigationConfig } from '@/data/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useIntro } from '@/lib/intro/IntroContext';
import { ThemeSwitcher } from '@/components/layout/ThemeSwitcher/ThemeSwitcher';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { isIntroComplete, isNavbarVisible } = useIntro();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const showNavbar = pathname !== '/' || isIntroComplete || isNavbarVisible;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Accessibility: Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        styles.navbar,
        !showNavbar && styles.hiddenForIntro,
        isScrolled && styles.scrolled,
        mobileMenuOpen && styles.menuOpen
      )}
      role="banner"
    >
      <div className={styles.inner}>
        {/* BRAND BLOCK: Official Transparent IEI Emblem SVG + Live Typography */}
        <Link href="/" className={styles.brand} aria-label="IEI SIES GST — Home">
          <Image
            src="/assets/iei-logo.svg"
            alt="IEI SIES GST"
            width={32}
            height={32}
            className={styles.emblem}
            priority
          />
          <div className={styles.wordmark}>
            <span className={styles.wordmarkPrimary}>IEI SIES GST</span>
            <span className={styles.wordmarkSub}>STUDENT CHAPTER</span>
          </div>
        </Link>

        {/* PRIMARY DESKTOP NAVIGATION */}
        <nav className={styles.desktopNav} aria-label="Main Navigation">
          <ul className={styles.navList}>
            {navigationConfig.mainNav.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      styles.navLink,
                      isActive && styles.navLinkActive
                    )}
                  >
                    <span className={styles.navLinkText}>{item.title}</span>
                    {isActive && <span className={styles.activeLine} aria-hidden="true" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* RIGHT: THEME SWITCH ONLY */}
        <div className={styles.actions}>
          <ThemeSwitcher />
        </div>

        {/* MOBILE CONTROLS */}
        <div className={styles.mobileControls}>
          <div className={styles.mobileThemeWrapper}>
            <ThemeSwitcher />
          </div>
          <button
            className={styles.mobileToggle}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER OVERLAY */}
      <div
        id="mobile-menu"
        className={cn(styles.mobileDrawer, mobileMenuOpen && styles.mobileDrawerOpen)}
        aria-hidden={!mobileMenuOpen}
        role="dialog"
        aria-label="Mobile Navigation Menu"
      >
        <div className={styles.mobileDrawerInner}>
          <div className={styles.mobileDrawerHeader}>
            <div className={styles.brand}>
              <Image
                src="/assets/iei-logo.svg"
                alt="IEI SIES GST"
                width={28}
                height={28}
                className={styles.emblem}
              />
              <div className={styles.wordmark}>
                <span className={styles.wordmarkPrimary}>IEI SIES GST</span>
                <span className={styles.wordmarkSub}>STUDENT CHAPTER</span>
              </div>
            </div>
          </div>

          <nav className={styles.mobileNav} aria-label="Mobile Navigation">
            <ul className={styles.mobileNavList}>
              {navigationConfig.mainNav.map((item, idx) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        styles.mobileNavLink,
                        isActive && styles.mobileNavLinkActive
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className={styles.mobileNavIndex}>0{idx + 1}</span>
                      <span className={styles.mobileNavTitle}>{item.title}</span>
                      <span className={styles.mobileNavArrow} aria-hidden="true">→</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className={styles.mobileDrawerFooter}>
              <div className={styles.mobileDrawerThemeRow}>
                <span className={styles.mobileDrawerThemeLabel}>IDENTITY THEME</span>
                <ThemeSwitcher />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
