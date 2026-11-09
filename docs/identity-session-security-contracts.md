# EXN-M01-WO-010 — Identity, sessions and access roles · security contracts (PROPOSED)

- **Issue:** [#20](https://github.com/NexLabsTech/exile-nexus/issues/20)
- **Work Order:** EXN-M01-WO-010
- **Risk:** **HIGH_ASSURANCE** under owner engineering policy, overriding the issue's *proposed* STANDARD classification for privileged authentication
- **Status:** PROPOSED / READ-ONLY SECURITY FOUNDATION; **BLOCKED** for functional identity, sessions, logout and privileged auth until infrastructure/architecture/consent choices are separately accepted
- **Repository base:** `9d575553c36658f80245c30f494d4a090983bc57`, accepted EXN-M01-WO-009 checkpoint
- **Authority:** checkpoint → approved Decisions Ledger → Scope → DoD → Architecture → Requirements → threat model/test plan → code and evidence
- **No new decision is accepted by this document**, and no real user/credential/account is created by it.

## Explicit source check and constraints

`docs/architecture.md` states no persistence, authentication, API, provider or runtime server has been selected; the app is Astro/React static-first and Cloudflare Pages Free is a *candidate*, **not** an active deployment. `docs/security-privacy-threat-model.md` blocks collecting identifiers or non-essential cookies without purpose, legal basis, disclosure and retention/deletion controls (TM-05) and secret exposure (TM-04), quota/spend overruns (TM-07), and unsafe PR secrets (TM-01). `docs/decisions-ledger.md` EXN-DEC-0008 does not authorize backend, API, deploy, credentials or third-party subscription. Current public UI and seven sections remain anonymous, synthetic and SEO `PREVIEW_ONLY`.

The issue's acceptance criteria **require real verification** of sessions, logout, roles, CSRF and rate protection. These cannot be credibly certified in a frontend-only static build or by synthetic fakes. Shipping a client-controlled role, "login" mock, JWT parser with no signature verification, or localStorage sessions as identity is **forbidden**. Thus the first necessary increment is a **deny-all-by-default, testable contract and architecture choice dossier**, not a production auth service.

## Security invariants and proof obligations (mandatory before any live ENABLED mode)

| ID | Invariant / required evidence | Current state |
| --- | --- | --- |
| AUTH-01 | Public visitors can navigate original Home and preview pages **without account**, cookies or external identity endpoint. | Verified by browser / static contract |
| AUTH-02 | All privileged actions (profile persistence, manage users, admin, publish, write) deny by default, regardless of forged `role`, bearer token, or frontend code. | Contract-only verified; no privileged endpoints exist |
| AUTH-03 | Server selects and verifies principal per request; never trust client-supplied `userId`, `role`, token body, unsigned JWT or URL parameter. | **BLOCKED**: no accepted backend |
| AUTH-04 | Session IDs use a cryptographic RNG server-side, are opaque, never logged, stored hashed server-side and rotated at login/privilege change; lock expiry and inactivity TTL with clock skew. | **BLOCKED** |
| AUTH-05 | Logout revokes session server-side, prevents reuse/replay including concurrently issued requests; correct HTTP cookie deletion and client cache invalidation. | **BLOCKED** |
| AUTH-06 | Session cookie `Secure; HttpOnly; SameSite=Lax/Strict`, server-set, exact first-party origin, host-only, correct `Path`, no insecure `Domain` sharing, no credentials in `localStorage`. | **BLOCKED** |
| AUTH-07 | CSRF protection for every state-changing cookie-authenticated request: Origin/Fetch-Metadata enforcement plus verified token bound to session/request; deny on missing/invalid/foreign origin; no GET side effects. | **BLOCKED** |
| AUTH-08 | Login/logout/password-reset/OTP endpoints use persistent server-side rate limits resistant to concurrent callers and distributed requests, enumeration protection and failure-safe behavior if quota/limiter unavailable. | **BLOCKED** |
| AUTH-09 | Role matrix server-authoritative and **explicit deny by default**. Member never becomes admin from UI/storage or forged claims; admin functions separately restricted, logged without personal secrets. | Static policy PASS only; live **BLOCKED** |
| AUTH-10 | OAuth/OIDC, if chosen, must verify issuer, audience, nonce, state, PKCE, expiration, redirect allowlist and key rotation; no developer tokens/temporary credentials in PR CI. | **BLOCKED** |
| AUTH-11 | Privacy, collection purpose, notice, legal basis, retention/deletion/export, minimal profile fields, incident response and redaction reviewed before real identities. | **BLOCKED** |
| AUTH-12 | Real deployment origin/DNS, provider/free quota limits, roll-forward/back, user deletion/migration and disaster recovery supported by evidence. **US$0 hard cost ceiling** without automatic paid fallback. | **BLOCKED** |
| AUTH-13 | Proof of tests: unit/negative role/unauthenticated boundaries, integration login/logout/rotation/revocation, race and rate-limit, CSRF replay, cross-user/resource isolation, session fixation, browser cookie attributes, authenticated E2E, threat model, static analysis, independent review or documented HIGH_ASSURANCE exception before production. | Partial contract tests only; live **BLOCKED** |
| AUTH-14 | Do not change `PREVIEW_ONLY` SEO, R01–R14 data rights, public anonymous access, visual baselines or accepted architecture while preparing the auth foundation. | Enforced by scope/diff |

## Proposed decision options (neither approved)

**Option A: Cloudflare Workers/Pages Functions + D1 session store**, with server-only cookies, hashed opaque sessions and transactional revocation. Pros: ecosystem fit; risks: Cloudflare free quotas, D1 query limits, consistency/cost, Pages Functions complexity, auth-provider burden, required migration/backup and abuse protection. Cloudflare Pages/Workers/D1 remain unprovisioned and *not selected*. No guarantee of free eligibility or cost until live account and quota verified.

**Option B: audited third-party identity/OIDC provider**, backend verifies tokens and maintains session/revocation state via a separately accepted store. Pros: fewer password-handling duties; risks: service tiers/availability, user data transfer and legal terms, vendor dependency and free caps. No external login service selected or connected.

**Option C: anonymous-only for the current static preview, defer identities entirely.** This is **the implemented behavior now**, not an approval to omit #20 indefinitely. Users still access all original public pages; every identity/private action is unavailable and denied. Revisit A/B only when the owner approves an architecture, consent/retention and deployment prerequisites in a separate Work Order/ADR.

No provider should be installed, account created, secret generated, DNS updated or login screen published from this proposal. Do not treat the fictional data/search fixtures as real accounts.

## Implementable contract scope of this PR

A versioned `ANONYMOUS_ONLY` identity policy and TypeScript access boundary deliberately reject all privileged operations and any claimed principal. The security check must fail closed if the policy is changed to `ENABLED` without an accepted runtime design, real proof of role/CSRF/session backend and tests. CI asserts the static build contains no login/admin/cookie/session route and that anonymous navigation remains functional.

Write repeatable negative tests for forged admin roles, session IDs, bearer strings, missing/stale policy, unknown operation, duplicate permissions, disabled required privacy gates and accidental public login routes. The validator must **not** claim that logout, anti-CSRF or rate-limits have been implemented. Tests that only model these future features are **CONTRACT_ONLY**, not real end-to-end security proofs.

## Acceptance, evidence and stop

This PR can earn **APPROVED TÉCNICO only for the anonymous fail-closed safety contract** and CI gating, not for the actual identity/session/login issue Definition of Done. Overall issue #20 remains **BLOCKED / INCOMPLETE** until a separately accepted architecture, privacy plan, provider/storage, test environment and actual high-assurance implementation are proven. Owner may approve future work after assessing the decision dossier; do not promote this proposed choice to the Decisions Ledger or close #20 while blocked.

No merge, deploy, source/rights promotion, spending, secrets, accounts or advance to another WO. Keep PR Draft and record objective risks, source fingerprints, exact SHA and pending proofs in an Evidence Bundle and pt-BR audit.

## Adendo de avaliação arquitetural — 2026-11-09 (PROPOSED)

O [ADR PROPOSED de identidade e runtime](adr/EXN-M01-WO-010-identity-runtime-PROPOSED.md) compara Cloudflare Pages Functions/Workers + D1 + Google OIDC, Supabase Auth Free, autenticação própria de senhas e o estado anônimo. Recomenda condicionalmente o primeiro, mas **não escolhe nem provisiona** backend, D1 ou provedor, e não promove nenhuma decisão aceita.

O [plano HIGH_ASSURANCE de implementação](plans/EXN-M01-WO-010-high-assurance-implementation-plan.md) define as etapas dependentes S01–S06 **dentro da mesma EXN-M01-WO-010**. As fases não são novas Work Orders nem autorização para executá-las. Antes do primeiro incremento funcional são obrigatórios aceite explícito do ADR, elegibilidade US$0 lida na conta, decisão de privacidade/LGPD, segurança da sessão, teste de limite global atômico, revisão independente e ambiente de prova autorizado.

A documentação pública da Cloudflare confirma que seu Rate Limiting binding é **aproximado/local**, não um limitador global estrito; D1 e Workers Free têm quotas finitas. A proposta de rate limit atômico via D1 ou Durable Object depende de prova de concorrência e cota antes de adoção. Google OIDC exige verificação de emissor/audiência/nonce/PKCE/state e conformidade de produção (domínio/verificação de marca e política de privacidade). Sem essas provas, a única política atual segue `ANONYMOUS_ONLY`, e issue #20 continua **BLOCKED** para autenticação real.

Nenhum valor de quota, decisão de fornecedor, cenário de custo, prova simulada ou recomendação desta seção pode ser interpretado como liberação de domínio, serviço, segredo, dado pessoal, indexação, deploy ou merge da PR #161.
