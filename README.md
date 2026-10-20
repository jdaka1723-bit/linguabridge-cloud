# LinguaBridge Cloud

A responsive translation website with text translation, browser speech recognition, and spoken output.

## How it works
- The browser UI is in `public/index.html`.
- `server.js` exposes `/api/translate` and forwards requests to LibreTranslate.
- Keep provider credentials in hosting environment variables, never in browser JavaScript.
- Voice input uses Web Speech API support provided by the browser/device; spoken output uses SpeechSynthesis.

## Run locally
1. Install Node.js 18 or newer.
2. In this folder run `npm install`.
3. Copy `.env.example` to `.env` if you want local environment settings. Node does not load `.env` automatically; set variables in your shell or use a dotenv package.
4. Set `LIBRETRANSLATE_URL` and, if required by your provider, `LIBRETRANSLATE_API_KEY`.
5. Run `npm start` and open `http://localhost:10000`.

## Deploy to Render
1. Create a GitHub repository and upload all files in this project.
2. Sign in to Render and choose **New + → Web Service**.
3. Connect your repository.
4. Set **Build Command** to `npm install` and **Start Command** to `npm start`.
5. Add environment variables in Render → your service → Environment:
   - `LIBRETRANSLATE_URL` = URL of the translation service
   - `LIBRETRANSLATE_API_KEY` = API key if your chosen provider requires one
6. Click deploy. Render provides a public `https://...onrender.com` URL.
7. Open the URL on your phone and test a short translation.

## Translation provider notes
LibreTranslate documents `POST /translate` with JSON fields `q`, `source`, and `target`; source can be `auto` when supported. A hosted public endpoint may require an API key or subscription. For predictable availability, choose a provider/plan or host your own LibreTranslate instance and set `LIBRETRANSLATE_URL` to that instance. Supported languages depend on the configured provider.

## Voice notes
- Use the site over HTTPS (Render provides HTTPS).
- Allow microphone access when prompted.
- Voice recognition availability and supported languages depend on the browser and device. On some browsers recognition may use a vendor service.
- Text-to-speech voices are supplied by the user's device/browser; not every language will have a voice installed.

## Before public launch
Add rate limiting, abuse protection, request logging without storing user text, a privacy notice, and monitoring. Check provider pricing and terms. Do not commit real API keys to GitHub.
