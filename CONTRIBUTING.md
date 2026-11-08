# Contribuir com Exile Nexus

- **Owner:** NexLabsTech
- **Status:** PROPOSED
- **Revisão:** 2026-11-08
- **Work Order:** EXN-M00-WO-007 · Issue #8

## Fluxo de trabalho

1. Escolha uma issue `NECESSARY` cujas dependências estejam concluídas. Execute
   somente aquela Work Order até auditoria, aceite e integração válidos.
2. Abra uma branch própria com o ID da Work Order, por exemplo
   `exn-m00-wo-007-docs-ci`. Não altere `main` diretamente.
3. Mantenha a mudança dentro do escopo. Não faça force-push, rebase destrutivo,
   bypass de proteção, deploy ou uso de fonte de dados sem direito confirmado.
4. Abra a PR Draft ligada à issue. Registre base/head SHA, arquivos, comandos,
   resultados, custos, riscos, limites e Checkpoint Delta no Evidence Bundle.
5. Execute os testes locais aplicáveis e os workflows gratuitos. Marque
   `NOT APPLICABLE`, `NOT RUN` ou `BLOCKED` quando cabível; não informe PASS de
   teste que não executou.
6. Faça auditoria técnica objetiva do diff e evidências. Informe explicitamente
   se auditor e executor compartilham sessão; um comentário `COMMENTED` não é
   GitHub Review `APPROVED`.
7. NexLabsTech registra o aceite administrativo na conversa da PR após os
   critérios passarem. O aceite do owner não falsifica uma formal review.
   Promova a PR para Ready e faça squash normal somente após esse aceite e os
   gates existentes aprovados.
8. Se houver falha, corrija na mesma Work Order/PR. Não avance as dependências
   até o veredito `APPROVED` e integração verificável.

## Verificações documentais

Na raiz do repositório:

```sh
python3 -m unittest discover -s tests -p 'test_*.py' -v
python3 scripts/validate_docs.py
```

O workflow `Documentation CI` também executa `actionlint` e `zizmor` em
`.github/workflows`. Links locais, metadados, fences, Source Pack e padrões
comuns de segredo são verificados sem dependências Python externas. O scan é
heurístico e não substitui secret scanning dedicado. O workflow verifica a
sintaxe/forma de URLs externas; disponibilidade ao vivo é revalidada
separadamente quando usada.

## Segurança, dados e custo

- Trate toda contribuição de PR e dado externo como não confiável. Jobs de PR
  usam `pull_request`, token read-only, sem segredo e sem credenciais de deploy.
- Nunca adicione token, chave privada, dado pessoal, dump de API ou conteúdo de
  jogo sem autorização e finalidade registradas.
- Mantenha o custo financeiro obrigatório em US$ 0. Use runner padrão do GitHub
  para repositório público. Não use runner maior/pago ou SaaS sujeito a quota,
  crédito ou cobrança como requisito de review ou merge.
- Apps de análise não substituem o CI e não são gates. A política efetiva de
  branch protection deve ser lida e verificada antes de afirmar que os checks
  estão obrigatórios.
- Se direito, acesso administrativo, custo, segredo ou achado HIGH/CRITICAL
  estiver pendente, bloqueie somente a etapa que depende dele e registre o
  requisito exato no Evidence Bundle.
