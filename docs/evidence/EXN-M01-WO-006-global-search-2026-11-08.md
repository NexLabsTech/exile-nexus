# EXN-M01-WO-006 — Global search and navigation contracts · Evidence Bundle

- **Owner:** NexLabsTech
- **Work Order / issue:** EXN-M01-WO-006 / [#16](https://github.com/NexLabsTech/exile-nexus/issues/16), NECESSARY, STANDARD
- **PR Draft:** [#153](https://github.com/NexLabsTech/exile-nexus/pull/153)
- **Branch:** `exn-m01-wo-006-global-search`
- **BASE SHA:** `6dbef791a557c10c7428c40d8d9d211f9823432a` (accepted checkpoint PR #152). Prerequisite #15 CLOSED, PR #151 squash accepted at `ba01dd9b083583fc422aff96b5372bcfb4f8fd90`.
- **Last tested code/docs HEAD before this bundle:** `d2401d4031767240297dfd57848dba10a8b2cb9d`. After committing this document, the PR HEAD/CI will be read back and reviewed; no self-referential Git SHA is fabricated here.
- **Administrative status:** issue #16 OPEN, PR #153 DRAFT; owner merge acceptance PENDING, checkpoint delta PROPOSED. No deploy or automatic merge.

## Context, objective and Scope

Source priority verified: `docs/checkpoint.md` → Decisions Ledger EXN-DEC-0004/0007–0010 → `docs/scope.md` → `docs/definition-of-done.md` → `docs/architecture.md` → `docs/requirements.md` → `docs/test-plan.md` → Git/test evidence.

Issue #16 is the global-search UI and navigation-contract increment. Implement a **working local preview** using the seven already approved public route descriptions and exactly three explicitly fictional fixture records; no rights-cleared external game dataset is available in the current authorized scope. **Do not claim a real game search, patch freshness, current economy, item stats or rights clearance.**

The requirements FR-CORE-001/003, FR-DATA-001/002/003, FR-CAT-001 and NFR-ACCESS/RESP/RIGHTS are respected within this limit. External datasets are intentionally **BLOCKED until rights and provenance are independently approved**, rather than spoofing unauthorized or stale data. Operational spend ceiling US$0 unchanged.

## Exact files / interfaces implemented

- `src/lib/search-contract.ts`: typed `SearchRecord`, `SearchOrigin`, `Permission`, `NavigationRoute`, `SyntheticFixture`, `SearchResponse`, deterministic accent/case-insensitive ranking, bounded results (20), query limit (80), safe-local-path validation, navigation/fixture whitelisting.
- `src/data/search-fixtures.json`: three fictional examples with synthetic source/version and no game/market facts. Source and freshness disclosure is explicit. Original `routes.json` provides seven site navigation entries.
- `src/components/search/GlobalSearch.tsx` + `src/pages/search/index.astro`: responsive, keyboard accessible `/search/` UI, query deep links using `q`, stable GET form, arrow navigation, Escape to clear/return focus, labeled search and result list, explicit empty/overlong-error state, full-site link targets, and noindex/nofollow preview. React client:load on Astro static output, no API call, storage or analytics.
- `src/styles/search.css`: original dark fantasy colors, readable labels, responsive 1440/768/390 layouts, focus indicators, reduced-motion/forced-colors.
- Narrow additions to `SiteHeader.astro`, `MobileNav.tsx`, `SiteFooter.astro`: a discoverable local search route without altering existing module/navigation behaviors.
- `tests/unit/search-contract.test.mjs`: eight deterministic positive and negative scenarios testing ranking, duplicate, diacritics, unknown/oversized query, URL/script/hidden route protection and **fail-closed for external sources even if falsely marked AUTHORIZED**. Unit tests transpile production TypeScript with the project-local locked TypeScript compiler, testing actual production pure functions.
- `tests/e2e/global-search.spec.ts`: ten browser cases for desktop/mobile nav, direct-link queries, keyboard focus/ArrowDown/Enter, synthetic source warning, empty/error recovery, no off-site requests, axe-core for matching and no-match, three responsive screenshots with reduced-motion.
- `apps/web/README.md` documents scope, contract fields, run commands, rights gate, JavaScript dependence and future adapter limits.

No new npm dependency, no `package-lock.json` update, no actual third-party content, no authentication, deployment, API, database, analytics, cookies, user profile or licensed game image. No automatic migration or new business module.

## Acceptance evidence on tested code HEAD `d2401d4...`

| Gate / requirement | Evidence | Result |
| --- | --- | --- |
| Navigation UI and deep links | [Playwright #42541013835](https://github.com/NexLabsTech/exile-nexus/actions/runs/42541013835), desktop/mobile, forms, arrows/Enter/Escape | PASS |
| Fake/unsafe sources rejected | 8 unit tests, including external `AUTHORIZED` claim rejection, unsafe URL and synthetic labeling | PASS |
| Static shell preservation | Existing 23 Playwright cases + new 10 = **33 E2E**; visual-baseline checks, reduced-motion and axe-core still enabled | PASS |
| Accessibility of search | axe WCAG 2.2 A/AA tags on search area with and without result + accessible form/status | PASS (automated tested subset only) |
| Responsive screenshots | 1440/768/390 actual full-page PNG, visually inspected desktop/mobile; no horizontal overflow | PASS |
| Quality baseline | [Quality #42541013718](https://github.com/NexLabsTech/exile-nexus/actions/runs/42541013718), 28 Python + 19 Node tests, npm ci, ESLint, TypeScript strict, Astro build and npm audit high | PASS |
| Documentation and secrets heuristics | [Docs #42541013709](https://github.com/NexLabsTech/exile-nexus/actions/runs/42541013709) | PASS |
| Performance and motion regression | [Local Lighthouse #42541013677](https://github.com/NexLabsTech/exile-nexus/actions/runs/42541013677) 4 mobile local runs, static budgets, and separate browser reduced-motion and CPU×6 | PASS |
| Final HEAD after this evidence commit | Rerun all four workflows and read diff/ruleset | PENDING until verified |

- [Browser artifact #13640869462](https://github.com/NexLabsTech/exile-nexus/actions/runs/42541013835/artifacts/13640869462): 3 new search full-page PNGs plus previous screenshots and HTML report. Downloaded and visually inspected actual compiled UI desktop and 390px mobile. CPU×6 navigation hydration measured **1,500 ms** and menu response **148 ms**.
- [Lighthouse artifact #13640659291](https://github.com/NexLabsTech/exile-nexus/actions/runs/42541013677/artifacts/13640659291): local Home/Builds only, 4 JSON/HTML reports downloaded and parsed. **100/100** Lighthouse laboratory performance/accessibility/best-practices/SEO on the two static routes; maximum LCP **1,822.9 ms**, CLS=0, TBT=0. **Not field/production Web Vitals or Lighthouse search-page certification**.
- Local static gzip budget report: JS 75,804 B ≤ 200,000 B; CSS 9,640 B ≤ 100,000 B; Home HTML 5,144 B ≤ 16,000 B; raw total 418,919 B ≤ 2,500,000 B. No budget raised or bypassed.

## Rights, provenance, accessibility, security and residual risks

- The search index has **no external source**; two allowed origins only: `internal-navigation/INTERNAL` and `synthetic/SYNTHETIC`. All external records fail closed, including forged `AUTHORIZED` flags. An authorized-source adapter is NOT IMPLEMENTED; separate R01–R14 legal and source-contract review, provenance, license, patch/league, frequency, observation time/expiry, consent and purpose must be evidenced before integrating. Static route freshness means current *site build*, not live observations. Synthetic examples do not have actual observedAt/expiresAt or valid real-game data.
- UI keyboard and axe tests cover exercised routes/states; **manual full-site screen-reader audit NOT RUN**. The mock search relies on client JavaScript to filter; the ordinary navigation remains functional without JS. `noindex` prevents intended indexing, not unauthorized access.
- Unit search filters source/path before text ranking; React escapes text and emits only local route anchors. No secrets, remote network, billing, data capture, user search logs, imported fonts/images or GGG IP. Runtime package dependencies and lockfile unchanged.
- `npm audit --audit-level=high` exits 0 and reports seven existing MODERATE transitives, no HIGH/CRITICAL known from executed gate. Previous Lighthouse lab CLI transitive dependency lock caveat continues. Rights clearance of third-party game data, external datasets, production domain, actual live sources, full production deployment and cross-module search cannot be claimed as complete.
- No runtime optimization or UI component broad refactoring; original dark-fantasy independent brand direction and accepted CSS tokens preserved. Screenshots and artifacts have seven-day retention and links may expire.
- **Correction Delta:** A pre-CI source inspection caught incorrect mobile route current-state regex after adding the nav search link. Corrected to literal comparison before tests. A11y idref target on empty/error state was made persistent before CI. No lint, E2E, rights or axe rules were removed or disabled; first complete CI PASS without post-failure corrections.
- Metrics from simulated GitHub runners depend on environment and are not user-observed RUM.

## Proposed Checkpoint Delta (do not promote)

After separate owner-approved protected normal squash merge of this PR only, record static local search UI, seven navigation records and three fictional fixtures, rights-fail-closed typed contracts, keyboard/URL query behavior, 8 new unit cases, 10 new E2E browser cases (33 total), responsive screenshots, local budget report and the continuing seven MODERATE findings. **Do not** mark live Path of Exile 2 data search, external rights, production deployment, real game prices or module completion as implemented. Source Pack updates require own audited checkpoint reconciliation.

**STOP:** PR #153 must stay DRAFT, issue #16 OPEN, `main` unchanged; no merge, deploy, new data adapter, commercial use, paid service, bypass or next Work Order. Independent reviewer not required by solo governance but this audit is explicitly not independent. Final verdict depends on exact final HEAD CI.
