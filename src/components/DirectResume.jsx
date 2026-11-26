import { useState } from "react";
import { resumeUrl } from "../data/certificates";
import "./DirectResume.css";

export default function DirectResume() {
  const [viewMode, setViewMode] = useState("web"); // "web" | "pdf"

  return (
    <div className="direct-resume" id="resume">
      {/* Resume Control Bar */}
      <div className="resume-control-bar no-print">
        <div className="resume-bar-intro">
          <div className="resume-status-badge">
            <span className="resume-status-dot" aria-hidden="true" />
            <span>AVAILABLE FOR FULL-STACK &amp; SECURITY ROLES</span>
          </div>
          <span className="resume-bar-meta">Phnom Penh, Cambodia · Open to Remote</span>
        </div>

        <div className="resume-bar-actions">
          <div className="resume-view-toggle" role="group" aria-label="Resume display mode">
            <button
              type="button"
              className={`toggle-tab ${viewMode === "web" ? "is-active" : ""}`}
              onClick={() => setViewMode("web")}
              aria-pressed={viewMode === "web"}
            >
              Interactive CV
            </button>
            <button
              type="button"
              className={`toggle-tab ${viewMode === "pdf" ? "is-active" : ""}`}
              onClick={() => setViewMode("pdf")}
              aria-pressed={viewMode === "pdf"}
            >
              PDF Document
            </button>
          </div>

          <button
            type="button"
            className="resume-action-btn resume-btn-outline"
            onClick={() => window.print()}
            title="Print resume"
          >
            Print 🖨
          </button>

          <a
            className="resume-action-btn resume-btn-dark"
            href={resumeUrl}
            download="Bun-Kheang-Heng-Resume.pdf"
            title="Download PDF"
          >
            Download PDF ↓
          </a>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === "web" ? (
        <article className="resume-sheet" aria-label="Bun Kheang Heng Professional Resume">
          {/* Sheet Header */}
          <header className="sheet-header">
            <div className="sheet-title-group">
              <span className="sheet-eyebrow">CURRICULUM VITAE · SOFTWARE ENGINEER &amp; SECURITY RESEARCHER</span>
              <h1 className="sheet-name">HENG BUNKHEANG</h1>
              <p className="sheet-role">
                Full-Stack Product Developer · AI Systems · Cybersecurity Explorer
              </p>
            </div>

            <div className="sheet-contact-grid">
              <a href="mailto:bunkheangheng99@gmail.com" className="contact-item">
                <span className="contact-label">Email:</span>
                <strong>bunkheangheng99@gmail.com</strong>
              </a>
              <a href="tel:+855973556059" className="contact-item">
                <span className="contact-label">Phone:</span>
                <strong>+855 097-355-6059</strong>
              </a>
              <span className="contact-item">
                <span className="contact-label">Location:</span>
                <strong>Phnom Penh, Cambodia</strong>
              </span>
              <a
                href="https://github.com/Bunkheang-heng"
                target="_blank"
                rel="noreferrer"
                className="contact-item"
              >
                <span className="contact-label">GitHub:</span>
                <strong>github.com/Bunkheang-heng ↗</strong>
              </a>
              <a
                href="https://linkedin.com/in/bunkheangheng"
                target="_blank"
                rel="noreferrer"
                className="contact-item"
              >
                <span className="contact-label">LinkedIn:</span>
                <strong>linkedin.com/in/bunkheangheng ↗</strong>
              </a>
              <a href="/trading/" className="contact-item">
                <span className="contact-label">Trading World:</span>
                <strong>ben10-fx.trade ↗</strong>
              </a>
            </div>

            <p className="sheet-summary">
              Software engineer and security researcher building scalable web applications, machine learning systems, and secure architectures. Passionate about bridging theoretical concepts into production builds—from international CTFs and hackathons to real-world NGO platforms.
            </p>
          </header>

          {/* Section: Education */}
          <section className="sheet-section" aria-labelledby="sec-education">
            <h2 id="sec-education" className="sheet-section-heading">
              <span>01</span> Education
            </h2>
            <div className="sheet-timeline">
              <div className="sheet-entry">
                <div className="entry-header">
                  <div>
                    <h3 className="entry-title">Bachelor of Computer Science</h3>
                    <p className="entry-org">Fort Hays State University (Partnership with AUPP)</p>
                  </div>
                  <span className="entry-tag">Dual Degree</span>
                </div>
                <p className="entry-note">
                  Focus on software engineering, computer systems, data structures, algorithms, and quantitative problem solving.
                </p>
              </div>

              <div className="sheet-entry">
                <div className="entry-header">
                  <div>
                    <h3 className="entry-title">Bachelor of Information Technology Management</h3>
                    <p className="entry-org">American University of Phnom Penh (AUPP)</p>
                  </div>
                  <span className="entry-tag">Phnom Penh, KH</span>
                </div>
                <p className="entry-note">
                  Focus on IT architecture, systems analysis, digital leadership, project management, and technology governance.
                </p>
              </div>
            </div>
          </section>

          {/* Section: Technical Skills */}
          <section className="sheet-section" aria-labelledby="sec-skills">
            <h2 id="sec-skills" className="sheet-section-heading">
              <span>02</span> Technical Skills
            </h2>
            <div className="skills-categorized-grid">
              <div className="skill-cat-card">
                <span className="skill-cat-lbl">PROGRAMMING LANGUAGES</span>
                <p>JavaScript (ES6+), Python, C, SQL, HTML5, CSS3, MQL5</p>
              </div>
              <div className="skill-cat-card">
                <span className="skill-cat-lbl">FRONTEND &amp; CLIENT</span>
                <p>ReactJS, Next.js, Tailwind CSS, Responsive Design, State Management, Vite</p>
              </div>
              <div className="skill-cat-card">
                <span className="skill-cat-lbl">BACKEND &amp; APIS</span>
                <p>Node.js, Express.js, Nest.js, Flask, RESTful APIs, Firebase Cloud Functions</p>
              </div>
              <div className="skill-cat-card">
                <span className="skill-cat-lbl">DATABASES &amp; STORAGE</span>
                <p>PostgreSQL, MongoDB, SQL, Firebase Firestore, Cloud Storage</p>
              </div>
              <div className="skill-cat-card">
                <span className="skill-cat-lbl">CLOUD, DEVOPS &amp; INFRA</span>
                <p>AWS (Cloud Foundations), Google Cloud Platform, Docker, Git / GitHub, CI/CD</p>
              </div>
              <div className="skill-cat-card">
                <span className="skill-cat-lbl">CYBERSECURITY &amp; AI</span>
                <p>System &amp; Web Exploitation, Digital Forensics, Malware Analysis, Incident Response, Kali Linux, Gemini AI, NLP</p>
              </div>
            </div>
          </section>

          {/* Section: Experience */}
          <section className="sheet-section" aria-labelledby="sec-experience">
            <h2 id="sec-experience" className="sheet-section-heading">
              <span>03</span> Professional Experience
            </h2>
            <div className="sheet-timeline">
              <div className="sheet-entry">
                <div className="entry-header">
                  <div>
                    <h3 className="entry-title">Developer — Positive Parenting Project</h3>
                    <p className="entry-org">Save the Children Cambodia · Phnom Penh, Cambodia</p>
                  </div>
                  <span className="entry-period">Jan 2024</span>
                </div>
                <ul className="entry-bullet-list">
                  <li>Developed and launched a dedicated digital platform for the Positive Parenting Project utilizing ReactJS and Firebase.</li>
                  <li>Engineered an automated Messenger chatbot powered by Python and Flask to facilitate user feedback and parent engagement.</li>
                  <li>Collaborated cross-functionally with community organizers and program leads to design intuitive interfaces for non-technical users.</li>
                </ul>
              </div>

              <div className="sheet-entry">
                <div className="entry-header">
                  <div>
                    <h3 className="entry-title">Cybersecurity Researcher &amp; South Korea Bootcamp Finalist</h3>
                    <p className="entry-org">ASEAN Cyber Shield (ACS) Online Education &amp; Bootcamp</p>
                  </div>
                  <span className="entry-period">Apr 2024 – May 2025</span>
                </div>
                <ul className="entry-bullet-list">
                  <li>Completed intensive training across advanced security domains: real-world web exploitation, system exploitation, digital forensics, malware development and incident response.</li>
                  <li>Engineered a machine learning-based email phishing detection pipeline integrating VirusTotal API and SpamAssassin heuristics.</li>
                  <li>
                    <strong>Selected as 1 of only 14 outstanding students out of 300 candidates across the entire ASEAN region</strong> to participate in the physical cybersecurity bootcamp in South Korea.
                  </li>
                </ul>
              </div>

              <div className="sheet-entry">
                <div className="entry-header">
                  <div>
                    <h3 className="entry-title">Freelance Full-Stack Engineer — SanSom Loan Management System</h3>
                    <p className="entry-org">SanSom Financial Solutions · Freelance Client Build</p>
                  </div>
                  <span className="entry-period">2024</span>
                </div>
                <ul className="entry-bullet-list">
                  <li>Architected and developed a full-cycle loan management platform handling borrower onboarding, interest computation, and active loan tracking.</li>
                  <li>Engineered automated repayment schedules, loan status workflows, and transaction logging for administrative transparency.</li>
                  <li>Built responsive administrative dashboards with role-based access control (RBAC) and exportable financial audit reports.</li>
                </ul>
              </div>

              <div className="sheet-entry">
                <div className="entry-header">
                  <div>
                    <h3 className="entry-title">Freelance Full-Stack &amp; Mobile Developer — REELTIME Media</h3>
                    <p className="entry-org">REELTIME Media · Web Platform &amp; Mobile App</p>
                  </div>
                  <span className="entry-period">2024</span>
                </div>
                <ul className="entry-bullet-list">
                  <li>Designed and built a modern movie and entertainment discovery web platform paired with a cross-platform mobile application.</li>
                  <li>Implemented rich catalog exploration, user watchlist synchronization, trailer preview embeds, and media streaming integrations.</li>
                  <li>Optimized client performance and media asset caching to deliver smooth playback and fast UI transitions on mobile and web.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section: Featured Projects */}
          <section className="sheet-section" aria-labelledby="sec-projects">
            <h2 id="sec-projects" className="sheet-section-heading">
              <span>04</span> Featured Projects
            </h2>
            <div className="sheet-projects-grid">
              <div className="sheet-project-box">
                <div className="project-box-top">
                  <h4>1. QuickResume</h4>
                  <span className="tech-tag">Next.js · Firebase · AI</span>
                </div>
                <p>AI-assisted resume generation web application featuring real-time collaborative editing, instant formatting templates, and export features.</p>
              </div>

              <div className="sheet-project-box">
                <div className="project-box-top">
                  <h4>2. STEMii</h4>
                  <span className="tech-tag">React · Node.js · Firebase</span>
                </div>
                <p>STEM learning platform equipped with AI-based self-assessment tools, dynamic quiz engines, and interactive modules for students.</p>
              </div>

              <div className="sheet-project-box">
                <div className="project-box-top">
                  <h4>3. SakRean</h4>
                  <span className="tech-tag">React · Academic Tools</span>
                </div>
                <p>Higher education decision platform helping Cambodian high school seniors select university majors through career matching tests and curated resources.</p>
              </div>

              <div className="sheet-project-box">
                <div className="project-box-top">
                  <h4>4. Phishing Detection System</h4>
                  <span className="tech-tag">Python · Flask · NLP · ML</span>
                </div>
                <p>Threat mitigation web service using natural language processing and machine learning to analyze headers, bodies, and links to stop malicious mail.</p>
              </div>

              <div className="sheet-project-box">
                <div className="project-box-top">
                  <h4>5. Personal Portfolio &amp; Dual World</h4>
                  <span className="tech-tag">Vite · React · Tailwind · Gemini</span>
                </div>
                <p>Personal interactive site featuring dual software and algorithmic trading modes, AI chat agent, and interactive tactical strategy blueprints.</p>
              </div>

              <div className="sheet-project-box">
                <div className="project-box-top">
                  <h4>6. Bunkheang Bot</h4>
                  <span className="tech-tag">Telegram Bot · Modular API</span>
                </div>
                <p>Production Telegram AI assistant with caching, rate limiting, and observability to handle natural language queries regarding technical background.</p>
              </div>
            </div>
          </section>

          {/* Section: Awards & Competitions */}
          <section className="sheet-section" aria-labelledby="sec-awards">
            <h2 id="sec-awards" className="sheet-section-heading">
              <span>05</span> Awards &amp; Competitions
            </h2>
            <div className="awards-badge-grid">
              <div className="award-badge-card">
                <span className="award-medal">🥇 1st Place</span>
                <strong>WRO Future Engineer 2025</strong>
                <small>National Robotics &amp; Engineering</small>
              </div>
              <div className="award-badge-card">
                <span className="award-medal">🥈 2nd Place</span>
                <strong>Cybersecurity Capture The Flag 2024</strong>
                <small>Competitive Security Tournament</small>
              </div>
              <div className="award-badge-card">
                <span className="award-medal">🥉 3rd Place</span>
                <strong>Clean Energy Hackathon 2023</strong>
                <small>EnergyLab Cambodia</small>
              </div>
              <div className="award-badge-card">
                <span className="award-medal">Top 5</span>
                <strong>Turing Hackathon 2023</strong>
                <small>Algorithmic Problem Solving</small>
              </div>
              <div className="award-badge-card">
                <span className="award-medal">Top 5</span>
                <strong>Novathon by Save the Children 2023</strong>
                <small>Digital Innovation for Youth</small>
              </div>
              <div className="award-badge-card">
                <span className="award-medal">Top 10</span>
                <strong>Ideathon Cambodia Season 2 (2023)</strong>
                <small>National Ideation Competition</small>
              </div>
              <div className="award-badge-card">
                <span className="award-medal">Top 10</span>
                <strong>Unientrepreneur 2024</strong>
                <small>Startup &amp; Innovation Challenge</small>
              </div>
              <div className="award-badge-card">
                <span className="award-medal">Top 10</span>
                <strong>Sandbox Competition 2024</strong>
                <small>Tech Product Accelerator</small>
              </div>
            </div>
          </section>

          {/* Section: Volunteer Work */}
          <section className="sheet-section" aria-labelledby="sec-volunteers">
            <h2 id="sec-volunteers" className="sheet-section-heading">
              <span>06</span> Volunteer &amp; Community Leadership
            </h2>
            <div className="sheet-timeline">
              <div className="sheet-entry">
                <div className="entry-header">
                  <div>
                    <h3 className="entry-title">Technical Team Member — Mekong Tech Festival</h3>
                    <p className="entry-org">Phnom Penh, Cambodia</p>
                  </div>
                  <span className="entry-period">Dec 2023</span>
                </div>
                <p className="entry-note">
                  Supported booth technical setups, audiovisual systems, and logistical troubleshooting for international speakers and technology participants.
                </p>
              </div>

              <div className="sheet-entry">
                <div className="entry-header">
                  <div>
                    <h3 className="entry-title">Event Organizer — Rice of Love Football Tournament</h3>
                    <p className="entry-org">Phnom Penh, Cambodia</p>
                  </div>
                  <span className="entry-period">Jul 2022</span>
                </div>
                <p className="entry-note">
                  Organized an exhibition charity football tournament to raise funds and supplies for underprivileged communities, coordinating teams and sponsors.
                </p>
              </div>

              <div className="sheet-entry">
                <div className="entry-header">
                  <div>
                    <h3 className="entry-title">Volunteer — Earth Hour Campaign</h3>
                    <p className="entry-org">Phnom Penh, Cambodia</p>
                  </div>
                  <span className="entry-period">Mar 2024</span>
                </div>
                <p className="entry-note">
                  Assisted community operations, campaign logistics, and food distribution for volunteers during the international climate awareness initiative.
                </p>
              </div>
            </div>
          </section>
        </article>
      ) : (
        <div className="pdf-viewer-container" aria-label="Original PDF Document Viewer">
          <div className="pdf-viewer-bar no-print">
            <div className="pdf-bar-left">
              <span className="pdf-icon">📄</span>
              <strong>Bun-Kheang-Heng-Resume.pdf</strong>
              <span className="pdf-size-tag">132 KB · 3 Pages</span>
            </div>
            <div className="pdf-bar-actions">
              <a
                className="resume-action-btn resume-btn-outline"
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open in New Tab ↗
              </a>
              <a
                className="resume-action-btn resume-btn-dark"
                href={resumeUrl}
                download="Bun-Kheang-Heng-Resume.pdf"
              >
                Download PDF ↓
              </a>
            </div>
          </div>

          <div className="pdf-mobile-fallback no-print">
            <div className="pdf-fallback-info">
              <strong>💡 Mobile &amp; Touch Friendly:</strong>
              <span>If your device does not render PDF documents directly in browser, you can view the responsive Interactive CV or open/download the file.</span>
            </div>
            <div className="pdf-fallback-actions">
              <button
                type="button"
                className="resume-action-btn resume-btn-outline"
                onClick={() => setViewMode("web")}
              >
                Switch to Interactive CV ↗
              </button>
              <a
                className="resume-action-btn resume-btn-dark"
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open Fullscreen PDF ↗
              </a>
            </div>
          </div>

          <div className="pdf-frame-wrapper">
            <iframe
              src={resumeUrl}
              title="Bun Kheang Heng Resume PDF"
              className="pdf-iframe"
            />
          </div>
        </div>
      )}
    </div>
  );
}
