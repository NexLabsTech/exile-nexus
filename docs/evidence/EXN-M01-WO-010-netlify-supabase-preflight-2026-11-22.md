# EXN-M01-WO-010 | Evidence Bundle parcial: Netlify + Supabase Free-first preflight v2

- **Data:** 2026-11-22
- **Branch/PR:** `exn-m01-wo-010-identity-security-contracts` / #161 Draft, issue #20 OPEN
- **Risco:** HIGH_ASSURANCE (identity/session); **mudança entregue nesta rodada:** preflight sintético fail-closed, sem login real
- **Main BASE SHA:** `9d575553c36658f80245c30f494d4a090983bc57`
- **PR HEAD antes do delta:** `6ca32d8050b60a645a258cf3b38cbbb79db04c7a`
- **PR HEAD deste commit:** registrar via read-back após commit (evitar SHA autorreferente)
- **Decisão:** owner ratificou **Netlify Free + Supabase Free** como direção preferida, mas não o ambiente real, faturamento, credenciais, deploy ou upgrade pago
- **Condição:** `ANONYMOUS_ONLY`, `PREVIEW_ONLY`, R01–R14, US$0 obrigatório, sem Cloudflare novo, sem alterações em `main`

## Source Check / contexto

Checkpoint aceito main: `ffb23d2a48d8f5a7dfc5a2de23af981d9fdc2ad8`.
Decisions Ledger pré-delta: `d01f725192e8d8f38078dadd8f47d286222d285a`.
Scope: `86ec944036f007300fff4057e3cdf18755a4d463`.
DoD: `536d254f7e35fff4fc46d7175ea877e4086b0174`.
Architecture: `649767db871b011ecb8ba31189dd9a565582cfa5`.
Requirements: `14a8766f3a9a5431822b59b18441d9fd0edb548d`.
Threat model: `b02dcfdf8280db97a9e5c2c48bd6afd019eebb11`.
A PR continua a mesma WO/branch. Context Lock deve ser renovado se main ou os documentos críticos mudarem.

## Arquivos alterados nesta rodada

1. `apps/web/src/data/auth-zero-cost-preflight.json` (schema v2, fornecedores e referência Free, no paid fallback)
2. `apps/web/scripts/check-auth-preflight.mjs` (validação exata, fail-closed, estado BLOCKED)
3. `apps/web/tests/unit/auth-zero-cost-preflight.test.mjs` (testes negativos + CLI)
4. `docs/decisions-ledger.md` (ratificação da direção EXN-DEC-0012, ainda não canônica na main)
5. `docs/adr/EXN-M01-WO-010-netlify-supabase-PROPOSED.md` (gates e preflight)
6. `docs/plans/EXN-M01-WO-010-provider-transition-PROPOSED.md` (sequência)
7. `docs/README.md` (índice)
8. Este Evidence Bundle

## Evidências executadas e pendentes

| Prova | Estado / evidência |
| --- | --- |
| Validação local do preflight v2 (Node 22) | **PASS: 9/9** testes de contrato, conteúdo Free, falsificações, documentação e CLI em reprodução isolada sem npm dependencies |
| `auth:preflight -- --expect-blocked` local | **PASS**, retorna `status:BLOCKED`, `productionAuthAuthorized:false` |
| `auth:preflight` sem flag | **PASS como teste negativo**, exit code 1 (refusa autorização) |
| GitHub CI Docs/Quality/Lint/Typecheck/Build/Unit/Browser/SEO/A11y/Identity no HEAD final | **NOT_RUN neste registro inicial**; requer read-back do run no HEAD final |
| Read-back Supabase projetos | **OBSERVADO, não liberado:** a conexão lista uma organização existente, com um projeto `poe2-nexus` `INACTIVE`. Não é prova de ownership do Exile Nexus, plano Free, invoice, cota disponível, licença ou isolamento. Nenhuma mutação efetuada |
| Netlify conta/billing/credit usage | **NOT_VERIFIED**, sem conexão autenticada Netlify nesta execução |
| Supabase organização, billing, quotas e vinculação do projeto | **NOT_VERIFIED**, listagem de projetos não equivale a verificação de custos |
| Google OAuth, domínio, redirects, LGPD, sessões, RLS, revogação, CSRF, limiter estrito, recuperação | **BLOCKED / NOT_RUN** |
| Tests de authenticação real AUTH-01..AUTH-14 | **BLOCKED / NOT_RUN**; nenhum backend foi implementado |
| Deploy, monetização, indexação, merge, checkpoint | **NÃO REALIZADOS** |

**Documentação pública, não conta:** Netlify Free 300 créditos/mês e hard limit; Supabase Free 2 projetos ativos, 500 MB DB/projeto, 50k MAU, 5 GB egress, 1 GB storage e risco de pausa por inatividade. Esses números podem mudar; o contrato de referência deve ser atualizado por WO com evidência antes de qualquer conta real.

## Auditoria preliminar pt-BR e Checkpoint Delta PROPOSTO

- **Aceitável como incremento limitado:** direção ratificada com preflight v2 que permanece bloqueado, sem permissão de billing ou login.
- **Não constitui aceite da issue #20:** autenticação real, LGPD, provider runtime e G01–G04 continuam ausentes. Sem novos direitos de IP/dados econômicos PoE2.
- **Riscos:** limite Free inviabilizar uso real, projeto Supabase inativo não vinculado, controle de custos sem read-back, ausência de prova de RLS e taxa global; não suavizar.
- **Checkpoint Delta proposto, NÃO promovido:** registrar direção Netlify/Supabase ratificada e preflight v2 testado, mantendo #20 OPEN/BLOCKED, PR Draft e próxima WO INELEGÍVEL.
- **STOP:** não executar S01, não criar service/secret/projeto/conta, não fazer upgrade, merge, deploy ou avançar M05/M06.

A auditoria final depende de CI no HEAD exato; logs e conclusão devem ser informados no comentário de read-back da PR sem falsificar o estado inicial deste documento.
