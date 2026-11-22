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


## EXN-M01-WO-008: English-first localization and content formatting

Exile Nexus currently supports one explicit locale: **English (`en`)**. All core public interface text in the Home, static module previews, header/footer/mobile navigation, search, demo UI kit, 404 and accessible labels is sourced from the typed, versioned `src/i18n/en.json` catalog through `src/i18n/index.ts`. The existing externalized data registries remain in `src/data/routes.json` (seven route descriptions), `src/data/ui-states.json` (four status title/messages) and `src/data/search-fixtures.json` (three conspicuously fictional preview records). They are text data contracts, not independently approved translated game datasets.

**English-first is not a language selector.** A visitor whose browser sends `pt-BR` still sees the approved English copy and `html lang="en"`. No region negotiation, machine translation, locale routing, paid translation service, hreflang, other language packs or third-party game statistics have been added. The UI retains the approved original visual words and design tokens. The logo wordmark `EXILE NEXUS`, numeric section indices and decorative symbols are intentionally invariant names/symbols, not unlocalized sentences.

`formatMessage(template, params)` in `src/i18n/format.ts` is deterministic and **plain text only**. It rejects missing/extra parameters, malformed placeholders and non-finite numeric values; it does not evaluate HTML or use user data to construct markup. The documented placeholders are `{name}` for Home previews and `{count}` for the one/many local search results. Search ranking, rights filtering, route paths and URL/sitemap publication policy have not changed.

The fail-closed English coverage script audits public-facing components and pages for undeclared `copy.*` keys, **literal English JSX/HTML content**, HTML in messages, invalid templates, source-file omissions and incomplete route/feedback/synthetic registries. It is deliberately limited to the 14 explicitly listed files under `PUBLIC_FILES`; new user-visible files must be included as part of their own Work Order. The catalog and its referenced keys are counted in the evidence report, not assumed complete from mere file existence. If a key is removed, or a hardcoded label is introduced, the CI must fail. A brand wordmark exception is explicit and narrowly bounded.

### Verification

```sh
npm ci --no-audit --no-fund
npm run lint
npm run typecheck
npm test
npm run i18n:verify -- --output=i18n-reports/english-coverage.json
npm run build
npm run seo:verify -- --output=i18n-reports/seo-preview-report.json
npm run test:e2e
npm run perf:static
npm audit --audit-level=high
```

The dedicated read-only `.github/workflows/wo18-localization.yml` gate emits the JSON coverage artifact. Unit regression tests include invalid-placeholder, missing-key, unlocalized Astro/JSX and incomplete source fixtures, plus all previous safety contracts. Playwright verifies English copy under desktop/mobile viewports and a `pt-BR` browser, with screenshots; the pre-existing six SHA-256 UI-kit pixel baselines, keyboard/axe, reduced-motion and Lighthouse gates remain unchanged. Any legitimate visual difference must be reviewed with actual images, never silently rebaseline.

SEO remains **PREVIEW_ONLY**, all eleven compiled pages **noindex**, no public canonical origin or site deployment, and content rights R01–R14 remain unchanged. This localization increment does not grant external data rights or authorize a production release. See [EXN-M01-WO-008 Evidence Bundle](../../docs/evidence/EXN-M01-WO-008-english-localization-2026-11-08.md) and PR #157 for exact CI, findings, risks, corrections and proposed checkpoint delta.


## EXN-M01-WO-009: full-route automated accessibility and responsive release gate

The source of truth for the new automated audit is `tests/fixtures/accessibility-matrix.json`: **11 current HTML routes**, four widths **1440/768/390/320 CSS px**, WCAG 2.2 A/AA axe tag categories and six mandatory interactive states. Its validation logic, in `scripts/verify-a11y-matrix.mjs`, compares against the **actual approved route JSON** and rejects omitted/duplicated pages, missing responsive sizes, skipped WCAG tags/states, or any attempted relaxation of **zero critical/serious failures**. `tests/unit/a11y-matrix.test.mjs` contains explicit negative controls for those regressions.

`tests/e2e/accessibility-release.spec.ts` runs locally, without a third-party data service, and checks:
- **Full-page axe WCAG A/AA** on each of 11 current routes at desktop and mobile, **no violations** in the tested automated rules.
- Search empty/error and UI workshop form error/disabled/loading, including status/alert semantics, mobile-menu-open state, keyboard skip-link/focus/ArrowDown/Escape recovery.
- Reflow at 320/390/768/1440 across Home, Builds, Search and UI Kit; 200% text resize with reflow assertion and screenshot, forced-colors focus ring, reduced-motion feedback without animation.
- Actual responsive screenshots and existing six SHA-256 UI-kit visual baselines, **not** silently regenerated. A newly detected 200% text overflow in the header was corrected by enabling flex wrap and min-width handling, without changing approved tokens, navigation routes, UI copy or default screenshot hashes.
- Existing English, static SEO `PREVIEW_ONLY`, quality, Lighthouse and zero external IP/content gates remain active.

The read-only `.github/workflows/wo19-accessibility.yml` executes lint/typecheck/build/unit/negative policy checks, npm audit HIGH gate and the dedicated E2E suite; it uploads evidence. The existing broad browser CI executes the entire Playwright collection separately. Failures of either are corrections, not PASS. New pages and states must be added to the route/state matrix before claiming full automated coverage.

```sh
npm ci --no-audit --no-fund
npm run a11y:matrix
npm run lint
npm run typecheck
npm test
npm run build
npm run seo:verify
npm run test:e2e -- tests/e2e/accessibility-release.spec.ts
npm run test:e2e
npm audit --audit-level=high
```

**Important boundaries:** Automated axe checks do **not** establish full WCAG 2.2 AA certification; genuine manual NVDA, VoiceOver, TalkBack, high-contrast, mobile touch and real browser zoom checks are **NOT_RUN** until separately performed with recorded tester/date/evidence. See [manual validation checklist](../../docs/a11y-manual-checklist.md). No public deploy, domain, search indexing, external data rights R01–R14, gameplay assets, user tracking or paid services are authorized by passing this release gate. See [EXN-M01-WO-009 Evidence Bundle](../../docs/evidence/EXN-M01-WO-009-accessibility-release-gate-2026-11-08.md) and PR #159 for exact HEAD gates and residual risks.


## EXN-M01-WO-010: HIGH_ASSURANCE identity security foundation (anonymous-only)

**Important:** Exile Nexus currently has **no live identity, login, session cookies, session store, role granting, OAuth provider, CSRF endpoint, server rate limiting or user database**. The Astro application remains static and accessible to anonymous visitors; new features requiring accounts are intentionally **BLOCKED**. No account information, credentials, user tracking, private APIs, Cloudflare account or paid identity provider have been created or connected.

The source of truth for current capabilities is `src/data/identity-security-policy.json`, version 1 with `mode:"ANONYMOUS_ONLY"`, null provider/server/storage/approval values and all identity/cookie/privileged capability switches `false`. The typed `src/lib/identity-contract.ts` implements a small **read-only contract**, not security enforcement for a real server: only an exact null principal with `read_public` on one of the current 11 HTML routes returns a positive decision. Supplying a forged admin role, bearer string, non-null principal, fake session token, extra client claims or any private operation fails closed. This must **never** be interpreted as a legitimate authenticated authorization layer. Future server code will require separate approval, independent security review and request-scoped authorization.

`scripts/verify-auth-boundary.mjs` checks actual compiled pages against the route allowlist, rejects new `/login/`, `/admin/` or other unapproved account endpoints, rejects password capture/login form markup and confirms SEO `PREVIEW_ONLY`. It deliberately reports `sessionBackendVerified:false`, `logoutVerified:false`, `csrfVerified:false`, `rateLimiterVerified:false` and manual review `NOT_RUN`. A CI PASS is **not proof** of those blocked capabilities.

```sh
npm ci --no-audit --no-fund
npm run lint
npm run typecheck
npm test
npm run build
npm run identity:verify -- --output=security-reports/identity-boundary.json
npm run seo:verify
npm run test:e2e -- tests/e2e/identity-boundary.spec.ts
npm run test:e2e
npm audit --audit-level=high
```

**Tests:** `tests/unit/identity-contract.test.mjs` validates policy invariants, anonymous public navigation, and negative roles/tokens/privileged operations; `tests/unit/auth-build.test.mjs` injects fake auth routes, login forms, password inputs and SEO violations into temporary static fixture builds, and verifies blocked session/CSRF proofs remain false. `tests/e2e/identity-boundary.spec.ts` confirms cookies and storage remain empty, unauthorized login/admin paths do not exist, role query parameters never elevate, and public navigation doesn't contact external identity endpoints. `.github/workflows/wo20-identity-boundary.yml` runs these in **read-only** public PR CI without secrets, uploads JSON and browser evidence. Existing Docs/Quality/English/SEO/axe/Lighthouse checks are unchanged.

**Risk gate:** This issue is **HIGH_ASSURANCE** because privileged authentication and user data would be high risk, despite the issue's preliminary STANDARD label. The owner must separately approve a real backend/provider/session store, origin, privacy collection/retention, cookie/CSRF/rate-limit design, recovery and cost proof before implementing live sessions. Full real login/logout/CSRF/rate-limit security integration tests and independent security review are **BLOCKED / NOT_RUN**, not satisfied by these contract tests. [Security decision dossier](../../docs/identity-session-security-contracts.md) lists 14 required proofs, alternatives and reasons for deferral; [Evidence Bundle](../../docs/evidence/EXN-M01-WO-010-identity-security-contracts-2026-11-08.md) records exact HEAD, test results and checkpoint delta PROPOSED. No release/deploy/merge is authorized for this PR.

### Conditional architectural approval and fail-closed US$0 preflight (2026-11-09)

The owner approved the **design direction only** (Cloudflare BFF + D1 + Google OIDC) under EXN-DEC-0011, staged in PR #161, not a production project or permission to enable auth. Hosting choice, live account billing/quotas, OAuth production origin, LGPD/privacy/retention, strict limiter and hosted test environment remain unverified. Authentication remains `ANONYMOUS_ONLY`.

`src/data/auth-zero-cost-preflight.json` records public Cloudflare **reference** limits (Workers Free 100,000 requests/day and 10ms CPU per request; D1 Free 5m rows read/day, 100,000 written/day, 5GB total and 500MB per DB), not account-specific allocation or any approval to spend. `scripts/check-auth-preflight.mjs` always returns an explicit **BLOCKED** status until genuine external proof is independently reviewed, and is not a tool for enabling services. It rejects altered public quota values, any nonzero cost ceiling, fabricated readiness, incomplete official references, and unapproved provider/privacy/limiter settings. Its output explicitly states account billing, OAuth origin, privacy, runtime authorization and strict limiter **NOT VERIFIED**.

```sh
npm run auth:preflight -- --expect-blocked --output=security-reports/auth-preflight-blocked.json
```

This command exits successfully **only when** the preflight remains **BLOCKED and its published-reference inputs are structurally valid**. Running it without `--expect-blocked` fails deliberately. CI success is never proof of eligible free billing or authenticated sessions. See `tests/unit/auth-zero-cost-preflight.test.mjs` and [same-WO implementation plan](../../docs/plans/EXN-M01-WO-010-high-assurance-implementation-plan.md). No accounts, secrets, sessions, API handlers, database, deploy, paid features, or public SEO were introduced.
