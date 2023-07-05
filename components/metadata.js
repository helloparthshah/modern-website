import { Row, Col, Badge } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';

export default function Metadata({ metadata }) {
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
                        <h1>{metadata.title}</h1>
                    </Row>
                    <Row>
                        <p className="text-muted">
                            {new Date(metadata.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </Row>
                    <Row>
                        <p>
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