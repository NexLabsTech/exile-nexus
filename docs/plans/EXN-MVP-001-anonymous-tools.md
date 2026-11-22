
# EXN-MVP-001 — Anonymous manual scenario tools

- **Owner:** NexLabsTech
- **Status:** OWNER-ADMITTED for implementation and Draft PR
- **Revision:** 2026-11-22
- **Work Order:** [EXN-MVP-001 · Issue #162](https://github.com/NexLabsTech/exile-nexus/issues/162)

The owner authorized a standalone, static increment for three manual tools on 2026-11-22. The work starts from the accepted main commit and has no implementation dependency on the Draft identity PR. The authentication Work Order stays blocked. This admission does not satisfy downstream M05/M06/M08 prerequisites.

## Context Lock

- Accepted base: `9d575553c36658f80245c30f494d4a090983bc57`.
- Identity read-back only: [#20](https://github.com/NexLabsTech/exile-nexus/issues/20) OPEN / BLOCKED and [#161](https://github.com/NexLabsTech/exile-nexus/pull/161) OPEN / DRAFT at `7db14342511d726d728257af477108d305314c82`.
- Candidate branch: `exn-mvp-001-anonymous-tools`.

| Base source | Git blob |
| --- | --- |
| `docs/checkpoint.md` | `ffb23d2a48d8f5a7dfc5a2de23af981d9fdc2ad8` |
| `docs/decisions-ledger.md` | `84fa64db4758dcab6f284147c23c62ed8a9e9274` |
| `docs/source-hierarchy.md` | `e0ec58354c7a8b2399b116ddbf5bed0c9e324e8c` |
| `docs/adr/EXN-M01-WO-001-frontend-runtime.md` | `d403881aedb3044f6c635364baacedcfc8c89506` |
| `docs/scope.md` | `86ec944036f007300fff4057e3cdf18755a4d463` |
| `docs/definition-of-done.md` | `536d254f7e35fff4fc46d7175ea877e4086b0174` |
| `docs/architecture.md` | `649767db871b011ecb8ba31189dd9a565582cfa5` |
| `docs/requirements.md` | `14a8766f3a9a5431822b59b18441d9fd0edb548d` |
| `docs/rights-and-data-sources.md` | `f99fc833f1b8ecdfddc55f478ab24d411fba05d2` |
| `docs/security-privacy-threat-model.md` | `b02dcfdf8280db97a9e5c2c48bd6afd019eebb11` |
| `apps/web/package-lock.json` | `2d401e756d9c166be29b7edaac6ffcd45cf18bc7` |

## Implementation and acceptance

1. Implement pure TypeScript fixed-point calculations and the exact versioned file contract. Test zero denominators, bounds, loss scenarios, decimals, deterministic sort and rejected JSON.
2. Mount React islands at the three existing routes. Use the approved shell, form controls, English catalog and static build. Apply a bounded, local file workflow with explicit reset confirmation and provenance. Verify each user flow on keyboard, touch-sized layouts and assistive-technology automation.
3. Verify build, dependency audit, privacy, rights, anonymous regressions, noindex, accessibility and static performance. Reuse the repository's standard read-only Actions. Publish only the task branch and a Draft PR. Record evidence and propose the checkpoint delta for subsequent administrative acceptance.

The Work Order issue classifies scope, requirements, constraints, tests and stop conditions. This plan records the resolved source and implementation choices. Manual reports and comparison ratios describe scenarios based on user estimates. The Farm Lab demo uses invented tokens. The UI introduces no runtime dependency, external font, protected game asset, provider, paid service or deployment configuration.
