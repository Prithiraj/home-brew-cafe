# Skip to My Brew — Classic, Familiar, and Quietly Futuristic Redesign Plan

**Plan version:** 2.0  
**Working concept:** **The Familiar Ritual**  
**Design statement:** A warm, recognizable neighborhood coffeehouse presented with classic editorial elegance; Three.js adds atmosphere and depth rather than a game interface.  
**Status:** Implemented on the `redesign/classic-elegant-threejs` branch.

## 1. Why the current hero feels game-like

The current hero is technically strong, but several choices combine into a game/control-panel impression:

- A large fully synthetic 3D cup is the dominant visual.
- Neon orbital rings, particles, and black space suggest a game object or power-up.
- Labels such as “Brew Reactor,” “Online,” “Signal,” “Protocol,” and “Plot a course” create a HUD vocabulary.
- Monospaced type, scan lines, glowing borders, and status panels reinforce the interface metaphor.
- The real café and its tactile qualities appear later, so the first impression is digital rather than hospitable.

The redesign will keep the technical sophistication but move it below the surface.

## 2. New creative direction: The Familiar Ritual

The guiding idea is:

> **A real cup, a real room, and a little impossible atmosphere.**

The site should feel familiar in the first two seconds: coffee, warmth, daylight, wood, ceramic, people, and a neighborhood storefront. The futuristic layer should be discovered through subtle motion, depth, light, and steam—not announced through sci-fi vocabulary.

### Design balance

| Quality | How it will appear |
|---|---|
| Familiar | A real café photograph above the fold, plain-language navigation, recognizable coffeehouse materials, and direct calls to action. |
| Classic | Serif display typography, balanced editorial composition, restrained ornament, fine rules, warm paper tones, and timeless photography. |
| Elegant | Generous spacing, limited color, refined transitions, quiet shadows, and fewer competing interface elements. |
| Futuristic | Transparent Three.js steam, depth-aware parallax, subtle light refraction, responsive highlights, and smooth scene transitions. |
| Playful | A small amount of whimsy in the details, while board games and themed décor remain supporting content rather than the visual framework. |

## 3. Evidence-to-design decisions

| Evidence | Design consequence |
|---|---|
| The café is described as bright, spring-hued, cozy, and furnished with booths, high-top seating, and books. | Use warm daylight, soft pastel accents, and editorial photography of the actual space rather than a dark synthetic world. |
| The current site already references a real latte photograph, a storefront image, and an interior image. | Promote a real drink image into the hero and keep the storefront/interior as supporting proof. |
| Coffee ice cubes, sweet-foam drinks, board games, and whimsical details are genuine differentiators. | Feature these as human stories and photographic details, not as “systems,” “protocols,” or game stats. |
| The business needs directions, hours, phone pickup, and Instagram discovery. | Preserve all current conversion paths and make their labels simpler and more familiar. |

## 4. Chosen hero concept: Editorial Still Life + Living Steam

### Desktop composition

Use an asymmetric two-column layout:

- **Left, 42%:** brand, open/closed status, a classic serif headline, one concise paragraph, and two plain-language actions.
- **Right, 58%:** a tall real photograph of an actual Skip to My Brew drink in the café.
- The photo sits in a refined frame with a thin warm-brass rule and a soft, natural shadow.
- A transparent Three.js canvas overlays the photograph and extends slightly outside its frame.

Suggested headline direction:

> **A familiar cup, with a little wonder.**

Suggested supporting line:

> Espresso, sweet-foam lattes, tea, pastries, books, games, and a comfortable place to stay awhile in Montclair.

Suggested actions:

- **Get directions**
- **Call for pickup**

### Image treatment

The preferred hero asset is a real, high-resolution image of one of the café’s drinks on a wood, stone, or café table, with recognizable interior color or light in the background. The current latte image can be used for the first prototype, but the commercial version should use an owner-provided original or an image with explicit usage permission.

The cup itself remains photographic. We will not rebuild it as 3D geometry.

### Hybrid effect

Three.js will add four tightly controlled effects:

1. **Steam volume** — soft translucent steam particles originate from the photographed cup and drift naturally.
2. **Light movement** — a barely visible warm highlight travels across the image, resembling window light rather than a neon shader.
3. **Depth parallax** — the photo, frame, steam, and caption move at slightly different rates, with a maximum displacement of roughly 6–10 pixels.
4. **Coffee shimmer** — an optional masked highlight over the coffee surface, used only when the cup position and image crop make it convincing.

The result should initially register as a beautiful photograph. The motion becomes noticeable only after a moment.

## 5. Three.js redesign

### Remove

- The giant procedural mug
- Orbit rings
- Multicolored floating spheres
- Floor rings
- Constant object rotation
- HUD boxes and “online” indicators inside the visual
- Bright cyan, purple, and coral point lights

### Keep and refine

- Transparent WebGL canvas
- Pointer response, reduced to subtle parallax
- IntersectionObserver-based pause when off-screen
- Device-pixel-ratio cap
- Reduced-motion support
- Static fallback when WebGL or the CDN fails

### Proposed scene structure

```text
Hero image — regular responsive <picture>
└── Transparent Three.js overlay
    ├── Steam particle field / custom shader
    ├── Soft moving light texture
    ├── Optional coffee-surface highlight mask
    └── Subtle film-grain or dust field at very low opacity
```

### Technical behavior

- Three.js loads after the primary hero image so it does not delay the Largest Contentful Paint.
- The canvas uses `pointer-events: none`; the photograph and actions remain normal HTML.
- Steam uses a low-count `THREE.Points` system or instanced sprites with noise-driven motion.
- No heavy post-processing pipeline is required.
- Desktop target: smooth 60 fps on ordinary modern hardware.
- Mobile target: reduced particle count and no cursor interaction.
- `prefers-reduced-motion: reduce`: render one calm frame or hide the animated layer entirely.

## 6. Visual system

### Palette

| Token | Suggested value | Role |
|---|---:|---|
| Porcelain | `#F5F0E8` | Main page background |
| Warm paper | `#E9DFD0` | Secondary surfaces |
| Espresso | `#2A1D18` | Text, footer, buttons |
| Walnut | `#5B3B2D` | Borders, details, hover states |
| Muted café blue | `#7EA7B2` | Brand accent derived from the storefront |
| Sage | `#6C7866` | Secondary accent |
| Aged brass | `#AE8A56` | Fine rules and restrained highlights |

Bright neon gradients will be removed. The darkest color becomes an accent and footer color rather than the full-page environment.

### Typography

- **Display:** Cormorant Garamond, Libre Baskerville, or another refined serif with excellent web rendering.
- **Body and navigation:** a neutral humanist sans such as DM Sans or Inter.
- **Metadata:** the body sans in small caps; monospaced text is removed from primary UI.

Typography should resemble a contemporary café magazine or menu, not a game console.

### Shape and surface language

- Smaller radii, approximately 12–24px, rather than oversized sci-fi capsules.
- Thin hairline borders instead of glowing outlines.
- Natural shadows with broad blur and low opacity.
- Optional subtle paper grain, used as a CSS texture at very low contrast.
- No scan-line overlay.

## 7. Copy and vocabulary reset

Replace interface metaphors with direct coffeehouse language.

| Current | Replacement |
|---|---|
| Brew Reactor | Today at the café / remove label entirely |
| Online | Open now |
| Plot a course | Get directions |
| Signal | Special / favorite / current menu |
| Protocol | Menu / drink style |
| Tea archive | Tea |
| Physical portal | Inside the café |
| Rendezvous | Visit us |
| Coffee for this timeline | A familiar cup, with a little wonder |

The café’s gaming personality will still appear in one story card or gallery caption, but it will not define every sentence.

## 8. Full-page structure

### 1. Header

- Wordmark or simple text logo
- Menu, Our Space, Visit, Instagram
- Small “Open now” status
- One clear “Get directions” action

### 2. Hero

- Real drink photograph
- Three.js steam/light overlay
- Serif headline
- Directions and pickup actions
- Address and hours in simple text

### 3. Signature strip

Replace the sci-fi ticker with a calm editorial line:

> Espresso · Sweet-foam lattes · Tea · Pastries · Coffee ice cubes · Books and board games

This may scroll very slowly on small screens, but should remain still on desktop.

### 4. Menu highlights

- Four elegant categories: Espresso, Sweet Foam, Tea, Pastries & Seasonal
- Avoid console styling and numbered tabs
- Use an understated tab underline or a stacked menu layout
- Pair at least one category with a real product image

### 5. The room

- Large interior photo
- Short copy about booths, books, Wi-Fi, window seating, and staying awhile
- Small supporting detail images for games, mouse doors, handles, or other real whimsical touches

### 6. Coffee ice cubes feature

- Real close-up image if available
- A brief explanation in plain language
- Subtle animated condensation or light effect, not a game card

### 7. Gallery

- Storefront, interior, drink, and detail images
- Editorial mosaic with simple captions
- No “View / 01” or portal language

### 8. Visit

- Warm map treatment
- Address, hours, phone, and directions
- Preserve mobile quick actions

### 9. Footer

- Deep espresso background
- Brand, address, hours, Instagram, and attribution/rights note

## 9. Image acquisition and rights plan

### Required production image set

1. **Hero drink:** vertical or square, 2000px minimum on the long edge
2. **Interior wide:** booths/counter/window light
3. **Storefront:** full sign and entrance
4. **Coffee ice cubes:** close detail
5. **Atmosphere detail:** games, books, whimsical handle, or decorative element

### Rules

- Use the café’s own photography wherever possible.
- Do not use unrelated stock coffee photography in the final version.
- Do not hotlink third-party images in production.
- Obtain owner originals or written permission before commercial launch.
- Export local AVIF/WebP/JPEG variants with responsive crops.
- Keep meaningful alt text and explicit image dimensions.

## 10. Motion system beyond the hero

Motion will become slower, shorter, and more physical:

- Text reveal: 350–500ms fade and 8–12px rise
- Images: gentle crop reveal or 1–2% scale shift
- Buttons: underline or fill transition; remove magnetic movement
- Cards: no 3D tilt
- Section transitions: subtle changes in paper tone and spacing
- Gallery: minimal parallax only on desktop
- Map: no grid/HUD overlay

No animation should compete with the drink photograph or make the page feel like a game menu.

## 11. Responsive plan

### Mobile

- Hero photo appears first or immediately after the headline.
- Photo uses a 4:5 crop with steam anchored to the visible cup position.
- Three.js particle count is reduced substantially.
- Actions remain in the existing fixed mobile dock.
- No hover-dependent content.

### Tablet

- Two-column hero only when the image remains large enough to feel intentional.
- Menu can use horizontal category tabs with a clear active underline.

### Desktop

- Editorial split hero with generous whitespace.
- Three.js overlay can extend beyond the photo edge for one subtle “impossible” moment.

## 12. Accessibility and performance requirements

- Core content and actions work with JavaScript disabled.
- Canvas remains decorative and excluded from the accessibility tree.
- Minimum 44px interactive targets.
- Strong contrast on all text and buttons.
- Visible keyboard focus.
- Full reduced-motion behavior.
- Hero image target under roughly 350 KB in its primary mobile variant.
- Three.js initializes after the hero image and pauses when not visible.
- No layout shift from images, fonts, or canvas.
- Target mobile LCP under 2.5 seconds on a representative 4G test.

## 13. Implementation sequence

### Phase 1 — Asset and composition proof

- Select the hero drink photo and verify usage rights.
- Produce one desktop and one mobile static hero mockup.
- Lock typography, crop, palette, and copy before animation work.

### Phase 2 — Global classic/elegant refresh

- Replace typography and color tokens.
- Simplify navigation, buttons, cards, labels, and section vocabulary.
- Remove scan lines, neon glows, tilt cards, and game-console styling.

### Phase 3 — Hybrid Three.js hero

- Remove the procedural cup scene.
- Build the transparent steam/light overlay.
- Calibrate steam origin to desktop and mobile image crops.
- Add fallbacks and reduced-motion behavior.

### Phase 4 — Photography-led sections

- Rebuild menu, room, coffee-ice, gallery, and visit sections around real imagery.
- Host optimized assets locally after permission is confirmed.

### Phase 5 — QA and deployment

- Test 320px through wide desktop sizes.
- Test Safari, Chrome, Firefox, and Edge.
- Run Lighthouse and accessibility checks.
- Verify all directions, phone, Instagram, and map interactions.
- Deploy through the existing GitHub Pages workflow.

## 14. Acceptance criteria

The redesign is complete when:

- A first-time visitor identifies it as a real neighborhood café within two seconds.
- A real Skip to My Brew drink or space appears above the fold.
- Three.js is present and memorable, but the visual still reads as photography first.
- No orbit rings, neon particles, HUD panels, scan lines, or game-console labels remain.
- The palette feels warm, tactile, and classic.
- The typography feels editorial and elegant.
- Board games and themed details are discoverable without dominating the brand.
- Directions, hours, phone pickup, Instagram, structured data, map, and mobile quick actions remain intact.
- The experience works without WebGL and honors reduced-motion preferences.
- Production images are locally hosted and usage rights are documented.

## 15. Proposed implementation branch

Once this plan is approved, implement on:

```text
redesign/classic-elegant-threejs
```

Create a pull request with desktop and mobile screenshots before merging to `main` and redeploying GitHub Pages.

## Reference sources

- Current repository implementation: `Prithiraj/home-brew-cafe`, especially `index.html`, `script.js`, and `DESIGN_PLAN.md`
- The Montclair Girl, “Skip to My Brew: Montclair’s Newest Coffee Shop on Valley Road”
- Corner venue guide for Skip to My Brew
- Official Instagram profile: `@skip_to_my_brew`


## 14. Implementation record

The approved direction is implemented with a photography-first hero, a transparent Three.js steam overlay, restrained pointer parallax, warm editorial typography, accessible menu tabs, real café imagery with attribution, local SVG fallbacks, and the original conversion paths preserved. The legacy synthetic mug, orbit rings, particles, HUD panels, scan lines, neon palette, magnetic controls, and game-interface vocabulary have been removed.
