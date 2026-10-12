// Fireflies over the canopy, and the twin vine behind the pointer: THEF's pointer effects, one copy
// for the entry portal, its 404, and the AstroLog (which loads this file by full URL). Canvas, no
// dependencies. Colors come from the page's CSS variables (--firefly, --sky, --gold, --leaf, --glow,
// defined per light in /arrival/org.css), so a change of light recolors it without a reload.
//
// Follows the arrival kit's choices on <html>:
//   data-motion  "still": the fireflies hold still and nothing follows the pointer ·
//                "gentle" (Breeze): fireflies drift and part around the pointer, and a twin vine grows
//                behind it · "vivid" (Bloom): brighter fireflies, a fuller vine, seeds drifting down
//   data-cursor  "off": no parting, no vine (the fireflies still drift unless motion is still)
// Without the kit (no attributes) it falls back to the OS reduced-motion setting.
//
// The vine: a sky strand (A Course in Miracles, the Eagle) and a gold strand (plant medicine, the
// Condor) braid along the pointer's path, apart where the path began and one where the pointer is,
// with a point of light (the Barn Owl's single-mindedness) where they meet. Leaves open along it.
(function () {
  var root = document.documentElement;
  var osReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var coarse = window.matchMedia("(pointer: coarse)").matches;
  var motion = function () { return root.dataset.motion || (osReduced ? "still" : "gentle"); };
  var cursorOn = function () {
    var v = root.dataset.cursor;
    return (v ? v === "on" : !osReduced) && motion() !== "still";
  };
  var C = {};
  function syncColors() {
    var cs = getComputedStyle(root);
    var v = function (n, d) { return cs.getPropertyValue(n).trim() || d; };
    C.firefly = v("--firefly", "#E2F0A8");
    C.sky = v("--sky", "#8ed1f2");
    C.gold = v("--gold", "#e9b949");
    C.leaf = v("--leaf", "#86c98f");
    C.glow = v("--glow", "#ffe3a1");
    C.dark = root.dataset.theme !== "light";
  }
  syncColors();

  /* ── fireflies (behind the page) ─────────────────────────────────────────────────────────── */
  var canvas = document.getElementById("starfield-canvas");
  var ctx = canvas && canvas.getContext("2d");
  var stars = [];
  var mouse = { x: -9999, y: -9999 };
  var W = 0, H = 0, raf = 0;

  function initStars() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    stars = [];
    var count = Math.min(140, Math.floor((W * H) / 9000));
    for (var i = 0; i < count; i++) {
      var bx = Math.random() * W, by = Math.random() * H;
      stars.push({ bx: bx, by: by, x: bx, y: by, r: Math.random() * 1.4 + 0.4, bright: Math.random() < 0.22, phase: Math.random() * Math.PI * 2, speed: 0.4 + Math.random() * 0.6, dx: (Math.random() - 0.5) * 0.12, dy: -0.04 - Math.random() * 0.08 });
    }
  }
  function spike(s, a) {
    ctx.strokeStyle = C.firefly;
    ctx.globalAlpha = a;
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    ctx.moveTo(s.x - s.r * 2.6, s.y); ctx.lineTo(s.x + s.r * 2.6, s.y);
    ctx.moveTo(s.x, s.y - s.r * 2.6); ctx.lineTo(s.x, s.y + s.r * 2.6);
    ctx.stroke();
  }
  function drawStars(t) {
    var mo = motion(), still = mo === "still", vivid = mo === "vivid", repel = cursorOn();
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      if (!still) {
        // Fireflies wander: a slow upward drift that wraps around the screen.
        s.bx += s.dx * (vivid ? 1.6 : 1); s.by += s.dy * (vivid ? 1.6 : 1);
        if (s.by < -6) s.by = H + 6; if (s.bx < -6) s.bx = W + 6; if (s.bx > W + 6) s.bx = -6;
      }
      var tx = s.bx, ty = s.by;
      if (repel) {
        var dx = s.bx - mouse.x, dy = s.by - mouse.y, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 90) { var f = 1 - dist / 90, push = f * f * 26, ang = Math.atan2(dy, dx); tx += Math.cos(ang) * push; ty += Math.sin(ang) * push; }
      }
      if (still) { s.x = tx; s.y = ty; } else { s.x += (tx - s.x) * 0.18; s.y += (ty - s.y) * 0.18; }
      var tw = still ? 0.7 : 0.5 + 0.5 * Math.sin(t * 0.001 * s.speed * (vivid ? 1.7 : 1) + s.phase);
      ctx.beginPath();
      ctx.fillStyle = C.firefly;
      ctx.globalAlpha = Math.min(1, (s.bright ? 0.55 + tw * 0.45 : 0.22 + tw * 0.3) * (vivid ? 1.15 : 1));
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
      if (s.bright) spike(s, still ? 0.45 : 0.55);
    }
    ctx.globalAlpha = 1;
  }
  function loop(t) {
    raf = 0;
    drawStars(t || 0);
    if (motion() !== "still" && !document.hidden) raf = requestAnimationFrame(loop);
  }
  function scheduleStars() {
    if (!ctx) return;
    if (motion() === "still") {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      drawStars(0);
    } else if (!raf) raf = requestAnimationFrame(loop);
  }
  if (ctx) {
    initStars();
    window.addEventListener("resize", function () { initStars(); if (motion() === "still") drawStars(0); });
    document.addEventListener("visibilitychange", function () { if (!document.hidden) scheduleStars(); });
  }

  /* ── the twin vine (over the page, like the kit's own cursor trail) ───────────────────────── */
  var vine = null, vx = null, vraf = 0, pts = [], leaves = [], seeds = [], travelled = 0, nextLeaf = 60, dpr = Math.min(2, window.devicePixelRatio || 1);
  function vineSize() {
    if (!vine) return;
    vine.width = innerWidth * dpr;
    vine.height = innerHeight * dpr;
    vx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function startVine() {
    if (vine || coarse || !document.body) return;
    vine = document.createElement("canvas");
    vine.className = "arr-trail thef-vine";
    vine.setAttribute("aria-hidden", "true");
    vine.style.cssText = "position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:60";
    document.body.appendChild(vine);
    vx = vine.getContext("2d");
    vineSize();
    window.addEventListener("resize", vineSize);
  }
  function stopVine() {
    if (!vine) return;
    cancelAnimationFrame(vraf);
    vraf = 0;
    window.removeEventListener("resize", vineSize);
    vine.remove();
    vine = vx = null;
    pts = []; leaves = []; seeds = [];
  }
  function leafPath(c, x, y, len, rot) {
    c.save();
    c.translate(x, y);
    c.rotate(rot);
    c.beginPath();
    c.moveTo(0, 0);
    c.bezierCurveTo(len * 0.25, -len * 0.32, len * 0.7, -len * 0.3, len, 0);
    c.bezierCurveTo(len * 0.7, len * 0.3, len * 0.25, len * 0.32, 0, 0);
    c.fill();
    c.restore();
  }
  function drawVine() {
    vraf = 0;
    if (!vx) return;
    var now = performance.now(), vivid = motion() === "vivid";
    var LIFE = vivid ? 1500 : 1050;
    var AMP = vivid ? 9.5 : 6.5, WAVE = 28, WIDTH = vivid ? 2.4 : 1.7;
    while (pts.length && now - pts[0].t > LIFE) pts.shift();
    leaves = leaves.filter(function (l) { return now - l.t < l.life; });
    seeds = seeds.filter(function (s) { return now - s.t < s.life; });
    vx.clearRect(0, 0, innerWidth, innerHeight);
    vx.globalCompositeOperation = C.dark ? "lighter" : "source-over";
    vx.lineCap = "round";
    vx.lineJoin = "round";
    var n = pts.length;
    if (n > 1) {
      var tip = pts[n - 1];
      // Each strand: the path, pushed sideways by a sine of the distance travelled, wider the further
      // back along the path (so the two meet at the pointer), and fading with age.
      [[C.sky, 0], [C.gold, Math.PI]].forEach(function (strand) {
        for (var i = 1; i < n; i++) {
          var a = pts[i - 1], b = pts[i];
          var back = (tip.d - b.d) / 140; // 0 at the tip, growing along the path
          var amp = AMP * Math.min(1, back);
          var life = 1 - (now - b.t) / LIFE;
          if (life <= 0) continue;
          var oa = Math.sin(a.d / WAVE + strand[1]) * AMP * Math.min(1, (tip.d - a.d) / 140);
          var ob = Math.sin(b.d / WAVE + strand[1]) * amp;
          vx.globalAlpha = Math.max(0, life) * (C.dark ? 0.85 : 0.75);
          vx.strokeStyle = strand[0];
          vx.lineWidth = 0.4 + WIDTH * life;
          vx.beginPath();
          vx.moveTo(a.x + a.nx * oa, a.y + a.ny * oa);
          vx.lineTo(b.x + b.nx * ob, b.y + b.ny * ob);
          vx.stroke();
        }
      });
      // Where the strands meet: one point of light.
      var age = Math.min(1, (now - tip.t) / 500);
      var g = vx.createRadialGradient(tip.x, tip.y, 0, tip.x, tip.y, vivid ? 14 : 10);
      g.addColorStop(0, C.glow);
      g.addColorStop(1, "rgba(0,0,0,0)");
      vx.globalAlpha = (1 - age) * 0.9;
      vx.fillStyle = g;
      vx.beginPath();
      vx.arc(tip.x, tip.y, vivid ? 14 : 10, 0, Math.PI * 2);
      vx.fill();
    }
    leaves.forEach(function (l) {
      var k = (now - l.t) / l.life;
      var grow = Math.min(1, (now - l.t) / 260);
      vx.globalAlpha = Math.max(0, 1 - k) * (C.dark ? 0.9 : 0.8);
      vx.fillStyle = C.leaf;
      leafPath(vx, l.x, l.y, l.len * grow, l.rot);
    });
    seeds.forEach(function (s) {
      var k = (now - s.t) / s.life;
      s.vy = Math.min(0.55, s.vy + 0.004);
      s.x += s.vx + Math.sin((now - s.t) / 380 + s.p) * 0.35;
      s.y += s.vy;
      vx.globalAlpha = Math.max(0, 1 - k) * 0.9;
      vx.strokeStyle = C.glow;
      vx.lineWidth = 0.6;
      vx.beginPath();
      for (var j = 0; j < 5; j++) {
        var ang = -Math.PI / 2 + (j - 2) * 0.42;
        vx.moveTo(s.x, s.y);
        vx.lineTo(s.x + Math.cos(ang) * 6, s.y + Math.sin(ang) * 6);
      }
      vx.stroke();
      vx.fillStyle = C.gold;
      vx.beginPath();
      vx.ellipse(s.x, s.y + 2.2, 1.3, 2.4, 0, 0, Math.PI * 2);
      vx.fill();
    });
    vx.globalAlpha = 1;
    if (pts.length || leaves.length || seeds.length) vraf = requestAnimationFrame(drawVine);
  }
  function onMove(e) {
    if (e.pointerType === "touch") return;
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    if (!vine) return;
    var now = performance.now(), last = pts[pts.length - 1];
    var dx = last ? e.clientX - last.x : 0, dy = last ? e.clientY - last.y : 0;
    var step = Math.sqrt(dx * dx + dy * dy);
    if (last && step < 2) return;
    var len = step || 1;
    var p = { x: e.clientX, y: e.clientY, t: now, d: (last ? last.d : 0) + step, nx: -dy / len, ny: dx / len };
    if (!last) { p.nx = 0; p.ny = 1; }
    pts.push(p);
    if (pts.length > 90) pts.shift();
    travelled += step;
    var vivid = motion() === "vivid";
    if (travelled > nextLeaf && last) {
      nextLeaf = travelled + (vivid ? 46 : 64) + Math.random() * 30;
      var side = Math.random() < 0.5 ? 1 : -1;
      var off = (vivid ? 8 : 5.5) * 0.9 * side;
      leaves.push({ x: p.x + p.nx * off, y: p.y + p.ny * off, rot: Math.atan2(dy, dx) + side * (0.9 + Math.random() * 0.5), len: (vivid ? 11 : 8) + Math.random() * 4, t: now, life: vivid ? 1500 : 1100 });
    }
    if (vivid && Math.random() < 0.08 && seeds.length < 24) {
      seeds.push({ x: p.x, y: p.y, vx: (Math.random() - 0.5) * 0.5, vy: -0.25 - Math.random() * 0.3, p: Math.random() * 6, t: now, life: 2000 + Math.random() * 900 });
    }
    if (!vraf) vraf = requestAnimationFrame(drawVine);
  }
  window.addEventListener("pointermove", onMove, { passive: true });
  document.addEventListener("mouseleave", function () { mouse.x = mouse.y = -9999; });

  /* ── follow the kit ──────────────────────────────────────────────────────────────────────── */
  function sync() {
    syncColors();
    if (!cursorOn()) { mouse.x = mouse.y = -9999; stopVine(); } else startVine();
    scheduleStars();
  }
  new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ["data-theme", "data-motion", "data-cursor", "data-contrast"] });
  if (document.body) sync();
  else document.addEventListener("DOMContentLoaded", sync);
})();
