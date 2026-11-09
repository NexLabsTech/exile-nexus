# Source Pack

- **Owner:** NexLabsTech
- **Status:** PROPOSED
- **Revisão:** 2026-11-08
- **Work Order:** EXN-M00-WO-008 · Issue #9

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
- [Deployment Plan](deployment-plan.md) — WO-005, plano sem implantação/provisionamento.
- [Threat Model, privacidade e abuso](security-privacy-threat-model.md) — WO-006, integrado como referência de planejamento; settings administrativos seguem NOT VERIFIED onde indicado.
- [Test Plan](test-plan.md) — WO-007, integrada pela PR #139.
- [Guia de contribuição](../CONTRIBUTING.md) — WO-007, integrado pela PR #139.
- [Source Hierarchy](source-hierarchy.md) — reconciliação e precedência.
- [Decisions Ledger](decisions-ledger.md) — decisões individuais identificadas; documento PROPOSED.
- [Checkpoint](checkpoint.md) — M00, M01-WO-001/002/003/004/005/006/007/008, M12-WO-001 e EXN-VIS-WO-001 aceitos; #19 é a próxima WO elegível.
- [Matriz de direitos e fontes](rights-and-data-sources.md) — WO-003; direitos de ingestão/exibição/monetização não liberados.
- Evidence Bundle da WO-001: [baseline](evidence/EXN-M00-WO-001-baseline-2026-11-08.md).
- Evidence Bundle da WO-002: [Source Pack](evidence/EXN-M00-WO-002-source-pack-2026-11-08.md).
- Evidence Bundle da WO-003: [direitos e APIs](evidence/EXN-M00-WO-003-rights-review-2026-11-08.md).
- Evidence Bundle da WO-004: [scope, requirements e DoD](evidence/EXN-M00-WO-004-scope-review-2026-11-08.md).
- Evidence Bundle da WO-005: [architecture, data contracts e deployment](evidence/EXN-M00-WO-005-architecture-review-2026-11-08.md).
- Evidence Bundle da WO-006: [segurança, privacidade e abuso](evidence/EXN-M00-WO-006-security-review-2026-11-08.md).
- Evidence Bundle da WO-007: [CI documental, testes e contribuição](evidence/EXN-M00-WO-007-docs-ci-review-2026-11-08.md).
- Evidence Bundle da WO-008: [auditoria final do M00](evidence/EXN-M00-WO-008-foundation-audit-2026-11-08.md).
- ADR da WO M01-001: [Frontend Runtime](adr/EXN-M01-WO-001-frontend-runtime.md) — ACEITO pela PR #141.
- Evidence Bundle da M01-001: [comparação de builds](evidence/EXN-M01-WO-001-runtime-evaluation-2026-11-08.md).
- M01-WO-002: [Design Tokens](visual-tokens.md), [Inventário de Assets](visual-assets-inventory.md)
  e [Evidence Bundle](evidence/EXN-M01-WO-002-visual-tokens-2026-11-08.md) — ACEITOS na PR #142.
- M12-WO-001: [Quality CI Evidence](evidence/EXN-M12-WO-001-quality-baseline-2026-11-08.md) — aceita na PR #143.
- EXN-VIS-WO-001: [pilotos visuais e hashes](../design/references/README.md), [evidências](evidence/EXN-VIS-WO-001-reference-boards-2026-11-08.md) — aceito como referência na PR #145, sem liberar uso comercial de IP de terceiro.
- M01-WO-003: [evidências da UI pública](evidence/EXN-M01-WO-003-public-shell-2026-11-08.md) — código Astro/React testado, PR #147 integrada.
- M01-WO-004: [evidências de componentes acessíveis](evidence/EXN-M01-WO-004-accessible-ui-states-2026-11-08.md) — PR #149 integrada.
- M01-WO-005: [evidências de motion e performance](evidence/EXN-M01-WO-005-motion-performance-2026-11-08.md) — PR #151 integrada.
- M01-WO-006: [busca local e contratos de navegação](evidence/EXN-M01-WO-006-global-search-2026-11-08.md) — PR #153 integrada.
- M01-WO-007: [infraestrutura SEO PREVIEW_ONLY](evidence/EXN-M01-WO-007-seo-indexability-2026-11-08.md) — PR #155 integrada; domínio, indexação pública e deploy continuam BLOCKED.
- M01-WO-008: [localização English-first](evidence/EXN-M01-WO-008-english-localization-2026-11-08.md) — PR #157 integrada, somente inglês, 132 mensagens, 44 E2E; próxima NECESSARY #19.

As WOs 003–007 foram integradas por squash com aceite administrativo de
NexLabsTech. O aceite registrado não equivale a GitHub Review formal
`APPROVED`. O modelo de ameaças foi aceito documentalmente; controles de
Code Security sem read-back permanecem `NOT VERIFIED`. A proteção da `main`
e o check obrigatório foram verificados pelo ruleset #26806979.

## Artefatos por Work Order

- Direitos, APIs e atribuição: EXN-M00-WO-003 / Issue #4.
- Scope, Requirements e DoD: EXN-M00-WO-004 / Issue #5.
- Architecture, contratos de dados e deployment plan: EXN-M00-WO-005 / Issue #6.
- Security, privacy, abuse e controles nativos gratuitos: EXN-M00-WO-006 / Issue #7.
- Test Plan, CI documental, contribuição e branch protection: EXN-M00-WO-007 / Issue #8.
- Auditoria final da fundação e do backlog: EXN-M00-WO-008 / Issue #9. GitHub Issues continua sendo o backlog canônico; não criar duplicatas em Markdown.

## Estado e regras

O Source Pack e CI documental estão versionados; a WO-008 foi integrada
pela PR #140 e o épico M00 encerrado. A decisão de runtime M01-WO-001 foi aceita com PR #141. Os tokens visuais
M01-WO-002 foram aprovados na PR #142; o Quality CI M12-WO-001 foi aceito na PR #143, e referências visuais EXN-VIS-WO-001 foram aceitas na PR #145. A WO #13 foi integrada pela PR #147 e issue #13 encerrada; a WO #14 foi integrada pela PR #149, com issue #14 encerrada; a WO #15 foi integrada na PR #151, com issue #15 encerrada; a próxima WO NECESSARY é #16, ainda pendente. A matriz R01–R14 documenta fontes,
mas não concede licença. Fontes
`CONDICIONADO` e `NÃO VERIFICADO` bloqueiam ingestão, persistência, reexibição e
monetização; fontes `PROIBIDO` não devem ser integradas.

A CI documental usa runner padrão gratuito de repositório público, permissões
mínimas e nenhum segredo. Apps externos com cota ou preço por análise não são
gates. A proteção da `main` foi relida pelo endpoint REST do ruleset; somente
`Docs validation` é check obrigatório. Cada Evidence Bundle
separa `PASS`, `FAIL`, `NOT APPLICABLE`, `NOT RUN` e `BLOCKED`. Um comentário
`COMMENTED` não é review formal `APPROVED`; reporte aceite administrativo
separadamente.
