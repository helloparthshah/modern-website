import { useCallback, useEffect, useRef, useState } from "react";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const STEP_MS = 90; // one flap fold

function randomChar() {
  return CHARSET[Math.floor(Math.random() * CHARSET.length)];
}

// A single split-flap tile. Each change folds the top flap down over the old
// character while the bottom flap swings into place with the new one.
function Tile({ target, delaySteps, runId }) {
  const [state, setState] = useState({ prev: target, curr: target, flip: 0 });
  const timers = useRef([]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (runId === 0) return;
    const spins = 4 + delaySteps * 2 + Math.floor(Math.random() * 3);
    const sequence = [...Array.from({ length: spins }, randomChar), target];
    sequence.forEach((ch, i) => {
      timers.current.push(
        setTimeout(() => {
          setState((s) => ({ prev: s.curr, curr: ch, flip: s.flip + 1 }));
        }, (i + 1) * STEP_MS)
      );
    });
    return () => timers.current.forEach(clearTimeout);
  }, [runId, target, delaySteps]);

  const show = (c) => (c === " " ? "\u00a0" : c);
  const prev = show(state.prev);
  const curr = show(state.curr);
  const flip = state.flip;
  return (
    <span className="flap-tile" aria-hidden="true">
      <span className="flap-half flap-top"><span>{curr}</span></span>
      <span className="flap-half flap-bottom"><span>{prev}</span></span>
      {flip > 0 && (
        <>
          <span key={`t${flip}`} className="flap-half flap-top flap-fold"><span>{prev}</span></span>
          <span key={`b${flip}`} className="flap-half flap-bottom flap-land"><span>{curr}</span></span>
        </>
      )}
    </span>
  );
}

export default function FlipBoard({ text }) {
  const [runId, setRunId] = useState(0);
  const busyUntil = useRef(0);

  const run = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (Date.now() < busyUntil.current) return;
    busyUntil.current = Date.now() + 2500;
    setRunId((r) => r + 1);
  }, []);

  useEffect(() => {
    const t = setTimeout(run, 300);
    return () => clearTimeout(t);
  }, [run]);

  // Pad rows to the same width with blank flaps, like a real departures board.
  const raw = text.toUpperCase().split(" ");
  const width = Math.max(...raw.map((w) => w.length));
  const words = raw.map((w) => w.padEnd(width, " "));
  return (
    <span className="flap-board" onMouseEnter={run} title="">
      <span className="visually-hidden">{text}</span>
      {words.map((word, w) => (
        <span key={w} className="flap-row">
          {word.split("").map((ch, i) => (
            <Tile key={i} target={ch} delaySteps={i + w * 2} runId={runId} />
          ))}
        </span>
      ))}
    </span>
  );
}
