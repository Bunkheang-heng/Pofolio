import { useState } from "react";
import WorldSwitch from "../components/WorldSwitch";
import { githubStats, moreProjects } from "../data/githubProjects";
import { plays, pairs } from "../data/trading";
import { StrategySections, DevelopmentSection } from "./StrategySections";

const tradingProjects = moreProjects.filter((project) => project.tag === "Fx");

const projectNotes = {
  "SuperFx Agent": { category: "AI & analysis", mark: "01", title: "Research before execution.", tags: ["Multi-agent", "Forex", "MT5"] },
  "Ben10-Fx": { category: "The trading vault", mark: "02", title: "A home for the trading work.", tags: ["Expert advisors", "Books", "Tickets"] },
  turtle_quant: { category: "Quantitative experiments", mark: "03", title: "Turn an idea into a rule.", tags: ["Research", "Rules", "Backtesting"] },
  "Trading Club": { category: "Learning & community", mark: "04", title: "Make the thinking shareable.", tags: ["AUPP", "Playbook", "Risk"] },
};

const conceptGroups = {
  "All concepts": null,
  Structure: ["BOS", "CHoCH"],
  Liquidity: ["Sweep", "EQH", "EQL", "Inducement"],
  Zones: ["FVG", "OB", "POI", "Breaker", "Premium", "Discount", "Mitigation", "Imbalance"],
};

function ExternalArrow() {
  return <span aria-hidden="true">↗</span>;
}

function TradingProject({ project }) {
  const note = projectNotes[project.name];
  return (
    <a className={`trade-project trade-project-${note.mark}`} href={project.url} target="_blank" rel="noreferrer">
      <div className="trade-project-top"><span>{note.mark} / {note.category}</span><ExternalArrow /></div>
      <div className="trade-project-graphic" aria-hidden="true">
        {note.mark === "01" ? <><span className="agent-node node-a">CONTEXT</span><span className="agent-node node-b">RESEARCH</span><span className="agent-node node-c">ANALYSIS</span><span className="agent-connection" /></>
          : note.mark === "02" ? <><span className="vault-outline" /><span className="vault-symbol">FX</span><span className="vault-code">BOOKS / EAs / TICKETS</span></>
          : note.mark === "03" ? <><span className="quant-formula">idea <span>→</span> rule</span><span className="quant-bars">▁ ▃ ▂ ▅ ▃ ▆ ▄ █</span></>
          : <><span className="club-page page-back" /><span className="club-page page-front">POI<br /><span>FVG / RISK</span></span></>}
      </div>
      <div className="trade-project-copy"><p>{note.title}</p><h3>{project.name}</h3><p className="trade-project-detail">{project.detail}</p><div className="trade-project-tags">{note.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
      <div className="trade-project-bottom">Explore repository <ExternalArrow /></div>
    </a>
  );
}

function Playbook() {
  const [group, setGroup] = useState("All concepts");
  const [query, setQuery] = useState("");
  const concepts = plays.filter(([code, definition]) =>
    (!conceptGroups[group] || conceptGroups[group].includes(code)) &&
    `${code} ${definition}`.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <section className="trade-section trade-playbook" id="playbook" aria-labelledby="playbook-title">
      <div className="trade-section-heading"><div><p className="trade-eyebrow">05 / THE PLAYBOOK</p><h2 id="playbook-title">Understand the<br />language of price.</h2></div><p>The concepts behind my approach.<br />One reference, always a student.</p></div>
      <div className="playbook-toolbar">
        <div className="concept-filters" aria-label="Filter playbook concepts">{Object.keys(conceptGroups).map((label) => <button type="button" key={label} aria-pressed={group === label} onClick={() => setGroup(label)}>{label}</button>)}</div>
        <label className="concept-search"><span aria-hidden="true">⌕</span><span className="trade-sr-only">Search playbook concepts</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a concept…" /></label>
      </div>
      <div className="concept-results" role="status">{concepts.length} {concepts.length === 1 ? "concept" : "concepts"}</div>
      <div className="concept-grid">
        {concepts.map(([code, definition], index) => <details className="concept" key={code}><summary><span className="concept-number">{String(index + 1).padStart(2, "0")}</span><h3>{code}</h3><span className="concept-plus" aria-hidden="true">+</span></summary><p>{definition}</p></details>)}
      </div>
      {concepts.length === 0 && <div className="concept-empty"><p>No concepts match “{query}” in {group.toLowerCase()}.</p><button type="button" onClick={() => { setQuery(""); setGroup("All concepts"); }}>Clear filters <span aria-hidden="true">↗</span></button></div>}
    </section>
  );
}

export default function TradingPortfolio() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="trading-site">
      <a className="trade-skip-link" href="#trading-main">Skip to content</a>
      <WorldSwitch world="trading" />
      <header className="trade-header">
        <a className="trade-brand" href="#trading-home" aria-label="Ben10-Fx trading portfolio home"><span className="trade-brand-symbol" aria-hidden="true">↗</span><span>BEN10<span className="brand-divider"> / </span>FX<small>BUN KHEANG HENG</small></span></a>
        <button className="trade-menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="trading-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Close −" : "Explore +"}</button>
        <nav className={`trade-nav ${menuOpen ? "is-open" : ""}`} id="trading-nav" aria-label="Trading navigation">
          {[["Approach", "approach"], ["Strategies", "strategies"], ["Development", "development"], ["Projects", "trading-projects"], ["Playbook", "playbook"]].map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a className="trade-nav-contact" href="#trading-contact" onClick={() => setMenuOpen(false)}>Let’s connect <ExternalArrow /></a>
        </nav>
      </header>
      <main id="trading-main">
        <section className="trade-hero trade-section" id="trading-home" aria-labelledby="trading-hero-title">
          <div className="trade-hero-copy"><p className="trade-eyebrow"><span className="trade-dot" /> THE OTHER SIDE OF BUN KHEANG HENG</p><h1 id="trading-hero-title">Trade<br />the <span>plan.</span></h1><p className="trade-hero-lead">Trader & strategy developer.<br />EA, indicator & tool developer.</p><p className="trade-hero-intro">I trade, develop strategies, and build Expert Advisors, custom indicators, and trading tools. My work connects price-action frameworks, systematic rules, and code.</p><div className="trade-hero-actions"><a className="trade-button" href="#trading-projects">Explore my trading work <ExternalArrow /></a><a className="trade-secondary-link" href="#strategies">Explore my strategies <span aria-hidden="true">↓</span></a></div><div className="trade-hero-signature"><span aria-hidden="true">BKH.</span><p>Bun Kheang Heng<small>EA, indicator & strategy developer · Phnom Penh, KH</small></p></div></div>
          <div className="trade-hero-chart">
            <figure className="trade-trader-card trade-trader-card-hero">
              <div className="trader-card-topbar">
                <span className="trader-status-pill">
                  <span className="trader-live-dot" aria-hidden="true" />
                  ACTIVE TRADER & EA DEVELOPER
                </span>
                <span className="trader-id-tag">BEN10_FX // KH</span>
              </div>
              <div className="trade-trader-photo">
                <img
                  src="/images/me.png"
                  alt="Bun Kheang Heng — Trader & Strategy Developer"
                  width="1024"
                  height="1536"
                  fetchPriority="high"
                />
              </div>
              <figcaption>
                <div className="figcaption-main">
                  <span className="trade-eyebrow">TRADER & STRATEGY DEVELOPER</span>
                  <strong>Bun Kheang Heng</strong>
                  <span className="trade-trader-location">EA, Indicator & Strategy Architect · Phnom Penh, Cambodia</span>
                </div>
                <div className="trader-card-badges">
                  <span>MQL5</span>
                  <span>PYTHON</span>
                  <span>PRICE ACTION</span>
                </div>
                <span className="trade-trader-mark" aria-hidden="true">↗</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <div className="trade-market-strip" aria-label="Markets I follow"><span className="market-strip-label">ON MY RADAR</span>{pairs.map(([mark, symbol, name]) => <span className="trade-market" key={symbol}><span className="trade-market-mark" aria-hidden="true">{mark}</span><strong>{symbol}</strong><small>{name}</small></span>)}</div>

        <section className="trade-section trade-approach" id="approach" aria-labelledby="approach-title">
          <div className="trade-section-heading"><div><p className="trade-eyebrow">01 / THE APPROACH</p><h2 id="approach-title">Structure.<br />Patience. <span>Discipline.</span></h2></div><p>I trade with a plan. My process starts with<br className="desktop-break" /> context, a point of interest, and respect for risk.</p></div>
          <div className="approach-grid">
            <article><span className="approach-step">01 — OBSERVE</span><span className="approach-icon" aria-hidden="true">⌁</span><h3>Read the structure.</h3><p>Study the context: swing points, breaks of structure, and where liquidity might be resting.</p><span className="approach-tags">BOS / CHoCH / LIQUIDITY</span></article>
            <article><span className="approach-step">02 — WAIT</span><span className="approach-icon" aria-hidden="true">⊕</span><h3>Have a point of interest.</h3><p>My playbook brings together order blocks, fair value gaps, and liquidity sweeps.</p><span className="approach-tags">POI / OB / FVG</span></article>
            <article><span className="approach-step">03 — RESPECT RISK</span><span className="approach-icon" aria-hidden="true">▱</span><h3>Risk comes before size.</h3><p>A defined plan is the foundation. I bring the same deliberate thinking to my research and trading tools.</p><span className="approach-tags">PLAN / PROCESS / DISCIPLINE</span></article>
          </div>
        </section>

        <StrategySections />

        <DevelopmentSection />

        <section className="trade-section trade-projects-section" id="trading-projects" aria-labelledby="trading-projects-title"><div className="trade-section-heading"><div><p className="trade-eyebrow">04 / THE TRADING LAB</p><h2 id="trading-projects-title">Where code<br />meets the <span>markets.</span></h2></div><a className="trade-secondary-link" href={githubStats.profile} target="_blank" rel="noreferrer">All work on GitHub <ExternalArrow /></a></div><div className="trade-project-grid">{tradingProjects.map((project) => <TradingProject key={project.name} project={project} />)}</div></section>

        <Playbook />

        <section className="trade-manifesto trade-section" id="mindset" aria-labelledby="manifesto-title"><span className="manifesto-mark" aria-hidden="true">↗</span><p className="trade-eyebrow">THE MINDSET</p><h2 id="manifesto-title">Stay curious.<br />Keep a plan.<br /><span>Respect the risk.</span></h2><p>From XAUUSD to quantitative experiments,<br />the process is the thread that connects it all.</p><span className="manifesto-signature">BUN KHEANG HENG / BEN10-FX</span></section>

        <section className="trade-section trade-contact" id="trading-contact" aria-labelledby="trading-contact-title"><div><p className="trade-eyebrow">06 / LET’S CONNECT</p><h2 id="trading-contact-title">Have a trading idea?<br />Let’s <span>build it.</span></h2><p>Expert Advisors, custom indicators, and trading strategies.</p><a className="trade-button" href="mailto:bunkheangheng99@gmail.com">Get in touch <ExternalArrow /></a><a className="trade-contact-email" href="mailto:bunkheangheng99@gmail.com">bunkheangheng99@gmail.com</a></div><a className="software-return" href="/"><span className="return-label">THERE’S ANOTHER WORLD</span><span className="return-art" aria-hidden="true">&lt;/&gt;<span>✳</span></span><h3>Meet the<br />software engineer.</h3><p>AI, full-stack products, cybersecurity.<br />A completely different side of me.</p><span className="return-bottom">Back to my software portfolio <ExternalArrow /></span></a></section>
      </main>

      <footer className="trade-footer"><div className="trade-footer-top"><a className="trade-brand" href="#trading-home">BEN10<span className="brand-divider"> / </span>FX</a><p>Two worlds. One curious mind.<br />Phnom Penh, Cambodia.</p><div><a href="/">Software world <ExternalArrow /></a><a href={githubStats.profile} target="_blank" rel="noreferrer">GitHub <ExternalArrow /></a><a href="mailto:bunkheangheng99@gmail.com">Email <ExternalArrow /></a></div></div><div className="trade-footer-bottom"><span>© {new Date().getFullYear()} Bun Kheang Heng</span><span>Trading · EA development · Indicators · Strategy development</span><a href="#trading-home">Back to top ↑</a></div></footer>
    </div>
  );
}
