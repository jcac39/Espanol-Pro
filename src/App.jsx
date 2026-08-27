import { useState, useEffect } from "react";
import { VOCAB, VERBS, SITUATIONS, PRONOUNS, TENSES, TENSE_LABELS } from "./data/content.js";
import { fileSyncAvailable, pullState, pushState } from "./fileSync.js";

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getDecoys(correct, pool, count = 3) {
  const others = [...new Set(pool.filter((w) => w !== correct))];
  return shuffle(others).slice(0, count);
}

function normalise(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/[¿¡?!.,;]/g, "")
    .replace(/\s+/g, " ")
    .replace(/[áà]/g, "a")
    .replace(/[éè]/g, "e")
    .replace(/[íì]/g, "i")
    .replace(/[óò]/g, "o")
    .replace(/[úù]/g, "u")
    .replace(/ñ/g, "n");
}

function speak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "es-ES";
  u.rate = 0.85;
  window.speechSynthesis.speak(u);
}

// SM-2 spaced repetition
function sm2(correct, easiness, interval, reps) {
  if (!correct) return { easiness: Math.max(1.3, easiness - 0.2), interval: 1, reps: 0 };
  const newEasiness = Math.min(3.0, easiness + 0.1);
  const newReps = reps + 1;
  const newInterval = reps === 0 ? 1 : reps === 1 ? 3 : Math.round(interval * newEasiness);
  return { easiness: newEasiness, interval: newInterval, reps: newReps };
}

const DEFAULT_CARD = { easiness: 2.5, interval: 0, reps: 0, due: 0, correct: 0, wrong: 0 };

// ─── STORAGE ─────────────────────────────────────────────────────────────────

// v3: bidirectional vocab (en-es and es-en tracked separately), 100 verbs, 255 words
const STORAGE_KEY = "spanishApp_v3";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* storage full — fail silently */ }
}

function initState() {
  const saved = loadState();
  if (saved) return saved;

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
  };
}

// ─── SHARED UI ───────────────────────────────────────────────────────────────

function btnStyle(color) {
  return {
    display: "block", width: "100%", marginTop: 14,
    background: color, color: "#0f172a", border: "none",
    borderRadius: 12, padding: "14px 18px", fontSize: 16,
    fontWeight: 800, cursor: "pointer", letterSpacing: 0.5,
  };
}

function SyncPanel({ status }) {
  const dot = { off: "#475569", syncing: "#f59e0b", synced: "#34d399", error: "#ef4444" }[status] || "#475569";
  const label = { off: "Local only", syncing: "Checking…", synced: "Synced via OneDrive", error: "Sync error" }[status] || "Local only";

  return (
    <div style={{ marginTop: 24, background: "#0f172a", border: "1px solid #1e293b", borderRadius: 14, padding: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 9, height: 9, borderRadius: "50%", background: dot, display: "inline-block" }} />
          <span style={{ fontWeight: 700, fontSize: 14 }}>📁 Progress file</span>
        </div>
        <span style={{ color: "#64748b", fontSize: 13 }}>{label}</span>
      </div>

      {(status === "off" || status === "error") && (
        <div style={{ color: "#64748b", fontSize: 13, marginTop: 10, lineHeight: 1.5 }}>
          Not connected to the shared progress file — this only happens if the
          app isn't running via <code>npm run dev</code> (e.g. a static build).
          Progress is still saved on this device.
        </div>
      )}
    </div>
  );
}

function ProgressBar({ value, max, color = "#f59e0b" }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div style={{ background: "#1e293b", borderRadius: 99, height: 8, overflow: "hidden" }}>
      <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 99, transition: "width 0.4s" }} />
    </div>
  );
}

function Badge({ children, color = "#f59e0b" }) {
  return (
    <span style={{ background: color + "22", color, border: `1px solid ${color}44`, borderRadius: 99, padding: "2px 10px", fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>
      {children}
    </span>
  );
}

function QuestionCard({ children }) {
  return (
    <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 16, padding: "28px 20px", margin: "20px 0", textAlign: "center" }}>
      {children}
    </div>
  );
}

function FeedbackPanel({ feedback, correctText, wrongText, onNext, nextLabel = "Next →" }) {
  const ok = feedback === "correct";
  return (
    <div style={{ marginTop: 16, padding: "14px 18px", borderRadius: 12, background: ok ? "#14532d" : "#7f1d1d", color: ok ? "#86efac" : "#fca5a5" }}>
      {ok ? correctText : wrongText}
      <button onClick={onNext} style={{ ...btnStyle(ok ? "#22c55e" : "#ef4444"), marginTop: 10 }}>
        {nextLabel}
      </button>
    </div>
  );
}

const inputStyle = (feedback) => ({
  width: "100%",
  background: "#1e293b",
  border: `1px solid ${feedback === "correct" ? "#22c55e" : feedback === "wrong" ? "#ef4444" : "#334155"}`,
  borderRadius: 12,
  padding: "14px 16px",
  fontSize: 17,
  color: "#f1f5f9",
  outline: "none",
  boxSizing: "border-box",
});

// ─── MISTAKE REVIEW ──────────────────────────────────────────────────────────

function MistakeReview({ mistakes, color, renderQuestion, getCorrectAnswer, onComplete }) {
  const [queue, setQueue] = useState(() => shuffle([...mistakes]));
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [cleared, setCleared] = useState(0);

  useEffect(() => {
    setInput("");
    setFeedback(null);
  }, [idx, queue.length]);

  if (queue.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: 32 }}>
        <div style={{ fontSize: 52 }}>🎯</div>
        <div style={{ fontSize: 22, fontWeight: 800, color, marginTop: 12 }}>All Mistakes Cleared!</div>
        <div style={{ color: "#94a3b8", marginTop: 8 }}>
          You corrected all {cleared} mistake{cleared !== 1 ? "s" : ""}.
        </div>
        <button onClick={onComplete} style={btnStyle(color)}>Continue →</button>
      </div>
    );
  }

  const safeIdx = idx % queue.length;
  const current = queue[safeIdx];
  const correctAnswer = getCorrectAnswer(current);

  function submit() {
    if (!input.trim()) return;
    const ok = normalise(input) === normalise(correctAnswer);
    setFeedback(ok ? "correct" : "wrong");
    if (ok) speak(typeof correctAnswer === "string" && /[áéíóúñ¿¡]/.test(correctAnswer) ? correctAnswer : correctAnswer);
  }

  function next() {
    if (feedback === "correct") {
      setQueue((q) => q.filter((_, i) => i !== safeIdx));
      setCleared((c) => c + 1);
      setIdx(0);
    } else {
      setIdx((i) => (i + 1) % queue.length);
      setInput("");
      setFeedback(null);
    }
  }

  return (
    <div>
      <div style={{ background: "#431407", border: "1px solid #7c2d12", borderRadius: 12, padding: "12px 16px", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 20 }}>🔁</span>
        <div>
          <div style={{ color: "#fb923c", fontWeight: 700, fontSize: 14 }}>Mistake Review</div>
          <div style={{ color: "#9a3412", fontSize: 12 }}>{queue.length} remaining — type each correctly to clear it</div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <Badge color="#fb923c">REVIEW {cleared + 1}/{cleared + queue.length}</Badge>
        <span style={{ color: "#64748b", fontSize: 13 }}>✅ {cleared} cleared</span>
      </div>
      <ProgressBar value={cleared} max={cleared + queue.length} color="#fb923c" />
      {renderQuestion(current)}
      <div style={{ marginTop: 16 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !feedback && submit()}
          disabled={!!feedback}
          placeholder="Type the correct answer…"
          autoFocus
          style={inputStyle(feedback)}
        />
        {!feedback && <button onClick={submit} style={btnStyle("#fb923c")}>Check</button>}
      </div>
      {feedback && (
        <FeedbackPanel
          feedback={feedback}
          correctText="✓ Correct! Removed from review."
          wrongText={`✗ Answer: ${correctAnswer}. Comes round again.`}
          onNext={next}
          nextLabel={feedback === "correct" ? "Next →" : "Try Next →"}
        />
      )}
    </div>
  );
}

// ─── DRILL-DONE TRANSITION ───────────────────────────────────────────────────

function DrillDone({ color, title, score, total, mistakeCount, mistakeNoun, onFix, onContinue }) {
  if (mistakeCount > 0) {
    return (
      <div style={{ textAlign: "center", padding: 32 }}>
        <div style={{ fontSize: 48 }}>📋</div>
        <div style={{ fontSize: 22, fontWeight: 700, color, marginTop: 12 }}>{title}</div>
        <div style={{ color: "#94a3b8", marginTop: 8 }}>{score} / {total} correct</div>
        <div style={{ background: "#431407", border: "1px solid #7c2d12", borderRadius: 12, padding: 14, marginTop: 16 }}>
          <div style={{ color: "#fb923c", fontWeight: 700 }}>⚠️ {mistakeCount} {mistakeNoun}{mistakeCount !== 1 ? "s" : ""} to fix</div>
          <div style={{ color: "#9a3412", fontSize: 13, marginTop: 4 }}>Type each one correctly before moving on.</div>
        </div>
        <button onClick={onFix} style={btnStyle("#fb923c")}>Fix Mistakes →</button>
      </div>
    );
  }
  return (
    <div style={{ textAlign: "center", padding: 32 }}>
      <div style={{ fontSize: 48 }}>✅</div>
      <div style={{ fontSize: 22, fontWeight: 700, color, marginTop: 12 }}>{title}</div>
      <div style={{ color: "#94a3b8", marginTop: 8 }}>Perfect! {score} / {total} correct</div>
      <button onClick={onContinue} style={btnStyle(color)}>Continue →</button>
    </div>
  );
}

// ─── VOCAB EXERCISE ──────────────────────────────────────────────────────────
// Each card is { id: "v12", direction: "en-es" | "es-en" }
// en-es: shown English word → type/pick Spanish
// es-en: shown Spanish word → type/pick English

function VocabExercise({ cards, hardMode, onComplete }) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [choices, setChoices] = useState([]);
  const [exType, setExType] = useState("mc");
  const [results, setResults] = useState([]);
  const [phase, setPhase] = useState("drill");
  const [mistakes, setMistakes] = useState([]);

  const card = cards[idx];
  const vocab = card ? VOCAB.find((v) => v.id === card.id) : null;
  const isEnEs = card?.direction === "en-es";
  const prompt = vocab ? (isEnEs ? vocab.en : vocab.es) : "";
  const answer = vocab ? (isEnEs ? vocab.es : vocab.en) : "";
  const dirLabel = isEnEs ? "TRANSLATE TO SPANISH" : "TRANSLATE TO ENGLISH";

  useEffect(() => {
    if (!card || !vocab) return;
    const t = hardMode ? "type" : Math.random() > 0.4 ? "mc" : "type";
    setExType(t);
    setInput("");
    setFeedback(null);
    if (t === "mc") {
      const pool = isEnEs ? VOCAB.map((v) => v.es) : VOCAB.map((v) => v.en);
      const decoys = getDecoys(answer, pool);
      setChoices(shuffle([answer, ...decoys]));
    }
  }, [idx, card?.id, card?.direction, hardMode]);

  // Speak Spanish when the question is shown in ES→EN mode
  useEffect(() => {
    if (vocab && !isEnEs && phase === "drill") speak(vocab.es);
  }, [idx, phase]);

  if (phase === "review") {
    return (
      <MistakeReview
        mistakes={mistakes}
        color="#f59e0b"
        renderQuestion={(m) => {
          const v = VOCAB.find((w) => w.id === m.id);
          const mIsEnEs = m.direction === "en-es";
          return (
            <QuestionCard>
              <div style={{ color: "#64748b", fontSize: 13, marginBottom: 8, letterSpacing: 2 }}>
                {mIsEnEs ? "TRANSLATE TO SPANISH" : "TRANSLATE TO ENGLISH"}
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#f1f5f9" }}>
                {mIsEnEs ? v.en : v.es}
              </div>
              {!mIsEnEs && (
                <button onClick={() => speak(v.es)} style={{ marginTop: 10, background: "none", border: "none", color: "#475569", cursor: "pointer", fontSize: 18 }}>🔊</button>
              )}
            </QuestionCard>
          );
        }}
        getCorrectAnswer={(m) => {
          const v = VOCAB.find((w) => w.id === m.id);
          return m.direction === "en-es" ? v.es : v.en;
        }}
        onComplete={() => onComplete(results)}
      />
    );
  }

  if (!card) {
    const wrongCards = results.filter((r) => !r.correct).map((r) => ({ id: r.vocabId, direction: r.direction }));
    return (
      <DrillDone
        color="#f59e0b"
        title={wrongCards.length > 0 ? "Vocab Drill Done" : "Vocab Complete!"}
        score={score}
        total={cards.length}
        mistakeCount={wrongCards.length}
        mistakeNoun="word"
        onFix={() => { setMistakes(wrongCards); setPhase("review"); }}
        onContinue={() => onComplete(results)}
      />
    );
  }

  function submit(ans) {
    const correct = normalise(ans) === normalise(answer);
    setFeedback(correct ? "correct" : "wrong");
    if (correct) { setScore((s) => s + 1); speak(vocab.es); }
    setResults((r) => [...r, { id: `${card.id}_${card.direction}`, vocabId: card.id, direction: card.direction, correct }]);
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <Badge color="#f59e0b">VOCAB {idx + 1}/{cards.length}</Badge>
        <span style={{ color: "#64748b", fontSize: 13 }}>⭐ {score} correct</span>
      </div>
      <ProgressBar value={idx} max={cards.length} color="#f59e0b" />

      <QuestionCard>
        <div style={{ color: "#64748b", fontSize: 13, marginBottom: 8, letterSpacing: 2 }}>{dirLabel}</div>
        {/* Direction indicator pill */}
        <div style={{ fontSize: 11, color: isEnEs ? "#818cf8" : "#34d399", marginBottom: 10, fontWeight: 700 }}>
          {isEnEs ? "🇬🇧 → 🇪🇸" : "🇪🇸 → 🇬🇧"}
        </div>
        <div style={{ fontSize: 28, fontWeight: 800, color: "#f1f5f9" }}>{prompt}</div>
        {!isEnEs && (
          <button onClick={() => speak(vocab.es)} style={{ marginTop: 12, background: "none", border: "none", color: "#475569", cursor: "pointer", fontSize: 20 }}>🔊</button>
        )}
      </QuestionCard>

      {exType === "mc" ? (
        <div style={{ display: "grid", gap: 10 }}>
          {choices.map((c) => {
            let bg = "#1e293b"; let col = "#cbd5e1";
            if (feedback) {
              if (c === answer) { bg = "#14532d"; col = "#86efac"; }
              else if (c === input && c !== answer) { bg = "#7f1d1d"; col = "#fca5a5"; }
            }
            return (
              <button key={c} disabled={!!feedback} onClick={() => { setInput(c); submit(c); }}
                style={{ background: bg, color: col, border: `1px solid ${col}22`, borderRadius: 12, padding: "14px 18px", fontSize: 16, cursor: feedback ? "default" : "pointer", textAlign: "left", transition: "all 0.2s" }}>
                {c}
              </button>
            );
          })}
        </div>
      ) : (
        <div>
          <input value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !feedback && submit(input)}
            disabled={!!feedback}
            placeholder={isEnEs ? "Type in Spanish…" : "Type in English…"}
            style={inputStyle(feedback)} autoFocus />
          {!feedback && <button onClick={() => submit(input)} style={btnStyle("#f59e0b")}>Check</button>}
        </div>
      )}

      {feedback && (
        <FeedbackPanel
          feedback={feedback}
          correctText={`✓ Correct! ${isEnEs ? "" : `(${vocab.es})`}`}
          wrongText={`✗ Correct answer: ${answer}`}
          onNext={() => setIdx((i) => i + 1)}
        />
      )}
    </div>
  );
}

// ─── VERB EXERCISE ───────────────────────────────────────────────────────────

function VerbExercise({ cards, hardMode, onComplete }) {
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState([]);
  const [choices, setChoices] = useState([]);
  const [phase, setPhase] = useState("drill");
  const [mistakes, setMistakes] = useState([]);

  const card = cards[idx];

  useEffect(() => {
    if (!card) return;
    setInput("");
    setFeedback(null);
    const verb = VERBS.find((v) => v.id === card.verbId);
    const correct = verb[card.tense][card.pronoun];
    const allForms = VERBS.flatMap((v) => Object.values(v[card.tense]));
    setChoices(shuffle([correct, ...getDecoys(correct, allForms)]));
  }, [idx, card]);

  if (phase === "review") {
    return (
      <MistakeReview
        mistakes={mistakes}
        color="#818cf8"
        renderQuestion={({ verbId, tense, pronoun }) => {
          const verb = VERBS.find((v) => v.id === verbId);
          return (
            <QuestionCard>
              <Badge color="#818cf8">{TENSE_LABELS[tense]}</Badge>
              <div style={{ fontSize: 13, color: "#64748b", marginTop: 12, letterSpacing: 2 }}>CONJUGATE</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#f1f5f9", marginTop: 6 }}>{verb.infinitive}</div>
              <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>{verb.en}</div>
              <div style={{ fontSize: 20, color: "#a5b4fc", marginTop: 12, fontWeight: 600 }}>{pronoun} ___</div>
            </QuestionCard>
          );
        }}
        getCorrectAnswer={({ verbId, tense, pronoun }) => VERBS.find((v) => v.id === verbId)[tense][pronoun]}
        onComplete={() => onComplete(results)}
      />
    );
  }

  if (!card) {
    const wrongCards = results.filter((r) => !r.correct).map((r) => r.card);
    return (
      <DrillDone
        color="#818cf8"
        title={wrongCards.length > 0 ? "Verb Drill Done" : "Verb Drills Complete!"}
        score={score}
        total={cards.length}
        mistakeCount={wrongCards.length}
        mistakeNoun="conjugation"
        onFix={() => { setMistakes(wrongCards); setPhase("review"); }}
        onContinue={() => onComplete(results)}
      />
    );
  }

  const { verbId, tense, pronoun } = card;
  const verb = VERBS.find((v) => v.id === verbId);
  const correct = verb[tense][pronoun];

  function record(ok) {
    setFeedback(ok ? "correct" : "wrong");
    if (ok) setScore((s) => s + 1);
    setResults((r) => [...r, { id: `${verbId}_${tense}_${pronoun}`, correct: ok, card }]);
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <Badge color="#818cf8">VERBS {idx + 1}/{cards.length}</Badge>
        <span style={{ color: "#64748b", fontSize: 13 }}>⭐ {score} correct</span>
      </div>
      <ProgressBar value={idx} max={cards.length} color="#818cf8" />

      <QuestionCard>
        <Badge color="#818cf8">{TENSE_LABELS[tense]}</Badge>
        <div style={{ fontSize: 13, color: "#64748b", marginTop: 12, letterSpacing: 2 }}>CONJUGATE</div>
        <div style={{ fontSize: 30, fontWeight: 800, color: "#f1f5f9", marginTop: 6 }}>{verb.infinitive}</div>
        <div style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>{verb.en}</div>
        <div style={{ fontSize: 20, color: "#a5b4fc", marginTop: 14, fontWeight: 600 }}>{pronoun} ___</div>
      </QuestionCard>

      {!hardMode ? (
        <div style={{ display: "grid", gap: 10 }}>
          {choices.map((c) => {
            let bg = "#1e293b"; let col = "#cbd5e1";
            if (feedback) {
              if (c === correct) { bg = "#14532d"; col = "#86efac"; }
              else if (c === input && c !== correct) { bg = "#7f1d1d"; col = "#fca5a5"; }
            }
            return (
              <button key={c} disabled={!!feedback} onClick={() => { setInput(c); record(normalise(c) === normalise(correct)); }}
                style={{ background: bg, color: col, border: `1px solid ${col}22`, borderRadius: 12, padding: "14px 18px", fontSize: 17, cursor: feedback ? "default" : "pointer", textAlign: "left", transition: "all 0.2s" }}>
                {c}
              </button>
            );
          })}
        </div>
      ) : (
        <div>
          <input value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !feedback && record(normalise(input) === normalise(correct))}
            disabled={!!feedback} placeholder={`${pronoun}…`} style={inputStyle(feedback)} autoFocus />
          {!feedback && <button onClick={() => record(normalise(input) === normalise(correct))} style={btnStyle("#818cf8")}>Check</button>}
        </div>
      )}

      {feedback && (
        <FeedbackPanel
          feedback={feedback}
          correctText={`✓ ${pronoun} ${correct}`}
          wrongText={`✗ Correct: ${pronoun} ${correct}`}
          onNext={() => setIdx((i) => i + 1)}
        />
      )}
    </div>
  );
}

// ─── SITUATION EXERCISE ──────────────────────────────────────────────────────

function SituationExercise({ situationKey, cards, hardMode, onComplete }) {
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState([]);
  const [scrambleMode, setScrambleMode] = useState(false);
  const [scrambled, setScrambled] = useState([]);
  const [picked, setPicked] = useState([]);
  const [phase, setPhase] = useState("drill");
  const [mistakes, setMistakes] = useState([]);

  const sit = SITUATIONS[situationKey];
  const card = cards[idx];

  useEffect(() => {
    if (!card) return;
    setInput(""); setFeedback(null); setPicked([]);
    const doScramble = !hardMode && Math.random() > 0.5;
    setScrambleMode(doScramble);
    if (doScramble) {
      const sentence = sit.sentences[card.sentenceIdx];
      const words = sentence.es.split(" ");
      const decoyWords = ["muy", "también", "pero", "con", "de", "la", "el"];
      const extras = shuffle(decoyWords.filter((d) => !words.includes(d))).slice(0, 2);
      setScrambled(shuffle([...words, ...extras]));
    }
  }, [idx, card, hardMode, sit]);

  if (phase === "review") {
    return (
      <MistakeReview
        mistakes={mistakes}
        color="#34d399"
        renderQuestion={({ sentenceIdx }) => {
          const s = sit.sentences[sentenceIdx];
          return (
            <QuestionCard>
              <div style={{ color: "#64748b", fontSize: 13, letterSpacing: 2 }}>{sit.icon} SAY IN SPANISH</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#f1f5f9", marginTop: 10 }}>{s.en}</div>
            </QuestionCard>
          );
        }}
        getCorrectAnswer={({ sentenceIdx }) => sit.sentences[sentenceIdx].es}
        onComplete={() => onComplete(results)}
      />
    );
  }

  if (!card) {
    const wrongCards = results.filter((r) => !r.correct).map((r) => ({ sentenceIdx: r.sentenceIdx }));
    return (
      <DrillDone
        color="#34d399"
        title={wrongCards.length > 0 ? "Sentence Drill Done" : "Session Complete!"}
        score={score}
        total={cards.length}
        mistakeCount={wrongCards.length}
        mistakeNoun="sentence"
        onFix={() => { setMistakes(wrongCards); setPhase("review"); }}
        onContinue={() => onComplete(results)}
      />
    );
  }

  const sentence = sit.sentences[card.sentenceIdx];

  function submit(ans) {
    const answer = ans !== undefined ? ans : input;
    const ok = normalise(answer) === normalise(sentence.es);
    setFeedback(ok ? "correct" : "wrong");
    if (ok) setScore((s) => s + 1);
    setResults((r) => [...r, { id: `${situationKey}_${card.sentenceIdx}`, sentenceIdx: card.sentenceIdx, correct: ok }]);
    speak(sentence.es);
  }

  function toggleWord(w, i) {
    if (feedback) return;
    const key = `${w}_${i}`;
    if (picked.find((p) => p.key === key)) {
      setPicked((p) => p.filter((x) => x.key !== key));
    } else {
      setPicked((p) => [...p, { word: w, key }]);
    }
  }

  const assembled = picked.map((p) => p.word).join(" ");

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <Badge color="#34d399">{sit.icon} {sit.label.toUpperCase()} {idx + 1}/{cards.length}</Badge>
        <span style={{ color: "#64748b", fontSize: 13 }}>⭐ {score}</span>
      </div>
      <ProgressBar value={idx} max={cards.length} color="#34d399" />

      <QuestionCard>
        <div style={{ color: "#64748b", fontSize: 13, letterSpacing: 2 }}>SAY IN SPANISH</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: "#f1f5f9", marginTop: 10 }}>{sentence.en}</div>
      </QuestionCard>

      {scrambleMode && !hardMode ? (
        <div>
          <div style={{ minHeight: 56, background: "#1e293b", borderRadius: 12, padding: "12px 14px", marginBottom: 12, color: assembled ? "#f1f5f9" : "#475569", fontSize: 17, lineHeight: 1.6 }}>
            {assembled || "Tap words below…"}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
            {scrambled.map((w, i) => {
              const key = `${w}_${i}`;
              const isUsed = !!picked.find((p) => p.key === key);
              return (
                <button key={key} onClick={() => toggleWord(w, i)} disabled={!!feedback}
                  style={{ background: isUsed ? "#334155" : "#1e293b", color: isUsed ? "#475569" : "#cbd5e1", border: "1px solid #334155", borderRadius: 8, padding: "8px 14px", fontSize: 15, cursor: feedback ? "default" : "pointer", textDecoration: isUsed ? "line-through" : "none" }}>
                  {w}
                </button>
              );
            })}
          </div>
          {!feedback && (
            <>
              <button onClick={() => submit(assembled)} style={btnStyle("#34d399")}>Check</button>
              <button onClick={() => setPicked([])} style={{ ...btnStyle("#475569"), marginTop: 8 }}>Clear</button>
            </>
          )}
        </div>
      ) : (
        <div>
          <input value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !feedback && submit()}
            disabled={!!feedback} placeholder="Type in Spanish…" style={inputStyle(feedback)} autoFocus />
          {!feedback && <button onClick={() => submit()} style={btnStyle("#34d399")}>Check</button>}
        </div>
      )}

      {feedback && (
        <FeedbackPanel
          feedback={feedback}
          correctText="✓ ¡Perfecto!"
          wrongText={`✗ ${sentence.es}`}
          onNext={() => setIdx((i) => i + 1)}
        />
      )}
    </div>
  );
}

// ─── VERB GRID ───────────────────────────────────────────────────────────────

function VerbGrid({ verbs }) {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = VERBS.filter(
    (v) => v.infinitive.includes(search.toLowerCase()) || v.en.toLowerCase().includes(search.toLowerCase())
  );

  function getMastery(verbId, tense) {
    const scores = PRONOUNS.map((p) => {
      const c = verbs[`${verbId}_${tense}_${p}`];
      if (!c || c.reps === 0) return 0;
      return c.correct / (c.correct + c.wrong + 0.001);
    });
    return scores.reduce((a, b) => a + b, 0) / scores.length;
  }

  function mastColor(m) {
    if (m === 0) return "#1e293b";
    if (m < 0.4) return "#7f1d1d";
    if (m < 0.7) return "#78350f";
    return "#14532d";
  }

  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search verbs…"
        style={{ ...inputStyle(null), marginBottom: 16 }}
      />
      <div style={{ color: "#64748b", fontSize: 13, marginBottom: 16, letterSpacing: 1 }}>
        {filtered.length} verb{filtered.length !== 1 ? "s" : ""} · tap to see conjugations
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        {filtered.map((v) => (
          <div key={v.id}>
            <button
              onClick={() => setSelected(selected === v.id ? null : v.id)}
              style={{ width: "100%", background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: "12px 16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}
            >
              <div style={{ textAlign: "left" }}>
                <div style={{ color: "#f1f5f9", fontWeight: 700 }}>{v.infinitive}</div>
                <div style={{ color: "#64748b", fontSize: 12 }}>{v.en}</div>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                {TENSES.map((t) => (
                  <div key={t} title={TENSE_LABELS[t]} style={{ width: 24, height: 24, borderRadius: 6, background: mastColor(getMastery(v.id, t)) }} />
                ))}
              </div>
            </button>

            {selected === v.id && (
              <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: 16, marginTop: 4 }}>
                {TENSES.map((t) => (
                  <div key={t} style={{ marginBottom: 16 }}>
                    <div style={{ color: "#818cf8", fontSize: 13, fontWeight: 700, marginBottom: 8 }}>{TENSE_LABELS[t]}</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                      {PRONOUNS.map((p) => {
                        const c = verbs[`${v.id}_${t}_${p}`];
                        const m = c && c.reps > 0 ? c.correct / (c.correct + c.wrong + 0.001) : -1;
                        return (
                          <div key={p} style={{ display: "flex", justifyContent: "space-between", background: "#1e293b", borderRadius: 8, padding: "8px 12px" }}>
                            <span style={{ color: "#64748b", fontSize: 13 }}>{p}</span>
                            <span style={{ color: m === -1 ? "#94a3b8" : m > 0.7 ? "#86efac" : m > 0.4 ? "#fbbf24" : "#fca5a5", fontWeight: 600, fontSize: 13 }}>
                              {v[t][p]}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 16, fontSize: 12, color: "#64748b", flexWrap: "wrap" }}>
        <span>⬛ Not started</span>
        <span style={{ color: "#fca5a5" }}>🟥 Weak</span>
        <span style={{ color: "#fbbf24" }}>🟨 Learning</span>
        <span style={{ color: "#86efac" }}>🟩 Mastered</span>
      </div>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function App() {
  const [state, setState] = useState(() => initState());
  const [screen, setScreen] = useState("home");
  const [sessionPhase, setSessionPhase] = useState("vocab");
  const [sessionCards, setSessionCards] = useState({ vocab: [], verbs: [], situations: [] });
  const [todaySituation, setTodaySituation] = useState("restaurant");
  // "off" | "syncing" | "synced" | "error"  — shown in the Sync panel
  const [syncStatus, setSyncStatus] = useState("syncing");
  // Hold off pushing to the shared file until the initial pull has finished,
  // so a freshly-opened device can't overwrite good data with its empty start.
  const [hydrated, setHydrated] = useState(false);

  // On startup, pull the shared copy from data/progress.json (via the dev
  // server). If it's newer than what's on this device, adopt it. Newest-wins
  // keeps two devices (synced via OneDrive) consistent for normal solo use.
  useEffect(() => {
    let cancelled = false;
    pullState()
      .then((shared) => {
        if (cancelled) return;
        if (!fileSyncAvailable()) {
          setSyncStatus("off");
        } else {
          if (shared && (shared.savedAt || 0) > (state.savedAt || 0)) {
            setState(shared);
          }
          setSyncStatus("synced");
        }
        setHydrated(true);
      })
      .catch(() => { if (!cancelled) { setSyncStatus("error"); setHydrated(true); } });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Always save locally; push to the shared file (debounced) once hydrated.
  // The fresh timestamp on every save is what newest-wins uses to pick
  // between devices.
  useEffect(() => {
    const stamped = { ...state, savedAt: Date.now() };
    saveState(stamped);
    if (hydrated) pushState(stamped);
  }, [state, hydrated]);

  useEffect(() => {
    const today = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    setState((s) => {
      let next = s;
      if (s.lastDate !== today && s.lastDate !== yesterday.toDateString() && s.lastDate !== null) {
        next = { ...next, streak: 0 };
      }
      if (s.lastSessionDate !== today) {
        next = { ...next, sessionDone: { vocab: false, verbs: false, situations: false }, lastSessionDate: today };
      }
      return next;
    });

    const sitKeys = Object.keys(SITUATIONS);
    const dayOfYear = Math.floor(Date.now() / 86400000);
    setTodaySituation(sitKeys[dayOfYear % sitKeys.length]);
  }, []);

  function buildSessionCards() {
    const now = Date.now();
    const dayMs = 86400000;

    // Vocab: up to 10 due/new cards — mix of both directions
    const vocabDue = [];
    VOCAB.forEach((w) => {
      ["en-es", "es-en"].forEach((dir) => {
        const c = state.vocab[`${w.id}_${dir}`];
        if (!c || c.reps === 0 || now >= c.due * dayMs) {
          vocabDue.push({ id: w.id, direction: dir });
        }
      });
    });
    const vocabCards = shuffle(vocabDue).slice(0, 10);

    // Verbs: up to 12 due/new combos
    const verbCombos = [];
    VERBS.forEach((v) => {
      TENSES.forEach((t) => {
        PRONOUNS.forEach((p) => {
          const c = state.verbs[`${v.id}_${t}_${p}`];
          if (!c || c.reps === 0 || now >= c.due * dayMs) {
            verbCombos.push({ verbId: v.id, tense: t, pronoun: p });
          }
        });
      });
    });
    const verbCards = shuffle(verbCombos).slice(0, 12);

    // Situations: up to 6 due/new sentences from today's theme
    const sit = SITUATIONS[todaySituation];
    const sitDue = sit.sentences
      .map((_, i) => ({ sentenceIdx: i }))
      .filter((c) => {
        const card = state.situations[`${todaySituation}_${c.sentenceIdx}`];
        return !card || card.reps === 0 || now >= card.due * dayMs;
      });
    const sitCards = shuffle(sitDue).slice(0, 6);

    setSessionCards({ vocab: vocabCards, verbs: verbCards, situations: sitCards });
  }

  function startSession() {
    buildSessionCards();
    setSessionPhase(!state.sessionDone.vocab ? "vocab" : !state.sessionDone.verbs ? "verbs" : "situations");
    setScreen("session");
  }

  function applyResults(type, results) {
    const now = Date.now();
    const dayMs = 86400000;
    setState((s) => {
      const pool = { ...s[type] };
      results.forEach(({ id, correct }) => {
        const card = { ...(pool[id] || DEFAULT_CARD) };
        const updated = sm2(correct, card.easiness, card.interval, card.reps);
        pool[id] = { ...card, ...updated, due: Math.floor((now + updated.interval * dayMs) / dayMs), correct: card.correct + (correct ? 1 : 0), wrong: card.wrong + (correct ? 0 : 1) };
      });
      const next = { ...s, [type]: pool, xp: s.xp + results.filter((r) => r.correct).length * 10, sessionDone: { ...s.sessionDone, [type]: true } };
      if (type === "situations") { next.streak = s.streak + 1; next.lastDate = new Date().toDateString(); }
      return next;
    });
  }

  const allDone = state.sessionDone.vocab && state.sessionDone.verbs && state.sessionDone.situations;

  // Header stats
  const vocabMastered = VOCAB.filter((w) => {
    const ok = (dir) => { const c = state.vocab[`${w.id}_${dir}`]; return c && c.reps > 0 && c.correct / (c.correct + c.wrong + 0.001) > 0.7; };
    return ok("en-es") && ok("es-en");
  }).length;

  const totalVerbSlots = VERBS.length * TENSES.length * PRONOUNS.length;
  const verbMastered = VERBS.reduce((acc, v) =>
    acc + TENSES.reduce((a2, t) =>
      a2 + PRONOUNS.filter((p) => { const c = state.verbs[`${v.id}_${t}_${p}`]; return c && c.reps > 0 && c.correct / (c.correct + c.wrong + 0.001) > 0.7; }).length, 0), 0);

  return (
    <div style={{ fontFamily: "Georgia, serif", background: "#020817", minHeight: "100vh", color: "#f1f5f9", maxWidth: 480, margin: "0 auto", paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)", padding: "20px 20px 16px", borderBottom: "1px solid #1e293b" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: -1 }}>🇪🇸 <span style={{ color: "#f59e0b" }}>Español</span> Pro</div>
            <div style={{ fontSize: 12, color: "#475569", marginTop: 2 }}>Your structured daily session</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#f59e0b" }}>🔥 {state.streak}</div>
            <div style={{ fontSize: 11, color: "#475569" }}>day streak</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
          <div style={{ flex: 1, background: "#0f172a", borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#f59e0b" }}>{state.xp}</div>
            <div style={{ fontSize: 11, color: "#475569" }}>XP</div>
          </div>
          <div style={{ flex: 1, background: "#0f172a", borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#818cf8" }}>{vocabMastered}/{VOCAB.length}</div>
            <div style={{ fontSize: 11, color: "#475569" }}>words</div>
          </div>
          <div style={{ flex: 1, background: "#0f172a", borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#34d399" }}>{verbMastered}/{totalVerbSlots}</div>
            <div style={{ fontSize: 11, color: "#475569" }}>verb forms</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div style={{ display: "flex", borderBottom: "1px solid #1e293b", background: "#0a0f1e" }}>
        {[["home","🏠","Home"],["grid","📊","Verbs"],["reference","📖","Reference"]].map(([s, icon, label]) => (
          <button key={s} onClick={() => setScreen(s)}
            style={{ flex: 1, background: "none", border: "none", padding: "12px 0", color: screen === s ? "#f59e0b" : "#475569", fontSize: 12, fontWeight: screen === s ? 700 : 400, cursor: "pointer", borderBottom: screen === s ? "2px solid #f59e0b" : "2px solid transparent" }}>
            {icon}<br />{label}
          </button>
        ))}
      </div>

      <div style={{ padding: "20px 16px" }}>
        {/* HOME */}
        {screen === "home" && (
          <div>
            {allDone ? (
              <div style={{ textAlign: "center", padding: "40px 20px", background: "#0f172a", borderRadius: 20, border: "1px solid #1e293b" }}>
                <div style={{ fontSize: 56 }}>🎉</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: "#f59e0b", marginTop: 12 }}>Today's Session Done!</div>
                <div style={{ color: "#64748b", marginTop: 8 }}>Come back tomorrow for your next session.</div>
                <div style={{ color: "#f59e0b", fontSize: 20, fontWeight: 700, marginTop: 16 }}>🔥 {state.streak} day streak!</div>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>Today's Session</div>
                <div style={{ color: "#64748b", fontSize: 14, marginBottom: 20 }}>~30 minutes · 3 blocks · mistakes reviewed until correct</div>

                {[
                  { key: "vocab", icon: "📚", label: "Vocabulary", desc: "255 words · both directions · spaced repetition", color: "#f59e0b", mins: "10 min" },
                  { key: "verbs", icon: "🔤", label: "Verb Drills", desc: "100 verbs · present, past & future", color: "#818cf8", mins: "10 min" },
                  { key: "situations", icon: SITUATIONS[todaySituation].icon, label: SITUATIONS[todaySituation].label, desc: "Real-world sentences", color: "#34d399", mins: "10 min" },
                ].map(({ key, icon, label, desc, color, mins }) => (
                  <div key={key} style={{ background: "#0f172a", border: `1px solid ${state.sessionDone[key] ? color + "44" : "#1e293b"}`, borderRadius: 16, padding: 16, marginBottom: 12, display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ fontSize: 28 }}>{state.sessionDone[key] ? "✅" : icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: state.sessionDone[key] ? color : "#f1f5f9" }}>{label}</div>
                      <div style={{ fontSize: 13, color: "#475569" }}>{desc}</div>
                    </div>
                    <div style={{ fontSize: 12, color: "#334155" }}>{mins}</div>
                  </div>
                ))}

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                  <span style={{ color: "#64748b", fontSize: 13 }}>Hard mode (type everything, no hints)</span>
                  <button onClick={() => setState((s) => ({ ...s, hardMode: !s.hardMode }))}
                    style={{ background: state.hardMode ? "#f59e0b" : "#1e293b", border: "none", borderRadius: 99, width: 48, height: 26, cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
                    <div style={{ position: "absolute", top: 3, left: state.hardMode ? 24 : 4, width: 20, height: 20, borderRadius: "50%", background: state.hardMode ? "#0f172a" : "#475569", transition: "left 0.2s" }} />
                  </button>
                </div>

                <button onClick={startSession} style={{ ...btnStyle("#f59e0b"), marginTop: 20, fontSize: 18, padding: 18 }}>
                  {state.sessionDone.vocab || state.sessionDone.verbs ? "Continue Session →" : "Start Today's Session →"}
                </button>
              </div>
            )}

            <SyncPanel status={syncStatus} />
          </div>
        )}

        {/* SESSION */}
        {screen === "session" && (
          <div>
            <button onClick={() => setScreen("home")} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", marginBottom: 16, fontSize: 14 }}>← Back</button>

            {sessionPhase === "vocab" && !state.sessionDone.vocab && (
              <VocabExercise cards={sessionCards.vocab} hardMode={state.hardMode}
                onComplete={(results) => { applyResults("vocab", results); setSessionPhase("verbs"); }} />
            )}
            {sessionPhase === "verbs" && !state.sessionDone.verbs && (
              <VerbExercise cards={sessionCards.verbs} hardMode={state.hardMode}
                onComplete={(results) => { applyResults("verbs", results); setSessionPhase("situations"); }} />
            )}
            {sessionPhase === "situations" && !state.sessionDone.situations && (
              <SituationExercise situationKey={todaySituation} cards={sessionCards.situations} hardMode={state.hardMode}
                onComplete={(results) => { applyResults("situations", results); setScreen("home"); }} />
            )}
            {allDone && (
              <div style={{ textAlign: "center", padding: 32 }}>
                <div style={{ fontSize: 48 }}>🎉</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#f59e0b" }}>All done!</div>
                <button onClick={() => setScreen("home")} style={btnStyle("#f59e0b")}>Home</button>
              </div>
            )}
          </div>
        )}

        {/* VERB GRID */}
        {screen === "grid" && (
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>Verb Mastery Grid</div>
            <div style={{ color: "#64748b", fontSize: 14, marginBottom: 20 }}>100 verbs · track progress across all tenses</div>
            <VerbGrid verbs={state.verbs} />
          </div>
        )}

        {/* REFERENCE */}
        {screen === "reference" && (
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>Quick Reference</div>
            <div style={{ color: "#64748b", fontSize: 14, marginBottom: 20 }}>Situations & vocabulary lookup</div>

            {Object.entries(SITUATIONS).map(([key, sit]) => (
              <details key={key} style={{ marginBottom: 12 }}>
                <summary style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: "14px 16px", cursor: "pointer", fontWeight: 700, listStyle: "none", display: "flex", justifyContent: "space-between" }}>
                  <span>{sit.icon} {sit.label}</span><span style={{ color: "#475569" }}>▼</span>
                </summary>
                <div style={{ background: "#0a0f1e", border: "1px solid #1e293b", borderTop: "none", borderRadius: "0 0 12px 12px", padding: 12 }}>
                  {sit.sentences.map((s, i) => (
                    <div key={i} style={{ padding: "10px 0", borderBottom: i < sit.sentences.length - 1 ? "1px solid #1e293b" : "none" }}>
                      <div style={{ color: "#94a3b8", fontSize: 13 }}>{s.en}</div>
                      <div style={{ color: "#f59e0b", fontWeight: 600, marginTop: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        {s.es}
                        <button onClick={() => speak(s.es)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16 }}>🔊</button>
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            ))}

            <div style={{ marginTop: 24, fontSize: 16, fontWeight: 800, marginBottom: 12 }}>Vocabulary ({VOCAB.length} words)</div>
            {Object.entries(
              VOCAB.reduce((acc, w) => { (acc[w.theme] = acc[w.theme] || []).push(w); return acc; }, {})
            ).map(([theme, words]) => (
              <details key={theme} style={{ marginBottom: 10 }}>
                <summary style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: "12px 16px", cursor: "pointer", fontWeight: 600, color: "#818cf8", listStyle: "none", display: "flex", justifyContent: "space-between", textTransform: "capitalize" }}>
                  <span>{theme} ({words.length})</span><span style={{ color: "#475569" }}>▼</span>
                </summary>
                <div style={{ background: "#0a0f1e", border: "1px solid #1e293b", borderTop: "none", borderRadius: "0 0 12px 12px", padding: "8px 12px" }}>
                  {words.map((w) => (
                    <div key={w.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #1e293b", alignItems: "center" }}>
                      <span style={{ color: "#94a3b8", fontSize: 14 }}>{w.en}</span>
                      <span style={{ color: "#f59e0b", fontWeight: 600, fontSize: 14, display: "flex", gap: 8, alignItems: "center" }}>
                        {w.es}
                        <button onClick={() => speak(w.es)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14 }}>🔊</button>
                      </span>
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
