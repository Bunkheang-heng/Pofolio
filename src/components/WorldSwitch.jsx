import "./WorldSwitch.css";

export default function WorldSwitch({ world }) {
  return (
    <div className={`world-bar world-bar-${world}`}>
      <p>Two worlds. <span>One curious mind.</span></p>
      <nav className="world-switch" aria-label="Choose a view">
        <a href="/" aria-current={world === "software" ? "page" : undefined}>
          <span aria-hidden="true">&lt;/&gt;</span> Software
        </a>
        <a href="/trading/" aria-current={world === "trading" ? "page" : undefined}>
          <span aria-hidden="true">↗</span> Trading
        </a>
      </nav>
    </div>
  );
}
