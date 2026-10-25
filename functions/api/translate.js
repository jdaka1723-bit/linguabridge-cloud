export async function onRequestPost({ request, env }) {
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

    const languages = {
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

    if (!languages[target]) {
      return Response.json(
        { error: "Please choose a supported target language." },
        { status: 400 }
      );
    }

    if (
      source !== "auto" &&
      !languages[source]
    ) {
      return Response.json(
        { error: "Please choose a supported source language." },
        { status: 400 }
      );
    }

    if (!env.AI) {
      return Response.json(
        {
          error: "Cloudflare Workers AI is not configured. Check the AI binding."
        },
        { status: 500 }
      );
    }

    const sourceInstruction = source === "auto"
      ? "Identify the source language automatically."
      : "The source language is " + languages[source] + ".";

    const prompt = [
      "You are a professional translator.",
      "Translate the text into " + languages[target] + ".",
      sourceInstruction,
      "Preserve the meaning, tone, names, numbers, and formatting.",
      "For Shona and Ndebele, use natural language where supported.",
      "Return only the translation, without explanations or quotation marks.",
      "",
      "Text to translate:",
      text
    ].join("\n");

    const result = await env.AI.run(
      "@cf/meta/llama-3.1-8b-instruct",
      {
        messages: [
          {
            role: "system",
            content: "You translate text accurately and return only the translation."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 2048,
        temperature: 0.2
      }
    );

    const translated = result?.response?.trim();

    if (!translated) {
      return Response.json(
        { error: "The AI service returned an empty translation." },
        { status: 502 }
      );
    }

    return Response.json({
      translatedText: translated
    });

  } catch (error) {
    console.error("Translation error:", error);

    return Response.json(
      {
        error: "Translation failed. Please try again.",
        details: String(error.message || error).slice(0, 300)
      },
      { status: 502 }
    );
  }
}