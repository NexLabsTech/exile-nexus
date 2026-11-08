# EXN-M00-WO-006 — Evidence Bundle de segurança, privacidade e abuso

- **Owner:** NexLabsTech
- **Status:** PROPOSED
- **Revisão:** 2026-11-08
- **Work Order:** EXN-M00-WO-006 · Issue #7
- **Branch:** `exn-m00-wo-006-security-privacy`
- **Base SHA:** `2b98db725c883dd9bbef3b080673d0b5b07036ab`
- **HEAD inicial:** `2b98db725c883dd9bbef3b080673d0b5b07036ab`
- **HEAD final:** registrar no relatório/comentário após publicar; o commit que
  contém este bundle não pode conter seu próprio SHA.

## Source Check e Context Lock

- Issue #7 está aberta, depende de WO-005 e define a elaboração de threat model,
  privacidade, abuso e inspeção de controles nativos gratuitos. Issue #6 está
  concluída; a PR #137 foi squash-merged no SHA-base acima.
- `git fetch origin main` confirmou que o `main` remoto e o checkout tinham o
  mesmo SHA-base antes das alterações. Não havia PR aberta.
- Inventário no início: 18 arquivos rastreados; somente documentação; zero
  manifests/lockfiles, workflows, app, API, banco e deployment.
- R01–R14 não concedem uso operacional de dados de jogo, fontes econômicas,
  árvore passiva, scraping ou monetização.

## Arquivos alterados e escopo

- `README.md` — Work Order atual, links e limites do produto.
- `docs/README.md` — índice do threat model e estado das WOs.
- `docs/source-hierarchy.md` — reconciliação da WO-005 integrada e WO-006 atual.
- `docs/decisions-ledger.md` — registro da decisão explícita de segurança e
  privacidade do owner, sem autorizar settings ou coleta.
- `docs/security-privacy-threat-model.md` — ativos, limites de confiança,
  atores, 12 ameaças, controles, status, privacidade, paradas e fontes oficiais.
- `docs/checkpoint.md` — SHAs integrados, Context Lock, estados administrativos
  e Checkpoint Delta.
- Este Evidence Bundle.

Não há código de aplicação, manifestos, workflow, settings, API de jogo, dado,
credencial ou deployment no diff.

## Controles nativos e evidências de acesso

- `gh api repos/NexLabsTech/exile-nexus/actions/workflows` →
  `count=0 names=`. Nenhum workflow/check próprio executado.
- `gh api repos/NexLabsTech/exile-nexus/rulesets` → `0` rulesets visíveis para
  a credencial CLI. Isso não confirma política efetiva de `main`.
- GET `/branches/main/protection` pelo conector NexLabsTech → 403
  `Resource not accessible by integration`.
- GET `/vulnerability-alerts` pela CLI → HTTP 403; cabeçalho
  `X-Accepted-Github-Permissions: administration=read`. A WO-001 registrou a
  resposta explícita anterior “Dependabot alerts are disabled for this
  repository”; estado atual não pode ser revalidado.
- O endpoint de Actions permissions, Code Scanning, Security and Analysis e
  Automated Security Fixes não está na allowlist do conector. As configurações
  permanecem NOT VERIFIED; não houve inferência de que estejam desligadas.
- A conta conectada NexLabsTech tem permissão repository `admin`, mas o GitHub
  App gerenciado não expõe as APIs administrativas. A CLI é a conta KayzenRoot,
  sem admin/push. A permissão exata necessária para leitura observada é
  `Administration: read`; settings write exigem `Administration: write`.
  Nenhum token foi extraído ou modificado.
- Não houve mutação administrativa nesta WO.

## Fontes oficiais e custos

HTTP GET em 2026-11-08, status HTTP 200: CodeQL Code Scanning, Secret Scanning,
Push Protection, Dependabot Alerts, Dependabot Security Updates, Dependency
Review e permissões automáticas de `GITHUB_TOKEN`. URLs e o escopo de cada
página constam no threat model.

Custo novo desta WO: **US$ 0**. Não foi iniciado runner pago, serviço com quota,
revisão comercial, upgrade, app, integração ou recurso Cloudflare. A página de
billing/admin da conta NexLabsTech e os custos de apps automáticos preexistentes
não são visíveis; custo total da conta permanece NOT VERIFIED. Nenhuma franquia
CodeRabbit/Socket ou SaaS é necessária para gate.

## Testes e verificações

Executados nesta sessão, no checkout local:

- `git diff --check` — **PASS**, sem erro de whitespace.
- Validação documental customizada — **PASS**: exatamente sete caminhos na
  allowlist; metadados presentes; fences balanceados; links locais válidos;
  seis IDs de decisão únicos; checklist do threat model completo com 12 ameaças.
- Busca documental de segredos — **PASS heurístico**: 20 arquivos do worktree,
  sete padrões comuns, zero correspondências. `gitleaks`, `trufflehog` e
  `detect-secrets` não estavam instalados; esta busca não equivale a scanner
  dedicado e tem falsos negativos possíveis.
- Inventário e API de workflows — **PASS**, zero workflow cadastrado.
- As oito páginas oficiais listadas no threat model retornaram HTTP 200.
- `git fetch origin main` confirmou `main` e checkout no SHA-base informado.

Não aplicáveis: build, typecheck, lint de app, testes unit/integration/E2E,
CodeQL sobre o código do produto e Dependency Review de manifestos; não há app,
código suportado, dependência ou workflow. Nenhum job de GitHub Actions foi
executado. Não existe teste independente por Actions ou terceiro; o executor
executou as verificações e fará auditoria técnica objetiva no mesmo contexto.

## Riscos e limitações

- Proteção da `main`, configuração CodeQL, Dependabot, Secret Scanning, Push
  Protection e permissões globais do Actions permanecem NOT VERIFIED por acesso
  administrativo da integração. Para validar settings/read-back: `Administration:
  read`; para alterar: `Administration: write` na conexão administrativa do
  repositório.
- A API verificou que o último estado explícito conhecido de Dependabot Alerts
  era desativado, mas não confirmou o estado atual.
- Não há ferramenta dedicada de secret scanning instalada. Os padrões
  heurísticos têm falsos negativos possíveis; não devem ser tratados como prova
  de ausência de todo segredo.
- Rights R01–R14 continuam bloqueando ingestão/reexibição de conteúdo, árvore,
  fontes econômicas e monetização. Faturamento total da conta permanece
  desconhecido.
- Nenhum defeito de código HIGH/CRITICAL foi introduzido; não há código de
  aplicação para avaliação dinâmica. Os riscos futuros do modelo não são
  findings atuais.

## Auditoria e Checkpoint Delta

A auditoria técnica objetiva consiste em revisão do diff, verificação de SHA,
reexecução de checks documentais, scan heurístico e consultas de API/Fontes
HTTP. O auditor é o executor na mesma sessão; não é independente e não é GitHub
Review formal `APPROVED`. Aceite administrativo NexLabsTech será registrado em
comentário separado somente após verificação dos critérios.

Checkpoint Delta proposto: integrar o threat model como base de planejamento;
manter settings sem read-back como NOT VERIFIED; requerer conexão com
`Administration: read/write` para as Work Orders administrativas; manter
rights e deployment gates fechados; deixar WO-007 e WO-008 pendentes.

- **Veredito técnico:** pendente da validação final e auditoria objetiva.
- **Aceite NexLabsTech:** pendente.
