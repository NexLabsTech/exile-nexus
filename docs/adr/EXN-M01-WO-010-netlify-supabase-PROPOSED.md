# EXN-M01-WO-010 | ADR PROPOSED: Netlify + Supabase, Free-first with manual paid upgrade

- **Data da proposta:** 2026-11-22
- **Repositório:** NexLabsTech/exile-nexus
- **Work Order:** EXN-M01-WO-010 / issue #20 / PR #161 DRAFT
- **Estado:** PROPOSED, NOT ACCEPTED, NOT DEPLOYED
- **Risco:** HIGH_ASSURANCE para identidade, sessões e autorização privilegiada
- **Context Lock inicial:** main `9d575553c36658f80245c30f494d4a090983bc57`; PR anterior `c7f3844b91a65f2e06180ab959d97ffe7712860b`
- **Motivação do owner:** substituir Cloudflare por uma solução sem cobrança inicial e com upgrade futuro **somente sob aprovação explícita**.
- **Governança:** esta proposta não substitui checkpoint ou decisão canônica da main e não libera S01, novas contas, GitHub merge, secrets, build/deploy, OAuth real, dados pessoais ou cobrança.

## Decisão recomendada, ainda dependente de aceite específico

**Frontend:** preservar Astro 7.4.7 + React 19.3.1 islands e frontend pre-renderizado já aceito em EXN-DEC-0008, sem replatform antecipado.

**Hosting e BFF:** Netlify Free, com assets estáticos/CDN e Netlify Functions apenas nos endpoints protegidos futuros. `@astrojs/netlify` somente quando uma prova de compatibilidade/runtime e um Work Order autorizarem; para frontend puramente estático, o adapter não é requisito. Mesma origem para rotas públicas e BFF.

**Identidade e banco:** Supabase Free, com Supabase Auth e Google como provedor OAuth/OIDC inicialmente proposto; PostgreSQL como armazenamento de dados e sessões autoritativas. Manter interface de autenticação/armazenamento isolada por portas tipadas, sem acoplamento de domínio ao SDK.

**Limites claros:** o projeto continua `ANONYMOUS_ONLY`; não existe login real nem credenciais aprovadas. Não importar D1, Workers, Pages Functions, APIs Cloudflare ou migrações D1 para a nova proposta. O Cloudflare ADR de 2026-11-09 é registro histórico, e os trabalhos específicos dele ficam STALE até reconciliação.

### Comparação com alternativas

| Alternativa | Free -> upgrade | Adequação | Resultado |
| --- | --- | --- | --- |
| Netlify Free + Supabase Free | Ambos com opções pagas no mesmo provedor | Astro estático, Functions, DB/Auth; aceita uso comercial do plano Netlify Free | **Preferida, proposta** |
| Vercel Hobby + Supabase Free | Hobby -> Pro, Supabase Free -> Pro | Hobby é exclusivamente pessoal/não comercial; Exile Nexus pretende ser comercial | Não preferida como solução comercial gratuita |
| Netlify Free + banco/IdP próprio | Host gratuito, banco/autenticação custom | Mais superfície de segurança, recuperação e operação HIGH_ASSURANCE | Não priorizar |
| Cloudflare + D1 + Google OIDC | Free -> pago | Direção condicional anterior, removida da preferência por instrução posterior | Histórico apenas, sem execução |

## Verificação de limites públicos em 2026-11-22 (NÃO prova a situação da conta)

| Plataforma | Free de referência | Riscos e condições | Upgrade manual |
| --- | --- | --- | --- |
| Netlify | 300 créditos/mês e limite rígido; plano permite projetos comerciais; produções, tráfego, compute e requisições consomem créditos | Site pode pausar ao esgotar créditos; 15 créditos por deploy de produção; monitorar uso, build e requests. Sem recarga automática | Personal anunciado a partir de US$9/mês; Pro a partir de US$20/mês, valores e impostos sujeitos a read-back |
| Supabase | Até 2 projetos Free; banco 500 MB/projeto; 50 mil MAU; cotas de egress/serviços | Pode pausar com pouca atividade por 7 dias; limites de DB, egress, Auth, Functions e rate limits; sem garantia SLA | Pro anunciado a partir de US$25/mês; computação por projeto e excedentes podem gerar custos |

**Regra financeira:** obrigatório US$0 em Free, sem auto-upgrade, auto-recharge, provisionamento pago ou assunção de créditos. No Free, ao alcançar limites, preferir suspensão controlada/degradação segura e pedir autorização explícita. Na migração para planos pagos, exigir orçamento mensal aprovado, opções de spend cap, alertas, documentação de custo total (Netlify, Supabase, domínio, eventual Google OAuth e IA) e rollback. Netlify e Supabase são **duas** plataformas com planos/custos independentes.

**Fontes primárias consultadas:**
- https://www.netlify.com/pricing/
- https://www.netlify.com/platform/ (FAQ uso comercial Free)
- https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/
- https://docs.netlify.com/build/frameworks/framework-setup-guides/astro/
- https://supabase.com/pricing
- https://supabase.com/docs/guides/platform/billing-on-supabase
- https://supabase.com/docs/guides/platform/free-project-pausing
- https://supabase.com/docs/guides/auth/social-login/auth-google
- https://supabase.com/docs/guides/auth/sessions
- https://supabase.com/changelog.md

## Contratos de segurança e migração propostos

A arquitetura continuaria `modular monolith`, TypeScript strict, deny-by-default, sem exposição de tokens privilegiados no frontend. Somente BFF deve executar mutações de identidade privilegiadas, com segredos restritos a ambiente server-side. Supabase Auth verifica a identidade externa; um JWT validado não equivale a autorização durável nem a revogação imediata. Definir e provar um dos dois contratos antes de código vivo:
1. Sessões opacas próprias do BFF, alta entropia, hash em Postgres, revogação/rotação atômicas, privilégios do lado do servidor, cookies `__Host-` seguros; usar Supabase Auth somente como prova de identidade;
2. Sessões geridas pelo Supabase, com validação server-side, verificação de sessão/revogação em rotas sensíveis, expiração curta e prova sob concorrência, sem confiar em claims obsoletos.

Não combinar abordagens por acidente. Design final precisa de ADR e testes adversariais. Políticas Postgres: RLS deny-by-default em tabelas expostas, policies por `auth.uid() = user_id` quando acessíveis a membros, `USING` + `WITH CHECK` para UPDATE, evitar `SECURITY DEFINER` salvo revisão estrita em schema privado. Nenhuma autorização com `user_metadata`, email ou campo editável do navegador; `service_role` exclusivamente server-side. Rever alterações de exposição automática de tabelas da API Supabase em 2026.

`AUTH-01..AUTH-14` continuam exigíveis: OIDC PKCE/state/nonce/issuer/audience/assinatura/replay; renovação/revogação/logout; cookie/CSRF/Origin; RBAC/IDOR; limite global estrito/transacional para login, não apenas rate limiter aproximado; LGPD/retenção/exportação/exclusão; recuperação/restore; segurança de PR/CI; custo e regressão. Testes de concorrência Postgres e autorização sob indisponibilidade precisam falhar fechado. Supabase Auth não substitui todas essas obrigações.

## Gates de execução

- **G00 CONDITIONAL:** usuário solicitou remover Cloudflare, mas os fornecedores concretos Netlify/Supabase e a estratégia de sessão ainda requerem aceite operacional específico na mesma WO; registrar nova direção como PROPOSED, não como ADR canônico.
- **G01 BLOCKED:** contas Netlify e Supabase não consultadas; read-back do Free, limites, upgrade/overage, titularidade, funções, política do Google, domínio e OAuth pendentes. Não inventar assinatura ou faturamento.
- **G02 BLOCKED:** política LGPD, finalidades, consentimentos/base legal, retenção, exclusão, operadores e fluxos internacionais sem aprovação.
- **G03 BLOCKED:** ambiente isolado de integração e credenciais de desenvolvimento ainda sem autorização/prova; fixtures sintéticas locais permitidas apenas no escopo existente.
- **G04 NOT_RUN:** provas AUTH-01..14 no runtime escolhido e auditoria HIGH_ASSURANCE sem defeitos HIGH/CRITICAL.
- **R01–R14:** direitos de APIs/economia PoE2, assets e monetização permanecem independentes e não liberados.
- **S01:** não executar antes dos gates; continuar estritamente na PR #161 da issue #20.

## Condição de saída

PR #161 permanece Draft, ANONYMOUS_ONLY, sem backend habilitado, sem deploy, sem PR nova, sem merge, sem gasto e sem novos dados/ativos de jogo. Após decisões e provas aprovadas, atualizar o pré-voo `apps/web/src/data/auth-zero-cost-preflight.json` e seus testes, que **ainda descrevem Cloudflare**: são registro histórico STALE_PROVIDER e NÃO podem ser tratados como validação do novo stack. Não os mudar silenciosamente nem enfraquecer o bloqueio.
