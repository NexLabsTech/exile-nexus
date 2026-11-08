# Source Hierarchy

- **Owner:** NexLabsTech
- **Status:** PROPOSED
- **Revisão:** 2026-11-08
- **Work Order:** EXN-M00-WO-006 · Issue #7

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

- O Source Pack inicial foi integrado pela PR #134; status e limites dos
  documentos seguem os respectivos arquivos.
- A matriz R01–R14 e o Evidence Bundle da WO-003 foram integrados pela PR #135
  no commit `1e786ad840a12762e1f98424f927f48638f7a036`. O aceite administrativo
  foi registrado em comentário, sem GitHub Review `APPROVED`. A matriz não
  libera ingestão, persistência, reexibição, árvore ou monetização.
- Scope, Requirements e Definition of Done da WO-004 foram integrados na main
  pela PR #136 no commit `23ee602f0f934b38342f75137c6a82c136de980e`, com aceite
  administrativo em comentário, sem review formal `APPROVED`.
- Architecture, Data Contracts e Deployment Plan da WO-005 foram integrados
  por squash pela PR #137 no commit `2b98db725c883dd9bbef3b080673d0b5b07036ab`.
  O aceite administrativo está no comentário #6720828484; não houve
  GitHub Review formal `APPROVED`. Os documentos são uma referência de
  planejamento, não implementação nem autorização de deploy.
- Threat Model, privacidade e abuso pertencem à WO-006 / Issue #7 e estão em
  proposta nesta branch. Settings sem leitura administrativa disponível estão
  explicitamente `NOT VERIFIED`.
- Test Plan, CI documental e branch protection pertencem à WO-007 / Issue #8.
- Auditoria final da fundação e do issue graph pertence à WO-008 / Issue #9.
  O backlog canônico continua em GitHub Issues; não há backlog Markdown
  duplicado.

O Source Pack permanece parcial até WOs 006–008 e a verificação dos controles
essenciais. Não há aplicação ou deployment. Direitos de conteúdo, APIs,
árvore, dados econômicos, scraping e monetização continuam bloqueados ou não
verificados. Um settings administrativo inacessível não deve ser inferido como
ativo ou inativo.

## Mudanças de hierarquia

Proponha alterações nesta página por PR. Se uma fonte de maior precedência
estiver ausente, ambígua ou em conflito com instrução atual do owner, registre
a incerteza e interrompa o trabalho dependente até haver resolução documentada.
