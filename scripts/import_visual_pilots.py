"""EXN-VIS-WO-001 — safely import original ChatGPT pilot PNGs from an explicit ZIP.

Usage:
    python scripts/import_visual_pilots.py path/to/exile-nexus-visual-pilots-originals.zip
    python scripts/import_visual_pilots.py path/to/exile-nexus-visual-pilots-originals.zip --verify-only

This does not use GitHub APIs, fetch remote content, or update Git by itself.
"""
from __future__ import annotations

import argparse
import hashlib
import struct
from pathlib import Path
from zipfile import BadZipFile, ZipFile

ROOT = Path(__file__).resolve().parents[1]
DST = ROOT / "design" / "references"
EXPECTED = {
    "exile-nexus-brand-board-v1.png": "569ba69a3b9e0a45fc30a7f6388d2bee5065f4400d438ac28a007cc41bfebe2a",
    "exile-nexus-public-pages-v1.png": "b30695b21dc976737c3719d93a59f8d123407e6e22c289cce3703e9f0c9fe8dc",
    "exile-nexus-tools-pages-v1.png": "dc441436ea786df012e12e72362cc97a62fe343050d57cdcbcf30b554d0ae023",
    "exile-nexus-account-pages-v1.png": "b34c427d259b6724e653a81b41f2459752110ffc731e2b4b1e2ec3e588be2fb2",
}
PNG_SIG = b"\x89PNG\r\n\x1a\n"
MAX_PNG_BYTES = 12_000_000
DIMENSIONS = (1448, 1086)


def verify_png(data: bytes, expected_digest: str) -> None:
    """Reject substituted, overlarge, wrong-format and wrong-size binaries."""
    if len(data) > MAX_PNG_BYTES or len(data) < 33:
        raise ValueError("PNG size is outside allowed range")
    if not data.startswith(PNG_SIG) or data[12:16] != b"IHDR":
        raise ValueError("Invalid PNG signature/IHDR")
    width, height = struct.unpack(">II", data[16:24])
    if (width, height) != DIMENSIONS:
        raise ValueError(f"Unexpected dimensions: {width}x{height}")
    digest = hashlib.sha256(data).hexdigest()
    if digest != expected_digest:
        raise ValueError("SHA-256 mismatch with approved source manifest")


def import_pngs(archive: Path, destination: Path = DST, *, verify_only: bool = False) -> list[str]:
    """Validate all four images before writing any of them.

    This is a controlled import helper. Existing paths must already match,
    otherwise refuse rather than replacing an unreviewed file.
    """
    images: dict[str, bytes] = {}
    with ZipFile(archive, "r") as package:
        names = package.namelist()
        expected_paths = {f"design/references/{name}" for name in EXPECTED}
        if set(names) != expected_paths or len(names) != 4:
            raise ValueError("ZIP contains unexpected or missing entries")
        for name, expected_digest in EXPECTED.items():
            path = f"design/references/{name}"
            info = package.getinfo(path)
            if info.file_size > MAX_PNG_BYTES:
                raise ValueError(f"{name}: oversized entry")
            data = package.read(path)
            verify_png(data, expected_digest)
            images[name] = data
    for name, data in images.items():
        target = destination / name
        if target.exists() and target.read_bytes() != data:
            raise ValueError(f"{name}: destination conflicts with approved source")

    if not verify_only:
        destination.mkdir(parents=True, exist_ok=True)
        for name, data in images.items():
            target = destination / name
            if not target.exists():
                target.write_bytes(data)
    return [f"{name}: SHA-256 verified, {DIMENSIONS[0]}x{DIMENSIONS[1]}" for name in images]


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("archive", type=Path, help="Original visual-pilots ZIP")
    parser.add_argument("--verify-only", action="store_true", help="Validate without writing")
    args = parser.parse_args()
    try:
        results = import_pngs(args.archive, verify_only=args.verify_only)
    except (OSError, ValueError, BadZipFile) as exc:
        print(f"FAIL: {exc}")
        return 1
    for result in results:
        print(f"PASS: {result}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
