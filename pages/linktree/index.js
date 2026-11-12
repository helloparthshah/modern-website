import linktree from "@/public/jsons/linktree.json";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import PageHeader from "@/components/pageHeader";
import useReveal from "@/components/reveal";

function BoardCard({ group }) {
  const ref = useReveal();
  return (
    <Link href={`/linktree/${group.path}`} className="ps-card board-card" ref={ref}>
      <div>
        <h5 className="mb-1">{group.title}</h5>
        <div className="ps-muted small">{group.links.length} links</div>
      </div>
      <span className="board-arrow" aria-hidden="true">→</span>
    </Link>
  );
}

export default function LinktreeLinks() {
  return (
    <Container className="page">
      <PageHeader eyebrow="Links" title="Linktree Boards" subtitle="Quick link collections for socials and projects." center />
      <Row xs={1} md={2} className="g-3 links-narrow">
        {linktree.map((group) => (
          <Col key={group.path}>
            <BoardCard group={group} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
