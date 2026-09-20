# Coding Conventions

**Analysis Date:** 2026-09-20

## Naming Patterns

**Files:**
- React Components: `PascalCase.tsx` (e.g. `MemberProfile.tsx`, `Hero.tsx`, `VerificationLookup.tsx`)
- CSS Modules: `[ComponentName].module.css` (e.g. `VerificationLookup.module.css`, `Hero.module.css`)
- Type definitions: `lowercase.ts` (e.g. `src/lib/types/member.ts`, `src/lib/types/team.ts`)
- Data files: `lowercase.ts` (e.g. `src/data/team.ts`, `src/data/members.ts`)
- Utility functions: `camelCase.ts` (e.g. `src/lib/utils/format.ts`, `src/lib/utils/cn.ts`)

**Components:**
- Exported as named exports (e.g. `export const Hero: React.FC<HeroProps> = ...` or `export function Hero()`)
- Dynamic route page components exported as default exports (`export default function Page()`)

**Functions:**
- Utility & helper functions: `camelCase` (e.g. `formatDate`, `constructMetadata`, `toggleTheme`)
- Event handlers: `handle[Action]` or `on[Action]` (e.g. `handleSearch`, `handleFilterChange`)

**Types & Interfaces:**
- Types & Interfaces: `PascalCase` with no `I` prefix (e.g. `Member`, `FacultyLeader`, `DomainDefinition`, `Event`)
- Union types for restricted values: `lowercase` or `snake_case` (e.g. `Theme = 'default' | 'alternative'`, `MemberRole = 'mentor' | 'head' | 'coordinator' | 'volunteer'`)

## Code Style & Formatting

**CSS & Styling Principles:**
- **Vanilla CSS Modules:** Use component-scoped `*.module.css` files alongside component files.
- **Design Tokens:** Always consume design tokens from `src/styles/tokens.css` via CSS variables (`var(--bg-primary)`, `var(--fg-primary)`, `var(--accent)`, `var(--font-sans)`). Never hardcode ad-hoc hex colors directly in CSS modules unless defining tokens.
- **Typography:** Strict adherence to Helvetica (`var(--font-sans)`).
- **Responsive Design:** Mobile-first or fluid clamp scaling (e.g. `clamp(1.5rem, 4vw, 3rem)`) for typography and section spacing (`var(--section-padding-md)`).
- **Theme Support:** Both Theme A (`default`) and Theme B (`alternative`) must be natively supported by relying exclusively on CSS variables.

**React & Next.js Patterns:**
- **Directive Usage:** Apply `'use client'` at the top of components that use browser APIs, state (`useState`, `useEffect`), or motion libraries.
- **Server Components:** Keep page shells and static content server-rendered wherever possible.
- **Accessibility (a11y):**
  - Include semantic HTML elements (`<main>`, `<nav>`, `<header>`, `<footer>`, `<section>`).
  - Provide `aria-label` attributes on icon buttons, theme toggles, and search inputs.
  - Support `prefers-reduced-motion` media queries for animations (defined in `tokens.css` and `globals.css`).
  - Include `SkipLink` for keyboard navigation.

## Import Organization

**Import Order:**
1. React and Next.js built-ins (`react`, `next/link`, `next/image`, `next/navigation`)
2. External packages (`framer-motion`, `lucide-react`, `lenis`)
3. Internal library utilities, types, and hooks (`@/lib/types/...`, `@/lib/theme/...`, `@/lib/utils/...`)
4. Data definitions (`@/data/...`)
5. Components (`@/components/...`)
6. CSS Modules (`import styles from './Component.module.css'`)

**Example Pattern:**
```tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight } from 'lucide-react';

import type { Member } from '@/lib/types/member';
import { useTheme } from '@/lib/theme/ThemeContext';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/Button/Button';

import styles from './MemberCard.module.css';
```

## Content & Institutional Data Guidelines

- **No Fabricated Information:** Do not invent unofficial faculty names, council members, past achievements, or event dates.
- **Placeholders:** Official structures that are pending formal ratification (e.g., Core Council) use explicit pending flags (`status: 'pending_induction'`) rather than fake member records.
- **Disallowed Features:** "Join IEI" and "Join Chapter" actions are explicitly prohibited; any such routes are redirected to `/`.

---

*Conventions analysis: 2026-09-20*
*Update after style guide or linting changes*
