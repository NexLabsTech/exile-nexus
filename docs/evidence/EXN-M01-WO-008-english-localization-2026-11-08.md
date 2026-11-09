# EXN-M01-WO-008 — English-first UI localization and content formatting · Evidence Bundle

- **Owner / repository:** NexLabsTech / `exile-nexus`
- **Work Order / issue:** EXN-M01-WO-008 / [#18](https://github.com/NexLabsTech/exile-nexus/issues/18), NECESSARY / STANDARD
- **Branch:** `exn-m01-wo-008-english-localization`
- **Draft PR:** [#157](https://github.com/NexLabsTech/exile-nexus/pull/157)
- **BASE SHA:** `f02e154c87ea81e50b00c64b03fdef9c99e91333`, accepted checkpoint [PR #156](https://github.com/NexLabsTech/exile-nexus/pull/156). Dependência #17 encerrada, PR #155 squash aceita em `b7941aaa9fd51607cc705e656d7647a3ba96522c`.
- **Last tested implementation HEAD before adding this evidence file:** `67d9b729cf3f4909719d8ebb39255e97902d145e`. Final HEAD must be independently read back from PR metadata and rerun after this commit; a Git commit cannot contain its own HEAD SHA accurately.
- **Administrative state:** #18 OPEN, PR #157 DRAFT; no merge, deploy, paid service, rights expansion, locale switcher, new language or checkpoint promotion; owner acceptance PENDING.

## Objective / context lock / governing sources

English-first public core localization and consistent deterministic content formatting, preserving the exact existing English UI, dark-fantasy visuals and accessibility. Sources of truth (Git baseline / immutable blob fingerprints) verified before edits:

| Critical source | Git blob SHA at BASE |
| --- | --- |
| `docs/checkpoint.md` | `177315e06b5ac089b1357dbb37df0bc82d07fb62` |
| `docs/decisions-ledger.md` | `84fa64db4758dcab6f284147c23c62ed8a9e9274` |
| `docs/scope.md` | `86ec944036f007300fff4057e3cdf18755a4d463` |
| `docs/definition-of-done.md` | `536d254f7e35fff4fc46d7175ea877e4086b0174` |
| `docs/architecture.md` | `649767db871b011ecb8ba31189dd9a565582cfa5` |
| `docs/requirements.md` | `14a8766f3a9a5431822b59b18441d9fd0edb548d` |
| `docs/test-plan.md` | `23b37c686a5fda06d7a38ab2221eab87e4a06563` |

Hierarchy: checkpoint → accepted Decisions Ledger/ADRs → Scope → DoD → Architecture → Requirements → test and Git evidence. Existing decisions EXN-DEC-0003 through 0010, Astro 7.4.7 + React 19.3.1 islands, original visual tokens and rights R01–R14 remain unchanged. No public domain/production indexing or external game data approved; SEO `PREVIEW_ONLY` is preserved throughout.

## Requirements and exact files in scope

- `apps/web/src/i18n/en.json`: versioned `en` catalog, **132 non-empty messages** covering shared navigation, accessibility labels, Home, static module states, search, UI workshop and 404.
- `apps/web/src/i18n/index.ts`: typed catalog import with exactly `locale="en"`; no runtime locale detection or fallbacks.
- `apps/web/src/i18n/format.ts`: pure deterministic interpolation of `{name}` and `{count}`, rejects missing/extra/non-finite/malformed placeholders, never executes HTML.
- **14 audited core UI source files:** `src/layouts/BaseLayout.astro`, `src/pages/index.astro`, `src/pages/[section]/index.astro`, `src/pages/search/index.astro`, `src/pages/ui-kit/index.astro`, `src/pages/404.astro`, `src/components/SiteHeader.astro`, `src/components/SiteFooter.astro`, `src/components/MobileNav.tsx`, `src/components/search/GlobalSearch.tsx`, `src/components/ui/UiShowcase.tsx`, `src/components/ui/ActionButton.tsx`, `src/components/ui/FeedbackPanel.tsx`, `src/components/ui/TextField.tsx` (generic component receives localized props, contains no public hardcoded sentences). Only brand-wordmark proper nouns, numerical indices and symbols are intentionally literal.
- The existing `src/data/routes.json` (7 navigation labels/descriptions), `src/data/ui-states.json` (4 status text contracts) and `src/data/search-fixtures.json` (3 fictional demo content records) **remain separate externalized English data catalogs**. Their meaning, data rights and entries were not altered. Deterministic `src/lib/search-contract.ts` now requires an explicit `SearchMessages` parameter instead of emitting hardcoded English; consumers and tests provide the English catalog. Search ranking, whitelisting, result count and URL safety unchanged.
- `apps/web/scripts/verify-i18n.mjs`: fail-closed source/metadata scan across the 14 public files, catalogs and placeholders. Rejects missing keys, blank/HTML/malformed templates, newly inserted human English literals in Astro markup or JSX labels, absent source files, invalid route names, non-fictional fixtures and missing UI states.
- `apps/web/tests/unit/english-catalog.test.mjs` (9 new negative/positive unit cases), `apps/web/tests/unit/search-contract.test.mjs` (existing 8 preserved and updated to inject English messages), `apps/web/tests/e2e/english-locale.spec.ts` (5 new E2E cases: English under pt-BR browser, route metadata, error/empty, responsive screenshots), `apps/web/package.json` (one script), `apps/web/.gitignore`, `.github/workflows/wo18-localization.yml`, `apps/web/README.md` and this bundle. No new dependencies, no lockfile change, no external translation provider, tracker, persistence, APIs, backend, other languages, SEO hreflang, Cloudflare deployment or changing game IP.

## Traceability / tests on last implementation HEAD `67d9b7...`

| Acceptance/gate | Evidence / verified result | Status |
| --- | --- | --- |
| Public core UI English externalized | Typed `en.json` and 14 source-file audit, 132 catalog messages / 126 referenced distinct keys, plus 7 route records, 4 UI states, 3 fictional fixtures | PASS on code HEAD |
| Missing keys, malformed placeholders and raw UI literal blocked | 9 new negative/positive unit tests, fail-closed `verify-i18n` CLI, no fallback or silent skipped files | PASS |
| Browser locale stable / English complete | Playwright tests in `pt-BR` context and en-GB default, `html lang=en`, exact English copy | PASS |
| UI accessibility / visual baseline | Existing axe keyboard/reduced-motion and six SHA-256 UI-kit screenshot baselines retained, full-page Home/Kit captures 1440/390 | PASS |
| Old search and rights contracts unchanged | Existing 8 search tests with injected English messages and explicit source rights fail-closed | PASS |
| Production SEO unchanged | `PREVIEW_ONLY`, 11 routes noindex, empty sitemap and deny-all robots, no approved origin | PASS |
| App lint/strict TS/build/dep security | Existing quality/SEO CI plus new English CI, locked npm app dependencies | PASS |
| Final HEAD after this Evidence Bundle | Exact-HEAD five/six CI workflows must be read back | PENDING |

Executed on implementation HEAD:
- [Docs validation #42545491687](https://github.com/NexLabsTech/exile-nexus/actions/runs/42545491687): `completed/success`.
- [Quality baseline #42545491707](https://github.com/NexLabsTech/exile-nexus/actions/runs/42545491707): `completed/success`; **28 Python** regression tests, **42 Node unit** (9 new plus 33 existing), ESLint, TypeScript strict, static Astro build and `npm audit --audit-level=high` PASS. **7 MODERATE** transitive npm findings persist, no HIGH/CRITICAL reported by executed gate.
- [English catalog #42545491665](https://github.com/NexLabsTech/exile-nexus/actions/runs/42545491665): `completed/success`. [Artifact #13642877857](https://github.com/NexLabsTech/exile-nexus/actions/runs/42545491665/artifacts/13642877857) contains coverage JSON: `passed:true`, `locale:en`, `catalogKeys:132`, `referencedKeys:126`, `filesScanned:14`, `failures:[]`. Also reran `seo:verify` and audit high.
- [SEO publishing #42545491636](https://github.com/NexLabsTech/exile-nexus/actions/runs/42545491636): `completed/success`; 11 HTML routes checked, 0 indexable, `PREVIEW_ONLY`, SEO gate intact.
- [Responsive/axe/visual #42545491661](https://github.com/NexLabsTech/exile-nexus/actions/runs/42545491661): `completed/success`, **44 Playwright E2E** (5 new) and [actual screenshot artifact #13643041875](https://github.com/NexLabsTech/exile-nexus/actions/runs/42545491661/artifacts/13643041875). Six existing UI-kit screenshot hashes remained **byte-exact**, without regeneration or exclusions. Low-end CPU×6 browser hydration **1,502 ms**, menu response **170 ms**.
- [Lighthouse/static budget #42545491603](https://github.com/NexLabsTech/exile-nexus/actions/runs/42545491603): at time of this evidence authoring the Lighthouse job is executing; do not claim its final result until direct read-back.

### Correction Delta on same PR

**CD01**: First browser run [#42545260491](https://github.com/NexLabsTech/exile-nexus/actions/runs/42545260491) had **one E2E failure** newly introduced in the English test: `getByRole("status")` matched both the result count and empty-state status, triggering Playwright strict-mode ambiguity. Existing screenshot regressions, other English tests and six approved hashes passed. Narrowly corrected **only the failing assertion** to locate `.search-results-count`, the intended live-results status element. **No UI change, rights change, threshold relaxation, disabled test, skip, bypass or baseline regeneration.** Corrected browser [#42545491661](https://github.com/NexLabsTech/exile-nexus/actions/runs/42545491661) PASS **44/44**. The first FAIL is retained as a factual fail, not rewritten as PASS.

## Security, legality, risk and scope limitations

- English is the only approved locale. A `pt-BR` browser intentionally renders English; this is not a locale switcher or a translation to Brazilian Portuguese. Other locales, RTL, timezone/currency formatting and international SEO are NOT IMPLEMENTED, and must not be inferred.
- Public texts are cataloged for the current 14 explicit core UI files and three existing JSON data catalogs, not a claim that unimplemented feature modules or future source adapters have already been translated. New public UI files must update the audit source inventory. The brand `EXILE NEXUS`, geometric icon, numbering and decorative marks are intentionally invariant.
- The formatter replaces named tokens as text, never executes dynamic JS or HTML; React/Astro own escaping. Empty/missing keys and raw inline JSX/markup trigger CI. The catalog itself remains untrusted for legal rights or factual game statistics; R01–R14 gates stay fail-closed.
- SEO remains `PREVIEW_ONLY`; `approvedSiteOrigin:null`, no public indexation, synthetic search samples are labeled and nonindexable. No external data/LLM/provider/source, user records, auth, cookies, analytics, telemetry, paid service, game textures, copyrighted branding or publication.
- Existing seven MODERATE npm transitives are not silently cleared. No HIGH/CRITICAL known in the executed app audit. Prior Lighthouse CLI transient dependency-tree risk, no physical mobile benchmark and no full independent manual screen-reader audit remain open. CI costs are not claimed globally free without billing evidence.
- Screenshot hashing and full-page render captures are environment-sensitive; future renderer updates require explicit visual comparison and owner-approved baseline delta, not silent rebaselining.

## Proposed Checkpoint Delta (DO NOT PROMOTE)

Only after the owner separately approves and the protected normal squash merge of PR #157 is confirmed, record English-only typed `en.json` (132 messages), 126 referenced keys across 14 audited files, seven route texts + four feedback states + three synthetic fixtures retained, deterministic safe placeholder formatting, 9 new negative/positive unit tests, 5 new locale browser tests, existing rights/SEO/performance gates passing, six unchanged UI-kit screenshots and seven MODERATE npm residual findings. Preserve SEO `PREVIEW_ONLY`, all R01–R14 source restrictions, no new language, no public domain, no deployment. Only then may source hierarchy be reconciled and a later NECESSARY WO considered.

**STOP:** PR #157 remains DRAFT/OPEN, issue #18 OPEN, `main` unchanged, no rights/deploy/release/new WO or automatic merge. Final review must verify exact post-documentation HEAD CI and declare an evidence-backed PT-BR verdict; audit is solo, not independent.
