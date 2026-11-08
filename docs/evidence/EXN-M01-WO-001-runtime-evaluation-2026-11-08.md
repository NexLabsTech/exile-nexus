# EXN-M01-WO-001 — Evidence Bundle de runtime e compatibilidade

- **Owner:** NexLabsTech
- **Status:** PROPOSED / MEASUREMENTS PENDING
- **Revisão:** 2026-11-08
- **Work Order:** EXN-M01-WO-001 · Issue #11
- **Risk:** STANDARD
- **Base SHA:** `26673e9656bfd6aae500f01f508ea53e13718bab`
- **HEAD SHA:** verificar via PR criada; commit não pode conter seu próprio SHA

## OBJECTIVE / SCOPE

Avaliar Astro 7 + React 19 islands e React 19 + Vite 8 para Cloudflare
Pages estático com TypeScript strict e uma mesma interação original.
[ADR proposto](../adr/EXN-M01-WO-001-frontend-runtime.md). NENHUMA
seleção de framework está aceita; sem backend, domínio, deploy, dados
externos, monetização ou alterações em main.

## INPUT E CONTEXT LOCK

- M00: 8 WOs e épico #1 CLOSED; PR #140 merged no commit
  `26673e9656bfd6aae500f01f508ea53e13718bab`.
- Source Hierarchy, Checkpoint, Decisions Ledger EXN-DEC-0001 a 0007,
  Scope, DoD, Architecture, Requirements, Test Plan, Deployment e rights R01–R14
  foram consultados. Runtime, framework e backend não aprovados previamente.
- Código da comparação em `experiments/frontend-runtime/`, dois candidatos
  com versões diretas fixas. Workflow em
  `.github/workflows/runtime-adr-benchmark.yml`, token read-only,
  checkout com `persist-credentials:false`, sem segredo/deploy.
- Plano de gastos: nenhuma compra, upgrade ou serviço habilitado.
  O custo global da conta e apps preexistentes é NOT VERIFIED.

## Matriz de experimentos e evidências a completar

| Teste | Astro + React | Vite + React |
| --- | --- | --- |
| npm install + npm ci | FAIL (`ERESOLVE`, TS7 peer mismatch; correction in progress) | PASS (run #42519095743) |
| TypeScript / astro check | NOT RUN (install failed) | PASS |
| npm run build | NOT RUN (install failed) | PASS |
| dist/index.html | NOT RUN (install failed) | PASS |
| Build ms (runner) | NOT MEASURED | 343 ms (cold runner) |
| Total dist bytes | NOT MEASURED | 220,692 bytes |
| Generated files | NOT MEASURED | 2 |
| Cloudflare Pages config | DOCUMENTED, not deployed | DOCUMENTED, not deployed |

O ambiente local de auditoria não conseguiu resolver `registry.npmjs.org`
(`EAI_AGAIN`): não há teste local de instalação ou de build. Essa ausência
não pode ser convertida em PASS. A Action no PR deverá fornecer medições
reais e logs. Lockfiles efêmeros não substituem lockfile commitado da
futura aplicação de produção.

## Security / Architecture / Rights

- Apenas TSX sintético com contador e conteúdo original; nenhuma marca,
  estatística, asset ou API do jogo. Nenhuma dependência ou autorização de dados.
- Padrão de módulos desacoplados; fixtures descartáveis e fora da aplicação
  de produção. Lint aplicado ao workflow via actionlint/zizmor.
- Comparação não avalia acessibilidade/performance do produto real. Sem
  browser E2E, deploy, DAST, banco, migração, segurança server-side:
  NOT APPLICABLE nesta WO documental de decisão.
- Sem CodeRabbit nem reviews externos como requisitos de aprovação.
  Auditoria pelo mesmo executor: **não independente**, conforme EXN-DEC-0007.

## Acceptance / Audit / Checkpoint Delta PROPOSTO

- Revalidar HEAD, diff, jobs, step logs e ruleset após PR.
- Um candidato recomendado com resultados medidos, fallback, tradeoffs,
  portabilidade e versão exata. Evidenciar testes falhos e corrigir apenas
  o Work Order atual.
- Após aceite administrativo NexLabsTech e squash, promover ADR selecionado,
  registrar o build result e atualizar Checkpoint. Não iniciar scaffold
  operacional, dado de jogo ou deploy nesta WO.
- STATUS ATUAL: **IN REVIEW / BENCHMARK NOT RUN**. Nenhum APP/RELEASE DoD
  pode ser declarado entregue.

## Correction Delta 01 — Astro TypeScript peer constraint

- GitHub Actions run [#42519095743](https://github.com/NexLabsTech/exile-nexus/actions/runs/42519095743),
  HEAD `70dee1c039a236a3e87ccdc6985cc320c0e95c68`: Vite job PASS;
  Astro install FAIL at `npm install --package-lock-only`.
- Exact error: `ERESOLVE` because `@astrojs/check@0.9.12` declares
  peer `typescript: ^5.0.0 || ^6.0.0` and the probe used `7.0.2`.
- Correction: fix **only Astro fixture's TypeScript** to `6.0.2`,
  explicitly documenting version divergence. Do not set
  `--force` / `--legacy-peer-deps` or disable checks. No app code changed.
- Existing Vite outcome: Node 22.23.4, `tsc --noEmit` PASS,
  `vite build` PASS, 343ms wall-clock, 220,692 bytes, 2 files.
- All results on the new correction HEAD still require fresh CI evidence;
  do not promote a benchmark recommendation prematurely.
