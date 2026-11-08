# EXN-M01-WO-003 — Public shell / responsive navigation evidence (2026-11-08)

- **Owner:** NexLabsTech
- **WO / Issue:** EXN-M01-WO-003 / [#13](https://github.com/NexLabsTech/exile-nexus/issues/13)
- **Risk:** STANDARD
- **Branch:** `exn-m01-wo-003-public-shell`
- **Draft PR:** [#147](https://github.com/NexLabsTech/exile-nexus/pull/147)
- **Base (verified):** `29c663ee2319c0290eeeb0a9e78ed0780111d6e7` (after checkpoint PR #146)
- **Last verified code HEAD before this Evidence Bundle-only commit:** `44c9e3f131de4e0580dd4051a2acfadf935cd513`
- **Final HEAD:** retrieve from GitHub PR metadata after this documentation commit, and record in its review comment, not inside its own Git commit.
- **State:** Code + browser screenshots CI PASS on code HEAD. Exact final HEAD CI pending until this Evidence Bundle is committed; owner administrative approval, merge and deployment **NOT AUTHORIZED**.

## Objective, acceptance and source hierarchy

Deliver only a static, original and responsive public Exile Nexus shell, keyboard-accessible mobile menu, stable deep-link routes, accessible empty/error states and reproducible Playwright visual evidence. Issue #13 depends on closed #12 and #119; reference-only pilot images were integrated in approved PR #145, and canonical reconciliation in approved PR #146.

Precedence: `docs/checkpoint.md` → Decisions Ledger (EXN-DEC-0004/0006/0007/0008/0009/0010) → Scope → DoD → Architecture → Requirements → Test Plan → implementation. **Astro 7.4.7 static + React 19.3.1 islands** with TypeScript strict selected as approved in EXN-DEC-0008. `design/tokens.css` imported from the repository without edits (EXN-DEC-0009); the new CSS contains local decorative colors inspired by references but is NOT a canonical token change. The pilot PNGs are not copied/cropped into product assets.

| Scope / requirement | Evidence or restriction | Status |
| --- | --- | --- |
| FR-CORE-001, NFR-RESP-001 | Static Home, routes for `/builds/`, `/items/`, `/economy/`, `/farm/`, `/patches/`, `/advisor/`, `/guides/`; 404 and preview empty states | PASS in static build and deep-link E2E |
| FR-CORE-002 | Custom original prism favicon, locally drawn CSS atmosphere, fantasy serif system fallback, no game images/assets | Code inspection PASS; final commercial rights clearance NOT VERIFIED |
| FR-CORE-003 | Page-specific title/description, semantic landmarks, no private records or profiles | PASS (markup review); production SEO/crawl not applicable |
| NFR-ACCESS-001 | Skip-to-content link, mobile accessible button, aria-expanded/current, Escape focus return, keyboard/E2E, reduced-motion and forced-colors | PASS for tested keyboard scenarios; complete axe/manual screen-reader audit NOT RUN |
| NFR-ARCH-001 | Astro static + React one small mobile-navigation island, typed route metadata, no adapters or backend | PASS in typecheck and static source review |
| NFR-SEC-001 / NFR-RIGHTS-001 | No secret, profile collection, auth, network data calls, scraping, API, monetization, imported GGG UI/frames | PASS for scope; source use/rights outside scope remain blocked |
| NFR-COST-001 | GitHub public-repo standard runners, no paid services selected | PASS for selected tools; account-wide optional-app billing NOT VERIFIED |
| Issue #13 screenshots | Home and Build preview at 1440/768/390, Playwright artifacts and header alignment regression | PASS, runs below |
| Product release DoD | No deploy, auth, API or live data; future modules need WOs | NOT APPLICABLE to this shell-only PR |

## Changed source group

- App manifest and lockfile: `apps/web/package.json`, `apps/web/package-lock.json`, Astro/TypeScript/ESLint/Playwright configs and `.gitignore`.
- UI: `apps/web/src/pages/index.astro`, `src/pages/[section]/index.astro`, `src/pages/404.astro`, `src/layouts/BaseLayout.astro`, reusable `SiteHeader.astro`, `SiteFooter.astro`, `MobileNav.tsx`, source-of-truth route JSON and typed navigation helper, original CSS/fav icon.
- Tests: `apps/web/tests/unit/routes.test.mjs`, `apps/web/tests/e2e/shell.spec.ts`, pinned `.github/workflows/wo13-browser.yml`.
- Documentation: `apps/web/README.md` and this Evidence Bundle.

A temporary dependency lockfile generator existed in early branch history under `experiments/wo13-lock-bootstrap/` with a read-only workflow. It was intentionally removed and **does not appear in the final PR diff**. It generated a lockfile on a standard public GitHub Actions runner; npm dependency versions and their integrity metadata are committed, no bypass of peer dependency resolution.

## Tests and browser evidence — exact verified code HEAD

- [Docs validation #42535107045](https://github.com/NexLabsTech/exile-nexus/actions/runs/42535107045): **completed/success**, required check on `44c9e3f131de4e0580dd4051a2acfadf935cd513`.
- [Quality baseline #42535107070](https://github.com/NexLabsTech/exile-nexus/actions/runs/42535107070): **completed/success** on same HEAD; 28 Python tests PASS, workflow policy scanner/compile PASS, `npm ci`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build` PASS; `npm audit --audit-level=high` completed with exit 0.
- [Responsive Playwright #42535107124](https://github.com/NexLabsTech/exile-nexus/actions/runs/42535107124): **completed/success** on same HEAD; **12 E2E PASS** (Home, sections, desktop links alignment, mobile menu/Escape, skip link, 404, remote-request check). Before browser tests: lint, typecheck, unit, Astro static build PASS; Chromium installed on standard GitHub Actions runner.
- Screenshots/artifact [`exn-m01-wo-003-browser-evidence` #13639047291](https://github.com/NexLabsTech/exile-nexus/actions/runs/42535107124/artifacts/13639047291): **6 PNGs** (Home and Build Hub at 1440×900, 768×1024, 390×844 viewport, full-page captures) plus an HTML report; 7 files, 3,751,641-byte artifact. The generated screenshot images were opened and visually inspected: no horizontal overflow, mobile stack works and desktop Guides header alignment corrected. Artifact retention is seven days. These are **actual compiled UI screenshots**, not a reference-board render.
- Color combinations and assets source: prior project token contrast/SVG safety tests remain part of the 28-test Python suite. No external font or game-data requests observed.
- **Performance metrics/automated axe-core:** NOT RUN for the shell; do not mark as PASS. Release-level load, hosting and accessibility audits remain in own WOs.

## Correction Deltas and root cause

1. Temporary lock generator initially failed strict npm `ERESOLVE` because typescript-eslint 8.46.2 did not support TypeScript 6 and eslint-plugin-astro 3.2.1 required ESLint >=10. Corrected **without** `--force`/`--legacy-peer-deps`: `typescript-eslint@8.72.1` and `eslint-plugin-astro@1.7.0` compatible with TS6 / ESLint9. Generated and committed valid `package-lock.json`, removed temp files.
2. The first app Quality CI run failed ESLint on unused imports in Playwright test, corrected by removing dead imports.
3. The next TypeScript check failed `process` references in Playwright config without configured Node type declarations. Replaced with deterministic runner settings without new dependencies.
4. The initial screenshot audit discovered misaligned Guides link in desktop header. Corrected `.more-link` flex alignment and added a Playwright regression comparing Home and Guides bounding box y-coordinate. Retest: 12 E2E passed and updated screenshot inspected.

All corrected failures were introduced by this WO, addressed within the same PR without modifying existing baseline checks or removing assertions.

## Security, rights, costs and residual risks

- The **npm audit did report seven MODERATE** transitive vulnerabilities (including `minimatch` in ESLint-related dependencies), but no HIGH/CRITICAL in the current `npm audit --audit-level=high` run; risk is recorded for future dependency maintenance, **not** silently treated as clean. Do not auto-upgrade with `npm audit fix --force` or relax the gate.
- Browser artifact uploader emits a Node20 deprecation warning under Actions' transition to Node24; job succeeded, pin is immutable and read-only; track for future maintenance.
- The scenic hero is an **original CSS geometric illustration**, not a GGG screenshot, but it is intentionally simpler than the composite visual pilot. Full pixel fidelity of all module screens is OUT OF SCOPE for this first shell.
- No GGG images, icons, sprites or prices imported. No Steam/Google/Discord integration or third-party logo embedded. All source gates R01–R14 and independent disclaimer remain binding.
- No secrets, database, hosted account, client automation, login, external data adapters, deploy, paid runner or mandatory paid service. GitHub Actions runner standard for public repository; global account billing and optional installed app cost NOT VERIFIED.
- R01–R14 and accepted visual decisions remain unchanged. Browser screenshots are transient evidence, not proof of permission for commercial distribution.

## Proposed checkpoint delta (DO NOT promote yet)

After an explicit owner acceptance and normal squash of PR #147 only, record the first static Astro/React shell, its locked dependencies, seven deep-linkable route previews, keyboard accessible mobile menu, 12 browser passes and screenshots, and newly identified seven moderate npm dependency findings. Update future WOs only when eligible; preserve static-only, no data adapters, no authenticated users and no deployment.

**Audit decision pending exact final HEAD CI:** once this Evidence Bundle commit passes Docs validation and Quality baseline, submit a PT-BR objective solo audit of full diff, rights and limitations. PR stays Draft, no merge/deploy, issue #13 remains open. No external reviewers or bot reviews.
