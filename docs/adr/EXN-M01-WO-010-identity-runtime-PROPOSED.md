# EXN-M01-WO-010 · ADR PROPOSED — Identity runtime, provider, sessions and zero-cost guard

- **Status:** OWNER-APPROVED ARCHITECTURAL DIRECTION (2026-11-09); **PROPOSED / NOT ACCEPTED** for actual hosting/provider registration, backend implementation, secrets and deployment. Decision pending canonical PR merge.
- **Date of research:** 2026-11-09
- **Owner:** NexLabsTech · **Issue:** #20 · **PR:** #161 Draft
- **Risk:** HIGH_ASSURANCE (accounts, privileged authorization, sessions and PII); proposed issue label STANDARD does not override owner risk policy
- **Context lock:** accepted main base `9d575553c36658f80245c30f494d4a090983bc57`; PR head must be read back before audit
- **Decision scope:** proposed architecture only, *not* a change to accepted Decisions Ledger, Architecture, Checkpoint or deployment settings
- **Stop:** do not create Cloudflare/Google/Supabase projects, credentials, DNS, cookies, login, production runtime, paid resources, deploy or merge from this ADR

## Problem and source constraints

The public Exile Nexus is Astro 7.4.7 + React 19.3.1 islands, 11 anonymous static routes, original assets and SEO **PREVIEW_ONLY**. Source hierarchy: accepted checkpoint → accepted Decisions Ledger/ADRs → Scope → Definition of Done → Architecture → Requirements → security threat model → actual Git/tests. In the accepted architecture **no** identity provider, backend/server runtime, database, account, privacy legal basis, host origin, or production deployment is selected. EXN-DEC-0008 approves only the static frontend choice and forbids inferring auth/deploy permission. TM-01/04/05/07 and R01–R14 remain binding.

The existing typed policy `ANONYMOUS_ONLY` must remain unchanged, with zero cookies/accounts and privileged paths denied, until a separate owner decision. Tests that merely reject forged client roles are **contract-only**, not cryptographic identity or protected API tests.

## Recommendation: option A, conditional

**PROPOSE** an **Astro static frontend + same-origin Cloudflare Pages Functions (Workers runtime) acting as a Backend-for-Frontend (BFF) + Cloudflare D1 as server-authoritative user/session store + Google OpenID Connect as the *initial external identity assertion provider***. Use an audited, maintained OIDC/OAuth library compatible with Cloudflare Web Crypto. Provider interface is portable and must not allow arbitrary provider substitution. Only `openid` and minimum necessary profile scopes; store stable `issuer + sub`, not an email as the access-control key. Do **not** implement local passwords, magic-link emailing or user-managed credentials in the initial version.

Pages static assets remain accessible anonymously; only `/api/identity/*` and explicit later private API routes invoke Functions. No separate cross-site auth domain or permissive CORS. Pages Functions consume the **Workers Free shared request quota**; **Pages/Workers/D1 are not yet provisioned**, and Cloudflare currently recommends Workers with Static Assets for new projects. Therefore the same-origin Worker Static Assets deployment is a **documented fallback**, not a preapproved replatform. Final choice requires a benchmark and a separate accepted hosting/deployment ADR. Both approaches preserve the Astro pre-rendered frontend and its existing routes.

**Google OIDC is also PROPOSED, not connected or contractually cost-verified.** External production OAuth requires brand/authorized-domain/privacy-policy/redirect checks; Google may require brand verification and potentially other compliance steps. Only requesting basic identity scopes reduces scope, but does not waive requirements. Do not create OAuth credentials, public login buttons or a Google project until approved and legal/financial gates pass. If provider-domain/branding or zero-cost cannot be established, remain `ANONYMOUS_ONLY` and reopen the choice, without broadening access.

### Options compared (for this exact Exile Nexus stage)

| Option | Advantages | Limitations / security and zero-cost dependencies | Recommendation |
| --- | --- | --- | --- |
| **A. Pages Functions/Workers + D1 + Google OIDC** | Static UI preserved; one first-party origin; provider handles passwords; server-owned session and RBAC; free quotas documented | Worker 10 ms CPU/free invocation; D1 read/write/storage quotas; global strict limiter must be proved; verified domain and OAuth registration; you own session/logout/CSRF security | **Preferred conditional proposal** |
| **B. Supabase Auth Free + authorization BFF** | Mature identity product, 50k MAU free advertised, managed login and Postgres | Free projects can pause after inactivity; 500 MB DB, two free projects, vendor/data processing, token revocation semantics, service integration; spend and availability not guaranteed | Fallback if A fails preflight; separate ADR |
| **C. Self-managed passwords / email OTP** | No external IdP after runtime exists | Password hashing/recovery, email delivery costs, abuse, account takeover and complex liability; no audited email gateway approved | **Reject for current WO** |
| **D. Anonymous-only existing static site** | No PII, provider, cookies or billable auth runtime; already tested | Does not meet real identity/session/logout/CSRF acceptance | **Maintain until A/B separately approved** |

### Verified public Free plan limits (research 2026-11-09, not account-specific)

| Service / dimension | Official published Free limit | Critical consequence |
| --- | --- | --- |
| Workers requests | **100,000/day** (shared by Pages Functions and Workers) | Auth endpoint returns 429 when quota exhausted; no silent paid fallback |
| Workers CPU | **10 ms CPU/invocation** | Benchmark actual OIDC signature validation, D1 and handler CPU; **NO PASS without measurement** |
| D1 rows read / written | **5,000,000/day / 100,000/day** | Strong indexing and explicit read/write budgets; on quota failure deny private operations |
| D1 storage | **5 GB total**, max **500 MB per Free database** | Account/session/limit records must use bounded TTL/retention and indexed cleanup |
| D1 recovery | Free Time Travel window **7 days** | Must test restore and protect users deleted after backup; does not replace export/runbook |
| Workers Rate Limiting binding | **Approximate, location-local, eventually consistent** | May be used as cheap outer throttle but **NOT** the only credential/OTP/login limiter |
| Durable Objects Free, if needed | SQLite-backed; **100k requests/day** and published storage/compute quotas | Candidate for a strict serial counter; **not** installed or assumed cost-free at real load |
| Supabase Free alternative | **50k monthly active users**, 500 MB DB, two projects; can pause after 7 days low activity | Paid availability/SLAs cannot be presumed |

Hard US$0 rule: preserve a **Free-only account**, no cards/paid upgrades where the provider permits, no external paid function, no automatic migration. **Cost is not actually verified until read-only inspection of the account, billing settings, quotas and provider terms.** Design caps are safeguards, not proof of zero billing. Proposed soft gates: warn at 50% of a daily allowance; suspend **new auth sessions** at 70%, preserve authenticated/private requests only while reserved budget remains; at 90% or quota/API error, fail closed for all protected operations, leaving **static public routes available**. Exact thresholds and reset behavior must be measured and approved before activation. No guarantees of uptime or unlimited access.

## Trust boundaries, data contracts and identity protocol

```text
Anonymous browser  ---> Astro static route (no cookie, always allowed)
Authenticated browser -- HTTPS same-origin /api/identity/* -->
  Cloudflare BFF (not trusted by client; strict routing, validation, CSRF)
    |---- OIDC adapter: Google OIDC auth code + PKCE S256, state, nonce
    |                   ID-token issuer/audience/signature/expiry/JWKS checks
    |---- D1 primary DB: users, identity_links, sessions (hash only),
    |                   csrf/session metadata, rate_limits, minimal audit
    '---> per-request D1 role/ownership authorization, deny-by-default
Protected resource: only backend can read/write; UI role display never grants privilege
```

**OIDC flow:** (1) explicitly requested login, no automatic identity cookies for anonymous readers; (2) BFF generates 256-bit random one-time state/nonce and PKCE S256 verifier and stores a short-lived, one-use transaction server-side or in authenticated/encrypted server-bound state; (3) fixed HTTPS redirect allowlist and verified same-site callback; (4) verify state, nonce, code_verifier, issuer, audience, signature/JWKS key rotation, exp/iat, single use, token substitution; (5) create/link account using `issuer + sub` only after legal basis/notice accepted; (6) mint a **new** high-entropy opaque session, independent of provider tokens; store only its SHA-256/hash plus immutable principal ID, revocation/expiry/role epoch; (7) set **`__Host-exn_session`** cookie: Secure; HttpOnly; Path=/; SameSite=Lax (unless tested Strict); no Domain; cache `private,no-store`. Never place tokens, secrets or bearer strings in browser storage, URL, logs or CI artifacts.

**Session:** server-minted using Cloudflare Web Crypto CSPRNG (>=256 random bits), indexed **hashed** selector, absolute TTL 7 days and inactivity TTL 30 minutes as *initial proposed test values*, not accepted product policy. Server checks both expirations and revocation per protected request, not cached stale grants. Rotate atomically on login/privilege change/reauth; reject old IDs, session fixation and concurrent replay. `POST /api/identity/logout` atomically revokes the stored hash then expires cookie with identical scope; if D1 is unavailable, no protected request may succeed. Multi-device revoke-all via user session version. Server responses never leak an email/role through public paths.

**Roles:** `anonymous` (public read only); `member` (future own-profile read/write only); `admin` (future explicit operator-only scopes, disabled until independently reviewed). Role grants and permission changes happen only server-side, from signed/approved administrative workflow recorded without PII/secrets. No admin role derived from Google email/domain, query string, browser state, JWT claim or default signup. Each resource query includes authenticated `user_id` owner predicate; check role AND resource ownership. Route-specific deny-by-default RBAC, horizontal/vertical escalation tests. Do not include an actual admin endpoint until a dedicated proof gate.

**CSRF:** on authenticated state-changing endpoints use session-bound synchronizer token verified in an explicit header, fixed expected Origin, Fetch Metadata, SameSite defense in depth. Reject missing/null/foreign Origin without a separately validated fallback, and do not mutate state on GET. OAuth callback uses its distinct one-time `state`/nonce/PKCE proof rather than treating the login redirect as an ordinary session-token POST. Make response `Cache-Control: no-store` and avoid cross-origin credentialed CORS.

**Rate limiting:** before auth, use approximate Workers Rate Limiting only as an outer abuse filter; never claim it enforces globally strict thresholds. For high-risk login/callback/revocation and identity mutations, require **globally consistent/atomic server-side** limit counters with idempotent conditional write and time-window binding (D1 primary with experimentally proven concurrent atomicity; if not demonstrable, choose SQLite-backed Durable Object strict serial limiting only after its own quota/architecture approval). Test parallel multi-region bursts and simultaneous callback replay; if limiting state/DB is unavailable, **fail closed** for protected writes/identity endpoints. No per-process JavaScript Map as durable security control. Use minimally retained, purpose-bound pseudonymous abuse keys (HMAC of actor/network only where privacy policy permits), short TTL and redacted analytics. Return 429 + conservative Retry-After for enforced limits; avoid account enumeration.

**Minimum D1 logical schema (draft, not a migration):**
- `identity_users`: internal pseudonymous UUID, status, role, role_epoch, created_at, deleted_at
- `identity_links`: user_id, issuer, subject (unique tuple), last_verified_at; do not persist access/refresh/id tokens
- `identity_sessions`: SHA-256(hash) PK, user_id FK, created_at, last_seen_at, expires_at, revoked_at, role_epoch, csrf verifier hash; no plaintext secret
- `identity_oidc_transactions`: one-use state hash, nonce verifier, PKCE verifier server-side encrypted/appropriate secure store, expires_at, consumed_at
- `identity_rate_counters`: purpose/key hash/window key/count/expiry, atomic write preconditions
- `identity_audit_minimal`: event_type, pseudonymous actor_id, result, timestamp, retention_deadline; **no** raw IP, tokens, emails, credentials or OAuth codes

Define indexes, cleanup thresholds, reversible migrations, export/deletion and backup restore before enabling a D1 binding. Avoid asynchronous, eventually consistent D1 replica for session/revocation/strict rate decisions. The backend keeps a fixed origin; never trust forged Forwarded headers to derive cookie or redirect origin.

**Privacy and compliance (Brazil/LGPD):** before first actual subject is imported, owner approves data controller/operator roles, minimum collected fields, specific purpose/legal basis (not all necessary cookies require blanket consent), readable privacy notice/terms, provider disclosures/international transfer analysis, deletion/export, retention, audit access, incident response and security contact. User opt-out/deletion invalidates all sessions/identities and is tested against backup restoration. A vendor privacy page alone is not sufficient.

## Failure, recoverability and rollback

- **Fail closed** for revoked/unknown/expired sessions, missing CSRF, mismatched OIDC assertions, unavailable D1/limiter, exceeded free quota, unknown role or missing audit approvals; static public site still loads anonymously. Do not fallback to localStorage/mock admin.
- `AUTH_ENABLED=false` by default, changed only through independently approved protected release; test that preview/PR CI cannot enable it and credentials never reach untrusted PR workflows.
- D1 Free Time Travel currently offers 7 days; test local migrations, versioned backup export, restore to isolated test DB, reapplication of revocation/deletion tombstones and rollback of application code. No actual D1 resource is created in this decision.
- Rollback protocol: flag off → deny protected writes/new logins → revoke all sessions (when server exists) → preserve public anonymous pages → repair/migrate if reversible → audit replay and consent state before re-enable. Roll-forward migration preferred where downgrades risk integrity.
- Simulate D1 429/quota failure, Worker 10ms CPU cap, OIDC outage, stale JWKS, replay, malformed OAuth callback, concurrent race and data-deletion-after-backup. **Do not** make availability promises for the Free plan.

## Decision gates (all PENDING)

| Gate | Objective proof required | Current |
| --- | --- | --- |
| A0 Source lock | Approved base/ADRs, no conflicting checkpoint; proposed ADR reviewed by owner | PENDING |
| A1 Architecture + billing | Owner selects hosting backend, provider and DB explicitly; account-level read-back Free status, quotas, overage/upgrade controls and domain costs | BLOCKED |
| A2 Privacy/data | Legal basis, disclosures, retention, deletion, recovery, transfers, role of each processor approved | BLOCKED |
| A3 Threat model | Independent security review of trust boundaries, roles, OAuth, CSRF, limiter, storage, rate/cost attacks | NOT_RUN |
| A4 Proof implementation | Auth contract suites, DB rollback/rotation/race, OAuth fixtures, no secrets, SAST/SCA, E2E on isolated local emulator and selected hosted runtime | NOT_RUN |
| A5 Release | Zero HIGH/CRITICAL, independent HIGH_ASSURANCE verdict, CI green, real owner authorization, real deployment/change budget separately approved | BLOCKED |

**ADR verdict:** **RECOMMENDED FOR OWNER CONSIDERATION ONLY**, not `ACCEPTED`. The owner must separately authorize architecture/provider, data privacy, budget guard and implementation before enabling a backend. **Do not merge PR #161, close issue #20, publish SEO or start #21 based on this proposal.**

## Verifiable references (official, consulted 2026-11-09)

- [Cloudflare Pages Functions Free limits](https://developers.cloudflare.com/pages/functions/pricing/)
- [Workers limits](https://developers.cloudflare.com/workers/platform/limits/) and [Workers static assets](https://developers.cloudflare.com/workers/static-assets/)
- [D1 pricing](https://developers.cloudflare.com/d1/platform/pricing/) and [D1 limits/recovery](https://developers.cloudflare.com/d1/platform/limits/)
- [Workers Rate Limiting: local and approximate, strict via Durable Objects](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/)
- [Durable Objects Free pricing](https://developers.cloudflare.com/durable-objects/platform/pricing/)
- [Cloudflare Web Crypto](https://developers.cloudflare.com/workers/runtime-apis/web-crypto/)
- [Google OpenID Connect authentication](https://developers.google.com/identity/openid-connect/openid-connect) and [production OAuth/brand/domain policies](https://developers.google.com/identity/protocols/oauth2/production-readiness/policy-compliance)
- [Supabase Free pricing](https://supabase.com/pricing) and [inactivity pausing](https://supabase.com/docs/guides/platform/free-project-pausing)
- [OWASP Session Management](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html) and [OWASP CSRF Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)

## Owner direction acceptance (2026-11-09; integration not approved)

The owner replied **“Aprovado continue”** following the architecture evaluation. This approves the **conditional architectural direction** of same-origin Cloudflare BFF + D1 + Google OIDC, while preserving anonymous public routes and HIGH_ASSURANCE gates; it does **not** authorize choosing Pages Functions versus Workers Static Assets, creating Cloudflare/Google accounts or OAuth credentials, enabling backend/session cookies, processing PII, paying fees, merging or deploying. The associated [proposed ledger record EXN-DEC-0011](../decisions-ledger.md) stays on PR #161 Draft until owner authorizes normal merge. G01 account Free/billing evidence, G02 privacy, G03 isolated test environment authority and G04 security evidence verification remain pending. Therefore S01 is still BLOCKED. Public Free plan docs are not account-specific cost proof.
