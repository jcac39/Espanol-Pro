// Small presentational building blocks shared by every screen.

export function btnStyle(color) {
  return {
    display: "block", width: "100%", marginTop: 14,
    background: color, color: "#0f172a", border: "none",
    borderRadius: 12, padding: "14px 18px", fontSize: 16,
    fontWeight: 800, cursor: "pointer", letterSpacing: 0.5,
  };
}

export const inputStyle = (feedback) => ({
  width: "100%",
  background: "#1e293b",
  border: `1px solid ${feedback === "correct" ? "#22c55e" : feedback === "wrong" ? "#ef4444" : "#334155"}`,
  borderRadius: 12,
  padding: "14px 16px",
  fontSize: 17, // NOTE: must stay ≥16px or iOS Safari zooms in on focus
  color: "#f1f5f9",
  outline: "none",
  boxSizing: "border-box",
});

// iOS autocorrect/autocapitalise would "fix" Spanish answers into English
// words and mark them wrong, so every answer box turns them off.
export const ANSWER_INPUT_PROPS = {
  autoCorrect: "off",
  autoCapitalize: "none",
  autoComplete: "off",
  spellCheck: false,
};

export function ProgressBar({ value, max, color = "#f59e0b" }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div style={{ background: "#1e293b", borderRadius: 99, height: 8, overflow: "hidden" }}>
      <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 99, transition: "width 0.4s" }} />
    </div>
  );
}

export function Badge({ children, color = "#f59e0b" }) {
  return (
    <span style={{ background: color + "22", color, border: `1px solid ${color}44`, borderRadius: 99, padding: "2px 10px", fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>
      {children}
    </span>
  );
}

export function QuestionCard({ children }) {
  return (
    <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 16, padding: "28px 20px", margin: "20px 0", textAlign: "center" }}>
      {children}
    </div>
  );
}

export function FeedbackPanel({ feedback, correctText, wrongText, onNext, nextLabel = "Next →" }) {
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

// Wrong-answer text, with a specific hint when only the article was missing.
export function wrongMessage(prefix, answer, missingArticle) {
  return missingArticle
    ? `✗ Nearly — don't forget the article: ${answer}`
    : `✗ ${prefix}${answer}`;
}

// A multiple-choice option list, coloured once an answer has been given.
export function ChoiceList({ choices, correct, picked, feedback, onPick, fontSize = 16 }) {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      {choices.map((c) => {
        let bg = "#1e293b"; let col = "#cbd5e1";
        if (feedback) {
          if (c === correct) { bg = "#14532d"; col = "#86efac"; }
          else if (c === picked) { bg = "#7f1d1d"; col = "#fca5a5"; }
        }
        return (
          <button key={c} disabled={!!feedback} onClick={() => onPick(c)}
            style={{ background: bg, color: col, border: `1px solid ${col}22`, borderRadius: 12, padding: "14px 18px", fontSize, cursor: feedback ? "default" : "pointer", textAlign: "left", transition: "all 0.2s" }}>
            {c}
          </button>
        );
      })}
    </div>
  );
}

// Typed-answer box + Check button.
export function AnswerInput({ value, onChange, onSubmit, feedback, placeholder, color }) {
  return (
    <div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && !feedback && onSubmit()}
        disabled={!!feedback}
        placeholder={placeholder}
        autoFocus
        style={inputStyle(feedback)}
        {...ANSWER_INPUT_PROPS}
      />
      {!feedback && <button onClick={onSubmit} style={btnStyle(color)}>Check</button>}
    </div>
  );
}

// Header row above every drill: block badge + running score.
export function DrillHeader({ label, color, idx, total, score }) {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <Badge color={color}>{label} {idx + 1}/{total}</Badge>
        <span style={{ color: "#64748b", fontSize: 13 }}>⭐ {score} correct</span>
      </div>
      <ProgressBar value={idx} max={total} color={color} />
    </>
  );
}
