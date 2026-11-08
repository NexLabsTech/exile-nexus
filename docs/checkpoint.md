# Checkpoint

- **Owner:** NexLabsTech
- **Status:** PROPOSED · M00 integrada e encerrada; WO-001 do M01 em avaliação
- **Revisão:** 2026-11-08
- **Work Order:** EXN-M01-WO-001 · Issue #11
- **Base SHA desta proposta:** `26673e9656bfd6aae500f01f508ea53e13718bab`
- **HEAD desta proposta:** será registrado pela metadata/timeline da PR após publicação; um commit não pode referenciar seu próprio SHA.

A fundação M00 foi encerrada no GitHub após a PR #140, com o épico #1 e as
issues #2–#9 fechados. Esta proposta inicia exclusivamente a avaliação do
runtime frontend da WO-001 do M01. O delta permanece PROPOSED até os testes,
a auditoria interna e o aceite do owner antes de qualquer squash merge.

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

- Issues M00 #2–#9 e épico #1 encerrados; EXN-M01-WO-001 (#11) é a
  próxima Work Order NECESSARY selecionada. Não iniciar outra enquanto #11
  exigir auditoria, correção ou aceite.
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
- WO-008 / Issue #9: integrada via PR #140 e fechada no commit
  `26673e9656bfd6aae500f01f508ea53e13718bab` após aceite NexLabsTech;
  épico M00 #1 também concluído. CI pós-merge #42518316070 PASS.

## Estado de produto e custos

- M00 foi concluída; não há aplicação de produto, banco, API, dados pessoais
  ou deployment. A WO-001 do M01 experimenta build estático com fixtures
  originais, sem selecionar dependências para produção antecipadamente.
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

Esta seção registra fatos históricos aceitos da WO-007. O gate seguinte de
WO-008 já foi cumprido pela PR #140; a etapa corrente é somente M01-WO-001,
ainda não aceita nem integrada.


## Histórico da auditoria WO-008 (integrada por PR #140)

- Evidence Bundle: [Foundation Audit](evidence/EXN-M00-WO-008-foundation-audit-2026-11-08.md).
- M00: 8 Work Orders concluídas (#2–#9) e épico #1 CLOSED após o squash
  da PR #140. Registro original pré-merge preservado no Evidence Bundle.
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
- O delta da WO-008 foi integrado após auditoria objetiva e aceite do owner;
  nenhuma decisão de runtime ou direito de dado foi automaticamente liberada.

## Decisão aceita de processo — mantenedor solo (2026-11-08)

- A NexLabsTech determinou expressamente **sem reviews externos** para o
  Exile Nexus. O critério do épico M00 #1 foi reconciliado no GitHub para
  auditoria objetiva da mesma sessão, com ausência de independência declarada.
- A decisão `EXN-DEC-0007` foi integrada à main pela PR #140 e aceita pelo
  owner. A avaliação de runtime M01-WO-001 segue PROPOSED.
- Não utilizar nem solicitar análises CodeRabbit ou de outros revisores externos.
  Qualquer check emitido historicamente por apps não é gate obrigatório.
  Não afirmar que apps foram desinstalados sem leitura administrativa.
- Permanecem obrigatórios: evidências Git/CI/segurança, direitos, zero gasto,
  auditoria interna documentada, aceite administrativo explícito para cada PR,
  squash normal sem bypass e sem avanço com defeitos HIGH/CRITICAL.
- A issue #9 e o épico M00 #1 foram fechados. M01-WO-001 #11 foi iniciado
  exclusivamente para uma decisão de runtime e benchmark sintético.

## M01-WO-001 — Frontend Runtime ADR (Checkpoint Delta PROPOSTO)

- M00 foi encerrado após squash normal da PR #140; SHA de main
  `26673e9656bfd6aae500f01f508ea53e13718bab`, CI de main
  [#42518316070](https://github.com/NexLabsTech/exile-nexus/actions/runs/42518316070)
  PASS, issues #1–#9 fechadas.
- O próximo incremento necessário é
  [EXN-M01-WO-001 #11](https://github.com/NexLabsTech/exile-nexus/issues/11),
  dependente de EXN-M00-WO-008, já fechado.
- Recomendação de runtime ainda PROPOSED:
  [Frontend Runtime ADR](adr/EXN-M01-WO-001-frontend-runtime.md).
- A avaliação compara Astro 7 + React 19 e Vite 8 + React 19 sob fixtures
  sintéticas em GitHub Actions, sem publicar, habilitar Cloudflare, dados de jogo
  ou custo. Métricas e veredito final pertencem ao
  [Evidence Bundle](evidence/EXN-M01-WO-001-runtime-evaluation-2026-11-08.md).
- **Não promover** framework, versões, base de código ou checkpoint à decisão
  aceita até CI, benchmark, revisão objetiva interna declarando ausência de
  independência, e aceite administrativo NexLabsTech. Sem próxima WO enquanto
  esta estiver pendente.

## M01-WO-001 — Métricas do primeiro experimento (somente PROPOSTAS)

- GitHub Actions [run #42519241684](https://github.com/NexLabsTech/exile-nexus/actions/runs/42519241684):
  Astro e Vite concluíram typecheck/build com PASS no HEAD
  `c4e8b44a476c16fe3c7a685450f2675767122466`.
- Astro + React: 1096 ms, 227095 bytes e 4 arquivos estáticos.
- Vite + React: 360 ms, 220692 bytes e 2 arquivos estáticos.
- O erro inicial de peer dependency (`@astrojs/check@0.9.12` versus
  TypeScript 7) foi corrigido sem ignorar resolução npm; Astro usa TS6
  no probe, Vite TS7. Logs e ressalvas no Evidence Bundle.
- Recomenda-se **provisoriamente** Astro estático + ilhas React; fallback
  React/Vite. **Sem framework aceito ou aplicado em produção**.
- A futura implementação precisa de lockfile commitado, scanner de
  dependências e testes da UI real. Sem deploy ou acesso a dados externos.
