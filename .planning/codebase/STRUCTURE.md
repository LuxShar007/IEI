# Codebase Structure

**Analysis Date:** 2026-09-20

## Directory Layout

```
IEI/
├── .agent/                 # GSD configuration, workflows, templates, and agent skills
├── .planning/              # Project planning documents and codebase map
│   └── codebase/           # Codebase intelligence and analysis documents
├── public/                 # Static assets, icons, institutional crests
├── src/                    # Application source code
│   ├── app/                # Next.js App Router routes and pages
│   │   ├── about/          # /about route
│   │   ├── activities/     # /activities route
│   │   ├── admin/          # /admin route
│   │   ├── contact/        # /contact route
│   │   ├── events/         # /events list and [slug] detail pages
│   │   ├── gallery/        # /gallery route
│   │   ├── join/           # /join route (redirects to /)
│   │   ├── m/              # /m/[memberId] QR credential landing route
│   │   ├── resources/      # /resources route
│   │   ├── team/           # /team list and [member] detail pages
│   │   ├── verify/         # /verify membership lookup route
│   │   ├── layout.tsx      # Root HTML layout and provider shell
│   │   ├── not-found.tsx   # Custom 404 page
│   │   └── page.tsx        # Institutional home page
│   ├── components/         # Reusable React components
│   │   ├── hero/           # Hero section and identity animation
│   │   ├── home/           # Homepage signature interactive blocks
│   │   ├── layout/         # Navigation, Footer, SkipLink, Scroll providers
│   │   ├── members/        # Member profile cards and badges
│   │   ├── motion/         # Animation wrappers and transitions
│   │   ├── team/           # Team grid, domain views, group picture
│   │   ├── ui/             # Core design system primitives
│   │   └── verification/   # Member lookup search & result cards
│   ├── data/               # Static typed datasets and catalogs
│   │   ├── activities.ts   # Activities catalog
│   │   ├── events.ts       # Events catalog
│   │   ├── gallery.ts      # Visual gallery items
│   │   ├── members.ts      # Member roster with IDs and credentials
│   │   ├── navigation.ts   # Site navigation routes
│   │   ├── principles.ts   # Chapter engineering principles
│   │   ├── resources.ts    # Technical resources catalog
│   │   ├── site.ts         # Institutional metadata and config
│   │   ├── stages.ts       # Sequential storytelling stage definitions
│   │   └── team.ts         # Faculty, Core Council, and 7 Domain structures
│   ├── lib/                # Shared utilities, animations, SEO, and types
│   │   ├── animations/     # Framer motion variants
│   │   ├── seo/            # Metadata generator and JSON-LD schema builder
│   │   ├── theme/          # ThemeContext provider and hooks
│   │   ├── types/          # TypeScript domain type definitions
│   │   └── utils/          # Utility functions (cn, formatters)
│   └── styles/             # Global CSS styling
│       ├── globals.css     # CSS reset, utilities, reduced motion
│       └── tokens.css      # Design token system (colors, typography, spacing)
├── next.config.ts          # Next.js runtime configuration
├── package.json            # Dependencies and npm scripts
└── tsconfig.json           # TypeScript configuration and path aliases
```

## Directory Purposes

**`src/app/`:**
- Purpose: Next.js App Router routing directory.
- Contains: `layout.tsx`, `page.tsx`, `*.module.css` scoped styles, and nested route folders.
- Key files:
  - `src/app/layout.tsx`: Root layout injecting `ThemeProvider`, `SmoothScrollProvider`, `Navbar`, and `Footer`.
  - `src/app/page.tsx`: Main institutional landing page assembling signature hero and storytelling blocks.
  - `src/app/verify/page.tsx`: Membership verification portal.
  - `src/app/m/[memberId]/page.tsx`: Direct QR landing page for member verification.

**`src/components/`:**
- Purpose: Modular React presentation and interaction components.
- Subdirectories:
  - `hero/`: Identity intro animation and visualizer.
  - `home/`: `BlueprintVisual`, `EditorialComposition`, `SequentialStorytelling`, `ImpactMetrics`, `PinnedStory`.
  - `team/`: `TeamInteractivePicture`, `FacultySection`, `DomainTeamSection`.
  - `verification/`: `VerificationLookup` search box and credential badge.
  - `ui/`: Design primitives (`Button`, `Card`, `Badge`, `Background`, `Cursor`, `Skeleton`, `Reveal`, `Magnetic`).

**`src/data/`:**
- Purpose: Single source of truth for chapter records, structured as typed TypeScript constants.
- Key files:
  - `src/data/team.ts`: Faculty advisors (Dr. Shubhangi Kharache, Prof. Jasmin Hirani), Core Council status, and the 7 domain teams.
  - `src/data/members.ts`: Membership records with unique IDs and roles.
  - `src/data/site.ts`: Site-wide metadata, social links, institutional contacts.

**`src/lib/`:**
- Purpose: Core application libraries, helper utilities, and type declarations.
- Subdirectories:
  - `theme/`: ThemeContext (`ThemeContext.tsx`).
  - `types/`: Domain interfaces (`member.ts`, `team.ts`, `event.ts`, `activity.ts`, `navigation.ts`).
  - `seo/`: OpenGraph and JSON-LD builders (`metadata.ts`, `jsonLd.ts`).
  - `animations/`: Motion curves and variants (`variants.ts`).
  - `utils/`: Class name merger (`cn.ts`) and formatting helpers (`format.ts`).

**`src/styles/`:**
- Purpose: Complete CSS design token architecture.
- Key files:
  - `src/styles/tokens.css`: Strict Helvetica typography scale, spacing tokens, and color palettes for Theme A (Default) and Theme B (Alternative).
  - `src/styles/globals.css`: Base layer, smooth scrolling styles, and accessible media query rules.

## Key File Locations

**Entry Points:**
- `src/app/layout.tsx`: Main layout wrapper.
- `src/app/page.tsx`: Homepage entry.

**Configuration:**
- `next.config.ts`: Redirects, remote image patterns, compiler options.
- `tsconfig.json`: TypeScript compiler options with `@/*` path mapping.
- `package.json`: NPM package metadata, scripts, and dependencies.

**State & Context:**
- `src/lib/theme/ThemeContext.tsx`: Active theme state and persistence.

**Data & Content:**
- `src/data/team.ts`: Team hierarchy, faculty advisors, and domain rosters.
- `src/data/members.ts`: Member credential database.

## Naming Conventions

**Files:**
- React components: `PascalCase.tsx` (e.g. `VerificationLookup.tsx`, `Hero.tsx`).
- CSS modules: `[ComponentName].module.css` or `[feature].module.css`.
- Data files: `kebab-case.ts` or lowercase singular/plural (e.g. `team.ts`, `members.ts`, `site.ts`).
- Type definition files: `lowercase.ts` (e.g. `member.ts`, `team.ts`).
- Utilities: `camelCase.ts` or `kebab-case.ts` (e.g. `format.ts`, `cn.ts`).

**Directories:**
- Route folders: `lowercase` or dynamic `[param]` (e.g. `events/`, `[slug]/`, `m/[memberId]/`).
- Component folders: `PascalCase` or `lowercase` feature names (e.g. `components/ui/Button/`, `components/hero/`).

## Where to Add New Code

**New Route / Page:**
- Add folder under `src/app/[route-name]/` with `page.tsx` and optional `[route-name].module.css`.

**New Component:**
- Create component under `src/components/[category]/[ComponentName]/[ComponentName].tsx`.
- Add associated styles in `[ComponentName].module.css`.

**New Data Records:**
- Update or add data in `src/data/` adhering to schemas in `src/lib/types/`.

---

*Structure analysis: 2026-09-20*
*Update after directory reorganizations or major additions*
