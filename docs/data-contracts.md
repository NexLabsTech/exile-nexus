# Data Contracts Baseline

- **Owner:** NexLabsTech
- **Status:** PROPOSED
- **Revisão:** 2026-11-08
- **Work Order:** EXN-M00-WO-005 · Issue #6

## Finalidade e estado

Este é um contrato conceitual versionado para implementação futura. Não contém
código executável, endpoint ativo, credencial ou dado de jogo copiado. A forma
concreta em TypeScript e qualquer biblioteca de validação serão escolhidas em
uma Work Order de implementação.

Use termos consistentes com a matriz R01–R14. Nenhum contrato concede direito
de chamada, cópia, retenção, exibição ou redistribuição.

## Vocabulário de autorização

| Estado da fonte | Pode chamar o adapter? | Pode persistir/exibir? | Regra |
| --- | --- | --- | --- |
| AUTORIZADO | Sim, somente para finalidade, conteúdo, frequência, território e atribuição documentados. | Somente operações que a evidência de licença autorizar. | Verificar evidência vigente em cada uso; não ampliar o escopo por inferência. |
| CONDICIONADO | Não enquanto a condição não estiver satisfeita e comprovada. | Não. | Falhar fechado e registrar o gate pendente. |
| NÃO VERIFICADO | Não. | Não. | Tratar como sem permissão operacional. |
| PROIBIDO | Não. | Não. | Bloqueio definitivo até nova autorização explícita e Work Order que reavalie a fonte. |

O estado sozinho não basta: finalidade, redistribuição, armazenamento, uso
comercial, atribuição, território, expiração e limites precisam cobrir a operação
solicitada. A matriz de direitos e evidências primárias são a autoridade da
decisão; este contrato não as substitui.

## Envelope de dado externo

Cada resultado externo deve ser representado conceitualmente por:

| Campo | Tipo lógico | Obrigatório | Semântica |
| --- | --- | --- | --- |
| schema_version | Identificador de versão semântica do contrato | Sim | Permite validar, migrar ou rejeitar versões incompatíveis. |
| source_id | Namespace estável cadastrado no repositório | Sim | Identifica provedor, produto e superfície documentada. |
| source_record_id | Identificador da origem ou nulo | Sim | Não inventar um identificador quando a origem não fornecer. |
| source_url | URL pública previamente allowlisted ou nula | Sim | Nunca aceitar destino de rede arbitrário vindo do usuário. |
| source_version | Versão, patch ou revisão da origem; pode ser nulo | Sim | Não inferir versão mais recente. |
| observed_at | Timestamp da observação na origem ou nulo | Sim | Não confundir hora de consulta com hora observada. |
| fetched_at | Timestamp UTC da obtenção | Sim | Registrar quando o adapter recebeu o payload. |
| game_patch | Identificador exato ou nulo | Sim | Não converter formato ou selecionar “atual” sem fonte. |
| league | Identificador exato ou nulo | Sim | Manter o namespace e a temporada fornecidos pela fonte. |
| attribution | Texto/link exigido pela licença ou nulo | Sim | Nulo só é válido quando a evidência disser que atribuição não se aplica. |
| license_evidence_id | Referência a registro interno de evidência ou nulo | Sim | Necessário para passar o rights gate; nulo bloqueia operação. |
| rights_status | AUTORIZADO, CONDICIONADO, NÃO VERIFICADO ou PROIBIDO | Sim | Conferido antes da chamada e antes de publicar dado. |
| permitted_purposes | Conjunto explícito de finalidades | Sim | Sem correspondência com a ação, negar. |
| cache_policy | NO_STORE, MEMORY_ONLY ou PERSISTENCE_ALLOWED | Sim | A evidência da fonte precisa permitir a política selecionada. |
| freshness_until | Timestamp limite ou nulo | Sim | Aplicação futura deve tratar dado vencido como STALE. |
| payload | Tipo de domínio versionado | Sim | Validar tamanho, esquema, unidades e campos permitidos. |

Campos nulos são explícitos e preservam a incerteza. Não preencher patch,
league, licença, observação ou atribuição com valores presumidos.

## Tipos de domínio

| Contrato | Campos mínimos | Restrições |
| --- | --- | --- |
| SourceRegistration | source_id, proprietário identificado, URLs allowlisted, superfície publicada, rights status, evidência, finalidades, limites, atribuição e revisão | Sem operador ou licença verificável, permanece NÃO VERIFICADO. |
| SourceObservation genérico | Envelope versionado, payload tipado e resultado de validação | Payload só pode ser criado após o gate de fonte e operação. |
| GameVersionRef | game_id, patch, league, observed_at | Patch e league podem ser nulos quando a fonte não fornece; não misturar eras. |
| UserInput | user_id pseudônimo quando indispensável, finalidade, conteúdo mínimo, created_at e retenção | Privacidade, consentimento e retenção dependem da WO-006. |
| Fixture sintética genérica | fixture_id, schema_version, payload, synthetic=true, descrição de geração | Não pode conter texto, número, nome, ícone ou geometria protegida copiada; UI nunca apresenta fixture como dado atual. |
| Resultado de cálculo genérico | input_version, algorithm_version, result, units, warnings, calculated_at e referências de entrada | Deve ser determinístico ou documentar a fonte de variação. Registrar incerteza e arredondamento. |
| Recommendation | texto, referências de evidência, regras usadas, versão do modelo se aplicável e limitações | Texto gerado não substitui regras, autorização ou cálculo determinístico; nenhum provedor foi escolhido. |

Valores que representam moedas, quantidades ou pontos devem ter unidades
explícitas e limites validados. Evitar ponto flutuante binário em cálculos
financeiros; usar inteiro na menor unidade definida ou decimal exato em contrato
futuro. Identificadores externos são namespaced por fonte; não assumir que IDs
iguais em provedores diferentes são a mesma entidade.

## Adapter e resultado esperado

Um adapter futuro recebe uma requisição tipada, contexto de finalidade,
timeout, identificador de trace não pessoal e registro imutável da fonte. A
aplicação verifica o gate antes de chamar. Adapter não escolhe novas URLs, não
segue endpoint interno e não altera rights status.

O adapter devolve um de:

- SUCCESS: payload validado e envelope completo.
- BLOCKED_RIGHTS: finalidade, fonte, permissão ou expiração não passou.
- UNAVAILABLE: timeout, falha de rede ou provedor fora do ar.
- RATE_LIMITED: limite do provedor atingido, com retry-after quando publicado.
- INVALID_SOURCE_DATA: esquema, unidade, tamanho, versão ou proveniência
  inválidos.
- STALE: dado expirou ou falta frescor exigido pelo produto.
- NOT_CONFIGURED: adapter ou credencial legítima ausente.

Resultados de erro não contêm payload parcialmente autorizado. Não repetir
requisição sem limite, não fazer fallback para scraping e não converter falha
em dado simulado sem rotular a fonte sintética.

## Cache, retenção e compatibilidade

Cache é uma forma de armazenamento e precisa estar autorizada. Política padrão
é NO_STORE até haver evidência de direitos que permita outra política. MEMORY_ONLY
também exige prazo e limites definidos. Persistência de conteúdo externo exige
finalidade, prazo de retenção, expiração e mecanismo de remoção.

Versionar mudanças incompatíveis com um novo schema_version. Conversões devem
ser explícitas, testadas e rastreáveis. Rejeitar payload desconhecido em vez de
silenciosamente descartar campo de licença, proveniência ou segurança. Migração
de dados exige plano e rollback em Work Order própria.

## Testes de contrato planejados

Antes de uma integração, testar:

- Bloqueio por status CONDICIONADO, NÃO VERIFICADO, PROIBIDO, revogado ou
  expirado.
- Rejeição sem licença, finalidade, atribuição ou proveniência exigida.
- Preservação de patch, league e timestamps sem inferência.
- Rejeição de URL fora da allowlist, corpo excessivo, formato inválido e
  conteúdo malformado.
- Comportamento de timeout, erro, rate limit, staleness e indisponibilidade.
- Separação e rótulo de fixtures sintéticas.
- Compatibilidade de versões, migração e estabilidade de cálculos.

Os testes são planos futuros, não executados nesta Work Order. O contrato
detalha FR-DATA-001 a FR-DATA-003, NFR-RIGHTS-001 e os domínios definidos em
[Architecture](architecture.md).
