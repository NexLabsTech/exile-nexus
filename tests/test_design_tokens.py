"""WCAG contrast and SVG safety checks for EXN-M01-WO-002, no dependencies."""
from __future__ import annotations

import re
import unittest
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CSS = ROOT / "design" / "tokens.css"
ASSETS = ROOT / "design" / "assets"
NS = "{http://www.w3.org/2000/svg}"
HEX = re.compile(r"--exn-([a-z0-9-]+):\s*(#[0-9a-fA-F]{6})\s*;")
SAFE_TAGS = {"svg", "g", "path", "circle", "title", "desc"}
BLOCKED_ATTRS = {"href", "style", "src", "filter"}


def luminance(value: str) -> float:
    channels = [int(value[pos:pos + 2], 16) / 255 for pos in (1, 3, 5)]
    linear = [v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4
              for v in channels]
    return sum(c * weight for c, weight in zip(linear, (0.2126, 0.7152, 0.0722)))


def contrast(one: str, two: str) -> float:
    high, low = sorted((luminance(one), luminance(two)), reverse=True)
    return (high + 0.05) / (low + 0.05)


class DesignTokensTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.css = CSS.read_text(encoding="utf-8")
        cls.colors = dict(HEX.findall(cls.css))

    def test_minimum_text_contrast_on_opaque_surfaces(self) -> None:
        for foreground in ("text", "text-muted", "accent", "gold", "error", "success"):
            for background in ("canvas", "surface", "raised"):
                with self.subTest(foreground=foreground, background=background):
                    self.assertGreaterEqual(
                        contrast(self.colors[f"color-{foreground}"],
                                 self.colors[f"color-{background}"]), 4.5
                    )

    def test_non_text_edge_and_focus_contrast(self) -> None:
        for foreground in ("border", "focus"):
            for background in ("canvas", "surface", "raised"):
                with self.subTest(foreground=foreground, background=background):
                    self.assertGreaterEqual(
                        contrast(self.colors[f"color-{foreground}"],
                                 self.colors[f"color-{background}"]), 3.0
                    )

    def test_on_accent_text_contrast(self) -> None:
        self.assertGreaterEqual(
            contrast(self.colors["color-on-accent"], self.colors["color-accent"]), 4.5
        )

    def test_focus_and_accessibility_preferences(self) -> None:
        self.assertIn(":focus-visible", self.css)
        self.assertIn("outline:", self.css)
        self.assertIn("prefers-reduced-motion: reduce", self.css)
        self.assertIn("forced-colors: active", self.css)
        self.assertIn("outline-color: Highlight;", self.css)
        self.assertIn("--exn-duration-fast: 0ms;", self.css)
        self.assertIn("--exn-duration-standard: 0ms;", self.css)

    def test_no_remote_fonts_or_styles(self) -> None:
        self.assertNotIn("@import", self.css)
        self.assertNotIn("url(", self.css.lower())
        self.assertNotIn("outline: none", self.css)
        self.assertNotIn("outline: 0", self.css)

    def test_svg_files_are_accessible_and_inert(self) -> None:
        for asset in ("nexus-prism.svg", "lattice.svg"):
            with self.subTest(asset=asset):
                xml = (ASSETS / asset).read_text(encoding="utf-8")
                root = ET.fromstring(xml)
                self.assertEqual(root.tag, NS + "svg")
                self.assertNotIn("<!DOCTYPE", xml.upper())
                for element in root.iter():
                    self.assertIn(element.tag.removeprefix(NS), SAFE_TAGS)
                    for key, value in element.attrib.items():
                        name = key.rsplit("}", 1)[-1].lower()
                        self.assertFalse(name.startswith("on"))
                        self.assertNotIn(name, BLOCKED_ATTRS)
                        self.assertNotIn("url(", value.lower())
                        self.assertNotIn("http:", value.lower())
                        self.assertNotIn("https:", value.lower())
                if asset == "nexus-prism.svg":
                    self.assertEqual(root.attrib.get("role"), "img")
                    self.assertIn("prism-title", root.attrib.get("aria-labelledby", ""))
                    self.assertTrue(root.find(NS + "title") is not None)
                    self.assertTrue(root.find(NS + "desc") is not None)
                else:
                    self.assertEqual(root.attrib.get("aria-hidden"), "true")

    def test_rights_inventory_is_complete_for_assets(self) -> None:
        text = (ROOT / "docs" / "visual-assets-inventory.md").read_text(
            encoding="utf-8"
        )
        for path in ("nexus-prism.svg", "lattice.svg", "tokens.css"):
            with self.subTest(path=path):
                self.assertIn(path, text)
        self.assertIn("R14", text)
        self.assertIn("APPROVED_DESIGN_BASELINE", text)


if __name__ == "__main__":
    unittest.main()
