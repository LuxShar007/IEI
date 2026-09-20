import React from 'react';
import { IEIIdentityIntro } from '@/components/intro/IEIIdentityIntro';
import { Hero } from '@/components/hero/Hero';
import { AboutComposition } from '@/components/home/AboutComposition/AboutComposition';
import { ChapterPhilosophy } from '@/components/home/ChapterPhilosophy/ChapterPhilosophy';
import { WhatWeDo } from '@/components/home/WhatWeDo/WhatWeDo';
import { ActivitiesSummary } from '@/components/home/ActivitiesSummary/ActivitiesSummary';
import { EventsPreview } from '@/components/home/EventsPreview/EventsPreview';
import { ThePeoplePreview } from '@/components/home/ThePeoplePreview/ThePeoplePreview';
import { ChapterArchivePreview } from '@/components/home/ChapterArchivePreview/ChapterArchivePreview';
import { ResourcesPreview } from '@/components/home/ResourcesPreview/ResourcesPreview';
import { FinalCTA } from '@/components/home/FinalCTA/FinalCTA';

export default function HomePage() {
  return (
    <>
      {/* 00-17 — CINEMATIC IDENTITY INTRO (World 1: Pinned Scroll Region) with Single Authoritative Hero */}
      <IEIIdentityIntro>
        <Hero mode="auto" />
      </IEIIdentityIntro>

      {/* 01-09 — NORMAL HOMEPAGE CONTENT (World 2: Normal Document Flow after Intro Release) */}
      <div id="homepage-main">
        {/* 02 — ABOUT IEI SIES GST (Asymmetrical Editorial Split) */}
        <AboutComposition />

        {/* 03 — CHAPTER PRINCIPLES (01 LEARN, 02 BUILD, 03 LEAD) */}
        <ChapterPhilosophy />

        {/* 04 — WHAT WE DO (Interactive Editorial List & Dynamic Detail Panel) */}
        <WhatWeDo />

        {/* 05 — FEATURED ACTIVITIES (Large Visual Summary & Program Tracks) */}
        <ActivitiesSummary />

        {/* 06 — FEATURED EVENTS (Numbered Chronological Archive Grid) */}
        <EventsPreview />

        {/* 07 — THE PEOPLE (Governance Preview with Links to Council & Domains) */}
        <ThePeoplePreview />

        {/* 08 — CHAPTER ARCHIVE / GALLERY (Asymmetric Photographic Grid) */}
        <ChapterArchivePreview />

        {/* 09 — RESOURCES (Restrained Link-Based Document Directory) */}
        <ResourcesPreview />

        {/* 10 — FINAL CTA / CONTACT (Institutional Statement & 4 Informational CTAs) */}
        <FinalCTA />
      </div>
    </>
  );
}
