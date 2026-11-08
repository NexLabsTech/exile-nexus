# EXN-M01-WO-004 — Accessible UI primitives and states: Evidence Bundle

- **Owner:** NexLabsTech
- **Work Order:** EXN-M01-WO-004 · [issue #14](https://github.com/NexLabsTech/exile-nexus/issues/14) · NECESSARY · STANDARD
- **Branch:** `exn-m01-wo-004-accessible-components`
- **Draft PR:** [#149](https://github.com/NexLabsTech/exile-nexus/pull/149)
- **Base SHA:** `0b54670a88739276b516a1b67daab8fe992cacf8` (post approved M01-WO-003 checkpoint PR #148)
- **Final HEAD SHA:** from PR read-back and final review; not recorded self-referentially in this commit
- **Status:** IMPLEMENTED / AUDIT GATES IN PROGRESS. No owner acceptance, merge or deploy authorized.

## Object, scope and source check

Create a small and reusable UI library of accessible buttons, labeled fields, and loading/error/empty/success feedback, preserving approved Astro 7.4.7 static + React 19.3.1 islands, TypeScript strict and independent dark-fantasy style. A local-only component workshop on `/ui-kit/` is specifically marked `noindex,nofollow`, but **noindex is not access control**; this route contains no user data, secrets or external API calls.

Source priority: checkpoint → Decisions Ledger EXN-DEC-0004/0006–0010 → Scope → DoD → Architecture → Requirements → existing app and tests. Dependence EXN-M01-WO-003 (#13) was CLOSED and PR #147 merged. Reference images from #145 remain PILOT ONLY. No approved rights R01–R14 changed.

## Diff scope

- UI components: `apps/web/src/components/ui/{ActionButton,TextField,FeedbackPanel,UiShowcase}.tsx`
- Contract and isolated styling: `apps/web/src/data/ui-states.json`, `apps/web/src/styles/ui-kit.css`
- Static UI preview and metadata: `apps/web/src/pages/ui-kit/index.astro`, narrow `BaseLayout.astro` addition for optional `robots="noindex,nofollow"`
- Package and exact integrity lock: `apps/web/package.json`, `apps/web/package-lock.json`; @axe-core/playwright 4.10.2 and @types/node 22.15.3 are dev-only, exact pins.
- Tests: `apps/web/tests/unit/ui-states.test.mjs`, `apps/web/tests/e2e/ui-kit.spec.ts`, `apps/web/tests/visual/ui-kit-baselines.json`
- Documentation: `apps/web/README.md` and this Evidence Bundle.

**Out of scope:** game data, real auth, AI calls, APIs, backend, persistence, charts, passive tree, monetization, protected fonts/third-party logos, product shell replacement, broad CSS cleanup, external deployment, cloud billing, new Work Orders. Temporary lockfile generator was removed from the final diff after generating a reproducible package lock in a read-only GitHub Actions job. No force-push, `--force`, `--legacy-peer-deps`, paid tools or history rewrite.

## Traceability and objective checks

| Requirement / acceptance | Evidence / gate | Status |
| --- | --- | --- |
| #14: accessible focus and disabled buttons | Native `button`, `disabled`, `aria-busy`, keyboard Enter, `:focus-visible` | Automated Playwright, final CI PENDING |
| #14: labeled/required field and error | Native `label`/input association, stable `useId`, `aria-describedby`, `aria-invalid`, explicit hint/error text | Playwright and TypeScript, final CI PENDING |
| #14: loading/error/empty/success states | `FeedbackPanel` status or alert, localized retry, explanatory text, no color-only signaling | JSON contract unit tests, E2E and axe, final CI PENDING |
| NFR-ACCESS-001 | @axe-core/playwright WCAG 2.2 A/AA on the **component workshop subtree**, both default and error/disabled | Initial E2E PASS; final CI PENDING |
| NFR-RESP-001 | No horizontal overflow and six full-gallery snapshots at 1440/768/390: empty and error | Screenshot digests baseline from CI, final verification PENDING |
| NFR-ARCH-001 | Reuses Astro+React and typed components; no external API/domain module added | Code/diff/typecheck audit, final CI PENDING |
| NFR-SEC-001 / NFR-RIGHTS-001 | No secrets, external assets, game data, accounts or network calls in new UI | Source audit, final CI PENDING |
| NFR-COST-001 | Public-repository standard GitHub Actions runners; no new SaaS | No paid service selected; account-level billing NOT VERIFIED |
| NFR-TRACE-001 | PR #149, issue #14, this bundle, exact HEAD checks, proposed checkpoint delta | DOCUMENTED, final CI PENDING |

## Test design, visual evidence and correction history

1. Original app remains tested by its existing browser workflow (`EXN WO13 responsive UI screenshots`). New `ui-kit.spec.ts` adds state, keyboard, field validation, axe and screenshot tests. Existing shell tests remain active and **are not relaxed**.
2. Browser screenshot baseline uses SHA-256 of a **real rendered screenshot of the entire component workshop**, not just the first card. Six separately reviewed variants: `desktop-empty`, `desktop-error`, `tablet-empty`, `tablet-error`, `mobile-empty`, `mobile-error`, saved as exact hashes in `tests/visual/ui-kit-baselines.json`. These are screenshot-based fail-closed regressions, sensitive to OS/font/Chromium versions; an environment update requires deliberate re-approval of differences. The artifact also captures full-page images.
3. Initial install generated a reproducible npm lockfile through a temporary read-only workflow. The committed lockfile's source generation SHA-256 was `756ebe7c22e0654c6e4d1140bf9282543ba9ca2aaaba003016ef3d6ca67b17d3`, then the temporary workflow was **deleted** from the final diff. `npm ci` resolves the exact locked dependencies.
4. **Correction Delta 01:** initial Quality CI failed `no-undef` on Node `URL` in a unit test. Added explicit `import { URL }` from `node:url`, without disabling lint.
5. **Correction Delta 02:** initial Playwright state/axe tests passed, but screenshot baselines were intentionally `PENDING`. Expanded screenshot assertions to the **entire** workshop to capture actual state differences, recorded all six SHA-256 hashes from Chromium CI run #42536876485 and reviewed desktop/mobile rendered images before promoting them. No screenshot assertion or axe rule was disabled.
6. First verified pre-baseline state: [Docs CI #42536762880](https://github.com/NexLabsTech/exile-nexus/actions/runs/42536762880) and [Quality CI #42536762879](https://github.com/NexLabsTech/exile-nexus/actions/runs/42536762879) PASS; the [browser run #42536876485](https://github.com/NexLabsTech/exile-nexus/actions/runs/42536876485) had **17 PASS and 3 baseline-placeholder FAIL**, all six generated screenshot hashes captured. Do **not** count that browser run as PASS.
7. **Final exact HEAD checks:** must be read back, recorded in PR review comment, all workflows completed SUCCESS before APPROVED; **no claims of final pass yet** in this commit.

## Security, accessibility, dependency and legal limitations

- Dev dependency added for browser axe audits, pinned in the npm lock. If `npm audit --audit-level=high` reports HIGH/CRITICAL, this WO remains CORRECTION REQUIRED/BLOCKED. Historical seven MODERATE issues from M01-WO-003 are not automatically resolved; final severity count must be checked in final CI.
- Axe tests cover the new component subtree under `#component-workshop` in two states; full-site WCAG manual screen reader audit, locale handling, dynamic data, product authentication, real failures and performance benchmarking remain **NOT RUN / OUT OF SCOPE**. Color contrast is also checked by axe, not claimed for untested surfaces.
- Screenshot fidelity targets **reusable components**, not literal copied Path of Exile 2 art. Style uses original borders, type and colors, no official game assets or third-party login marks. Visual mockups in `design/references` are reference-only and are not licensing evidence.
- No web APIs, tracking, storage or personal data collection in the UI demo; local input exists only in ephemeral React state. Main branch, canonical design tokens and R01–R14 are unchanged.
- GitHub Actions optional installed external checks/billing have not been administratively read back; do not claim global US$0 for the full account or assume reviewer independence.

## Proposed Checkpoint Delta (do not promote before owner approval)

When this exact PR passes final audit and receives the owner's **separate merge authorization**, record new accessible UI primitives, four explicit feedback states, a labeled disabled/required/error-capable input, a noindex internal workshop and its unit/axe/Playwright/screenshot regression artifacts, maintaining seven moderate dependency findings (or updated accurate final count). Preserve M01-WO-003, EXN-DEC-0008–0010, product rights R01–R14, no external data, no deploy and no acceptance of the next Work Order.

**STOP:** PR #149 must stay Draft, #14 OPEN, no merge, no deploy, no checkpoint promotion, and no progression to later issues until correction/audit and explicit administrative authorization.
