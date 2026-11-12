import React, { useEffect, useState } from "react";
import linktree from "@/public/jsons/linktree.json";
import { Container } from "react-bootstrap";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/pageHeader";

export default function LinktreePage() {
  const router = useRouter();
  const [currentLinks, setCurrentLinks] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;
    const group = linktree.find((linkGroup) => linkGroup.path === router.query.path);
    if (!group) {
      router.replace("/404");
      return;
    }
    setCurrentLinks(group);
  }, [router, router.query.path]);

  return (
    <Container className="page linktree-page">
      <div className="linktree-avatar">
        <Image src={process.env.CONFIG.image} alt={process.env.CONFIG.name} fill sizes="96px" style={{ objectFit: "cover" }} />
      </div>
      <PageHeader eyebrow={process.env.CONFIG.name} title={currentLinks?.title ?? ""} center />
      <div className="linktree-links">
        {currentLinks?.links.map((link, index) => (
          <a key={index} className="ps-btn linktree-link" href={link.url} target="_blank" rel="noreferrer"
            style={{ animationDelay: `${index * 70}ms` }}>
            {link.label}
            <span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
      <div className="text-center mt-4">
        <Link href="/linktree" className="post-back">← All boards</Link>
      </div>
    </Container>
  );
}
