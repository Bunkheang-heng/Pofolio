import { useState } from "react";
import { pairs } from "../data/trading";

const studies = {
  gold: {
    title: "Gold & market structure",
    detail: "My focus: liquidity, points of interest, and waiting for a setup.",
    closes: [238, 224, 245, 215, 203, 214, 188, 172, 190, 211, 231, 259, 227, 205, 174, 184, 154, 137, 159, 131, 111, 125, 104, 88, 106, 78, 66, 81],
  },
  forex: {
    title: "Majors & price action",
    detail: "My focus: the relationship between structure, liquidity, and context.",
    closes: [200, 180, 193, 164, 144, 167, 155, 188, 201, 229, 249, 269, 238, 211, 192, 204, 173, 146, 162, 139, 122, 143, 119, 99, 110, 86, 72, 89],
  },
  crypto: {
    title: "Crypto & changing conditions",
    detail: "My focus: patient observation and a plan before taking risk.",
    closes: [218, 198, 230, 200, 170, 189, 151, 190, 219, 240, 221, 272, 235, 209, 169, 186, 151, 119, 146, 116, 89, 110, 79, 106, 75, 58, 81, 67],
  },
};

export default function MarketStudy() {
  const [selected, setSelected] = useState("XAUUSD");
  const [mode, setMode] = useState("smart-money"); // "smart-money" | "raw"
  const [activeHighlight, setActiveHighlight] = useState(null); // "sweep" | "fvg" | "ob" | "bos"
  const study = studies[selected === "XAUUSD" ? "gold" : selected.endsWith("USD") ? "forex" : "crypto"];

  const isSmart = mode === "smart-money";

  return (
    <section className="market-study" aria-label="Explore my market interests">
      <div className="study-topline">
        <span><i aria-hidden="true" /> STRUCTURE STUDY // 01</span>
        <div className="study-mode-toggle" role="group" aria-label="Chart analysis mode">
          <button
            type="button"
            className={`study-mode-btn ${mode === "raw" ? "is-active" : ""}`}
            onClick={() => { setMode("raw"); setActiveHighlight(null); }}
          >
            Raw Candles
          </button>
          <button
            type="button"
            className={`study-mode-btn ${mode === "smart-money" ? "is-active" : ""}`}
            onClick={() => setMode("smart-money")}
          >
            Smart Money / ICT Concepts ⚡
          </button>
        </div>
      </div>

      <div className="instrument-selector" aria-label="Choose a market interest">
        {pairs.map(([, symbol, name]) => (
          <button
            key={symbol}
            type="button"
            aria-pressed={selected === symbol}
            aria-label={`${name} — ${symbol}`}
            onClick={() => setSelected(symbol)}
          >
            {symbol}
          </button>
        ))}
      </div>

      <div className="study-title" aria-live="polite">
        <div className="study-symbol-row">
          <strong>{selected}</strong>
          <span className="study-tag">{isSmart ? "INSTITUTIONAL LIQUIDITY MAPPING" : "RAW PRICE ACTION"}</span>
        </div>
        <span>{isSmart ? "Algorithmic SMC & ICT Concept Annotations" : "Unfiltered Japanese Candlesticks"}</span>
      </div>

      <div className="study-chart-wrapper">
        <svg className="study-chart" viewBox="0 0 620 340" role="img" aria-labelledby="study-chart-title study-chart-description">
          <title id="study-chart-title">{`Illustrative ${selected} market structure study`}</title>
          <desc id="study-chart-description">Candlestick diagram illustrating smart money concepts: liquidity sweeps, fair value gaps, and institutional order blocks.</desc>
          <defs>
            <pattern id="study-grid" width="60" height="50" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth=".5" opacity=".17" />
            </pattern>
            <linearGradient id="fvg-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#c6f36b" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#c6f36b" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="ob-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ffdf00" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#ffdf00" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <rect width="620" height="340" fill="url(#study-grid)" />

          {/* Smart Money Overlays */}
          {isSmart && (
            <>
              {/* Liquidity Pool Line at Previous High */}
              <line x1="18" x2="600" y1="62" y2="62" stroke="#ff5f56" opacity=".55" strokeDasharray="4 4" strokeWidth="1.5" />
              <text x="20" y="47" className="chart-label chart-label-red">LIQUIDITY POOL // EQUAL HIGHS (EQH)</text>

              {/* Break of Structure (BOS) Line */}
              <line x1="280" x2="520" y1="110" y2="110" stroke="#c6f36b" opacity=".7" strokeDasharray="3 3" strokeWidth="1.5" />
              <text x="320" y="103" className="chart-label chart-label-lime">BOS // EXPANSION (H1)</text>

              {/* Order Block (OB) Zone */}
              <g className={`chart-interactive-layer ${activeHighlight === "ob" ? "is-pulsed" : ""}`}>
                <rect x="180" y="240" width="135" height="42" fill="url(#ob-grad)" stroke="#ffdf00" strokeWidth="1.2" strokeOpacity=".6" />
                <text x="188" y="265" className="chart-label chart-label-yellow">BULLISH OB // DEMAND</text>
              </g>

              {/* Fair Value Gap (FVG) Imbalance Box */}
              <g className={`chart-interactive-layer ${activeHighlight === "fvg" ? "is-pulsed" : ""}`}>
                <rect x="326" y="137" width="145" height="34" fill="url(#fvg-grad)" stroke="#c6f36b" strokeWidth="1.5" strokeOpacity=".7" />
                <text x="336" y="159" className="chart-label chart-label-lime">FVG // IMBALANCE MITIGATION</text>
              </g>

              {/* Sweep Bracket at Bottom */}
              <g className={`chart-interactive-layer ${activeHighlight === "sweep" ? "is-pulsed" : ""}`}>
                <path d="M225 284v14h76v-14" fill="none" stroke="#c6f36b" strokeWidth="1.8" />
                <text x="232" y="322" className="chart-label chart-label-lime">SWEEP // SELL-SIDE LIQUIDITY</text>
              </g>

              {/* Execution & Take Profit Target */}
              <line x1="470" x2="600" y1="80" y2="80" stroke="#c6f36b" strokeWidth="1.5" opacity=".8" />
              <text x="475" y="72" className="chart-label chart-label-lime">TP TARGET // 1:3.2 R:R ↗</text>
            </>
          )}

          {/* Candlesticks Rendering */}
          {study.closes.map((close, index) => {
            const open = index === 0 ? 251 : study.closes[index - 1];
            const rising = close < open;
            const x = 29 + index * 20;
            return (
              <g key={index} className={rising ? "candle-up" : "candle-down"}>
                <line x1={x} x2={x} y1={Math.min(open, close) - 9 - index % 3 * 3} y2={Math.max(open, close) + 9 + index % 2 * 4} stroke="currentColor" />
                <rect x={x - 4.5} y={Math.min(open, close)} width="9" height={Math.max(Math.abs(open - close), 3)} fill="currentColor" rx="1" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Interactive Concept Filters */}
      {isSmart && (
        <div className="study-concepts-bar" role="group" aria-label="Highlight concepts">
          <span className="concepts-label">Highlight Concept:</span>
          {[
            { id: "sweep", label: "01. Sweep Liquidity" },
            { id: "fvg", label: "02. Fair Value Gap (FVG)" },
            { id: "ob", label: "03. Bullish Order Block" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              className={`study-concept-chip ${activeHighlight === item.id ? "is-active" : ""}`}
              onClick={() => setActiveHighlight(activeHighlight === item.id ? null : item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      <div className="study-caption">
        <span className="study-caption-mark" aria-hidden="true">↗</span>
        <div aria-live="polite">
          <h3>{study.title}</h3>
          <p>{study.detail}</p>
        </div>
      </div>
      <p className="study-disclosure">SCHEMATIC SMC ILLUSTRATION · PROPRIETARY SYSTEMATIC FRAMEWORK · NOT FINANCIAL ADVICE</p>
    </section>
  );
}
