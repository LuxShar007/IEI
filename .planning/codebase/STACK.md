# Technology Stack

**Analysis Date:** 2026-09-20

## Languages

**Primary:**
- TypeScript 5.7.3 - All application code, configuration (`next.config.ts`), type definitions (`src/lib/types/`), and data schemas (`src/data/`)

**Secondary:**
- CSS / Vanilla CSS Modules - Styling system (`src/styles/tokens.css`, `src/styles/globals.css`, and component-scoped `*.module.css` files)
- HTML5 / JSX - Component rendering via React 19 JSX syntax

## Runtime

**Environment:**
- Node.js (v20+ recommended LTS)
- Modern Evergreen Browsers (Chrome, Firefox, Safari, Edge) with CSS custom properties and ES2017+ support

**Package Manager:**
- npm
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- Next.js 15.2.0 (App Router) - React full-stack framework with React Server Components (RSC) and Client Components
- React 19.0.0 & React DOM 19.0.0 - Core UI library

**Testing:**
- None configured (No testing runner, assertion library, or E2E framework currently in `package.json`)

**Build/Dev:**
- Next.js Turbopack / Webpack compiler
- TypeScript Compiler (`tsc --noEmit` via Next.js)
- ESLint 9.21.0 with `eslint-config-next` 15.2.0

## Key Dependencies

**Critical:**
- `framer-motion` (^12.4.7) - Micro-interactions, cinematic intro, reveal triggers, and page transitions
- `lenis` (^1.3.26) - Smooth kinetic scrolling orchestrator wrapped in `SmoothScrollProvider`
- `lucide-react` (^1.16.0) - Institutional and UI iconography

**Infrastructure:**
- Next.js built-ins (`next/font`, `next/image`, `next/link`, `next/navigation`)

## Configuration

**Environment:**
- No mandatory `.env` variables required currently (static dataset and client-side credential verification)
- Optional deployment base URL / analytics environment variables

**Build:**
- `next.config.ts` - Next.js configuration with `outputFileTracingRoot`, image remote patterns (`https://**`), and `/join` redirect to `/`
- `tsconfig.json` - Target `ES2017`, `moduleResolution: bundler`, strict mode enabled, path alias `@/* -> ./src/*`

## Platform Requirements

**Development:**
- Cross-platform: Windows, macOS, Linux with Node.js runtime
- Local dev server via `npm run dev`

**Production:**
- Vercel, Node.js container, or static export host supporting Next.js 15 App Router

---

*Stack analysis: 2026-09-20*
*Update after major dependency changes*
