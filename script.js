const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function updateHeader() {
  document.querySelector("[data-header]")?.classList.toggle("is-scrolled", window.scrollY > 20);
}

function updateBusinessStatus() {
  const status = document.querySelector("[data-open-status]");
  const dot = document.querySelector(".status-dot");
  if (!status || !dot) return;

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

    dot.classList.toggle("is-open", isOpen);
    status.textContent = isOpen
      ? "Open now · pouring until 4 PM"
      : day === "Mon"
        ? "Closed Monday · back Tuesday at 8 AM"
        : minutes < 8 * 60
          ? "Offline for now · opens at 8 AM"
          : "Closed for today · back at 8 AM";
  } catch {
    status.textContent = "Tuesday–Sunday · 8 AM–4 PM";
  }
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
    { threshold: 0.12, rootMargin: "0px 0px -4%" }
  );

  elements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
    observer.observe(element);
  });
}

function initTabs() {
  const tabs = [...document.querySelectorAll("[role='tab'][data-tab]")];
  const panels = [...document.querySelectorAll("[role='tabpanel'][data-panel]")];
  if (!tabs.length || !panels.length) return;

  const activate = (tab) => {
    const name = tab.dataset.tab;
    tabs.forEach((item) => {
      const active = item === tab;
      item.setAttribute("aria-selected", String(active));
      item.tabIndex = active ? 0 : -1;
    });
    panels.forEach((panel) => {
      panel.hidden = panel.dataset.panel !== name;
    });
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
      activate(tabs[next]);
      tabs[next].focus();
    });
  });
}

function initMagneticButtons() {
  if (reducedMotion.matches || window.matchMedia("(pointer: coarse)").matches) return;

  document.querySelectorAll(".magnetic").forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      button.style.transform = `translate(${x * 0.08}px, ${y * 0.12}px)`;
    });
    button.addEventListener("pointerleave", () => {
      button.style.transform = "";
    });
  });
}

function initTiltCards() {
  if (reducedMotion.matches || window.matchMedia("(pointer: coarse)").matches) return;

  document.querySelectorAll(".tilt-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${-y * 3.5}deg) rotateY(${x * 4.5}deg)`;
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}

function initImageFallbacks() {
  document.querySelectorAll(".gallery-card img").forEach((image) => {
    image.addEventListener("error", () => {
      image.hidden = true;
      image.parentElement?.classList.add("image-unavailable");
      const label = document.createElement("span");
      label.className = "image-fallback-label";
      label.textContent = "Image signal unavailable · open source";
      image.parentElement?.append(label);
    });
  });
}

async function initThreeScene() {
  const canvas = document.querySelector("#brew-reactor");
  const shell = document.querySelector(".canvas-shell");
  if (!canvas || !shell) return;

  let THREE;
  try {
    THREE = await import("https://cdn.jsdelivr.net/npm/three@0.166.1/build/three.module.js");
  } catch (error) {
    console.info("Brew reactor fallback active.", error);
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(0, 1.2, 7.6);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;

  const root = new THREE.Group();
  root.position.y = 0.35;
  scene.add(root);

  const ceramic = new THREE.MeshPhysicalMaterial({
    color: 0x71d5ea,
    roughness: 0.24,
    metalness: 0.04,
    clearcoat: 0.85,
    clearcoatRoughness: 0.2,
    transmission: 0.02
  });
  const ceramicDark = new THREE.MeshPhysicalMaterial({
    color: 0x2c2530,
    roughness: 0.2,
    metalness: 0.14,
    clearcoat: 0.65
  });
  const coffeeMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x2b120d,
    roughness: 0.12,
    metalness: 0.08,
    clearcoat: 1,
    clearcoatRoughness: 0.08
  });
  const glowMaterial = new THREE.MeshBasicMaterial({ color: 0xf4e58d });

  const cupBody = new THREE.Mesh(
    new THREE.CylinderGeometry(1.24, 0.94, 2.05, 72, 1, false),
    ceramic
  );
  cupBody.position.y = -0.28;
  root.add(cupBody);

  const base = new THREE.Mesh(new THREE.TorusGeometry(0.92, 0.08, 20, 72), ceramicDark);
  base.rotation.x = Math.PI / 2;
  base.position.y = -1.3;
  root.add(base);

  const rim = new THREE.Mesh(new THREE.TorusGeometry(1.24, 0.095, 22, 96), ceramicDark);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.76;
  root.add(rim);

  const coffee = new THREE.Mesh(new THREE.CircleGeometry(1.16, 72), coffeeMaterial);
  coffee.rotation.x = -Math.PI / 2;
  coffee.position.y = 0.785;
  root.add(coffee);

  const crema = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.028, 12, 72), glowMaterial);
  crema.rotation.x = Math.PI / 2;
  crema.position.y = 0.805;
  crema.scale.y = 0.74;
  root.add(crema);

  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.66, 0.17, 24, 72, Math.PI * 1.55), ceramic);
  handle.position.set(1.15, -0.22, 0);
  handle.rotation.z = -0.72;
  root.add(handle);

  const saucer = new THREE.Mesh(
    new THREE.CylinderGeometry(1.78, 1.58, 0.13, 72),
    ceramicDark
  );
  saucer.position.y = -1.45;
  root.add(saucer);

  const orbitalGroup = new THREE.Group();
  root.add(orbitalGroup);

  const ringMaterialA = new THREE.MeshBasicMaterial({
    color: 0xff806d,
    transparent: true,
    opacity: 0.62
  });
  const ringMaterialB = new THREE.MeshBasicMaterial({
    color: 0xaa8cff,
    transparent: true,
    opacity: 0.5
  });

  const ringA = new THREE.Mesh(new THREE.TorusGeometry(2.3, 0.018, 8, 128), ringMaterialA);
  ringA.rotation.set(1.1, 0.2, 0.2);
  orbitalGroup.add(ringA);

  const ringB = new THREE.Mesh(new THREE.TorusGeometry(2.85, 0.014, 8, 128), ringMaterialB);
  ringB.rotation.set(0.8, 0.55, -0.5);
  orbitalGroup.add(ringB);

  const particleGeometry = new THREE.SphereGeometry(0.055, 12, 12);
  const particleMaterials = [
    new THREE.MeshBasicMaterial({ color: 0xf4e58d }),
    new THREE.MeshBasicMaterial({ color: 0x71d5ea }),
    new THREE.MeshBasicMaterial({ color: 0xff806d }),
    new THREE.MeshBasicMaterial({ color: 0xaa8cff })
  ];
  const particles = new THREE.Group();
  const particleData = [];
  for (let i = 0; i < 34; i += 1) {
    const particle = new THREE.Mesh(particleGeometry, particleMaterials[i % particleMaterials.length]);
    const radius = 1.7 + Math.random() * 1.6;
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.08 + Math.random() * 0.16;
    const height = -1.2 + Math.random() * 3.4;
    particle.position.set(Math.cos(angle) * radius, height, Math.sin(angle) * radius * 0.55);
    particles.add(particle);
    particleData.push({ particle, radius, angle, speed, height, offset: Math.random() * 10 });
  }
  root.add(particles);

  const steamMaterial = new THREE.MeshBasicMaterial({
    color: 0xfff8e8,
    transparent: true,
    opacity: 0.34
  });
  const steamGroup = new THREE.Group();
  root.add(steamGroup);

  for (let i = 0; i < 3; i += 1) {
    const x = (i - 1) * 0.42;
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(x, 0.98, 0),
      new THREE.Vector3(x + 0.22, 1.38, 0.08),
      new THREE.Vector3(x - 0.18, 1.82, -0.03),
      new THREE.Vector3(x + 0.12, 2.35, 0.05)
    ]);
    const geometry = new THREE.TubeGeometry(curve, 44, 0.018, 8, false);
    const steam = new THREE.Mesh(geometry, steamMaterial.clone());
    steam.material.opacity = 0.2 + i * 0.07;
    steam.userData.phase = i * 1.8;
    steamGroup.add(steam);
  }

  const floorRing = new THREE.Mesh(
    new THREE.RingGeometry(2.2, 2.23, 96),
    new THREE.MeshBasicMaterial({ color: 0x71d5ea, transparent: true, opacity: 0.18, side: THREE.DoubleSide })
  );
  floorRing.rotation.x = -Math.PI / 2;
  floorRing.position.y = -1.62;
  root.add(floorRing);

  scene.add(new THREE.HemisphereLight(0xbdf2f7, 0x130f14, 1.5));
  const key = new THREE.PointLight(0xf4e58d, 35, 18, 2);
  key.position.set(-3.2, 4.4, 4.4);
  scene.add(key);
  const fill = new THREE.PointLight(0xaa8cff, 26, 16, 2);
  fill.position.set(3.8, 0.8, 3.2);
  scene.add(fill);
  const edge = new THREE.PointLight(0xff806d, 20, 14, 2);
  edge.position.set(-2.4, -1.8, 2.2);
  scene.add(edge);

  let pointerX = 0;
  let pointerY = 0;
  let visible = true;
  const clock = new THREE.Clock();

  const resize = () => {
    const { width, height } = shell.getBoundingClientRect();
    renderer.setSize(Math.max(width, 1), Math.max(height, 1), false);
    camera.aspect = width / Math.max(height, 1);
    camera.updateProjectionMatrix();
  };

  const pointerHandler = (event) => {
    const rect = shell.getBoundingClientRect();
    pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
  };

  shell.addEventListener("pointermove", pointerHandler, { passive: true });
  shell.addEventListener("pointerleave", () => {
    pointerX = 0;
    pointerY = 0;
  });

  const visibilityObserver = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
    },
    { threshold: 0.02 }
  );
  visibilityObserver.observe(shell);

  const render = () => {
    const time = clock.getElapsedTime();
    const calm = reducedMotion.matches;

    root.rotation.y += ((pointerX * 0.18 + Math.sin(time * 0.18) * 0.07) - root.rotation.y) * 0.035;
    root.rotation.x += ((-pointerY * 0.08 + Math.sin(time * 0.28) * 0.025) - root.rotation.x) * 0.035;
    root.position.y = 0.3 + Math.sin(time * 0.62) * 0.09;

    orbitalGroup.rotation.y = time * 0.14;
    ringA.rotation.z = time * 0.17;
    ringB.rotation.z = -time * 0.11;
    crema.rotation.z = time * 0.08;

    particleData.forEach((datum, index) => {
      const angle = datum.angle + time * datum.speed;
      datum.particle.position.x = Math.cos(angle) * datum.radius;
      datum.particle.position.z = Math.sin(angle) * datum.radius * 0.55;
      datum.particle.position.y = datum.height + Math.sin(time * 0.7 + datum.offset) * 0.16;
      datum.particle.scale.setScalar(0.75 + Math.sin(time + index) * 0.2);
    });

    steamGroup.children.forEach((steam) => {
      steam.position.y = Math.sin(time * 0.9 + steam.userData.phase) * 0.08;
      steam.rotation.y = Math.sin(time * 0.5 + steam.userData.phase) * 0.14;
      steam.material.opacity = 0.2 + (Math.sin(time * 0.8 + steam.userData.phase) + 1) * 0.06;
    });

    renderer.render(scene, camera);
  };

  resize();
  window.addEventListener("resize", resize, { passive: true });

  if (reducedMotion.matches) {
    render();
  } else {
    const loop = () => {
      if (visible && !document.hidden) render();
      requestAnimationFrame(loop);
    };
    loop();
  }
}

function initPage() {
  updateHeader();
  updateBusinessStatus();
  initReveals();
  initTabs();
  initMagneticButtons();
  initTiltCards();
  initImageFallbacks();
  initThreeScene();

  document.querySelector("[data-year]").textContent = String(new Date().getFullYear());
  window.addEventListener("scroll", updateHeader, { passive: true });
  window.setInterval(updateBusinessStatus, 60_000);
}

initPage();
