import { Row, Col } from "react-bootstrap";
import Image from "next/image";
import SectionTitle from "./sectionTitle";
import useReveal from "./reveal";

function bullets(description) {
    return description ? description.split('\n').filter(Boolean) : [];
}

export default function Experience({ jsonExperiences, title, isExperience }) {
    const id = title.toLowerCase().replace(' ', '-');
    return (
        <div>
            <SectionTitle id={id}>{title}</SectionTitle>
            {isExperience ? (
                <div className="timeline">
                    {jsonExperiences.map((experience, index) => (
                        <TimelineItem key={index} experience={experience} />
                    ))}
                </div>
            ) : (
                <Row xs={1} md={2} className="g-4">
                    {jsonExperiences.map((project, index) => (
                        <Col key={index}>
                            <ProjectCard project={project} />
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
}

// An entry is either a single role ({ title, start, end, description }) or a
// company with several roles ({ organization, roles: [...] }), e.g. after a promotion.
function TimelineItem({ experience }) {
    const ref = useReveal();
    const roles = experience.roles;
    return (
        <div className="timeline-item" ref={ref}>
            <div className="timeline-logo">
                <Image src={experience.image ?? "/images/placeholder.png"}
                    fill sizes="56px" style={{ objectFit: 'cover' }}
                    alt={experience.organization} />
            </div>
            <div className="ps-card timeline-card">
                {roles ? (
                    <>
                        <div className="timeline-head">
                            <h5>{experience.organization}</h5>
                            <span className="timeline-date">
                                {roles[roles.length - 1].start} - {roles[0].end}
                            </span>
                        </div>
                        <div className="ps-muted">{experience.location}</div>
                        <div className="role-list">
                            {roles.map((role, index) => (
                                <div className="role" key={index}>
                                    <div className="timeline-head">
                                        <h6>{role.title}</h6>
                                        <span className="timeline-date">{role.start} - {role.end}</span>
                                    </div>
                                    {role.location && role.location !== experience.location && (
                                        <div className="ps-muted small">{role.location}</div>
                                    )}
                                    <Bullets description={role.description} />
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="timeline-head">
                            <h5>{experience.title}</h5>
                            <span className="timeline-date">{experience.start} - {experience.end}</span>
                        </div>
                        <div className="ps-muted">
                            {experience.organization} · {experience.location}
                        </div>
                        <Bullets description={experience.description} />
                    </>
                )}
            </div>
        </div>
    );
}

function Bullets({ description }) {
    return (
        <ul className="ps-bullets">
            {bullets(description).map((line, index) => (
                <li key={index}>{line}</li>
            ))}
        </ul>
    );
}

function ProjectCard({ project }) {
    const ref = useReveal();
    const links = project.links ? Object.entries(project.links) : [];
    return (
        <div className="ps-card project-card" ref={ref}>
            <div className="project-image">
                <Image src={project.image ?? "/images/placeholder.png"}
                    fill sizes="(max-width: 768px) 100vw, 520px"
                    style={{ objectFit: 'cover', objectPosition: 'top' }}
                    alt={project.title} />
            </div>
            <div className="project-body">
                <div className="timeline-head mb-1">
                    <h5 className="mb-0">{project.title}</h5>
                    <span className="timeline-date">{project.start} - {project.end}</span>
                </div>
                <ul className="ps-bullets mb-2">
                    {bullets(project.description).map((line, index) => (
                        <li key={index}>{line}</li>
                    ))}
                </ul>
                {project.skills && project.skills.length > 0 && (
                    <div>
                        {project.skills.map((skill, index) => (
                            <span key={index} className="ps-chip">{skill}</span>
                        ))}
                    </div>
                )}
                {links.length > 0 && (
                    <div className="project-links">
                        {links.map(([name, href]) => (
                            <a key={name} href={href} target="_blank" rel="noreferrer">{name} ↗</a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
