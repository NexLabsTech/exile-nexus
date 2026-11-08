# EXN-M00-WO-001 — baseline do repositório

**Coletado em:** 2026-11-08 01:01 UTC  
**Revalidado em:** 2026-11-08 01:19 UTC  
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
| Estado atual do workspace | Limpo na branch `exn-m00-wo-001-baseline`, alinhada com `origin/exn-m00-wo-001-baseline` |
| HEAD atual da PR #133 | `e1e4b3ea8394936288aa52af160b2fdd1191ce15`; base `main` em `23ec93e0fb174fb84db38298ce890f693a62abf1` |
| PRs | Na captura inicial, nenhuma PR aberta ou fechada. Draft PR [#133](https://github.com/NexLabsTech/exile-nexus/pull/133) foi aberta para este Work Order após aquela captura |
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
| Permissões do cliente CLI | API de repositório retorna `pull: true`, `push: false`, `admin: false`; a CLI não pode escrever nem ler settings administrativos |
| Acesso da conta proprietária NexLabsTech | A conexão GitHub retorna `admin: true` no repositório; as APIs de settings ainda retornam 403 porque a instalação conectada não tem `Administration: read` |
| Outras contas conectadas testadas | `NexLabs`, `Kayzenweb3` e `Pessoal` retornam `pull: true`, `push: false`, `admin: false`; não resolveram a falta de permissão administrativa |
| Métodos de merge | API da conta proprietária: squash `true`, merge commit `true`, rebase `true`; auto-merge `false`; atualização de branch `false`; exclusão automática da branch após merge `false` |
| Regras de `main` | API de branch retorna `protected: false`; `/rulesets?includes_parents=true` retorna `[]`. Não há proteção de branch ou ruleset aplicado. `/branches/main/protection` responde 403 e requer `Administration: read` |
| PR #133 e revisões | Aberta, Draft, base/HEAD corretos, 1 arquivo alterado; API de submissões de review retorna zero reviews |
| Workflows do GitHub Actions | Nenhum workflow cadastrado; endpoint de workflows e runs retorna zero |
| Checks no HEAD inicial | Check run `Socket Security: Project Report`, conclusão `success`, em 2026-11-08 00:29:13 UTC ([execução](https://github.com/NexLabsTech/exile-nexus/runs/128576434475)) |
| Checks atuais da PR #133 | `Socket Security: Pull Request Alerts` success; `Socket Security: Project Report` success; `CodeRabbit` skipped. Nenhum workflow de Actions foi executado |
| Políticas de Actions e runners | Settings de Actions, permissões padrão do workflow e lista de runners retornam 403; requisito aceito pela API: `Administration: read` |
| CodeQL / Code Scanning | Default Setup retorna 403 (`Administration: read`); leitura de alertas retorna 403 (`security_events: read`). Não inferir que estão desligados |
| Dependabot Alerts | API retorna 403 com mensagem explícita “Dependabot alerts are disabled for this repository”; estado observado: desativado |
| Dependabot Security Updates | Endpoint retorna 403 (`Administration: read`); estado não verificado |
| Secret Scanning / Push Protection | `security_and_analysis` não é disponibilizado na conexão; não foi consultado endpoint de alertas nem exposto conteúdo de segredo. Estado não verificado |
| Dependency Review | Nenhum workflow, manifesto ou lockfile; não aplicável no baseline. Não configurado nesta Work Order |
| Aplicativos externos | Checks confirmam atividade de Socket Security e CodeRabbit. A lista acessível de instalações não permite inventariar apps de terceiros nem suas permissões |

A conexão de leitura usada pela CLI não tem `push` ou `admin`. A instalação GitHub não tem as permissões administrativas indicadas acima, embora a conta NexLabsTech seja administradora. As permissões de `GITHUB_TOKEN` são não verificáveis porque não há workflows. Nenhuma configuração foi alterada.

## Avaliação de risco e custo

- Não existe código ou dependência para análise estática ou de vulnerabilidades; scanners de código/dependências são **NOT APPLICABLE** neste baseline, sem equivaler a aprovação de segurança.
- `main` está sem proteção e sem rulesets, conforme `protected: false` e lista vazia de rulesets. Force-push, exclusão da branch e merges não estão restringidos por ruleset/branch protection observável.
- Permissões de Actions, CodeQL, Code Scanning, Security Updates, Secret Scanning e Push Protection seguem não verificadas por falta de `Administration: read`/`security_events: read` na instalação conectada.
- A mensagem automática do CodeRabbit declara que o serviço é gratuito para OSS; o repositório é público. A documentação oficial confirma que `@coderabbitai review` funciona mesmo sem auto-review e consome o limite de reviews. Plano, limite exato e cobrança da conta não são visíveis aqui.
- O check do Socket Security comprova atividade, mas não licença, quota ou custo do serviço.
- Nenhum risco técnico HIGH/CRITICAL foi avaliado como corrigido: o repositório ainda não contém aplicação para essa avaliação.
- Nenhuma ferramenta paga foi ativada e esta coleta foi somente leitura. Custo de conta/serviço e quotas do GitHub não foram verificados; US$ 0 recorrente não está confirmado.

## Evidências e comandos

Coleta administrativa inicial feita em 2026-11-08 UTC sem alterações remotas. A branch e a Draft PR foram publicadas depois. Revalidação da PR concluída em 2026-11-08 01:19 UTC:

- Git `2.52.0` e GitHub CLI `2.46.0`.
- Auditoria de Git/API: executada; HEAD local/remoto coincidem e issue/PR/workflow/ruleset endpoints consultados conforme abaixo.
- Testes de aplicação, lint, build, SAST e dependências: **NOT APPLICABLE** neste incremento, pois o HEAD contém apenas o README e não possui código, manifestos, workflows ou suíte de testes. Nenhum resultado de teste foi simulado como PASS.

- `git status --short --branch`, `git log -5 --oneline --decorate`, `git branch -avv`, `git remote -v`, `git ls-tree -r --name-only HEAD`.
- `git ls-remote --symref origin HEAD refs/heads/main`.
- `gh repo view NexLabsTech/exile-nexus --json nameWithOwner,visibility,defaultBranchRef,url`.
- `gh issue view 2` e `gh issue view 3` a `gh issue view 9`; `gh issue list`; `gh pr list --state all`.
- `gh api repos/NexLabsTech/exile-nexus`, `/actions/workflows`, `/actions/runs`, `/rulesets?includes_parents=true`, `/commits/main/status` e `/commits/main/check-runs`.
- API da conta NexLabsTech para `GET /repos/...`: confirmou métodos de merge descritos acima, `delete_branch_on_merge=false`, `security_and_analysis` omitido.
- `GET /branches/main`: `protected=false`; `GET /rulesets?includes_parents=true`: `[]`; `GET /pulls/133/reviews`: `[]`; checks da PR retornam três resultados descritos acima.
- `/actions/permissions`, `/actions/permissions/workflow`, `/actions/runners`, `/branches/main/protection`, `/code-scanning/default-setup` e `/automated-security-fixes` retornaram HTTP 403 com `Administration: read`; `/code-scanning/alerts` retornou HTTP 403 com `security_events: read`.
- `/dependabot/alerts` retornou HTTP 403 com a mensagem explícita de que Dependabot Alerts está desativado. Nenhum endpoint de alertas de segredo foi consultado.
- `rg` buscou padrões de tokens conhecidos e chaves privadas no Evidence Bundle; nenhum padrão foi encontrado (exit 1, zero matches). Revisão manual do diff: um arquivo documental, sem alterações a `main`.
- Fonte oficial da revisão manual CodeRabbit: [Review commands](https://docs.coderabbit.ai/reference/review-commands), comando `@coderabbitai review`.
- `sha256sum README.md` e `git hash-object README.md`.

Os erros de permissão são evidência de **não verificado**, não de configuração ausente. A consulta é um retrato datado; repetir após a integração receber acesso de leitura apropriado.

## Checkpoint Delta proposto

1. Submeter o baseline à revisão independente na PR #133; aprovação ainda não registrada.
2. Obter visibilidade administrativa somente de leitura para auditar Actions, CodeQL, Code Scanning, Security Updates, Secret Scanning e Push Protection; não alterar settings nesta Work Order.
3. Verificar com o proprietário a licença e o custo do Socket Security.
4. Manter Work Orders M00 posteriores bloqueadas até revisão independente e aprovação explícita desta Work Order.

Este delta é uma proposta e não altera checkpoint canônico, pois ele ainda não existe no HEAD.

## Estado de entrega

- Branch: `exn-m00-wo-001-baseline`, sincronizada localmente com `origin/exn-m00-wo-001-baseline`.
- Evidence Bundle: este arquivo na branch e na [Draft PR #133](https://github.com/NexLabsTech/exile-nexus/pull/133).
- HEAD remoto da PR no início da revalidação: `e1e4b3ea8394936288aa52af160b2fdd1191ce15`.
- A credencial CLI usada para auditar settings é somente leitura; a conexão GitHub da conta proprietária NexLabsTech foi usada para criar a branch e a Draft PR. Nenhuma configuração de segurança foi alterada.
- Veredito de auditoria independente: pendente.
- O check do CodeRabbit foi `skipped`, e a submissão de reviews está vazia. O comando oficial `@coderabbitai review` foi identificado para revisão manual; ainda não foi acionado.
- Próxima ação permitida: revisar o baseline e completar a leitura administrativa pendente. Não avançar para outra Work Order antes da auditoria APPROVED.
