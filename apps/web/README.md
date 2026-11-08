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

## EXN-M01-WO-004: accessible component workshop

The new `/ui-kit/` route is a **noindex/nofollow** internal demonstration. It provides original, reusable React components:

- `src/components/ui/ActionButton.tsx`: semantic button, primary/secondary/quiet variants, keyboard focus, loading/busy, disabled and real `disabled` semantics.
- `src/components/ui/TextField.tsx`: persistent label, help/error descriptions, required attribute, invalid/disabled states and stable React `useId()` wiring.
- `src/components/ui/FeedbackPanel.tsx`: loading, empty, error and success states with textual explanations, `role=status` or `role=alert`, and accessible local retry.
- `src/components/ui/UiShowcase.tsx`: local-only state transitions; no remote requests, user accounts, persistence or game data.
- `src/data/ui-states.json`: unit-tested, deterministic content contract. The gallery styling is isolated in `src/styles/ui-kit.css`, with explicit focus, reduced-motion and forced-color support.

### Testing / screenshot provenance

```sh
npm ci --no-audit --no-fund
npm run lint
npm run typecheck
npm test
npm run build
npm audit --audit-level=high
npm run test:e2e
```

Playwright loads `@axe-core/playwright@4.10.2` from the committed lockfile, checks WCAG 2.2 AA tags for the gallery in default and error/disabled states, verifies keyboard/focus/validation and runs screenshot hash regression on the full gallery. The `tests/visual/ui-kit-baselines.json` manifest records exact SHA-256 digests collected from a Chromium CI run for **empty/error states at 1440/768/390 widths**. The screenshot test captures actual PNGs and fails closed if the digest changes. When a legitimate UI change occurs, inspect and explicitly reapprove new screenshots before updating these hashes; do not blanket-regenerate baselines. Byte-exact screenshot hashes are sensitive to Chromium, OS and font changes, so such environment changes require deliberate baseline reconciliation, not a bypass.

The browser CI artifact contains screenshots, trace and HTML report with short retention. See the canonical [EXN-M01-WO-004 Evidence Bundle](../../docs/evidence/EXN-M01-WO-004-accessible-ui-states-2026-11-08.md). Full screen reader compatibility, complete site-wide manual accessibility, production performance and commercial rights clearance remain outside this WO and must not be claimed as complete.
