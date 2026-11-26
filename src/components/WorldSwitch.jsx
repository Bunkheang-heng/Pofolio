import { useState } from "react";
import "./WorldSwitch.css";

export default function WorldSwitch({ world }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetName, setTargetName] = useState("");

  const handleSwitch = (e, url, label) => {
    if ((world === "software" && url === "/") || (world === "trading" && url === "/trading/")) {
      return;
    }
    e.preventDefault();
    setTargetName(label);
    setIsTransitioning(true);
    setTimeout(() => {
      window.location.href = url;
    }, 420);
  };

  return (
    <>
      <div className={`world-bar world-bar-${world}`}>
        <p>Two worlds. <span>One curious mind.</span></p>
        <nav className="world-switch" aria-label="Choose a view">
          <a
            href="/"
            aria-current={world === "software" ? "page" : undefined}
            onClick={(e) => handleSwitch(e, "/", "Software & AI Universe")}
          >
            <span aria-hidden="true">&lt;/&gt;</span> Software
          </a>
          <a
            href="/trading/"
            aria-current={world === "trading" ? "page" : undefined}
            onClick={(e) => handleSwitch(e, "/trading/", "Algorithmic Trading Vault")}
          >
            <span aria-hidden="true">↗</span> Trading
          </a>
        </nav>
      </div>

      {isTransitioning && (
        <div className="world-portal-warp" aria-live="assertive" aria-modal="true" role="dialog">
          <div className="portal-warp-grid" />
          <div className="portal-warp-box">
            <span className="portal-warp-code">PORTAL // DIMENSIONAL SHIFT</span>
            <h3>TRAVERSING TO {targetName.toUpperCase()}</h3>
            <p>Switching universe telemetry &amp; environment context...</p>
            <div className="portal-warp-bar">
              <span className="portal-warp-fill" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
