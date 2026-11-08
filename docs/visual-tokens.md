# EXN-M01-WO-002 — Original visual tokens and accessibility

- **Owner:** NexLabsTech
- **Status:** PROPOSED / NOT ACCEPTED
- **Revisão:** 2026-11-08
- **Work Order:** EXN-M01-WO-002 · Issue #12

## Objective and design direction

Offer original dark-fantasy atmosphere without copying Path of Exile 2 UI,
marks, textures, icons, typefaces, character designs or any GGG assets. This
document specifies a **design system**, not a screen, game UI, release or
commercial-use clearance. Astro 7.4.7 + React 19.3.1 islands is the
**previously approved runtime** (EXN-DEC-0008); no Astro app is built in #12.

## Token source and semantic roles

The single CSS source is [tokens.css](../design/tokens.css). Use opaque dark
surfaces for **all readable text**. Glass/translucency may be decorative, but
cannot be assumed accessible against variable backgrounds. Check final
composited colors per component at implementation time.

| Role | Token | Hex | Contrast against raised #223041 |
| --- | --- | --- | --- |
| Main text | `--exn-color-text` | `#F1F5F9` | 12.23:1 |
| Secondary text | `--exn-color-text-muted` | `#B7C9D7` | 7.88:1 |
| Accent text | `--exn-color-accent` | `#87E6CC` | 9.07:1 |
| Warm accent | `--exn-color-gold` | `#F7D295` | 9.32:1 |
| Border / control edge | `--exn-color-border` | `#688197` | 3.30:1 |
| Keyboard focus outline | `--exn-color-focus` | `#D0F877` | 11.09:1 |

- Minimum text contrast: 4.5:1 on all three declared opaque backgrounds;
  minimum non-text border/focus indicator contrast: 3:1. These pairs are
  automatically checked in `tests/test_design_tokens.py`.
- The accent foreground `--exn-color-on-accent` is dark and must be used
  whenever text is placed on the teal accent background.
- Status uses visible text/labels and affordances **in addition to color**.
- Typefaces are **system fallbacks only**. No font download, license
  inheritance or external @import. Typography uses rem and adaptive layout
  should be specified at component level in later work.
- Use a 4px rhythm, readable line-height, and focus outline 3px with offset.
  Never suppress the user's native keyboard focus.
- Motion durations reduce to 0ms under `prefers-reduced-motion: reduce`.
  `forced-colors: active` uses OS `Highlight` for focus.
- SVG mark is informative (title+description); lattice is decorative and
  hidden from screen readers. Do not infer the decorative lattice is data or
  functional content.

## Usage / failure states

Future Astro pages may import tokens.css and reference only `--exn-*`
properties. This WO does not import styles into a running application or
deliver any real page. Real interface work must validate interaction states,
text resizing, mobile layouts, transparent overlays, focus ordering, keyboard
navigation and browser/axe contrast with actual rendered pixels.

Brand name may be used in local documentation. A future public release must
include a plain disclaimer: **Exile Nexus is an independent community tool,
not affiliated with or endorsed by Grinding Gear Games.** No trademark
license is inferred.

## References and acceptance

- [W3C WCAG 2.2, contrast minimum](https://www.w3.org/TR/WCAG22/#contrast-minimum)
- [W3C WCAG 2.2, non-text contrast](https://www.w3.org/TR/WCAG22/#non-text-contrast)
- [W3C WCAG 2.2, focus visible](https://www.w3.org/TR/WCAG22/#focus-visible)
- [MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)
- [MDN forced-colors](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/forced-colors)
- [Original asset inventory](visual-assets-inventory.md)
- [Evidence Bundle](evidence/EXN-M01-WO-002-visual-tokens-2026-11-08.md)

Criteria: automated contrast and SVG safety checks, docs CI, rights inventory,
scope diff, transparent solo audit per EXN-DEC-0007 and owner approval. All
design choices here are PROPOSED until those gates pass; no merge/deploy.
