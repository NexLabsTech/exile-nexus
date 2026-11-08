# Deployment Plan

- **Owner:** NexLabsTech
- **Status:** PROPOSED · planejamento, sem implantação
- **Revisão:** 2026-11-08
- **Work Order:** EXN-M00-WO-005 · Issue #6

## Estado atual

O repositório não contém aplicação, build, domínio, conta Cloudflare conectada,
credencial de produção ou deployment. Nenhum deploy é feito ou autorizado por
esta Work Order. A elegibilidade gratuita da conta NexLabsTech e a configuração
de billing não foram verificadas por acesso administrativo.

## Alvo candidato

Avaliar Cloudflare Pages Free para publicar inicialmente arquivos estáticos
gerados por uma aplicação ainda futura. Não criar projeto nem conectar Git
nesta fase. Não comprar domínio; considerar primeiro o hostname fornecido pela
plataforma, depois de confirmar na conta que não há custo ou upgrade.

As páginas oficiais de limites, consultadas em 2026-11-08 com HTTP 200,
registram para Cloudflare Pages Free:

- Até 500 builds por mês.
- Um build simultâneo e timeout de build de 20 minutos.
- Até 20.000 arquivos por site.
- Deployments de preview para branches são suportados pela integração Git.

Esses são limites publicados do produto, não evidência de que uma conta
específica está no plano Free ou de que sua configuração de billing não pode
incorrer em custo.

Não ativar Pages Functions, Workers, D1, KV, Durable Objects, Analytics pago,
domínio pago, add-on ou integração de terceiros nesta fase. A documentação de
Workers consultada informa 100.000 requests por dia e 10 ms de CPU por chamada
no Workers Free, mas o plano Workers Paid cobra mínimo de US$5 por conta. Isso
torna Functions/Workers inadequado como dependência implícita de custo zero sem
verificação da conta, limites e comportamento de excedente. D1 também não foi
selecionado: a tabela Free publica limites finitos de 5 milhões de linhas lidas
por dia, 100.000 escritas por dia, 5 GB totais e 10 bases. Nenhuma base deve ser
criada até que direitos e privacidade sejam aprovados e a arquitetura volte a
ser auditada.

Para CI futuro, usar somente runners GitHub-hosted padrão em repositório
público; GitHub informa que esses runners padrão são gratuitos em repositórios
públicos. Não usar larger runners, minutos de runner pago ou SaaS de quota como
gate. A existência, elegibilidade e limites da conta devem ser lidos antes de
habilitar um workflow. Esta Work Order não adiciona workflow.

## Ambientes

| Ambiente | Planejamento | Credenciais e dados |
| --- | --- | --- |
| Local | Testes sintéticos e builds reproduzíveis quando a aplicação existir. | Sem segredo de produção; nenhum dado de jogo não autorizado. |
| Pull request / preview | Validação sem privilégio. Preview só depois de revisar integração e custo. | Tratar código e artefato de PR como não confiáveis; sem token de deploy, chave de API ou segredo de produção. |
| Produção | Uma conta/projeto Cloudflare Pages Free, somente após Work Orders, direitos, conta e custo serem verificados. Deploy apenas de main aceita. | Segredo restrito ao ambiente de produção, token com escopo mínimo e sem dados de teste. Nenhum segredo foi criado agora. |

Separar os ambientes por hostname, configuração e permissões. Não copiar
segredos de produção para preview. Não expor banco, token ou chave no bundle
estático do navegador.

## Fluxo futuro de release

1. PR valida documentação, lint, typecheck, build, testes e análise compatíveis
   com a aplicação quando existirem; nenhum check externo com quota é
   obrigatório.
2. Fazer merge por squash em main somente depois de critérios, auditoria,
   aceite do owner e checks gratuitos validados. Branch protection é
   deliverable da WO-007 e não está comprovada nesta WO.
3. Desdobrar workflow de deploy apenas em Work Order de release, com evento
   restrito a main ou acionamento manual do owner. O job valida o SHA e faz
   deploy usando somente token de conta/projeto estritamente necessário.
4. Jobs de pull_request não recebem credenciais de deploy. Não usar
   pull_request_target para baixar ou executar código não confiável com
   privilégios. Forks e previews recebem nenhum segredo.
5. Fixar ações externas em SHA auditado, permissões GitHub mínimas, timeout,
   cancelamento de execução obsoleta e filtros que evitem rebuild não
   pertinente.
6. O deploy de produção é bloqueado se fonte de dados, conteúdo, assets,
   monetização, custo, testes ou observabilidade exigirem autorização ausente.

Integração Git nativa da Pages pode criar preview de pull request; não ativá-la
agora. Primeiro avaliar se previews precisam de acesso, se processam dados
sensíveis, se o custo permanece zero e se o provider executa conteúdo externo.
Uma estratégia de preview não deve abrir deploy privilegiado para qualquer
contribuidor.

## Rollback e recuperação

- Cada release deve guardar SHA do source, identificador do deployment,
  resultado dos checks e ambiente.
- Não publicar migração de banco junto de um frontend até existir plano
  reversível e compatibilidade de schema.
- Manter identificada a última release aceita. Em incidente, restaurar a
  versão estática conhecida e revalidar caminhos, cache, headers e health
  checks pelo processo da interface Cloudflare depois de verificar que a
  operação permanece no plano Free.
- Sem banco ou estado de usuário agora, não há backup de dados a configurar.
  Se dados persistentes forem aprovados no futuro, definir backup, retenção,
  restauração e teste de recuperação antes de produção.
- Se quota, build, provider ou domínio ficar indisponível, preservar serviço
  degradado ou retirar funcionalidade, sem upgrade automático ou troca para
  endpoint não autorizado.

## Verificações pré-deploy

Um futuro Work Order deve registrar evidência de:

- Plano Free ativo na conta alvo, política de billing e ausência de upgrade
  automático ou produto pago.
- Direitos de cada conteúdo, fonte, asset e finalidade, inclusive redistribuição
  pública e comercial quando aplicável.
- Hostname, DNS, TLS, headers, política de cache e configuração de segurança.
- Checks requeridos já existentes, gratuitos e validados; resultado ligado ao
  SHA exato do candidato.
- Ausência de segredos no bundle, no log, nos artefatos e em workflows de PR.
- Build reproduzível, suite de regressão, acessibilidade, smoke test, rollback
  e plano para indisponibilidade.
- Aprovação do owner para a Work Order específica de deploy. Esta decisão
  documental não atende esse gate.

## Verificações pós-deploy

Quando um deploy for autorizado, verificar SHA e deployment URL, HTTPS, rotas,
assets e metadados, headers, acessibilidade e estados de erro/vazio. Registrar
smoke tests, disponibilidade, console/browser errors, métricas de custo e quota
observadas, capacidade de rollback e responsável pela validação. Não habilitar
monitoramento ou armazenamento de dados pessoais sem a revisão da WO-006.

## Custos e limites

O plano operacional exigido é US$0. Os limites gratuitos são finitos. Nenhuma
integração, projeto, domínio, Worker, base, deploy ou upgrade foi criado nesta
WO; custo novo: US$0. O custo total da futura conta e das integrações
preexistentes não está comprovado, portanto implantação permanece bloqueada.

Se uma cota gratuita acabar, parar a função dependente, servir estado
indisponível ou aguardar reset dentro do mesmo plano, se compatível com os
termos. Não migrar para plano pago, não criar chave com cobrança variável e
não substituir a fonte por scraping.

## Fontes oficiais consultadas

Verificadas por HTTP GET em 2026-11-08:

- [Cloudflare Pages limits](https://developers.cloudflare.com/pages/platform/limits/)
  — HTTP 200; limites Free de builds, timeout, concorrência e quantidade de
  arquivos.
- [Cloudflare Pages Git integration](https://developers.cloudflare.com/pages/configuration/git-integration/)
  — HTTP 200; builds e previews associados ao Git; sem integração criada.
- [Cloudflare Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/)
  — HTTP 200; limites do plano Workers Free e mínimo mensal de US$5 do plano
  Workers Paid.
- [Cloudflare D1 pricing](https://developers.cloudflare.com/d1/platform/pricing/)
  — HTTP 200; quotas de leitura, escrita, storage e número de databases; D1 não
  selecionado.
- [GitHub Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions)
  — HTTP 200; runners padrão hospedados pelo GitHub são gratuitos em
  repositórios públicos; larger runners podem ser cobrados.

Revalidar limites e cobrança imediatamente antes de habilitar ou implantar
qualquer serviço. Nenhuma fonte do provedor prova a configuração real da conta
NexLabsTech.
