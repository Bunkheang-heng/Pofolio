import { useScrollStory } from "./hooks/useScrollStory";
import {
  featuredProjects,
  githubStats,
  modes,
  moreProjects,
} from "./data/githubProjects";

const schools = [
  {
    logo: "/images/mark-fhsu.png",
    short: "FHSU",
    name: "Fort Hays State University",
    degree: "B.S. Computer Science",
    note: "Partnership with AUPP",
  },
  {
    logo: "/images/mark-aupp.png",
    short: "AUPP",
    name: "American University of Phnom Penh",
    degree: "B.S. IT Management",
    note: "Phnom Penh",
  },
];

const experiences = [
  {
    role: "Developer",
    org: "Save the Children Cambodia",
    time: "Jan 2024",
    points: ["Positive Parenting — React + Firebase", "Messenger chatbot — Python + Flask"],
  },
  {
    role: "Cybersecurity",
    org: "ASEAN Cyber Shield",
    time: "2024–2025",
    points: ["ML phishing detection + VirusTotal", "Selected 14 of 300 for Korea"],
  },
];

const awards = [
  "WRO Future Engineer 2025",
  "Cybersecurity CTF 2024",
  "Clean Energy Hackathon 2023",
  "Turing Hackathon 2023",
  "Novathon 2023",
];

const stack = ["React", "Next", "Nest", "Python", "Flask", "Firebase", "AWS", "AI"];

const plays = [
  ["FVG", "Fair value gap. Price leaves an imbalance and often returns."],
  ["OB", "Order block. Last opposing candle before displacement."],
  ["Sweep", "Liquidity sweep. Wick takes the stops, then reverses."],
  ["BOS", "Break of structure. The trend pushes through a swing."],
  ["CHoCH", "Change of character. First break the other way."],
  ["POI", "Point of interest. The zone you wait to trade from."],
  ["Breaker", "A failed order block that flips and holds."],
  ["EQH", "Equal highs. Buy-side liquidity resting above."],
  ["EQL", "Equal lows. Sell-side liquidity resting below."],
  ["Premium", "Expensive half of the dealing range."],
  ["Discount", "Cheap half of the dealing range."],
  ["Mitigation", "Price returns to fill the unfilled orders."],
  ["Inducement", "A trap swing that pulls price into the real zone."],
  ["Imbalance", "One-sided candles. The gap the market likes to close."],
];

const pairs = [
  ["XAU", "XAUUSD", "Gold"],
  ["EUR", "EURUSD", "Euro"],
  ["GBP", "GBPUSD", "Cable"],
  ["BTC", "BTC", "Bitcoin"],
  ["ETH", "ETH", "Ethereum"],
  ["SOL", "SOL", "Solana"],
];

function CodeMarks() {
  const icon = "h-7 w-7";
  return (
    <div className="mt-4 flex flex-wrap gap-4 text-white" aria-label="Code stack">
      <span className="flex flex-col items-center gap-1">
        <svg viewBox="0 0 32 32" className={icon} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
          <ellipse cx="16" cy="16" rx="6" ry="13" />
          <ellipse cx="16" cy="16" rx="6" ry="13" transform="rotate(60 16 16)" />
          <ellipse cx="16" cy="16" rx="6" ry="13" transform="rotate(120 16 16)" />
          <circle cx="16" cy="16" r="2.2" fill="currentColor" stroke="none" />
        </svg>
        <span className="font-dial text-[8px] tracking-[0.16em]">REACT</span>
      </span>
      <span className="flex flex-col items-center gap-1">
        <svg viewBox="0 0 32 32" className={icon} aria-hidden="true">
          <rect x="4" y="4" width="24" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <text x="16" y="21" textAnchor="middle" fill="currentColor" fontSize="11" fontFamily="Orbitron, sans-serif">JS</text>
        </svg>
        <span className="font-dial text-[8px] tracking-[0.16em]">JS</span>
      </span>
      <span className="flex flex-col items-center gap-1">
        <svg viewBox="0 0 32 32" className={icon} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
          <circle cx="12" cy="11" r="5" />
          <circle cx="20" cy="21" r="5" />
          <path d="M12 16v8M20 8v8" />
        </svg>
        <span className="font-dial text-[8px] tracking-[0.16em]">PYTHON</span>
      </span>
      <span className="flex flex-col items-center gap-1">
        <svg viewBox="0 0 32 32" className={icon} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
          <path d="M8 24V8l8 10 8-10v16" />
        </svg>
        <span className="font-dial text-[8px] tracking-[0.16em]">NEXT</span>
      </span>
      <span className="flex flex-col items-center gap-1">
        <svg viewBox="0 0 32 32" className={icon} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
          <path d="M16 5c2 5 8 7 8 13a8 8 0 1 1-16 0c0-3 2-5 3-7 1 3 3 4 5 4-1-3 0-7 0-10z" />
        </svg>
        <span className="font-dial text-[8px] tracking-[0.16em]">FIREBASE</span>
      </span>
    </div>
  );
}

function PriceGraph() {
  return (
    <svg viewBox="0 0 240 78" className="mt-3 h-[72px] w-full" role="img" aria-label="Price graph">
      <path d="M0 62H240" stroke="rgba(255,255,255,0.18)" />
      <path d="M0 50H240M0 34H240M0 18H240" stroke="rgba(255,255,255,0.06)" />
      <path
        d="M0 58C28 56 36 40 58 42s28-22 48-16 28 18 48 6 36-28 54-22 22 8 32-6"
        fill="none"
        stroke="#fff"
        strokeWidth="1.6"
        className="spark-line"
      />
      <path
        d="M0 58C28 56 36 40 58 42s28-22 48-16 28 18 48 6 36-28 54-22 22 8 32-6V78H0Z"
        fill="rgba(255,255,255,0.06)"
        stroke="none"
      />
    </svg>
  );
}

function SetupMark({ name, children }) {
  return (
    <figure className="m-0">
      <svg viewBox="0 0 120 64" className="h-14 w-full" aria-hidden="true">
        {children}
      </svg>
      <figcaption className="mt-1 font-dial text-[9px] tracking-[0.16em] text-white">{name}</figcaption>
    </figure>
  );
}

function SetupMarks() {
  return (
    <div className="mt-3 grid grid-cols-3 gap-2">
      <SetupMark name="FVG">
        <line x1="22" y1="8" x2="22" y2="56" stroke="#fff" />
        <rect x="14" y="16" width="16" height="28" fill="none" stroke="#fff" />
        <rect x="42" y="22" width="36" height="14" fill="rgba(57,255,20,0.2)" stroke="#39ff14" />
        <line x1="98" y1="10" x2="98" y2="54" stroke="#fff" />
        <rect x="90" y="12" width="16" height="18" fill="#fff" />
      </SetupMark>
      <SetupMark name="OB">
        <rect x="16" y="28" width="18" height="22" fill="rgba(57,255,20,0.2)" stroke="#39ff14" />
        <line x1="25" y1="18" x2="25" y2="56" stroke="#fff" />
        <path d="M40 46 L58 30 L76 34 L100 12" fill="none" stroke="#fff" strokeWidth="1.4" />
      </SetupMark>
      <SetupMark name="SWEEP">
        <path d="M8 24 H112" stroke="#fff" strokeDasharray="3 3" />
        <line x1="78" y1="10" x2="78" y2="54" stroke="#fff" />
        <rect x="70" y="28" width="16" height="18" fill="#fff" />
        <path d="M16 48 H40 M16 40 H34" stroke="rgba(255,255,255,0.45)" />
      </SetupMark>
    </div>
  );
}

function Playbook() {
  return (
    <div className="mt-3">
      {plays.map(([code, line]) => (
        <p key={code} className="m-0 grid grid-cols-[78px_1fr] gap-2 border-b border-white/15 py-1">
          <strong className="font-dial text-[10px] tracking-[0.08em] text-white">{code}</strong>
          <span className="text-sm leading-tight text-white/75">{line}</span>
        </p>
      ))}
    </div>
  );
}

const leftCol =
  "absolute z-20 max-[1199px]:left-5 max-[1199px]:right-5 max-[1199px]:top-[4.5rem] min-[1200px]:left-[4vw] min-[1200px]:top-1/2 min-[1200px]:w-[min(24vw,320px)] min-[1200px]:-translate-y-1/2";

const rightCol =
  "absolute z-20 max-[1199px]:bottom-[4.6rem] max-[1199px]:left-4 max-[1199px]:right-4 max-[1199px]:max-h-[32vh] max-[1199px]:overflow-y-auto min-[1200px]:right-[4vw] min-[1200px]:top-1/2 min-[1200px]:w-[min(30vw,420px)] min-[1200px]:-translate-y-1/2";

const kicker = "font-dial text-[10px] tracking-[0.32em] text-white/70 uppercase";

const title =
  "mt-1 font-display text-[clamp(3.2rem,6.4vw,6.2rem)] font-extrabold uppercase leading-[0.82] text-white";

function RowLink({ project }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      className="grid grid-cols-[42px_1fr_auto] items-baseline gap-3 border-b border-white/15 py-2.5"
    >
      <span className="font-dial text-[9px] tracking-[0.14em] text-white/60">{project.tag}</span>
      <span>
        <strong className="block font-body text-[1.05rem] font-semibold text-white">
          {project.name}
        </strong>
        <span className="text-[0.95rem] text-white/70">{project.detail}</span>
      </span>
      <span className="text-white/70">↗</span>
    </a>
  );
}

export default function App() {
  const {
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
  } = useScrollStory();

  const mode = modes.find((m) => m.key === activeKey);

  return (
    <main className="scroll-story" ref={storyRef}>
      <div className={`stage${activeKey === "hero" ? " is-hero" : ""}`}>
        <header className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-[clamp(16px,4vw,48px)] py-5">
          <p className="m-0 font-dial text-[10px] tracking-[0.28em] text-white uppercase">
            Omnitrix
          </p>
          <p className="pointer-events-none m-0 hidden font-dial text-[9px] tracking-[0.22em] text-white/70 min-[1200px]:block">
            OB · SWEEP · FVG · BOS · XAUUSD
          </p>
          <p className="m-0 font-body text-sm tracking-[0.08em] text-white">
            {mode?.label ?? "Hero"} · {pct}%
          </p>
        </header>

        <div className="portrait" ref={portraitRef}>
          <div className="watch" aria-hidden="true">
            <span className="watch-spin">
              <b />
            </span>
          </div>
          <img
            className="relative z-10 h-full w-full object-contain object-bottom"
            src="/images/me.png"
            alt="Bun Kheang Heng"
          />
          <div
            className="absolute left-1/2 top-[70%] z-20 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-omni bg-[#0b100b] shadow-[0_0_22px_rgba(57,255,20,0.45)] max-[1199px]:top-[66%]"
            aria-hidden="true"
          >
            <span className="hourglass" />
          </div>
        </div>

        <section className="absolute inset-0 z-10" ref={heroRef}>
          <div className={leftCol}>
            <p className={kicker}>Engineer · Trader</p>
            <h1 className="m-0 mt-2 font-display text-[clamp(3.4rem,8vw,7.4rem)] font-extrabold uppercase leading-[0.78] text-white max-[1199px]:text-[3.3rem]">
              Bun
              <br />
              Kheang
              <br />
              Heng
            </h1>
            <p className="mt-4 max-w-[16rem] text-lg leading-snug text-white/80 max-[1199px]:hidden">
              23. Phnom Penh. Builds software by day and trades with a plan.
            </p>
            <button
              type="button"
              className="mt-6 font-dial text-[11px] tracking-[0.22em] text-white uppercase"
              onClick={() => jumpTo("about")}
            >
              Scroll to transform ↓
            </button>
            <div className="mt-5 flex flex-wrap gap-2 min-[1200px]:hidden">
              {["REACT", "OB", "SWEEP", "FVG", "XAUUSD"].map((chip) => (
                <span
                  key={chip}
                  className="border border-white/20 px-2 py-1 font-dial text-[9px] tracking-[0.14em] text-white"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
          <aside className={`${rightCol} max-[1199px]:hidden`}>
            <p className={kicker}>Code</p>
            <CodeMarks />
            <p className={`${kicker} mt-5`}>XAUUSD</p>
            <PriceGraph />
            <p className="mt-3 font-display text-5xl leading-none text-white">
              {githubStats.public}
              <span className="ml-2 font-body text-base tracking-normal text-white/70">
                public repos
              </span>
            </p>
          </aside>
        </section>

        <section className="phase absolute inset-0 z-10" ref={aboutRef}>
          <div className={`${leftCol} max-[1199px]:hidden`}>
            <p className="font-display text-[7rem] leading-none text-white/15">01</p>
          </div>
          <div className={rightCol}>
            <p className={kicker}>Software</p>
            <h2 className={title}>
              Code
              <br />
              first.
            </h2>
            <p className="mt-4 text-lg leading-snug text-white/80">
              Dual degrees. Full-stack products. Security work with AI in the loop.
            </p>
            <CodeMarks />
            <PriceGraph />
          </div>
        </section>

        <section className="phase absolute inset-0 z-10" ref={eduRef}>
          <div className={`${leftCol} max-[1199px]:hidden`}>
            <p className="font-display text-[7rem] leading-none text-white/15">02</p>
          </div>
          <div className={rightCol}>
            <p className={kicker}>Education</p>
            <h2 className={title}>
              Two
              <br />
              degrees.
            </h2>
            <div className="mt-5 grid gap-4">
              {schools.map((s) => (
                <article key={s.short} className="flex gap-3 border-b border-white/15 pb-4">
                  <img className="h-11 w-11 object-contain" src={s.logo} alt="" />
                  <div>
                    <p className="m-0 font-dial text-[10px] tracking-[0.18em] text-white/60">
                      {s.short}
                    </p>
                    <h3 className="m-0 mt-0.5 font-body text-lg font-semibold text-white">
                      {s.name}
                    </h3>
                    <p className="m-0 text-white/75">
                      {s.degree} · {s.note}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="phase absolute inset-0 z-10" ref={xpRef}>
          <div className={`${leftCol} max-[1199px]:hidden`}>
            <p className="font-display text-[7rem] leading-none text-white/15">03</p>
          </div>
          <div className={rightCol}>
            <p className={kicker}>Experience</p>
            <h2 className={title}>
              Shipped
              <br />
              work.
            </h2>
            <div className="mt-4 grid gap-4">
              {experiences.map((item) => (
                <article key={item.org}>
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="m-0 font-body text-lg font-semibold text-white">{item.role}</h3>
                    <span className="font-dial text-[10px] tracking-[0.12em] text-white/55">
                      {item.time}
                    </span>
                  </div>
                  <p className="m-0 text-white/80">{item.org}</p>
                  <p className="m-0 mt-1 text-white/70">{item.points.join(" · ")}</p>
                </article>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/65">{awards.join(" · ")}</p>
          </div>
        </section>

        <section className="phase absolute inset-0 z-10" ref={workRef}>
          <div className={`${leftCol} max-[1199px]:hidden`}>
            <p className="font-display text-[7rem] leading-none text-white/15">04</p>
            <a
              className="mt-2 inline-block font-dial text-[10px] tracking-[0.16em] text-white uppercase"
              href={githubStats.profile}
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
          </div>
          <div className={rightCol}>
            <p className={kicker}>Builds</p>
            <h2 className={`${title} min-[1200px]:text-[clamp(2.6rem,4vw,4.2rem)]`}>Featured.</h2>
            <div className="mt-2">
              {featuredProjects.map((p) => (
                <RowLink key={p.name} project={p} />
              ))}
            </div>
          </div>
        </section>

        <section className="phase absolute inset-0 z-10" ref={labRef}>
          <div className={`${leftCol} max-[1199px]:hidden`}>
            <p className="font-display text-[7rem] leading-none text-white/15">05</p>
          </div>
          <div className={rightCol}>
            <p className={kicker}>Lab</p>
            <h2 className={`${title} min-[1200px]:text-[clamp(2.6rem,4vw,4.2rem)]`}>Also live.</h2>
            <p className="mt-3 text-white/70">{stack.join(" · ")}</p>
            <div className="mt-2">
              {moreProjects.map((p) => (
                <RowLink key={p.name} project={p} />
              ))}
            </div>
          </div>
        </section>

        <section className="phase absolute inset-0 z-10" ref={tradingRef}>
          <div className={`${leftCol} max-[1199px]:hidden min-[1200px]:max-h-[72vh] min-[1200px]:overflow-y-auto`}>
            <p className={kicker}>Playbook</p>
            <h2 className="m-0 mt-1 font-display text-[clamp(2.2rem,3.4vw,3.1rem)] font-extrabold uppercase leading-[0.85] text-white">
              Structure.
            </h2>
            <SetupMarks />
            <Playbook />
          </div>
          <div className={`${rightCol} min-[1200px]:max-h-[72vh] min-[1200px]:overflow-y-auto`}>
            <p className={kicker}>Markets</p>
            <h2 className={`${title} min-[1200px]:text-[clamp(2.4rem,3.6vw,3.6rem)]`}>
              XAUUSD
              <br />
              and coins.
            </h2>
            <div className="min-[1200px]:hidden">
              <SetupMarks />
              <Playbook />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {pairs.map(([mark, sym, name]) => (
                <div key={sym} className="flex items-center gap-2 border border-white/15 px-2 py-2">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/50 font-dial text-[8px] tracking-[0.04em] text-white">
                    {mark}
                  </span>
                  <span>
                    <strong className="block text-sm leading-none text-white">{sym}</strong>
                    <span className="text-xs text-white/60">{name}</span>
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm text-white/65">
              Risk first. SuperFx Agent. Ben10-Fx vaults and EAs.
            </p>
          </div>
        </section>

        <section
          className="contact absolute inset-0 z-20 flex flex-col items-center justify-end px-6 pb-28 text-center min-[1200px]:justify-center min-[1200px]:pb-0"
          ref={contactRef}
        >
          <p className={kicker}>Contact</p>
          <h2 className="m-0 mt-2 font-display text-[clamp(4rem,9vw,8rem)] font-extrabold uppercase leading-[0.8] text-white">
            Hero
            <br />
            time.
          </h2>
          <div className="mt-6 flex flex-col items-center gap-2 text-lg text-white">
            <a href="mailto:bunkheangheng99@gmail.com">bunkheangheng99@gmail.com</a>
            <a href="tel:+855973556059">097-355-6059</a>
            <a href={githubStats.profile} target="_blank" rel="noreferrer">
              github.com/Bunkheang-heng
            </a>
          </div>
        </section>

        <nav
          className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-1"
          aria-label="Sections"
        >
          {modes.map((m) => {
            const on = activeKey === m.key;
            return (
              <button
                key={m.key}
                type="button"
                className="flex w-11 flex-col items-center gap-1.5"
                onClick={() => jumpTo(m.key)}
                title={m.label}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${on ? "bg-omni shadow-[0_0_10px_#39ff14]" : "bg-white/35"}`}
                />
                <span className={`font-dial text-[8px] tracking-[0.12em] uppercase ${on ? "text-white" : "text-white/45"}`}>
                  {m.label}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="progress absolute bottom-0 left-0 right-0 z-30 h-px bg-white/15" aria-hidden="true">
          <span ref={progressRef} className="block h-full w-full bg-white" />
        </div>
      </div>
    </main>
  );
}
