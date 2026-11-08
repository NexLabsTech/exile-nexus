# EXN-M00-WO-005 — Evidence Bundle de arquitetura e deployment plan

- **Owner:** NexLabsTech
- **Status:** PROPOSED · sem implementação ou deploy
- **Revisão:** 2026-11-08
- **Work Order:** EXN-M00-WO-005 · Issue #6
- **Branch:** exn-m00-wo-005-architecture-deployment
- **Base SHA:** 23ee602f0f934b38342f75137c6a82c136de980e
- **HEAD inicial:** 23ee602f0f934b38342f75137c6a82c136de980e
- **HEAD da PR:** registrar pelo head SHA da PR depois da publicação; o commit
  de evidência não pode conter seu próprio SHA.

## Source Check e Context Lock

- WO-004 / Issue #5 está fechada como concluída após PR #136 integrada por
  squash no SHA-base acima. Aceite administrativo do owner está no comentário
  #6720619493; não houve GitHub Review formal APPROVED. A auditoria técnica foi
  feita pelo executor nesta sessão, sem alegação de independência.
- WO-005 / Issue #6 está aberta, com dependência EXN-M00-WO-004 satisfeita.
- No início desta WO, main e checkout local estavam no SHA
  23ee602f0f934b38342f75137c6a82c136de980e; não havia PR aberta.
- Fonte Hierarchy e Checkpoint indicavam que WO-004 ainda aguardava integração;
  esta branch corrige o contexto e registra o aceite administrativo.
- Architecture, Data Contracts e Deployment Plan não existiam no baseline.
- O repositório ainda não contém aplicação, runtime, dependências, workflow,
  API, banco, conta Cloudflare ligada, credenciais ou deployment.
- A matriz R01–R14 permanece sem liberação operacional para ingestão, conteúdo
  de jogo, árvore passiva, exibição econômica ou monetização.

## Objetivo e decisões

Entregar arquitetura modular monolith e contratos conceituais TypeScript
strict, com boundaries e rights gates; documentar um deployment plan
Cloudflare Pages estático Free-first sem provisionar ou publicar.

- Restrições arquiteturais gerais foram especificadas pelo owner e registradas
  como EXN-DEC-0004.
- Cloudflare Pages estático é uma opção PROPOSTA em EXN-DEC-0005, sem ativação.
- Framework, runtime, banco, ORM, cache persistente, API, autenticação,
  fornecedor de IA, provider de dados econômicos e deployment real não foram
  escolhidos.
- Nenhuma conta, integração Git, projeto, token, domínio, Worker, D1, workflow
  ou configuração administrativa foi criada.

## Arquivos propostos

- README.md — Work Order atual e estado restritivo de direitos.
- docs/README.md — índice e mapeamento dos documentos.
- docs/architecture.md — módulos, dependências, alternativas, confiança,
  segurança e rastreabilidade.
- docs/data-contracts.md — direitos, proveniência, envelope, adapters, erros,
  cache, versionamento e testes de contrato planejados.
- docs/deployment-plan.md — candidato, planos, ambientes, pipeline, credenciais,
  rollback, pré/pós-deploy, custos e fontes oficiais.
- docs/source-hierarchy.md — atualização dos estados e precedência.
- docs/decisions-ledger.md — decisões 0004/0005 e seus estados explícitos.
- docs/checkpoint.md — PRs, issues, configurações, direitos e WO-005.
- Este Evidence Bundle.

## Fontes administrativas e de custo

Leituras em 2026-11-08:

- GitHub API: Issue #6 aberta; sua dependência #5 está concluída. API de PRs
  abertas retornou lista vazia antes de iniciar a branch.
- GitHub Actions API no baseline: total_count 0 e lista vazia; nenhum workflow
  ou check de produto disponível.
- Configuração da conta NexLabsTech não foi consultada; portanto o plano real,
  billing, elegibilidade e domínio não estão verificados.
- Cloudflare Pages limits, Git integration, Workers pricing, D1 pricing e
  GitHub Actions billing retornaram HTTP 200 em GET. Os valores citados estão
  registrados em docs/deployment-plan.md com limites e cobrança pertinente.
- Pages Free publica limites finitos; Workers Paid tem mínimo mensal de US$5;
  não se usa Workers/D1 nesta proposta. Runners padrão hospedados em
  repositórios públicos são descritos pelo GitHub como gratuitos; runners
  maiores podem ter cobrança e estão excluídos.
- Custo novo nesta WO: US$0. Nenhum recurso foi provisionado ou usado para
  deployment. O custo da conta e de apps automáticos preexistentes permanece
  não verificado.
- CodeRabbit e Socket e equivalentes não são gates, não foram acionados para
  revisão manual e não são necessários para completar esta WO.

## Testes e verificações

### Executados nesta sessão

- Validação documental customizada: PASS — nove arquivos na allowlist;
  metadados, fences e links locais válidos; tabelas consistentes; cinco IDs de
  decisão únicos; quatro estados de direitos presentes; limites Cloudflare
  citados; nenhum caminho de código de aplicação e zero correspondências nos
  padrões comuns de segredo examinados.
- git diff --check: PASS — sem erros de whitespace.
- gh api repos/NexLabsTech/exile-nexus/actions/workflows: PASS, retorno
  total_count=0 e names=[].
- GET às cinco páginas oficiais listadas: HTTP 200.
- Revisão de diff e caminhos: nenhuma alteração em aplicação, workflow,
  settings, API de jogo, dados, segredo ou deployment.

### Não aplicáveis ou não executados

- Build, typecheck, unit/integration/E2E, teste de contrato de runtime, SAST,
  performance de app e deploy: NOT APPLICABLE porque nenhum código executável
  foi criado.
- Testes de integração de fonte: NÃO EXECUTADOS; fontes e credenciais não estão
  autorizadas.
- Linter formal de ADR/Markdown: não instalado ou configurado no baseline;
  validação documental customizada não é um linter completo.
- GitHub Actions: nenhum workflow ou job executado.

## Segurança, riscos e limitações

- Segurança proposta como deny-by-default; adapters bloqueiam CONDICIONADO,
  NÃO VERIFICADO, PROIBIDO e direitos expirados.
- Direitos, privacidade de usuário, retenção e custo de conta não estão
  liberados. Não ingestão, persistência, exibição ou monetização.
- Preview, deploy e integração Git não foram ativados; código de PR não receberá
  segredos privilegiados.
- Limites de Cloudflare e GitHub podem mudar. HTTP 200 prova consulta pública,
  não configuração nem elegibilidade da conta NexLabsTech.
- Risco HIGH/CRITICAL de execução não introduzido; nenhum código executável foi
  alterado.

## Auditoria e Checkpoint Delta

- Auditoria técnica objetiva pelo executor na mesma sessão, usando diff Git,
  APIs GitHub, HTTP GET e validações locais. Não é auditoria independente nem
  GitHub Review formal.
- Aceite administrativo NexLabsTech: pendente até conclusão das validações
  finais e comentário na PR.
- Checkpoint Delta proposto: após aceite e squash normal, registrar
  Architecture, Data Contracts e Deployment Plan como base documental, ainda
  sem implementação/deploy; manter Cloudflare como candidato não provisionado,
  direitos fechados e WO-006–008 pendentes.
- **Veredito:** pendente até auditoria final e aceite administrativo.
