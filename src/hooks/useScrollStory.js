import { useCallback, useEffect, useRef, useState } from "react";

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);
const range = (value, start, end) => clamp((value - start) / (end - start));

function beat(progress, enter, holdStart, holdEnd, exit) {
  const enterAmt = range(progress, enter, holdStart);
  const exitAmt = 1 - range(progress, holdEnd, exit);
  return Math.min(enterAmt, exitAmt);
}

function setPhase(element, amount) {
  if (!element) return;
  const lift = 18 * (1 - amount);
  const scale = 0.98 + amount * 0.02;
  element.style.opacity = String(amount);
  element.style.transform = `translateY(${lift.toFixed(1)}px) scale(${scale.toFixed(3)})`;
  element.style.pointerEvents = amount > 0.2 ? "auto" : "none";
  element.classList.toggle("is-live", amount > 0.15);
}

/**
 * hero → intro → education → experience → projects → github → awards → trading → final
 */
export const CHAPTERS = [
  { key: "intro", enter: 0.05, hold: 0.08, end: 0.15, exit: 0.18 },
  { key: "edu", enter: 0.17, hold: 0.2, end: 0.28, exit: 0.31 },
  { key: "xp", enter: 0.3, hold: 0.33, end: 0.41, exit: 0.44 },
  { key: "projects", enter: 0.43, hold: 0.46, end: 0.55, exit: 0.58 },
  { key: "github", enter: 0.57, hold: 0.6, end: 0.69, exit: 0.72 },
  { key: "awards", enter: 0.71, hold: 0.74, end: 0.82, exit: 0.85 },
  { key: "trading", enter: 0.84, hold: 0.87, end: 0.94, exit: 0.96 },
];

const LABELS = {
  hero: "Hero Mode",
  intro: "01 Software",
  edu: "02 Education",
  xp: "03 Experience",
  projects: "04 Projects",
  github: "05 GitHub",
  awards: "06 Awards",
  trading: "07 Trading",
  final: "Contact",
};

const JUMP_TARGETS = {
  hero: 0,
  intro: 0.11,
  edu: 0.24,
  xp: 0.37,
  projects: 0.5,
  github: 0.64,
  awards: 0.77,
  trading: 0.9,
  final: 0.97,
};

export function useScrollStory() {
  const storyRef = useRef(null);
  const heroFlanksRef = useRef(null);
  const portraitRef = useRef(null);
  const sideEngineeringRef = useRef(null);
  const sideTradingRef = useRef(null);
  const modeLabelRef = useRef(null);
  const introRef = useRef(null);
  const eduRef = useRef(null);
  const xpRef = useRef(null);
  const projectsRef = useRef(null);
  const githubRef = useRef(null);
  const awardsRef = useRef(null);
  const tradingRef = useRef(null);
  const finalLineRef = useRef(null);
  const progressBarRef = useRef(null);

  const [activeKey, setActiveKey] = useState("hero");
  const [progressPct, setProgressPct] = useState(0);

  const jumpTo = useCallback((key) => {
    const story = storyRef.current;
    if (!story) return;
    const maxScroll = story.offsetHeight - window.innerHeight;
    const target = JUMP_TARGETS[key] ?? 0;
    window.scrollTo({
      top: maxScroll * target,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const stage = storyRef.current?.querySelector(".story-stage");
    const readyTimer = window.setTimeout(() => {
      stage?.classList.add("is-ready");
    }, 40);

    const phases = {
      intro: introRef,
      edu: eduRef,
      xp: xpRef,
      projects: projectsRef,
      github: githubRef,
      awards: awardsRef,
      trading: tradingRef,
    };

    let raf = 0;
    let lastLabel = "";

    const updateStory = () => {
      const story = storyRef.current;
      if (!story) return;

      const maxScroll = story.offsetHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      setProgressPct(Math.round(progress * 100));

      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }

      const flanksFade = 1 - range(progress, 0.02, 0.08);
      if (heroFlanksRef.current) {
        heroFlanksRef.current.style.opacity = String(flanksFade);
        heroFlanksRef.current.style.transform = `translateY(${
          -range(progress, 0, 0.1) * 18
        }px)`;
        heroFlanksRef.current.classList.toggle("is-hidden", flanksFade < 0.15);
      }

      const zoom = 0.72 + range(progress, 0.02, 0.92) * 0.52;
      if (portraitRef.current) {
        portraitRef.current.style.setProperty("--zoom", String(zoom));
        portraitRef.current.style.filter = `saturate(${
          1 + range(progress, 0.08, 0.5) * 0.1
        })`;
        portraitRef.current.style.setProperty(
          "--dial-rot",
          `${progress * 240}deg`
        );
      }

      let nextKey = "hero";
      let softwareAmt = 0;
      let tradingAmt = 0;

      for (const chapter of CHAPTERS) {
        const amount = beat(
          progress,
          chapter.enter,
          chapter.hold,
          chapter.end,
          chapter.exit
        );
        setPhase(phases[chapter.key].current, amount);
        if (amount > 0.25) nextKey = chapter.key;
        if (chapter.key !== "trading") softwareAmt = Math.max(softwareAmt, amount);
        else tradingAmt = amount;
      }

      if (sideEngineeringRef.current) {
        sideEngineeringRef.current.style.opacity = String(
          0.2 + softwareAmt * 0.45
        );
      }
      if (sideTradingRef.current) {
        sideTradingRef.current.style.opacity = String(0.18 + tradingAmt * 0.5);
      }

      const finalReveal = range(progress, 0.94, 0.98);
      if (finalLineRef.current) {
        finalLineRef.current.style.opacity = String(finalReveal);
        finalLineRef.current.style.transform = `translateY(${
          12 - finalReveal * 12
        }px)`;
        finalLineRef.current.classList.toggle("is-live", finalReveal > 0.4);
      }
      if (finalReveal > 0.4) nextKey = "final";

      setActiveKey(nextKey);

      if (modeLabelRef.current && lastLabel !== nextKey) {
        lastLabel = nextKey;
        modeLabelRef.current.textContent = LABELS[nextKey] || "Hero Mode";
        modeLabelRef.current.classList.remove("is-flash");
        void modeLabelRef.current.offsetWidth;
        modeLabelRef.current.classList.add("is-flash");

        const flash = story.querySelector(".scan-flash");
        if (flash) {
          flash.classList.remove("is-on");
          void flash.offsetWidth;
          flash.classList.add("is-on");
        }

        stage?.classList.remove("is-transforming");
        void stage?.offsetWidth;
        stage?.classList.add("is-transforming");
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateStory);
    };

    const onPointer = (event) => {
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      stage.style.setProperty("--mx", `${x}%`);
      stage.style.setProperty("--my", `${y}%`);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    stage?.addEventListener("pointermove", onPointer, { passive: true });
    updateStory();

    return () => {
      window.clearTimeout(readyTimer);
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      stage?.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return {
    storyRef,
    heroFlanksRef,
    portraitRef,
    sideEngineeringRef,
    sideTradingRef,
    modeLabelRef,
    introRef,
    eduRef,
    xpRef,
    projectsRef,
    githubRef,
    awardsRef,
    tradingRef,
    finalLineRef,
    progressBarRef,
    activeKey,
    progressPct,
    jumpTo,
  };
}
