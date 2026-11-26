import { useEffect, useRef, useState } from "react";
import "./ChatHeroSection.css";

const starters = [
  { label: "💼 Recruiter TL;DR", query: "/tldr" },
  { label: "🏦 SanSom Loan System", query: "Tell me about your freelance SanSom loan management system" },
  { label: "🛡️ ASEAN Cyber Shield", query: "What are your cybersecurity achievements at ASEAN Cyber Shield?" },
  { label: "🎓 Dual CS & ITM Degrees", query: "Tell me about your dual degrees at FHSU and AUPP" },
  { label: "📈 MQL5 Trading Algorithms", query: "How do you trade and develop algorithmic EAs?" },
];

const INITIAL_MESSAGE = {
  role: "assistant",
  content:
    "Hey! I'm Bun Kheang's AI portfolio assistant. Ask me anything about his full-stack builds, cybersecurity research at ASEAN Cyber Shield, freelance systems (SanSom & REELTIME Media), dual degrees, or algorithmic trading strategies.\n\n💡 Tip: Try typing `/tldr`, `/skills`, `/projects`, or `/trading` for instant briefing dossiers!",
};

const COMMAND_RESPONSES = {
  "/tldr":
    "💼 **Bun Kheang Heng — Executive Summary for Hiring Managers & Recruiters:**\n- **Dual Degrees:** B.S. Computer Science (Fort Hays State University) & B.S. IT Management (American University of Phnom Penh).\n- **Proven Full-Stack & Systems:** Save the Children Cambodia (React/Firebase/Flask), SanSom (Automated Loan Engine), REELTIME Media (Movie streaming web/mobile).\n- **Cybersecurity Honors:** ASEAN Cyber Shield 2024 Researcher — Selected top 14 of 300 across ASEAN.\n- **Algorithmic Edge:** MQL5 Expert Advisor & Python strategy developer with deep risk management rigor.\n- **Location:** Phnom Penh, Cambodia (Open to Remote / Relocation).\n- **Contact:** bunkheangheng99@gmail.com | +855 097-355-6059",
  "/hire":
    "💼 **Bun Kheang Heng — Executive Summary for Hiring Managers & Recruiters:**\n- **Dual Degrees:** B.S. Computer Science (Fort Hays State University) & B.S. IT Management (American University of Phnom Penh).\n- **Proven Full-Stack & Systems:** Save the Children Cambodia (React/Firebase/Flask), SanSom (Automated Loan Engine), REELTIME Media (Movie streaming web/mobile).\n- **Cybersecurity Honors:** ASEAN Cyber Shield 2024 Researcher — Selected top 14 of 300 across ASEAN.\n- **Algorithmic Edge:** MQL5 Expert Advisor & Python strategy developer with deep risk management rigor.\n- **Location:** Phnom Penh, Cambodia (Open to Remote / Relocation).\n- **Contact:** bunkheangheng99@gmail.com | +855 097-355-6059",
  "/skills":
    "🛠️ **Core Technology Taxonomy:**\n- **Languages:** JavaScript (ES6+), Python, C, SQL, HTML5, CSS3, MQL5\n- **Frontend:** React, Next.js, Vite, Tailwind CSS, Component Architecture, State Management\n- **Backend & Cloud:** Node.js, Flask, FastAPI, Firebase, AWS, REST APIs\n- **Cybersecurity & AI:** Phishing Classification, Threat Intelligence, VirusTotal API, MT5 Automation\n- **Databases & Tools:** PostgreSQL, MongoDB, Git, Docker, MT5",
  "/projects":
    "🚀 **Featured Client & Production Systems:**\n1. **SanSom:** Automated Loan Management System with interest calculation schedule engines.\n2. **REELTIME Media:** Streaming discovery web platform & mobile app.\n3. **Save the Children Cambodia:** Positive Parenting portal & automated Messenger chatbot.\n4. **SuperFx Agent & Ben10-Fx:** Multi-agent quantitative Forex analysis & algorithmic trading vault.\n5. **QuickResume:** AI-powered resume builder with modern formatting.",
  "/trading":
    "📈 **Algorithmic Trading & Systematic Market Edge:**\n- Executes mechanical price-action frameworks: Liquidity Sweeps, Fair Value Gaps (FVG), Order Blocks (OB).\n- Developer of automated MQL5 Expert Advisors (EAs) and quantitative backtests in Python.\n- Visit the [Trading World](/trading/) for full strategy playbooks.",
  "/help":
    "⚡ **Available Terminal Commands:**\n- `/tldr` — Instant executive summary for recruiters\n- `/skills` — Technical taxonomy & engineering stack\n- `/projects` — Real-world production systems\n- `/trading` — Systematic trading edge & MQL5 work\n- `/clear` — Reset conversation history",
};

function formatMessage(text) {
  if (!text) return null;
  const lines = text.split("\n");
  return lines.map((line, lIdx) => {
    // Split by markdown bold: **text**
    const boldParts = line.split(/(\*\*[^*]+\*\*)/g);
    const lineElements = boldParts.map((part, pIdx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={pIdx}>{part.slice(2, -2)}</strong>;
      }
      // Split by URL
      const urlParts = part.split(/(https?:\/\/[^\s)\]]+)/g);
      return urlParts.map((sub, sIdx) => {
        if (sub.startsWith("http://") || sub.startsWith("https://")) {
          return (
            <a
              key={sIdx}
              href={sub}
              target="_blank"
              rel="noreferrer"
              className="chat-inline-link"
            >
              {sub} ↗
            </a>
          );
        }
        return sub;
      });
    });

    return (
      <span key={lIdx} className="chat-line">
        {lineElements}
        {lIdx < lines.length - 1 && <br />}
      </span>
    );
  });
}

function TypedContent({ content, isLatest }) {
  const [displayedLength, setDisplayedLength] = useState(isLatest ? 0 : content.length);

  useEffect(() => {
    if (!isLatest) {
      setDisplayedLength(content.length);
      return;
    }
    setDisplayedLength(0);
    let current = 0;
    const interval = setInterval(() => {
      current += 6; // stream 6 characters per tick for crisp, fluid terminal feel
      if (current >= content.length) {
        setDisplayedLength(content.length);
        clearInterval(interval);
      } else {
        setDisplayedLength(current);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [content, isLatest]);

  const visibleText = isLatest ? content.slice(0, displayedLength) : content;
  const isTyping = isLatest && displayedLength < content.length;

  return (
    <>
      {formatMessage(visibleText)}
      {isTyping && <span className="terminal-cursor" aria-hidden="true">█</span>}
    </>
  );
}

export default function ChatHeroSection() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  const inputRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    if (streamRef.current && !isMinimized) {
      streamRef.current.scrollTop = streamRef.current.scrollHeight;
    }
  }, [messages, busy, isMinimized]);

  function handleKeyDown(e) {
    if (e.key === "ArrowUp") {
      if (history.length === 0) return;
      e.preventDefault();
      const nextIdx = historyIdx + 1 < history.length ? historyIdx + 1 : historyIdx;
      setHistoryIdx(nextIdx);
      setDraft(history[history.length - 1 - nextIdx] || "");
    } else if (e.key === "ArrowDown") {
      if (historyIdx > 0) {
        e.preventDefault();
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setDraft(history[history.length - 1 - nextIdx] || "");
      } else if (historyIdx === 0) {
        e.preventDefault();
        setHistoryIdx(-1);
        setDraft("");
      }
    } else if (e.key === "Tab") {
      const trimmed = draft.toLowerCase().trim();
      const slashCmds = ["/tldr", "/skills", "/projects", "/trading", "/hire", "/clear", "/help"];
      if (!trimmed) {
        e.preventDefault();
        setDraft("/tldr");
        return;
      }
      const match = slashCmds.find((c) => c.startsWith(trimmed));
      if (match) {
        e.preventDefault();
        setDraft(match);
      }
    }
  }

  async function handleSend(text) {
    const content = text.trim();
    if (!content || busy) return;

    if (isMinimized) {
      setIsMinimized(false);
    }

    setHistory((prev) => [...prev, content]);
    setHistoryIdx(-1);

    // Check for clear command
    if (content.toLowerCase() === "/clear") {
      handleReset();
      return;
    }

    // Check for predefined slash command
    const cmdKey = content.toLowerCase().trim();
    if (COMMAND_RESPONSES[cmdKey]) {
      const nextMessages = [
        ...messages,
        { role: "user", content },
        { role: "assistant", content: COMMAND_RESPONSES[cmdKey] },
      ];
      setMessages(nextMessages);
      setDraft("");
      requestAnimationFrame(() => inputRef.current?.focus());
      return;
    }

    const nextMessages = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setDraft("");
    setBusy(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.slice(1).slice(-8),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "The assistant could not answer.");
      }

      setMessages((curr) => [...curr, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setMessages((curr) => [
        ...curr,
        {
          role: "assistant",
          content:
            err.message ||
            "Bun Kheang is a software engineer, cybersecurity researcher, and trader based in Phnom Penh. Ask about his projects (QuickResume, SanSom, REELTIME), education (FHSU & AUPP dual degrees), or algorithmic trading!",
        },
      ]);
    } finally {
      setBusy(false);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }

  function handleReset() {
    setMessages([INITIAL_MESSAGE]);
    setDraft("");
    setBusy(false);
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function handleCopy(text, index) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  }

  return (
    <section className={`chat-hero-section ${isMinimized ? "is-collapsed" : ""}`} id="chat" aria-labelledby="chat-title">
      <div className="chat-section-header">
        <div className="chat-title-group">
          <div className="chat-eyebrow">
            <span className="chat-status-pulse" aria-hidden="true" />
            <span>BUN KHEANG'S AI ASSISTANT · LIVE INTERACTIVE CHAT</span>
          </div>
          <h2 id="chat-title">Ask About Me.</h2>
          <p className="chat-subtitle">
            Instant interactive Q&amp;A with slash commands (`/tldr`, `/skills`, `/projects`, `/trading`). Ask about software products, SanSom &amp; REELTIME Media, cybersecurity, or trading strategies.
          </p>
        </div>
        <div className="chat-header-badge">
          <span>● ONLINE &amp; READY</span>
        </div>
      </div>

      <div className={`chat-console ${isMinimized ? "is-minimized" : ""}`} role="region" aria-label="Interactive AI Chat Terminal">
        {/* Terminal Header Bar */}
        <div className="chat-console-bar">
          <div className="chat-console-left">
            <div className="chat-traffic-lights" aria-hidden="true">
              <span className="light-dot dot-red" />
              <span className="light-dot dot-yellow" />
              <span className="light-dot dot-green" />
            </div>
            <span className="chat-terminal-label">BUN_KHEANG_AI // TERMINAL CHAT</span>
          </div>
          <div className="chat-console-actions">
            <button
              type="button"
              className="chat-toggle-btn"
              onClick={() => setIsMinimized((prev) => !prev)}
              title={isMinimized ? "Expand terminal" : "Minimize terminal"}
            >
              {isMinimized ? "+ Expand" : "— Minimize"}
            </button>
            <button
              type="button"
              className="chat-reset-btn"
              onClick={handleReset}
              title="Reset conversation"
            >
              ↺ Clear Chat
            </button>
          </div>
        </div>

        {/* Message Log Stream */}
        {!isMinimized && (
          <>
            <div
              className="chat-stream"
              ref={streamRef}
              role="log"
              aria-live="polite"
              aria-busy={busy}
            >
              {messages.map((msg, index) => {
                const isUser = msg.role === "user";
                const isLatest = index === messages.length - 1 && !isUser;
                return (
                  <div
                    key={`${msg.role}-${index}`}
                    className={`chat-bubble ${isUser ? "chat-bubble-user" : "chat-bubble-assistant"}`}
                  >
                    <div className="bubble-header">
                      <span className="bubble-sender">
                        {isUser ? "You" : "✳ Bun's Assistant"}
                      </span>
                      {!isUser && (
                        <button
                          type="button"
                          className="bubble-copy-btn"
                          onClick={() => handleCopy(msg.content, index)}
                          title="Copy reply text"
                        >
                          {copiedIndex === index ? "Copied ✓" : "Copy"}
                        </button>
                      )}
                    </div>
                    <div className="bubble-content">
                      {isUser ? (
                        msg.content
                      ) : (
                        <TypedContent content={msg.content} isLatest={isLatest} />
                      )}
                    </div>
                  </div>
                );
              })}

              {busy && (
                <div className="chat-thinking-bubble" aria-label="Assistant is thinking">
                  <div className="typing-dots" aria-hidden="true">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                  <span>Assistant is thinking…</span>
                </div>
              )}
            </div>

            {/* Starters Suggestion Chips */}
            <div className="chat-starters-bar" role="group" aria-label="Suggested questions">
              <span className="starters-label">Quick Prompts:</span>
              {starters.map(({ label, query }) => (
                <button
                  key={label}
                  type="button"
                  className="chat-starter-pill"
                  disabled={busy}
                  onClick={() => handleSend(query)}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Input Bar Form */}
            <form
              className="chat-form-bar"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(draft);
              }}
            >
              <input
                ref={inputRef}
                className="chat-input"
                type="text"
                value={draft}
                placeholder="Ask anything or type /tldr, /skills, /projects, /trading (Tab to complete, ↑/↓ history)..."
                maxLength={800}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={busy}
                aria-label="Ask a question about Bun Kheang"
              />
              <button
                className="chat-send-btn"
                type="submit"
                disabled={busy || !draft.trim()}
              >
                Ask ↵
              </button>
            </form>
          </>
        )}
      </div>

      {/* Scroll Down to Main Portfolio Indicator */}
      <div className="chat-scroll-footer">
        <a href="#home" className="chat-scroll-down-btn">
          <span>Explore Bun Kheang’s Portfolio</span>
          <span className="scroll-arrow" aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
