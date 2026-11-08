# Exile Nexus — Visual Pilot Reference Pack (EXN-VIS-WO-001)

**Status:** PILOT / REFERENCE ONLY, pending owner review, original raster import and CI; **Risk:** STANDARD.  
**Baseline:** main at `75bcb8c786beda9c4e62677fd325aa9d4c0418c2`, after quality PR #143.  
**Visual direction:** owner's 2026-11-08 acceptance of a **PoE2-inspired atmosphere**, NOT a copy of GGG's UI, characters, art, textures, logos, fonts, map, icons or trade dress.

## Previewable in-repository images

| Vector image | What it references | Implementation priority |
| --- | --- | --- |
| [Brand board](exile-nexus-brand-board-v1.svg) | Exile Nexus original geometric jewel-mark, logotype, favicon concepts, hero banners, palette, type and buttons | Shared shell, original logo and reusable tokens |
| [Public pages](exile-nexus-public-pages-v1.svg) | Home, catalog, item detail, build listing, site-wide discovery and guides | M01 / M03 / M04 / M10, only via their WOs |
| [Tools and features](exile-nexus-tools-pages-v1.svg) | Passive tree, build planner, economy, farm calculator, patch intelligence and AI Advisor | M04–M08, only with authorized sources |
| [Account and utilities](exile-nexus-account-pages-v1.svg) | Login, registration, profile, saved builds, account settings and 404 | Future product WOs; no unapproved auth/provider selection |

**Important fidelity distinction:** the four committed SVG images are newly constructed **editable pilot reconstructions** in the desired style. They are not byte-for-byte versions of the four full-size generated PNG concept sheets from the chat. **Do not mark the raster references as stored in GitHub.** The original PNGs remain a separate handoff artifact until their bytes are imported and verified in a dedicated revision. Source PNG manifest (SHA-256) below.

## Intended visual language and hierarchy

- Atmosphere: obsidian stone, ash-dark surfaces, restrained scarlet ember glow, burnished-gold accents, geometric sigils, ruined-arch silhouettes, dense but legible RPG dashboards. Visual motif is original. **No game UI screenshot or protected assets embedded.**
- Concept-only colors: canvas `#080B0D`; charcoal `#17181C`; iron `#2A2D33`; stone `#3E434A`; bronze `#8A6A3F`; brushed gold `#D6B478`; ember `#E35A2D`; crimson `#8B1E2B`; arcane teal `#2A6A6A`.
- These concept colors **do not automatically supersede** the owner-accepted operational `design/tokens.css` from EXN-M01-WO-002, PR #142. Implementer must open a separate token update and verify WCAG 2.2 AA contrast on actual composited backgrounds first.
- Type: a locally available fantasy-adjacent system serif for headings (such as Georgia/Palatino) and accessible system sans for data, forms and small labels. **Never fetch or mimic GGG's proprietary fonts.**
- Reusable patterns: global masthead, breadcrumbs, ornamental borders, sidebar taxonomy, filter form, highlighted active tab, dense result cards, tooltips, chart panels, keyboard focus, semantic status labels, loading/empty/error screens.
- Navigation on narrow screens collapses to an accessible menu; tables transform to cards or horizontal-scrolling labeled regions; passive tree becomes a dedicated, pan/zoom-capable viewport. Maintain a 4px spacing rhythm where possible.

## Fidelity contract for implementation

1. Choose the matching board before each UI Work Order. Use documented page titles, panel segmentation, component hierarchy and proportions as **intent**, not fixed pixels. Treat user-provided full PNGs as stronger references only once imported and approved with Git SHA.
2. For desktop (1440px), tablet (768px) and mobile (390px), capture Playwright screenshots for home, module listing/detail and every implemented tool state. Compare at the *same viewport, typography, data fixture and rendering mode*.
3. Snapshot imagery should use **synthetic, clearly labeled** content where rights are pending. Names, rates, prices and item statistics drawn in concept images are placeholders and never authoritative game facts.
4. Check contrast: readable text 4.5:1, control edges/focus 3:1; keyboard-only navigation and focus visibility, meaningful headings, zoom/reflow, prefers-reduced-motion and forced-colors, alt/aria for controls; decorative scenery must not block readability.
5. Technical gate: unit + lint + typecheck + build + targeted integration/Playwright and security checks. Visual acceptance additionally requires screenshots and diffs with explained mismatches, desktop and mobile.
6. Keep original assets distinct from reference screens; version the logo, favicon, textures, icons and hero artwork individually with origins, license, accessibility and dimension inventory in later approved WOs. Avoid directly cropping conceptual images into production art.
7. Preserve EXN's independence disclaimer: **Exile Nexus is an independent community tool, not affiliated with or endorsed by Grinding Gear Games.**

## Original generated PNGs (NOT YET IN GITHUB)

The full-resolution source pilot PNGs, each 1448 × 1086 px, are provided separately with this chat's downloadable package. They have the following source identifiers and SHA-256 digests for lossless import verification:

| Intended eventual repo path | Source filename | SHA-256 |
| --- | --- | --- |
| `exile-nexus-brand-board-v1.png` | `painel_de_identidade_exile_nexus.png` | `569ba69a3b9e0a45fc30a7f6388d2bee5065f4400d438ac28a007cc41bfebe2a` |
| `exile-nexus-public-pages-v1.png` | `painel_de_referência_do_exile_nexus.png` | `b30695b21dc976737c3719d93a59f8d123407e6e22c289cce3703e9f0c9fe8dc` |
| `exile-nexus-tools-pages-v1.png` | `quadro_de_referência_exile_nexus.png` | `dc441436ea786df012e12e72362cc97a62fe343050d57cdcbcf30b554d0ae023` |
| `exile-nexus-account-pages-v1.png` | `painel_de_referência_ui_gótica_do_exile_nexus.png` | `b34c427d259b6724e653a81b41f2459752110ffc731e2b4b1e2ec3e588be2fb2` |

**Import gate:** after actual files exist at the paths above on the design branch, compare their SHA-256 digests to this manifest and perform image review, size validation and ownership/right clearance. No filename link or assertion alone counts as asset import.

## Scope and provenance

EXN-VIS-WO-001 / GitHub issue #144. All in-repository SVGs are authored as original geometric/vector UI references, with no embedded raster, script, external image, downloadable font or GGG art. This is a provenance declaration, not independent copyright/trademark clearance. Rights R01–R14 and the DoD remain unchanged. Visual sign-off is not a deployment authorization or a release of blocked data sources.
