import { useScrollStory } from "./hooks/useScrollStory";

const heroSkills = [
  "React / Next.js",
  "Nest.js / Express",
  "Python / Flask",
  "Firebase / SQL",
  "Docker / AWS",
  "EA developer",
  "Algo trader",
  "Quantitative trader",
];

const techStack = [
  "JavaScript",
  "React",
  "Next.js",
  "Nest.js",
  "Express.js",
  "Python",
  "Flask",
  "Firebase",
  "Postgres",
  "MongoDB",
  "Tailwind CSS",
  "Docker",
  "AWS",
  "Google Cloud",
  "AI Integration",
];

const tradingSkills = [
  "Technical analysis",
  "Risk management",
  "Trading psychology",
  "EA developer",
  "Algo trader",
  "Quantitative trader",
];

const schools = [
  {
    logo: "/images/mark-fhsu.png",
    short: "FHSU",
    name: "Fort Hays State University",
    degree: "Bachelor of Computer Science",
    note: "Partnership with AUPP",
  },
  {
    logo: "/images/mark-aupp.png",
    short: "AUPP",
    name: "American University of Phnom Penh",
    degree: "Bachelor of IT Management",
    note: "Phnom Penh, Cambodia",
  },
];

const experiences = [
  {
    role: "Developer",
    org: "Save the Children Cambodia",
    time: "Jan 2024",
    points: [
      "Built Positive Parenting platform with ReactJS and Firebase.",
      "Built Messenger chatbot with Python and Flask.",
    ],
  },
  {
    role: "Cybersecurity Program",
    org: "ASEAN Cyber Shield",
    time: "2024–2025",
    points: [
      "ML phishing detection with VirusTotal APIs.",
      "Selected 14/300 for Korea cybersecurity bootcamp.",
    ],
  },
];

const projects = [
  { name: "QuickResume", detail: "AI resume builder — Next.js + Firebase." },
  { name: "STEMii", detail: "STEM platform with AI self-assessment." },
  { name: "SakRean", detail: "Major/career matching for high school students." },
  { name: "Phishing Detection", detail: "Flask + ML/NLP email phishing blocker." },
  { name: "Bunkheang BOT", detail: "Gemini Telegram AI assistant about me." },
];

const awards = [
  "WRO Future Engineer 2025 — Top 1",
  "Cybersecurity CTF 2024 — Top 2",
  "Clean Energy Hackathon 2023 — Top 3",
  "Turing Hackathon 2023 — Top 5",
  "Novathon 2023 — Top 5",
];

export default function App() {
  const {
    storyRef,
    heroFlanksRef,
    portraitRef,
    sideEngineeringRef,
    sideTradingRef,
    softwarePhaseRef,
    tradingPhaseRef,
    finalLineRef,
    progressBarRef,
  } = useScrollStory();

  return (
    <main className="scroll-story" ref={storyRef}>
      <div className="story-stage">
        <div className="hex-grid" aria-hidden="true" />
        <div className="noise" aria-hidden="true" />

        <div className="side-panels" aria-hidden="true">
          <div className="side-panel side-engineering" ref={sideEngineeringRef}>
            <img src="/images/bg-engineering.jpg" alt="" />
          </div>
          <div className="side-panel side-trading" ref={sideTradingRef}>
            <img src="/images/bg-trading.jpg" alt="" />
          </div>
        </div>

        <div className="top-bar">
          <p className="corner-mark">
            <span className="omni-dot" aria-hidden="true" />
            Omnitrix / Portfolio
          </p>
          <p className="corner-mark corner-right">Hero Mode</p>
        </div>

        <div className="hero-flanks" ref={heroFlanksRef}>
          <div className="identity">
            <p className="eyebrow">
              <span aria-hidden="true" /> Hello, I’m
            </p>
            <h1>
              Bun Kheang
              <br />
              <em>Heng.</em>
            </h1>
            <p className="age-line">
              <span>Age</span> 23
            </p>
            <p className="identity-location">Phnom Penh, Cambodia</p>
            <p className="scroll-prompt identity-prompt">Activate scroll ↓</p>
          </div>

          <aside className="skills" aria-label="Skills">
            <p className="skills-kicker">Skills</p>
            <ul className="skills-list">
              {heroSkills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="portrait-frame" ref={portraitRef}>
          <img src="/images/me.png" alt="Bun Kheang Heng in graduation attire" />
        </div>

        {/* Phase 1: all software info around the image */}
        <div
          className="phase phase-software"
          ref={softwarePhaseRef}
          aria-label="Software engineering"
        >
          <aside className="phase-col phase-left">
            <p className="panel-number">01 / Software</p>
            <p className="panel-kicker">Builder side</p>
            <h2>
              Software
              <br />
              <em>engineer.</em>
            </h2>
            <p className="panel-copy">
              Dual degrees in Computer Science and IT Management. Building
              products with React, Python, cloud, and AI.
            </p>

            <p className="section-label">Education</p>
            <div className="edu-grid">
              {schools.map((school) => (
                <article className="edu-card" key={school.name}>
                  <div className="edu-badge" aria-hidden="true">
                    <img src={school.logo} alt="" />
                  </div>
                  <div className="edu-copy">
                    <p className="edu-short">{school.short}</p>
                    <h3>{school.name}</h3>
                    <p className="edu-degree">{school.degree}</p>
                    <p className="edu-note">{school.note}</p>
                  </div>
                </article>
              ))}
            </div>

            <p className="section-label">Experience</p>
            <div className="xp-list">
              {experiences.map((item) => (
                <article className="xp-item" key={item.org}>
                  <div className="xp-head">
                    <strong>{item.role}</strong>
                    <span>{item.time}</span>
                  </div>
                  <p className="xp-org">{item.org}</p>
                  <ul className="xp-points">
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </aside>

          <aside className="phase-col phase-right">
            <p className="section-label first">Projects</p>
            <div className="project-list">
              {projects.map((project) => (
                <article className="project-item" key={project.name}>
                  <strong>{project.name}</strong>
                  <p>{project.detail}</p>
                </article>
              ))}
            </div>

            <p className="section-label">Awards</p>
            <ul className="award-list">
              {awards.map((award) => (
                <li key={award}>{award}</li>
              ))}
            </ul>

            <p className="section-label">Tech stack</p>
            <div className="chip-grid tight">
              {techStack.map((skill) => (
                <span className="chip" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </aside>
        </div>

        {/* Phase 2: trading info around the image */}
        <div
          className="phase phase-trading"
          ref={tradingPhaseRef}
          aria-label="Trading"
        >
          <aside className="phase-col phase-left">
            <p className="panel-number">02 / Markets</p>
            <p className="panel-kicker">Market side</p>
            <h2>
              Trading
              <br />
              <em>with intention.</em>
            </h2>
            <p className="panel-copy">
              Patience and structure — studying price action, managing risk, and
              building consistency over time.
            </p>
          </aside>

          <aside className="phase-col phase-right">
            <p className="section-label first">Focus areas</p>
            <div className="chip-grid tight big-chips">
              {tradingSkills.map((skill) => (
                <span className="chip" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </aside>
        </div>

        <p className="final-line" ref={finalLineRef}>
          It’s hero time.
        </p>
        <div className="progress" aria-hidden="true">
          <span ref={progressBarRef} />
        </div>
      </div>
    </main>
  );
}
