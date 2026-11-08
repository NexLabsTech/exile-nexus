# EXN-M00-WO-002 — Evidence Bundle do Source Pack

- **Owner:** NexLabsTech
- **Status:** DRAFT
- **Revisão:** 2026-11-08
- **Issue:** #3

## Work Order e contexto

- Baseline histórico de main: `23ec93e0fb174fb84db38298ce890f693a62abf1`.
- PR #133 integrada na main via squash: `b012731fd052e4c08aaa005b4e269b4d7e8ed7f4`.
- A PR #134 originalmente usava como base `exn-m00-wo-001-baseline` no SHA
  `fda049e31f92fcb7b1294eb9bbe5daa26f30b291`. Agora a branch é
  reconciliada com a main por merge de dois pais, sem rebase nem force-push.
- HEAD auditado antes deste Correction Delta:
  5ed38b7986a640cb8003eddde7dcefce8f477c02.
- O veredito textual na PR #133 foi APPROVED apenas para o conteúdo do
  baseline. A review GitHub é COMMENTED pela conta NexLabsTech; não comprova
  aprovação formal da dependência nem libera merge/progressão.
- A revisão independente do conteúdo do Correction Delta em `7fb06a6` foi
  favorável. A continuação solicitada pelo proprietário permitiu concluir
  WO-001 via squash, sem tratar COMMENTED como aprovação GitHub formal.
- Esta alteração apenas reconcilia a base/histórico e o estado documental com
  a main atual; a PR #134 ainda precisa de nova validação da diferença contra
  a main antes de integrar. Nenhum rebase nem force-push é permitido.
- O SHA da reconciliação consta no HEAD remoto e na PR #134; os dois pais são
  o HEAD anterior `7fb06a6` e o squash de main `b012731f`.
- Escopo: Source Pack, hierarquia, visão, Decisions Ledger e checkpoint
  proposto. Nenhum setting, workflow, código de aplicação ou deploy.

## Arquivos

- README.md: introdução e apontador para o Source Pack.
- docs/README.md: índice dos documentos presentes e pendentes por Work Order.
- docs/source-hierarchy.md: precedência e estado das fontes.
- docs/project-overview.md: contexto sem alegações sobre direitos ou serviços.
- docs/decisions-ledger.md: decisão do owner sobre custo zero e gates; não
  declara settings aplicadas.
- docs/checkpoint.md: estado observado e reconciliação da auditoria do WO-001.

## Verificações

- `npx --yes markdownlint-cli2@0.18.1` nos sete arquivos: resultado
  EXECUTOR-REPORTED; CLI 0.18.1 e markdownlint 0.38.0.
- Verificação Python documentada abaixo: resultado EXECUTOR-REPORTED para
  metadados, links internos, referências WO/issues e padrões conhecidos de
  segredos.
- `git diff --check`: PASS local, EXECUTOR-REPORTED; sem espaços finais ou
  erros de whitespace no diff.
- Nenhum teste local foi reexecutado independentemente por Actions; não há
  workflow criado nesta WO. A auditoria revisou o diff e os metadados, não
  reexecutou estes comandos.
- Checks automáticos do GitHub no HEAD anterior: Socket Security Pull Request
  Alerts e Project Report SUCCESS; CodeRabbit SKIPPED em Draft. Não são gates
  obrigatórios: a branch base retorna protected=false e os rulesets consultados
  retornam lista vazia. Billing do Socket permanece NOT VERIFIED.
- Testes de aplicação, build, SAST e E2E: NOT APPLICABLE; não há aplicação,
  manifestos, workflows ou ambiente.

Comando de markdown lint e linhas finais da saída registrada:

```text
npx --yes markdownlint-cli2@0.18.1 README.md docs/README.md \
  docs/source-hierarchy.md docs/project-overview.md \
  docs/decisions-ledger.md docs/checkpoint.md \
  docs/evidence/EXN-M00-WO-002-source-pack-2026-11-08.md

markdownlint-cli2 v0.18.1 (markdownlint v0.38.0)
Linting: 7 file(s)
Summary: 0 error(s)
```

Comando reproduzível para links, metadados, referências e padrões de segredos:

```python
from pathlib import Path
import re
import sys

files = [Path(p) for p in (
    "README.md", "docs/README.md", "docs/source-hierarchy.md",
    "docs/project-overview.md", "docs/decisions-ledger.md",
    "docs/checkpoint.md",
    "docs/evidence/EXN-M00-WO-002-source-pack-2026-11-08.md",
)]
errors = []
for path in files:
    text = path.read_text()
    head = "\n".join(text.splitlines()[:8])
    for field in ("Owner:", "Status:", "Revisão:"):
        if field not in head:
            errors.append(f"{path}: falta {field}")
    for target in re.findall(r"(?<!!)\[[^\]]+\]\(([^)]+)\)", text):
        if target.startswith(("https://", "http://", "mailto:")):
            continue
        rel = target.split("#", 1)[0]
        if rel and not (path.parent / rel).is_file():
            errors.append(f"{path}: link inválido {target}")

index = Path("docs/README.md").read_text()
for issue in range(4, 10):
    wo = f"EXN-M00-WO-{issue - 1:03d}"
    if f"{wo}, issue #{issue}" not in index:
        errors.append(f"mapeamento ausente: {wo} / #{issue}")
for artifact in (
    "Scope, Requirements e Definition of Done",
    "Architecture e contratos",
    "Security e threat model",
    "Test Plan, Deployment e Backlog",
    "Source Pack é parcial",
):
    if artifact not in index:
        errors.append(f"artefato não canônico não documentado: {artifact}")

normalized = " ".join(Path("docs/checkpoint.md").read_text().split())
required = (
    "iniciada em branch empilhada com aprovação formal de dependência pendente;"
    " não liberada para merge/progressão"
)
if required not in normalized:
    errors.append("checkpoint não registra dependência WO-001 pendente")
for name in (
    "docs/checkpoint.md",
    "docs/evidence/EXN-M00-WO-002-source-pack-2026-11-08.md",
):
    content = Path(name).read_text().split("## Verificações", 1)[0]
    normalized = " ".join(content.split()).lower()
    if "autorizou iniciar a issue #3" in normalized:
        errors.append(f"alegação não comprovada de autorização: {name}")
    if "aprovação formal de dependência pendente" not in normalized:
        errors.append(f"pendência formal da WO-001 ausente: {name}")

patterns = (
    r"gh[pousr]_[A-Za-z0-9_]{30,}",
    r"AKIA[0-9A-Z]{16}",
    r"xox[baprs]-[A-Za-z0-9-]{20,}",
    r"-----BEGIN (?:RSA |OPENSSH |EC |DSA )?PRIVATE KEY-----",
    r"(?i)api[_-]?key\s*[:=]\s*['\"]?[A-Za-z0-9_-]{24,}",
)
for path in files:
    for pattern in patterns:
        if re.search(pattern, path.read_text()):
            errors.append(f"padrão de segredo conhecido: {path}")

if errors:
    print("\n".join(errors))
    sys.exit(1)
print("PASS: metadados e links em 7 arquivos")
print("PASS: mapeamento das issues #4–#9")
print("PASS: artefatos não canônicos e dependência pendente")
print("PASS: sem alegação de autorização formal para avançar")
print("PASS: nenhum padrão de segredo conhecido")
```

Saída registrada pelo executor:

```text
PASS: metadados e links em 7 arquivos
PASS: mapeamento das issues #4–#9
PASS: artefatos não canônicos e dependência pendente
PASS: sem alegação de autorização formal para avançar
PASS: nenhum padrão de segredo conhecido
```

O revisor independente não executou novamente os comandos acima. Os resultados
permanecem reportados pelo executor até verificação independente.

## Segurança, custo e riscos

- Nenhuma dependência é adicionada ao repositório.
- Nenhum serviço com quota ou custo é exigido como aprovação. O npx acessou o
  registry público do npm para obter uma CLI open source.
- Custo financeiro das validações locais: US$ 0; não foi acionado runner pago.
  Billing global e custo dos checks Socket permanecem NOT VERIFIED.
- Direitos de dados, API, marca, arquitetura e settings de segurança continuam
  pendentes dos Work Orders que os cobrem.
- Não há código de aplicação para avaliar defeitos HIGH/CRITICAL. Isso não
  equivale a uma avaliação de segurança do produto.

## Checkpoint Delta proposto

Registrar o índice e a hierarquia das fontes, a decisão de custo zero do owner
e o estado distinto da auditoria de conteúdo e da review formal da WO-001.
Registrar os artefatos não canônicos e suas dependências. Este delta segue
PROPOSED; não libera merge ou progressão para a issue #4.
