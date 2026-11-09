# Project Overview — MazdoorVoice

**Tagline:** Every Worker Deserves a Record.

MazdoorVoice helps informal workers keep a simple personal record of where and when they worked, the wage they agreed, advances and payments they confirm, and the arithmetic balance from those records. Its central workflow is voice in → reviewed transcript → worker-confirmed record → calculated wage summary → optional voice response.

## Problem and people

Daily-wage, construction, domestic, agricultural, factory and delivery workers may not have an accessible, organised way to remember work days, wage agreements, advances and partial payments. A lightweight voice-first ledger can make that information easier to record and explain. MazdoorVoice is a record-keeping aid, not an official wage slip or legal determination.

## Product scope

The MVP includes a sample worker dashboard; recording/upload and review workflow; structured work and payment records; wage calculations; history, analysis, deterministic assistant, profile, PDF statement and settings. Demo mode is visibly identified. Live Gnani calls require an API key configured on the server.

## Technology

React + TypeScript + Vite frontend; Express + TypeScript API; SQLite; Zod; Gnani Prisma v3 STT and Timbre v2.5 TTS REST interfaces. Evon is not integrated. See the README and technical architecture note for setup and limitations.
