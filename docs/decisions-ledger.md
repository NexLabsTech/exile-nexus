# Decisions Ledger

- **Owner:** NexLabsTech
- **Status:** PROPOSED
- **Revisão:** 2026-11-08
- **Work Order:** EXN-M00-WO-004 · Issue #5

Este ledger registra decisões explícitas de processo. Esta versão ainda aguarda
revisão e não foi promovida a fonte canônica.

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

Este ledger não aprova fontes de dados, licença, marca, plano de serviço,
tecnologia de aplicação, arquitetura, retenção, privacidade ou mecanismo de
deploy. Trate esses itens nos Work Orders correspondentes.

[PR #133]: https://github.com/NexLabsTech/exile-nexus/pull/133
