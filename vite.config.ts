// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  nitro: {
    preset: "vercel",
    // Proxies /api/** through this site's own domain to the separate backend
    // Vercel project, so the browser sees the auth cookie as first-party
    // instead of cross-domain — modern browsers (Chrome/Edge/Firefox) now
    // block cross-domain "third-party" cookies by default, which broke
    // admin login entirely once that rollout reached this project.
    routeRules: {
      "/api/**": { proxy: "https://grand-palace-backend.vercel.app/api/**" },
    },
  },
  vite: {
    plugins: [
      ViteImageOptimizer({
        jpg: { quality: 72 },
        jpeg: { quality: 72 },
        png: { quality: 72 },
        webp: { lossless: false, quality: 75 },
      }),
    ],
  },
});
