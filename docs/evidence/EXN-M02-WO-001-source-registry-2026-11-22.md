# EXN-M02-WO-001 · Authoritative source registry evidence

- **Owner:** NexLabsTech
- **Status:** DRAFT CANDIDATE
- **Revision:** 2026-11-22
- **Work Order:** [EXN-M02-WO-001 · Issue #22](https://github.com/NexLabsTech/exile-nexus/issues/22)
- **Admission:** [Owner authorization record](https://github.com/NexLabsTech/exile-nexus/issues/22#issuecomment-7085091838)
- **Accepted base:** `cb777dd029801991b4a4e58e227f65308ddd088c`
- **Candidate HEAD and CI:** Draft PR metadata

The base contains the anonymous MVP from [PR #163](https://github.com/NexLabsTech/exile-nexus/pull/163). Its squash tree matches approved HEAD `a476918d61fcce9c9aab90499c94c26b4133b047`, and its [Docs](https://github.com/NexLabsTech/exile-nexus/actions/runs/45065151474) and [Quality](https://github.com/NexLabsTech/exile-nexus/actions/runs/45065151448) workflows passed on the squash. The MVP issue is [closed with exact-main evidence](https://github.com/NexLabsTech/exile-nexus/issues/162#issuecomment-7085075940). Dependencies [#4](https://github.com/NexLabsTech/exile-nexus/issues/4) and [#9](https://github.com/NexLabsTech/exile-nexus/issues/9) are closed.

## Context Lock

| Accepted source | Git blob at base |
| --- | --- |
| `docs/checkpoint.md` | `ffb23d2a48d8f5a7dfc5a2de23af981d9fdc2ad8` |
| `docs/source-hierarchy.md` | `e0ec58354c7a8b2399b116ddbf5bed0c9e324e8c` |
| `docs/decisions-ledger.md` | `84fa64db4758dcab6f284147c23c62ed8a9e9274` |
| `docs/scope.md` | `86ec944036f007300fff4057e3cdf18755a4d463` |
| `docs/definition-of-done.md` | `536d254f7e35fff4fc46d7175ea877e4086b0174` |
| `docs/architecture.md` | `649767db871b011ecb8ba31189dd9a565582cfa5` |
| `docs/requirements.md` | `14a8766f3a9a5431822b59b18441d9fd0edb548d` |
| `docs/data-contracts.md` | `5f6f1c520a7aab7792d44558af76a6fc1356cd5f` |
| `docs/rights-and-data-sources.md` | `f99fc833f1b8ecdfddc55f478ab24d411fba05d2` |
| `apps/web/package-lock.json` | `2d401e756d9c166be29b7edaac6ffcd45cf18bc7` |

## Implementation

The versioned TypeScript registry mirrors the fourteen entries of the [accepted rights matrix](../rights-and-data-sources.md) as a documentary snapshot. A record contains its matrix ID, known owner or null, surface, rights status, gates, documentary URLs and evidence still required. The original matrix and its cited evidence remain the authority. The rights snapshot revision is November 8, 2026. A candidate URL in the registry is a documentary reference.

`listSourceRegistrations()` returns copies of the records and their lists. `evaluateSourceUse({ sourceId, purpose, url })` returns a typed decision. Version 1 permits only the exact URL for the R01 documentary citation. Unknown IDs, unsupported purposes, unapproved references and URLs outside the exact record fail closed. All data ingestion, caching, persistence, display, monetization and code reuse decisions are denied in this version. Live authorization envelopes and adapters belong to separate Work Orders under the [data contracts](../data-contracts.md).

The registry is a local code contract exercised by the existing test entry point. This increment contains no source lookup over the network, provider SDK, dataset, display integration, library change, account operation or deployment. Existing manual tools and public routes preserve their behavior and policies. The mandatory incremental cost is US$0.

## Validation and audit

Four targeted Node tests compare all 14 statuses with the matrix, exercise the permitted reference, deny all operational use and test that unknown requests or edits to caller-owned copies cannot grant permission. The Draft PR verification records local suite outcomes and exact-head Ubuntu CI.

Auditoria técnica pelo executor, conforme EXN-DEC-0007. A autorização para cada fonte externa continua vinculada a direitos, finalidade, limites e evidências verificadas. O cadastro documenta o estado aceito da matriz e não substitui a revisão de direitos antes de qualquer chamada ou divulgação.

**Checkpoint Delta proposto:** registrar a integração e as evidências pós-merge de EXN-MVP-001. Após aprovação e integração da #22, registrar o cadastro v1 como contrato documental testado. Preservar o bloqueio de ingestão, a questão de identidade #20, `ANONYMOUS_ONLY`, `PREVIEW_ONLY` e os gates de produção e dos módulos dependentes.
