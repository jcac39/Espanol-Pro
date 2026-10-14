// Español Pro — app shell: header stats, navigation, daily-session flow and
// state persistence. Drill screens live in ./components.

import { useState, useEffect } from "react";
import { VOCAB, VERBS, SITUATIONS, PRONOUNS, TENSES } from "./data/content.js";
import { shuffle, sm2, DEFAULT_CARD, isDue, masteryRatio, localDayNumber } from "./lib/helpers.js";
import { loadState, saveState } from "./lib/storage.js";
import { btnStyle } from "./components/ui.jsx";
import VocabExercise from "./components/VocabExercise.jsx";
import VerbExercise from "./components/VerbExercise.jsx";
import SituationExercise from "./components/SituationExercise.jsx";
import VerbGrid from "./components/VerbGrid.jsx";
import Reference from "./components/Reference.jsx";
import BackupPanel from "./components/BackupPanel.jsx";

const BLOCKS = ["vocab", "verbs", "situations"];
const SESSION_SIZE = { vocab: 10, verbs: 12, situations: 6 };
const SITUATION_KEYS = Object.keys(SITUATIONS);

// ─── DAY ROLLOVER ────────────────────────────────────────────────────────────

// Reset today's session and break the streak if a day was missed. Runs on
// launch AND whenever the app returns to the foreground, because iOS often
// resumes a home-screen app from memory instead of reloading it.
function rollOverDay(s) {
  const today = new Date().toDateString();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  let next = s;
  if (s.lastDate !== null && s.lastDate !== today && s.lastDate !== yesterday.toDateString()) {
    next = { ...next, streak: 0 };
  }
  if (s.lastSessionDate !== today) {
    next = { ...next, sessionDone: { vocab: false, verbs: false, situations: false }, lastSessionDate: today };
  }
  return next;
}

// ─── SESSION BUILDING ────────────────────────────────────────────────────────

function buildSessionCards(state, situationKey, today) {
  const vocab = [];
  VOCAB.forEach((w) => {
    ["en-es", "es-en"].forEach((dir) => {
      if (isDue(state.vocab[`${w.id}_${dir}`], today)) vocab.push({ id: w.id, direction: dir });
    });
  });

  const verbs = [];
  VERBS.forEach((v) => {
    TENSES.forEach((t) => {
      PRONOUNS.forEach((p) => {
        if (isDue(state.verbs[`${v.id}_${t}_${p}`], today)) verbs.push({ verbId: v.id, tense: t, pronoun: p });
      });
    });
  });

  const situations = SITUATIONS[situationKey].sentences
    .map((_, i) => ({ sentenceIdx: i }))
    .filter((c) => isDue(state.situations[`${situationKey}_${c.sentenceIdx}`], today));

  return {
    vocab: shuffle(vocab).slice(0, SESSION_SIZE.vocab),
    verbs: shuffle(verbs).slice(0, SESSION_SIZE.verbs),
    situations: shuffle(situations).slice(0, SESSION_SIZE.situations),
  };
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function App() {
  const [state, setState] = useState(() => rollOverDay(loadState()));
  const [today, setToday] = useState(localDayNumber);
  const [screen, setScreen] = useState("home");
  const [sessionPhase, setSessionPhase] = useState("vocab");
  const [sessionCards, setSessionCards] = useState({ vocab: [], verbs: [], situations: [] });

  const todaySituation = SITUATION_KEYS[today % SITUATION_KEYS.length];

  useEffect(() => { saveState(state); }, [state]);

  useEffect(() => {
    function onVisible() {
      if (document.visibilityState !== "visible") return;
      setToday(localDayNumber());
      setState(rollOverDay);
    }
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

  function applyResults(type, results) {
    setState((s) => {
      const pool = { ...s[type] };
      results.forEach(({ id, correct }) => {
        const card = { ...(pool[id] || DEFAULT_CARD) };
        const updated = sm2(correct, card.easiness, card.interval, card.reps);
        pool[id] = {
          ...card, ...updated,
          due: today + updated.interval,
          correct: card.correct + (correct ? 1 : 0),
          wrong: card.wrong + (correct ? 0 : 1),
        };
      });
      const next = { ...s, [type]: pool, xp: s.xp + results.filter((r) => r.correct).length * 10, sessionDone: { ...s.sessionDone, [type]: true } };
      if (type === "situations") { next.streak = s.streak + 1; next.lastDate = new Date().toDateString(); }
      return next;
    });
  }

  // Next unfinished block that actually has cards. Blocks with nothing due
  // are marked done straight away rather than showing an empty "0 / 0" drill.
  function advanceFrom(afterIdx, cards) {
    for (let i = afterIdx + 1; i < BLOCKS.length; i++) {
      const block = BLOCKS[i];
      if (state.sessionDone[block]) continue;
      if (cards[block].length === 0) { applyResults(block, []); continue; }
      setSessionPhase(block);
      setScreen("session");
      return;
    }
    setScreen("home");
  }

  function startSession() {
    const cards = buildSessionCards(state, todaySituation, today);
    setSessionCards(cards);
    advanceFrom(-1, cards);
  }

  function completeBlock(block, results) {
    applyResults(block, results);
    advanceFrom(BLOCKS.indexOf(block), sessionCards);
  }

  const allDone = BLOCKS.every((b) => state.sessionDone[b]);

  // Header stats
  const isMastered = (c) => c && c.reps > 0 && masteryRatio(c) > 0.7;
  const vocabMastered = VOCAB.filter((w) => isMastered(state.vocab[`${w.id}_en-es`]) && isMastered(state.vocab[`${w.id}_es-en`])).length;
  const totalVerbSlots = VERBS.length * TENSES.length * PRONOUNS.length;
  const verbMastered = Object.values(state.verbs).filter(isMastered).length;

  const sit = SITUATIONS[todaySituation];
  const blockCards = [
    { key: "vocab", icon: "📚", label: "Vocabulary", desc: `${VOCAB.length} words · both directions · spaced repetition`, color: "#f59e0b" },
    { key: "verbs", icon: "🔤", label: "Verb Drills", desc: `${VERBS.length} verbs · present, past & future`, color: "#818cf8" },
    { key: "situations", icon: sit.icon, label: sit.label, desc: "Real-world sentences", color: "#34d399" },
  ];

  return (
    <div style={{ fontFamily: "Georgia, serif", background: "#020817", minHeight: "100vh", color: "#f1f5f9", maxWidth: 480, margin: "0 auto", paddingBottom: "calc(env(safe-area-inset-bottom) + 80px)" }}>
      {/* Header — top padding clears the iPhone status bar / notch */}
      <div style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)", padding: "calc(env(safe-area-inset-top) + 20px) 20px 16px", borderBottom: "1px solid #1e293b" }}>
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
          {[
            [state.xp, "XP", "#f59e0b"],
            [`${vocabMastered}/${VOCAB.length}`, "words", "#818cf8"],
            [`${verbMastered}/${totalVerbSlots}`, "verb forms", "#34d399"],
          ].map(([value, label, color]) => (
            <div key={label} style={{ flex: 1, background: "#0f172a", borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 800, color }}>{value}</div>
              <div style={{ fontSize: 11, color: "#475569" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Nav */}
      <div style={{ display: "flex", borderBottom: "1px solid #1e293b", background: "#0a0f1e" }}>
        {[["home", "🏠", "Home"], ["grid", "📊", "Verbs"], ["reference", "📖", "Reference"]].map(([s, icon, label]) => (
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

                {blockCards.map(({ key, icon, label, desc, color }) => (
                  <div key={key} style={{ background: "#0f172a", border: `1px solid ${state.sessionDone[key] ? color + "44" : "#1e293b"}`, borderRadius: 16, padding: 16, marginBottom: 12, display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ fontSize: 28 }}>{state.sessionDone[key] ? "✅" : icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: state.sessionDone[key] ? color : "#f1f5f9" }}>{label}</div>
                      <div style={{ fontSize: 13, color: "#475569" }}>{desc}</div>
                    </div>
                    <div style={{ fontSize: 12, color: "#334155" }}>10 min</div>
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

            <BackupPanel
              state={state}
              onRestore={(restored) => setState(rollOverDay(restored))}
              onBackedUp={(at) => setState((s) => ({ ...s, lastBackupAt: at }))}
            />
          </div>
        )}

        {/* SESSION — keyed by block so each drill starts with fresh state */}
        {screen === "session" && (
          <div>
            <button onClick={() => setScreen("home")} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", marginBottom: 16, fontSize: 14 }}>← Back</button>

            {sessionPhase === "vocab" && !state.sessionDone.vocab && (
              <VocabExercise key="vocab" cards={sessionCards.vocab} hardMode={state.hardMode}
                onComplete={(results) => completeBlock("vocab", results)} />
            )}
            {sessionPhase === "verbs" && !state.sessionDone.verbs && (
              <VerbExercise key="verbs" cards={sessionCards.verbs} hardMode={state.hardMode}
                onComplete={(results) => completeBlock("verbs", results)} />
            )}
            {sessionPhase === "situations" && !state.sessionDone.situations && (
              <SituationExercise key="situations" situationKey={todaySituation} cards={sessionCards.situations} hardMode={state.hardMode}
                onComplete={(results) => completeBlock("situations", results)} />
            )}
          </div>
        )}

        {/* VERB GRID */}
        {screen === "grid" && (
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>Verb Mastery Grid</div>
            <div style={{ color: "#64748b", fontSize: 14, marginBottom: 20 }}>{VERBS.length} verbs · track progress across all tenses</div>
            <VerbGrid verbs={state.verbs} />
          </div>
        )}

        {screen === "reference" && <Reference />}
      </div>
    </div>
  );
}
