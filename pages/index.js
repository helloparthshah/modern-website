import React from 'react';
import { Row, Col } from "react-bootstrap";
import Experience from "@/components/experience";
import Containter from "react-bootstrap/Container";
import Hello from '@/components/hello';
import researchExperience from "/public/jsons/research-experience.json";
import workExperience from "/public/jsons/work-experience.json";
import projects from "/public/jsons/projects.json";
import awards from "/public/jsons/awards.json";
import Image from "next/image";
import trophy from '/public/images/trophy.png';
import Publication from '@/components/publication';
import Education from '@/components/education';
import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    const headings = document.querySelectorAll('.content h1');
    headings.forEach((heading) => {
      gsap.from(heading, {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: { amount: 1 },
        ease: 'ease',
        scrollTrigger: {
          trigger: heading,
          start: 'top 80%',
        },
      });
    });
    /* gsap.from(headings, {
      y: 24,
      opacity: 0,
      duration: 0.8,
      stagger: { amount: 1 },
      ease: 'ease',
      scrollTrigger: {
        trigger: headings,
        start: 'top 80%',
      },
    }); */
  }, []);
  return (
    <Containter className='home'>
      <Row>
        <Hello />
      </Row>
      <div className="content">
        <Row>
          <Education />
        </Row>
        <Row>
          <Experience jsonExperiences={workExperience} title={"Work Experience"} isExperience />
        </Row>
        <Row>
          <Experience jsonExperiences={projects} title={"Projects"} />
        </Row>
        <Row>
          <div className="mt-5">
            <h1 className="mb-3" id="publications">
              Publications
            </h1>
            <Publication />
          </div>
        </Row>
        <Row>
          <div className="mt-5">
            <h1 className="mb-3" id="awards">
              Awards
            </h1>
            {
              awards.map((award, index) => {
                return (
                  <Award key={index} award={award} />
                )
              })
            }
          </div>
        </Row>
      </div>
    </Containter>
  );
}

function Award({ award }) {
  const ref = useRef(null);
  useEffect(() => {
    gsap.from(ref.current, {
      y: 24,
      opacity: 0,
      duration: 0.8,
      ease: 'ease',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
      },
    });
  }, []);
  return (
    <Row className="mb-3" ref={ref}>
      <Col xs={1} className="d-flex align-items-center" style={{ width: 'auto' }}>
        <Image src={trophy} roundedCircle width={50} height={50} />
      </Col>
      <Col>
        <div >
          <h3>{award.title}</h3>
          <p>
            {award.link ? <Link href={award.link}>{award.position}</Link> :
              award.position
            }
          </p>
          <span>{award.date}</span>
        </div>
      </Col>
    </Row>
  )
}
