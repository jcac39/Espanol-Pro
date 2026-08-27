import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";

// Serves progress.json to the app so progress can live in this project
// folder (and therefore sync via OneDrive) instead of an external service.
// Dev-server only — not present in a production build.
const DATA_DIR = path.resolve(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "progress.json");

function progressFileApi() {
  return {
    name: "progress-file-api",
    configureServer(server) {
      server.middlewares.use("/api/progress", (req, res) => {
        if (req.method === "GET") {
          fs.readFile(DATA_FILE, "utf-8", (err, raw) => {
            if (err) {
              res.statusCode = 404;
              res.end("null");
              return;
            }
            res.setHeader("Content-Type", "application/json");
            res.end(raw);
          });
          return;
        }

        if (req.method === "POST") {
          let body = "";
          req.on("data", (chunk) => { body += chunk; });
          req.on("end", () => {
            try {
              JSON.parse(body); // validate before writing
              fs.mkdirSync(DATA_DIR, { recursive: true });
              fs.writeFileSync(DATA_FILE, body);
              res.statusCode = 200;
              res.end("ok");
            } catch (e) {
              res.statusCode = 500;
              res.end(String(e));
            }
          });
          return;
        }

        res.statusCode = 405;
        res.end();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), progressFileApi()],
});
