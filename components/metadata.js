import { Row, Col, Badge } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import SplitType from 'split-type';

export default function Metadata({ metadata }) {
    const date = new Date(metadata.date).toLocaleDateString('en-US',
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    useEffect(() => {
        const heading = new SplitType('.title', { types: 'words' });
        const description = new SplitType('.description', { types: 'lines' });
        const heroElements = [...heading.words, ...description.lines];
        // wait till metadata is loaded
        if (!metadata) return;
        console.log(date);
        gsap.from(heroElements, {
            y: 24,
            opacity: 0,
            duration: 0.8,
            stagger: { amount: 0.5 },
            ease: 'ease',
        });
    }, [metadata]);
    return (
        <>
            <Row>
                <Col>
                    <Row>
                        <Col>
                            <h6 className="text-muted">
                                {
                                    metadata.authors ? metadata.authors.map((author, index) => {
                                        return (
                                            <Link key={index} href={`/blogs/?query=${author}`}
                                                style={{ textDecoration: 'none', color: 'inherit' }}>
                                                {author}
                                                {index < metadata.authors.length - 1 ? ", " : ""}
                                            </Link>
                                        )
                                    }) : null
                                }
                            </h6>
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <h6 className="d-flex align-items-center justify-content-start gap-2 h-100">
                                {metadata.tags ? metadata.tags.map((tag) => (
                                    <Link key={tag} href={`/blogs/?query=${tag}`}
                                        style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <Badge bg="secondary" key={tag}>
                                            {tag}
                                        </Badge>
                                    </Link>
                                )) : null}
                            </h6>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <h1 className="title">
                            {metadata.title}
                        </h1>
                    </Row>
                    <Row>
                        <p className="text-muted">
                            {date.toLocaleString()}
                        </p>
                    </Row>
                    <Row>
                        <p className="description">
                            {metadata.description}
                        </p>
                    </Row>
                </Col>
                <Col className="blog-tile-image d-flex justify-content-end align-items-center">
                    <div style={{ position: "relative", width: "80%", height: "400px" }}>
                        <Image src={metadata.image} roundedCircle fill style={{
                            borderRadius: '10px',
                            objectFit: 'cover',
                        }} />
                    </div>
                </Col>
            </Row>
            <hr className="mb-5" />
        </>
    )
}