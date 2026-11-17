import { useCallback, useEffect, useRef, useState } from "react";
import { resolveSlideIndex, wrapSlideIndex } from "./presentation";
import "./strategy-carousel.css";

export default function StrategyCarousel({ slides }) {
  const [position, setPosition] = useState(() => ({
    index: typeof window === "undefined" ? 0 : Math.max(0, resolveSlideIndex(window.location.hash, slides)),
    visit: 0,
  }));
  const [playing, setPlaying] = useState(() => typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [duration, setDuration] = useState(12000);
  const [inView, setInView] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isBrowserFullscreen, setIsBrowserFullscreen] = useState(false);

  const rootRef = useRef(null);
  const slidesRef = useRef(slides);
  const remainingRef = useRef(duration);
  const touchRef = useRef(null);
  const running = playing && inView && !pageHidden && !hovered;
  slidesRef.current = slides;

  const toggleBrowserFullscreen = () => {
    if (!document.fullscreenElement) {
      const el = rootRef.current?.closest(".master-strategies") || document.documentElement;
      if (el.requestFullscreen) {
        el.requestFullscreen().catch(() => {});
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFs = () => {
      setIsBrowserFullscreen(Boolean(document.fullscreenElement || document.webkitFullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFs);
    document.addEventListener("webkitfullscreenchange", handleFs);
    return () => {
      document.removeEventListener("fullscreenchange", handleFs);
      document.removeEventListener("webkitfullscreenchange", handleFs);
    };
  }, []);

  const navigate = useCallback((index, automatic = false) => {
    const next = wrapSlideIndex(index, slidesRef.current.length);
    if (!automatic) {
      setPlaying(false);
      const url = new URL(window.location.href);
      url.hash = slidesRef.current[next].id;
      window.history.replaceState(window.history.state, "", url);
    }
    setPosition((current) => ({ index: next, visit: current.visit + 1 }));
  }, []);

  useEffect(() => {
    const onHash = () => {
      const index = resolveSlideIndex(window.location.hash, slidesRef.current);
      if (index < 0) return;
      setPlaying(false);
      setPosition((current) => ({ index, visit: current.visit + 1 }));
    };
    const onVisibility = () => setPageHidden(document.hidden);
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => { if (motion.matches) setPlaying(false); };
    onVisibility();
    window.addEventListener("hashchange", onHash);
    document.addEventListener("visibilitychange", onVisibility);
    motion.addEventListener("change", onMotion);

    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio >= 0.15), { threshold: [0, 0.15] });
    if (observer && rootRef.current) observer.observe(rootRef.current);
    else setInView(true);

    return () => {
      observer?.disconnect();
      window.removeEventListener("hashchange", onHash);
      document.removeEventListener("visibilitychange", onVisibility);
      motion.removeEventListener("change", onMotion);
    };
  }, []);

  useEffect(() => {
    remainingRef.current = duration;
  }, [position.index, position.visit, duration]);

  useEffect(() => {
    if (!running) return;
    const startedAt = performance.now();
    const timer = window.setTimeout(() => navigate(position.index + 1, true), Math.max(0, remainingRef.current));
    return () => {
      window.clearTimeout(timer);
      remainingRef.current = Math.max(0, remainingRef.current - (performance.now() - startedAt));
    };
  }, [running, duration, position.index, position.visit, navigate]);

  function onKeyDown(event) {
    if (event.key === "Tab") setPlaying(false);
    if (event.altKey || event.ctrlKey || event.metaKey || event.target.closest("input, textarea, select")) return;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      navigate(position.index + (event.key === "ArrowRight" ? 1 : -1));
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      navigate(event.key === "Home" ? 0 : slides.length - 1);
    } else if (event.key === " " && !event.target.closest("button, a")) {
      event.preventDefault();
      setPlaying((current) => !current);
    }
  }

  function onPointerDown(event) {
    if (event.target.closest(".strategy-autoplay")) return;
    if (!event.target.closest(".strategy-nav-buttons")) setPlaying(false);
    touchRef.current = event.pointerType === "touch" && !event.target.closest("a, button, select")
      ? { x: event.clientX, y: event.clientY }
      : null;
  }

  function onPointerUp(event) {
    const start = touchRef.current;
    touchRef.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy) * 1.5) navigate(position.index + (dx < 0 ? 1 : -1));
  }

  return (
    <div
      className="strategy-carousel"
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Master Strategy Frameworks"
      onKeyDown={onKeyDown}
      onFocusCapture={() => setPlaying(false)}
      onPointerDownCapture={onPointerDown}
      onPointerUpCapture={onPointerUp}
      onPointerCancel={() => { touchRef.current = null; }}
      onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }}
      onPointerLeave={() => setHovered(false)}
      onWheel={() => setPlaying(false)}
    >
      {/* High-Visibility Fullscreen Command Bar */}
      <div className="strategy-deck-bar">
        <div className="strategy-deck-brand">
          <div className="strategy-brand-top">
            <span className="strategy-deck-eyebrow">02 / MASTER STRATEGIES</span>
            <span className="strategy-deck-dot" aria-hidden="true" />
            <span className="strategy-deck-badge">7 LIVE BLUEPRINTS</span>
          </div>
          <h2 id="strategies-title" className="strategy-deck-title">
            Seven approaches. <span>One mindset.</span>
          </h2>
        </div>

        <nav className="strategy-navigation" aria-label="Choose a strategy framework">
          {slides.map((slide, index) => {
            const isCurrent = index === position.index;
            return (
              <a
                key={slide.id}
                href={`#${slide.id}`}
                aria-current={isCurrent ? "true" : undefined}
                className={`strategy-nav-pill ${isCurrent ? "is-active" : ""}`}
                onClick={(event) => {
                  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                  event.preventDefault();
                  navigate(index);
                }}
              >
                <span className="nav-pill-num">0{index + 1}</span>
                <span className="nav-pill-title">{slide.title}</span>
                {isCurrent && <span className="nav-pill-dot" aria-hidden="true" />}
              </a>
            );
          })}
        </nav>

        {/* Previous / Next, Autoplay & Fullscreen Controls */}
        <div className="strategy-nav-buttons">
          <button
            type="button"
            className="strategy-btn-round"
            aria-label="Previous strategy"
            onClick={() => navigate(position.index - 1)}
            title="Previous (←)"
          >
            ←
          </button>
          <span className="strategy-slide-counter">
            <strong>0{position.index + 1}</strong> / 0{slides.length}
          </span>
          <button
            type="button"
            className="strategy-btn-round"
            aria-label="Next strategy"
            onClick={() => navigate(position.index + 1)}
            title="Next (→)"
          >
            →
          </button>
          <button
            type="button"
            className="strategy-autoplay-toggle"
            aria-label={playing ? "Pause autoplay" : "Start autoplay"}
            onClick={() => { setPlaying((c) => !c); setHovered(false); }}
            title="Toggle autoplay"
          >
            {playing ? "⏸ Pause" : "▶ Play"}
          </button>
          <button
            type="button"
            className={`strategy-fullscreen-toggle ${isBrowserFullscreen ? "is-active" : ""}`}
            aria-label={isBrowserFullscreen ? "Exit full screen" : "Enter full screen"}
            onClick={toggleBrowserFullscreen}
            title={isBrowserFullscreen ? "Exit full screen" : "Enter full screen view"}
          >
            {isBrowserFullscreen ? "✕ Exit" : "⛶ Fullscreen"}
          </button>
        </div>
      </div>

      {/* Progress Line */}
      <div className="strategy-carousel-progress" aria-hidden="true">
        <span
          key={`${position.visit}-${duration}`}
          style={{ animationDuration: `${duration}ms`, animationPlayState: running ? "running" : "paused" }}
        />
      </div>

      {/* Slide Panels */}
      <div className="strategy-carousel-panels" id="strategy-carousel-panels">
        {slides.map((slide, index) => (
          <div
            className={`strategy-carousel-panel ${index === position.index ? "is-active" : ""}`}
            key={slide.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}: ${slide.title}`}
            aria-hidden={index !== position.index}
            inert={index !== position.index}
          >
            {slide.content}
          </div>
        ))}
      </div>

      {/* Simple Footer Hint */}
      <div className="strategy-carousel-footer-bar">
        <p className="strategy-carousel-hint">
          <span>Use ← and → arrow keys to switch frameworks · Click phases to highlight setup rules</span>
        </p>
        <a href="#development" className="strategy-cta-link">
          Discuss Custom EA / Indicator Development →
        </a>
      </div>
    </div>
  );
}
