import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { drawChalkSegment, newSeed, CHALK_COLORS } from "./chalk";

const TILE = 1024; // tile height in CSS pixels

// Lets visitors write on the page in chalk. Strokes are painted once, segment
// by segment, onto canvas tiles that sit in the page itself, so the browser
// scrolls them with the content and nothing is redrawn while scrolling.
export default function ChalkLayer() {
  const layerRef = useRef(null);
  const tiles = useRef(new Map());
  const last = useRef(null);
  const down = useRef(false);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("white");
  const [hasStrokes, setHasStrokes] = useState(false);
  const router = useRouter();

  function sizeLayer() {
    const layer = layerRef.current;
    if (!layer) return;
    layer.style.height = `${document.documentElement.scrollHeight}px`;
  }

  function tile(index) {
    let t = tiles.current.get(index);
    if (!t) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = document.documentElement.clientWidth;
      const canvas = document.createElement("canvas");
      canvas.width = width * dpr;
      canvas.height = TILE * dpr;
      canvas.style.cssText = `position:absolute;left:0;top:${index * TILE}px;width:${width}px;height:${TILE}px;`;
      const ctx = canvas.getContext("2d");
      ctx.scale(dpr, dpr);
      layerRef.current.appendChild(canvas);
      t = { canvas, ctx };
      tiles.current.set(index, t);
    }
    return t;
  }

  function paint(a, b) {
    const pad = 6;
    const first = Math.floor((Math.min(a.y, b.y) - pad) / TILE);
    const lastTile = Math.floor((Math.max(a.y, b.y) + pad) / TILE);
    for (let i = Math.max(0, first); i <= lastTile; i++) {
      drawChalkSegment(tile(i).ctx, a, b, { color: CHALK_COLORS[color], offsetY: i * TILE });
    }
  }

  function clear() {
    tiles.current.forEach((t) => t.canvas.remove());
    tiles.current.clear();
    setHasStrokes(false);
  }

  useEffect(() => {
    sizeLayer();
    const observer = new ResizeObserver(sizeLayer);
    observer.observe(document.body);
    return () => observer.disconnect();
  }, []);

  // A fresh board on each page.
  useEffect(() => {
    clear();
    sizeLayer();
  }, [router.asPath]);

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
    down.current = true;
    last.current = p;
    paint(p, p);
    setHasStrokes(true);
  }

  function onPointerMove(e) {
    if (!down.current) return;
    const p = point(e);
    paint(last.current ?? p, p);
    last.current = p;
  }

  function onPointerUp() {
    down.current = false;
    last.current = null;
  }

  // If the page scrolls mid-stroke, continue from the pointer's new spot
  // instead of drawing a long jump across the page.
  useEffect(() => {
    if (!drawing) return;
    const onScroll = () => { last.current = null; };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [drawing]);

  return (
    <>
      <div ref={layerRef} className="chalk-layer" aria-hidden="true" />
      {drawing && (
        <div
          className="chalk-capture"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        />
      )}
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
        <button type="button" onClick={clear} disabled={!hasStrokes} title="Erase the board">Erase</button>
      </div>
    </>
  );
}
