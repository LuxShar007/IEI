import React from 'react';
import type { Metadata } from 'next';
import { DirectHero } from '@/components/home/DirectHero/DirectHero';
import { HomeAbout } from '@/components/home/HomeAbout/HomeAbout';
import { FlagshipEventsAndAwards } from '@/components/home/FlagshipEventsAndAwards/FlagshipEventsAndAwards';
import { HomeGallery } from '@/components/home/HomeGallery/HomeGallery';
import { HomeFAQ } from '@/components/home/HomeFAQ/HomeFAQ';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'IEI SIES GST — The Institution of Engineers (India) Student Chapter',
  description:
    'Official collegiate student chapter under the Department of Electronics and Computer Science at SIES Graduate School of Technology. Discover technical symposia, domain wings, awards, and cryptographic member credentials.',
  path: '/',
});

export default function HomePage() {
  return (
    <main id="homepage-main">
      {/* 01 — DIRECT HERO (Unpinned, Bold Brand Display, Direct Actions) */}
      <DirectHero />

      {/* 02 — ABOUT US & SPECIALIZED DOMAINS (Narrative + Domain Pills) */}
      <HomeAbout />

      {/* 03 — FLAGSHIP EVENTS & CHAPTER AWARDS (Initiatives + Institutional Honors) */}
      <FlagshipEventsAndAwards />

      {/* 04 — RECENT PROCEEDINGS & GALLERY HIGHLIGHTS */}
      <HomeGallery />

      {/* 05 — FREQUENTLY ASKED QUESTIONS (Accordion Directory & Contact) */}
      <HomeFAQ />
    </main>
  );
}
