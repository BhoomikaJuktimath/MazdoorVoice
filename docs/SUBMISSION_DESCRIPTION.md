# Submission Description

MazdoorVoice is a multilingual, voice-first work and wage record tool for India's informal workforce. Workers can speak or upload a short recording, review its transcript, confirm extracted work details, and keep a clear history of work days, agreed wages, advances and payments. The app calculates expected wages and the recorded balance from the worker-confirmed figures, supports partial payments, highlights arithmetic differences, answers questions from saved records and exports a PDF statement.

Informal workers can lack a practical way to keep organised work and payment records. Voice input lowers the effort required to create a record, while explicit confirmation keeps the worker in control. Findings explain the figures without claiming fraud or legal proof.

The live integration is designed for Gnani **Prisma v3.0** speech-to-text and **Timbre v2.5** text-to-speech through their documented REST APIs. Prisma transcribes submitted audio; Timbre can speak a summary when a valid API key is configured. The API key stays in the backend. These integrations are implemented but were not live-tested because no account API key was supplied. Evon is not integrated. Demo mode uses labelled sample records, never fake Gnani responses.

What makes the solution distinct is its worker-controlled, voice-first ledger: speech becomes a reviewed and confirmed record, financial values use deterministic arithmetic, and the assistant answers from actual stored records. Current limitations include single-user local demo setup, no authentication or production deployment hardening, pattern-based text extraction and no live Gnani account verification.
