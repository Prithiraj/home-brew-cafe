# Skip to My Brew — The Familiar Ritual

A research-grounded, photography-first website concept for Skip to My Brew in Montclair, New Jersey.

The redesign presents the café as a warm, recognizable neighborhood coffeehouse with classic editorial typography, real café photography, and restrained Three.js steam layered over the hero drink image. The technology adds atmosphere rather than turning the experience into a game interface.

## Highlights

- Real café/drink photography above the fold with visible source attribution
- Transparent Three.js steam overlay with a CSS fallback
- Warm porcelain, espresso, café-blue, sage, and aged-brass visual system
- Refined serif display type and direct, familiar copy
- Live New York-time open/closed indicator
- Accessible representative menu tabs without invented prices
- Directions, phone pickup, Instagram, map, and mobile quick actions
- Reduced-motion, keyboard, semantic, and no-WebGL support
- Local-business structured data and social metadata
- Static GitHub Pages deployment with no build step

The design rationale, evidence guardrails, motion plan, and acceptance criteria are documented in [`DESIGN_PLAN.md`](DESIGN_PLAN.md).

## Run locally

The JavaScript uses an ES module, so serve the directory instead of opening `index.html` directly:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Deployment

`.github/workflows/pages.yml` deploys the repository root whenever `main` changes.

Live site:

```text
https://prithiraj.github.io/home-brew-cafe/
```

## Content and image rights

Business details are based on the official social profile and cited local coverage as of September 1, 2026. Editorial and contributor images are loaded from their public source URLs and visibly credited. Before the site becomes an official commercial property, obtain written permission for those images or replace them with owner-supplied originals hosted in this repository.

Local SVG illustrations are only fallbacks when a remote editorial image cannot load; they do not claim to depict the exact physical café.

## Technology

Plain HTML, CSS, JavaScript, and a pinned Three.js ES module. No framework, package manager, or production build step is required.
