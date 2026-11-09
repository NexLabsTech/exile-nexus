# Checkpoint

- **Owner:** NexLabsTech
- **Status:** ACEITO até EXN-M01-WO-008 (#18), English-first localizado; SEO permanece PREVIEW_ONLY; próxima EXN-M01-WO-009 (#19) ainda não implementada
- **Revisão:** 2026-11-08
- **Work Order:** reconciliação do aceite EXN-M01-WO-008 · Issue #18; próxima EXN-M01-WO-009 · Issue #19
- **Base SHA desta proposta:** `79be738c7af8eda641c4ac4aff52ef7b28931ca0`
- **HEAD desta proposta:** será registrado pela metadata/timeline da PR após publicação; um commit não pode referenciar seu próprio SHA.

A fundação M00 foi encerrada no GitHub. A escolha Astro 7.4.7 + React 19.3.1
islands (fallback React/Vite) foi aceita pelo owner, integrada pela PR #141 e
a issue #11 encerrada. M01-WO-002 (#12) também foi aceita pelo owner e
integrada pela PR #142; esta proposta inicia exclusivamente M12-WO-001 (#119),
fundação do CI de qualidade necessária antes de M01-WO-003 (#13). Nenhuma
decisão de build, release ou deployment é antecipadamente aprovada.

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

- Issues M00 #2–#9 e épico #1 encerrados; EXN-M01-WO-001 (#11) fechada
  após a PR #141. EXN-M01-WO-002 (#12) é o incremento NECESSARY selecionado.
  Não avançar outra WO enquanto #12 exigir validação ou correção.
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
  ou deployment. A WO-001 do M01 aprovou apenas a direção de runtime,
  com fixtures sintéticas; a WO-002 cria tokens/assets sem app funcional.
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
- A decisão `EXN-DEC-0007` foi integrada pela PR #140 e aceita pelo owner.
  A direção de runtime M01-WO-001 foi aceita pela PR #141 e issue #11;
  `EXN-DEC-0008` registra essa escolha, sem autorizar deploy.
- Não utilizar nem solicitar análises CodeRabbit ou de outros revisores externos.
  Qualquer check emitido historicamente por apps não é gate obrigatório.
  Não afirmar que apps foram desinstalados sem leitura administrativa.
- Permanecem obrigatórios: evidências Git/CI/segurança, direitos, zero gasto,
  auditoria interna documentada, aceite administrativo explícito para cada PR,
  squash normal sem bypass e sem avanço com defeitos HIGH/CRITICAL.
- A issue #9 e o épico M00 #1 foram fechados. M01-WO-001 #11 foi iniciado
  exclusivamente para uma decisão de runtime e benchmark sintético.

## M01-WO-001 — Frontend Runtime ADR (decisão aceita em PR #141)

- M00 foi encerrado após squash normal da PR #140; SHA de main
  `26673e9656bfd6aae500f01f508ea53e13718bab`, CI de main
  [#42518316070](https://github.com/NexLabsTech/exile-nexus/actions/runs/42518316070)
  PASS, issues #1–#9 fechadas.
- O próximo incremento necessário é
  [EXN-M01-WO-001 #11](https://github.com/NexLabsTech/exile-nexus/issues/11),
  dependente de EXN-M00-WO-008, já fechado.
- Frontend inicial ACEITO pelo owner: Astro 7.4.7 estático + React 19.3.1
  islands, fallback React/Vite. [ADR aceito](adr/EXN-M01-WO-001-frontend-runtime.md).
  A PR #141 foi integrada por squash em
  `4a6bba78fd1966804895c9f9dafe85bf70175633`, com a issue #11 fechada
  e o [CI da main #42520216223](https://github.com/NexLabsTech/exile-nexus/actions/runs/42520216223) PASS.
- A avaliação compara Astro 7 + React 19 e Vite 8 + React 19 sob fixtures
  sintéticas em GitHub Actions, sem publicar, habilitar Cloudflare, dados de jogo
  ou custo. Métricas e veredito final pertencem ao
  [Evidence Bundle](evidence/EXN-M01-WO-001-runtime-evaluation-2026-11-08.md).
- A aceitação de Astro/React é limitada à direção de runtime e ao fallback;
  **não aprova** scaffold, versão final do TypeScript, integração externa,
  app funcional, dados do jogo, deployment ou serviço pago. Lockfile,
  segurança de dependências e testes funcionais pertencem às WOs futuras.

## M01-WO-001 — Métricas históricas de prova de viabilidade

- GitHub Actions [run #42519241684](https://github.com/NexLabsTech/exile-nexus/actions/runs/42519241684):
  Astro e Vite concluíram typecheck/build com PASS no HEAD
  `c4e8b44a476c16fe3c7a685450f2675767122466`.
- Astro + React: 1096 ms, 227095 bytes e 4 arquivos estáticos.
- Vite + React: 360 ms, 220692 bytes e 2 arquivos estáticos.
- O erro inicial de peer dependency (`@astrojs/check@0.9.12` versus
  TypeScript 7) foi corrigido sem ignorar resolução npm; Astro usa TS6
  no probe, Vite TS7. Logs e ressalvas no Evidence Bundle.
- O owner **aceitou** Astro estático + ilhas React, fallback React/Vite,
  na PR #141. Continua **sem aplicação implantada** ou autorização de produção.
- A futura implementação precisa de lockfile commitado, scanner de
  dependências e testes da UI real. Sem deploy ou acesso a dados externos.

## M01-WO-002 — Visual Tokens and Original Assets (aceite PR #142)

- **Base:** `4a6bba78fd1966804895c9f9dafe85bf70175633`.
- **Scope NECESSARY:** [issue #12](https://github.com/NexLabsTech/exile-nexus/issues/12):
  tokens estáticos acessíveis, dois SVGs geométricos próprios, inventário de
  proveniência e testes locais/CI. Não implementar UI real ou assets de PoE2.
- [Visual Tokens](visual-tokens.md), [Asset Rights Inventory](visual-assets-inventory.md)
  e [Evidence Bundle](evidence/EXN-M01-WO-002-visual-tokens-2026-11-08.md).
- WCAG 2.2 AA: texto normal mínimo 4.5:1 e limites de UI não textual 3:1,
  com cálculo automático em testes Python sem pacotes externos.
- **Identidade visual inicial ACEITA:** design/tokens.css e dois SVGs
  originais, após aceite explícito do owner, PR #142 integrada por squash em
  `79be738c7af8eda641c4ac4aff52ef7b28931ca0` e issue #12 CLOSED.
  EXN-DEC-0009 documenta limites; isso não é licença jurídica de terceiros.
- Nenhum direito de conteúdo de jogo é liberado; R01–R14 preservados.
  Sem fontes externas, data ingestion, deploy ou gasto. Só avançar na
  M12-WO-001 (#119), que bloqueia a interface da M01-WO-003 (#13).

## M12-WO-001 — Quality Baseline CI (Checkpoint Delta PROPOSTO)

- Base: `79be738c7af8eda641c4ac4aff52ef7b28931ca0` (PR #142).
- [Issue #119](https://github.com/NexLabsTech/exile-nexus/issues/119):
  baseline de CI fail-closed, testes positivos e negativos e detecção de
  manifestos de aplicações de produção.
- Enquanto não houver pacote real fora de `experiments/`, os comandos de
  lint/typecheck/test/build/npm audit da aplicação são **NOT APPLICABLE**,
  não PASS. Os testes do projeto e o scan de workflows são executáveis.
- `Docs validation` segue como único check obrigatório no ruleset.
  O workflow adicional exige auditoria de evidências mas não vira required
  sem autorização/admin read-back.
- [Evidence Bundle](evidence/EXN-M12-WO-001-quality-baseline-2026-11-08.md)
  permanece PROPOSED até CI, auditoria objetiva solo e aceite do owner.
- Nenhum reviewer externo, deploy, dados de jogo, serviço pago ou início de
  #13 estão autorizados por esta proposta.

## Reconciliação administrativa aprovada em 2026-11-08 — M12 CI e VIS Pilots

Este delta factual registra duas integrações **já executadas e aceitas pelo owner**; não aprova outras WOs ou direitos, nem reinterpreta propostas históricas acima:

- EXN-M12-WO-001, issue [#119](https://github.com/NexLabsTech/exile-nexus/issues/119), foi integrada pela [PR #143](https://github.com/NexLabsTech/exile-nexus/pull/143) após aceite explícito: squash normal `75bcb8c786beda9c4e62677fd325aa9d4c0418c2`, HEAD pré-merge `78d2fce1fee352b0a5d770a4a60b2fba919032b1`. Issue #119 CLOSED. No HEAD, [Docs validation #42522705357](https://github.com/NexLabsTech/exile-nexus/actions/runs/42522705357) e [Quality baseline #42522705338](https://github.com/NexLabsTech/exile-nexus/actions/runs/42522705338) completaram `success`, com 18 testes e cinco cenários negativos. O required check do ruleset #26806979 permanece apenas `Docs validation`; nenhuma aplicação de produto existia.
- EXN-VIS-WO-001, issue [#144](https://github.com/NexLabsTech/exile-nexus/issues/144), foi integrada pela [PR #145](https://github.com/NexLabsTech/exile-nexus/pull/145) após aceite explícito para o HEAD `c18e37d53c8cf0ff4c236758e261b4d5eb9b8d1f`: squash normal `2dc8f2490f97402bc983389831c16f6c1edd5d47`, issue #144 CLOSED. Quatro PNGs originais 1448 × 1086, quatro SVGs de referência, documentação, importador e testes estão na main. No HEAD pré-merge [Docs validation #42531258487](https://github.com/NexLabsTech/exile-nexus/actions/runs/42531258487) e [Quality baseline #42531258472](https://github.com/NexLabsTech/exile-nexus/actions/runs/42531258472) foram `completed/success`, com 28 testes, sem defeito HIGH/CRITICAL identificado no escopo. Read-back da main no commit `2dc8f2490f97402bc983389831c16f6c1edd5d47` confirmado.
- Referências: [Visual Pilot Pack](../design/references/README.md) e [Evidence Bundle](evidence/EXN-VIS-WO-001-reference-boards-2026-11-08.md). Os quatro PNGs foram importados sem transformações, com hashes documentados e validados. Os SVGs são reconstruções distintas, não cópias pixel a pixel.
- Decisão de referência visual `EXN-DEC-0010`: **aceita apenas como direção piloto para desenvolvimento**, sem substituir os tokens operacionais de `design/tokens.css` aprovados em EXN-DEC-0009. Antes de uso visual público/licenciado, validar originalidade, marcas de terceiros, direitos comerciais, proveniência e acessibilidade real. R01–R14 continuam sem liberar ingestão, sprites, preços ou assets de Path of Exile 2.
- A issue [#13](https://github.com/NexLabsTech/exile-nexus/issues/13), EXN-M01-WO-003, torna-se o **único próximo incremento NECESSARY**, para app shell e navegação responsiva. Implementação exige branch/PR Draft distintas, Astro 7.4.7 + React 19.3.1 islands, TypeScript strict, testes da aplicação, screenshot visual responsivo e auditoria de DoD; nenhum deploy nem merge é autorizado automaticamente.
- Custo obrigatório segue US$ 0. Não afirmar billing de apps opcionais, clearance jurídico ou produção completos sem evidência; sem reviewer externo, force-push ou bypass. Auditoria técnica solo não é auditoria independente.

## Reconciliação aprovada em 2026-11-08 — M01-WO-003: Shell público

Este delta registra somente a decisão e o merge já aceitos pelo owner em 2026-11-08. Os registros anteriores conservam o status histórico que tinham em seus próprios momentos, e não descrevem o estado atual.

- **WO aprovada:** [EXN-M01-WO-003 issue #13](https://github.com/NexLabsTech/exile-nexus/issues/13), `NECESSARY / STANDARD`. A autorização administrativa foi dada exclusivamente para [PR #147](https://github.com/NexLabsTech/exile-nexus/pull/147) no HEAD `c9b20f5d9fa0230f709ef519086a335116454668` após auditoria técnica objetiva solo. Squash merge normal confirmado na `main` em `0cc006ff48fbecf92be628c2599881bd7d1c3ce8`. Issue #13 CLOSED.
- **Implementação comprovada:** `apps/web/` inclui aplicação Astro 7.4.7 estática + React 19.3.1 islands com lockfile npm, TypeScript strict, shell responsivo, Home, sete rotas de seções com placeholders explicitamente não-live, 404, navegação teclado/mobile/Escape, favicon original e no-affiliation disclaimer. Não existe backend, autenticação, banco, ingestão de dados, IA real ou deploy.
- **Evidências no exato HEAD pré-merge:** [Docs validation #42535382989](https://github.com/NexLabsTech/exile-nexus/actions/runs/42535382989) PASS; [Quality baseline #42535383014](https://github.com/NexLabsTech/exile-nexus/actions/runs/42535383014) PASS; [Responsive browser #42535382996](https://github.com/NexLabsTech/exile-nexus/actions/runs/42535382996) PASS com 12 Playwright E2E e 6 screenshots (Home/Builds em 1440/768/390). 28 testes Python, lint, typecheck, unit, build e `npm audit --audit-level=high` PASS. [Evidence Bundle](evidence/EXN-M01-WO-003-public-shell-2026-11-08.md).
- **Riscos conhecidos:** sete findings MODERATE transitivos do npm audit permanecem sem mitigação documentada; não houve achados HIGH/CRITICAL no gate. Teste de acessibilidade automatizado axe, leitor de tela manual, benchmark de produção e clearance comercial de direitos NÃO foram concluídos. Screenshots validam somente a experiência do shell, não páginas de módulos futuros.
- **Restrições preservadas:** decisões EXN-DEC-0008/0009/0010, `design/tokens.css`, R01–R14, limite de custo US$0, auditoria solo sem independência e ruleset #26806979. Sem autorização para deploy, monetização, assets protegidos, fontes externas, serviço pago, bypass ou merge da próxima PR.
- **Próximo incremento exclusivamente necessário:** [EXN-M01-WO-004 issue #14](https://github.com/NexLabsTech/exile-nexus/issues/14), biblioteca pequena de componentes acessíveis e estados visuais. Depende de #13 (CLOSED); requer branch, PR Draft, testes unit/axe/visuais, Evidence Bundle, auditoria e novo aceite owner antes de merge. Nenhuma outra WO será aberta até concluir a #14.

## Reconciliação de aceite de 2026-11-08 — M01-WO-004

Delta factual após autorização expressa do owner para [PR #149](https://github.com/NexLabsTech/exile-nexus/pull/149), exclusivamente no HEAD `7ff883fc684317b36fd827efc62919e6f4a50d68`, e merge squash normal já concluído no commit `81dda433cb2115fa71d7e627fb2b0cb1ed79876f`. A issue [#14](https://github.com/NexLabsTech/exile-nexus/issues/14) foi CLOSED após confirmação da `main`.

- **Implementado e demonstrado:** em `apps/web/`, componentes tipados `ActionButton`, `TextField`, `FeedbackPanel`, `UiShowcase`; estados `loading`, `error`, `empty`, `success`; galeria local de UI sob `/ui-kit/` marcada `noindex,nofollow` (não é autenticação); estilos originais e conteúdo sem persistência nem fontes externas.
- **Evidência de teste no HEAD aprovado:** [Docs validation #42537191625](https://github.com/NexLabsTech/exile-nexus/actions/runs/42537191625) `completed/success`; [Quality baseline #42537191576](https://github.com/NexLabsTech/exile-nexus/actions/runs/42537191576) `completed/success`; [Playwright/axe #42537191653](https://github.com/NexLabsTech/exile-nexus/actions/runs/42537191653) `completed/success`. 28 testes Python; 20 E2E; 6 baselines visuais SHA-256 verificadas (1440/768/390 px, estado vazio/erro). Lint, TypeScript strict, build estático e `npm audit --audit-level=high` PASS. [Evidence Bundle](evidence/EXN-M01-WO-004-accessible-ui-states-2026-11-08.md).
- **Riscos não eliminados:** npm audit registrou 7 findings MODERATE transitivos, não HIGH/CRITICAL no gate; axe na galeria não prova conformidade acessível do site completo, testes manuais de leitores de tela e benchmark de produção ainda NÃO FORAM EXECUTADOS. Pixel parity completa com painéis-piloto não foi afirmada.
- **Preservado:** EXN-DEC-0008–0010, tokens operacionais `design/tokens.css`, gates de direitos R01–R14, custo obrigatório US$0 e proteção da main. Sem deploy, contas, scraping, dados reais, autenticação ou direitos comerciais de terceiros promovidos.
- **Próxima única WO NECESSARY:** [EXN-M01-WO-005 (#15)](https://github.com/NexLabsTech/exile-nexus/issues/15), motion e performance budget. Dependência #14 satisfeita, mas a próxima PR exige baseline medido Lighthouse, simulação de dispositivo modesto, reduzido movimento, controles de regressão e auditoria objetiva. Sua abertura **não** autoriza merge/deploy nem encerramento antecipado.

## Reconciliação aprovada em 2026-11-08 — M01-WO-005

Este delta factual registra somente a aprovação administrativa específica da PR [#151](https://github.com/NexLabsTech/exile-nexus/pull/151) pelo owner no HEAD `91e78eda5cf2f563f6dad105f01298ecb0fe4e8f` e seu squash normal confirmado na main `ba01dd9b083583fc422aff96b5372bcfb4f8fd90`. Issue [#15](https://github.com/NexLabsTech/exile-nexus/issues/15) CLOSED. Os registros históricos anteriores permanecem historicamente corretos, mas não expressam o estado corrente.

- **Implementado:** `apps/web/performance-budgets.json`, `apps/web/scripts/verify-budget.mjs`, testes positivos/negativos e perfis Playwright de movimento reduzido, teclado e CPU/rede limitada; `lighthouserc.cjs` e workflow read-only com quatro medições simuladas localmente, sem upload a serviço externo.
- **Evidências no HEAD autorizado:** [Docs #42539382845](https://github.com/NexLabsTech/exile-nexus/actions/runs/42539382845), [Quality #42539382947](https://github.com/NexLabsTech/exile-nexus/actions/runs/42539382947), [Playwright #42539382848](https://github.com/NexLabsTech/exile-nexus/actions/runs/42539382848) e [Lighthouse #42539382870](https://github.com/NexLabsTech/exile-nexus/actions/runs/42539382870), todos `completed/success`. 28 Python, 11 Node unit, 23 E2E, quatro Lighthouse local mobile simulados. JS gzip 72.934 B, CSS gzip 8.200 B, Home gzip 5.103 B, build cru 386.750 B; hidratação CPU×6 1.373ms e resposta menu 127ms após hidratação. [Evidence Bundle](evidence/EXN-M01-WO-005-motion-performance-2026-11-08.md).
- **Limitações:** os resultados de Lighthouse (100/100 nas duas páginas estáticas ensaiadas) são de laboratório, não Core Web Vitals reais, campo de produção ou hardware móvel físico. Sete vulnerabilidades transitivas MODERATE no npm audit seguem registradas; nenhum HIGH/CRITICAL reportado no gate. Dependências transitivas da ferramenta Lighthouse efêmera não foram integralmente travadas por lockfile. Auditoria pré-merge é solo, não independente.
- **Preservado:** tokens e ADRs aprovadas, direitos R01–R14, teto obrigatório US$0, gates de segurança, `main` protegida. Nenhuma mudança em fontes reais do jogo, backend, autenticação, cobrança, deploy ou permissão comercial de terceiros.
- **Próxima NECESSARY:** [EXN-M01-WO-006 issue #16](https://github.com/NexLabsTech/exile-nexus/issues/16), UI de busca global e contratos de navegação. Por ausência de direito verificado de dados do jogo, o incremento limitar-se-á a UI navegável, contratos claros de proveniência/freshness, índices de rotas públicas e fixtures sintéticas explicitamente rotuladas. Integração de datasets externos fica bloqueada até próprio gate R01–R14; nova branch, PR Draft, testes/Evidence Bundle/auditoria sem merge ou deploy automático.

## Reconciliação aprovada em 2026-11-08 — M01-WO-006

Este delta documenta somente o aceite administrativo explícito para a PR [#153](https://github.com/NexLabsTech/exile-nexus/pull/153) no HEAD `f3396cb857573eb501d357b1141cbef162d17517`. Squash normal integrado e confirmado na `main` como `bd95b41471d45959b967492da29acf564c96481a`; [issue #16](https://github.com/NexLabsTech/exile-nexus/issues/16) encerrada. Os deltas anteriores permanecem registros históricos do estado em suas datas.

- **Implementado:** `/search/` estática com busca determinística client-side, navegação do cabeçalho, menu móvel e rodapé, parâmetros de consulta e acessibilidade, estados vazio/erro, contratos TypeScript e testes fail-closed; índice contém apenas sete rotas públicas próprias e três exemplos declaradamente fictícios.
- **Evidências do HEAD aceito:** [Docs #42541427650](https://github.com/NexLabsTech/exile-nexus/actions/runs/42541427650), [Quality #42541427834](https://github.com/NexLabsTech/exile-nexus/actions/runs/42541427834), [Playwright #42541427676](https://github.com/NexLabsTech/exile-nexus/actions/runs/42541427676) e [Lighthouse local #42541427634](https://github.com/NexLabsTech/exile-nexus/actions/runs/42541427634): 4/4 PASS, 28 Python, 19 testes unitários Node, 33 E2E e quatro medições locais em Home/Builds. [Evidence Bundle](evidence/EXN-M01-WO-006-global-search-2026-11-08.md). O Lighthouse não certificou a rota de busca nem performance real de produção.
- **Riscos existentes:** npm audit mantém sete vulnerabilidades transitivas MODERATE, nenhuma HIGH/CRITICAL reportada no gate; teste manual completo de leitor de tela, licenças/direitos de conteúdo externo e desempenho de dispositivos reais NÃO verificados. A ferramenta Lighthouse efêmera tem risco de dependências transitivas não travadas.
- **Preservação de direitos e arquitetura:** o código rejeita qualquer registro externo (inclusive flag `AUTHORIZED` falsificada); não há ingestão, dados reais do jogo, preços, patch/league observados, contas, monetização, deploy ou novas autorizações R01–R14. Mantidos Astro/React, `design/tokens.css`, Source Hierarchy e proteção da `main`.
- **Próxima WO NECESSARY:** [EXN-M01-WO-007 issue #17](https://github.com/NexLabsTech/exile-nexus/issues/17), SEO, structured data e indexability. Exigir metadados para páginas públicas próprias e excluir rotas sintéticas, previews e conteúdo sem direitos. Sem domínio público/deploy aprovado, qualquer URL canônica absoluta ou sitemap de produção depende de configuração explícita verificável; não inventar endereço público. Nova branch e PR Draft com testes, Evidence Bundle, auditoria, sem merge ou deploy automático.

## Reconciliação de aceite em 2026-11-08 — EXN-M01-WO-007 (PREVIEW_ONLY)

Somente o escopo técnico da PR [#155](https://github.com/NexLabsTech/exile-nexus/pull/155) foi aprovado pelo owner, no HEAD `b70dfb6abf8004e1e162dfd7855b207dcf55f234`, integrado por squash normal na main `b7941aaa9fd51607cc705e656d7647a3ba96522c`. A issue [#17](https://github.com/NexLabsTech/exile-nexus/issues/17) foi CLOSED após o merge confirmado. Histórico das reconciliações anteriores continua válido na época em que foi redigido.

- **Implementado e testado:** contrato tipado `apps/web/src/lib/seo-policy.ts`, política única `apps/web/src/data/publication-policy.json`, `BaseLayout.astro` condicionando metadados, endpoints estáticos `robots.txt` e `sitemap.xml`, script de verificação do build e testes unitários/negativos/Playwright/CI. **Policy READ-BACK em main:** `PREVIEW_ONLY`, `approvedSiteOrigin:null`, `approvalEvidence:null`. Onze páginas existentes têm metadados únicos e permanecem `noindex,nofollow`, sitemap sem URLs e `robots.txt` deny-all; nenhum canonical público ou JSON-LD emitido. O caminho positivo para `WebSite`/`WebPage` existe apenas em fixture sintética de teste, sem publicar domínio.
- **Evidência HEAD exato:** [Docs #42543340983](https://github.com/NexLabsTech/exile-nexus/actions/runs/42543340983), [Quality #42543340987](https://github.com/NexLabsTech/exile-nexus/actions/runs/42543340987), [SEO #42543340974](https://github.com/NexLabsTech/exile-nexus/actions/runs/42543340974), [Browser #42543341044](https://github.com/NexLabsTech/exile-nexus/actions/runs/42543341044), [Lighthouse #42543340979](https://github.com/NexLabsTech/exile-nexus/actions/runs/42543340979), todos completed/success. 28 testes Python, 33 Node unit, 39 Playwright; Lighthouse de laboratório performance/acessibilidade/boas práticas 100/100 e **SEO 63/100** por bloqueio deliberado `noindex`. [Evidence Bundle](evidence/EXN-M01-WO-007-seo-indexability-2026-11-08.md).
- **Limites explícitos:** publicação pública, origem/DNS/SSL, indexação buscadores, SEO produção e direitos comerciais de fontes externas **BLOCKED / NOT VERIFIED**, não concluídos por este aceite. `noindex` não é controle de acesso. Nenhum deploy ou gasto. Sete achados npm MODERATE transitivos continuam registrados; nenhum HIGH/CRITICAL foi observado no gate executado. Lighthouse CLI com transitivas fora de lock, teste manual completo de leitor de tela e dados de uso reais não verificados.
- **Decisões preservadas:** Source Hierarchy, EXN-DEC-0003–0010, Astro/React, design original, gate R01–R14, main protegida, US$0 obrigatório. Nenhum conteúdo real/estatística/mercado/patch de jogo publicado, nem novos direitos ou domínio inferidos.
- **Próxima NECESSARY:** [EXN-M01-WO-008 issue #18](https://github.com/NexLabsTech/exile-nexus/issues/18): localização English-first, externalização de strings da UI pública e consistência de terminologia. Iniciar somente em branch/PR Draft próprias com auditoria, testes de chaves e snapshots. Não adicionar idiomas não aprovados, conteúdos de jogo nem promover publicação/deploy automaticamente.

## Reconciliação de aceite em 2026-11-08 — EXN-M01-WO-008 (localização English-first)

Somente o escopo técnico da PR [#157](https://github.com/NexLabsTech/exile-nexus/pull/157), HEAD `ebd8b11a532cf04adfda4a046a82fb3cda1f580f`, foi aprovado pelo owner para squash normal. GitHub confirmou o commit `cb9925c23db0b90bc8b32085519cfe1d3d7f232d` na `main` e a [issue #18](https://github.com/NexLabsTech/exile-nexus/issues/18) foi encerrada. Os registros anteriores neste checkpoint permanecem históricos.

- **Implementado:** `apps/web/src/i18n/en.json` contém **132 mensagens** em inglês; **126 chaves referenciadas** em 14 arquivos de UI pública; registries `routes.json` (7), `ui-states.json` (4) e `search-fixtures.json` (3 ficções) continuam externos, com interface visual/semântica preservada. Formatador determinístico rejeita placeholders inválidos e chaves ausentes; `scripts/verify-i18n.mjs` audita literais, chaves e cobertura; browser `pt-BR` mantém UI `en`. Não existem outros idiomas, seleção de locale, hreflang ou tradução remota.
- **Evidência HEAD exato:** Docs [#42545825299](https://github.com/NexLabsTech/exile-nexus/actions/runs/42545825299), Quality [#42545825266](https://github.com/NexLabsTech/exile-nexus/actions/runs/42545825266), inglês [#42545825361](https://github.com/NexLabsTech/exile-nexus/actions/runs/42545825361), browser [#42545825315](https://github.com/NexLabsTech/exile-nexus/actions/runs/42545825315), SEO [#42545825308](https://github.com/NexLabsTech/exile-nexus/actions/runs/42545825308), Lighthouse [#42545825260](https://github.com/NexLabsTech/exile-nexus/actions/runs/42545825260): **6/6 SUCCESS**, 28 Python, 42 Node unit, 44 E2E, seis snapshots visuais mantidos, performance e acessibilidade de laboratório em Home/Builds 100/100. SEO laboratório 63/100 por `noindex` deliberado. [Evidence Bundle](evidence/EXN-M01-WO-008-english-localization-2026-11-08.md).
- **Correction Delta concluído antes do aceite:** um E2E usava seletor ambíguo `role=status`, corrigido exclusivamente para `.search-results-count`; reexecução 44/44 PASS, sem enfraquecer CI ou rebaseline.
- **Riscos/limites:** sete achados npm MODERATE transitivos; nenhum HIGH/CRITICAL observado no gate `npm audit --audit-level=high`. Leitor de tela manual completo, dispositivo real, domínio público, SEO de produção e direitos externos R01–R14 continuam NOT RUN/BLOCKED quando aplicável. A política de SEO permanece `PREVIEW_ONLY`: sem origem pública aprovada, nenhuma URL pública canônica, deploy ou novas permissões.
- **Próxima NECESSARY:** [EXN-M01-WO-009 issue #19](https://github.com/NexLabsTech/exile-nexus/issues/19), gate de acessibilidade e responsividade, com matriz de axe/teclado, leitura com efeitos desabilitados, verificações automatizadas e checklist manual documentado. Branch e PR Draft próprias, testes, Evidence Bundle e auditoria, sem deploy ou merge automático.
