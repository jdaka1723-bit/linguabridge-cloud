const LANGUAGES = {
  en: "English",
  sn: "Shona",
  nd: "Ndebele",
  fr: "French",
  es: "Spanish",
  pt: "Portuguese",
  de: "German",
  it: "Italian",
  sw: "Swahili",
  ar: "Arabic",
  zh: "Chinese",
  hi: "Hindi",
  ja: "Japanese",
  ru: "Russian"
};

export async function onRequestPost({ request, env }) {
  try {
    let body;

    try {
      body = await request.json();
    } catch {
      return Response.json(
        { error: "Invalid request. Please try again." },
        { status: 400 }
      );
    }

    const { q, source = "auto", target } = body || {};

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

    if (!LANGUAGES[target]) {
      return Response.json(
        { error: "Please choose a supported target language." },
        { status: 400 }
      );
    }

    if (source !== "auto" && !LANGUAGES[source]) {
      return Response.json(
        { error: "Please choose a supported source language." },
        { status: 400 }
      );
    }

    if (!env.AI) {
      return Response.json(
        {
          error: "Cloudflare AI is not configured. Please check the AI binding."
        },
        { status: 500 }
      );
    }

const sourceLanguage =
  source === "auto"
    ? "Detect the source language automatically."
    : `The source language is ${LANGUAGES[source]}.`;

    const localLanguageGuidance = {
  sn: [
    "Translate into natural, grammatically correct Zimbabwean Shona (chiShona).",
    "Use everyday expressions that native Shona speakers understand.",
    "For a greeting such as 'Good morning, how are you?', use the appropriate Shona greeting, such as 'Mangwanani akanaka, wakadini?'",
    "Translate the complete meaning of the original text.",
    "Do not confuse Shona with Ndebele or another language.",
    "Do not invent words, repeat phrases, or add explanations.",
    "Return only the Shona translation."
  ],

  nd: [
    "Translate into natural, grammatically correct Zimbabwean Ndebele (isiNdebele).",
    "Use standard written isiNdebele and natural expressions used by native speakers.",
    "Preserve the complete meaning and tone of the original text.",
    "Do not translate into Shona or substitute isiZulu for isiNdebele.",
    "Do not invent words, repeat phrases, or add explanations.",
    "For greetings, use natural isiNdebele expressions appropriate to the context.",
    "If uncertain about a translation, do not invent a phrase.",
    "Return only the isiNdebele translation."
  ]
};

    const extraGuidance = localLanguageGuidance[target] || [
      "Use natural, grammatically correct language.",
      "Preserve the original meaning and tone."
    ];

    const prompt = [
      "TASK: Translate the supplied text.",
      `TARGET LANGUAGE: ${LANGUAGES[target]}.`,
      `SOURCE LANGUAGE: ${sourceLanguage}`,
      "",
      "TRANSLATION RULES:",
      "- Translate all of the supplied text.",
      "- Preserve meaning, tone, names, numbers, dates and punctuation.",
      "- Preserve line breaks and formatting where practical.",
      "- Do not summarize, explain, or add new information.",
      "- Return only the translated text.",
      "- If the source text is already in the target language, return it unchanged.",
      ...extraGuidance.map(rule => "- " + rule),
      "",
      "TEXT TO TRANSLATE:",
      text
    ].join("\n");

    const result = await env.AI.run(
     "@cf/meta/llama-3.1-8b-instruct-fp8",
      {
        messages: [
          {
            role: "system",
            content:
              "You are a careful professional translator. Follow the requested source and target languages. Never invent missing information. Return only the translation, without introductory phrases or explanations."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 2048,
        temperature: 0.1
      }
    );

    const translated =
      typeof result?.response === "string"
        ? result.response.trim()
        : "";

    if (!translated) {
      console.error("Cloudflare AI returned no translation.");

      return Response.json(
        { error: "The translation service returned no text. Please try again." },
        { status: 502 }
      );
    }

    return Response.json({
      translatedText: translated
    });

  } catch (error) {
    console.error("LinguaBridge translation error:", error);

    return Response.json(
      {
        error: "Translation failed. Please try again."
      },
      { status: 502 }
    );
  }
}