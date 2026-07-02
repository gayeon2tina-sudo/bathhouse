/**
 * app.js — Bathhouse Rewind
 *
 * Small vanilla-JS state machine, no framework/build step required.
 * Screens are plain <section> elements toggled via .screen--active.
 * All content is pulled from STOPS in data.js — nothing here is
 * hardcoded per-location, so adding a stop to data.js is enough.
 */

(function () {
  "use strict";

  const screens = {
    welcome: document.getElementById("screen-welcome"),
    landing: document.getElementById("screen-landing"),
    threshold: document.getElementById("screen-threshold"),
    map: document.getElementById("screen-map"),
    detail: document.getElementById("screen-detail")
  };

  let currentStopIndex = 0;
  let currentMode = "past"; // "past" | "present"

  function showScreen(name) {
    Object.values(screens).forEach((s) => s.classList.remove("screen--active"));
    screens[name].classList.add("screen--active");
    if (name === "map") renderMap();
    if (name === "detail") renderDetail();
  }

  // ---------------------------------------------------------------
  // Navigation wiring
  // ---------------------------------------------------------------
  document.getElementById("btn-welcome-continue").addEventListener("click", () => showScreen("landing"));
  document.getElementById("btn-start").addEventListener("click", () => showScreen("threshold"));
  document.getElementById("btn-enter").addEventListener("click", () => showScreen("map"));
  document.getElementById("btn-skip-threshold").addEventListener("click", () => showScreen("map"));
  document.getElementById("btn-back-to-landing").addEventListener("click", () => showScreen("landing"));
  document.getElementById("btn-back-to-map").addEventListener("click", () => showScreen("map"));
  document.getElementById("btn-global-close").addEventListener("click", () => showScreen("landing"));

  document.getElementById("btn-prev-stop").addEventListener("click", () => {
    currentStopIndex = (currentStopIndex - 1 + STOPS.length) % STOPS.length;
    renderDetail();
  });
  document.getElementById("btn-next-stop").addEventListener("click", () => {
    currentStopIndex = (currentStopIndex + 1) % STOPS.length;
    renderDetail();
  });

  document.getElementById("btn-past").addEventListener("click", () => setMode("past"));
  document.getElementById("btn-present").addEventListener("click", () => setMode("present"));

  function setMode(mode) {
    currentMode = mode;
    document.getElementById("btn-past").classList.toggle("rewind-toggle__btn--active", mode === "past");
    document.getElementById("btn-present").classList.toggle("rewind-toggle__btn--active", mode === "present");
    renderDetail(true); // re-render body text only, keep mist state
  }

  // ---------------------------------------------------------------
  // MAP — renders markers from STOPS using MAP_BOUNDS projection
  // ---------------------------------------------------------------
  function project(lat, lon) {
    const { lonMin, lonMax, latMin, latMax } = MAP_BOUNDS;
    const width = 680, height = 320, padX = 40, padY = 40;
    const x = ((lon - lonMin) / (lonMax - lonMin)) * width + padX;
    const y = ((latMax - lat) / (latMax - latMin)) * height + padY;
    return { x, y };
  }

  function renderMap() {
    const g = document.getElementById("markers");
    g.innerHTML = "";
    STOPS.forEach((stop, i) => {
      const { x, y } = project(stop.coords.lat, stop.coords.lon);
      const ns = "http://www.w3.org/2000/svg";

      const marker = document.createElementNS(ns, "g");
      marker.style.cursor = "pointer";
      marker.setAttribute("tabindex", "0");
      marker.setAttribute("role", "button");
      marker.setAttribute("aria-label", `${stop.city} — ${stop.term}`);

      const circle = document.createElementNS(ns, "circle");
      circle.setAttribute("cx", x);
      circle.setAttribute("cy", y);
      circle.setAttribute("r", 7);
      circle.setAttribute("class", "marker-dot");
      circle.setAttribute("fill", i % 2 === 0 ? "var(--tile-teal-bright)" : "var(--copper-bright)");
      marker.appendChild(circle);

      const label = document.createElementNS(ns, "text");
      label.setAttribute("x", x);
      label.setAttribute("y", y - 14);
      label.setAttribute("class", "marker-label");
      label.textContent = stop.city;
      marker.appendChild(label);

      const go = () => { currentStopIndex = i; showScreen("detail"); };
      marker.addEventListener("click", go);
      marker.addEventListener("keypress", (e) => { if (e.key === "Enter") go(); });

      g.appendChild(marker);
    });
  }

  // ---------------------------------------------------------------
  // DETAIL — text content + heritage badge + audio stub
  // ---------------------------------------------------------------
  function renderDetail(textOnly) {
    const stop = STOPS[currentStopIndex];

    document.getElementById("detail-region").textContent = stop.region;
    document.getElementById("detail-term").textContent = stop.term;
    document.getElementById("detail-body").textContent = stop[currentMode];
    document.getElementById("detail-story").textContent = stop.story;
    document.getElementById("detail-touch").textContent = stop.touch;

    const img = document.getElementById("detail-image");
    const credit = document.getElementById("image-credit");
    if (stop.image) {
      img.src = stop.image;
      img.alt = stop.city + " — " + stop.term;
      img.hidden = false;
      credit.textContent = stop.imageCredit || "";
      credit.hidden = !stop.imageCredit;
    } else {
      img.hidden = true;
      credit.hidden = true;
    }

    const dot = document.getElementById("heritage-dot");
    dot.className = "heritage-badge__dot " + (stop.heritageStatus.protected ? "heritage-badge__dot--protected" : "heritage-badge__dot--unprotected");
    document.getElementById("heritage-text").textContent = stop.heritageStatus.note;

    const audioBtn = document.getElementById("btn-play-audio");
    const audioLabel = document.getElementById("audio-label");
    if (stop.audio) {
      audioBtn.disabled = false;
      audioLabel.textContent = "Play ambient audio for this location";
    } else {
      audioBtn.disabled = true;
      audioLabel.textContent = "Ambient audio not yet recorded for this location — see README to add narration.";
    }

    if (!textOnly) resetMist();
  }

  // ---------------------------------------------------------------
  // STEAM-WIPE CANVAS — signature interaction.
  // A fogged layer is drawn on a canvas; moving the pointer/finger
  // erases a soft circle, revealing the text sitting beneath it.
  // ---------------------------------------------------------------
  const canvas = document.getElementById("mist-canvas");
  const ctx = canvas.getContext("2d");
  let wrapEl = document.querySelector(".mist-wrap");

  function resizeCanvas() {
    const rect = wrapEl.getBoundingClientRect();
    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;
    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    paintMist(rect.width, rect.height);
  }

  function paintMist(w, h) {
    ctx.globalCompositeOperation = "source-over";
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#3a4a44");
    grad.addColorStop(1, "#232f2a");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // subtle mist texture (noise-ish speckle, cheap version)
    ctx.globalAlpha = 0.05;
    for (let i = 0; i < 200; i++) {
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 30, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function resetMist() {
    const rect = wrapEl.getBoundingClientRect();
    paintMist(rect.width, rect.height);
    document.getElementById("mist-hint").style.opacity = "0.8";
  }

  function wipe(x, y) {
    ctx.globalCompositeOperation = "destination-out";
    const grad = ctx.createRadialGradient(x, y, 0, x, y, 55);
    grad.addColorStop(0, "rgba(0,0,0,1)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, 55, 0, Math.PI * 2);
    ctx.fill();
    document.getElementById("mist-hint").style.opacity = "0";
  }

  function pointerPos(e) {
    const rect = canvas.getBoundingClientRect();
    const point = e.touches ? e.touches[0] : e;
    return { x: point.clientX - rect.left, y: point.clientY - rect.top };
  }

  let isPointerDown = false;
  canvas.addEventListener("pointerdown", (e) => { isPointerDown = true; wipe(pointerPos(e).x, pointerPos(e).y); });
  canvas.addEventListener("pointerup", () => { isPointerDown = false; });
  canvas.addEventListener("pointerleave", () => { isPointerDown = false; });
  canvas.addEventListener("pointermove", (e) => {
    const p = pointerPos(e);
    wipe(p.x, p.y);
  });
  canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();
    const p = pointerPos(e);
    wipe(p.x, p.y);
  }, { passive: false });

  window.addEventListener("resize", () => {
    if (screens.detail.classList.contains("screen--active")) resizeCanvas();
  });

  // Recalculate canvas size the first time the detail screen is shown
  const detailObserver = new MutationObserver(() => {
    if (screens.detail.classList.contains("screen--active")) {
      requestAnimationFrame(resizeCanvas);
    }
  });
  detailObserver.observe(screens.detail, { attributes: true, attributeFilter: ["class"] });

  // ---------------------------------------------------------------
  // Audio stub — wired for when real narration files are added.
  // See README.md → "Adding audio narration"
  // ---------------------------------------------------------------
  let currentAudio = null;
  document.getElementById("btn-play-audio").addEventListener("click", () => {
    const stop = STOPS[currentStopIndex];
    if (!stop.audio) return;
    if (currentAudio) { currentAudio.pause(); currentAudio = null; }
    currentAudio = new Audio(stop.audio);
    currentAudio.play();
  });

})();
