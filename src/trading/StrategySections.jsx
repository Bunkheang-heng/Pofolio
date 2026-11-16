import { strategies, developmentServices } from "../data/strategies";
import "./strategies.css";
import StrategyCarousel from "./StrategyCarousel";

function StrategyDiagram({ strategy }) {
  return (
    <figure className={`strategy-diagram strategy-diagram-${strategy.id}`} aria-label={`${strategy.name} conceptual illustration`}>
      <span className="strategy-diagram-heading">{strategy.fullName}</span>
      <svg viewBox="0 0 360 180" fill="none" aria-hidden="true">
        <path className="strategy-grid" d="M0 40H360M0 80H360M0 120H360M0 160H360M40 0V180M100 0V180M160 0V180M220 0V180M280 0V180M340 0V180" />
        {strategy.id === "trend-following" && <>
          <path className="strategy-guide" d="M20 153 340 36M20 115 295 14" />
          <path className="strategy-price" d="m20 145 37-37 21 16 37-51 26 25 41-49 23 27 45-46 25 20 50-36" />
          <circle className="strategy-point" cx="205" cy="76" r="5" />
        </>}
        {strategy.id === "ict" && <>
          <path className="strategy-guide" d="M20 133H190" />
          <rect className="strategy-zone" x="205" y="70" width="125" height="27" />
          <path className="strategy-price" d="m20 75 25 25 25-10 30 28 25-19 28 50 22-33 27-76 30-18 29 48 27-19 32-40" />
          <text className="strategy-svg-label" x="260" y="88">FVG</text>
          <text className="strategy-svg-label" x="120" y="172">SWEEP</text>
        </>}
        {strategy.id === "smc" && <>
          <path className="strategy-guide" d="M61 91H219" />
          <rect className="strategy-zone" x="118" y="130" width="111" height="22" />
          <path className="strategy-price" d="m20 134 42-43 32 25 43-55 32 27 37-66 35 49 37-23 49-35" />
          <text className="strategy-svg-label" x="168" y="78">BOS</text>
          <text className="strategy-svg-label" x="141" y="146">ORDER BLOCK</text>
        </>}
        {strategy.id === "supply-demand" && <>
          <rect className="strategy-zone" x="20" y="122" width="320" height="26" />
          <rect className="strategy-zone strategy-zone-muted" x="20" y="25" width="320" height="26" />
          <path className="strategy-price" d="m20 92 37 40 20-8 18 15 36-78 35-26 30 21 30 74 28-28 35-51 30 19 22-39" />
          <text className="strategy-svg-label" x="258" y="140">DEMAND</text>
          <text className="strategy-svg-label" x="40" y="42">SUPPLY</text>
        </>}
        {strategy.id === "msnr" && <>
          <path className="strategy-level" d="M20 95H340" />
          <path className="strategy-price" d="m20 35 40 60 29-29 35 29 30-16 28 56 35-40 28 21 30-42 23 21 33-47" />
          <circle className="strategy-point" cx="217" cy="95" r="5" />
          <text className="strategy-svg-label" x="20" y="161">SUPPORT ↔ RESISTANCE</text>
        </>}
        {strategy.id === "bbma" && <>
          <path className="strategy-band" d="M15 75C80 12 123 25 183 49S267 58 345 14M15 161C80 102 123 142 183 127S267 162 345 95" />
          <path className="strategy-guide" d="M15 119C80 55 123 83 183 89S267 108 345 55" />
          <path className="strategy-price" d="m20 133 27-44 28-30 30 27 28-13 28 39 30-22 26 27 27-31 29 12 30-35 33-24" />
        </>}
        {strategy.id === "rbo" && <>
          <rect className="strategy-zone" x="20" y="70" width="220" height="70" />
          <path className="strategy-guide" d="M20 70H340" />
          <path className="strategy-price" d="m20 110 27-32 28 52 30-40 30 35 28-45 30 43 25-35 29-49 26 30 29-48 36-11" />
          <circle className="strategy-point" cx="273" cy="69" r="5" />
          <text className="strategy-svg-label" x="58" y="164">DEFINED RANGE</text>
        </>}
      </svg>
      <figcaption>{strategy.diagramLabel}<small>CONCEPTUAL ILLUSTRATION</small></figcaption>
    </figure>
  );
}

export function StrategySections() {
  const slides = strategies.map((strategy, index) => ({
    id: `strategy-${strategy.id}`,
    title: strategy.name,
    anchors: [`strategy-title-${strategy.id}`],
    content: <StrategySection strategy={strategy} index={index} />,
  }));

  return (
    <section className="trade-section master-strategies" id="strategies" aria-labelledby="strategies-title">
      <div className="trade-section-heading">
        <div><p className="trade-eyebrow">02 / MASTER STRATEGIES</p><h2 id="strategies-title">Seven approaches.<br />One <span>strategy mindset.</span></h2></div>
        <p>My trading and strategy-development toolkit.<br />Explore one framework at a time.</p>
      </div>
      <StrategyCarousel slides={slides} />
    </section>
  );
}

export function StrategySection({ strategy, index }) {
  return (
    <section className="strategy-section" id={`strategy-${strategy.id}`} aria-labelledby={`strategy-title-${strategy.id}`}>
      <div className="strategy-copy">
        <span className="strategy-index">{String(index + 1).padStart(2, "0")} / STRATEGY FRAMEWORK</span>
        <h3 id={`strategy-title-${strategy.id}`}>{strategy.name}</h3>
        <p className="strategy-full-name">{strategy.fullName}</p>
        <p className="strategy-description">{strategy.description}</p>
        <div className="strategy-development-note"><span>DEVELOPMENT FOCUS</span><p>{strategy.development}</p></div>
        <div className="strategy-tags">{strategy.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      </div>
      <StrategyDiagram strategy={strategy} />
    </section>
  );
}

export function DevelopmentSection() {
  return (
    <section className="trade-section trade-development" id="development" aria-labelledby="development-title">
      <div className="trade-section-heading">
        <div><p className="trade-eyebrow">03 / TRADING SYSTEM DEVELOPMENT</p><h2 id="development-title">From a trading idea<br />to <span>working logic.</span></h2></div>
        <p>I’m an EA, indicator, strategy,<br />and trading tool developer.</p>
      </div>
      <div className="development-grid">
        {developmentServices.map((service) => (
          <article className="development-card" key={service.id}>
            <div className="development-card-top"><span>{service.number} / DEVELOPMENT</span><span aria-hidden="true">{service.id === "ea" ? "</>" : service.id === "indicator" ? "⌁" : service.id === "trading-tool" ? "⊞" : "{ }"}</span></div>
            <h3>{service.title}</h3><p className="development-subtitle">{service.subtitle}</p>
            <p className="development-description">{service.description}</p>
            <div className="strategy-tags">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </article>
        ))}
      </div>
      <div className="development-process"><p>MY DEVELOPMENT PROCESS</p><ol>{["Idea", "Rules", "Code", "Test", "Refine"].map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span>{step}</li>)}</ol></div>
      <a className="trade-secondary-link" href="mailto:bunkheangheng99@gmail.com?subject=Trading%20system%20or%20tool%20development">Let’s discuss your trading idea <span aria-hidden="true">↗</span></a>
    </section>
  );
}
