# EXN-M12-WO-001 — Evidence Bundle: baseline CI quality pipeline

- **Owner:** NexLabsTech
- **Status:** DRAFT / INITIAL CI PASS; FINAL HEAD CHECK PENDING
- **Revisão:** 2026-11-08
- **Risk:** ELEVATED
- **Work Order:** EXN-M12-WO-001 · Issue #119
- **Base SHA:** `79be738c7af8eda641c4ac4aff52ef7b28931ca0`
- **HEAD SHA:** read from current GitHub PR metadata; do not self-reference

## OBJECTIVE and Context Lock

Fail-closed CI baseline for the next functional Work Order #13,
which explicitly depends on #119. M00 completed; M01-WO-001 and M01-WO-002
accepted and closed. Decisions EXN-DEC-0007–0009 govern solo review,
Astro+React runtime direction and original visual assets. All existing
rights constraints R01–R14 are unchanged.

## SCOPE / Files / Architecture

- `.github/workflows/quality-baseline.yml`: runs on every PR and main push
  without path filters. Standard ubuntu-latest runner, read-only token, no
  secrets, deployment, paid external service or required app reviewer.
- `scripts/quality_gate.py`: inspect workflow triggers, action full SHA
  pins, minimum permissions, future production npm package lockfile and
  mandatory lint/typecheck/test/build scripts; fail closed on violations.
- `tests/test_quality_baseline.py`: positive synthetic fixture and five
  negative regressions with expected **nonzero** exit codes.
- Existing Python unit, docs validation, workflow actionlint/zizmor remain
  enabled. Production `package.json` outside `experiments/` activates
  npm ci, lint, typecheck, tests, build, npm audit high.
- Minimal already-approved visual decision reconciliation in checkpoint,
  EXN-DEC-0009, token guide, R14 inventory, older Evidence Bundle and
  Source Pack index. Only the quality proposal is new and unaccepted.

## Verification matrix

| Evidence / gate | Initial state | Required outcome |
| --- | --- | --- |
| Python source compilation | NOT RUN | PASS |
| Existing unit regressions | NOT RUN | PASS |
| Synthetic valid workflow and valid app | NOT RUN | PASS |
| Negative: absent lockfile | NOT RUN | return nonzero |
| Negative: absent typecheck script | NOT RUN | return nonzero |
| Negative: unpinned Action | NOT RUN | return nonzero |
| Negative: privileged pull_request_target trigger | NOT RUN | return nonzero |
| Negative: write permission | NOT RUN | return nonzero |
| Workflow security policy on real repo | NOT RUN | PASS |
| Docs validation / actionlint / zizmor | NOT RUN | PASS on exact HEAD |
| Production npm lint/typecheck/test/build/audit | NOT APPLICABLE until app exists | Do not claim PASS |
| Browser E2E / integration with product / migrations | NOT APPLICABLE | No application exists |
| Deployment / cloud costs / runtime health | NOT APPLICABLE | No authorization or service |

The separate `Quality baseline` status is **NOT REQUIRED by GitHub ruleset**
unless separately authorized and read back. Regardless of ruleset enforcement,
an applicable failure blocks the project’s internal acceptance. Existing
`Docs validation` remains the only required status check on main.

## Security / limitations

- All external Actions must be full SHA pinned, no pull_request_target or
  workflow_run privilege triggers, no write token. Scoped tests verify the
  *current* security policy, not a complete SAST/DAST audit.
- `experiments/frontend-runtime/` intentionally uses its own synthetic CI.
  Those experiments are not published product code. Production npm builds
  require committed lockfile, scripts and registry access. Network errors
  when production exists must be FAIL/blocked, not relabeled as PASS.
- NPM audit is free, but available network and free GitHub Actions quotas
  remain finite; billing account and Code Security settings NOT VERIFIED.
- No licenses, game data APIs, images, monetization, Cloudflare setup or
  release enabled. Reviewer and executor are the same identity under
  EXN-DEC-0007; independence not asserted, external reviews unused.

## Evidence to fill after GH Actions

Record PR URL, base/head SHA, changed paths, exact unit count and exit codes,
negative failure names, links to both GitHub workflow runs, security lint,
package discovery outcome, risks, correction deltas, and checkpoint proposal.
No merge, owner acceptance, issue #119 closure or #13 implementation before
the gates are complete.

## Executed CI and negative-regression evidence (prior HEAD)

- **PR:** [#143](https://github.com/NexLabsTech/exile-nexus/pull/143)
  on branch `exn-m12-wo-001-quality-baseline`.
- Initial complete CI HEAD `bd44ac46455a5ffa900b2d78a315dee3cfc8221d`,
  BASE `79be738c7af8eda641c4ac4aff52ef7b28931ca0`.
- [Quality baseline #42522522029](https://github.com/NexLabsTech/exile-nexus/actions/runs/42522522029):
  `completed/success`. All 10 job steps passed; `python3 -m unittest
  discover -s tests -p 'test_*.py' -v` ran **18 tests** with `OK`, exit 0.
  The 7 new quality tests contain 5 deliberately invalid synthetic
  configurations that call `quality_gate.py` and assert its exit code is
  **nonzero**. Valid empty-repo and valid synthetic app cases returned 0.
- `python3 -m compileall -q scripts tests` PASS. Real repository
  `quality_gate.py` policy PASS: no unauthorized privileges, unpinned
  external Actions or missing app lockfile. **Production apps = 0** and
  npm lint/typecheck/test/build/audit **NOT APPLICABLE** (not PASS).
- [Documentation CI #42522521967](https://github.com/NexLabsTech/exile-nexus/actions/runs/42522521967):
  `completed/success` on same HEAD. 18 unittests PASS,
  30 Markdown and 127 links validated; secret heuristics 0 matches;
  `actionlint` v1.7.12 and `zizmor` v1.32.0 PASS. Zizmor warned it
  runs offline by default; this is not full external intelligence.
- All tools are free local/standard runner tools, without external reviewer,
  API, deploy, secret, billing, new ruleset permission or paid dependency.
- **Correction Delta 01:** factual stale Source Hierarchy statements that
  still described PR #140 as Draft were updated to the already integrated
  commits and accepted decisions M00/M01. No security requirement relaxed.
- **Audit limits:** no production app, so browser/E2E, real
  lint/typecheck/build, dependency scan and release are NOT APPLICABLE.
  Workflow safety checks are baseline heuristics, not comprehensive SAST.
- This documentation-only correction changes Git HEAD. Verify the final
  `Quality baseline` and `Docs validation` statuses on the new SHA,
  and record those exact links in the PR conversation. Do not claim a future
  run passed before read-back. Owner acceptance/merge remains pending.
