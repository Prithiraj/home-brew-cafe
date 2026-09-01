# Skip to My Brew — Futuristic Website Plan

**Working concept:** `BREW/OS — Coffee for this timeline`  
**Business:** Skip to My Brew, 145 Valley Road, Montclair, New Jersey  
**Delivery target:** Fast, accessible static site hosted on GitHub Pages  
**Research lock date:** September 1, 2026

## 1. Evidence baseline

The website must feel imaginative, but its factual content must remain grounded. The implementation uses the following public evidence:

| Verified signal | Design/content implication | Source |
|---|---|---|
| The official Instagram profile lists **145 Valley Road**, **Tuesday–Sunday, 8 AM–4 PM**, free Wi-Fi, and call-in pickup. | Put hours, directions, Wi-Fi, and call-to-order above the fold. Do not claim online ordering. | [Official Instagram profile](https://www.instagram.com/skip_to_my_brew/) |
| Local opening coverage describes pastel/spring colors, booths, high-top seating, books, espresso drinks, teas, pastries, and sweet-foam lattes. | Base the palette on powder blue, custard, coral, and espresso; present the café as a place to stay, not only transact. | [The Montclair Girl opening coverage](https://www.themontclairgirl.com/skip-to-my-brew-coffee-montclair-nj/) |
| The menu has included Americano, cortado, cappuccino, flavored espresso drinks, ube/caramel/strawberry sweet-foam lattes, named teas, croissants, cookies, macarons, and cupcakes. | Show a representative, price-free menu architecture and clearly label seasonal/rotating items. | [The Montclair Girl café guide](https://www.themontclairgirl.com/best-montclair-coffee-shops/) |
| A venue guide describes Fallout-inspired details, board games, comfortable booths, mouse doors, bear handles, and cold brew served with coffee ice cubes. | Build a subtle game-interface narrative and make “coffee ice cubes” a memorable product story. Avoid copying protected Fallout art, names, or logos. | [Corner venue guide](https://www.corner.inc/place/pPoJKx4ABRLn) |
| A 2026 local guide includes the café as a place to play board games. | Give board games a dedicated experience card and reason-to-visit role. | [Montclair board-game guide](https://www.themontclairgirl.com/tabletop-board-game-spots-montclair-essex-county-nj/) |
| The official feed has promoted seasonal drinks, including a Blueberry Pancake Latte. | Treat limited drinks as “seasonal signals” and send visitors to Instagram for today’s availability. | [Official Instagram profile](https://www.instagram.com/skip_to_my_brew/) |

### Content guardrails

- Do not publish prices until the owner supplies a current menu.
- Do not freeze a Google star rating or review count into the UI; those change.
- Do not claim delivery, reservations, catering, loyalty rewards, or late hours without confirmation.
- Present menu items as representative and include “availability rotates.”
- The prototype references public editorial/venue imagery with visible attribution. Before commercial launch, replace those files with owner-supplied originals or obtain written usage permission.

## 2. Strategic goal

Turn a search or social visitor into an in-person visit with minimal friction while making the brand memorable enough to revisit directly.

### Primary conversions

1. Open Google Maps directions.
2. Call for pickup.
3. Check hours/status.
4. Explore representative drinks and café features.
5. Follow the official Instagram feed for current specials.

### Secondary outcomes

- Establish a distinctive identity that is different from a generic pastel café.
- Communicate “stay awhile”: Wi-Fi, books, booths, and board games.
- Create a platform that can later accept a real menu, ordering link, loyalty system, events, and owner photography.

## 3. Audience

### Remote workers and students

Need immediate proof of Wi-Fi, seating, hours, and a comfortable stay. The site uses a live local open/closed indicator and surfaces free Wi-Fi early.

### Local regulars

Need seasonal drops, pickup access, and quick directions. Calls to action remain fixed and thumb-friendly on mobile.

### Experience seekers and gamers

Need a reason this café is worth a special trip. The game-interface language, board-game card, lore-like details, and 3D “brew reactor” provide that hook without using another franchise’s intellectual property.

### Coffee explorers

Need credible menu signals. The site groups classic espresso, sweet-foam drinks, teas, pastries, and rotating experiments without fabricating a full menu.

## 4. Creative direction: BREW/OS

A warm neighborhood café interpreted through the interface of an optimistic future. It should feel like a friendly control room discovered behind a pastel storefront—not a cyberpunk nightclub.

### Brand language

- **Headline:** Coffee for this timeline.
- **Support:** Seasonal lattes, coffee ice cubes, board games, books, booths, and free Wi-Fi in Montclair.
- **Interface vocabulary:** signal, protocol, archive, reactor, coordinates, current transmission.
- **Tone:** curious, welcoming, slightly playful, never cryptic enough to hurt usability.

### Visual system

| Token | Use |
|---|---|
| Espresso `#130f14` | Main background and high-contrast foundation |
| Cream `#fff8e8` | Primary text and paper-like surfaces |
| Powder blue `#71d5ea` | Storefront-derived brand signal and links |
| Custard `#f4e58d` | Highlights, stars, status, and warmth |
| Coral `#ff806d` | Conversion emphasis and energetic accents |
| Ube `#aa8cff` | Secondary glow and seasonal-latte cue |

- **Display type:** Syne, for a futuristic but human headline voice.
- **Body/UI type:** Space Grotesk and Space Mono.
- Large rounded geometry references mugs, booth cushions, and mid-century forms.
- Fine grids, scan lines, and status labels provide the futuristic layer.
- Photography remains warm and real, preventing the interface from feeling synthetic.

## 5. Information architecture

1. **Hero / live status** — identity, positioning, directions, call-to-pickup, address, hours.
2. **Signal ticker** — fast list of the café’s strongest verified differentiators.
3. **Café lore** — linger, coffee ice cubes, and board games.
4. **Representative menu systems** — espresso, sweet foam, tea, pastry/seasonal items.
5. **Real-space gallery** — storefront/interior/product evidence and photography credits.
6. **Visit module** — live map, hours, phone, address, transit-ready directions.
7. **Evidence footer** — official social link and source acknowledgments.

## 6. Motion and Three.js plan

### Hero: Brew Reactor

A lightweight Three.js scene will render:

- A stylized floating coffee vessel built from primitives.
- A reflective coffee surface and orbiting flavor particles.
- Three animated steam trails generated from curves.
- Two orbital rings that respond to pointer movement and scroll.
- Warm/cool lights matching the physical storefront palette.

The scene supports the copy instead of blocking it. It is decorative, marked `aria-hidden`, and has a static CSS fallback.

### Page motion

- Scroll-triggered reveal for content groups using `IntersectionObserver`.
- Slow signal marquee with duplicated content for continuity.
- Magnetic-but-subtle primary buttons on pointer devices.
- Image drift and perspective tilt only on capable devices.
- A low-opacity scanning line for the system-interface feeling.

### Motion accessibility

When `prefers-reduced-motion: reduce` is enabled:

- The Three.js render loop stops after a single composed frame.
- Marquee, scan, float, reveal, and magnetic effects are disabled.
- All content remains visible and in its final position.

## 7. Responsive behavior

- **Mobile first:** one-column hero, canvas behind/above content, fixed bottom conversion dock.
- **Tablet:** split cards and horizontally scrollable gallery.
- **Desktop:** asymmetric two-column hero, editorial grids, cursor-reactive 3D scene.
- Minimum 44px interactive targets and safe-area support for modern phones.

## 8. Accessibility

- Semantic landmarks and logical heading order.
- Visible skip link and keyboard focus states.
- Decorative canvas excluded from the accessibility tree.
- Real image descriptions rather than aesthetic-only alt text.
- High-contrast text over dark surfaces; no information encoded by color alone.
- Hours presented as text, not only as a live status color.
- Reduced-motion and coarse-pointer adaptations.

## 9. Performance

- No framework runtime; plain HTML, CSS, and JavaScript.
- Three.js is pinned and loaded as a module from a CDN.
- Pixel ratio capped at 1.5 and rendering pauses while the hero is offscreen.
- Images use `loading="lazy"`, explicit dimensions/aspect ratios, and remote-source fallbacks.
- Fonts are preconnected and limited to the weights used.
- The experience remains usable if JavaScript, Three.js, Instagram, or remote images fail.

## 10. Search and local discovery

- Unique title and meta description with Montclair and Valley Road.
- Canonical URL targeting the GitHub Pages deployment until a custom domain exists.
- `CafeOrCoffeeShop` JSON-LD with address, phone, geo coordinates, hours, and social profile.
- Open Graph/Twitter metadata.
- Location, phone, and hours rendered as crawlable HTML.
- Google Maps embed and direct directions link.

## 11. Measurement plan

When analytics is approved, track only high-value, privacy-conscious events:

- `directions_click`
- `pickup_call_click`
- `instagram_click`
- `menu_section_view`
- `map_interaction`

A first-party or privacy-friendly analytics tool is preferred. No tracker is added in this implementation because consent and vendor choice are not yet defined.

## 12. Deployment plan

- Static assets live in the repository root for direct GitHub Pages compatibility.
- A GitHub Actions workflow publishes on every push to `main`.
- A `.nojekyll` file prevents asset processing surprises.
- A custom domain can later be added with `CNAME` without changing the application architecture.

## 13. Acceptance criteria

- The page works at 320px through wide desktop sizes.
- Directions, phone, Instagram, and map links resolve to the verified business.
- Three.js animates on capable devices and degrades safely.
- Reduced-motion users receive a calm, fully readable version.
- No prices, ratings, or services are invented.
- Actual business photography is visibly credited and flagged for rights confirmation before a commercial launch.
- GitHub Pages can deploy the repository without a build step.
