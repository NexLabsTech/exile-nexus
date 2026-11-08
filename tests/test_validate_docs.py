"""Unit tests for the dependency-free documentation validator."""
import tempfile
import unittest
from pathlib import Path

from scripts.validate_docs import check_link, check_markdown


class DocumentationValidatorTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        (self.root / "docs").mkdir()
        self.source = self.root / "docs" / "sample.md"
        self.source.write_text("# Sample\n", encoding="utf-8")

    def tearDown(self):
        self.temp.cleanup()

    def test_existing_local_link_passes(self):
        target = self.root / "docs" / "target.md"
        target.write_text("# Target\n", encoding="utf-8")
        self.assertEqual(check_link(self.source, "target.md", self.root), [])

    def test_broken_local_link_fails(self):
        self.assertTrue(check_link(self.source, "missing.md", self.root))

    def test_http_link_is_rejected(self):
        self.assertTrue(check_link(self.source, "http://example.invalid", self.root))

    def test_synthetic_github_token_is_detected_without_printing_value(self):
        synthetic = "gh" + "p_" + "A" * 24
        self.source.write_text(
            "Owner: NexLabsTech\nStatus: TEST\nRevisão: 2026-11-08\n"
            "Work Order: TEST\n" + synthetic + "\n",
            encoding="utf-8",
        )
        issues, _, _ = check_markdown(self.source, self.root)
        self.assertTrue(any("value omitted" in item for item in issues))
        self.assertNotIn(synthetic, " ".join(issues))


if __name__ == "__main__":
    unittest.main()
