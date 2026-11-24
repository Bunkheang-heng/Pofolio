export default function Ask() {
  function handleClick(e) {
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
