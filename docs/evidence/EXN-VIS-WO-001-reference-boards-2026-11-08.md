# EXN-VIS-WO-001 — Evidence Bundle: original reference boards

- Owner: NexLabsTech
- Issue: #144
- Work Order: EXN-VIS-WO-001
- Risk: STANDARD
- Status: PROPOSED, PR #145 Draft, initial CI PASS; final HEAD checks and raster import pending
- Base: `75bcb8c786beda9c4e62677fd325aa9d4c0418c2` (PR #143 squash normal)
- Initial tested HEAD: `f772e2a67f0d7d2ec49eb9c37de1ad6a1bc0e3ee`; final HEAD: read from PR metadata after this evidence update

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
| Four previewable SVG references committed | PASS on PR branch; read-back verified via PR #145 |
| XML parses, root viewBox, titles/description | PASS, 23 unit tests total on prior HEAD |
| No script, network, remote fonts, external images | PASS, static SVG checks on prior HEAD |
| Page coverage: brand/public/tools/account | PASS, XML-decoded text assertions |
| SVG negative fixture policy | PASS, negative fixture in unit suite |
| Existing project Docs validation / unit tests | PASS on prior HEAD, [run #42527104575](https://github.com/NexLabsTech/exile-nexus/actions/runs/42527104575) |
| Quality baseline workflow | PASS on prior HEAD, [run #42527104470](https://github.com/NexLabsTech/exile-nexus/actions/runs/42527104470) |
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

## Initial CI review / Correction Delta 01 (before evidence-only commit)

- PR #145, base `75bcb8c786beda9c4e62677fd325aa9d4c0418c2`, initial tested HEAD `f772e2a67f0d7d2ec49eb9c37de1ad6a1bc0e3ee`.
- First workflow attempts [#42527027537](https://github.com/NexLabsTech/exile-nexus/actions/runs/42527027537) and [#42527027574](https://github.com/NexLabsTech/exile-nexus/actions/runs/42527027574) FAILED because a new unittest asserted XML-escaped raw text `SEARCH & DISCOVERY` instead of decoded `SEARCH &amp; DISCOVERY`; this was a test assertion defect, not SVG corruption.
- Correction Delta 01: same PR, change only `tests/test_design_reference_boards.py` to use ElementTree `itertext()` and exempt the mandatory SVG namespace URL and local gradient IDs from external-network detection. No policy or rights weakening: external URLs, scripts, data URIs and event handlers remain blocked.
- Exact corrected HEAD `f772e2a67f0d7d2ec49eb9c37de1ad6a1bc0e3ee` passed both workflows:
  - [Quality baseline #42527104470](https://github.com/NexLabsTech/exile-nexus/actions/runs/42527104470): 23 unittests OK, including positive and negative security fixtures; Python compilation PASS; production app packages 0, npm checks NOT APPLICABLE.
  - [Docs validation #42527104575](https://github.com/NexLabsTech/exile-nexus/actions/runs/42527104575): 23 tests OK; 31 Markdown / 130 links validated; no detected secret patterns; actionlint and zizmor PASS (zizmor offline warning remains).
- No app build, browser screenshot test, comparison to raster art or rights clearance was performed. Technical review covers the source scope and static tests only. No merge authorization implied by a CI PASS.
- This evidence update itself advances HEAD; recheck both workflow conclusions on the final HEAD and record links in a GitHub review/comment, not by a self-referencing SHA in this file.
