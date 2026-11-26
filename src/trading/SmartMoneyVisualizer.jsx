import { useState } from "react";
import "./smart-money-visualizer.css";

export default function SmartMoneyVisualizer() {
  const [viewMode, setViewMode] = useState("smc"); // "retail" | "smc"
  const [activeConcept, setActiveConcept] = useState(null);

  const concepts = {
    sweep: {
      name: "Liquidity Sweep (EQH)",
      level: "2648.50",
      type: "Institutional Buy-Side Purge",
      desc: "Retail stop-losses above double tops (Equal Highs) are hunted to generate liquidity for institutional sell orders.",
    },
    choch: {
      name: "Change of Character (CHoCH)",
      level: "2642.10",
      type: "Market Structure Shift",
      desc: "Aggressive displacement breaking the previous swing low confirms institutional shift from bullish to bearish intent.",
    },
    fvg: {
      name: "Fair Value Gap (FVG)",
      level: "2644.20 – 2646.00",
      type: "Price Inefficiency",
      desc: "A 3-candle algorithmic imbalance leaving orders unfilled. Price is magnetically drawn back to rebalance before continuation.",
    },
    ob: {
      name: "Bearish Order Block (OB)",
      level: "2646.50",
      type: "Institutional Footprint",
      desc: "The last up-close candle before violent downward displacement where smart money entered short positions.",
    },
  };

  return (
    <div className="smc-visualizer" role="region" aria-label="Smart Money Concept Interactive Chart">
      <div className="smc-topbar">
        <div className="smc-meta">
          <span className="smc-dot" aria-hidden="true" />
          <span className="smc-asset">XAUUSD · M15 STRUCTURE STUDY</span>
          <span className="smc-tag">SMART MONEY CONCEPTS</span>
        </div>

        <div className="smc-mode-switch" role="group" aria-label="Chart perspective view">
          <button
            type="button"
            className={`smc-switch-btn ${viewMode === "retail" ? "active" : ""}`}
            onClick={() => setViewMode("retail")}
            aria-pressed={viewMode === "retail"}
          >
            Retail View
          </button>
          <button
            type="button"
            className={`smc-switch-btn ${viewMode === "smc" ? "active" : ""}`}
            onClick={() => setViewMode("smc")}
            aria-pressed={viewMode === "smc"}
          >
            Smart Money Lens ↗
          </button>
        </div>
      </div>

      <div className="smc-chart-stage">
        <svg viewBox="0 0 760 360" className="smc-svg" preserveAspectRatio="xMidYMid meet">
          <defs>
            <pattern id="smc-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            </pattern>
            <linearGradient id="fvg-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f1f333" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#f1f333" stopOpacity="0.08" />
            </linearGradient>
            <linearGradient id="ob-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff90e8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ff90e8" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Grid Background */}
          <rect width="760" height="360" fill="url(#smc-grid)" />

          {/* Price Axis Guide Lines */}
          <line x1="30" y1="80" x2="730" y2="80" stroke="rgba(255,255,255,0.07)" strokeDasharray="4 4" />
          <text x="735" y="84" fill="#667062" fontSize="9" fontFamily="monospace">2650.00</text>

          <line x1="30" y1="160" x2="730" y2="160" stroke="rgba(255,255,255,0.07)" strokeDasharray="4 4" />
          <text x="735" y="164" fill="#667062" fontSize="9" fontFamily="monospace">2645.00</text>

          <line x1="30" y1="240" x2="730" y2="240" stroke="rgba(255,255,255,0.07)" strokeDasharray="4 4" />
          <text x="735" y="244" fill="#667062" fontSize="9" fontFamily="monospace">2640.00</text>

          <line x1="30" y1="320" x2="730" y2="320" stroke="rgba(255,255,255,0.07)" strokeDasharray="4 4" />
          <text x="735" y="324" fill="#667062" fontSize="9" fontFamily="monospace">2635.00</text>

          {/* CANDLESTICKS (Structure: Bullish climb -> Equal Highs -> Liquidity Sweep -> Violent Displacement down -> Retest FVG -> Continuation) */}
          {/* C1: Up */}
          <line x1="70" y1="210" x2="70" y2="290" stroke="#c6f36b" strokeWidth="1.5" />
          <rect x="64" y="230" width="12" height="45" fill="#c6f36b" />

          {/* C2: Up */}
          <line x1="110" y1="170" x2="110" y2="250" stroke="#c6f36b" strokeWidth="1.5" />
          <rect x="104" y="190" width="12" height="45" fill="#c6f36b" />

          {/* C3: Swing High 1 (EQH 1) */}
          <line x1="150" y1="100" x2="150" y2="200" stroke="#c6f36b" strokeWidth="1.5" />
          <rect x="144" y="115" width="12" height="60" fill="#c6f36b" />

          {/* C4: Small pullback */}
          <line x1="190" y1="130" x2="190" y2="220" stroke="#ff5f56" strokeWidth="1.5" />
          <rect x="184" y="145" width="12" height="40" fill="#ff5f56" />

          {/* C5: Equal High 2 (EQH 2) */}
          <line x1="230" y1="100" x2="230" y2="180" stroke="#c6f36b" strokeWidth="1.5" />
          <rect x="224" y="115" width="12" height="50" fill="#c6f36b" />

          {/* C6: Dip */}
          <line x1="270" y1="130" x2="270" y2="210" stroke="#ff5f56" strokeWidth="1.5" />
          <rect x="264" y="145" width="12" height="40" fill="#ff5f56" />

          {/* C7: SWEEP CANDLE (Wicks above EQH to 2648.50, then closes back down!) */}
          <line x1="310" y1="65" x2="310" y2="170" stroke="#ff90e8" strokeWidth="2" />
          <rect x="304" y="110" width="12" height="45" fill="#ff90e8" />

          {/* C8: Violent Displacement Down (Displacement Candle 1) */}
          <line x1="350" y1="135" x2="350" y2="250" stroke="#ff5f56" strokeWidth="2" />
          <rect x="344" y="145" width="12" height="90" fill="#ff5f56" />

          {/* C9: Strong continuation breaking swing low (CHoCH) */}
          <line x1="390" y1="220" x2="390" y2="310" stroke="#ff5f56" strokeWidth="2" />
          <rect x="384" y="235" width="12" height="65" fill="#ff5f56" />

          {/* C10: Stabilization candle */}
          <line x1="430" y1="280" x2="430" y2="330" stroke="#c6f36b" strokeWidth="1.5" />
          <rect x="424" y="290" width="12" height="25" fill="#c6f36b" />

          {/* C11: Retest pullback into FVG */}
          <line x1="470" y1="190" x2="470" y2="295" stroke="#c6f36b" strokeWidth="1.5" />
          <rect x="464" y="210" width="12" height="60" fill="#c6f36b" />

          {/* C12: Mitigation entry tap into FVG */}
          <line x1="510" y1="155" x2="510" y2="245" stroke="#c6f36b" strokeWidth="1.5" />
          <rect x="504" y="175" width="12" height="45" fill="#c6f36b" />

          {/* C13: Rejection confirmation candle */}
          <line x1="550" y1="160" x2="550" y2="280" stroke="#ff5f56" strokeWidth="2" />
          <rect x="544" y="180" width="12" height="85" fill="#ff5f56" />

          {/* C14: Downward expansion */}
          <line x1="590" y1="250" x2="590" y2="340" stroke="#ff5f56" strokeWidth="1.5" />
          <rect x="584" y="260" width="12" height="65" fill="#ff5f56" />

          {/* C15: Low expansion */}
          <line x1="630" y1="300" x2="630" y2="350" stroke="#ff5f56" strokeWidth="1.5" />
          <rect x="624" y="310" width="12" height="35" fill="#ff5f56" />

          {/* ============================================================== */}
          {/* RETAIL VIEW ANNOTATIONS (Traditional Support / Resistance)     */}
          {/* ============================================================== */}
          {viewMode === "retail" && (
            <g className="retail-layer">
              <line x1="130" y1="100" x2="340" y2="100" stroke="#4ade80" strokeWidth="2" strokeDasharray="3 3" />
              <text x="140" y="92" fill="#4ade80" fontSize="11" fontFamily="monospace">Double Top Resistance</text>

              <line x1="170" y1="210" x2="400" y2="210" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="180" y="204" fill="#38bdf8" fontSize="10" fontFamily="monospace">Support Trendline</text>

              <line x1="450" y1="175" x2="530" y2="175" stroke="#f87171" strokeWidth="1.5" />
              <text x="450" y="168" fill="#f87171" fontSize="10" fontFamily="monospace">Retest Level</text>
            </g>
          )}

          {/* ============================================================== */}
          {/* SMART MONEY CONCEPTS LAYER (ICT Annotations)                   */}
          {/* ============================================================== */}
          {viewMode === "smc" && (
            <g className="smc-layer">
              {/* 1. Equal Highs (EQH) Liquidity Pool */}
              <line x1="140" y1="100" x2="320" y2="100" stroke="#facc15" strokeWidth="2" strokeDasharray="5 3" />
              <text x="150" y="93" fill="#facc15" fontSize="10" fontWeight="bold" fontFamily="monospace">
                EQH ($$$ Liquidity Resting Above)
              </text>

              {/* 2. Liquidity Sweep Callout */}
              <circle cx="310" cy="65" r="7" fill="#ff90e8" fillOpacity="0.4" stroke="#ff90e8" strokeWidth="1.5" />
              <path d="M 310 50 L 310 60" stroke="#ff90e8" strokeWidth="1.5" />
              <rect x="250" y="24" width="125" height="22" rx="3" fill="#181e19" stroke="#ff90e8" strokeWidth="1" />
              <text x="256" y="39" fill="#ff90e8" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                ⚡ LIQUIDITY SWEEP
              </text>

              {/* 3. Order Block (OB) Box */}
              <rect x="295" y="110" width="30" height="45" fill="url(#ob-grad)" stroke="#ff90e8" strokeWidth="1.5" strokeDasharray="2 2" />
              <text x="330" y="136" fill="#ff90e8" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
                BEARISH OB
              </text>

              {/* 4. CHoCH / Market Structure Shift */}
              <line x1="260" y1="210" x2="415" y2="210" stroke="#f87171" strokeWidth="2" strokeDasharray="4 2" />
              <text x="330" y="204" fill="#f87171" fontSize="10" fontWeight="bold" fontFamily="monospace">
                CHoCH (Displacement)
              </text>

              {/* 5. Fair Value Gap (FVG) Imbalance Box */}
              <rect x="360" y="160" width="165" height="48" fill="url(#fvg-grad)" stroke="#facc15" strokeWidth="1.5" />
              <text x="370" y="188" fill="#facc15" fontSize="10" fontWeight="bold" fontFamily="monospace">
                BEARISH FVG (Imbalance)
              </text>

              {/* 6. Mitigation Entry Tap Arrow */}
              <circle cx="510" cy="165" r="6" fill="#c6f36b" stroke="#000" strokeWidth="1" />
              <line x1="510" y1="130" x2="510" y2="155" stroke="#c6f36b" strokeWidth="2" markerEnd="url(#arrow)" />
              <rect x="460" y="105" width="105" height="20" rx="3" fill="#101411" stroke="#c6f36b" strokeWidth="1" />
              <text x="466" y="119" fill="#c6f36b" fontSize="9" fontWeight="bold" fontFamily="monospace">
                SHORT ENTRY (Retest)
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Interactive Concept Inspector Cards */}
      {viewMode === "smc" && (
        <div className="smc-concepts-row" role="group" aria-label="Explore Smart Money Concepts">
          {Object.entries(concepts).map(([key, data]) => {
            const isSelected = activeConcept === key;
            return (
              <button
                key={key}
                type="button"
                className={`smc-card-btn ${isSelected ? "selected" : ""}`}
                onClick={() => setActiveConcept(isSelected ? null : key)}
              >
                <div className="smc-btn-header">
                  <span className="concept-pill">{data.type}</span>
                  <strong>{data.name}</strong>
                </div>
                <p className="concept-level">Level: {data.level}</p>
                <p className="concept-desc">{data.desc}</p>
              </button>
            );
          })}
        </div>
      )}

      <div className="smc-visualizer-footer">
        <span>
          {viewMode === "smc"
            ? "✓ Smart Money Lens: Revealing liquidity sweeps, fair value gaps, and institutional order blocks."
            : "Traditional Retail Chart: Support and resistance patterns without institutional volume context."}
        </span>
      </div>
    </div>
  );
}
