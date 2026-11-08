# Definition of Done

- **Owner:** NexLabsTech
- **Status:** PROPOSED
- **Revisão:** 2026-11-08
- **Work Order:** EXN-M00-WO-004 · Issue #5

## DoD por Work Order

Uma Work Order pode ser aceita quando:

1. Seu escopo, dependências, critérios e requisitos aplicáveis estão claros e
   satisfeitos.
2. A branch e PR mostram somente o diff autorizado, com base/head SHA
   verificados e sem reescrita ou force-push.
3. Testes e checks aplicáveis foram executados; resultados `NOT APPLICABLE`,
   `NOT RUN` e `BLOCKED` têm justificativa e não são apresentados como PASS.
4. Evidence Bundle registra arquivos, comandos/logs, segurança, custos,
   limitações, status de direitos e Checkpoint Delta.
5. Auditoria técnica objetiva apresenta `APPROVED`, `CORRECTION REQUIRED` ou
   `BLOCKED` com evidências. Se auditor e executor forem a mesma sessão, isso é
   declarado; independência não é presumida.
6. NexLabsTech registra aceite administrativo explícito antes do merge. Esse
   aceite não é uma GitHub Review `APPROVED` e não autoriza condições fora do
   escopo da Work Order.
7. A PR é integrada por fluxo normal, com método squash, somente após os gates
   aplicáveis; não usar bypass, não alterar `main` diretamente e não fechar
   issue sem critérios de aceite comprovados.

`CORRECTION REQUIRED` mantém o trabalho na mesma Work Order e PR. `BLOCKED`
interrompe somente o trabalho dependente até remover a causa com autorização e
evidência adequadas.

## DoD de produto ou release

Uma versão do Exile Nexus somente está concluída quando está:

- **Funcional:** implementa os requisitos e casos de uso autorizados, incluindo
  erros, estados vazios, privacidade e degradação de fontes indisponíveis.
- **Testada:** testes proporcionais ao risco passam; lint, typecheck, build,
  testes unit/integration/E2E, análise estática e segurança são aplicáveis
  conforme a superfície. Gates não executados são identificados corretamente.
- **Documentada:** interfaces, proveniência, operação, limitações, riscos e
  decisões refletem a versão entregue.
- **Implantada:** release aprovada por Work Order, em ambiente/serviço cujo
  custo e elegibilidade foram comprovados dentro de US$ 0.
- **Validada:** smoke tests, saúde dos serviços, recuperação/rollback,
  acessibilidade e comportamento real foram verificados após deployment.

Uma entrega documental de M00 pode satisfazer o DoD da sua Work Order, mas não
declara o produto funcional, implantado ou concluído.

## Gates permanentes

- Direitos, licenças, atribuição, finalidade e limites devem estar liberados
  para cada fonte antes de ingestão, armazenamento, reexibição ou monetização.
  Fonte pública, API documentada ou código MIT não autoriza automaticamente
  dados de jogo ou uso comercial.
- Nenhum serviço pago, quota de review ou crédito de análise pode ser requisito
  de PR, merge ou release. Ferramentas comerciais só podem ser opcionais se
  não gerarem custo e não bloquearem o fluxo.
- Não aceitar upgrade automático, runner pago, serviço de dados pago ou
  deployment pago. Limites gratuitos devem ser descritos como finitos.
- Defeito HIGH/CRITICAL, teste obrigatório falhando, direitos indispensáveis
  pendentes, gasto necessário ou segredo exposto bloqueia o merge/release
  afetado.
- Aplicar TypeScript estrito, contratos explícitos, arquitetura de baixo
  acoplamento, dependências mínimas, segurança deny-by-default, proteção de
  dados e testes de regressão nas Work Orders de implementação.
- UI deve ser responsiva e acessível; animações respeitam movimento reduzido.
- Não incluir funcionalidades FUTURE sem Work Order e prioridade aprovadas.

## Estado atual

O repositório nesta revisão contém somente documentação. Build, typecheck,
testes de aplicação, E2E e deploy são `NOT APPLICABLE`; isso não é resultado
PASS e não atende ao DoD de uma versão do produto.
