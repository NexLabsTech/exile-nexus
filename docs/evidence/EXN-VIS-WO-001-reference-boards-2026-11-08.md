# EXN-VIS-WO-001 — Evidence Bundle: original reference boards

- Owner: NexLabsTech
- Issue: [#144](https://github.com/NexLabsTech/exile-nexus/issues/144)
- Work Order: EXN-VIS-WO-001
- Draft PR: [#145](https://github.com/NexLabsTech/exile-nexus/pull/145)
- Branch: `exn-vis-wo-001-pilot-boards`
- Risk: STANDARD
- Status: import and local checks PASS; final GitHub read-back, Actions and owner acceptance are pending
- Base: `75bcb8c786beda9c4e62677fd325aa9d4c0418c2`
- Branch HEAD before this import: `8ddcfd538bce2618f91b503bc0cbe2e8ccc5de50` (matches the expected remote branch HEAD before changes)
- Final commit SHA and final workflow run IDs: recorded in the closing PR evidence comment because they cannot be embedded self-referentially in this commit

## Objective and scope

Import the exact four user-provided visual pilot PNGs into `design/references/`, reconcile the visual reference guide and this Evidence Bundle, and verify their content. No functional UI, game-data ingestion, deployment, administrative configuration, merge, issue close or next Work Order is included.

Changed files in this increment:

- `design/references/README.md`
- `design/references/exile-nexus-brand-board-v1.png`
- `design/references/exile-nexus-public-pages-v1.png`
- `design/references/exile-nexus-tools-pages-v1.png`
- `design/references/exile-nexus-account-pages-v1.png`
- `docs/evidence/EXN-VIS-WO-001-reference-boards-2026-11-08.md` (this file)

The importer, importer tests, SVG references and their tests already existed on the branch before this import. They were not changed in this increment. No ZIP, prompt, temporary file, workflow, token, ADR, rights record or application file is included.

## Input archive and binary integrity

- Inner archive: `exile-nexus-visual-pilots-originals.zip`
- Input archive SHA-256: `ccb03d7e1b74036f8188e858ed021bdf83205161fc073bd014862ffa34294077` — PASS
- Archive entry allowlist: exactly the four expected `design/references/*.png` paths — PASS
- Importer `--verify-only`: PASS, all expected SHA-256 values and 1448 × 1086 dimensions
- Importer write mode: PASS, all four files imported to the allowlisted paths
- Local byte-for-byte comparison with each ZIP entry: PASS
- ImageMagick `identify`: PASS, each file decoded as PNG at 1448 × 1086

| Versioned path | Bytes | SHA-256 |
| --- | ---: | --- |
| `design/references/exile-nexus-brand-board-v1.png` | 2,610,656 | `569ba69a3b9e0a45fc30a7f6388d2bee5065f4400d438ac28a007cc41bfebe2a` |
| `design/references/exile-nexus-public-pages-v1.png` | 2,933,868 | `b30695b21dc976737c3719d93a59f8d123407e6e22c289cce3703e9f0c9fe8dc` |
| `design/references/exile-nexus-tools-pages-v1.png` | 2,899,710 | `dc441436ea786df012e12e72362cc97a62fe343050d57cdcbcf30b554d0ae023` |
| `design/references/exile-nexus-account-pages-v1.png` | 2,777,842 | `b34c427d259b6724e653a81b41f2459752110ffc731e2b4b1e2ec3e588be2fb2` |

## Commands and local results

| Command / check | Result |
| --- | --- |
| `sha256sum` on the input archive | PASS, exact declared archive digest |
| `unzip -l` on the source archive | PASS, exactly four allowlisted entries and expected byte lengths |
| `python3 scripts/import_visual_pilots.py <archive> --verify-only` | PASS, no files written in verification mode |
| `python3 scripts/import_visual_pilots.py <archive>` | PASS, four original PNGs imported |
| SHA-256 plus byte comparison against ZIP members | PASS for all four files |
| `identify -format '%f: %m %wx%h %b\n' design/references/exile-nexus-*-v1.png` | PASS, all four decoded as 1448 × 1086 PNG |
| `python3 -m unittest discover -s tests -p 'test_*.py' -v` | PASS, 28 tests |
| `python3 -m compileall -q scripts tests` | PASS, exit 0 |
| `python3 scripts/quality_gate.py` | PASS; reports `production apps=0`; app npm checks NOT APPLICABLE |
| `python3 scripts/validate_docs.py` | PASS, 31 Markdown files, 132 links, no secret heuristic matches |
| `git diff --check` | PASS after Correction Delta 02 below |
| Local actionlint and zizmor | NOT RUN locally; final Docs validation workflow must supply these results |
| App lint, typecheck, build, browser/E2E | NOT APPLICABLE; no production application exists in this scope |
| Visual pixel equivalence between PNGs and editable SVG reconstructions | NOT APPLICABLE; the SVGs are not byte-exact reconstructions |

The first local `git diff --check` found trailing whitespace in the new status line in `design/references/README.md`. Correction Delta 02 removed only that whitespace. A repeat passed; no policy or content was weakened.

## GitHub read-back and workflow results

Before the import, PR #145 was open and Draft, based on `main` at `75bcb8c786beda9c4e62677fd325aa9d4c0418c2`, with branch HEAD `8ddcfd538bce2618f91b503bc0cbe2e8ccc5de50`. The user-provided package, prompt and temporary extraction were outside the repository.

Final authenticated GitHub read-back is required to confirm the four Git blobs, sizes and hashes at the pushed HEAD. Record the exact final base/head, blob read-back results and workflow run links in the closing evidence comment on PR #145. The pre-import PR-head checks are historical only and do not count as final checks:

- Docs validation run `42527989828`: PASS on the pre-import HEAD only.
- Quality baseline run `42527989714`: PASS on the pre-import HEAD only.
- CodeRabbit was skipped for the Draft PR; no external or quota-limited review is required or requested.

The final acceptance gate requires both **Docs validation** and **Quality baseline** to PASS on the exact pushed HEAD. The Docs validation logs must show actionlint and zizmor results for all workflow files. Record warnings or tool limitations verbatim in the closing PR comment. No app build is expected while the repository has no production app.

## Security, rights and costs

- Static visual review found no unmistakable official GGG logo or game screenshot. The account mockup depicts Steam, Google and Discord marks as examples; no authentication provider or integration is selected by this visual reference.
- Source provenance, copyright, trademark and commercial-use clearance are not established by hash or visual inspection. Rights R01–R14 remain unchanged; no game data or third-party artwork rights are granted by this import.
- Item names, prices, rates, profile details and game-like values in the boards are illustrative placeholders, not verified game facts and must not be ingested or published as data.
- The boards remain reference-only. The palette does not supersede approved `design/tokens.css`; no token, ADR, architecture or requirement changed.
- No secrets, network fetches, application functionality, deployment, paid service, paid runner or external review quota were used by the local steps. GitHub-hosted public repository checks are the existing workflows. No cost was incurred by the import.
- Residual risk: later product use or public promotion requires separate provenance/legal review and applicable product Work Orders; screenshots/UI implementation, data rights, provider integrations and accessibility acceptance are not delivered here.

## Proposed Checkpoint Delta

After technical audit and owner acceptance, record that four original user-provided raster pilot boards are present at the listed paths with the exact hashes above, alongside the existing editable SVG references. Keep them labeled **PILOT / REFERENCE ONLY**. Preserve the approved production tokens, decisions and rights R01–R14; the boards do not authorize game-data use, third-party provider integration, public release, deployment or the next Work Order. This proposal does not update the canonical checkpoint before acceptance.

## Audit and prior correction history

- Audit is a same-executor solo technical review under EXN-DEC-0007; it is not an independent review. Administrative owner acceptance and merge remain pending. PR #145 stays Draft and is not merged by this Work Order.
- Earlier Correction Delta 01 on the same PR fixed the SVG test to compare XML-decoded text and account for the mandatory SVG namespace/local gradient IDs; it did not weaken external-resource or script restrictions. The then-final pre-import HEAD `f772e2a67f0d7d2ec49eb9c37de1ad6a1bc0e3ee` passed the prior workflows (run IDs above are newer pre-import rechecks).
- Correction Delta 02 in this import removed only the trailing whitespace caught by `git diff --check`; the corrected check passed.
- No merge, deploy, issue close, change to `main`, force-push, bypass, outside reviewer or issue #13 work is authorized or performed.
