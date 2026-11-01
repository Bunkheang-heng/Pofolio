import { useCallback, useEffect, useRef, useState } from "react";

const clamp = (v, min = 0, max = 1) => Math.min(Math.max(v, min), max);
const range = (v, a, b) => clamp((v - a) / (b - a));

function beat(p, enter, hold, end, exit) {
  return Math.min(range(p, enter, hold), 1 - range(p, end, exit));
}

function setPhase(el, amount) {
  if (!el) return;
  el.style.opacity = String(amount);
  el.style.transform = `translateY(${((1 - amount) * 28).toFixed(1)}px)`;
  el.style.pointerEvents = amount > 0.22 ? "auto" : "none";
  el.classList.toggle("is-live", amount > 0.22);
}

const CHAPTERS = [
  { key: "about", enter: 0.05, hold: 0.09, end: 0.17, exit: 0.21 },
  { key: "edu", enter: 0.19, hold: 0.23, end: 0.33, exit: 0.37 },
  { key: "xp", enter: 0.35, hold: 0.39, end: 0.49, exit: 0.53 },
  { key: "work", enter: 0.51, hold: 0.55, end: 0.67, exit: 0.71 },
  { key: "lab", enter: 0.69, hold: 0.73, end: 0.83, exit: 0.87 },
  { key: "trading", enter: 0.85, hold: 0.89, end: 0.95, exit: 0.97 },
];

const JUMP = {
  hero: 0,
  about: 0.12,
  edu: 0.27,
  xp: 0.42,
  work: 0.58,
  lab: 0.76,
  trading: 0.91,
  contact: 0.99,
};

export function useScrollStory() {
  const storyRef = useRef(null);
  const heroRef = useRef(null);
  const portraitRef = useRef(null);
  const aboutRef = useRef(null);
  const eduRef = useRef(null);
  const xpRef = useRef(null);
  const workRef = useRef(null);
  const labRef = useRef(null);
  const tradingRef = useRef(null);
  const contactRef = useRef(null);
  const progressRef = useRef(null);

  const [activeKey, setActiveKey] = useState("hero");
  const [pct, setPct] = useState(0);

  const jumpTo = useCallback((key) => {
    const story = storyRef.current;
    if (!story) return;
    const max = story.offsetHeight - window.innerHeight;
    window.scrollTo({ top: max * (JUMP[key] ?? 0), behavior: "smooth" });
  }, []);

  useEffect(() => {
    const stage = storyRef.current?.querySelector(".stage");
    const phases = {
      about: aboutRef,
      edu: eduRef,
      xp: xpRef,
      work: workRef,
      lab: labRef,
      trading: tradingRef,
    };
    let raf = 0;
    let last = "";

    const update = () => {
      const story = storyRef.current;
      if (!story) return;
      const max = story.offsetHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setPct(Math.round(p * 100));

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${p})`;
      }

      const heroFade = 1 - range(p, 0.02, 0.08);
      if (heroRef.current) {
        heroRef.current.style.opacity = String(heroFade);
        heroRef.current.style.transform = `translateY(${(-range(p, 0, 0.1) * 18).toFixed(1)}px)`;
      }

      const zoom = 0.84 + range(p, 0.02, 0.94) * 0.28;
      if (portraitRef.current) {
        portraitRef.current.style.setProperty("--zoom", String(zoom));
        portraitRef.current.style.setProperty("--spin", `${p * 220}deg`);
      }

      let next = "hero";
      for (const c of CHAPTERS) {
        const a = beat(p, c.enter, c.hold, c.end, c.exit);
        setPhase(phases[c.key].current, a);
        if (a > 0.28) next = c.key;
      }

      const contact = range(p, 0.96, 0.99);
      if (contactRef.current) {
        contactRef.current.style.opacity = String(contact);
        contactRef.current.style.transform = `translateY(${(18 * (1 - contact)).toFixed(1)}px)`;
        contactRef.current.classList.toggle("is-live", contact > 0.4);
      }
      if (contact > 0.4) next = "contact";

      setActiveKey(next);
      if (stage && last !== next) {
        last = next;
        stage.classList.remove("flash");
        void stage.offsetWidth;
        stage.classList.add("flash");
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return {
    storyRef,
    heroRef,
    portraitRef,
    aboutRef,
    eduRef,
    xpRef,
    workRef,
    labRef,
    tradingRef,
    contactRef,
    progressRef,
    activeKey,
    pct,
    jumpTo,
  };
}
