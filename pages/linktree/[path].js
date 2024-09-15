"use client";

import React, { useRef, useEffect, useState } from "react";
import linktree from "@/public/jsons/linktree.json";
import { Container, Col, Button, Row } from "react-bootstrap";
import { gsap } from "gsap";
import { useRouter } from "next/router";

export default function LinktreePage() {
  const router = useRouter();
  const [currentLinks, setCurrentLinks] = useState(null);

  // const currentLinks = links.find((linkGroup) => linkGroup.path === path);
  const ref = useRef(null);

  useEffect(() => {
    // check if router is ready
    if (!router.isReady) return;
    let path = router.query.path;
    // check if linktree has the path
    let linkTreeObject = linktree.find((linkGroup) => linkGroup.path === path);
    console.log(linkTreeObject);
    if (!linkTreeObject) {
      router.replace("/404");
    }
    setCurrentLinks(linkTreeObject);
  }, [router, router.query.path]);

  useEffect(() => {
    currentLinks &&
      ref.current.childNodes.forEach((child) => {
        console.log(child);
        gsap.from(child, {
          y: 24,
          opacity: 0,
          duration: 0.8,
          ease: "ease",
          scrollTrigger: {
            trigger: child,
            start: "top 80%",
          },
        });
      });
  }, [currentLinks]);

  return (
    <Container className="contact">
      <h1 style={{ textAlign: "center" }}>{currentLinks?.title}</h1>
      <hr className="mb-5" />
      <Col className="text-center" ref={ref}>
        {currentLinks?.links.map((link, index) => {
          return (
            <Row key={index}>
              <Button
                key={index}
                href={link.url}
                target="_blank"
                variant="outline-secondary"
              >
                {link.label}
              </Button>
            </Row>
          );
        })}
      </Col>
    </Container>
  );
}
