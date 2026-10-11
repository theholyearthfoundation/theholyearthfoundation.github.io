// Fireflies over the canopy: cursor-tracking star field + comet-dust trail, canvas, no dependencies.
// Same mechanics as changelog-astro's Starfield.astro; colors come from the page's --firefly and
// --spark CSS variables (thef.css) so the light/dark toggle recolors it without a reload.
(function () {
  var canvas = document.getElementById("starfield-canvas");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var stars = [];
  var sparks = [];
  var mouse = { x: -9999, y: -9999 };
  var lastMouse = { x: -9999, y: -9999 };
  var W, H, starColor, sparkColor;

  function syncTheme() {
    var cs = getComputedStyle(document.documentElement);
    starColor = cs.getPropertyValue("--firefly").trim() || "#E2F0A8";
    sparkColor = cs.getPropertyValue("--spark").trim() || "#F2C14E";
  }
  syncTheme();
  new MutationObserver(syncTheme).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function initStars() {
    stars = [];
    var count = Math.min(140, Math.floor((W * H) / 9000));
    for (var i = 0; i < count; i++) {
      var bx = Math.random() * W;
      var by = Math.random() * H;
      stars.push({
        bx: bx, by: by, x: bx, y: by,
        r: Math.random() * 1.4 + 0.4,
        bright: Math.random() < 0.22,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.6,
      });
    }
  }

  window.addEventListener("resize", function () { resize(); initStars(); });
  resize();
  initStars();

  var MAGNET_RADIUS = 90;

  function drawSpike(x, y, r) {
    ctx.save();
    ctx.translate(x, y);
    ctx.strokeStyle = starColor;
    ctx.globalAlpha = 0.55;
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    ctx.moveTo(-r * 2.6, 0); ctx.lineTo(r * 2.6, 0);
    ctx.moveTo(0, -r * 2.6); ctx.lineTo(0, r * 2.6);
    ctx.stroke();
    ctx.restore();
  }

  function updateStars(t) {
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      var dx = s.bx - mouse.x, dy = s.by - mouse.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      var tx = s.bx, ty = s.by;
      if (dist < MAGNET_RADIUS) {
        var f = 1 - dist / MAGNET_RADIUS, push = f * f * 26, ang = Math.atan2(dy, dx);
        tx = s.bx + Math.cos(ang) * push;
        ty = s.by + Math.sin(ang) * push;
      }
      s.x += (tx - s.x) * 0.18;
      s.y += (ty - s.y) * 0.18;
      var twinkle = 0.5 + 0.5 * Math.sin(t * 0.001 * s.speed + s.phase);
      ctx.beginPath();
      ctx.fillStyle = starColor;
      ctx.globalAlpha = s.bright ? 0.55 + twinkle * 0.45 : 0.22 + twinkle * 0.3;
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
      if (s.bright) drawSpike(s.x, s.y, s.r);
    }
    ctx.globalAlpha = 1;
  }

  function spawnSparks(x, y) {
    var dx = x - lastMouse.x, dy = y - lastMouse.y;
    if (lastMouse.x < -9000) { lastMouse.x = x; lastMouse.y = y; return; }
    for (var i = 0; i < 2; i++) {
      if (sparks.length > 80) sparks.shift();
      var jitter = (Math.random() - 0.5) * 0.6;
      sparks.push({ x: x, y: y, vx: dx * 0.12 + jitter, vy: dy * 0.12 + jitter, life: 1, size: 1 + Math.random() * 1.6 });
    }
    lastMouse.x = x;
    lastMouse.y = y;
  }

  function updateSparks() {
    for (var i = sparks.length - 1; i >= 0; i--) {
      var p = sparks[i];
      p.x += p.vx; p.y += p.vy;
      p.vx *= 0.92; p.vy *= 0.92; p.vy += 0.01;
      p.life -= 0.022;
      if (p.life <= 0) { sparks.splice(i, 1); continue; }
      ctx.beginPath();
      ctx.fillStyle = sparkColor;
      ctx.globalAlpha = Math.max(p.life, 0);
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  window.addEventListener("mousemove", function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    spawnSparks(e.clientX, e.clientY);
  });
  window.addEventListener("mouseleave", function () { mouse.x = -9999; mouse.y = -9999; });

  function loop(t) {
    ctx.clearRect(0, 0, W, H);
    if (reduced) {
      updateStars(0);
      return;
    }
    updateStars(t || 0);
    updateSparks();
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();

(function () {
  var btn = document.getElementById("theme-toggle");
  if (!btn) return;
  btn.addEventListener("click", function () {
    var next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("thef-theme", next); } catch (e) {}
  });
})();
