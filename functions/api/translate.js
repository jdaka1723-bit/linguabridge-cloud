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

// Initial dictionary of common words and phrases.
// These entries are used only for exact matches.
const COMMON_TRANSLATIONS = {
  en: {
    sn: {
      // Greetings and common expressions
      "hello": "Mhoro",
      "hi": "Mhoro",
      "good morning": "Mangwanani akanaka",
      "good afternoon": "Masikati akanaka",
      "good evening": "Manheru akanaka",
      "goodbye": "Sara zvakanaka",
      "thank you": "Ndatenda",
      "thank you very much": "Ndatenda zvikuru",
      "please": "Ndapota",
      "yes": "Ehe",
      "no": "Kwete",
      "sorry": "Ndine urombo",
      "welcome": "Mauya",

      // Family and people
      "mother": "Amai",
      "father": "Baba",
      "child": "Mwana",
      "children": "Vana",
      "baby": "Mucheche",
      "brother": "Mukoma kana munin'ina",
      "sister": "Hanzvadzi",
      "friend": "Shamwari",
      "person": "Munhu",
      "people": "Vanhu",
      "man": "Murume",
      "woman": "Mukadzi",
      "boy": "Mukomana",
      "girl": "Musikana",
      "family": "Mhuri",

      // Everyday life
      "house": "Imba",
      "home": "Kumba",
      "door": "Musuwo",
      "school": "Chikoro",
      "book": "Bhuku",
      "road": "Mugwagwa",
      "car": "Mota",
      "town": "Guta",
      "village": "Musha",
      "country": "Nyika",
      "name": "Zita",
      "day": "Zuva",
      "night": "Husiku",
      "today": "Nhasi",
      "tomorrow": "Mangwana",
      "yesterday": "Nezuro",
      "toilet": "Chimbuzi",
        "latrine": "Chimbuzi",

      // Food and drink
      "food": "Chikafu",
      "water": "Mvura",
      "bread": "Chingwa",
      "milk": "Mukaka",
      "rice": "Mupunga",
      "meat": "Nyama",
      "egg": "Zai",
      "eggs": "Mazai",
      "fruit": "Muchero",
      "salt": "Munyu",
      "sugar": "Shuga",
      "tea": "Tea",
      "coffee": "Kofi",
      "eat": "Kudya",
      "drink": "Kunwa",

      // Weather and nature
      "cloud": "Gore",
      "clouds": "Makore",
      "rain": "Mvura",
      "sun": "Zuva",
      "wind": "Mhepo",
      "sky": "Denga",
      "tree": "Muti",
      "fire": "Moto",
      "earth": "Pasi",
      "river": "Rwizi",
      "mountain": "Gomo",
      "animal": "Mhuka",

      // Business and money
      "money": "Mari",
      "work": "Basa",
      "job": "Basa",
      "shop": "Chitoro",
      "market": "Musika",
      "price": "Mutengo",
      "buy": "Kutenga",
      "sell": "Kutengesa",
      "customer": "Mutengi",
      "business": "Bhizinesi",
      "expensive": "Zvinodhura",
      "cheap": "Zvakachipa",

      // Technology
      "phone": "Runhare",
      "mobile phone": "Nharembozha",
      "computer": "Kombiyuta",
      "internet": "Indaneti",
      "website": "Webhusaiti",
      "message": "Meseji",
      "email": "Tsamba yemagetsi",
      "password": "Pasiwedhi",
      "photo": "Mufananidzo",
      "picture": "Mufananidzo",
      "music": "Mimhanzi",

      // Feelings and descriptions
      "love": "Rudo",
      "happiness": "Mufaro",
      "sadness": "Kusuwa",
      "fear": "Kutya",
      "happy": "Anofara",
      "sad": "Akasuruvara",
      "good": "Zvakanaka",
      "bad": "Zvakaipa",
      "big": "Huru",
      "small": "Diki",
      "new": "Itsva",
      "old": "Yekare",
      "hot": "Kupisa",
      "cold": "Kutonhora",
      "beautiful": "Yakanaka",

      // Useful actions
      "go": "Kuenda",
      "come": "Kuuya",
      "sleep": "Kurara",
      "read": "Kuverenga",
      "write": "Kunyora",
      "speak": "Kutaura",
      "listen": "Kuteerera",
      "see": "Kuona",
      "know": "Kuziva",
      "learn": "Kudzidza",
      "help": "Kubatsira",
      "open": "Kuvhura",
      "close": "Kuvhara",
      "wait": "Kumirira",

      // Numbers
      "one": "Mumwe",
      "two": "Vaviri",
      "three": "Vatatu",
      "four": "Vana",
      "five": "Vashanu",
      "ten": "Gumi",
      "hundred": "Zana"
    },

    nd: {
      // Greetings and common expressions
      "hello": "Salibonani",
      "hi": "Sawubona",
      "good morning": "Livukile",
      "thank you": "Ngiyabonga",
      "thank you very much": "Ngiyabonga kakhulu",
      "please": "Ngiyacela",
      "yes": "Yebo",
      "no": "Hatshi",
      "sorry": "Ngiyaxolisa",
      "welcome": "Wamukelekile",
      "goodbye": "Sala kuhle",

      // Family and people
      "mother": "Umama",
      "father": "Ubaba",
      "child": "Umntwana",
      "children": "Abantwana",
      "baby": "Usane",
      "brother": "Umfowethu",
      "sister": "Udadewethu",
      "friend": "Umngane",
      "person": "Umuntu",
      "people": "Abantu",
      "man": "Indoda",
      "woman": "Umfazi",
      "boy": "Umfana",
      "girl": "Intombazana",
      "family": "Imuli",

      // Everyday life
      "house": "Indlu",
      "home": "Ekhaya",
      "door": "Umnyango",
      "school": "Isikolo",
      "book": "Ibhuku",
      "road": "Umgwaqo",
      "car": "Imota",
      "town": "Idolobho",
      "village": "Isigaba",
      "country": "Ilizwe",
      "name": "Ibizo",
      "day": "Usuku",
      "night": "Ubusuku",
      "today": "Lamuhla",
      "tomorrow": "Kusasa",
      "yesterday": "Izolo",

      // Food and drink
      "food": "Ukudla",
      "water": "Amanzi",
      "bread": "Isinkwa",
      "milk": "Ubisi",
      "rice": "Irayisi",
      "meat": "Inyama",
      "egg": "Iqanda",
      "eggs": "Amaqanda",
      "fruit": "Isithelo",
      "salt": "Itswayi",
      "sugar": "Ushukela",
      "tea": "Itiye",
      "coffee": "Ikhofi",
      "eat": "Ukudla",
      "drink": "Ukusela",

      // Weather and nature
      "cloud": "Ifu",
      "clouds": "Amafu",
      "rain": "Izulu",
      "sun": "Ilanga",
      "wind": "Umoya",
      "sky": "Isibhakabhaka",
      "tree": "Isihlahla",
      "fire": "Umlilo",
      "earth": "Umhlaba",
      "river": "Umfula",
      "mountain": "Intaba",
      "animal": "Isilwane",

      // Business and money
      "money": "Imali",
      "work": "Umsebenzi",
      "job": "Umsebenzi",
      "shop": "Isitolo",
      "market": "Imakethe",
      "price": "Intengo",
      "buy": "Ukuthenga",
      "sell": "Ukuthengisa",
      "customer": "Ikhasimende",
      "business": "Ibhizimisi",
      "expensive": "Kuyabiza",
      "cheap": "Kuyatshipha",

      // Technology
      "phone": "Ucingo",
      "mobile phone": "Umakhalekhukhwini",
      "computer": "Ikhompyutha",
      "internet": "I-inthanethi",
      "website": "Iwebhusayithi",
      "message": "Umlayezo",
      "email": "I-imeyili",
      "password": "Iphasiwedi",
      "photo": "Isithombe",
      "picture": "Isithombe",
      "music": "Umculo",

      // Feelings and descriptions
      "love": "Uthando",
      "happiness": "Injabulo",
      "sadness": "Usizi",
      "fear": "Ukwesaba",
      "happy": "Uyathokoza",
      "sad": "Udabukile",
      "good": "Kuhle",
      "bad": "Kubi",
      "big": "Khulu",
      "small": "Ncane",
      "new": "Tsha",
      "old": "Endala",
      "hot": "Tshisa",
      "cold": "Qanda",
      "beautiful": "Kuhle",

      // Useful actions
      "go": "Ukuhamba",
      "come": "Ukuza",
      "sleep": "Ukulala",
      "read": "Ukubala",
      "write": "Ukubhala",
      "speak": "Ukukhuluma",
      "listen": "Ukulalela",
      "see": "Ukubona",
      "know": "Ukwazi",
      "learn": "Ukufunda",
      "help": "Ukunceda",
      "open": "Ukuvula",
      "close": "Ukuvala",
      "wait": "Ukulinda",

      // Numbers
      "one": "Kunye",
      "two": "Kubili",
      "three": "Kuthathu",
      "four": "Kune",
      "five": "Kuhlanu",
      "ten": "Itshumi",
      "hundred": "Ikhulu"
    }
  },

  sn: {
    en: {
      "amai": "Mother",
      "baba": "Father",
      "mhoro": "Hello",
      "ndatenda": "Thank you",
      "ehe": "Yes",
      "kwete": "No",
      "gore": "Cloud",
      "mvura": "Water",
      "zuva": "Sun",
      "imba": "House",
      "rudo": "Love",
      "mari": "Money",
      "chikoro": "School"
    }
  },

  nd: {
    en: {
      "umama": "Mother",
      "ubaba": "Father",
      "salibonani": "Hello",
      "ngiyabonga": "Thank you",
      "yebo": "Yes",
      "hatshi": "No",
      "ifu": "Cloud",
      "amanzi": "Water",
      "ilanga": "Sun",
      "indlu": "House",
      "uthando": "Love",
      "imali": "Money",
      "isikolo": "School"
    }
  }
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

    // Use the dictionary only when the source language is explicitly selected.
    const normalizedText = text
  .trim()
  .toLocaleLowerCase()
  .replace(/[.!?]+$/g, "")
  .trim();

const dictionary =
  source !== "auto"
    ? COMMON_TRANSLATIONS[source]?.[target]
    : null;

const dictionaryTranslation = dictionary?.[normalizedText];

if (dictionaryTranslation) {
  return Response.json({
    translatedText: dictionaryTranslation,
    source: "dictionary"
  });
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
"Use standard written Shona and expressions that native speakers commonly use.",
"Translate the complete meaning of the original text, including context and tone.",
"For family relationships, distinguish older siblings from younger siblings where the context requires it.",
"Use the correct Shona word for the meaning intended; do not confuse a boy with a brother or a woman with a sister.",
"For sentences, translate the whole sentence naturally rather than translating each word separately.",
"Keep names, numbers, dates, and important details unchanged.",
"Do not confuse Shona with Ndebele, isiZulu, or another language.",
"Do not invent words, add explanations, or repeat the translation.",
"Return only the Shona translation."
],
nd: [
"Translate into natural, grammatically correct Zimbabwean Ndebele (isiNdebele).",
"Use standard written isiNdebele and expressions that native speakers commonly use.",
"Translate the complete meaning of the original text, including context and tone.",
"For family relationships, distinguish older siblings from younger siblings where the context requires it.",
"Use the correct Ndebele word for the intended family relationship; do not substitute a boy for a brother or a woman for a sister.",
"For sentences, translate the whole sentence naturally rather than translating each word separately.",
"Keep names, numbers, dates, and important details unchanged.",
"Do not translate into Shona or substitute isiZulu for isiNdebele.",
"Do not invent words, add explanations, or repeat the translation.",
"Return only the Ndebele translation."
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
"You are a careful translator specializing in accurate, natural translations. Follow the specified source and target languages exactly. For Shona, use Zimbabwean chiShona. For Ndebele, use Zimbabwean isiNdebele, not isiZulu. Preserve the meaning, context, tone, and grammatical relationships of the original. Do not guess when uncertain, invent words, or add explanations. Return only the translated text."
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
        {
          error: "The translation service returned no text. Please try again."
        },
        { status: 502 }
      );
    }

    return Response.json({
      translatedText: translated
    });

  } catch (error) {
    console.error("LinguaBridge translation error:", error);

    return Response.json(
      { error: "Translation failed. Please try again." },
      { status: 502 }
    );
  }
}