# Source Hierarchy

- **Owner:** NexLabsTech
- **Status:** PROPOSED
- **Revisão:** 2026-11-08
- **Work Order:** EXN-M00-WO-007 · Issue #8

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
  no commit `1e786ad840a12762e1f98424f927f48638f7a036`; aceite administrativo
  em comentário, sem GitHub Review `APPROVED`. Direitos operacionais continuam
  restritos.
- Scope, Requirements e Definition of Done da WO-004 foram integrados pela
  PR #136 no commit `23ee602f0f934b38342f75137c6a82c136de980e`; aceite em
  comentário, sem review formal `APPROVED`.
- Architecture, Data Contracts e Deployment Plan da WO-005 foram integrados
  pela PR #137 no commit `2b98db725c883dd9bbef3b080673d0b5b07036ab`; aceite
  administrativo no comentário #6720828484, sem review formal `APPROVED`.
- Threat Model, privacidade e abuso da WO-006 foram integrados pela PR #138
  por squash no commit `e8e900feeaadc98f45e47244ad7840d25e1cc871`, a partir do
  head `653b721a796cafa2d2bed500c2c720d3c4a079d7`. Aceite NexLabsTech no
  comentário #6721135679; Issue #7 concluída; não houve review formal
  `APPROVED`. Configurações administrativas permanecem `NOT VERIFIED` conforme
  o Evidence Bundle.
- Test Plan, CI documental, contribuição e branch protection foram integrados
  pela PR #139 / WO-007 no commit
  `aaf24a660ff2ee2334d713685e2edee1f841eedc`; issue #8 CLOSED.
  O ruleset #26806979 está ativo e o check `Docs validation` é obrigatório.
- Auditoria final da fundação e do issue graph pertence à WO-008 / Issue #9.
  O backlog canônico continua em GitHub Issues; não há backlog Markdown
  duplicado.

O Source Pack e o CI documental da WO-007 estão versionados. A auditoria
final WO-008 está em PR Draft #140 e seu Checkpoint Delta segue PROPOSED.
O owner aprovou auditoria objetiva interna de mantenedor solo, declarando a
ausência de independência (EXN-DEC-0007), sem review externo obrigatório.
Não há aplicação ou deployment. Direitos de conteúdo, APIs, árvore, dados
econômicos, scraping e monetização continuam bloqueados ou não verificados.
Erro de acesso administrativo não demonstra que setting esteja ativo ou inativo.

## Mudanças de hierarquia

Proponha alterações nesta página por PR. Se uma fonte de maior precedência
estiver ausente, ambígua ou em conflito com instrução atual do owner, registre
a incerteza e interrompa o trabalho dependente até haver resolução documentada.
