# Decisions Ledger

- **Owner:** NexLabsTech
- **Status:** PROPOSED
- **Revisão:** 2026-11-08
- **Work Order:** EXN-M00-WO-007 · Issue #8

Este ledger registra decisões explícitas de processo e arquitetura. O documento
permanece PROPOSED; cada decisão tem seu estado próprio. Uma restrição aceita
pelo owner não aceita decisões técnicas que a instrução não tenha especificado.

## EXN-DEC-0001 — Custo zero e gates de CI

- **Status da decisão:** ACEITA pelo owner em 2026-11-08
- **Fonte:** decisão do owner registrada na [PR #133].

- Custo financeiro obrigatório para operação: US$ 0.
- Nenhum serviço externo que consuma créditos, quotas de análise ou franquias
  pode ser obrigatório em workflows, status checks ou aprovação de PR.
- Serviço externo só pode permanecer opcional se não gerar custo e não bloquear
  o fluxo. Não aguarde reposição de quotas para cumprir um gate.
- Priorize GitHub Actions com runners padrão elegíveis para repositórios
  públicos, CodeQL e ferramentas open source executadas no CI.
- Limites gratuitos são finitos; não os descreva como ilimitados e não aceite
  upgrades.

Consequência: Socket Security e CodeRabbit não podem ser checks obrigatórios.
A presença de checks desses apps não comprova elegibilidade gratuita,
permissões ou custo total da conta. Remoção, desativação ou mudança de settings
deve ocorrer somente no Work Order que abrange essas configurações, com leitura
posterior da API.

## EXN-DEC-0002 — Mudanças administrativas por Work Order

- **Status da decisão:** ACEITA pelo owner em 2026-11-08
- **Fonte:** instrução explícita do owner nesta execução.

Alterações de settings não pertencem ao escopo de EXN-M00-WO-001. Faça-as
somente em Work Orders próprios, após dependências e critérios de aprovação.
Documente estado anterior, novo estado, evidência e rollback.

## EXN-DEC-0003 — Gate de direitos por fonte

- **Status da decisão:** ACEITA pelo owner em 2026-11-08
- **Fonte:** aceite administrativo da matriz documental na
  [PR #135](https://github.com/NexLabsTech/exile-nexus/pull/135#issuecomment-6720404361),
  integrada no commit `1e786ad840a12762e1f98424f927f48638f7a036`.

A aceitação da matriz não é uma licença nem libera dados de Path of Exile 2.
Cada fonte exige autorização para a finalidade concreta antes de ingestão,
persistência, reexibição ou monetização. `AUTORIZADO` vale somente para o uso
especificado; `CONDICIONADO` e `NÃO VERIFICADO` bloqueiam o uso operacional até
resolver os gates; `PROIBIDO` não pode ser integrado. API pública ou código
MIT não transfere automaticamente direitos sobre dados, arte, marcas ou
conteúdo de jogo. A decisão não autoriza scraping, endpoints privados,
importação de árvore ou AdSense.

## Itens não decididos

Este ledger não aprova fonte de dados, licença, marca, serviço de execução,
framework, ferramenta de build, runtime, banco, retenção, privacidade ou
mecanismo de deploy. Trate esses itens em Work Orders próprias. As restrições
de arquitetura aceitas e a proposta estática permanecem identificadas por seus
estados acima.

[PR #133]: https://github.com/NexLabsTech/exile-nexus/pull/133

## EXN-DEC-0004 — Restrições arquiteturais do produto

- **Status:** ACEITA pelo owner em 2026-11-08.
- **Fonte:** instrução do owner nesta execução.

Aplicar TypeScript estrito, modular monolith, contratos explícitos, baixo
acoplamento, dependências mínimas e segurança deny-by-default. Não adicionar
código morto, dados sem proveniência ou funcionalidades fora de Work Orders
aprovadas. Nenhum framework, runtime, banco, ORM, fornecedor de IA ou serviço de
execução foi escolhido por esta decisão. Não iniciar código funcional antes da
conclusão da fundação M00 e dos controles essenciais verificados.

## EXN-DEC-0005 — Candidato de hospedagem estática

- **Status:** PROPOSTA nesta WO; não ativada.
- **Fonte:** limites publicados da Cloudflare Pages consultados em
  2026-11-08; intenção Free-first do owner.

Avaliar Cloudflare Pages no plano Free para servir um frontend estático pelo
hostname fornecido pela plataforma. Não usar Pages Functions, Workers, banco,
domínio pago, plugin pago ou integração Git durante M00. Elegibilidade da conta,
limites atuais e qualquer cobrança permanecem sujeitos a leitura antes de uma
futura Work Order de deploy. Esta proposta não autoriza criar projeto, conectar
repositório ou publicar.

## Itens técnicos não decididos

Framework de interface, ferramenta de build, runtime de API, banco, cache
persistente, autenticação de usuário, fornecedor de IA, provedor de economia,
retenção e observabilidade permanecem sem decisão. Reavaliar em Work Orders
próprias, com direitos, segurança, limites e custo comprovados.


## EXN-DEC-0006 — Postura de segurança e privacidade

- **Status:** ACEITA pelo owner em 2026-11-08.
- **Fonte:** instruções explícitas do owner para execução M00 e Issue #7.

Aplicar deny-by-default, menor privilégio e proteção proporcional ao risco; não
colocar segredo de produção em código ou workflow de PR; não exigir serviço
externo sujeito a quota ou cobrança; manter custo obrigatório em US$ 0; não
coletar dados pessoais sem finalidade, transparência e controles previamente
definidos; não ingerir ou redistribuir fonte sem autorização específica. Um
controle administrativo só pode ser declarado configurado após read-back.
A indisponibilidade de leitura deve ser registrada como `NOT VERIFIED` e
bloquear a atividade que dependa daquele controle. Esta decisão documental não
altera settings, aprova coleta, concede licença ou autoriza deployment.

## EXN-DEC-0007 — Auditoria interna para mantenedor solo e exclusão de reviews externos

- **Status da decisão:** ACEITA explicitamente pelo owner em 2026-11-08.
- **Fonte:** instrução explícita mais recente do owner durante a WO-008;
  reconciliação dos critérios de aceite do épico
  [EXN-M00-EPIC #1](https://github.com/NexLabsTech/exile-nexus/issues/1).

O Exile Nexus é mantido individualmente. Não exigir nem solicitar review externo,
segunda conta, auditor separado ou parecer de bot para aceitar Work Orders,
PRs ou releases. Não usar CodeRabbit para decisão ou gate; não iniciar novas
revisões desse aplicativo. Eventuais mensagens/checks históricos do aplicativo
não são evidência de aceite e não integram o `required_status_checks`.

Revisão técnica objetiva pelo mesmo orquestrador/executor é permitida quando
a ausência de independência for **declarada expressamente**. Esta decisão
**não elimina** Source Check, Context Lock, Evidence Bundle, validações,
testes proporcionais ao risco, CI obrigatório, análise de segurança/direitos,
veredito fundamentado, correção de defeitos nem o **aceite administrativo
explícito do owner antes do merge**. Squash normal, sem bypass/force-push.

A remoção de qualquer instalação/configuração administrativa remanescente de
app de terceiros exige ação na configuração do repositório, com read-back e
autorização no escopo próprio. Ausência de permissão de administração deve
ser registrada como NOT VERIFIED, nunca como desinstalação concluída.

## EXN-DEC-0008 — Frontend Astro + React islands aprovado

- **Status da decisão:** ACEITA pelo owner em 2026-11-08.
- **Fonte:** aceite explícito de
  [EXN-M01-WO-001 / PR #141](https://github.com/NexLabsTech/exile-nexus/pull/141);
  [registro da issue #11](https://github.com/NexLabsTech/exile-nexus/issues/11#issuecomment-6726702083).
- **Merge:** squash normal no commit
  `4a6bba78fd1966804895c9f9dafe85bf70175633`.

A direção inicial de frontend é **Astro 7.4.7 estático + React 19.3.1
islands**, com **React/Vite** como fallback quando as restrições de interação,
toolchain ou manutenção exigirem. A decisão arquitetural é compatível com
Cloudflare Pages Free como **candidato** de hospedagem, ainda não ativado.

O probe experimental Astro usou TypeScript 6.0.2 por restrição de peer
dependency de `@astrojs/check@0.9.12`. Isto não fixa automaticamente
versão de TypeScript em produção. O scaffold futuro exige lockfile no Git,
auditoria de dependências, testes da aplicação e verificação de limites/custo.

O aceite NÃO libera criação de deploy, Cloudflare, backend, API, ingestão,
dados do jogo, publicidade, custo pago, marca/asset de terceiro ou qualquer
decisão visual da WO-002. Tais gates seguem seus Work Orders e R01–R14.
