import { createFileRoute } from "@tanstack/react-router";
import { API_URL } from "@/lib/admin-api";
import { guidesContent } from "@/lib/guidesContent";
import { SITE_PAGES } from "@/lib/sitePages";

const SITE_URL = "https://palace-art-reimagined-main.vercel.app";

// Every static page currently on the site, from the single shared list (also
// used by the admin SEO panel) so the sitemap can never drift out of sync
// with what's actually manageable in admin.
const STATIC_PATHS = SITE_PAGES.map((p) => p.path);

const WHATS_ON_SLUGS = ["order-online", "birthday-party-packages", "mocktails-and-cocktails-offer"];

function xmlEscape(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        let redirectedPaths = new Set<string>();
        try {
          const res = await fetch(`${API_URL}/api/seo/sitemap-data`);
          if (res.ok) {
            const data = await res.json();
            redirectedPaths = new Set((data.redirects ?? []).map((r: { fromPath: string }) => r.fromPath));
          }
        } catch {
          // sitemap still works with the static list even if the backend is briefly down
        }

        const guidePaths = Object.keys(guidesContent).map((slug) => `/guides/${slug}`);
        const whatsOnPaths = WHATS_ON_SLUGS.map((slug) => `/whats-on/${slug}`);

        const allPaths = [...STATIC_PATHS, ...guidePaths, ...whatsOnPaths]
          .filter((p) => !redirectedPaths.has(p));

        const urls = allPaths
          .map((p) => `  <url><loc>${xmlEscape(SITE_URL + p)}</loc></url>`)
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

        return new Response(xml, {
          headers: { "content-type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});
