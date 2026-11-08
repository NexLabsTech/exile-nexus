# Source Pack

- **Owner:** NexLabsTech
- **Status:** PROPOSED
- **Revisão:** 2026-11-08
- **Work Order:** EXN-M00-WO-004 · Issue #5

Este índice registra documentos presentes, sua Work Order e as dependências
restantes. Um arquivo listado ou integrado não concede direitos de dados nem
promove automaticamente uma proposta a decisão aceita.

## Documentos presentes

- [Visão do projeto](project-overview.md)
- [Product Scope](scope.md) — WO-004, PROPOSED.
- [Requirements Baseline](requirements.md) — WO-004, PROPOSED.
- [Definition of Done](definition-of-done.md) — WO-004, PROPOSED.
- [Source Hierarchy](source-hierarchy.md) — WO-004, PROPOSED.
- [Decisions Ledger](decisions-ledger.md) — decisões individuais identificadas;
  documento PROPOSED.
- [Checkpoint](checkpoint.md) — WO-004, PROPOSED.
- [Matriz de direitos e fontes](rights-and-data-sources.md) — WO-003; direitos
  de ingestão/exibição/monetização não liberados.
- Evidence Bundle histórico do WO-001:
  [baseline](evidence/EXN-M00-WO-001-baseline-2026-11-08.md).
- Evidence Bundle do WO-002:
  [Source Pack](evidence/EXN-M00-WO-002-source-pack-2026-11-08.md).
- Evidence Bundle do WO-003:
  [direitos e APIs](evidence/EXN-M00-WO-003-rights-review-2026-11-08.md).
- Evidence Bundle desta Work Order:
  [scope, requirements e DoD](evidence/EXN-M00-WO-004-scope-review-2026-11-08.md).

Os três documentos da WO-004 estão propostos nesta branch e só entram na
`main` após auditoria, aceite do owner e integração normal.

## Artefatos mapeados às Work Orders existentes

- Architecture e contratos de dados: EXN-M00-WO-005 / Issue #6.
- Deployment plan: EXN-M00-WO-005 / Issue #6; plano apenas, sem deployment.
- Security, privacy, abuse e controles nativos gratuitos: EXN-M00-WO-006 /
  Issue #7.
- Test Plan, CI documental, processo de contribuição e branch protection:
  EXN-M00-WO-007 / Issue #8.
- Auditoria da fundação e do backlog existente: EXN-M00-WO-008 / Issue #9.
  GitHub Issues permanece o backlog canônico; não criar um documento paralelo
  com cópias das issues.

As issues #6–#9 foram ajustadas minimamente para tornar explícitos esses
entregáveis, controles e gates; os IDs estáveis foram preservados e nenhuma
issue duplicada foi criada.

## Estado e regras

Este Source Pack continua parcial. A matriz de direitos documenta fontes, mas
não concede licença ou autorização de uso. Fontes `CONDICIONADO` e `NÃO
VERIFICADO` permanecem bloqueadas para ingestão, persistência, reexibição e
monetização; fontes `PROIBIDO` não devem ser integradas.

Cada documento deve identificar owner, status, revisão e Work Order. Use
`PROPOSED`, `NOT VERIFIED` ou `BLOCKED` enquanto não houver evidência e aceite
adequados. Registre decisões aceitas no ledger e deltas aprovados no
checkpoint. Um comentário `COMMENTED` não é uma GitHub Review `APPROVED`; o
aceite administrativo do owner deve ser relatado separadamente.
