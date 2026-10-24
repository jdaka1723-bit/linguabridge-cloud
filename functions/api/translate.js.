export async function onRequestPost({ request, env }) {
try {
const body = await request.json();
const { q, source, target } = body || {};

if (typeof q !== "string" || !q.trim()) {
  return Response.json(
    { error: "Enter text to translate." },
    { status: 400 }
  );
}

if (q.length > 5000) {
  return Response.json(
    { error: "Text must not exceed 5,000 characters." },
    { status: 413 }
  );
}

if (
  typeof target !== "string" ||
  !/^[a-z]{2,3}$/.test(target)
) {
  return Response.json(
    { error: "Choose a valid target language." },
    { status: 400 }
  );
}

const sourceLanguage = source || "auto";

const baseUrl = (
  env.LIBRETRANSLATE_URL || "https://libretranslate.com"
).replace(/\/+$/, "");

const payload = {
  q: q.trim(),
  source: sourceLanguage,
  target,
  format: "text"
};

if (env.LIBRETRANSLATE_API_KEY) {
  payload.api_key = env.LIBRETRANSLATE_API_KEY;
}

const response = await fetch(`${baseUrl}/translate`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify(payload),
  signal: AbortSignal.timeout(25000)
});

const data = await response.json().catch(() => ({}));

if (!response.ok) {
  return Response.json(
    {
      error:
        data.error ||
        "The translation service is unavailable. Check its URL and API key."
    },
    { status: 502 }
  );
}

if (typeof data.translatedText !== "string") {
  return Response.json(
    { error: "The translation service returned no valid translation." },
    { status: 502 }
  );
}

return Response.json({
  translatedText: data.translatedText
});

} catch (error) {
return Response.json(
{
error:
"Translation failed. Check the connection and translation service settings."
},
{ status: 502 }
);
}
}
