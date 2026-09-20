<!-- GSD:project-start source:PROJECT.md -->
## Project

**IEI SIES GST (ECS)**

Official student chapter website for the Electronics and Computer Science Engineering Department of SIES Graduate School of Technology. It delivers a premium institutional digital experience featuring dual visual themes, signature interactive experiences, sequential storytelling, structured domain team hierarchies, and member verification.

**Core Value:** Deliver a world-class institutional digital presence that elevates the ECS student chapter through precision engineering aesthetics, strict typography, seamless dual-theming, and verifiable digital membership.

### Constraints

- **Typeface**: Helvetica is the locked global typeface across all screens and components.
- **Color Palettes**:
  - DEFAULT: white / black / blue / orange
  - ALTERNATIVE: black / white / #664EEA
- **Domain Hierarchy**: Technical, Industry Outreach & Admin, Publicity, Creative, Design, Media, Editorial structured strictly into Mentor, Head, Coordinator, Volunteer tiers.
- **Content Integrity**: Do not invent official names, photographs, events, links, or council members.
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Languages
- TypeScript 5.7.3 - All application code, configuration (`next.config.ts`), type definitions (`src/lib/types/`), and data schemas (`src/data/`)
- CSS / Vanilla CSS Modules - Styling system (`src/styles/tokens.css`, `src/styles/globals.css`, and component-scoped `*.module.css` files)
- HTML5 / JSX - Component rendering via React 19 JSX syntax
## Runtime
- Node.js (v20+ recommended LTS)
- Modern Evergreen Browsers (Chrome, Firefox, Safari, Edge) with CSS custom properties and ES2017+ support
- npm
- Lockfile: `package-lock.json` present
## Frameworks
- Next.js 15.2.0 (App Router) - React full-stack framework with React Server Components (RSC) and Client Components
- React 19.0.0 & React DOM 19.0.0 - Core UI library
- None configured (No testing runner, assertion library, or E2E framework currently in `package.json`)
- Next.js Turbopack / Webpack compiler
- TypeScript Compiler (`tsc --noEmit` via Next.js)
- ESLint 9.21.0 with `eslint-config-next` 15.2.0
## Key Dependencies
- `framer-motion` (^12.4.7) - Micro-interactions, cinematic intro, reveal triggers, and page transitions
- `lenis` (^1.3.26) - Smooth kinetic scrolling orchestrator wrapped in `SmoothScrollProvider`
- `lucide-react` (^1.16.0) - Institutional and UI iconography
- Next.js built-ins (`next/font`, `next/image`, `next/link`, `next/navigation`)
## Configuration
- No mandatory `.env` variables required currently (static dataset and client-side credential verification)
- Optional deployment base URL / analytics environment variables
- `next.config.ts` - Next.js configuration with `outputFileTracingRoot`, image remote patterns (`https://**`), and `/join` redirect to `/`
- `tsconfig.json` - Target `ES2017`, `moduleResolution: bundler`, strict mode enabled, path alias `@/* -> ./src/*`
## Platform Requirements
- Cross-platform: Windows, macOS, Linux with Node.js runtime
- Local dev server via `npm run dev`
- Vercel, Node.js container, or static export host supporting Next.js 15 App Router
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Naming Patterns
- React Components: `PascalCase.tsx` (e.g. `MemberProfile.tsx`, `Hero.tsx`, `VerificationLookup.tsx`)
- CSS Modules: `[ComponentName].module.css` (e.g. `VerificationLookup.module.css`, `Hero.module.css`)
- Type definitions: `lowercase.ts` (e.g. `src/lib/types/member.ts`, `src/lib/types/team.ts`)
- Data files: `lowercase.ts` (e.g. `src/data/team.ts`, `src/data/members.ts`)
- Utility functions: `camelCase.ts` (e.g. `src/lib/utils/format.ts`, `src/lib/utils/cn.ts`)
- Exported as named exports (e.g. `export const Hero: React.FC<HeroProps> = ...` or `export function Hero()`)
- Dynamic route page components exported as default exports (`export default function Page()`)
- Utility & helper functions: `camelCase` (e.g. `formatDate`, `constructMetadata`, `toggleTheme`)
- Event handlers: `handle[Action]` or `on[Action]` (e.g. `handleSearch`, `handleFilterChange`)
- Types & Interfaces: `PascalCase` with no `I` prefix (e.g. `Member`, `FacultyLeader`, `DomainDefinition`, `Event`)
- Union types for restricted values: `lowercase` or `snake_case` (e.g. `Theme = 'default' | 'alternative'`, `MemberRole = 'mentor' | 'head' | 'coordinator' | 'volunteer'`)
## Code Style & Formatting
- **Vanilla CSS Modules:** Use component-scoped `*.module.css` files alongside component files.
- **Design Tokens:** Always consume design tokens from `src/styles/tokens.css` via CSS variables (`var(--bg-primary)`, `var(--fg-primary)`, `var(--accent)`, `var(--font-sans)`). Never hardcode ad-hoc hex colors directly in CSS modules unless defining tokens.
- **Typography:** Strict adherence to Helvetica (`var(--font-sans)`).
- **Responsive Design:** Mobile-first or fluid clamp scaling (e.g. `clamp(1.5rem, 4vw, 3rem)`) for typography and section spacing (`var(--section-padding-md)`).
- **Theme Support:** Both Theme A (`default`) and Theme B (`alternative`) must be natively supported by relying exclusively on CSS variables.
- **Directive Usage:** Apply `'use client'` at the top of components that use browser APIs, state (`useState`, `useEffect`), or motion libraries.
- **Server Components:** Keep page shells and static content server-rendered wherever possible.
- **Accessibility (a11y):**
## Import Organization
## Content & Institutional Data Guidelines
- **No Fabricated Information:** Do not invent unofficial faculty names, council members, past achievements, or event dates.
- **Placeholders:** Official structures that are pending formal ratification (e.g., Core Council) use explicit pending flags (`status: 'pending_induction'`) rather than fake member records.
- **Disallowed Features:** "Join IEI" and "Join Chapter" actions are explicitly prohibited; any such routes are redirected to `/`.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## Pattern Overview
- **Hybrid Rendering Model:** Server-rendered structure and metadata paired with client-side interactivity (`'use client'` components for animations, cursor, theme switching, smooth scrolling, and dynamic lookup).
- **Two Visual Themes:** Strict dual-theme system (Default: white / black / blue / orange vs. Alternative: black / white / #664EEA) controlled via `data-theme` attribute on root element.
- **Strict Typography System:** Locked global Helvetica typography scale defined in CSS variables (`--font-sans: "Helvetica Neue", Helvetica, Arial, sans-serif`).
- **Signature Visual Experiences:** Multi-stage sequential storytelling (LinusBio-inspired), blueprint-to-reality visual transitions, interactive team group photograph, and M3-inspired editorial compositions.
## Layers
- Purpose: Next.js App Router entry points, static generation, metadata declaration, and layout nesting.
- Contains: `layout.tsx`, `page.tsx` for each institutional route, dynamic route handlers (`[slug]`, `[member]`, `[memberId]`), and error boundaries (`not-found.tsx`).
- Depends on: Component layer and Data layer.
- Purpose: Modular, reusable visual building blocks divided by feature area:
- Depends on: Design tokens (`tokens.css`), motion utilities (`variants.ts`), and theme context.
- Purpose: Client-side persistent state and UX coordination.
- Contains:
- Depends on: React Context API and browser APIs.
- Purpose: Strongly-typed static content and schemas representing faculty, domains, members, events, activities, resources, and site configuration.
- Contains:
- Used by: Route handlers and presentation components.
- Purpose: Tokenized CSS system with zero CSS-in-JS runtime overhead and accessible Framer Motion variants.
- Contains:
## Data Flow
## Key Abstractions
- Represents student chapter members with verified IDs (`IEI-GST-YYYY-XXX`), roles, domain affiliations, credentials, and QR verification URLs.
- Structure for the 7 official domains (Technical, Industry Outreach & Admin, Publicity, Creative, Design, Media, Editorial) supporting 4-tier hierarchy (Mentor, Head, Coordinator, Volunteer).
- Semantic CSS variable naming (`--bg-primary`, `--fg-primary`, `--accent`, `--signal`, `--border-default`) enabling seamless two-theme switching.
## Entry Points
- `src/app/layout.tsx`: Root HTML shell and provider wrapper.
- `src/app/page.tsx`: Main institutional landing page.
- `next.config.ts`: Next.js build-time entry point and routing rules.
## Error Handling
- Custom 404 handler in `src/app/not-found.tsx`.
- Graceful fallbacks in verification lookup for invalid or unverified member queries.
- `suppressHydrationWarning` on `<html>` tag to accommodate client-side theme initialization from `localStorage`.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
