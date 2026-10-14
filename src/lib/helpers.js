// Pure helpers shared across the app: randomisation, answer checking,
// speech, spaced repetition and local-date maths.

// ─── RANDOMISATION ───────────────────────────────────────────────────────────

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function getDecoys(correct, pool, count = 3) {
  const others = [...new Set(pool.filter((w) => w !== correct))];
  return shuffle(others).slice(0, count);
}

// ─── ANSWER CHECKING ─────────────────────────────────────────────────────────

export function normalise(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/[¿¡?!.,;]/g, "")
    .replace(/\s+/g, " ")
    .replace(/[áà]/g, "a")
    .replace(/[éè]/g, "e")
    .replace(/[íì]/g, "i")
    .replace(/[óò]/g, "o")
    .replace(/[úùü]/g, "u")
    .replace(/ñ/g, "n");
}

const ARTICLE_RE = /^(el|la|los|las|un|una) /;

/**
 * Check a typed answer against the expected one.
 *
 * Expected answers like "boy / child" accept either half on its own (or the
 * full string). A Spanish noun typed without its article is still wrong, but
 * flagged so the feedback can say exactly what was missing.
 *
 * @returns {{ correct: boolean, missingArticle: boolean }}
 */
export function checkAnswer(input, expected) {
  const given = normalise(input);
  const options = [expected, ...expected.split("/")].map(normalise).filter(Boolean);
  if (options.includes(given)) return { correct: true, missingArticle: false };

  const missingArticle = options.some((o) => ARTICLE_RE.test(o) && o.replace(ARTICLE_RE, "") === given);
  return { correct: false, missingArticle };
}

// ─── SPEECH ──────────────────────────────────────────────────────────────────

export function speak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "es-ES";
  u.rate = 0.85;
  window.speechSynthesis.speak(u);
}

// ─── SPACED REPETITION (SM-2) ────────────────────────────────────────────────

export function sm2(correct, easiness, interval, reps) {
  if (!correct) return { easiness: Math.max(1.3, easiness - 0.2), interval: 1, reps: 0 };
  const newEasiness = Math.min(3.0, easiness + 0.1);
  const newReps = reps + 1;
  const newInterval = reps === 0 ? 1 : reps === 1 ? 3 : Math.round(interval * newEasiness);
  return { easiness: newEasiness, interval: newInterval, reps: newReps };
}

export const DEFAULT_CARD = { easiness: 2.5, interval: 0, reps: 0, due: 0, correct: 0, wrong: 0 };

// A card is due if it's never been seen or its due day has arrived.
export function isDue(card, today) {
  return !card || card.reps === 0 || today >= card.due;
}

export function masteryRatio(card) {
  if (!card || card.reps === 0) return 0;
  return card.correct / (card.correct + card.wrong + 0.001);
}

// ─── DATES ───────────────────────────────────────────────────────────────────

// NOTE: a day number based on the *local* calendar date, so "today" rolls over
// at local midnight rather than UTC midnight. Card `due` values use this unit.
export function localDayNumber(date = new Date()) {
  return Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000);
}
