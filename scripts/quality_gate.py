"""EXN-M12-WO-001: fail-closed quality policies, using Python standard library.

The existing probe experiments are excluded from *production* npm builds.
"""
from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

IGNORED_DIRS = {
    ".git", ".astro", ".next", "node_modules", "dist", "build",
    "coverage", "vendor", "experiments", ".venv", "__pycache__",
}
MANDATORY_SCRIPTS = ("lint", "typecheck", "test", "build")
PINNED_ACTION = re.compile(r"[^@\s#]+@[a-f0-9]{40}\Z")
USES = re.compile(r"(?m)^\s*(?:-\s*)?uses:\s*([^\s#]+)")
PRIVILEGED_TRIGGER = re.compile(r"(?m)^\s*(?:pull_request_target|workflow_run)\s*:")
PRIVILEGED_PERMISSIONS = re.compile(
    r"(?m)^\s*(?:contents|id-token|actions|packages|deployments):\s*write\s*(?:#.*)?$"
)
WRITE_ALL = re.compile(r"(?m)^\s*permissions:\s*write-all\b")


def production_packages(root: Path) -> list[Path]:
    """Discover npm apps except explicitly excluded generated or probe trees."""
    return sorted(
        (p.parent for p in root.rglob("package.json")
         if not any(part in IGNORED_DIRS for part in p.relative_to(root).parts[:-1])),
        key=lambda p: p.as_posix(),
    )


def audit_repo(root: Path) -> tuple[list[Path], list[str]]:
    errors: list[str] = []
    workflows = sorted((root / ".github" / "workflows").glob("*.yml"))
    workflows += sorted((root / ".github" / "workflows").glob("*.yaml"))
    if not workflows:
        errors.append("No GitHub Actions workflow files were found")

    for workflow in workflows:
        rel = workflow.relative_to(root).as_posix()
        content = workflow.read_text(encoding="utf-8")
        if PRIVILEGED_TRIGGER.search(content):
            errors.append(f"{rel}: privileged trigger is not authorized")
        if WRITE_ALL.search(content) or PRIVILEGED_PERMISSIONS.search(content):
            errors.append(f"{rel}: elevated workflow permissions are not authorized")
        if not re.search(r"(?m)^permissions:\s*$", content):
            errors.append(f"{rel}: explicit top-level permissions required")
        for match in USES.finditer(content):
            source = match.group(1)
            if source.startswith("./"):
                continue
            if not PINNED_ACTION.fullmatch(source):
                errors.append(f"{rel}: external action not pinned by full SHA: {source}")

    apps = production_packages(root)
    for folder in apps:
        manifest = folder / "package.json"
        rel = manifest.relative_to(root).as_posix()
        try:
            package = json.loads(manifest.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, UnicodeError) as exc:
            errors.append(f"{rel}: invalid JSON: {exc}")
            continue
        if not isinstance(package, dict):
            errors.append(f"{rel}: package manifest must be a JSON object")
            continue
        scripts = package.get("scripts")
        if not isinstance(scripts, dict):
            errors.append(f"{rel}: scripts object missing")
        else:
            for name in MANDATORY_SCRIPTS:
                if not isinstance(scripts.get(name), str) or not scripts[name].strip():
                    errors.append(f"{rel}: mandatory CI script missing or empty: {name}")
        lock = folder / "package-lock.json"
        if not lock.is_file():
            errors.append(f"{rel}: package-lock.json missing (npm ci cannot verify)")
            continue
        try:
            lock_data = json.loads(lock.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, UnicodeError) as exc:
            errors.append(f"{rel}: invalid package-lock.json: {exc}")
            continue
        if not isinstance(lock_data, dict) or not isinstance(
            lock_data.get("lockfileVersion"), int
        ) or lock_data["lockfileVersion"] < 2:
            errors.append(f"{rel}: npm lockfile format v2 or newer is required")
    return apps, errors


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--list-apps", action="store_true")
    args = parser.parse_args()
    root = args.root.resolve()
    apps, errors = audit_repo(root)
    if errors:
        for error in errors:
            print(f"FAIL: {error}")
        return 1
    if args.list_apps:
        for app in apps:
            print(app.relative_to(root).as_posix())
    else:
        print(f"PASS: workflow hardening, pinned actions, manifest policy; production apps={len(apps)}")
        if not apps:
            print("NOT_APPLICABLE: no production npm packages; app checks not executed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
