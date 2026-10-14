import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// The production build is served from https://jcac39.github.io/Espanol-Pro/,
// so asset URLs need that prefix. Dev keeps the plain root.
const PAGES_BASE = "/Espanol-Pro/";

export default defineConfig(({ command }) => ({
  base: command === "build" ? PAGES_BASE : "/",
  plugins: [
    react(),
    // Installable home-screen app that works offline. New deploys are
    // picked up automatically the next time the app is opened online.
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["apple-touch-icon.png"],
      manifest: {
        name: "Español Pro",
        short_name: "Español",
        description: "Structured daily Spanish practice",
        theme_color: "#020817",
        background_color: "#020817",
        display: "standalone",
        orientation: "portrait",
        icons: [
          { src: "icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icon-512.png", sizes: "512x512", type: "image/png" },
        ],
      },
    }),
  ],
}));
