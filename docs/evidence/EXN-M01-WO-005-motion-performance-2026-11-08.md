# EXN-M01-WO-005 — Motion and Performance Budget Evidence Bundle

- **Owner:** NexLabsTech
- **WO / Issue:** EXN-M01-WO-005 / [#15](https://github.com/NexLabsTech/exile-nexus/issues/15), NECESSARY / STANDARD
- **Draft PR:** [#151](https://github.com/NexLabsTech/exile-nexus/pull/151)
- **Branch:** `exn-m01-wo-005-motion-performance`
- **BASE SHA:** `7e539ee2848090e51b70c9608f90dd6ca4b77cbb`, accepted M01-WO-004 checkpoint PR #150; #14 CLOSED; #149 MERGED as `81dda433cb2115fa71d7e627fb2b0cb1ed79876f`.
- **Last tested source HEAD before documentation commit:** `0648cb86df39fede0c7134eeab9a5aa00586cbd9`. Final HEAD must be read from PR metadata after this evidence commit and rechecked, **not claimed inside its own Git commit**.
- **Administrative state:** PR Draft; owner merge approval PENDING, issue #15 OPEN, no deploy/hosting/third-party rights/cost authorization. Checkpoint Delta only proposed.

## Objective, context lock and scope

Create measured motion/performance budgets and enforceable regressions on the existing **static** Astro 7.4.7 / React 19.3.1 shell: no new business feature, protected third-party asset, remote game data, tracking, auth, persistence, server or deployment. Motion must not block input or degrade accessibility and all budget claims must come from executed code.

Precedence: checkpoint → accepted Decisions Ledger EXN-DEC-0004/0007/0008/0009/0010 → Scope → Definition of Done → Architecture → Requirements → Test Plan → code/Git/CI evidence. No changes to previously accepted `design/tokens.css` or R01–R14 rights matrix. All new visible data remains synthetic.

### Files and architectural boundaries

- `apps/web/performance-budgets.json`: source-of-truth numeric thresholds for script/CSS/HTML/dist size, Lighthouse categories and lab metrics, low-end phone CPU/network, hydration, input response and motion duration.
- `apps/web/scripts/verify-budget.mjs`: deterministic gzip aggregate and raw build sizes; fail closed on missing required static routes, missing script/style, invalid threshold, symlink or exceeded budget. Optional JSON evidence output; no external requests.
- `apps/web/tests/unit/performance-budget.test.mjs`: five positive/negative tests: nominal, missing route, excessive JS, invalid/zero limit, excessive total build.
- `apps/web/lighthouserc.cjs`: Lighthouse CI local static server, exactly Home and Build Hub, two simulated mobile runs each, assertions on performance/accessibility, LCP/CLS/TBT; target=`filesystem` (never third-party upload).
- `.github/workflows/wo15-performance.yml`: public GitHub-hosted runner, read-only permissions, pinned upstream Actions, Node 22 + locked app npm dependencies, local build, size check, Chromium install and pinned `@lhci/cli@0.16.0` on-demand lab CLI. Artifact output only, seven-day retention.
- `apps/web/tests/e2e/performance-motion.spec.ts`: no-motion accessibility and keyboard, bounded hover duration, low-end 390×844 device with CPU×6 and emulated network; explicit hydrate-vs-click timing and screenshot/trace.
- `apps/web/package.json` (one `perf:static` script), `apps/web/.gitignore` (generated report dirs), `apps/web/README.md` and this Evidence Bundle.
- **Outside scope:** any API/database, LCP field telemetry, real user monitoring, production domain, live benchmarks of future game modules, paid Lighthouse vendors, broad redesign, auth, external images, rights changes, other WOs, deploy.

## Acceptance and CI evidence on last code HEAD `0648cb86...`

| Requirement / gate | Observed result | Status |
| --- | --- | --- |
| Issue #15: measured budget | Deterministic asset size gate and negative fixtures; generated JSON report, no bypass | PASS on code HEAD |
| Issue #15: Lighthouse lab | Home + Build Hub, 2 mobile simulations each, four LHR JSON/HTML, local filesystem only | PASS on code HEAD |
| Issue #15: low-end device | CPU 6×, 200ms RTT, ~1.2Mbps download; hydration 1,385ms, menu 173ms under measured budget | PASS on code HEAD |
| NFR-ACCESS-001: reduced motion | CSS computed animation/transition=0, scroll behavior auto; keyboard, status controls continue functioning | PASS on code HEAD |
| NFR-RESP-001 | Existing responsive E2E and screenshots run with the new low-end scenario | PASS on code HEAD |
| NFR-ARCH-001, NFR-RIGHTS-001 | No live data, no JS dependency added to production app or user profiling; no changes to game rights | Source diff checked, licensing outside scope |
| NFR-COST-001 | Read-only public GitHub Actions and locally run Lighthouse | No paid service selected; global account billing NOT VERIFIED |
| NFR-TRACE-001 | WO #15, PR #151, branch, baselines, CI, this Evidence Bundle | Documented |
| Final HEAD validation after this docs commit | Must re-run all CI and verify diff/ruleset | PENDING |

**Executable code HEAD reports:**
- [Docs validation #42538968943](https://github.com/NexLabsTech/exile-nexus/actions/runs/42538968943): `completed/success`.
- [Quality baseline #42538968966](https://github.com/NexLabsTech/exile-nexus/actions/runs/42538968966): `completed/success`. 28 Python baseline regression tests, eleven Node unit tests (including five new budget tests), npm ci, ESLint, TypeScript strict, static build and `npm audit --audit-level=high` PASS; audit still reports **seven MODERATE**, no HIGH/CRITICAL in that gate.
- [Playwright #42538969067](https://github.com/NexLabsTech/exile-nexus/actions/runs/42538969067): `completed/success`, **23 E2E PASS**, covering established UI/axe and new reduced-motion, hover, throttled input. Low-end interactive hydration `EXN_LOW_END_HYDRATION_MS 1385`; click `EXN_LOW_END_MENU_RESPONSE_MS 173`. [Browser artifact #13640343548](https://github.com/NexLabsTech/exile-nexus/actions/runs/42538969067/artifacts/13640343548): 16 full/element screenshots plus HTML report, including slow-phone menu.
- [Lighthouse/size #42538969095](https://github.com/NexLabsTech/exile-nexus/actions/runs/42538969095): `completed/success`. [Artifact #13640368422](https://github.com/NexLabsTech/exile-nexus/actions/runs/42538969095/artifacts/13640368422) includes **four raw Lighthouse report JSONs + HTML and the static-budget JSON**, independently inspected after downloading ZIP. All four reported performance, accessibility, best-practices and SEO **100/100** for local Home/Builds; highest LCP measured **1,662.1 ms**, CLS **0** and TBT **0**. These numbers are **synthetic Lighthouse laboratory scores**, not real user data, not a guarantee of all pages/production conditions.
- **Static report (exact measured output):** script gzip 72,934 B ≤ 200,000 B; CSS gzip 8,200 B ≤ 100,000 B; Home HTML gzip 5,103 B ≤ 16,000 B; total raw dist 386,750 B ≤ 2,500,000 B.
- Actions artifact storage is transient (7 days); store links and summaries in the Evidence Bundle and do not assert permanence.

## Corrections within the same Work Order/PR

1. **CD01**, initial compile/test-gate failure: the Node unit fixture used `structuredClone` and `Buffer` without eslint-known bindings; made native `Buffer` import explicit and replaced cloning with a typed shallow object. Did **not** disable or bypass lint.
2. **CD02**, first Playwright failure: direct ESM JSON import lacked Node `type: json` import attribute. Switched to explicit local `readFileSync(new URL(...))` with `URL` from `node:url`. No network or external data.
3. **CD03**, low-end mobile route had a lost click while React's `client:load` island was still hydrating under CPU×6/network throttling. Corrected **test orchestration, not UI business logic**: enforce a separately measurable max 12,000ms from page navigation to fully hydrated Astro island, then measure real click-to-visible navigation against 2,200ms. Observed 1,385/173ms; no workaround disabling the test, no concealment of the initial reproduction.
4. **CD04**, static script scanner regex was initially escaped incorrectly and corrected before the size job executed, with its five unit tests and genuine build success. No thresholds were relaxed to force PASS.

Previous browser run #42538737819 was **FAIL** (premature interaction), despite concurrent Lighthouse #42538737953 PASS. It must not be represented as passing. The corrected browser #42538969067 is the passing evidence.

## Safety, budget methodology, open limits

- Lighthouse CI runs on **local compiled static fixtures**, `@lhci/cli@0.16.0` pinned as a command-line version. Its transient npm-resolved transitive graph is NOT protected by the application's committed integrity lockfile. This is a reproducibility/security **residual risk**; the CLI is never a production runtime package, and the benchmark runner is read-only. No server upload or external credentials.
- Budget thresholds are **conservative starting guardrails** and not proof of Core Web Vitals in the field; Lighthouse simulated mobile and Playwright CPU/network profiles differ from real devices. No real mobile hardware, thermal throttling, field RUM, Lighthouse performance on all future modules or backend timings were verified.
- Accessibility is verified for reduced motion/keyboard and the previously approved axe gallery cases, **not** a comprehensive professional manual screen-reader audit. Browser screenshots from prior WO remain approved.
- The seven MODERATE npm transitive findings remain a tracked maintenance risk; no HIGH/CRITICAL known from executed app audit. Do not use `npm audit fix --force` or expand dependency cleanup without a separate scoped WO.
- Image rights, GGG trademarks/brand, screenshots of game content, data source provenance and future source integrations remain subject to R01–R14. No user data, authentication, cookies, analytics, remote game endpoints, hidden subscriptions, paid APIs, hosting or deployment in scope.
- Actual core static bundle is small, but the Site shell remains preliminary, not fully functional or deployed. No claims of production release readiness.

## Proposed Checkpoint Delta (DO NOT PROMOTE)

After explicit owner acceptance and protected squash merge on exact SHA, record the motion and asset budgets, Lighthouse lab reports for two static routes, five new budget unit tests, three new browser cases, measured 6× phone hydration/input, and the remaining seven MODERATE findings. Preserve the approved Astro/React shell, accessible UI #14, rights matrices and static-only limitations. Any next Work Order requires its own Source Check, branch, CI, Evidence Bundle and owner acceptance. No automatic merge/deploy permitted for this PR.

**STOP:** PR #151 must remain DRAFT; issue #15 remains OPEN; no mutation of main, no merge/deploy, no progress to later issues. The final audit must cite exact HEAD CI of this evidence-only update, with a factual BR-PT verdict.
