// End-of-drill screens: the "N mistakes to fix" summary and the forced
// mistake-review loop (each wrong answer must be typed correctly to clear).

import { useState, useEffect } from "react";
import { shuffle, checkAnswer, speak } from "../lib/helpers.js";
import { btnStyle, Badge, ProgressBar, FeedbackPanel, AnswerInput, wrongMessage } from "./ui.jsx";

export function MistakeReview({ mistakes, color, renderQuestion, getCorrectAnswer, onComplete }) {
  const [queue, setQueue] = useState(() => shuffle([...mistakes]));
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [missingArticle, setMissingArticle] = useState(false);
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
  const { answer, spoken } = getCorrectAnswer(current);

  function submit() {
    if (!input.trim()) return;
    const result = checkAnswer(input, answer);
    setFeedback(result.correct ? "correct" : "wrong");
    setMissingArticle(result.missingArticle);
    if (result.correct && spoken) speak(spoken);
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
        <AnswerInput value={input} onChange={setInput} onSubmit={submit} feedback={feedback}
          placeholder="Type the correct answer…" color="#fb923c" />
      </div>
      {feedback && (
        <FeedbackPanel
          feedback={feedback}
          correctText="✓ Correct! Removed from review."
          wrongText={`${wrongMessage("Answer: ", answer, missingArticle)}. Comes round again.`}
          onNext={next}
          nextLabel={feedback === "correct" ? "Next →" : "Try Next →"}
        />
      )}
    </div>
  );
}

export function DrillDone({ color, title, score, total, mistakeCount, mistakeNoun, onFix, onContinue }) {
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
