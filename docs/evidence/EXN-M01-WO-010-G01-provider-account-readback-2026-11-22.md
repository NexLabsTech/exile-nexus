# EXN-M01-WO-010 · G01 Provider/account read-back (2026-11-22)

- **Work Order:** EXN-M01-WO-010 / issue #20; **exclusivamente G01**; risco HIGH_ASSURANCE por dependência de identidade.
- **PR/branch:** [#161 Draft](https://github.com/NexLabsTech/exile-nexus/pull/161), `exn-m01-wo-010-identity-security-contracts`.
- **Estado do gate:** **PARTIAL_EVIDENCE / BLOCKED**, sem permissão para S01 ou produção.
- **BASE main verificada:** `9d575553c36658f80245c30f494d4a090983bc57`.
- **PR HEAD antes do read-back documental:** `defdac2f8360aafe3aea158705028113f5131e54`.
- **HEAD com o relatório:** confirmar por read-back pós-commit na PR; não gravar SHA autorreferente neste arquivo.
- **Restrição:** US$0 obrigatório; não criar, reativar, modificar contas, recursos, projetos, segredos, OAuth, domínio, deploy, merge, billing ou checkpoint.
- **Privacidade de evidência:** IDs de organização/projeto, e-mail, informações de outros aplicativos, chaves e demais metadados não necessários **não serão publicados no repositório público**. A leitura foi feita por conexão legitimamente autenticada, não por afirmação do usuário.

## 1. Source Check e Context Lock

| Fonte crítica | SHA de blob no HEAD anterior |
| --- | --- |
| `docs/checkpoint.md` | `ffb23d2a48d8f5a7dfc5a2de23af981d9fdc2ad8` |
| `docs/decisions-ledger.md` | `a988f0aafad008e4c52339c1aeb6c8729d0afc0d` |
| `docs/scope.md` | `86ec944036f007300fff4057e3cdf18755a4d463` |
| `docs/definition-of-done.md` | `536d254f7e35fff4fc46d7175ea877e4086b0174` |
| `docs/architecture.md` | `649767db871b011ecb8ba31189dd9a565582cfa5` |
| `docs/requirements.md` | `14a8766f3a9a5431822b59b18441d9fd0edb548d` |
| `apps/web/src/data/auth-zero-cost-preflight.json` | `775a919ad5c0bef991c253277b1b464eef2d7320` |

`EXN-DEC-0012` ratificou **direção** Netlify Free + Supabase Free, sem ratificar conta concreta, domínio, sessões, custo real, novo serviço ou deployment. `ANONYMOUS_ONLY`, `PREVIEW_ONLY`, direitos R01–R14 e HARD US$0 permanecem vigentes. O preflight v2 já foi tecnicamente testado no HEAD precedente; continua `PUBLIC_REFERENCE_ONLY` e bloqueado.

## 2. Read-back real, somente leitura

| Exigência G01 | Origem / observação verificável | Estado |
| --- | --- | --- |
| Supabase organização acessível | Supabase connector `list_organizations` confirmou 1 organização acessível no contexto conectado | **OBSERVED** |
| Supabase plano da organização | Supabase connector `get_organization` retornou `plan: "free"` e `tier: "tier_free"` | **VERIFIED: organization Free**, não equivale a faturamento US$0 |
| Supabase projetos e capacidade observável | `list_projects`: 13 entradas, **1 ACTIVE_HEALTHY** e **12 INACTIVE** na organização conectada | **OBSERVED**, não inferir exclusividade do usuário, espaço disponível nem billing |
| Projeto antigo homônimo de PoE2 | `get_project` confirmou projeto inativo com nome relacionado a PoE2 e pertencente à organização; vinculação ao Exile Nexus atual **não comprovada** | **NOT_BOUND**; não reativar nem usar |
| Faturamento, métodos de pagamento, invoices e excedentes Supabase | Ferramentas disponíveis não expõem essas propriedades em `get_organization`; nenhum endpoint de billing específico acessível à conexão nesta verificação | **NOT_VERIFIED** |
| Uso de quotas da organização e elegibilidade para projeto novo | Contagem de projetos não demonstra CPU, disk, Auth MAU, egress, invoices, orgs de outros proprietários ou possibilidade real de criar sem custo | **NOT_VERIFIED** |
| Conta e plano Netlify | Nenhuma ferramenta/conta Netlify autenticada disponível; a busca por integração Netlify não retornou plugin e navegador conectado indisponível nesta sessão | **NOT_VERIFIED** |
| Netlify crédito consumido/disponível e ciclo da conta | Não disponível sem Team dashboard `Usage & billing`; não estimar US$0 a partir de limites públicos | **NOT_VERIFIED** |
| Netlify opção de cobrança, recarga e eventual plano legado | Netlify Free credit-based publica hard limit sem auto recharge, mas plano real pode ser legado e precisa de read-back | **NOT_VERIFIED** |
| Domínio de produção, propriedade e ambiente OAuth | Nenhum painel de domínio, Google OAuth consent/branding, Redirect URIs ou Supabase Auth URLs foi consultado; sem login ou segredos | **NOT_VERIFIED** |

Nota de escopo: nenhuma leitura de tabelas, usuários, chaves, conteúdo privado ou configurações de terceiros foi necessária. Não tentar `get_cost` como substituto: uma cotação para criar projeto não confirma faturamento atual e poderia induzir falsa elegibilidade.

## 3. Referências oficiais atualizadas, não provas da conta

**Netlify:** a documentação de planos credit-based publicada em 2026 estabelece **300 créditos por mês no Free, hard limit e sem compra de créditos/recarga automática no Free**; o ciclo e saldo precisam ser lidos na equipe real. No esgotamento, os projetos da equipe podem pausar, inclusive outros sites da mesma equipe. Planos anteriores a 2025-09-04 podem ser `Legacy`, portanto uma conta existente não deve ser classificada a partir da página comercial.
- https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/
- https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/billing-faq-for-credit-based-plans/

**Supabase:** referência oficial Free: dois projetos **ativos** elegíveis no conjunto de organizações em que o titular é Owner/Admin; pausados não contam, mas o limite de conta depende de outros vínculos. Quotas de referência: **500 MB DB por projeto, 50.000 MAU/mês, 5 GB egress, 1 GB storage, 500.000 invocações Edge Functions**. A associação dessas cotas ao projeto real e o consumo permanecem não verificados.
- https://supabase.com/docs/guides/platform/billing-on-supabase
- https://supabase.com/pricing
- https://supabase.com/changelog.md

**Google OAuth e Supabase:** para Sign in with Google, o Google exige cliente OAuth, origens HTTPS e redirect URIs explicitamente autorizadas; Supabase exige callback do projeto no Google e `SITE_URL` / `redirectTo` em allowlist. Para produção Google pede homepage pública em domínio verificado, política de privacidade, branding/possível revisão de marca, termos conforme aplicável, scopes mínimos e domínios autorizados. Supabase recomenda domínio próprio para confiança de marca, mas a viabilidade técnica/legal das URLs compartilhadas precisa ser comprovada, não inferida. Nenhum domínio ou projeto Google foi validado.
- https://supabase.com/docs/guides/auth/social-sign-in/auth-google
- https://supabase.com/docs/guides/auth/redirect-urls
- https://developers.google.com/identity/verification/authentication-policy-compliance
- https://developers.google.com/identity/protocols/oauth2/policies

**Changelog relevante consultado:** Supabase 2026-11-16 exige token com permissão especial para merge de branches; CLI v3 usa local como padrão (2026-11-04), e adapters de `@supabase/server` para certos frameworks estão sendo descontinuados (2026-10-05). Nenhuma ferramenta de branch, CLI, banco ou Auth foi invocada nesta rodada G01.
- https://supabase.com/changelog.md

## 4. Critérios de saída restantes, sem atalhos

| Prova exigida antes de declarar G01 CLEARED | Estado |
| --- | --- |
| Captura read-only de conta Netlify real, plano Free/Legacy, Team Owner, ciclo, saldo, credits remaining, cobranças e configurações de recarga/upgrade | **BLOCKED** |
| Extrato de billing Supabase da organização conectada: plano Free, invoices, status de cobrança, limites/usage de DB/MAU/egress e elegibilidade sem taxa | **BLOCKED** |
| Associação inequívoca e autorizada do projeto Supabase ao Exile Nexus, sem reutilizar projeto homônimo só por nome | **BLOCKED** |
| Evidência de domínio HTTPS selecionado, titularidade/verificação e adequação ao Google OAuth, sem configuração de credentials | **BLOCKED** |
| Evidência da política Google OAuth/consent, origens e callback no estágio apropriado, requisitos de marca/privacidade e custo do domínio | **BLOCKED** |
| Reconciliação final US$0 e validação de upgrade SOMENTE manual, sem hidden overages | **BLOCKED** |

A conclusão de G01 **não** habilitaria automaticamente G02/G03/G04, S01 ou a issue #21.

## 5. Evidência de regressão, auditoria pt-BR e veredito

Antes deste delta G01, no SHA `defdac2f8360aafe3aea158705028113f5131e54`, os **8/8 workflows** do GitHub passaram: Docs #45052228149, English #45052228027, SEO #45052227999, Quality #45052228116, Identity #45052228044, Responsive #45052227993, Accessibility #45052228023, Lighthouse #45052227964. O gate de identidade registrou **71/71 unitários e 4/4 Playwright PASS**. O `npm audit --audit-level=high` PASS exibiu **7 avisos MODERATE transitivos preexistentes**. A auditoria acima é da evidência *anterior*; os novos checks desta alteração documental exigem novo read-back no HEAD final.

**Escopo deste delta:** documento de read-back e reconciliação documental estritamente de G01. **Sem alteração** de código, `auth-zero-cost-preflight.json`, testes, configs de deploy, secrets, runtime, conta externa, banco, OAuth, `main` ou checkpoint aceito.

**Veredito preliminar:** **APPROVED somente para a veracidade da evidência parcial lida em Supabase e documentação oficial**; **G01 = PARTIAL_EVIDENCE / BLOCKED** por falta de account read-back completo. Não declarar Verified/Ready onde faltam plan/billing/quotas reais. Revisão de coordenação em pt-BR, não auditoria independente por terceiro; metodologia e limitação explicitadas.

**Checkpoint Delta PROPOSTO (NÃO PROMOVIDO):** o G01 da PR #161 verificou plano Free de uma organização Supabase conectada, sem provar billing, quota e vinculação ao Exile Nexus; Netlify e Google OAuth/domínio permanecem sem read-back. Manter a PR Draft, issue #20 OPEN/BLOCKED, `main` imutável e nenhum avanço de WO.

**STOP:** nenhuma conta, credencial, provedor OAuth, recurso externo, DNS, deploy, indexação, merge, cobrança, sessão ou autorização funcional criada/alterada. 
