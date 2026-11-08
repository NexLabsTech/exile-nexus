# EXN-M00-WO-003 — Evidence Bundle de direitos e API

- **Owner:** NexLabsTech
- **Status:** DRAFT / PROPOSED
- **Revisão:** 2026-11-08
- **Work Order:** EXN-M00-WO-003 · Issue #4
- **Base SHA:** 5cf7ab69d8a2b80b245cd64966d9d40f13a8c8e1
- **Head SHA:** consultar PR desta Work Order após commit (não autoinserir SHA no próprio commit)

## Context Lock e fontes

A WO-001 e a WO-002 foram integradas por squash; README, hierarquia e checkpoint proposto foram lidos na main. Nenhuma fonte canônica aprovada autoriza uso de IP do jogo ou monetização.

Documentos primários verificados em 2026-11-08:
- GGG Developer Docs: https://www.pathofexile.com/developer/docs
- GGG Terms: https://www.pathofexile.com/legal/terms-of-use-and-privacy-policy
- Export oficial da árvore: https://github.com/grindinggear/poe2-skilltree-export
- poe.ninja API: https://poe.ninja/docs/api
- poe.ninja Terms: https://poe.ninja/terms/
- PoE2 Scout README e LICENSE: https://github.com/poe2scout/poe2scout
- cvenzin planner: https://github.com/cvenzin/poe2-skilltree
- Google Publisher Policies: https://support.google.com/adsense/answer/10502938?hl=pt-BR

## Objetivo, escopo e resultados

- Criar docs/rights-and-data-sources.md com R01–R11: owner, fontes, evidência de licença, uso permitido, proibições e gate.
- Registrar explicitamente conflitos entre permissões públicas de API e termos gerais; evitar presumir licença comercial.
- Proibir dependência de endpoints privados de perfis/builds e comercialização antecipada.
- Sem implementação, chamadas a APIs do jogo, cadastro, contato externo, cobrança, alteração de settings, merge ou deploy.

## Verificações e evidência

- Revisão documental das fontes públicas listadas: EXECUTED, com URLs e ressalvas; não é parecer jurídico.
- Schema da matriz, metadados, links internos, riscos e cobertura dos módulos: requer rechecagem em auditoria independente.
- Build, typecheck, unit, E2E e SAST: NOT APPLICABLE para esta WO exclusivamente documental.
- GitHub Actions: não executado; CI documental será criado na WO-007.
- Não declarar integrações ou licenças como aprovadas apenas com base em repositórios públicos ou APIs documentadas.

## Riscos e bloqueios

Riscos principais: direitos de propriedade intelectual GGG, termos poe.ninja conflitantes, licença de dados não demonstrada para PoE2 Scout, exportação de árvore sem permissão comercial verificada, monetização Google AdSense dependente de direitos de conteúdo. Status relevante: HOLD_RIGHTS e PROHIBITED.

## Proposed Checkpoint Delta

Registrar que WO-003 documenta a matriz de R01–R11, mas não libera ingestão/exibição/monetização. Manter decisões, permissões e orçamento sob avaliação. Só promover após auditoria e aceite.

## Review / Stop Condition

Auditar compatibilidade com escopo, veracidade das fontes, licença de cada dataset, restrições, risco, checklist e limitações. Veredito permitido: APPROVED / CORRECTION REQUIRED / BLOCKED. Não avançar WO-004 enquanto a auditoria documental não aprovar a presente WO.
