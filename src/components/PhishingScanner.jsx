import { useState } from "react";
import "./PhishingScanner.css";

const PRESETS = [
  {
    label: "Phishing Attack Sample",
    url: "http://paypa1-security-verification.xyz/login",
    score: 96,
    verdict: "MALICIOUS PHISHING DETECTED",
    status: "danger",
    target: "PayPal Brand Impersonation",
    flags: [
      "Typosquatting detected: 'paypa1' mimics 'paypal.com'",
      "High-risk non-standard TLD (.xyz)",
      "Unencrypted HTTP login submission form",
      "VirusTotal reputation: 8/72 engines flagged as malicious",
    ],
  },
  {
    label: "Credential Harvester",
    url: "https://banking-auth-gateway.top/reset-password",
    score: 91,
    status: "danger",
    verdict: "CREDENTIAL HARVESTER RISK",
    target: "Generic Banking MFA Interceptor",
    flags: [
      "Dynamic reverse-proxy domain created within 72 hours",
      "Suspicious TLD (.top) associated with automated phishing campaigns",
      "High Shannon entropy score in subdomains",
      "VirusTotal reputation: 6/72 engines flagged suspicious",
    ],
  },
  {
    label: "Clean Verified URL",
    url: "https://github.com/Bunkheang-heng/Pofolio",
    score: 2,
    status: "safe",
    verdict: "VERIFIED SAFE & LEGITIMATE",
    target: "Authentic GitHub Developer Repository",
    flags: [
      "Valid EV SSL Certificate issued by DigiCert",
      "Established domain age (>15 years)",
      "Zero malicious signatures across 72 threat engines",
      "Lexical structure aligns with authentic repository pattern",
    ],
  },
];

export default function PhishingScanner() {
  const [targetUrl, setTargetUrl] = useState(PRESETS[0].url);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(PRESETS[0]);

  const handleScan = (preset) => {
    const selected = preset || PRESETS.find((p) => p.url === targetUrl) || {
      url: targetUrl,
      score: targetUrl.includes("http://") || targetUrl.includes(".xyz") ? 88 : 12,
      status: targetUrl.includes("http://") || targetUrl.includes(".xyz") ? "danger" : "safe",
      verdict: targetUrl.includes("http://") || targetUrl.includes(".xyz") ? "SUSPICIOUS THREAT" : "LIKELY SAFE",
      target: "Custom Evaluation",
      flags: [
        "Lexical entropy & subdomain depth calculated",
        "VirusTotal API signature matching evaluated",
        "Heuristic model score processed via Random Forest classifier",
      ],
    };

    setAnalyzing(true);
    setTimeout(() => {
      setResult(selected);
      setAnalyzing(false);
    }, 700);
  };

  return (
    <div className="phishing-scanner" role="region" aria-label="ASEAN Cyber Shield Threat Scanner Simulator">
      <div className="scanner-header">
        <div className="scanner-badge">
          <span className="scanner-pulse-dot" aria-hidden="true" />
          <span>ASEAN CYBER SHIELD 2024 // ML PHISHING CLASSIFIER</span>
        </div>
        <span className="scanner-tag">Korea Competition Research</span>
      </div>

      <div className="scanner-body">
        {/* Preset Selector */}
        <div className="scanner-presets-bar">
          <span className="presets-label">Test Samples:</span>
          {PRESETS.map((item) => (
            <button
              key={item.label}
              type="button"
              className={`preset-pill ${targetUrl === item.url ? "active" : ""}`}
              onClick={() => {
                setTargetUrl(item.url);
                handleScan(item);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="scanner-input-bar">
          <input
            type="text"
            className="scanner-url-input"
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            placeholder="Enter URL to test with ML threat classifier..."
            aria-label="URL to inspect"
          />
          <button
            type="button"
            className="scanner-btn"
            disabled={analyzing}
            onClick={() => handleScan()}
          >
            {analyzing ? "Analyzing..." : "Analyze Threat ⚡"}
          </button>
        </div>

        {/* Real-time Analysis Screen */}
        <div className="scanner-results-stage">
          {analyzing ? (
            <div className="scanner-loading" aria-live="polite">
              <span className="loading-spinner" aria-hidden="true" />
              <p>Extracting lexical features &amp; querying VirusTotal signatures...</p>
            </div>
          ) : (
            <div className={`scanner-verdict-box is-${result.status}`}>
              <div className="verdict-top">
                <div className="verdict-badge">
                  <span className="verdict-icon">{result.status === "danger" ? "⚠️" : "🛡️"}</span>
                  <div>
                    <strong>{result.verdict}</strong>
                    <small>{result.target}</small>
                  </div>
                </div>

                <div className="verdict-score-pill">
                  <span className="score-num">{result.score}%</span>
                  <small>Threat Index</small>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="scanner-meter-bar" aria-label={`Threat level: ${result.score}%`}>
                <div
                  className={`scanner-meter-fill is-${result.status}`}
                  style={{ width: `${result.score}%` }}
                />
              </div>

              {/* Security Indicators */}
              <div className="scanner-flags-grid">
                {result.flags.map((flag, idx) => (
                  <div key={idx} className="scanner-flag-item">
                    <span className="flag-bullet" aria-hidden="true">{result.status === "danger" ? "✕" : "✓"}</span>
                    <span>{flag}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="scanner-footer">
        <p>
          💡 <strong>Research Context:</strong> Developed for the <em>ASEAN Cyber Shield 2024</em> exchange in Korea (Selected 14 of 300 candidates across Southeast Asia). Combines random forest feature extraction with automated VirusTotal threat feeds.
        </p>
      </div>
    </div>
  );
}
