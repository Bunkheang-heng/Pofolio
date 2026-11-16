import { askSealion } from "../server/sealion.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Use POST." });
    return;
  }

  try {
    const reply = await askSealion(req.body?.messages, req.headers["x-forwarded-for"]);
    res.status(200).json({ reply });
  } catch (error) {
    res.status(error.status || 500).json({
      error: error.message || "SEA-LION could not answer.",
    });
  }
}
