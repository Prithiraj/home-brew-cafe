# Skip to My Brew — Review-photo Interior Integration Plan

**Branch:** `demo/review-interior-gallery`  
**Purpose:** demonstration/prototype only  
**Goal:** make the real café interior a stronger part of the elegant, photography-led site without returning to the game-like visual language of the first concept.

## 1. Asset status

### Cached locally for the demo

- `assets/demo/latte-editorial.jpg` — real Skip to My Brew drink photo from The Montclair Girl.
- `assets/demo/storefront-editorial.jpg` — real Skip to My Brew storefront photo from The Montclair Girl.

Both files have a provenance and launch-gate note in `assets/demo/README.md` and must be replaced or cleared before commercial launch.

### Public review/interior image

The strongest interior image currently used by the site is surfaced on the public Corner place/review page for Skip to My Brew. It shows the actual café interior, including the turquoise counter and pastel pendant lighting.

Automated download attempts returned HTTP 403 from the image CDN, including a browser user-agent and source-page referrer. We will **not** bypass that restriction. For this demonstration only, the page may display the public remote image with visible source attribution and a local SVG fallback.

## 2. Design intent

The interior should now carry more visual authority than interface chrome. The page should feel like a refined neighborhood coffeehouse whose digital layer is quietly advanced.

Principles:

1. **Real room first.** The interior image becomes a large editorial moment rather than a supporting thumbnail.
2. **One photograph, multiple readings.** Use the same review image in a full composition plus restrained detail crops to reveal counter color, pendant lights, and material texture without pretending they are separate photos.
3. **Three.js stays atmospheric.** Keep the hero steam overlay; do not add game-like particles, orbit rings, HUDs, or neon effects.
4. **Local assets where possible.** The drink and storefront now load from the repository instead of hotlinking editorial URLs.
5. **Visible provenance.** Demo-only photography remains labeled in captions and documented in the repository.

## 3. Page changes

### Hero

- Replace the remote latte URL with `assets/demo/latte-editorial.jpg`.
- Keep the existing transparent Three.js steam treatment.
- Keep the warm serif-led composition and current conversion actions.

### “Our space” section

Rebuild the section into a more immersive editorial composition:

- Large primary interior image using the public review/place source.
- Two overlapping detail crops using the same source image with different `object-position` values.
- A small source label: `Public place/review photo · demo use` linked to the Corner place page.
- Copy should focus on warm light, pastel counter, seating, books, booths, and the feeling of staying awhile.

This creates the visual richness of a multi-image spread without fabricating additional photographs.

### New “Seen inside” strip

Add a three-card visual narrative directly beneath the main room section:

1. **Pastel counter** — detail crop from the review interior image.
2. **A real cup** — locally cached latte image.
3. **Valley Road** — locally cached storefront image.

Each card gets a plain-language caption and source label. Motion is limited to a subtle image drift on pointer-capable devices and disabled for reduced-motion users.

### Gallery / details

- Replace remaining hotlinked Montclair Girl drink/storefront images with local demo copies.
- Keep external source links in captions.
- Preserve local SVG fallbacks.

## 4. Styling changes

- Add a `room-collage` composition with a dominant 4:5 image and two cropped inset frames.
- Use warm paper borders and restrained shadows rather than glass panels.
- Add `demo-source` caption styling that is small but readable.
- Add a three-column `seen-inside-grid` that collapses to a horizontal snap track on mobile.
- No new neon, glow, scan-line, HUD, or card-tilt effects.

## 5. Accessibility

- Repeated crops of the same interior photo will use `alt=""` when decorative so screen-reader users do not hear duplicate descriptions.
- The main interior image carries the meaningful alt text.
- Source links remain keyboard accessible.
- Reduced-motion users receive no image drift.

## 6. Performance

- Local cached photos avoid two remote image requests.
- The review interior remains lazy-loaded and has a local SVG fallback.
- Do not initialize additional WebGL scenes; the existing hero Three.js canvas remains the only WebGL surface.
- Keep explicit image dimensions to reduce layout shift.

## 7. Rights / launch gate

This branch is explicitly a demonstration build. Before commercial launch:

1. replace `assets/demo/*` with café-owned originals or obtain written reuse permission;
2. replace the remote review image with an owner-supplied equivalent or an authorized API/licensed source;
3. remove demo-only labeling once rights are cleared;
4. retain any attribution required by the final licenses.

## 8. Acceptance criteria

- The actual interior is one of the first major visual moments after the hero.
- The interior presentation feels editorial and elegant, not game-like.
- Three.js remains present only as subtle hero steam/atmosphere.
- The drink and storefront no longer hotlink The Montclair Girl image files.
- The public review interior image remains attributed and falls back safely.
- Mobile layout remains easy to scan and all calls to action still work.
- The site passes HTML/JS/CSS smoke checks and GitHub Pages deployment after merge.
