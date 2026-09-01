const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const coarsePointer = window.matchMedia("(pointer: coarse)");

function updateHeader() {
  document.querySelector("[data-header]")?.classList.toggle("is-scrolled", window.scrollY > 16);
}

function updateBusinessStatus() {
  const longStatus = document.querySelector("[data-open-status]");
  const shortStatus = document.querySelector("[data-open-status-short]");
  const dots = document.querySelectorAll(".status-dot");
  if (!longStatus && !shortStatus) return;

  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23"
    }).formatToParts(new Date());

    const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
    const day = values.weekday;
    const minutes = Number(values.hour) * 60 + Number(values.minute);
    const openDays = new Set(["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
    const isOpen = openDays.has(day) && minutes >= 8 * 60 && minutes < 16 * 60;

    dots.forEach((dot) => dot.classList.toggle("is-open", isOpen));

    if (shortStatus) {
      shortStatus.textContent = isOpen ? "Open now" : "Closed now";
    }

    if (longStatus) {
      longStatus.textContent = isOpen
        ? "Open now · pouring until 4 PM"
        : day === "Mon"
          ? "Closed Monday · back Tuesday at 8 AM"
          : minutes < 8 * 60
            ? "Closed for now · opens at 8 AM"
            : "Closed for today · back at 8 AM";
    }
  } catch {
    if (shortStatus) shortStatus.textContent = "Tue–Sun · 8–4";
    if (longStatus) longStatus.textContent = "Tuesday–Sunday · 8 AM–4 PM";
  }
}

function initMobileMenu() {
  const button = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-mobile-menu]");
  const header = document.querySelector("[data-header]");
  if (!button || !menu || !header) return;

  const closeMenu = () => {
    button.setAttribute("aria-expanded", "false");
    menu.hidden = true;
    header.classList.remove("is-open");
    document.body.classList.remove("nav-open");
  };

  button.addEventListener("click", () => {
    const open = button.getAttribute("aria-expanded") !== "true";
    button.setAttribute("aria-expanded", String(open));
    menu.hidden = !open;
    header.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
  });

  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

function initReveals() {
  const elements = [...document.querySelectorAll(".reveal")];
  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -5%" }
  );

  elements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 3, 2) * 65}ms`;
    observer.observe(element);
  });
}

function initTabs() {
  const tabs = [...document.querySelectorAll("[role='tab'][data-tab]")];
  const panels = [...document.querySelectorAll("[role='tabpanel'][data-panel]")];
  if (!tabs.length || !panels.length) return;

  const activate = (tab, focus = false) => {
    const name = tab.dataset.tab;
    tabs.forEach((item) => {
      const active = item === tab;
      item.setAttribute("aria-selected", String(active));
      item.tabIndex = active ? 0 : -1;
    });
    panels.forEach((panel) => {
      panel.hidden = panel.dataset.panel !== name;
    });
    if (focus) tab.focus();
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activate(tab));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      let next = index;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;
      activate(tabs[next], true);
    });
  });
}

function initImageFallbacks() {
  document.querySelectorAll("img[data-fallback]").forEach((image) => {
    const applyFallback = () => {
      if (image.dataset.fallbackApplied === "true") return;
      image.dataset.fallbackApplied = "true";
      image.src = image.dataset.fallback;
    };
    image.addEventListener("error", applyFallback);
    if (image.complete && image.naturalWidth === 0) applyFallback();
  });
}

function initHeroParallax() {
  const media = document.querySelector("[data-hero-media]");
  const frame = document.querySelector("[data-parallax-frame]");
  if (!media || !frame || reducedMotion.matches || coarsePointer.matches) return;

  let raf = 0;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  const render = () => {
    currentX += (targetX - currentX) * 0.09;
    currentY += (targetY - currentY) * 0.09;
    frame.style.setProperty("--frame-x", `${(currentX * 0.25).toFixed(2)}px`);
    frame.style.setProperty("--frame-y", `${(currentY * 0.25).toFixed(2)}px`);
    frame.style.setProperty("--photo-x", `${(currentX * -0.14).toFixed(2)}px`);
    frame.style.setProperty("--photo-y", `${(currentY * -0.14).toFixed(2)}px`);
    frame.style.setProperty("--note-x", `${(currentX * 0.7).toFixed(2)}px`);
    frame.style.setProperty("--note-y", `${(currentY * 0.7).toFixed(2)}px`);
    const moving = Math.abs(targetX - currentX) + Math.abs(targetY - currentY) > 0.05;
    raf = moving ? requestAnimationFrame(render) : 0;
  };

  media.addEventListener("pointermove", (event) => {
    const rect = media.getBoundingClientRect();
    targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
    targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
    if (!raf) raf = requestAnimationFrame(render);
  }, { passive: true });

  media.addEventListener("pointerleave", () => {
    targetX = 0;
    targetY = 0;
    if (!raf) raf = requestAnimationFrame(render);
  });
}

function createSteamTexture(THREE) {
  const textureCanvas = document.createElement("canvas");
  textureCanvas.width = 128;
  textureCanvas.height = 128;
  const context = textureCanvas.getContext("2d");
  const gradient = context.createRadialGradient(64, 68, 2, 64, 64, 60);
  gradient.addColorStop(0, "rgba(255, 253, 248, 0.68)");
  gradient.addColorStop(0.32, "rgba(255, 253, 248, 0.34)");
  gradient.addColorStop(0.7, "rgba(255, 253, 248, 0.08)");
  gradient.addColorStop(1, "rgba(255, 253, 248, 0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 128, 128);
  const texture = new THREE.CanvasTexture(textureCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

async function initSteamScene() {
  const canvas = document.querySelector("#steam-canvas");
  const frame = canvas?.closest(".hero-frame");
  if (!canvas || !frame) return;

  const heroImage = frame.querySelector("img");
  if (heroImage && !heroImage.complete) {
    await Promise.race([
      new Promise((resolve) => heroImage.addEventListener("load", resolve, { once: true })),
      new Promise((resolve) => heroImage.addEventListener("error", resolve, { once: true })),
      new Promise((resolve) => window.setTimeout(resolve, 2400))
    ]);
  }

  let THREE;
  try {
    THREE = await import("https://cdn.jsdelivr.net/npm/three@0.166.1/build/three.module.js");
  } catch (error) {
    console.info("Static steam fallback active.", error);
    return;
  }

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  } catch (error) {
    console.info("WebGL unavailable; static steam fallback active.", error);
    return;
  }
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
  camera.position.z = 3;

  const texture = createSteamTexture(THREE);
  const count = window.innerWidth < 640 ? 15 : 27;
  const puffs = [];
  const group = new THREE.Group();
  scene.add(group);

  const reset = (puff, seed = Math.random()) => {
    puff.life = seed;
    puff.speed = 0.075 + Math.random() * 0.055;
    puff.sway = 0.025 + Math.random() * 0.055;
    puff.phase = Math.random() * Math.PI * 2;
    puff.baseScale = 0.10 + Math.random() * 0.12;
    puff.offset = (Math.random() - 0.5) * 0.09;
  };

  for (let index = 0; index < count; index += 1) {
    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
      opacity: 0,
      blending: THREE.NormalBlending
    });
    const sprite = new THREE.Sprite(material);
    const puff = { sprite, material, life: 0, speed: 0, sway: 0, phase: 0, baseScale: 0, offset: 0 };
    reset(puff, index / count);
    group.add(sprite);
    puffs.push(puff);
  }

  let aspect = 1;
  let sourceX = 0;
  let sourceY = -0.02;
  let pointerWind = 0;
  let visible = true;
  let raf = 0;
  let lastTime = performance.now();

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(1, rect.width);
    const height = Math.max(1, rect.height);
    aspect = width / height;
    camera.left = -aspect;
    camera.right = aspect;
    camera.top = 1;
    camera.bottom = -1;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);

    const xPercent = Number(canvas.dataset.steamX || 50) / 100;
    const yPercent = Number(canvas.dataset.steamY || 48) / 100;
    sourceX = (xPercent * 2 - 1) * aspect;
    sourceY = 1 - yPercent * 2;
  };

  const updatePuffs = (delta, elapsed) => {
    for (const puff of puffs) {
      puff.life += delta * puff.speed;
      if (puff.life >= 1) reset(puff, 0);

      const t = puff.life;
      const rise = t * 1.28;
      const fadeIn = Math.min(1, t / 0.16);
      const fadeOut = Math.max(0, 1 - (t - 0.52) / 0.48);
      const wave = Math.sin(elapsed * 0.48 + puff.phase + t * 5.2) * puff.sway;
      const curl = Math.sin(elapsed * 0.24 + puff.phase * 0.7 + t * 8) * 0.035 * t;
      const x = sourceX + puff.offset + wave + curl + pointerWind * t * 0.08;
      const y = sourceY + rise;
      const scale = puff.baseScale * (0.75 + t * 1.9);

      puff.sprite.position.set(x, y, 0);
      puff.sprite.scale.set(scale * (0.82 + t * 0.42), scale * 1.35, 1);
      puff.material.opacity = 0.34 * fadeIn * fadeOut;
      puff.material.rotation = Math.sin(puff.phase + t * 3.4) * 0.16;
    }
  };

  const renderFrame = (time) => {
    raf = 0;
    if (!visible) return;
    const delta = Math.min(40, time - lastTime) / 1000;
    lastTime = time;
    updatePuffs(delta, time / 1000);
    renderer.render(scene, camera);
    if (!reducedMotion.matches) raf = requestAnimationFrame(renderFrame);
  };

  frame.addEventListener("pointermove", (event) => {
    if (coarsePointer.matches || reducedMotion.matches) return;
    const rect = frame.getBoundingClientRect();
    pointerWind = ((event.clientX - rect.left) / rect.width - 0.5) * 0.8;
  }, { passive: true });

  frame.addEventListener("pointerleave", () => {
    pointerWind = 0;
  });

  const observer = "IntersectionObserver" in window
    ? new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !raf) {
          lastTime = performance.now();
          raf = requestAnimationFrame(renderFrame);
        } else if (!visible && raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      }, { threshold: 0.03 })
    : null;

  if ("ResizeObserver" in window) {
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
  } else {
    window.addEventListener("resize", resize, { passive: true });
  }
  observer?.observe(frame);
  resize();

  updatePuffs(0, 0);
  renderer.render(scene, camera);
  frame.classList.add("webgl-ready");

  if (!reducedMotion.matches) raf = requestAnimationFrame(renderFrame);
}

function initTrackingHooks() {
  document.querySelectorAll("[data-track]").forEach((element) => {
    element.addEventListener("click", () => {
      document.dispatchEvent(new CustomEvent("cafe:conversion", {
        detail: { action: element.dataset.track }
      }));
    });
  });
}

function init() {
  updateHeader();
  updateBusinessStatus();
  initMobileMenu();
  initReveals();
  initTabs();
  initImageFallbacks();
  initHeroParallax();
  initTrackingHooks();
  initSteamScene();

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  window.addEventListener("scroll", updateHeader, { passive: true });
  window.setInterval(updateBusinessStatus, 60_000);
}

init();
