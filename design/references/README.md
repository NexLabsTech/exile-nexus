# Exile Nexus — Visual Pilot Reference Pack (EXN-VIS-WO-001)

**Status:** PILOT / REFERENCE ONLY, original raster boards imported and hash-verified in PR #145; final GitHub read-back and CI evidence are recorded in the PR; owner acceptance remains pending. **Risk:** STANDARD.
**Baseline:** main at `75bcb8c786beda9c4e62677fd325aa9d4c0418c2`, after quality PR #143.  
**Visual direction:** owner's 2026-11-08 acceptance of a **PoE2-inspired atmosphere**, NOT a copy of GGG's UI, characters, art, textures, logos, fonts, map, icons or trade dress.

## Previewable in-repository images

| Raster board | Editable vector reference | What it references | Implementation priority |
| --- | --- | --- |
| [Brand board PNG](exile-nexus-brand-board-v1.png) | [Brand board SVG](exile-nexus-brand-board-v1.svg) | Exile Nexus geometric jewel-mark, logotype, favicon concepts, hero banners, palette, type and buttons | Shared shell, original logo and reusable tokens |
| [Public pages PNG](exile-nexus-public-pages-v1.png) | [Public pages SVG](exile-nexus-public-pages-v1.svg) | Home, catalog, item detail, build listing, site-wide discovery and guides | M01 / M03 / M04 / M10, only via their WOs |
| [Tools and features PNG](exile-nexus-tools-pages-v1.png) | [Tools and features SVG](exile-nexus-tools-pages-v1.svg) | Passive tree, build planner, economy, farm calculator, patch intelligence and AI Advisor | M04–M08, only with authorized sources |
| [Account and utilities PNG](exile-nexus-account-pages-v1.png) | [Account and utilities SVG](exile-nexus-account-pages-v1.svg) | Login, registration, profile, saved builds, account settings and 404 | Future product WOs; no unapproved auth/provider selection |

**Important fidelity distinction:** the four committed SVG images are newly constructed **editable pilot reconstructions** in the desired style. They are not byte-for-byte versions of the four full-size PNG concept sheets. The PNGs linked above are the original user-provided raster references, imported and hash-verified in PR #145; final authenticated GitHub read-back is recorded in the PR evidence comment. Neither format is a functional UI or authoritative source of game facts.

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

## Original pilot PNGs (imported in PR #145)

The exact four PNG entries were imported from the user-provided `exile-nexus-visual-pilots-originals.zip`. The input ZIP SHA-256 is `ccb03d7e1b74036f8188e858ed021bdf83205161fc073bd014862ffa34294077`. The importer passed its allowlist, digest and IHDR checks; local byte-for-byte comparison with the ZIP entries and ImageMagick decoding also passed. Each image is 1448 × 1086 px.

| Versioned file | Bytes | SHA-256 |
| --- | --- | --- |
| [Brand board](exile-nexus-brand-board-v1.png) | 2,610,656 | `569ba69a3b9e0a45fc30a7f6388d2bee5065f4400d438ac28a007cc41bfebe2a` |
| [Public pages](exile-nexus-public-pages-v1.png) | 2,933,868 | `b30695b21dc976737c3719d93a59f8d123407e6e22c289cce3703e9f0c9fe8dc` |
| [Tools pages](exile-nexus-tools-pages-v1.png) | 2,899,710 | `dc441436ea786df012e12e72362cc97a62fe343050d57cdcbcf30b554d0ae023` |
| [Account pages](exile-nexus-account-pages-v1.png) | 2,777,842 | `b34c427d259b6724e653a81b41f2459752110ffc731e2b4b1e2ec3e588be2fb2` |

**Use and rights:** these are visual pilot mockups. Item names, prices, rates, user/profile details and game-like content are illustrative placeholders, not verified game data. The visual review found no unmistakable official GGG logo or game screenshot. The account mockup depicts Steam, Google and Discord marks as examples only; no provider selection or integration is approved. This visual review does not establish source provenance, copyright, trademark or commercial-use clearance. Rights R01–R14 and all data-use restrictions remain unchanged. Do not publish these as licensed game content or ingest their depicted values.

## Binary-import handoff (verified and fail-closed)

A source importer is versioned in [`scripts/import_visual_pilots.py`](../../scripts/import_visual_pilots.py). It accepts the exact `exile-nexus-visual-pilots-originals.zip` package from the user conversation. It checks the ZIP entry allowlist, each PNG's original SHA-256 and 1448×1086 IHDR, and refuses replacement of conflicting files before committing **any** image data. It never performs a network call or a Git write.

The following commands were run in this Work Order on the existing `exn-vis-wo-001-pilot-boards` branch. The ZIP hash was checked before either command:

```sh
python3 scripts/import_visual_pilots.py exile-nexus-visual-pilots-originals.zip --verify-only
python3 scripts/import_visual_pilots.py exile-nexus-visual-pilots-originals.zip
python3 -m unittest discover -s tests -p 'test_*.py' -v
git status --short
```

The Evidence Bundle and PR #145 record the normal commit/push, authenticated GitHub blob read-back, final workflow runs and exact HEAD. The ZIP is not stored in the repository. No force-push, direct-main write, external data service or paid dependency was used.

## Scope and provenance

EXN-VIS-WO-001 / GitHub issue #144. All in-repository SVGs are authored as original geometric/vector UI references, with no embedded raster, script, external image, downloadable font or GGG art. This is a provenance declaration, not independent copyright/trademark clearance. Rights R01–R14 and the DoD remain unchanged. Visual sign-off is not a deployment authorization or a release of blocked data sources.
