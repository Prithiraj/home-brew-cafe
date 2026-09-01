from pathlib import Path
import re

INDEX = Path("index.html")
CSS = Path("styles.css")

LATTE_REMOTE = "https://www.themontclairgirl.com/wp-content/uploads/2025/03/skip-to-my-brew-coffee-montclair-nj-800x800.jpg"
STOREFRONT_REMOTE = "https://www.themontclairgirl.com/wp-content/uploads/2025/03/skip-to-my-brew-coffee-montclair-nj-1-800x533.jpg"
INTERIOR_REMOTE = "https://cdn.corner.inc/place-photo/AUy1YQ0a9eoAmFEx7UoKc-ED7ImyKXltOr6nSsdKU23WXnSElGLRPgWHEWsGvfiS2bo-ZSPMyQu7eQyhVr6PHzZ8GNY6_25QBkfsTymqNwWE3JNtblvfG3NVI_r-ZQJzkS2YJ91ze58DKYuxRXkvRcQg_rfRk35H8JIJc5yDbZsp-H9H2ExkzopwaH9NKWLZCqiUhuzcw12bbpa_bxi5cujfBiynFaFw6QdvVAiYjbb77wrcuvGDZgxpgvUbyU_n7E7h-9ol8rSHr2O3SIJUp2MyH3JIY4dSK52YWeTrKxOZD-EfMcJZPhoQkwC4mlLmvlGtKFjJees03pLUWbFjILzU_1xCEdCqGhhPC93zIp9AMYo6TSYxcI35lIXpXyG1FEZL4zLlEQwUKuimZPUAZAncPxrm5B4uNeAu15T_gnHMwZrDOO43RgnEqyANl0y_Z1OMiEv8cffdk80IBqK68b8E1SHyFP4gyH9a5MjtGFijYzV1S_B-nvScL1I0h8Wf7oV5naMgJtNhVgwy9sAGoJUq_kNdcbunmSt-ZM9sWMEQT1bzSP8bf85kui_HvRj-NesccW_E1XTHdXlTUQFPwdFCv2hcdq_l6Y9nNjfy9xf5XUBio4WNZUKfNGDtRYoRnaJb-TYmsA.jpeg/resolution%3D720"

html = INDEX.read_text()
html = html.replace(LATTE_REMOTE, "assets/demo/latte-editorial.jpg")
html = html.replace(STOREFRONT_REMOTE, "assets/demo/storefront-editorial.jpg")

story = f'''      <section class="section room-story" id="story" aria-labelledby="story-title">
        <div class="room-collage reveal">
          <figure class="room-collage-main">
            <img src="{INTERIOR_REMOTE}" data-fallback="assets/interior-fallback.svg" alt="Sunlit interior of Skip to My Brew with a turquoise counter and pastel pendant lights" width="540" height="720" loading="lazy" decoding="async" />
            <figcaption>
              <span>Inside Skip to My Brew</span>
              <a href="https://www.corner.inc/place/pPoJKx4ABRLn" target="_blank" rel="noreferrer">Public place/review photo · demo use ↗</a>
            </figcaption>
          </figure>
          <figure class="room-crop room-crop-counter" aria-hidden="true">
            <img src="{INTERIOR_REMOTE}" data-fallback="assets/interior-fallback.svg" alt="" width="540" height="720" loading="lazy" decoding="async" />
          </figure>
          <figure class="room-crop room-crop-light" aria-hidden="true">
            <img src="{INTERIOR_REMOTE}" data-fallback="assets/interior-fallback.svg" alt="" width="540" height="720" loading="lazy" decoding="async" />
          </figure>
        </div>

        <div class="story-copy reveal">
          <p class="kicker">A neighborhood room</p>
          <h2 id="story-title">Come for the coffee. <em>Stay for the room.</em></h2>
          <p class="section-lede">The most convincing part of Skip to My Brew is not a digital effect. It is the actual room: daylight, pastel color, a turquoise counter, booths, books, games, and corners that make a short coffee stop easy to stretch into an afternoon.</p>
          <p>Customer reviews repeatedly call out the warm lighting, window seats, couch, back booths, playful details, and work-friendly pace. The redesign lets that real atmosphere do more of the storytelling while the technology stays quiet in the background.</p>
          <dl class="story-details">
            <div><dt>Light</dt><dd>Soft daylight and warm fixtures instead of neon interface glow.</dd></div>
            <div><dt>Color</dt><dd>Pastel blues and warm neutrals already present in the physical café.</dd></div>
            <div><dt>Stay awhile</dt><dd>Booths, books, games, free Wi-Fi, and space for conversation or focus.</dd></div>
          </dl>
          <p class="demo-rights-note">Demo note: the interior image is publicly surfaced through a place/review listing and remains externally hosted with attribution. Replace it with an owner-cleared original before commercial launch.</p>
        </div>
      </section>

      <section class="section seen-inside" aria-labelledby="seen-inside-title">
        <div class="section-heading reveal">
          <p class="kicker">Inside, in layers</p>
          <h2 id="seen-inside-title">The details make it <em>feel familiar.</em></h2>
          <p>Real café imagery, presented like an editorial spread rather than a game interface.</p>
        </div>
        <div class="seen-inside-grid">
          <figure class="seen-card seen-card-interior reveal">
            <a href="https://www.corner.inc/place/pPoJKx4ABRLn" target="_blank" rel="noreferrer"><img src="{INTERIOR_REMOTE}" data-fallback="assets/interior-fallback.svg" alt="Pastel counter and pendant lights inside Skip to My Brew" width="540" height="720" loading="lazy" decoding="async" /></a>
            <figcaption><strong>Pastel counter</strong><span>Public place/review photo · demo use</span></figcaption>
          </figure>
          <figure class="seen-card reveal">
            <a href="https://www.themontclairgirl.com/skip-to-my-brew-coffee-montclair-nj/" target="_blank" rel="noreferrer"><img src="assets/demo/latte-editorial.jpg" data-fallback="assets/hero-fallback.svg" alt="Latte art in a ceramic cup at Skip to My Brew" width="800" height="800" loading="lazy" decoding="async" /></a>
            <figcaption><strong>A real cup</strong><span>The Montclair Girl · demo cache</span></figcaption>
          </figure>
          <figure class="seen-card seen-card-storefront reveal">
            <a href="https://www.themontclairgirl.com/skip-to-my-brew-coffee-montclair-nj/" target="_blank" rel="noreferrer"><img src="assets/demo/storefront-editorial.jpg" data-fallback="assets/storefront-fallback.svg" alt="Skip to My Brew storefront at 145 Valley Road in Montclair" width="800" height="533" loading="lazy" decoding="async" /></a>
            <figcaption><strong>Valley Road</strong><span>The Montclair Girl · demo cache</span></figcaption>
          </figure>
        </div>
      </section>'''

pattern = re.compile(r'      <section class="section story-section" id="story".*?^      </section>', re.S | re.M)
html, count = pattern.subn(story, html, count=1)
if count != 1:
    raise SystemExit(f"Expected exactly one story section; replaced {count}")
INDEX.write_text(html)

styles = CSS.read_text()
marker = "/* Review-photo interior integration */"
if marker not in styles:
    styles += '''

/* Review-photo interior integration */
.room-story { display:grid; grid-template-columns:minmax(0,1.12fr) minmax(300px,.88fr); gap:clamp(3rem,7vw,7.5rem); align-items:center; }
.room-collage { position:relative; min-height:min(760px,72vw); padding:clamp(1rem,2vw,1.5rem) clamp(2.25rem,6vw,5.25rem) clamp(4.5rem,8vw,7rem) 0; }
.room-collage-main { position:relative; margin:0; width:min(78%,560px); overflow:hidden; border:1px solid rgba(91,59,45,.22); border-radius:2px; background:var(--paper,#e9dfd0); box-shadow:0 28px 65px rgba(42,29,24,.14); z-index:2; }
.room-collage-main img,.room-crop img,.seen-card img { width:100%; height:100%; display:block; object-fit:cover; }
.room-collage-main img { aspect-ratio:3/4; }
.room-collage-main figcaption { display:flex; justify-content:space-between; gap:1rem; align-items:baseline; padding:.85rem 1rem 1rem; background:rgba(245,240,232,.96); border-top:1px solid rgba(91,59,45,.16); font-size:.78rem; }
.room-collage-main figcaption span { font-weight:700; color:var(--espresso,#2a1d18); }
.room-collage-main figcaption a { color:inherit; opacity:.68; text-align:right; }
.room-crop { position:absolute; margin:0; overflow:hidden; border:10px solid var(--porcelain,#f5f0e8); box-shadow:0 20px 50px rgba(42,29,24,.16); background:var(--paper,#e9dfd0); }
.room-crop-counter { right:0; top:10%; width:36%; aspect-ratio:4/5; z-index:3; }
.room-crop-counter img { object-position:56% 48%; transform:scale(1.42); }
.room-crop-light { right:7%; bottom:0; width:42%; aspect-ratio:5/4; z-index:4; }
.room-crop-light img { object-position:54% 12%; transform:scale(1.55); }
.demo-rights-note { margin-top:2rem; padding-top:1rem; border-top:1px solid rgba(91,59,45,.2); font-size:.78rem; line-height:1.55; color:rgba(42,29,24,.62); }
.seen-inside { padding-top:clamp(2rem,5vw,4rem); }
.seen-inside-grid { display:grid; grid-template-columns:1.15fr .9fr 1fr; gap:clamp(1rem,2vw,1.75rem); margin-top:clamp(2rem,4vw,3.5rem); align-items:stretch; }
.seen-card { margin:0; background:rgba(255,255,255,.22); border:1px solid rgba(91,59,45,.16); overflow:hidden; }
.seen-card a { display:block; overflow:hidden; aspect-ratio:4/5; background:var(--paper,#e9dfd0); }
.seen-card img { transition:transform .8s cubic-bezier(.2,.7,.2,1); }
.seen-card-interior img { object-position:50% 38%; }
.seen-card-storefront a { aspect-ratio:4/5; }
.seen-card-storefront img { object-position:50% 50%; }
.seen-card figcaption { display:grid; gap:.2rem; padding:1rem 1.05rem 1.15rem; }
.seen-card figcaption strong { font-family:"Cormorant Garamond",Georgia,serif; font-size:1.45rem; font-weight:600; }
.seen-card figcaption span { font-size:.72rem; letter-spacing:.04em; color:rgba(42,29,24,.58); }
@media (hover:hover) and (pointer:fine) { .seen-card:hover img { transform:scale(1.025); } }
@media (max-width:900px) { .room-story { grid-template-columns:1fr; } .room-collage { width:min(100%,680px); min-height:680px; margin-inline:auto; } .seen-inside-grid { grid-template-columns:repeat(3,minmax(260px,1fr)); overflow-x:auto; scroll-snap-type:x proximity; padding-bottom:.75rem; } .seen-card { scroll-snap-align:start; } }
@media (max-width:600px) { .room-collage { min-height:570px; padding-right:2.25rem; padding-bottom:4.25rem; } .room-collage-main { width:84%; } .room-crop-counter { width:38%; top:13%; } .room-crop-light { width:47%; right:2%; } .room-collage-main figcaption { display:grid; } .room-collage-main figcaption a { text-align:left; } }
@media (prefers-reduced-motion:reduce) { .seen-card img { transition:none; } }
'''
    CSS.write_text(styles)

# Smoke checks
final = INDEX.read_text()
assert "assets/demo/latte-editorial.jpg" in final
assert "assets/demo/storefront-editorial.jpg" in final
assert "room-collage" in final
assert "seen-inside-grid" in final
ids = re.findall(r'id="([^"]+)"', final)
assert len(ids) == len(set(ids)), "duplicate IDs"
print("Interior integration applied")
