export default function SectionTitle({ id, children }) {
  return (
    <h1 className="section-title" id={id}>
      {children}
    </h1>
  );
}
