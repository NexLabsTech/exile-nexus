# Checkpoint

- **Owner:** NexLabsTech
- **Status:** PROPOSED · WO-008 em auditoria; WO-007 integrada e regras verificadas
- **Revisão:** 2026-11-08
- **Work Order:** EXN-M00-WO-008 · Issue #9
- **Base SHA desta proposta:** `aaf24a660ff2ee2334d713685e2edee1f841eedc`
- **HEAD desta proposta:** será registrado pela metadata/timeline da PR após publicação; um commit não pode referenciar seu próprio SHA.

Esta proposta de WO-008 reconcilia a WO-007, já integrada na main após aceite
NexLabsTech, e inicia exclusivamente auditoria final do M00. O checkpoint
permanece PROPOSED até auditoria objetiva, aceite e merge da presente WO.

## Histórico e aceite

- Baseline consultado na main no início da WO-001:
  `23ec93e0fb174fb84db38298ce890f693a62abf1`.
- PR #133 integrou WO-001 por squash no commit
  `b012731fd052e4c08aaa005b4e269b4d7e8ed7f4`. Issue #2 concluída; review
  GitHub ficou COMMENTED, não APPROVED.
- PR #134 integrou WO-002 por squash no commit
  `5cf7ab69d8a2b80b245cd64966d9d40f13a8c8e1`. Issue #3 concluída; sem
  GitHub Review formal APPROVED.
- PR #135 integrou WO-003 por squash no commit
  `1e786ad840a12762e1f98424f927f48638f7a036`, a partir do head
  `63ea494518296b0e85c40f979ba042a644489a4b`. Aceite administrativo
  #6720404361; Issue #4 concluída.
- PR #136 integrou WO-004 por squash no commit
  `23ee602f0f934b38342f75137c6a82c136de980e`, a partir do head
  `f9f046189d2b5bffe060f625dc11f2641f545394`. Aceite #6720619493; Issue #5
  concluída.
- PR #137 integrou WO-005 por squash no commit
  `2b98db725c883dd9bbef3b080673d0b5b07036ab`, a partir do head
  `989e6995b17df7d844100b2ca20e670a6681bfb0`. Aceite #6720828484; Issue #6
  concluída.
- PR #138 integrou WO-006 por squash no commit
  `e8e900feeaadc98f45e47244ad7840d25e1cc871`, a partir do head
  `653b721a796cafa2d2bed500c2c720d3c4a079d7`. Aceite administrativo
  NexLabsTech #6721135679; Issue #7 concluída. Auditoria na mesma sessão do
  executor; não independente e sem GitHub Review formal `APPROVED`.
- PR #139 integrou WO-007 em squash no commit
  aaf24a660ff2ee2334d713685e2edee1f841eedc após autorização NexLabsTech;
  Issue #8 foi encerrada, sem bypass de regras.
- Aceite documental não libera direitos R01–R14, dados, cobrança ou deploy.

## Context Lock e fonte atual

- Issue #8 encerrada; EXN-M00-WO-008 (#9) é a única próxima WO NECESSARY.
- main no início da auditoria: aaf24a660ff2ee2334d713685e2edee1f841eedc.
- CI documental integrado em .github/workflows/docs-ci.yml, sem app, endpoint,
  banco, manifesto de dependências de runtime ou deploy.
- As atualizações anteriores deixam o threat model como referência de
  planejamento e documentam os settings que continuam NOT VERIFIED.
- Nenhuma fonte de jogo, API econômica, árvore, scraping ou monetização foi
  autorizada pela matriz R01–R14.

## Estado administrativo observado e revalidado

- Baseline histórico: a credencial GitHub App ainda recebe HTTP 403 ao consultar
  `/branches/main/protection` (permissão `Administration: read` indisponível).
  Este fato **não** impede a verificação do ruleset, cujo GET REST foi permitido.
- Em 2026-11-08, read-back autenticado de
  `/repos/NexLabsTech/exile-nexus/rulesets/26806979` confirmou:
  `NexLabs Main Protection`, `enforcement: active`, alvo `~DEFAULT_BRANCH`
  (main), bypass vazio e `current_user_can_bypass: never`.
- Regras efetivas do ruleset: `deletion`, `non_fast_forward`,
  `required_linear_history`, `pull_request` com 0 approvals externos,
  conversas resolvidas e `allowed_merge_methods: [squash]`, e
  `required_status_checks` com somente `Docs validation`
  (GitHub Actions, integration_id 15368, `strict: true`).
- A API do repositório confirma `allow_squash_merge: true`,
  `allow_merge_commit: false`, `allow_rebase_merge: false`.
- O run [#42488063183](https://github.com/NexLabsTech/exile-nexus/actions/runs/42488063183)
  completou `success` no HEAD `1710126833982cf3f3d50ccd7159cdf87dd78542`,
  incluindo todos os passos de testes documentais, actionlint e zizmor.
- Não há CodeRabbit, Socket Security ou outro SaaS com franquia entre os
  required checks. Apps existentes podem emitir checks opcionais.
- Dependabot, Code Scanning, Secret Scanning, Push Protection, permissões
  administrativas adicionais e billing de terceiros seguem NOT VERIFIED
  e exigem Work Orders específicos. Não declarar cobrança total US$ 0.
- As regras foram aplicadas pelo proprietário pela UI; não houve bypass,
  força, escrita em main ou ampliação de credenciais pelo executor.

## Work Orders

- WO-001 / Issue #2: integrada; concluída.
- WO-002 / Issue #3: integrada; concluída.
- WO-003 / Issue #4: matriz R01–R14 integrada; ingestão continua sem liberação.
- WO-004 / Issue #5: Scope, Requirements e DoD integrados.
- WO-005 / Issue #6: Architecture, Data Contracts e Deployment Plan integrados;
  nenhuma conta/projeto/deploy provisionado.
- WO-006 / Issue #7: Threat Model, privacidade e abuso integrados; controles
  sem read-back continuam NOT VERIFIED.
- WO-007 / Issue #8: Test Plan, CI e contribuição integrados na PR #139;
  checks e regras verificados; issue concluída.
- WO-008 / Issue #9: AUDITORIA EM ANDAMENTO; aceite e merge ainda pendentes.

## Estado de produto e custos

- O repositório tem CI documental integrado, mas não possui aplicação,
  dependências de runtime, dados pessoais, API ou deployment. Não desenvolver
  funcionalidade enquanto WO-008 estiver pendente.
- A arquitetura modular monolith, TypeScript strict e deny-by-default segue
  como restrição; serviços permanecem não selecionados.
- O plano financeiro obrigatório é US$ 0. Runners GitHub-hosted padrão são
  descritos como gratuitos para repositórios públicos; limites não são
  ilimitados. Faturamento total da conta e custo do Socket permanecem
  NOT VERIFIED.
- O pipeline proposto usa somente Actions padrão, ferramentas open source com
  versão e SHA-256 fixos e token read-only. Nenhuma ferramenta SaaS de quota é
  necessária ao gate.

## Histórico concluído de correções da WO-007

A PR #139 corrigiu o filtro de arquivos do evento `pull_request` e ampliou
actionlint e zizmor para todos os workflows. No HEAD
`4905d4c068467198ebe2100ed2c29257da428a84`, o run
[#42510310274](https://github.com/NexLabsTech/exile-nexus/actions/runs/42510310274)
foi `completed/success`. A integração por squash autorizada ocorreu no commit
`aaf24a660ff2ee2334d713685e2edee1f841eedc`, com a issue #8 encerrada.
O run de `push` da `main`
[#42510645690](https://github.com/NexLabsTech/exile-nexus/actions/runs/42510645690)
também passou.

O ruleset #26806979 foi relido como `ACTIVE`, com
`Docs validation` obrigatório, `strict: true`, PR obrigatória,
squash-only, zero revisores exigidos, exclusão e force-push bloqueados,
histórico linear e bypass vazio. A verificação da proteção clássica por
endpoint administrativo permanece limitada ao acesso disponível, sem
desautorizar o read-back do ruleset efetivo.

Esta seção registra fatos históricos aceitos da WO-007. Não é um
Checkpoint Delta ainda pendente para essa Work Order. O próximo gate é
exclusivamente a auditoria e o aceite da WO-008.


## Auditoria WO-008 e Checkpoint Delta PROPOSTO

- Evidence Bundle: [Foundation Audit](evidence/EXN-M00-WO-008-foundation-audit-2026-11-08.md).
- M00: 7 Work Orders concluídas (#2–#8); a issue #9 segue OPEN.
- GitHub Issues: 132 IDs únicos, sendo 13 épicos e 119 Work Orders;
  sem ciclos, referências inexistentes ou dependências de issues fechadas
  ainda abertas, conforme snapshot do relatório.
- Ruleset #26806979 ACTIVE, main protegida, squash-only, 0 aprovações,
  force-push/deleção bloqueados, sem bypass e Docs validation required.
- CI main após merge: run #42510645690 completed/success.
- Primeiro candidato pós-M00: M01-WO-001 (#11), ao lado de M02-WO-001 (#22)
  e M12-WO-001 (#119); não iniciar nenhuma nesta WO.
- Direitos de jogo, AdSense e fontes não autorizadas permanecem bloqueados;
  billing, Code Security adicional e serviços existentes não totalmente
  verificados, sem liberar gastos.
- Não promover este Checkpoint Delta sem auditoria objetiva, aceite do owner
  e squash merge da WO-008.

## Decisão aceita de processo — mantenedor solo (2026-11-08)

- A NexLabsTech determinou expressamente **sem reviews externos** para o
  Exile Nexus. O critério do épico M00 #1 foi reconciliado no GitHub para
  auditoria objetiva da mesma sessão, com ausência de independência declarada.
- A decisão `EXN-DEC-0007` integra o Decisions Ledger **como decisão aceita**;
  este Checkpoint Delta permanece **PROPOSED** até merge da WO-008.
- Não utilizar nem solicitar análises CodeRabbit ou de outros revisores externos.
  Qualquer check emitido historicamente por apps não é gate obrigatório.
  Não afirmar que apps foram desinstalados sem leitura administrativa.
- Permanecem obrigatórios: evidências Git/CI/segurança, direitos, zero gasto,
  auditoria interna documentada, aceite administrativo explícito para cada PR,
  squash normal sem bypass e sem avanço com defeitos HIGH/CRITICAL.
- A referência canônica de M00 continua a issue #9 até seu aceite e integração;
  nenhum incremento do M01 foi iniciado por esta mudança de processo.
