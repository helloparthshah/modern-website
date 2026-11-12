import { createContext, useContext, useEffect, useState } from "react";

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

export function DesignProvider({ children }) {
  const [design, setDesignState] = useState("default");

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("design");
    let saved = null;
    try { saved = localStorage.getItem("design"); } catch (e) {}
    const initial = DESIGNS[fromUrl] ? fromUrl : DESIGNS[saved] ? saved : "default";
    setDesignState(initial);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-design", design);
    try { localStorage.setItem("design", design); } catch (e) {}
    const href = DESIGNS[design]?.fonts;
    if (href && !document.querySelector(`link[data-design-font="${design}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.dataset.designFont = design;
      document.head.appendChild(link);
    }
  }, [design]);

  return (
    <DesignContext.Provider value={{ design, setDesign: setDesignState }}>
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
