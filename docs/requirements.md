# Requirements Baseline

- **Owner:** NexLabsTech
- **Status:** PROPOSED
- **Revisão:** 2026-11-08
- **Work Order:** EXN-M00-WO-004 · Issue #5

## Fonte e premissas

Este baseline deriva do escopo proposto do produto e da matriz de direitos
integrada em [EXN-M00-WO-003](rights-and-data-sources.md). Os requisitos não
liberam dados ou APIs: cada uso continua condicionado ao status e gate da
matriz. Não existem aplicação, contratos de runtime ou testes de produto nesta
branch base.

## Requisitos funcionais

| ID | Requisito | Evidência de aceite futura |
| --- | --- | --- |
| FR-CORE-001 | Oferecer portal responsivo, com navegação e estados de loading, erro e vazio tratados. | Testes responsivos e de estados nas telas entregues. |
| FR-CORE-002 | Usar identidade dark fantasy/glassmorphism original, sem sugerir afiliação oficial nem copiar assets protegidos. | Revisão visual, inventário de assets e aviso de independência. |
| FR-CORE-003 | Expor páginas e metadados de SEO adequados ao conteúdo publicado, sem indexar dados privados. | Verificações de metadados e crawlability após haver aplicação. |
| FR-DATA-001 | Conectar somente fontes autorizadas para finalidade, conteúdo, frequência e distribuição pretendidos. | Fonte em estado AUTORIZADO para o uso concreto; teste do adapter e leitura da evidência de direitos. |
| FR-DATA-002 | Registrar proveniência, versão da fonte, patch/league quando aplicável, instante de observação, atribuição, licença, finalidade e política de cache/expiração. | Contratos explícitos e testes que rejeitem registro sem metadados obrigatórios. |
| FR-DATA-003 | Falhar fechado quando a fonte estiver CONDICIONADA, NÃO VERIFICADA ou PROIBIDA, ou quando o direito expirar/revogar. | Testes de bloqueio, expiração e kill switch. |
| FR-CAT-001 | Permitir busca em catálogo de itens, gemas, classes e mecânicas apenas quando os respectivos dados tiverem direitos liberados. | Testes de busca e proveniência; fixtures sintéticas enquanto direitos faltarem. |
| FR-BUILD-001 | Permitir criar e editar builds com classe, ascendência, nós, caminhos, pontos e tooltips quando os dados/nomes/assets forem autorizados. | Testes de integridade da árvore, conexões, limites de pontos, seleção de caminhos, visualização e desempenho. |
| FR-ECON-001 | Mostrar preços e tendências somente de fontes autorizadas, acompanhados de origem, atualização e limitações. | Testes de frescor/proveniência e estados indisponíveis; nenhum preço inventado. |
| FR-FARM-001 | Calcular resultados com regras determinísticas e entradas de usuário ou dados autorizados; manter histórico de sessões conforme política de privacidade. | Testes determinísticos de cálculo e tratamento de entrada/erro/privacidade. |
| FR-PATCH-001 | Comparar versões usando fontes verificáveis e autorizadas, identificando patch e proveniência. | Testes de regressão entre versões e links para evidência permitida. |
| FR-AI-001 | Produzir recomendações explicáveis, apontando dados e regras utilizados e preservando incertezas. | Avaliação de citações, consistência e não fabricação; regras e cálculos permanecem verificáveis fora do modelo. |
| FR-MODULE-001 | Implementar Crafting, Creators e módulos adicionais apenas após dependências e prioridade serem aceitas em Work Orders próprias. | Issue elegível e critérios de aceite aprovados antes do desenvolvimento. |

## Requisitos não funcionais e de governança

| ID | Requisito | Evidência de aceite futura |
| --- | --- | --- |
| NFR-ACCESS-001 | Interfaces devem ser acessíveis por teclado e leitor de tela, com contraste adequado e suporte a `prefers-reduced-motion`. | Auditoria axe-core/manual e testes de navegação quando houver UI. |
| NFR-RESP-001 | Layout e interações devem funcionar em dispositivos móveis e desktop. | Testes responsivos/E2E em breakpoints suportados. |
| NFR-PERF-001 | Limites de desempenho devem ser definidos por superfície e risco na implementação, sem inventar metas para código inexistente. | Benchmark e Quality Gate especificados na WO de implementação. |
| NFR-ARCH-001 | Manter modular monolith, limites explícitos de domínio, contratos tipados e dependências mínimas. | Revisão arquitetural e testes de contrato na WO-005/#6. |
| NFR-SEC-001 | Aplicar deny-by-default, menor privilégio, tratamento seguro de entrada, proteção de credenciais e privacidade. | Threat model, análise estática e testes de segurança pertinentes. |
| NFR-RIGHTS-001 | Impedir ingestão, persistência e publicação de fontes sem direitos para o uso concreto. | Testes de gate por estado, revisão de evidência e kill switch. |
| NFR-COST-001 | Operação obrigatória custa US$ 0; nenhum serviço pago ou dependente de quota pode bloquear fluxo. | Plano/limites documentados, sem upgrade automático; custo dos serviços críticos comprovado antes da adoção. |
| NFR-CI-001 | Checks obrigatórios devem ser gratuitos, existentes e validados; não declarar checks inexistentes como PASS. | Workflows documentais em WO-007/#8 antes de torná-los obrigatórios. |
| NFR-OPS-001 | Não publicar ou implantar sem deployment plan, direitos necessários, testes e aprovação do Work Order de release. | Plano em WO-005/#6 e validação operacional em Work Order própria. |
| NFR-TRACE-001 | Relacionar mudanças a requisitos, Work Order, issue, PR, evidência, teste e checkpoint. | Matriz de rastreabilidade em cada Evidence Bundle. |

## Estados de validação

Use `PASS` somente para uma verificação executada com resultado aprovado.
Use `FAIL` quando a verificação executada falhar, `NOT APPLICABLE` quando o
escopo não tiver o pré-requisito, `NOT RUN` quando não executada e `BLOCKED`
quando uma dependência ou evidência impedir a verificação. Testes inexistentes
ou indisponíveis nunca são PASS.

## Dependências de planejamento

- Architecture e deployment plan: EXN-M00-WO-005 / Issue #6.
- Security, privacy e abuse controls: EXN-M00-WO-006 / Issue #7.
- Test Plan, CI documental e branch protection: EXN-M00-WO-007 / Issue #8.
- Auditoria do backlog existente e checkpoint: EXN-M00-WO-008 / Issue #9. O
  backlog canônico continua sendo GitHub Issues; não criar cópia duplicada.
