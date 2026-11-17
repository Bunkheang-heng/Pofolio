import { useState, useRef, useEffect } from "react";
import StrategyCodeView from "./StrategyCodeView";

export default function StrategyDiagram({ strategy, activePhase, setActivePhase }) {
  const [viewMode, setViewMode] = useState("chart"); // "chart" | "code"
  const [simulating, setSimulating] = useState(false);
  const [simulatedHit, setSimulatedHit] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const terminalRef = useRef(null);

  const toggleFullscreen = () => {
    const el = terminalRef.current;
    if (!el) return;

    if (!document.fullscreenElement) {
      if (el.requestFullscreen) {
        el.requestFullscreen().catch(() => {
          setIsFullscreen((prev) => !prev);
        });
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
      } else {
        setIsFullscreen((prev) => !prev);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement || document.webkitFullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    document.addEventListener("webkitfullscreenchange", handleFsChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFsChange);
      document.removeEventListener("webkitfullscreenchange", handleFsChange);
    };
  }, []);

  const triggerSimulation = () => {
    if (simulating) return;
    setSimulating(true);
    setSimulatedHit(false);
    setTimeout(() => {
      setSimulating(false);
      setSimulatedHit(true);
      setTimeout(() => setSimulatedHit(false), 3000);
    }, 1800);
  };

  const id = strategy.id;
  const asset = strategy.primaryAssets?.split(",")[0]?.trim() || "XAUUSD";
  const tf = strategy.timeframe?.split(" ")[0]?.trim() || "M15";

  return (
    <div
      ref={terminalRef}
      className={`strategy-terminal-card strategy-terminal-${id} ${isFullscreen ? "is-fullscreen-mode" : ""}`}
      aria-label={`${strategy.name} tactical terminal`}
    >
      {/* Top Control Bar */}
      <div className="terminal-topbar">
        <div className="terminal-topbar-left">
          <span className="terminal-live-dot" aria-hidden="true" />
          <span className="terminal-asset-tag">{asset} · {tf} BLUEPRINT</span>
          <span className="terminal-rr-tag">TARGET R:R {strategy.riskReward?.split("—")[0]?.trim() || "1:3.0"}</span>
        </div>
        <div className="terminal-topbar-actions">
          <button
            type="button"
            className={`terminal-tab-btn ${viewMode === "chart" ? "is-active" : ""}`}
            onClick={() => setViewMode("chart")}
            aria-pressed={viewMode === "chart"}
          >
            📊 Visual Chart
          </button>
          <button
            type="button"
            className={`terminal-tab-btn ${viewMode === "code" ? "is-active" : ""}`}
            onClick={() => setViewMode("code")}
            aria-pressed={viewMode === "code"}
          >
            💻 MQL5 Logic
          </button>
          {viewMode === "chart" && (
            <button
              type="button"
              className={`simulate-btn ${simulating ? "is-simulating" : ""} ${simulatedHit ? "is-hit" : ""}`}
              onClick={triggerSimulation}
              disabled={simulating}
              aria-label="Simulate trade execution on chart"
            >
              {simulating ? "Simulating Trade…" : simulatedHit ? "Target Hit ✓" : "⚡ Simulate Trade"}
            </button>
          )}
          <button
            type="button"
            className={`terminal-fullscreen-btn ${isFullscreen ? "is-fs-active" : ""}`}
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen Mode"}
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? "✕ Exit" : "⛶ Fullscreen"}
          </button>
        </div>
      </div>

      {/* Main Viewport */}
      {viewMode === "chart" ? (
        <div className="terminal-chart-viewport">
          <svg
            className={`strategy-blueprint-svg ${simulating ? "is-simulating" : ""}`}
            viewBox="0 0 620 380"
            fill="none"
            role="img"
            aria-labelledby={`svg-title-${id} svg-desc-${id}`}
          >
            <title id={`svg-title-${id}`}>{`${strategy.name} clear price action schematic`}</title>
            <desc id={`svg-desc-${id}`}>{strategy.description}</desc>

            <defs>
              <pattern id={`terminal-grid-${id}`} width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#ffffff" strokeWidth="0.6" strokeOpacity="0.08" />
              </pattern>
              <linearGradient id={`lime-grad-${id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c6f36b" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#c6f36b" stopOpacity="0.04" />
              </linearGradient>
              <linearGradient id={`red-grad-${id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff5c5c" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#ff5c5c" stopOpacity="0.04" />
              </linearGradient>
            </defs>

            {/* Grid Background */}
            <rect width="620" height="380" fill={`url(#terminal-grid-${id})`} />

            {/* Horizontal Grid Lines */}
            <line x1="20" y1="70" x2="600" y2="70" stroke="#ffffff" strokeOpacity="0.08" strokeDasharray="4 4" />
            <line x1="20" y1="140" x2="600" y2="140" stroke="#ffffff" strokeOpacity="0.08" strokeDasharray="4 4" />
            <line x1="20" y1="210" x2="600" y2="210" stroke="#ffffff" strokeOpacity="0.08" strokeDasharray="4 4" />
            <line x1="20" y1="280" x2="600" y2="280" stroke="#ffffff" strokeOpacity="0.08" strokeDasharray="4 4" />

            {/* 1. TREND-FOLLOWING */}
            {id === "trend-following" && (
              <g className="blueprint-group">
                {/* 50 EMA Baseline */}
                <path
                  className={`blueprint-curve blueprint-ema50 ${activePhase === "01" ? "is-phase-focus" : ""}`}
                  d="M 30 300 Q 180 250 330 190 T 580 90"
                />
                {/* 20 EMA Fast Ribbon */}
                <path
                  className={`blueprint-curve blueprint-ema20 ${activePhase === "01" || activePhase === "02" ? "is-phase-focus" : ""}`}
                  d="M 30 260 Q 170 190 320 140 T 580 50"
                />

                {/* EMA Labels */}
                <g transform="translate(480, 42)">
                  <rect x="0" y="0" width="75" height="22" fill="#141c15" stroke="#c6f36b" rx="4" />
                  <text x="37" y="15" textAnchor="middle" className="svg-badge-text-lime">20 EMA</text>
                </g>
                <g transform="translate(480, 82)">
                  <rect x="0" y="0" width="75" height="22" fill="#141c15" stroke="#526e56" rx="4" />
                  <text x="37" y="15" textAnchor="middle" className="svg-badge-text-muted">50 EMA</text>
                </g>

                {/* Pullback Zone Box */}
                <rect
                  x="280"
                  y="125"
                  width="100"
                  height="65"
                  fill="url(#lime-grad-trend-following)"
                  stroke="#c6f36b"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  className={activePhase === "02" ? "is-phase-focus" : ""}
                />
                <g transform="translate(280, 100)">
                  <rect x="0" y="0" width="130" height="22" fill="#141c15" stroke="#c6f36b" rx="4" />
                  <text x="65" y="15" textAnchor="middle" className="svg-badge-text-lime">PULLBACK TO EMA</text>
                </g>

                {/* Candlesticks */}
                <Candle x={45} open={280} close={255} high={250} low={285} bull />
                <Candle x={80} open={255} close={230} high={225} low={260} bull />
                <Candle x={115} open={230} close={245} high={225} low={250} />
                <Candle x={150} open={245} close={205} high={200} low={250} bull />
                <Candle x={185} open={205} close={175} high={170} low={210} bull />
                <Candle x={220} open={175} close={150} high={145} low={180} bull />
                <Candle x={255} open={150} close={165} high={145} low={170} />

                {/* Pullback Candles */}
                <Candle x={295} open={165} close={175} high={160} low={182} />
                <Candle x={330} open={175} close={160} high={155} low={180} bull />
                <Candle x={365} open={160} close={135} high={130} low={165} bull />

                {/* Continuation Candles */}
                <Candle x={405} open={135} close={100} high={95} low={140} bull isDisplacement />
                <Candle x={445} open={100} close={70} high={65} low={105} bull isDisplacement />

                {/* Entry & Targets */}
                <g className={activePhase === "03" ? "is-phase-focus" : ""}>
                  {/* Entry */}
                  <circle cx="365" cy="135" r="6" fill="#101411" stroke="#c6f36b" strokeWidth="3" />
                  <g transform="translate(365, 150)">
                    <rect x="0" y="0" width="125" height="24" fill="#141c15" stroke="#c6f36b" rx="4" />
                    <text x="62" y="16" textAnchor="middle" className="svg-badge-text-lime">BUY ENTRY ↗</text>
                  </g>

                  {/* Stop Loss */}
                  <line x1="280" y1="185" x2="520" y2="185" stroke="#ff5c5c" strokeWidth="2" strokeDasharray="4 4" />
                  <g transform="translate(420, 192)">
                    <rect x="0" y="0" width="130" height="22" fill="#141c15" stroke="#ff5c5c" rx="4" />
                    <text x="65" y="15" textAnchor="middle" className="svg-badge-text-red">STOP LOSS (SWING)</text>
                  </g>

                  {/* Take Profit Target */}
                  <line x1="365" y1="65" x2="580" y2="65" stroke="#c6f36b" strokeWidth="2" strokeDasharray="4 4" />
                  <g transform="translate(440, 36)">
                    <rect x="0" y="0" width="145" height="24" fill="#141c15" stroke="#c6f36b" rx="4" />
                    <text x="72" y="16" textAnchor="middle" className="svg-badge-text-lime">TARGET 1:3.4 R:R ✓</text>
                  </g>
                </g>

                {/* Simulation Trajectory */}
                <path
                  className={`sim-trajectory ${simulating ? "sim-active" : ""}`}
                  d="M 365 135 L 405 100 L 445 70 L 510 65"
                />
              </g>
            )}

            {/* 2. ICT */}
            {id === "ict" && (
              <g className="blueprint-group">
                {/* Buy-Side Liquidity (BSL) Level */}
                <line x1="30" y1="95" x2="550" y2="95" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="2" strokeDasharray="5 5" />
                <g transform="translate(40, 68)">
                  <rect x="0" y="0" width="190" height="24" fill="#141c15" stroke="#ffffff40" rx="4" />
                  <text x="95" y="16" textAnchor="middle" className="svg-badge-text-muted">PREVIOUS HIGH (BSL LIQUIDITY)</text>
                </g>

                {/* Left Trend Candles */}
                <Candle x={50} open={160} close={135} high={130} low={165} bull />
                <Candle x={85} open={135} close={110} high={105} low={140} bull />
                <Candle x={120} open={110} close={125} high={105} low={130} />
                <Candle x={155} open={125} close={100} high={95} low={130} bull />

                {/* SWEEP CANDLE */}
                <g className={activePhase === "01" ? "is-phase-focus" : ""}>
                  <Candle x={195} open={100} close={115} high={68} low={120} />
                  <g transform="translate(155, 36)">
                    <rect x="0" y="0" width="125" height="24" fill="#241718" stroke="#ff5c5c" rx="4" />
                    <text x="62" y="16" textAnchor="middle" className="svg-badge-text-red">LIQUIDITY SWEEP ↗</text>
                  </g>
                </g>

                {/* DISPLACEMENT CANDLE */}
                <g className={activePhase === "02" ? "is-phase-focus" : ""}>
                  <Candle x={240} open={115} close={195} high={110} low={205} isDisplacement />
                  <Candle x={280} open={195} close={235} high={190} low={240} isDisplacement />

                  {/* FVG Highlight Box */}
                  <rect
                    x="245"
                    y="120"
                    width="170"
                    height="65"
                    fill="url(#lime-grad-ict)"
                    stroke="#c6f36b"
                    strokeWidth="1.8"
                    strokeDasharray="4 3"
                  />
                  <line x1="245" y1="152" x2="415" y2="152" stroke="#c6f36b" strokeWidth="2" strokeDasharray="3 3" />
                  <g transform="translate(300, 140)">
                    <rect x="0" y="0" width="125" height="24" fill="#141c15" stroke="#c6f36b" rx="4" />
                    <text x="62" y="16" textAnchor="middle" className="svg-badge-text-lime">FVG [50% CE ENTRY]</text>
                  </g>
                </g>

                {/* Retest Candles into FVG */}
                <Candle x={325} open={235} close={205} high={200} low={240} bull />
                <Candle x={365} open={205} close={165} high={152} low={210} bull />
                <Candle x={405} open={165} close={150} high={148} low={170} bull />

                {/* Entry Point & Execution */}
                <g className={activePhase === "03" ? "is-phase-focus" : ""}>
                  <circle cx="405" cy="152" r="6" fill="#101411" stroke="#c6f36b" strokeWidth="3" />
                  <g transform="translate(420, 140)">
                    <rect x="0" y="0" width="120" height="24" fill="#141c15" stroke="#c6f36b" rx="4" />
                    <text x="60" y="16" textAnchor="middle" className="svg-badge-text-lime">SELL LIMIT FILLED</text>
                  </g>

                  {/* Stop Loss Line */}
                  <line x1="195" y1="62" x2="560" y2="62" stroke="#ff5c5c" strokeWidth="2" strokeDasharray="4 4" />
                  <g transform="translate(440, 50)">
                    <rect x="0" y="0" width="145" height="22" fill="#141c15" stroke="#ff5c5c" rx="4" />
                    <text x="72" y="15" textAnchor="middle" className="svg-badge-text-red">STOP LOSS (ABOVE SWEEP)</text>
                  </g>

                  {/* Expansion Down */}
                  <Candle x={445} open={150} close={220} high={145} low={225} />
                  <Candle x={485} open={220} close={295} high={215} low={300} />

                  {/* Take Profit at SSL */}
                  <line x1="30" y1="295" x2="580" y2="295" stroke="#c6f36b" strokeWidth="2" strokeDasharray="4 4" />
                  <g transform="translate(40, 305)">
                    <rect x="0" y="0" width="220" height="24" fill="#141c15" stroke="#c6f36b" rx="4" />
                    <text x="110" y="16" textAnchor="middle" className="svg-badge-text-lime">TARGET: SELL-SIDE LIQUIDITY (1:3.8 R:R)</text>
                  </g>
                </g>

                {/* Simulation Trajectory */}
                <path
                  className={`sim-trajectory ${simulating ? "sim-active" : ""}`}
                  d="M 405 152 L 445 220 L 485 295"
                />
              </g>
            )}

            {/* 3. SMC */}
            {id === "smc" && (
              <g className="blueprint-group">
                {/* Structural BOS line */}
                <line x1="60" y1="130" x2="260" y2="130" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.8" strokeDasharray="4 4" />
                <g transform="translate(120, 115)">
                  <rect x="0" y="0" width="90" height="22" fill="#141c15" stroke="#ffffff40" rx="4" />
                  <text x="45" y="15" textAnchor="middle" className="svg-badge-text-muted">BOS (+)</text>
                </g>

                {/* Structural Candles */}
                <Candle x={45} open={180} close={145} high={140} low={185} bull />
                <Candle x={80} open={145} close={120} high={115} low={150} bull />
                <Candle x={115} open={120} close={140} high={115} low={145} />
                <Candle x={150} open={140} close={100} high={95} low={145} bull />
                <Candle x={185} open={100} close={70} high={65} low={105} bull />

                {/* Change of Character (CHoCH) */}
                <g className={activePhase === "01" ? "is-phase-focus" : ""}>
                  <line x1="185" y1="190" x2="440" y2="190" stroke="#ff5c5c" strokeWidth="2" strokeDasharray="4 4" />
                  <g transform="translate(240, 175)">
                    <rect x="0" y="0" width="115" height="24" fill="#241718" stroke="#ff5c5c" rx="4" />
                    <text x="57" y="16" textAnchor="middle" className="svg-badge-text-red">CHoCH BREAKDOWN</text>
                  </g>
                </g>

                {/* Bearish Order Block */}
                <g className={activePhase === "02" ? "is-phase-focus" : ""}>
                  <rect
                    x="170"
                    y="60"
                    width="230"
                    height="45"
                    fill="url(#red-grad-smc)"
                    stroke="#ff5c5c"
                    strokeWidth="1.8"
                    strokeDasharray="4 3"
                  />
                  <g transform="translate(180, 48)">
                    <rect x="0" y="0" width="170" height="24" fill="#141c15" stroke="#ff5c5c" rx="4" />
                    <text x="85" y="16" textAnchor="middle" className="svg-badge-text-red">UNMITIGATED ORDER BLOCK</text>
                  </g>
                </g>

                {/* Drop, then Retrace to OB */}
                <Candle x={220} open={70} close={140} high={65} low={145} />
                <Candle x={255} open={140} close={210} high={135} low={215} />
                <Candle x={290} open={210} close={175} high={170} low={215} bull />
                <Candle x={325} open={175} close={130} high={125} low={180} bull />
                <Candle x={360} open={130} close={90} high={80} low={135} bull />

                {/* Mitigation & Execution */}
                <g className={activePhase === "03" ? "is-phase-focus" : ""}>
                  <circle cx="360" cy="90" r="6" fill="#101411" stroke="#c6f36b" strokeWidth="3" />
                  <g transform="translate(375, 80)">
                    <rect x="0" y="0" width="145" height="24" fill="#141c15" stroke="#c6f36b" rx="4" />
                    <text x="72" y="16" textAnchor="middle" className="svg-badge-text-lime">OB MITIGATION ENTRY</text>
                  </g>

                  {/* Stop Loss */}
                  <line x1="170" y1="45" x2="550" y2="45" stroke="#ff5c5c" strokeWidth="2" strokeDasharray="4 4" />
                  <g transform="translate(420, 32)">
                    <rect x="0" y="0" width="150" height="22" fill="#141c15" stroke="#ff5c5c" rx="4" />
                    <text x="75" y="15" textAnchor="middle" className="svg-badge-text-red">SL: +4 PIPS ABOVE OB</text>
                  </g>

                  {/* Drop to Lower Target */}
                  <Candle x={400} open={90} close={165} high={85} low={170} />
                  <Candle x={440} open={165} close={245} high={160} low={250} />
                  <Candle x={480} open={245} close={310} high={240} low={315} />

                  <line x1="40" y1="310" x2="580" y2="310" stroke="#c6f36b" strokeWidth="2" strokeDasharray="4 4" />
                  <g transform="translate(40, 320)">
                    <rect x="0" y="0" width="180" height="24" fill="#141c15" stroke="#c6f36b" rx="4" />
                    <text x="90" y="16" textAnchor="middle" className="svg-badge-text-lime">TARGET: STRUCTURAL LOW (1:4.2 R:R)</text>
                  </g>
                </g>

                {/* Simulation Trajectory */}
                <path
                  className={`sim-trajectory ${simulating ? "sim-active" : ""}`}
                  d="M 360 90 L 440 245 L 480 310"
                />
              </g>
            )}

            {/* 4. SUPPLY & DEMAND */}
            {id === "supply-demand" && (
              <g className="blueprint-group">
                {/* Supply Zone */}
                <g className={activePhase === "01" ? "is-phase-focus" : ""}>
                  <rect x="40" y="45" width="540" height="45" fill="url(#red-grad-supply-demand)" stroke="#ff5c5c" strokeWidth="1.8" />
                  <g transform="translate(50, 32)">
                    <rect x="0" y="0" width="180" height="24" fill="#141c15" stroke="#ff5c5c" rx="4" />
                    <text x="90" y="16" textAnchor="middle" className="svg-badge-text-red">SUPPLY ZONE (SELLERS IN CONTROL)</text>
                  </g>
                </g>

                {/* Demand Zone Base */}
                <g className={activePhase === "01" || activePhase === "02" ? "is-phase-focus" : ""}>
                  <rect x="40" y="240" width="540" height="50" fill="url(#lime-grad-supply-demand)" stroke="#c6f36b" strokeWidth="1.8" />
                  <g transform="translate(50, 300)">
                    <rect x="0" y="0" width="200" height="24" fill="#141c15" stroke="#c6f36b" rx="4" />
                    <text x="100" y="16" textAnchor="middle" className="svg-badge-text-lime">DEMAND BASE (INSTITUTIONAL BUYERS)</text>
                  </g>
                </g>

                {/* Base Candles */}
                <Candle x={70} open={265} close={255} high={250} low={270} />
                <Candle x={105} open={255} close={250} high={245} low={260} bull />
                <Candle x={140} open={250} close={255} high={248} low={260} />

                {/* Massive Departure */}
                <g className={activePhase === "02" ? "is-phase-focus" : ""}>
                  <Candle x={180} open={250} close={185} high={180} low={255} bull isDisplacement />
                  <Candle x={215} open={185} close={120} high={115} low={190} bull isDisplacement />
                  <Candle x={250} open={120} close={68} high={62} low={125} bull isDisplacement />
                  <g transform="translate(180, 140)">
                    <rect x="0" y="0" width="140" height="24" fill="#141c15" stroke="#c6f36b" rx="4" />
                    <text x="70" y="16" textAnchor="middle" className="svg-badge-text-lime">EXPLOSIVE DEPARTURE ↗</text>
                  </g>
                </g>

                {/* Retracement Back Down */}
                <Candle x={295} open={68} close={110} high={65} low={115} />
                <Candle x={335} open={110} close={165} high={105} low={170} />
                <Candle x={375} open={165} close={225} high={160} low={230} />

                {/* Fresh Retest Bounce */}
                <g className={activePhase === "03" ? "is-phase-focus" : ""}>
                  <Candle x={415} open={225} close={242} high={220} low={248} bull />
                  <circle cx="415" cy="242" r="6" fill="#101411" stroke="#c6f36b" strokeWidth="3" />
                  <g transform="translate(350, 215)">
                    <rect x="0" y="0" width="165" height="24" fill="#141c15" stroke="#c6f36b" rx="4" />
                    <text x="82" y="16" textAnchor="middle" className="svg-badge-text-lime">FRESH RETEST (TOUCH #1) ↗</text>
                  </g>

                  {/* Reaction Candles */}
                  <Candle x={455} open={242} close={175} high={170} low={245} bull />
                  <Candle x={495} open={175} close={105} high={100} low={180} bull />

                  <line x1="415" y1="290" x2="560" y2="290" stroke="#ff5c5c" strokeWidth="2" strokeDasharray="4 4" />
                  <g transform="translate(460, 275)">
                    <rect x="0" y="0" width="115" height="22" fill="#141c15" stroke="#ff5c5c" rx="4" />
                    <text x="57" y="15" textAnchor="middle" className="svg-badge-text-red">STOP LOSS (BASE)</text>
                  </g>

                  <line x1="415" y1="75" x2="580" y2="75" stroke="#c6f36b" strokeWidth="2" strokeDasharray="4 4" />
                  <g transform="translate(460, 85)">
                    <rect x="0" y="0" width="130" height="22" fill="#141c15" stroke="#c6f36b" rx="4" />
                    <text x="65" y="15" textAnchor="middle" className="svg-badge-text-lime">TARGET 1:3.2 R:R ✓</text>
                  </g>
                </g>

                {/* Simulation Trajectory */}
                <path
                  className={`sim-trajectory ${simulating ? "sim-active" : ""}`}
                  d="M 415 242 L 455 175 L 495 105 L 530 75"
                />
              </g>
            )}

            {/* 5. MSNR */}
            {id === "msnr" && (
              <g className="blueprint-group">
                {/* Role Reversal Line */}
                <line x1="30" y1="165" x2="580" y2="165" stroke="#c6f36b" strokeWidth="2.5" strokeDasharray="6 4" />
                <g transform="translate(40, 138)">
                  <rect x="0" y="0" width="230" height="24" fill="#141c15" stroke="#c6f36b" rx="4" />
                  <text x="115" y="16" textAnchor="middle" className="svg-badge-text-lime">KEY ROLE REVERSAL PLANE (R ↔ S)</text>
                </g>

                {/* Left Resistance Touches */}
                <Candle x={55} open={210} close={170} high={165} low={215} bull />
                <Candle x={90} open={170} close={190} high={165} low={195} />
                <Candle x={125} open={190} close={168} high={165} low={195} bull />
                <g transform="translate(60, 220)">
                  <rect x="0" y="0" width="150" height="22" fill="#141c15" stroke="#ffffff30" rx="4" />
                  <text x="75" y="15" textAnchor="middle" className="svg-badge-text-muted">CANDLE BODIES RESPECT</text>
                </g>

                {/* Breakout Candle */}
                <g className={activePhase === "02" ? "is-phase-focus" : ""}>
                  <Candle x={180} open={175} close={120} high={115} low={180} bull isDisplacement />
                  <Candle x={220} open={120} close={80} high={75} low={125} bull isDisplacement />
                  <g transform="translate(180, 68)">
                    <rect x="0" y="0" width="135" height="24" fill="#141c15" stroke="#c6f36b" rx="4" />
                    <text x="67" y="16" textAnchor="middle" className="svg-badge-text-lime">DECISIVE BREAKOUT ↗</text>
                  </g>
                </g>

                {/* Retest to Flipped Support */}
                <Candle x={275} open={80} close={110} high={75} low={115} />
                <Candle x={315} open={110} close={140} high={105} low={145} />
                <Candle x={355} open={140} close={160} high={135} low={162} />

                {/* Rejection Pinbar */}
                <g className={activePhase === "03" ? "is-phase-focus" : ""}>
                  <Candle x={395} open={160} close={145} high={140} low={180} bull />
                  <circle cx="395" cy="145" r="6" fill="#101411" stroke="#c6f36b" strokeWidth="3" />
                  <g transform="translate(340, 120)">
                    <rect x="0" y="0" width="160" height="24" fill="#141c15" stroke="#c6f36b" rx="4" />
                    <text x="80" y="16" textAnchor="middle" className="svg-badge-text-lime">REJECTION PINBAR ENTRY</text>
                  </g>

                  {/* Move Up */}
                  <Candle x={440} open={145} close={100} high={95} low={150} bull />
                  <Candle x={480} open={100} close={60} high={55} low={105} bull />

                  <line x1="395" y1="185" x2="550" y2="185" stroke="#ff5c5c" strokeWidth="2" strokeDasharray="4 4" />
                  <g transform="translate(440, 195)">
                    <rect x="0" y="0" width="125" height="22" fill="#141c15" stroke="#ff5c5c" rx="4" />
                    <text x="62" y="15" textAnchor="middle" className="svg-badge-text-red">SL: BELOW PINBAR</text>
                  </g>

                  <line x1="395" y1="60" x2="580" y2="60" stroke="#c6f36b" strokeWidth="2" strokeDasharray="4 4" />
                  <g transform="translate(460, 48)">
                    <rect x="0" y="0" width="135" height="22" fill="#141c15" stroke="#c6f36b" rx="4" />
                    <text x="67" y="15" textAnchor="middle" className="svg-badge-text-lime">TARGET 1:3.0 R:R ✓</text>
                  </g>
                </g>

                {/* Simulation Trajectory */}
                <path
                  className={`sim-trajectory ${simulating ? "sim-active" : ""}`}
                  d="M 395 145 L 440 100 L 480 60"
                />
              </g>
            )}

            {/* 6. BBMA */}
            {id === "bbma" && (
              <g className="blueprint-group">
                {/* Upper BB */}
                <path className="blueprint-curve blueprint-bb-outer" d="M 30 120 Q 180 50 330 45 T 580 95" />
                {/* Lower BB */}
                <path className="blueprint-curve blueprint-bb-outer" d="M 30 250 Q 180 275 330 280 T 580 240" />
                {/* Mid 20 SMA */}
                <path className="blueprint-curve blueprint-bb-mid" d="M 30 185 Q 180 162 330 162 T 580 168" />
                {/* MA 5/10 Corridor */}
                <path className="blueprint-curve blueprint-ma-corridor" d="M 30 160 Q 180 135 330 132 T 580 150" />

                {/* Stage 1: Extreme */}
                <g className={activePhase === "01" ? "is-phase-focus" : ""}>
                  <Candle x={140} open={90} close={45} high={38} low={95} bull isDisplacement />
                  <g transform="translate(85, 20)">
                    <rect x="0" y="0" width="135" height="24" fill="#141c15" stroke="#c6f36b" rx="4" />
                    <text x="67" y="16" textAnchor="middle" className="svg-badge-text-lime">01. EXTREME (PIERCE)</text>
                  </g>
                </g>

                {/* Stage 2: MHV */}
                <g className={activePhase === "02" ? "is-phase-focus" : ""}>
                  <Candle x={185} open={55} close={85} high={52} low={90} />
                  <Candle x={230} open={85} close={62} high={55} low={90} bull />
                  <g transform="translate(200, 32)">
                    <rect x="0" y="0" width="130" height="24" fill="#141c15" stroke="#ffffff40" rx="4" />
                    <text x="65" y="16" textAnchor="middle" className="svg-badge-text-muted">02. MHV (EXHAUSTION)</text>
                  </g>
                </g>

                {/* Stage 3: Re-Entry */}
                <g className={activePhase === "03" ? "is-phase-focus" : ""}>
                  <Candle x={280} open={72} close={110} high={68} low={115} />
                  <Candle x={330} open={110} close={136} high={105} low={140} />
                  {/* Touch on MA Corridor */}
                  <Candle x={380} open={136} close={122} high={115} low={140} bull />
                  <circle cx="380" cy="136" r="6" fill="#101411" stroke="#c6f36b" strokeWidth="3" />
                  <g transform="translate(330, 150)">
                    <rect x="0" y="0" width="160" height="24" fill="#141c15" stroke="#c6f36b" rx="4" />
                    <text x="80" y="16" textAnchor="middle" className="svg-badge-text-lime">03. RE-ENTRY CORRIDOR ↗</text>
                  </g>

                  {/* Expansion */}
                  <Candle x={430} open={122} close={80} high={75} low={128} bull />
                  <Candle x={475} open={80} close={48} high={42} low={85} bull />

                  <line x1="380" y1="50" x2="580" y2="50" stroke="#c6f36b" strokeWidth="2" strokeDasharray="4 4" />
                  <g transform="translate(450, 60)">
                    <rect x="0" y="0" width="145" height="22" fill="#141c15" stroke="#c6f36b" rx="4" />
                    <text x="72" y="15" textAnchor="middle" className="svg-badge-text-lime">TARGET OPPOSITE BAND</text>
                  </g>
                </g>

                {/* Simulation Trajectory */}
                <path
                  className={`sim-trajectory ${simulating ? "sim-active" : ""}`}
                  d="M 380 136 L 430 80 L 475 50"
                />
              </g>
            )}

            {/* 7. RBO */}
            {id === "rbo" && (
              <g className="blueprint-group">
                {/* Asian Range Box */}
                <rect
                  x="40"
                  y="110"
                  width="250"
                  height="105"
                  fill="url(#lime-grad-rbo)"
                  stroke="#c6f36b"
                  strokeWidth="1.8"
                  strokeDasharray="4 3"
                  className={activePhase === "01" ? "is-phase-focus" : ""}
                />
                <line x1="40" y1="110" x2="580" y2="110" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="40" y1="215" x2="580" y2="215" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="3 3" />
                <g transform="translate(50, 88)">
                  <rect x="0" y="0" width="220" height="24" fill="#141c15" stroke="#c6f36b" rx="4" />
                  <text x="110" y="16" textAnchor="middle" className="svg-badge-text-lime">ASIAN SESSION (00:00 - 08:00 GMT)</text>
                </g>

                {/* Range Consolidation Candles */}
                <Candle x={65} open={155} close={135} high={130} low={160} bull />
                <Candle x={100} open={135} close={175} high={130} low={180} />
                <Candle x={135} open={175} close={150} high={145} low={180} bull />
                <Candle x={170} open={150} close={185} high={145} low={190} />
                <Candle x={205} open={185} close={140} high={135} low={190} bull />

                {/* Trap Wick Above Range High */}
                <g className={activePhase === "02" ? "is-phase-focus" : ""}>
                  <Candle x={245} open={140} close={125} high={90} low={145} />
                  <g transform="translate(200, 65)">
                    <rect x="0" y="0" width="135" height="24" fill="#241718" stroke="#ff5c5c" rx="4" />
                    <text x="67" y="16" textAnchor="middle" className="svg-badge-text-red">LIQUIDITY TRAP SWEEP</text>
                  </g>
                </g>

                {/* London Breakout Candle */}
                <g className={activePhase === "03" ? "is-phase-focus" : ""}>
                  <Candle x={295} open={135} close={205} high={130} low={210} />
                  {/* Huge breakdown marubozu */}
                  <Candle x={340} open={205} close={275} high={200} low={280} isDisplacement />
                  <g transform="translate(290, 285)">
                    <rect x="0" y="0" width="180" height="24" fill="#141c15" stroke="#c6f36b" rx="4" />
                    <text x="90" y="16" textAnchor="middle" className="svg-badge-text-lime">08:00 LONDON EXPANSION ↘</text>
                  </g>

                  {/* Retest to Range Low */}
                  <Candle x={390} open={275} close={235} high={216} low={280} bull />
                  <circle cx="390" cy="216" r="6" fill="#101411" stroke="#c6f36b" strokeWidth="3" />
                  <g transform="translate(405, 215)">
                    <rect x="0" y="0" width="125" height="24" fill="#141c15" stroke="#c6f36b" rx="4" />
                    <text x="62" y="16" textAnchor="middle" className="svg-badge-text-lime">RETEST ENTRY</text>
                  </g>

                  {/* Expansion Down */}
                  <Candle x={440} open={235} close={305} high={230} low={310} />
                  <Candle x={485} open={305} close={335} high={300} low={340} />

                  <line x1="340" y1="160" x2="550" y2="160" stroke="#ff5c5c" strokeWidth="2" strokeDasharray="4 4" />
                  <g transform="translate(440, 150)">
                    <rect x="0" y="0" width="135" height="22" fill="#141c15" stroke="#ff5c5c" rx="4" />
                    <text x="67" y="15" textAnchor="middle" className="svg-badge-text-red">SL: RANGE MIDLINE</text>
                  </g>

                  <line x1="340" y1="335" x2="580" y2="335" stroke="#c6f36b" strokeWidth="2" strokeDasharray="4 4" />
                  <g transform="translate(420, 345)">
                    <rect x="0" y="0" width="180" height="24" fill="#141c15" stroke="#c6f36b" rx="4" />
                    <text x="90" y="16" textAnchor="middle" className="svg-badge-text-lime">+48 PIPS EXPANSION TARGET ✓</text>
                  </g>
                </g>

                {/* Simulation Trajectory */}
                <path
                  className={`sim-trajectory ${simulating ? "sim-active" : ""}`}
                  d="M 390 216 L 440 305 L 485 335"
                />
              </g>
            )}
          </svg>

          {/* Interactive Phase Bar */}
          <div className="blueprint-phase-bar" role="tablist" aria-label="Interactive execution phases">
            <span className="phase-bar-label">SETUP PHASES:</span>
            {strategy.phases?.map((p) => (
              <button
                key={p.step}
                type="button"
                role="tab"
                aria-selected={activePhase === p.step}
                className={`blueprint-phase-pill ${activePhase === p.step ? "is-active" : ""}`}
                onClick={() => setActivePhase(activePhase === p.step ? null : p.step)}
              >
                <span className="phase-pill-num">{p.step}</span>
                <span className="phase-pill-name">{p.name}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* MQL5 Code Engine Viewport */
        <StrategyCodeView strategy={strategy} />
      )}

      {/* Terminal Caption */}
      <figcaption className="terminal-caption">
        <div className="caption-left">
          <span className="caption-tag">FIG 0{strategy.id === "trend-following" ? 1 : strategy.id === "ict" ? 2 : strategy.id === "smc" ? 3 : strategy.id === "supply-demand" ? 4 : strategy.id === "msnr" ? 5 : strategy.id === "bbma" ? 6 : 7}</span>
          <strong>{strategy.diagramLabel}</strong>
        </div>
        <div className="caption-right">
          <span className="caption-live-indicator">● TESTED ON LIVE TICK DATA</span>
        </div>
      </figcaption>
    </div>
  );
}

function Candle({ x, open, close, high, low, bull, isDisplacement }) {
  const isGreen = bull !== undefined ? bull : close < open;
  const top = Math.min(open, close);
  const height = Math.max(Math.abs(open - close), 4);
  const bodyWidth = 14;
  const color = isGreen ? "#c6f36b" : "#263628";
  const strokeColor = isGreen ? "#c6f36b" : "#526e56";

  return (
    <g className={`chart-candle ${isGreen ? "candle-bull" : "candle-bear"} ${isDisplacement ? "candle-displacement" : ""}`}>
      {/* Wick */}
      <line x1={x} y1={high} x2={x} y2={low} stroke={strokeColor} strokeWidth={isDisplacement ? 2.5 : 1.8} />
      {/* Body */}
      <rect
        x={x - bodyWidth / 2}
        y={top}
        width={bodyWidth}
        height={height}
        fill={color}
        stroke={strokeColor}
        strokeWidth="1.2"
        rx="2"
      />
    </g>
  );
}
