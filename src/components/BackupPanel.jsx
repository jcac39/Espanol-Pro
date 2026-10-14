// Export / import of progress. Progress only lives on this device, so this
// is the safety net if iOS clears the app's storage or the phone is replaced.

import { useRef, useState } from "react";
import { exportBackup, readBackup } from "../lib/storage.js";

const REMIND_AFTER_DAYS = 7;

const smallBtn = {
  flex: 1, background: "#1e293b", color: "#cbd5e1", border: "1px solid #334155",
  borderRadius: 10, padding: "10px 12px", fontSize: 14, fontWeight: 700, cursor: "pointer",
};

export default function BackupPanel({ state, onRestore, onBackedUp }) {
  const fileRef = useRef(null);
  const [message, setMessage] = useState(null);

  const daysSince = state.lastBackupAt ? Math.floor((Date.now() - state.lastBackupAt) / 86400000) : null;
  const overdue = daysSince === null || daysSince >= REMIND_AFTER_DAYS;
  const status = daysSince === null ? "Never backed up"
    : daysSince === 0 ? "Backed up today"
    : `Last backup ${daysSince} day${daysSince !== 1 ? "s" : ""} ago`;

  async function handleExport() {
    try {
      // Stamp first so the exported file itself records when it was made
      const stamped = { ...state, lastBackupAt: Date.now() };
      if (await exportBackup(stamped)) {
        onBackedUp(stamped.lastBackupAt);
        setMessage({ ok: true, text: "Backup saved." });
      }
    } catch (e) {
      setMessage({ ok: false, text: `Backup failed: ${e.message}` });
    }
  }

  async function handleImport(e) {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow picking the same file again later
    if (!file) return;
    try {
      const restored = await readBackup(file);
      if (!window.confirm("Replace ALL current progress with this backup?")) return;
      onRestore(restored);
      setMessage({ ok: true, text: "Progress restored." });
    } catch (err) {
      setMessage({ ok: false, text: err.message });
    }
  }

  return (
    <div style={{ marginTop: 24, background: "#0f172a", border: `1px solid ${overdue ? "#78350f" : "#1e293b"}`, borderRadius: 14, padding: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontWeight: 700, fontSize: 14 }}>💾 Backup</span>
        <span style={{ color: overdue ? "#fbbf24" : "#64748b", fontSize: 13 }}>{status}</span>
      </div>
      <div style={{ color: "#64748b", fontSize: 13, marginTop: 8, lineHeight: 1.5 }}>
        Progress is stored only on this phone. Save a backup to Files / iCloud Drive now and then.
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        <button onClick={handleExport} style={smallBtn}>Save backup</button>
        <button onClick={() => fileRef.current?.click()} style={smallBtn}>Restore…</button>
      </div>
      <input ref={fileRef} type="file" accept="application/json,.json" onChange={handleImport} style={{ display: "none" }} />
      {message && (
        <div style={{ marginTop: 10, fontSize: 13, color: message.ok ? "#86efac" : "#fca5a5" }}>{message.text}</div>
      )}
    </div>
  );
}
