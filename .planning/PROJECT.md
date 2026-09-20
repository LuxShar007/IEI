# IEI SIES GST (ECS)

## What This Is

Official student chapter website for the Electronics and Computer Science Engineering Department of SIES Graduate School of Technology. It delivers a premium institutional digital experience featuring dual visual themes, signature interactive experiences, sequential storytelling, structured domain team hierarchies, and member verification.

## Core Value

Deliver a world-class institutional digital presence that elevates the ECS student chapter through precision engineering aesthetics, strict typography, seamless dual-theming, and verifiable digital membership.

## Requirements

### Validated

- ✓ Dual visual theme system (Default: white/black/blue/orange, Alternative: black/white/#664EEA) — existing
- ✓ Locked Helvetica typography system and token scale — existing
- ✓ Next.js 15 App Router foundation with Lenis smooth scrolling — existing
- ✓ Institutional routing architecture: Home, About, Activities, Events, Team, Gallery, Resources, Contact, Member Verification — existing
- ✓ Member verification lookup engine and direct QR credential routing (`/m/[memberId]`) — existing
- ✓ Faculty leadership structure (Dr. Shubhangi Kharache — HOD, Prof. Jasmin Hirani — Student Branch Coordinator) — existing
- ✓ 7 domain team definitions with 4-tier hierarchy (Mentor, Head, Coordinator, Volunteer) — existing
- ✓ Permanent exclusion and redirection of "Join IEI" / "Join Chapter" routes to `/` — existing

### Active

- [ ] Cinematic IEI identity intro animation polish and entrance pacing
- [ ] Default blueprint → structure → reality visual progression
- [ ] Alternative dot → wireframe → 3D → material visual interactive simulation
- [ ] Interactive team group photograph with member highlight hotspots
- [ ] Individual member profiles with full editorial layout
- [ ] QR code generator and verification card export for member profiles
- [ ] LinusBio-inspired sequential storytelling scrollytelling refinement
- [ ] M3-inspired editorial visual composition refinement
- [ ] Core Council appointment integration when faculty ratification completes
- [ ] Ingestion of official event photography, domain rosters, and resource links as supplied

### Out of Scope

- "Join IEI" / "Join Chapter" features or forms — Explicit institutional instruction; chapter membership and inductions are managed through internal institutional protocols.
- Fabricated or unofficial data — Core council appointments, student achievements, or event catalogs must never be hallucinated; pending induction status is used until officially ratified.
- Ad-hoc typography / non-Helvetica typefaces — Helvetica is the locked global brand typeface across all themes.

## Context

- Student chapter under the Institution of Engineers (India) operating within the Electronics and Computer Science Department at SIES GST, Navi Mumbai.
- Built on Next.js 15 App Router, React 19, Framer Motion, and Lenis for kinetic smooth scrolling.
- Codebase contains fully configured design token foundations, responsive layouts, and typed data catalogs ready for official asset ingestion.

## Constraints

- **Typeface**: Helvetica is the locked global typeface across all screens and components.
- **Color Palettes**:
  - DEFAULT: white / black / blue / orange
  - ALTERNATIVE: black / white / #664EEA
- **Domain Hierarchy**: Technical, Industry Outreach & Admin, Publicity, Creative, Design, Media, Editorial structured strictly into Mentor, Head, Coordinator, Volunteer tiers.
- **Content Integrity**: Do not invent official names, photographs, events, links, or council members.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Dual Theme via CSS Variables | Instant theme toggle with zero hydration overhead and synchronized dark/light tokens | ✓ Good |
| Locked Helvetica Typography | Preserves institutional authority, modernist clarity, and cross-platform consistency | ✓ Good |
| Redirect /join to Home | Strictly enforces chapter protocol excluding self-serve membership signup | ✓ Good |
| In-Memory Typed Credential Registry | Fast, privacy-preserving client lookup without exposing student personal data | ✓ Good |
| Scrollytelling Architecture | Implements LinusBio and M3 editorial visual storytelling for student engagement | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-09-20 after initialization*
