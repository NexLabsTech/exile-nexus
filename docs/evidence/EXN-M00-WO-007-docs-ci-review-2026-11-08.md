# EXN-M00-WO-007 — Evidence Bundle de CI documental e contribuição

- **Owner:** NexLabsTech
- **Status:** PROPOSED · testes e gate administrativo pendentes
- **Revisão:** 2026-11-08
- **Work Order:** EXN-M00-WO-007 · Issue #8
- **Branch:** `exn-m00-wo-007-docs-ci`
- **Base SHA:** `e8e900feeaadc98f45e47244ad7840d25e1cc871`
- **PR:** #139 (Draft durante a execução/auditoria)
- **HEAD inicial/publicado:** `b3c509747d5bd19684cfa0f24b4e0f406f23b089`.
- **HEAD final:** consultar metadata/timeline da PR desta WO e o comentário de
  auditoria; o commit que contém este Bundle não pode referenciar seu próprio
  SHA.

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
- `.github/workflows/docs-ci.yml`: workflow fork-safe, somente `pull_request`
  e `push` em `main`, `contents: read`, checkout fixado, `persist-credentials:
  false`, timeout, filtros por path e cancelamento de execução obsoleta.
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
- Nenhum app de análise comercial ou review com quota foi invocado. O Socket
  automático na PR #138 é preexistente, não foi usado como gate; seu custo não
  é legível e permanece `NOT VERIFIED`.

## Testes e logs

Executados localmente nesta branch:

- `python3 -m unittest discover -s tests -p 'test_*.py' -v` — **PASS**, 4
  testes: link local presente/ausente, rejeição de URL HTTP e detecção de
  padrão sintético de token sem exibir o valor.
- `python3 scripts/validate_docs.py` — **PASS**: Source Pack presente; 23
  arquivos Markdown; 56 links; zero correspondências nos padrões heurísticos
  de segredo.
- `actionlint .github/workflows/docs-ci.yml` com v1.7.12 — **PASS**, exit 0.
- `zizmor .github/workflows/docs-ci.yml` com v1.32.0 — **PASS**, “No findings
  to report!”.
- `python3 -m py_compile scripts/validate_docs.py tests/test_validate_docs.py`
  — **PASS**.
- `git diff --check` — **PASS**.
- A primeira execução do validador falhou porque aplicava metadata obrigatória
  também a dois Evidence Bundles históricos que não usam esse formato. Foi
  correção do validador nesta WO: metadata agora é exigida nos documentos
  canônicos atuais e no Evidence Bundle corrente. Não foi reescrito nenhum
  artefato histórico; a execução subsequente passou.
- GitHub Actions na base antes da PR: zero workflows. O run #42478978237
  confirmou a execução do novo workflow no primeiro head. A atualização deste
  Evidence Bundle cria um novo head; seu run final será registrado na timeline
  da PR e no relatório final, sem auto-referenciar o SHA do commit deste arquivo.
- Páginas oficiais GitHub billing, hardening e evento `pull_request`: HTTP 200.
  Releases oficiais consultados e tarballs verificados por SHA-256.

Build, typecheck, lint de app, testes de aplicação/E2E, CodeQL de produto,
Dependency Review e análise de dependências: `NOT APPLICABLE` sem aplicação ou
manifestos. Nenhum teste dinâmico de browser/deploy foi executado. Gitleaks,
TruffleHog e detect-secrets não estão instalados; o validador é heurístico e
não substitui scanner dedicado.

## Governança administrativa

- GET `/branches/main/protection`: 403 `Resource not accessible by integration`.
  O cabeçalho de permissões aceitas indica `Administration: read` para a leitura;
  alteração/read-back administrativo requer conexão NexLabsTech com
  `Administration: write`.
- Rulesets visíveis: resposta `[]`; não prova ausência de proteção efetiva.
- Dependabot Alerts: último estado explícito na WO-001 foi desativado; leitura
  atual 403. Alertas atuais, Updates, Code Scanning, Secret Scanning, Push
  Protection e Actions permissions: `NOT VERIFIED`.
- Requisitos efetivos de checks na `main`, proteção PR, squash-only, histórico
  linear, force-push/exclusão e conversa resolvida também `NOT VERIFIED`.
- A branch/PR permanece Draft até testes, auditoria e aceite. Nenhum check
  externo com quota será configurado como required; não existe API permitida
  nesta conexão para confirmar read-back ou alterar essa política.

## Auditoria, custos e Checkpoint Delta

Auditoria técnica será objetiva, comparando diff/HEAD remoto, testes locais,
Actionlint/zizmor e run da GitHub Actions. Executor e auditor compartilham a
mesma sessão; isso não é auditoria independente nem GitHub Review formal
`APPROVED`.

Custo direto do validador e testes locais: US$ 0. O CI proposto usa runner
padrão gratuito do repositório público; a política de billing da conta e o
custo das instalações externas preexistentes continuam `NOT VERIFIED`. Não
acionar review manual/quota nem aceitar upgrade.

Checkpoint Delta proposto: registrar Test Plan, workflow documental e guia de
contribuição depois de aprovação e merge normal. Exigir apenas o check gratuito
observado após execução com sucesso. Se settings administrativos permanecerem
sem read-back, registrar `BLOCKED`, não fazer bypass, não concluir Issue #8 e
não avançar para WO-008 ou funcionalidade.

- **Veredito técnico:** o workflow no primeiro head passou; veredito da WO-007
  permanece pendente da auditoria final e read-back de branch protection.
- **Aceite NexLabsTech:** pendente.
