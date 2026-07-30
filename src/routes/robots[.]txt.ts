import { createFileRoute } from "@tanstack/react-router";
import { API_URL } from "@/lib/admin-api";

const DEFAULT_ROBOTS_TXT = `User-agent: *
Allow: /

Sitemap: https://palace-art-reimagined-main.vercel.app/sitemap.xml`;

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () => {
        let body = DEFAULT_ROBOTS_TXT;
        try {
          const res = await fetch(`${API_URL}/api/seo/config`);
          if (res.ok) {
            const config = await res.json();
            if (config?.robotsTxt) body = config.robotsTxt;
          }
        } catch {
          // fall back to default below — a backend hiccup should never take robots.txt down
        }
        return new Response(body, {
          headers: { "content-type": "text/plain; charset=utf-8" },
        });
      },
    },
  },
});
