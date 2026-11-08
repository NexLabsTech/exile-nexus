"""EXN-VIS-WO-001: reference boards must be safe, standalone, original SVGs."""
from __future__ import annotations

import re
import unittest
from pathlib import Path
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
ART = ROOT / "design" / "references"
IMAGES = {
    "exile-nexus-brand-board-v1.svg": (
        "EXILE NEXUS", "BRAND IDENTITY", "FAVICON", "COLOR PALETTE",
    ),
    "exile-nexus-public-pages-v1.svg": (
        "HOME / LANDING", "ITEM DATABASE", "ITEM DETAIL",
        "BUILD HUB", "SEARCH & DISCOVERY", "GUIDES / ARTICLE",
    ),
    "exile-nexus-tools-pages-v1.svg": (
        "PASSIVE TREE", "BUILD PLANNER", "ECONOMY HUB",
        "FARM LAB", "PATCH INTELLIGENCE", "AI ADVISOR",
    ),
    "exile-nexus-account-pages-v1.svg": (
        "LOGIN", "REGISTER", "PROFILE", "SAVED BUILDS",
        "ACCOUNT SETTINGS", "404 / NOT FOUND",
    ),
}
NS = "{http://www.w3.org/2000/svg}"
FORBIDDEN = {"script", "foreignObject", "image", "use", "a", "iframe", "audio", "video"}
DANGEROUS = re.compile(r"(?:https?://|//[^\s]+|data:|javascript:|@import|url\()", re.I)


class VisualPilotBoardTests(unittest.TestCase):
    def _get(self, filename: str) -> tuple[str, ET.Element]:
        data = (ART / filename).read_text(encoding="utf-8")
        return data, ET.fromstring(data)

    def test_four_reference_boards_exist(self) -> None:
        self.assertEqual(
            {p.name for p in ART.glob("*.svg")},
            set(IMAGES),
            "Versioned reference images must exactly match the inventory",
        )

    def test_svg_is_standalone_and_accessible(self) -> None:
        for filename in IMAGES:
            with self.subTest(filename=filename):
                data, root = self._get(filename)
                self.assertEqual(root.tag, NS + "svg")
                self.assertEqual(root.attrib.get("viewBox"), "0 0 1448 1086")
                self.assertEqual(root.attrib.get("role"), "img")
                self.assertEqual(root.attrib.get("aria-labelledby"), "title desc")
                self.assertTrue(root.find(NS + "title") is not None)
                self.assertTrue(root.find(NS + "desc") is not None)
                self.assertIsNone(DANGEROUS.search(data), "No remote or inline fetching")
                for element in root.iter():
                    name = element.tag.rsplit("}", 1)[-1]
                    self.assertNotIn(name, FORBIDDEN)
                    for key in element.attrib:
                        self.assertFalse(key.lower().startswith("on"), "No event handlers")
                        self.assertNotIn("href", key.lower(), "No linked resource")

    def test_page_coverage_and_original_identity(self) -> None:
        for filename, labels in IMAGES.items():
            with self.subTest(filename=filename):
                text, _ = self._get(filename)
                self.assertIn("EXILE NEXUS", text)
                self.assertIn("NOT AFFILIATED WITH OR ENDORSED", text)
                for label in labels:
                    self.assertIn(label, text)

    def test_concept_palette_is_present_without_asset_urls(self) -> None:
        for filename in IMAGES:
            with self.subTest(filename=filename):
                text, _ = self._get(filename)
                for color in ("#080B0D", "#D6B478", "#E35A2D"):
                    self.assertIn(color, text)
                self.assertNotIn("<image", text)
                self.assertNotIn("pathofexile.com", text.lower())

    def test_negative_script_fixture_is_blocked_by_policy(self) -> None:
        for bad in ('<script>', 'href="https://example.test"', 'url(https://test)'):
            with self.subTest(bad=bad):
                self.assertTrue(
                    "<script" in bad or DANGEROUS.search(bad),
                    "A malicious SVG sample must trigger the policy",
                )


if __name__ == "__main__":
    unittest.main()
