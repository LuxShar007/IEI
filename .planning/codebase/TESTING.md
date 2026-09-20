# Testing Patterns

**Analysis Date:** 2026-09-20

## Test Framework

**Current State:**
- **No automated test framework installed.**
- The project currently relies on static type analysis, ESLint, and Next.js production build verification:
  - TypeScript strict type checking (`tsconfig.json`)
  - ESLint 9 with Next.js configuration (`eslint-config-next`)

**Run Commands:**
```bash
npm run lint          # Run ESLint validation across project
npm run build         # Next.js production compilation and type-check
```

## Recommended Test Strategy for Implementation

When adding automated testing to this Next.js 15 App Router project, the recommended setup is:

**1. Unit & Component Testing:**
- **Framework:** Vitest with `@testing-library/react` and `jsdom`
- **Focus:**
  - Data integrity & formatters (`src/lib/utils/format.ts`)
  - Verification lookup algorithm (`src/components/verification/VerificationLookup.tsx`)
  - Theme switching behavior (`src/lib/theme/ThemeContext.tsx`)
  - Domain structure integrity (`src/data/team.ts`, `src/data/members.ts`)

**2. End-to-End (E2E) Testing:**
- **Framework:** Playwright
- **Focus:**
  - Theme toggle execution (verifying `data-theme="default"` vs `data-theme="alternative"` styling)
  - Navigation flow across all primary sections (Home, About, Activities, Events, Team, Gallery, Resources, Contact, Verify)
  - Member verification query flow (valid vs invalid ID lookup)
  - Mobile viewport responsiveness and drawer navigation
  - Redirect validation (e.g. confirming `/join` permanently redirects to `/`)

## Test File Organization (Proposed)

**Location:**
- Unit tests co-located with source or under `tests/unit/`:
  - `src/lib/utils/format.test.ts`
  - `src/components/verification/VerificationLookup.test.tsx`
- E2E tests in `tests/e2e/`:
  - `tests/e2e/navigation.spec.ts`
  - `tests/e2e/theme.spec.ts`
  - `tests/e2e/verify.spec.ts`

## Verification Checklist

Before deploying or submitting changes:
- [ ] `npm run lint` passes without errors or unhandled warnings
- [ ] `npm run build` succeeds cleanly with all static routes generated
- [ ] Member lookup handles valid (`IEI-GST-2025-042`) and invalid queries gracefully
- [ ] Visual inspection of both Default and Alternative themes
- [ ] Verification that "Join IEI" / "Join Chapter" buttons or routes are not present

---

*Testing analysis: 2026-09-20*
*Update when automated test runners are installed*
