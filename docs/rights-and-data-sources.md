# EXN-M00-WO-003 — Rights, attribution and API usage matrix

- **Owner:** NexLabsTech
- **Status:** PROPOSED / LEGAL REVIEW REQUIRED
- **Revisão:** 2026-11-08
- **Work Order:** EXN-M00-WO-003 · Issue #4
- **Base verificada:** 5cf7ab69d8a2b80b245cd64966d9d40f13a8c8e1
- **Finalidade:** inventário e avaliação documental; não constitui licença, autorização jurídica nem permissão para ingestão de dados.

## 1. Premissas vinculantes

1. Exile Nexus será um produto independente de GGG. Não fingir associação, aprovação ou suporte oficial. Incluir aviso visível: "This product isn't affiliated with or endorsed by Grinding Gear Games in any way."
2. API aberta, gratuita, pública ou código MIT **não** autorizam automaticamente redistribuição do conteúdo do jogo nem uso comercial. Verificar separadamente licença do software, API/serviço, dados subjacentes, arte, marcas e direitos de jogadores.
3. **AdSense é monetização**. Exibição de anúncios, assinaturas, patrocínios e venda de dados derivados de PoE2 permanecem BLOCKED até a autorização aplicável. A exceção de monetização para vídeos de gameplay não representa permissão para anúncios em um portal.
4. Nenhum scraper, endpoint privado, API de perfis/builds interna, engenharia reversa, leitura não autorizada do cliente ou bot de jogo. Somente interfaces documentadas e com direitos e limites validados.
5. Não ativar provedores ou baixar bases completas enquanto não houver aprovação. Esta issue não faz contato com terceiros nem consome APIs do jogo.

## 2. Estados de uso

- **REFERENCE_ONLY:** permitido consultar documentos/URLs para pesquisa e planejamento; não carregar dados operacionais.
- **POTENTIAL_CODE_REUSE:** licença do código identificada, dependente de auditoria de avisos, dependências e direitos de dados.
- **HOLD_RIGHTS:** integração, armazenamento, reexibição ou monetização exigem esclarecimento documental/consentimento explícito.
- **PROHIBITED:** uso expressamente excluído ou não autorizado; nunca implementar.
- **CONDITIONAL_ORIGINAL:** material próprio ou fornecido voluntariamente, dependente de contratos, privacidade e ausência de IP de terceiros.

## 3. Matriz das fontes

| ID | Fonte e proprietário | Evidência primária e licença | Uso permitido no planejamento | Proibido ou não comprovado | Estado e gate |
| --- | --- | --- | --- | --- | --- |
| R01 | Grinding Gear Games · Terms of Use | https://www.pathofexile.com/legal/terms-of-use-and-privacy-policy · seções 4, 6, 7 e 8; licença pessoal/não comercial para material de PoE | Ler e referenciar termos; documentar aviso de independência | Reproduzir, armazenar, exibir ou distribuir material protegido fora da licença; scraping, bots e engenharia reversa; publicidade do portal não coberta pela exceção de vídeos | REFERENCE_ONLY; GATE: autorização escrita/avaliação jurídica específica antes de conteúdo/receita |
| R02 | Grinding Gear Games · Developer Docs/API | https://www.pathofexile.com/developer/docs · API Policies, Registered Application, Available Resources e Third-Party Notice | Planejar integração com endpoints explicitamente documentados, com versão, user agent e rate limits | Presumir que API documentada equivale a permissão comercial; endpoints internos; registrar novo OAuth agora (cadastros não processados) | HOLD_RIGHTS; GATE: documentação de credenciais, acesso, limites e direitos de exibição antes da integração |
| R03 | Grinding Gear Games · Currency Exchange | https://www.pathofexile.com/developer/docs · seção API Reference/Currency Exchange | Catalogar contrato e limites na arquitetura | Usar sem confirmar modalidade de autenticação e direitos de apresentação comercial; confundir agregados históricos com preços de tempo real | HOLD_RIGHTS; GATE: verificar autenticação, permissão e termos |
| R04 | Grinding Gear Games · PoE2 Passive Skill Tree export | https://github.com/grindinggear/poe2-skilltree-export e https://www.pathofexile.com/developer/docs/data · repositório público de exportação; licença de redistribuição comercial não confirmada | Inspecionar documentação do formato e identificar versões de patches | Incorporar, espelhar ou redistribuir data.json/sprites/assets sem direito verificado; inferir licença por repositório público | HOLD_RIGHTS; GATE: licença/autorização e atribuição verificadas por ativo |
| R05 | poe.ninja · Public Economy API | https://poe.ninja/docs/api e https://poe.ninja/terms · API documenta economia de PoE2 para terceiros, mas termos gerais limitam cópia, exibição pública e uso comercial | Pesquisar contratos publicados, cache, ETag, User-Agent e cadência | Uso de builds/profiles/endpoints internos; espelhar o site; habilitar exibição ou monetização antes de resolver conflito entre docs API e termos | HOLD_RIGHTS; GATE: confirmação dos direitos de uso/exibição e limites; revogar na dúvida |
| R06 | poe.ninja · Builds/Profiles API | https://poe.ninja/docs/api · explicitamente interna e indisponível para terceiros | Apenas registrar que é proibida | Consultar/automatizar endpoints internos de builds, personagens, auth ou perfis | PROHIBITED; GATE: nunca integrar sem nova permissão explícita do provedor |
| R07 | PoE2 Scout · código MIT e API pública | https://github.com/poe2scout/poe2scout e https://github.com/poe2scout/poe2scout/blob/main/LICENSE · código MIT; API documentada em https://api.poe2scout.com/swagger | Analisar software open source e interface pública documentada; MIT permite reuso de código com aviso de licença | Confundir MIT do software com licença dos preços, imagens ou conteúdo de GGG; consumo comercial/redistribuição da API não comprovados | POTENTIAL_CODE_REUSE para código; HOLD_RIGHTS para API/dados; GATE: licença/termos separados e limites/atribuição |
| R08 | cvenzin · poe2-skilltree planner | https://github.com/cvenzin/poe2-skilltree · README declara código MIT, mas dados são provenientes da exportação GGG | Avaliar arquitetura/renderização e reutilização de código sob MIT após auditoria | Assumir que MIT cobre dados, sprites e assets de PoE2; copiar fontes/ícones sem checar licença individual | POTENTIAL_CODE_REUSE (código) + HOLD_RIGHTS (conteúdo do jogo); GATE: revisar LICENSE, notices e origem de cada asset |
| R09 | Google · AdSense / Publisher Policies | https://support.google.com/adsense/answer/10502938?hl=pt-BR e https://support.google.com/adsense/answer/48182?hl=en · políticas do produto, não concessão de IP | Planejar mecanismo de publicidade desligado por padrão | Ativar anúncios em conteúdo sem direitos, material copiado sem valor agregado ou que viole políticas; não tratar AdSense como produto de anúncios pagos Google Ads | HOLD_RIGHTS; GATE: direitos de conteúdo + conformidade Google + aprovação expressa de ativação |
| R10 | Guias, builds e sessões voluntárias dos jogadores | Titular: criador do conteúdo; direitos dependem de termos específicos que ainda não existem | Propor modelo de consentimento, remoção e atribuição | Recolher contas/char privadas sem autorização, revender dados de perfis, publicar contribuições sem licença apropriada | CONDITIONAL_ORIGINAL; GATE: Terms/Privacy, licença não exclusiva do criador, moderação e minimização de dados |
| R11 | Design, interface, fórmulas e textos originais da NexLabs | Titular: NexLabsTech, sujeito a comprovar autoria e licenças de terceiros | Criar padrões de UI originais, algoritmos determinísticos e gráficos que não copiem assets protegidos | Reproduzir logos oficiais, tipografia/arte sem licença, usar código/arte de terceiros sem avisos | CONDITIONAL_ORIGINAL; GATE: inventário de assets, proveniência e análise de similitude |

## 4. Resoluções essenciais para cada módulo

- **M03 Database:** esquema e busca podem ser planejados, mas carga de itens/gemas/monstros e reexibição de textos/ícones ficam bloqueadas por direitos por fonte.
- **M04 Árvore passiva:** geometria e renderer originais podem ser projetados; importação e distribuição da árvore, nomes, efeitos e assets dependem de R04. A árvore completa não está autorizada por esta matriz.
- **M05 Economia:** nenhuma fonte externa considerada autorizada para exibição monetizada neste momento. Contratos de API e indicadores simulados podem ser especificados com rotulagem inequívoca.
- **M06 Farm Lab:** calculadora e registros manuais dos próprios jogadores são candidatos mais seguros; não inferir direitos de exibir drops, ícones ou bases comerciais.
- **M08 IA:** respostas devem apontar versões e evidências com dados licenciados; sem treinar modelos com conteúdo cujo uso não esteja autorizado.
- **M11 Monetização:** BLOQUEADA. AdSense, assinaturas e patrocínios não foram autorizados aqui, independentemente de serem serviços sem custo para cadastrar.
- **M12 Produção:** deploy de uma interface original e sem conteúdo protegido ainda dependerá do DoD, testes e termos; nenhum deploy autorizado nesta WO.

## 5. Contrato futuro de proveniência

Qualquer registro de dados externos deve incluir, quando aplicável: source_id, owner, source_url, source_version, observed_at, fetched_at, game_patch, league, attribution, license_reference, permitted_purposes, rights_status, expiry/review_at, etag/cache_policy e kill_switch. A arquitetura deve impedir sincronização ou publicação se rights_status for HOLD_RIGHTS/PROHIBITED. Não expor dados privados de jogadores.

## 6. Gate e stop condition

- Decisão atual: **NOT CLEARED para ingestão, reexibição, importação da árvore e monetização**. Documentação de pesquisa pode continuar.
- Para alterar um estado: anexar licença/permissão primária verificável, delimitar finalidade e território, confirmar autoria/atribuição e auditar a integração em Work Order própria.
- Se acesso ou termos permanecerem ambíguos, manter HOLD_RIGHTS e usar dados explicitamente sintéticos em ambiente de desenvolvimento, sem reproduzir material protegido.
- Não contornar uma recusa com scraping, proxy de terceiro ou dados copiados de outro site.
- Revisão jurídica por profissional habilitado é recomendável antes de publicidade/monetização, pois esta matriz é avaliação técnica/documental, não parecer jurídico.

## 7. Referências e revisão

Fontes primárias consultadas em 2026-11-08. URLs acima são referências de auditoria. Os termos podem mudar; revalidar antes de cada integração e release. Esta proposta não altera decisões de arquitetura, segurança ou monetização aprovadas e não cria endpoints em produção.
