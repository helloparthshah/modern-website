"use client";

import React, { useRef, useEffect } from "react";
import linktree from "@/public/jsons/linktree.json";
import { Container, Col, Button, Row } from "react-bootstrap";
import { gsap } from "gsap";
import Link from "next/link";

export default function LinktreeLinks() {
  const ref = useRef(null);

  useEffect(() => {
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
  }, []);

  return (
    <Container className="contact">
      <h1 style={{ textAlign: "center" }}>Linktree Boards</h1>
      <hr className="mb-5" />
      <Col className="text-center" ref={ref}>
        {linktree.map((linkGroup, index) => {
          return (
            <Row key={index}>
              <Link
                href={`/linktree/${linkGroup.path}`}
                passHref
                legacyBehavior
              >
                <Button key={index} variant="outline-secondary" className="m-2">
                  {linkGroup.title}
                </Button>
              </Link>
            </Row>
          );
        })}
      </Col>
    </Container>
  );
}
