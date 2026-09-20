# Architecture

**Analysis Date:** 2026-09-20

## Pattern Overview

**Overall:** Modern Jamstack / Institutional Web Application built on Next.js 15 App Router with Client-Side Hydration for Rich Motion and Interactions.

**Key Characteristics:**
- **Hybrid Rendering Model:** Server-rendered structure and metadata paired with client-side interactivity (`'use client'` components for animations, cursor, theme switching, smooth scrolling, and dynamic lookup).
- **Two Visual Themes:** Strict dual-theme system (Default: white / black / blue / orange vs. Alternative: black / white / #664EEA) controlled via `data-theme` attribute on root element.
- **Strict Typography System:** Locked global Helvetica typography scale defined in CSS variables (`--font-sans: "Helvetica Neue", Helvetica, Arial, sans-serif`).
- **Signature Visual Experiences:** Multi-stage sequential storytelling (LinusBio-inspired), blueprint-to-reality visual transitions, interactive team group photograph, and M3-inspired editorial compositions.

## Layers

**1. Routing & Page Layer (`src/app/`):**
- Purpose: Next.js App Router entry points, static generation, metadata declaration, and layout nesting.
- Contains: `layout.tsx`, `page.tsx` for each institutional route, dynamic route handlers (`[slug]`, `[member]`, `[memberId]`), and error boundaries (`not-found.tsx`).
- Depends on: Component layer and Data layer.

**2. Component Layer (`src/components/`):**
- Purpose: Modular, reusable visual building blocks divided by feature area:
  - `layout/`: Global navigational chrome (`Navbar`, `Footer`, `SkipLink`, `SmoothScrollProvider`, `Section`).
  - `hero/`: Cinematic intro, hero banner, interactive identity visualizer.
  - `home/`: Sequential storytelling, blueprint visualizers, impact metrics, pinned story.
  - `team/`: Interactive team group photograph, domain filters, member card grids.
  - `members/`: Individual member profile and card presentations.
  - `verification/`: Membership lookup and validation card interface.
  - `ui/`: Design primitives (`Button`, `Card`, `Badge`, `Background`, `Cursor`, `Skeleton`, `Reveal`, `Icons`).
- Depends on: Design tokens (`tokens.css`), motion utilities (`variants.ts`), and theme context.

**3. State & Context Layer (`src/lib/theme/`, `src/components/layout/`):**
- Purpose: Client-side persistent state and UX coordination.
- Contains:
  - `ThemeContext.tsx`: Theme toggling and local storage synchronization (`default` vs `alternative`).
  - `SmoothScrollProvider.tsx`: Lenis smooth scrolling integration with React lifecycle.
- Depends on: React Context API and browser APIs.

**4. Data & Domain Modeling Layer (`src/data/`, `src/lib/types/`):**
- Purpose: Strongly-typed static content and schemas representing faculty, domains, members, events, activities, resources, and site configuration.
- Contains:
  - Types: `member.ts`, `team.ts`, `event.ts`, `activity.ts`, `navigation.ts`.
  - Datasets: `members.ts`, `team.ts`, `events.ts`, `activities.ts`, `resources.ts`, `gallery.ts`, `site.ts`, `stages.ts`, `principles.ts`.
- Used by: Route handlers and presentation components.

**5. Styling & Motion Layer (`src/styles/`, `src/lib/animations/`):**
- Purpose: Tokenized CSS system with zero CSS-in-JS runtime overhead and accessible Framer Motion variants.
- Contains:
  - `tokens.css`: Typography, colors, spacing, borders, shadows, and transitions for both themes.
  - `globals.css`: Reset, base styles, utility classes, and reduced-motion fallbacks.
  - `variants.ts`: Standardized fade, reveal, stagger, and zoom animation definitions.

## Data Flow

**Page Request Lifecycle:**
1. User requests route (e.g. `/team` or `/m/IEI-GST-2025-042`).
2. Next.js App Router matches route in `src/app/`.
3. Root `layout.tsx` applies HTML attributes, theme context, smooth scroll provider, and global navigation.
4. Page component imports static typed data from `src/data/` based on params.
5. Interactive components mount on the client with Framer Motion animations and Lenis scroll listener.
6. User interactions (theme toggle, member search, interactive team picture hover) update component or context state.

**Theme Switching Flow:**
1. User clicks theme toggle in `Navbar`.
2. `toggleTheme()` in `ThemeContext.tsx` invokes `startTransition`.
3. Sets `document.documentElement.setAttribute('data-theme', theme)`.
4. Saves selection in `localStorage` under `iei-theme-preference`.
5. CSS variables in `tokens.css` dynamically switch all colors, gradients, and borders instantly without re-rendering the DOM tree.

## Key Abstractions

**Member & Verification Model (`src/lib/types/member.ts`):**
- Represents student chapter members with verified IDs (`IEI-GST-YYYY-XXX`), roles, domain affiliations, credentials, and QR verification URLs.

**Domain Definition Model (`src/lib/types/team.ts`):**
- Structure for the 7 official domains (Technical, Industry Outreach & Admin, Publicity, Creative, Design, Media, Editorial) supporting 4-tier hierarchy (Mentor, Head, Coordinator, Volunteer).

**Theme Token Contract (`src/styles/tokens.css`):**
- Semantic CSS variable naming (`--bg-primary`, `--fg-primary`, `--accent`, `--signal`, `--border-default`) enabling seamless two-theme switching.

## Entry Points

- `src/app/layout.tsx`: Root HTML shell and provider wrapper.
- `src/app/page.tsx`: Main institutional landing page.
- `next.config.ts`: Next.js build-time entry point and routing rules.

## Error Handling

- Custom 404 handler in `src/app/not-found.tsx`.
- Graceful fallbacks in verification lookup for invalid or unverified member queries.
- `suppressHydrationWarning` on `<html>` tag to accommodate client-side theme initialization from `localStorage`.

---

*Architecture analysis: 2026-09-20*
*Update after structural or architectural changes*
