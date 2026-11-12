import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { drawChalkStroke, newSeed, CHALK_COLORS } from "./chalk";

// Lets visitors write on the page in chalk. Strokes are stored in page
// coordinates and redrawn into a viewport-sized canvas, so they scroll with
// the page without allocating a canvas as tall as the document.
export default function ChalkLayer() {
  const canvasRef = useRef(null);
  const strokes = useRef([]);
  const current = useRef(null);
  const frame = useRef(0);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("white");
  const [hasStrokes, setHasStrokes] = useState(false);
  const router = useRouter();

  const redraw = useCallback(() => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const top = window.scrollY, left = window.scrollX;
      const bottom = top + window.innerHeight;
      for (const s of strokes.current) {
        if (s.maxY < top - 20 || s.minY > bottom + 20) continue;
        drawChalkStroke(ctx, s.points, { color: CHALK_COLORS[s.color], offsetX: left, offsetY: top });
      }
    });
  }, []);

  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      redraw();
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", redraw, { passive: true });
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", redraw);
    };
  }, [redraw]);

  // A fresh board on each page.
  useEffect(() => {
    strokes.current = [];
    setHasStrokes(false);
    redraw();
  }, [router.asPath, redraw]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setDrawing(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const point = (e) => ({ x: e.clientX + window.scrollX, y: e.clientY + window.scrollY, seed: newSeed() });

  function onPointerDown(e) {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    const p = point(e);
    current.current = { color, points: [p], minY: p.y, maxY: p.y };
    strokes.current.push(current.current);
    setHasStrokes(true);
    redraw();
  }

  function onPointerMove(e) {
    if (!current.current) return;
    const p = point(e);
    const s = current.current;
    s.points.push(p);
    s.minY = Math.min(s.minY, p.y);
    s.maxY = Math.max(s.maxY, p.y);
    redraw();
  }

  function onPointerUp() {
    current.current = null;
  }

  function erase() {
    strokes.current = [];
    setHasStrokes(false);
    redraw();
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        className={"chalk-canvas" + (drawing ? " drawing" : "")}
        aria-hidden="true"
        onPointerDown={drawing ? onPointerDown : undefined}
        onPointerMove={drawing ? onPointerMove : undefined}
        onPointerUp={drawing ? onPointerUp : undefined}
        onPointerCancel={drawing ? onPointerUp : undefined}
      />
      <div className="chalk-tray" role="toolbar" aria-label="Chalk">
        <button type="button" className={drawing ? "active" : ""} aria-pressed={drawing}
          onClick={() => setDrawing((d) => !d)} title="Write on the board (Esc to stop)">
          ✎ {drawing ? "Drawing" : "Draw"}
        </button>
        {Object.entries(CHALK_COLORS).map(([name, hex]) => (
          <button key={name} type="button" className={"chalk-swatch" + (color === name ? " active" : "")}
            style={{ "--swatch": hex }} aria-label={`${name} chalk`} aria-pressed={color === name}
            onClick={() => { setColor(name); setDrawing(true); }} />
        ))}
        <button type="button" onClick={erase} disabled={!hasStrokes} title="Erase the board">Erase</button>
      </div>
    </>
  );
}
