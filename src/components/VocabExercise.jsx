// Vocabulary drill. Each card is { id: "v12", direction: "en-es" | "es-en" }:
//   en-es: shown English word → type/pick Spanish
//   es-en: shown Spanish word → type/pick English

import { useState, useEffect } from "react";
import { VOCAB } from "../data/content.js";
import { shuffle, getDecoys, checkAnswer, speak } from "../lib/helpers.js";
import { QuestionCard, FeedbackPanel, ChoiceList, AnswerInput, DrillHeader, wrongMessage } from "./ui.jsx";
import { MistakeReview, DrillDone } from "./review.jsx";

const COLOR = "#f59e0b";

function findWord(id) {
  return VOCAB.find((v) => v.id === id);
}

function VocabPrompt({ word, isEnEs, size = 28 }) {
  return (
    <QuestionCard>
      <div style={{ color: "#64748b", fontSize: 13, marginBottom: 8, letterSpacing: 2 }}>
        {isEnEs ? "TRANSLATE TO SPANISH" : "TRANSLATE TO ENGLISH"}
      </div>
      <div style={{ fontSize: 11, color: isEnEs ? "#818cf8" : "#34d399", marginBottom: 10, fontWeight: 700 }}>
        {isEnEs ? "🇬🇧 → 🇪🇸" : "🇪🇸 → 🇬🇧"}
      </div>
      <div style={{ fontSize: size, fontWeight: 800, color: "#f1f5f9" }}>{isEnEs ? word.en : word.es}</div>
      {!isEnEs && (
        <button onClick={() => speak(word.es)} style={{ marginTop: 12, background: "none", border: "none", color: "#475569", cursor: "pointer", fontSize: 20 }}>🔊</button>
      )}
    </QuestionCard>
  );
}

export default function VocabExercise({ cards, hardMode, onComplete }) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [missingArticle, setMissingArticle] = useState(false);
  const [choices, setChoices] = useState([]);
  const [exType, setExType] = useState("mc");
  const [results, setResults] = useState([]);
  const [phase, setPhase] = useState("drill");
  const [mistakes, setMistakes] = useState([]);

  const card = cards[idx];
  const word = card ? findWord(card.id) : null;
  const isEnEs = card?.direction === "en-es";
  const answer = word ? (isEnEs ? word.es : word.en) : "";

  useEffect(() => {
    if (!card || !word) return;
    const t = hardMode ? "type" : Math.random() > 0.4 ? "mc" : "type";
    setExType(t);
    setInput("");
    setFeedback(null);
    if (t === "mc") {
      const pool = VOCAB.map((v) => (isEnEs ? v.es : v.en));
      setChoices(shuffle([answer, ...getDecoys(answer, pool)]));
    }
  }, [idx, card?.id, card?.direction, hardMode]);

  // Speak Spanish when the question is shown in ES→EN mode
  useEffect(() => {
    if (word && !isEnEs && phase === "drill") speak(word.es);
  }, [idx, phase]);

  if (phase === "review") {
    return (
      <MistakeReview
        mistakes={mistakes}
        color={COLOR}
        renderQuestion={(m) => <VocabPrompt word={findWord(m.id)} isEnEs={m.direction === "en-es"} size={26} />}
        getCorrectAnswer={(m) => {
          const w = findWord(m.id);
          return { answer: m.direction === "en-es" ? w.es : w.en, spoken: w.es };
        }}
        onComplete={() => onComplete(results)}
      />
    );
  }

  if (!card) {
    const wrongCards = results.filter((r) => !r.correct).map((r) => ({ id: r.vocabId, direction: r.direction }));
    return (
      <DrillDone
        color={COLOR}
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
    if (!ans.trim()) return;
    const result = checkAnswer(ans, answer);
    setFeedback(result.correct ? "correct" : "wrong");
    setMissingArticle(result.missingArticle);
    if (result.correct) { setScore((s) => s + 1); speak(word.es); }
    setResults((r) => [...r, { id: `${card.id}_${card.direction}`, vocabId: card.id, direction: card.direction, correct: result.correct }]);
  }

  return (
    <div>
      <DrillHeader label="VOCAB" color={COLOR} idx={idx} total={cards.length} score={score} />
      <VocabPrompt word={word} isEnEs={isEnEs} />

      {exType === "mc" ? (
        <ChoiceList choices={choices} correct={answer} picked={input} feedback={feedback}
          onPick={(c) => { setInput(c); submit(c); }} />
      ) : (
        <AnswerInput value={input} onChange={setInput} onSubmit={() => submit(input)} feedback={feedback}
          placeholder={isEnEs ? "Type in Spanish…" : "Type in English…"} color={COLOR} />
      )}

      {feedback && (
        <FeedbackPanel
          feedback={feedback}
          correctText={`✓ Correct! ${isEnEs ? "" : `(${word.es})`}`}
          wrongText={wrongMessage("Correct answer: ", answer, missingArticle)}
          onNext={() => setIdx((i) => i + 1)}
        />
      )}
    </div>
  );
}
