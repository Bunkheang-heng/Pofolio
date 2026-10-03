import { useEffect, useRef } from "react";

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);
const range = (value, start, end) => clamp((value - start) / (end - start));

function beat(progress, enter, hold, exit) {
  return range(progress, enter, hold) * (1 - range(progress, hold, exit));
}

function setPhase(element, amount) {
  if (!element) return;
  const lift = 18 - amount * 18;
  element.style.opacity = String(amount);
  element.style.transform = `translateY(${lift.toFixed(1)}px)`;
  element.style.pointerEvents = amount > 0.2 ? "auto" : "none";
}

export function useScrollStory() {
  const storyRef = useRef(null);
  const heroFlanksRef = useRef(null);
  const portraitRef = useRef(null);
  const sideEngineeringRef = useRef(null);
  const sideTradingRef = useRef(null);
  const softwarePhaseRef = useRef(null);
  const tradingPhaseRef = useRef(null);
  const finalLineRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const updateStory = () => {
      const story = storyRef.current;
      if (!story) return;

      const maxScroll = story.offsetHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;

      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }

      const flanksFade = 1 - range(progress, 0.04, 0.16);
      if (heroFlanksRef.current) {
        heroFlanksRef.current.style.opacity = String(flanksFade);
        heroFlanksRef.current.style.transform = `translateY(${
          -range(progress, 0, 0.18) * 16
        }px)`;
      }

      const zoom = 0.78 + range(progress, 0.04, 0.7) * 0.42;
      if (portraitRef.current) {
        portraitRef.current.style.transform = `translate(-50%, -50%) scale(${zoom})`;
        portraitRef.current.style.filter = `saturate(${
          1 + range(progress, 0.12, 0.5) * 0.12
        })`;
      }

      // One by one: software first (around image), then trading
      const softwareReveal = beat(progress, 0.16, 0.28, 0.5);
      const tradingReveal = beat(progress, 0.52, 0.64, 0.84);
      setPhase(softwarePhaseRef.current, softwareReveal);
      setPhase(tradingPhaseRef.current, tradingReveal);

      if (sideEngineeringRef.current) {
        sideEngineeringRef.current.style.opacity = String(
          0.45 + softwareReveal * 0.4
        );
      }
      if (sideTradingRef.current) {
        sideTradingRef.current.style.opacity = String(
          0.35 + tradingReveal * 0.45
        );
      }

      const finalReveal = range(progress, 0.86, 0.95);
      if (finalLineRef.current) {
        finalLineRef.current.style.opacity = String(finalReveal);
        finalLineRef.current.style.transform = `translateY(${
          16 - finalReveal * 16
        }px) scale(${0.96 + finalReveal * 0.04})`;
      }
    };

    window.addEventListener("scroll", updateStory, { passive: true });
    window.addEventListener("resize", updateStory);
    updateStory();

    return () => {
      window.removeEventListener("scroll", updateStory);
      window.removeEventListener("resize", updateStory);
    };
  }, []);

  return {
    storyRef,
    heroFlanksRef,
    portraitRef,
    sideEngineeringRef,
    sideTradingRef,
    softwarePhaseRef,
    tradingPhaseRef,
    finalLineRef,
    progressBarRef,
  };
}
