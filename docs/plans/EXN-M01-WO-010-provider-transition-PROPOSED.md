# EXN-M01-WO-010 | Provider-switch gate plan: Netlify + Supabase (PROPOSED)

- Data: 2026-11-22
- Issue #20, mesma PR #161 e mesmo Work Order; **não criar nova WO ou branch**
- Estado: **PLANNING ONLY / BLOCKED**. Este documento não autoriza implementação nem provisionamento.
- Referência de arquitetura proposta: [ADR Netlify/Supabase](../adr/EXN-M01-WO-010-netlify-supabase-PROPOSED.md)
- Legacy/histórico: [ADR Cloudflare](../adr/EXN-M01-WO-010-identity-runtime-PROPOSED.md), mantido para auditoria mas não como direção operável.

## Context Lock e drift

Baseline main verificado 2026-11-22: `9d575553c36658f80245c30f494d4a090983bc57`; HEAD PR antes desta proposta: `c7f3844b91a65f2e06180ab959d97ffe7712860b`. Atualizar SHAs reais e fingerprint de checkpoint/Ledger/Scope/DoD/Architecture/Requirements antes de qualquer execução. Mudança de provedor invalida as premissas Cloudflare de G01, S01–S06 e os limites programados do manifesto de preflight. Classificar o trabalho específico do provedor anterior como STALE; preservar provas genéricas de segurança e testes sintéticos positivos.

## Gate map: a ordem continua G00 → G01/G02/G03/G04 → S01..S06

| Gate | Prova NECESSARY | Estado |
| --- | --- | --- |
| G00 | Owner ratificou a direção Netlify Free + Supabase Free em 2026-11-22; modo de sessão, compatibilidade executável e runtime ainda exigem provas antes da implementação | RATIFIED_DIRECTION / PARTIAL |
| G01 | Conta Netlify Free e créditos/billing/upgrade; organização Supabase Free, consumo/invoices/capacidade/limites; propriedade do projeto, domínio, callback Google OAuth e custo US$0 verificáveis | **PARTIAL_EVIDENCE / BLOCKED**: `plan=free` / `tier=tier_free` Supabase confirmado; Netlify, billing, domínio/OAuth e quotas reais NOT_VERIFIED |
| G02 | LGPD: privacy notice, controller/processors, localização, finalidade, retenção, exclusão, export, incident response; autorização de coleta | BLOCKED |
| G03 | Ambiente isolado aprovado para integração local/hosted, benchmark de cold start, timeout, token validation e controle de gasto; nenhum segredo em CI não confiável | BLOCKED |
| G04 | Provas AUTH-01..14 no backend, RLS e concorrência, revogação, CSRF, limiter transacional, restore, 0 HIGH/CRITICAL e auditoria em pt-BR | NOT_RUN |
| S01 | Implementar SOMENTE o subincremento necessário da mesma WO após precedentes aprovados | NOT_AUTHORIZED |

## Sequência de adaptação no Codex (quando permitida)

1. Inspecionar main e PR #161, ADRs, DoD, workflow, scripts e testes; renovar Context Lock. NÃO executar port Cloudflare por consequência histórica.
2. Direção Netlify/Supabase RATIFICADA pelo owner em 2026-11-22; manter implementação e operação BLOCKED até G01–G04 e aprovação de provas.
3. Provar plan/billing/accounts por read-back legítimo e redigido. Sem acesso, registrar NOT_VERIFIED. Não criar conta, projeto, secrets, DNS ou OAuth sem aprovação.
4. Aprovar privacidade, esquema de sessão e prova de RLS; para desenho local usar apenas fixtures sintéticas.
5. Nesta mesma WO, o manifesto e `auth:preflight` foram atualizados para Netlify+Supabase **PUBLIC_REFERENCE_ONLY / BLOCKED**, com testes negativos. Em futura implementação, revalidar os limites de conta por read-back e preservar `ANONYMOUS_ONLY` e `PREVIEW_ONLY` até autorização.
6. Só então executar S01 → testes/evidências/auditoria → aceite owner. Demais subincrementos ficam BLOCKED até o anterior ser aprovado.
7. Ainda não avançar M02/M05/M06 Divine Intelligence; R03/R05 e a issue #20 continuam gates próprios.

## Cenários de upgrade (não autorizados nesta proposta)

- Lançamento: Netlify Free + Supabase Free, apenas quando uso e direitos estiverem autorizados; SEO publica somente após gate específico, não por mudar hosting.
- Netlify 50/75/90% dos créditos: alertar; se a quota esgotar, site pode pausar. Upgrade Personal/Pro somente com orçamento aprovado e teste de custo.
- Supabase quota DB/MAU/egress e risco de pausa por inatividade: alertar; Pro sujeito a cobrança mínima, compute por projeto e overages, com spend cap onde disponível.
- Teste de migração em ambiente isolado, backup/restore, variações de origem OAuth, rollback, zero segredos publicados. Nunca ligar auto recharge nem fazer upgrade silencioso.
- Não inventar domínio, volume, custo da conta ou conclusão de prova de segurança.

## Preflight de referência ajustado sem habilitar S01

- `apps/web/src/data/auth-zero-cost-preflight.json` versão 2 declara somente limites oficiais de Free, `monthlySpendCeilingUSD:0`, upgrade manual, projeto de Supabase `NOT_VERIFIED` e produção `BLOCKED`.
- O CLI e testes negativos rejeitam alteração de provider, promoção de conta/upgrade, payload malformado, claims falsificadas e documentação fora das URLs oficiais; sem `--expect-blocked` o comando falha propositalmente.
- Conexão Supabase consultada em modo leitura em 2026-11-22: organização da conexão com `plan=free` / `tier=tier_free`, 1 projeto ativo e 12 inativos (entre os inativos há um projeto historicamente chamado `poe2-nexus`); **não** evidencia vinculação desse projeto ao Exile Nexus, faturas, uso de quotas ou elegibilidade para criação. Nenhuma alteração/requisição de custo/provisionamento foi feita. Detalhes: [Evidence Bundle G01](../evidence/EXN-M01-WO-010-G01-provider-account-readback-2026-11-22.md).
- Netlify account read-back, Google OAuth, LGPD, limite transacional e ambiente autenticado não verificados. NÃO chamar essa etapa de S01.
