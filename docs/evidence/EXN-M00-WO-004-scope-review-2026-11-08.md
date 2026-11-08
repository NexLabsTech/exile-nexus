# EXN-M00-WO-004 — Evidence Bundle de scope, requisitos e DoD

- **Owner:** NexLabsTech
- **Status:** PROPOSED · sem implementação de aplicação
- **Revisão:** 2026-11-08
- **Work Order:** EXN-M00-WO-004 · Issue #5
- **Base SHA:** `1e786ad840a12762e1f98424f927f48638f7a036`
- **HEAD inicial:** `1e786ad840a12762e1f98424f927f48638f7a036`
- **HEAD final:** registrar pelo campo `head.sha` da PR desta Work Order após o
  commit; um commit não pode conter seu próprio SHA.

## Context Lock e dependências

- PR #135 / WO-003 foi integrada por squash no SHA-base acima; Issue #4 está
  fechada como concluída. O owner registrou aceite administrativo, sem criar
  GitHub Review `APPROVED`.
- Issue #5 / WO-004 estava aberta e dependia da WO-003 integrada. Não havia PR
  aberta para esta Work Order no início.
- O checkout foi atualizado por fast-forward para `origin/main`; a nova branch
  foi criada a partir do SHA `1e786ad840a12762e1f98424f927f48638f7a036`.
- `docs/checkpoint.md` e `docs/source-hierarchy.md` diziam que WO-003 ainda
  estava planejada e que PR #134 aguardava revisão/merge; essa informação
  estava stale. Esta Work Order propõe reconciliá-la com os merges #133–#135,
  preservando os estados formais das reviews.
- No baseline, `docs/scope.md`, `docs/requirements.md`,
  `docs/definition-of-done.md`, `docs/architecture.md` e `docs/deployment-plan.md`
  não existiam. WO-004 cria somente os três primeiros; os demais permanecem
  em WOs próprias.

## Ajustes mínimos no backlog autorizado

O owner instruiu mapear Test Plan, Deployment e Backlog nas WOs existentes,
sem duplicar issues ou misturar escopos. As descrições das issues abertas foram
preservadas e receberam entregáveis explícitos:

- Issue #5 / WO-004: parada antes da próxima WO exige testes, auditoria técnica
  objetiva e aceite NexLabsTech; se executor e auditor forem a mesma sessão,
  independência não pode ser alegada.
- Issue #6 / WO-005: inclui `docs/deployment-plan.md`, como planejamento; não
  autoriza deploy, credenciais de produção ou upgrade.
- Issue #7 / WO-006: inclui inspeção/configuração gratuita dos controles nativos
  CodeQL/Code Scanning, Dependabot, Secret Scanning/Push Protection, Dependency
  Review e menor privilégio de Actions, com leitura posterior.
- Issue #8 / WO-007: inclui `docs/test-plan.md`, workflows documentais e
  configuração de branch protection de `main` somente após validar os checks.
- Issue #9 / WO-008: mantém GitHub Issues como backlog canônico, audita
  dependências/duplicações/prioridades e verifica os controles finais.

Os IDs #5–#9 e as dependências existentes foram preservados. Nenhuma issue
duplicada ou backlog Markdown paralelo foi criado.

## Arquivos propostos

- `README.md` — aponta para o Source Pack e declara a Work Order atual.
- `docs/README.md` — indexa os documentos e mapeia artefatos futuros às WOs.
- `docs/scope.md` — propósito, escopo, módulos, limites de direitos e custo.
- `docs/requirements.md` — requisitos funcionais/não funcionais e estados de
  validação.
- `docs/definition-of-done.md` — DoD por WO e DoD de produto/release.
- `docs/source-hierarchy.md` — reconcilia fontes e mapeia WOs.
- `docs/decisions-ledger.md` — registra a decisão do owner de manter gates de
  direitos fechados.
- `docs/checkpoint.md` — checkpoint proposto e leitura administrativa.
- `docs/evidence/EXN-M00-WO-004-scope-review-2026-11-08.md` — este bundle.

Nenhum código de aplicação, workflow, setting administrativo, API de jogo,
ingestão, monetização, serviço pago ou deployment foi alterado.

## Fonte de requisitos e gates de direitos

O scope e os requisitos refletem a intenção de produto do owner e a matriz
R01–R14 da WO-003. O estado atual da matriz não libera ingestão, persistência,
exibição, árvore passiva ou monetização. `AUTORIZADO` aplica-se apenas à
finalidade explicitada; `CONDICIONADO`/`NÃO VERIFICADO` não passam gates de uso;
`PROIBIDO` não deve ser implementado. Fixtures sintéticas são permitidas somente
quando claramente identificadas e sem reproduzir conteúdo protegido.

## Testes e verificações

### Executados nesta sessão

- Context Lock: `origin/main`, PR #135, Issue #5 e dependência WO-003
  conferidos; HEAD inicial `1e786ad840a12762e1f98424f927f48638f7a036` bate com
  o SHA-base.
- Validador Python ad hoc: **PASS** — 9 documentos; metadados e fences
  presentes; links relativos locais resolvidos; 23 IDs de requisito únicos;
  cinco gates do DoD presentes; decisão EXN-DEC-0003 presente; zero
  correspondências nos padrões comuns de segredo examinados.
- Issues #5–#9 foram lidas antes do ajuste e retornaram conteúdo atualizado após
  a mudança; stable IDs, títulos e dependências foram preservados.
- Revisão do escopo/diff: somente documentação de produto M00 e reconciliação
  de contexto/checkpoint; nenhum código, workflow ou setting administrativo.
- `git diff --cached --check`: **PASS** após stage dos nove arquivos; sem erros
  de whitespace.

### Não aplicáveis / indisponíveis

- Build, typecheck, unit/integration/E2E, SAST e testes de aplicação: **NOT
  APPLICABLE**; não há aplicação ou dependências nesta Work Order.
- GitHub Actions: zero workflows no repositório; nenhum job foi executado.
- Markdownlint não está instalado/configurado no baseline; não foi executado.
- Branch protection, permissões Actions, Code Scanning e Secret Scanning não
  foram alterados nesta WO. As leituras administrativas disponíveis retornaram
  403 e permanecem NOT VERIFIED conforme o checkpoint.

## Segurança e custos

- Nenhum segredo ou credencial foi adicionado.
- Direitos de uso permanecem restritos pela decisão EXN-DEC-0003.
- Nenhum app de review, SaaS com quota, serviço pago, runner ou serviço de
  deployment é requisito desta WO. Nenhuma análise paga foi solicitada.
- Custo financeiro obrigatório desta WO: **US$ 0**. O custo/limites de checks
  externos automáticos pré-existentes não estão visíveis e não são gates.

## Auditoria e Checkpoint Delta proposto

- **Auditoria técnica:** objetiva, realizada pelo executor com ferramentas
  locais e evidências GitHub. Se o auditor for a mesma identidade/sessão, isso
  será declarado; não se inventará independência nem GitHub Review formal.
- **Checkpoint Delta:** registrar WO-003 como integrada/aceita
  administrativamente, sem liberar dados; marcar os três documentos WO-004
  como propostos; manter WO-005–008 pendentes; registrar Test Plan (#8),
  Deployment Plan (#6) e backlog GitHub (#9) sem duplicação.
- **Aceite administrativo:** pendente até conclusão da auditoria e comentário
  explícito NexLabsTech na PR desta WO.
- **Veredito:** pendente até executar as verificações finais desta branch.
