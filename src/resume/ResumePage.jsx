import DirectResume from "../components/DirectResume";
import { resumeUrl } from "../data/certificates";
import "./resume.css";

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

export default function ResumePage() {
  return (
    <div className="resume-page-layout">
      {/* Top Navigation Bar */}
      <header className="resume-page-header">
        <div className="resume-nav-container">
          <a href="/" className="wordmark" aria-label="Back to Bun Kheang's home">
            bunkheang<span>✳</span>
          </a>

          <div className="resume-nav-links">
            <a href="/" className="nav-back-btn">
              ← Back to Portfolio
            </a>
            <a href="/trading/" className="nav-trading-link">
              Trading World <Arrow diagonal />
            </a>
            <a
              href={resumeUrl}
              download="Bun-Kheang-Heng-Resume.pdf"
              className="button button-dark resume-download-nav-btn"
            >
              Download PDF ↓
            </a>
          </div>
        </div>
      </header>

      {/* Hero Banner for Resume */}
      <section className="resume-page-banner">
        <div className="resume-banner-inner">
          <div className="resume-banner-badge">
            <span className="resume-pulse-dot" aria-hidden="true" />
            <span>OFFICIAL CURRICULUM VITAE · 2025</span>
          </div>
          <h1 className="resume-banner-title">Bun Kheang Heng</h1>
          <p className="resume-banner-lead">
            Full-Stack Product Developer · AI Systems · Cybersecurity Explorer · Dual Degree CS &amp; ITM
          </p>
          <div className="resume-banner-meta">
            <span>📍 Phnom Penh, Cambodia</span>
            <span>🎓 FHSU &amp; AUPP Dual B.S.</span>
            <span>🛡️ ASEAN Cyber Shield</span>
            <span>✉️ bunkheangheng99@gmail.com</span>
          </div>
        </div>
      </section>

      {/* Full Interactive Resume Component */}
      <main className="resume-page-main">
        <div className="resume-container">
          <DirectResume />
        </div>
      </main>

      {/* Footer */}
      <footer className="resume-page-footer">
        <div className="resume-footer-inner">
          <div className="resume-footer-brand">
            <a href="/" className="wordmark">
              bunkheang<span>✳</span>
            </a>
            <p>Software engineer, cybersecurity researcher, and trader based in Phnom Penh.</p>
          </div>
          <div className="resume-footer-actions">
            <a href="/">Portfolio Home <Arrow /></a>
            <a href="/trading/">Trading Portfolio <Arrow diagonal /></a>
            <a href="https://github.com/Bunkheang-heng" target="_blank" rel="noreferrer">
              GitHub <Arrow diagonal />
            </a>
            <a href="mailto:bunkheangheng99@gmail.com">
              Email <Arrow diagonal />
            </a>
          </div>
        </div>
        <div className="resume-footer-bottom">
          <span>© {new Date().getFullYear()} Bun Kheang Heng. All rights reserved.</span>
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
