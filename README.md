# MazdoorVoice

**Every Worker Deserves a Record.** A voice-first work and wage record MVP for India's informal workforce, built for the Great Indian AI Internship Challenge.

## What it does

Workers can create confirmed work records, track advances and partial payments, review recorded wage balances, ask deterministic questions about their records, and download a PDF statement. Browser recordings can be sent through the server to Gnani Prisma. Summaries can be spoken through Gnani Timbre. With no API key, the app remains usable as a clearly labelled local demo account; it does not pretend that a simulated transcript or audio is real.

## Technology

- React, TypeScript, Vite, Tailwind-free custom responsive CSS, Lucide, Recharts, React Router
- Express, TypeScript, SQLite (`better-sqlite3`), Zod validation, PDFKit endpoint and jsPDF client export
- Gnani Prisma v3.0 STT and Timbre v2.5 TTS REST interfaces, configured server-side

SQLite is used directly instead of Prisma ORM for this self-contained MVP to avoid generated-client/runtime setup friction; relational tables, foreign keys by convention, indexes can be extended as deployment hardening. Currency is stored in integer paise.

## Start locally

Requirements: Node.js 20+ and npm.

```sh
npm install
Copy-Item server/.env.example server/.env   # PowerShell; optional, defaults to demo mode
npm run dev
```

Open the frontend at **http://localhost:5173**. The API listens at **http://localhost:5000** (`GET /api/health`). For production bundles, run `npm run build`; start the compiled backend with `npm start`. Vite proxies `/api` to the backend during development.

The demo account is Ravi Kumar (construction worker, Kannada, Bengaluru). There is no authentication in this local demonstration; do not expose it publicly with personal records.

## Gnani setup

Create an API key in the [Gnani API platform](https://app.gnani.ai), then put it in `server/.env` or enter it on the Settings page. The backend keeps it out of frontend code and API responses. `.env` files are ignored by Git.

```env
GNANI_API_KEY=your-key
GNANI_STT_MODEL=prisma-v3.0
GNANI_TTS_MODEL=timbre-v2.5
GNANI_TTS_VOICE=Nalini
APP_MODE=development
```

Prisma requests use the official `POST https://api.vachana.ai/stt/v3` multipart endpoint, `X-API-Key-ID`, selected language and `format=transcribe`. Browser WebM recordings are converted locally to WAV and limited to 30 seconds before upload. Timbre requests use the official `POST https://api.vachana.ai/api/v1/tts/inference` endpoint and return WAV audio. Provider errors and timeouts are surfaced without exposing the key.

## Features and current scope

- Dashboard metrics and weekly work chart derive from SQLite data.
- Confirm-first work entry with microphone recording, audio upload, editable Prisma transcript, structured field review and explicit save confirmation.
- Payment tracker supports partial payments, method/date/notes and confirmation before submission.
- Searchable work history and payment status filtering; deletion confirmation and basic edit audit table support in the API.
- Wage analysis describes arithmetic from worker-confirmed records and avoids legal/fraud claims.
- Deterministic assistant answers and Timbre playback when credentials are configured.
- Profile, downloadable PDF statement and settings pages.
- Demo seed information appears clearly in DEMO MODE.

## API routes

`GET /api/health`, `GET/PUT /api/profile`, `GET /api/dashboard`, `GET/POST/PUT/DELETE /api/work`, `POST /api/work/extract`, `GET/POST /api/payments`, `GET /api/analysis`, `POST /api/assistant/query`, `POST /api/voice/transcribe`, `POST /api/voice/speak`, `GET /api/ai/status`, `GET /api/export/statement`.

## Architecture and data

Express API → SQLite tables (`users`, `work_records`, `payments`, `audit`) → React UI. Amounts use paise in storage/API. Expected wages are computed from days × daily rate plus confirmed overtime; balances subtract recorded advances and linked confirmed payments. The assistant reads database aggregates. Work record saving requires worker confirmation. This local MVP has one demo account and no authentication or multi-user isolation; add secure identity/session handling before real deployment.

## Known limitations

- No Gnani API key/dashboard access was supplied, so live Prisma/Timbre calls could not be validated against an account. Demo mode does not emulate successful calls.
- Text extraction is transparent deterministic pattern matching, not Evon; multilingual transcript parsing is limited and always needs worker review.
- Account authentication, multi-worker access isolation, robust record edit UI, month/date filters, full audit UI, server-side production hardening and automated test suite are not included yet.
- PDF export is generated in the browser and includes a legal-verification disclaimer.
- Demo content is sample data and not personal or independently verified wage information.

## Challenge submission materials

See `docs/PROJECT_OVERVIEW.md`, `docs/TECHNICAL_ARCHITECTURE.md`, `docs/GNANI_INTEGRATION.md`, `docs/DEMO_SCRIPT.md`, `docs/SUBMISSION_DESCRIPTION.md`, and `docs/LINKEDIN_DRAFT.md`.
