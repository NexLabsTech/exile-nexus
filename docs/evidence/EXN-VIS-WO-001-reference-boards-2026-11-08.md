# EXN-VIS-WO-001 — Evidence Bundle: original reference boards

- Owner: NexLabsTech
- Issue: #144
- Work Order: EXN-VIS-WO-001
- Risk: STANDARD
- Status: PROPOSED, branch and Draft PR; owner acceptance and final CI pending
- Base: `75bcb8c786beda9c4e62677fd325aa9d4c0418c2` (PR #143 squash normal)
- HEAD: read exact PR metadata after final commit; do not self-reference

## Objective
Register original dark-fantasy visual pilot boards and a reproducible page fidelity specification without claiming that full-size binary PNG boards were added, changing approved production color tokens, duplicating GGG artwork or expanding app functionality.

## Files within scope
- `design/references/exile-nexus-brand-board-v1.svg`
- `design/references/exile-nexus-public-pages-v1.svg`
- `design/references/exile-nexus-tools-pages-v1.svg`
- `design/references/exile-nexus-account-pages-v1.svg`
- `design/references/README.md`
- `tests/test_design_reference_boards.py`
- This Evidence Bundle

## Acceptance and validation
| Check | Current status |
| --- | --- |
| Four previewable SVG references committed | PENDING read-back |
| XML parses, root viewBox, titles/description | PENDING CI |
| No script, network, remote fonts, external images | PENDING CI |
| Page coverage: brand/public/tools/account | PENDING CI |
| SVG negative fixture policy | PENDING CI |
| Existing project Docs validation / unit tests | PENDING CI |
| Quality baseline workflow | PENDING CI |
| Raster PNG files from the chat checked into repository | **NOT DONE** |
| Visual pixel-by-pixel equivalence to generated PNGs | NOT APPLICABLE without original binaries |
| Current app build/typecheck/E2E | NOT APPLICABLE, product app not implemented |
| Rights/trademark clearance to publish fantasy images | NOT VERIFIED |
| PR merge/deploy/issue close | NOT AUTHORIZED |

## Risks and architecture
- Concept palette differs from current accepted CSS tokens EXN-DEC-0009: reference-only. A new decision and contrast tests are required before the app imports it.
- Illustrations show original ornamental fantasy UI; no claim of GGG affiliation, copyrighted game media usage rights, official item stats, or live market prices.
- New boards are **vector pilot reconstructions, not byte-exact copies of raster concept PNGs**. The README lists SHA-256 digests of four original 1448×1086 source PNGs for an eventual verified import.
- No secrets, calls to external endpoints, app code, production/runtime manifests, deployment or paid services added.
- Review is done by the same solo maintainer identity; independent audit not claimed (EXN-DEC-0007).

## Proposed checkpoint delta
When accepted and merged, record the existence of reference-only vector boards, the owner's selected theme direction, and the outstanding raster-import plus production-palette reconciliation gates. Do not claim the original PNGs are versioned, do not promote draft fantasy content into production assets, and do not change rights matrix R01–R14.
