# External Integrations

**Analysis Date:** 2026-09-20

## APIs & External Services

**External Data APIs:**
- None. The current application runs on a local, typed dataset located in `src/data/` (events, activities, members, team, gallery, resources).

**Email / Communication:**
- Static institutional contact links:
  - Faculty correspondence (`hod.ecs@siesgst.ac.in`, `jasmin.hirani@siesgst.ac.in`)
  - Official student chapter contact channels configured via `src/data/site.ts`

**Remote Images / Media Assets:**
- Configured in `next.config.ts` via `images.remotePatterns` accepting `protocol: 'https'` and `hostname: '**'`.
- Supports remote photography, Unsplash stock previews, and member avatar CDNs.

## Data Storage

**Databases:**
- None configured in code. Member records, domain teams, faculty leadership, and event catalogs are statically declared in TypeScript data files:
  - `src/data/members.ts`
  - `src/data/team.ts`
  - `src/data/events.ts`
  - `src/data/activities.ts`
  - `src/data/gallery.ts`
  - `src/data/resources.ts`

**File Storage:**
- Local static assets served from `public/` directory (if populated) and Next.js asset pipeline.

**Client-Side Persistence:**
- `localStorage`:
  - Key `iei-theme-preference` used in `src/lib/theme/ThemeContext.tsx` to persist user theme choice (`default` vs `alternative`).

## Authentication & Identity

**Auth Provider:**
- No user authentication / login portal (public institutional digital portal).
- Member verification mechanism implemented via `src/components/verification/VerificationLookup.tsx` and `src/app/m/[memberId]/page.tsx`:
  - Validates chapter member IDs against `src/data/members.ts` registry.
  - Supports direct QR-code navigation to `/m/[memberId]` for on-demand profile and certificate credential verification.

## Monitoring & Observability

**Error Tracking:**
- None configured (standard browser console error logging and Next.js error boundaries).

**Analytics:**
- None currently installed.

## CI/CD & Deployment

**Hosting Platform:**
- Configured for Next.js App Router deployment (compatible with Vercel, Netlify, or Node.js server container).

---

*Integrations analysis: 2026-09-20*
*Update after adding external APIs or backend services*
