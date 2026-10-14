// Read-only lookup of every situation sentence and vocab word, with audio.

import { VOCAB, SITUATIONS } from "../data/content.js";
import { speak } from "../lib/helpers.js";

const summaryStyle = { background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between" };
const bodyStyle = { background: "#0a0f1e", border: "1px solid #1e293b", borderTop: "none", borderRadius: "0 0 12px 12px" };
const speakBtn = { background: "none", border: "none", cursor: "pointer" };

export default function Reference() {
  const byTheme = VOCAB.reduce((acc, w) => { (acc[w.theme] = acc[w.theme] || []).push(w); return acc; }, {});

  return (
    <div>
      <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>Quick Reference</div>
      <div style={{ color: "#64748b", fontSize: 14, marginBottom: 20 }}>Situations & vocabulary lookup</div>

      {Object.entries(SITUATIONS).map(([key, sit]) => (
        <details key={key} style={{ marginBottom: 12 }}>
          <summary style={{ ...summaryStyle, padding: "14px 16px", fontWeight: 700 }}>
            <span>{sit.icon} {sit.label}</span><span style={{ color: "#475569" }}>▼</span>
          </summary>
          <div style={{ ...bodyStyle, padding: 12 }}>
            {sit.sentences.map((s, i) => (
              <div key={i} style={{ padding: "10px 0", borderBottom: i < sit.sentences.length - 1 ? "1px solid #1e293b" : "none" }}>
                <div style={{ color: "#94a3b8", fontSize: 13 }}>{s.en}</div>
                <div style={{ color: "#f59e0b", fontWeight: 600, marginTop: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {s.es}
                  <button onClick={() => speak(s.es)} style={{ ...speakBtn, fontSize: 16 }}>🔊</button>
                </div>
              </div>
            ))}
          </div>
        </details>
      ))}

      <div style={{ marginTop: 24, fontSize: 16, fontWeight: 800, marginBottom: 12 }}>Vocabulary ({VOCAB.length} words)</div>
      {Object.entries(byTheme).map(([theme, words]) => (
        <details key={theme} style={{ marginBottom: 10 }}>
          <summary style={{ ...summaryStyle, padding: "12px 16px", fontWeight: 600, color: "#818cf8", textTransform: "capitalize" }}>
            <span>{theme} ({words.length})</span><span style={{ color: "#475569" }}>▼</span>
          </summary>
          <div style={{ ...bodyStyle, padding: "8px 12px" }}>
            {words.map((w) => (
              <div key={w.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #1e293b", alignItems: "center" }}>
                <span style={{ color: "#94a3b8", fontSize: 14 }}>{w.en}</span>
                <span style={{ color: "#f59e0b", fontWeight: 600, fontSize: 14, display: "flex", gap: 8, alignItems: "center" }}>
                  {w.es}
                  <button onClick={() => speak(w.es)} style={{ ...speakBtn, fontSize: 14 }}>🔊</button>
                </span>
              </div>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
