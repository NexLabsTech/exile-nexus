#!/usr/bin/env python3
"""Dependency-free checks for Exile Nexus Markdown and canonical Source Pack."""
from __future__ import annotations

import re
import sys
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
CANONICAL_DOCS = (
    "docs/README.md",
    "docs/project-overview.md",
    "docs/scope.md",
    "docs/requirements.md",
    "docs/definition-of-done.md",
    "docs/architecture.md",
    "docs/data-contracts.md",
    "docs/deployment-plan.md",
    "docs/security-privacy-threat-model.md",
    "docs/test-plan.md",
    "docs/source-hierarchy.md",
    "docs/decisions-ledger.md",
    "docs/checkpoint.md",
    "docs/rights-and-data-sources.md",
)
METADATA = ("Owner:", "Status:", "Revisão:", "Work Order:")
METADATA_DOCS = set(CANONICAL_DOCS) | {
    "README.md",
    "docs/evidence/EXN-M00-WO-007-docs-ci-review-2026-11-08.md",
}
INLINE_LINK = re.compile(r"!?\[[^\]]*\]\(\s*(<[^>]+>|[^)\s]+)(?:\s+[^)]*)?\)")
REFERENCE_LINK = re.compile(r"^\s{0,3}\[[^\]]+\]:\s*(<[^>]+>|\S+)")
FENCE = re.compile(r"^\s*(`{3,}|~{3,})")
SECRET_PATTERNS = (
    ("GitHub token", re.compile(r"\b(?:gh[pousr]_[A-Za-z0-9_]{20,}|github_pat_[A-Za-z0-9_]{20,})\b")),
    ("AWS access key", re.compile(r"\bAKIA[0-9A-Z]{16}\b")),
    ("private key", re.compile(r"-----BEGIN (?:RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----")),
    ("bearer credential", re.compile(r"(?i)\bBearer\s+[A-Za-z0-9._~+/=-]{24,}")),
    ("credential assignment", re.compile(r'''(?i)\b(?:secret|password|api[_-]?key|private[_-]?key)\b\s*[:=]\s*["'][A-Za-z0-9_./+=-]{24,}["']''')),
    ("Slack token", re.compile(r"\bxox[baprs]-[A-Za-z0-9-]{20,}\b")),
    ("JWT", re.compile(r"\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b")),
)


def markdown_files(root: Path) -> list[Path]:
    files = [root / "README.md", root / "CONTRIBUTING.md"]
    docs = root / "docs"
    files.extend(docs.rglob("*.md") if docs.exists() else [])
    return sorted(p for p in files if p.is_file())


def check_link(source: Path, destination: str, root: Path) -> list[str]:
    if destination.startswith("<") and destination.endswith(">"):
        destination = destination[1:-1]
    parsed = urlsplit(destination)
    if parsed.scheme:
        if parsed.scheme in ("https", "mailto"):
            if parsed.scheme == "https" and (not parsed.netloc or parsed.username or parsed.password):
                return [f"{source}: malformed or credential-bearing URL"]
            return []
        return [f"{source}: unsupported link scheme {parsed.scheme!r}"]
    target = (source.parent / unquote(parsed.path)).resolve() if parsed.path else source.resolve()
    try:
        target.relative_to(root.resolve())
    except ValueError:
        return [f"{source}: local link escapes repository"]
    if not target.exists():
        return [f"{source}: broken local link {destination!r}"]
    return []


def check_markdown(path: Path, root: Path) -> tuple[list[str], int, int]:
    text = path.read_text(encoding="utf-8")
    issues: list[str] = []
    relative = path.resolve().relative_to(root.resolve()).as_posix()
    if relative in METADATA_DOCS:
        for field in METADATA:
            if field not in text:
                issues.append(f"{path}: missing metadata {field}")
    fence = None
    for number, line in enumerate(text.splitlines(), 1):
        match = FENCE.match(line)
        if match:
            marker = match.group(1)
            if fence is None:
                fence = (marker[0], len(marker), number)
            elif marker[0] == fence[0] and len(marker) >= fence[1]:
                fence = None
        for name, pattern in SECRET_PATTERNS:
            if pattern.search(line):
                issues.append(f"{path}:{number}: possible {name}; value omitted")
        for match in INLINE_LINK.finditer(line):
            issues.extend(check_link(path, match.group(1), root))
        reference = REFERENCE_LINK.match(line)
        if reference:
            issues.extend(check_link(path, reference.group(1), root))
    if fence is not None:
        issues.append(f"{path}:{fence[2]}: unclosed Markdown code fence")
    return issues, len(INLINE_LINK.findall(text)), len(REFERENCE_LINK.findall(text))


def validate(root: Path = ROOT) -> tuple[list[str], int, int, int]:
    issues: list[str] = []
    for relative in CANONICAL_DOCS:
        path = root / relative
        if not path.is_file() or path.stat().st_size == 0:
            issues.append(f"missing or empty canonical Source Pack file: {relative}")
    index_path = root / "docs/README.md"
    if index_path.is_file():
        index = index_path.read_text(encoding="utf-8")
        for relative in CANONICAL_DOCS:
            if relative == "docs/README.md":
                continue
            local_name = Path(relative).name
            if f"]({local_name})" not in index:
                issues.append(f"docs/README.md does not index {relative}")
    docs = markdown_files(root)
    inline_count = reference_count = 0
    for path in docs:
        file_issues, inline, reference = check_markdown(path, root)
        issues.extend(file_issues)
        inline_count += inline
        reference_count += reference
    return issues, len(docs), inline_count, reference_count


def main() -> int:
    issues, files, inline, references = validate()
    if issues:
        for issue in issues:
            print(f"ERROR: {issue}")
        print(f"FAIL: {len(issues)} documentation issue(s) across {files} Markdown files")
        return 1
    print(
        f"PASS: Source Pack present; {files} Markdown files; "
        f"{inline + references} links checked; secret heuristics found no matches"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
