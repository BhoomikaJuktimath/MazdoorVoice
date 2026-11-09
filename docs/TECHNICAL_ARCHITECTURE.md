# Technical Architecture

```text
Browser (React / TypeScript / Vite)
  ├─ Dashboard, record confirmation, history, payments, analysis, assistant, profile, PDF
  ├─ MediaRecorder / file upload → multipart API
  └─ JSON REST calls → Express API
       ├─ Zod validation and integer-paise calculations
       ├─ SQLite tables: users, work_records, payments, audit
       ├─ deterministic dashboard / analysis / assistant queries
       └─ Gnani REST calls (server-side key only)
            ├─ Prisma v3.0 STT
            └─ Timbre v2.5 TTS
```

## Data flow

Audio is held in browser memory and sent to the backend only when the worker requests transcription. The backend forwards the file to Prisma when configured and returns the original transcript and model identity. The worker may edit the text. Deterministic extraction suggests values, which remain editable. The work record is written only after confirmation. A payment is stored as a separate linked transaction and reduces the computed recorded balance. Financial calculations are performed with integer paise.

## Storage and security scope

SQLite persists locally. The API key is read from server environment variables and never sent to the client. Multer enforces a 15 MB in-memory upload cap. Zod validates writes and Express uses parameterized SQLite statements. This MVP has a single local demo user and no login; it must not be exposed with private worker data until authentication, authorization, rate limiting, production secret management and deployment controls are added.
