# Skip to My Brew — BREW/OS website

A research-grounded, futuristic single-page website concept for Skip to My Brew in Montclair, New Jersey.

## Highlights

- Responsive static site built for GitHub Pages
- Three.js animated “brew reactor” with CSS fallback
- Reduced-motion, keyboard, and semantic accessibility support
- Live New York-time open/closed indicator
- Representative menu tabs without invented prices
- Direct directions, phone pickup, Instagram, and embedded map paths
- Local-business structured data and social metadata
- Real business photography with visible source attribution

The detailed research, content rules, visual system, motion specification, and acceptance criteria are in [`DESIGN_PLAN.md`](DESIGN_PLAN.md).

## Run locally

Because the JavaScript uses ES modules, serve the directory rather than opening `index.html` directly:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Deployment

The included GitHub Pages workflow deploys the repository root whenever `main` changes. In the repository settings, set **Pages → Source** to **GitHub Actions** once if it is not already enabled.

Expected URL:

```text
https://prithiraj.github.io/home-brew-cafe/
```

## Content and image rights

Business details are based on the official social profile and cited local coverage as of September 1, 2026. Editorial/venue images are loaded from their public source URLs and visibly credited in the interface. Before using the site as the business’s commercial website, obtain written permission for those images or replace them with owner-supplied originals.

## Technology

Plain HTML, CSS, JavaScript, and a pinned Three.js ES module. No build step or package manager is required.
