# EXN-M01-WO-010 — Anonymous-only identity security foundation · Evidence Bundle

- **Repository:** NexLabsTech/exile-nexus
- **Work Order / issue:** EXN-M01-WO-010 / [#20](https://github.com/NexLabsTech/exile-nexus/issues/20)
- **Risk:** **HIGH_ASSURANCE**, required by owner policy for privileged login, sessions, identities, roles, CSRF and revocation. The issue's preliminary STANDARD label is not sufficient evidence to downgrade.
- **Branch / Draft PR:** `exn-m01-wo-010-identity-security-contracts` / [#161](https://github.com/NexLabsTech/exile-nexus/pull/161)
- **BASE SHA:** `9d575553c36658f80245c30f494d4a090983bc57`, accepted checkpoint PR #160 after issue #19 CLOSED and PR #159 squash `b0092631f495650d4ec4950f26c6a6e9810078fd`.
- **Code and CI HEAD (before README/Evidence Bundle):** `043add4177acd52ac5ea2b91eeaf3763041c69b7`.
- **Last README/documentation HEAD before this Evidence Bundle commit:** `f418029a45a482521373a43bd342a7225d66bcc2`.
- **Final HEAD:** read back from GitHub after Evidence Bundle commit and verify CI on that exact HEAD; a file cannot accurately embed the SHA of its own commit.
- **Administrative status:** PR #161 DRAFT; issue #20 OPEN; no deployment/merge/account/real identity/user data/provider/DNS/paid service/checkpoint promotion. **BLOCKED for user identity/sessions/logout/CSRF/rate-limiting acceptance** until architecture and proven backend exist.

## Source Check and Context Lock

Git source hierarchy: accepted checkpoint → Decisions Ledger/ADRs → Scope → Definition of Done → Architecture → Requirements → Threat Model/Test Plan → actual code/tests. Immutable blobs at BASE:

| Source | Git blob SHA |
| --- | --- |
| `docs/checkpoint.md` | `ffb23d2a48d8f5a7dfc5a2de23af981d9fdc2ad8` |
| `docs/decisions-ledger.md` | `84fa64db4758dcab6f284147c23c62ed8a9e9274` |
| `docs/scope.md` | `86ec944036f007300fff4057e3cdf18755a4d463` |
| `docs/definition-of-done.md` | `536d254f7e35fff4fc46d7175ea877e4086b0174` |
| `docs/architecture.md` | `649767db871b011ecb8ba31189dd9a565582cfa5` |
| `docs/requirements.md` | `14a8766f3a9a5431822b59b18441d9fd0edb548d` |
| `docs/security-privacy-threat-model.md` | `b02dcfdf8280db97a9e5c2c48bd6afd019eebb11` |
| `docs/test-plan.md` | `23b37c686a5fda06d7a38ab2221eab87e4a06563` |
| `docs/deployment-plan.md` | `783a079bccd6b456547a89c350f84bc7f9845f5b` |

**Critical accepted decisions:** EXN-DEC-0008 authorizes a static Astro/React first app, *not* a backend, API, D1, credentials, identity provider, login, private user data, production Cloudflare resources or cost. Architecture explicitly says none of authentication/storage/server runtime chosen. Threat Model TM-01/04/05/07 prohibits unreviewed PR secrets, personal data collection, exfiltration or uncontrolled quota. `PREVIEW_ONLY`, data rights R01–R14, original tokens and public anonymous use remain mandatory.

## Objective, scope and limitations

Issue #20 describes complete **user identity, sessions and access roles** and acceptance criteria for logout, CSRF and rate protection. The approved sources provide **no chosen backend/provider, session store, production origin, cookie/secrets model or privacy/retention acceptance**. Therefore this PR implements the **first necessary safe foundation only**, avoiding fictitious security:
1. Versioned, **ANONYMOUS_ONLY** policy (no provider, store, backend, consent to identity collection, sessions, or privileged operations).
2. A TypeScript deny-by-default read-only authorization contract for exactly 11 current public HTML routes. `principal:null` and `operation:"read_public"` are necessary for a positive decision. Forged admin/member claims, fake bearer/session IDs, extra fields, unknown operations and private actions are rejected. **A pure client-side contract is not server authorization**.
3. A static output gate for unapproved login/admin/account endpoints, password fields, login forms, SEO `noindex` violations, route omission/duplication and unexpected extra HTML pages.
4. Four browser tests demonstrate anonymous public access, absence of cookies/localStorage/sessionStorage, forged-claim non-elevation, nonexistence of reserved auth pages, and no external identity network traffic.
5. Explicit HIGH_ASSURANCE decision dossier with **14 proof obligations** for user/session data protection, real server-verification, rotation/revocation/logout, CSRF, persistent race-safe rate limits, cookies, cross-user authorization, OAuth/OIDC, privacy, quota/cost, CI, independent review and rollback.
6. No new runtime dependency, authentication service, login route, identity data, domain, UI branding or token. Both `npm audit` and existing CI gates remain active.

### Files and tests

- `docs/identity-session-security-contracts.md`: architecture options A (Workers/D1 candidate), B (OIDC provider), C (current anonymous-only), all **PROPOSED NOT ACCEPTED**; threat model and stop conditions.
- `apps/web/src/data/identity-security-policy.json`: `mode=ANONYMOUS_ONLY`, all provider/store/runtime/evidence values null and three privilege/collection/cookie booleans false; 11 public routes and reserved paths.
- `apps/web/src/lib/identity-contract.ts`: typed read-only policy and fail-closed `authorizeAnonymous` decision, no credential parsing/trusting.
- `apps/web/scripts/verify-auth-boundary.mjs`: deterministic static artifact scanner; machine report explicitly flags `sessionBackendVerified:false`, `logoutVerified:false`, `csrfVerified:false`, `rateLimiterVerified:false`, `manualSecurityReview:"NOT_RUN"`.
- `apps/web/tests/unit/identity-contract.test.mjs` (**8 new** unit cases), `apps/web/tests/unit/auth-build.test.mjs` (**6 new** negative/positive cases), `apps/web/tests/e2e/identity-boundary.spec.ts` (**4 new** anonymous-browser cases).
- `apps/web/package.json` adds `identity:verify`, `apps/web/.gitignore` ignores generated report output, `apps/web/README.md` documents constraints, `.github/workflows/wo20-identity-boundary.yml` runs local-only read-only CI with pinned Actions.
- This Evidence Bundle and proposed checkpoint delta.

## Executed evidence on code HEAD `043add4177...`

| Gate | Evidence / status |
| --- | --- |
| Unit security contracts and policy negative fixtures | [Dedicated identity #42553935219](https://github.com/NexLabsTech/exile-nexus/actions/runs/42553935219) **completed/success**, **62 Node unit** total (14 new). |
| Static build and unauthorized login routes | Same identity CI **PASS**; all 11 permitted pages checked; no provider; `sessionBackendVerified:false`, `logoutVerified:false`, `csrfVerified:false`, `rateLimiterVerified:false` explicitly retained. |
| Browser anonymous privacy and spoofed claims | Same dedicated CI **4/4 PASS**, no fake role elevation, account routes, cookies, browser storage or external provider requests; [artifact #13645554662](https://github.com/NexLabsTech/exile-nexus/actions/runs/42553935219/artifacts/13645554662). |
| Whole browser regression | [Browser #42553935084](https://github.com/NexLabsTech/exile-nexus/actions/runs/42553935084) **completed/success**, **93/93 E2E**, existing six UI-kit SHA-256 hashes unchanged, CPU×6 hydration ~1558 ms, menu ~175 ms. |
| Docs / Quality / English / SEO | [Docs #42553935149](https://github.com/NexLabsTech/exile-nexus/actions/runs/42553935149), [Quality #42553935105](https://github.com/NexLabsTech/exile-nexus/actions/runs/42553935105), [English #42553935097](https://github.com/NexLabsTech/exile-nexus/actions/runs/42553935097), [SEO #42553935083](https://github.com/NexLabsTech/exile-nexus/actions/runs/42553935083) all **completed/success**; 28 Python tests, 62 Node tests, English catalog still 132, SEO noindex. |
| Existing a11y and Lighthouse on this intermediate code HEAD | Runs #42553935170 and #42553935140 were **cancelled by subsequent README commit** under `cancel-in-progress`, not failures; **do not count as PASS**. Final HEAD must have fresh successful results. |
| npm vulnerability threshold | `npm audit --audit-level=high` PASS; **seven pre-existing MODERATE transitive advisories**; no HIGH/CRITICAL reported by executed app gate. |
| Actual identity, login, logout, CSRF, distributed rate limiting, privileged session integration tests | **BLOCKED / NOT RUN**, because no approved server or real session protocol. This PR is NOT a completed #20. |
| Independent HIGH_ASSURANCE security review | **NOT RUN**. Solo implementation review is not independent and must not be misrepresented as such. |

## Threat model and residual risk

- Fake credentials/roles are **never authenticated**, even if they mimic a cookie, JWT or admin ID; pure contract permits public read only. This is **not** a cryptographic verifier and must not be reused to authorize future protected APIs. A real server needs proof of isolation, rate limits, token binding, CSRF, logout invalidation and sessions.
- The static `dist` scanner blocks unintended auth routes/forms but is **not** a full SAST/DAST, secure-cookie audit, penetration test or proof against hypothetical application logic vulnerabilities. Static HTML alone cannot implement revocation or anti-CSRF.
- No real login, personal records, controller/processor relationships or privacy legal basis yet: TM-05 remains blocked, not waived. No Cloudflare or OIDC account/provider selected. US$0 is an operational constraint; actual external free quotas not verified. R01–R14 gate remains.
- Existing seven MODERATE transitive vulnerabilities persist, no known HIGH/CRITICAL reported in executed checks. No production metrics, no independent security reviewer, no live auth/distributed attack tests and no deployment have been performed.
- **STOP CONDITIONS** include any enabled auth flag/provider in JSON, failing contract/CI, unreviewed identity service, secret, personal data collection, nonzero billing, unauthorized GitHub bypass, source drift or unapproved architectural ADR.

## Proposed Checkpoint Delta (DO NOT PROMOTE)

Only after owner expressly approves this foundation and a protected normal merge on its exact HEAD, update canonical sources to say **EXN-M01-WO-010 partially implemented/SECURITY CONTRACT ONLY**, issue #20 still OPEN, provider/session design unresolved and full DoD **BLOCKED**. Record 11 anonymous pages, 14 contract unit tests, four browser privacy checks, no real sessions/logout/CSRF/rate limiting, seven MODERATE npm risks, review independence NOT_RUN, and requirements for actual identity implementation after separate accepted architecture and risk gates. Do **not** declare issue #20 complete or advance to #21.

**VERDICT TO BE RECORDED IN PT-BR after final exact-HEAD CI:** potential technical PASS exclusively for a no-auth safety contract; overall `BLOCKED` for functional identity issue #20 until a separately accepted backend/consent/privacy/storage/provider/security design exists. PR DRAFT / NO MERGE / NO DEPLOY / NO PRIVILEGED CREDENTIALS.

**FINAL HEAD CHECKLIST:** verify exact GitHub metadata, CI for Documentation, Quality, English, SEO, Browser (93 E2E), Accessibility (45 dedicated), Lighthouse and dedicated identity (14 new negative unit cases, four E2E), full diff, ruleset, no HIGH/CRITICAL. Final report lives in PR review or issue comment, not in this self-referential file.
