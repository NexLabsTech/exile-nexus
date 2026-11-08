# EXN-M01-WO-002 — Visual asset rights inventory

- **Owner:** NexLabsTech
- **Status:** ACCEPTED initial design baseline / NOT LEGAL CLEARANCE
- **Revisão:** 2026-11-08
- **Work Order:** EXN-M01-WO-002 · Issue #12

## Provenance and restrictions (rights gate R14)

| Path | Content and provenance | External components | Usage state |
| --- | --- | --- | --- |
| [nexus-prism.svg](../design/assets/nexus-prism.svg) | Geometric nested hexagon and prism; generated as original XML paths for this WO, not traced from a reference image | None; no fonts, scripts, text glyphs or URLs | APPROVED_DESIGN_BASELINE; NOT_PUBLIC_RELEASE_CLEARANCE |
| [lattice.svg](../design/assets/lattice.svg) | Original abstract grid of lines and circles designed for this WO | None; no images, scripts or external requests | APPROVED_DESIGN_BASELINE; NOT_PUBLIC_RELEASE_CLEARANCE |
| [tokens.css](../design/tokens.css) | Self-contained semantic palette, typography and motion primitives created for this WO | System font stacks only, no external @import | APPROVED_DESIGN_BASELINE; NOT_PUBLIC_RELEASE_CLEARANCE |

**Provenance method:** all included vectors are simple hand-authored geometry
generated in source form for this Work Order; no image retrieval, GGG art,
visual references, licensed packs or screenshot tracing were used. This is
an *asset-origin declaration*, **not a legal opinion or claim of exclusive
copyright**. Existing third-party rights and trademark similarity checks
are not proven exhaustively. The owner controls public release decisions.

**Negative inventory:** no Path of Exile 2 names of in-game items, classes,
characters, map artwork, passive-tree symbols, UI sprites, icons, textures,
audio, fonts, screenshots or economy data. R01–R13 remain blocked for use
when rights are absent; registering R14 candidates does not change them.

**Owner acceptance:** EXN-DEC-0009 accepted these specific assets as an initial
internal design reference. **Distribution gate:** before publication, assess
brand confusion, display an independence disclaimer,
inventory each new asset, verify source origin and license, and run accessibility
and SVG-safety tests. Do not imply endorsement by Grinding Gear Games.

## Automated gate and limits

`python3 -m unittest discover -s tests -p 'test_*.py' -v` runs token
contrast checks and inspects the shipped SVG XML for embedded URLs,
script/foreignObject/image/use tags, event handler attributes, and meaningful
accessible labeling. A static check cannot prove copyright non-infringement,
trademark clearance, or similarity to every third-party image. Those
assessments are NOT VERIFIED for a future public product.
