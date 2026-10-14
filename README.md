# Español Pro — Structured Daily Spanish

A personal Spanish learning app for iPhone, with structured 30-minute daily
sessions: **Vocab → Verb conjugation drills → Situational sentences**, with
spaced repetition and forced mistake review (every wrong answer must be typed
correctly before you can continue).

It's a web app installed to the iPhone Home Screen. It's hosted on GitHub
Pages and works offline once installed.

**Live app:** https://jcac39.github.io/Espanol-Pro/

## Features

- 255 words drilled in both directions (EN→ES and ES→EN)
- 100 verbs × present / preterite / future × 6 pronouns
- 6 real-world situations (restaurant, shopping, hotel, small talk, directions, health), one per day
- SM-2 spaced repetition per word, verb form and sentence
- Mistake-review loop: wrong answers cycle back until you type them correctly
- Hard mode: no multiple choice or word banks
- Audio pronunciation (iOS Spanish voice)
- Verb mastery heatmap and a quick-reference screen
- Backup / restore of progress to Files or iCloud Drive

## Install on iPhone

1. Open **https://jcac39.github.io/Espanol-Pro/** in **Safari** (not Chrome).
2. Tap the **Share** button → **Add to Home Screen** → **Add**.
3. Always launch it from the Home Screen icon. The Home Screen app keeps its
   own progress, separate from the Safari tab.

After the first launch it works offline. When a new version is deployed, it
updates itself the next time you open it with a connection (you may need to
close and reopen it once).

## Where progress is saved

Progress is saved **only on the iPhone**, in the Home Screen app's local
storage (key `spanishApp_v3`). Nothing is sent anywhere.

That storage is lost if you delete the Home Screen icon, clear Safari website
data, or change phones. So **use the Backup panel on the Home tab**:

- **Save backup** opens the share sheet → *Save to Files* (pick iCloud Drive).
- **Restore…** picks a backup file and replaces the current progress.

The panel turns amber when your last backup is over 7 days old.

## Developing

Requires Node.js 18+.

```bash
npm install
npm run dev            # http://localhost:5173
npm run dev -- --host  # also reachable from the phone on the same Wi-Fi
npm run build          # production build into dist/
npm run preview        # serve the production build locally
npm run icons          # regenerate the app icons in public/
npm run deploy         # build and publish to GitHub Pages (see Deploying)
```

Note that progress made on the dev server (`localhost` or your PC's IP) is
stored separately from the installed app's progress.

## Deploying

```bash
npm run deploy
```

This builds the app and pushes `dist/` to the `gh-pages` branch, which GitHub
Pages serves. The live site updates within a minute or two. Pushing `main` on
its own does **not** redeploy.

The site path is set by `PAGES_BASE` in [vite.config.js](vite.config.js). If
the repo is renamed, update it to match.

## How a session works

| Block | Per session | Engine |
|---|---|---|
| Vocabulary | up to 10 due cards, mixed directions | SM-2 per word per direction |
| Verb drills | up to 12 due conjugations | SM-2 per verb/tense/pronoun |
| Situation | up to 6 due sentences from today's theme | Theme rotates daily, SM-2 per sentence |

Blocks with nothing due are skipped. Finishing the situation block completes
the day and extends the streak. The day rolls over at local midnight, including
when the app is resumed from the background rather than relaunched.

**Answer checking** ignores case, punctuation and accents (á/é/í/ó/ú/ü/ñ).
Answers listed with a slash, like "boy / child", accept either word.
Spanish nouns must include their article ("el agua", not "agua"). Leaving it
out is marked wrong, with a hint saying the article is what's missing.

## Expanding the content

All content lives in [src/data/content.js](src/data/content.js):

- `VOCAB`: add `{ id: "v256", es: "el coche", en: "car", theme: "transport" }`
  (IDs must be unique and never reused).
- `VERBS`: add a verb with `present`, `preterite` and `future` tables, or use
  the `ar()` / `er()` / `ir()` helpers for regular verbs.
- `SITUATIONS`: add a key with `icon`, `label` and a `sentences` array.

New items are picked up automatically on the next launch; existing progress is
kept. Don't reorder sentences within a situation, because sentence progress is
keyed by position.

## Project structure

```
├── index.html                  # entry HTML (iOS home-screen meta tags)
├── vite.config.js              # build config, GitHub Pages base path, PWA manifest
├── public/                     # app icons
├── scripts/make-icons.mjs      # generates the icons
└── src/
    ├── main.jsx                # React bootstrap
    ├── index.css               # global reset
    ├── App.jsx                 # shell: header, nav, session flow, day rollover
    ├── data/content.js         # VOCAB / VERBS / SITUATIONS
    ├── lib/
    │   ├── helpers.js          # answer checking, SM-2, speech, dates
    │   └── storage.js          # localStorage, migration, backup export/import
    └── components/
        ├── ui.jsx              # shared buttons, inputs, cards
        ├── review.jsx          # mistake-review loop + drill summary
        ├── VocabExercise.jsx
        ├── VerbExercise.jsx
        ├── SituationExercise.jsx
        ├── VerbGrid.jsx
        ├── Reference.jsx
        └── BackupPanel.jsx
```

## Troubleshooting

- **Progress disappeared:** the Home Screen app and Safari tabs have separate
  storage. Make sure you're opening the Home Screen icon. If storage was
  cleared, restore from your latest backup.
- **Old version still showing:** close the app fully (swipe it away in the app
  switcher) and reopen it while online.
- **No audio:** check the silent switch, and that a Spanish voice is installed
  (Settings → Accessibility → Spoken Content → Voices → Spanish).
