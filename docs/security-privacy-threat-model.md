# Modelo de ameaças, privacidade e abuso

- **Owner:** NexLabsTech
- **Status:** PROPOSED
- **Revisão:** 2026-11-08
- **Work Order:** EXN-M00-WO-006 · Issue #7
- **Repositório analisado:** `NexLabsTech/exile-nexus`
- **Versão analisada:** `2b98db725c883dd9bbef3b080673d0b5b07036ab` (base imutável desta WO)

## Objetivo e limites

Este modelo descreve os ativos, atores, limites de confiança e falhas de
segurança relevantes para o estado documental atual e para os próximos passos
já previstos no Source Pack. Ele separa fatos do repositório de riscos de uma
aplicação futura. Uma hipótese futura não é apresentada como vulnerabilidade
observada.

No SHA analisado, o repositório contém somente documentação: não há código de
aplicação, dependências/lockfiles, workflow, endpoint, banco, conta de usuário,
dado pessoal coletado ou implantação. Não há credencial de produção autorizada
ou necessária. A API de administração conectada não permite verificar várias
configurações; por isso este documento não afirma que os controles da conta
estejam ligados ou desligados.

## Regras de segurança aplicáveis

- Custo financeiro obrigatório: **US$ 0**. Não fazer upgrade, ativar serviço
  pago nem tornar SaaS com cota de análise um gate.
- Usar menor privilégio e configuração deny-by-default. Código de PR é não
  confiável; não entregar segredos ou tokens de deploy a jobs que o executem.
- Não fazer ingestão, persistência, redistribuição, scraping, importação de
  árvore passiva ou monetização enquanto a fonte e a finalidade não estiverem
  autorizadas pela matriz R01–R14.
- Não introduzir coleta de dados pessoais sem finalidade, base legal, aviso,
  retenção e processo de atendimento definidos em Work Order própria.
- Nenhuma configuração ou credencial de produção é criada nesta WO.

As regras de custo e direitos constam também em
[Decisions Ledger](decisions-ledger.md) e na
[matriz de direitos](rights-and-data-sources.md). O plano de implantação não é
autorização para criar recursos.

## Ativos e limites de confiança

| Ativo | Estado atual | Impacto se comprometido |
| --- | --- | --- |
| Conteúdo, commits, branches e PRs | Repositório público; integridade da `main` depende de settings não verificáveis nesta sessão. | Alteração não autorizada, conteúdo enganoso ou código malicioso em release futuro. |
| Configurações do repositório e da conta | NexLabsTech tem papel `admin` no repo; integração gerenciada não tem acesso de administração à API. | Proteções, automações e recursos de segurança podem não refletir a política documentada. |
| Direitos, proveniência e atribuição | Matriz R01–R14 integrada; nenhuma autorização geral de dados foi concedida. | Uso indevido de conteúdo, dados ou marca e remoção forçada do produto. |
| Segredos e tokens | Nenhum segredo de produção foi criado ou identificado nesta WO; segredo scanning e push protection do repositório não foram verificados. | Acesso não autorizado a GitHub, provedores ou dados futuros. |
| Dados pessoais de usuários | Nenhuma aplicação, conta, analytics, telemetria ou armazenamento de usuário existe no baseline. | Exposição, uso incompatível, retenção excessiva ou violação de direitos de titulares. |
| Orçamento e quotas | US$ 0 é requisito; faturamento total de apps e planos da conta não está visível. | Cobrança inesperada ou indisponibilidade ao atingir limite gratuito. |
| Dados e integrações futuras | APIs, conteúdo, fontes econômicas, árvore e banco não selecionados nem autorizados. | Conteúdo incorreto, exposição de dados, abuso de terceiros ou custos. |

**Limites de confiança previstos:** contribuidores e código de PR → GitHub;
workflow → token `GITHUB_TOKEN` e artefatos; aplicação futura → navegador; adapter
futuro → provedor externo; repositório → hospedagem. Os últimos três limites não
estão ativos. Em especial, nenhum fluxo de execução ou dado do produto existe
para testar hoje.

## Atores e capacidades consideradas

- Contribuidor externo pode propor conteúdo malicioso em branch/PR e controlar
  entradas que uma automação de PR venha a processar.
- Dependência ou ação de terceiros pode ser comprometida, abandonada ou mudar
  de comportamento entre versões.
- Atacante remoto futuro pode enviar entradas malformadas, abusar de limites,
  tentar injeção de script ou automatizar requisições a uma interface pública.
- Provedor externo pode ficar indisponível, alterar termos, retornar dados
  manipulados ou cobrar pelo uso.
- Pessoa com credencial roubada pode alterar settings, branch ou um futuro
  ambiente de deploy.
- Usuário pode fornecer conteúdo de build que tente explorar renderização,
  persistência ou limites de recursos quando essas funções existirem.

O modelo não presume acesso interno, perfil de atacante ou contrato de API que
ainda não foi confirmado.

## Registro de ameaças

Severidade representa o impacto potencial se o caminho existir; estado informa
se há exposição ativa demonstrada nesta versão.

| ID | Caminho e consequência | Severidade potencial | Estado/evidência | Controles e gate |
| --- | --- | --- | --- | --- |
| TM-01 | Código de PR executa em workflow com token ou segredo e o exfiltra. | CRITICAL | **FUTURO / NÃO APLICÁVEL**: zero workflows, sem segredos de produção observados. | Workflows de PR sem segredos; `contents: read` por padrão; permissão adicional somente no job que precisa; nunca executar código não confiável em `pull_request_target`; fixar Actions por SHA auditado. Validar em WO-007 antes de exigir check. |
| TM-02 | Fonte, arte ou dados de jogo são ingeridos ou reexibidos sem direito para a finalidade. | HIGH | **BLOQUEADO**: R01–R14 não liberam ingestão, árvore, economia ou monetização. | Adapter falha fechado por estado de direito; atribuição e proveniência por fonte; nenhuma integração ou fixture copiada de jogo até autorização. |
| TM-03 | Dependência ou Action comprometida altera build, coleta segredo ou introduz código malicioso. | HIGH | **FUTURO / NÃO APLICÁVEL**: não há manifestos, lockfiles ou workflows. | Dependências mínimas e lockfile; revisão de mudanças; Dependabot e Dependency Review onde elegíveis; versões de Actions fixadas em SHAs; scanner local gratuito antes de gate. |
| TM-04 | Chave ou token real é incluído em documentação, commit, log ou bundle público. | HIGH | **CONFIGURAÇÃO NÃO VERIFICADA**; busca heurística desta WO descrita no Evidence Bundle; ferramenta dedicada `gitleaks`/`trufflehog` não está instalada. | Não inserir credenciais de produção; exemplo deve usar placeholder visível; secret scanning e push protection do repositório precisam de leitura administrativa; rotacionar segredo real caso exposto e interromper merge/deploy. |
| TM-05 | Identificador, conta, histórico de sessão ou telemetria futura expõe dados pessoais. | HIGH | **FUTURO / NÃO APLICÁVEL**: não há coleta ou armazenamento no repositório. | Minimização; ausência de conta e analytics por padrão; finalidade, base legal, aviso, retenção, exportação/exclusão e controles de acesso antes de coletar; revisão de privacidade dedicada. |
| TM-06 | Entrada futura causa XSS, injeção, navegação externa maliciosa ou acesso indevido a rede interna por adapter. | HIGH | **FUTURO / NÃO APLICÁVEL**: sem UI, URL fetcher ou API. | Escapar texto; sanitizar conteúdo renderizado; allowlist de destinos e esquemas; bloquear rede privada/redirects em fetch futuro; timeout, limite de tamanho e schema validation; testes de abuso. |
| TM-07 | Tráfego automatizado ou integração sem limites consome quota ou gera cobrança. | HIGH | **FUTURO / NÃO APLICÁVEL**: nenhuma API, serviço ou projeto conectado. | Teto financeiro US$ 0; rate limit, cache e orçamento por fonte; timeout e circuit breaker; desabilitar função ao atingir cota; nunca trocar para plano pago automaticamente. Conta e faturamento preexistente permanecem NOT VERIFIED. |
| TM-08 | Conteúdo ou preço falsificado leva a recomendação incorreta ou decisão econômica. | HIGH | **BLOQUEADO**: nenhuma fonte de preço está autorizada; não há dado ao vivo. | Proveniência, instante de observação, patch/league quando relevante, estado de frescor e atribuição; não mostrar dado como atual se stale; não inventar estatísticas ou preço. |
| TM-09 | Recomendação futura de IA apresenta hipótese como cálculo ou usa dados sem autorização. | MEDIUM | **FUTURO / NÃO APLICÁVEL**: fornecedor e funcionalidade não existem. | Cálculo determinístico fora do modelo; origem e limites explicáveis; saída identificada como hipótese; sem prompt com credenciais ou dados pessoais; custo zero validado antes da Work Order. |
| TM-10 | `main` é alterada sem PR, force-push ou check válido; credencial comprometida enfraquece os gates. | HIGH | **NOT VERIFIED**: leitura de `/branches/main/protection` falhou com 403; lista de rulesets visíveis retornou `[]`. | Proteção de branch, PR, squash-only, histórico linear, checks existentes e force-push/exclusão bloqueados; sem bypass permanente; alterações em settings só pela WO correta com read-back. |
| TM-11 | Árvore passiva ou outro conteúdo protegido é copiado de fonte não autorizada. | HIGH | **BLOQUEADO**: a matriz não autoriza importação nem redistribuição da árvore. | Não baixar, guardar, transformar ou publicar dados; aceitar somente estrutura/fixtures sintéticas e algoritmos com direitos revisados. |
| TM-12 | Usuário abusa de cálculo/importação futura para consumir CPU, memória, chamadas ou storage. | MEDIUM | **FUTURO / NÃO APLICÁVEL**: nenhuma ferramenta funcional existe. | Limitar payload, tamanho de grafo, pontos, frequência e concorrência; computação determinística local quando possível; tratar cancelamento e estados de falha; monitorar sem coletar dados desnecessários. |

Nenhuma linha classificada como futura é uma falha de produção observada. No
estado atual, o maior bloqueio de governança é que as proteções administrativas
e settings de segurança não podem ser lidos pela conexão disponível.

## Vocabulário dos estados

- `VERIFIED`: observado diretamente nesta revisão, com evidência atual.
- `NOT VERIFIED`: a consulta não foi possível ou não produziu evidência suficiente.
- `NOT APPLICABLE`: o artefato necessário para executar a verificação não existe.
- `BLOCKED`: a ação depende de condição ou autorização ainda não satisfeita.


## Controles nativos: elegibilidade e estado verificado

| Controle | Elegibilidade documentada para repo público | Configuração/execução neste repositório | Estado da WO-006 |
| --- | --- | --- | --- |
| CodeQL / Code Scanning | A documentação GitHub diz que Code Scanning está disponível para repositórios públicos no GitHub.com. | Configuração não lida; zero código para análise. | setting **NOT VERIFIED**; análise **NOT APPLICABLE** até haver código suportado. |
| Dependabot Alerts | Disponibilidade documentada para repositórios de usuário e organização; repositório público. | Baseline WO-001 registrou mensagem explícita da API “disabled for this repository”. Leitura atual voltou 403. | estado anterior **DESATIVADO**, estado atual **NOT VERIFIED**. |
| Dependabot Security Updates | Recurso nativo de atualização de dependências; o plano público deve ser reconfirmado antes de configurar. | Leitura atual de settings não permitida; sem manifestos/lockfiles. | setting **NOT VERIFIED**; atualizações **NOT APPLICABLE** sem dependências. |
| Secret Scanning | GitHub documenta que secret scanning roda automaticamente e sem custo em repositórios públicos. | Settings/alertas do repo não foram consultáveis nesta conexão. | **NOT VERIFIED**; nenhum alerta foi consultado. |
| Push Protection | GitHub documenta proteção de usuário contra push de segredos a repositórios públicos; isso não prova o setting nem alertas de proteção em nível de repositório. | Leitura da configuração do repo não permitida. | proteção do repo **NOT VERIFIED**. |
| Dependency Review | A ação oficial `dependency-review-action` está disponível para repositórios públicos. | Sem manifesto, dependências ou workflow a executar. | **NOT APPLICABLE** nesta WO; a configuração/ação fica para WO-007 quando houver insumo. |
| Permissões do GitHub Actions | Workflows podem limitar `GITHUB_TOKEN` com `permissions`. | Zero workflows; endpoint administrativo não acessível. | permissões globais **NOT VERIFIED**; mínimo por workflow será definido e validado na WO-007. |
| Branch protection / rulesets | Recursos de governança da plataforma; custo/eligibilidade do settings da conta não inferido. | `/branches/main/protection` 403; lista acessível de rulesets `[]`. | proteção efetiva de `main` **NOT VERIFIED**. |

`NOT VERIFIED` quer dizer que não foi possível confirmar configuração atual.
Não significa desligado. `NOT APPLICABLE` limita-se à ausência do código ou
manifesto necessário para executar uma análise; não confirma settings. Para
detalhes de API e identidade, ver [Evidence Bundle desta WO](evidence/EXN-M00-WO-006-security-review-2026-11-08.md).

## Privacidade e dados

Não há aplicativo ou serviço processando dados de usuários nesta versão. Não
adicionar cadastro, perfil, identificadores, cookies não essenciais, analytics,
telemetria ou histórico associado a uma pessoa como parte desta fundação.

Se uma Work Order funcional precisar de dados pessoais, ela deverá declarar
finalidade, necessidade, base legal e transparência, categorias de dados,
retention/deletion, acesso, compartilhamento com terceiros, incidentes e
controles técnicos proporcionais antes de implementar coleta. Dados de
personagens, contas, builds importadas, identificadores ou histórico também
podem revelar uma pessoa e devem ser tratados como potencialmente pessoais.
O armazenamento local no navegador reduz o envio ao servidor, mas não elimina
necessidade de explicar exportação, retenção e risco em dispositivo compartilhado.

## Critérios de parada e resposta

Interromper o incremento afetado e manter a função desabilitada quando ocorrer:

1. Segredo real identificado ou suspeita de exposição: impedir merge/deploy,
   não copiar o valor para issues/logs, restringir acesso, revogar/rotacionar a
   credencial pelo owner e revisar alcance e histórico por processo autorizado.
2. Direitos de uma fonte ou finalidade pendentes: não buscar nem publicar o
   dado; remover o adapter/dado e usar fixture sintética permitida.
3. Achado HIGH/CRITICAL reproduzível, teste de segurança obrigatório falhando,
   ou contorno de proteção: corrigir na mesma WO/PR; não liberar por bypass.
4. Recurso requer plano pago, análise cobrada ou upgrade: não ativar; bloquear
   somente a função dependente e buscar alternativa local com direito comprovado.
5. Proteção, permissão ou configuração administrativa essencial não verificável:
   registrar endpoint, identidade/conexão e permissão exigida; não declarar
   controle ativo. Bloquear mudança dependente e deploy até read-back.
6. Indício de incidente em ambiente futuro: suspender credencial/integração
   afetada, preservar logs mínimos, limitar exposição e só retomar após
   contenção, causa e validação documentadas em Work Order própria.

## Referências oficiais consultadas

Consulta HTTP GET em 2026-11-08; a elegibilidade documentada não comprova que a
opção esteja ativada nem define o custo total da conta NexLabsTech.

- [GitHub CodeQL Code Scanning](https://docs.github.com/en/code-security/concepts/code-scanning/codeql/codeql-code-scanning) — HTTP 200; disponível para repositórios públicos no GitHub.com.
- [GitHub Secret Scanning](https://docs.github.com/en/code-security/concepts/secret-security/secret-scanning) — HTTP 200; execução gratuita em repositórios públicos.
- [GitHub Push Protection](https://docs.github.com/en/code-security/concepts/secret-security/push-protection) — HTTP 200; descreve a proteção de usuário para push a repositórios públicos e separa seu alcance do setting de proteção do repositório.
- [GitHub Dependabot Alerts](https://docs.github.com/en/code-security/concepts/supply-chain-security/dependabot-alerts) — HTTP 200; disponibilidade para repositórios de usuário e organização.
- [GitHub Dependabot Security Updates](https://docs.github.com/en/code-security/concepts/supply-chain-security/dependabot-security-updates) — HTTP 200; documentação do recurso de atualização.
- [GitHub Dependency Review](https://docs.github.com/en/code-security/supply-chain-security/understanding-your-software-supply-chain/about-dependency-review) — HTTP 200; action disponível em repositórios públicos.
- [Permissões automáticas do `GITHUB_TOKEN`](https://docs.github.com/en/actions/security-for-github-actions/security-guides/automatic-token-authentication) — HTTP 200; recomenda conceder o menor acesso necessário e permite permissões por job.
- [GitHub Branch Protection API](https://docs.github.com/en/rest/branches/branch-protection#get-branch-protection) — referência do endpoint que retorna 403 nesta conexão.

## Repositório e versão

Repository: NexLabsTech/exile-nexus
Version: 2b98db725c883dd9bbef3b080673d0b5b07036ab
