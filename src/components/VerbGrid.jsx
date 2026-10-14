// Searchable verb list with a per-tense mastery heatmap; tap a verb to see
// its full conjugation table coloured by how well each form is known.

import { useState } from "react";
import { VERBS, PRONOUNS, TENSES, TENSE_LABELS } from "../data/content.js";
import { masteryRatio } from "../lib/helpers.js";
import { inputStyle } from "./ui.jsx";

function mastColor(m) {
  if (m === 0) return "#1e293b";
  if (m < 0.4) return "#7f1d1d";
  if (m < 0.7) return "#78350f";
  return "#14532d";
}

export default function VerbGrid({ verbs }) {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const q = search.toLowerCase();
  const filtered = VERBS.filter((v) => v.infinitive.includes(q) || v.en.toLowerCase().includes(q));

  function getMastery(verbId, tense) {
    const scores = PRONOUNS.map((p) => masteryRatio(verbs[`${verbId}_${tense}_${p}`]));
    return scores.reduce((a, b) => a + b, 0) / scores.length;
  }

  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search verbs…"
        autoCorrect="off" autoCapitalize="none" spellCheck={false}
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
                        const m = c && c.reps > 0 ? masteryRatio(c) : -1;
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
