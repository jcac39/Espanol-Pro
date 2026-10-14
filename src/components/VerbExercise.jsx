// Verb conjugation drill. Each card is { verbId, tense, pronoun }.

import { useState, useEffect } from "react";
import { VERBS, TENSE_LABELS } from "../data/content.js";
import { shuffle, getDecoys, checkAnswer } from "../lib/helpers.js";
import { Badge, QuestionCard, FeedbackPanel, ChoiceList, AnswerInput, DrillHeader } from "./ui.jsx";
import { MistakeReview, DrillDone } from "./review.jsx";

const COLOR = "#818cf8";

function findVerb(id) {
  return VERBS.find((v) => v.id === id);
}

function VerbPrompt({ verb, tense, pronoun }) {
  return (
    <QuestionCard>
      <Badge color={COLOR}>{TENSE_LABELS[tense]}</Badge>
      <div style={{ fontSize: 13, color: "#64748b", marginTop: 12, letterSpacing: 2 }}>CONJUGATE</div>
      <div style={{ fontSize: 30, fontWeight: 800, color: "#f1f5f9", marginTop: 6 }}>{verb.infinitive}</div>
      <div style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>{verb.en}</div>
      <div style={{ fontSize: 20, color: "#a5b4fc", marginTop: 14, fontWeight: 600 }}>{pronoun} ___</div>
    </QuestionCard>
  );
}

export default function VerbExercise({ cards, hardMode, onComplete }) {
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
    const correct = findVerb(card.verbId)[card.tense][card.pronoun];
    const allForms = VERBS.flatMap((v) => Object.values(v[card.tense]));
    setChoices(shuffle([correct, ...getDecoys(correct, allForms)]));
  }, [idx, card]);

  if (phase === "review") {
    return (
      <MistakeReview
        mistakes={mistakes}
        color={COLOR}
        renderQuestion={({ verbId, tense, pronoun }) => <VerbPrompt verb={findVerb(verbId)} tense={tense} pronoun={pronoun} />}
        getCorrectAnswer={({ verbId, tense, pronoun }) => {
          const form = findVerb(verbId)[tense][pronoun];
          return { answer: form, spoken: `${pronoun} ${form}` };
        }}
        onComplete={() => onComplete(results)}
      />
    );
  }

  if (!card) {
    const wrongCards = results.filter((r) => !r.correct).map((r) => r.card);
    return (
      <DrillDone
        color={COLOR}
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
  const verb = findVerb(verbId);
  const correct = verb[tense][pronoun];

  function submit(ans) {
    if (!ans.trim()) return;
    const ok = checkAnswer(ans, correct).correct;
    setFeedback(ok ? "correct" : "wrong");
    if (ok) setScore((s) => s + 1);
    setResults((r) => [...r, { id: `${verbId}_${tense}_${pronoun}`, correct: ok, card }]);
  }

  return (
    <div>
      <DrillHeader label="VERBS" color={COLOR} idx={idx} total={cards.length} score={score} />
      <VerbPrompt verb={verb} tense={tense} pronoun={pronoun} />

      {!hardMode ? (
        <ChoiceList choices={choices} correct={correct} picked={input} feedback={feedback} fontSize={17}
          onPick={(c) => { setInput(c); submit(c); }} />
      ) : (
        <AnswerInput value={input} onChange={setInput} onSubmit={() => submit(input)} feedback={feedback}
          placeholder={`${pronoun}…`} color={COLOR} />
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
