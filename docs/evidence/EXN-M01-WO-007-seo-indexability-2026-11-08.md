# EXN-M01-WO-007 — SEO, structured data and indexability · Evidence Bundle

- **Owner:** NexLabsTech
- **Work Order / issue:** EXN-M01-WO-007 / [#17](https://github.com/NexLabsTech/exile-nexus/issues/17) · NECESSARY · STANDARD
- **Branch:** `exn-m01-wo-007-seo-indexability`
- **Draft PR:** [#155](https://github.com/NexLabsTech/exile-nexus/pull/155)
- **BASE SHA:** `6d82189ee2fdbdd143e221d8ff50c774eab894a7`, checkpoint #154 accepted after issue #16 closed / PR #153 squash `bd95b41471d45959b967492da29acf564c96481a`
- **Last verified code/docs HEAD before adding this bundle:** `3f582e7042cbc3b610def76f65360bf41ee63083`
- **Final HEAD:** read back after committing this file; verify CI on that same exact HEAD and capture in objective final PR review comment, not inside a self-referential commit
- **Current state:** PR Draft, issue #17 OPEN, no deploy/merge/hosting/rights promotion, checkpoint delta PROPOSED, owner administrative acceptance PENDING.

## Objective, Source Hierarchy, Scope and DoD limitations

The issue asks for SEO, structured metadata, sitemap and indexable nonduplicate pages. The current Exile Nexus deployment has **no verified public domain or approved publication rights**. Therefore the permitted/NECESSARY increment is **fail-closed SEO infrastructure, not activating live indexability or inventing a domain**. A future accepted owner decision verifying DNS/origin/publication must precede any indexable pages. Never describe `noindex` as protection of private data or as a completed production rollout.

Precedence checked: `docs/checkpoint.md` → Decisions Ledger (EXN-DEC-0003/0004/0006/0007/0008/0009/0010) → `docs/scope.md` → `docs/definition-of-done.md` → `docs/architecture.md` → `docs/requirements.md` → `docs/test-plan.md` → Git code/test/evidence. Traceability: FR-CORE-003, FR-DATA-001/002/003, FR-CAT-001, NFR-SEC-001, NFR-RIGHTS-001, NFR-TRACE-001, NFR-ACCESS-001, NFR-RESP-001, NFR-PERF-001, NFR-CI-001 and NFR-COST-001.

**OUT OF SCOPE:** DNS or Cloudflare setup, deploy, external registration, Search Console, crawler submission, analytics, paid SEO tools, rights-clearing GGG/third-party game data, publishing placeholders and synthetic search fixtures as real content, auth/backend/API, scope expansion or changing approved visual assets/tokens.

## Files and architecture

- `apps/web/src/data/publication-policy.json`: versioned publication state `PREVIEW_ONLY`, no approved origin/evidence, original editorial `/` eligible **only in a future approved state**, seven placeholder game section routes plus `/search/`, `/ui-kit/` and `/404.html` blocked even in approved state.
- `apps/web/src/lib/seo-policy.ts`: strictly typed policy and URL validation; only approved HTTPS origin with separate EXN-SEO-PUBLISH evidence can produce canonical/JSON-LD; reject insecure, placeholder/private or malformed origin and path/route collision. Emits original WebSite/WebPage graph **only conditionally**, with no official-game claim.
- `apps/web/src/layouts/BaseLayout.astro`: computes actual metadata policy on every route; defaults to `noindex,nofollow`; canonical and JSON-LD **absent** without approval, and caller `robots=noindex,nofollow` cannot be bypassed.
- `apps/web/src/pages/robots.txt.ts` and `src/pages/sitemap.xml.ts`: static files generated from the same policy; default `Disallow: /`, empty sitemap `urlset`; in a separate reviewed future approval only original eligible editorial paths may appear, preview routes remain disallowed.
- `apps/web/scripts/verify-seo.mjs`, `apps/web/package.json`, `apps/web/.gitignore`: deterministic actual-output verification and JSON evidence; no new dependencies/lockfile changes.
- `tests/unit/seo-policy.test.mjs`: 9 tests including published policy fixture + malformed/fake origin and metadata, duplicate/unsafe/overlapping path negative cases and sitemap/canonical/JSON-LD.
- `tests/unit/seo-build.test.mjs`: 5 positive/negative static build fixtures, including accidental publication, duplicate title/description, unapproved sitemap URL, missing robots.
- `tests/e2e/seo-indexability.spec.ts`: 6 E2E cases, all 11 generated routes, crawler files, local-only requests, responsive screenshot at 1440/768/390, unique metadata and absence of unapproved schema/canonical.
- `.github/workflows/wo17-seo.yml`: public read-only runner, pinned checkout/setup/upload Actions, npm ci/lint/typecheck/unit/static build/SEO verification/npm audit HIGH gate, artifact for output report plus robots/sitemap. Existing global browser, axe, visual hash, Lighthouse and Quality workflows remain active.
- `apps/web/README.md`: usage, future promotion gate, rights, constraints, test instructions, lab limitations.

The fixture origin `https://illustrative-seo-fixture.org` **only appears in unit tests**. It is not a real domain assignment, a canonical in the compiled app or evidence of ownership. Even a syntactically matching approval ID is not legal clearance without separately accepted Git/documentary proof.

## Verifiable evidence: code HEAD `3f582e70...`

| Gate / required behavior | Evidence / result | Status |
| --- | --- | --- |
| Publication policy fail closed | `PREVIEW_ONLY` with null host, no indexable content; 9 policy unit cases | PASS |
| SEO / duplicates / source output | 11 built HTML routes, unique title/description and English lang, `noindex` each; robots denies all; sitemap zero URLs; 5 negative/positive build fixtures | PASS |
| Conditional future WebSite/WebPage JSON-LD and canonical | Unit fixture tests enforce original home + validated HTTPS origin + required approval evidence, preview paths remain blocked | PASS **in synthetic fixture only** |
| Browser / accessibility / screenshots | 39 Playwright E2E incl. six new, pre-existing axe, keyboard, responsive 1440/768/390 and visual hashes | PASS |
| Source architecture / privacy / rights | No new backend/auth/network/game rights, `design/tokens.css` untouched; only original site metadata, read-only CI | Code/diff audit PASS |
| Live indexability / verified domain / actual search traffic | No approved domain or live publication; no Search Console, field metrics or real user indexing tests | **BLOCKED / NOT RUN**, intentionally |
| Final exact-HEAD CI after this Evidence Bundle commit | Must be rerun; do not claim pass prematurely | PENDING |

**Runs on the last code/docs HEAD before Evidence Bundle:**
- [Docs validation #42542995073](https://github.com/NexLabsTech/exile-nexus/actions/runs/42542995073) **completed/success**.
- [Quality baseline #42542995088](https://github.com/NexLabsTech/exile-nexus/actions/runs/42542995088) **completed/success**: 28 Python regression tests, **33 Node unit tests** in total (14 new), strict lint/typecheck/build and npm audit high exit 0. The seven pre-existing transitives remain **MODERATE**, no HIGH/CRITICAL reported.
- [Responsive/axe/browser #42542995076](https://github.com/NexLabsTech/exile-nexus/actions/runs/42542995076) **completed/success**, **39 Playwright E2E** and screenshots of Home desktop/tablet/mobile, along with existing site, UI-kit, search and low-end evidence. CPU×6 interactive hydration **1,458 ms** and menu response **154 ms**. [Browser artifact #13641594897](https://github.com/NexLabsTech/exile-nexus/actions/runs/42542995076/artifacts/13641594897). Screenshots were downloaded and visually inspected desktop/mobile, without horizontal overflow or visible content regression.
- [SEO publishing gate #42542995046](https://github.com/NexLabsTech/exile-nexus/actions/runs/42542995046) **completed/success**: report [artifact #13641693160](https://github.com/NexLabsTech/exile-nexus/actions/runs/42542995046/artifacts/13641693160) downloaded and parsed. 11 pages checked, **zero** published, no failures. Actual `robots.txt`: `User-agent: *\nDisallow: /\n`; actual `sitemap.xml` contains valid XML namespace and **zero** `<loc>` entries.
- [Local Lighthouse #42542995077](https://github.com/NexLabsTech/exile-nexus/actions/runs/42542995077) **completed/success** with [artifact #13642262017](https://github.com/NexLabsTech/exile-nexus/actions/runs/42542995077/artifacts/13642262017), four mobile-simulated local measurements of Home and Builds: performance **100/100**, accessibility **100/100**, best practices **100/100**, **SEO 63/100**, intentionally affected by `noindex`. Maximum LCP ~**1,822 ms**, CLS=0 and TBT=0. Size budget PASS: scripts gzip **75,804 B**, styles gzip **9,640 B**, Home HTML gzip **5,146 B**, raw dist **419,091 B**. **All are local synthetic CI measurements, not production site tests or real field Core Web Vitals.** Lighthouse SEO 63 is **not** a production SEO PASS and must never be represented as 100.
- Existing quality and browser gates were not weakened to accommodate `noindex`. The dedicated SEO gate deliberately checks it and fails if indexing is accidentally enabled.

## Corrections, security, legal and operational risks

- No code test failure in initial complete CI. The only release **blocker** is nontechnical: site origin/publication approval absent. Source check deliberately did not invent a domain or commercial rights. Record that issue #17 **cannot claim real site indexability as delivered** until a separate accepted domain/deploy gate. This does not justify bypassing robots or forcing indexing.
- No user data, app credentials, third-party game content, prices, patch/league facts or copyrights imported. No Change to R01–R14, source adapter approvals, monetization, auth, paid account or protected main.
- The `approvalEvidence` string format prevents accidental promotion but **does not cryptographically prove ownership, licensing, DNS or owner approval**. Separate documentary review is mandatory; an executor cannot self-approve the state.
- `noindex` and robots are cooperative crawler directives only, not protection against direct access. No public site exists yet, and these files are still built for local preview.
- Seven pre-existing MODERATE npm transitive advisories remain; no known HIGH/CRITICAL observed in the scope of executed gates. Lighthouse ephemeral CLI transitive dependency drift is the previously recorded reproducibility risk; screenshots and artifacts expire after seven days. No physical-device testing or manual full-site screen-reader accessibility audit.
- The accepted WebSite/WebPage JSON-LD schema is only exercised in the synthetic **approved** unit fixture. No structured data is emitted in the current build to avoid false public-site claims. Rich-results eligibility, production crawlers, canonical HTTP redirects, actual SSL/DNS and verified search indexing are NOT RUN.

## Proposed Checkpoint Delta — do not promote

After a distinct owner approval and normal protected squash merge of this PR only, record the fail-closed SEO publication policy, 11 unique nonindexable static pages, empty sitemap/deny-all robots, optional canonical + original WebSite/WebPage contract for *future separately verified* origin, +14 unit and +6 E2E tests, automated report, continuing seven MODERATE npm issues and production indexing/DNS rights **BLOCKED**. Do not mark public SEO, domain, production release, live data or rights as complete.

**STOP:** PR #155 stays DRAFT / issue #17 OPEN; do not merge, deploy, promote checkpoint or start the next WO automatically. Revalidate exact final HEAD after this evidence commit, provide an objective PT-BR audit distinguishing technical PASS from production BLOCKED, and await owner decision.
