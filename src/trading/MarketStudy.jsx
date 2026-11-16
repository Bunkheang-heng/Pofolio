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
  const study = studies[selected === "XAUUSD" ? "gold" : selected.endsWith("USD") ? "forex" : "crypto"];

  return (
    <section className="market-study" aria-label="Explore my market interests">
      <div className="study-topline">
        <span><i aria-hidden="true" /> STRUCTURE STUDY</span>
        <span>01 / THE CHART ROOM</span>
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
        <strong>{selected}</strong>
        <span>Price action / conceptual study</span>
      </div>
      <svg className="study-chart" viewBox="0 0 620 340" role="img" aria-labelledby="study-chart-title study-chart-description">
        <title id="study-chart-title">{`Illustrative ${selected} market structure study`}</title>
        <desc id="study-chart-description">A schematic candlestick diagram with a liquidity sweep, a fair value gap, and a previous high. It does not represent real prices or trading results.</desc>
        <defs>
          <pattern id="study-grid" width="60" height="50" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth=".5" opacity=".17" />
          </pattern>
        </defs>
        <rect width="620" height="340" fill="url(#study-grid)" />
        <line x1="18" x2="600" y1="62" y2="62" stroke="currentColor" opacity=".35" strokeDasharray="5 6" />
        <text x="20" y="47" className="chart-label">PREVIOUS HIGH</text>
        <rect x="326" y="137" width="123" height="31" fill="#c6f36b" fillOpacity=".09" stroke="#c6f36b" strokeOpacity=".25" />
        <text x="458" y="158" className="chart-label chart-label-lime">FVG</text>
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
        <path d="M235 286v12h66v-12" fill="none" stroke="#c6f36b" strokeWidth="1" />
        <text x="248" y="319" className="chart-label chart-label-lime">SWEEP</text>
        <text x="473" y="319" className="chart-label">CONTEXT → PATIENCE</text>
      </svg>
      <div className="study-caption"><span className="study-caption-mark" aria-hidden="true">↗</span><div aria-live="polite"><h3>{study.title}</h3><p>{study.detail}</p></div></div>
      <p className="study-disclosure">SCHEMATIC ILLUSTRATION · NOT LIVE MARKET DATA</p>
    </section>
  );
}
