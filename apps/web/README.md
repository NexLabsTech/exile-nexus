# Exile Nexus public shell (EXN-M01-WO-003)

This is the **first functional shell only**, not the finished companion portal. Static Astro 7.4.7 + React 19.3.1 islands were accepted in EXN-DEC-0008; the visual pilot boards are reference-only per EXN-DEC-0010.

## Supported and unsupported behavior

- Home, shared navigation, seven static deep-linkable placeholder sections, and a custom 404 screen.
- Keyboard-accessible mobile menu; skip link; semantic headings; original geometry and a no-affiliation disclaimer.
- No authentication, API, database, persistence, user profiling, actual game facts, live prices, builds, tree or AI calls.
- Illustrative copy is clearly labeled PREVIEW / NOT LIVE. No GGG art or proprietary screenshot is embedded or loaded.
- Current implementation **does not publish** the approved pilot PNGs as live assets; original CSS artwork and favicon are independently drawn.

## Development

From `apps/web` with Node 22 and the committed exact npm lockfile:

```sh
npm ci --no-audit --no-fund
npm run lint
npm run typecheck
npm test
npm run build
npm audit --audit-level=high
npm run dev
```

Run browser tests after installing the matching Chromium in the supported Playwright version:

```sh
npx playwright install chromium
npm run build
npm run test:e2e
```

Screenshots must be captured at 1440, 768 and 390px wide and attached as CI artifacts; compare to the **visual references** in `design/references`, accounting for the fact that those boards are composite art rather than exact-page snapshots.

## Exit criteria and rights

No deployment, service connection or paid integration authorized by this Work Order. Every release of third-party game content requires permission recorded per source and purpose under R01–R14. Pages must pass keyboard checks, accessible names, responsive screenshots, high-severity vulnerability gate and explicit owner acceptance. Visual tokens are imported from the repository's approved `design/tokens.css`; local decorative colors in this shell are *not* changes to those canonical tokens.
