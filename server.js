const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;
const TRANSLATE_URL = (process.env.LIBRETRANSLATE_URL || "https://libretranslate.com").replace(/\/$/, "");
const API_KEY = process.env.LIBRETRANSLATE_API_KEY || "";

app.use(express.json({ limit: "100kb" }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (_req, res) => res.json({ ok: true, provider: "LibreTranslate" }));

app.post("/api/translate", async (req, res) => {
  try {
    const { text, source, target } = req.body || {};
    if (typeof text !== "string" || !text.trim()) {
      return res.status(400).json({ error: "Enter text to translate." });
    }
    if (text.length > 5000) {
      return res.status(413).json({ error: "Please keep each translation under 5,000 characters." });
    }
    if (!target || typeof target !== "string") {
      return res.status(400).json({ error: "Choose a target language." });
    }
    const payload = { q: text, source: source || "auto", target };
    if (API_KEY) payload.api_key = API_KEY;
    const response = await fetch(`${TRANSLATE_URL}/translate`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(30000)
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const message = data.error || `Translation provider returned HTTP ${response.status}.`;
      return res.status(502).json({ error: `${message} Check your LibreTranslate URL or API key in the hosting settings.` });
    }
    if (typeof data.translatedText !== "string") {
      return res.status(502).json({ error: "The translation provider returned an unexpected response." });
    }
    res.json({ translatedText: data.translatedText });
  } catch (error) {
    res.status(502).json({ error: "Could not reach the translation service. Check the hosting configuration and try again." });
  }
});

app.get("*", (_req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));
app.listen(PORT, "0.0.0.0", () => console.log(`LinguaBridge listening on ${PORT}`));