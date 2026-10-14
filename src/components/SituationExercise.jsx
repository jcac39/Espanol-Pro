// Situational sentence drill: translate an English sentence into Spanish,
// either by typing it or (easy mode) by tapping words from a scrambled bank.

import { useState, useEffect } from "react";
import { SITUATIONS } from "../data/content.js";
import { shuffle, checkAnswer, speak } from "../lib/helpers.js";
import { btnStyle, QuestionCard, FeedbackPanel, AnswerInput, DrillHeader } from "./ui.jsx";
import { MistakeReview, DrillDone } from "./review.jsx";

const COLOR = "#34d399";
const DECOY_WORDS = ["muy", "también", "pero", "con", "de", "la", "el"];

function SentencePrompt({ sentence, icon }) {
  return (
    <QuestionCard>
      <div style={{ color: "#64748b", fontSize: 13, letterSpacing: 2 }}>{icon ? `${icon} ` : ""}SAY IN SPANISH</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: "#f1f5f9", marginTop: 10 }}>{sentence.en}</div>
    </QuestionCard>
  );
}

export default function SituationExercise({ situationKey, cards, hardMode, onComplete }) {
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
      const words = sit.sentences[card.sentenceIdx].es.split(" ");
      const extras = shuffle(DECOY_WORDS.filter((d) => !words.includes(d))).slice(0, 2);
      setScrambled(shuffle([...words, ...extras]));
    }
  }, [idx, card, hardMode, sit]);

  if (phase === "review") {
    return (
      <MistakeReview
        mistakes={mistakes}
        color={COLOR}
        renderQuestion={({ sentenceIdx }) => <SentencePrompt sentence={sit.sentences[sentenceIdx]} icon={sit.icon} />}
        getCorrectAnswer={({ sentenceIdx }) => {
          const es = sit.sentences[sentenceIdx].es;
          return { answer: es, spoken: es };
        }}
        onComplete={() => onComplete(results)}
      />
    );
  }

  if (!card) {
    const wrongCards = results.filter((r) => !r.correct).map((r) => ({ sentenceIdx: r.sentenceIdx }));
    return (
      <DrillDone
        color={COLOR}
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
    if (!ans.trim()) return;
    const ok = checkAnswer(ans, sentence.es).correct;
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
      <DrillHeader label={`${sit.icon} ${sit.label.toUpperCase()}`} color={COLOR} idx={idx} total={cards.length} score={score} />
      <SentencePrompt sentence={sentence} />

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
              <button onClick={() => submit(assembled)} style={btnStyle(COLOR)}>Check</button>
              <button onClick={() => setPicked([])} style={{ ...btnStyle("#475569"), marginTop: 8 }}>Clear</button>
            </>
          )}
        </div>
      ) : (
        <AnswerInput value={input} onChange={setInput} onSubmit={() => submit(input)} feedback={feedback}
          placeholder="Type in Spanish…" color={COLOR} />
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
