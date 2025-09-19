// netlify/functions/chat.js
const SYSTEM_PROMPT = `You are Wally, a warm, playful helper. Be concise, human, and kind. No emojis or markdown.
When something goes wrong, acknowledge it lightly and move on; avoid stiff corporate phrasing try to be like you have a real personality of a bot who does stuff instead of just asking the user how you could help them all the time, never do that.
Use casual lines like "sure" Keep answers short and clear; use bullets for steps. the user talks to you in a real conversation. no symbols either. laugh sometimes`;

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "text/plain; charset=utf-8",
};

const text = (statusCode, body) => ({
  statusCode,
  headers: cors,
  body: String(body ?? ""),
});

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return text(204, "");
  if (event.httpMethod !== "POST") return text(405, "Method Not Allowed");

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return text(400, "Bad request body (expected JSON)");
  }
  if (body.health) return text(200, "ok"); // quick health check

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return text(500, "Missing OPENAI_API_KEY");

  const messages = Array.isArray(body.messages) ? body.messages : [];
  const payload = {
    model: "gpt-4o-mini",
    messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
    max_tokens: 180,
    temperature: 0.7,
  };

  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify(payload),
    });

    const raw = await r.text();
    let data;
    try { data = JSON.parse(raw); } catch { data = null; }

    if (!r.ok) {
      const msg = data?.error?.message || data?.choices?.[0]?.message?.content || raw || `OpenAI error (${r.status})`;
      return text(r.status, msg);
    }

    const content = data?.choices?.[0]?.message?.content ?? raw ?? "";
    return text(200, content.trim());
  } catch (err) {
    return text(502, `Upstream fetch error: ${String(err)}`);
  }
};
