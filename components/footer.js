import Link from "next/link";
import { useEffect, useState } from "react";

export default function Footer() {
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    const date = new Date(process.env.LAST_UPDATED);
    if (!isNaN(date)) {
      setLastUpdated(date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }));
    }
  }, []);

  const links = process.env.CONFIG.footerLinks ?? {};

  return (
    <footer className="ps-footer container">
      <div className="ps-footer-links">
        {Object.keys(links).map((key) => (
          <Link key={key} href={links[key]} target="_blank">{key}</Link>
        ))}
      </div>
      <p className="mb-1">Built by Kunal Pai, Parth Shah and Harshil Patel.</p>
      {lastUpdated && <p className="mb-0">Last updated {lastUpdated}</p>}
    </footer>
  );
}
