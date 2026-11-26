import { useState } from "react";
import Ask from "./Ask";
import WorldSwitch from "./components/WorldSwitch";
import ChatHeroSection from "./components/ChatHeroSection";
import SanSomSimulator from "./components/SanSomSimulator";
import ReeltimeDemo from "./components/ReeltimeDemo";
import PhishingScanner from "./components/PhishingScanner";
import {
  featuredProjects,
  githubStats,
  moreProjects,
} from "./data/githubProjects";
import { certificateCategories, certificateImage, certificates, resumeUrl } from "./data/certificates";

const schools = [
  {
    logo: "/images/mark-fhsu.png",
    short: "FHSU",
    name: "Fort Hays State University",
    degree: "B.S. Computer Science",
    note: "Partnership with AUPP",
  },
  {
    logo: "/images/mark-aupp.png",
    short: "AUPP",
    name: "American University of Phnom Penh",
    degree: "B.S. IT Management",
    note: "Phnom Penh",
  },
];

const experiences = [
  {
    role: "Developer",
    org: "Save the Children Cambodia",
    time: "Jan 2024",
    points: ["Positive Parenting — React + Firebase", "Messenger chatbot — Python + Flask"],
  },
  {
    role: "Cybersecurity",
    org: "ASEAN Cyber Shield",
    time: "2024–2025",
    points: ["ML phishing detection + VirusTotal", "Selected 14 of 300 for Korea"],
  },
  {
    role: "Freelance Engineer",
    org: "SanSom",
    time: "Freelance · 2024",
    points: ["Loan Management System — automated repayment & interest calculation engine", "Client tracking, role-based access & administrative financial dashboard"],
  },
  {
    role: "Freelance Full-Stack & Mobile",
    org: "REELTIME Media",
    time: "Freelance · 2024",
    points: ["Movie discovery web platform & cross-platform mobile application", "Media catalog, watchlist synchronization & video playback streaming"],
  },
];

const awards = [
  "WRO Future Engineer 2025",
  "Cybersecurity CTF 2024",
  "Clean Energy Hackathon 2023",
  "Turing Hackathon 2023",
  "Novathon 2023",
];

const stack = ["React", "Next", "Nest", "Python", "Flask", "Firebase", "AWS", "AI"];

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

function Star({ className = "" }) {
  return <svg className={className} viewBox="0 0 100 100" fill="currentColor" aria-hidden="true"><path d="m50 0 9 31L85 15 69 41l31 9-31 9 16 26-26-16-9 31-9-31-26 16 16-26L0 50l31-9-16-26 26 16Z" /></svg>;
}

function ResumeLink({ className = "" }) {
  return <a className={`button ${className}`} href={resumeUrl} download="Bun-Kheang-Heng-Resume.pdf">Download resume<span aria-hidden="true">↓</span></a>;
}

function RecruiterDossierBtn({ className = "" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `CANDIDATE DOSSIER: HENG BUNKHEANG
Role: Full-Stack Product Developer · AI Systems · Cybersecurity Explorer
Location: Phnom Penh, Cambodia (Open to Remote / Relocation)
Email: bunkheangheng99@gmail.com | Phone: +855 097-355-6059

ACADEMICS & HONORS:
• Dual B.S. Degrees: Fort Hays State University (CS) & American University of Phnom Penh (ITM)
• ASEAN Cyber Shield 2024 Researcher (Selected Top 14 of 300 across ASEAN for Korea)

CORE PRODUCTION SYSTEMS:
1. SanSom: Microfinance Automated Loan & Interest Calculation Engine
2. REELTIME Media: Cross-Platform Movie Streaming & Watchlist Sync Platform
3. Save the Children Cambodia: Positive Parenting Portal & Automated Chatbot
4. SuperFx / Ben10-Fx: Algorithmic MQL5 Expert Advisors & Quantitative Trading Vault

PORTFOLIO LINKS:
• Interactive Portfolio: ${typeof window !== "undefined" ? window.location.origin : "https://bunkheang.dev"}
• Interactive Resume: ${typeof window !== "undefined" ? window.location.origin + "/resume/" : "https://bunkheang.dev/resume/"}
• GitHub: https://github.com/Bunkheang-heng (77 public repositories)`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <button
      type="button"
      className={`recruiter-packet-btn ${className} ${copied ? "is-copied" : ""}`}
      onClick={handleCopy}
      title="Copy recruiter-ready candidate summary to clipboard"
    >
      <span>{copied ? "Dossier Copied! Ready to Forward ✓" : "📋 1-Click Recruiter Packet"}</span>
    </button>
  );
}

function ProjectArtwork({ index }) {
  const symbols = ["§", "▶", "Aa", "↗", "✳", "</>", "✦", "ច"];
  return <div className={`project-art art-${index % 8}`} aria-hidden="true"><span className="art-orbit" /><span className="art-window"><span className="art-window-bar">● ● ●</span><span className="art-symbol">{symbols[index % symbols.length]}</span></span><Star className="art-star" /><span className="art-cursor">↖</span></div>;
}

function ProjectCard({ project, index }) {
  const [showDemo, setShowDemo] = useState(false);
  const isSanSom = project.name === "SanSom";
  const isReeltime = project.name === "REELTIME Media";
  const isPhishing = project.name === "Phishing Detection";
  const hasInteractiveDemo = isSanSom || isReeltime || isPhishing;

  return (
    <div className={`project-card-container ${hasInteractiveDemo ? "has-demo" : ""}`}>
      <a className="project-card" href={project.url} target="_blank" rel="noreferrer">
        <ProjectArtwork index={index} />
        <div className="project-card-body">
          <span className="tag">{project.tag}</span>
          <h3>{project.name}<Arrow diagonal /></h3>
          <p>{project.detail}</p>
          <span className="project-card-footer">Explore project <Arrow /></span>
        </div>
      </a>
      {hasInteractiveDemo && (
        <div className="project-sim-wrapper">
          <button
            type="button"
            className={`sim-toggle-action ${isSanSom ? "sim-toggle-sansom" : isReeltime ? "sim-toggle-reeltime" : "sim-toggle-phishing"}`}
            onClick={(e) => {
              e.preventDefault();
              setShowDemo((prev) => !prev);
            }}
          >
            <span>
              {showDemo
                ? `Hide ${isSanSom ? "Loan Calculator" : isReeltime ? "App Demo" : "Threat Scanner"} −`
                : `⚡ ${isSanSom ? "Try Live Loan Engine Calculator" : isReeltime ? "Open Interactive App Prototype" : "Launch ML Phishing Scanner"} +`}
            </span>
          </button>
          {showDemo && (
            <>
              {isSanSom && <SanSomSimulator />}
              {isReeltime && <ReeltimeDemo />}
              {isPhishing && <PhishingScanner />}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All projects");
  const [certCategory, setCertCategory] = useState("All");
  const [certPage, setCertPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const filters = { "All projects": null, "AI & software": ["AI", "App", "Fin"], Education: ["Edu"], Security: ["Sec"] };
  const projects = featuredProjects.filter((project) => !filters[filter] || filters[filter].includes(project.tag));

  const filteredCertificates = certCategory === "All"
    ? certificates
    : certificates.filter((c) => c.category === certCategory);

  const totalPages = Math.max(1, Math.ceil(filteredCertificates.length / pageSize));
  const currentPage = Math.min(certPage, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredCertificates.length);
  const paginatedCertificates = filteredCertificates.slice(startIndex, endIndex);

  const handleCategoryChange = (cat) => {
    setCertCategory(cat);
    setCertPage(1);
  };

  const handlePageChange = (newPage) => {
    setCertPage(newPage);
    const anchor = document.getElementById("certificate-toolbar-anchor");
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <WorldSwitch world="software" />
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Bun Kheang Heng home">bunkheang<span>✳</span></a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Close −" : "Menu +"}</button>
        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} id="main-nav" aria-label="Main navigation">
          {[
            ["Ask AI", "#chat"],
            ["Projects", "#projects"],
            ["About", "#about"],
            ["Experience", "#experience"],
            ["Resume", "/resume/"],
            ["Credentials", "#credentials"],
          ].map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>Let’s talk <Arrow diagonal /></a>
        </nav>
      </header>
      <main id="main">
        {/* INTERACTIVE CHAT UI ABOVE HERO */}
        <ChatHeroSection />

        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> Software engineer. Always curious.</p>
            <h1 id="hero-title">Ideas into<br />real things.</h1>
            <p className="hero-intro">Hey, I’m Bun Kheang Heng. I build useful software, explore AI, and turn curious ideas into working products. Made with curiosity, from Phnom Penh.</p>
            <div className="hero-credentials-strip" aria-label="Key qualifications and roles">
              <span className="hero-cred-pill">Dual Degree FHSU &amp; AUPP</span>
              <span className="hero-cred-pill">ASEAN Cyber Shield 2024</span>
              <span className="hero-cred-pill">Full-Stack &amp; Freelance Systems</span>
              <span className="hero-cred-pill">Algorithmic Trading &amp; EAs</span>
            </div>
            <div className="hero-actions">
              <a className="button button-dark" href="#projects">Explore my work <Arrow /></a>
              <a className="button button-outline" href="/resume/">View Resume <Arrow diagonal /></a>
              <a className="button button-outline" href={resumeUrl} download="Bun-Kheang-Heng-Resume.pdf">PDF ↓</a>
              <RecruiterDossierBtn />
            </div>
            <a className="hero-footnote" href={githubStats.profile} target="_blank" rel="noreferrer"><span className="tiny-code" aria-hidden="true">&lt;/&gt;</span> {githubStats.public} public repos. Plenty of ideas. <Arrow diagonal /></a>
            <a className="hero-world-link" href="/trading/">Meet my trading side <Arrow diagonal /></a>
          </div>
          <div className="hero-visual">
            <div className="portrait-orbit" aria-hidden="true" />
            <div className="portrait-frame"><span className="portrait-frame-label"><span>MEET THE BUILDER</span><span aria-hidden="true">● ● ●</span></span><img src="/images/me.png" alt="Bun Kheang Heng in his graduation gown" fetchPriority="high" /><span className="portrait-caption">Bun Kheang Heng <span>Phnom Penh, Cambodia ↗</span></span></div>
            <span className="hello-sticker">Hello,<br />world!</span><Star className="hero-star" /><span className="code-sticker" aria-hidden="true">&lt;/&gt;</span><span className="visual-note">a little code. a lot of curiosity.</span>
          </div>
        </section>
        <div className="stack-strip" aria-label="Technology stack">{stack.map((tech) => <span key={tech}>{tech}<span aria-hidden="true">✳</span></span>)}</div>
        <section className="projects-section section-pad" id="projects" aria-labelledby="projects-title">
          <div className="section-heading"><div><p className="eyebrow">A few things I’ve put into the world</p><h2 id="projects-title">Small ideas.<br />Real-world builds.</h2></div><a className="text-link" href={githubStats.profile} target="_blank" rel="noreferrer">All work on GitHub <Arrow diagonal /></a></div>
          <div className="filters" aria-label="Filter projects">{Object.keys(filters).map((label) => <button key={label} className={`filter ${filter === label ? "active" : ""}`} type="button" aria-pressed={filter === label} onClick={() => setFilter(label)}>{label}</button>)}</div>
          <div className="project-grid">{projects.map((project) => <ProjectCard key={project.name} project={project} index={featuredProjects.indexOf(project)} />)}</div>
        </section>
        <section className="about-section" id="about" aria-labelledby="about-title">
          <div className="about-copy section-pad"><p className="eyebrow">The person behind the projects</p><h2 id="about-title">Code first.<br />Keep learning.</h2><p>I’m a software engineer based in Phnom Penh. My work brings together full-stack products, cybersecurity, and AI.</p><p>From an idea to a working product, I like figuring things out, building something useful, and getting a little better with every project.</p><a href="#experience" className="text-link">A look at my journey <Arrow /></a><Star className="about-star" /></div>
          <div className="education-panel"><p className="eyebrow">Two degrees. More possibilities.</p>{schools.map((school) => <article className="school" key={school.short}><div className="school-logo"><img src={school.logo} alt="" loading="lazy" /></div><div><span className="school-short">{school.short}</span><h3>{school.name}</h3><p>{school.degree}</p><span className="school-note">{school.note}</span></div></article>)}<div className="education-note"><span aria-hidden="true">↗</span><p>Different perspectives.<br />One curious mind.</p></div></div>
        </section>
        <section className="experience-section section-pad" id="experience" aria-labelledby="experience-title">
          <div className="section-heading"><div><p className="eyebrow">Learning by doing</p><h2 id="experience-title">Out in the<br />real world.</h2></div><p className="heading-note">Building with people.<br />Solving meaningful problems.</p></div>
          <div className="experience-list">{experiences.map((item, index) => <article className="experience-row" key={item.org}><span className="experience-number">0{index + 1}</span><div><span className="eyebrow">{item.role} · {item.time}</span><h3>{item.org}</h3></div><ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul><span className="experience-arrow" aria-hidden="true">↗</span></article>)}</div>
          <div className="awards"><p className="eyebrow">Along the way</p><div>{awards.map((award) => <span className="award" key={award}><span aria-hidden="true">✳</span>{award}</span>)}</div></div>
        </section>
        <section className="lab-section section-pad" id="lab" aria-labelledby="lab-title"><div className="section-heading"><div><p className="eyebrow">Experiments & side quests</p><h2 id="lab-title">Always making<br />something.</h2></div><span className="lab-doodle" aria-hidden="true">✳</span></div><div className="lab-grid">{moreProjects.filter((project) => project.tag !== "Fx").map((project, index) => <a key={project.name} className="lab-card" href={project.url} target="_blank" rel="noreferrer"><span className="lab-number">0{index + 1} / {project.tag}</span><h3>{project.name}<Arrow diagonal /></h3><p>{project.detail}</p></a>)}</div></section>
        {/* RESUME SHOWCASE & REDIRECT SECTION */}
        <section className="resume-section section-pad" id="resume" aria-labelledby="resume-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Curriculum Vitae &amp; Career Record</p>
              <h2 id="resume-title">The Complete<br />Profile.</h2>
              <p className="heading-sub">Full-stack engineering, cybersecurity research at ASEAN Cyber Shield, freelance systems (SanSom &amp; REELTIME Media), and dual-degree academics.</p>
            </div>
            <div className="resume-heading-actions">
              <a className="button button-dark" href="/resume/">
                Open Resume Page <Arrow diagonal />
              </a>
            </div>
          </div>

          <div className="resume-redirect-card">
            <div className="resume-card-topbar">
              <div className="resume-card-status">
                <span className="status-dot" aria-hidden="true" />
                <span>OFFICIAL CURRICULUM VITAE · BUN KHEANG HENG</span>
              </div>
              <span className="resume-card-location">PHNOM PENH, CAMBODIA · OPEN TO REMOTE</span>
            </div>

            <div className="resume-card-content">
              <div className="resume-card-bio">
                <span className="resume-card-role">Full-Stack Engineer &amp; Security Researcher</span>
                <h3>HENG BUNKHEANG</h3>
                <p>
                  Builder with dual bachelor’s degrees in Computer Science and IT Management. Experienced in production web systems (Save the Children, SanSom, REELTIME Media), AI systems, and international cybersecurity competition research.
                </p>

                <div className="resume-highlights-grid">
                  <div className="resume-highlight-item">
                    <span className="highlight-tag">01 / DEGREES</span>
                    <strong>FHSU &amp; AUPP Dual B.S.</strong>
                    <small>CS + IT Management</small>
                  </div>
                  <div className="resume-highlight-item">
                    <span className="highlight-tag">02 / CYBERSECURITY</span>
                    <strong>ASEAN Cyber Shield 2024</strong>
                    <small>Selected Top 14 of 300</small>
                  </div>
                  <div className="resume-highlight-item">
                    <span className="highlight-tag">03 / FREELANCE</span>
                    <strong>SanSom &amp; REELTIME Media</strong>
                    <small>Loan Engine &amp; Media Apps</small>
                  </div>
                  <div className="resume-highlight-item">
                    <span className="highlight-tag">04 / ALGO TRADING</span>
                    <strong>Ben10-Fx &amp; SuperFx</strong>
                    <small>MQL5, Python, MT5 Automation</small>
                  </div>
                </div>
              </div>

              <div className="resume-card-action-box">
                <div className="resume-badge-preview">
                  <span className="preview-label">DEDICATED PAGE</span>
                  <h4>Interactive CV &amp; Document Viewer</h4>
                  <p>Includes complete timeline, skills taxonomy, hackathon awards, leadership experience, and print-ready formatting.</p>
                </div>
                <div className="resume-card-cta-group">
                  <a className="button button-dark resume-main-redirect-btn" href="/resume/">
                    View Full Resume Page <Arrow diagonal />
                  </a>
                  <div className="resume-secondary-btns">
                    <a className="button button-outline" href={resumeUrl} download="Bun-Kheang-Heng-Resume.pdf">
                      Download PDF ↓
                    </a>
                    <RecruiterDossierBtn />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VERIFIED CREDENTIALS SECTION */}
        <section className="credentials-section section-pad" id="credentials" aria-labelledby="credentials-title">
          <div className="section-heading credentials-heading">
            <div>
              <p className="eyebrow">A little proof of the process</p>
              <h2 id="credentials-title">Never done<br />learning.</h2>
              <p className="heading-sub">17 verified credentials across cybersecurity, cloud architecture, AI, software engineering, and project management.</p>
            </div>
            <div className="credentials-heading-actions">
              <a className="button" href={resumeUrl} download="Bun-Kheang-Heng-Resume.pdf">Download Resume PDF <span aria-hidden="true">↓</span></a>
            </div>
          </div>

          {/* Certificate Filter & Summary Toolbar */}
          <div id="certificate-toolbar-anchor" className="cert-anchor" />
          <div className="certificate-toolbar">
            <div className="certificate-filters" role="group" aria-label="Filter certificates by category">
              {certificateCategories.map((cat) => {
                const count = cat === "All" ? certificates.length : certificates.filter((c) => c.category === cat).length;
                return (
                  <button
                    key={cat}
                    type="button"
                    className={`filter ${certCategory === cat ? "active" : ""}`}
                    aria-pressed={certCategory === cat}
                    onClick={() => handleCategoryChange(cat)}
                  >
                    {cat} <span className="filter-count">({count})</span>
                  </button>
                );
              })}
            </div>
            <div className="certificates-tally">
              <span>Showing <strong>{filteredCertificates.length === 0 ? 0 : startIndex + 1}–{endIndex}</strong> of <strong>{filteredCertificates.length}</strong></span>
              {totalPages > 1 && <span className="tally-page-badge">Page {currentPage} of {totalPages}</span>}
            </div>
          </div>

          {/* Paginated Certificates Grid */}
          <div className="certificate-grid certificate-grid-all">
            {paginatedCertificates.map((cert) => (
              <a
                className="certificate-card"
                key={cert.file}
                href={`/certificate/${encodeURIComponent(cert.file)}`}
                target="_blank"
                rel="noreferrer"
              >
                <div className="certificate-image">
                  <span className="cert-cat-pill">{cert.category}</span>
                  <img src={certificateImage(cert.file)} alt={cert.name} loading="lazy" />
                </div>
                <div className="certificate-card-body">
                  <h3>{cert.name}<Arrow diagonal /></h3>
                  <p>{cert.note}</p>
                  <span className="certificate-card-link">View Certificate <Arrow diagonal /></span>
                </div>
              </a>
            ))}
          </div>

          {/* Certificate Pagination Controls */}
          <div className="certificate-pagination" role="navigation" aria-label="Certificates pagination">
            <div className="pagination-info">
              Showing <strong>{filteredCertificates.length === 0 ? 0 : startIndex + 1}–{endIndex}</strong> of <strong>{filteredCertificates.length}</strong> {filteredCertificates.length === 1 ? "credential" : "credentials"}
              {filteredCertificates.length > 0 && <span className="pagination-sub-info"> (Page {currentPage} of {totalPages})</span>}
            </div>

            {totalPages > 1 && (
              <div className="pagination-controls">
                <button
                  type="button"
                  className="pagination-btn pagination-nav"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  aria-label="Previous page"
                >
                  <span aria-hidden="true">←</span> Prev
                </button>

                <div className="pagination-pages" role="group" aria-label="Page numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      type="button"
                      className={`pagination-btn pagination-number ${currentPage === page ? "active" : ""}`}
                      onClick={() => handlePageChange(page)}
                      aria-label={`Go to page ${page}`}
                      aria-current={currentPage === page ? "page" : undefined}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className="pagination-btn pagination-nav"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  aria-label="Next page"
                >
                  Next <span aria-hidden="true">→</span>
                </button>
              </div>
            )}

            <div className="pagination-density" role="group" aria-label="Certificates per page">
              <span className="density-label">Per page:</span>
              {[6, 9, "All"].map((size) => {
                const isActive = (size === "All" && pageSize >= 999) || pageSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    className={`density-pill ${isActive ? "active" : ""}`}
                    onClick={() => {
                      setPageSize(size === "All" ? 999 : size);
                      setCertPage(1);
                    }}
                    aria-pressed={isActive}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
        <section className="world-portal" aria-labelledby="other-world-title">
          <div className="portal-copy">
            <p className="eyebrow">There’s another side to the story</p>
            <h2 id="other-world-title">Same person.<br />A different world.</h2>
            <p>Beyond the code, I study markets, build trading tools, and follow a plan. Step into my trading portfolio.</p>
            <a className="button portal-button" href="/trading/">Enter my trading world <Arrow diagonal /></a>
          </div>
          <div className="portal-art" aria-hidden="true">
            <span className="portal-coordinate">BUN KHEANG HENG / WORLD 02</span>
            <svg viewBox="0 0 360 200" fill="none">
              <path d="M0 50H360M0 100H360M0 150H360M60 0V200M120 0V200M180 0V200M240 0V200M300 0V200" stroke="currentColor" opacity=".16" />
              <path d="m10 170 40-25 25 15 35-55 30 20 25-30 30 15 35-50 30 20 42-40 25 10 28-30" stroke="currentColor" strokeWidth="3" />
              <circle cx="355" cy="20" r="5" fill="currentColor" />
            </svg>
            <span className="portal-art-title">BEN10 / FX <span>↗</span></span>
            <span className="portal-art-note">STRUCTURE. PATIENCE. DISCIPLINE.</span>
          </div>
        </section>
        <section className="contact-section section-pad" id="contact" aria-labelledby="contact-title"><Star className="contact-star" /><p className="eyebrow">Good things start with a conversation</p><h2 id="contact-title">Have an idea?<br />Let’s make it real.</h2><a className="button button-dark" href="mailto:bunkheangheng99@gmail.com">Say hello <Arrow diagonal /></a><a className="contact-email" href="mailto:bunkheangheng99@gmail.com">bunkheangheng99@gmail.com</a></section>
      </main>
      <footer className="site-footer">
        <div className="footer-top">
          <a className="wordmark" href="#home">bunkheang<span>✳</span></a>
          <p>Built with curiosity.<br />From Phnom Penh, Cambodia.</p>
          <div className="footer-links">
            <a href={githubStats.profile} target="_blank" rel="noreferrer">GitHub <Arrow diagonal /></a>
            <a href="mailto:bunkheangheng99@gmail.com">Email <Arrow diagonal /></a>
            <a href="tel:+855973556059">097-355-6059 <Arrow diagonal /></a>
            <a href="/resume/">Resume <Arrow diagonal /></a>
            <a href="#credentials">Credentials <Arrow diagonal /></a>
            <a href={resumeUrl} download="Bun-Kheang-Heng-Resume.pdf">Resume PDF ↓</a>
            <a href="/trading/">Trading world <Arrow diagonal /></a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Bun Kheang Heng</span>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>
      <Ask />
    </>
  );
}
