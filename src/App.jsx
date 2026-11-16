import { useState } from "react";
import Ask from "./Ask";
import WorldSwitch from "./components/WorldSwitch";
import {
  featuredProjects,
  githubStats,
  moreProjects,
} from "./data/githubProjects";
import { certificateImage, certificates, resumeUrl } from "./data/certificates";

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

function ProjectArtwork({ index }) {
  const symbols = ["Aa", "↗", "✳", "</>", "✦", "ច"];
  return <div className={`project-art art-${index % 6}`} aria-hidden="true"><span className="art-orbit" /><span className="art-window"><span className="art-window-bar">● ● ●</span><span className="art-symbol">{symbols[index % 6]}</span></span><Star className="art-star" /><span className="art-cursor">↖</span></div>;
}

function ProjectCard({ project, index }) {
  return <a className="project-card" href={project.url} target="_blank" rel="noreferrer"><ProjectArtwork index={index} /><div className="project-card-body"><span className="tag">{project.tag}</span><h3>{project.name}<Arrow diagonal /></h3><p>{project.detail}</p><span className="project-card-footer">Explore project <Arrow /></span></div></a>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All projects");
  const filters = { "All projects": null, "AI & software": ["AI", "App"], Education: ["Edu"], Security: ["Sec"] };
  const projects = featuredProjects.filter((project) => !filters[filter] || filters[filter].includes(project.tag));

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <WorldSwitch world="software" />
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Bun Kheang Heng home">bunkheang<span>✳</span></a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Close −" : "Menu +"}</button>
        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} id="main-nav" aria-label="Main navigation">
          {[["Projects", "projects"], ["About", "about"], ["Experience", "experience"], ["Credentials", "credentials"]].map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>Let’s talk <Arrow diagonal /></a>
        </nav>
      </header>
      <main id="main">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> Software engineer. Always curious.</p>
            <h1 id="hero-title">Ideas into<br />real things.</h1>
            <p className="hero-intro">Hey, I’m Bun Kheang Heng. I build useful software, explore AI, and turn curious ideas into working products. Made with curiosity, from Phnom Penh.</p>
            <div className="hero-actions"><a className="button button-dark" href="#projects">Explore my work <Arrow /></a><ResumeLink className="button-outline" /></div>
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
        <section className="credentials-section section-pad" id="credentials" aria-labelledby="credentials-title"><div className="section-heading"><div><p className="eyebrow">A little proof of the process</p><h2 id="credentials-title">Never done<br />learning.</h2></div><ResumeLink className="button-dark" /></div><div className="certificate-grid">{certificates.slice(0, 3).map((cert) => <a className="certificate-card" key={cert.file} href={`/certificate/${encodeURIComponent(cert.file)}`} target="_blank" rel="noreferrer"><div className="certificate-image"><img src={certificateImage(cert.file)} alt={cert.name} loading="lazy" /></div><div><h3>{cert.name}<Arrow diagonal /></h3><p>{cert.note}</p></div></a>)}</div><details className="more-certificates"><summary>More certificates <span>{certificates.length - 3} more <span aria-hidden="true">+</span></span></summary><div className="certificate-list">{certificates.slice(3).map((cert) => <a key={cert.file} href={`/certificate/${encodeURIComponent(cert.file)}`} target="_blank" rel="noreferrer"><span><strong>{cert.name}</strong><small>{cert.note}</small></span><Arrow diagonal /></a>)}</div></details></section>
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
      <footer className="site-footer"><div className="footer-top"><a className="wordmark" href="#home">bunkheang<span>✳</span></a><p>Built with curiosity.<br />From Phnom Penh, Cambodia.</p><div className="footer-links"><a href={githubStats.profile} target="_blank" rel="noreferrer">GitHub <Arrow diagonal /></a><a href="mailto:bunkheangheng99@gmail.com">Email <Arrow diagonal /></a><a href="tel:+855973556059">097-355-6059 <Arrow diagonal /></a><a href={resumeUrl} download="Bun-Kheang-Heng-Resume.pdf">Resume ↓</a><a href="/trading/">Trading world <Arrow diagonal /></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Bun Kheang Heng</span><a href="#home">Back to top ↑</a></div></footer>
      <Ask />
    </>
  );
}
