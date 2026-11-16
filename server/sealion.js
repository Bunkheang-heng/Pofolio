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

export async function askSealion(messages, ipHeader) {
  if (!allow(clientKey(ipHeader))) {
    const error = new Error("Too many questions. Wait a minute and try again.");
    error.status = 429;
    throw error;
  }

  const key = (process.env.SEALION_API_KEY || "").trim();
  if (!key || key === "undefined") {
    const error = new Error("The assistant is not connected yet.");
    error.status = 503;
    throw error;
  }

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
      messages: [{ role: "system", content: profilePrompt }, ...cleanMessages(messages)],
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const denied = response.status === 401 || response.status === 403;
    const error = new Error(
      response.status === 429
        ? "SEA-LION is busy. Try again in a minute."
        : denied
          ? "The SEA-LION key was rejected. Check SEALION_API_KEY."
          : "SEA-LION could not answer that.",
    );
    error.status = response.status === 429 ? 429 : denied ? 503 : 502;
    throw error;
  }

  const reply = data?.choices?.[0]?.message?.content?.trim();
  if (!reply) {
    const error = new Error("SEA-LION returned an empty answer.");
    error.status = 502;
    throw error;
  }
  return reply;
}
