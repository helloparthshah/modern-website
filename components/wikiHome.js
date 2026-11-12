import Image from "next/image";
import workExperience from "/public/jsons/work-experience.json";
import projects from "/public/jsons/projects.json";
import awards from "/public/jsons/awards.json";
import publications from "/public/jsons/publications.json";
import educations from "/public/jsons/education.json";

// Encyclopedia-article version of the home page. Written in the third person
// using the surname, with no pronouns.

const lines = (text) => (text ? text.split("\n").filter(Boolean) : []);
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

// Links known names (companies, projects, school) inside plain text and bolds the subject's name.
function linkify(text, terms, boldName) {
  const keys = Object.keys(terms).sort((a, b) => b.length - a.length);
  const pattern = new RegExp(`(${[boldName, ...keys].map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  let boldDone = false;
  return text.split(pattern).map((part, i) => {
    if (part === boldName && !boldDone) { boldDone = true; return <b key={i}>{part}</b>; }
    if (terms[part]) return <a key={i} href={terms[part]}>{part}</a>;
    return part;
  });
}

function roleRange(entry) {
  if (entry.roles) return `${entry.roles[entry.roles.length - 1].start} - ${entry.roles[0].end}`;
  return `${entry.start} - ${entry.end}`;
}

export default function WikiHome() {
  const config = process.env.CONFIG;
  const links = config.footerLinks ?? {};
  const edu = educations[0];
  const realProjects = projects.filter((p) => p.title !== "Other Projects");

  const toc = [
    { id: "career", title: "Career", children: workExperience.map((w) => ({ id: slug(w.organization), title: w.organization })) },
    { id: "projects", title: "Projects", children: realProjects.map((p) => ({ id: slug(p.title), title: p.title })) },
    { id: "publications", title: "Publications" },
    { id: "awards", title: "Awards" },
    { id: "education", title: "Education" },
    { id: "external-links", title: "External links" },
  ];

  const wiki = config.wiki ?? {};
  const current = workExperience[0];
  const terms = {
    ...Object.fromEntries(workExperience.map((w) => [w.organization, `#${slug(w.organization)}`])),
    ...Object.fromEntries(realProjects.map((p) => [p.title, `#${slug(p.title)}`])),
    ...Object.fromEntries(educations.map((e) => [e.university, "#education"])),
  };
  const sourceLink = links["Website Source"];
  const profileLinks = Object.entries(links).filter(([k]) => k !== "Website Source").slice(0, 2);

  return (
    <div className="wiki">
      <div className="wiki-tabs">
        <div><span className="active">Article</span><span>Talk</span></div>
        <div>
          <span className="active">Read</span>
          {sourceLink && <a href={sourceLink} target="_blank" rel="noreferrer">Edit</a>}
          <span>View history</span>
        </div>
      </div>

      <h1 className="wiki-title">{config.name}</h1>
      {wiki.tagline && <div className="wiki-tagline">{wiki.tagline}</div>}

      <aside className="wiki-infobox">
        <div className="wiki-infobox-title">{config.name}</div>
        <div className="wiki-infobox-image">
          <Image src={config.image} alt={config.name} fill sizes="300px" style={{ objectFit: "cover" }} />
        </div>
        {wiki.imageCaption && <div className="wiki-infobox-caption">{wiki.imageCaption}</div>}
        <table>
          <tbody>
            {wiki.occupation && <tr><th>Occupation</th><td>{wiki.occupation}</td></tr>}
            {current && (
              <tr><th>Employer</th><td><a href={`#${slug(current.organization)}`}>{current.organization}</a> ({roleRange(current)})</td></tr>
            )}
            {edu && (
              <tr><th>Education</th><td><a href="#education">{edu.university}</a> ({edu.degree}, {edu.end})</td></tr>
            )}
            {realProjects.length > 0 && (
              <tr><th>Known for</th><td>{realProjects.slice(0, 4).map((p, i, arr) => (
                <span key={p.title}><a href={`#${slug(p.title)}`}>{p.title}</a>{i < arr.length - 1 ? ", " : ""}</span>))}</td></tr>
            )}
            {awards[0] && (
              <tr><th>Awards</th><td>{awards[0].position}, {awards[0].title} ({awards[0].date})</td></tr>
            )}
            {profileLinks.length > 0 && (
              <tr><th>Website</th><td>{profileLinks.map(([k, v], i) => (
                <span key={k}><a href={v} target="_blank" rel="noreferrer">{k}</a>{i < profileLinks.length - 1 ? " · " : ""}</span>))}</td></tr>
            )}
          </tbody>
        </table>
      </aside>

      {(wiki.summary ?? [config.intro]).map((para, i) => (
        <p key={i} className={i === 0 ? "wiki-lead" : undefined}>{linkify(para, terms, config.name)}</p>
      ))}
      <p>
        A <a href="/resume.pdf" target="_blank" rel="noreferrer">résumé</a> is available.
      </p>

      <nav className="wiki-toc" aria-label="Contents">
        <div className="wiki-toc-title">Contents</div>
        <ol>
          {toc.map((s, i) => (
            <li key={s.id}>
              <a href={`#${s.id}`}><span className="wiki-toc-num">{i + 1}</span> {s.title}</a>
              {s.children && (
                <ol>
                  {s.children.map((c, j) => (
                    <li key={c.id}><a href={`#${c.id}`}><span className="wiki-toc-num">{i + 1}.{j + 1}</span> {c.title}</a></li>
                  ))}
                </ol>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <h2 id="career">Career</h2>
      {workExperience.map((w) => (
        <section key={w.organization}>
          <h3 id={slug(w.organization)}>{w.organization} <span className="wiki-dates">({roleRange(w)})</span></h3>
          {w.roles ? w.roles.map((r) => (
            <div key={r.title}>
              <h4>{r.title} <span className="wiki-dates">({r.start} - {r.end})</span></h4>
              <ul>{lines(r.description).map((l, i) => <li key={i}>{l}</li>)}</ul>
              {r.links && <p className="wiki-see">See also: {Object.entries(r.links).map(([k, v]) => <a key={k} href={v} target="_blank" rel="noreferrer">{k}</a>)}</p>}
            </div>
          )) : (
            <>
              <p className="wiki-role">{w.title}, {w.location}</p>
              <ul>{lines(w.description).map((l, i) => <li key={i}>{l}</li>)}</ul>
            </>
          )}
        </section>
      ))}

      <h2 id="projects">Projects</h2>
      {realProjects.map((p) => (
        <section key={p.title}>
          <h3 id={slug(p.title)}>{p.title} <span className="wiki-dates">({p.start} - {p.end})</span></h3>
          {p.image && (
            <figure className="wiki-thumb">
              <div className="wiki-thumb-image"><Image src={p.image} alt={p.title} fill sizes="220px" style={{ objectFit: "cover", objectPosition: "top" }} /></div>
              <figcaption>{p.title}</figcaption>
            </figure>
          )}
          <ul>{lines(p.description).map((l, i) => <li key={i}>{l}</li>)}</ul>
          {p.links && <p className="wiki-see">Links: {Object.entries(p.links).map(([k, v]) => <a key={k} href={v} target="_blank" rel="noreferrer">{k}</a>)}</p>}
        </section>
      ))}

      <h2 id="publications">Publications</h2>
      <ol className="wiki-refs">
        {publications.map((pub) => (
          <li key={pub.title}>
            {pub.authors.join(", ")}. <a href={pub.link} target="_blank" rel="noreferrer">&quot;{pub.title}&quot;</a>. <i>{pub.conference}</i>.
          </li>
        ))}
      </ol>

      <h2 id="awards">Awards</h2>
      <table className="wiki-table">
        <thead><tr><th>Year</th><th>Award</th><th>Organization</th></tr></thead>
        <tbody>
          {awards.map((a, i) => (
            <tr key={i}>
              <td>{a.date}</td>
              <td>{a.link ? <a href={a.link} target="_blank" rel="noreferrer">{a.position}</a> : a.position}</td>
              <td>{a.title}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 id="education">Education</h2>
      {educations.map((e) => (
        <p key={e.university}>
          {e.degree} in {e.major}, {e.url ? <a href={e.url} target="_blank" rel="noreferrer">{e.university}</a> : e.university} ({e.start} - {e.end}). {e.gpa && `GPA ${e.gpa}.`} {e.description && `${e.description}.`}
        </p>
      ))}

      <h2 id="external-links">External links</h2>
      <ul>
        {Object.entries(links).map(([k, v]) => (
          <li key={k}><a className="wiki-external" href={v} target="_blank" rel="noreferrer">{k}</a></li>
        ))}
        <li><a className="wiki-external" href="/resume.pdf" target="_blank" rel="noreferrer">Résumé (PDF)</a></li>
      </ul>
    </div>
  );
}
