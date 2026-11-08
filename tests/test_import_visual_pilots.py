"""EXN-VIS-WO-001: negative tests for original pilot ZIP import constraints."""
from __future__ import annotations

import hashlib
import struct
import tempfile
import unittest
import zipfile
from pathlib import Path
from unittest.mock import patch

from scripts.import_visual_pilots import EXPECTED, PNG_SIG, import_pngs, verify_png


def synthetic_png() -> bytes:
    # Synthetic fixture: importer checks identity SHA and fixed PNG header,
    # not raster decoding. Real assets require exact approved SHA-256.
    return (
        PNG_SIG + struct.pack(">I", 13) + b"IHDR"
        + struct.pack(">II", 1448, 1086)
        + bytes([8, 2, 0, 0, 0]) + b"\\x00" * 4
    )


class VisualPilotImportTests(unittest.TestCase):
    def setUp(self) -> None:
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        self.blob = synthetic_png()
        self.digest = hashlib.sha256(self.blob).hexdigest()
        self.manifest = {filename: self.digest for filename in EXPECTED}
        self.archive = self.root / "pilots.zip"
        self.destination = self.root / "output"

    def write_archive(self, *, extra: bool = False, corrupt: bool = False) -> None:
        with zipfile.ZipFile(self.archive, "w") as archive:
            for filename in EXPECTED:
                path = f"design/references/{filename}"
                data = self.blob[:-1] + b"X" if corrupt and filename.endswith("brand-board-v1.png") else self.blob
                archive.writestr(path, data)
            if extra:
                archive.writestr("../escape", "unsafe")

    def test_positive_exact_manifest_import(self) -> None:
        self.write_archive()
        with patch("scripts.import_visual_pilots.EXPECTED", self.manifest):
            checked = import_pngs(self.archive, self.destination, verify_only=True)
            self.assertEqual(len(checked), 4)
            self.assertFalse(self.destination.exists())
            imported = import_pngs(self.archive, self.destination)
        self.assertEqual(len(imported), 4)
        self.assertEqual(len(list(self.destination.glob("*.png"))), 4)

    def test_negative_unapproved_archive_entry(self) -> None:
        self.write_archive(extra=True)
        with patch("scripts.import_visual_pilots.EXPECTED", self.manifest):
            with self.assertRaisesRegex(ValueError, "unexpected or missing"):
                import_pngs(self.archive, self.destination)
        self.assertFalse(self.destination.exists())

    def test_negative_changed_file_fails_before_any_write(self) -> None:
        self.write_archive(corrupt=True)
        with patch("scripts.import_visual_pilots.EXPECTED", self.manifest):
            with self.assertRaisesRegex(ValueError, "SHA-256 mismatch"):
                import_pngs(self.archive, self.destination)
        self.assertFalse(self.destination.exists())

    def test_negative_wrong_dimensions(self) -> None:
        changed = bytearray(self.blob)
        changed[16:24] = struct.pack(">II", 1024, 768)
        with self.assertRaisesRegex(ValueError, "Unexpected dimensions"):
            verify_png(bytes(changed), hashlib.sha256(changed).hexdigest())

    def test_negative_different_existing_asset_fails_closed(self) -> None:
        self.write_archive()
        self.destination.mkdir()
        (self.destination / "exile-nexus-brand-board-v1.png").write_bytes(b"wrong")
        with patch("scripts.import_visual_pilots.EXPECTED", self.manifest):
            with self.assertRaisesRegex(ValueError, "destination conflicts"):
                import_pngs(self.archive, self.destination)


if __name__ == "__main__":
    unittest.main()
