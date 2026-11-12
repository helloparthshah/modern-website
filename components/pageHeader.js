// Shared header for inner pages so they match the home page hero.
export default function PageHeader({ eyebrow, title, subtitle, center = false }) {
  return (
    <header className={"page-header" + (center ? " text-center" : "")}>
      {eyebrow && <div className="hero-tagline">{eyebrow}</div>}
      <h1 className="page-title">{title}</h1>
      {subtitle && <p className="page-subtitle ps-muted">{subtitle}</p>}
    </header>
  );
}
