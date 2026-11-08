# Product Scope

- **Owner:** NexLabsTech
- **Status:** PROPOSED
- **Revisão:** 2026-11-08
- **Work Order:** EXN-M00-WO-004 · Issue #5

## Produto

Exile Nexus é um portal público independente de apoio a Path of Exile 2. O
objetivo é reunir ferramentas de build, dados de jogo e economia autorizados,
calculadoras e informação de patches em uma experiência responsiva, acessível e
original de dark fantasy. O produto não é afiliado, endossado ou operado pela
Grinding Gear Games.

A aplicação ainda não existe. Este escopo define intenção e limites; não
autoriza implementação, ingestão de dados, uso de marcas/assets, monetização
ou deployment.

## Dentro do produto proposto

- **Core Platform:** portal responsivo, SEO, navegação consistente e design
  system original com estética dark fantasy/glassmorphism.
- **Data Engine e Database:** adaptadores de fontes autorizadas, contratos,
  cache, proveniência e versionamento por patch; catálogo pesquisável de itens,
  gemas, classes e mecânicas quando os direitos de conteúdo permitirem.
- **Build Hub:** editor de builds e árvore passiva interativa, com classes,
  ascendências, nós, conexões, caminhos, pontos e tooltips, condicionado à
  autorização dos dados e assets correspondentes.
- **Economy Hub:** preços e tendências somente de fontes autorizadas, com
  origem, instante de observação, patch/league quando aplicável e limites de
  atualização.
- **Farm Lab:** calculadoras determinísticas, histórico de sessões e análise
  de rentabilidade usando entradas do usuário, dados licenciados ou fixtures
  sintéticas claramente identificadas.
- **Patch Intelligence:** comparação de versões e mudanças verificáveis, com
  proveniência e direitos de reprodução avaliados por fonte.
- **AI Advisor:** recomendações explicáveis, vinculadas a dados e regras
  verificáveis, sem inventar cálculos ou ocultar incerteza.
- **Crafting, Creators e outros módulos:** somente após Work Orders e
  dependências próprias serem aceitas.

## Fora do escopo desta fundação

- Implementar funcionalidades do portal, ingestão de dados ou API, scraping,
  endpoints privados, leitura não autorizada do cliente ou automação de jogo.
- Importar/reexibir a árvore passiva, conteúdo, preços, nomes, imagens, sprites
  ou assets sem autorização específica registrada na matriz de direitos.
- Ativar AdSense, assinaturas, patrocínios ou qualquer monetização antes de
  confirmar os direitos e critérios aplicáveis.
- Coletar perfis ou conteúdo de jogadores sem consentimento, finalidade,
  retenção e licenças definidas.
- Deploy da aplicação durante M00 ou ativação de serviço pago, upgrade
  automático, runner pago ou gate externo dependente de quota.
- Acrescentar funcionalidades classificadas FUTURE sem prioridade e Work Order
  autorizadas.

## Limites de conteúdo e fontes

Consulte [Rights, Attribution and API Usage](rights-and-data-sources.md).
Somente `AUTORIZADO` para a finalidade concreta permite planejar uso operacional.
`CONDICIONADO` e `NÃO VERIFICADO` bloqueiam ingestão, armazenamento,
reexibição e monetização até a evidência e aprovação próprias; `PROIBIDO` não
deve ser integrado. Consulta documental autorizada não libera dados.

Quando direitos estiverem pendentes, podem ser desenvolvidos contratos,
algoritmos e fixtures sintéticas sem reproduzir conteúdo protegido. A interface
deve identificar claramente dados sintéticos e não os apresentar como preços,
estatísticas ou estado atual do jogo.

## Limites de custo e operação

- Teto de gasto financeiro obrigatório: **US$ 0**.
- Planos gratuitos têm limites; não são ilimitados nem justificam upgrade
  automático.
- Nenhum aplicativo externo com créditos, quotas de review ou cobrança por
  análise pode ser obrigatório em PR ou status check.
- Runners padrão gratuitos de repositórios públicos e ferramentas open source
  podem ser considerados em Work Orders próprias, com permissões mínimas e
  execução segura de código não confiável.
- Alvo de deployment e seus limites devem ser documentados na WO-005/#6; este
  documento não comprova elegibilidade nem autoriza deploy.

## Evolução do escopo

Novos módulos ou mudanças de prioridade devem ser rastreados a issues e
Work Orders existentes, respeitando a dependência técnica e de direitos.
Alterações aprovadas passam por PR e atualizam os requisitos e o checkpoint.
