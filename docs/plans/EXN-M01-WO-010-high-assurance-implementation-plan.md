# EXN-M01-WO-010 · HIGH_ASSURANCE Implementation Plan (PROPOSED)

- **Status:** owner approved preferred architectural DIRECTION on 2026-11-09, but G00 is only PARTIALLY SATISFIED, G01/G02/G03/G04 remain BLOCKED/NOT_RUN; S01 NOT AUTHORIZED. Issue #20 stays OPEN/BLOCKED, PR #161 Draft.
- **Scope:** exclusively stable Work Order `EXN-M01-WO-010`; no #21, no new issue, no independent PR/branch unless an owner-approved correction requires it
- **Baseline:** accepted `main` `9d575553c36658f80245c30f494d4a090983bc57`; existing PR #161 branch `exn-m01-wo-010-identity-security-contracts`
- **Risk:** HIGH_ASSURANCE (privileged access, user identity, session cookies, CSRF, persistent state and reversible/unrecoverable data mutations)
- **Recommendation:** conditional [ADR PROPOSED](../adr/EXN-M01-WO-010-identity-runtime-PROPOSED.md); **do not promote it into Decisions Ledger** until explicit approval

## Work Order

**OBJECTIVE:** deliver verifiable user identity, server-authoritative sessions/logout, access roles, CSRF/rate-limits and privacy, while maintaining all anonymous sections and hard US$0 operating cost.

**CONTEXT:** existing anonymous Astro/React static app and approved preview-only SEO. Current `ANONYMOUS_ONLY` policy is accepted only as a tested *proposal* on a Draft PR and cannot authenticate users. Neither auth provider nor backend/storage is an accepted design.

**SCOPE (NECESSARY once approved):** first-party BFF server contract, audited OIDC code flow, pseudonymous minimum identity, cryptographically secure opaque sessions, server-side revocation/rotation, deny-by-default RBAC, CSRF, globally consistent limits for security-sensitive routes, zero-cost gates, privacy/retention/erasure, incident/recovery controls, fail-closed deployment flag and full negative/integration/E2E security proofs.

**OUT OF SCOPE:** password/OTP-by-email auth, admin UI beyond strictly necessary proof, social provider expansion, user profile features unrelated to issue #20, gameplay data, new commercial rights, permanent analytics/cross-site trackers, paid services, UI rebrand, SEO promotion, production deployment, issue #21 or broad cleanup.

**FILES / SOURCES TO READ:** `docs/checkpoint.md`, `docs/decisions-ledger.md`, `docs/scope.md`, `docs/definition-of-done.md`, `docs/architecture.md`, `docs/requirements.md`, `docs/security-privacy-threat-model.md`, `docs/test-plan.md`, `docs/deployment-plan.md`, `docs/identity-session-security-contracts.md`, current ADR PROPOSED, `apps/web/src/data/identity-security-policy.json`, `apps/web/src/lib/identity-contract.ts`, `apps/web/scripts/verify-auth-boundary.mjs`, app and CI tests, GitHub PR #161 metadata/diff/checks.

**SOURCE LOCK / RECOMPILE:** Record BASE/head SHA, issue, PR branch and Git blob fingerprints for checkpoint, decisions, scope, DoD, architecture, requirements, security model and policy. Current baseline fingerprints in existing [Evidence Bundle](../evidence/EXN-M01-WO-010-identity-security-contracts-2026-11-08.md). On change to a critical source, mark plan `STALE`, read new canonical version, rebase safely in the same PR with fresh fingerprints; no blind overwrites.

**ARCHITECTURE RULES:** preserve static public Astro+React islands; identity via first-party server BFF; backend is sole principal and RBAC authority; minimal user data; no secrets in PR workflows; SSR/static and all original pages remain accessible anonymously; FROZEN `PREVIEW_ONLY`/R01–R14 and no surprise expenses.

**CONSTRAINTS:** no remote credentials, accounts, projects or services created before explicit approval; Free-tier quota and account eligibility read-back before resource provisioning; fail closed on quota/provider/DB/limiter outage; no force push, bypass, self-approved ADR, deployment, auto merge, or unsupported claims.

**ACCEPTANCE CRITERIA:** AUTH-01 through AUTH-14 proof obligations each have exact passing evidence, zero known HIGH/CRITICAL, no private/anonymous regression, financial ceiling proven on the actual account, independent HIGH_ASSURANCE review, owner approval and DoD met. `NOT_RUN`/`BLOCKED` means *not accepted*, never a synonym for PASS.

**TESTS:** reproducible unit/negative/OIDC fixture/CSRF/cookie/reauth/DB/migration/race/limiter integration, Playwright browser and scanner tests, lint/TS/build, static rights/SEO, SAST/SCA, concurrency/DoS, record deletion/restore, performance under Workers Free 10 ms CPU and quota failure, dependency and privacy audits.

**DELIVERABLES:** same-PR implementation behind disabled flag after approval; versioned schema/API contracts; migration/recovery plan; test vectors, logs, sanitized traces and explicit proof gaps; Evidence Bundle base/head, affected files, test matrix and approved decision; independent review and proposed checkpoint delta, **never promoted by executor alone**.

**REVIEW FORMAT:** final **pt-BR** verdict with BASE/HEAD SHA, diff, ADR state, requirement/DoD traceability, risk matrix, security/privacy/cost, CI/logs, manual tests vs automation, rollback, unresolved defects, and `APPROVED / CORRECTION REQUIRED / BLOCKED`.

**STOP CONDITION:** any missing owner decision, real cost/eligibility uncertainty, unverified OAuth origin, consent/legal/retention gap, secret leak, failing regression, no independent HIGH_ASSURANCE review, or HIGH/CRITICAL defect. No next increment or issue if a correction or decision is still blocked.

## Decision and prerequisite gates

| Gate | Necessary evidence | Verifiable state now |
| --- | --- | --- |
| G00 · Architecture owner approval | Signed owner choice: Pages Functions vs Workers Static Assets, Google OIDC vs alternative, D1/strict limiter, security/privacy policy; accept ADR with explicit scope and budget | **BLOCKED: ADR PROPOSED** |
| G01 · Cloud account and cost read-back | Exact Free plan, billing/upgrade controls, existing usage/quotas, Workers CPU, D1/DO Free eligibility, OAuth branding/domain and legal processor terms. No cost source can be guessed. | **NOT_RUN** |
| G02 · Legal/privacy and roles approval | LGPD purpose/legal basis, notices, retention/deletion/export, processor transfers, admin provisioning and incident owner, approved retention durations | **BLOCKED** |
| G03 · Test environment authority | Permission for isolated local emulator and future hosted test env; secrets never injected into untrusted PR CI; real Google project only after explicit authorization | **BLOCKED** |
| G04 · Independent security review method | Qualified separate reviewer or explicitly authorized independent verifier with distinct context, complete security threat findings, audited proof report. No false independence claims | **NOT_RUN** |

## Conditional implementation sequence within the SAME EXN-M01-WO-010

**OWNER APPROVED the architectural direction, not G01/G02/G03/G04 or S01; do NOT execute these stages now.** Each stage is a *future gated subincrement* of the same stable WO; it must reach auditable PASS and owner authorization where required before proceeding. The current PR #161 remains Draft, and the existing anonymous policy remains unchanged until the gate authorizes a future adjustment.

### EXN-M01-WO-010 / S01 · Backend threat contracts and runtime adapter (NECESSARY only after G00/G01/G03)

- Inspect current Git and confirm accepted ADR exact SHA; select compatible Cloudflare BFF API adapter, no auto-runtime upgrade or new production service.
- Implement typed handler/interface for `GET /api/identity/session`, `POST /api/identity/logout`, OAuth start/callback, `/api/identity/csrf` and any strictly necessary private write endpoint **only in isolated tests with feature flag off by default**. Preserve static routes and original SEO.
- Every unknown route/method/body yields explicit 404/405/400; no auth cookie or header leak in an anonymous response; no `CORS:*` with credentials. `GET /api/identity/session` is read-only and returns only minimally necessary current viewer, never internal token.
- Negative tests for untrusted headers and role claims, request size, route guards, CORS bypass, origin mismatch and presence/absence of API in built artifact when flag off.
- **Deliver:** contract files, error/status API specification, unit + E2E static/browser checks, CPU baseline and Evidence Bundle delta.
- **STOP:** provider/backend/runtime unspecified, private route visible when disabled, nonzero unintended auth requests, unknown cost.

### EXN-M01-WO-010 / S02 · Minimal D1 model + reversibility (NECESSARY after S01 and G02)

- Version schema and migration files for `identity_users`, `identity_links`, `identity_sessions`, `identity_oidc_transactions`, `identity_rate_counters`, minimal redacted audit (see ADR); **synthetic local test records only**.
- Enforce composite unique `(issuer, subject)`, per-user foreign keys, indexes, hashed tokens and one-use state; schema never stores raw OAuth tokens or password fields.
- Exercise rollback/roll-forward, migration from empty state, idempotency and conflicts; test backup-to-test restore and tombstone replay so deleted users are not resurrected.
- Document data deletion/export, backup retention and residency decisions under LGPD. Never claim a backup of a real D1 database was tested unless such an environment is authorized and evidence captured.
- **STOP:** schema cannot guarantee atomic session revocation/limits, retention undefined, quota/backup cost unverified.

### EXN-M01-WO-010 / S03 · External OIDC adapter with deterministic test issuer (NECESSARY after S02, G00/G02)

- Use a reviewed maintained OIDC library. Build **offline synthetic** issuer/JWKS/PKCE/state/nonce fixtures, not real Google credentials. Proposed Google ID flow is auth-code+PKCE S256, issuer/audience/nonce/expiration/signature validated; link only issuer+sub.
- Threat tests: forged JWKS key, alg=none, key confusion, wrong issuer/audience/nonce, state/code replay, redirect to unapproved origin, invalid PKCE verifier, expired token, repeated callback, account-link takeover, Google outage and JWKS rotation.
- Test property that signup never auto-grants admin, never trusts email suffix, never persists provider access/refresh token or response with identity secrets, and that anonymous reader gets no cookie.
- **STOP:** no independent verification, no OAuth provider brand/domain/privacy approval for later real login.

### EXN-M01-WO-010 / S04 · Opaque sessions, revocation and server-authoritative roles (NECESSARY after S03)

- Server generates high-entropy opaque session token with Web Crypto; stores only hash. `__Host-exn_session; Secure; HttpOnly; SameSite=Lax; Path=/`, no Domain; TTL limits **proposed** 7d absolute / 30m idle until owner confirmation.
- Deny invalid/expired/revoked hash and role-epoch mismatch on **every** protected request; rotate on login, privileged change, reauth; atomic logout and revoke-all, no cache stale reuse.
- Resource API checks **subject and ownership server-side**, default deny and complete matrix: anonymous can read public; member only own resources; admin disabled until separate privilege proof. Anonymous site remains cookie-free.
- Tests: session fixation, stolen/stale cookie, replay/race while logout writes, role elevation by browser, tenant/user ID tampering, cookie flags in real browser, concurrent revoke-all, D1 primary consistency under load and outage.
- **STOP:** any protected request survives revocation; owner cannot approve a missing concurrency proof.

### EXN-M01-WO-010 / S05 · CSRF, rate limiting and anti-abuse (NECESSARY after S04)

- Session-bound synchronizer CSRF token verified on every state-changing authenticated request; explicit trusted Origin + Fetch Metadata; test missing/null/cross-site/invalid/expired tokens, form encoding tricks, GET state mutation and forged CORS origins.
- Approximate Cloudflare Rate Limiting binding allowed only as outer throttle. Security-sensitive routes must have **atomic globally enforceable** counters on D1 primary, proven under concurrent distributed requests; if not proven, only a separately approved SQLite Durable Object limiter may be adopted. No memory-only or approximate-only security limit.
- Protect OAuth start and callback replay, logout storms, account linking, role changes, IP/correlated abuse with privacy-preserving pseudonymous keys; mask enumeration. 429/Retry-After on abuse, 503 fail-closed when DB/limiter unavailable.
- Verify Free quota exhaustion and CPU budget: public static routes continue, private routes stop, no billable fallback. Test 10ms Worker CPU under realistic OIDC verification and lock contention; if exceeded under Free **BLOCKED**.
- **STOP:** missing global strict limiter, race bypass, material CPU overage, unapproved abuse data storage.

### EXN-M01-WO-010 / S06 · Privacy, recovery and independent evidence (NECESSARY after S05)

- Implement only approved legal/retention obligations; minimum pseudonymous data, right-to-erasure/export, identity unlink and audit event TTL; test revocation on delete and restored backup with deletion tombstones.
- Simulate OIDC failure/rotation, D1 unavailable/limits, corruption, migration conflict, CSRF replay and session revocation while requests in flight; record roll-forward and emergency flag-off to anonymous.
- **Independent** security review of diff/logic/abuse and proof obligations AUTH-01..14, including architecture risk acceptance. Run all GitHub required checks + SAST/SCA + unit/integration/e2e/regression + load budget, test actual authorized runtime once it is separately provisioned with approval.
- Final Evidence Bundle with exact base/head, all files, CI runs, proof obligations per row PASS/FAIL/NOT_RUN, costs/quota read-back, privacy and rollback; no CI GREEN substitution for actual auth/CSRF evidence.
- **STOP:** any residual HIGH/CRITICAL, unpaid service, unresolved privacy issue, incomplete proof, no independent verdict.

## Proof obligations matrix and exit criteria

| Source invariant | Test/proof required | Can pass now? |
| --- | --- | --- |
| AUTH-01 Public anonymous | 11 static route e2e, no cookie/storage and no login requirement | **YES: existing preview tested** |
| AUTH-02 Default deny private operations | Unit negative claims plus server 401/403 integration once runtime exists | **PARTIAL: unit only** |
| AUTH-03 Server verifies principal | OIDC signed assertions/issuer/sub + backend reject counterfeit | **NO** |
| AUTH-04 Session rotation/expiry | DB hashed token, fixture clocks, fixation/concurrency | **NO** |
| AUTH-05 Logout/revocation | Atomic DB invalidate + replay under in-flight race | **NO** |
| AUTH-06 Cookie hardening | Browser set/delete flags and host/origin tests | **NO** |
| AUTH-07 CSRF | State-changing origin/token/FetchMetadata negative matrix | **NO** |
| AUTH-08 Persistent strict abuse limits | Multi-request/multi-region concurrency and outage fail-closed | **NO** |
| AUTH-09 RBAC ownership | Protected backend row-level ownership plus forgery tests | **NO** |
| AUTH-10 OIDC robustness | issuer/aud/exp/nonce/state/PKCE/JWKS/redirect/replay vectors | **NO** |
| AUTH-11 Privacy LGPD | Approved legal basis, notice, retention/deletion/export proofs | **NO** |
| AUTH-12 Cost/recovery | Actual account Free read-back, quotas, CPU load, D1 restore | **NO** |
| AUTH-13 Independent HIGH_ASSURANCE | Independent signed/diff-anchored review, SAST, E2E integration | **NO** |
| AUTH-14 No regression to preview/rights | SEO PREVIEW_ONLY, 11 routes, English/accessibility/visual baselines | **YES: existing CI, future rerun** |

**DoD decision:** completion of issue #20 requires *all* applicable live-auth proofs after accepted architecture and owner authorization. Passing a static proof or writing an ADR does NOT satisfy #20. Do not merge #161 or start #21 under this request. On accepted work, a correction stays in the **same Work Order and PR**; checkpoint may only be updated after objectively verified review and owner approval.

## Ownership / review output

After the owner decides among the ADR options, provide a new Context Lock and EXACTLY the next NECESSARY subincrement S01 in the current PR, without skipping S02..S06. If approval is absent or scope conflicts with the Source Pack, report **BLOCKED** with the precise missing evidence and STOP. No automatic GitHub writes beyond this requested documentary plan.
