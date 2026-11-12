import { createContext, useContext, useEffect, useRef, useState } from "react";
import { getPref, setPref } from "./prefs";

// Alternate site designs that can be tried side by side.
export const DESIGNS = {
  default: { label: "Default" },
  wiki: {
    label: "Wiki",
    fonts: "https://fonts.googleapis.com/css2?family=Gelasio:wght@400;600&display=swap",
  },
  sketch: {
    label: "Chalk",
    fonts: "https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap",
  },
};

const DesignContext = createContext({ design: "default", setDesign: () => {} });

function loadFonts(design) {
  const href = DESIGNS[design]?.fonts;
  if (href && !document.querySelector(`link[data-design-font="${design}"]`)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.dataset.designFont = design;
    document.head.appendChild(link);
  }
}

// initialDesign comes from the cookie on server-rendered pages.
export function DesignProvider({ initialDesign, children }) {
  const [design, setDesignState] = useState(DESIGNS[initialDesign] ? initialDesign : "default");
  const resolved = useRef(false);

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("design");
    const saved = getPref("design");
    const initial = DESIGNS[fromUrl] ? fromUrl : DESIGNS[saved] ? saved : "default";
    resolved.current = true;
    setDesignState(initial);
    setPref("design", initial);
    document.documentElement.setAttribute("data-design", initial);
    loadFonts(initial);
  }, []);

  function setDesign(next) {
    setDesignState(next);
    setPref("design", next);
    document.documentElement.setAttribute("data-design", next);
    loadFonts(next);
  }

  return (
    <DesignContext.Provider value={{ design, setDesign }}>
      {children}
    </DesignContext.Provider>
  );
}

export function useDesign() {
  return useContext(DesignContext);
}

export function DesignSwitcher() {
  const { design, setDesign } = useDesign();
  return (
    <div className="design-switcher" role="group" aria-label="Site design">
      <span className="design-switcher-label">Design</span>
      {Object.entries(DESIGNS).map(([key, d]) => (
        <button key={key} type="button" className={design === key ? "active" : ""}
          aria-pressed={design === key} onClick={() => setDesign(key)}>
          {d.label}
        </button>
      ))}
    </div>
  );
}
