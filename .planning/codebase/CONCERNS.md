# Codebase Concerns

**Analysis Date:** 2026-09-20

## Tech Debt

**Data Layer Placeholders:**
- **Issue:** Several catalogs in `src/data/` (`members.ts`, `gallery.ts`, `events.ts`, `resources.ts`) contain placeholder data. The Core Council structure in `src/data/team.ts` is explicitly marked as `status: 'pending_induction'`.
- **Why:** Official rosters, ratified core council executive appointments, and high-resolution event photographs will be supplied by faculty leadership later.
- **Impact:** Site must remain visually complete with realistic editorial placeholders while avoiding fabricated claims or official misinformation.
- **Fix approach:** Update `src/data/` files incrementally as official department rosters and council appointments are approved.

**Automated Testing Absence:**
- **Issue:** No test framework (Vitest, Jest, Playwright) is currently configured.
- **Why:** Initial phase focused on visual fidelity, token architecture, and signature interactive experiences.
- **Impact:** Regressions in route navigation, theme switching, or member verification logic can only be detected via manual checks or build failures.
- **Fix approach:** Introduce Vitest for unit testing of utilities and verification lookup, and Playwright for cross-theme regression testing.

## Known Considerations & Fragile Areas

**Dual-Theme CSS Variable Synchronization:**
- **Issue:** All UI components rely on CSS variables declared across `:root, [data-theme="default"]` and `[data-theme="alternative"]` in `src/styles/tokens.css`.
- **Why:** Required dual-theme experience (Default: white/black/blue/orange; Alternative: black/white/#664EEA).
- **Impact:** If a developer introduces hardcoded colors or misses defining an equivalent token in either theme block, components will appear broken or have unreadable contrast in one of the themes.
- **Fix approach:** Strictly enforce using defined CSS tokens; review all new styles in both Default and Alternative themes before committing.

**Wildcard Remote Image Pattern:**
- **Issue:** `next.config.ts` configures `images.remotePatterns` with `hostname: '**'`.
- **Why:** Accommodates arbitrary external image URLs during prototype and development stages.
- **Impact:** Less restrictive image proxying; remote images may have slow response times or broken links if external hosts change.
- **Fix approach:** When final official photography is organized, host assets locally in `public/` or restrict `remotePatterns` to trusted institutional CDNs.

## Security Considerations

**Public Member Verification Portal:**
- **Risk:** Exposure of student personal identification or private contact information.
- **Current mitigation:** The verification registry in `src/data/members.ts` only exposes public institutional fields (Member ID, Full Name, Department/Domain, Role, Session Year, and Valid Status). Phone numbers, student registration numbers, and private credentials are never stored or displayed.
- **Recommendations:** Ensure future database or API integrations for verification strictly sanitize student records before serialization.

**Client-Side Theme Hydration:**
- **Risk:** Flash of unstyled content (FOUC) or hydration mismatch warning if local storage theme differs from SSR initial state.
- **Current mitigation:** `suppressHydrationWarning` is configured on `<html>` in `src/app/layout.tsx`, and `ThemeContext.tsx` applies the data attribute directly on mount.

## Performance Bottlenecks & Optimization

**Smooth Scrolling & Custom Cursor Overhead:**
- **Problem:** `Lenis` smooth scroll and `CustomCursor` utilize continuous requestAnimationFrame / mousemove event listeners.
- **Impact:** Can increase CPU and battery drain on low-spec mobile devices or laptops in power-saving mode.
- **Current mitigation:** `CustomCursor` is hidden on touch devices (`@media (pointer: coarse)`) and respects `prefers-reduced-motion`.
- **Recommendations:** Verify FPS stability and CPU usage on varied mobile profiles.

---

*Concerns analysis: 2026-09-20*
*Update as technical debt is addressed or new issues emerge*
