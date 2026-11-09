# EXN-M01-WO-009 — Accessibility and responsive release gate · Evidence Bundle

- **Repo:** NexLabsTech/exile-nexus
- **Work Order / issue:** EXN-M01-WO-009 / [#19](https://github.com/NexLabsTech/exile-nexus/issues/19) · NECESSARY · STANDARD
- **PR:** [#159](https://github.com/NexLabsTech/exile-nexus/pull/159), **DRAFT / UNMERGED**
- **Branch:** `exn-m01-wo-009-accessibility-release-gate`
- **BASE SHA:** `a100d074b2c49916e475e0dd7881214a305685b0`, checkpoint #158 accepted after #18 CLOSED, PR #157 integrated at `cb9925c23db0b90bc8b32085519cfe1d3d7f232d`.
- **Implementation+first-correction HEAD:** `53a21a9fb0af01ea90b8e07b0bee1b8e4e904b1a` (before screenshot assertion evidence and README).
- **Last documentation HEAD before this file:** `6519a21a96fd873842c23fa18b583c54a938c1be`.
- **Final test HEAD:** to be obtained by GitHub PR read-back after this evidence commit, not embedded speculatively in a self-referential Git file.
- **Admin state:** issue #19 OPEN, PR #159 DRAFT, checkpoint delta PROPOSED; **no** squash merge/deploy/domain/rights/expense authorized for this PR.

## Context Lock / canonical hierarchy

At BASE `a100d074...`, the critical files were fingerprinted:
- `docs/checkpoint.md` blob `a7ef699f46a72dd7487db4b0735637c304b60bec`
- `docs/decisions-ledger.md` blob `84fa64db4758dcab6f284147c23c62ed8a9e9274`
- `docs/scope.md` blob `86ec944036f007300fff4057e3cdf18755a4d463`
- `docs/definition-of-done.md` blob `536d254f7e35fff4fc46d7175ea877e4086b0174`
- `docs/architecture.md` blob `649767db871b011ecb8ba31189dd9a565582cfa5`
- `docs/requirements.md` blob `14a8766f3a9a5431822b59b18441d9fd0edb548d`
- `docs/test-plan.md` blob `23b37c686a5fda06d7a38ab2221eab87e4a06563`

Precedence: accepted checkpoint → accepted decisions/ADRs → Scope → DoD → Architecture → Requirements → Test Plan → Git/code/test evidence. Approved architecture Astro 7.4.7 + React 19.3.1 islands and strict TypeScript, dark-fantasy independent visuals, R01–R14 rights, zero required spend, protected main and `PREVIEW_ONLY` SEO remain unchanged.

## Objective / Requirements / Scope

Issue #19 requires a reproducible **release gate** showing no known critical accessibility failures and UI readable with effects disabled, plus axe E2E and a manual keyboard checklist. This is a limited automation increment: **automated WCAG 2.2 A/AA checks are not a certification of full WCAG conformance, and manual testing remains NOT_RUN**. No live gaming data, marketplace, external API, account, public site deployment or new product features.

**In-scope deliverables:**
- `apps/web/tests/fixtures/accessibility-matrix.json`: exact 11 static HTML paths (Home, seven feature placeholders, search, UI kit and 404); 1440/768/390/320 viewports; axe A/AA tags WCAG 2.0/2.1/2.2; six interactive states; thresholds **zero serious/critical**; explicit human manual `NOT_RUN`.
- `apps/web/scripts/verify-a11y-matrix.mjs` and `tests/unit/a11y-matrix.test.mjs`: compare all routes against live route registry and fail closed for omitted/duplicated path, missing 320 reflow, missing WCAG tags/states, relaxed severity threshold, or fabricated manual PASS. Six new negative/positive unit cases.
- `apps/web/tests/e2e/accessibility-release.spec.ts`: 45 new Playwright cases, 22 full-page axe checks (11 routes at desktop and mobile), dynamic search empty/error, UI form invalid/disabled/loading, expanded mobile menu, keyboard focus/skip/Escape, forced colors, reduced motion, four routes × four viewport widths, 200% text-only resize and evidence screenshots.
- `apps/web/src/styles/site.css`: **one narrowly scoped correction** for an actually reproduced header overflow on text resized to 200%; header flex container wraps and desktop nav shrinks/wraps instead of overflowing. No default font, color, layout token, navigation content or approved visual snapshot altered.
- `apps/web/package.json` exposes `a11y:matrix` with no dependency or lockfile changes.
- `.github/workflows/wo19-accessibility.yml`: pinned checkout/setup/upload Actions, read-only, npm ci/lint/typecheck/unit/build/SEO check/npm audit HIGH gate, full dedicated Playwright suite and downloadable screenshots/trace. Existing Quality, Docs, Browser (all E2E), English, SEO and Lighthouse gates remain on.
- `docs/a11y-manual-checklist.md`: repeatable real keyboard, NVDA, VoiceOver, TalkBack, actual browser zoom, OS reduced-motion, forced-colors and touch validation table; all human tasks **NOT_RUN** unless separately evidenced by tester/device/date.
- `apps/web/README.md`: documented workflow and limitations; this Evidence Bundle.

**Out of Scope:** broad redesign, rebaseline, new app modules/data, GGG/game assets and rights, localization beyond English, paid tools, new domain/public indexability, backend, auth, deploy, security bypass, telemetry, or moving to next WO.

## Executed initial negative and correction evidence

**Initial test run:** [Accessibility #42547376099](https://github.com/NexLabsTech/exile-nexus/actions/runs/42547376099) on earlier code HEAD `7e61baabbd3d53ead227772fb2211595bc8e4cc6` **FAILED** 1/45. Genuine defect: text-only root font size 200% at desktop 1440 CSS px caused document scrollWidth **1759px**, exceeding width **1441px**. Screenshot [failed browser artifact #13643248840](https://github.com/NexLabsTech/exile-nexus/actions/runs/42547376099/artifacts/13643248840) was downloaded and inspected; desktop navigation/header was truncated horizontally. The other 44 tests (11-route axe scans, mobile state tests, 320px reflow, keyboard and forced-colors) passed.

**Correction Delta 01:** `src/styles/site.css` added `flex-wrap:wrap` to existing header flex container and `min-width:0; flex-wrap:wrap` to desktop navigation, preserving normal-mode design and allowing large text to reflow without clipping. Kept the original 200% overflow assertion unchanged. Added a full-page evidence screenshot to the 200% test; no test removed or xfail/skip/soft assertion, contrast gate relaxed or visual baseline re-generated. [Corrected dedicated #42547747713](https://github.com/NexLabsTech/exile-nexus/actions/runs/42547747713) **45/45 PASS**. [Existing whole-app browser #42547747624](https://github.com/NexLabsTech/exile-nexus/actions/runs/42547747624) **89/89 PASS** (44 previously accepted + 45 new), and all six existing UI Kit visual SHA-256 baselines remained **byte-identical**; low-end CPU×6 hydration **1635ms**, menu response **220ms**. These two runs test the first code-only correction HEAD `53a21a9...`, **not** the final docs/evidence HEAD.

**Other same correction HEAD checks:** [Docs #42547747632](https://github.com/NexLabsTech/exile-nexus/actions/runs/42547747632), [Quality #42547747619](https://github.com/NexLabsTech/exile-nexus/actions/runs/42547747619), [English #42547747662](https://github.com/NexLabsTech/exile-nexus/actions/runs/42547747662), [SEO #42547747648](https://github.com/NexLabsTech/exile-nexus/actions/runs/42547747648) completed/success. Six new unit cases increase Node tests to **48**; existing 28 Python tests unchanged. `npm audit --audit-level=high` exits 0 with seven known MODERATE npm transitive advisories, no HIGH/CRITICAL reported by executed gate.

## Final HEAD tests (MUST READ BACK after evidence commit)

On the final PR #159 HEAD (after this file), verify **all seven workflows**, including the dedicated a11y matrix, 89 Playwright E2E, 48 Node tests, 28 Python tests, six original pixel hashes, local Lighthouse budgets, 11-route SEO noindex/empty sitemap and English catalog 132/126. Confirm snapshot of 200% resized Home is actually generated, inspect screenshots, check privacy, security, no external requests and current ruleset #26806979. Record precise run IDs and PASS/FAIL in pt-BR PR review and issue #19 comment. No claim final-HEAD PASS until verified.

## Accessibility, security and residual risks

- axe automated rules on existing pages and states can detect many issues, but **do not prove complete WCAG 2.2 AA or screen-reader usability**. Manual keyboard/screen-reader/mobile/touch, assistive technology announcements, focus order and 400% real-browser zoom **NOT_RUN** by a human; checklist is an explicit review input, not a fabricated PASS.
- The adjusted CSS header is a focused reflow correction, without content or source permissions; default desktop/tablet/mobile six visual hashes from the previous UI kit remain identical, and rest of shell/browser E2E still green.
- `forced-colors`, `prefers-reduced-motion` and 320px CSS viewport were tested in emulated Chromium (not real OS/phone). Keyboard scenarios are automated, manual checklist not executed.
- The static app remains English-only, `PREVIEW_ONLY`/noindex (11 routes), no user profile, cookies, analytics or external data sources. No GGG source/game data rights inferred, R01–R14 remains fail closed, no domain/deploy/paid resources.
- Seven npm MODERATE transitives still appear in npm audit. No HIGH/CRITICAL observed in executed app gate. Lighthouse ephemeral CLI dependency drift/actual RUM unknown; real WCAG assistive testing and additional devices pending.

## Proposed Checkpoint Delta (DO NOT PROMOTE)

Once an owner separately approves this exact audited PR and normal protected squash merge is confirmed, record the new 11-route accessible release gate, 4 widths, 45 new a11y/reflow/keyboard tests, six matrix validator unit cases, full-app 89 E2E, corrected 200% overflow, unchanged six UI kit hashes, manual human a11y checklist **NOT_RUN**, continuing seven MODERATE transitive advisories and production SEO `PREVIEW_ONLY`. Do not mark manual WCAG conformance, public deployment, verified game content or other modules as completed.

**STOP:** PR #159 remains Draft, issue #19 OPEN, no checkpoint promotion, merge, deploy, next WO or owner acceptance in this change. Final technical audit on exact head to be recorded separately; solo review not independent as per EXN-DEC-0007.
