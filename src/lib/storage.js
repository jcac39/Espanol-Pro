// Progress persistence. Everything lives in this device's localStorage —
// the only copy — so backup export/import is provided as a safety net.

import { VOCAB, VERBS, SITUATIONS, PRONOUNS, TENSES } from "../data/content.js";
import { DEFAULT_CARD } from "./helpers.js";

// v3: bidirectional vocab (en-es and es-en tracked separately), 100 verbs, 255 words
const STORAGE_KEY = "spanishApp_v3";

export function freshState() {
  // Vocab: each word has two SM-2 cards — one per direction
  const vocab = {};
  VOCAB.forEach((w) => {
    vocab[`${w.id}_en-es`] = { ...DEFAULT_CARD };
    vocab[`${w.id}_es-en`] = { ...DEFAULT_CARD };
  });

  const verbs = {};
  VERBS.forEach((v) => {
    TENSES.forEach((t) => {
      PRONOUNS.forEach((p) => {
        verbs[`${v.id}_${t}_${p}`] = { ...DEFAULT_CARD };
      });
    });
  });

  const situations = {};
  Object.keys(SITUATIONS).forEach((s) => {
    SITUATIONS[s].sentences.forEach((_, i) => {
      situations[`${s}_${i}`] = { ...DEFAULT_CARD };
    });
  });

  return {
    vocab, verbs, situations,
    streak: 0, lastDate: null, xp: 0,
    hardMode: false,
    sessionDone: { vocab: false, verbs: false, situations: false },
    lastSessionDate: null,
    lastBackupAt: null,
  };
}

// Fill in any fields added since the saved copy was written, and drop the
// old OneDrive-sync timestamp which is no longer used.
function migrate(saved) {
  const base = freshState();
  const { savedAt, ...rest } = saved;
  return {
    ...base,
    ...rest,
    vocab: { ...base.vocab, ...saved.vocab },
    verbs: { ...base.verbs, ...saved.verbs },
    situations: { ...base.situations, ...saved.situations },
    sessionDone: { ...base.sessionDone, ...saved.sessionDone },
  };
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? migrate(JSON.parse(raw)) : freshState();
  } catch (e) {
    console.warn("Could not read saved progress — starting fresh.", e);
    return freshState();
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn("Could not save progress (storage full or blocked).", e);
  }
}

// ─── BACKUP ──────────────────────────────────────────────────────────────────

/**
 * Hand the progress to the user as a JSON file. On iPhone this opens the
 * share sheet (→ "Save to Files" / iCloud Drive); elsewhere it downloads.
 *
 * :return: true if the file was handed over, false if the user cancelled
 */
export async function exportBackup(state) {
  const stamp = new Date().toISOString().slice(0, 10);
  const name = `espanol-pro-backup-${stamp}.json`;
  const file = new File([JSON.stringify(state)], name, { type: "application/json" });

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({ files: [file] });
      return true;
    } catch (e) {
      if (e.name === "AbortError") return false;
      throw e;
    }
  }

  const url = URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
  return true;
}

/**
 * Parse a backup file into a full state object.
 * Throws with a readable message if the file isn't a valid backup.
 */
export async function readBackup(file) {
  let data;
  try {
    data = JSON.parse(await file.text());
  } catch {
    throw new Error("That file isn't valid JSON.");
  }
  const looksValid = data && typeof data === "object"
    && ["vocab", "verbs", "situations"].every((k) => data[k] && typeof data[k] === "object");
  if (!looksValid) throw new Error("That file doesn't look like an Español Pro backup.");
  return migrate(data);
}
