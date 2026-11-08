# EXN-M00-WO-003 — Evidence Bundle de direitos e APIs

- **Owner:** NexLabsTech
- **Status:** PROPOSED · direitos de ingestão, exibição e monetização não liberados
- **Revisão:** 2026-11-08
- **Work Order:** EXN-M00-WO-003 · Issue #4
- **Base SHA:** `5cf7ab69d8a2b80b245cd64966d9d40f13a8c8e1`
- **HEAD recebido para auditoria:** `1cd5055219b661a03f8b0b9a84a3b3fa20ab6316`
- **HEAD final:** registrar pelo campo `head.sha` da PR após o commit deste Correction Delta; um commit não pode conter o próprio SHA.

## Context Lock e dependências

- PR #133 está integrada por squash. PR #134 está `MERGED`, com merge commit/base da main `5cf7ab69d8a2b80b245cd64966d9d40f13a8c8e1`.
- A PR #135 tem base `main` no SHA `5cf7ab69d8a2b80b245cd64966d9d40f13a8c8e1`; o HEAD recebido `1cd5055219b661a03f8b0b9a84a3b3fa20ab6316` tem esse commit como pai. A dependência da WO-002 está preservada; nenhum rebase, merge ou alteração de histórico foi feito nesta branch.
- Issue #4 permanece aberta e rastreia EXN-M00-WO-003. A PR #135 permanece Draft até concluir auditoria e aceite aplicáveis.
- O Source Pack é parcial. `docs/scope.md`, `docs/definition-of-done.md`, `docs/architecture.md` e `docs/requirements.md` ainda não existem; estão mapeados às WOs 004–005. Test Plan, Deployment e Backlog ainda não têm WO mapeada no conjunto #4–#9 observado. Esta WO não os cria nem os promove.

## Escopo e diff

Somente documentação de direitos/fontes foi incluída nesta PR:

- `docs/rights-and-data-sources.md` — matriz ampliada para R01–R14, estados normalizados, restrições e gates por fonte.
- `docs/evidence/EXN-M00-WO-003-rights-review-2026-11-08.md` — este Evidence Bundle.
- `docs/README.md` — índice do Source Pack, já apontando para a matriz e para este bundle.

Sem código de aplicação, workflow, chamadas a APIs de jogo/economia, alteração administrativa, cadastro de API, ingestão, monetização ou deploy. Esta execução não iniciou operação paga; custos de checks externos automáticos preexistentes não estão visíveis e permanecem não verificados.

## Verificação primária das fontes

Consultas HTTP de leitura realizadas em 2026-11-08. As respostas abaixo verificam disponibilidade/conteúdo público no momento, não constituem licença nem aconselhamento jurídico.

| Fonte | Resultado observado | Decisão registrada |
| --- | --- | --- |
| GGG Terms of Use | GET HTTP 200; o título cobre Path of Exile e Path of Exile 2. Os termos limitam direitos do usuário a uso pessoal e não comercial e proíbem software automatizado/bots e engenharia reversa em relação ao site, materiais e serviços. | Consulta dos termos autorizada; uso comercial/reprodução de IP não liberados. A política específica da API deve ser observada para qualquer API suportada. |
| GGG Developer Docs | GET HTTP 200; lista recursos suportados, políticas, OAuth e rate limits; diz que, como regra geral, GGG não permite gerar receita comercial com sua propriedade intelectual; contém “We are currently unable to process new applications.” | Não há cadastro novo disponível segundo a fonte consultada. Nenhuma credencial atual do projeto foi comprovada. API e direitos de conteúdo não estão liberados por esta documentação. |
| GGG PoE2 Data Exports | GET HTTP 200; a GGG declara que a Passive Tree é a exceção pública às demais exportações de dados de jogo não fornecidas. | O acesso oficial ao export não prova licença de redistribuição, exibição comercial ou uso dos dados/assets. O repositório não apresenta licença identificável pela API de licença consultada (HTTP 404). |
| poe.ninja API e Terms | GET HTTP 200 em ambos; API documenta economia pública de PoE1/PoE2 e classifica endpoints de builds/perfis e demais endpoints não econômicos como internos, indisponíveis a terceiros. Termos gerais proíbem cópia, uso comercial, exibição pública e espelhamento dos materiais do site. | API econômica e termos gerais não foram reconciliados: dados permanecem HOLD_RIGHTS. Endpoints internos são PROHIBITED. Nenhuma chamada de dados foi feita. |
| PoE2 Scout | GitHub API confirmou repositório público e LICENSE MIT (HTTP 200); Swagger UI retornou HTTP 200. Não foram identificados titular legal da API ou evidência de termos/licença de redistribuição dos dados durante esta revisão. | Reuso de código é apenas candidato e condicionado à preservação de avisos/dependências; API/dados permanecem NÃO VERIFICADOS. |
| cvenzin poe2-skilltree | README e arquivo LICENSE recuperados com HTTP 200; ambos apresentam MIT para o código. GitHub License API retornou `NOASSERTION`, embora o texto do arquivo LICENSE seja MIT. README afirma que a árvore vem do export oficial GGG e cita PoE2Wiki/PoE2DB para consulta de dados e estatísticas. | Código e dados têm direitos separados. GGG export, PoE2Wiki e PoE2DB permanecem sem licença de uso no Exile Nexus. Nenhuma cópia ou integração foi feita. |
| PoE2Wiki | GET HTTP 200 retornou uma página de desafio anti-bot, sem expor licença/termos ou conteúdo de dados. | Titular, licença e API não verificados. Nenhum scraping ou consulta adicional foi feito. |
| PoE2DB | GET HTTP 200 da página inicial; rodapé identifica PoE2DB. Licença de conteúdo/dados, API e redistribuição não foram verificadas. | Fonte não autorizada para ingestão/exibição. |
| Google AdSense | GET HTTP 200; páginas retornaram os títulos “Políticas para editores do Google” e “AdSense Program policies”. | Políticas do produto não concedem direito sobre IP de GGG ou de terceiros. Nenhum anúncio ativado. |

Referências primárias e URLs estão indexadas por ID em `docs/rights-and-data-sources.md`. Em caso de conflito entre documentos de API e termos gerais, o uso fica bloqueado até confirmação do titular.

## Estado consolidado por tipo de uso

- **GGG:** apenas consulta documental autorizada. APIs dependem de credenciais e direitos de apresentação; novos cadastros de aplicações não são processados segundo os Developer Docs consultados. Export da árvore disponível oficialmente, mas redistribuição/uso comercial não verificados.
- **Economia:** poe.ninja tem documentação pública com conflito material entre superfície da API e termos gerais; PoE2 Scout tem Swagger público sem licença de dados/API verificada. Ambas as fontes permanecem não autorizadas para ingestão, armazenamento, exibição e monetização.
- **Builds/perfis:** endpoints internos da poe.ninja explicitamente PROIBITED.
- **Código de terceiros:** MIT de PoE2 Scout e cvenzin é relativo ao código identificado; requer avisos e auditoria de dependências e não transfere direitos sobre datasets, imagens, árvores ou assets de jogo.
- **PoE2Wiki/PoE2DB:** referências citadas pelo planner; titular/termos/licença/API não verificados. Sem scraping ou cópia.
- **Jogadores e NexLabsTech:** não há conteúdo submetido, artefato de aplicação ou inventário de assets nesta WO. URL/licença/proveniência futuros ainda não existem ou não são aplicáveis; nenhum direito é presumido.
- **AdSense e demais receita:** não autorizados por esta WO. Direitos do conteúdo e conformidade das políticas são gates separados.

Nenhuma fonte de dados de jogo ou economia está autorizada para ingestão/reexibição no Exile Nexus. APIs e sites não foram usados para coletar dados, preços ou perfis.

## Testes e verificações

### Executados pelo executor nesta sessão

- `git fetch --all --prune` — PASS; referências remotas conferidas.
- `git diff --name-status origin/main...HEAD` — PASS antes do Correction Delta: três arquivos documentais do escopo.
- `git diff --check origin/main...HEAD` — PASS antes do Correction Delta; repetir no HEAD final.
- GitHub REST/CLI: PR #135 aberta e Draft; base/head conferidos; PR #134 merged no SHA-base; reviews formais de #135 retornaram lista vazia.
- Revisão de fontes acima — GET/metadata em páginas e APIs públicas; não foram chamadas APIs de jogo/economia.
- Validador Python documental ad hoc: **PASS** — 3 documentos verificados; metadados e fences presentes; 14 IDs de fonte únicos; quatro estados normalizados presentes; 6 colunas em cada linha da matriz; links locais do índice válidos; zero correspondências nos padrões comuns de segredo examinados.
- URLs primárias consultadas por GET: **10/10 HTTP 200** (GGG Terms/Developer Docs/Data Exports, poe.ninja API/Terms, PoE2 Scout Swagger, 2 páginas AdSense, PoE2Wiki e PoE2DB). A página PoE2Wiki retornou desafio anti-bot, não licença ou dados. GitHub API/raw confirmou os repositórios e licenças citados; a API de licença do export GGG retornou HTTP 404. Isso é teste de disponibilidade, não atestado de direitos.
- `git diff --check` — **PASS** no diff de trabalho; repetir e registrar contra `origin/main` no HEAD final.
- Verificação do índice: **PASS** — links relativos em `docs/README.md` resolvem para arquivos existentes. O teste customizado não substitui Markdownlint.

### Não aplicáveis ou indisponíveis

- Build, typecheck, testes unit/integration/E2E, SAST e análise de dependências de aplicação: **NOT APPLICABLE**; o repositório não contém aplicação, dependências ou workflow nesta WO.
- GitHub Actions: workflow count retornou `0`; nenhum job de CI foi executado. Markdownlint não está configurado/disponível neste repositório e não foi declarado como executado.
- CodeRabbit: check existente `SKIPPED` porque a PR está em Draft; não solicitado manualmente.
- Socket Security: checks existentes `SUCCESS`, mas são integrações opcionais e não foram executadas manualmente nem são requisitos de aprovação.
- Não há GitHub Review formal registrada para #135. A auditoria técnica desta entrega é executada pelo mesmo executor/sessão; ela não é independente. Nenhuma identidade de auditoria externa é alegada.
- Tentativas de leitura administrativa via APIs de branch protection e actions permissions retornaram 403 para as integrações disponíveis. A proteção da `main`, permissões de Actions e settings de Code Scanning/Secret Scanning permanecem **NOT VERIFIED**, não desativadas por inferência. Rulesets visíveis retornaram lista vazia. Dependabot Alerts retornou a mensagem explícita da API “disabled for this repository” para a credencial consultada.

## Segurança, custos e permissões

- Nenhum segredo foi necessário ou incluído. A revisão de padrões comuns de tokens/keys é apenas uma verificação documental, não um scanner de segredos certificado.
- Nenhum serviço de review com cota/créditos é necessário para aprovar a PR. CodeRabbit e Socket não são gates; não foi solicitada análise manual nem uso de franquia.
- Esta execução não solicitou serviço pago, API de jogo, deployment ou runner. Não há workflow Actions no repositório. Custo financeiro obrigatório para esta WO: **US$ 0**.
- A cobrança/plano dos checks externos pré-existentes não é visível pelas credenciais disponíveis; seu custo não foi verificado e eles não condicionam o aceite.
- A credencial `gh` consultada pertence a KayzenRoot e não tem permissão administrativa/push. O perfil NexLabsTech conectado confirma autoridade `admin` no repositório para as operações suportadas pelo conector, mas o endpoint de branch protection continuou bloqueado pelo escopo dessa integração.

## Resultado da auditoria e Checkpoint Delta proposto

- Correções incluídas: novos candidatos de fonte R12–R13; status de autorização alinhado aos quatro estados solicitados; fontes futuras sem URL/licença marcadas explicitamente como inexistentes/não verificadas; cadastro GGG indisponível; licença MIT separada de direitos de API/dados; URL da Currency Exchange corrigida para a página oficial que lista o recurso.
- Risco de direitos: **NOT CLEARED** para ingestão, persistência, reexibição, árvore passiva e monetização. Nenhum HIGH/CRITICAL técnico foi identificado no escopo documental; incertezas legais ficam explicitamente bloqueadas.
- **Checkpoint Delta proposto:** registrar EXN-M00-WO-003 como matriz documental R01–R14 entregue após auditoria e aceite administrativo, mantendo todos os gates de dados/receita fechados. Próximo incremento elegível: EXN-M00-WO-004 / Issue #5 somente após o aceite e integração da WO-003.
- **Veredito técnico do executor:** `APPROVED` para a matriz documental e seus limites, após os testes acima. Auditor e executor são a mesma sessão; não é auditoria independente nem GitHub Review `APPROVED`. Aceite administrativo do owner e SHA final da PR devem ser registrados separadamente após a atualização da branch.
