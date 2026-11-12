import React from 'react';
import { Row, Col } from "react-bootstrap";
import Experience from "@/components/experience";
import Containter from "react-bootstrap/Container";
import Hello from '@/components/hello';
import workExperience from "/public/jsons/work-experience.json";
import projects from "/public/jsons/projects.json";
import awards from "/public/jsons/awards.json";
import Publication from '@/components/publication';
import Education from '@/components/education';
import Link from 'next/link';
import SectionTitle from '@/components/sectionTitle';
import useReveal from '@/components/reveal';

export default function Home() {
  return (
    <Containter className='home'>
      <Hello />
      <div className="content">
        <Education />
        <Experience jsonExperiences={workExperience} title={"Work Experience"} isExperience />
        <Experience jsonExperiences={projects} title={"Projects"} />
        <div>
          <SectionTitle id="publications">Publications</SectionTitle>
          <Publication />
        </div>
        <div>
          <SectionTitle id="awards">Awards</SectionTitle>
          <Row xs={1} sm={2} lg={3} className="g-3">
            {awards.map((award, index) => (
              <Col key={index}>
                <Award award={award} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </Containter>
  );
}

function Award({ award }) {
  const ref = useReveal();
  return (
    <div className="ps-card award-card" ref={ref}>
      <div className="award-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="bi bi-trophy-fill" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935z" />
        </svg>
      </div>
      <div className="flex-grow-1">
        <div className="fw-semibold">
          {award.link ? <Link href={award.link} target="_blank">{award.position}</Link> : award.position}
        </div>
        <div className="ps-muted small">{award.title}</div>
      </div>
      <span className="ps-chip mb-0 me-0">{award.date}</span>
    </div>
  );
}
