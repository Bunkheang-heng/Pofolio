import { profilePrompt } from "./profile.js";

const MODEL = process.env.SEALION_MODEL || "aisingapore/Qwen-SEA-LION-v4.5-27B-IT";
const hits = new Map();

function clientKey(header) {
  const forwarded = header || "";
  return forwarded.split(",")[0].trim() || "local";
}

function allow(key) {
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((t) => now - t < 60_000);
  if (recent.length >= 8) return false;
  recent.push(now);
  hits.set(key, recent);
  return true;
}

function cleanMessages(input) {
  if (!Array.isArray(input) || input.length === 0) {
    const error = new Error("Send a question.");
    error.status = 400;
    throw error;
  }
  return input.slice(-8).map((message) => {
    const role = message?.role === "assistant" ? "assistant" : "user";
    const content = String(message?.content || "").trim().slice(0, 800);
    if (!content) {
      const error = new Error("Send a question.");
      error.status = 400;
      throw error;
    }
    return { role, content };
  });
}

function getLocalProfileReply(messages) {
  const query = (messages[messages.length - 1]?.content || "").toLowerCase();

  if (query.includes("freelance") || query.includes("sansom") || query.includes("reeltime") || query.includes("loan") || query.includes("movie")) {
    return "Bun Kheang has built several freelance systems, notably SanSom (a comprehensive loan management platform featuring automated interest calculation and repayment tracking) and REELTIME Media (a modern movie discovery web platform and cross-platform mobile application).";
  }
  if (query.includes("study") || query.includes("school") || query.includes("university") || query.includes("degree") || query.includes("education")) {
    return "Bun Kheang holds dual degrees: a Bachelor of Computer Science from Fort Hays State University (FHSU) in partnership with AUPP, and a Bachelor of IT Management from the American University of Phnom Penh (AUPP).";
  }
  if (query.includes("trade") || query.includes("trading") || query.includes("forex") || query.includes("fx") || query.includes("ea")) {
    return "Bun Kheang is an active trader and algorithmic strategy developer focusing on SMC (Smart Money Concepts), ICT, MSNR, BBMA, and trend-following across XAUUSD, EURUSD, and major cryptocurrencies. He builds custom Expert Advisors (EAs) and quantitative backtesting tools in MQL5 and Python.";
  }
  if (query.includes("cyber") || query.includes("security") || query.includes("acs") || query.includes("korea") || query.includes("ctf") || query.includes("shield")) {
    return "In cybersecurity, Bun Kheang was selected as 1 of only 14 students across the entire ASEAN region (out of 300 candidates) for the ASEAN Cyber Shield (ACS) physical bootcamp in South Korea. He also won 2nd Place in the competitive Cybersecurity Capture The Flag (CTF) 2024 tournament.";
  }
  if (query.includes("build") || query.includes("project") || query.includes("product")) {
    return "Bun Kheang builds full-stack applications, AI tools, and trading systems. Key highlights include QuickResume (AI resume builder), STEMii (STEM education platform), SakRean (career matching for students), Phishing Detection (ML classifier), SanSom (loan management), and REELTIME Media.";
  }
  if (query.includes("stack") || query.includes("skill") || query.includes("tech") || query.includes("language")) {
    return "Bun Kheang's primary stack includes JavaScript (React, Next.js), Python (Flask, FastAPI, machine learning), Node.js, SQL (PostgreSQL), Firebase, Docker, AWS, Kali Linux, and MQL5.";
  }
  if (query.includes("contact") || query.includes("hire") || query.includes("email") || query.includes("phone")) {
    return "You can reach Bun Kheang directly at bunkheangheng99@gmail.com, call +855 097-355-6059, or explore his GitHub at https://github.com/Bunkheang-heng. He is based in Phnom Penh and open to remote opportunities.";
  }
  return "Bun Kheang Heng is a software engineer, cybersecurity researcher, and algorithmic trader based in Phnom Penh, Cambodia. Ask about his software products (QuickResume, SanSom, REELTIME Media), dual degrees (FHSU & AUPP), cybersecurity achievements, or trading world!";
}

export async function askSealion(messages, ipHeader) {
  if (!allow(clientKey(ipHeader))) {
    const error = new Error("Too many questions. Wait a minute and try again.");
    error.status = 429;
    throw error;
  }

  const cleaned = cleanMessages(messages);
  const key = (process.env.SEALION_API_KEY || "").trim();
  if (!key || key === "undefined") {
    return getLocalProfileReply(cleaned);
  }

  try {
    const response = await fetch("https://api.sea-lion.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.3,
        max_tokens: 450,
        messages: [{ role: "system", content: profilePrompt }, ...cleaned],
      }),
    });

    const data = await response.json().catch(() => ({}));
    const reply = data?.choices?.[0]?.message?.content?.trim();
    if (reply) return reply;
    return getLocalProfileReply(cleaned);
  } catch (_e) {
    return getLocalProfileReply(cleaned);
  }
}
