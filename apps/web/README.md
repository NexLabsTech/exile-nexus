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


## EXN-M01-WO-005: measured motion and performance

This Work Order measures **only** the existing static shell and approved UI workshop. Its budgets are versioned in [`performance-budgets.json`](performance-budgets.json). The gates do not use external data, analytics providers, hosted reports, live servers or game sources.

**Reproduce the local, deterministic static asset budget** after the locked build:

```sh
npm ci --no-audit --no-fund
npm run lint
npm run typecheck
npm test
npm run build
npm run perf:static
```

`scripts/verify-budget.mjs` computes gzip level-9 sizes of compiled script bundles, styles and Home HTML plus the uncompressed total build bytes, checks for Home/Build Hub/UI Workshop paths, blocks missing assets or symlinks and exits nonzero on a breach. Run `node scripts/verify-budget.mjs --output=perf-reports/static-budget.json` to produce detailed machine-readable evidence; `tests/unit/performance-budget.test.mjs` includes tests for missing required routes, excessive size and invalid/disabled limits.

**Lighthouse CI on local compiled pages:** the GitHub Action `.github/workflows/wo15-performance.yml` uses `@lhci/cli@0.16.0` and the local config `lighthouserc.cjs`, runs two mobile-simulated measurements each for Home and Build Hub and checks performance, accessibility, LCP, CLS and TBT. `upload.target=filesystem` stores JSON/HTML reports in `lhci-reports/` **without publishing them to an outside performance service**. The CLI version is pinned but its ephemeral npm installation uses the registry-resolved transitive dependency graph; this is NOT a fully committed integrity-locked CLI dependency tree. GitHub Actions reports include the runner and actual metrics for inspection.

`tests/e2e/performance-motion.spec.ts` additionally runs Chromium at 390×844 with CPU slowdown 6× and simulated 200 ms latency, ~1.2 Mbps down and 0.6 Mbps up. It separately measures time to Astro React-island hydration and menu click response with explicit limits, checks keyboard/Escape and horizontal overflow, and verifies that `prefers-reduced-motion: reduce` removes animations/transitions without hiding content or breaking input. Other E2E tests and six versioned component screenshot SHA-256 baselines remain active.

**Measured initial lab result on [browser run #42538969067](https://github.com/NexLabsTech/exile-nexus/actions/runs/42538969067) and [Lighthouse #42538969095](https://github.com/NexLabsTech/exile-nexus/actions/runs/42538969095):** 23 browser tests PASS; low-end hydration 1,385 ms and menu response 173 ms; four Lighthouse runs reported 100/100 performance and accessibility for the two **local static** pages. Static gzip results: JS 72,934 B; CSS 8,200 B; Home HTML 5,103 B; total uncompressed dist 386,750 B. **These are CI laboratory measurements, not real user Core Web Vitals, production hosting performance, or an assurance for future modules.** Lighthouse/Chromium versions, runner load, internet and operating systems may change measured results; review future changes before relaxing gates. Existing seven MODERATE transitive npm audit findings are tracked; no HIGH/CRITICAL findings reported in the applicable `npm audit --audit-level=high` gate.

See [EXN-M01-WO-005 Evidence Bundle](../../docs/evidence/EXN-M01-WO-005-motion-performance-2026-11-08.md) for exact CI run links, corrections, risk register and checkpoint delta proposal. Deployment remains unauthorized.


## EXN-M01-WO-006: global navigation search, currently demo-only

`/search/` is a responsive, noindex page with an accessible React search form. It searches the seven approved **internal navigation routes** and three explicitly **fictional** demonstration records, drawn from `src/data/routes.json` and `src/data/search-fixtures.json`. All results link only to known public local routes. No game items, gems, classes, mechanics, markets, patch announcements or live results are indexed. No remote request, user profile, persistence, private search log, API credential or external upload exists.

### Contract and rights gate

`src/lib/search-contract.ts` declares `SearchRecord` (`id,title,summary,category,href,origin,permission,sourceLabel,sourceVersion,observedAt,expiresAt,evidenceId`) and a deterministic source-safe ranker. Two permitted origins only:
- `internal-navigation/INTERNAL`: original site-owned route title and description; freshness is the **static build**, not an external observation.
- `synthetic/SYNTHETIC`: explicit fixture records, with fictional labels and no real timestamp/patch provenance.

Every `external` record is rejected **even if untrusted input claims `AUTHORIZED`**. Connecting a third-party or game source requires its own approved R01–R14 rights evidence, purpose/frequency/attribution/license/provenance/expiration contract and adapter Work Order. A string flag is not evidence of permission. There is deliberately **no external-data adapter** in this release.

The index is deterministic, bounded to 20 results, normalizes case and accents and rejects unsafe/private/out-of-scope route targets. Queries over 80 characters fail closed with a visible error. Unknown queries have a clear empty state. URLs are local `/search/?q=...` links, with no analytics or export; JavaScript is required for the client-side filtered demonstration, while the ordinary navigation remains usable without it. The route is `noindex,nofollow` and that is **not** an access-control measure. This is not full search over licensed game datasets.

### Tests and release guard

`tests/unit/search-contract.test.mjs` loads the production TypeScript logic with the locally installed TypeScript transpiler and tests indexing, ordering, case/diacritics, absent matches, too-long queries, forged external-rights markers, unsafe hrefs and deduplication. `tests/e2e/global-search.spec.ts` validates keyboard navigation, direct query links, mobile menu, synthetic labels, empty/error states, absence of third-party requests, axe WCAG tags and screenshots at 1440/768/390. Existing shell, component visual-baseline, reduced-motion and Lighthouse checks remain enabled.

```sh
npm ci --no-audit --no-fund
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
npm run perf:static
npm audit --audit-level=high
```

All future modules and real datasets require separate acceptance. See [EXN-M01-WO-006 Evidence Bundle](../../docs/evidence/EXN-M01-WO-006-global-search-2026-11-08.md). No deploy, merge or new commercial IP rights are authorized by this WO.


## EXN-M01-WO-007: SEO, structured data and indexability (fail closed)

The **source of truth** for search indexing is `src/data/publication-policy.json`. Its current state is `PREVIEW_ONLY`, `approvedSiteOrigin: null`, `approvalEvidence: null` because the project has **no verified public production domain or owner-approved publication rights** in this Work Order. The app is not deployed. Do not invent an official URL or third-party affiliation. `noindex,nofollow` is a crawler instruction, **not security or privacy access control**.

### Build behavior

- Every compiled route receives unique, descriptive HTML `title` and `description`, `html lang=en` and the fail-closed robots meta tag.
- With no verified origin: **all 11 static pages remain `noindex,nofollow`**; no absolute canonical URL or JSON-LD is emitted. A generated `/robots.txt` responds `User-agent: * / Disallow: /`; `/sitemap.xml` is a valid XML `urlset` containing **zero** `<loc>` entries. These files are preparation artifacts, not evidence of live indexability.
- `src/lib/seo-policy.ts` defines the future **conditional** published policy. The original editorial Home is eligible only after a *separate owner-reviewed* origin/publication decision carrying `EXN-SEO-PUBLISH-...` evidence and a verified HTTPS origin. If and only if approved, the Home gets exactly one canonical URL, original `WebSite` / `WebPage` JSON-LD, indexable robots, an exact sitemap entry and robots sitemap directive.
- The seven game-tool module placeholders, local search page with **fictional examples**, internal UI kit and 404 remain **noindex even under an approved origin**, until individually rights-cleared and accepted. No real game item, class, patch or price is published.
- Changing the JSON values alone **is not legal approval or DNS ownership evidence**. A future Work Order must independently verify and document domain ownership, URL/DNS behavior, rights and deployment before permitting publication. Current review process must reject an unsanctioned change to `APPROVED` even if a user invents an approval string.

### Reproducible gates

```sh
npm ci --no-audit --no-fund
npm run lint
npm run typecheck
npm test
npm run build
npm run seo:verify -- --output=seo-reports/indexability.json
npm run test:e2e
npm audit --audit-level=high
```

`tests/unit/seo-policy.test.mjs` exercises the actual TypeScript policy with nine positive/negative cases, including invented origin, protocol, private host, overlapping routes, unsafe paths, JSON-LD and sitemap rules; `tests/unit/seo-build.test.mjs` covers five **negative and positive** compiled-output cases. `tests/e2e/seo-indexability.spec.ts` checks robots, sitemap, distinct titles/descriptions across all 11 compiled pages, no canonical or schema leaks, external-request absence and screenshots at 1440/768/390. The read-only CI workflow `.github/workflows/wo17-seo.yml` runs all static output checks and saves a machine-readable JSON report. Existing E2E, axe, budget and Lighthouse checks continue to run.

The simulated approved origin in **unit tests only** (`https://illustrative-seo-fixture.org`) is a fictional test value, **not an actual approved domain or deployment destination**, and is never written into the built site. Static previews are not a production release. See [EXN-M01-WO-007 Evidence Bundle](../../docs/evidence/EXN-M01-WO-007-seo-indexability-2026-11-08.md).
