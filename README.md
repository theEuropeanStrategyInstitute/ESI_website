# ESI — Four Art Directions

A private comparison site and editable source for four ESI homepage concepts. Select a direction in the top bar, then use **Design rationale** to read its influences and implementation rationale.

## Run locally

Requires Node >= 22.13 and npm. Install with `npm ci`, then `npm run dev`. The local preview is printed by the server. `npm run build` creates the Sites/Cloudflare-compatible production output.

The deliverable folder `../Design-study/` includes an offline index, four standalone HTML previews, eight full-page image exports and the full source-grounded art-direction study. Open `../Design-study/index.html` and retain its adjacent assets and visualisations directories.

## Implementation

- `app/page.tsx`: comparison controls and four distinct homepage compositions.
- `app/rationale.ts`: per-direction design rationales, palettes and judgement.
- `app/globals.css`: local fonts, brand tokens, four visual systems and responsive rules.
- `public/assets/`: original extracted ESI logo variants and bridge photograph, unchanged supplied overview PDF, fonts and licences.
- `scripts/build-study.mjs`: generates the offline comparison index.
- `scripts/render-artboards.mjs`: exports desktop/mobile artboards and standalone HTML. It uses the Codex bundled Playwright runtime and local Chrome; adjust its import to your installed Playwright if used outside this environment.

## Validation and limits

- Application-source lint (`npx oxlint app`) and TypeScript (`npx tsc --noEmit`) pass.
- Production build passes.
- Desktop (1440 px) and mobile (390 px) images rendered and visually inspected. These are the requested presentation renders; a full interactive cross-browser/accessibility test suite was not run.
- Full repository lint reports pre-existing errors in generated, unused component-library files. They have not been rewritten to satisfy an unrelated lint baseline.
- The generated dependency installation reported 11 audit findings (1 low, 2 moderate, 8 high). Dependency remediation and a production security review are still required before adopting this prototype stack for a public client site. No forced dependency upgrade was applied.
- Working prototype affordances: direction selection, rationale view, section links, native mobile menu, native work disclosures, actual overview PDF and mailto contact. No CMS, French translation, booking, analytics or form backend is implied.
- Copy is proposed, council roles are sourced from the client deck, and the original PDF remains unchanged. Confirm legal entity details, council membership/consent, image rights, vector logo masters, official colour values, tagline and LinkedIn URL before public launch.
