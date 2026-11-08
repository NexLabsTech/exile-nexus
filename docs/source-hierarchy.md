# Source Hierarchy

- **Owner:** NexLabsTech
- **Status:** PROPOSED
- **Revisão:** 2026-11-08
- **Work Order:** EXN-M00-WO-002 · Issue #3

## Precedência

Ao resolver conflitos entre documentos do projeto, use a ordem definida pelo
owner no pacote de execução:

1. Checkpoint aceito.
2. Decisions Ledger e ADRs aceitos.
3. Scope aceito.
4. Definition of Done aceita.
5. Architecture aceita.
6. Requirements aceitos.
7. Outras fontes do projeto, incluindo backlog, planos de teste, contratos,
   implementação e evidências.

Uma instrução explícita e mais recente do owner governa a autorização desta
execução. Quando aceita para o projeto, registre-a no Decisions Ledger e no
próximo checkpoint. Essa regra não promove automaticamente uma proposta a
decisão aceita.

## Estado das fontes

O Source Pack está sendo proposto na issue #3. Checkpoint, Decisions Ledger,
visão e hierarquia estão versionados nesta branch, mas aguardam revisão da PR.

Os documentos de direitos/API, escopo/requisitos/DoD, arquitetura/contratos e
segurança/abuso estão pendentes das issues #4–#7. CI documental está pendente
da issue #8, que depende da fundação documental e do modelo de segurança. A
auditoria da fundação está pendente da issue #9.

O Source Pack é parcial. Scope, Requirements e Definition of Done pertencem à
issue #5; Architecture, à #6; Security, à #7. Test Plan, Deployment e Backlog
não têm WO atribuída entre as issues #4–#9 consultadas. Esses documentos não
são canônicos e só devem ser criados ou validados em WOs autorizadas e antes da
implementação funcional.

Não há ADRs aceitos no baseline consultado. Referências da aplicação, direitos
de uso, quotas, disponibilidade dos serviços e fontes de dados permanecem
NOT VERIFIED até revisão própria.

## Mudanças de hierarquia

Proponha alterações nesta página por PR. Se uma fonte de maior precedência
estiver ausente, ambígua ou em conflito com uma instrução atual do owner,
registre a incerteza e pare o trabalho dependente até haver resolução
documentada.
