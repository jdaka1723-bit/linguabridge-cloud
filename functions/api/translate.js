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

if (
  typeof target !== "string" ||
  !/^[a-z]{2,3}$/.test(target)
) {
  return Response.json(
    { error: "Please choose a valid target language." },
    { status: 400 }
  );
}

const sourceLanguage =
  typeof source === "string" &&
  /^[a-z]{2,3}$/.test(source)
    ? source
    : "auto";

const response = await fetch(
  "https://de.libretranslate.com/translate",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      q: q.trim(),
      source: sourceLanguage,
      target,
      format: "text",
      api_key: ""
    }),
    signal: AbortSignal.timeout(20000)
  }
);

const data = await response.json();

if (!response.ok) {
  return Response.json(
    {
      error:
        data.error ||
        "The free translation server is unavailable. Please try again later."
    },
    { status: 502 }
  );
}

const translatedText = data.translatedText;

if (
  typeof translatedText !== "string" ||
  !translatedText.trim()
) {
  return Response.json(
    { error: "The translation server returned no translation." },
    { status: 502 }
  );
}

return Response.json({ translatedText });

} catch (error) {
return Response.json(
{
error:
"Translation failed. The free translation server may be unavailable. Please try again."
},
{ status: 502 }
);
}
}
