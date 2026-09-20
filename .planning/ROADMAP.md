# Roadmap: IEI SIES GST (ECS)

## Overview

A phased journey to establish the official institutional digital experience for the IEI SIES GST (ECS) Student Chapter. The roadmap progresses through core design token architecture and dual theming, signature visual transformations, sequential storytelling, team hierarchy and interactive photography, credential verification engine, and institutional catalog governance.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

- [ ] **Phase 1: Visual Token System & Dual-Theme Foundation** - Locked Helvetica typography, dual palette engine, and smooth scrolling base
- [ ] **Phase 2: Cinematic Identity & Dual Transform Visuals** - Intro identity reveal, blueprint-to-structure, and dot-to-material transformations
- [ ] **Phase 3: Sequential Storytelling & Editorial Composition** - LinusBio-inspired scrollytelling and M3 editorial layouts
- [ ] **Phase 4: Team Leadership & Interactive Group Photograph** - Faculty advisors, 7 domain teams with 4-tier hierarchy, and interactive group photo
- [ ] **Phase 5: Digital Verification & QR Credentialing** - Member credential lookup engine and mobile QR landing views
- [ ] **Phase 6: Institutional Catalogs & Policy Governance** - About, Activities, Events, Resources, Contact, and strict join redirection

## Phase Details

### Phase 1: Visual Token System & Dual-Theme Foundation
**Goal**: Establish the locked Helvetica typography system, strict dual-theme CSS tokens (Default vs Alternative), and kinetic scrolling baseline.
**Mode:** mvp
**Depends on**: Nothing (first phase)
**Requirements**: VIS-01, VIS-02, VIS-03
**Success Criteria** (what must be TRUE):
  1. User can switch between Theme A (Default: white / black / blue / orange) and Theme B (Alternative: black / white / #664EEA) instantly with persistent localStorage state.
  2. All typography strictly renders using Helvetica without ad-hoc font fallbacks.
  3. Smooth kinetic scrolling (Lenis) and motion wrappers respect user reduced-motion system preferences.
**Plans**: 2 plans

Plans:
- [ ] 01-01: Verify and refine dual-theme CSS tokens and root attribute hydration
- [ ] 01-02: Ensure global responsive typographic clamp scale and accessibility guards

---

### Phase 2: Cinematic Identity & Dual Transform Visuals
**Goal**: Deliver the signature entrance identity experience and both theme-specific procedural visuals.
**Mode:** mvp
**Depends on**: Phase 1
**Requirements**: SIGN-01, SIGN-02, SIGN-03
**Success Criteria** (what must be TRUE):
  1. Cinematic soundless IEI identity intro plays smoothly on landing with graceful skip/dismiss.
  2. Default theme presents blueprint → structure → reality visual progression.
  3. Alternative theme presents dot → wireframe → 3D → material visual progression.
**Plans**: 2 plans

Plans:
- [ ] 02-01: Implement cinematic identity intro animation with entrance pacing
- [ ] 02-02: Build Theme A blueprint-to-reality and Theme B dot-to-material visualizers

---

### Phase 3: Sequential Storytelling & Editorial Composition
**Goal**: Implement the LinusBio-inspired multi-stage scrollytelling experience and M3 editorial layout blocks.
**Mode:** mvp
**Depends on**: Phase 2
**Requirements**: SIGN-04, SIGN-05
**Success Criteria** (what must be TRUE):
  1. User can scroll through staged sequential chapters depicting ECS student engineering journey.
  2. Institutional content exhibits M3-inspired asymmetric editorial compositions and micro-interactions.
**Plans**: 2 plans

Plans:
- [ ] 03-01: Refine sequential storytelling scrollytelling scroll anchors and stage triggers
- [ ] 03-02: Enhance M3-inspired editorial layout rhythm and visual balances

---

### Phase 4: Team Leadership & Interactive Group Photograph
**Goal**: Deliver the interactive team group photo, faculty advisor spotlights, and 7 domain team rosters with 4-tier hierarchy.
**Mode:** mvp
**Depends on**: Phase 3
**Requirements**: TEAM-01, TEAM-02, TEAM-03, TEAM-04, TEAM-05
**Success Criteria** (what must be TRUE):
  1. User can hover or tap hotspots on the interactive team group photo to highlight individual members.
  2. Faculty leadership displays Dr. Shubhangi Kharache (HOD) and Prof. Jasmin Hirani (Student Branch Coordinator) without fabricated details.
  3. All 7 domains (Technical, Industry Outreach & Admin, Publicity, Creative, Design, Media, Editorial) are browsable with Mentor, Head, Coordinator, Volunteer levels.
  4. Core Council section clearly indicates formal induction in progress without hallucinated student names.
**Plans**: 3 plans

Plans:
- [ ] 04-01: Build interactive group photograph canvas/hotspot component
- [ ] 04-02: Populate official faculty leadership and domain hierarchy roster structures
- [ ] 04-03: Implement Core Council pending induction state banner and domain filtering

---

### Phase 5: Digital Verification & QR Credentialing
**Goal**: Provide chapter member search, individual profile views, and mobile QR landing credential cards.
**Mode:** mvp
**Depends on**: Phase 4
**Requirements**: VERIF-01, VERIF-02, VERIF-03
**Success Criteria** (what must be TRUE):
  1. User can input Member ID into lookup search to verify active status and credentials.
  2. Individual member profiles render full credentials, domain, and verifiable details.
  3. Scanning member QR code opens `/m/[memberId]` direct mobile verification card.
**Plans**: 2 plans

Plans:
- [ ] 05-01: Validate in-memory verification search lookup and invalid ID handling
- [ ] 05-02: Finalize member profile view and `/m/[memberId]` QR responsive card view

---

### Phase 6: Institutional Catalogs & Policy Governance
**Goal**: Finalize About, Activities, Events, Resources, Contact, and enforce chapter policy disallowing self-serve join actions.
**Mode:** mvp
**Depends on**: Phase 5
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, CONT-06
**Success Criteria** (what must be TRUE):
  1. About, Activities, Events (`[slug]`), Resources, and Contact pages render full institutional content.
  2. Any navigation to `/join` or join forms permanently redirects to `/` with no join buttons displayed.
  3. Whole-site build and cross-theme inspection succeeds with zero console errors.
**Plans**: 2 plans

Plans:
- [ ] 06-01: Review institutional catalog data schemas and dynamic event routing
- [ ] 06-02: Audit zero-join policy, SEO metadata, and production build readiness

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Visual Token System & Dual-Theme Foundation | 0/2 | Not started | - |
| 2. Cinematic Identity & Dual Transform Visuals | 0/2 | Not started | - |
| 3. Sequential Storytelling & Editorial Composition | 0/2 | Not started | - |
| 4. Team Leadership & Interactive Group Photograph | 0/3 | Not started | - |
| 5. Digital Verification & QR Credentialing | 0/2 | Not started | - |
| 6. Institutional Catalogs & Policy Governance | 0/2 | Not started | - |
