# EXN-M01-WO-001 — Frontend Runtime ADR (decisão aceita)

- **Owner:** NexLabsTech
- **Status:** ACCEPTED for frontend direction only, PR #141 merged
- **Revisão:** 2026-11-08
- **Work Order:** EXN-M01-WO-001 · Issue #11
- **Base SHA:** `26673e9656bfd6aae500f01f508ea53e13718bab`
- **HEAD:** obter metadata da PR atual após criar commit; não autoinserir SHA
- **Risk:** STANDARD
- **Requisito:** NFR-ARCH-001, NFR-COST-001, NFR-CI-001, FR-CORE-001/002/003

## OBJECTIVE / Context Lock

Selecionar um frontend estático compatível com Cloudflare Free para páginas
informacionais com SEO e módulos altamente interativos, preservando modular
monolith TypeScript strict, direitos por fonte, design original e custo zero.
O M00 foi encerrado por squash da PR #140; issue #9 e épico #1 CLOSED.
O framework foi **aceito após os experimentos**, conforme EXN-DEC-0008
em Decisions Ledger e merge da PR #141. Sem API, banco, autenticação,
anúncios, assets de jogo ou dados externos.

## Alternativas avaliadas

| Candidato | Modelo e custo | Prós | Limitações / saída estática |
| --- | --- | --- | --- |
| Astro 7 + React 19 islands | Páginas pré-renderizadas; hidratação React apenas em ferramentas interativas. Sem servidor de produção necessário para rotas estáticas. | HTML SEO por padrão, ilhas para Build Hub e ferramentas, isolamento por domínio. | Adiciona integração Astro/React e complexidade de dois modelos de componentes; output `dist/`. |
| React 19 + Vite 8 | SPA estática com roteamento cliente futuro, sem server runtime. | Simplicidade de uma árvore React, controle de interações muito complexas. | SEO/prerender por rota exige estratégia adicional; output `dist/`. |
| Next.js static export | Static HTML export sem runtime server. | Rotas, metadata e ecossistema React. | Recursos SSR, middleware, rotas server e estado dinâmico exigem runtime; `out/`. Não benchmarkado neste incremento. |

**Decisão aprovada:** Astro 7.4.7 estático + React 19.3.1 islands, pois o
portal reúne conteúdo indexável e ferramentas interativas. **Fallback:**
React + Vite, especialmente se o stack Astro/React ou a cadeia de typecheck
impedir evolução segura. Os dois builds passaram, sem desempenho de UI medido.

## Prova mensurável e teste de compatibilidade

**Constraint discovered:** The first GitHub Actions run exposed a concrete
peer-version incompatibility: `@astrojs/check@0.9.12` currently accepts
TypeScript `^5 || ^6`, not `7`. The Astro probe is therefore pinned to
TypeScript 6.0.2 while Vite tests TypeScript 7.0.2. This is an honest
toolchain-maintenance tradeoff, not permission to bypass npm peer resolution.


A pasta [experiments/frontend-runtime](../../experiments/frontend-runtime/README.md)
contém **duas fixtures sintéticas** com uma página original e um contador React
hidratado, sem material ou API do jogo. A Action
[Runtime ADR Benchmark](../../.github/workflows/runtime-adr-benchmark.yml)
executa para cada candidato no mesmo runner ubuntu-latest / Node 22:

1. Instalar versões diretas exatas, criar lockfile **temporário no runner**
   e instalar com `npm ci`. Como o lockfile não está commitado, o teste de
   viabilidade é repetível com as versões diretas, mas o grafo transitivo
   pode mudar entre execuções. A WO de implementação deve commitar lockfile.
2. `npm run check` (strict TS/astro check), depois `npm run build`.
3. Verificar `dist/index.html` e medir duração wall-clock, número de arquivos
   e tamanho total gerado; logar versões e SHA na execução Actions.
4. Registrar os resultados por candidato no
   [Evidence Bundle](../evidence/EXN-M01-WO-001-runtime-evaluation-2026-11-08.md).
   Benchmarks foram executados no HEAD `c4e8b44a476c16fe3c7a685450f2675767122466`;
   ver tabela e links com métricas no Evidence Bundle.

**Comparabilidade:** fixtures equivalentes, mas o benchmark de um contador
não representa desempenho real de uma árvore gráfica, acessibilidade, SEO,
crawling ou tempo de interação da aplicação. Cronometragem no runner compartilhado
não é garantia de latência de produção. Comparar as métricas como evidência
de viabilidade, nunca como meta de produto.

## Resultado de builds (GitHub Actions #42519241684)

| Experimento | Typecheck | Build wall-clock | Bytes em dist/ | Arquivos |
| --- | --- | ---: | ---: | ---: |
| Astro 7.4.7 + React 19.3.1 | PASS | 1,096 ms | 227,095 | 4 |
| React 19.3.1 + Vite 8.3.6 | PASS | 360 ms | 220,692 | 2 |

Todos produziram `dist/index.html`. Astro usa TypeScript 6.0.2 devido
à restrição de peer dependency `@astrojs/check`; Vite usa 7.0.2.
O ganho de geração estática e fragmentação de componentes favorece Astro
para páginas SEO; build Vite foi mais rápido neste único probe. Não afirmar
vantagem medida em tráfego, velocidade de renderização ou SEO real.

**Veredito aceito pelo owner:** Astro static + React islands como direção
inicial de `modular monolith`, fallback Vite+React. Lockfile e auditoria
de dependências são obrigatórios na WO do scaffold real, não nesta ADR.

## Cloudflare Free e portabilidade

A documentação oficial Cloudflare Pages lista tanto Astro quanto React/Vite
com `npm run build` e `dist/`; Next.js static export gera `out/`.
O Pages Free publica 500 builds/mês, um build concorrente, timeout de 20 min,
20.000 assets/site e arquivo individual até 25 MiB. **Limites publicados
não provam assinatura/billing da conta**. Não fazer deploy/preview.

A aplicação deverá expor artefatos estáticos HTML/CSS/JS sem Pages Functions,
Workers, D1, KV ou segredos. Domínio/aplicação/caso de uso são isolados em
TypeScript puro; React só na camada de interface. Uma futura migração para
React/Vite ou outro host deve manter contratos e URLs, com adaptação
de entrypoints/pages. SSR/backend depende de nova decisão, rights gate
e evidências de custo.

## Referências oficiais consultadas em 2026-11-08

- [Cloudflare Pages build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/)
- [Cloudflare Pages Astro](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/)
- [Cloudflare Pages React](https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/)
- [Cloudflare Pages limits](https://developers.cloudflare.com/pages/platform/limits/)
- [Cloudflare Next.js static](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/)
- [Vite static build](https://vite.dev/guide/build)
- [Astro React integration](https://docs.astro.build/en/guides/integrations-guide/react/)

## Security, acceptance and STOP CONDITION

- Não coletar, publicar ou importar dados/arte/árvore do jogo. Rights R01–R14
  permanecem em HOLD/CONDITIONAL/PROHIBITED quando aplicável.
- Nenhum segredo, conta Cloudflare, serviço pago ou deploy. CI de comparação é
  gratuito de forma documentada para runner padrão de repo público, sujeito
  a limites finitos e verificação posterior do billing global.
- Antes de APPROVED: métricas e ambos builds/typechecks registrados por SHA;
  `Docs validation` required verde; teste de segurança actionlint/zizmor;
  Evidence Bundle com CI, riscos, plano de fallback e delta.
- Auditoria objetiva interna de mantenedor solo conforme EXN-DEC-0007,
  declarando ausência de independência, sem revisão de bot externo.
- **Decisão: ACEITA pela NexLabsTech**, PR #141 integrada no commit
  `4a6bba78fd1966804895c9f9dafe85bf70175633` e issue #11 fechada.
  Não declarar app pronto/deploy aprovado; evolução somente por WOs próprias.
