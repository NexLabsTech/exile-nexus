# EXN-M01-WO-009 — Accessibility and responsive **manual** validation checklist

- **Scope:** Existing Exile Nexus Astro/React static preview; English-only; no new live game content or external data.
- **Owner:** NexLabsTech; issue #19; PR #159; this is a supplementary review procedure, not a screen-reader certification.
- **Manual execution state:** **NOT_RUN**. No human device interaction, VoiceOver/NVDA/TalkBack test, actual 400% browser zoom or real-device assistive technology inspection has been performed by this agent. A green axe/Playwright run MUST NOT be recorded as manual PASS.
- **Requirement:** No known critical/serious automated a11y findings, readable UI with effects disabled, keyboard navigation and responsive layout. Full WCAG 2.2 AA conformance and user-reported usability cannot be inferred solely from automated tests.

## Repeatable human/manual verification procedure (all items initially NOT_RUN)

| Check | Browser/device and procedure | Evidence to capture | Status |
| --- | --- | --- | --- |
| Keyboard-only primary navigation | Chrome/Firefox, keyboard only: start at URL `/`, Tab to visible skip link, Enter to main content, Tab through links, Shift+Tab backward, activate modules and 404 recovery | Visible focus order/screenshot, route/fragment reached and tester/date | NOT_RUN |
| Mobile menu keyboard + focus recovery | 390px responsive browser: Tab to menu, Enter open, verify first menu link receives focus, Shift+Tab, Escape closes and returns focus to trigger; navigate to Build Hub | Open/closed screenshots, focus trace and tester/date | NOT_RUN |
| Search query and error recovery | `/search/?q=build`, ArrowDown to result, ArrowUp and Escape return input; test no results and overly long URL, announced errors, no external request | Form/result announcement recording and tester/date | NOT_RUN |
| Component validation / loading / disabled | `/ui-kit/`: keyboard activate Validate locally; verify error announced and described; correct input; trigger loading, empty and disabled states | Focus and announcement steps, state screenshots and tester/date | NOT_RUN |
| NVDA+Firefox / NVDA+Chrome | Windows: navigate Home, section preview, search and UI kit with headings/landmarks/links, status/alert semantics, result list and labeled fields | Version, speech log or notes, tester/date | NOT_RUN |
| VoiceOver+Safari | macOS or iOS: navigate the same routes with VoiceOver rotor; check landmark/heading structure, menu, form and status announcements | Safari/iOS/VO versions, notes and tester/date | NOT_RUN |
| TalkBack+Chrome | Android: swipe navigation through hero, menu, search, UI kit error/disabled | Android/TalkBack versions, notes and tester/date | NOT_RUN |
| Zoom/text resize and reflow | 320 CSS px/400% browser zoom and 200% text-only zoom on desktop; scroll and interact without losing text/controls or unnecessary horizontal scroll | Screenshot at actual browser zoom and viewport measurement, tester/date | NOT_RUN |
| Contrast / high-contrast themes | Windows forced-colors, Firefox High Contrast and dark/light system settings: focus, text legibility and non-color feedback | Theme, computed contrast and visual evidence, tester/date | NOT_RUN |
| Reduced motion | OS/browser reduced-motion preference: Home and UI kit loading states; verify no distracting motion while text feedback remains legible | OS preference/screenshot and tester/date | NOT_RUN |
| Real touch / targets | Real 320/390px mobile: tap menu, cards, search, error recovery; assess hit target size/spacing and no accidental activation | Device model, screenshots and tester/date | NOT_RUN |
| Review and sign-off | Attach executed checklist and automated Evidence Bundle, triage failures by severity, log owner acceptance and rollback for any failing release gate | Linked review entry/issue/PR, tester/date/verdict | NOT_RUN |

## Automated test evidence is separate

`apps/web/tests/fixtures/accessibility-matrix.json` inventories 11 routes, four sizes 1440/768/390/320, WCAG 2.2 A/AA axe tag categories and six mandatory interactive states. `tests/e2e/accessibility-release.spec.ts` checks full-page axe on desktop/mobile, 320px reflow, keyboard focus/recovery, error/loading/disabled states, reduced motion, forced-colors and screenshots. `scripts/verify-a11y-matrix.mjs` and negative unit tests reject missing route/viewports/coverage and a raised serious/critical threshold. PR CI workflow `wo19-accessibility.yml` saves browser evidence. None of these checks is a substitute for the NOT_RUN manual tasks.

**Release gate distinction:** Automated checks can be **PASS** while manual testing stays **NOT_RUN**. If an automated HIGH/CRITICAL or unapproved architecture/security regression is discovered, the PR must be **CORRECTION REQUIRED/BLOCKED** and may not advance. No deployment or public indexing is authorized by this procedure.
