# Gnani Integration

## Prisma speech-to-text

The backend implements the official REST request documented at `https://docs.gnani.ai/api/STT/speech-to-text`: `POST https://api.vachana.ai/stt/v3`, multipart fields `audio_file`, `model`, `language_code`, and `format=transcribe`; authentication uses `X-API-Key-ID`. Audio clips are limited to 30 seconds. Browser WebM recordings are decoded and converted to mono WAV locally before upload because WebM is not among the documented STT formats. The app displays the returned model and identifies the provider in the transcript review status.

Supported language options in the UI are Kannada (`kn-IN`), Hindi (`hi-IN`), Tamil (`ta-IN`), Telugu (`te-IN`) and Indian English (`en-IN`). Prisma v3 documentation also supports `indic-auto`; current UI chooses a language explicitly.

## Timbre text-to-speech

The backend implements the official REST interface at `https://docs.gnani.ai/api/TTS/tts-inference`: JSON `POST https://api.vachana.ai/api/v1/tts/inference`, `X-API-Key-ID`, `text`, `model`, `voice`, `language`, `speed`, and WAV `audio_config`. Audio is played only after a successful response. A failure is shown as text; no simulated audio is produced.

## Credentials, status and test

Store `GNANI_API_KEY` in `server/.env`, or enter it on the Settings page. The server limits key setup to loopback requests and never returns or logs the key. The settings page reports whether a key is configured. A live call requires a valid key, account permission/credits and a voice supported by the selected model. Evon is not integrated; validated calculations and limited deterministic extraction are used instead.

Official references: [Prisma REST docs](https://docs.gnani.ai/api/STT/speech-to-text), [Timbre REST docs](https://docs.gnani.ai/api/TTS/tts-inference), [Gnani quick start](https://docs.gnani.ai/api/introduction/quick-start).
