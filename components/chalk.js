// Shared stroke rendering for the chalk drawing layer and the contact note pad.

// Small deterministic PRNG so a stroke looks identical every time it is redrawn.
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Grainy chalk: many tiny semi-transparent specks scattered along the path.
export function drawChalkStroke(ctx, points, { color = "#f1efe6", width = 5, offsetX = 0, offsetY = 0 } = {}) {
  if (points.length === 0) return;
  ctx.fillStyle = color;
  for (let i = 0; i < points.length; i++) {
    const a = points[Math.max(0, i - 1)];
    const b = points[i];
    const rand = mulberry32(b.seed);
    const dx = b.x - a.x, dy = b.y - a.y;
    const dist = Math.max(1, Math.hypot(dx, dy));
    const steps = Math.ceil(dist / 1.2);
    for (let s = 0; s < steps; s++) {
      const t = s / steps;
      const cx = a.x + dx * t - offsetX;
      const cy = a.y + dy * t - offsetY;
      for (let k = 0; k < 4; k++) {
        ctx.globalAlpha = 0.12 + rand() * 0.5;
        const ox = (rand() - 0.5) * width;
        const oy = (rand() - 0.5) * width;
        const size = 0.6 + rand() * 1.4;
        ctx.fillRect(cx + ox, cy + oy, size, size);
      }
    }
  }
  ctx.globalAlpha = 1;
}

// Smooth ink line for the non-chalk designs.
export function drawInkStroke(ctx, points, { color = "#1c1b19", width = 2.5 } = {}) {
  if (points.length === 0) return;
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    const p = points[i - 1], q = points[i];
    ctx.quadraticCurveTo(p.x, p.y, (p.x + q.x) / 2, (p.y + q.y) / 2);
  }
  ctx.stroke();
}

export const newSeed = () => Math.floor(Math.random() * 2 ** 31);

export const CHALK_COLORS = {
  white: "#f1efe6",
  yellow: "#ffe08a",
  pink: "#ffb3c7",
  blue: "#a9d8ff",
};
