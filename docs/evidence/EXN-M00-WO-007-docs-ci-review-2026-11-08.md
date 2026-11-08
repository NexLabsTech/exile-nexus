# EXN-M00-WO-007 — Evidence Bundle de CI documental e contribuição

- **Owner:** NexLabsTech
- **Status:** BLOCKED somente pela configuração administrativa; Correction Delta local PASS
- **Revisão:** 2026-11-08
- **Work Order:** EXN-M00-WO-007 · Issue #8
- **Branch:** `exn-m00-wo-007-docs-ci`
- **Base SHA:** `e8e900feeaadc98f45e47244ad7840d25e1cc871`
- **PR:** #139 (Draft durante a execução/auditoria)
- **HEAD inicial/publicado:** `b3c509747d5bd19684cfa0f24b4e0f406f23b089`.
- **HEAD publicado antes desta Correction Delta:**
  `69219982d978c556e52e48b0e008804d59104d9c`.
- **HEAD publicado com os limites de rede desta correção:**
  `0649102eb841104083d574db2a7fab7b95ae960b`.
- **HEAD antes desta atualização do Evidence Bundle:**
  `7fe2d683f71b03a49e6e1d62d211861e602e448f`.
- **HEAD auditado antes do Correction Delta atual:**
  `efb4674b55e7300b26857155fbf1e8d0ed1aac0e`.
- **HEAD que contém esta revisão:** SHA do commit que atualiza este Bundle,
  visível no histórico/timeline da PR #139.

## Source Check e Context Lock

- Issue #8 está aberta e depende da WO-006, concluída na PR #138. Issue #7 foi
  fechada após merge normal por squash no commit
  `e8e900feeaadc98f45e47244ad7840d25e1cc871`.
- No início da WO, `main` remota e checkout coincidiam em
  `e8e900feeaadc98f45e47244ad7840d25e1cc871`; não havia PR aberta.
- Baseline de CI: zero workflow do GitHub Actions, zero manifesto/lockfile,
  zero código de aplicação, endpoint ou deployment.
- Settings de proteção de branch e segurança foram rechecados como `NOT
  VERIFIED` se API/integração não permite leitura; não são inferidos como
  ativos ou desativados. Nenhuma configuração foi alterada.
- Direitos R01–R14 continuam sem autorização para ingestão, persistência,
  reexibição, árvore passiva, dados econômicos, scraping ou monetização.
- A auditoria mais recente, comentário/review #5818146156 por NexLabsTech,
  avaliou o HEAD `efb4674b55e7300b26857155fbf1e8d0ed1aac0e` como `CORRECTION
  REQUIRED` para o workflow e `BLOCKED` para governança administrativa. O
  comentário declara independência do executor; o estado GitHub é
  `COMMENTED`, não aprovação formal `APPROVED`.

## Arquivos e mudanças

- `README.md`, `docs/README.md`, `docs/source-hierarchy.md`,
  `docs/decisions-ledger.md`, `docs/checkpoint.md`: atualização do contexto,
  ordem, dependências e limitações.
- `docs/test-plan.md`: matriz de testes por risco/pré-requisito, status,
  ferramentas, gates e custos.
- `CONTRIBUTING.md`: fluxo branch→PR→testes→auditoria→aceite, custo zero e
  direitos.
- `scripts/validate_docs.py`: validador stdlib de Source Pack, metadata,
  links locais/URL HTTPS, fences e padrões heurísticos de segredo.
- `tests/test_validate_docs.py`: testes unitários locais sem dependências.
- `.github/workflows/docs-ci.yml`: workflow fork-safe, `pull_request` para toda
  PR com base `main`, `push` filtrado em `main`, `contents: read`, checkout
  fixado, `persist-credentials: false`, timeout e cancelamento de execução
  obsoleta. actionlint e zizmor enumeram todos os workflows `.yml`/`.yaml`.
- Este Evidence Bundle.

Nenhum código funcional, dado de jogo, dependência runtime, segredo, workflow
de deploy ou configuração da conta é introduzido.

## Ações e ferramentas fixadas

- `actions/checkout` v7.0.1: SHA de commit oficial
  `3d3c42e5aac5ba805825da76410c181273ba90b1`; `action.yml` lido na origem
  oficial. Action usa `contents: read`, fetch-depth 1 e `persist-credentials:
  false`.
- `actionlint` v1.7.12, release oficial; asset e digest consultados na API do
  repositório oficial; SHA-256 do tarball Linux AMD64 verificado localmente:
  `8aca8db96f1b94770f1b0d72b6dddcb1ebb8123cb3712530b08cc387b349a3d8`.
- `zizmor` v1.32.0, release oficial; asset e digest consultados na API do
  repositório oficial; SHA-256 do tarball x86_64 verificado localmente:
  `bb110cc765eca9cd7efb2e284a956be5974c60027b0970f16397d86208a9957b`.
- Aplicativos automáticos preexistentes executaram checks nesta PR: CodeRabbit
  concluiu `skipped` porque a PR está Draft; Socket PR Alerts concluiu
  `success` sem mudança de dependências e Socket Project Report concluiu
  `success`. Nenhum foi solicitado manualmente ou usado como gate técnico.
  Elegibilidade/plano e custo do Socket não são legíveis e permanecem
  `NOT VERIFIED`; a proteção administrativa inacessível também impede provar se
  algum check externo foi marcado como obrigatório.

## Testes e logs

Executados localmente nesta branch:

- `python3 -m unittest discover -s tests -p 'test_*.py' -v` — **PASS**, 4
  testes: link local presente/ausente, rejeição de URL HTTP e detecção de
  padrão sintético de token sem exibir o valor.
- `python3 scripts/validate_docs.py` — **PASS**: Source Pack presente; 23
  arquivos Markdown; 56 links; zero correspondências nos padrões heurísticos
  de segredo.
- `mapfile -d '' workflow_files < <(find .github/workflows -maxdepth 1 -type f \( -name '*.yml' -o -name '*.yaml' \) -print0 | sort -z)` — **PASS**, enumerou 1 workflow existente.
- `actionlint "${workflow_files[@]}"` com v1.7.12 — **PASS**, exit 0 para todos os workflows encontrados.
- `zizmor "${workflow_files[@]}"` com v1.32.0 — **PASS**, “No findings to report!” para todos os workflows encontrados.
- `python3 -m py_compile scripts/validate_docs.py tests/test_validate_docs.py`
  — **PASS**.
- `git diff --check` — **PASS**.
- A primeira execução do validador falhou porque aplicava metadata obrigatória
  também a dois Evidence Bundles históricos que não usam esse formato. Foi
  correção do validador nesta WO: metadata agora é exigida nos documentos
  canônicos atuais e no Evidence Bundle corrente. Não foi reescrito nenhum
  artefato histórico; a execução subsequente passou.
- GitHub Actions na base antes da PR: zero workflows. O run #42478978237
  confirmou a execução do workflow no primeiro head. No HEAD
  `69219982d978c556e52e48b0e008804d59104d9c`, o run #42479196861 terminou
  `success`; o job `Docs validation` e seus oito passos foram concluídos com
  sucesso. Uma consulta anterior observou a etapa de instalação de `actionlint`
  ainda em andamento; ela terminou posteriormente. A etapa não foi cancelada.
- No HEAD `0649102eb841104083d574db2a7fab7b95ae960b`, o run #42479831940
  terminou `success` em aproximadamente seis segundos; `Docs validation` e os
  oito passos foram concluídos. Os check-runs associados registraram
  `Docs validation: success`, `CodeRabbit: skipped` (Draft), `Socket Security:
  Pull Request Alerts: success` e `Socket Security: Project Report: success`.
- No HEAD `7fe2d683f71b03a49e6e1d62d211861e602e448f`, o run #42480060997
  terminou `success`; `Docs validation` e os oito passos passaram novamente.
- Páginas oficiais GitHub billing, hardening e evento `pull_request`: HTTP 200.
  Releases oficiais consultados e tarballs verificados por SHA-256.

Build, typecheck, lint de app, testes de aplicação/E2E, CodeQL de produto,
Dependency Review e análise de dependências: `NOT APPLICABLE` sem aplicação ou
manifestos. Nenhum teste dinâmico de browser/deploy foi executado. Gitleaks,
TruffleHog e detect-secrets não estão instalados; o validador é heurístico e
não substitui scanner dedicado.

## Correction Delta

- Aplicado nesta correção: removido `paths` do evento `pull_request` para que
  `Docs validation` inicie em qualquer PR para `main`; os filtros `paths` do
  evento `push` foram preservados.
- actionlint e zizmor agora coletam, por `find`, todos os arquivos `.yml` e
  `.yaml` dentro de `.github/workflows/`, falhando explicitamente se nenhum for
  encontrado. Nesta revisão foi encontrado um workflow.
- Reexecução local pedida pela auditoria: quatro testes unitários **PASS**;
  validador documental **PASS** (23 Markdown, 56 links, zero matches
  heurísticos); actionlint v1.7.12 **PASS**; zizmor v1.32.0 **PASS**, sem
  findings; `git diff --check` **PASS**.
- CI remoto no novo HEAD ainda pendente de publicação/execução; será registrado
  pela timeline da PR e no relatório final.
- O sinal anterior de demora na instalação do actionlint foi corrigido antes:
  etapas limitadas a 2 minutos e downloads com conexão de 10 segundos e limite
  total de 60 segundos; o run #42480225757 no HEAD `efb4674` passou.

## Governança administrativa

- NexLabsTech tem permissão de colaborador `admin`, confirmada pela API. Porém,
  GET `/branches/main/protection` com a conexão NexLabsTech retorna 403
  `Resource not accessible by integration`. A instalação GitHub desta sessão
  não expõe `Administration: read/write`; a identidade CLI `KayzenRoot` também
  não pode substituir a sessão administrativa.
- Rulesets visíveis: resposta `[]`; não prova ausência de proteção efetiva.
- Dependabot Alerts: último estado explícito na WO-001 foi desativado; leitura
  atual 403. Alertas atuais, Updates, Code Scanning, Secret Scanning, Push
  Protection e Actions permissions: `NOT VERIFIED`.
- Requisitos efetivos de checks na `main`, proteção PR, squash-only, histórico
  linear, force-push/exclusão e conversa resolvida também `NOT VERIFIED`.
- A branch/PR permanece Draft. Não se propõe nenhum check externo com quota
  como required; não existe permissão `Administration: read/write` nesta
  conexão para confirmar o estado efetivo ou alterar essa política.

## Auditoria, custos e Checkpoint Delta

Auditoria técnica será objetiva, comparando diff/HEAD remoto, testes locais,
Actionlint/zizmor e run da GitHub Actions. Executor e auditor compartilham a
mesma sessão; isso não é auditoria independente nem GitHub Review formal
`APPROVED`.

Custo direto do validador e testes locais: US$ 0. O CI proposto usa runner
padrão gratuito do repositório público; a política de billing da conta e o
custo das instalações externas preexistentes continuam `NOT VERIFIED`. Não
acionar review manual/quota nem aceitar upgrade.

Checkpoint Delta proposto: o CI agora é acionável em todas as PRs e audita
todos os workflows existentes; registrar o run de sucesso após publicação e
selecionar somente `Docs validation` como check required depois do read-back
administrativo. Para esse read-back, uma sessão autenticada NexLabsTech deve
usar Settings → Rules → Rulesets para configurar o alvo `main`, PR obrigatória,
zero aprovações, `Docs validation` atualizado, conversas resolvidas, histórico
linear, force-push e deleção bloqueados, sem bypass; Settings → General → Pull
Requests deve deixar squash como única estratégia. Até verificar esses estados,
a configuração permanece `BLOCKED`, a Issue #8 não é concluída e WO-008 ou
funcionalidade não iniciam.

- **Veredito:** correção técnica local `PASS`; Work Order `BLOCKED` somente
  pela configuração/read-back administrativo. Sem o endpoint de protection,
  não se pode provar estado de `main`, nem que CodeRabbit/Socket estão fora da
  lista efetiva de checks obrigatórios.
- **Aceite NexLabsTech:** pendente.
