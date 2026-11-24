import { useEffect, useRef, useState } from "react";
import "./ChatHeroSection.css";

const starters = [
  "What do you build?",
  "Tell me about your freelance projects",
  "Where did you study?",
  "What are your cybersecurity achievements?",
  "How do you trade?",
];

const INITIAL_MESSAGE = {
  role: "assistant",
  content:
    "Hey! I'm Bun Kheang's AI portfolio assistant. Ask me anything about his full-stack builds, cybersecurity research at ASEAN Cyber Shield, freelance systems (SanSom & REELTIME Media), dual degrees, or algorithmic trading strategies.",
};

export default function ChatHeroSection() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);

  const inputRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    if (streamRef.current) {
      streamRef.current.scrollTop = streamRef.current.scrollHeight;
    }
  }, [messages, busy]);

  async function handleSend(text) {
    const content = text.trim();
    if (!content || busy) return;

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

  return (
    <section className="chat-hero-section section-pad" id="chat" aria-labelledby="chat-title">
      <div className="chat-section-header">
        <div className="chat-title-group">
          <div className="chat-eyebrow">
            <span className="chat-status-pulse" aria-hidden="true" />
            <span>BUN KHEANG'S AI ASSISTANT · LIVE INTERACTIVE CHAT</span>
          </div>
          <h2 id="chat-title">Ask About Me.</h2>
          <p className="chat-subtitle">
            Instant interactive Q&amp;A. Ask about my software products, freelance systems (SanSom &amp; REELTIME Media), cybersecurity achievements, or trading strategies.
          </p>
        </div>
        <div className="chat-header-badge">
          <span>● ONLINE &amp; READY</span>
        </div>
      </div>

      <div className="chat-console" role="region" aria-label="Interactive AI Chat Terminal">
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
              className="chat-reset-btn"
              onClick={handleReset}
              title="Reset conversation"
            >
              ↺ Clear Chat
            </button>
          </div>
        </div>

        {/* Message Log Stream */}
        <div
          className="chat-stream"
          ref={streamRef}
          role="log"
          aria-live="polite"
          aria-busy={busy}
        >
          {messages.map((msg, index) => {
            const isUser = msg.role === "user";
            return (
              <div
                key={`${msg.role}-${index}`}
                className={`chat-bubble ${isUser ? "chat-bubble-user" : "chat-bubble-assistant"}`}
              >
                <span className="bubble-sender">
                  {isUser ? "You" : "✳ Bun's Assistant"}
                </span>
                <div className="bubble-content">{msg.content}</div>
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
              <span>Assistant is typing…</span>
            </div>
          )}
        </div>

        {/* Starters Suggestion Chips */}
        <div className="chat-starters-bar" role="group" aria-label="Suggested questions">
          <span className="starters-label">Try asking:</span>
          {starters.map((prompt) => (
            <button
              key={prompt}
              type="button"
              className="chat-starter-pill"
              disabled={busy}
              onClick={() => handleSend(prompt)}
            >
              {prompt}
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
            placeholder="Ask a question about Bun Kheang... (e.g., 'What tech stack do you use?' or 'Tell me about SanSom')"
            maxLength={800}
            onChange={(e) => setDraft(e.target.value)}
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
      </div>
    </section>
  );
}
