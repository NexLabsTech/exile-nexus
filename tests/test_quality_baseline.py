"""EXN-M12-WO-001: controlled invalid fixtures must cause nonzero quality checks."""
from __future__ import annotations

import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GATE = ROOT / "scripts" / "quality_gate.py"
PIN = "3d3c42e5aac5ba805825da76410c181273ba90b1"


class QualityBaselineTests(unittest.TestCase):
    def setUp(self) -> None:
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        self.workflow = self.root / ".github" / "workflows" / "quality.yml"
        self.workflow.parent.mkdir(parents=True, exist_ok=True)
        self.workflow.write_text(
            f"name: Synthetic\non:\n  pull_request:\npermissions:\n"
            f"  contents: read\njobs:\n  test:\n    steps:\n"
            f"      - uses: actions/checkout@{PIN}\n",
            encoding="utf-8",
        )

    def run_gate(self, *args: str) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            [sys.executable, str(GATE), "--root", str(self.root), *args],
            capture_output=True, text=True, check=False, timeout=10,
        )

    def create_package(self, *, complete: bool = True, lock: bool = True) -> None:
        app = self.root / "apps" / "web"
        app.mkdir(parents=True, exist_ok=True)
        scripts = {
            "lint": "eslint .",
            "typecheck": "tsc --noEmit",
            "test": "node --test",
            "build": "astro build",
        }
        if not complete:
            del scripts["typecheck"]
        (app / "package.json").write_text(
            json.dumps({"name": "synthetic-quality-app", "scripts": scripts}),
            encoding="utf-8",
        )
        if lock:
            (app / "package-lock.json").write_text(
                json.dumps({"lockfileVersion": 3, "packages": {"": {}}}),
                encoding="utf-8",
            )

    def test_positive_no_runtime_is_explicitly_not_applicable(self) -> None:
        r = self.run_gate()
        self.assertEqual(r.returncode, 0, r.stdout + r.stderr)
        self.assertIn("NOT_APPLICABLE", r.stdout)

    def test_positive_valid_app_is_listed(self) -> None:
        self.create_package()
        r = self.run_gate("--list-apps")
        self.assertEqual(r.returncode, 0, r.stdout + r.stderr)
        self.assertEqual(r.stdout.strip(), "apps/web")

    def test_negative_missing_lockfile_fails(self) -> None:
        self.create_package(lock=False)
        r = self.run_gate()
        self.assertNotEqual(r.returncode, 0)
        self.assertIn("package-lock.json missing", r.stdout)

    def test_negative_missing_typecheck_fails(self) -> None:
        self.create_package(complete=False)
        r = self.run_gate()
        self.assertNotEqual(r.returncode, 0)
        self.assertIn("mandatory CI script missing", r.stdout)

    def test_negative_unpinned_action_fails(self) -> None:
        self.workflow.write_text(
            self.workflow.read_text(encoding="utf-8").replace(PIN, "v4"),
            encoding="utf-8",
        )
        r = self.run_gate()
        self.assertNotEqual(r.returncode, 0)
        self.assertIn("not pinned", r.stdout)

    def test_negative_privileged_trigger_fails(self) -> None:
        text = self.workflow.read_text(encoding="utf-8")
        self.workflow.write_text(
            text.replace("  pull_request:", "  pull_request_target:"),
            encoding="utf-8",
        )
        r = self.run_gate()
        self.assertNotEqual(r.returncode, 0)
        self.assertIn("privileged trigger", r.stdout)

    def test_negative_elevated_permission_fails(self) -> None:
        text = self.workflow.read_text(encoding="utf-8")
        self.workflow.write_text(
            text.replace("contents: read", "contents: write"),
            encoding="utf-8",
        )
        r = self.run_gate()
        self.assertNotEqual(r.returncode, 0)
        self.assertIn("elevated workflow permissions", r.stdout)


if __name__ == "__main__":
    unittest.main()
