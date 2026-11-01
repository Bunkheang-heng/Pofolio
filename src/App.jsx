import { useScrollStory } from "./hooks/useScrollStory";
import {
  featuredProjects,
  githubStats,
  moreProjects,
  transformModes,
} from "./data/githubProjects";

const heroSkills = [
  "React / Next.js",
  "Nest.js / Express",
  "Python / Flask",
  "Firebase / Cloud",
  "EA / Algo",
  "Quantitative",
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
      "Positive Parenting platform — ReactJS + Firebase.",
      "Messenger chatbot — Python + Flask.",
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

const awards = [
  "WRO Future Engineer 2025 — Top 1",
  "Cybersecurity CTF 2024 — Top 2",
  "Clean Energy Hackathon 2023 — Top 3",
  "Turing Hackathon 2023 — Top 5",
  "Novathon 2023 — Top 5",
];

const icon = (slug) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}/${slug}-original.svg`;

const techStack = [
  { name: "JavaScript", src: icon("javascript") },
  { name: "React", src: icon("react") },
  { name: "Next.js", src: icon("nextjs"), invert: true },
  { name: "NestJS", src: icon("nestjs") },
  { name: "Express", src: icon("express"), invert: true },
  { name: "Python", src: icon("python") },
  { name: "Flask", src: icon("flask"), invert: true },
  { name: "Firebase", src: icon("firebase") },
  { name: "Postgres", src: icon("postgresql") },
  { name: "MongoDB", src: icon("mongodb") },
  { name: "Docker", src: icon("docker") },
  {
    name: "AWS",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original.svg",
  },
  { name: "GCP", src: icon("googlecloud") },
  {
    name: "AI",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg",
  },
];

const tradingFocus = [
  {
    title: "Technical analysis",
    copy: "POI, FVG, structure — AUPP Trading Club teaching decks.",
  },
  {
    title: "Risk management",
    copy: "Position sizing and capital preservation frameworks.",
  },
  {
    title: "SuperFx Agent",
    copy: "Multi-agent forex analysis before MT5 execution.",
  },
  {
    title: "Ben10-Fx vault",
    copy: "Books, indicators, EAs, and trade tickets in one place.",
  },
  {
    title: "turtle_quant",
    copy: "Plain-language ideas → rules + cost-aware backtests.",
  },
  {
    title: "Psychology",
    copy: "Rules, journaling, and disciplined review.",
  },
];

function DnaCard({ project }) {
  return (
    <a
      className="dna-card"
      href={project.url}
      target="_blank"
      rel="noreferrer"
    >
      <div className="dna-meta">
        <span className="dna-code">{project.code}</span>
        <span className={`dna-tag tag-${project.tag.toLowerCase()}`}>
          {project.tag}
        </span>
      </div>
      <strong>{project.name}</strong>
      <p>{project.detail}</p>
      <span className="dna-strand" aria-hidden="true" />
    </a>
  );
}

function onPanelTilt(event) {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;
  card.style.setProperty("--tilt-x", `${(-y * 6).toFixed(2)}deg`);
  card.style.setProperty("--tilt-y", `${(x * 6).toFixed(2)}deg`);
}

function resetPanelTilt(event) {
  event.currentTarget.style.setProperty("--tilt-x", "0deg");
  event.currentTarget.style.setProperty("--tilt-y", "0deg");
}

export default function App() {
  const {
    storyRef,
    heroFlanksRef,
    portraitRef,
    sideEngineeringRef,
    sideTradingRef,
    modeLabelRef,
    introRef,
    eduRef,
    xpRef,
    projectsRef,
    githubRef,
    awardsRef,
    tradingRef,
    finalLineRef,
    progressBarRef,
    activeKey,
    progressPct,
    jumpTo,
  } = useScrollStory();

  return (
    <main className="scroll-story" ref={storyRef}>
      <div className="story-stage">
        <div className="aurora" aria-hidden="true" />
        <div className="hex-grid" aria-hidden="true" />
        <div className="pointer-glow" aria-hidden="true" />
        <div className="scanlines" aria-hidden="true" />
        <div className="energy-orbs" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="vignette" aria-hidden="true" />
        <div className="scan-flash" aria-hidden="true" />

        <div className="side-panels" aria-hidden="true">
          <div className="side-panel side-engineering" ref={sideEngineeringRef}>
            <img src="/images/bg-engineering.jpg" alt="" />
          </div>
          <div className="side-panel side-trading" ref={sideTradingRef}>
            <img src="/images/bg-trading.jpg" alt="" />
          </div>
        </div>

        <div className="hud-corners" aria-hidden="true">
          <span className="hud-c tl" />
          <span className="hud-c tr" />
          <span className="hud-c bl" />
          <span className="hud-c br" />
        </div>

        <header className="top-bar">
          <p className="corner-mark">
            <span className="omni-dot" aria-hidden="true" />
            Omnitrix / Portfolio
          </p>
          <div className="mode-badge">
            <span className="mode-pulse" aria-hidden="true" />
            <p className="corner-mark corner-right" ref={modeLabelRef}>
              Hero Mode
            </p>
            <span className="mode-pct">{progressPct}%</span>
          </div>
        </header>

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
            <p className="tagline">Engineer by day. Trader by edge.</p>
            <p className="age-line">
              <span>Age</span> 23
            </p>
            <p className="identity-location">Phnom Penh, Cambodia</p>
            <p className="scroll-prompt identity-prompt">
              <span className="prompt-glow">Scroll or tap a mode</span> ↓
            </p>
          </div>

          <aside className="skills" aria-label="Skills">
            <p className="skills-kicker">Focus</p>
            <ul className="skills-list">
              {heroSkills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="portrait-frame" ref={portraitRef}>
          <div className="omni-dial" aria-hidden="true">
            <div className="omni-dial-ring" />
            <div className="omni-dial-ring outer" />
            <div className="omni-face">
              <div className="omni-hourglass" />
            </div>
          </div>
          <div className="portrait-rings" aria-hidden="true">
            <span className="ring ring-outer" />
            <span className="ring ring-mid" />
            <span className="ring ring-core" />
          </div>
          <img
            src="/images/me.png"
            alt="Bun Kheang Heng in graduation attire"
          />
          <div className="portrait-glow" aria-hidden="true" />
        </div>

        <div className="phase" ref={introRef} aria-label="Software intro">
          <aside
            className="phase-col phase-left"
            onMouseMove={onPanelTilt}
            onMouseLeave={resetPanelTilt}
          >
            <p className="panel-number">01 / Software</p>
            <h2>
              Software
              <br />
              <em>engineer.</em>
            </h2>
            <p className="panel-copy">
              Building products with React, Python, cloud, and AI — from
              platforms to cybersecurity tools.
            </p>
          </aside>
          <aside
            className="phase-col phase-right phase-col-lite"
            onMouseMove={onPanelTilt}
            onMouseLeave={resetPanelTilt}
          >
            <p className="section-label first">What I do</p>
            <ul className="bullet-list">
              <li>Full-stack web apps</li>
              <li>AI-assisted products</li>
              <li>Cloud & Firebase backends</li>
              <li>Security-minded builds</li>
            </ul>
          </aside>
        </div>

        <div className="phase" ref={eduRef} aria-label="Education">
          <aside
            className="phase-col phase-left"
            onMouseMove={onPanelTilt}
            onMouseLeave={resetPanelTilt}
          >
            <p className="panel-number">02 / Education</p>
            <h2>
              Dual
              <br />
              <em>degrees.</em>
            </h2>
            <p className="panel-copy">
              Computer Science and IT Management through FHSU and AUPP.
            </p>
          </aside>
          <aside
            className="phase-col phase-right"
            onMouseMove={onPanelTilt}
            onMouseLeave={resetPanelTilt}
          >
            <p className="section-label first">Schools</p>
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
          </aside>
        </div>

        <div className="phase" ref={xpRef} aria-label="Experience">
          <aside
            className="phase-col phase-left"
            onMouseMove={onPanelTilt}
            onMouseLeave={resetPanelTilt}
          >
            <p className="panel-number">03 / Experience</p>
            <h2>
              Real
              <br />
              <em>work.</em>
            </h2>
            <p className="panel-copy">
              Shipping platforms and security tools with real users and impact.
            </p>
          </aside>
          <aside
            className="phase-col phase-right"
            onMouseMove={onPanelTilt}
            onMouseLeave={resetPanelTilt}
          >
            <p className="section-label first">Roles</p>
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
        </div>

        <div className="phase" ref={projectsRef} aria-label="Projects">
          <aside
            className="phase-col phase-left"
            onMouseMove={onPanelTilt}
            onMouseLeave={resetPanelTilt}
          >
            <p className="panel-number">04 / Projects</p>
            <h2>
              DNA
              <br />
              <em>unlocked.</em>
            </h2>
            <p className="panel-copy">
              Selected builds from my public GitHub — each one a transformation
              sample.
            </p>
            <div className="stat-row">
              <div className="stat">
                <strong>{githubStats.public}</strong>
                <span>Public repos</span>
              </div>
              <div className="stat">
                <strong>{githubStats.total}</strong>
                <span>Total repos</span>
              </div>
            </div>
            <a
              className="gh-link"
              href={githubStats.profile}
              target="_blank"
              rel="noreferrer"
            >
              github.com/Bunkheang-heng ↗
            </a>
          </aside>
          <aside
            className="phase-col phase-right"
            onMouseMove={onPanelTilt}
            onMouseLeave={resetPanelTilt}
          >
            <p className="section-label first">Featured samples</p>
            <div className="dna-grid">
              {featuredProjects.map((project) => (
                <DnaCard key={project.name} project={project} />
              ))}
            </div>
          </aside>
        </div>

        <div className="phase" ref={githubRef} aria-label="GitHub lab">
          <aside
            className="phase-col phase-left"
            onMouseMove={onPanelTilt}
            onMouseLeave={resetPanelTilt}
          >
            <p className="panel-number">05 / GitHub</p>
            <h2>
              Open
              <br />
              <em>lab.</em>
            </h2>
            <p className="panel-copy">
              More public work from my inventory — trading tools, agents,
              Flutter apps, and club teaching decks. As of {githubStats.asOf}.
            </p>
          </aside>
          <aside
            className="phase-col phase-right"
            onMouseMove={onPanelTilt}
            onMouseLeave={resetPanelTilt}
          >
            <p className="section-label first">Also shipping</p>
            <div className="dna-grid">
              {moreProjects.map((project) => (
                <DnaCard key={project.name} project={project} />
              ))}
            </div>
          </aside>
        </div>

        <div className="phase" ref={awardsRef} aria-label="Awards and stack">
          <aside
            className="phase-col phase-left"
            onMouseMove={onPanelTilt}
            onMouseLeave={resetPanelTilt}
          >
            <p className="panel-number">06 / Awards</p>
            <h2>
              Wins
              <br />
              <em>& stack.</em>
            </h2>
            <ul className="award-list roomy">
              {awards.map((award) => (
                <li key={award}>{award}</li>
              ))}
            </ul>
          </aside>
          <aside
            className="phase-col phase-right"
            onMouseMove={onPanelTilt}
            onMouseLeave={resetPanelTilt}
          >
            <p className="section-label first">Tech stack</p>
            <div className="tech-grid">
              {techStack.map((skill) => (
                <article
                  className={`tech-item${skill.invert ? " invert" : ""}`}
                  key={skill.name}
                  title={skill.name}
                >
                  <img src={skill.src} alt="" />
                  <span>{skill.name}</span>
                </article>
              ))}
            </div>
          </aside>
        </div>

        <div className="phase" ref={tradingRef} aria-label="Trading">
          <aside
            className="phase-col phase-left"
            onMouseMove={onPanelTilt}
            onMouseLeave={resetPanelTilt}
          >
            <p className="panel-number">07 / Markets</p>
            <h2>
              Trading
              <br />
              <em>with intention.</em>
            </h2>
            <p className="panel-copy">
              Patience and structure — price action, risk control, and systems
              that execute with discipline.
            </p>
          </aside>
          <aside
            className="phase-col phase-right"
            onMouseMove={onPanelTilt}
            onMouseLeave={resetPanelTilt}
          >
            <p className="section-label first">Focus areas</p>
            <div className="focus-grid">
              {tradingFocus.map((item) => (
                <article className="focus-item" key={item.title}>
                  <strong>{item.title}</strong>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </aside>
        </div>

        <div className="final-block" ref={finalLineRef}>
          <p className="final-kicker">Transformation complete</p>
          <p className="final-line">It’s hero time.</p>
          <div className="final-links">
            <a href="mailto:bunkheangheng99@gmail.com">
              bunkheangheng99@gmail.com
            </a>
            <a href="tel:+855973556059">097-355-6059</a>
            <a href={githubStats.profile} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          </div>
        </div>

        <nav className="transform-dial" aria-label="Transform modes">
          <p className="dial-label">Modes</p>
          <div className="dial-track">
            {transformModes.map((mode) => (
              <button
                key={mode.key}
                type="button"
                className={`dial-btn${activeKey === mode.key ? " is-active" : ""}`}
                onClick={() => jumpTo(mode.key)}
                title={mode.label}
              >
                <span className="dial-code">{mode.code}</span>
                <span className="dial-name">{mode.label}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="progress-wrap" aria-hidden="true">
          <div className="progress">
            <span ref={progressBarRef} />
          </div>
          <p className="progress-label">Transformation {progressPct}%</p>
        </div>
      </div>
    </main>
  );
}
