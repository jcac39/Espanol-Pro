// Cross-device sync via a JSON file in this project folder (data/progress.json).
//
// Because this folder lives in OneDrive, saving progress here syncs it between
// any machine that has the folder open (e.g. a PC and a laptop on the same
// Microsoft 365 account) — no external service involved.
//
// The read/write API is provided by a small dev-server plugin in
// vite.config.js, so this only works while `npm run dev` is running. If it's
// unavailable (e.g. a static build with no server), the app falls back to
// localStorage only, silently.

const API = "/api/progress";

let _available = false;
let _lastError = null;

export function fileSyncAvailable() {
  return _available;
}

export async function pullState() {
  try {
    const res = await fetch(API);
    if (res.status === 404) {
      _available = true;
      return null;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    _available = true;
    return (await res.json()) ?? null;
  } catch (e) {
    _available = false;
    _lastError = String(e);
    return null;
  }
}

let _pushTimer = null;

export function pushState(state) {
  clearTimeout(_pushTimer);
  _pushTimer = setTimeout(async () => {
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      _available = true;
      _lastError = null;
    } catch (e) {
      _available = false;
      _lastError = String(e);
    }
  }, 1500);
}

export function lastSyncError() {
  return _lastError;
}
