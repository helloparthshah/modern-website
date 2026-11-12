import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { drawChalkStroke, drawInkStroke, newSeed, CHALK_COLORS } from "./chalk";
import { useDesign } from "./design";

// A small pad for an optional handwritten note on the contact form.
const NotePad = forwardRef(function NotePad({ label }, ref) {
  const canvasRef = useRef(null);
  const strokes = useRef([]);
  const current = useRef(null);
  const [empty, setEmpty] = useState(true);
  const { design } = useDesign();
  const chalk = design === "sketch";

  function paint() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = canvas.width / canvas.clientWidth;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    const ink = getComputedStyle(canvas).getPropertyValue("--ps-text").trim() || "#1c1b19";
    for (const s of strokes.current) {
      if (chalk) drawChalkStroke(ctx, s, { color: CHALK_COLORS.white, width: 4 });
      else drawInkStroke(ctx, s, { color: ink });
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const fit = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      paint();
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chalk]);

  const pos = (e) => {
    const r = canvasRef.current.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top, seed: newSeed() };
  };

  function down(e) {
    e.currentTarget.setPointerCapture(e.pointerId);
    current.current = [pos(e)];
    strokes.current.push(current.current);
    setEmpty(false);
    paint();
  }

  function move(e) {
    if (!current.current) return;
    current.current.push(pos(e));
    paint();
  }

  function up() {
    current.current = null;
  }

  function clear() {
    strokes.current = [];
    setEmpty(true);
    paint();
  }

  useImperativeHandle(ref, () => ({
    isEmpty: () => strokes.current.length === 0,
    clear,
    // PNG of the note on a solid background so it reads in any email client.
    toBlob: () => new Promise((resolve) => {
      const src = canvasRef.current;
      const out = document.createElement("canvas");
      out.width = src.width;
      out.height = src.height;
      const ctx = out.getContext("2d");
      ctx.fillStyle = chalk ? "#263a33" : "#ffffff";
      ctx.fillRect(0, 0, out.width, out.height);
      if (!chalk) {
        // Ink is drawn in the page's text colour, which may be light in dark mode.
        const dpr = src.width / src.clientWidth;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        for (const s of strokes.current) drawInkStroke(ctx, s, { color: "#1c1b19" });
      } else {
        ctx.drawImage(src, 0, 0);
      }
      out.toBlob(resolve, "image/png");
    }),
  }));

  return (
    <div className="note-pad">
      <div className="d-flex justify-content-between align-items-baseline mb-1">
        <span className="form-label mb-0">{label}</span>
        <button type="button" className="note-clear" onClick={clear} disabled={empty}>Clear</button>
      </div>
      <canvas
        ref={canvasRef}
        className="note-canvas"
        aria-label="Handwritten note pad"
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
      />
      {empty && <div className="note-hint ps-muted">Draw or write here with your mouse, finger or stylus</div>}
    </div>
  );
});

export default NotePad;
