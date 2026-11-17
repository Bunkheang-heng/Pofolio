import { useState } from "react";
import { strategies, developmentServices } from "../data/strategies";
import "./strategies.css";
import StrategyCarousel from "./StrategyCarousel";
import StrategyDiagram from "./StrategyDiagram";

export function StrategySection({ strategy, index }) {
  const [activePhase, setActivePhase] = useState(null);

  return (
    <section className="strategy-section" id={`strategy-${strategy.id}`} aria-labelledby={`strategy-title-${strategy.id}`}>
      {/* Left Column: Clear Strategy Dossier */}
      <div className="strategy-copy">
        <div className="strategy-copy-header">
          <div className="strategy-meta-header">
            <span className="strategy-index">FRAMEWORK 0{index + 1} OF 07</span>
            <span className="strategy-category-badge">{strategy.category}</span>
          </div>

          <h3 id={`strategy-title-${strategy.id}`}>{strategy.name}</h3>
          <p className="strategy-full-name">{strategy.fullName}</p>
          <p className="strategy-description">{strategy.description}</p>
        </div>

        {/* 4 Compact Telemetry Badges */}
        <div className="strategy-telemetry-grid">
          <div className="telemetry-card">
            <span className="telemetry-lbl">TIMEFRAME</span>
            <strong className="telemetry-val">{strategy.timeframe || "M15 / H1"}</strong>
          </div>
          <div className="telemetry-card">
            <span className="telemetry-lbl">R:R TARGET</span>
            <strong className="telemetry-val telemetry-lime">{strategy.riskReward?.split("—")[0]?.trim() || "1:3.0"}</strong>
          </div>
          <div className="telemetry-card">
            <span className="telemetry-lbl">PRIMARY ASSET</span>
            <strong className="telemetry-val">{strategy.primaryAssets?.split(",")[0]?.trim() || "XAUUSD"}</strong>
          </div>
          <div className="telemetry-card">
            <span className="telemetry-lbl">ALGO FEASIBILITY</span>
            <strong className="telemetry-val">{strategy.algoFeasibility?.split(" ")[0] || "95%"} Algo</strong>
          </div>
        </div>

        {/* 3-Step Execution Architecture */}
        <div className="strategy-phases-container">
          <div className="phases-header">
            <span>3-STEP EXECUTION ARCHITECTURE</span>
            <small>CLICK TO HIGHLIGHT ON CHART</small>
          </div>
          <div className="phases-list">
            {strategy.phases?.map((phase) => (
              <button
                key={phase.step}
                type="button"
                className={`phase-item ${activePhase === phase.step ? "is-active" : ""}`}
                onClick={() => setActivePhase(activePhase === phase.step ? null : phase.step)}
                aria-pressed={activePhase === phase.step}
              >
                <div className="phase-item-top">
                  <span className="phase-num">STEP 0{phase.step}</span>
                  <strong>{phase.name}</strong>
                  <span className="phase-status" aria-hidden="true">{activePhase === phase.step ? "● HIGHLIGHTED" : "↗"}</span>
                </div>
                <div className="phase-rule">
                  <span>RULE:</span> <code>{phase.rule}</code>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Development & Automation Note */}
        <div className="strategy-development-note">
          <div className="dev-note-header">
            <span className="dev-note-tag">⚡ MQL5 EA AUTOMATION READY</span>
            <span className="dev-note-status">READY</span>
          </div>
          <p>{strategy.development}</p>
        </div>
      </div>

      {/* Right Column: High-Visibility Tactical Terminal */}
      <div className="strategy-display-wrap">
        <StrategyDiagram
          strategy={strategy}
          activePhase={activePhase}
          setActivePhase={setActivePhase}
        />
      </div>
    </section>
  );
}

export function StrategySections() {
  const slides = strategies.map((strategy, index) => ({
    id: `strategy-${strategy.id}`,
    title: strategy.name,
    category: strategy.category,
    anchors: [`strategy-title-${strategy.id}`],
    content: <StrategySection strategy={strategy} index={index} />,
  }));

  return (
    <section className="trade-section master-strategies" id="strategies" aria-labelledby="strategies-title">
      <StrategyCarousel slides={slides} />
    </section>
  );
}

export function DevelopmentSection() {
  return (
    <section className="trade-section trade-development" id="development" aria-labelledby="development-title">
      <div className="trade-section-heading">
        <div>
          <p className="trade-eyebrow">03 / TRADING SYSTEM DEVELOPMENT</p>
          <h2 id="development-title">From a trading idea<br />to <span>working logic.</span></h2>
        </div>
        <p>I’m an EA, indicator, strategy,<br />and trading tool developer.</p>
      </div>
      <div className="development-grid">
        {developmentServices.map((service) => (
          <article className="development-card" key={service.id}>
            <div className="development-card-top">
              <span>{service.number} / DEVELOPMENT</span>
              <span aria-hidden="true">
                {service.id === "ea" ? "</>" : service.id === "indicator" ? "⌁" : service.id === "trading-tool" ? "⊞" : "{ }"}
              </span>
            </div>
            <h3>{service.title}</h3>
            <p className="development-subtitle">{service.subtitle}</p>
            <p className="development-description">{service.description}</p>
            <div className="strategy-tags">
              {service.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
      <div className="development-process">
        <p>MY DEVELOPMENT PROCESS</p>
        <ol>
          {["Idea", "Rules", "Code", "Test", "Refine"].map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>{step}
            </li>
          ))}
        </ol>
      </div>
      <a className="trade-secondary-link" href="mailto:bunkheangheng99@gmail.com?subject=Trading%20system%20or%20tool%20development">
        Let’s discuss your trading idea <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}
