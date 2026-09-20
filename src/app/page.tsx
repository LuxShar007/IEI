import React from 'react';
import { IEIIdentityIntro } from '@/components/intro/IEIIdentityIntro';
import { Hero } from '@/components/hero/Hero';
import { ChapterPhilosophy } from '@/components/home/ChapterPhilosophy/ChapterPhilosophy';
import { AboutComposition } from '@/components/home/AboutComposition/AboutComposition';
import { SequentialProcess } from '@/components/home/SequentialProcess/SequentialProcess';
import { ActivitiesEditorial } from '@/components/home/ActivitiesEditorial/ActivitiesEditorial';
import { EventsPreview } from '@/components/home/EventsPreview/EventsPreview';
import { FinalCTA } from '@/components/home/FinalCTA/FinalCTA';

export default function HomePage() {
  return (
    <>
      {/* 00-14 — CINEMATIC IDENTITY INTRO (World 1: Pinned Scroll Region) */}
      <IEIIdentityIntro>
        <Hero mode="backdrop" />
      </IEIIdentityIntro>

      {/* 01-07 — NORMAL HOMEPAGE CONTENT (World 2: Normal Document Flow) */}
      <main id="homepage-main">
        <Hero mode="normal" />

        {/* 02 — CHAPTER PHILOSOPHY (M3-inspired principle-led) */}
        <ChapterPhilosophy />

      {/* 03 — ABOUT COMPOSITION (editorial asymmetric spread) */}
      <AboutComposition />

      {/* 04 — SEQUENTIAL CHAPTER JOURNEY (LinusBio-inspired pinned) */}
      <SequentialProcess />

      {/* 05 — ACTIVITIES (editorial numbered list) */}
      <ActivitiesEditorial />

      {/* 06 — EVENTS PREVIEW (M3-numbered event list) */}
      <EventsPreview />

        {/* 07 — FINAL CTA */}
        <FinalCTA />
      </main>
    </>
  );
}
