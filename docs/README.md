# Source Pack

- **Owner:** NexLabsTech
- **Status:** PROPOSED
- **Revisão:** 2026-11-08
- **Work Order:** EXN-M00-WO-006 · Issue #7

Este índice registra documentos presentes, sua Work Order e as dependências
restantes. Um arquivo listado ou integrado não concede direitos de dados nem
promove automaticamente uma proposta a decisão aceita.

## Documentos presentes

- [Visão do projeto](project-overview.md)
- [Product Scope](scope.md) — WO-004, aceita para planejamento.
- [Requirements Baseline](requirements.md) — WO-004, aceita para planejamento.
- [Definition of Done](definition-of-done.md) — WO-004, aceita para planejamento.
- [Architecture](architecture.md) — WO-005, aceita como referência documental.
- [Data Contracts](data-contracts.md) — WO-005, aceitos como contratos planejados.
- [Deployment Plan](deployment-plan.md) — WO-005, plano sem implantação ou provisionamento.
- [Threat Model, privacidade e abuso](security-privacy-threat-model.md) — WO-006, proposta nesta branch; settings administrativos seguem NOT VERIFIED onde indicado.
- [Source Hierarchy](source-hierarchy.md) — reconciliação e precedência.
- [Decisions Ledger](decisions-ledger.md) — decisões individuais identificadas; documento PROPOSED.
- [Checkpoint](checkpoint.md) — estado e dependências da fundação.
- [Matriz de direitos e fontes](rights-and-data-sources.md) — WO-003; direitos de ingestão/exibição/monetização não liberados.
- Evidence Bundle histórico da WO-001: [baseline](evidence/EXN-M00-WO-001-baseline-2026-11-08.md).
- Evidence Bundle da WO-002: [Source Pack](evidence/EXN-M00-WO-002-source-pack-2026-11-08.md).
- Evidence Bundle da WO-003: [direitos e APIs](evidence/EXN-M00-WO-003-rights-review-2026-11-08.md).
- Evidence Bundle da WO-004: [scope, requirements e DoD](evidence/EXN-M00-WO-004-scope-review-2026-11-08.md).
- Evidence Bundle da WO-005: [architecture, data contracts e deployment](evidence/EXN-M00-WO-005-architecture-review-2026-11-08.md).
- Evidence Bundle da WO-006: [segurança, privacidade e abuso](evidence/EXN-M00-WO-006-security-review-2026-11-08.md).

As WOs 003–005 foram integradas por squash após aceite administrativo NexLabsTech registrado em comentário. Esses comentários não são GitHub Reviews formais `APPROVED`. O WO-006 segue proposto até auditoria técnica, aceite e integração normal.

## Artefatos mapeados às Work Orders existentes

- Architecture e contratos de dados: EXN-M00-WO-005 / Issue #6.
- Security, privacy, abuse e controles nativos gratuitos: EXN-M00-WO-006 / Issue #7.
- Test Plan, CI documental e branch protection: EXN-M00-WO-007 / Issue #8.
- Auditoria final da fundação e do backlog existente: EXN-M00-WO-008 / Issue #9. GitHub Issues é o backlog canônico; não criar uma cópia em Markdown.

As issues #6–#9 foram ajustadas minimamente para tornar explícitos os
entregáveis, controles e gates; IDs estáveis foram preservados e não foram
criadas issues duplicadas.

## Estado e regras

O Source Pack continua parcial até as WOs 006–008 estarem concluídas e os
controles essenciais verificáveis. A matriz de direitos documenta fontes, mas
não concede licença ou autorização de uso. Fontes `CONDICIONADO` e `NÃO
VERIFICADO` permanecem bloqueadas para ingestão, persistência, reexibição e
monetização; fontes `PROIBIDO` não devem ser integradas.

Cada documento identifica owner, status, revisão e Work Order. Use `PROPOSED`,
`NOT VERIFIED` ou `BLOCKED` enquanto não houver evidência e aceite adequados.
Registre decisões aceitas no ledger e deltas aprovados no checkpoint. Um
comentário `COMMENTED` não é GitHub Review `APPROVED`; relate o aceite
administrativo separadamente.
