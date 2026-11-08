# Source Hierarchy

- **Owner:** NexLabsTech
- **Status:** PROPOSED
- **Revisão:** 2026-11-08
- **Work Order:** EXN-M00-WO-005 · Issue #6

## Precedência

Ao resolver conflitos entre documentos do projeto, use a ordem definida pelo
owner:

1. Checkpoint aceito.
2. Decisions Ledger e ADRs aceitos.
3. Scope aceito.
4. Definition of Done aceita.
5. Architecture aceita.
6. Requirements aceitos.
7. Outras fontes do projeto, incluindo backlog, planos de teste, contratos,
   implementação e evidências.

Uma instrução explícita e mais recente do owner governa a autorização desta
execução. Quando aceita como decisão do projeto, registre-a no Decisions Ledger
e no checkpoint. Isso não promove automaticamente uma proposta nem substitui
critérios técnicos.

## Estado das fontes

- O Source Pack inicial foi integrado pela PR #134. Seus documentos mantêm o
  status indicado em cada arquivo.
- A matriz R01–R14 e o Evidence Bundle da WO-003 foram integrados pela PR #135
  no commit 1e786ad840a12762e1f98424f927f48638f7a036. O owner aceitou a entrega
  em comentário; não houve GitHub Review APPROVED. A matriz não libera
  ingestão, persistência, reexibição, importação de dados da árvore ou
  monetização.
- Scope, Requirements e Definition of Done da WO-004 foram integrados na main
  pela PR #136 no commit 23ee602f0f934b38342f75137c6a82c136de980e. O owner
  aceitou a entrega em comentário; não houve GitHub Review APPROVED.
- Architecture, data contracts e deployment plan são entregáveis da WO-005 /
  Issue #6 e estão propostos nesta branch. O plano não autoriza deploy.
- Security, privacy e abuse controls pertencem à WO-006 / Issue #7.
- Test Plan, CI documental e branch protection pertencem à WO-007 / Issue #8.
- A auditoria final da fundação e do issue graph pertence à WO-008 / Issue #9.
  O backlog canônico continua sendo GitHub Issues; não há backlog Markdown
  duplicado.

O Source Pack permanece parcial até as WOs 005–008 serem concluídas. Não há
aplicação ou deployment. A decisão de arquitetura desta branch ainda está em
proposta e não foi aplicada em código. Direitos de uso, APIs, quotas, custos e
elegibilidade de conteúdo continuam subordinados à evidência específica de
cada fonte e Work Order.

## Mudanças de hierarquia

Proponha alterações nesta página por PR. Se uma fonte de maior precedência
estiver ausente, ambígua ou em conflito com instrução atual do owner, registre
a incerteza e pare o trabalho dependente até haver resolução documentada.
