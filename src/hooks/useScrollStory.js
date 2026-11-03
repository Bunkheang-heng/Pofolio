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
  { key: "about", enter: 0.04, hold: 0.07, end: 0.13, exit: 0.16 },
  { key: "edu", enter: 0.15, hold: 0.18, end: 0.24, exit: 0.27 },
  { key: "creds", enter: 0.26, hold: 0.29, end: 0.36, exit: 0.39 },
  { key: "xp", enter: 0.38, hold: 0.41, end: 0.48, exit: 0.51 },
  { key: "work", enter: 0.5, hold: 0.53, end: 0.6, exit: 0.63 },
  { key: "lab", enter: 0.62, hold: 0.65, end: 0.73, exit: 0.76 },
  { key: "trading", enter: 0.75, hold: 0.78, end: 0.88, exit: 0.91 },
];

const JUMP = {
  hero: 0,
  about: 0.1,
  edu: 0.21,
  creds: 0.32,
  xp: 0.44,
  work: 0.56,
  lab: 0.68,
  trading: 0.82,
  contact: 0.99,
};

export function useScrollStory() {
  const storyRef = useRef(null);
  const heroRef = useRef(null);
  const portraitRef = useRef(null);
  const aboutRef = useRef(null);
  const eduRef = useRef(null);
  const credsRef = useRef(null);
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
      creds: credsRef,
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

      const contact = range(p, 0.93, 0.98);
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
    credsRef,
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
