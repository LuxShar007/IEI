'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigationConfig } from '@/data/navigation';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useIntro } from '@/lib/intro/IntroContext';
import { ThemeSwitcher } from '@/components/layout/ThemeSwitcher/ThemeSwitcher';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { isIntroComplete, introProgress } = useIntro();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const showNavbar = pathname !== '/' || isIntroComplete || introProgress >= 0.88;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
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
        {/* WORDMARK */}
        <Link href="/" className={styles.wordmark} aria-label="IEI SIES GST — Home">
          <span className={styles.wordmarkPrimary}>IEI SIES GST</span>
          <span className={styles.wordmarkSub}>Student Chapter · MH-04</span>
        </Link>

        {/* DESKTOP NAV */}
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
                    {item.title}
                    {isActive && <span className={styles.activeBar} aria-hidden="true" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* DESKTOP ACTIONS */}
        <div className={styles.actions}>
          <ThemeSwitcher />

          <Link
            href="/verify"
            className={cn(
              styles.verifyLink,
              pathname.startsWith('/verify') && styles.verifyLinkActive
            )}
            title="Authenticate member credential"
          >
            <ShieldCheck size={14} aria-hidden="true" />
            <span>Verify Member</span>
            <span
              className={styles.verifyDot}
              aria-label="Registry active"
            />
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className={styles.mobileToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* MOBILE DRAWER */}
      <div
        id="mobile-menu"
        className={cn(styles.mobileDrawer, mobileMenuOpen && styles.mobileDrawerOpen)}
        aria-hidden={!mobileMenuOpen}
        role="dialog"
        aria-label="Navigation Menu"
      >
        <nav className={styles.mobileNav}>
          <ul className={styles.mobileNavList}>
            {navigationConfig.mainNav.map((item) => {
              const isActive = pathname === item.href;
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
                    <span>{item.title}</span>
                    <span className={styles.mobileNavArrow} aria-hidden="true">→</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className={styles.mobileActions}>
            <div className={styles.mobileThemeToggle}>
              <span className={styles.mobileThemeLabel}>Visual Theme</span>
              <ThemeSwitcher />
            </div>

            <Link
              href="/verify"
              className={styles.mobileVerifyLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              <ShieldCheck size={14} />
              <span>Verify Member Registry</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};
