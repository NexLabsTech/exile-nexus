# Architecture Baseline

- **Owner:** NexLabsTech
- **Status:** PROPOSED
- **Revisão:** 2026-11-08
- **Work Order:** EXN-M00-WO-005 · Issue #6

## Estado e limites

Este documento define uma arquitetura de referência para Work Orders futuras.
Não cria aplicação, escolhe framework, autoriza fonte de dados ou provisiona
serviços. Os requisitos estruturais explícitos do owner estão registrados em
EXN-DEC-0004; as escolhas de fornecedor e runtime continuam propostas.

O repositório não contém código de aplicação, dependências, workflow, API,
banco ou deployment neste baseline. Esta WO não adiciona código funcional, credenciais,
recursos Cloudflare ou integrações Git.

## Forma da aplicação

Adotar um modular monolith TypeScript estrito. Organizar os módulos por domínio
e manter uma única aplicação implantável até que evidência de escala, segurança
ou isolamento justifique outra decisão. Não dividir em microservices por
antecipação.

| Camada | Responsabilidade | Regra de dependência |
| --- | --- | --- |
| Interface | Rotas, páginas, componentes, acessibilidade, estados de carregamento e erro | Chama casos de uso; não acessa provedores nem banco diretamente. |
| Aplicação | Casos de uso, autorização, coordenação e transações | Depende de contratos do domínio e portas; não conhece SDK de fornecedor. |
| Domínio | Regras de catálogo, builds, economia, farm, patches e recomendações | Determinístico quando possível; sem I/O ou detalhes de UI. |
| Contratos | Tipos versionados, proveniência, resultados e portas | Compatíveis com TypeScript strict; documentados antes de integrar adapters. |
| Adapters | APIs autorizadas, cache e armazenamento aprovado | Isolados por interface, com timeout, limite, validação, atribuição e kill switch. |
| Infraestrutura | Configuração de runtime, observabilidade e deploy | Sem credenciais no cliente; permissões mínimas e custo comprovado. |

Domínios planejados: Core Platform, Data Engine, Database, Build Hub, Economy
Hub, Farm Lab, Patch Intelligence, AI Advisor, Crafting e Creators. Um domínio
não deve importar implementação interna de outro. Comunicação entre módulos
ocorre por casos de uso ou contratos explícitos.

## Fronteiras de confiança e fluxo de dados

1. Tratar navegador, entrada de usuário, arquivos enviados, conteúdo de PR e
   qualquer provedor externo como não confiáveis.
2. Validar e limitar entrada antes de usar em busca, cálculo, logs ou saída.
3. Antes de chamar um adapter, consultar o gate de direitos para a fonte, o
   conteúdo, a finalidade, a exibição, a retenção e o uso comercial exatos.
4. Permitir consumo operacional somente para status AUTORIZADO, dentro das
   finalidades, atribuições, versão e limites comprovados. Falhar fechado para
   CONDICIONADO, NÃO VERIFICADO, PROIBIDO, expirado ou sem evidência.
5. Validar payload, patch/league, frescor e proveniência. Não transformar dado
   ausente ou obsoleto em estatística atual.
6. Persistir ou exibir somente quando a permissão cobrir aquela operação. Sem
   autorização, usar apenas fixtures sintéticas que não reproduzam conteúdo.
7. Registrar resultado e origem sem incluir segredo, perfil privado ou dado
   pessoal desnecessário.

Proibir scraping, endpoints privados/internos, engenharia reversa de APIs,
automação de jogo e coleta de perfis sem consentimento. URLs de origem devem
ser allowlisted em configuração confiável, não escolhidas por usuário. Isso
limita SSRF e impede que uma API pública documentada seja confundida com licença.

## Contratos e módulos de dados

O contrato proposto está em [Data Contracts](data-contracts.md). Cada registro
transporta versão de schema, namespace de origem, proveniência, rights status,
observed_at e fetched_at, patch/league quando aplicável, atribuição e estado de
frescor.

- Catálogo não mistura registros de fontes distintas sem regra de identidade e
  direitos explícitos.
- Build Hub separa algoritmo de árvore do conteúdo importado. Integridade de
  nós, conexões e limites de pontos pode ser testada com grafo sintético.
- Economia guarda observação e hora de atualização; não chama preços simulados
  de preços reais ou atuais.
- Farm Lab usa cálculo determinístico, unidades explícitas e entrada do usuário
  ou dados autorizados.
- Patch Intelligence compara versões identificadas por origem; não inventa
  changelog ausente.
- AI Advisor não é fonte de verdade. Saídas futuras precisam apontar fontes e
  regras verificáveis; qualquer cálculo financeiro permanece código
  determinístico.

Nenhum storage, ORM, cache persistente, autenticação, API pública ou fornecedor
de IA foi escolhido. Persistência de dados de jogo continua bloqueada pela
matriz de direitos. A WO de privacidade e segurança deve definir controles
adicionais antes de dados de usuário ou credenciais.

## Escolhas e alternativas

| Tema | Direção de referência | Alternativa considerada | Estado e tradeoff |
| --- | --- | --- | --- |
| Forma | Modular monolith | Microservices | Modular monolith atende ao estágio sem operar múltiplos serviços; a separação física aumenta custo e superfície operacional. Restrição do owner aceita; layout de código permanece para uma WO de implementação. |
| Execução inicial | Frontend estático; APIs futuras isoladas por portas | Aplicação server-side completa | Static-first reduz credenciais, runtime e custos; limita busca dinâmica, estado persistente e autenticação. Cloudflare Pages Free é candidato, não ativo. |
| Dados externos | Adapters tipados com direitos e proveniência | Acesso direto do cliente a fontes | Adapters permitem limites, cache e bloqueio central; sem backend autorizado, nenhum adapter será integrado. |
| Persistência | Nenhuma selecionada nesta fase | Cloudflare D1 ou outro banco | D1 tem quota gratuita finita e plano pago possível; adiar evita armazenar conteúdo ou perfil sem direitos e privacidade aprovados. |
| Cache | Política por fonte no contrato | Cache universal de longa duração | TTL e armazenamento dependem do provedor e da licença. Sem regra confirmada, não persistir nem armazenar em cache. |
| IA | Nenhum provedor; cálculos determinísticos | SaaS de IA ou modelo local | SaaS pode gerar custos e submeter dados a terceiro. Não selecionar até contrato, privacidade e teto de gasto serem comprovados. |

Não foram fixados framework, compilador, biblioteca de validação, ferramenta de
build, banco ou versão de runtime. Escolher o menor conjunto compatível na
primeira Work Order funcional, com lockfile e teste de segurança.

## Segurança e operação planejadas

- Aplicar TypeScript strict, validação de fronteira em runtime e tipos
  versionados sem confiar apenas no tipo de compilação.
- Negar por padrão permissões, operações de dados e destinos de rede.
- Guardar segredos somente no ambiente server-side futuro, com escopo mínimo;
  nunca em navegador, artefato público, log ou contexto de execução de código
  não confiável.
- PRs não recebem credenciais de deploy. Workflows para pull_request não
  executam código de PR com segredos privilegiados.
- Definir timeouts, rate limits, backoff limitado, circuit breaker e estados
  degradados por adapter, respeitando termos do provedor.
- Medir erro, latência e quota sem enviar perfil ou conteúdo pessoal. Métricas
  e logs só entram após revisão de privacidade e custo.
- Desativação, expiração ou revogação de uma fonte deve interromper chamadas,
  publicação e cache; documentar descarte/retirada quando a licença exigir.
- Executar testes de contrato, fixtures sintéticas, regressão, direitos,
  segurança, acessibilidade e desempenho adequados a cada módulo.

## Rastreabilidade

- Modular monolith, TypeScript estrito e contratos explícitos: EXN-DEC-0004,
  NFR-ARCH-001.
- Rights gate, proveniência e versionamento: FR-DATA-001 a FR-DATA-003 e
  NFR-RIGHTS-001.
- Isolamento de módulos: FR-MODULE-001.
- Segurança, privacidade, segredos e permissões: NFR-SEC-001, detalhados na
  WO-006 / Issue #7.
- Deployment e rollback: NFR-OPS-001 e [Deployment Plan](deployment-plan.md).
- Testes e verificações futuras: WO-007 / Issue #8 e uma Work Order funcional
  própria.

## Fonte de hierarquia

As restrições aceitas pelo owner têm precedência sobre as opções propostas
nesta página. Uma proposta só se torna decisão aceita quando o estado do ledger,
o aceite administrativo e o checkpoint correspondente registrarem isso. Nenhuma
escolha deste documento é autorização para implementação, ingestão ou deploy.
