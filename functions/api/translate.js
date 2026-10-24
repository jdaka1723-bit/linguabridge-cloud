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

const text = q.trim();

if (text.length > 5000) {
  return Response.json(
    { error: "Text must not exceed 5,000 characters." },
    { status: 413 }
  );
}

if (
  typeof target !== "string" ||
  !/^[a-z]{2,3}$/i.test(target)
) {
  return Response.json(
    { error: "Please choose a valid target language." },
    { status: 400 }
  );
}

const sourceLanguage =
  typeof source === "string" &&
  /^[a-z]{2,3}$/i.test(source) &&
  source.toLowerCase() !== "auto"
    ? source.toLowerCase()
    : "autodetect";

// Split text into chunks of no more than 450 UTF-8 bytes.
// This leaves room below MyMemory's 500-byte limit.
function splitText(input, maxBytes = 450) {
  const chunks = [];
  let current = "";

  for (const word of input.match(/\S+\s*/g) || []) {
    const candidate = current + word;
    const size = new TextEncoder().encode(candidate).length;

    if (size > maxBytes && current) {
      chunks.push(current.trim());
      current = word;
    } else {
      current = candidate;
    }

    if (new TextEncoder().encode(current).length > maxBytes) {
      throw new Error(
        "A single word is too long to translate."
      );
    }
  }

  if (current.trim()) {
    chunks.push(current.trim());
  }

  return chunks;
}

const chunks = splitText(text);
const translations = [];

for (const chunk of chunks) {
  const params = new URLSearchParams({
    q: chunk,
    langpair: `${sourceLanguage}|${target.toLowerCase()}`
  });

  const response = await fetch(
    `https://api.mymemory.translated.net/get?${params}`,
    {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(20000)
    }
  );

  if (!response.ok) {
  const details = await response.text();

  return Response.json(
    {
      error: "MyMemory HTTP " + response.status,
      details: details.slice(0, 500)
    },
    { status: 502 }
  );
}

  const data = await response.json();

  if (
    data.quotaFinished === true ||
    data.responseStatus === 429
  ) {
    return Response.json(
      {
        error:
          "The free translation limit has been reached. Please try again later."
      },
      { status: 429 }
    );
  }

  if (data.responseStatus !== 200) {
    return Response.json(
      {
        error:
          data.responseDetails ||
          "The translation service could not translate this text."
      },
      { status: 502 }
    );
  }

  const translated = data.responseData?.translatedText;

  if (
    typeof translated !== "string" ||
    !translated.trim()
  ) {
    return Response.json(
      {
        error: "The translation service returned no translation."
      },
      { status: 502 }
    );
  }

  translations.push(translated.trim());
}

return Response.json({
  translatedText: translations.join(" ")
});

} catch (error) {
return Response.json(
{
error:
error.name === "TimeoutError"
? "The translation service took too long to respond. Please try again."
: "Translation failed. Please check your connection and try again.",
details: String(error.message || error).slice(0, 300)
error. status: 502 }
);
}
}