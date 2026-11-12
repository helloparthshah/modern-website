import educations from "/public/jsons/education.json";
import SectionTitle from "./sectionTitle";
import useReveal from "./reveal";

export default function Education() {
  return (
    <div>
      <SectionTitle id="education">Education</SectionTitle>
      {educations.map((education, index) => (
        <EducationTile education={education} key={index} />
      ))}
    </div>
  );
}

function EducationTile({ education }) {
  const ref = useReveal();
  return (
    <div className="ps-card timeline-card" ref={ref}>
      <div className="timeline-head">
        <h5>{education.university}</h5>
        <span className="timeline-date">{education.start} - {education.end}</span>
      </div>
      <div className="ps-muted">
        {education.degree}, {education.major}
      </div>
      <div className="mt-2">
        <span className="ps-chip">GPA {education.gpa}</span>
        {education.description && <span className="ps-chip">{education.description}</span>}
      </div>
    </div>
  );
}
