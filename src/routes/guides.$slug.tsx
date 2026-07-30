import { createFileRoute, notFound } from "@tanstack/react-router";
import { GuideTemplate } from "@/components/GuideTemplate";
import { getGuide, type GuideContent } from "@/lib/guidesContent";
import { API_URL, type Guide } from "@/lib/admin-api";

// Admin-created/edited guides live in the backend; the original hand-built
// guides still ship bundled as a fallback so nothing breaks if the API is
// briefly unavailable or a guide hasn't been migrated to the backend yet.
async function fetchGuideFromApi(slug: string): Promise<GuideContent | null> {
  try {
    const res = await fetch(`${API_URL}/api/guides/${encodeURIComponent(slug)}`);
    if (!res.ok) return null;
    const g: Guide = await res.json();
    return {
      slug: g.slug,
      title: g.title,
      metaTitle: g.metaTitle,
      metaDescription: g.metaDescription,
      tag: g.tag as GuideContent["tag"],
      publishedDate: g.publishedDate,
      publishedDateDisplay: g.publishedDateDisplay,
      updatedDate: g.updatedDate,
      updatedDateDisplay: g.updatedDateDisplay,
      excerpt: g.excerpt,
      intro: g.intro,
      quickAnswer: g.quickAnswer ?? undefined,
      quickFacts: g.quickFacts ?? undefined,
      comparisonTable: g.comparisonTable ?? undefined,
      sections: g.sections,
      pricingTable: g.pricingTable ?? undefined,
      externalLinks: g.externalLinks ?? undefined,
      faq: g.faq,
      relatedSlugs: g.relatedSlugs,
      ctaLabel: g.ctaLabel,
      ctaHref: g.ctaHref,
    };
  } catch {
    return null;
  }
}

export const Route = createFileRoute("/guides/$slug")({
  loader: async ({ params }) => {
    const guide = (await fetchGuideFromApi(params.slug)) ?? getGuide(params.slug);
    if (!guide) throw notFound();
    return guide;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: loaderData.metaTitle },
          { name: "description", content: loaderData.metaDescription },
          { property: "og:title", content: loaderData.metaTitle },
          { property: "og:description", content: loaderData.metaDescription },
          { property: "og:type", content: "article" },
        ]
      : [],
  }),
  component: GuidePage,
});

function GuidePage() {
  const guide = Route.useLoaderData();
  return <GuideTemplate guide={guide} />;
}
