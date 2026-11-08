# Test Plan

- **Owner:** NexLabsTech
- **Status:** PROPOSED
- **Revisão:** 2026-11-08
- **Work Order:** EXN-M00-WO-007 · Issue #8

## Objetivo e estados de resultado

Este plano define evidências proporcionais ao produto que existe. A aplicação
não está implementada; os testes de runtime permanecem NOT APPLICABLE até seus
pré-requisitos existirem. Cada relatório usa estes estados:

- `PASS`: o comando ou job foi executado no SHA informado e passou.
- `FAIL`: executou e falhou; registrar log, causa e impacto.
- `NOT APPLICABLE`: pré-requisito técnico não existe; explicar qual.
- `NOT RUN`: aplicável, mas não executado; não pode ser tratado como PASS.
- `BLOCKED`: não executável por dependência, direito, acesso, custo ou gate
  explícito; registrar o requisito que falta.

## Matriz de testes

| Fase / risco | Verificação | Gatilho e pré-requisito | Ferramenta/evidência | Estado atual |
| --- | --- | --- | --- | --- |
| Documentação e Source Pack | Presença dos documentos canônicos; owner/status/revisão/WO; links locais; fences; sintaxe de URLs externas; padrões de segredo. | PR ou push na `main` que altera Markdown, script, teste ou workflow. | `python3 scripts/validate_docs.py`; log CI `Documentation CI / Docs validation`. | Implementado nesta WO; deve passar no PR para ser validado. |
| Documentação | Testes de regressão do validador. | Cada PR que altera script/tests/workflow/docs. | `python3 -m unittest discover -s tests -p 'test_*.py' -v`. | Implementado nesta WO. |
| GitHub Actions | Sintaxe e padrões de segurança dos workflows. | Cada PR que altera workflow. | `actionlint` v1.7.12 e `zizmor` v1.32.0, obtidos de releases oficiais com SHA-256 fixo no workflow. | Implementado nesta WO. |
| Código da aplicação | Lint, TypeScript strict, typecheck, build, testes unitários/integration e contratos. | Código, package/lockfile e arquitetura runtime aprovados. | Ferramentas e logs definidos na WO funcional; sem dependência comercial. | `NOT APPLICABLE`: nenhum código ou manifestos existem. |
| Dependências | Atualização e vulnerabilidades. | Manifesto/lockfile de aplicação existente; settings administrativos verificados. | Dependabot Alerts/Security Updates, Dependency Review, OSV-Scanner, Trivy conforme ecossistema. | `NOT APPLICABLE` para scanner de manifestos; settings GitHub `NOT VERIFIED`. |
| Análise estática | Fluxo de código e regras de segurança. | Linguagem suportada e código executável. | CodeQL e Semgrep CE local/CI; permissões `security-events: write` somente no job CodeQL se necessário. | `NOT APPLICABLE`: sem código; Code Scanning settings `NOT VERIFIED`. |
| Dados/adapters | Proveniência, patch/league, schema, frescor, falhas, cache, quota e direitos. | Fonte e finalidade `AUTORIZADO`; contrato e fixtures permitidas. | Unit/contract tests; fixtures sintéticas; logs sem segredos. | `BLOCKED` para fonte não autorizada pelas R01–R14. |
| Interface / acessibilidade | Rotas, responsividade, estados vazios/erro/loading, navegação por teclado, contraste e reduced motion. | Build reproduzível de aplicação existente. | Playwright e axe-core; E2E em PR antes do merge. | `NOT APPLICABLE`: sem aplicação/browser target. |
| Performance | Core Web Vitals, bundle, interação e árvore. | UI real, build e conteúdo autorizado ou sintético. | Lighthouse CI e benchmarks locais; limites e regressões registrados. | `NOT APPLICABLE`: sem bundle ou árvore. |
| Segurança dinâmica | Testes de API/DAST, headers, XSS/SSRF, auth e abuso. | Ambiente de teste autorizado; fixtures, endpoint e escopo explícitos. | OWASP ZAP em alvo de teste; não executar contra produção ou terceiros sem autorização. | `NOT APPLICABLE`: sem endpoint/ambiente. |
| Release/deploy | Regressão, migrations, rollback, smoke e operação. | Work Order de release, dados/rights e conta/custo aprovados. | E2E, checks de segurança, smoke, rollback e evidência do SHA/deployment. | `BLOCKED`: não há app, conta de deploy ou autorização. |
| Pós-deploy | Saúde, rotas, erros, quotas, custo, incidentes e recuperação. | Deployment válido autorizado. | Smoke/health/rollback e operação com dados minimizados. | `NOT APPLICABLE`: não há deployment. |

`gitleaks`/`trufflehog` ainda não estão instalados localmente; o validador usa
heurísticas declaradas. Secret Scanning/Push Protection da conta devem ser lidos
administrativamente antes de serem descritos como ativos.

## CI documental

O workflow roda em `pull_request` para `main` e em `push` para `main`, com
filtros por caminhos Markdown/CI, runner padrão `ubuntu-latest`, timeout de dez
minutos, `contents: read`, checkout fixado em SHA e `persist-credentials: false`.
A concorrência cancela execuções obsoletas. Não há dependências de pacote para
cache; ferramentas de lint são pequenas, versionadas e verificadas por SHA-256.
Nenhum secret, preview/deploy, app com quota ou licença paga é necessário.

O nome do check planejado é `Documentation CI / Docs validation`. Não o torne
required até observar sucesso no PR e confirmar por leitura administrativa que
a política não exige CodeRabbit, Socket ou outro check externo cobrado.

## Regras de parada

- Não avançar merge com teste aplicável falhando, achado HIGH/CRITICAL ou segredo.
- Fonte sem autorização bloqueia somente ingestão e funcionalidade dependente;
  fixture sintética pode ser usada quando permitida.
- Serviço, runner, app ou funcionalidade que possa gerar custo > US$ 0 não é
  ativado; não há upgrade automático.
- Setting administrativo inacessível fica `NOT VERIFIED`; read-back é
  obrigatório para declará-lo ativo.
- Registre SHA exato, comandos, resultados, logs, limitações, auditoria e
  Checkpoint Delta em cada Evidence Bundle.

## Limites gratuitos

A documentação oficial do GitHub consultada nesta WO declara que runners
padrão hospedados são gratuitos para repositórios públicos; larger runners e
outros serviços podem cobrar. A conta e billing NexLabsTech não estão visíveis
nesta conexão. Revalidar limites e custo antes de adicionar qualquer integração.

- [GitHub Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions)
- [GitHub Actions security hardening](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions)
- [Pull request events](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#pull_request)
- [actions/checkout v7.0.1](https://github.com/actions/checkout/tree/3d3c42e5aac5ba805825da76410c181273ba90b1)
- [actionlint v1.7.12](https://github.com/rhysd/actionlint/releases/tag/v1.7.12) — SHA-256 do tarball Linux AMD64: `8aca8db96f1b94770f1b0d72b6dddcb1ebb8123cb3712530b08cc387b349a3d8`.
- [zizmor v1.32.0](https://github.com/woodruffw/zizmor/releases/tag/v1.32.0) — SHA-256 do tarball Linux x86_64: `bb110cc765eca9cd7efb2e284a956be5974c60027b0970f16397d86208a9957b`.
