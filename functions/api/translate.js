export async function onRequestPost({ request }) {
try {
const body = await request.json();
const { q, source, target } = body || {};

if (typeof q !== "string" || !q.trim()) {
  return Response.json(
    { error: "Please enter text to translate." },
    { status: 400 }
  );
}

if (q.length > 5000) {
  return Response.json(
    { error: "Text must not exceed 5,000 characters." },
    { status: 413 }
  );
}

if (typeof target !== "string" || !/^[a-z]{2,3}$/.test(target)) {
  return Response.json(
    { error: "Please choose a valid target language." },
    { status: 400 }
  );
}

const sourceLanguage =
  typeof source === "string" &&
  /^[a-z]{2,3}$/.test(source) &&
  source !== "auto"
    ? source
    : "en";

const text = q.trim();

if (new TextEncoder().encode(text).length > 500) {
  return Response.json(
    { error: "Please translate shorter text (maximum 500 bytes per request)." },
    { status: 413 }
  );
}

const params = new URLSearchParams({
  q: text,
  langpair: `${sourceLanguage}|${target}`
});

const response = await fetch(
  `https://api.mymemory.translated.net/get?${params.toString()}`,
  {
    method: "GET",
    headers: { "Accept": "application/json" },
    signal: AbortSignal.timeout(20000)
  }
);

const data = await response.json();

if (!response.ok || data.responseStatus !== 200) {
  return Response.json(
    { error: data.responseDetails || "The translation service could not translate this text." },
    { status: 502 }
  );
}

const translatedText = data.responseData?.translatedText;

if (typeof translatedText !== "string" || !translatedText.trim()) {
  return Response.json(
    { error: "The translation service returned no translation." },
    { status: 502 }
  );
}

return Response.json({ translatedText });

} catch (error) {
return Response.json(
{ error: "Translation failed. Please check your internet connection and try again." },
{ status: 502 }
);
}
}