# EXN-M00-WO-001 — baseline do repositório

**Coletado em:** 2026-11-08 01:01 UTC  
**Repositório:** `NexLabsTech/exile-nexus`  
**Issue:** [#2 — Repository baseline and access audit](https://github.com/NexLabsTech/exile-nexus/issues/2)  
**Resultado:** baseline publicado em Draft PR para revisão; aprovação independente pendente.

## Context Lock

| Campo | Evidência observada |
|---|---|
| Branch consultada | `main` |
| Base SHA / HEAD observado | `23ec93e0fb174fb84db38298ce890f693a62abf1` |
| Referência remota | `origin/main` aponta para o mesmo SHA; `git ls-remote` confirmou `main` como HEAD remoto |
| Estado inicial do workspace | Limpo, `main...origin/main` |
| PRs | Na captura inicial, nenhuma PR aberta ou fechada. Após a captura, Draft PR [#133](https://github.com/NexLabsTech/exile-nexus/pull/133) foi aberta para este Work Order |
| Issue #2 | Aberta, sem labels ou comentários; corpo indica `PROPOSED` |
| Issues #3–#9 | Todas abertas; representam dependências posteriores do M00 |
| Fonte de precedência | `README.md` é o único arquivo versionado. Checkpoint, Decisions Ledger, Scope, Definition of Done, Architecture e Requirements não existem neste HEAD; hierarquia canônica ainda pendente |

O snapshot do PDF coincide com o HEAD observado. Não há drift Git local no início da coleta. Como os documentos canônicos ainda não existem, este Context Lock é parcial e não substitui a hierarquia de fontes prevista nas issues subsequentes.

## Inventário e integridade

- Árvore versionada no HEAD: `README.md`.
- Conteúdo do README: `# exile-nexus`.
- SHA-256 do `README.md`: `7bf57d0d3b5931a56e6c59d03209e81b09b331cbf7c11830ca2652ac76ebc818`.
- Não há código de aplicação, manifestos/lockfiles, workflows, testes, documentação de arquitetura, checkpoint ou decisões aprovadas neste commit.

## GitHub e checks

| Controle | Estado observado |
|---|---|
| Repositório | Público, ativo, branch padrão `main` |
| Permissão da integração consultora | API de repositório informa `pull: true`, `push: false`, `admin: false`; sem acesso de escrita |
| PRs | Nenhuma |
| Workflows do GitHub Actions | Nenhum workflow cadastrado; endpoint de execuções retornou zero runs |
| Status checks | Nenhum status legado. Um check run no HEAD: `Socket Security: Project Report`, conclusão `success`, em 2026-11-08 00:29:13 UTC ([execução](https://github.com/NexLabsTech/exile-nexus/runs/128576434475)) |
| Rulesets do repositório, incluindo pais | API retornou lista vazia |
| Branch protection de `main` | Não verificável: API respondeu 403 por falta da permissão de leitura administrativa |
| Permissões de Actions | Não verificáveis: endpoint respondeu 403 (`Resource not accessible by integration`) |
| Segurança avançada | Não verificável: o campo `security_and_analysis` veio `null`; endpoint de Code Scanning respondeu 403. Não interpretar como recurso desativado |
| Alertas de dependência | Não verificáveis: consulta de Dependabot/Vulnerability Alerts respondeu 403 |
| Secret Scanning / Push Protection | Não verificáveis com a permissão disponível; nenhum alerta foi consultado ou exposto |
| Aplicativos externos | O check run comprova atividade do Socket Security; a Draft PR #133 recebeu comentário automático do CodeRabbit indicando que drafts não são revisados automaticamente. Plano/licença e custo efetivo de ambos não foram verificados |

A integração de leitura usada nesta coleta não tem `push` nem `admin`. As permissões do `GITHUB_TOKEN` de workflows são **não aplicáveis/não verificáveis**, pois não há workflow. Nenhuma configuração de segurança foi alterada.

## Avaliação de risco e custo

- Não existe código ou dependência para análise estática ou de vulnerabilidades; scanners de código/dependências são **NOT APPLICABLE** neste baseline, sem equivaler a aprovação de segurança.
- Não foi possível confirmar proteção de `main`, permissões de Actions, recursos nativos de segurança ou alertas existentes devido às respostas 403/permissões da integração.
- O check do Socket Security precisa de verificação de licença, integração e custo antes de ser tratado como serviço autorizado ou gratuito.
- Nenhum risco técnico HIGH/CRITICAL foi avaliado como corrigido: o repositório ainda não contém aplicação para essa avaliação.
- Nenhuma ferramenta paga foi ativada e esta coleta foi somente leitura. Custo de conta/serviço e quotas do GitHub não foram verificados; US$ 0 recorrente não está confirmado.

## Evidências e comandos

Coleta feita em 2026-11-08 UTC, sem alterações remotas:

- Git `2.52.0` e GitHub CLI `2.46.0`.
- Auditoria de Git/API: executada; HEAD local/remoto coincidem e issue/PR/workflow/ruleset endpoints consultados conforme abaixo.
- Testes de aplicação, lint, build, SAST e dependências: **NOT APPLICABLE** neste incremento, pois o HEAD contém apenas o README e não possui código, manifestos, workflows ou suíte de testes. Nenhum resultado de teste foi simulado como PASS.

- `git status --short --branch`, `git log -5 --oneline --decorate`, `git branch -avv`, `git remote -v`, `git ls-tree -r --name-only HEAD`.
- `git ls-remote --symref origin HEAD refs/heads/main`.
- `gh repo view NexLabsTech/exile-nexus --json nameWithOwner,visibility,defaultBranchRef,url`.
- `gh issue view 2` e `gh issue view 3` a `gh issue view 9`; `gh issue list`; `gh pr list --state all`.
- `gh api repos/NexLabsTech/exile-nexus`, `/actions/workflows`, `/actions/runs`, `/rulesets?includes_parents=true`, `/commits/main/status` e `/commits/main/check-runs`.
- Consultas de `/actions/permissions`, `/branches/main/protection`, `/vulnerability-alerts` e `/code-scanning/alerts` negadas por permissão (403); `/code_security_and_analysis` retornou 404. Não foram usados endpoints que retornam conteúdo de segredos.
- `sha256sum README.md` e `git hash-object README.md`.

Os erros de permissão são evidência de **não verificado**, não de configuração ausente. A consulta é um retrato datado; repetir após a integração receber acesso de leitura apropriado.

## Checkpoint Delta proposto

1. Submeter o baseline à revisão independente na PR #133; aprovação ainda não registrada.
2. Obter visibilidade administrativa somente de leitura para auditar branch protection, Actions e controles nativos; não alterar settings nesta Work Order.
3. Verificar com o proprietário a licença e o custo do Socket Security.
4. Manter Work Orders M00 posteriores bloqueadas até revisão independente e aprovação explícita desta Work Order.

Este delta é uma proposta e não altera checkpoint canônico, pois ele ainda não existe no HEAD.

## Estado de entrega

- Branch: `exn-m00-wo-001-baseline`, sincronizada localmente com `origin/exn-m00-wo-001-baseline`.
- Evidence Bundle: este arquivo na branch e na [Draft PR #133](https://github.com/NexLabsTech/exile-nexus/pull/133).
- HEAD remoto da PR no momento desta atualização: `081923dd14faaeffd4709421ca75e3574c96812d`.
- A credencial CLI usada para auditar settings é somente leitura; a conexão GitHub da conta proprietária NexLabsTech foi usada para criar a branch e a Draft PR. Nenhuma configuração de segurança foi alterada.
- Veredito de auditoria independente: pendente.
- O comentário do CodeRabbit informa que Draft PRs não recebem revisão automática por padrão; revisão manual ainda é necessária.
- Próxima ação permitida: revisar o baseline e completar a leitura administrativa pendente. Não avançar para outra Work Order antes da auditoria APPROVED.
