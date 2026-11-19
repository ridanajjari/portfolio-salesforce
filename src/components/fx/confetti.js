const COLORS = ["#1b96ff", "#0176d3", "#45c65a", "#91db8b", "#aacbff", "#ffffff"];

// Small confetti burst from a point on screen. No-op for reduced-motion users.
export function confetti(x = window.innerWidth / 2, y = window.innerHeight / 2) {
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:99";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);

  const parts = Array.from({ length: 110 }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * 9;
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 5,
      size: 5 + Math.random() * 6,
      rot: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
  });

  const start = performance.now();
  const DURATION = 1600;
  const tick = (now) => {
    const p = (now - start) / DURATION;
    if (p >= 1) {
      canvas.remove();
      return;
    }
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.globalAlpha = 1 - p * p;
    for (const c of parts) {
      c.vy += 0.32;
      c.vx *= 0.985;
      c.x += c.vx;
      c.y += c.vy;
      c.rot += c.spin;
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(c.rot);
      ctx.fillStyle = c.color;
      ctx.fillRect(-c.size / 2, -c.size / 4, c.size, c.size / 2);
      ctx.restore();
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// burst from the centre of a DOM element
export function confettiFrom(el) {
  if (!el) return confetti();
  const r = el.getBoundingClientRect();
  confetti(r.left + r.width / 2, r.top + r.height / 2);
}
