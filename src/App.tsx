import { useEffect, useMemo, useState } from "react";
import { awards, experiences, profile, projects, skills } from "./data";
import profilePhoto from "./assets/photo.jpg";

const navItems = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certifications" },
  { id: "awards", label: "Awards" },
  { id: "contact", label: "Contact" }
];

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function renderTimelineIcon(type: string) {
  switch (type) {
    case "globe":
      return (
        <svg viewBox="0 0 512 512" aria-hidden="true">
          <path
            d="M256 32C132.3 32 32 132.3 32 256s100.3 224 224 224 224-100.3 224-224S379.7 32 256 32Zm0 48a176 176 0 0 1 168 128H88A176 176 0 0 1 256 80Zm0 352a176 176 0 0 1-168-128h336a176 176 0 0 1-168 128Z"
            fill="currentColor"
          />
        </svg>
      );
    case "education":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3Zm-6.5 9.5V16c0 2.76 3.13 5 7 5s7-2.24 7-5v-3.5l-7 3.82-7-3.82Z"
            fill="currentColor"
          />
        </svg>
      );
    case "ai":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 4a3 3 0 0 1 3 3h2a5 5 0 0 0-10 0h2a3 3 0 0 1 3-3Zm-6 7a4 4 0 0 0 3.5 3.97V17a3 3 0 0 0 6 0v-2.03A4 4 0 1 0 6 11Z"
            fill="currentColor"
          />
        </svg>
      );
    case "cloud":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M7 18h10a4 4 0 0 0 0-8h-1.26A6 6 0 0 0 4 11.5 4.5 4.5 0 0 0 7 18Z"
            fill="currentColor"
          />
        </svg>
      );
    case "aws":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M5 6h14v2H5V6Zm0 5h14v2H5v-2Zm0 5h10v2H5v-2Z"
            fill="currentColor"
          />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M7 4h10a2 2 0 0 1 2 2v12H5V6a2 2 0 0 1 2-2Z"
            fill="currentColor"
          />
        </svg>
      );
  }
}

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [typedSubtitle, setTypedSubtitle] = useState("");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const fullSubtitle = useMemo(
    () => (profile.subtitle ? `${profile.title} · ${profile.subtitle}` : profile.title),
    []
  );

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setTypedSubtitle(fullSubtitle.slice(0, index));
      if (index >= fullSubtitle.length) {
        clearInterval(interval);
      }
    }, 45);
    return () => clearInterval(interval);
  }, [fullSubtitle]);

  return (
    <div className="page">
      <header className="navbar">
        <nav className="nav-links">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              {item.label}
            </a>
          ))}
        </nav>
        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          aria-label="Toggle light and dark mode"
        >
          {theme === "light" ? "Dark" : "Light"}
        </button>
      </header>

      <main>
        <section id="about" className="section hero reveal">
          <div className="hero-left">
            <div className="avatar">
              <img src={profilePhoto} alt="Vincent Chen" />
            </div>
            <div className="hero-text">
              <p className="eyebrow">{profile.tagline}</p>
              <h1>{profile.name}</h1>
              <p className="subhead typewriter" aria-label={fullSubtitle}>
                {typedSubtitle}
              </p>
            </div>
          </div>
        </section>

        <section id="projects" className="section reveal">
          <div className="section-head">
            <h2>Projects</h2>
          </div>
          <div className="card-grid">
            {projects.map((project) => (
              <article key={project.title} className="card">
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tag-row">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="card-links">
                  <a href={project.githubUrl} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="section reveal">
          <div className="section-head">
            <h2>Skills</h2>
          </div>
          <div className="skills-grid">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group} className="skill-group">
                <h3>{group}</h3>
                <div className="skill-items">
                  {items.map((item) => (
                    <div key={item.label} className="skill-item">
                      <img src={item.icon} alt="" loading="lazy" />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="certifications" className="section reveal">
          <div className="section-head">
            <h2>Certifications</h2>
          </div>
          <div className="cert-grid">
            {profile.certifications.map((cert) => (
              <article key={cert.name} className="cert-card">
                <div className="cert-header">
                  <img src={cert.icon} alt="" loading="lazy" />
                  <h3>{cert.name}</h3>
                </div>
                <p>{cert.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="section reveal">
          <div className="section-head">
            <h2>Experience</h2>
          </div>
          <div className="timeline-grid">
            {experiences.map((item) => (
              <article key={item.title} className="timeline-card">
                <div className="timeline-date-col">{item.period}</div>
                <div className="timeline-icon">{renderTimelineIcon(item.type)}</div>
                <div className="timeline-content">
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-org">{item.org}</p>
                  <div className="timeline-meta">
                    <LocationIcon />
                    <span>{item.location}</span>
                  </div>
                  <p className="timeline-summary">{item.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="awards" className="section reveal">
          <div className="section-head">
            <h2>Awards</h2>
          </div>
          <div className="card-grid">
            {awards.map((award) => (
              <article key={award.title} className="card">
                <div>
                  <h3>{award.title}</h3>
                  <p>{award.summary}</p>
                </div>
                <div className="timeline-date">{award.date}</div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section reveal">
          <div className="section-head">
            <h2>Contact</h2>
          </div>
          <div className="contact-grid">
            <div className="contact-info">
              <div>
                <span>Email</span>
                <a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a>
              </div>
              <div>
                <span>GitHub</span>
                <a href={profile.contact.githubUrl} target="_blank" rel="noreferrer">
                  {profile.contact.githubLabel}
                </a>
              </div>
              <div>
                <span>LinkedIn</span>
                <a href={profile.contact.linkedinUrl} target="_blank" rel="noreferrer">
                  {profile.contact.linkedinLabel}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}

export default App;
