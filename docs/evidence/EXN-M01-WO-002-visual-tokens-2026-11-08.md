# EXN-M01-WO-002 — Evidence Bundle: visual tokens and original assets

- **Owner:** NexLabsTech
- **Status:** DRAFT / TESTS NOT RUN ON PR YET
- **Revisão:** 2026-11-08
- **Work Order:** EXN-M01-WO-002 · Issue #12
- **Risk:** STANDARD
- **Base SHA:** `4a6bba78fd1966804895c9f9dafe85bf70175633`
- **HEAD SHA:** verify from GitHub PR metadata; no self-referential commit hash

## Objective, scope and allowed delta

Deliver accessible original visual tokens, a minimal rights-screened SVG pair,
an origin/rights inventory and a zero-dependency unittest suite. This is NOT
an application, release, login, game data source, Cloudflare connection or
deployment. No external review services are part of the acceptance process.

## Source Check and accepted decision

- M00 completed; M01-WO-001 #11 completed via
  [PR #141](https://github.com/NexLabsTech/exile-nexus/pull/141)
  squash `4a6bba78fd1966804895c9f9dafe85bf70175633`.
- Approved technical direction recorded as EXN-DEC-0008: Astro 7.4.7 +
  React 19.3.1 islands, fallback React/Vite. The earlier ADR/checkpoint had
  outdated PROPOSED headings; this WO reconciles only the **already approved**
  decision, not new visual/product approvals.
- Source Hierarchy, Decisions Ledger, Scope, DoD, Architecture, Requirements,
  Rights Matrix R01–R14 and Test Plan govern the design work.
- External standards consulted: W3C WCAG 2.2 1.4.3 text (4.5:1), 1.4.11
  non-text (3:1), 2.4.7 focus visible; MDN reduced-motion and forced-colors.

## Files / design constraints

- `design/tokens.css`: semantic palette, system-font scale, motion,
  spacing, radii and :focus-visible adaptation.
- `design/assets/nexus-prism.svg`, `design/assets/lattice.svg`: SVG
  geometry designed as source for this WO; no embedded media or external URI.
- `docs/visual-tokens.md`: contrast spec and limitations.
- `docs/visual-assets-inventory.md`: R14 provenance declaration and
  legal limitations; no inference of IP/trademark clearance.
- `tests/test_design_tokens.py`: deterministic WCAG contrast formula,
  SVG structure/safety, rights inventory and user-preference tests.
- Minimal accepted-state reconciliation in `docs/checkpoint.md`,
  `docs/decisions-ledger.md`, `docs/adr/EXN-M01-WO-001-frontend-runtime.md`,
  `docs/README.md`.

## TESTS / Evidence to be checked after PR creation

| Check | Initial state | Acceptance |
| --- | --- | --- |
| Design tokens contrast (text) | NOT RUN | WCAG minimum >=4.5 for all declared foreground/background pairs |
| Design edges / focus | NOT RUN | WCAG >=3 for all declared backgrounds |
| SVG security + a11y | NOT RUN | no embedded external refs/scripts, proper title/hidden decoration |
| Rights provenance | DOCUMENTED, review pending | all new assets inventoried; no copied GGG assets |
| Docs validation (includes design unittest) | NOT RUN | GitHub Actions success at exact HEAD |
| actionlint/zizmor | NOT RUN on this HEAD | included in Docs validation |
| Runtime build | NOT APPLICABLE | no app/scaffold changed |
| Browser E2E / visual similarity | NOT APPLICABLE / NOT VERIFIED | requires actual UI and legal review later |
| External review | NOT APPLICABLE | forbidden as required gate by EXN-DEC-0007 |

## Security / Rights / Risks

- R14 origin is documented as local original geometry/token source; origin is
  declared, **not a conclusive legal clearance or claim of exclusive ownership**.
- R01–R13 remain disallowed or conditional as already stated; no PoE2 glyphs,
  copyrighted game screenshots, fonts, passive tree or API data used.
- Native system font stacks only; no remote font, packages, credentials,
  external service or data collection.
- Exact hex contrast tests operate on opaque colors only. Transparent glass
  overlays are not proven safe until final rendered composite is measured.
- No HIGH/CRITICAL defect is known at proposal time; this is not a substitute
  for tests and later objective audit.

## Review format / Checkpoint Delta / STOP CONDITION

Required evidence bundle update after CI: diff, base/head SHA, unit test count,
contrast ratios, job exit codes, actionlint/zizmor, rights, risks, corrections,
and objective solo audit in pt-BR disclosing same-author review.
Checkpoint Delta remains PROPOSED for #12; only the owner-accepted #11 runtime
direction is marked ACCEPTED. No PR merge, deploy, issue closure or next WO
without explicit NexLabsTech acceptance and checks on exact HEAD.
