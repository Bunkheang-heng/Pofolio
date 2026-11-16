import { useEffect, useRef, useState } from "react";

const starters = [
  "What do you build?",
  "Where did you study?",
  "How do you trade?",
];

export default function Ask() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Ask me about Bun Kheang Heng. I answer from his portfolio.",
    },
  ]);

  const inputRef = useRef(null);
  const messagesRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages, busy, open]);

  function close() {
    setOpen(false);
    requestAnimationFrame(() => toggleRef.current?.focus());
  }

  async function send(text) {
    const content = text.trim();
    if (!content || busy) return;
    const next = [...messages, { role: "user", content }];
    setMessages(next);
    setDraft("");
    setBusy(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.slice(1).slice(-8),
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "SEA-LION could not answer.");
      setMessages((current) => [...current, { role: "assistant", content: data.reply }]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        { role: "assistant", content: error.message || "SEA-LION could not answer." },
      ]);
    } finally {
      setBusy(false);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        className="ask-toggle"
        ref={toggleRef}
        aria-expanded="false"
        aria-controls="portfolio-chat"
        onClick={() => setOpen(true)}
      >
        <span aria-hidden="true">✳</span> Ask about me
      </button>
    );
  }

  return (
    <section className="ask-panel" id="portfolio-chat" aria-label="Ask about Bun Kheang Heng" onKeyDown={(event) => { if (event.key === "Escape") close(); }}>
      <header className="ask-header">
        <p>Ask about me<small>Portfolio assistant · SEA-LION</small></p>
        <button
          type="button"
          className="ask-close"
          aria-label="Close chat"
          onClick={close}
        >
          ×
        </button>
      </header>
      <div className="ask-messages" ref={messagesRef} role="log" aria-live="polite" aria-busy={busy}>
        {messages.map((message, index) => (
          <p
            key={`${message.role}-${index}`}
            className={`ask-message ${message.role === "user" ? "ask-message-user" : ""}`}
          >
            <span>
              {message.role === "user" ? "You" : "Assistant"}
            </span>
            {message.content}
          </p>
        ))}
        {busy ? <p className="ask-busy">Thinking…</p> : null}
      </div>
      <div className="ask-starters">
        {starters.map((prompt) => (
          <button
            key={prompt}
            type="button"
            disabled={busy}
            onClick={() => send(prompt)}
          >
            {prompt}
          </button>
        ))}
      </div>
      <form
        className="ask-form"
        onSubmit={(event) => {
          event.preventDefault();
          send(draft);
        }}
      >
        <input
          ref={inputRef}
          aria-label="Your question about Bun Kheang Heng"
          value={draft}
          placeholder="Ask about Bun"
          maxLength={800}
          onChange={(event) => setDraft(event.target.value)}
        />
        <button
          type="submit"
          disabled={busy || !draft.trim()}
        >
          Send
        </button>
      </form>
    </section>
  );
}
