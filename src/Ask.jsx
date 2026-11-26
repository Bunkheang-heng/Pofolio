import { useEffect, useState } from "react";

export default function Ask() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      // Only show the floating jump button once user scrolls past the full-screen chat section
      setVisible(window.scrollY > 420);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  function handleClick() {
    const chatInput = document.querySelector(".chat-input");
    if (chatInput) {
      setTimeout(() => chatInput.focus(), 300);
    }
  }

  return (
    <a
      className="chat-scroll-helper"
      href="#chat"
      aria-label="Scroll to Ask About Me chat section"
      onClick={handleClick}
    >
      <span aria-hidden="true">✳</span> Ask About Me
    </a>
  );
}
