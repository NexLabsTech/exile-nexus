
# EXN-MVP-001 · Anonymous tools evidence

- **Owner:** NexLabsTech
- **Status:** DRAFT CANDIDATE / RELEASE BLOCKED
- **Revision:** 2026-11-22
- **Work Order:** [EXN-MVP-001 · Issue #162](https://github.com/NexLabsTech/exile-nexus/issues/162)
- **Exact base:** `9d575553c36658f80245c30f494d4a090983bc57`
- **Implementation HEAD:** `237c82f937824305371ddb58ef7f4b822bdafead`
- **Implementation tree:** `9b5ca5ccda34377e33fd369a09460fa28691479f`

The initial evidence-only commit follows the implementation commit. The Correction Delta below records the subsequent keyboard fix. The final Draft PR head and the exact-head remote CI links are recorded in PR metadata and its verification section. The [implementation plan](../plans/EXN-MVP-001-anonymous-tools.md) records the accepted source fingerprints and the standalone owner admission. [Identity #161](https://github.com/NexLabsTech/exile-nexus/pull/161) is a read-only reference at `7db14342511d726d728257af477108d305314c82`.

## Scope and usage

- **Farm Lab** at `/farm/`. Enter your unit, cost, per-run gross reward, run count and minutes per run. Additional costs apply to the entire scenario and fees apply to gross rewards. Optional reward sensitivity holds costs and time fixed. The built-in synthetic example yields 90 tokens estimated net profit, 108 tokens/hour and a 40–140 token sensitivity range. The sample warning triggers below ten runs.
- **Build comparison** at `/builds/`. Enter a consistent damage estimate, survivability measure, budget and one to eight upgrades. Compare absolute and relative changes, cost per positive percentage point, and budget fit. Rank by damage, survivability, cost or damage efficiency. Unavailable efficiencies rank last, and ties preserve entry order.
- **Economy tools** at `/economy/`. Complete one or more groups. The conversion rate expresses target units per source unit. Each pair of prices or benefit and cost uses a consistent unit. Two and a half units at a rate of four convert to ten. A price rising from four to five has a 25% increase. There is no market feed.
- **Scenarios.** Calculate to see the result and expand the formula disclosure. Export a valid scenario as JSON v1 and import it into the same tool. Reset requires confirmation. Form state lives in memory until the user exports it. The built-in example remains labeled as synthetic after editing and export. All results depend on the assumptions entered.

The implementation exercises `FR-FARM-001`, the existing core interface, and applicable accessibility, performance, architecture and cost requirements for these routes. The feature scope is the three manual tools admitted in issue #162. Existing routes and module dependencies continue to apply.

## Architecture and changed files

| Surface | Files and contracts |
| --- | --- |
| Calculations and file format | `apps/web/src/lib/manual-tools.ts`. Decimal inputs with up to six fractional places, bounded magnitudes and BigInt arithmetic. Round at display time with halves away from zero. Undefined ratios return null. Versioned local file with kind and provenance. |
| Static entry point and UI | `apps/web/src/pages/[section]/index.astro`, `src/components/tools/ManualTools.tsx`, `ScenarioForm.tsx`, and `src/styles/manual-tools.css` in the web app. Server-rendered form layout with inactive controls before hydration, React islands and existing accessibility primitives. |
| Copy and provenance | `src/data/routes.json`, `src/i18n/en.json` and `scripts/verify-i18n.mjs` in the web app. Existing English-first catalog and stable routes, including browsers configured in pt-BR. |
| Proof | Web `tests/unit/manual-tools.test.mjs`, `tests/e2e/manual-tools.spec.ts`, plus existing shell and locale tests adapted to verify functional forms and preserve preview checks on other routes. The plan and this evidence file record the Work Order. |

### Lineage, security and rights

| Inputs or material | Owner and permitted purpose | Evidence and attribution |
| --- | --- | --- |
| Manual estimates and scenario names | Visitor supplies data to calculate privately in their browser. User may choose to export their local file. | Manual provenance label. There is no submission, collection, publication, or grant of commercial redistribution rights. |
| Farm practice scenario | Synthetic values authored for Exile Nexus to demonstrate its arithmetic. | Explicit synthetic provenance in UI and file. Contains no GGG or market data and claims no current league facts. |
| Layout, labels, calculations and inherited design | Exile Nexus original work and previously accepted project UI primitives. | Existing decisions EXN-DEC-0008 and EXN-DEC-0009 govern the stack and design. The independent-project disclaimer remains visible. The increment introduces no new third-party game assets, font, pricing source or integration. Existing R01–R14 gates remain in force. |
| Frontend packages and test tools | Existing dependency owners and licenses per the accepted lockfile and package notices. | Identical lockfile blob with the same runtime and tooling dependencies. No new license or deployment dependency is introduced by this change. |

Threat checks follow TM-05 and TM-12. Imports are capped at 16,384 UTF-8 bytes and four structural levels. The parser validates exact shape, version, kind, provenance and keys, then validates values and bounded array size. It avoids user-controlled object merging, code execution or HTML rendering. React treats user strings as text. URL query strings do not initialize tool inputs. The browser regression verified reserved authentication paths, cookie absence, empty storage and local-only operation. Downloaded JSON is retained under the user's control.

## Verification

| Check | Result |
| --- | --- |
| Clean dependency install | **PASS** with the existing lockfile. |
| Python documentation and workflow policy | **PASS**, 28 tests. Source Pack, links and secret heuristics passed. No workflow modifications. |
| ESLint and Astro strict typecheck | **PASS**, zero errors and warnings. Four existing `FormEvent` deprecation hints in other components. |
| Node unit tests | **PASS**, 58 total including 10 calculation and import/export tests. Domain coverage from Node's experimental coverage report is 98.88% line, 88.89% branch and 100% function. |
| Static production build | **PASS**, 11 pages. Two same-host builds matched SHA-256 `df51c4fc9d937764f03981eb2e4276c4653c6eea5ff207d7846adb7391a644a9` over the sorted relative paths and their file hashes. |
| English, accessibility and SEO policies | **PASS**, 16 catalog-audited UI sources, 11 accessibility routes, four viewport tiers, and zero indexable pages under `PREVIEW_ONLY`. |
| Browser and startup smoke, Windows | **95 PASS / 3 FAIL**. All nine tool cases passed including keyboard, responsive reflow, axe, local import/export, safe no-JavaScript state, and anonymous regression. UI Kit screenshot checks failed on Windows with all six captured hashes identical to a clean accepted base run on the same host. The canonical Ubuntu check retains the original expected hashes. |
| npm audit high | **PASS**, zero HIGH/CRITICAL. Seven pre-existing MODERATE findings in development tooling. |
| Static performance | **PASS**. Compressed JS 85,660 B, external compressed CSS 9,646 B, Home HTML gzip 5,162 B, complete output 480,935 B. Total output includes HTML-inlined CSS. |
| Lighthouse lab | **PASS** after Correction Delta. Two runs each on Home and Builds, accessibility 1.00, performance 0.98–1.00, CLS 0, LCP 908–1,716 ms and TBT 0–167 ms. The throttled browser check logged hydration at 3,636 ms and menu response at 898 ms. |
| Manual assistive technology on physical devices and published smoke | **NOT_RUN**. Lab and Playwright do not certify real-device or deployed behavior. |
| Release and account eligibility | **BLOCKED / NOT_VERIFIED**. No release target was provisioned or exercised. |

Correction Delta resolved the old English fixture expecting placeholder copy on the three newly functional routes. The other routes still assert their existing placeholder. The first Lighthouse run measured CLS 0.26047 on Builds when replacing the short loading shell. Server-rendering the same form before hydration eliminated that shift, with the controls inactive until React is ready. The same thresholds and test coverage were retained. Browser screenshots and traces are stored by the existing Playwright CI artifact step. Local output is in the ignored `test-results`, `perf-reports` and `lhci-reports` directories.

## Correction Delta CD-01 · Build comparison keyboard focus

- **Predecessor:** `f9f5bead30116c51fd55a27a9bf6b1b4d1d325cf`. The project and accepted base locks remain valid.
- **Reproduction:** on the predecessor, keyboard activation of Add upgrade rendered the new row but left focus on the action. The next Tab skipped the new row's input fields.
- **Correction:** after adding an upgrade, focus its name input when the row commits. After removal, focus the name in the next available row or the previous row when the last one is removed.
- **Evidence:** the new Playwright regression failed on the predecessor build and passed after correction. All 10 manual-tool scenarios, the static build, English catalog, SEO preview checks, accessibility matrix and static asset budgets passed locally. The final Draft head and canonical Ubuntu runs are recorded in PR metadata.
- **Scope:** Build Hub keyboard interaction, its regression and this evidence. The existing calculations and contracts, dependency lock and anonymous and publishing policies apply.

## Auditoria e Checkpoint Delta proposto

Auditoria técnica objetiva conduzida pelo mesmo executor, sem revisão independente. O escopo entregue implementa as três ferramentas locais da issue #162. Os cálculos são estimativas determinísticas com fronteiras explícitas. O custo incremental obrigatório do código é US$ 0. Billing, titularidade e quotas da hospedagem continuam sem verificação para este projeto. O aceite técnico depende da leitura de CI no HEAD final da Draft. O aceite administrativo, a publicação e o smoke em produção continuam sujeitos aos respectivos gates.

**Delta proposto:** registrar a admissão e a validação de EXN-MVP-001 para as três ferramentas locais sem login. Registrar base, HEAD aceito e evidências do CI somente após o aceite administrativo específico. Manter a issue #20 bloqueada, `ANONYMOUS_ONLY`, `PREVIEW_ONLY`, direitos R01–R14 e as dependências de M05/M06/M08. O checkpoint canônico não é promovido pela Draft.
