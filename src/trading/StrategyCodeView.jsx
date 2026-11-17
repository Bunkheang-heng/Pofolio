import { useState } from "react";

function highlightMql5(code) {
  const lines = code.split("\n");
  return lines.map((line, lineIndex) => {
    // If it's a full-line comment
    const trimmed = line.trim();
    if (trimmed.startsWith("//")) {
      return (
        <div key={lineIndex} className="code-line">
          <span className="code-line-num">{lineIndex + 1}</span>
          <span className="token-comment">{line}</span>
        </div>
      );
    }

    // Split inline comment if any
    let codePart = line;
    let commentPart = "";
    const commentIdx = line.indexOf("//");
    if (commentIdx !== -1) {
      codePart = line.slice(0, commentIdx);
      commentPart = line.slice(commentIdx);
    }

    // Simple robust tokenizer for codePart
    const tokens = codePart.split(/([a-zA-Z0-9_]+|"(?:\\.|[^"\\])*"|[^\s\w])/g).filter(Boolean);

    const keywords = new Set([
      "input", "int", "double", "void", "bool", "struct", "if", "else", "return", "for",
      "while", "true", "false", "datetime", "string", "const", "new"
    ]);
    const constants = new Set([
      "ORDER_TYPE_BUY", "ORDER_TYPE_SELL", "ORDER_TYPE_BUY_LIMIT", "ORDER_TYPE_SELL_LIMIT",
      "ORDER_TYPE_BUY_STOP", "ORDER_TYPE_SELL_STOP", "MODE_EMA", "MODE_SMA", "MODE_UPPER",
      "MODE_LOWER", "MODE_LINEAR_WEIGHT", "PERIOD_M1", "PERIOD_M5", "PERIOD_M15", "PERIOD_H1",
      "PERIOD_H4", "PERIOD_D1", "PRICE_CLOSE", "PRICE_LOW", "PRICE_HIGH", "MODE_BEARISH_CHOCH",
      "ZONE_DEMAND", "ZONE_SUPPLY", "CLUSTER_HIGH", "CLUSTER_LOW"
    ]);
    const builtins = new Set([
      "iMA", "iClose", "iOpen", "iHigh", "iLow", "iBands", "MathAbs", "OnTick", "OnSessionClose",
      "_Symbol", "_Period", "_Point"
    ]);

    return (
      <div key={lineIndex} className="code-line">
        <span className="code-line-num">{lineIndex + 1}</span>
        <span className="code-line-content">
          {tokens.map((token, tIndex) => {
            if (keywords.has(token)) {
              return <span key={tIndex} className="token-keyword">{token}</span>;
            }
            if (constants.has(token)) {
              return <span key={tIndex} className="token-constant">{token}</span>;
            }
            if (builtins.has(token)) {
              return <span key={tIndex} className="token-builtin">{token}</span>;
            }
            if (/^[0-9]+(\.[0-9]+)?$/.test(token)) {
              return <span key={tIndex} className="token-number">{token}</span>;
            }
            if (token.startsWith('"') && token.endsWith('"')) {
              return <span key={tIndex} className="token-string">{token}</span>;
            }
            return <span key={tIndex}>{token}</span>;
          })}
          {commentPart && <span className="token-comment">{commentPart}</span>}
        </span>
      </div>
    );
  });
}

export default function StrategyCodeView({ strategy }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(strategy.codeSnippet || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API is restricted
      const textarea = document.createElement("textarea");
      textarea.value = strategy.codeSnippet || "";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="strategy-code-terminal">
      <div className="terminal-header">
        <div className="terminal-dots" aria-hidden="true">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>
        <div className="terminal-title">
          <span className="terminal-file-icon">⚡</span>
          <span>{strategy.id.toUpperCase()}_Execution_Engine.mq5</span>
          <span className="terminal-lang-badge">MQL5 / MetaTrader 5</span>
        </div>
        <button
          type="button"
          className={`terminal-copy-btn ${copied ? "is-copied" : ""}`}
          onClick={handleCopy}
          aria-label={copied ? "Code copied to clipboard" : "Copy algorithmic code snippet"}
        >
          {copied ? "Copied ✓" : "Copy EA Code 📋"}
        </button>
      </div>

      <div className="terminal-body" tabIndex={0} aria-label={`${strategy.name} MQL5 implementation code`}>
        <div className="code-editor-viewport">
          {highlightMql5(strategy.codeSnippet || "// No code available")}
        </div>
      </div>

      <div className="terminal-footer">
        <div className="terminal-spec">
          <span>COMPATIBILITY</span>
          <strong>MT4 / MT5 / Python Fix API</strong>
        </div>
        <div className="terminal-spec">
          <span>LATENCY SENSITIVITY</span>
          <strong>Low (Tick-Level Deterministic)</strong>
        </div>
        <div className="terminal-spec">
          <span>SL & RISK ENGINE</span>
          <strong>Hard Invalidation + Zero Redraw</strong>
        </div>
      </div>
    </div>
  );
}
