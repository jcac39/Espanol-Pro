# Español Pro — Structured Daily Spanish

A personal Spanish learning app with structured 30-minute daily sessions:
**Vocab → Verb conjugation drills → Situational sentences**, with spaced
repetition and forced mistake review (every wrong answer must be typed
correctly before you can continue).

## Requirements

- Node.js 18+ (download from https://nodejs.org if you don't have it —
  check with `node -v` in a terminal)

## Run it

Open this folder in VS Code, then in the integrated terminal
(Terminal → New Terminal):

```bash
npm install
npm run dev
```

Open the URL it prints (usually http://localhost:5173) in your browser.

## Use it on your phone (same Wi-Fi)

```bash
npm run dev -- --host
```

Then open the "Network" URL it prints on your phone's browser.
On iPhone: Share → "Add to Home Screen" makes it feel like a native app.
(A phone isn't part of the OneDrive-synced folder, so its progress stays
local to that phone's browser only.)

## Where progress is saved

Progress (streak, XP, spaced-repetition data) is stored two ways:

1. **Your browser's localStorage** (key `spanishApp_v3`) — a fast local
   cache/fallback, per browser per device.
2. **`data/progress.json`** in this project folder, via a small API the dev
   server provides (see `vite.config.js`). Because this folder lives in
   OneDrive, that file syncs automatically between any machine that has it
   open — e.g. your PC and laptop on the same Microsoft 365 account — with
   no external service involved.

This only works while running via `npm run dev` (the API is part of the dev
server). If you open a static build with no server, the app just falls back
to localStorage on that device.

**Two devices at once:** if you do a session on both machines at the exact
same moment, whichever saves last wins for that moment — normal back-and-forth
use (PC now, laptop later) is fine. Give OneDrive a few seconds to sync the
file between closing one device's session and opening the app on the other.

`data/` is gitignored — your progress never gets committed or shared if you
push this repo to GitHub.

## How the app works

| Block | Content | Engine |
|---|---|---|
| Vocabulary | 50 common words (expandable in `VOCAB`) | SM-2 spaced repetition |
| Verb drills | 10 core verbs × 3 tenses × 6 pronouns = 180 forms (expandable in `VERBS`) | SM-2 per conjugation |
| Situations | Restaurant, Shopping, Hotel, Small Talk (expandable in `SITUATIONS`) | Rotates daily, SM-2 per sentence |

After each drill, any mistakes enter a **review loop**: you must free-type
each one correctly to clear it. Wrong again → it cycles back round.

**Hard mode** (toggle on home screen) removes multiple choice and word
banks everywhere — you type everything.

## Expanding the content

All content lives in `src/data/content.js`:

- `VOCAB` — add objects like `{ id: "v51", es: "el coche", en: "car", theme: "transport" }`
- `VERBS` — add a verb with `present`, `preterite`, `future` conjugation tables
- `SITUATIONS` — add a key with `icon`, `label`, and a `sentences` array

The spaced-repetition state initialises automatically for new items, but
note: because saved state is created once, if you add new verbs/situations
after first use, either bump the `STORAGE_KEY` (resets progress) or add a
migration. New vocab IDs are handled gracefully.

## Project structure

```
spanish-app/
├── index.html          # entry HTML
├── package.json
├── vite.config.js       # dev server + progress-file API
├── data/                # progress.json lives here (gitignored)
└── src/
    ├── main.jsx        # React bootstrap
    ├── index.css       # global reset
    ├── fileSync.js     # reads/writes data/progress.json
    ├── data/
    │   └── content.js  # VOCAB / VERBS / SITUATIONS
    └── App.jsx         # app logic + UI
```
